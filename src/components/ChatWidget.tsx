"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * AI Revolution Chat Widget
 *
 * Diseño premium alineado con el branding:
 * - Colores: #0B0D73 (primary), #6C08B6 (purple), #FC31E6 (pink)
 * - Efectos: Glassmorphism, gradientes, animaciones fluidas
 * - Posición: Adaptativa para evitar conflictos con CookieBanner
 */

export default function N8nChatWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);

  // Detectar si el cookie banner está visible para ajustar posición
  const checkCookieBanner = useCallback(() => {
    const consent = localStorage.getItem("cookie_consent");
    setIsCookieBannerVisible(!consent);
  }, []);

  useEffect(() => {
    checkCookieBanner();

    // Escuchar cambios en el consentimiento
    const handleConsentUpdate = () => {
      setIsCookieBannerVisible(false);
    };

    window.addEventListener("cookieConsentUpdate", handleConsentUpdate);
    return () => window.removeEventListener("cookieConsentUpdate", handleConsentUpdate);
  }, [checkCookieBanner]);

  useEffect(() => {
    let destroyed = false;

    const initChat = async () => {
      // 1. Inyectar CSS base de n8n
      if (!document.getElementById("n8n-chat-style")) {
        const link = document.createElement("link");
        link.id = "n8n-chat-style";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
        document.head.appendChild(link);
      }

      // 2. Cargar script si no existe
      if (document.getElementById("n8n-chat-script")) {
        checkAndInit();
        return;
      }

      const script = document.createElement("script");
      script.id = "n8n-chat-script";
      script.src = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.umd.js";
      script.async = true;
      script.onload = checkAndInit;
      document.body.appendChild(script);
    };

    const checkAndInit = () => {
      if (destroyed) return;

      const n8nLib = (window as any).N8nChat;
      const createChatFunc = (window as any).createChat || (n8nLib && n8nLib.createChat);

      if (typeof createChatFunc === "function") {
        const PROXY_URL = "https://white-field-e6ecai-revolution-proxy.fraanfeernaandeez.workers.dev";

        createChatFunc({
          webhookUrl: `${PROXY_URL}/webhook/f61e1b9f-0f81-46b8-828e-668bfeeeb3eb/chat`,
          mode: "launcher",
          defaultLanguage: "es",
          initialMessages: [
            "¡Hola! 👋",
            "Soy el asistente de AI Revolution. ¿En qué puedo ayudarte hoy?",
          ],
          i18n: {
            es: {
              title: "AI Revolution",
              subtitle: "Asistente de Automatización IA",
              inputPlaceholder: "Escribe tu mensaje aquí…",
              getStarted: "Iniciar conversación",
              closeButtonTooltip: "Cerrar chat",
            },
          },
        });

        // Observar y aplicar estilos personalizados
        observeAndInjectStyles();
        setIsLoaded(true);
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    const observeAndInjectStyles = () => {
      const observer = new MutationObserver(() => {
        const widget = document.querySelector("n8n-chat-widget") as any;
        if (widget?.shadowRoot) {
          injectBrandingStyles(widget.shadowRoot);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    };

    const injectBrandingStyles = (shadow: ShadowRoot) => {
      if (shadow.getElementById("ai-revolution-theme")) return;

      const style = document.createElement("style");
      style.id = "ai-revolution-theme";
      style.textContent = `
        /* =============================================
           AI REVOLUTION - CHAT WIDGET THEME
           Branding: Premium, Tech-Forward, Confiable
           ============================================= */

        /* CSS Variables - Sincronizadas con landing */
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

          /* Override n8n defaults */
          --n8n-chat-primary-color: var(--air-pink) !important;
          --n8n-chat-secondary-color: var(--air-purple) !important;
          --n8n-chat-background-color: var(--air-primary-dark) !important;
          --n8n-chat-font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        }

        /* =============================================
           LAUNCHER BUTTON - Botón flotante principal
           ============================================= */
        .chat-launcher {
          position: fixed !important;
          bottom: 24px !important;
          right: 24px !important;
          z-index: 9990 !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        /* Ajuste cuando hay cookie banner */
        :host([data-cookie-banner="true"]) .chat-launcher {
          bottom: 140px !important;
        }

        .chat-launcher button {
          width: 64px !important;
          height: 64px !important;
          border-radius: 20px !important;
          background: linear-gradient(135deg, var(--air-pink) 0%, var(--air-purple) 100%) !important;
          border: none !important;
          cursor: pointer !important;
          position: relative !important;
          overflow: hidden !important;
          box-shadow:
            0 8px 32px rgba(252, 49, 230, 0.4),
            0 4px 16px rgba(108, 8, 182, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        /* Efecto shimmer en el botón */
        .chat-launcher button::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: -100% !important;
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          ) !important;
          transition: left 0.6s ease !important;
        }

        .chat-launcher button:hover::before {
          left: 100% !important;
        }

        .chat-launcher button:hover {
          transform: translateY(-4px) scale(1.05) !important;
          box-shadow:
            0 12px 40px rgba(252, 49, 230, 0.5),
            0 6px 20px rgba(108, 8, 182, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
        }

        .chat-launcher button:active {
          transform: translateY(-2px) scale(1.02) !important;
        }

        /* Icono del chat */
        .chat-launcher button svg,
        .chat-launcher button img {
          width: 28px !important;
          height: 28px !important;
          color: white !important;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)) !important;
        }

        /* Pulse ring animado */
        .chat-launcher button::after {
          content: '' !important;
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: 20px !important;
          border: 2px solid var(--air-pink) !important;
          transform: translate(-50%, -50%) !important;
          animation: pulseRing 2s ease-out infinite !important;
          pointer-events: none !important;
        }

        @keyframes pulseRing {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        /* Badge de notificación (si hay mensajes nuevos) */
        .chat-launcher .notification-badge {
          position: absolute !important;
          top: -4px !important;
          right: -4px !important;
          width: 20px !important;
          height: 20px !important;
          background: #ef4444 !important;
          border: 3px solid white !important;
          border-radius: 50% !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          color: white !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          animation: bounce 0.5s ease infinite alternate !important;
        }

        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-3px); }
        }

        /* =============================================
           CHAT WINDOW - Ventana principal del chat
           ============================================= */
        .chat-window,
        .chat-container {
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
            0 10px 30px rgba(108, 8, 182, 0.2),
            0 0 0 1px rgba(252, 49, 230, 0.1) !important;
          animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          background: var(--air-primary-dark) !important;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Ajuste mobile */
        @media (max-width: 480px) {
          .chat-window,
          .chat-container {
            width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh !important;
            bottom: 0 !important;
            right: 0 !important;
            border-radius: 0 !important;
          }
        }

        /* =============================================
           HEADER - Cabecera del chat
           ============================================= */
        header,
        .chat-header {
          background: linear-gradient(135deg, var(--air-primary) 0%, var(--air-primary-dark) 100%) !important;
          padding: 20px 24px !important;
          border-bottom: 2px solid var(--air-pink) !important;
          position: relative !important;
          overflow: hidden !important;
        }

        /* Efecto de brillo en header */
        header::before,
        .chat-header::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 1px !important;
          background: linear-gradient(90deg, transparent, var(--air-pink), transparent) !important;
        }

        /* Partículas decorativas en header */
        header::after,
        .chat-header::after {
          content: '' !important;
          position: absolute !important;
          top: 50% !important;
          right: 60px !important;
          width: 80px !important;
          height: 80px !important;
          background: radial-gradient(circle, rgba(252, 49, 230, 0.15) 0%, transparent 70%) !important;
          border-radius: 50% !important;
          transform: translateY(-50%) !important;
          pointer-events: none !important;
        }

        /* Título del chat */
        header h1,
        header .title,
        .chat-header .title {
          font-size: 18px !important;
          font-weight: 700 !important;
          color: var(--air-white) !important;
          margin: 0 0 4px 0 !important;
          letter-spacing: -0.02em !important;
        }

        /* Subtítulo */
        header .subtitle,
        .chat-header .subtitle {
          font-size: 13px !important;
          color: rgba(255, 255, 255, 0.7) !important;
          margin: 0 !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        }

        /* Indicador de estado online */
        header .subtitle::before,
        .chat-header .subtitle::before {
          content: '' !important;
          width: 8px !important;
          height: 8px !important;
          background: #10b981 !important;
          border-radius: 50% !important;
          animation: pulse 2s ease-in-out infinite !important;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        /* Botón cerrar */
        header button,
        .chat-header button,
        .close-button {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 12px !important;
          padding: 8px !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          color: white !important;
        }

        header button:hover,
        .chat-header button:hover,
        .close-button:hover {
          background: rgba(252, 49, 230, 0.2) !important;
          border-color: var(--air-pink) !important;
          transform: scale(1.05) !important;
        }

        /* =============================================
           MESSAGES AREA - Área de mensajes
           ============================================= */
        main,
        .chat-body,
        .messages-container {
          background: linear-gradient(180deg, var(--air-primary-dark) 0%, #0a0a2e 100%) !important;
          padding: 20px !important;
          overflow-y: auto !important;
          scrollbar-width: thin !important;
          scrollbar-color: var(--air-purple) transparent !important;
        }

        /* Custom scrollbar */
        main::-webkit-scrollbar,
        .chat-body::-webkit-scrollbar,
        .messages-container::-webkit-scrollbar {
          width: 6px !important;
        }

        main::-webkit-scrollbar-thumb,
        .chat-body::-webkit-scrollbar-thumb,
        .messages-container::-webkit-scrollbar-thumb {
          background: var(--air-purple) !important;
          border-radius: 3px !important;
        }

        main::-webkit-scrollbar-track,
        .chat-body::-webkit-scrollbar-track,
        .messages-container::-webkit-scrollbar-track {
          background: transparent !important;
        }

        /* =============================================
           MESSAGES - Burbujas de mensajes
           ============================================= */

        /* Mensaje del usuario */
        .message.user,
        .user-message {
          background: linear-gradient(135deg, var(--air-pink) 0%, var(--air-purple) 100%) !important;
          color: white !important;
          padding: 14px 18px !important;
          border-radius: 20px 20px 4px 20px !important;
          margin-left: auto !important;
          max-width: 85% !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          box-shadow:
            0 4px 15px rgba(252, 49, 230, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          animation: messageIn 0.3s ease-out !important;
          position: relative !important;
        }

        /* Mensaje del asistente */
        .message.assistant,
        .assistant-message,
        .bot-message {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(10px) !important;
          color: var(--air-white) !important;
          padding: 14px 18px !important;
          border-radius: 20px 20px 20px 4px !important;
          margin-right: auto !important;
          max-width: 85% !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          border: 1px solid rgba(252, 49, 230, 0.2) !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
          animation: messageIn 0.3s ease-out !important;
          position: relative !important;
        }

        /* Borde lateral de acento */
        .message.assistant::before,
        .assistant-message::before,
        .bot-message::before {
          content: '' !important;
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          bottom: 0 !important;
          width: 3px !important;
          background: linear-gradient(180deg, var(--air-pink), var(--air-purple)) !important;
          border-radius: 3px 0 0 3px !important;
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Espacio entre mensajes */
        .message + .message {
          margin-top: 12px !important;
        }

        /* Timestamp de mensajes */
        .message-time,
        .timestamp {
          font-size: 11px !important;
          color: rgba(255, 255, 255, 0.5) !important;
          margin-top: 6px !important;
        }

        /* =============================================
           TYPING INDICATOR - Indicador de escritura
           ============================================= */
        .typing-indicator,
        .typing {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 14px 18px !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border-radius: 20px !important;
          border: 1px solid rgba(252, 49, 230, 0.2) !important;
          width: fit-content !important;
        }

        .typing-indicator span,
        .typing span,
        .typing-dot {
          width: 8px !important;
          height: 8px !important;
          background: var(--air-pink) !important;
          border-radius: 50% !important;
          animation: typingBounce 1.4s ease-in-out infinite !important;
        }

        .typing-indicator span:nth-child(2),
        .typing span:nth-child(2),
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s !important;
        }

        .typing-indicator span:nth-child(3),
        .typing span:nth-child(3),
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s !important;
        }

        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        /* =============================================
           INPUT AREA - Área de entrada de texto
           ============================================= */
        footer,
        .chat-footer,
        .input-container {
          background: var(--air-primary-dark) !important;
          padding: 16px 20px !important;
          border-top: 1px solid rgba(252, 49, 230, 0.2) !important;
        }

        .input-wrapper,
        .chat-input-wrapper {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(252, 49, 230, 0.3) !important;
          border-radius: 16px !important;
          padding: 4px 4px 4px 16px !important;
          transition: all 0.3s ease !important;
        }

        .input-wrapper:focus-within,
        .chat-input-wrapper:focus-within {
          border-color: var(--air-pink) !important;
          box-shadow: 0 0 0 3px rgba(252, 49, 230, 0.15) !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }

        /* Campo de texto */
        input[type="text"],
        textarea,
        .chat-input {
          flex: 1 !important;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          color: var(--air-white) !important;
          font-size: 14px !important;
          font-family: inherit !important;
          padding: 12px 0 !important;
          resize: none !important;
        }

        input::placeholder,
        textarea::placeholder,
        .chat-input::placeholder {
          color: rgba(255, 255, 255, 0.4) !important;
        }

        /* Botón enviar */
        button[type="submit"],
        .send-button {
          width: 44px !important;
          height: 44px !important;
          border-radius: 12px !important;
          background: linear-gradient(135deg, var(--air-pink) 0%, var(--air-purple) 100%) !important;
          border: none !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.3s ease !important;
          flex-shrink: 0 !important;
        }

        button[type="submit"]:hover,
        .send-button:hover {
          transform: scale(1.08) !important;
          box-shadow: 0 4px 15px rgba(252, 49, 230, 0.4) !important;
        }

        button[type="submit"]:active,
        .send-button:active {
          transform: scale(0.95) !important;
        }

        button[type="submit"]:disabled,
        .send-button:disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
          transform: none !important;
        }

        button[type="submit"] svg,
        .send-button svg {
          width: 20px !important;
          height: 20px !important;
          color: white !important;
        }

        /* =============================================
           QUICK REPLIES / SUGGESTIONS
           ============================================= */
        .quick-replies,
        .suggestions {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 8px !important;
          padding: 12px 20px !important;
          background: rgba(0, 0, 0, 0.2) !important;
        }

        .quick-reply,
        .suggestion-chip {
          padding: 8px 16px !important;
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(252, 49, 230, 0.3) !important;
          border-radius: 20px !important;
          color: var(--air-white) !important;
          font-size: 13px !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
        }

        .quick-reply:hover,
        .suggestion-chip:hover {
          background: rgba(252, 49, 230, 0.2) !important;
          border-color: var(--air-pink) !important;
          transform: translateY(-2px) !important;
        }

        /* =============================================
           POWERED BY / BRANDING
           ============================================= */
        .powered-by,
        .branding {
          text-align: center !important;
          padding: 8px !important;
          font-size: 11px !important;
          color: rgba(255, 255, 255, 0.3) !important;
          background: rgba(0, 0, 0, 0.3) !important;
        }

        .powered-by a,
        .branding a {
          color: var(--air-pink) !important;
          text-decoration: none !important;
        }

        /* =============================================
           RESPONSIVE ADJUSTMENTS
           ============================================= */
        @media (max-width: 640px) {
          .chat-launcher {
            bottom: 16px !important;
            right: 16px !important;
          }

          .chat-launcher button {
            width: 56px !important;
            height: 56px !important;
            border-radius: 16px !important;
          }

          .chat-window,
          .chat-container {
            bottom: 80px !important;
            right: 16px !important;
            width: calc(100vw - 32px) !important;
            height: calc(100vh - 100px) !important;
          }
        }

        /* =============================================
           ACCESSIBILITY
           ============================================= */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Focus visible states */
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible {
          outline: 2px solid var(--air-pink) !important;
          outline-offset: 2px !important;
        }
      `;

      shadow.appendChild(style);
    };

    initChat();

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

  return null;
}
