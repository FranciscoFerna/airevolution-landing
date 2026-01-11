// =============================================================================
// AI REVOLUTION - CHAT COMPONENTS INDEX
// =============================================================================
// Exportaciones centralizadas de todos los componentes del chat
// Versión: 1.0.0
// =============================================================================

// Main Widget
export { default as ChatWidget } from './ChatWidget';
export { ChatWidget as AIRevolutionChat } from './ChatWidget';

// Sub-components (para uso avanzado)
export { default as ChatLauncher } from './ChatLauncher';
export { default as ChatWindow } from './ChatWindow';
export { default as ChatHeader } from './ChatHeader';
export { default as ChatMessages } from './ChatMessages';
export { default as ChatMessage } from './ChatMessage';
export { default as ChatInput } from './ChatInput';
export { default as ChatTypingIndicator } from './ChatTypingIndicator';

// Re-export types
export type {
  // Message types
  ChatMessage as ChatMessageType,
  MessageRole,
  MessageStatus,
  MessageMetadata,
  
  // State types
  ChatState,
  ChatError,
  ConnectionStatus,
  
  // Config types
  ChatWidgetConfig,
  ChatTheme,
  ChatThemeColors,
  ChatThemeDimensions,
  ChatThemeTypography,
  ChatThemeAnimations,
  ChatThemePosition,
  ChatThemeShadows,
  ChatThemeBorders,
  ChatBehaviorConfig,
  ChatI18nConfig,
  ChatBrandingConfig,
  ChatAPIConfig,
  
  // Component props
  ChatWidgetProps,
  ChatLauncherProps,
  ChatWindowProps,
  ChatHeaderProps,
  ChatMessagesProps,
  ChatMessageProps,
  ChatInputProps,
  ChatTypingIndicatorProps,
  
  // Hook types
  UseChatOptions,
  UseChatReturn,
  
  // Utility types
  DeepPartial,
} from '../../lib/chat/types';

// Re-export theme utilities
export {
  aiRevolutionTheme,
  defaultChatConfig,
  defaultBehaviorConfig,
  defaultI18nConfig,
  defaultBrandingConfig,
  defaultApiConfig,
  createChatConfig,
  createTheme,
  generateCSSVariables,
  themePresets,
} from '../../lib/chat/theme';

// Re-export API utilities
export {
  ChatAPI,
  getChatAPI,
  resetChatAPI,
  getOrCreateSession,
  clearSession,
  saveMessages,
  loadMessages,
  generateSessionId,
  generateMessageId,
  createUserMessage,
  createAssistantMessage,
  createSystemMessage,
  formatRelativeTime,
  formatAbsoluteTime,
} from '../../lib/chat/api';

// Re-export hooks
export {
  useChat,
  useAutoScroll,
  useCookieBannerDetection,
  useKeyboardShortcuts,
  useUnreadCount,
  useFocusTrap,
} from '../../hooks/useChat';
