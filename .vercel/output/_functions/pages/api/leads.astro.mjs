import { l as leadFormSchema, s as sanitizeLeadData } from '../../chunks/validation_Cz-k6Cux.mjs';
export { renderers } from '../../renderers.mjs';

const rateLimitStore = /* @__PURE__ */ new Map();
const MAX_REQUESTS = Number(20);
const WINDOW_MS = Number(6e4);
const MAX_GLOBAL_REQUESTS = 100;
let globalRequestCounter = 0;
let globalWindowStart = Date.now();
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.firstRequest > WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1e3);
function checkGlobalRateLimit() {
  const now = Date.now();
  if (now - globalWindowStart > 6e4) {
    globalRequestCounter = 0;
    globalWindowStart = now;
  }
  if (globalRequestCounter >= MAX_GLOBAL_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: globalWindowStart + 6e4,
      retryAfter: Math.ceil((6e4 - (now - globalWindowStart)) / 1e3)
    };
  }
  globalRequestCounter++;
  return {
    allowed: true,
    remaining: MAX_GLOBAL_REQUESTS - globalRequestCounter,
    resetTime: globalWindowStart + 6e4
  };
}
function checkRateLimit(identifier) {
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
    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.firstRequest)) / 1e3);
    return { allowed: false, remaining: 0, resetTime: entry.firstRequest + WINDOW_MS, retryAfter };
  }
  entry.count++;
  rateLimitStore.set(identifier, entry);
  return { allowed: true, remaining: MAX_REQUESTS - entry.count, resetTime: entry.firstRequest + WINDOW_MS };
}
function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "127.0.0.1";
}
function createRateLimitResponse(result) {
  return new Response(
    JSON.stringify({
      success: false,
      error: "rate_limit_exceeded",
      message: "Demasiadas solicitudes. Inténtalo más tarde.",
      retryAfter: result.retryAfter
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": (result.retryAfter || 60).toString()
      }
    }
  );
}

const prerender = false;
const POST = async ({ request, clientAddress }) => {
  const requestStartTime = Date.now();
  try {
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ success: false, message: "Only POST allowed" }),
        { status: 405 }
      );
    }
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ success: false, message: "Content-Type must be application/json" }),
        { status: 400 }
      );
    }
    const clientIP = clientAddress || getClientIP(request) || "127.0.0.1";
    const globalLimit = checkGlobalRateLimit();
    if (!globalLimit.allowed) {
      console.warn(`[RATE_LIMIT] Global limit exceeded from IP: ${clientIP}`);
      return createRateLimitResponse(globalLimit);
    }
    const ipLimit = checkRateLimit(clientIP);
    if (!ipLimit.allowed) {
      console.warn(`[RATE_LIMIT] IP limit exceeded for: ${clientIP}`);
      return createRateLimitResponse(ipLimit);
    }
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid JSON body" }),
        { status: 400 }
      );
    }
    if (typeof body === "object" && body !== null && "website" in body && body.website) {
      console.warn(`[HONEYPOT] Spam detected from IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ success: true, leadId: "SPAM-BLOCKED" }),
        { status: 200 }
      );
    }
    const validationResult = leadFormSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten();
      return new Response(
        JSON.stringify({
          success: false,
          message: "Validation failed",
          errors: Object.keys(errors.fieldErrors).slice(0, 3)
        }),
        { status: 400 }
      );
    }
    const sanitizedData = sanitizeLeadData(validationResult.data);
    const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    const n8nPayload = {
      ...sanitizedData,
      metadata: {
        leadId,
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "unknown",
        source: "landing_form",
        submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
        requestDurationMs: Date.now() - requestStartTime
      }
    };
    const n8nWebhookUrl = undefined                               ;
    if (!n8nWebhookUrl) {
      console.error("❌ N8N_WEBHOOK_URL not configured");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Server configuration error",
          leadId
        }),
        { status: 503 }
      );
    }
    try {
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(n8nPayload)
      });
      if (!n8nResponse.ok) {
        const errorText = await n8nResponse.text();
        console.error(`N8N error [${n8nResponse.status}]:`, errorText);
        return new Response(
          JSON.stringify({
            success: true,
            leadId,
            message: "Lead received. We'll contact you soon."
          }),
          { status: 200 }
        );
      }
      console.log(`✅ Lead ${leadId} sent to n8n successfully`);
      return new Response(
        JSON.stringify({
          success: true,
          leadId,
          message: "Lead submitted successfully",
          nextStep: "Check your email for confirmation"
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate"
          }
        }
      );
    } catch (fetchError) {
      console.error("❌ Error connecting to n8n:", fetchError);
      return new Response(
        JSON.stringify({
          success: true,
          leadId,
          message: "Lead received. Processing..."
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("[LEADS_API] Unhandled error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
        errorCode: "ERR_INTERNAL"
      }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
