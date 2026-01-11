// =============================================================================
// AI REVOLUTION - CHAT WINDOW
// =============================================================================
// Ventana principal del chat que compone todos los sub-componentes
// Versión: 1.0.0
// =============================================================================

import React, { useRef, useEffect } from 'react';
import type { ChatWindowProps, ConnectionStatus } from '../../lib/chat/types';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface ExtendedChatWindowProps extends ChatWindowProps {
  connectionStatus?: ConnectionStatus;
}

const ChatWindow: React.FC<ExtendedChatWindowProps> = ({
  isOpen,
  onClose,
  messages,
  isLoading,
  isTyping,
  error,
  onSendMessage,
  onRetry,
  theme,
  i18n,
  branding,
  behavior,
  connectionStatus = 'connected',
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  // Focus trap cuando se abre
  useEffect(() => {
    if (!isOpen || !windowRef.current) return;

    const focusableElements = windowRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus en el input de texto
    const textInput = windowRef.current.querySelector('textarea');
    textInput?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // No renderizar si está cerrado
  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className="air-chat-window"
      role="dialog"
      aria-modal="true"
      aria-label="Chat de AI Revolution"
      style={{
        position: 'fixed',
        bottom: `calc(${theme.position.bottom} + ${theme.dimensions.launcher.size} + ${theme.dimensions.spacing.md})`,
        right: theme.position.right,
        width: theme.dimensions.width,
        maxWidth: theme.dimensions.maxWidth,
        height: theme.dimensions.height,
        maxHeight: theme.dimensions.maxHeight,
        minHeight: theme.dimensions.minHeight,
        borderRadius: theme.borders.radius.window,
        overflow: 'hidden',
        zIndex: theme.position.zIndex.window,
        boxShadow: theme.shadows.window,
        display: 'flex',
        flexDirection: 'column',
        background: theme.colors.background.chat,
        fontFamily: theme.typography.fontFamily,
        animation: 'airChatWindowOpen 0.3s ease-out',
        transformOrigin: 'bottom right',
      }}
    >
      {/* Header */}
      <ChatHeader
        onClose={onClose}
        theme={theme}
        branding={branding}
        i18n={i18n}
        connectionStatus={connectionStatus}
      />

      {/* Messages container */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          theme={theme}
          behavior={behavior}
        />

        {/* Error banner */}
        {error && error.retryable && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: theme.dimensions.spacing.md,
              background: `linear-gradient(to top, ${theme.colors.primaryDark}, transparent)`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: theme.dimensions.spacing.sm,
                background: 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${theme.colors.status.error}`,
                borderRadius: theme.borders.radius.md,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.dimensions.spacing.sm,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={theme.colors.status.error}
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.primary,
                  }}
                >
                  {error.message}
                </span>
              </div>
              {onRetry && (
                <button
                  onClick={onRetry}
                  style={{
                    padding: `${theme.dimensions.spacing.xs} ${theme.dimensions.spacing.md}`,
                    background: theme.colors.status.error,
                    color: 'white',
                    border: 'none',
                    borderRadius: theme.borders.radius.sm,
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    cursor: 'pointer',
                    transition: theme.animations.transitions.all,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {i18n.messages.errorRetry}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={onSendMessage}
        disabled={isLoading}
        theme={theme}
        i18n={i18n}
        behavior={behavior}
      />

      {/* Powered by (opcional) */}
      {branding.showPoweredBy && (
        <div
          style={{
            padding: theme.dimensions.spacing.sm,
            textAlign: 'center',
            borderTop: `1px solid ${theme.colors.input.border}`,
            background: theme.colors.background.input,
          }}
        >
          <a
            href={branding.poweredByUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.muted,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: theme.dimensions.spacing.xs,
              transition: theme.animations.transitions.colors,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = theme.colors.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.colors.text.muted;
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            {i18n.messages.poweredBy}
          </a>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes airChatWindowOpen {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        /* Mobile styles */
        @media (max-width: 480px) {
          .air-chat-window {
            width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh !important;
            bottom: 0 !important;
            right: 0 !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatWindow;
