"use client";

import { CookieSettingsButton } from "./CookieBanner";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ai-revolution-rai-70b2a5398/",
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ai_revolutionagency/",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
  ];

  const serviceLinks = [
    { label: "Automatización IA", href: "#servicios" },
    { label: "Marketing Digital", href: "#servicios" },
    { label: "Desarrollo Web", href: "#servicios" },
    { label: "Consultoría Estratégica", href: "#servicios" },
  ];

  const companyLinks = [
    { label: "Nuestro Proceso", href: "#proceso" },
    { label: "Casos de Éxito", href: "#testimonials" },
    { label: "Contacto", href: "#cta" },
  ];

  const legalLinks = [
    { label: "Política de Privacidad", href: "/privacidad" },
    { label: "Términos de Servicio", href: "/terminos" },
    { label: "Aviso Legal", href: "/aviso-legal" },
    { label: "Política de Cookies", href: "/cookies" },
  ];

  return (
    <footer className="relative bg-[#0B0D73] text-gray-300 overflow-hidden" role="contentinfo">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FC31E6] to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6C08B6]/10 rounded-full blur-3xl -z-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Nota: En Next.js/Astro, la ruta a public es directa con / */}
                <img
                  src="/public/logo.png"
                  alt="Logo AI Revolution"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xl font-bold text-white">AI Revolution</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transformamos negocios con inteligencia artificial y automatización inteligente.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-[#FC31E6] hover:to-[#6C08B6] hover:text-white transition-all duration-300 border border-white/10 hover:border-transparent"
                  aria-label={`Síguenos en ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-[#FC31E6] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-[#FC31E6] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - IMPORTANTÍSIMO PARA CUMPLIMIENTO */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-[#FC31E6] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="/privacidad" className="hover:text-[#FC31E6] transition-colors">
              Privacidad
            </a>
            <a href="/terminos" className="hover:text-[#FC31E6] transition-colors">
              Términos
            </a>
            <a href="/aviso-legal" className="hover:text-[#FC31E6] transition-colors">
              Aviso Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
