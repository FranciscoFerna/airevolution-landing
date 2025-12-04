export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return new Response(JSON.stringify({ success: false, message: "Email requerido" }), { status: 400 });
    }
    console.log(`[GDPR DELETE REQUEST] Solicitud de borrado para: ${email}`);
    return new Response(JSON.stringify({
      success: true,
      message: "Solicitud de borrado recibida. Procesaremos la baja en un plazo máximo de 30 días."
    }), { status: 200 });
  } catch (error) {
    console.error("Delete User Error:", error);
    return new Response(JSON.stringify({ success: false, message: "Error interno" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
