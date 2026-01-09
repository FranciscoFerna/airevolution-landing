"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * AI Revolution Chat Widget - v2.0
 *
 * Solución completa para el chat con n8n:
 * - Manejo correcto de CSP
 * - Estilos inline para evitar bloqueos de CSS externo
 * - Detección de errores con fallbacks
 * - Diseño premium alineado con branding
 */

// Configuración del proxy y webhook
const CHAT_CONFIG = {
  proxyUrl: "https://white-field-e6ecai-revolution-proxy.fraanfeernaandeez.workers.dev",
  webhookPath: "/webhook/f61e1b9f-0f81-46b8-828e-668bfeeeb3eb/chat",
  cdnBase: "https://cdn.jsdelivr.net/npm/@n8n/chat/dist",
};

export default function N8nChatWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);

  // Detectar si el cookie banner está visible
  const checkCookieBanner = useCallback(() => {
    if (typeof window === "undefined") return;
    const consent = localStorage.getItem("cookie_consent");
    setIsCookieBannerVisible(!consent);
  }, []);

  useEffect(() => {
    checkCookieBanner();

    const handleConsentUpdate = () => {
      setIsCookieBannerVisible(false);
    };

    window.addEventListener("cookieConsentUpdate", handleConsentUpdate);
    window.addEventListener("storage", checkCookieBanner);

    return () => {
      window.removeEventListener("cookieConsentUpdate", handleConsentUpdate);
      window.removeEventListener("storage", checkCookieBanner);
    };
  }, [checkCookieBanner]);

  useEffect(() => {
    let destroyed = false;
    let retryCount = 0;
    const maxRetries = 3;

    const injectInlineStyles = () => {
      // Inyectar estilos CSS inline para evitar problemas de CSP con stylesheets externos
      if (document.getElementById("n8n-chat-inline-styles")) return;

      const style = document.createElement("style");
      style.id = "n8n-chat-inline-styles";
      style.textContent = `
        /* n8n Chat Base Styles - Inline para evitar CSP */
        n8n-chat-widget {
          --chat--color-primary: #FC31E6;
          --chat--color-primary-shade-50: #fc31e633;
          --chat--color-primary-shade-100: #fc31e666;
          --chat--color-secondary: #6C08B6;
          --chat--color-secondary-shade-50: #6c08b633;
          --chat--color-white: #ffffff;
          --chat--color-light: #f8fafc;
          --chat--color-light-shade-50: #f1f5f9;
          --chat--color-medium: #94a3b8;
          --chat--color-dark: #0B0D73;
          --chat--color-disabled: #cbd5e1;
          --chat--color-typing: #64748b;
          --chat--spacing: 1rem;
          --chat--border-radius: 1rem;
          --chat--transition-duration: 0.2s;
          --chat--window-width: 400px;
          --chat--window-height: 600px;
          --chat--header-height: 64px;
          --chat--textarea-height: 50px;
          --chat--font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-family: var(--chat--font-family);
        }
      `;
      document.head.appendChild(style);
    };

    const loadScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Verificar si ya existe
        if (document.getElementById("n8n-chat-script")) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.id = "n8n-chat-script";
        script.src = `${CHAT_CONFIG.cdnBase}/chat.bundle.umd.js`;
        script.async = true;

        script.onload = () => {
          console.log("✅ n8n Chat script loaded successfully");
          resolve();
        };

        script.onerror = (error) => {
          console.error("❌ Failed to load n8n Chat script:", error);
          reject(new Error("Failed to load chat script"));
        };

        document.body.appendChild(script);
      });
    };

    const loadStylesheet = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Verificar si ya existe
        if (document.getElementById("n8n-chat-style")) {
          resolve();
          return;
        }

        const link = document.createElement("link");
        link.id = "n8n-chat-style";
        link.rel = "stylesheet";
        link.href = `${CHAT_CONFIG.cdnBase}/style.css`;

        link.onload = () => {
          console.log("✅ n8n Chat stylesheet loaded successfully");
          resolve();
        };

        link.onerror = () => {
          console.warn("⚠️ Failed to load external stylesheet, using inline styles");
          // No rechazar, usar estilos inline como fallback
          resolve();
        };

        document.head.appendChild(link);
      });
    };

    const initializeChat = async () => {
      if (destroyed) return;

      const n8nLib = (window as any).N8nChat;
      const createChatFunc = (window as any).createChat || (n8nLib && n8nLib.createChat);

      if (typeof createChatFunc !== "function") {
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`⏳ Waiting for n8n Chat library... (attempt ${retryCount}/${maxRetries})`);
          setTimeout(initializeChat, 500);
          return;
        }
        throw new Error("n8n Chat library not available after max retries");
      }

      console.log("🚀 Initializing n8n Chat...");

      createChatFunc({
        webhookUrl: `${CHAT_CONFIG.proxyUrl}${CHAT_CONFIG.webhookPath}`,
        mode: "window", // Cambiado a 'window' para mejor control
        target: "#n8n-chat-container",
        showWelcomeScreen: true,
        defaultLanguage: "es",
        initialMessages: [
          "¡Hola! 👋",
          "Soy el asistente de AI Revolution. ¿En qué puedo ayudarte hoy?",
        ],
        i18n: {
          es: {
            title: "AI Revolution",
            subtitle: "Asistente de Automatización IA",
            footer: "",
            getStarted: "Iniciar conversación",
            inputPlaceholder: "Escribe tu mensaje aquí…",
            closeButtonTooltip: "Cerrar chat",
          },
        },
        metadata: {
          source: "landing_page",
          timestamp: new Date().toISOString(),
        },
      });

      // Inyectar estilos de branding personalizados
      setTimeout(() => {
        injectBrandingStyles();
      }, 100);

      setIsLoaded(true);
      setHasError(false);
      console.log("✅ n8n Chat initialized successfully");
    };

    const injectBrandingStyles = () => {
      // Buscar el widget y aplicar estilos
      const widget = document.querySelector("n8n-chat-widget");
      if (!widget?.shadowRoot) return;

      if (widget.shadowRoot.getElementById("ai-revolution-theme")) return;

      const style = document.createElement("style");
      style.id = "ai-revolution-theme";
      style.textContent = getBrandingCSS();
      widget.shadowRoot.appendChild(style);

      // Observar cambios para reinyectar si es necesario
      const observer = new MutationObserver(() => {
        if (!widget.shadowRoot?.getElementById("ai-revolution-theme")) {
          const newStyle = document.createElement("style");
          newStyle.id = "ai-revolution-theme";
          newStyle.textContent = getBrandingCSS();
          widget.shadowRoot?.appendChild(newStyle);
        }
      });

      observer.observe(widget.shadowRoot, { childList: true, subtree: true });
    };

    const init = async () => {
      try {
        // 1. Inyectar estilos inline primero (siempre funciona)
        injectInlineStyles();

        // 2. Intentar cargar stylesheet externo (puede fallar por CSP)
        await loadStylesheet();

        // 3. Cargar script del chat
        await loadScript();

        // 4. Inicializar chat
        await initializeChat();
      } catch (error) {
        console.error("❌ Chat initialization error:", error);
        if (!destroyed) {
          setHasError(true);
          setErrorMessage(error instanceof Error ? error.message : "Unknown error");
        }
      }
    };

    // Esperar a que el DOM esté listo
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }

    return () => {
      destroyed = true;
    };
  }, []);

  // Actualizar atributo para CSS cuando cambie el estado del cookie banner
  useEffect(() => {
    const widget = document.querySelector("n8n-chat-widget");
    if (widget) {
      widget.setAttribute("data-cookie-banner", isCookieBannerVisible.toString());
    }
  }, [isCookieBannerVisible]);

  // Si hay error, mostrar un botón de contacto alternativo
  if (hasError) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: isCookieBannerVisible ? "140px" : "24px",
          right: "24px",
          zIndex: 9990,
          transition: "bottom 0.3s ease",
        }}
      >
        <a
          href="#cta"
          title="Contactar con AI Revolution"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #FC31E6 0%, #6C08B6 100%)",
            color: "white",
            textDecoration: "none",
            boxShadow: "0 8px 32px rgba(252, 49, 230, 0.4), 0 4px 16px rgba(108, 8, 182, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </a>
      </div>
    );
  }

  // Contenedor para el chat (el widget se inyecta aquí)
  return <div id="n8n-chat-container" />;
}

// CSS de branding separado para mejor mantenimiento
function getBrandingCSS(): string {
  return `
    /* =============================================
       AI REVOLUTION - CHAT WIDGET THEME v2.0
       ============================================= */

    :host {
      --air-primary: #0B0D73;
      --air-primary-dark: #050520;
      --air-purple: #6C08B6;
      --air-pink: #FC31E6;
      --air-white: #ffffff;
      --air-gray-50: #f8fafc;
      --air-gray-100: #f1f5f9;
      --air-gray-200: #e2e8f0;
      --air-gray-400: #94a3b8;
      --air-gray-600: #475569;
      --air-gray-700: #334155;
    }

    /* Launcher Button */
    .chat-launcher,
    [class*="launcher"] {
      position: fixed !important;
      bottom: 24px !important;
      right: 24px !important;
      z-index: 9990 !important;
    }

    :host([data-cookie-banner="true"]) .chat-launcher,
    :host([data-cookie-banner="true"]) [class*="launcher"] {
      bottom: 140px !important;
    }

    .chat-launcher button,
    [class*="launcher"] button {
      width: 64px !important;
      height: 64px !important;
      border-radius: 20px !important;
      background: linear-gradient(135deg, var(--air-pink) 0%, var(--air-purple) 100%) !important;
      border: none !important;
      cursor: pointer !important;
      box-shadow:
        0 8px 32px rgba(252, 49, 230, 0.4),
        0 4px 16px rgba(108, 8, 182, 0.3) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .chat-launcher button:hover,
    [class*="launcher"] button:hover {
      transform: translateY(-4px) scale(1.05) !important;
      box-shadow:
        0 12px 40px rgba(252, 49, 230, 0.5),
        0 6px 20px rgba(108, 8, 182, 0.4) !important;
    }

    .chat-launcher button svg,
    [class*="launcher"] button svg {
      width: 28px !important;
      height: 28px !important;
      color: white !important;
    }

    /* Chat Window */
    .chat-window,
    .chat-container,
    [class*="window"],
    [class*="container"]:not(#n8n-chat-container) {
      position: fixed !important;
      bottom: 100px !important;
      right: 24px !important;
      width: 400px !important;
      max-width: calc(100vw - 48px) !important;
      height: 600px !important;
      max-height: calc(100vh - 140px) !important;
      border-radius: 24px !important;
      overflow: hidden !important;
      z-index: 9991 !important;
      box-shadow:
        0 25px 60px rgba(0, 0, 0, 0.3),
        0 10px 30px rgba(108, 8, 182, 0.2) !important;
      background: var(--air-primary-dark) !important;
    }

    @media (max-width: 480px) {
      .chat-window,
      .chat-container,
      [class*="window"],
      [class*="container"]:not(#n8n-chat-container) {
        width: 100vw !important;
        height: 100vh !important;
        max-height: 100vh !important;
        bottom: 0 !important;
        right: 0 !important;
        border-radius: 0 !important;
      }
    }

    /* Header */
    header,
    .chat-header,
    [class*="header"] {
      background: linear-gradient(135deg, var(--air-primary) 0%, var(--air-primary-dark) 100%) !important;
      padding: 20px 24px !important;
      border-bottom: 2px solid var(--air-pink) !important;
    }

    header h1,
    header .title,
    .chat-header .title,
    [class*="title"] {
      font-size: 18px !important;
      font-weight: 700 !important;
      color: var(--air-white) !important;
    }

    header .subtitle,
    .chat-header .subtitle,
    [class*="subtitle"] {
      font-size: 13px !important;
      color: rgba(255, 255, 255, 0.7) !important;
    }

    /* Messages Area */
    main,
    .chat-body,
    .messages-container,
    [class*="messages"] {
      background: linear-gradient(180deg, var(--air-primary-dark) 0%, #0a0a2e 100%) !important;
      padding: 20px !important;
    }

    /* User Message */
    .message.user,
    .user-message,
    [class*="user"] > [class*="message"],
    [class*="message"][class*="user"] {
      background: linear-gradient(135deg, var(--air-pink) 0%, var(--air-purple) 100%) !important;
      color: white !important;
      padding: 14px 18px !important;
      border-radius: 20px 20px 4px 20px !important;
      margin-left: auto !important;
      max-width: 85% !important;
      box-shadow: 0 4px 15px rgba(252, 49, 230, 0.3) !important;
    }

    /* Bot Message */
    .message.assistant,
    .assistant-message,
    .bot-message,
    [class*="bot"] > [class*="message"],
    [class*="message"][class*="bot"],
    [class*="message"][class*="assistant"] {
      background: rgba(255, 255, 255, 0.05) !important;
      backdrop-filter: blur(10px) !important;
      color: var(--air-white) !important;
      padding: 14px 18px !important;
      border-radius: 20px 20px 20px 4px !important;
      margin-right: auto !important;
      max-width: 85% !important;
      border: 1px solid rgba(252, 49, 230, 0.2) !important;
    }

    /* Input Area */
    footer,
    .chat-footer,
    .input-container,
    [class*="footer"],
    [class*="input"] {
      background: var(--air-primary-dark) !important;
      padding: 16px 20px !important;
      border-top: 1px solid rgba(252, 49, 230, 0.2) !important;
    }

    input[type="text"],
    textarea,
    .chat-input,
    [class*="input"] input,
    [class*="input"] textarea {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(252, 49, 230, 0.3) !important;
      border-radius: 12px !important;
      color: var(--air-white) !important;
      padding: 12px 16px !important;
    }

    input::placeholder,
    textarea::placeholder {
      color: rgba(255, 255, 255, 0.4) !important;
    }

    /* Send Button */
    button[type="submit"],
    .send-button,
    [class*="send"] {
      background: linear-gradient(135deg, var(--air-pink) 0%, var(--air-purple) 100%) !important;
      border: none !important;
      border-radius: 12px !important;
      color: white !important;
      cursor: pointer !important;
      min-width: 44px !important;
      min-height: 44px !important;
    }

    button[type="submit"]:hover,
    .send-button:hover,
    [class*="send"]:hover {
      transform: scale(1.05) !important;
      box-shadow: 0 4px 15px rgba(252, 49, 230, 0.4) !important;
    }

    /* Typing Indicator */
    .typing-indicator,
    .typing,
    [class*="typing"] {
      display: flex !important;
      gap: 6px !important;
      padding: 14px 18px !important;
      background: rgba(255, 255, 255, 0.05) !important;
      border-radius: 20px !important;
    }

    .typing-indicator span,
    .typing span,
    [class*="typing"] span {
      width: 8px !important;
      height: 8px !important;
      background: var(--air-pink) !important;
      border-radius: 50% !important;
      animation: typingBounce 1.4s ease-in-out infinite !important;
    }

    @keyframes typingBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }

    /* Close Button */
    .close-button,
    [class*="close"] {
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      border-radius: 12px !important;
      color: white !important;
    }

    .close-button:hover,
    [class*="close"]:hover {
      background: rgba(252, 49, 230, 0.2) !important;
      border-color: var(--air-pink) !important;
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }

    button:focus-visible,
    input:focus-visible,
    textarea:focus-visible {
      outline: 2px solid var(--air-pink) !important;
      outline-offset: 2px !important;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .chat-launcher button,
      [class*="launcher"] button {
        width: 56px !important;
        height: 56px !important;
        border-radius: 16px !important;
      }
    }
  `;
}
