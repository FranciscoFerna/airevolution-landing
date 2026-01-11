// =============================================================================
// AI REVOLUTION - CHAT CONSTANTS
// =============================================================================
// Constantes globales y valores de configuración centralizados
// Versión: 1.0.0
// =============================================================================

// -----------------------------------------------------------------------------
// STORAGE KEYS
// -----------------------------------------------------------------------------

export const STORAGE_KEYS = {
  SESSION: 'ai_revolution_chat_session',
  MESSAGES: 'ai_revolution_chat_messages',
  PREFERENCES: 'ai_revolution_chat_preferences',
  LAST_OPEN: 'ai_revolution_chat_last_open',
  CONSENT: 'cookie_consent',
} as const;

// -----------------------------------------------------------------------------
// API ENDPOINTS
// -----------------------------------------------------------------------------

/**
 * Obtener configuración de endpoints desde variables de entorno
 * Los valores sensibles NO deben estar hardcodeados en el código
 */
function getWebhookConfig() {
  // Opción 1: URL completa desde variable de entorno (recomendado)
  const fullUrl = import.meta.env.PUBLIC_N8N_CHAT_WEBHOOK_URL;
  if (fullUrl) {
    return {
      WEBHOOK_PROXY: new URL(fullUrl).origin,
      WEBHOOK_ID: fullUrl.split('/webhook/')[1]?.split('/')[0] || '',
      FULL_WEBHOOK: fullUrl,
    };
  }

  // Opción 2: Construir desde proxy + ID
  const proxy = import.meta.env.PUBLIC_N8N_WEBHOOK_PROXY;
  const webhookId = import.meta.env.PUBLIC_N8N_WEBHOOK_ID;
  
  if (proxy && webhookId) {
    return {
      WEBHOOK_PROXY: proxy,
      WEBHOOK_ID: webhookId,
      FULL_WEBHOOK: `${proxy}/webhook/${webhookId}/chat`,
    };
  }

  // ⚠️ FALLBACK SOLO PARA DESARROLLO LOCAL
  // Estos valores son temporales y SOLO se usan si no hay variables de entorno configuradas
  // En producción, esto NUNCA debería ejecutarse - se lanzará un error si faltan las variables
  if (import.meta.env.DEV) {
    console.warn(
      '[Constants] ⚠️ Variables de entorno no configuradas. ' +
      'Usando valores por defecto SOLO para desarrollo. ' +
      'Configura PUBLIC_N8N_CHAT_WEBHOOK_URL en producción.'
    );
    // Valores temporales solo para desarrollo - NO usar en producción
    return {
      WEBHOOK_PROXY: 'https://white-field-e6ecai-revolution-proxy.fraanfeernaandeez.workers.dev',
      WEBHOOK_ID: 'f61e1b9f-0f81-46b8-828e-668bfeeeb3eb',
      FULL_WEBHOOK: 'https://white-field-e6ecai-revolution-proxy.fraanfeernaandeez.workers.dev/webhook/f61e1b9f-0f81-46b8-828e-668bfeeeb3eb/chat',
    };
  }

  // En producción, lanzar error
  throw new Error(
    'Configuración de webhook no encontrada. ' +
    'Configura PUBLIC_N8N_CHAT_WEBHOOK_URL o PUBLIC_N8N_WEBHOOK_PROXY + PUBLIC_N8N_WEBHOOK_ID'
  );
}

const webhookConfig = getWebhookConfig();

export const API_ENDPOINTS = {
  /** Proxy de Cloudflare para n8n (desde variable de entorno) */
  WEBHOOK_PROXY: webhookConfig.WEBHOOK_PROXY,
  
  /** Webhook ID de n8n (desde variable de entorno) */
  WEBHOOK_ID: webhookConfig.WEBHOOK_ID,
  
  /** Endpoint completo */
  get FULL_WEBHOOK() {
    return webhookConfig.FULL_WEBHOOK;
  },
} as const;

// -----------------------------------------------------------------------------
// TIMING CONSTANTS
// -----------------------------------------------------------------------------

export const TIMING = {
  /** Timeout para requests HTTP (ms) */
  REQUEST_TIMEOUT: 30000,
  
  /** Delay entre reintentos (ms) */
  RETRY_DELAY: 1000,
  
  /** Número máximo de reintentos */
  MAX_RETRIES: 2,
  
  /** Duración de sesión (minutos) */
  SESSION_DURATION: 60,
  
  /** Delay de auto-guardado de mensajes (ms) */
  AUTOSAVE_DELAY: 500,
  
  /** Delay de debounce para input (ms) */
  INPUT_DEBOUNCE: 150,
  
  /** Tiempo para mostrar "typing" mínimo (ms) */
  MIN_TYPING_DURATION: 500,
  
  /** Delay de auto-open (segundos, 0 = desactivado) */
  AUTO_OPEN_DELAY: 0,
  
  /** Intervalo de health check (ms) */
  HEALTH_CHECK_INTERVAL: 30000,
} as const;

// -----------------------------------------------------------------------------
// LIMITS
// -----------------------------------------------------------------------------

export const LIMITS = {
  /** Máximo de mensajes en memoria */
  MAX_MESSAGES: 100,
  
  /** Máximo de mensajes a guardar en localStorage */
  MAX_STORED_MESSAGES: 50,
  
  /** Longitud máxima de mensaje del usuario */
  MAX_MESSAGE_LENGTH: 2000,
  
  /** Longitud mínima de mensaje del usuario */
  MIN_MESSAGE_LENGTH: 1,
  
  /** Máximo de caracteres para mostrar preview */
  PREVIEW_MAX_LENGTH: 150,
} as const;

// -----------------------------------------------------------------------------
// UI CONSTANTS
// -----------------------------------------------------------------------------

export const UI = {
  /** Distancia del fondo para considerar "cerca del fondo" (px) */
  NEAR_BOTTOM_THRESHOLD: 100,
  
  /** Altura del cookie banner estimada (px) */
  COOKIE_BANNER_HEIGHT: 120,
  
  /** Breakpoint para móvil (px) */
  MOBILE_BREAKPOINT: 480,
  
  /** Breakpoint para tablet (px) */
  TABLET_BREAKPOINT: 768,
  
  /** Z-index base para el widget */
  BASE_Z_INDEX: 9990,
} as const;

// -----------------------------------------------------------------------------
// ANIMATION CONSTANTS
// -----------------------------------------------------------------------------

export const ANIMATIONS = {
  /** Duración rápida (ms) */
  FAST: 150,
  
  /** Duración normal (ms) */
  NORMAL: 300,
  
  /** Duración lenta (ms) */
  SLOW: 500,
  
  /** Easing por defecto */
  EASING_DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  /** Easing con bounce */
  EASING_BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  /** Easing suave */
  EASING_SMOOTH: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const;

// -----------------------------------------------------------------------------
// ERROR CODES
// -----------------------------------------------------------------------------

export const ERROR_CODES = {
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  CORS_ERROR: 'CORS_ERROR',
  
  // Client errors
  CLIENT_ERROR: 'CLIENT_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  
  // Server errors
  SERVER_ERROR: 'SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  
  // Other
  REQUEST_ABORTED: 'REQUEST_ABORTED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
} as const;

// -----------------------------------------------------------------------------
// ERROR MESSAGES (Spanish)
// -----------------------------------------------------------------------------

export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.NETWORK_ERROR]: 'Error de conexión. Verifica tu conexión a internet.',
  [ERROR_CODES.TIMEOUT_ERROR]: 'La solicitud tardó demasiado. Por favor, inténtalo de nuevo.',
  [ERROR_CODES.CORS_ERROR]: 'Error de configuración del servidor.',
  [ERROR_CODES.CLIENT_ERROR]: 'Error en la solicitud. Por favor, inténtalo de nuevo.',
  [ERROR_CODES.VALIDATION_ERROR]: 'El mensaje no es válido.',
  [ERROR_CODES.SERVER_ERROR]: 'El servidor no está disponible. Por favor, inténtalo más tarde.',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 'El servicio no está disponible temporalmente.',
  [ERROR_CODES.REQUEST_ABORTED]: 'La solicitud fue cancelada.',
  [ERROR_CODES.UNKNOWN_ERROR]: 'Ha ocurrido un error inesperado.',
  [ERROR_CODES.RATE_LIMITED]: 'Demasiadas solicitudes. Por favor, espera un momento.',
};

// -----------------------------------------------------------------------------
// KEYBOARD SHORTCUTS
// -----------------------------------------------------------------------------

export const KEYBOARD_SHORTCUTS = {
  /** Cerrar chat */
  CLOSE: 'Escape',
  
  /** Toggle chat (con modificadores) */
  TOGGLE: {
    key: 'C',
    modifiers: ['ctrlKey', 'shiftKey'] as const,
  },
  
  /** Enviar mensaje */
  SEND: 'Enter',
  
  /** Nueva línea en input */
  NEW_LINE: {
    key: 'Enter',
    modifiers: ['shiftKey'] as const,
  },
} as const;

// -----------------------------------------------------------------------------
// ARIA LABELS
// -----------------------------------------------------------------------------

export const ARIA_LABELS = {
  CHAT_WIDGET: 'Widget de chat de AI Revolution',
  OPEN_CHAT: 'Abrir chat',
  CLOSE_CHAT: 'Cerrar chat',
  SEND_MESSAGE: 'Enviar mensaje',
  MESSAGE_INPUT: 'Escribe tu mensaje',
  MESSAGES_LIST: 'Lista de mensajes',
  TYPING_INDICATOR: 'El asistente está escribiendo',
  SCROLL_TO_BOTTOM: 'Ir al final de los mensajes',
  UNREAD_MESSAGES: (count: number) => `${count} mensaje${count !== 1 ? 's' : ''} sin leer`,
  CONNECTION_STATUS: {
    CONNECTED: 'Conectado',
    DISCONNECTED: 'Desconectado',
    RECONNECTING: 'Reconectando',
  },
} as const;

// -----------------------------------------------------------------------------
// CSS CLASS NAMES
// -----------------------------------------------------------------------------

export const CSS_CLASSES = {
  // Root
  WIDGET: 'air-chat-widget',
  
  // Components
  LAUNCHER: 'air-chat-launcher',
  WINDOW: 'air-chat-window',
  HEADER: 'air-chat-header',
  MESSAGES: 'air-chat-messages',
  MESSAGE: 'air-chat-message',
  INPUT: 'air-chat-input',
  TYPING: 'air-chat-typing-indicator',
  
  // Modifiers
  OPEN: 'air-chat--open',
  LOADING: 'air-chat--loading',
  ERROR: 'air-chat--error',
  MOBILE: 'air-chat--mobile',
  
  // Message types
  MESSAGE_USER: 'air-chat-message--user',
  MESSAGE_ASSISTANT: 'air-chat-message--assistant',
  MESSAGE_SYSTEM: 'air-chat-message--system',
  
  // States
  SENDING: 'air-chat-message--sending',
  SENT: 'air-chat-message--sent',
  FAILED: 'air-chat-message--error',
  
  // Animations
  ANIMATE_FADE_IN: 'air-chat-animate-fade-in',
  ANIMATE_FADE_IN_UP: 'air-chat-animate-fade-in-up',
  ANIMATE_SCALE_IN: 'air-chat-animate-scale-in',
  ANIMATE_BOUNCE: 'air-chat-animate-bounce',
  ANIMATE_PULSE: 'air-chat-animate-pulse',
  ANIMATE_SPIN: 'air-chat-animate-spin',
  
  // Utilities
  SCROLLBAR: 'air-chat-scrollbar',
  SR_ONLY: 'air-chat-sr-only',
} as const;

// -----------------------------------------------------------------------------
// REGEX PATTERNS
// -----------------------------------------------------------------------------

export const PATTERNS = {
  /** URL pattern */
  URL: /https?:\/\/[^\s<]+[^<.,:;"')\]\s]/g,
  
  /** Email pattern */
  EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  
  /** Phone pattern (Spanish) */
  PHONE: /(?:\+34|0034)?[6789]\d{8}/g,
  
  /** Markdown bold */
  BOLD: /\*\*(.*?)\*\*/g,
  
  /** Markdown italic */
  ITALIC: /(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)|_([^_]+)_/g,
  
  /** Markdown code inline */
  CODE_INLINE: /`([^`]+)`/g,
  
  /** Markdown link */
  LINK: /\[([^\]]+)\]\(([^)]+)\)/g,
} as const;

// -----------------------------------------------------------------------------
// DEFAULT VALUES
// -----------------------------------------------------------------------------

export const DEFAULTS = {
  /** Mensaje de bienvenida */
  WELCOME_MESSAGE: '¡Hola! 👋 Soy el asistente de AI Revolution. ¿En qué puedo ayudarte hoy?',
  
  /** Placeholder del input */
  INPUT_PLACEHOLDER: 'Escribe tu mensaje aquí...',
  
  /** Título del header */
  HEADER_TITLE: 'AI Revolution',
  
  /** Subtítulo del header */
  HEADER_SUBTITLE: 'Asistente de Automatización IA',
  
  /** Texto de typing indicator */
  TYPING_TEXT: 'Escribiendo...',
  
  /** Nombre del bot */
  BOT_NAME: 'AI Revolution',
  
  /** Locale por defecto */
  LOCALE: 'es-ES',
} as const;

// -----------------------------------------------------------------------------
// FEATURE FLAGS
// -----------------------------------------------------------------------------

export const FEATURES = {
  /** Habilitar sonidos */
  SOUNDS: false,
  
  /** Habilitar markdown en mensajes */
  MARKDOWN: true,
  
  /** Habilitar detección de links */
  LINK_DETECTION: true,
  
  /** Habilitar persistencia de sesión */
  SESSION_PERSISTENCE: true,
  
  /** Habilitar analytics */
  ANALYTICS: true,
  
  /** Habilitar logging de debug */
  DEBUG_LOGGING: process.env.NODE_ENV === 'development',
} as const;

// -----------------------------------------------------------------------------
// EVENTS
// -----------------------------------------------------------------------------

export const EVENTS = {
  /** Evento de actualización de consentimiento de cookies */
  COOKIE_CONSENT_UPDATE: 'cookieConsentUpdate',
  
  /** Evento de chat abierto */
  CHAT_OPENED: 'airChatOpened',
  
  /** Evento de chat cerrado */
  CHAT_CLOSED: 'airChatClosed',
  
  /** Evento de mensaje enviado */
  MESSAGE_SENT: 'airChatMessageSent',
  
  /** Evento de mensaje recibido */
  MESSAGE_RECEIVED: 'airChatMessageReceived',
  
  /** Evento de error */
  CHAT_ERROR: 'airChatError',
} as const;

// -----------------------------------------------------------------------------
// EXPORT ALL
// -----------------------------------------------------------------------------

export default {
  STORAGE_KEYS,
  API_ENDPOINTS,
  TIMING,
  LIMITS,
  UI,
  ANIMATIONS,
  ERROR_CODES,
  ERROR_MESSAGES,
  KEYBOARD_SHORTCUTS,
  ARIA_LABELS,
  CSS_CLASSES,
  PATTERNS,
  DEFAULTS,
  FEATURES,
  EVENTS,
};
