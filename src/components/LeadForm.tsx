"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useUTMParams, useAnalytics, useAnnounce, useRecaptcha } from "../hooks/useFormHelper";
import { formOptions } from "../lib/validation";

interface LeadFormProps {
  onSuccess?: () => void;
  variant?: "default" | "modal" | "compact";
  recaptchaSiteKey?: string;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  cargo: string;
  empleados: string;
  sector: string;
  servicio: string;
  presupuesto: string;
  urgencia: string;
  mensaje: string;
  comoNosConociste: string;
  website: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  cargo: "",
  empleados: "",
  sector: "",
  servicio: "",
  presupuesto: "",
  urgencia: "",
  mensaje: "",
  comoNosConociste: "",
  website: "",
  privacyConsent: false,
  marketingConsent: false,
};

export default function LeadForm({
  onSuccess,
  variant = "default",
  recaptchaSiteKey,
}: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const utmParams = useUTMParams();
  const { trackFormStart, trackFormStep, trackFormSubmit, trackFormError } = useAnalytics();
  const announce = useAnnounce();
  const { isLoaded: recaptchaLoaded, executeRecaptcha } = useRecaptcha(recaptchaSiteKey || null);

  useEffect(() => {
    if (variant !== "compact") {
      firstInputRef.current?.focus();
    }
  }, [variant]);

  useEffect(() => {
    if (!hasStarted && (formData.nombre || formData.email)) {
      setHasStarted(true);
      trackFormStart();
    }
  }, [formData.nombre, formData.email, hasStarted, trackFormStart]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const validateStep1 = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "Por favor, introduce tu nombre";
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Por favor, introduce tu email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Por favor, introduce un email válido";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "Por favor, introduce tu teléfono";
    } else if (!/^[+]?[\d\s()-]{9,}$/.test(formData.telefono)) {
      newErrors.telefono = "Por favor, introduce un teléfono válido";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      announce("Hay errores en el formulario. Por favor, revisa los campos marcados.", "assertive");
    }

    return Object.keys(newErrors).length === 0;
  }, [formData, announce]);

  const validateStep2 = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.servicio) {
      newErrors.servicio = "Por favor, selecciona un servicio";
    }

    if (!formData.urgencia) {
      newErrors.urgencia = "Por favor, indica tu urgencia";
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = "Debes aceptar la política de privacidad para continuar";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      announce("Hay errores en el formulario. Por favor, revisa los campos marcados.", "assertive");
    }

    return Object.keys(newErrors).length === 0;
  }, [formData, announce]);

  const handleNext = useCallback(() => {
    if (validateStep1()) {
      setStep(2);
      trackFormStep(2);
      announce("Paso 2 de 2: Detalles del proyecto", "polite");
    }
  }, [validateStep1, trackFormStep, announce]);

  const handleBack = useCallback(() => {
    setStep(1);
    setErrors({});
    announce("Paso 1 de 2: Tus datos", "polite");
  }, [announce]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);
    setErrors({});

    try {
      // Generar token de reCAPTCHA si está configurado
      let recaptchaToken: string | null = null;
      if (recaptchaSiteKey && recaptchaLoaded && executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha("submit_lead_form");
        } catch (recaptchaError) {
          if (import.meta.env.DEV) {
            console.warn("reCAPTCHA execution failed, continuing without token:", recaptchaError);
          }
        }
      }

      const submitData = {
        ...formData,
        ...utmParams,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        landingPage: typeof window !== "undefined" ? window.location.pathname : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        recaptchaToken: recaptchaToken || undefined,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);

        // ✅ EVENTO GTM - CONVERSIÓN DE FORMULARIO
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'form_submit_success',
            'form_name': 'auditoria_gratuita',
            'form_step': 'completed',
            'user_email': formData.email,
            'company_size': formData.empleados,
            'sector': formData.sector,
            'service': formData.servicio,
            'urgency': formData.urgencia,
            'lead_id': result.leadId || 'unknown',
            'value': 1,
            'currency': 'EUR'
          });
          console.log('✅ Evento GTM enviado: form_submit_success');
        }

        trackFormSubmit(result.leadId || "unknown", formData.servicio);
        announce("Formulario enviado correctamente. Gracias por tu solicitud.", "assertive");

        setTimeout(() => {
          onSuccess?.();
        }, 5000);
      } else {
        setErrors({ form: result.message || "Error al enviar el formulario" });
        trackFormError(result.error || "unknown");
        announce("Error al enviar el formulario. Por favor, inténtalo de nuevo.", "assertive");
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Submit error:", error);
      }
      setErrors({ form: "Error de conexión. Por favor, inténtalo de nuevo." });
      trackFormError("network_error");
      announce("Error de conexión. Por favor, inténtalo de nuevo.", "assertive");
    } finally {
      setLoading(false);
    }
  }, [
    formData,
    utmParams,
    validateStep2,
    trackFormSubmit,
    trackFormError,
    announce,
    onSuccess,
    recaptchaSiteKey,
    recaptchaLoaded,
    executeRecaptcha,
  ]);

  const inputClassName = (fieldName: string) => `
    w-full px-4 py-3.5 rounded-xl border transition-all duration-200
    ${errors[fieldName]
      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
      : "border-gray-200 bg-gray-50 focus:border-[#6C08B6] focus:ring-[#6C08B6]/20"
    }
    focus:outline-none focus:ring-2 focus:bg-white
    text-[#0B0D73] placeholder:text-gray-400
  `.trim();

  const selectClassName = (fieldName: string) => `
    ${inputClassName(fieldName)}
    appearance-none cursor-pointer
    bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")]
    bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]
    pr-10
  `.trim();

  if (success) {
    return (
      <div className="text-center py-8" role="alert" aria-live="polite">
        <div className="w-20 h-20 bg-gradient-to-br from-[#FC31E6]/20 to-[#6C08B6]/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <svg className="w-10 h-10 text-[#FC31E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h4 className="text-2xl font-bold text-[#0B0D73] mb-3">¡Solicitud Recibida!</h4>
        <p className="text-[#475569] mb-4">
          Gracias, <strong>{formData.nombre.split(" ")[0]}</strong>.
          Hemos recibido tu solicitud correctamente.
        </p>

        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-[#475569]">
            Te contactaremos en breve para agendar tu auditoría.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulario de solicitud de auditoría"
      className="space-y-4"
    >
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">No rellenar este campo</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex items-center justify-center gap-3 mb-6" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={2}>
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#6C08B6]" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              step >= 1 ? "bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white" : "bg-gray-200"
            }`}
          >
            {step > 1 ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              "1"
            )}
          </div>
          <span className="text-sm font-medium hidden sm:block">Tus datos</span>
        </div>
        <div className={`w-12 h-0.5 transition-colors ${step >= 2 ? "bg-[#6C08B6]" : "bg-gray-200"}`} />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#6C08B6]" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              step >= 2 ? "bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white" : "bg-gray-200"
            }`}
          >
            2
          </div>
          <span className="text-sm font-medium hidden sm:block">Tu proyecto</span>
        </div>
      </div>

      {errors.form && (
        <div
          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
          role="alert"
        >
          {errors.form}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-[#334155] mb-1.5">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              ref={firstInputRef}
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: María García López"
              className={inputClassName("nombre")}
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
            />
            {errors.nombre && (
              <p id="nombre-error" className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.nombre}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#334155] mb-1.5">
                Email profesional <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="maria@tuempresa.com"
                className={inputClassName("email")}
                autoComplete="email"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-[#334155] mb-1.5">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+34 600 000 000"
                className={inputClassName("telefono")}
                autoComplete="tel"
                required
                aria-required="true"
                aria-invalid={!!errors.telefono}
                aria-describedby={errors.telefono ? "telefono-error" : undefined}
              />
              {errors.telefono && (
                <p id="telefono-error" className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.telefono}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-[#334155] mb-1.5">
                Empresa <span className="text-gray-400 text-xs">(opcional)</span>
              </label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                placeholder="Nombre de tu empresa"
                className={inputClassName("empresa")}
                autoComplete="organization"
              />
            </div>
            <div>
              <label htmlFor="cargo" className="block text-sm font-medium text-[#334155] mb-1.5">
                Tu cargo <span className="text-gray-400 text-xs">(opcional)</span>
              </label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                placeholder="Ej: CEO, Director Marketing..."
                className={inputClassName("cargo")}
                autoComplete="organization-title"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="empleados" className="block text-sm font-medium text-[#334155] mb-1.5">
                Tamaño del equipo <span className="text-gray-400 text-xs">(opcional)</span>
              </label>
              <select
                id="empleados"
                name="empleados"
                value={formData.empleados}
                onChange={handleChange}
                className={selectClassName("empleados")}
              >
                <option value="">Selecciona una opción</option>
                {formOptions.empleados.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sector" className="block text-sm font-medium text-[#334155] mb-1.5">
                Sector <span className="text-gray-400 text-xs">(opcional)</span>
              </label>
              <select
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className={selectClassName("sector")}
              >
                <option value="">Selecciona tu sector</option>
                {formOptions.sectores.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continuar
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <p className="text-xs text-center text-gray-500">
            Paso 1 de 2 • Tus datos están protegidos
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label htmlFor="servicio" className="block text-sm font-medium text-[#334155] mb-1.5">
              ¿Qué necesitas? <span className="text-red-500">*</span>
            </label>
            <select
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              className={selectClassName("servicio")}
              required
              aria-required="true"
              aria-invalid={!!errors.servicio}
              aria-describedby={errors.servicio ? "servicio-error" : undefined}
            >
              <option value="">Selecciona el servicio que más te interesa</option>
              {formOptions.servicios.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
            {errors.servicio && (
              <p id="servicio-error" className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.servicio}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="presupuesto" className="block text-sm font-medium text-[#334155] mb-1.5">
                Presupuesto estimado <span className="text-gray-400 text-xs">(orientativo)</span>
              </label>
              <select
                id="presupuesto"
                name="presupuesto"
                value={formData.presupuesto}
                onChange={handleChange}
                className={selectClassName("presupuesto")}
              >
                <option value="">Selecciona un rango</option>
                {formOptions.presupuestos.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Solo para orientarnos, no es vinculante</p>
            </div>
            <div>
              <label htmlFor="urgencia" className="block text-sm font-medium text-[#334155] mb-1.5">
                ¿Cuándo lo necesitas? <span className="text-red-500">*</span>
              </label>
              <select
                id="urgencia"
                name="urgencia"
                value={formData.urgencia}
                onChange={handleChange}
                className={selectClassName("urgencia")}
                required
                aria-required="true"
                aria-invalid={!!errors.urgencia}
                aria-describedby={errors.urgencia ? "urgencia-error" : undefined}
              >
                <option value="">Selecciona tu urgencia</option>
                {formOptions.urgencias.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
              {errors.urgencia && (
                <p id="urgencia-error" className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.urgencia}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="comoNosConociste" className="block text-sm font-medium text-[#334155] mb-1.5">
              ¿Cómo nos conociste? <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <select
              id="comoNosConociste"
              name="comoNosConociste"
              value={formData.comoNosConociste}
              onChange={handleChange}
              className={selectClassName("comoNosConociste")}
            >
              <option value="">Selecciona una opción</option>
              {formOptions.fuentes.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mensaje" className="block text-sm font-medium text-[#334155] mb-1.5">
              Cuéntanos más sobre tu situación <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Ejemplo: 'Paso 3 horas/semana actualizando datos en Excel y el CRM manualmente. Me gustaría automatizar esto.'"
              rows={4}
              className={`${inputClassName("mensaje")} resize-none`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Cuanto más específico seas, mejor podremos preparar la auditoría
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacyConsent"
                name="privacyConsent"
                checked={formData.privacyConsent}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-[#6C08B6] focus:ring-[#6C08B6]"
                required
                aria-required="true"
                aria-invalid={!!errors.privacyConsent}
                aria-describedby={errors.privacyConsent ? "privacy-error" : undefined}
              />
              <label htmlFor="privacyConsent" className="text-sm text-[#475569]">
                <span className="text-red-500">* OBLIGATORIO</span>
                {" "}<strong>Acepto la recopilación de mis datos personales</strong>{" "}
                conforme a la <a href="/privacidad" className="text-[#6C08B6] hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>
                {" "}y <a href="/terminos" className="text-[#6C08B6] hover:underline" target="_blank" rel="noopener noreferrer">Términos de Servicio</a>.
                Entiendo que AI Revolution usará mis datos para contactarme sobre mi auditoría.
              </label>
            </div>
            {errors.privacyConsent && (
              <p id="privacy-error" className="text-red-500 text-xs flex items-center gap-1 ml-7" role="alert">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.privacyConsent}
              </p>
            )}

            <div className="flex items-start gap-3 p-3 bg-[#FC31E6]/5 rounded-lg border border-[#FC31E6]/20">
              <input
                type="checkbox"
                id="marketingConsent"
                name="marketingConsent"
                checked={formData.marketingConsent}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-[#6C08B6] focus:ring-[#6C08B6]"
              />
              <label htmlFor="marketingConsent" className="text-sm text-[#475569]">
                ✓ (Opcional) Deseo recibir emails sobre servicios, casos de éxito y actualizaciones de AI Revolution.
                <br/>
                <span className="text-xs text-gray-500">Puedo darme de baja en cualquier momento con un click.</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-4 bg-gray-100 text-[#475569] font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Atrás
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  Solicitar Auditoría Gratuita
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-center text-gray-500">
            Paso 2 de 2 • Ya casi está
          </p>
        </div>
      )}
    </form>
  );
}
