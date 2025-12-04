"use client";

import { useEffect, useRef, useState } from "react";

// (Mantener objeto 'icons' igual que el original...)
const icons = {
  automation: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  marketing: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
  web: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  consulting: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
};

type IconKey = keyof typeof icons;

interface Feature {
  title: string;
  subtitle: string;
  description: string;
  icon: IconKey;
  color: string;
  realCases: Array<{
    task: string;
    before: string;
    after: string;
    saving: string;
  }>;
  pricing: string;
  timeline: string;
  benefits: string[];
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

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

  const features: Feature[] = [
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
        },
      ],
      pricing: "Desde 800€ (implementación)",
      timeline: "3 semanas para producción",
      benefits: ["Auditoría de procesos", "Licencias incluidas", "Garantía de funcionamiento"],
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
        { task: "Email marketing", before: "Tasa apertura: 12%", after: "Segmentación + A/B testing", saving: "Tasa apertura: 31%" },
      ],
      pricing: "Desde 600€/mes (gestión)",
      timeline: "Primeros resultados en 4-6 semanas",
      benefits: ["Auditoría de campañas actuales", "Dashboard con métricas en tiempo real", "Optimización continua basada en datos"],
    },
    {
      title: "Desarrollo Web Optimizado",
      subtitle: "Rendimiento + Conversión",
      description: "Webs que cargan rápido, convierten visitantes en clientes y son fáciles de mantener. No solo diseño bonito, sino arquitectura pensada para resultados.",
      icon: "web",
      color: "from-[#0B0D73] to-[#FC31E6]",
      realCases: [
        { task: "Velocidad de carga", before: "5.2 segundos", after: "Optimización + CDN", saving: "1.8 segundos (mejora conversión +15%)" },
        { task: "Conversión móvil", before: "1.2%", after: "Rediseño responsive", saving: "2.8% (+133%)" },
      ],
      pricing: "Desde 2.500€ (proyecto completo)",
      timeline: "4-6 semanas desarrollo",
      benefits: ["Análisis de competencia", "Prototipo clickable antes de desarrollar", "Formación para gestión autónoma"],
    },
    {
      title: "Consultoría Estratégica",
      subtitle: "Roadmap personalizado",
      description: "No vendemos packs cerrados. Analizamos tu situación, priorizamos acciones por impacto/esfuerzo y te guiamos en la ejecución.",
      icon: "consulting",
      color: "from-[#6C08B6] to-[#FC31E6]",
      realCases: [
        { task: "Auditoría completa", before: "Sin visibilidad de procesos", after: "Mapa + 5 quick wins identificados", saving: "ROI estimado: 3.2x en 6 meses" },
      ],
      pricing: "150€/hora (sin mínimo)",
      timeline: "Primera sesión: 90 min",
      benefits: ["Diagnóstico sin compromiso", "Plan de acción priorizado", "Soporte en implementación (opcional)"],
    },
  ];

  return (
    <section ref={sectionRef} id="servicios" className="py-24 px-6 bg-[#f8f9fc]" aria-labelledby="services-title">
      {/* (Mantener estructura de renderizado igual...) */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal inline-block px-4 py-1.5 bg-gradient-to-r from-[#FC31E6]/10 to-[#6C08B6]/10 text-[#6C08B6] text-sm font-semibold rounded-full mb-4 border border-[#6C08B6]/20">
            Nuestros Servicios
          </span>
          <h2 id="services-title" className="reveal text-3xl md:text-5xl font-bold text-[#0B0D73] mb-4">
            Soluciones medibles{" "}
            <span className="bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] bg-clip-text text-transparent">
              con impacto real
            </span>
          </h2>
          <p className="reveal text-lg text-[#475569] max-w-2xl mx-auto">
            Cada servicio incluye métricas claras, plazos definidos y precios transparentes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <article
              key={index}
              className="reveal card-hover bg-white rounded-2xl p-8 border border-gray-100 group cursor-pointer hover:border-[#6C08B6]/20 hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedFeature(feature)}
              tabIndex={0}
              role="button"
              aria-label={`Ver detalles de ${feature.title}`}
              onKeyDown={(e) => e.key === "Enter" && setSelectedFeature(feature)}
            >
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {icons[feature.icon]}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0B0D73] group-hover:text-[#6C08B6] transition-colors mb-2">
                    {feature.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-[#FC31E6]/10 text-[#FC31E6] text-xs font-semibold rounded-full mb-3">
                    {feature.subtitle}
                  </span>
                  <p className="text-[#475569] leading-relaxed mb-4 text-sm">{feature.description}</p>

                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-[#475569]">Desde</p>
                      <p className="text-lg font-bold text-[#0B0D73]">{feature.pricing}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-[#475569]">Timeline</p>
                      <p className="text-sm font-semibold text-[#334155]">{feature.timeline}</p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {feature.benefits.slice(0, 2).map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#334155]">
                        <svg className="w-4 h-4 text-[#FC31E6] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-[#6C08B6] font-semibold group-hover:underline">Ver casos completos</span>
                <svg className="w-5 h-5 text-[#6C08B6] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </article>
          ))}
        </div>

        {/* Pricing disclaimer */}
        <div className="reveal mt-12 max-w-3xl mx-auto p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-start gap-3 text-sm text-[#475569]">
            <svg className="w-5 h-5 text-[#6C08B6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              Los precios son orientativos y varían según alcance del proyecto. Te proporcionaremos un presupuesto
              detallado tras la auditoría inicial. <strong>Primera consulta gratuita y sin compromiso.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Modal - (Mantener igual, usa selectedFeature) */}
      {selectedFeature && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D73]/80 backdrop-blur-sm px-4 animate-fade-in"
          onClick={() => setSelectedFeature(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-feature-title"
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              onClick={() => setSelectedFeature(null)}
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedFeature.color} flex items-center justify-center text-white shadow-lg`}>
                {icons[selectedFeature.icon]}
              </div>
              <div>
                <h3 id="modal-feature-title" className="text-2xl font-bold text-[#0B0D73]">{selectedFeature.title}</h3>
                <span className="text-[#FC31E6] font-semibold text-sm">{selectedFeature.subtitle}</span>
              </div>
            </div>

            <p className="text-[#475569] leading-relaxed mb-6">{selectedFeature.description}</p>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-[#0B0D73] mb-4">Casos Reales Anónimos</h4>
              <div className="space-y-3">
                {selectedFeature.realCases.map((realCase, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-semibold text-[#334155] mb-2">{realCase.task}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-[#6C08B6] font-semibold mb-1">ANTES</p>
                        <p className="text-[#475569]">{realCase.before}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6C08B6] font-semibold mb-1">SOLUCIÓN</p>
                        <p className="text-[#475569]">{realCase.after}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6C08B6] font-semibold mb-1">RESULTADO</p>
                        <p className="text-[#0B0D73] font-bold">{realCase.saving}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#FC31E6]/5 rounded-lg border border-[#FC31E6]/20">
                <p className="text-xs text-[#6C08B6] font-semibold mb-1">INVERSIÓN</p>
                <p className="text-xl font-bold text-[#0B0D73] mb-2">{selectedFeature.pricing}</p>
                <p className="text-xs text-[#475569]">Presupuesto detallado tras auditoría</p>
              </div>
              <div className="p-4 bg-[#6C08B6]/5 rounded-lg border border-[#6C08B6]/20">
                <p className="text-xs text-[#6C08B6] font-semibold mb-1">TIMELINE</p>
                <p className="text-xl font-bold text-[#0B0D73] mb-2">{selectedFeature.timeline}</p>
                <p className="text-xs text-[#475569]">Depende del alcance del proyecto</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-[#0B0D73] mb-3">Qué incluye</h4>
              <ul className="space-y-2">
                {selectedFeature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#334155]">
                    <svg className="w-5 h-5 text-[#FC31E6]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#cta"
              onClick={() => setSelectedFeature(null)}
              className="block w-full py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white font-bold rounded-xl text-center shadow-lg hover:shadow-xl transition-all"
            >
              Solicitar Presupuesto Personalizado
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
