"use client";

import { useEffect, useRef } from "react";
import LeadForm from "./LeadForm";

interface CTAProps {
  recaptchaSiteKey?: string;
}

export default function CTA({ recaptchaSiteKey }: CTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // (Lógica del observer igual...)
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
      detail: "Identificamos 3-5 quick wins",
    },
    {
      text: "Ahorro potencial de 5-20h/semana",
      detail: "Procesos medibles y escalables",
    },
    {
      text: "Propuesta detallada sin obligación",
      detail: "Plan de acción claro",
    },
  ];

  const faqs = [
    {
      q: "¿Realmente es gratis?",
      a: "Sí. La auditoría inicial es 100% gratuita sin compromiso. Solo pagas si decides implementar.",
    },
    {
      q: "¿Cuánto tiempo toma?",
      a: "La auditoría dura 30 minutos. Te enviamos el análisis en PDF en las siguientes 24-48h.",
    },
    {
      q: "¿Y si no encuentran nada que automatizar?",
      a: "Te lo diremos con honestidad. Pero en 50+ análisis siempre hemos encontrado al menos 2-3 quick wins.",
    },
    {
      q: "¿Qué pasa con mis datos?",
      a: "Solo usamos tu información para contactarte. No compartimos datos con terceros. Ver Política de Privacidad.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-24 px-6 overflow-hidden"
      aria-labelledby="cta-title"
    >
      {/* (Background igual...) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0D73] via-[#6C08B6] to-[#FC31E6] -z-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#FC31E6]/20 rounded-full blur-3xl -z-10 animate-float" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0B0D73]/40 rounded-full blur-3xl -z-10 animate-float animation-delay-500" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C08B6]/20 rounded-full blur-3xl -z-10" aria-hidden="true" />

      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white/30 rounded-full -z-10"
          style={{
            left: `${10 + i * 12}%`,
            bottom: "-5%",
            animation: `particle ${10 + i}s linear infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="text-center lg:text-left">
            {/* Badge SCARCITY (A5) */}
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-full text-sm text-white font-semibold mb-6 animate-pulse">
              <svg className="w-4 h-4 text-red-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Últimas 3 auditorías disponibles esta semana
            </div>

            {/* Title - REESCRITURA A5 */}
            <h2 id="cta-title" className="reveal text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Identificamos 3-5{" "}
              <span className="bg-gradient-to-r from-[#FC31E6] to-white bg-clip-text text-transparent">
                Quick Wins
              </span>{" "}
              para tu negocio
            </h2>

            {/* Description */}
            <p className="reveal text-lg md:text-xl text-white/80 mb-8">
              En 30 minutos analizamos tus procesos y te entregamos una propuesta detallada de cómo ahorrar horas semanales. Sin obligación de compra.
            </p>

            {/* Benefits */}
            <div className="reveal space-y-3 mb-8">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-white/90">
                  <div className="w-6 h-6 bg-[#FC31E6]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#FC31E6]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">{item.text}</p>
                    <p className="text-sm text-white/60">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="reveal flex flex-wrap items-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FC31E6] to-[#6C08B6] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white"
                      aria-hidden="true"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span>+50 empresas transformadas</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="reveal">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#0B0D73] mb-2">
                  Reserva tu Auditoría
                </h3>
                <p className="text-[#475569] text-sm">
                  Rellena el formulario para asegurar tu plaza.
                </p>
              </div>

              <LeadForm recaptchaSiteKey={recaptchaSiteKey} />

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-[#475569] font-medium">100% Confidencial</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#475569] font-medium">Sin compromiso</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#475569] font-medium">Respuesta 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal mt-16 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white text-center mb-8">
            Preguntas Frecuentes
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
              >
                <p className="font-semibold text-white mb-2 text-sm">{item.q}</p>
                <p className="text-sm text-white/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
