// =============================================================================
// AI REVOLUTION - CHAT THEME CONFIGURATION
// =============================================================================
// Sistema de theming centralizado para el Chat Widget
// Branding: Dark premium con acentos fucsia (#FC31E6)
// Versión: 1.0.0
// =============================================================================

import type {
  ChatTheme,
  ChatWidgetConfig,
  ChatBehaviorConfig,
  ChatI18nConfig,
  ChatBrandingConfig,
  ChatAPIConfig,
  DeepPartial,
} from './types';

// -----------------------------------------------------------------------------
// AI REVOLUTION THEME
// -----------------------------------------------------------------------------

export const aiRevolutionTheme: ChatTheme = {
  colors: {
    primary: '#0B0D73',
    primaryDark: '#050520',
    accent: '#FC31E6',
    accentSecondary: '#6C08B6',

    background: {
      chat: 'linear-gradient(180deg, #050520 0%, #0a0a2e 100%)',
      header: 'linear-gradient(135deg, #0B0D73 0%, #050520 100%)',
      input: '#050520',
      launcher: 'linear-gradient(135deg, #FC31E6 0%, #6C08B6 100%)',
      overlay: 'rgba(5, 5, 32, 0.8)',
    },

    message: {
      user: {
        background: 'linear-gradient(135deg, #FC31E6 0%, #6C08B6 100%)',
        text: '#ffffff',
      },
      assistant: {
        background: 'rgba(255, 255, 255, 0.05)',
        text: '#ffffff',
        border: 'rgba(252, 49, 230, 0.2)',
      },
      system: {
        background: 'rgba(108, 8, 182, 0.1)',
        text: 'rgba(255, 255, 255, 0.7)',
      },
    },

    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      muted: 'rgba(255, 255, 255, 0.4)',
      inverse: '#0B0D73',
    },

    status: {
      online: '#10b981',
      offline: '#6b7280',
      error: '#ef4444',
      warning: '#f59e0b',
    },

    input: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(252, 49, 230, 0.3)',
      borderFocus: '#FC31E6',
      placeholder: 'rgba(255, 255, 255, 0.4)',
      text: '#ffffff',
    },

    scrollbar: {
      track: 'rgba(255, 255, 255, 0.05)',
      thumb: 'rgba(252, 49, 230, 0.3)',
      thumbHover: 'rgba(252, 49, 230, 0.5)',
    },
  },

  dimensions: {
    width: '400px',
    maxWidth: 'calc(100vw - 48px)',
    height: '600px',
    maxHeight: 'calc(100vh - 140px)',
    minHeight: '400px',

    launcher: {
      size: '64px',
      iconSize: '28px',
    },

    header: {
      height: '72px',
    },

    input: {
      height: '56px',
      minHeight: '56px',
      maxHeight: '120px',
    },

    message: {
      maxWidth: '85%',
      padding: '14px 18px',
    },

    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },

  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontFamilyMono: "'JetBrains Mono', 'Fira Code', Consolas, monospace",

    fontSize: {
      xs: '11px',
      sm: '13px',
      base: '14px',
      lg: '16px',
      xl: '18px',
    },

    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },

    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    },

    transitions: {
      all: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      colors: 'background-color 300ms, border-color 300ms, color 300ms',
    },
  },

  position: {
    bottom: '24px',
    right: '24px',
    zIndex: {
      launcher: 9990,
      window: 9991,
      overlay: 9989,
    },
  },

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    launcher: '0 8px 32px rgba(252, 49, 230, 0.4), 0 4px 16px rgba(108, 8, 182, 0.3)',
    launcherHover: '0 12px 40px rgba(252, 49, 230, 0.5), 0 6px 20px rgba(108, 8, 182, 0.4)',
    window: '0 25px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(108, 8, 182, 0.2)',
    message: '0 4px 15px rgba(252, 49, 230, 0.2)',
  },

  borders: {
    radius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
      window: '24px',
      launcher: '20px',
      message: '20px',
      input: '12px',
    },

    width: {
      thin: '1px',
      normal: '2px',
      thick: '3px',
    },
  },
};

// -----------------------------------------------------------------------------
// DEFAULT BEHAVIOR CONFIG
// -----------------------------------------------------------------------------

export const defaultBehaviorConfig: ChatBehaviorConfig = {
  autoOpenDelay: 0, // Desactivado por defecto
  showTypingIndicator: true,
  persistSession: true,
  sessionDuration: 60, // 60 minutos
  maxMessages: 100,
  enableSounds: false,
  showTimestamps: true,
  timestampFormat: 'relative',
  dynamicPlaceholder: false,
  autoScroll: true,
  showScrollButton: true,
  closeOnOutsideClick: false,
  launcherAnimation: 'pulse',
  showUnreadBadge: true,
};

// -----------------------------------------------------------------------------
// DEFAULT I18N CONFIG (Spanish)
// -----------------------------------------------------------------------------

export const defaultI18nConfig: ChatI18nConfig = {
  locale: 'es-ES',
  messages: {
    headerTitle: 'AI Revolution',
    headerSubtitle: 'Asistente de Automatización IA',
    inputPlaceholder: 'Escribe tu mensaje aquí...',
    sendButton: 'Enviar',
    typingIndicator: 'Escribiendo...',
    connectionError: 'Error de conexión. Por favor, inténtalo de nuevo.',
    reconnecting: 'Reconectando...',
    welcomeMessage: '¡Hola! 👋 Soy el asistente de AI Revolution. ¿En qué puedo ayudarte hoy?',
    poweredBy: 'Powered by AI Revolution',
    scrollToBottom: 'Ir al final',
    newMessages: 'Nuevos mensajes',
    errorRetry: 'Reintentar',
    close: 'Cerrar chat',
    minimize: 'Minimizar',
  },
};

// -----------------------------------------------------------------------------
// DEFAULT BRANDING CONFIG
// -----------------------------------------------------------------------------

export const defaultBrandingConfig: ChatBrandingConfig = {
  name: 'AI Revolution',
  logoUrl: '/logo.png',
  botAvatarUrl: undefined, // Usará un avatar generado
  showPoweredBy: false,
  poweredByUrl: 'https://airevolution.es',
  faviconUrl: '/favicon.svg',
};

// -----------------------------------------------------------------------------
// DEFAULT API CONFIG
// -----------------------------------------------------------------------------

/**
 * Obtener URL del webhook desde variables de entorno
 * Prioridad: PUBLIC_N8N_CHAT_WEBHOOK_URL > construir desde PROXY + ID
 */
function getWebhookUrl(): string {
  // Opción 1: URL completa desde variable de entorno
  const fullUrl = import.meta.env.PUBLIC_N8N_CHAT_WEBHOOK_URL;
  if (fullUrl) {
    return fullUrl;
  }

  // Opción 2: Construir desde proxy + ID
  const proxy = import.meta.env.PUBLIC_N8N_WEBHOOK_PROXY;
  const webhookId = import.meta.env.PUBLIC_N8N_WEBHOOK_ID;
  
  if (proxy && webhookId) {
    return `${proxy}/webhook/${webhookId}/chat`;
  }

  // ⚠️ FALLBACK SOLO PARA DESARROLLO LOCAL
  // Este valor es temporal y SOLO se usa si no hay variables de entorno configuradas
  // En producción, esto NUNCA debería ejecutarse - se lanzará un error si falta la variable
  if (import.meta.env.DEV) {
    console.warn(
      '[ChatAPI] ⚠️ No se encontró PUBLIC_N8N_CHAT_WEBHOOK_URL. ' +
      'Usando URL por defecto SOLO para desarrollo. ' +
      'Configura PUBLIC_N8N_CHAT_WEBHOOK_URL en producción.'
    );
    // Valor temporal solo para desarrollo - NO usar en producción
    return 'https://white-field-e6ecai-revolution-proxy.fraanfeernaandeez.workers.dev/webhook/f61e1b9f-0f81-46b8-828e-668bfeeeb3eb/chat';
  }

  // En producción, lanzar error si no está configurado
  throw new Error(
    'PUBLIC_N8N_CHAT_WEBHOOK_URL no está configurado. ' +
    'Por favor, configura la variable de entorno PUBLIC_N8N_CHAT_WEBHOOK_URL o ' +
    'PUBLIC_N8N_WEBHOOK_PROXY + PUBLIC_N8N_WEBHOOK_ID'
  );
}

export const defaultApiConfig: ChatAPIConfig = {
  webhookUrl: getWebhookUrl(),
  timeout: 30000, // 30 segundos
  retries: 2,
  headers: {
    'Content-Type': 'application/json',
  },
};

// -----------------------------------------------------------------------------
// DEFAULT COMPLETE CONFIG
// -----------------------------------------------------------------------------

export const defaultChatConfig: ChatWidgetConfig = {
  api: defaultApiConfig,
  theme: aiRevolutionTheme,
  behavior: defaultBehaviorConfig,
  i18n: defaultI18nConfig,
  branding: defaultBrandingConfig,
};

// -----------------------------------------------------------------------------
// THEME UTILITIES
// -----------------------------------------------------------------------------

/**
 * Deep merge de objetos para combinar configuraciones
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: DeepPartial<T>): T {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key as keyof typeof source];
      const targetValue = target[key as keyof typeof target];

      if (isObject(sourceValue) && isObject(targetValue)) {
        (output as any)[key] = deepMerge(targetValue, sourceValue as any);
      } else if (sourceValue !== undefined) {
        (output as any)[key] = sourceValue;
      }
    });
  }

  return output;
}

function isObject(item: unknown): item is Record<string, unknown> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Crear configuración personalizada a partir de la configuración por defecto
 */
export function createChatConfig(
  customConfig?: DeepPartial<ChatWidgetConfig>
): ChatWidgetConfig {
  if (!customConfig) {
    return defaultChatConfig;
  }

  return deepMerge(defaultChatConfig, customConfig);
}

/**
 * Crear tema personalizado a partir del tema base
 */
export function createTheme(customTheme?: DeepPartial<ChatTheme>): ChatTheme {
  if (!customTheme) {
    return aiRevolutionTheme;
  }

  return deepMerge(aiRevolutionTheme, customTheme);
}

/**
 * Generar CSS custom properties a partir del tema
 */
export function generateCSSVariables(theme: ChatTheme): string {
  return `
    --chat-color-primary: ${theme.colors.primary};
    --chat-color-primary-dark: ${theme.colors.primaryDark};
    --chat-color-accent: ${theme.colors.accent};
    --chat-color-accent-secondary: ${theme.colors.accentSecondary};
    --chat-color-text-primary: ${theme.colors.text.primary};
    --chat-color-text-secondary: ${theme.colors.text.secondary};
    --chat-color-text-muted: ${theme.colors.text.muted};
    --chat-bg-chat: ${theme.colors.background.chat};
    --chat-bg-header: ${theme.colors.background.header};
    --chat-bg-input: ${theme.colors.background.input};
    --chat-bg-launcher: ${theme.colors.background.launcher};
    --chat-width: ${theme.dimensions.width};
    --chat-height: ${theme.dimensions.height};
    --chat-launcher-size: ${theme.dimensions.launcher.size};
    --chat-border-radius-window: ${theme.borders.radius.window};
    --chat-border-radius-launcher: ${theme.borders.radius.launcher};
    --chat-border-radius-message: ${theme.borders.radius.message};
    --chat-shadow-launcher: ${theme.shadows.launcher};
    --chat-shadow-window: ${theme.shadows.window};
    --chat-font-family: ${theme.typography.fontFamily};
    --chat-animation-duration: ${theme.animations.duration.normal};
    --chat-animation-easing: ${theme.animations.easing.default};
    --chat-z-index-launcher: ${theme.position.zIndex.launcher};
    --chat-z-index-window: ${theme.position.zIndex.window};
    --chat-position-bottom: ${theme.position.bottom};
    --chat-position-right: ${theme.position.right};
  `.trim();
}

/**
 * Presets de temas alternativos
 */
export const themePresets = {
  aiRevolution: aiRevolutionTheme,

  // Tema claro (para futuras variantes)
  light: createTheme({
    colors: {
      primary: '#0B0D73',
      primaryDark: '#050520',
      accent: '#FC31E6',
      accentSecondary: '#6C08B6',
      background: {
        chat: '#ffffff',
        header: 'linear-gradient(135deg, #0B0D73 0%, #6C08B6 100%)',
        input: '#f8fafc',
        launcher: 'linear-gradient(135deg, #FC31E6 0%, #6C08B6 100%)',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      message: {
        user: {
          background: 'linear-gradient(135deg, #FC31E6 0%, #6C08B6 100%)',
          text: '#ffffff',
        },
        assistant: {
          background: '#f1f5f9',
          text: '#0B0D73',
          border: '#e2e8f0',
        },
        system: {
          background: '#f8fafc',
          text: '#64748b',
        },
      },
      text: {
        primary: '#0B0D73',
        secondary: '#475569',
        muted: '#94a3b8',
        inverse: '#ffffff',
      },
      input: {
        background: '#ffffff',
        border: '#e2e8f0',
        borderFocus: '#FC31E6',
        placeholder: '#94a3b8',
        text: '#0B0D73',
      },
    },
  }),

  // Tema minimalista
  minimal: createTheme({
    colors: {
      background: {
        chat: '#1a1a1a',
        header: '#1a1a1a',
        input: '#1a1a1a',
        launcher: '#FC31E6',
        overlay: 'rgba(0, 0, 0, 0.8)',
      },
      message: {
        user: {
          background: '#FC31E6',
          text: '#ffffff',
        },
        assistant: {
          background: '#2a2a2a',
          text: '#ffffff',
          border: '#3a3a3a',
        },
      },
    },
    borders: {
      radius: {
        sm: '2px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        full: '9999px',
        window: '12px',
        launcher: '12px',
        message: '12px',
        input: '6px',
      },
    },
  }),
};

export default aiRevolutionTheme;
