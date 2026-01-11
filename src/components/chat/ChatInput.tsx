// =============================================================================
// AI REVOLUTION - CHAT INPUT
// =============================================================================
// Input de texto con auto-resize, envío por Enter y botón
// Versión: 1.0.0
// =============================================================================

import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { ChatInputProps } from '../../lib/chat/types';

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled,
  theme,
  i18n,
  behavior,
}) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize del textarea
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height para medir correctamente
    textarea.style.height = 'auto';
    
    // Calcular nueva altura
    const minHeight = parseInt(theme.dimensions.input.minHeight);
    const maxHeight = parseInt(theme.dimensions.input.maxHeight);
    const scrollHeight = textarea.scrollHeight;
    
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [theme.dimensions.input.minHeight, theme.dimensions.input.maxHeight]);

  // Ajustar altura cuando cambia el valor
  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  // Manejar envío
  const handleSend = useCallback(() => {
    const trimmedValue = value.trim();
    if (!trimmedValue || disabled) return;

    onSend(trimmedValue);
    setValue('');
    
    // Reset altura
    if (textareaRef.current) {
      textareaRef.current.style.height = theme.dimensions.input.minHeight;
    }
  }, [value, disabled, onSend, theme.dimensions.input.minHeight]);

  // Manejar teclas
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter para enviar (sin Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Placeholders dinámicos
  const placeholders = [
    '¿En qué puedo ayudarte?',
    'Pregúntame sobre automatización...',
    '¿Cómo puedo ahorrar tiempo?',
    'Cuéntame sobre tu negocio...',
  ];
  
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (!behavior.dynamicPlaceholder) return;
    
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [behavior.dynamicPlaceholder, placeholders.length]);

  const currentPlaceholder = behavior.dynamicPlaceholder
    ? placeholders[placeholderIndex]
    : i18n.messages.inputPlaceholder;

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div
      className="air-chat-input"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: theme.dimensions.spacing.sm,
        padding: theme.dimensions.spacing.md,
        background: theme.colors.background.input,
        borderTop: `1px solid ${theme.colors.input.border}`,
      }}
    >
      {/* Textarea */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: theme.colors.input.background,
          border: `1px solid ${isFocused ? theme.colors.input.borderFocus : theme.colors.input.border}`,
          borderRadius: theme.borders.radius.input,
          transition: theme.animations.transitions.colors,
          overflow: 'hidden',
        }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={currentPlaceholder}
          disabled={disabled}
          aria-label="Mensaje"
          rows={1}
          style={{
            flex: 1,
            minHeight: theme.dimensions.input.minHeight,
            maxHeight: theme.dimensions.input.maxHeight,
            padding: `${theme.dimensions.spacing.sm} ${theme.dimensions.spacing.md}`,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize.base,
            lineHeight: theme.typography.lineHeight.normal,
            color: theme.colors.input.text,
            overflow: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.colors.scrollbar.thumb} transparent`,
          }}
        />

        {/* Character count (opcional, si el mensaje es largo) */}
        {value.length > 200 && (
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '8px',
              fontSize: theme.typography.fontSize.xs,
              color: value.length > 500 
                ? theme.colors.status.warning 
                : theme.colors.text.muted,
            }}
          >
            {value.length}/1000
          </div>
        )}
      </div>

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={!canSend}
        aria-label={i18n.messages.sendButton}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: theme.borders.radius.input,
          background: canSend 
            ? theme.colors.background.launcher 
            : 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          cursor: canSend ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: theme.animations.transitions.all,
          opacity: canSend ? 1 : 0.5,
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          if (canSend) {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = theme.shadows.md;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {disabled ? (
          // Loading spinner
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            style={{ animation: 'airChatSpin 1s linear infinite' }}
          >
            <circle cx="12" cy="12" r="10" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        ) : (
          // Send icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: canSend ? 'translateX(1px)' : 'none',
              transition: theme.animations.transitions.transform,
            }}
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        )}
      </button>

      {/* Keyframes */}
      <style>{`
        @keyframes airChatSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .air-chat-input textarea::placeholder {
          color: ${theme.colors.input.placeholder};
          transition: opacity 0.3s ease;
        }
        
        .air-chat-input textarea:focus::placeholder {
          opacity: 0.5;
        }
        
        .air-chat-input textarea::-webkit-scrollbar {
          width: 4px;
        }
        
        .air-chat-input textarea::-webkit-scrollbar-thumb {
          background: ${theme.colors.scrollbar.thumb};
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default ChatInput;
