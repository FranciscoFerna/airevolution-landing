/* empty css                                       */
import { f as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_COIheRYN.mjs';
import 'piccolore';
import { L as LeadForm, $ as $$MainLayout, H as Header, F as Footer, C as CookieBanner } from '../chunks/Footer_DwM9ixFQ.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useEffect, useState } from 'react';
export { renderers } from '../renderers.mjs';

function Hero() {
  const heroRef = useRef(null);
  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll(".hero-animate");
    elements?.forEach((el, i) => {
      const element = el;
      element.style.animationDelay = `${i * 150}ms`;
      element.classList.add("animate-fade-in-up");
    });
  }, []);
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  const trustIndicators = [
    { text: "Sin compromiso" },
    { text: "Análisis personalizado" },
    { text: "Respuesta en 24h" }
  ];
  const stats = [
    {
      value: "50+",
      label: "Procesos analizados",
      sublabel: "En diferentes sectores"
    },
    {
      value: "30-60%",
      label: "Ahorro potencial medio",
      sublabel: "Según análisis de casos"
    },
    {
      value: "2-4",
      label: "Semanas implementación",
      sublabel: "Primera fase funcional"
    }
  ];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: heroRef,
      className: "relative min-h-screen flex flex-col justify-center items-center text-center pt-24 pb-16 px-6 overflow-hidden bg-gradient-to-br from-[#050520] via-[#0B0D73] to-[#1a0a30]",
      "aria-labelledby": "hero-title",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#FC31E610_1px,transparent_1px),linear-gradient(to_bottom,#6C08B610_1px,transparent_1px)] bg-[size:4rem_4rem]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-[#FC31E6]/15 rounded-full blur-3xl animate-float" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#6C08B6]/20 rounded-full blur-3xl animate-float animation-delay-500" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#6C08B6]/10 to-transparent rounded-full" }),
          [...Array(8)].map((_, i) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute w-2 h-2 bg-[#FC31E6]/30 rounded-full",
              style: {
                left: `${10 + i * 12}%`,
                bottom: "-10%",
                animation: `particle ${8 + i * 2}s linear infinite`,
                animationDelay: `${i * 1.2}s`
              }
            },
            i
          ))
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hero-animate opacity-0 mb-8", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-[#FC31E6] rounded-full animate-pulse", "aria-hidden": "true" }),
          "Basado en análisis de 50+ procesos empresariales"
        ] }) }),
        /* @__PURE__ */ jsxs(
          "h1",
          {
            id: "hero-title",
            className: "hero-animate opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 max-w-5xl leading-tight",
            children: [
              "Deja de trabajar",
              " ",
              /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-[#FC31E6] via-[#a855f7] to-[#6C08B6] bg-clip-text text-transparent", children: "para tu negocio" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-white/90", children: "y haz que trabaje por ti" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "hero-animate opacity-0 text-lg md:text-xl text-white/70 mb-4 max-w-2xl leading-relaxed", children: "Identificamos procesos que te quitan horas cada semana: seguimiento de emails, actualización de datos, generación de reportes, gestión de leads..." }),
        /* @__PURE__ */ jsx("p", { className: "hero-animate opacity-0 text-base md:text-lg text-[#FC31E6] font-semibold mb-10", children: "Auditoría gratuita de 30 minutos • Te mostramos 3 oportunidades concretas" }),
        /* @__PURE__ */ jsxs("div", { className: "hero-animate opacity-0 flex flex-col sm:flex-row gap-4 mb-12", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => scrollToSection("#cta"),
              className: "px-8 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#FC31E6]/30 hover:shadow-xl hover:shadow-[#FC31E6]/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2",
              children: [
                "Solicitar Auditoría Gratuita",
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => scrollToSection("#proceso"),
              className: "px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                ) }),
                "Ver Metodología"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hero-animate opacity-0 flex flex-wrap justify-center items-center gap-8 text-sm text-white/60", children: trustIndicators.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-[#FC31E6]", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
              clipRule: "evenodd"
            }
          ) }),
          item.text
        ] }, i)) }),
        /* @__PURE__ */ jsx("div", { className: "hero-animate opacity-0 mt-16 grid grid-cols-3 gap-8 max-w-3xl w-full", children: stats.map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "text-center group cursor-help", children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] bg-clip-text text-transparent", children: stat.value }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm mt-1 font-medium", children: stat.label }),
          /* @__PURE__ */ jsx("p", { className: "text-white/40 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity", children: stat.sublabel })
        ] }, i)) })
      ]
    }
  );
}

const icons = {
  automation: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" }) }),
  marketing: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" }) }),
  web: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" }) }),
  consulting: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" }) })
};
function Features() {
  const sectionRef = useRef(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const features = [
    {
      // REESCRITURA A5: Feature principal
      title: "Automatización con n8n/Make",
      subtitle: "Procesos sin intervención manual",
      description: "Conectamos tus aplicaciones (CRM, Email, Sheets) para crear flujos de trabajo autónomos. Eliminamos el error humano y liberamos a tu equipo de la 'fatiga del dato'.",
      icon: "automation",
      color: "from-[#FC31E6] to-[#6C08B6]",
      realCases: [
        {
          task: "Gestión de Leads en Consultoría",
          before: "6h/semana cualificando y copiando datos",
          after: "Cualificación IA + Sincronización CRM auto",
          saving: "0.5h/semana (Ahorro 92%)"
        },
        {
          task: "Reportes Semanales",
          before: "4h cada viernes consolidando Excel",
          after: "Dashboard auto-actualizado en tiempo real",
          saving: "100% automático"
        }
      ],
      pricing: "Desde 800€ (implementación)",
      timeline: "3 semanas para producción",
      benefits: ["Auditoría de procesos", "Licencias incluidas", "Garantía de funcionamiento"]
    },
    // (Resto de features se mantienen igual o se ajustan ligeramente)
    {
      title: "Marketing Digital ROI",
      subtitle: "Basado en datos, no intuición",
      description: "Campañas medibles con objetivos claros. No hacemos 'branding' vago, sino acciones con KPIs definidos: coste por lead, tasa de conversión, retorno por euro invertido.",
      icon: "marketing",
      color: "from-[#6C08B6] to-[#0B0D73]",
      realCases: [
        { task: "Campaña Google Ads", before: "Coste/lead: 45€", after: "Optimización + segmentación", saving: "Coste/lead: 28€ (-38%)" },
        { task: "Email marketing", before: "Tasa apertura: 12%", after: "Segmentación + A/B testing", saving: "Tasa apertura: 31%" }
      ],
      pricing: "Desde 600€/mes (gestión)",
      timeline: "Primeros resultados en 4-6 semanas",
      benefits: ["Auditoría de campañas actuales", "Dashboard con métricas en tiempo real", "Optimización continua basada en datos"]
    },
    {
      title: "Desarrollo Web Optimizado",
      subtitle: "Rendimiento + Conversión",
      description: "Webs que cargan rápido, convierten visitantes en clientes y son fáciles de mantener. No solo diseño bonito, sino arquitectura pensada para resultados.",
      icon: "web",
      color: "from-[#0B0D73] to-[#FC31E6]",
      realCases: [
        { task: "Velocidad de carga", before: "5.2 segundos", after: "Optimización + CDN", saving: "1.8 segundos (mejora conversión +15%)" },
        { task: "Conversión móvil", before: "1.2%", after: "Rediseño responsive", saving: "2.8% (+133%)" }
      ],
      pricing: "Desde 2.500€ (proyecto completo)",
      timeline: "4-6 semanas desarrollo",
      benefits: ["Análisis de competencia", "Prototipo clickable antes de desarrollar", "Formación para gestión autónoma"]
    },
    {
      title: "Consultoría Estratégica",
      subtitle: "Roadmap personalizado",
      description: "No vendemos packs cerrados. Analizamos tu situación, priorizamos acciones por impacto/esfuerzo y te guiamos en la ejecución.",
      icon: "consulting",
      color: "from-[#6C08B6] to-[#FC31E6]",
      realCases: [
        { task: "Auditoría completa", before: "Sin visibilidad de procesos", after: "Mapa + 5 quick wins identificados", saving: "ROI estimado: 3.2x en 6 meses" }
      ],
      pricing: "150€/hora (sin mínimo)",
      timeline: "Primera sesión: 90 min",
      benefits: ["Diagnóstico sin compromiso", "Plan de acción priorizado", "Soporte en implementación (opcional)"]
    }
  ];
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, id: "servicios", className: "py-24 px-6 bg-[#f8f9fc]", "aria-labelledby": "services-title", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "reveal inline-block px-4 py-1.5 bg-gradient-to-r from-[#FC31E6]/10 to-[#6C08B6]/10 text-[#6C08B6] text-sm font-semibold rounded-full mb-4 border border-[#6C08B6]/20", children: "Nuestros Servicios" }),
        /* @__PURE__ */ jsxs("h2", { id: "services-title", className: "reveal text-3xl md:text-5xl font-bold text-[#0B0D73] mb-4", children: [
          "Soluciones medibles",
          " ",
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] bg-clip-text text-transparent", children: "con impacto real" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "reveal text-lg text-[#475569] max-w-2xl mx-auto", children: "Cada servicio incluye métricas claras, plazos definidos y precios transparentes" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
        "article",
        {
          className: "reveal card-hover bg-white rounded-2xl p-8 border border-gray-100 group cursor-pointer hover:border-[#6C08B6]/20 hover:shadow-lg transition-all duration-300",
          style: { transitionDelay: `${index * 100}ms` },
          onClick: () => setSelectedFeature(feature),
          tabIndex: 0,
          role: "button",
          "aria-label": `Ver detalles de ${feature.title}`,
          onKeyDown: (e) => e.key === "Enter" && setSelectedFeature(feature),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-5", children: [
              /* @__PURE__ */ jsx("div", { className: `w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`, children: icons[feature.icon] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B0D73] group-hover:text-[#6C08B6] transition-colors mb-2", children: feature.title }),
                /* @__PURE__ */ jsx("span", { className: "inline-block px-3 py-1 bg-[#FC31E6]/10 text-[#FC31E6] text-xs font-semibold rounded-full mb-3", children: feature.subtitle }),
                /* @__PURE__ */ jsx("p", { className: "text-[#475569] leading-relaxed mb-4 text-sm", children: feature.description }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4 pb-4 border-b border-gray-100", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569]", children: "Desde" }),
                    /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-[#0B0D73]", children: feature.pricing })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "h-8 w-px bg-gray-200", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569]", children: "Timeline" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-[#334155]", children: feature.timeline })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: feature.benefits.slice(0, 2).map((benefit, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-xs text-[#334155]", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-[#FC31E6] flex-shrink-0", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
                  benefit
                ] }, i)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-gray-100 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-[#6C08B6] font-semibold group-hover:underline", children: "Ver casos completos" }),
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-[#6C08B6] group-hover:translate-x-1 transition-transform", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
            ] })
          ]
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "reveal mt-12 max-w-3xl mx-auto p-4 bg-white rounded-xl border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-sm text-[#475569]", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-[#6C08B6] flex-shrink-0 mt-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Los precios son orientativos y varían según alcance del proyecto. Te proporcionaremos un presupuesto detallado tras la auditoría inicial. ",
          /* @__PURE__ */ jsx("strong", { children: "Primera consulta gratuita y sin compromiso." })
        ] })
      ] }) })
    ] }),
    selectedFeature && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D73]/80 backdrop-blur-sm px-4 animate-fade-in",
        onClick: () => setSelectedFeature(null),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "modal-feature-title",
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-xl animate-scale-in",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors",
                  onClick: () => setSelectedFeature(null),
                  "aria-label": "Cerrar",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: `w-14 h-14 rounded-xl bg-gradient-to-br ${selectedFeature.color} flex items-center justify-center text-white shadow-lg`, children: icons[selectedFeature.icon] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { id: "modal-feature-title", className: "text-2xl font-bold text-[#0B0D73]", children: selectedFeature.title }),
                  /* @__PURE__ */ jsx("span", { className: "text-[#FC31E6] font-semibold text-sm", children: selectedFeature.subtitle })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[#475569] leading-relaxed mb-6", children: selectedFeature.description }),
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-[#0B0D73] mb-4", children: "Casos Reales Anónimos" }),
                /* @__PURE__ */ jsx("div", { className: "space-y-3", children: selectedFeature.realCases.map((realCase, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-[#334155] mb-2", children: realCase.task }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 text-sm", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6C08B6] font-semibold mb-1", children: "ANTES" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[#475569]", children: realCase.before })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6C08B6] font-semibold mb-1", children: "SOLUCIÓN" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[#475569]", children: realCase.after })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6C08B6] font-semibold mb-1", children: "RESULTADO" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[#0B0D73] font-bold", children: realCase.saving })
                    ] })
                  ] })
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4 mb-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-4 bg-[#FC31E6]/5 rounded-lg border border-[#FC31E6]/20", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6C08B6] font-semibold mb-1", children: "INVERSIÓN" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-[#0B0D73] mb-2", children: selectedFeature.pricing }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569]", children: "Presupuesto detallado tras auditoría" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 bg-[#6C08B6]/5 rounded-lg border border-[#6C08B6]/20", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6C08B6] font-semibold mb-1", children: "TIMELINE" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-[#0B0D73] mb-2", children: selectedFeature.timeline }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569]", children: "Depende del alcance del proyecto" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-[#0B0D73] mb-3", children: "Qué incluye" }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: selectedFeature.benefits.map((benefit, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-[#334155]", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-[#FC31E6]", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
                  benefit
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#cta",
                  onClick: () => setSelectedFeature(null),
                  className: "block w-full py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white font-bold rounded-xl text-center shadow-lg hover:shadow-xl transition-all",
                  children: "Solicitar Presupuesto Personalizado"
                }
              )
            ]
          }
        )
      }
    )
  ] });
}

function HowItWorks() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const steps = [
    {
      number: "01",
      title: "Consulta Estratégica",
      description: "Analizamos tu negocio en profundidad. Identificamos cuellos de botella, oportunidades ocultas y el camino más rápido hacia tus objetivos.",
      duration: "30 min",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" }) })
    },
    {
      number: "02",
      title: "Plan Personalizado",
      description: "Diseñamos una estrategia a medida con objetivos claros, KPIs definidos y un roadmap detallado paso a paso.",
      duration: "48h",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" }) })
    },
    {
      number: "03",
      title: "Implementación Ágil",
      description: "Ponemos todo en marcha en tiempo récord. Automatizaciones, campañas, web... todo funcionando y generando resultados.",
      duration: "2-4 sem",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" }) })
    },
    {
      number: "04",
      title: "Optimización Continua",
      description: "Monitoreamos métricas en tiempo real y optimizamos constantemente. Tu negocio mejora cada día, automáticamente.",
      duration: "Siempre",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" }) })
    }
  ];
  return /* @__PURE__ */ jsx("section", { ref: sectionRef, id: "proceso", className: "py-24 px-6 bg-white overflow-hidden", "aria-labelledby": "process-title", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("span", { className: "reveal inline-block px-4 py-1.5 bg-gradient-to-r from-[#FC31E6]/10 to-[#6C08B6]/10 text-[#6C08B6] text-sm font-semibold rounded-full mb-4 border border-[#6C08B6]/20", children: "Nuestro Proceso" }),
      /* @__PURE__ */ jsxs("h2", { id: "process-title", className: "reveal text-3xl md:text-5xl font-bold text-[#0B0D73] mb-4", children: [
        "De la idea a los",
        " ",
        /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] bg-clip-text text-transparent", children: "resultados" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "reveal text-lg text-[#475569] max-w-2xl mx-auto", children: "Un proceso probado que ha transformado más de 50 empresas" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#FC31E6] via-[#6C08B6] to-[#0B0D73] rounded-full", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: steps.map((step, index) => /* @__PURE__ */ jsxs("article", { className: "reveal relative group", style: { transitionDelay: `${index * 150}ms` }, children: [
        index < steps.length - 1 && /* @__PURE__ */ jsx("div", { className: "lg:hidden absolute left-7 top-20 bottom-0 w-0.5 bg-gradient-to-b from-[#FC31E6] to-[#6C08B6]", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "relative bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100 hover:border-[#6C08B6]/20 hover:bg-white transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#6C08B6]/10", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-6 w-14 h-14 bg-gradient-to-br from-[#FC31E6] to-[#6C08B6] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#FC31E6]/30 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: step.number }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-2 right-4 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-[#6C08B6]", children: step.duration }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 mb-4 text-[#6C08B6]", "aria-hidden": "true", children: step.icon }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B0D73] mb-3", children: step.title }),
          /* @__PURE__ */ jsx("p", { className: "text-[#475569] leading-relaxed text-sm", children: step.description })
        ] })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "reveal text-center mt-16", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: "#cta",
        className: "inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-xl font-bold shadow-lg shadow-[#FC31E6]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        children: [
          "Empezar mi Transformación",
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
        ]
      }
    ) })
  ] }) });
}

function Testimonials() {
  const sectionRef = useRef(null);
  const [selectedCase, setSelectedCase] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const caseStudies = [
    {
      sector: "Retail Local",
      size: "5-10 empleados",
      challenge: "Actualización manual de inventario en tienda física y web (6h/semana)",
      solution: "Sincronización automática con sistema POS",
      timeline: "2 semanas implementación",
      results: ["5h/semana ahorradas", "Reducción errores de stock 90%", "Actualización en tiempo real"],
      roi: "260h/año ahorradas (≈6.500€)",
      type: "Caso estimado basado en análisis",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" }) })
    },
    {
      sector: "Consultoría Digital",
      size: "1-5 empleados",
      challenge: "Generación manual de informes mensuales para clientes (8h/mes)",
      solution: "Plantillas automatizadas + integración analytics",
      timeline: "3 semanas implementación",
      results: ["6.5h/mes ahorradas por cliente", "Informes más consistentes", "Envío programado automático"],
      roi: "78h/año ahorradas (≈1.950€)",
      type: "Caso estimado basado en análisis",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) })
    },
    {
      sector: "E-commerce",
      size: "10-20 empleados",
      challenge: "Gestión manual de pedidos en múltiples marketplaces (12h/semana)",
      solution: "Panel centralizado + automatización de confirmaciones",
      timeline: "4 semanas implementación",
      results: ["9h/semana ahorradas", "Tiempo de respuesta -60%", "Satisfacción cliente +25%"],
      roi: "468h/año ahorradas (≈11.700€)",
      type: "Caso estimado basado en análisis",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" }) })
    }
  ];
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, id: "testimonials", className: "relative py-24 px-6 overflow-hidden", "aria-labelledby": "testimonials-title", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#0B0D73] via-[#6C08B6] to-[#0B0D73] -z-10", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-64 h-64 bg-[#FC31E6]/20 rounded-full blur-3xl -z-10", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 right-10 w-80 h-80 bg-[#6C08B6]/30 rounded-full blur-3xl -z-10", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "reveal inline-block px-4 py-1.5 bg-[#FC31E6]/20 text-[#FC31E6] text-sm font-semibold rounded-full mb-4 backdrop-blur border border-[#FC31E6]/30", children: "Análisis de Casos" }),
        /* @__PURE__ */ jsxs("h2", { id: "testimonials-title", className: "reveal text-3xl md:text-5xl font-bold text-white mb-4", children: [
          "Casos de uso",
          " ",
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-[#FC31E6] to-white bg-clip-text text-transparent", children: "reales anónimos" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "reveal text-lg text-gray-300 max-w-2xl mx-auto", children: "Ejemplos de ahorro potencial basados en auditorías previas. Los resultados varían según cada negocio." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "reveal max-w-3xl mx-auto mb-12 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-white/90 text-sm", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-[#FC31E6] flex-shrink-0 mt-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Nota de transparencia:" }),
            " Estos son casos estimados basados en análisis de procesos de empresas similares. No son clientes actuales (para preservar confidencialidad). Los resultados reales dependen de tu situación específica."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-white/70", children: "Te proporcionaremos una estimación personalizada y exacta tras tu auditoría gratuita." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-16", children: caseStudies.map((study, index) => /* @__PURE__ */ jsxs(
        "article",
        {
          className: "reveal card-hover bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-[#FC31E6]/20 group hover:bg-white/10 hover:border-[#FC31E6]/40 transition-all duration-300 cursor-pointer",
          style: { transitionDelay: `${index * 100}ms` },
          onClick: () => setSelectedCase(study),
          tabIndex: 0,
          role: "button",
          "aria-label": `Ver detalles del caso ${study.sector}`,
          onKeyDown: (e) => e.key === "Enter" && setSelectedCase(study),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-[#FC31E6]/20 to-[#6C08B6]/20 flex items-center justify-center text-[#FC31E6] border border-[#FC31E6]/30", children: study.icon }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: study.sector }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: study.size })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-[#FC31E6] mb-1", children: "Desafío:" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: study.challenge })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2 mb-4", children: study.results.slice(0, 2).map((result, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-[#FC31E6]", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
              result
            ] }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gradient-to-r from-[#FC31E6]/10 to-[#6C08B6]/10 rounded-lg border border-[#FC31E6]/30 mb-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Ahorro estimado:" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-[#FC31E6]", children: study.roi })
            ] }),
            /* @__PURE__ */ jsxs("button", { className: "w-full py-2 text-sm text-[#FC31E6] font-semibold hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:gap-3", children: [
              "Ver detalles completos",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 transition-transform group-hover:translate-x-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-center mt-3", children: study.type })
          ]
        },
        index
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "reveal text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-4", children: "¿Quieres saber cuánto podrías ahorrar en tu caso específico?" }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#cta",
            className: "inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-xl font-bold shadow-lg shadow-[#FC31E6]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
            children: [
              "Solicitar Auditoría Gratuita",
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
            ]
          }
        )
      ] })
    ] }),
    selectedCase && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
        onClick: () => setSelectedCase(null),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "case-modal-title",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B0D73]/90 backdrop-blur-sm animate-fade-in", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto",
              onClick: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors",
                    onClick: () => setSelectedCase(null),
                    "aria-label": "Cerrar",
                    children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FC31E6]/20 to-[#6C08B6]/20 flex items-center justify-center text-[#FC31E6] border border-[#FC31E6]/30", children: selectedCase.icon }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { id: "case-modal-title", className: "text-2xl font-bold text-[#0B0D73]", children: selectedCase.sector }),
                    /* @__PURE__ */ jsx("p", { className: "text-[#475569]", children: selectedCase.size })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-[#6C08B6] mb-2", children: "DESAFÍO" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[#334155]", children: selectedCase.challenge })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-[#6C08B6] mb-2", children: "SOLUCIÓN IMPLEMENTADA" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[#334155]", children: selectedCase.solution }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#475569] mt-1", children: [
                      "Tiempo de implementación: ",
                      selectedCase.timeline
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-[#6C08B6] mb-3", children: "RESULTADOS OBTENIDOS" }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: selectedCase.results.map((result, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#334155]", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-[#FC31E6]", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
                      result
                    ] }, i)) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gradient-to-r from-[#FC31E6]/10 to-[#6C08B6]/10 rounded-xl border border-[#6C08B6]/20", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-[#6C08B6] mb-1", children: "ROI ESTIMADO" }),
                    /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-[#0B0D73]", children: selectedCase.roi }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569] mt-2", children: "*Cálculo basado en coste medio por hora (25€) y análisis de procesos similares" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50 rounded-xl", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#475569]", children: [
                    /* @__PURE__ */ jsx("strong", { children: "Nota:" }),
                    " Este es un caso estimado basado en análisis de procesos reales. Los resultados específicos para tu negocio dependerán de tu situación particular. Te proporcionaremos una estimación personalizada tras la auditoría gratuita."
                  ] }) })
                ] }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#cta",
                    onClick: () => setSelectedCase(null),
                    className: "block w-full mt-6 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white font-bold rounded-xl text-center shadow-lg hover:shadow-xl transition-all",
                    children: "Solicitar Mi Auditoría Personalizada"
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}

function CTA({ recaptchaSiteKey }) {
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const benefits = [
    {
      text: "Auditoría personalizada (30 min)",
      detail: "Identificamos 3-5 quick wins"
    },
    {
      text: "Ahorro potencial de 5-20h/semana",
      detail: "Procesos medibles y escalables"
    },
    {
      text: "Propuesta detallada sin obligación",
      detail: "Plan de acción claro"
    }
  ];
  const faqs = [
    {
      q: "¿Realmente es gratis?",
      a: "Sí. La auditoría inicial es 100% gratuita sin compromiso. Solo pagas si decides implementar."
    },
    {
      q: "¿Cuánto tiempo toma?",
      a: "La auditoría dura 30 minutos. Te enviamos el análisis en PDF en las siguientes 24-48h."
    },
    {
      q: "¿Y si no encuentran nada que automatizar?",
      a: "Te lo diremos con honestidad. Pero en 50+ análisis siempre hemos encontrado al menos 2-3 quick wins."
    },
    {
      q: "¿Qué pasa con mis datos?",
      a: "Solo usamos tu información para contactarte. No compartimos datos con terceros. Ver Política de Privacidad."
    }
  ];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: sectionRef,
      id: "cta",
      className: "relative py-24 px-6 overflow-hidden",
      "aria-labelledby": "cta-title",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#0B0D73] via-[#6C08B6] to-[#FC31E6] -z-10", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-72 h-72 bg-[#FC31E6]/20 rounded-full blur-3xl -z-10 animate-float", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-[#0B0D73]/40 rounded-full blur-3xl -z-10 animate-float animation-delay-500", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C08B6]/20 rounded-full blur-3xl -z-10", "aria-hidden": "true" }),
        [...Array(8)].map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute w-1.5 h-1.5 bg-white/30 rounded-full -z-10",
            style: {
              left: `${10 + i * 12}%`,
              bottom: "-5%",
              animation: `particle ${10 + i}s linear infinite`,
              animationDelay: `${i * 0.8}s`
            },
            "aria-hidden": "true"
          },
          i
        )),
        /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
              /* @__PURE__ */ jsxs("div", { className: "reveal inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-full text-sm text-white font-semibold mb-6 animate-pulse", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-red-200", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z", clipRule: "evenodd" }) }),
                "Últimas 3 auditorías disponibles esta semana"
              ] }),
              /* @__PURE__ */ jsxs("h2", { id: "cta-title", className: "reveal text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight", children: [
                "Identificamos 3-5",
                " ",
                /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-[#FC31E6] to-white bg-clip-text text-transparent", children: "Quick Wins" }),
                " ",
                "para tu negocio"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "reveal text-lg md:text-xl text-white/80 mb-8", children: "En 30 minutos analizamos tus procesos y te entregamos una propuesta detallada de cómo ahorrar horas semanales. Sin obligación de compra." }),
              /* @__PURE__ */ jsx("div", { className: "reveal space-y-3 mb-8", children: benefits.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-white/90", children: [
                /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-[#FC31E6]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-[#FC31E6]", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                    clipRule: "evenodd"
                  }
                ) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: item.text }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-white/60", children: item.detail })
                ] })
              ] }, i)) }),
              /* @__PURE__ */ jsx("div", { className: "reveal flex flex-wrap items-center gap-6 text-sm text-white/70", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "flex -space-x-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-full bg-gradient-to-br from-[#FC31E6] to-[#6C08B6] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white",
                    "aria-hidden": "true",
                    children: i
                  },
                  i
                )) }),
                /* @__PURE__ */ jsx("span", { children: "+50 empresas transformadas" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "reveal", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl p-8 shadow-2xl", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-[#0B0D73] mb-2", children: "Reserva tu Auditoría" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#475569] text-sm", children: "Rellena el formulario para asegurar tu plaza." })
              ] }),
              /* @__PURE__ */ jsx(LeadForm, { recaptchaSiteKey }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569] font-medium", children: "100% Confidencial" }) }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569] font-medium", children: "Sin compromiso" }) }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-xs text-[#475569] font-medium", children: "Respuesta 24h" }) })
              ] }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "reveal mt-16 max-w-4xl mx-auto", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white text-center mb-8", children: "Preguntas Frecuentes" }),
            /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: faqs.map((item, i) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20",
                children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-white mb-2 text-sm", children: item.q }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70", children: item.a })
                ]
              },
              i
            )) })
          ] })
        ] })
      ]
    }
  );
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const recaptchaSiteKey = "";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/vercel/sandbox/primary/src/components/Header", "client:component-export": "default" })} ${renderComponent($$result2, "Hero", Hero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/vercel/sandbox/primary/src/components/Hero", "client:component-export": "default" })} ${renderComponent($$result2, "Features", Features, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/vercel/sandbox/primary/src/components/Features", "client:component-export": "default" })} ${renderComponent($$result2, "HowItWorks", HowItWorks, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/vercel/sandbox/primary/src/components/HowItWorks", "client:component-export": "default" })} ${renderComponent($$result2, "Testimonials", Testimonials, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/vercel/sandbox/primary/src/components/Testimonials", "client:component-export": "default" })} ${renderComponent($$result2, "CTA", CTA, { "client:load": true, "recaptchaSiteKey": recaptchaSiteKey, "client:component-hydration": "load", "client:component-path": "/vercel/sandbox/primary/src/components/CTA", "client:component-export": "default" })} ${renderComponent($$result2, "Footer", Footer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/vercel/sandbox/primary/src/components/Footer", "client:component-export": "default" })} ${renderComponent($$result2, "CookieBanner", CookieBanner, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/vercel/sandbox/primary/src/components/CookieBanner", "client:component-export": "default" })} ` })}`;
}, "/vercel/sandbox/primary/src/pages/index.astro", void 0);
const $$file = "/vercel/sandbox/primary/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
