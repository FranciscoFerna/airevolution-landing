/**
 * Rate Limiting
 * 
 * Sistema de limitación de tasa en memoria para prevenir abuso.
 * 
 * NOTA: En producción con múltiples instancias, considerar usar Redis
 * para compartir el estado entre servidores.
 * 
 * Límites:
 * - Por IP: 20 requests por minuto (configurable)
 * - Global: 100 requests por minuto
 */

interface RateLimitEntry {
  count: number;
  firstRequest: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const MAX_REQUESTS = Number(import.meta.env.RATE_LIMIT_MAX_REQUESTS || 20);
const WINDOW_MS = Number(import.meta.env.RATE_LIMIT_WINDOW_MS || 60000);

const MAX_GLOBAL_REQUESTS = 100;
let globalRequestCounter = 0;
let globalWindowStart = Date.now();

// Cleanup periódico de entradas expiradas
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.firstRequest > WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

export function checkGlobalRateLimit(): RateLimitResult {
  const now = Date.now();

  if (now - globalWindowStart > 60000) {
    globalRequestCounter = 0;
    globalWindowStart = now;
  }

  if (globalRequestCounter >= MAX_GLOBAL_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: globalWindowStart + 60000,
      retryAfter: Math.ceil((60000 - (now - globalWindowStart)) / 1000)
    };
  }

  globalRequestCounter++;
  return {
    allowed: true,
    remaining: MAX_GLOBAL_REQUESTS - globalRequestCounter,
    resetTime: globalWindowStart + 60000
  };
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry) {
    rateLimitStore.set(identifier, { count: 1, firstRequest: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetTime: now + WINDOW_MS };
  }

  if (now - entry.firstRequest > WINDOW_MS) {
    rateLimitStore.set(identifier, { count: 1, firstRequest: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetTime: now + WINDOW_MS };
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.firstRequest)) / 1000);
    return { allowed: false, remaining: 0, resetTime: entry.firstRequest + WINDOW_MS, retryAfter };
  }

  entry.count++;
  rateLimitStore.set(identifier, entry);

  return { allowed: true, remaining: MAX_REQUESTS - entry.count, resetTime: entry.firstRequest + WINDOW_MS };
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

export function createRateLimitResponse(result: RateLimitResult): Response {
  return new Response(
    JSON.stringify({
      success: false,
      error: 'rate_limit_exceeded',
      message: 'Demasiadas solicitudes. Inténtalo más tarde.',
      retryAfter: result.retryAfter,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': (result.retryAfter || 60).toString(),
      },
    }
  );
}
