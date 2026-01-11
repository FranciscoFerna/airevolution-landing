// =============================================================================
// AI REVOLUTION - CHAT MESSAGES
// =============================================================================
// Lista de mensajes con scroll automático y botón de scroll
// Versión: 1.0.0
// =============================================================================

import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { ChatMessagesProps } from '../../lib/chat/types';
import ChatMessage from './ChatMessage';
import ChatTypingIndicator from './ChatTypingIndicator';

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  theme,
  behavior,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const isNearBottomRef = useRef(true);

  // Detectar posición del scroll
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    isNearBottomRef.current = isNearBottom;
    setShowScrollButton(!isNearBottom && messages.length > 3);
  }, [messages.length]);

  // Auto-scroll cuando hay nuevos mensajes
  useEffect(() => {
    if (!behavior.autoScroll) return;
    
    const container = containerRef.current;
    if (!container) return;

    // Solo auto-scroll si estamos cerca del fondo
    if (isNearBottomRef.current) {
      requestAnimationFrame(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, [messages, isTyping, behavior.autoScroll]);

  // Scroll manual al fondo
  const scrollToBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div
      className="air-chat-messages"
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: `${theme.dimensions.spacing.md} 0`,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.dimensions.spacing.sm,
        scrollBehavior: 'smooth',
        // Custom scrollbar
        scrollbarWidth: 'thin',
        scrollbarColor: `${theme.colors.scrollbar.thumb} ${theme.colors.scrollbar.track}`,
      }}
    >
      {/* Custom scrollbar styles */}
      <style>{`
        .air-chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .air-chat-messages::-webkit-scrollbar-track {
          background: ${theme.colors.scrollbar.track};
          border-radius: 3px;
        }
        .air-chat-messages::-webkit-scrollbar-thumb {
          background: ${theme.colors.scrollbar.thumb};
          border-radius: 3px;
        }
        .air-chat-messages::-webkit-scrollbar-thumb:hover {
          background: ${theme.colors.scrollbar.thumbHover};
        }
      `}</style>

      {/* Mensajes */}
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          theme={theme}
          showTimestamp={behavior.showTimestamps}
          timestampFormat={behavior.timestampFormat}
        />
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <ChatTypingIndicator theme={theme} />
      )}

      {/* Scroll to bottom button */}
      {behavior.showScrollButton && showScrollButton && (
        <button
          onClick={scrollToBottom}
          aria-label="Ir al final"
          style={{
            position: 'absolute',
            bottom: `calc(${theme.dimensions.input.height} + ${theme.dimensions.spacing.lg})`,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: `${theme.dimensions.spacing.sm} ${theme.dimensions.spacing.md}`,
            background: theme.colors.accent,
            color: 'white',
            border: 'none',
            borderRadius: theme.borders.radius.full,
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.medium,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: theme.dimensions.spacing.xs,
            boxShadow: theme.shadows.md,
            transition: theme.animations.transitions.all,
            zIndex: 10,
            animation: 'airChatFadeInUp 0.3s ease-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) translateY(-2px)';
            e.currentTarget.style.boxShadow = theme.shadows.lg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%)';
            e.currentTarget.style.boxShadow = theme.shadows.md;
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          Nuevos mensajes
        </button>
      )}

      {/* Empty state */}
      {messages.length === 0 && !isTyping && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: theme.dimensions.spacing.xl,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: theme.borders.radius.xl,
              background: theme.colors.background.launcher,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.dimensions.spacing.md,
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p
            style={{
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.base,
              margin: 0,
            }}
          >
            ¡Envía un mensaje para comenzar!
          </p>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes airChatFadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatMessages;
