export const prerender = false;

import type { APIRoute } from "astro";
import { leadFormSchema, sanitizeLeadData } from "../../lib/validation";
import {
  checkRateLimit,
  checkGlobalRateLimit,
  getClientIP,
  createRateLimitResponse,
} from "../../lib/rate-limit";

export const POST: APIRoute = async ({ request, clientAddress }) => {
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

    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid JSON body" }),
        { status: 400 }
      );
    }

    // HONEYPOT: silencioso
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
          errors: Object.keys(errors.fieldErrors).slice(0, 3),
        }),
        { status: 400 }
      );
    }

    const sanitizedData = sanitizeLeadData(validationResult.data);

    // Validar reCAPTCHA si está presente
    const recaptchaToken = (body as any)?.recaptchaToken;
    if (recaptchaToken) {
      const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET_KEY;
      if (recaptchaSecret) {
        try {
          const recaptchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                secret: recaptchaSecret,
                response: recaptchaToken,
              }),
            }
          );

          const recaptchaResult = await recaptchaResponse.json();
          if (!recaptchaResult.success) {
            console.warn(`[RECAPTCHA] Validation failed from IP: ${clientIP}`);
            // En producción, podrías decidir bloquear aquí
            // Por ahora, solo logueamos la advertencia
          }
        } catch (recaptchaError) {
          // Si la validación de reCAPTCHA falla, continuamos (no bloqueamos)
          console.warn("[RECAPTCHA] Validation request failed:", recaptchaError);
        }
      }
    }

    const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(7)
      .toUpperCase()}`;

    const n8nPayload = {
      ...sanitizedData,
      metadata: {
        leadId,
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "unknown",
        source: "landing_form",
        submittedAt: new Date().toISOString(),
        requestDurationMs: Date.now() - requestStartTime,
      },
    };

    const n8nWebhookUrl = import.meta.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      console.error("❌ N8N_WEBHOOK_URL not configured");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Server configuration error",
          leadId,
        }),
        { status: 503 }
      );
    }

    try {
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(n8nPayload),
      });

      if (!n8nResponse.ok) {
        const errorText = await n8nResponse.text();
        console.error(`N8N error [${n8nResponse.status}]:`, errorText);

        // Aunque falle, decimos que se recibió
        return new Response(
          JSON.stringify({
            success: true,
            leadId,
            message: "Lead received. We'll contact you soon.",
          }),
          { status: 200 }
        );
      }

      if (import.meta.env.DEV) {
        console.log(`✅ Lead ${leadId} sent to n8n successfully`);
      }

      return new Response(
        JSON.stringify({
          success: true,
          leadId,
          message: "Lead submitted successfully",
          nextStep: "Check your email for confirmation",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        }
      );

    } catch (fetchError) {
      console.error("❌ Error connecting to n8n:", fetchError);

      return new Response(
        JSON.stringify({
          success: true,
          leadId,
          message: "Lead received. Processing...",
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
        errorCode: "ERR_INTERNAL",
      }),
      { status: 500 }
    );
  }
};
