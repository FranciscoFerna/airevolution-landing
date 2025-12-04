"use client";

import { useEffect, useRef, useState } from "react";

interface CaseStudy {
  sector: string;
  size: string;
  challenge: string;
  solution: string;
  timeline: string;
  results: string[];
  roi: string;
  type: string;
  icon: React.ReactElement;
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

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

  const caseStudies: CaseStudy[] = [
    {
      sector: "Retail Local",
      size: "5-10 empleados",
      challenge: "Actualización manual de inventario en tienda física y web (6h/semana)",
      solution: "Sincronización automática con sistema POS",
      timeline: "2 semanas implementación",
      results: ["5h/semana ahorradas", "Reducción errores de stock 90%", "Actualización en tiempo real"],
      roi: "260h/año ahorradas (≈6.500€)",
      type: "Caso estimado basado en análisis",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
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
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
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
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-24 px-6 overflow-hidden" aria-labelledby="testimonials-title">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0D73] via-[#6C08B6] to-[#0B0D73] -z-10" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" aria-hidden="true" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#FC31E6]/20 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#6C08B6]/30 rounded-full blur-3xl -z-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal inline-block px-4 py-1.5 bg-[#FC31E6]/20 text-[#FC31E6] text-sm font-semibold rounded-full mb-4 backdrop-blur border border-[#FC31E6]/30">
            Análisis de Casos
          </span>
          <h2 id="testimonials-title" className="reveal text-3xl md:text-5xl font-bold text-white mb-4">
            Casos de uso{" "}
            <span className="bg-gradient-to-r from-[#FC31E6] to-white bg-clip-text text-transparent">
              reales anónimos
            </span>
          </h2>
          <p className="reveal text-lg text-gray-300 max-w-2xl mx-auto">
            Ejemplos de ahorro potencial basados en auditorías previas. Los resultados varían según cada negocio.
          </p>
        </div>

        {/* Disclaimer - REESCRITURA LEGAL A5 */}
        <div className="reveal max-w-3xl mx-auto mb-12 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <div className="flex items-start gap-3 text-white/90 text-sm">
            <svg className="w-5 h-5 text-[#FC31E6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p>
                <strong>Nota de transparencia:</strong> Estos son casos estimados basados en análisis de procesos de empresas similares.
                No son clientes actuales (para preservar confidencialidad). Los resultados reales dependen de tu situación específica.
              </p>
              <p className="mt-2 text-xs text-white/70">
                Te proporcionaremos una estimación personalizada y exacta tras tu auditoría gratuita.
              </p>
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {caseStudies.map((study, index) => (
            <article
              key={index}
              className="reveal card-hover bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-[#FC31E6]/20 group hover:bg-white/10 hover:border-[#FC31E6]/40 transition-all duration-300 cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedCase(study)}
              tabIndex={0}
              role="button"
              aria-label={`Ver detalles del caso ${study.sector}`}
              onKeyDown={(e) => e.key === "Enter" && setSelectedCase(study)}
            >
              {/* Icon + Sector */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FC31E6]/20 to-[#6C08B6]/20 flex items-center justify-center text-[#FC31E6] border border-[#FC31E6]/30">
                  {study.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white">{study.sector}</h3>
                  <p className="text-xs text-gray-400">{study.size}</p>
                </div>
              </div>

              {/* Challenge */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#FC31E6] mb-1">Desafío:</p>
                <p className="text-sm text-gray-300">{study.challenge}</p>
              </div>

              {/* Results Preview */}
              <div className="space-y-2 mb-4">
                {study.results.slice(0, 2).map((result, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-[#FC31E6]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {result}
                  </div>
                ))}
              </div>

              {/* ROI Badge */}
              <div className="p-3 bg-gradient-to-r from-[#FC31E6]/10 to-[#6C08B6]/10 rounded-lg border border-[#FC31E6]/30 mb-4">
                <p className="text-xs text-gray-400 mb-1">Ahorro estimado:</p>
                <p className="text-lg font-bold text-[#FC31E6]">{study.roi}</p>
              </div>

              {/* CTA */}
              <button className="w-full py-2 text-sm text-[#FC31E6] font-semibold hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                Ver detalles completos
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Type badge */}
              <p className="text-xs text-gray-500 text-center mt-3">{study.type}</p>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="reveal text-center">
          <p className="text-gray-300 mb-4">¿Quieres saber cuánto podrías ahorrar en tu caso específico?</p>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-xl font-bold shadow-lg shadow-[#FC31E6]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Solicitar Auditoría Gratuita
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Modal - (Mantener igual que antes) */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedCase(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
        >
          <div className="absolute inset-0 bg-[#0B0D73]/90 backdrop-blur-sm animate-fade-in" aria-hidden="true" />

          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              onClick={() => setSelectedCase(null)}
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FC31E6]/20 to-[#6C08B6]/20 flex items-center justify-center text-[#FC31E6] border border-[#FC31E6]/30">
                {selectedCase.icon}
              </div>
              <div>
                <h3 id="case-modal-title" className="text-2xl font-bold text-[#0B0D73]">{selectedCase.sector}</h3>
                <p className="text-[#475569]">{selectedCase.size}</p>
              </div>
            </div>

            {/* Content sections */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-[#6C08B6] mb-2">DESAFÍO</h4>
                <p className="text-[#334155]">{selectedCase.challenge}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#6C08B6] mb-2">SOLUCIÓN IMPLEMENTADA</h4>
                <p className="text-[#334155]">{selectedCase.solution}</p>
                <p className="text-sm text-[#475569] mt-1">Tiempo de implementación: {selectedCase.timeline}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#6C08B6] mb-3">RESULTADOS OBTENIDOS</h4>
                <div className="space-y-2">
                  {selectedCase.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-3 text-[#334155]">
                      <svg className="w-5 h-5 text-[#FC31E6]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {result}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-[#FC31E6]/10 to-[#6C08B6]/10 rounded-xl border border-[#6C08B6]/20">
                <h4 className="text-sm font-semibold text-[#6C08B6] mb-1">ROI ESTIMADO</h4>
                <p className="text-2xl font-bold text-[#0B0D73]">{selectedCase.roi}</p>
                <p className="text-xs text-[#475569] mt-2">
                  *Cálculo basado en coste medio por hora (25€) y análisis de procesos similares
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-[#475569]">
                  <strong>Nota:</strong> Este es un caso estimado basado en análisis de procesos reales.
                  Los resultados específicos para tu negocio dependerán de tu situación particular.
                  Te proporcionaremos una estimación personalizada tras la auditoría gratuita.
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#cta"
              onClick={() => setSelectedCase(null)}
              className="block w-full mt-6 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white font-bold rounded-xl text-center shadow-lg hover:shadow-xl transition-all"
            >
              Solicitar Mi Auditoría Personalizada
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
