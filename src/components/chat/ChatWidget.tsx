// =============================================================================
// AI REVOLUTION - CHAT WIDGET (MAIN COMPONENT)
// =============================================================================
// Componente principal que integra todo el sistema de chat
// Usa el hook useChat para la lógica y compone los sub-componentes
// Versión: 1.0.0
// =============================================================================

"use client";

import React, { useEffect, useMemo, useCallback } from 'react';
import type { ChatWidgetProps, DeepPartial, ChatWidgetConfig } from '../../lib/chat/types';
import { createChatConfig, generateCSSVariables } from '../../lib/chat/theme';
import { useChat, useCookieBannerDetection, useUnreadCount, useKeyboardShortcuts } from '../../hooks/useChat';
import ChatLauncher from './ChatLauncher';
import ChatWindow from './ChatWindow';

const ChatWidget: React.FC<ChatWidgetProps> = ({
  config: customConfig,
  onOpen,
  onClose,
  onMessageSent,
  onMessageReceived,
  onError,
}) => {
  // Crear configuración completa
  const config = useMemo(
    () => createChatConfig(customConfig as DeepPartial<ChatWidgetConfig>),
    [customConfig]
  );

  // Hook principal del chat
  const { state, actions } = useChat({
    config,
    onMessageSent,
    onMessageReceived,
    onError,
  });

  // Detectar cookie banner
  const cookieBannerVisible = useCookieBannerDetection();

  // Contador de mensajes no leídos
  const unreadCount = useUnreadCount(state.messages, state.isOpen);

  // Keyboard shortcuts
  useKeyboardShortcuts(state.isOpen, actions.closeChat, actions.toggleChat);

  // Callbacks con efectos secundarios
  const handleOpen = useCallback(() => {
    actions.openChat();
    onOpen?.();
  }, [actions, onOpen]);

  const handleClose = useCallback(() => {
    actions.closeChat();
    onClose?.();
  }, [actions, onClose]);

  const handleToggle = useCallback(() => {
    if (state.isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [state.isOpen, handleOpen, handleClose]);

  // Auto-open después de delay (si está configurado)
  useEffect(() => {
    const delay = config.behavior.autoOpenDelay;
    if (delay <= 0 || state.isOpen) return;

    const timer = setTimeout(() => {
      handleOpen();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [config.behavior.autoOpenDelay, state.isOpen, handleOpen]);

  // Generar CSS variables
  const cssVariables = useMemo(
    () => generateCSSVariables(config.theme),
    [config.theme]
  );

  return (
    <>
      {/* Global CSS variables */}
      <style>{`
        :root {
          ${cssVariables}
        }
        
        /* Base styles for all chat components */
        .air-chat-widget,
        .air-chat-widget * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .air-chat-widget {
          font-family: ${config.theme.typography.fontFamily};
          font-size: ${config.theme.typography.fontSize.base};
          line-height: ${config.theme.typography.lineHeight.normal};
          color: ${config.theme.colors.text.primary};
        }
        
        /* Focus styles */
        .air-chat-widget button:focus-visible,
        .air-chat-widget textarea:focus-visible,
        .air-chat-widget input:focus-visible {
          outline: 2px solid ${config.theme.colors.accent};
          outline-offset: 2px;
        }
        
        /* Selection */
        .air-chat-widget ::selection {
          background: ${config.theme.colors.accent};
          color: white;
        }
      `}</style>

      {/* Widget container */}
      <div className="air-chat-widget" data-open={state.isOpen}>
        {/* Chat Window */}
        <ChatWindow
          isOpen={state.isOpen}
          onClose={handleClose}
          messages={state.messages}
          isLoading={state.isLoading}
          isTyping={state.isTyping}
          error={state.error}
          onSendMessage={actions.sendMessage}
          onRetry={actions.retryLastMessage}
          theme={config.theme}
          i18n={config.i18n}
          branding={config.branding}
          behavior={config.behavior}
          connectionStatus={state.connectionStatus}
        />

        {/* Launcher Button */}
        <ChatLauncher
          isOpen={state.isOpen}
          onClick={handleToggle}
          unreadCount={unreadCount}
          theme={config.theme}
          animation={config.behavior.launcherAnimation}
          cookieBannerVisible={cookieBannerVisible}
        />
      </div>
    </>
  );
};

// Named export para importaciones específicas
export { ChatWidget };

// Default export
export default ChatWidget;
