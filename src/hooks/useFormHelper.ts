// Custom hooks for the lead form

import { useState, useEffect, useCallback } from "react";

// =========================================
// UTM Parameters Hook
// =========================================
export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landingPage: string;
  referrer: string;
}

export function useUTMParams(): UTMParams {
  const [params, setParams] = useState<UTMParams>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    landingPage: "",
    referrer: "",
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
      referrer: document.referrer || "",
    });

    // Guardar UTMs en sessionStorage para persistencia durante la sesión
    const utmData = {
      utm_source:
        urlParams.get("utm_source") ||
        sessionStorage.getItem("utm_source") ||
        "",
      utm_medium:
        urlParams.get("utm_medium") ||
        sessionStorage.getItem("utm_medium") ||
        "",
      utm_campaign:
        urlParams.get("utm_campaign") ||
        sessionStorage.getItem("utm_campaign") ||
        "",
      utm_term:
        urlParams.get("utm_term") || sessionStorage.getItem("utm_term") || "",
      utm_content:
        urlParams.get("utm_content") ||
        sessionStorage.getItem("utm_content") ||
        "",
    };

    Object.entries(utmData).forEach(([key, value]) => {
      if (value) sessionStorage.setItem(key, value);
    });

    setParams((prev) => ({ ...prev, ...utmData }));
  }, []);

  return params;
}

// =========================================
// Analytics Event Hook
// =========================================
interface AnalyticsEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export function useAnalytics() {
  const trackEvent = useCallback((eventData: AnalyticsEvent) => {
    if (typeof window === "undefined") return;

    // Google Analytics 4 (gtag)
    if (typeof window.gtag === "function") {
      window.gtag("event", eventData.event, {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
        ...eventData,
      });
    }

    // Google Tag Manager dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        ...eventData,
      });
    }

    // Console log en desarrollo
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics Event:", eventData);
    }
  }, []);

  const trackFormStart = useCallback(() => {
    trackEvent({
      event: "form_start",
      category: "Lead Form",
      action: "Start",
    });
  }, [trackEvent]);

  const trackFormStep = useCallback(
    (step: number) => {
      trackEvent({
        event: "form_step",
        category: "Lead Form",
        action: `Step ${step}`,
        value: step,
      });
    },
    [trackEvent]
  );

  const trackFormSubmit = useCallback(
    (leadId: string, service: string) => {
      trackEvent({
        event: "generate_lead",
        category: "Lead Form",
        action: "Submit",
        label: service,
        lead_id: leadId,
      });

      // Conversion event para Google Ads
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // Reemplazar con IDs reales
          value: 1.0,
          currency: "EUR",
        });
      }

      // Meta/Facebook Pixel
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: service,
          lead_id: leadId,
        });
      }
    },
    [trackEvent]
  );

  const trackFormError = useCallback(
    (error: string) => {
      trackEvent({
        event: "form_error",
        category: "Lead Form",
        action: "Error",
        label: error,
      });
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackFormStart,
    trackFormStep,
    trackFormSubmit,
    trackFormError,
  };
}

// =========================================
// reCAPTCHA Hook
// =========================================
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq: (...args: unknown[]) => void;
  }
}

export function useRecaptcha(siteKey: string | null) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!siteKey || typeof window === "undefined") return;

    // Verificar si ya está cargado
    if (window.grecaptcha) {
      setIsLoaded(true);
      return;
    }

    // Cargar script de reCAPTCHA
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.grecaptcha.ready(() => {
        setIsLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup si es necesario
    };
  }, [siteKey]);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!siteKey || !isLoaded || !window.grecaptcha) {
        console.warn("reCAPTCHA not available");
        return null;
      }

      try {
        const token = await window.grecaptcha.execute(siteKey, { action });
        return token;
      } catch (error) {
        console.error("reCAPTCHA execution error:", error);
        return null;
      }
    },
    [siteKey, isLoaded]
  );

  return { isLoaded, executeRecaptcha };
}

// =========================================
// Focus Trap Hook (for modals)
// =========================================
export function useFocusTrap(isActive: boolean) {
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef) return;

    const focusableElements = containerRef.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, containerRef]);

  return setContainerRef;
}

// =========================================
// Announce to Screen Readers Hook
// =========================================
export function useAnnounce() {
  const announce = useCallback(
    (message: string, priority: "polite" | "assertive" = "polite") => {
      if (typeof document === "undefined") return;

      const announcer =
        document.getElementById("live-region") || createAnnouncer();
      announcer.setAttribute("aria-live", priority);
      announcer.textContent = message;

      // Limpiar después de que se lea
      setTimeout(() => {
        announcer.textContent = "";
      }, 1000);
    },
    []
  );

  return announce;
}

function createAnnouncer(): HTMLElement {
  const announcer = document.createElement("div");
  announcer.id = "live-region";
  announcer.setAttribute("role", "status");
  announcer.setAttribute("aria-live", "polite");
  announcer.setAttribute("aria-atomic", "true");
  announcer.className = "sr-only";
  document.body.appendChild(announcer);
  return announcer;
}
