import { z } from 'zod';

const leadFormSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre no puede exceder 100 caracteres").regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\.\'-]+$/, "El nombre contiene caracteres no válidos"),
  email: z.string().email("Por favor, introduce un email válido").max(255, "El email es demasiado largo").transform((val) => val.toLowerCase().trim()),
  telefono: z.string().min(9, "El teléfono debe tener al menos 9 dígitos").max(20, "El teléfono es demasiado largo").regex(/^[+]?[\d\s\-\(\)]+$/, "Formato de teléfono inválido"),
  empresa: z.string().max(100).optional().default(""),
  cargo: z.string().max(100).optional().default(""),
  empleados: z.string().optional().default(""),
  sector: z.string().optional().default(""),
  servicio: z.string().min(1, "Por favor, selecciona un servicio"),
  urgencia: z.string().min(1, "Por favor, indica tu urgencia"),
  presupuesto: z.string().optional().default(""),
  mensaje: z.string().max(2e3, "El mensaje no puede exceder 2000 caracteres").optional().default(""),
  comoNosConociste: z.string().optional().default(""),
  website: z.string().max(0, "Spam detectado").optional().default(""),
  utm_source: z.string().optional().default(""),
  utm_medium: z.string().optional().default(""),
  utm_campaign: z.string().optional().default(""),
  utm_term: z.string().optional().default(""),
  utm_content: z.string().optional().default(""),
  landingPage: z.string().optional().default(""),
  referrer: z.string().optional().default(""),
  userAgent: z.string().optional().default(""),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" })
  }),
  marketingConsent: z.boolean().optional().default(false)
});
function sanitizeLeadData(data) {
  const sanitize = (str) => {
    if (!str) return "";
    return (str || "").replace(/[<>]/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").replace(/\0/g, "").trim();
  };
  return {
    ...data,
    nombre: sanitize(data.nombre),
    empresa: sanitize(data.empresa),
    cargo: sanitize(data.cargo),
    mensaje: sanitize(data.mensaje)
  };
}
const formOptions = {
  servicios: [
    "Automatización de procesos (n8n/Make)",
    "Desarrollo Web & Landing Pages",
    "Consultoría de IA",
    "Marketing Digital (Ads/SEO)",
    "Auditoría + Plan Estratégico",
    "Otro / No estoy seguro"
  ],
  presupuestos: [
    "Menos de 500€",
    "500€ - 1.500€",
    "1.500€ - 3.000€",
    "3.000€ - 5.000€",
    "Más de 5.000€",
    "Prefiero no decirlo"
  ],
  empleados: [
    "Solo yo (Freelance)",
    "2-5 empleados",
    "6-10 empleados",
    "11-25 empleados",
    "26-50 empleados",
    "Más de 50 empleados"
  ],
  sectores: [
    "Tecnología / Software",
    "E-commerce / Retail",
    "Servicios Profesionales",
    "Marketing / Agencias",
    "Salud / Bienestar",
    "Educación / Formación",
    "Inmobiliaria / Construcción",
    "Finanzas / Seguros",
    "Hostelería / Turismo",
    "Industria / Manufactura",
    "Otro"
  ],
  urgencias: [
    "Urgente (necesito solución en 1-2 semanas)",
    "Pronto (este mes o el próximo)",
    "En 2-3 meses",
    "Solo estoy explorando opciones"
  ],
  fuentes: [
    "Búsqueda en Google",
    "LinkedIn",
    "Twitter / X",
    "Instagram",
    "Recomendación de un amigo",
    "Youtube",
    "Podcast",
    "Otro"
  ]
};

export { formOptions as f, leadFormSchema as l, sanitizeLeadData as s };
