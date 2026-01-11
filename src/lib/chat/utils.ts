// =============================================================================
// AI REVOLUTION - CHAT UTILITIES
// =============================================================================
// Funciones auxiliares y utilidades para el sistema de chat
// Versión: 1.0.0
// =============================================================================

import { PATTERNS, LIMITS, FEATURES } from './constants';

// -----------------------------------------------------------------------------
// STRING UTILITIES
// -----------------------------------------------------------------------------

/**
 * Truncar texto a una longitud máxima con ellipsis
 */
export function truncateText(text: string, maxLength: number = LIMITS.PREVIEW_MAX_LENGTH): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + '...';
}

/**
 * Capitalizar primera letra
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Sanitizar HTML para prevenir XSS
 */
export function sanitizeHTML(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Escapar caracteres especiales de regex
 */
export function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Remover espacios en blanco excesivos
 */
export function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

// -----------------------------------------------------------------------------
// MARKDOWN UTILITIES
// -----------------------------------------------------------------------------

/**
 * Parsear markdown básico a HTML
 */
export function parseMarkdown(text: string): string {
  if (!FEATURES.MARKDOWN) return sanitizeHTML(text);
  
  let result = text;
  
  // Escapar HTML primero
  result = sanitizeHTML(result);
  
  // Bold: **text**
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic: *text* or _text_
  result = result.replace(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  result = result.replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // Code inline: `code`
  result = result.replace(
    /`([^`]+)`/g,
    '<code class="air-chat-code-inline">$1</code>'
  );
  
  // Links: [text](url)
  if (FEATURES.LINK_DETECTION) {
    result = result.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="air-chat-link">$1</a>'
    );
  }
  
  // Line breaks
  result = result.replace(/\n/g, '<br>');
  
  return result;
}

/**
 * Detectar y linkificar URLs en texto
 */
export function linkifyUrls(text: string): string {
  if (!FEATURES.LINK_DETECTION) return text;
  
  return text.replace(
    PATTERNS.URL,
    '<a href="$&" target="_blank" rel="noopener noreferrer" class="air-chat-link">$&</a>'
  );
}

/**
 * Detectar y linkificar emails
 */
export function linkifyEmails(text: string): string {
  if (!FEATURES.LINK_DETECTION) return text;
  
  return text.replace(
    PATTERNS.EMAIL,
    '<a href="mailto:$&" class="air-chat-link">$&</a>'
  );
}

// -----------------------------------------------------------------------------
// DATE/TIME UTILITIES
// -----------------------------------------------------------------------------

/**
 * Formatear fecha relativa (hace X tiempo)
 */
export function formatRelativeTime(date: Date, locale: string = 'es-ES'): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 30) {
    return 'Ahora';
  } else if (seconds < 60) {
    return 'Hace unos segundos';
  } else if (minutes < 60) {
    return minutes === 1 ? 'Hace 1 min' : `Hace ${minutes} min`;
  } else if (hours < 24) {
    return hours === 1 ? 'Hace 1 hora' : `Hace ${hours} horas`;
  } else if (days < 7) {
    return days === 1 ? 'Ayer' : `Hace ${days} días`;
  } else if (weeks < 4) {
    return weeks === 1 ? 'Hace 1 semana' : `Hace ${weeks} semanas`;
  } else if (months < 12) {
    return months === 1 ? 'Hace 1 mes' : `Hace ${months} meses`;
  } else {
    return formatAbsoluteDate(date, locale);
  }
}

/**
 * Formatear hora absoluta (HH:MM)
 */
export function formatAbsoluteTime(date: Date, locale: string = 'es-ES'): string {
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Formatear fecha absoluta (DD MMM YYYY)
 */
export function formatAbsoluteDate(date: Date, locale: string = 'es-ES'): string {
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Formatear fecha y hora completa
 */
export function formatDateTime(date: Date, locale: string = 'es-ES'): string {
  return `${formatAbsoluteDate(date, locale)} ${formatAbsoluteTime(date, locale)}`;
}

/**
 * Verificar si dos fechas son del mismo día
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Verificar si la fecha es hoy
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Verificar si la fecha es ayer
 */
export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
}

// -----------------------------------------------------------------------------
// ID GENERATION
// -----------------------------------------------------------------------------

/**
 * Generar ID único para mensajes
 */
export function generateMessageId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `msg-${timestamp}-${random}`;
}

/**
 * Generar ID único para sesiones
 */
export function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  const fingerprint = typeof navigator !== 'undefined' 
    ? navigator.userAgent.length.toString(36) 
    : 'ssr';
  
  return `air-${timestamp}-${random}-${fingerprint}`;
}

/**
 * Generar UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// -----------------------------------------------------------------------------
// VALIDATION UTILITIES
// -----------------------------------------------------------------------------

/**
 * Validar mensaje antes de enviar
 */
export function validateMessage(message: string): { valid: boolean; error?: string } {
  const trimmed = message.trim();
  
  if (!trimmed) {
    return { valid: false, error: 'El mensaje no puede estar vacío' };
  }
  
  if (trimmed.length < LIMITS.MIN_MESSAGE_LENGTH) {
    return { valid: false, error: 'El mensaje es demasiado corto' };
  }
  
  if (trimmed.length > LIMITS.MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `El mensaje no puede exceder ${LIMITS.MAX_MESSAGE_LENGTH} caracteres` };
  }
  
  return { valid: true };
}

/**
 * Validar URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validar email
 */
export function isValidEmail(email: string): boolean {
  return PATTERNS.EMAIL.test(email);
}

// -----------------------------------------------------------------------------
// BROWSER UTILITIES
// -----------------------------------------------------------------------------

/**
 * Detectar si es dispositivo móvil
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 480;
}

/**
 * Detectar si es tablet
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > 480 && window.innerWidth <= 768;
}

/**
 * Detectar si prefiere movimiento reducido
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detectar si es modo oscuro
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Detectar si es touch device
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Copiar texto al clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para navegadores antiguos
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
}

// -----------------------------------------------------------------------------
// STORAGE UTILITIES
// -----------------------------------------------------------------------------

/**
 * Guardar en localStorage de forma segura
 */
export function safeLocalStorage<T>(
  action: 'get' | 'set' | 'remove',
  key: string,
  value?: T
): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    switch (action) {
      case 'get': {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
      case 'set': {
        if (value !== undefined) {
          localStorage.setItem(key, JSON.stringify(value));
        }
        return value ?? null;
      }
      case 'remove': {
        localStorage.removeItem(key);
        return null;
      }
      default:
        return null;
    }
  } catch (error) {
    console.warn(`[Storage] Error ${action}ing key "${key}":`, error);
    return null;
  }
}

// -----------------------------------------------------------------------------
// DEBOUNCE / THROTTLE
// -----------------------------------------------------------------------------

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// -----------------------------------------------------------------------------
// ASYNC UTILITIES
// -----------------------------------------------------------------------------

/**
 * Delay/sleep function
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry async function
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (i < retries) {
        await delay(delayMs * Math.pow(2, i)); // Exponential backoff
      }
    }
  }
  
  throw lastError;
}

/**
 * Timeout wrapper para promesas
 */
export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  errorMessage: string = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), ms)
    ),
  ]);
}

// -----------------------------------------------------------------------------
// DOM UTILITIES
// -----------------------------------------------------------------------------

/**
 * Scroll suave a un elemento
 */
export function scrollToElement(
  element: HTMLElement,
  behavior: ScrollBehavior = 'smooth'
): void {
  element.scrollIntoView({ behavior, block: 'end' });
}

/**
 * Scroll al fondo de un contenedor
 */
export function scrollToBottom(
  container: HTMLElement,
  behavior: ScrollBehavior = 'smooth'
): void {
  container.scrollTo({
    top: container.scrollHeight,
    behavior,
  });
}

/**
 * Verificar si un elemento está visible en el viewport
 */
export function isElementVisible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Obtener elementos focalizables dentro de un contenedor
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');
  
  return Array.from(container.querySelectorAll<HTMLElement>(selectors));
}

// -----------------------------------------------------------------------------
// LOGGING UTILITIES
// -----------------------------------------------------------------------------

/**
 * Logger con prefijo
 */
export const logger = {
  log: (...args: any[]) => {
    if (FEATURES.DEBUG_LOGGING) {
      console.log('[AIRevolution Chat]', ...args);
    }
  },
  warn: (...args: any[]) => {
    console.warn('[AIRevolution Chat]', ...args);
  },
  error: (...args: any[]) => {
    console.error('[AIRevolution Chat]', ...args);
  },
  debug: (...args: any[]) => {
    if (FEATURES.DEBUG_LOGGING) {
      console.debug('[AIRevolution Chat]', ...args);
    }
  },
};

// -----------------------------------------------------------------------------
// EXPORT ALL
// -----------------------------------------------------------------------------

export default {
  // String
  truncateText,
  capitalize,
  sanitizeHTML,
  escapeRegex,
  normalizeWhitespace,
  
  // Markdown
  parseMarkdown,
  linkifyUrls,
  linkifyEmails,
  
  // Date/Time
  formatRelativeTime,
  formatAbsoluteTime,
  formatAbsoluteDate,
  formatDateTime,
  isSameDay,
  isToday,
  isYesterday,
  
  // ID Generation
  generateMessageId,
  generateSessionId,
  generateUUID,
  
  // Validation
  validateMessage,
  isValidUrl,
  isValidEmail,
  
  // Browser
  isMobile,
  isTablet,
  prefersReducedMotion,
  prefersDarkMode,
  isTouchDevice,
  copyToClipboard,
  
  // Storage
  safeLocalStorage,
  
  // Debounce/Throttle
  debounce,
  throttle,
  
  // Async
  delay,
  retry,
  withTimeout,
  
  // DOM
  scrollToElement,
  scrollToBottom,
  isElementVisible,
  getFocusableElements,
  
  // Logging
  logger,
};
