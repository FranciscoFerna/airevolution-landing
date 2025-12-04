// src/lib/n8n-service.ts

interface LeadPayload {
  [key: string]: any;
}

interface WebhookResult {
  success: boolean;
  error?: string;
}

export async function sendToN8N(data: LeadPayload, metadata: { ip: string; leadId: string; userAgent: string }): Promise<WebhookResult> {
  // CLAVE: Usamos import.meta.env para Astro, con fallback a process.env para Vercel Serverless si fuera necesario
  const webhookUrl = import.meta.env.N8N_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("❌ CRITICAL: N8N_WEBHOOK_URL is missing.");
    return { success: false, error: "Configuration error: Missing Webhook URL" };
  }

  try {
    const payload = {
      ...data,
      metadata: {
        ...metadata,
        source: 'Landing Page',
        submittedAt: new Date().toISOString()
      }
    };

    // console.log para debug (puedes comentarlo en producción si quieres menos ruido)
    console.log(`🚀 Enviando lead ${metadata.leadId} a N8N...`);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`N8N respondió con estado: ${response.status} - ${errorText}`);
    }

    console.log("✅ Lead enviado correctamente a N8N");
    return { success: true };

  } catch (error) {
    console.error("❌ Error enviando a N8N:", error);
    return { success: false, error: String(error) };
  }
}
