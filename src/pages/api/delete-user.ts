/**
 * API Route: /api/delete-user
 * 
 * Endpoint GDPR para solicitudes de eliminación de datos.
 * 
 * NOTA: Actualmente solo registra la solicitud. Debe implementarse
 * la lógica de borrado real conectando con n8n/base de datos.
 */

export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ success: false, message: 'Email requerido' }), { status: 400 });
    }

    console.log(`[GDPR DELETE REQUEST] Solicitud de borrado para: ${email}`);

    // TODO: Implementar borrado real
    // 1. Enviar solicitud a n8n para borrar datos
    // 2. Borrar de base de datos/crm
    // 3. Enviar confirmación por email

    return new Response(JSON.stringify({
      success: true,
      message: 'Solicitud de borrado recibida. Procesaremos la baja en un plazo máximo de 30 días.'
    }), { status: 200 });

  } catch (error) {
    console.error('[DELETE_USER] Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error procesando la solicitud' }), { status: 500 });
  }
};
