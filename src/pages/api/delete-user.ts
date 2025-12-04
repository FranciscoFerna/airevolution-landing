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
    // 1. Verificar identidad
    // 2. Borrar de base de datos
    // 3. Borrar de SendGrid/CRM
    // 4. Enviar email de confirmación

    return new Response(JSON.stringify({
      success: true,
      message: 'Solicitud de borrado recibida. Procesaremos la baja en un plazo máximo de 30 días.'
    }), { status: 200 });

  } catch (error) {
    console.error('Delete User Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error interno' }), { status: 500 });
  }
};
