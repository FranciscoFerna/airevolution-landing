import { useState, useEffect, useCallback } from "react";

// =========================================
// Utility: Esperar a que GA4 esté listo
// =========================================
function waitForGtag(timeout = 2000): Promise<any> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      resolve(window.gtag);
      return;
    }

    let elapsed = 0;
    const interval = 100;

    const check = () => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        resolve(window.gtag);
        return;
      }
      elapsed += interval;
      if (elapsed >= timeout) {
        // Si no carga, resolvemos con una función vacía para no romper la app
        resolve(() => {});
        return;
      }
      setTimeout(check, interval);
    };
    check();
  });
}

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

    const utmData = {
      utm_source: urlParams.get("utm_source") || sessionStorage.getItem("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || sessionStorage.getItem("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || sessionStorage.getItem("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || sessionStorage.getItem("utm_term") || "",
      utm_content: urlParams.get("utm_content") || sessionStorage.getItem("utm_content") || "",
    };

    Object.entries(utmData).forEach(([key, value]) => {
      if (value) sessionStorage.setItem(key, value);
    });

    setParams((prev) => ({ ...prev, ...utmData }));
  }, []);

  return params;
}

// =========================================
// Analytics Event Hook (GA4 + GTM)
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
  const trackEvent = useCallback(async (eventData: AnalyticsEvent) => {
    if (typeof window === "undefined") return;

    try {
      const gtag = await waitForGtag();
      if (gtag) {
        gtag("event", eventData.event, {
          event_category: eventData.category,
          event_label: eventData.label,
          value: eventData.value,
          ...eventData,
        });

        if (process.env.NODE_ENV === 'development') {
            console.log('📊 GA4 Event Sent:', eventData);
        }
      }
    } catch (e) {
      console.warn("Analytics error:", e);
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
// reCAPTCHA & Otros Hooks (Sin cambios)
// =========================================
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq: (...args: unknown[]) => void;
    __sendGA4PageView?: () => void;
  }
}

export function useRecaptcha(siteKey: string | null) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!siteKey || typeof window === "undefined") return;
    if (window.grecaptcha) {
      setIsLoaded(true);
      return;
    }
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
  }, [siteKey]);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!siteKey || !isLoaded || !window.grecaptcha) return null;
      try {
        return await window.grecaptcha.execute(siteKey, { action });
      } catch (error) {
        console.error("reCAPTCHA execution error:", error);
        return null;
      }
    },
    [siteKey, isLoaded]
  );

  return { isLoaded, executeRecaptcha };
}

export function useAnnounce() {
  const announce = useCallback(
    (message: string, priority: "polite" | "assertive" = "polite") => {
      if (typeof document === "undefined") return;
      const announcer = document.getElementById("live-region") || createAnnouncer();
      announcer.setAttribute("aria-live", priority);
      announcer.textContent = message;
      setTimeout(() => { announcer.textContent = ""; }, 1000);
    },
    []
  );
  return announce;
}

function createAnnouncer(): HTMLElement {
  const announcer = document.createElement("div");
  announcer.id = "live-region";
  announcer.className = "sr-only";
  document.body.appendChild(announcer);
  return announcer;
}
