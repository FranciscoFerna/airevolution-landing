// =============================================================================
// AI REVOLUTION - CHAT LAUNCHER
// =============================================================================
// Botón flotante premium para abrir/cerrar el chat
// Con animaciones, badge de no leídos y adaptación a cookie banner
// Versión: 1.0.0
// =============================================================================

import React, { useState } from 'react';
import type { ChatLauncherProps } from '../../lib/chat/types';

const ChatLauncher: React.FC<ChatLauncherProps> = ({
  isOpen,
  onClick,
  unreadCount = 0,
  theme,
  animation = 'pulse',
  cookieBannerVisible = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calcular posición bottom según si el cookie banner está visible
  const bottomPosition = cookieBannerVisible 
    ? `calc(${theme.position.bottom} + 120px)` 
    : theme.position.bottom;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="air-chat-launcher"
      aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      aria-expanded={isOpen}
      style={{
        position: 'fixed',
        bottom: bottomPosition,
        right: theme.position.right,
        width: theme.dimensions.launcher.size,
        height: theme.dimensions.launcher.size,
        borderRadius: theme.borders.radius.launcher,
        background: theme.colors.background.launcher,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: theme.position.zIndex.launcher,
        boxShadow: isHovered ? theme.shadows.launcherHover : theme.shadows.launcher,
        transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
        transition: `
          all ${theme.animations.duration.normal} ${theme.animations.easing.default},
          bottom ${theme.animations.duration.normal} ${theme.animations.easing.default}
        `,
        overflow: 'visible',
      }}
    >
      {/* Animation ring */}
      {animation === 'pulse' && !isOpen && (
        <span
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: theme.borders.radius.launcher,
            border: `2px solid ${theme.colors.accent}`,
            opacity: 0.5,
            animation: 'airChatLauncherPulse 2s infinite',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Icon container with transition */}
      <div
        style={{
          width: theme.dimensions.launcher.iconSize,
          height: theme.dimensions.launcher.iconSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `transform ${theme.animations.duration.normal} ${theme.animations.easing.bounce}`,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        {isOpen ? (
          // Close icon
          <svg
            width={theme.dimensions.launcher.iconSize}
            height={theme.dimensions.launcher.iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Chat icon
          <svg
            width={theme.dimensions.launcher.iconSize}
            height={theme.dimensions.launcher.iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            {/* Dots animation when not open */}
            <circle cx="8" cy="10" r="1" fill="white" opacity="0.8">
              <animate 
                attributeName="opacity" 
                values="0.4;1;0.4" 
                dur="1.5s" 
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>
            <circle cx="12" cy="10" r="1" fill="white" opacity="0.8">
              <animate 
                attributeName="opacity" 
                values="0.4;1;0.4" 
                dur="1.5s" 
                repeatCount="indefinite"
                begin="0.2s"
              />
            </circle>
            <circle cx="16" cy="10" r="1" fill="white" opacity="0.8">
              <animate 
                attributeName="opacity" 
                values="0.4;1;0.4" 
                dur="1.5s" 
                repeatCount="indefinite"
                begin="0.4s"
              />
            </circle>
          </svg>
        )}
      </div>

      {/* Unread badge */}
      {unreadCount > 0 && !isOpen && (
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            minWidth: '22px',
            height: '22px',
            borderRadius: '11px',
            background: theme.colors.status.error,
            color: 'white',
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.bold,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 6px',
            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.5)',
            animation: 'airChatBadgePop 0.3s ease-out',
            border: `2px solid ${theme.colors.primaryDark}`,
          }}
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}

      {/* Tooltip */}
      {!isOpen && isHovered && (
        <span
          style={{
            position: 'absolute',
            bottom: '100%',
            right: '0',
            marginBottom: theme.dimensions.spacing.sm,
            padding: `${theme.dimensions.spacing.xs} ${theme.dimensions.spacing.md}`,
            background: theme.colors.primaryDark,
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            borderRadius: theme.borders.radius.md,
            whiteSpace: 'nowrap',
            boxShadow: theme.shadows.md,
            animation: 'airChatTooltipFade 0.2s ease-out',
          }}
        >
          ¿Necesitas ayuda?
          <span
            style={{
              position: 'absolute',
              top: '100%',
              right: '20px',
              borderWidth: '6px',
              borderStyle: 'solid',
              borderColor: `${theme.colors.primaryDark} transparent transparent transparent`,
            }}
          />
        </span>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes airChatLauncherPulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }
        
        @keyframes airChatBadgePop {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes airChatTooltipFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive launcher */
        @media (max-width: 640px) {
          .air-chat-launcher {
            width: 56px !important;
            height: 56px !important;
            border-radius: 16px !important;
          }
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .air-chat-launcher,
          .air-chat-launcher * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </button>
  );
};

export default ChatLauncher;
