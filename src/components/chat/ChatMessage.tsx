// =============================================================================
// AI REVOLUTION - CHAT MESSAGE
// =============================================================================
// Componente de mensaje individual
// Soporta mensajes de usuario, asistente y sistema
// Versión: 1.0.0
// =============================================================================

import React, { useMemo } from 'react';
import type { ChatMessageProps } from '../../lib/chat/types';
import { formatRelativeTime, formatAbsoluteTime } from '../../lib/chat/api';

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  theme,
  showTimestamp,
  timestampFormat,
}) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const isError = message.status === 'error';
  const isSending = message.status === 'sending';

  // Formatear timestamp
  const formattedTime = useMemo(() => {
    if (!showTimestamp) return null;
    return timestampFormat === 'relative'
      ? formatRelativeTime(message.timestamp)
      : formatAbsoluteTime(message.timestamp);
  }, [message.timestamp, showTimestamp, timestampFormat]);

  // Estilos según el tipo de mensaje
  const messageStyles = useMemo(() => {
    if (isUser) {
      return {
        container: {
          justifyContent: 'flex-end' as const,
        },
        bubble: {
          background: theme.colors.message.user.background,
          color: theme.colors.message.user.text,
          borderRadius: `${theme.borders.radius.message} ${theme.borders.radius.message} 4px ${theme.borders.radius.message}`,
          boxShadow: theme.shadows.message,
        },
      };
    }
    
    if (isSystem) {
      return {
        container: {
          justifyContent: 'center' as const,
        },
        bubble: {
          background: theme.colors.message.system.background,
          color: theme.colors.message.system.text,
          borderRadius: theme.borders.radius.lg,
          textAlign: 'center' as const,
          fontSize: theme.typography.fontSize.sm,
          maxWidth: '90%',
        },
      };
    }

    // Assistant
    return {
      container: {
        justifyContent: 'flex-start' as const,
      },
      bubble: {
        background: theme.colors.message.assistant.background,
        color: theme.colors.message.assistant.text,
        border: `1px solid ${theme.colors.message.assistant.border}`,
        borderRadius: `${theme.borders.radius.message} ${theme.borders.radius.message} ${theme.borders.radius.message} 4px`,
        backdropFilter: 'blur(10px)',
      },
    };
  }, [isUser, isSystem, theme]);

  // Renderizar contenido del mensaje con soporte para markdown básico
  const renderContent = (content: string) => {
    // Procesar saltos de línea
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      // Negrita: **text**
      let processedLine: React.ReactNode = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );
      
      // Cursiva: *text* or _text_
      processedLine = processedLine.replace(
        /(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g,
        '<em>$1</em>'
      );
      processedLine = processedLine.replace(
        /_([^_]+)_/g,
        '<em>$1</em>'
      );
      
      // Código inline: `code`
      processedLine = processedLine.replace(
        /`([^`]+)`/g,
        `<code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-family: ${theme.typography.fontFamilyMono}; font-size: 0.9em;">$1</code>`
      );

      // Links: [text](url)
      processedLine = processedLine.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        `<a href="$2" target="_blank" rel="noopener noreferrer" style="color: ${theme.colors.accent}; text-decoration: underline;">$1</a>`
      );

      return (
        <React.Fragment key={index}>
          <span dangerouslySetInnerHTML={{ __html: processedLine }} />
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div
      className={`air-chat-message air-chat-message--${message.role}`}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: theme.dimensions.spacing.sm,
        padding: `${theme.dimensions.spacing.xs} ${theme.dimensions.spacing.md}`,
        opacity: isSending ? 0.7 : 1,
        transition: theme.animations.transitions.opacity,
        ...messageStyles.container,
      }}
    >
      {/* Avatar del bot (solo para assistant) */}
      {!isUser && !isSystem && (
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
      )}

      {/* Contenido del mensaje */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.dimensions.spacing.xs,
          maxWidth: theme.dimensions.message.maxWidth,
        }}
      >
        {/* Bubble del mensaje */}
        <div
          style={{
            padding: theme.dimensions.message.padding,
            fontSize: theme.typography.fontSize.base,
            lineHeight: theme.typography.lineHeight.relaxed,
            wordBreak: 'break-word',
            ...messageStyles.bubble,
          }}
        >
          {renderContent(message.content)}
          
          {/* Indicador de error */}
          {isError && (
            <div
              style={{
                marginTop: theme.dimensions.spacing.sm,
                padding: theme.dimensions.spacing.sm,
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: theme.borders.radius.sm,
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.status.error,
                display: 'flex',
                alignItems: 'center',
                gap: theme.dimensions.spacing.xs,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {message.metadata?.error?.message || 'Error al enviar el mensaje'}
            </div>
          )}
        </div>

        {/* Timestamp y status */}
        {(showTimestamp || isSending) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.dimensions.spacing.xs,
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.muted,
              paddingLeft: isUser ? 0 : theme.dimensions.spacing.xs,
              paddingRight: isUser ? theme.dimensions.spacing.xs : 0,
              justifyContent: isUser ? 'flex-end' : 'flex-start',
            }}
          >
            {isSending && (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    animation: 'airChatSpin 1s linear infinite',
                  }}
                >
                  <circle cx="12" cy="12" r="10" opacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                <span>Enviando...</span>
              </>
            )}
            {!isSending && formattedTime && (
              <span>{formattedTime}</span>
            )}
            {!isSending && message.status === 'sent' && isUser && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme.colors.accent}
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes airChatSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ChatMessage;
