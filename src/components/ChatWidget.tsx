// =============================================================================
// AI REVOLUTION - CHAT WIDGET ENTRY POINT
// =============================================================================
// Este archivo reemplaza el antiguo ChatWidget.tsx que usaba @n8n/chat
// Ahora usa el sistema de chat personalizado 100% controlable
// Versión: 2.0.0
// =============================================================================

"use client";

import React from 'react';

// Importar el widget personalizado
import ChatWidget from './chat/ChatWidget';

// Importar tipos y configuración
import type { DeepPartial, ChatWidgetConfig } from '../lib/chat/types';
import { createChatConfig } from '../lib/chat/theme';

/**
 * AI Revolution Chat Widget
 * 
 * Widget de chat totalmente personalizable que reemplaza al antiguo @n8n/chat.
 * 
 * Características:
 * - 100% control de estilos (sin Shadow DOM)
 * - Tema AI Revolution integrado
 * - Responsive y accesible
 * - Persistencia de sesión
 * - Animaciones fluidas
 * - Compatible con el flujo RAG de n8n existente
 * 
 * @example
 * ```tsx
 * // Uso básico
 * <N8nChatWidget />
 * 
 * // Con configuración personalizada
 * <N8nChatWidget 
 *   config={{
 *     branding: {
 *       name: 'Mi Empresa',
 *       logoUrl: '/mi-logo.png',
 *     },
 *     behavior: {
 *       autoOpenDelay: 5, // Abrir después de 5 segundos
 *     },
 *   }}
 * />
 * ```
 */

interface N8nChatWidgetProps {
  /** Configuración personalizada (merge con defaults) */
  config?: DeepPartial<ChatWidgetConfig>;
  /** Callback cuando se abre el chat */
  onOpen?: () => void;
  /** Callback cuando se cierra el chat */
  onClose?: () => void;
}

export default function N8nChatWidget({ 
  config: customConfig,
  onOpen,
  onClose,
}: N8nChatWidgetProps) {
  // Crear configuración con defaults de AI Revolution
  const config = createChatConfig(customConfig);

  return (
    <ChatWidget
      config={config}
      onOpen={onOpen}
      onClose={onClose}
      onMessageSent={(msg) => {
        // Analytics tracking (opcional)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chat_message_sent', {
            event_category: 'Chat',
            event_label: 'User Message',
          });
        }
      }}
      onMessageReceived={(msg) => {
        // Analytics tracking (opcional)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chat_message_received', {
            event_category: 'Chat',
            event_label: 'Bot Response',
          });
        }
      }}
      onError={(error) => {
        // Log errors
        console.error('[AIRevolution Chat Error]', error);
        
        // Analytics tracking (opcional)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chat_error', {
            event_category: 'Chat',
            event_label: error.code,
          });
        }
      }}
    />
  );
}

// Re-exportar para uso directo
export { ChatWidget as AIRevolutionChatWidget };

// Re-exportar utilidades para configuración avanzada
export { 
  createChatConfig,
  aiRevolutionTheme,
  themePresets,
} from '../lib/chat/theme';

export type { 
  ChatWidgetConfig,
  ChatTheme,
  DeepPartial,
} from '../lib/chat/types';
