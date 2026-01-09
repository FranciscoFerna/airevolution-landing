"use client";

import { useEffect } from "react";

export default function N8nChatWidget() {
  useEffect(() => {
    let destroyed = false;

    const initChat = async () => {
      if (!document.getElementById("n8n-chat-style")) {
        const link = document.createElement("link");
        link.id = "n8n-chat-style";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
        document.head.appendChild(link);
      }

      if (document.getElementById("n8n-chat-script")) {
        checkAndInit();
        return;
      }

      const script = document.createElement("script");
      script.id = "n8n-chat-script";
      script.src =
        "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.umd.js";
      script.async = true;
      script.onload = checkAndInit;
      document.body.appendChild(script);
    };

    const checkAndInit = () => {
      if (destroyed) return;

      const n8nLib = (window as any).N8nChat;
      const createChatFunc =
        (window as any).createChat || (n8nLib && n8nLib.createChat);

      if (typeof createChatFunc === "function") {
        const PROXY_URL =
          "https://white-field-e6ecai-revolution-proxy.fraanfeernaandeez.workers.dev";

        createChatFunc({
          webhookUrl: `${PROXY_URL}/webhook/f61e1b9f-0f81-46b8-828e-668bfeeeb3eb/chat`,
          mode: "launcher",
          defaultLanguage: "es",
          initialMessages: [
            "Hola 👋",
            "Soy el asistente de AI Revolution. ¿En qué puedo ayudarte?",
          ],
          i18n: {
            es: {
              title: "AI Revolution",
              subtitle: "Asistente Virtual",
              inputPlaceholder: "Escribe tu mensaje…",
            },
          },
          interfaceConfig: {
            theme: "dark",
            launcherButtonPosition: "bottom-right",
          },
        });

        observeAndInjectStyles();
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
    :host {
      --n8n-chat-primary-color: #FC31E6 !important;
      --n8n-chat-background-color: #000 !important;
      font-family: Inter, system-ui, sans-serif;
    }

    /* HEADER */
    .chat-header {
      background: #000 !important;
      border-bottom: 2px solid #FC31E6 !important;
    }

    .chat-header__title {
      color: white !important;
      font-weight: 700 !important;
    }

    .chat-header__subtitle {
      color: #FC31E6 !important;
    }

    /* CUERPO */
    .chat-body {
      background: #050505 !important;
    }

    /* MENSAJES */
    .message--assistant {
      background: #111 !important;
      border-left: 3px solid #FC31E6 !important;
      color: white !important;
      border-radius: 14px !important;
    }

    .message--user {
      background: #FC31E6 !important;
      color: white !important;
      border-radius: 14px !important;
      font-weight: 500 !important;
    }

    /* INPUT */
    .chat-footer {
      background: #000 !important;
      border-top: 1px solid #1a1a1a !important;
    }

    .chat-input {
      background: #0f0f0f !important;
      color: white !important;
      border-radius: 10px !important;
      border: 1px solid #1f1f1f !important;
    }

    .chat-input:focus {
      border-color: #FC31E6 !important;
    }

    .chat-send-button {
      background: #FC31E6 !important;
      color: white !important;
      border-radius: 10px !important;
      font-weight: 600 !important;
    }

    /* BOTÓN FLOTANTE */
    .launcher-button {
      background: linear-gradient(135deg, #FC31E6 0%, #E91FD8 100%) !important;
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      box-shadow: 0 4px 20px rgba(252, 49, 230, 0.4) !important;
    }

    .launcher-button svg {
      fill: white !important;
    }
  `;

      shadow.appendChild(style);
    };

    initChat();
    return () => {
      destroyed = true;
    };
  }, []);

  return null;
}
