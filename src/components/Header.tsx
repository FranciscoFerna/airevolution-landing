"use client";

import { useState, useEffect, useCallback } from "react";
import LeadForm from "./LeadForm";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };

    if (showModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);

      // Focus trap
      const modal = document.getElementById("header-modal");
      const focusableElements = modal?.querySelectorAll<HTMLElement>(
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
    { label: "Resultados", href: "#testimonials" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3" aria-label="AI Revolution - Ir al inicio">
            <div className="relative">
              <img src="/logo.png" alt="" className="w-10" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#0B0D73]">AI Revolution</span>
              <span className="text-xs text-[#6C08B6] hidden sm:block font-medium">Automatización & IA</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center font-medium" aria-label="Navegación principal">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-[#334155] hover:text-[#6C08B6] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] transition-all group-hover:w-full" aria-hidden="true" />
              </a>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="relative px-6 py-2.5 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-full font-semibold shadow-lg shadow-[#FC31E6]/25 hover:shadow-xl hover:shadow-[#FC31E6]/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group"
              aria-haspopup="dialog"
            >
              <span className="relative z-10">Solicitar Consulta</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#6C08B6] to-[#FC31E6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6 text-[#0B0D73]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        <nav
          id="mobile-menu"
          className={`md:hidden bg-white/95 backdrop-blur-md shadow-lg transition-all duration-500 ${
            open ? "max-h-96 py-4" : "max-h-0 overflow-hidden"
          }`}
          aria-label="Navegación móvil"
        >
          <div className="flex flex-col gap-4 px-6">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-[#334155] hover:text-[#6C08B6] transition py-2"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setShowModal(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-full font-semibold text-center shadow-lg"
            >
              Solicitar Consulta
            </button>
          </div>
        </nav>
      </header>

      {/* Modal Form */}
      {showModal && (
        <div
          id="header-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="absolute inset-0 bg-[#0B0D73]/80 backdrop-blur-sm animate-fade-in"
            onClick={handleModalClose}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-8 animate-scale-in">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
              aria-label="Cerrar formulario"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0B0D73] via-[#6C08B6] to-[#FC31E6] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#6C08B6]/30">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 id="modal-title" className="text-2xl font-bold text-[#0B0D73] mb-2">
                Solicita tu Consulta Estratégica
              </h2>
              <p className="text-[#475569]">
                Analizamos tu caso y te proponemos soluciones personalizadas
              </p>
            </div>

            <LeadForm onSuccess={handleModalClose} />

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-4 text-sm text-[#94A3B8]">
              {["100% gratuita", "Sin compromiso", "Respuesta en 24h"].map((text, i) => (
                <span key={i} className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-[#FC31E6]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
