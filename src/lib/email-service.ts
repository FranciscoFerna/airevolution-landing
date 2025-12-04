// src/lib/email-service.ts
import type { LeadFormData } from './validation';

interface WebhookResult {
  success: boolean;
  error?: string;
}

export async function processNewLead(
  data: LeadFormData,
  metadata: { ip: string; leadId: string; userAgent: string; referrer: string; landingPage: string }
): Promise<WebhookResult> {
  // CORRECCIÓN: Usamos import.meta.env en lugar de process.env
  const webhookUrl = import.meta.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("❌ ERROR CONFIG: N8N_WEBHOOK_URL no está definido en .env");
    return { success: false, error: "Server configuration error" };
  }

  try {
    const payload = {
      type: 'new_lead',
      timestamp: new Date().toISOString(),
      data: {
        ...data,
        marketingConsent: data.marketingConsent ? true : false,
      },
      metadata: {
        id: metadata.leadId,
        ip: metadata.ip,
        userAgent: metadata.userAgent,
        source: data.utm_source || 'direct',
        medium: data.utm_medium || '',
        campaign: data.utm_campaign || '',
        referrer: metadata.referrer,
        landingPage: metadata.landingPage
      }
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`n8n Webhook error: ${response.status} ${response.statusText}`);
    }

    return { success: true };

  } catch (err) {
    console.error("🔥 Error conectando con n8n:", err);
    return { success: false, error: "Error interno de comunicación" };
  }
}
