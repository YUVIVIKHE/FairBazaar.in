"use client";

export type Consent = { analytics: boolean; marketing: boolean; decided: boolean };
export const CONSENT_KEY = "fb-consent-v1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function readConsent(): Consent {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw) return { ...JSON.parse(raw), decided: true };
  } catch {}
  return { analytics: false, marketing: false, decided: false };
}

export function writeConsent(c: Omit<Consent, "decided">) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch {}
  window.dispatchEvent(new CustomEvent("fb:consent", { detail: c }));
}

/** Track a conversion/engagement event. No-ops unless the visitor granted consent. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const c = readConsent();
  if (c.analytics) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    window.gtag?.("event", event, params);
  }
  if (c.marketing && window.fbq) {
    const fbMap: Record<string, string> = { contact_submit: "Lead", demo_request: "Lead", newsletter_signup: "CompleteRegistration" };
    if (fbMap[event]) window.fbq("track", fbMap[event], params);
    else window.fbq("trackCustom", event, params);
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
const ATTR_KEY = "fb-attribution";

/** Stores first-touch UTM + landing page in sessionStorage (functional, no consent needed; sent only with a form the visitor submits). */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(ATTR_KEY)) return;
    const q = new URLSearchParams(location.search);
    const data: Record<string, string> = { landing_page: location.pathname, referrer: document.referrer || "direct" };
    UTM_KEYS.forEach((k) => { const v = q.get(k); if (v) data[k] = v.slice(0, 200); });
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(data));
  } catch {}
}

export function getAttribution(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem(ATTR_KEY) || "{}"); } catch { return {}; }
}
