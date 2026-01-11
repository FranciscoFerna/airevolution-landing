// =============================================================================
// AI REVOLUTION - USE CHAT HOOK
// =============================================================================
// Hook personalizado para manejar toda la lógica del chat
// Incluye gestión de estado, persistencia y comunicación con la API
// Versión: 1.0.0
// =============================================================================

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import type {
  ChatState,
  ChatMessage,
  ChatError,
  ChatWidgetConfig,
  UseChatOptions,
  UseChatReturn,
  ConnectionStatus,
} from '../lib/chat/types';
import {
  ChatAPI,
  getOrCreateSession,
  clearSession,
  saveMessages,
  loadMessages,
  generateMessageId,
  createUserMessage,
  createAssistantMessage,
  createSystemMessage,
} from '../lib/chat/api';
import { defaultChatConfig, createChatConfig } from '../lib/chat/theme';

// -----------------------------------------------------------------------------
// INITIAL STATE
// -----------------------------------------------------------------------------

const createInitialState = (): ChatState => ({
  messages: [],
  isOpen: false,
  isLoading: false,
  isTyping: false,
  error: null,
  sessionId: '',
  connectionStatus: 'disconnected',
});

// -----------------------------------------------------------------------------
// USE CHAT HOOK
// -----------------------------------------------------------------------------

export function useChat(options?: Partial<UseChatOptions>): UseChatReturn {
  // Configuración
  const config = useMemo(
    () => createChatConfig(options?.config),
    [options?.config]
  );

  // Estado
  const [state, setState] = useState<ChatState>(createInitialState());

  // Refs
  const apiRef = useRef<ChatAPI | null>(null);
  const lastMessageRef = useRef<ChatMessage | null>(null);
  const initializeRef = useRef(false);

  // -----------------------------------------------------------------------------
  // INITIALIZATION
  // -----------------------------------------------------------------------------

  useEffect(() => {
    if (initializeRef.current) return;
    initializeRef.current = true;

    // Inicializar API
    apiRef.current = new ChatAPI(config.api);

    // Recuperar sesión
    const session = getOrCreateSession(config.behavior.sessionDuration);

    // Cargar mensajes previos si está habilitado
    let previousMessages: ChatMessage[] = [];
    if (config.behavior.persistSession) {
      previousMessages = loadMessages();
    }

    // Si no hay mensajes previos, agregar mensaje de bienvenida
    const initialMessages: ChatMessage[] = previousMessages.length > 0
      ? previousMessages.map(msg => ({ ...msg, status: 'sent' as const }))
      : [createSystemMessage(config.i18n.messages.welcomeMessage)];

    setState(prev => ({
      ...prev,
      sessionId: session.sessionId,
      messages: initialMessages,
      connectionStatus: 'connected',
    }));

    // Health check
    apiRef.current.healthCheck().then(isHealthy => {
      setState(prev => ({
        ...prev,
        connectionStatus: isHealthy ? 'connected' : 'disconnected',
      }));
    });

    // Cleanup
    return () => {
      apiRef.current?.abort();
    };
  }, [config]);

  // -----------------------------------------------------------------------------
  // PERSIST MESSAGES
  // -----------------------------------------------------------------------------

  useEffect(() => {
    if (config.behavior.persistSession && state.messages.length > 0) {
      // Debounce saving
      const timeoutId = setTimeout(() => {
        saveMessages(state.messages);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [state.messages, config.behavior.persistSession]);

  // -----------------------------------------------------------------------------
  // ACTIONS
  // -----------------------------------------------------------------------------

  /**
   * Enviar mensaje
   */
  const sendMessage = useCallback(async (content: string) => {
    const trimmedContent = content.trim();
    if (!trimmedContent || state.isLoading) return;

    const api = apiRef.current;
    if (!api) {
      console.error('[useChat] API not initialized');
      return;
    }

    // Crear mensaje del usuario
    const userMessage = createUserMessage(trimmedContent);
    lastMessageRef.current = userMessage;

    // Actualizar estado: agregar mensaje y marcar como loading
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      isTyping: true,
      error: null,
    }));

    // Callback de mensaje enviado
    options?.onMessageSent?.(userMessage);

    try {
      // Enviar a la API
      const response = await api.sendMessage(
        state.sessionId,
        trimmedContent,
        {
          messagesCount: state.messages.length,
        }
      );

      // Crear mensaje de respuesta
      const assistantMessage = createAssistantMessage(response.output);

      // Actualizar estado con respuesta
      setState(prev => ({
        ...prev,
        messages: prev.messages.map(msg =>
          msg.id === userMessage.id ? { ...msg, status: 'sent' as const } : msg
        ).concat(assistantMessage),
        isLoading: false,
        isTyping: false,
        connectionStatus: 'connected',
      }));

      // Callback de mensaje recibido
      options?.onMessageReceived?.(assistantMessage);

    } catch (error) {
      const chatError = error as ChatError;

      // Actualizar estado con error
      setState(prev => ({
        ...prev,
        messages: prev.messages.map(msg =>
          msg.id === userMessage.id
            ? {
                ...msg,
                status: 'error' as const,
                metadata: {
                  ...msg.metadata,
                  error: { code: chatError.code, message: chatError.message },
                },
              }
            : msg
        ),
        isLoading: false,
        isTyping: false,
        error: chatError,
        connectionStatus: chatError.code === 'NETWORK_ERROR' ? 'disconnected' : prev.connectionStatus,
      }));

      // Callback de error
      options?.onError?.(chatError);
    }
  }, [state.sessionId, state.isLoading, state.messages.length, options]);

  /**
   * Reintentar último mensaje
   */
  const retryLastMessage = useCallback(async () => {
    const lastMessage = lastMessageRef.current;
    if (!lastMessage || lastMessage.role !== 'user') return;

    // Remover el mensaje con error
    setState(prev => ({
      ...prev,
      messages: prev.messages.filter(msg => msg.id !== lastMessage.id),
      error: null,
    }));

    // Reenviar
    await sendMessage(lastMessage.content);
  }, [sendMessage]);

  /**
   * Limpiar mensajes
   */
  const clearMessages = useCallback(() => {
    clearSession();
    const session = getOrCreateSession(config.behavior.sessionDuration);
    const welcomeMessage = createSystemMessage(config.i18n.messages.welcomeMessage);

    setState(prev => ({
      ...prev,
      messages: [welcomeMessage],
      sessionId: session.sessionId,
      error: null,
    }));
  }, [config.behavior.sessionDuration, config.i18n.messages.welcomeMessage]);

  /**
   * Abrir chat
   */
  const openChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
  }, []);

  /**
   * Cerrar chat
   */
  const closeChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  /**
   * Toggle chat
   */
  const toggleChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  // -----------------------------------------------------------------------------
  // RETURN
  // -----------------------------------------------------------------------------

  return {
    state,
    actions: {
      sendMessage,
      clearMessages,
      retryLastMessage,
      openChat,
      closeChat,
      toggleChat,
    },
  };
}

// -----------------------------------------------------------------------------
// ADDITIONAL HOOKS
// -----------------------------------------------------------------------------

/**
 * Hook para auto-scroll a nuevos mensajes
 */
export function useAutoScroll(
  messagesRef: React.RefObject<HTMLDivElement>,
  messages: ChatMessage[],
  enabled: boolean = true
) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const isNearBottomRef = useRef(true);

  // Detectar si estamos cerca del fondo
  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      isNearBottomRef.current = isNearBottom;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [messagesRef]);

  // Auto-scroll cuando hay nuevos mensajes
  useEffect(() => {
    if (!enabled) return;

    const container = messagesRef.current;
    if (!container) return;

    // Solo auto-scroll si estamos cerca del fondo
    if (isNearBottomRef.current) {
      requestAnimationFrame(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, [messages, enabled, messagesRef]);

  // Función para scroll manual al fondo
  const scrollToBottom = useCallback(() => {
    const container = messagesRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, [messagesRef]);

  return { showScrollButton, scrollToBottom };
}

/**
 * Hook para detectar si el cookie banner está visible
 */
export function useCookieBannerDetection(): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkBanner = () => {
      const consent = localStorage.getItem('cookie_consent');
      setIsVisible(!consent);
    };

    checkBanner();

    // Escuchar cambios
    const handleStorageChange = () => checkBanner();
    const handleConsentUpdate = () => setIsVisible(false);

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cookieConsentUpdate', handleConsentUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookieConsentUpdate', handleConsentUpdate);
    };
  }, []);

  return isVisible;
}

/**
 * Hook para detectar teclas presionadas (Escape para cerrar)
 */
export function useKeyboardShortcuts(
  isOpen: boolean,
  onClose: () => void,
  onToggle: () => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape para cerrar
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }

      // Ctrl/Cmd + Shift + C para toggle
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        onToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onToggle]);
}

/**
 * Hook para unread messages count
 */
export function useUnreadCount(
  messages: ChatMessage[],
  isOpen: boolean
): number {
  const [unreadCount, setUnreadCount] = useState(0);
  const lastSeenCountRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      // Cuando se abre, marcar todos como leídos
      lastSeenCountRef.current = messages.length;
      setUnreadCount(0);
    } else {
      // Cuando está cerrado, contar nuevos mensajes del asistente
      const newMessages = messages.slice(lastSeenCountRef.current);
      const unread = newMessages.filter(m => m.role === 'assistant').length;
      setUnreadCount(unread);
    }
  }, [messages, isOpen]);

  return unreadCount;
}

/**
 * Hook para gestionar el focus trap en el modal del chat
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  isActive: boolean
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus en el primer elemento
    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [containerRef, isActive]);
}

export default useChat;
