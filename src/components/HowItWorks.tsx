"use client";

import { useEffect, useRef } from "react";

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

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
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Plan Personalizado",
      description: "Diseñamos una estrategia a medida con objetivos claros, KPIs definidos y un roadmap detallado paso a paso.",
      duration: "48h",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Implementación Ágil",
      description: "Ponemos todo en marcha en tiempo récord. Automatizaciones, campañas, web... todo funcionando y generando resultados.",
      duration: "2-4 sem",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Optimización Continua",
      description: "Monitoreamos métricas en tiempo real y optimizamos constantemente. Tu negocio mejora cada día, automáticamente.",
      duration: "Siempre",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} id="proceso" className="py-24 px-6 bg-white overflow-hidden" aria-labelledby="process-title">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal inline-block px-4 py-1.5 bg-gradient-to-r from-[#FC31E6]/10 to-[#6C08B6]/10 text-[#6C08B6] text-sm font-semibold rounded-full mb-4 border border-[#6C08B6]/20">
            Nuestro Proceso
          </span>
          <h2 id="process-title" className="reveal text-3xl md:text-5xl font-bold text-[#0B0D73] mb-4">
            De la idea a los{" "}
            <span className="bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] bg-clip-text text-transparent">
              resultados
            </span>
          </h2>
          <p className="reveal text-lg text-[#475569] max-w-2xl mx-auto">
            Un proceso probado que ha transformado más de 50 empresas
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#FC31E6] via-[#6C08B6] to-[#0B0D73] rounded-full" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <article key={index} className="reveal relative group" style={{ transitionDelay: `${index * 150}ms` }}>
                {/* Mobile connection line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-7 top-20 bottom-0 w-0.5 bg-gradient-to-b from-[#FC31E6] to-[#6C08B6]" aria-hidden="true" />
                )}

                {/* Step card */}
                <div className="relative bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100 hover:border-[#6C08B6]/20 hover:bg-white transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#6C08B6]/10">
                  {/* Number badge */}
                  <div className="absolute -top-4 left-6 w-14 h-14 bg-gradient-to-br from-[#FC31E6] to-[#6C08B6] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#FC31E6]/30 group-hover:scale-110 transition-transform">
                    <span className="text-lg font-bold">{step.number}</span>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute -top-2 right-4 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-[#6C08B6]">
                    {step.duration}
                  </div>

                  {/* Icon */}
                  <div className="mt-8 mb-4 text-[#6C08B6]" aria-hidden="true">{step.icon}</div>

                  <h3 className="text-xl font-bold text-[#0B0D73] mb-3">{step.title}</h3>
                  <p className="text-[#475569] leading-relaxed text-sm">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal text-center mt-16">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-xl font-bold shadow-lg shadow-[#FC31E6]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Empezar mi Transformación
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
