// =============================================================================
// AI REVOLUTION - CHAT LIBRARY INDEX
// =============================================================================
// Exportaciones centralizadas de toda la librería de chat
// Versión: 1.0.0
// =============================================================================

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

export type {
  // Message types
  ChatMessage,
  MessageRole,
  MessageStatus,
  MessageMetadata,
  RAGSource,
  
  // State types
  ChatState,
  ChatError,
  ConnectionStatus,
  
  // API types
  SendMessageRequest,
  SendMessageResponse,
  ChatAPIConfig,
  
  // Theme types
  ChatTheme,
  ChatThemeColors,
  ChatThemeDimensions,
  ChatThemeTypography,
  ChatThemeAnimations,
  ChatThemePosition,
  ChatThemeShadows,
  ChatThemeBorders,
  
  // Config types
  ChatWidgetConfig,
  ChatBehaviorConfig,
  ChatI18nConfig,
  ChatBrandingConfig,
  
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
  RequiredFields,
} from './types';

// -----------------------------------------------------------------------------
// THEME
// -----------------------------------------------------------------------------

export {
  // Theme
  aiRevolutionTheme,
  themePresets,
  
  // Config defaults
  defaultChatConfig,
  defaultBehaviorConfig,
  defaultI18nConfig,
  defaultBrandingConfig,
  defaultApiConfig,
  
  // Creators
  createChatConfig,
  createTheme,
  
  // Utilities
  generateCSSVariables,
  deepMerge,
} from './theme';

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

export {
  // API Client
  ChatAPI,
  getChatAPI,
  resetChatAPI,
  
  // Session management
  getOrCreateSession,
  clearSession,
  generateSessionId,
  
  // Message persistence
  saveMessages,
  loadMessages,
  
  // Message factories
  generateMessageId,
  createUserMessage,
  createAssistantMessage,
  createSystemMessage,
  
  // Formatters (legacy exports for compatibility)
  formatRelativeTime,
  formatAbsoluteTime,
  
  // Types
  type StoredSession,
} from './api';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------

export {
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
} from './constants';

// -----------------------------------------------------------------------------
// UTILITIES
// -----------------------------------------------------------------------------

export {
  // String utilities
  truncateText,
  capitalize,
  sanitizeHTML,
  escapeRegex,
  normalizeWhitespace,
  
  // Markdown utilities
  parseMarkdown,
  linkifyUrls,
  linkifyEmails,
  
  // Date/Time utilities
  formatRelativeTime as formatRelative,
  formatAbsoluteTime as formatTime,
  formatAbsoluteDate as formatDate,
  formatDateTime,
  isSameDay,
  isToday,
  isYesterday,
  
  // ID generation
  generateMessageId as createMessageId,
  generateSessionId as createSessionId,
  generateUUID,
  
  // Validation
  validateMessage,
  isValidUrl,
  isValidEmail,
  
  // Browser detection
  isMobile,
  isTablet,
  prefersReducedMotion,
  prefersDarkMode,
  isTouchDevice,
  
  // Clipboard
  copyToClipboard,
  
  // Storage
  safeLocalStorage,
  
  // Debounce/Throttle
  debounce,
  throttle,
  
  // Async utilities
  delay,
  retry,
  withTimeout,
  
  // DOM utilities
  scrollToElement,
  scrollToBottom,
  isElementVisible,
  getFocusableElements,
  
  // Logger
  logger,
} from './utils';

// -----------------------------------------------------------------------------
// DEFAULT EXPORT
// -----------------------------------------------------------------------------

import { aiRevolutionTheme } from './theme';
import { ChatAPI } from './api';
import constants from './constants';
import utils from './utils';

export default {
  theme: aiRevolutionTheme,
  API: ChatAPI,
  constants,
  utils,
};
