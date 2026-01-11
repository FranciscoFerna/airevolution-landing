// =============================================================================
// AI REVOLUTION - CHAT WIDGET TYPES
// =============================================================================
// Definiciones de tipos para el sistema de chat personalizado
// Versión: 1.0.0
// =============================================================================

// -----------------------------------------------------------------------------
// MESSAGE TYPES
// -----------------------------------------------------------------------------

export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageStatus = 'sending' | 'sent' | 'error' | 'streaming';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  /** Tiempo de respuesta del servidor en ms */
  responseTime?: number;
  /** Indica si el mensaje fue recuperado del historial */
  fromHistory?: boolean;
  /** Tokens utilizados (si está disponible) */
  tokens?: {
    prompt?: number;
    completion?: number;
    total?: number;
  };
  /** Fuentes RAG utilizadas */
  sources?: RAGSource[];
  /** Error details si status === 'error' */
  error?: {
    code: string;
    message: string;
  };
}

export interface RAGSource {
  title: string;
  content: string;
  score: number;
}

// -----------------------------------------------------------------------------
// CHAT STATE
// -----------------------------------------------------------------------------

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  isTyping: boolean;
  error: ChatError | null;
  sessionId: string;
  connectionStatus: ConnectionStatus;
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

export interface ChatError {
  code: string;
  message: string;
  retryable: boolean;
  timestamp: Date;
}

// -----------------------------------------------------------------------------
// API TYPES
// -----------------------------------------------------------------------------

export interface SendMessageRequest {
  action: 'sendMessage';
  sessionId: string;
  chatInput: string;
  metadata?: {
    source: string;
    timestamp: string;
    userAgent?: string;
    language?: string;
  };
}

export interface SendMessageResponse {
  output: string;
  sessionId?: string;
  error?: string;
}

export interface ChatAPIConfig {
  /** URL del proxy/webhook */
  webhookUrl: string;
  /** Timeout para requests en ms */
  timeout: number;
  /** Número de reintentos */
  retries: number;
  /** Headers adicionales */
  headers?: Record<string, string>;
}

// -----------------------------------------------------------------------------
// THEME TYPES
// -----------------------------------------------------------------------------

export interface ChatTheme {
  colors: ChatThemeColors;
  dimensions: ChatThemeDimensions;
  typography: ChatThemeTypography;
  animations: ChatThemeAnimations;
  position: ChatThemePosition;
  shadows: ChatThemeShadows;
  borders: ChatThemeBorders;
}

export interface ChatThemeColors {
  primary: string;
  primaryDark: string;
  accent: string;
  accentSecondary: string;
  background: {
    chat: string;
    header: string;
    input: string;
    launcher: string;
    overlay: string;
  };
  message: {
    user: {
      background: string;
      text: string;
    };
    assistant: {
      background: string;
      text: string;
      border: string;
    };
    system: {
      background: string;
      text: string;
    };
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
  status: {
    online: string;
    offline: string;
    error: string;
    warning: string;
  };
  input: {
    background: string;
    border: string;
    borderFocus: string;
    placeholder: string;
    text: string;
  };
  scrollbar: {
    track: string;
    thumb: string;
    thumbHover: string;
  };
}

export interface ChatThemeDimensions {
  width: string;
  maxWidth: string;
  height: string;
  maxHeight: string;
  minHeight: string;
  launcher: {
    size: string;
    iconSize: string;
  };
  header: {
    height: string;
  };
  input: {
    height: string;
    minHeight: string;
    maxHeight: string;
  };
  message: {
    maxWidth: string;
    padding: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface ChatThemeTypography {
  fontFamily: string;
  fontFamilyMono: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ChatThemeAnimations {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    default: string;
    bounce: string;
    smooth: string;
  };
  transitions: {
    all: string;
    transform: string;
    opacity: string;
    colors: string;
  };
}

export interface ChatThemePosition {
  bottom: string;
  right: string;
  left?: string;
  top?: string;
  zIndex: {
    launcher: number;
    window: number;
    overlay: number;
  };
}

export interface ChatThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  launcher: string;
  launcherHover: string;
  window: string;
  message: string;
}

export interface ChatThemeBorders {
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
    window: string;
    launcher: string;
    message: string;
    input: string;
  };
  width: {
    thin: string;
    normal: string;
    thick: string;
  };
}

// -----------------------------------------------------------------------------
// WIDGET CONFIG
// -----------------------------------------------------------------------------

export interface ChatWidgetConfig {
  /** Configuración de la API */
  api: ChatAPIConfig;
  /** Tema visual */
  theme: ChatTheme;
  /** Configuración de comportamiento */
  behavior: ChatBehaviorConfig;
  /** Textos e i18n */
  i18n: ChatI18nConfig;
  /** Branding */
  branding: ChatBrandingConfig;
}

export interface ChatBehaviorConfig {
  /** Auto-abrir el chat después de X segundos (0 = desactivado) */
  autoOpenDelay: number;
  /** Mostrar indicador de typing */
  showTypingIndicator: boolean;
  /** Persistir conversación en localStorage */
  persistSession: boolean;
  /** Duración de la sesión en minutos */
  sessionDuration: number;
  /** Máximo de mensajes a mantener en memoria */
  maxMessages: number;
  /** Sonido en nuevos mensajes */
  enableSounds: boolean;
  /** Mostrar timestamps */
  showTimestamps: boolean;
  /** Formato de timestamp */
  timestampFormat: 'relative' | 'absolute';
  /** Placeholder dinámico */
  dynamicPlaceholder: boolean;
  /** Scroll automático a nuevos mensajes */
  autoScroll: boolean;
  /** Mostrar botón de scroll cuando hay mensajes nuevos */
  showScrollButton: boolean;
  /** Cerrar al hacer clic fuera */
  closeOnOutsideClick: boolean;
  /** Animación del launcher */
  launcherAnimation: 'pulse' | 'bounce' | 'none';
  /** Mostrar badge de mensajes no leídos */
  showUnreadBadge: boolean;
}

export interface ChatI18nConfig {
  locale: string;
  messages: {
    headerTitle: string;
    headerSubtitle: string;
    inputPlaceholder: string;
    sendButton: string;
    typingIndicator: string;
    connectionError: string;
    reconnecting: string;
    welcomeMessage: string;
    poweredBy?: string;
    scrollToBottom: string;
    newMessages: string;
    errorRetry: string;
    close: string;
    minimize: string;
  };
}

export interface ChatBrandingConfig {
  /** Nombre de la empresa/bot */
  name: string;
  /** Logo URL */
  logoUrl?: string;
  /** Icono del avatar del bot */
  botAvatarUrl?: string;
  /** Mostrar "Powered by" */
  showPoweredBy: boolean;
  /** URL del powered by */
  poweredByUrl?: string;
  /** Favicon para notificaciones */
  faviconUrl?: string;
}

// -----------------------------------------------------------------------------
// COMPONENT PROPS
// -----------------------------------------------------------------------------

export interface ChatWidgetProps {
  config?: Partial<ChatWidgetConfig>;
  onOpen?: () => void;
  onClose?: () => void;
  onMessageSent?: (message: ChatMessage) => void;
  onMessageReceived?: (message: ChatMessage) => void;
  onError?: (error: ChatError) => void;
}

export interface ChatLauncherProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
  theme: ChatTheme;
  animation?: 'pulse' | 'bounce' | 'none';
  cookieBannerVisible?: boolean;
}

export interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isLoading: boolean;
  isTyping: boolean;
  error: ChatError | null;
  onSendMessage: (content: string) => void;
  onRetry?: () => void;
  theme: ChatTheme;
  i18n: ChatI18nConfig;
  branding: ChatBrandingConfig;
  behavior: ChatBehaviorConfig;
}

export interface ChatHeaderProps {
  onClose: () => void;
  theme: ChatTheme;
  branding: ChatBrandingConfig;
  i18n: ChatI18nConfig;
  connectionStatus: ConnectionStatus;
}

export interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
  theme: ChatTheme;
  behavior: ChatBehaviorConfig;
  onScrollToBottom?: () => void;
  showScrollButton?: boolean;
}

export interface ChatMessageProps {
  message: ChatMessage;
  theme: ChatTheme;
  showTimestamp: boolean;
  timestampFormat: 'relative' | 'absolute';
}

export interface ChatInputProps {
  onSend: (content: string) => void;
  disabled: boolean;
  theme: ChatTheme;
  i18n: ChatI18nConfig;
  behavior: ChatBehaviorConfig;
}

export interface ChatTypingIndicatorProps {
  theme: ChatTheme;
  text?: string;
}

// -----------------------------------------------------------------------------
// HOOK TYPES
// -----------------------------------------------------------------------------

export interface UseChatOptions {
  config: ChatWidgetConfig;
  onMessageSent?: (message: ChatMessage) => void;
  onMessageReceived?: (message: ChatMessage) => void;
  onError?: (error: ChatError) => void;
}

export interface UseChatReturn {
  state: ChatState;
  actions: {
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
    retryLastMessage: () => Promise<void>;
    openChat: () => void;
    closeChat: () => void;
    toggleChat: () => void;
  };
}

// -----------------------------------------------------------------------------
// UTILITY TYPES
// -----------------------------------------------------------------------------

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
