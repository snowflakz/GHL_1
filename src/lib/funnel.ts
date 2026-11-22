import { LEAD_WEBHOOK_URL, webhookConfigured } from "@/lib/config";

/* ───────────────── Attribution: gclid / gbraid / wbraid + utm_* (sessionStorage) ───────────────── */

const ATTR_KEY = "nc_attr";
export const ATTR_PARAMS = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Attribution = Partial<Record<(typeof ATTR_PARAMS)[number], string>>;

const isBrowser = () => typeof window !== "undefined";

export function getAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

/**
 * On page load, read click IDs and UTMs from the URL into sessionStorage (this tab's session only).
 * A visit with a new click ID replaces the old set; a visit with none keeps what's stored.
 */
export function captureAttribution(search: string = isBrowser() ? window.location.search : "") {
  if (!isBrowser()) return;
  const params = new URLSearchParams(search);
  const fresh: Attribution = {};
  for (const k of ATTR_PARAMS) {
    const v = params.get(k);
    if (v) fresh[k] = v.slice(0, 200);
  }
  if (Object.keys(fresh).length === 0) return;
  const hasClick = Boolean(fresh.gclid || fresh.gbraid || fresh.wbraid);
  const next = hasClick ? fresh : { ...getAttribution(), ...fresh };
  try {
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(next));
  } catch {
    /* storage blocked: attribution just isn't kept */
  }
}

/* ───────────────── dataLayer ───────────────── */

declare global {
  interface Window { dataLayer?: unknown[] }
}

export function pushDL(obj: Record<string, unknown>) {
  if (!isBrowser()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}

/** Every time someone is sent to a HighLevel affiliate URL. */
export function pushAffiliateClick(extra: Record<string, unknown> = {}) {
  pushDL({ event: "affiliate_click", destination: "highlevel", utm_term: getAttribution().utm_term ?? "", ...extra });
}

/** True for any HighLevel affiliate URL (gohighlevel.com with an fp_ref). */
export const isAffiliateHref = (href: string) => /gohighlevel\.com/i.test(href) && /[?&]fp_ref=/i.test(href);

/* ───────────────── Lead delivery (fire-and-forget, 1.5s timeout, never lost) ───────────────── */

export type Lead = {
  first_name: string;
  email: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  timestamp: string;
  page_url: string;
};

const QUEUE_KEY = "nc_lead_queue";
type Queued = { lead: Lead; attempts: number };

function readQueue(): Queued[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? "[]") as Queued[];
  } catch {
    return [];
  }
}
function writeQueue(q: Queued[]) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-20)));
  } catch {
    /* storage blocked */
  }
}
const sameLead = (a: Lead, b: Lead) => a.email === b.email && a.timestamp === b.timestamp;

/** POST the lead as JSON in the request BODY (never in the URL), giving up after 1.5 seconds. */
async function postLead(lead: Lead): Promise<boolean> {
  if (!webhookConfigured()) {
    console.warn("[NuvoraCore] LEAD_WEBHOOK_URL is still a placeholder. Lead kept in this browser's retry queue.");
    return false;
  }
  const body = JSON.stringify(lead);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 1500);
  try {
    const res = await fetch(LEAD_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true, signal: ctrl.signal });
    return res.ok;
  } catch {
    // CORS, network or timeout: a beacon still delivers the body without needing a readable response.
    try {
      return navigator.sendBeacon?.(LEAD_WEBHOOK_URL, new Blob([body], { type: "text/plain" })) ?? false;
    } catch {
      return false;
    }
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fire-and-forget: the lead is saved locally first, then sent in the background. Only a confirmed send
 * clears it, so a failure is retried on the next page view (max 5 attempts). Never blocks the visitor.
 */
export function sendLead(lead: Lead): Promise<"sent" | "queued"> {
  writeQueue([...readQueue(), { lead, attempts: 0 }]);
  return postLead(lead).then((ok) => {
    const rest = readQueue().filter((x) => !sameLead(x.lead, lead));
    writeQueue(ok ? rest : [...rest, { lead, attempts: 1 }]);
    return ok ? "sent" : "queued";
  });
}

export async function flushLeadQueue() {
  if (!isBrowser() || !webhookConfigured()) return;
  const keep: Queued[] = [];
  for (const item of readQueue()) {
    const ok = await postLead(item.lead);
    if (!ok && item.attempts + 1 < 5) keep.push({ ...item, attempts: item.attempts + 1 });
  }
  writeQueue(keep);
}

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
