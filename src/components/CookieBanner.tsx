"use client";

import { useState, useEffect, useCallback } from "react";

// Tipos de cookies
export type CookieCategory = "necessary" | "analytics" | "marketing" | "preferences";

export interface CookieConsent {
  necessary: boolean; // Siempre true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
  version: string;
}

// Configuración de categorías
const cookieCategories = [
  {
    id: "necessary" as CookieCategory,
    name: "Cookies necesarias",
    description: "Imprescindibles para el funcionamiento del sitio. No se pueden desactivar.",
    required: true,
  },
  {
    id: "analytics" as CookieCategory,
    name: "Cookies de análisis",
    description: "Nos ayudan a entender cómo usas el sitio para mejorarlo (Google Analytics).",
    required: false,
  },
  {
    id: "marketing" as CookieCategory,
    name: "Cookies de marketing",
    description: "Permiten mostrarte anuncios relevantes en otras plataformas (Meta, Google Ads).",
    required: false,
  },
  {
    id: "preferences" as CookieCategory,
    name: "Cookies de preferencias",
    description: "Guardan tus preferencias como idioma o configuración de sesión.",
    required: false,
  },
];

// Versión del banner (incrementar cuando cambie la política)
const CONSENT_VERSION = "1.0.0";
const CONSENT_KEY = "cookie_consent";

// Obtener consentimiento guardado
function getSavedConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  
  try {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) return null;
    
    const consent = JSON.parse(saved) as CookieConsent;
    
    // Verificar versión
    if (consent.version !== CONSENT_VERSION) {
      return null; // Forzar nueva aceptación si cambia la versión
    }
    
    return consent;
  } catch {
    return null;
  }
}

// Guardar consentimiento
function saveConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  
  // Disparar evento para que otros scripts puedan escuchar
  window.dispatchEvent(new CustomEvent("cookieConsentUpdate", { detail: consent }));
}

// Aplicar consentimiento a scripts de terceros
function applyConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (consent.analytics) {
    // Habilitar GA4
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
    });
  } else {
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
    });
  }

  // Marketing (Google Ads, Meta Pixel)
  if (consent.marketing) {
    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      ad_personalization: "granted",
      ad_user_data: "granted",
    });
    // Meta Pixel consent
    window.fbq?.("consent", "grant");
  } else {
    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      ad_personalization: "denied",
      ad_user_data: "denied",
    });
    window.fbq?.("consent", "revoke");
  }

  // Preferences
  if (consent.preferences) {
    window.gtag?.("consent", "update", {
      functionality_storage: "granted",
      personalization_storage: "granted",
    });
  } else {
    window.gtag?.("consent", "update", {
      functionality_storage: "denied",
      personalization_storage: "denied",
    });
  }
}

// Hook para usar el consentimiento
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = getSavedConsent();
    setConsent(saved);
    setIsLoaded(true);
    
    if (saved) {
      applyConsent(saved);
    }
  }, []);

  const updateConsent = useCallback((newConsent: Partial<CookieConsent>) => {
    const fullConsent: CookieConsent = {
      necessary: true,
      analytics: newConsent.analytics ?? false,
      marketing: newConsent.marketing ?? false,
      preferences: newConsent.preferences ?? false,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    
    setConsent(fullConsent);
    saveConsent(fullConsent);
    applyConsent(fullConsent);
  }, []);

  return { consent, isLoaded, updateConsent };
}

// Componente del banner
interface CookieBannerProps {
  privacyPolicyUrl?: string;
  cookiePolicyUrl?: string;
}

export default function CookieBanner({
  privacyPolicyUrl = "/privacidad",
  cookiePolicyUrl = "/cookies",
}: CookieBannerProps) {
  const { consent, isLoaded, updateConsent } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [customConsent, setCustomConsent] = useState<Partial<CookieConsent>>({
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // No mostrar si ya hay consentimiento o no está cargado
  if (!isLoaded || consent) {
    return null;
  }

  // Aceptar todas
  const handleAcceptAll = () => {
    updateConsent({
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  // Rechazar todas (solo necesarias)
  const handleRejectAll = () => {
    updateConsent({
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  // Guardar selección personalizada
  const handleSaveCustom = () => {
    updateConsent(customConsent);
  };

  // Toggle categoría
  const toggleCategory = (category: CookieCategory) => {
    setCustomConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[9999] animate-fade-in"
      role="dialog"
      aria-label="Configuración de cookies"
      aria-describedby="cookie-description"
    >
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Vista compacta */}
          {!showDetails && (
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-[#0B0D73] mb-2">
                  🍪 Usamos cookies
                </h2>
                <p id="cookie-description" className="text-sm text-[#475569]">
                  Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar 
                  contenido. Puedes aceptar todas, rechazarlas o personalizar tu elección.{" "}
                  <a 
                    href={cookiePolicyUrl} 
                    className="text-[#6C08B6] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Más información
                  </a>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-2.5 text-sm font-medium text-[#475569] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Personalizar
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2.5 text-sm font-medium text-[#475569] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Solo necesarias
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] rounded-lg hover:opacity-90 transition-opacity shadow-md"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          )}

          {/* Vista detallada */}
          {showDetails && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#0B0D73]">
                  Configuración de cookies
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Cerrar configuración"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-[#475569] mb-4">
                Selecciona qué tipos de cookies quieres aceptar. Las cookies necesarias 
                no se pueden desactivar ya que son imprescindibles para el funcionamiento del sitio.
              </p>

              <div className="space-y-3 mb-6">
                {cookieCategories.map((category) => (
                  <div 
                    key={category.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="pt-0.5">
                      <input
                        type="checkbox"
                        id={`cookie-${category.id}`}
                        checked={category.required || customConsent[category.id] || false}
                        disabled={category.required}
                        onChange={() => !category.required && toggleCategory(category.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#6C08B6] focus:ring-[#6C08B6] disabled:opacity-50"
                      />
                    </div>
                    <div className="flex-1">
                      <label 
                        htmlFor={`cookie-${category.id}`}
                        className="font-medium text-[#334155] text-sm cursor-pointer"
                      >
                        {category.name}
                        {category.required && (
                          <span className="ml-2 text-xs text-gray-400">(Obligatorias)</span>
                        )}
                      </label>
                      <p className="text-xs text-[#475569] mt-0.5">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2.5 text-sm font-medium text-[#475569] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Rechazar todas
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2.5 text-sm font-medium text-[#6C08B6] border border-[#6C08B6] rounded-lg hover:bg-[#6C08B6]/5 transition-colors"
                >
                  Guardar selección
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] rounded-lg hover:opacity-90 transition-opacity shadow-md"
                >
                  Aceptar todas
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Puedes cambiar tu configuración en cualquier momento desde el enlace "Configuración de cookies" 
                en el pie de página. Consulta nuestra{" "}
                <a href={privacyPolicyUrl} className="underline hover:text-[#6C08B6]">
                  Política de Privacidad
                </a>{" "}
                y{" "}
                <a href={cookiePolicyUrl} className="underline hover:text-[#6C08B6]">
                  Política de Cookies
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Botón para reabrir la configuración (para el footer)
export function CookieSettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { consent, updateConsent } = useCookieConsent();
  const [localConsent, setLocalConsent] = useState<Partial<CookieConsent>>({});

  useEffect(() => {
    if (consent) {
      setLocalConsent({
        analytics: consent.analytics,
        marketing: consent.marketing,
        preferences: consent.preferences,
      });
    }
  }, [consent]);

  if (!consent) return null;

  const handleSave = () => {
    updateConsent(localConsent);
    setIsOpen(false);
  };

  const toggleCategory = (category: CookieCategory) => {
    setLocalConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-400 hover:text-[#FC31E6] transition-colors text-sm"
      >
        Configuración de cookies
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Configuración de cookies"
        >
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-scale-in">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-bold text-[#0B0D73] mb-4">
              Configuración de cookies
            </h2>

            <div className="space-y-3 mb-6">
              {cookieCategories.map((category) => (
                <div 
                  key={category.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    id={`settings-${category.id}`}
                    checked={category.required || localConsent[category.id] || false}
                    disabled={category.required}
                    onChange={() => !category.required && toggleCategory(category.id)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#6C08B6] focus:ring-[#6C08B6]"
                  />
                  <div>
                    <label 
                      htmlFor={`settings-${category.id}`}
                      className="font-medium text-[#334155] text-sm cursor-pointer"
                    >
                      {category.name}
                    </label>
                    <p className="text-xs text-[#475569] mt-0.5">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-[#475569] border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] rounded-lg"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
