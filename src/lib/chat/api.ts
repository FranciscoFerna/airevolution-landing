// =============================================================================
// AI REVOLUTION - CHAT API MODULE
// =============================================================================
// Comunicación robusta con el backend n8n RAG
// Incluye manejo de errores, reintentos y timeout
// Versión: 1.0.0
// =============================================================================

import type {
  ChatAPIConfig,
  SendMessageRequest,
  SendMessageResponse,
  ChatError,
  ChatMessage,
} from './types';
import { defaultApiConfig } from './theme';

// -----------------------------------------------------------------------------
// API CLIENT CLASS
// -----------------------------------------------------------------------------

export class ChatAPI {
  private config: ChatAPIConfig;
  private abortController: AbortController | null = null;

  constructor(config?: Partial<ChatAPIConfig>) {
    this.config = { ...defaultApiConfig, ...config };
  }

  /**
   * Enviar mensaje al webhook de n8n
   */
  async sendMessage(
    sessionId: string,
    message: string,
    metadata?: Record<string, unknown>
  ): Promise<SendMessageResponse> {
    // Cancelar request anterior si existe
    this.abort();
    this.abortController = new AbortController();

    const payload: SendMessageRequest = {
      action: 'sendMessage',
      sessionId,
      chatInput: message,
      metadata: {
        source: 'ai-revolution-chat-widget',
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        language: typeof navigator !== 'undefined' ? navigator.language : 'es-ES',
        ...metadata,
      },
    };

    let lastError: Error | null = null;

    // Intentar con reintentos
    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        const response = await this.executeRequest(payload);
        return response;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Si fue abortado, no reintentar
        if (lastError.name === 'AbortError') {
          throw this.createChatError('REQUEST_ABORTED', 'La solicitud fue cancelada', false);
        }

        // Si es el último intento, lanzar error
        if (attempt === this.config.retries) {
          break;
        }

        // Esperar antes de reintentar (exponential backoff)
        await this.delay(Math.pow(2, attempt) * 1000);
      }
    }

    // Procesar error final
    throw this.processError(lastError);
  }

  /**
   * Ejecutar request HTTP
   */
  private async executeRequest(payload: SendMessageRequest): Promise<SendMessageResponse> {
    const timeoutId = setTimeout(() => {
      this.abortController?.abort();
    }, this.config.timeout);

    try {
      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          ...this.config.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: this.abortController?.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      // Normalizar respuesta de n8n
      return this.normalizeResponse(data);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Normalizar respuesta de n8n a nuestro formato
   */
  private normalizeResponse(data: any): SendMessageResponse {
    // n8n puede devolver diferentes formatos según la configuración
    // Manejamos los casos comunes
    
    // Caso 1: Respuesta directa del agente
    if (typeof data === 'string') {
      return { output: data };
    }
    
    // Caso 2: Objeto con output
    if (data?.output) {
      return {
        output: data.output,
        sessionId: data.sessionId,
      };
    }
    
    // Caso 3: Objeto con text
    if (data?.text) {
      return {
        output: data.text,
        sessionId: data.sessionId,
      };
    }
    
    // Caso 4: Objeto con response
    if (data?.response) {
      return {
        output: data.response,
        sessionId: data.sessionId,
      };
    }
    
    // Caso 5: Objeto con message
    if (data?.message) {
      return {
        output: data.message,
        sessionId: data.sessionId,
      };
    }
    
    // Caso 6: Array de resultados (común en n8n)
    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];
      if (firstItem?.output || firstItem?.text || firstItem?.response || firstItem?.message) {
        return this.normalizeResponse(firstItem);
      }
    }

    // Caso 7: Error del servidor
    if (data?.error) {
      throw new Error(data.error);
    }

    // Fallback: convertir a string
    return {
      output: typeof data === 'object' ? JSON.stringify(data) : String(data),
    };
  }

  /**
   * Procesar error y convertir a ChatError
   */
  private processError(error: Error | null): ChatError {
    if (!error) {
      return this.createChatError('UNKNOWN_ERROR', 'Error desconocido', true);
    }

    const message = error.message || 'Error desconocido';

    // Clasificar errores
    if (message.includes('fetch') || message.includes('network') || message.includes('Failed to fetch')) {
      return this.createChatError('NETWORK_ERROR', 'Error de conexión. Verifica tu conexión a internet.', true);
    }

    if (message.includes('timeout') || message.includes('Timeout')) {
      return this.createChatError('TIMEOUT_ERROR', 'La solicitud tardó demasiado. Por favor, inténtalo de nuevo.', true);
    }

    if (message.includes('HTTP 4')) {
      return this.createChatError('CLIENT_ERROR', 'Error en la solicitud. Por favor, inténtalo de nuevo.', true);
    }

    if (message.includes('HTTP 5')) {
      return this.createChatError('SERVER_ERROR', 'El servidor no está disponible. Por favor, inténtalo más tarde.', true);
    }

    if (message.includes('CORS')) {
      return this.createChatError('CORS_ERROR', 'Error de configuración del servidor.', false);
    }

    return this.createChatError('UNKNOWN_ERROR', message, true);
  }

  /**
   * Crear objeto ChatError
   */
  private createChatError(code: string, message: string, retryable: boolean): ChatError {
    return {
      code,
      message,
      retryable,
      timestamp: new Date(),
    };
  }

  /**
   * Cancelar request en curso
   */
  abort(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  /**
   * Utilidad para delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Verificar conectividad con el servidor
   */
  async healthCheck(): Promise<boolean> {
    // Si no hay webhook configurado, retornar false
    if (!this.config.webhookUrl || this.config.webhookUrl.includes('white-field-e6ecai')) {
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(this.config.webhookUrl, {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok || response.status === 405; // 405 = Method Not Allowed es OK para HEAD
    } catch (error) {
      // En desarrollo, loguear el error
      if (import.meta.env.DEV) {
        console.warn('[ChatAPI] Health check failed:', error);
      }
      return false;
    }
  }

  /**
   * Actualizar configuración
   */
  updateConfig(config: Partial<ChatAPIConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// -----------------------------------------------------------------------------
// SESSION MANAGEMENT
// -----------------------------------------------------------------------------

const SESSION_STORAGE_KEY = 'ai_revolution_chat_session';
const MESSAGES_STORAGE_KEY = 'ai_revolution_chat_messages';

export interface StoredSession {
  sessionId: string;
  createdAt: string;
  lastActivity: string;
  expiresAt: string;
}

/**
 * Generar ID de sesión único
 */
export function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const browserPart = typeof navigator !== 'undefined' 
    ? navigator.userAgent.length.toString(36) 
    : 'ssr';
  
  return `air-${timestamp}-${randomPart}-${browserPart}`;
}

/**
 * Obtener o crear sesión
 */
export function getOrCreateSession(durationMinutes: number = 60): StoredSession {
  if (typeof window === 'undefined') {
    return createNewSession(durationMinutes);
  }

  try {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    
    if (stored) {
      const session = JSON.parse(stored) as StoredSession;
      const now = new Date();
      const expiresAt = new Date(session.expiresAt);
      
      // Verificar si la sesión sigue válida
      if (now < expiresAt) {
        // Actualizar última actividad
        session.lastActivity = now.toISOString();
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        return session;
      }
    }
  } catch (error) {
    console.warn('[ChatAPI] Error reading session:', error);
  }

  return createNewSession(durationMinutes);
}

/**
 * Crear nueva sesión
 */
function createNewSession(durationMinutes: number): StoredSession {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + durationMinutes * 60 * 1000);
  
  const session: StoredSession = {
    sessionId: generateSessionId(),
    createdAt: now.toISOString(),
    lastActivity: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
      console.warn('[ChatAPI] Error saving session:', error);
    }
  }

  return session;
}

/**
 * Limpiar sesión
 */
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(MESSAGES_STORAGE_KEY);
  } catch (error) {
    console.warn('[ChatAPI] Error clearing session:', error);
  }
}

/**
 * Guardar mensajes en localStorage
 */
export function saveMessages(messages: ChatMessage[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Solo guardar los últimos 50 mensajes para no llenar localStorage
    const messagesToSave = messages.slice(-50);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messagesToSave));
  } catch (error) {
    console.warn('[ChatAPI] Error saving messages:', error);
  }
}

/**
 * Cargar mensajes de localStorage
 */
export function loadMessages(): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (stored) {
      const messages = JSON.parse(stored) as ChatMessage[];
      // Reconstruir objetos Date
      return messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    }
  } catch (error) {
    console.warn('[ChatAPI] Error loading messages:', error);
  }
  
  return [];
}

// -----------------------------------------------------------------------------
// UTILITIES
// -----------------------------------------------------------------------------

/**
 * Formatear timestamp relativo
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'Ahora';
  } else if (minutes < 60) {
    return `Hace ${minutes}m`;
  } else if (hours < 24) {
    return `Hace ${hours}h`;
  } else if (days < 7) {
    return `Hace ${days}d`;
  } else {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  }
}

/**
 * Formatear timestamp absoluto
 */
export function formatAbsoluteTime(date: Date): string {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Generar ID único para mensajes
 */
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Crear mensaje de usuario
 */
export function createUserMessage(content: string): ChatMessage {
  return {
    id: generateMessageId(),
    role: 'user',
    content,
    timestamp: new Date(),
    status: 'sending',
  };
}

/**
 * Crear mensaje del asistente
 */
export function createAssistantMessage(content: string): ChatMessage {
  return {
    id: generateMessageId(),
    role: 'assistant',
    content,
    timestamp: new Date(),
    status: 'sent',
  };
}

/**
 * Crear mensaje del sistema
 */
export function createSystemMessage(content: string): ChatMessage {
  return {
    id: generateMessageId(),
    role: 'system',
    content,
    timestamp: new Date(),
    status: 'sent',
  };
}

// -----------------------------------------------------------------------------
// SINGLETON INSTANCE
// -----------------------------------------------------------------------------

let apiInstance: ChatAPI | null = null;

/**
 * Obtener instancia singleton de la API
 */
export function getChatAPI(config?: Partial<ChatAPIConfig>): ChatAPI {
  if (!apiInstance) {
    apiInstance = new ChatAPI(config);
  } else if (config) {
    apiInstance.updateConfig(config);
  }
  return apiInstance;
}

/**
 * Resetear instancia (útil para testing)
 */
export function resetChatAPI(): void {
  if (apiInstance) {
    apiInstance.abort();
    apiInstance = null;
  }
}

export default ChatAPI;
