/**
 * Every affiliate link on the site lives here. Change a link once and every CTA and blog post updates.
 * Offers were reviewed on 2026-11-18 (see notes). The AI chat widget workshop
 * (gohighlevel.com/ai-chat-widget-workshop) returned 404 that day, so it is left out until it is live again.
 */
export const OFFERS = {
  platform: { url: "https://www.gohighlevel.com/?fp_ref=tayo17", name: "HighLevel 14-day free trial" },
  starterAnnual: { url: "https://www.gohighlevel.com/970?fp_ref=tayo17", name: "HighLevel Starter annual plan ($970/year)" },
  annualPlans: { url: "https://gohighlevel.com/annual?fp_ref=tayo17", name: "HighLevel Starter or Unlimited annual plans" },
  proUpgrade: { url: "https://gohighlevel.com/saasupgrade?fp_ref=tayo17", name: "Upgrade an existing account to HighLevel Pro" },
  saasProTrial: { url: "https://www.gohighlevel.com/protrial?fp_ref=tayo17", name: "HighLevel SaaS Pro 14-day trial" },
  bootcamp: { url: "https://www.gohighlevel.com/highlevel-bootcamp?fp_ref=tayo17", name: "Free live HighLevel bootcamp + 30-day trial" },
  challenge: { url: "http://gohighlevel.com/5dc?fp_ref=tayo17", name: "HighLevel 5 Day Challenge" },
  ai: { url: "https://www.gohighlevel.com/ai?fp_ref=tayo17", name: "HighLevel AI Employee" },
  voiceWorkshop: { url: "https://www.gohighlevel.com/voice-ai-local-biz-workshop?fp_ref=tayo17", name: "Voice AI for Local Biz workshop" },
  summerPromo: { url: "https://www.gohighlevel.com/summer-promo?fp_ref=tayo17", name: "HighLevel plans and free trial" },
} as const;

export type OfferKey = keyof typeof OFFERS;

export const AFFILIATE_URL = OFFERS.bootcamp.url;

/** Offset (minutes) of America/Chicago from UTC at a given instant. */
function chicagoOffsetMinutes(at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(at);
  const g = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute"), g("second"));
  return Math.round((asUtc - at.getTime()) / 60000);
}

/** Next bootcamp start: weekdays (Mon–Fri) at 11:00 America/Chicago. */
export function nextBootcamp(now: Date = new Date()): Date {
  for (let i = 0; i < 8; i++) {
    const probe = new Date(now.getTime() + i * 86400000);
    const off = chicagoOffsetMinutes(probe);
    const local = new Date(probe.getTime() + off * 60000);
    const y = local.getUTCFullYear(), m = local.getUTCMonth(), d = local.getUTCDate();
    const dow = new Date(Date.UTC(y, m, d)).getUTCDay();
    if (dow === 0 || dow === 6) continue;
    const start = new Date(Date.UTC(y, m, d, 11, 0) - off * 60000);
    if (start.getTime() > now.getTime()) return start;
  }
  return now;
}
