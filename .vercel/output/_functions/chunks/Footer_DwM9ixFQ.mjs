import { e as createAstro, f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, n as renderSlot, o as renderHead, p as defineScriptVars, h as addAttribute, u as unescapeHTML } from './astro/server_COIheRYN.mjs';
import 'piccolore';
/* empty css                               */
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useCallback, useRef } from 'react';
import { f as formOptions } from './validation_Cz-k6Cux.mjs';

const $$Astro$1 = createAstro("https://airevolution.es");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "/vercel/sandbox/primary/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/vercel/sandbox/primary/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://airevolution.es");
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const {
    title = "Automatización Inteligente | Ahorrar 260h/año | AI Revolution",
    description = "Automatiza procesos repetitivos con IA. Auditoría gratuita. 50+ empresas confían en nosotros. Ahorra 260h/año confirmadas.",
    ogImage = "/og-image.jpg",
    noIndex = false
  } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site || "https://airevolution.es");
  const GA_MEASUREMENT_ID = "G-V04T8BP151";
  const RECAPTCHA_SITE_KEY = "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AI Revolution",
    "alternateName": "AI Revolution S.L.",
    "description": "Automatización e Inteligencia Artificial para Empresas",
    "url": "https://airevolution.es",
    "image": "https://airevolution.es/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrer Casals",
      "addressLocality": "Barcelona",
      "postalCode": "08031",
      "addressCountry": "ES"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": "+34-XXX-XXX-XXX",
      "email": "airevolutionofficial1@gmail.com"
    },
    "areaServed": "ES",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "50"
    }
  };
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', "><title>", '</title><meta name="description"', '><link rel="canonical"', '><link rel="sitemap" href="/sitemap-index.xml">', '<meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:locale" content="es_ES"><meta property="og:site_name" content="AI Revolution"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><meta name="theme-color" content="#0B0D73"><script type="application/ld+json">', "</script><script async", "></script><script>(function(){", "\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n\n      // Configuración inicial (Denegado por defecto para cumplir GDPR hasta que acepten cookies)\n      gtag('consent', 'default', {\n        'ad_storage': 'denied',\n        'ad_user_data': 'denied',\n        'ad_personalization': 'denied',\n        'analytics_storage': 'denied'\n      });\n\n      gtag('config', GA_MEASUREMENT_ID, { 'anonymize_ip': true });\n    })();</script><script>(function(){", "\n      window.__ENV__ = { RECAPTCHA_SITE_KEY };\n    })();</script>", "", '</head> <body class="bg-white text-gray-900 antialiased selection:bg-[#FC31E6] selection:text-white"> <a href="#main-content" class="skip-link">Saltar al contenido</a> <div id="live-region" role="status" aria-live="polite" class="sr-only"></div> <main id="main-content"> ', " </main> <script>\n      window.addEventListener('cookieConsentUpdate', function(e) {\n        const consent = e.detail;\n        if (typeof window.gtag === 'function') {\n          window.gtag('consent', 'update', {\n            'analytics_storage': consent.analytics ? 'granted' : 'denied',\n            'ad_storage': consent.marketing ? 'granted' : 'denied',\n            'ad_user_data': consent.marketing ? 'granted' : 'denied',\n            'ad_personalization': consent.marketing ? 'granted' : 'denied'\n          });\n          console.log('GA4 Consent Updated:', consent);\n        }\n      });\n    </script> </body> </html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(canonicalURL, "href"), noIndex && renderTemplate`<meta name="robots" content="noindex, nofollow">`, addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(ogImage, canonicalURL), "content"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(ogImage, canonicalURL), "content"), unescapeHTML(JSON.stringify(jsonLd)), addAttribute(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, "src"), defineScriptVars({ GA_MEASUREMENT_ID }), defineScriptVars({ RECAPTCHA_SITE_KEY }), renderComponent($$result, "Analytics", $$Index, {}), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/vercel/sandbox/primary/src/layouts/MainLayout.astro", void 0);

function waitForGtag(timeout = 2e3) {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      resolve(window.gtag);
      return;
    }
    let elapsed = 0;
    const interval = 100;
    const check = () => {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        resolve(window.gtag);
        return;
      }
      elapsed += interval;
      if (elapsed >= timeout) {
        resolve(() => {
        });
        return;
      }
      setTimeout(check, interval);
    };
    check();
  });
}
function useUTMParams() {
  const [params, setParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    landingPage: "",
    referrer: ""
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    setParams({
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
      landingPage: window.location.pathname,
      referrer: document.referrer || ""
    });
    const utmData = {
      utm_source: urlParams.get("utm_source") || sessionStorage.getItem("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || sessionStorage.getItem("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || sessionStorage.getItem("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || sessionStorage.getItem("utm_term") || "",
      utm_content: urlParams.get("utm_content") || sessionStorage.getItem("utm_content") || ""
    };
    Object.entries(utmData).forEach(([key, value]) => {
      if (value) sessionStorage.setItem(key, value);
    });
    setParams((prev) => ({ ...prev, ...utmData }));
  }, []);
  return params;
}
function useAnalytics() {
  const trackEvent = useCallback(async (eventData) => {
    if (typeof window === "undefined") return;
    try {
      const gtag = await waitForGtag();
      if (gtag) {
        gtag("event", eventData.event, {
          event_category: eventData.category,
          event_label: eventData.label,
          value: eventData.value,
          ...eventData
        });
        if (process.env.NODE_ENV === "development") {
          console.log("📊 GA4 Event Sent:", eventData);
        }
      }
    } catch (e) {
      console.warn("Analytics error:", e);
    }
  }, []);
  const trackFormStart = useCallback(() => {
    trackEvent({
      event: "form_start",
      category: "Lead Form",
      action: "Start"
    });
  }, [trackEvent]);
  const trackFormStep = useCallback(
    (step) => {
      trackEvent({
        event: "form_step",
        category: "Lead Form",
        action: `Step ${step}`,
        value: step
      });
    },
    [trackEvent]
  );
  const trackFormSubmit = useCallback(
    (leadId, service) => {
      trackEvent({
        event: "generate_lead",
        category: "Lead Form",
        action: "Submit",
        label: service,
        lead_id: leadId
      });
    },
    [trackEvent]
  );
  const trackFormError = useCallback(
    (error) => {
      trackEvent({
        event: "form_error",
        category: "Lead Form",
        action: "Error",
        label: error
      });
    },
    [trackEvent]
  );
  return {
    trackEvent,
    trackFormStart,
    trackFormStep,
    trackFormSubmit,
    trackFormError
  };
}
function useAnnounce() {
  const announce = useCallback(
    (message, priority = "polite") => {
      if (typeof document === "undefined") return;
      const announcer = document.getElementById("live-region") || createAnnouncer();
      announcer.setAttribute("aria-live", priority);
      announcer.textContent = message;
      setTimeout(() => {
        announcer.textContent = "";
      }, 1e3);
    },
    []
  );
  return announce;
}
function createAnnouncer() {
  const announcer = document.createElement("div");
  announcer.id = "live-region";
  announcer.className = "sr-only";
  document.body.appendChild(announcer);
  return announcer;
}

const initialFormData = {
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
  marketingConsent: false
};
function LeadForm({
  onSuccess,
  variant = "default"
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const formRef = useRef(null);
  const firstInputRef = useRef(null);
  const utmParams = useUTMParams();
  const { trackFormStart, trackFormStep, trackFormSubmit, trackFormError } = useAnalytics();
  const announce = useAnnounce();
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
  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);
  const validateStep1 = useCallback(() => {
    const newErrors = {};
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
  const validateStep2 = useCallback(() => {
    const newErrors = {};
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
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    setErrors({});
    try {
      const submitData = {
        ...formData,
        ...utmParams,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        landingPage: typeof window !== "undefined" ? window.location.pathname : "",
        referrer: typeof document !== "undefined" ? document.referrer : ""
      };
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submitData)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSuccess(true);
        trackFormSubmit(result.leadId || "unknown", formData.servicio);
        announce("Formulario enviado correctamente. Gracias por tu solicitud.", "assertive");
        setTimeout(() => {
          onSuccess?.();
        }, 5e3);
      } else {
        setErrors({ form: result.message || "Error al enviar el formulario" });
        trackFormError(result.error || "unknown");
        announce("Error al enviar el formulario. Por favor, inténtalo de nuevo.", "assertive");
      }
    } catch (error) {
      console.error("Submit error:", error);
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
    onSuccess
  ]);
  const inputClassName = (fieldName) => `
    w-full px-4 py-3.5 rounded-xl border transition-all duration-200
    ${errors[fieldName] ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 bg-gray-50 focus:border-[#6C08B6] focus:ring-[#6C08B6]/20"}
    focus:outline-none focus:ring-2 focus:bg-white
    text-[#0B0D73] placeholder:text-gray-400
  `.trim();
  const selectClassName = (fieldName) => `
    ${inputClassName(fieldName)}
    appearance-none cursor-pointer
    bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")]
    bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]
    pr-10
  `.trim();
  if (success) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-8", role: "alert", "aria-live": "polite", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-[#FC31E6]/20 to-[#6C08B6]/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-[#FC31E6]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
      /* @__PURE__ */ jsx("h4", { className: "text-2xl font-bold text-[#0B0D73] mb-3", children: "¡Solicitud Recibida!" }),
      /* @__PURE__ */ jsxs("p", { className: "text-[#475569] mb-4", children: [
        "Gracias, ",
        /* @__PURE__ */ jsx("strong", { children: formData.nombre.split(" ")[0] }),
        ". Hemos recibido tu solicitud correctamente."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-3 bg-gray-50 rounded-lg border border-gray-200", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569]", children: "Te contactaremos en breve para agendar tu auditoría." }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "form",
    {
      ref: formRef,
      onSubmit: handleSubmit,
      noValidate: true,
      "aria-label": "Formulario de solicitud de auditoría",
      className: "space-y-4",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute -left-[9999px]", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "website", children: "No rellenar este campo" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "website",
              name: "website",
              value: formData.website,
              onChange: handleChange,
              tabIndex: -1,
              autoComplete: "off"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mb-6", role: "progressbar", "aria-valuenow": step, "aria-valuemin": 1, "aria-valuemax": 2, children: [
          /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 ${step >= 1 ? "text-[#6C08B6]" : "text-gray-400"}`, children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= 1 ? "bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white" : "bg-gray-200"}`,
                children: step > 1 ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) : "1"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium hidden sm:block", children: "Tus datos" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `w-12 h-0.5 transition-colors ${step >= 2 ? "bg-[#6C08B6]" : "bg-gray-200"}` }),
          /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 ${step >= 2 ? "text-[#6C08B6]" : "text-gray-400"}`, children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= 2 ? "bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white" : "bg-gray-200"}`,
                children: "2"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium hidden sm:block", children: "Tu proyecto" })
          ] })
        ] }),
        errors.form && /* @__PURE__ */ jsx(
          "div",
          {
            className: "mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm",
            role: "alert",
            children: errors.form
          }
        ),
        step === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-fade-in", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "nombre", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
              "Nombre completo ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: firstInputRef,
                type: "text",
                id: "nombre",
                name: "nombre",
                value: formData.nombre,
                onChange: handleChange,
                placeholder: "Ej: María García López",
                className: inputClassName("nombre"),
                autoComplete: "name",
                required: true,
                "aria-required": "true",
                "aria-invalid": !!errors.nombre,
                "aria-describedby": errors.nombre ? "nombre-error" : void 0
              }
            ),
            errors.nombre && /* @__PURE__ */ jsxs("p", { id: "nombre-error", className: "text-red-500 text-xs mt-1 flex items-center gap-1", role: "alert", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
              errors.nombre
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "email", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
                "Email profesional ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  id: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  placeholder: "maria@tuempresa.com",
                  className: inputClassName("email"),
                  autoComplete: "email",
                  required: true,
                  "aria-required": "true",
                  "aria-invalid": !!errors.email,
                  "aria-describedby": errors.email ? "email-error" : void 0
                }
              ),
              errors.email && /* @__PURE__ */ jsxs("p", { id: "email-error", className: "text-red-500 text-xs mt-1 flex items-center gap-1", role: "alert", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
                errors.email
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "telefono", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
                "Teléfono ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  id: "telefono",
                  name: "telefono",
                  value: formData.telefono,
                  onChange: handleChange,
                  placeholder: "+34 600 000 000",
                  className: inputClassName("telefono"),
                  autoComplete: "tel",
                  required: true,
                  "aria-required": "true",
                  "aria-invalid": !!errors.telefono,
                  "aria-describedby": errors.telefono ? "telefono-error" : void 0
                }
              ),
              errors.telefono && /* @__PURE__ */ jsxs("p", { id: "telefono-error", className: "text-red-500 text-xs mt-1 flex items-center gap-1", role: "alert", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
                errors.telefono
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "empresa", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
                "Empresa ",
                /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs", children: "(opcional)" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "empresa",
                  name: "empresa",
                  value: formData.empresa,
                  onChange: handleChange,
                  placeholder: "Nombre de tu empresa",
                  className: inputClassName("empresa"),
                  autoComplete: "organization"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "cargo", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
                "Tu cargo ",
                /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs", children: "(opcional)" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "cargo",
                  name: "cargo",
                  value: formData.cargo,
                  onChange: handleChange,
                  placeholder: "Ej: CEO, Director Marketing...",
                  className: inputClassName("cargo"),
                  autoComplete: "organization-title"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "empleados", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
                "Tamaño del equipo ",
                /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs", children: "(opcional)" })
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "empleados",
                  name: "empleados",
                  value: formData.empleados,
                  onChange: handleChange,
                  className: selectClassName("empleados"),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona una opción" }),
                    formOptions.empleados.map((option, i) => /* @__PURE__ */ jsx("option", { value: option, children: option }, i))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "sector", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
                "Sector ",
                /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs", children: "(opcional)" })
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "sector",
                  name: "sector",
                  value: formData.sector,
                  onChange: handleChange,
                  className: selectClassName("sector"),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona tu sector" }),
                    formOptions.sectores.map((option, i) => /* @__PURE__ */ jsx("option", { value: option, children: option }, i))
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleNext,
              className: "w-full py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2",
              children: [
                "Continuar",
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-gray-500", children: "Paso 1 de 2 • Tus datos están protegidos" })
        ] }),
        step === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-fade-in", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "servicio", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
              "¿Qué necesitas? ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "servicio",
                name: "servicio",
                value: formData.servicio,
                onChange: handleChange,
                className: selectClassName("servicio"),
                required: true,
                "aria-required": "true",
                "aria-invalid": !!errors.servicio,
                "aria-describedby": errors.servicio ? "servicio-error" : void 0,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona el servicio que más te interesa" }),
                  formOptions.servicios.map((option, i) => /* @__PURE__ */ jsx("option", { value: option, children: option }, i))
                ]
              }
            ),
            errors.servicio && /* @__PURE__ */ jsxs("p", { id: "servicio-error", className: "text-red-500 text-xs mt-1 flex items-center gap-1", role: "alert", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
              errors.servicio
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "presupuesto", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
                "Presupuesto estimado ",
                /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs", children: "(orientativo)" })
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "presupuesto",
                  name: "presupuesto",
                  value: formData.presupuesto,
                  onChange: handleChange,
                  className: selectClassName("presupuesto"),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona un rango" }),
                    formOptions.presupuestos.map((option, i) => /* @__PURE__ */ jsx("option", { value: option, children: option }, i))
                  ]
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Solo para orientarnos, no es vinculante" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "urgencia", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
                "¿Cuándo lo necesitas? ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "urgencia",
                  name: "urgencia",
                  value: formData.urgencia,
                  onChange: handleChange,
                  className: selectClassName("urgencia"),
                  required: true,
                  "aria-required": "true",
                  "aria-invalid": !!errors.urgencia,
                  "aria-describedby": errors.urgencia ? "urgencia-error" : void 0,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona tu urgencia" }),
                    formOptions.urgencias.map((option, i) => /* @__PURE__ */ jsx("option", { value: option, children: option }, i))
                  ]
                }
              ),
              errors.urgencia && /* @__PURE__ */ jsxs("p", { id: "urgencia-error", className: "text-red-500 text-xs mt-1 flex items-center gap-1", role: "alert", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
                errors.urgencia
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "comoNosConociste", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
              "¿Cómo nos conociste? ",
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs", children: "(opcional)" })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "comoNosConociste",
                name: "comoNosConociste",
                value: formData.comoNosConociste,
                onChange: handleChange,
                className: selectClassName("comoNosConociste"),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona una opción" }),
                  formOptions.fuentes.map((option, i) => /* @__PURE__ */ jsx("option", { value: option, children: option }, i))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "mensaje", className: "block text-sm font-medium text-[#334155] mb-1.5", children: [
              "Cuéntanos más sobre tu situación ",
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs", children: "(opcional)" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "mensaje",
                name: "mensaje",
                value: formData.mensaje,
                onChange: handleChange,
                placeholder: "Ejemplo: 'Paso 3 horas/semana actualizando datos en Excel y el CRM manualmente. Me gustaría automatizar esto.'",
                rows: 4,
                className: `${inputClassName("mensaje")} resize-none`
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Cuanto más específico seas, mejor podremos preparar la auditoría" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  id: "privacyConsent",
                  name: "privacyConsent",
                  checked: formData.privacyConsent,
                  onChange: handleChange,
                  className: "mt-1 w-4 h-4 rounded border-gray-300 text-[#6C08B6] focus:ring-[#6C08B6]",
                  required: true,
                  "aria-required": "true",
                  "aria-invalid": !!errors.privacyConsent,
                  "aria-describedby": errors.privacyConsent ? "privacy-error" : void 0
                }
              ),
              /* @__PURE__ */ jsxs("label", { htmlFor: "privacyConsent", className: "text-sm text-[#475569]", children: [
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "* OBLIGATORIO" }),
                " ",
                /* @__PURE__ */ jsx("strong", { children: "Acepto la recopilación de mis datos personales" }),
                " ",
                "conforme a la ",
                /* @__PURE__ */ jsx("a", { href: "/privacidad", className: "text-[#6C08B6] hover:underline", target: "_blank", rel: "noopener noreferrer", children: "Política de Privacidad" }),
                " ",
                "y ",
                /* @__PURE__ */ jsx("a", { href: "/terminos", className: "text-[#6C08B6] hover:underline", target: "_blank", rel: "noopener noreferrer", children: "Términos de Servicio" }),
                ". Entiendo que AI Revolution usará mis datos para contactarme sobre mi auditoría."
              ] })
            ] }),
            errors.privacyConsent && /* @__PURE__ */ jsxs("p", { id: "privacy-error", className: "text-red-500 text-xs flex items-center gap-1 ml-7", role: "alert", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
              errors.privacyConsent
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-[#FC31E6]/5 rounded-lg border border-[#FC31E6]/20", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  id: "marketingConsent",
                  name: "marketingConsent",
                  checked: formData.marketingConsent,
                  onChange: handleChange,
                  className: "mt-1 w-4 h-4 rounded border-gray-300 text-[#6C08B6] focus:ring-[#6C08B6]"
                }
              ),
              /* @__PURE__ */ jsxs("label", { htmlFor: "marketingConsent", className: "text-sm text-[#475569]", children: [
                "✓ (Opcional) Deseo recibir emails sobre servicios, casos de éxito y actualizaciones de AI Revolution.",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Puedo darme de baja en cualquier momento con un click." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: handleBack,
                className: "px-6 py-4 bg-gray-100 text-[#475569] font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16l-4-4m0 0l4-4m-4 4h18" }) }),
                  "Atrás"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: loading,
                className: "flex-1 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2",
                children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("svg", { className: "animate-spin w-5 h-5", fill: "none", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                    /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                  ] }),
                  "Enviando..."
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  "Solicitar Auditoría Gratuita",
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-gray-500", children: "Paso 2 de 2 • Ya casi está" })
        ] })
      ]
    }
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    if (showModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
      const modal = document.getElementById("header-modal");
      const focusableElements = modal?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusableElements?.[0]?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showModal]);
  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);
  const navLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "Resultados", href: "#testimonials" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "header",
      {
        className: `fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5" : "bg-transparent"}`,
        role: "banner",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-4 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center gap-3", "aria-label": "AI Revolution - Ir al inicio", children: [
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("img", { src: "/public/logo.png", alt: "", className: "w-10" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-[#0B0D73]", children: "AI Revolution" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-[#6C08B6] hidden sm:block font-medium", children: "Automatización & IA" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex gap-8 items-center font-medium", "aria-label": "Navegación principal", children: [
              navLinks.map((link, i) => /* @__PURE__ */ jsxs(
                "a",
                {
                  href: link.href,
                  className: "text-[#334155] hover:text-[#6C08B6] transition-colors duration-300 relative group",
                  children: [
                    link.label,
                    /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] transition-all group-hover:w-full", "aria-hidden": "true" })
                  ]
                },
                i
              )),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setShowModal(true),
                  className: "relative px-6 py-2.5 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-full font-semibold shadow-lg shadow-[#FC31E6]/25 hover:shadow-xl hover:shadow-[#FC31E6]/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group",
                  "aria-haspopup": "dialog",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "Solicitar Consulta" }),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#6C08B6] to-[#FC31E6] opacity-0 group-hover:opacity-100 transition-opacity duration-300", "aria-hidden": "true" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors",
                onClick: () => setOpen(!open),
                "aria-label": open ? "Cerrar menú" : "Abrir menú",
                "aria-expanded": open,
                "aria-controls": "mobile-menu",
                children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-[#0B0D73]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: open ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "nav",
            {
              id: "mobile-menu",
              className: `md:hidden bg-white/95 backdrop-blur-md shadow-lg transition-all duration-500 ${open ? "max-h-96 py-4" : "max-h-0 overflow-hidden"}`,
              "aria-label": "Navegación móvil",
              children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 px-6", children: [
                navLinks.map((link, i) => /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: link.href,
                    className: "text-[#334155] hover:text-[#6C08B6] transition py-2",
                    onClick: () => setOpen(false),
                    children: link.label
                  },
                  i
                )),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setOpen(false);
                      setShowModal(true);
                    },
                    className: "px-6 py-3 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-full font-semibold text-center shadow-lg",
                    children: "Solicitar Consulta"
                  }
                )
              ] })
            }
          )
        ]
      }
    ),
    showModal && /* @__PURE__ */ jsxs(
      "div",
      {
        id: "header-modal",
        className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "modal-title",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-[#0B0D73]/80 backdrop-blur-sm animate-fade-in",
              onClick: handleModalClose,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-8 animate-scale-in", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleModalClose,
                className: "absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10",
                "aria-label": "Cerrar formulario",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-[#0B0D73] via-[#6C08B6] to-[#FC31E6] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#6C08B6]/30", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
              /* @__PURE__ */ jsx("h2", { id: "modal-title", className: "text-2xl font-bold text-[#0B0D73] mb-2", children: "Solicita tu Consulta Estratégica" }),
              /* @__PURE__ */ jsx("p", { className: "text-[#475569]", children: "Analizamos tu caso y te proponemos soluciones personalizadas" })
            ] }),
            /* @__PURE__ */ jsx(LeadForm, { onSuccess: handleModalClose }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-4 text-sm text-[#94A3B8]", children: ["100% gratuita", "Sin compromiso", "Respuesta en 24h"].map((text, i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-[#FC31E6]", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                  clipRule: "evenodd"
                }
              ) }),
              text
            ] }, i)) })
          ] })
        ]
      }
    )
  ] });
}

const cookieCategories = [
  {
    id: "necessary",
    name: "Cookies necesarias",
    description: "Imprescindibles para el funcionamiento del sitio. No se pueden desactivar.",
    required: true
  },
  {
    id: "analytics",
    name: "Cookies de análisis",
    description: "Nos ayudan a entender cómo usas el sitio para mejorarlo (Google Analytics).",
    required: false
  },
  {
    id: "marketing",
    name: "Cookies de marketing",
    description: "Permiten mostrarte anuncios relevantes en otras plataformas (Meta, Google Ads).",
    required: false
  },
  {
    id: "preferences",
    name: "Cookies de preferencias",
    description: "Guardan tus preferencias como idioma o configuración de sesión.",
    required: false
  }
];
const CONSENT_VERSION = "1.0.0";
const CONSENT_KEY = "cookie_consent";
function getSavedConsent() {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) return null;
    const consent = JSON.parse(saved);
    if (consent.version !== CONSENT_VERSION) {
      return null;
    }
    return consent;
  } catch {
    return null;
  }
}
function saveConsent(consent) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("cookieConsentUpdate", { detail: consent }));
}
function applyConsent(consent) {
  if (typeof window === "undefined") return;
  if (consent.analytics) {
    window.gtag?.("consent", "update", {
      analytics_storage: "granted"
    });
  } else {
    window.gtag?.("consent", "update", {
      analytics_storage: "denied"
    });
  }
  if (consent.marketing) {
    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      ad_personalization: "granted",
      ad_user_data: "granted"
    });
    window.fbq?.("consent", "grant");
  } else {
    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      ad_personalization: "denied",
      ad_user_data: "denied"
    });
    window.fbq?.("consent", "revoke");
  }
  if (consent.preferences) {
    window.gtag?.("consent", "update", {
      functionality_storage: "granted",
      personalization_storage: "granted"
    });
  } else {
    window.gtag?.("consent", "update", {
      functionality_storage: "denied",
      personalization_storage: "denied"
    });
  }
}
function useCookieConsent() {
  const [consent, setConsent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = getSavedConsent();
    setConsent(saved);
    setIsLoaded(true);
    if (saved) {
      applyConsent(saved);
    }
  }, []);
  const updateConsent = useCallback((newConsent) => {
    const fullConsent = {
      necessary: true,
      analytics: newConsent.analytics ?? false,
      marketing: newConsent.marketing ?? false,
      preferences: newConsent.preferences ?? false,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: CONSENT_VERSION
    };
    setConsent(fullConsent);
    saveConsent(fullConsent);
    applyConsent(fullConsent);
  }, []);
  return { consent, isLoaded, updateConsent };
}
function CookieBanner({
  privacyPolicyUrl = "/privacidad",
  cookiePolicyUrl = "/cookies"
}) {
  const { consent, isLoaded, updateConsent } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [customConsent, setCustomConsent] = useState({
    analytics: false,
    marketing: false,
    preferences: false
  });
  if (!isLoaded || consent) {
    return null;
  }
  const handleAcceptAll = () => {
    updateConsent({
      analytics: true,
      marketing: true,
      preferences: true
    });
  };
  const handleRejectAll = () => {
    updateConsent({
      analytics: false,
      marketing: false,
      preferences: false
    });
  };
  const handleSaveCustom = () => {
    updateConsent(customConsent);
  };
  const toggleCategory = (category) => {
    setCustomConsent((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed bottom-0 left-0 right-0 z-[9999] animate-fade-in",
      role: "dialog",
      "aria-label": "Configuración de cookies",
      "aria-describedby": "cookie-description",
      children: /* @__PURE__ */ jsx("div", { className: "bg-white border-t border-gray-200 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6", children: [
        !showDetails && /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-[#0B0D73] mb-2", children: "🍪 Usamos cookies" }),
            /* @__PURE__ */ jsxs("p", { id: "cookie-description", className: "text-sm text-[#475569]", children: [
              "Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido. Puedes aceptar todas, rechazarlas o personalizar tu elección.",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: cookiePolicyUrl,
                  className: "text-[#6C08B6] hover:underline",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  children: "Más información"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setShowDetails(true),
                className: "px-4 py-2.5 text-sm font-medium text-[#475569] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
                children: "Personalizar"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleRejectAll,
                className: "px-4 py-2.5 text-sm font-medium text-[#475569] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
                children: "Solo necesarias"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleAcceptAll,
                className: "px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] rounded-lg hover:opacity-90 transition-opacity shadow-md",
                children: "Aceptar todas"
              }
            )
          ] })
        ] }),
        showDetails && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-[#0B0D73]", children: "Configuración de cookies" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setShowDetails(false),
                className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
                "aria-label": "Cerrar configuración",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[#475569] mb-4", children: "Selecciona qué tipos de cookies quieres aceptar. Las cookies necesarias no se pueden desactivar ya que son imprescindibles para el funcionamiento del sitio." }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3 mb-6", children: cookieCategories.map((category) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-start gap-3 p-3 bg-gray-50 rounded-lg",
              children: [
                /* @__PURE__ */ jsx("div", { className: "pt-0.5", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    id: `cookie-${category.id}`,
                    checked: category.required || customConsent[category.id] || false,
                    disabled: category.required,
                    onChange: () => !category.required && toggleCategory(category.id),
                    className: "w-4 h-4 rounded border-gray-300 text-[#6C08B6] focus:ring-[#6C08B6] disabled:opacity-50"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxs(
                    "label",
                    {
                      htmlFor: `cookie-${category.id}`,
                      className: "font-medium text-[#334155] text-sm cursor-pointer",
                      children: [
                        category.name,
                        category.required && /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs text-gray-400", children: "(Obligatorias)" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569] mt-0.5", children: category.description })
                ] })
              ]
            },
            category.id
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 sm:gap-3 pt-4 border-t border-gray-200", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleRejectAll,
                className: "px-4 py-2.5 text-sm font-medium text-[#475569] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
                children: "Rechazar todas"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSaveCustom,
                className: "px-4 py-2.5 text-sm font-medium text-[#6C08B6] border border-[#6C08B6] rounded-lg hover:bg-[#6C08B6]/5 transition-colors",
                children: "Guardar selección"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleAcceptAll,
                className: "px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] rounded-lg hover:opacity-90 transition-opacity shadow-md",
                children: "Aceptar todas"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-4", children: [
            'Puedes cambiar tu configuración en cualquier momento desde el enlace "Configuración de cookies" en el pie de página. Consulta nuestra',
            " ",
            /* @__PURE__ */ jsx("a", { href: privacyPolicyUrl, className: "underline hover:text-[#6C08B6]", children: "Política de Privacidad" }),
            " ",
            "y",
            " ",
            /* @__PURE__ */ jsx("a", { href: cookiePolicyUrl, className: "underline hover:text-[#6C08B6]", children: "Política de Cookies" }),
            "."
          ] })
        ] })
      ] }) })
    }
  );
}
function CookieSettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { consent, updateConsent } = useCookieConsent();
  const [localConsent, setLocalConsent] = useState({});
  useEffect(() => {
    if (consent) {
      setLocalConsent({
        analytics: consent.analytics,
        marketing: consent.marketing,
        preferences: consent.preferences
      });
    }
  }, [consent]);
  if (!consent) return null;
  const handleSave = () => {
    updateConsent(localConsent);
    setIsOpen(false);
  };
  const toggleCategory = (category) => {
    setLocalConsent((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "text-gray-400 hover:text-[#FC31E6] transition-colors text-sm",
        children: "Configuración de cookies"
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-[9999] flex items-center justify-center p-4",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Configuración de cookies",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
              onClick: () => setIsOpen(false)
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-scale-in", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsOpen(false),
                className: "absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full",
                "aria-label": "Cerrar",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-[#0B0D73] mb-4", children: "Configuración de cookies" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3 mb-6", children: cookieCategories.map((category) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-start gap-3 p-3 bg-gray-50 rounded-lg",
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      id: `settings-${category.id}`,
                      checked: category.required || localConsent[category.id] || false,
                      disabled: category.required,
                      onChange: () => !category.required && toggleCategory(category.id),
                      className: "mt-0.5 w-4 h-4 rounded border-gray-300 text-[#6C08B6] focus:ring-[#6C08B6]"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "label",
                      {
                        htmlFor: `settings-${category.id}`,
                        className: "font-medium text-[#334155] text-sm cursor-pointer",
                        children: category.name
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569] mt-0.5", children: category.description })
                  ] })
                ]
              },
              category.id
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsOpen(false),
                  className: "flex-1 px-4 py-2.5 text-sm font-medium text-[#475569] border border-gray-300 rounded-lg hover:bg-gray-50",
                  children: "Cancelar"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleSave,
                  className: "flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] rounded-lg",
                  children: "Guardar cambios"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}

function Footer() {
  (/* @__PURE__ */ new Date()).getFullYear();
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ai-revolution-rai-70b2a5398/",
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ai_revolutionagency/",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    }
  ];
  const serviceLinks = [
    { label: "Automatización IA", href: "#servicios" },
    { label: "Marketing Digital", href: "#servicios" },
    { label: "Desarrollo Web", href: "#servicios" },
    { label: "Consultoría Estratégica", href: "#servicios" }
  ];
  const companyLinks = [
    { label: "Nuestro Proceso", href: "#proceso" },
    { label: "Casos de Éxito", href: "#testimonials" },
    { label: "Contacto", href: "#cta" }
  ];
  const legalLinks = [
    { label: "Política de Privacidad", href: "/privacidad" },
    { label: "Términos de Servicio", href: "/terminos" },
    { label: "Aviso Legal", href: "/aviso-legal" },
    { label: "Política de Cookies", href: "/cookies" }
  ];
  return /* @__PURE__ */ jsxs("footer", { className: "relative bg-[#0B0D73] text-gray-300 overflow-hidden", role: "contentinfo", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FC31E6] to-transparent", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-[#6C08B6]/10 rounded-full blur-3xl -z-10", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "relative w-10 h-10 flex items-center justify-center", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/public/logo.png",
                alt: "Logo AI Revolution",
                className: "w-full h-full object-contain",
                loading: "lazy"
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: "AI Revolution" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Transformamos negocios con inteligencia artificial y automatización inteligente." }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: socialLinks.map((social, i) => /* @__PURE__ */ jsx(
            "a",
            {
              href: social.href,
              className: "w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-[#FC31E6] hover:to-[#6C08B6] hover:text-white transition-all duration-300 border border-white/10 hover:border-transparent",
              "aria-label": `Síguenos en ${social.name}`,
              target: "_blank",
              rel: "noopener noreferrer",
              children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: social.icon }) })
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold mb-4", children: "Servicios" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: serviceLinks.map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: link.href, className: "hover:text-[#FC31E6] transition-colors", children: link.label }) }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold mb-4", children: "Empresa" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: companyLinks.map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: link.href, className: "hover:text-[#FC31E6] transition-colors", children: link.label }) }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold mb-4", children: "Legal" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
            legalLinks.map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: link.href, className: "hover:text-[#FC31E6] transition-colors", children: link.label }) }, i)),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(CookieSettingsButton, {}) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 text-sm text-gray-500", children: [
        /* @__PURE__ */ jsx("a", { href: "/privacidad", className: "hover:text-[#FC31E6] transition-colors", children: "Privacidad" }),
        /* @__PURE__ */ jsx("a", { href: "/terminos", className: "hover:text-[#FC31E6] transition-colors", children: "Términos" }),
        /* @__PURE__ */ jsx("a", { href: "/aviso-legal", className: "hover:text-[#FC31E6] transition-colors", children: "Aviso Legal" })
      ] }) })
    ] })
  ] });
}

export { $$MainLayout as $, CookieBanner as C, Footer as F, Header as H, LeadForm as L, CookieSettingsButton as a };
