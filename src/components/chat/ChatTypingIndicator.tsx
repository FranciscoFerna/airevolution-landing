// =============================================================================
// AI REVOLUTION - CHAT TYPING INDICATOR
// =============================================================================
// Indicador animado de que el asistente está escribiendo
// Versión: 1.0.0
// =============================================================================

import React from 'react';
import type { ChatTypingIndicatorProps } from '../../lib/chat/types';

const ChatTypingIndicator: React.FC<ChatTypingIndicatorProps> = ({
  theme,
  text = 'Escribiendo',
}) => {
  return (
    <div 
      className="air-chat-typing-indicator"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: theme.dimensions.spacing.sm,
        padding: `${theme.dimensions.spacing.sm} ${theme.dimensions.spacing.md}`,
        maxWidth: theme.dimensions.message.maxWidth,
      }}
    >
      {/* Avatar del bot */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: theme.borders.radius.full,
          background: theme.colors.background.launcher,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M12 12L2 12" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>

      {/* Bubble con dots */}
      <div
        style={{
          background: theme.colors.message.assistant.background,
          border: `1px solid ${theme.colors.message.assistant.border}`,
          borderRadius: `${theme.borders.radius.message} ${theme.borders.radius.message} ${theme.borders.radius.message} 4px`,
          padding: theme.dimensions.message.padding,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {/* Animated dots */}
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: theme.colors.accent,
                opacity: 0.6,
                animation: `airChatTypingBounce 1.4s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
          
          {/* Optional text */}
          {text && (
            <span
              style={{
                marginLeft: '8px',
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.muted,
              }}
            >
              {text}
            </span>
          )}
        </div>
      </div>

      {/* Keyframes via style tag */}
      <style>{`
        @keyframes airChatTypingBounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatTypingIndicator;
