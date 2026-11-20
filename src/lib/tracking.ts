/**
 * Meta Pixel + lead capture. Configure with two public env vars (see .env.example):
 *   VITE_META_PIXEL_ID      your Meta Pixel / dataset ID. Leave empty and nothing loads or fires.
 *   VITE_LEAD_WEBHOOK_URL   optional: where popup emails are POSTed (e.g. a HighLevel
 *                           "Inbound Webhook" workflow trigger, Zapier or Make).
 *
 * Events (one job each):
 *   PageView              every page view, including client-side navigations
 *   Lead                  every click on an affiliate link (homepage + blog): THE conversion to optimise on
 *   CompleteRegistration  optional email left in the post-click reminder box (plus advanced matching)
 *
 * Every event carries an eventID so a future Conversions API (server) sender can be deduplicated.
 */

type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
declare global {
  interface Window { fbq?: Fbq; _fbq?: Fbq }
}

export const META_PIXEL_ID = (import.meta.env["VITE_META_PIXEL_ID"] as string | undefined)?.trim() || "";
export const LEAD_WEBHOOK_URL = (import.meta.env["VITE_LEAD_WEBHOOK_URL"] as string | undefined)?.trim() || "";

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

export function track(event: "PageView" | "Lead" | "CompleteRegistration" | "ViewContent", params: Record<string, unknown> = {}) {
  if (!pixelEnabled() || !window.fbq) return;
  window.fbq("track", event, params, { eventID: newEventId() });
}

/** Manual advanced matching: the Pixel hashes the email in the browser before sending it to Meta. */
export function identify(email: string, firstName?: string) {
  if (!pixelEnabled() || !window.fbq) return;
  window.fbq("init", META_PIXEL_ID, { em: email.trim().toLowerCase(), ...(firstName ? { fn: firstName.trim().toLowerCase() } : {}) });
}

/** Fire-and-forget POST of the lead to your webhook; survives the page navigating away. */
export function sendLeadToWebhook(lead: { email: string; firstName?: string | undefined; offer: string; placement: string }) {
  if (!isBrowser() || !LEAD_WEBHOOK_URL) return;
  const body = JSON.stringify({ ...lead, source: "highlevel-bootcamp-landing", page: location.href, submitted_at: new Date().toISOString() });
  try {
    // no-cors + text/plain keeps this a "simple" request so cross-origin webhooks accept it without a CORS preflight.
    void fetch(LEAD_WEBHOOK_URL, { method: "POST", mode: "no-cors", keepalive: true, headers: { "Content-Type": "text/plain" }, body });
  } catch {
    /* never block the redirect on tracking */
  }
}

/**
 * Fires `Lead` on every affiliate-link click (any a[data-offer]): click, tap, Enter, and middle-click.
 * Returns a cleanup function.
 */
export function installOfferClickTracking(root: Document = document) {
  const onClick = (e: MouseEvent) => {
    if (e.type === "auxclick" && e.button !== 1) return;
    const a = (e.target as Element | null)?.closest?.("a[data-offer]") as HTMLAnchorElement | null;
    if (!a) return;
    track("Lead", { content_name: a.dataset["offer"], content_category: a.dataset["placement"] ?? "link" });
  };
  root.addEventListener("click", onClick, { capture: true });
  root.addEventListener("auxclick", onClick, { capture: true });
  return () => {
    root.removeEventListener("click", onClick, { capture: true });
    root.removeEventListener("auxclick", onClick, { capture: true });
  };
}

export const isValidEmail =(v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
