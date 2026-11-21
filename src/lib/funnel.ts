import { AFFILIATE_URL } from "@/lib/bootcamp";
import { FORM_ENDPOINT_URL, SUBID_PARAM, isPlaceholder } from "@/lib/config";

/* ───────────────── Attribution: gclid / gbraid / wbraid + utm_* ───────────────── */

const ATTR_COOKIE = "nc_attr";
const NINETY_DAYS = 60 * 60 * 24 * 90;
const CLICK_IDS = ["gclid", "gbraid", "wbraid"] as const;

export type Attribution = Partial<Record<(typeof CLICK_IDS)[number] | `utm_${string}`, string>> & { landing_page?: string; captured_at?: string };

const isBrowser = () => typeof window !== "undefined";

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1] ?? "") : null;
}

export function getAttribution(): Attribution {
  try {
    return JSON.parse(readCookie(ATTR_COOKIE) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

/**
 * Read click IDs and UTMs from the landing URL into a first-party cookie for 90 days.
 * A new ad click replaces the old click IDs; UTMs from the same visit are kept together.
 */
export function captureAttribution(search: string = isBrowser() ? window.location.search : "") {
  if (!isBrowser()) return;
  const params = new URLSearchParams(search);
  const fresh: Attribution = {};
  for (const k of CLICK_IDS) {
    const v = params.get(k);
    if (v) fresh[k] = v.slice(0, 200);
  }
  params.forEach((v, k) => {
    if (k.startsWith("utm_") && v) (fresh as Record<string, string>)[k] = v.slice(0, 200);
  });
  if (Object.keys(fresh).length === 0) return;
  const hasNewClick = CLICK_IDS.some((k) => fresh[k]);
  const base = hasNewClick ? {} : getAttribution();
  const next: Attribution = { ...base, ...fresh, landing_page: window.location.pathname, captured_at: new Date().toISOString() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${ATTR_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; Max-Age=${NINETY_DAYS}; Path=/; SameSite=Lax${secure}`;
}

/** The affiliate link with the stored gclid appended as a sub-ID (omitted when there's no gclid). */
export function affiliateUrlWithSubId(): string {
  const gclid = getAttribution().gclid;
  if (!gclid) return AFFILIATE_URL;
  return `${AFFILIATE_URL}&${SUBID_PARAM}=${encodeURIComponent(gclid)}`;
}

/* ───────────────── dataLayer ───────────────── */

type DL = Record<string, unknown>;
declare global {
  interface Window { dataLayer?: unknown[] }
}

export function pushDL(obj: DL) {
  if (!isBrowser()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}

/* ───────────────── Lead delivery: never lose the lead ───────────────── */

export type Lead = {
  first_name: string;
  email: string;
  gclid: string;
  gbraid?: string;
  wbraid?: string;
  utm?: Record<string, string>;
  page: string;
  submitted_at: string;
  source: string;
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
    /* storage blocked: nothing more we can do in-browser */
  }
}

async function postLead(lead: Lead): Promise<boolean> {
  if (isPlaceholder(FORM_ENDPOINT_URL, "FORM_ENDPOINT_URL")) {
    console.warn("[NuvoraCore] FORM_ENDPOINT_URL is still a placeholder. Lead kept in this browser's retry queue.");
    return false;
  }
  const body = JSON.stringify(lead);
  try {
    const res = await fetch(FORM_ENDPOINT_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
    if (res.ok) return true;
  } catch {
    /* CORS or network: fall through to a beacon, which delivers without needing a readable response */
  }
  try {
    return navigator.sendBeacon?.(FORM_ENDPOINT_URL, new Blob([body], { type: "text/plain" })) ?? false;
  } catch {
    return false;
  }
}

/**
 * Save the lead locally FIRST, then try to send it. Only a confirmed send removes it from the queue,
 * so a failed request is retried on the visitor's next page view (max 5 attempts).
 */
export async function submitLead(lead: Lead): Promise<"sent" | "queued"> {
  const q = readQueue();
  q.push({ lead, attempts: 0 });
  writeQueue(q);
  const ok = await postLead(lead);
  const rest = readQueue().filter((x) => !(x.lead.email === lead.email && x.lead.submitted_at === lead.submitted_at));
  writeQueue(ok ? rest : [...rest, { lead, attempts: 1 }]);
  return ok ? "sent" : "queued";
}

export async function flushLeadQueue() {
  if (!isBrowser()) return;
  const q = readQueue();
  if (q.length === 0 || isPlaceholder(FORM_ENDPOINT_URL, "FORM_ENDPOINT_URL")) return;
  const keep: Queued[] = [];
  for (const item of q) {
    const ok = await postLead(item.lead);
    if (!ok && item.attempts + 1 < 5) keep.push({ ...item, attempts: item.attempts + 1 });
  }
  writeQueue(keep);
}

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
