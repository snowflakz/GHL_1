/**
 * Meta Pixel (optional). Configure with VITE_META_PIXEL_ID (see .env.example). Leave empty and nothing loads.
 * Loads only after the visitor grants ad consent (see lib/consent.ts).
 *
 * Events:
 *   PageView          every page view, including client-side navigations
 *   Lead              opt-in form submitted (no email or other personal data is sent to Meta)
 *   InitiateCheckout  thank-you step's "start my free 30-day trial" button clicked
 *   ViewContent       bootcamp video played
 * Google Ads conversions go through GTM via the dataLayer (see lib/funnel.ts), not through this file.
 */

type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
declare global {
  interface Window { fbq?: Fbq; _fbq?: Fbq }
}

export const META_PIXEL_ID = (import.meta.env["VITE_META_PIXEL_ID"] as string | undefined)?.trim() || "";

const isBrowser = () => typeof window !== "undefined";
export const pixelEnabled = () => isBrowser() && Boolean(META_PIXEL_ID);

const newEventId = () => (isBrowser() && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

/** Standard Meta base code, loaded once on the client. */
export function initPixel() {
  if (!pixelEnabled() || window.fbq) return;
  const n: Fbq = function (...args: unknown[]) {
    // eslint-disable-next-line prefer-spread
    n.callMethod ? (n.callMethod as (...a: unknown[]) => void).apply(n, args) : n.queue!.push(args);
  } as Fbq;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  window.fbq = n;
  window._fbq = n;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  window.fbq("init", META_PIXEL_ID);
}

export function track(event: "PageView" | "Lead" | "InitiateCheckout" | "ViewContent", params: Record<string, unknown> = {}) {
  if (!pixelEnabled() || !window.fbq) return;
  window.fbq("track", event, params, { eventID: newEventId() });
}
