// =============================================================================
// AI REVOLUTION - CHAT HEADER
// =============================================================================
// Header del chat con logo, título, estado de conexión y controles
// Versión: 1.0.0
// =============================================================================

import React from 'react';
import type { ChatHeaderProps } from '../../lib/chat/types';

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onClose,
  theme,
  branding,
  i18n,
  connectionStatus,
}) => {
  return (
    <div
      className="air-chat-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${theme.dimensions.spacing.md} ${theme.dimensions.spacing.lg}`,
        background: theme.colors.background.header,
        borderBottom: `2px solid ${theme.colors.accent}`,
        minHeight: theme.dimensions.header.height,
        flexShrink: 0,
      }}
    >
      {/* Left side: Logo y info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.dimensions.spacing.md,
        }}
      >
        {/* Logo/Avatar */}
        <div
          style={{
            position: 'relative',
            width: '44px',
            height: '44px',
            borderRadius: theme.borders.radius.lg,
            background: theme.colors.background.launcher,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: theme.shadows.md,
            overflow: 'hidden',
          }}
        >
          {branding.logoUrl ? (
            <img
              src={branding.logoUrl}
              alt={branding.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '6px',
              }}
            />
          ) : (
            <svg
              width="24"
              height="24"
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
          )}

          {/* Online indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: connectionStatus === 'connected' 
                ? theme.colors.status.online 
                : connectionStatus === 'reconnecting'
                  ? theme.colors.status.warning
                  : theme.colors.status.offline,
              border: `2px solid ${theme.colors.primaryDark}`,
              animation: connectionStatus === 'reconnecting' 
                ? 'airChatPulse 1.5s infinite' 
                : 'none',
            }}
          />
        </div>

        {/* Título y subtítulo */}
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              lineHeight: theme.typography.lineHeight.tight,
            }}
          >
            {i18n.messages.headerTitle}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.secondary,
              display: 'flex',
              alignItems: 'center',
              gap: theme.dimensions.spacing.xs,
            }}
          >
            {connectionStatus === 'connected' ? (
              <>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.colors.status.online,
                    display: 'inline-block',
                  }}
                />
                {i18n.messages.headerSubtitle}
              </>
            ) : connectionStatus === 'reconnecting' ? (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={theme.colors.status.warning}
                  strokeWidth="2"
                  style={{ animation: 'airChatSpin 1s linear infinite' }}
                >
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                {i18n.messages.reconnecting}
              </>
            ) : (
              <>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.colors.status.offline,
                    display: 'inline-block',
                  }}
                />
                Desconectado
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right side: Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.dimensions.spacing.sm,
        }}
      >
        {/* Menu button (opcional para futuras funciones) */}
        {/* <button
          aria-label="Menú"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: theme.borders.radius.md,
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.text.secondary,
            transition: theme.animations.transitions.all,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.color = theme.colors.text.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = theme.colors.text.secondary;
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="6" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="18" r="2" />
          </svg>
        </button> */}

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={i18n.messages.close}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: theme.borders.radius.md,
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.text.secondary,
            transition: theme.animations.transitions.all,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(252, 49, 230, 0.2)';
            e.currentTarget.style.borderColor = theme.colors.accent;
            e.currentTarget.style.color = theme.colors.text.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = theme.colors.text.secondary;
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes airChatPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes airChatSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ChatHeader;
