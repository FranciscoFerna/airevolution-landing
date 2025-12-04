"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll(".hero-animate");
    elements?.forEach((el, i) => {
      const element = el as HTMLElement;
      element.style.animationDelay = `${i * 150}ms`;
      element.classList.add("animate-fade-in-up");
    });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const trustIndicators = [
    { text: "Sin compromiso" },
    { text: "Análisis personalizado" },
    { text: "Respuesta en 24h" },
  ];

  const stats = [
    {
      value: "50+",
      label: "Procesos analizados",
      sublabel: "En diferentes sectores",
    },
    {
      value: "30-60%",
      label: "Ahorro potencial medio",
      sublabel: "Según análisis de casos",
    },
    {
      value: "2-4",
      label: "Semanas implementación",
      sublabel: "Primera fase funcional",
    },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-center pt-24 pb-16 px-6 overflow-hidden bg-gradient-to-br from-[#050520] via-[#0B0D73] to-[#1a0a30]"
      aria-labelledby="hero-title"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#FC31E610_1px,transparent_1px),linear-gradient(to_bottom,#6C08B610_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FC31E6]/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#6C08B6]/20 rounded-full blur-3xl animate-float animation-delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#6C08B6]/10 to-transparent rounded-full" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FC31E6]/30 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              bottom: "-10%",
              animation: `particle ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* Badge */}
      <div className="hero-animate opacity-0 mb-8">
        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90">
          <span className="w-2 h-2 bg-[#FC31E6] rounded-full animate-pulse" aria-hidden="true" />
          Basado en análisis de 50+ procesos empresariales
        </span>
      </div>

      {/* Title */}
      <h1
        id="hero-title"
        className="hero-animate opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 max-w-5xl leading-tight"
      >
        Deja de trabajar{" "}
        <span className="bg-gradient-to-r from-[#FC31E6] via-[#a855f7] to-[#6C08B6] bg-clip-text text-transparent">
          para tu negocio
        </span>
        <br />
        <span className="text-white/90">y haz que trabaje por ti</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-animate opacity-0 text-lg md:text-xl text-white/70 mb-4 max-w-2xl leading-relaxed">
        Identificamos procesos que te quitan horas cada semana: seguimiento de emails, actualización de datos,
        generación de reportes, gestión de leads...
      </p>

      {/* Value proposition */}
      <p className="hero-animate opacity-0 text-base md:text-lg text-[#FC31E6] font-semibold mb-10">
        Auditoría gratuita de 30 minutos • Te mostramos 3 oportunidades concretas
      </p>

      {/* CTAs */}
      <div className="hero-animate opacity-0 flex flex-col sm:flex-row gap-4 mb-12">
        <button
          onClick={() => scrollToSection("#cta")}
          className="px-8 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#FC31E6]/30 hover:shadow-xl hover:shadow-[#FC31E6]/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
        >
          Solicitar Auditoría Gratuita
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <button
          onClick={() => scrollToSection("#proceso")}
          className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Ver Metodología
        </button>
      </div>

      {/* Trust indicators */}
      <div className="hero-animate opacity-0 flex flex-wrap justify-center items-center gap-8 text-sm text-white/60">
        {trustIndicators.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#FC31E6]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {item.text}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="hero-animate opacity-0 mt-16 grid grid-cols-3 gap-8 max-w-3xl w-full">
        {stats.map((stat, i) => (
          <div key={i} className="text-center group cursor-help">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] bg-clip-text text-transparent">
              {stat.value}
            </p>
            <p className="text-white/70 text-sm mt-1 font-medium">{stat.label}</p>
            <p className="text-white/40 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {stat.sublabel}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
