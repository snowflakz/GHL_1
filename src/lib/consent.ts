import { GTM_ID } from "@/lib/config";

/**
 * Google Consent Mode v2 + GTM.
 *
 * Defaults: ad_storage, ad_user_data, ad_personalization and analytics_storage are DENIED in the EEA, UK and
 * Switzerland (prior consent required there) and GRANTED elsewhere. The banner's Accept / Reject updates all four.
 * To deny by default everywhere, set DEFAULT_OUTSIDE_EEA to "denied".
 */
export const DEFAULT_OUTSIDE_EEA: "granted" | "denied" = "granted";
const EEA_UK_CH = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH"];
const KEY = "nc_consent";

export const FONT_CSS = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap";

/** Inline <head> script: consent defaults (+ any saved choice) first, then the official GTM snippet (gtm.start),
 *  then the web-font stylesheet attached from JS so it never blocks first paint. */
export const HEAD_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:${JSON.stringify(EEA_UK_CH)},wait_for_update:500});
gtag('consent','default',{ad_storage:'${DEFAULT_OUTSIDE_EEA}',ad_user_data:'${DEFAULT_OUTSIDE_EEA}',ad_personalization:'${DEFAULT_OUTSIDE_EEA}',analytics_storage:'${DEFAULT_OUTSIDE_EEA}',wait_for_update:500});
try{var c=localStorage.getItem('${KEY}');if(c==='granted'||c==='denied'){gtag('consent','update',{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c});}}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${FONT_CSS}';document.head.appendChild(l);})();`;

export const NOSCRIPT_IFRAME_SRC = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;

type Choice = "granted" | "denied";
const EVT = "nc-consent";

export function getChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setChoice(v: Choice) {
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* storage blocked: the update below still applies for this page view */
  }
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
  if (typeof w.gtag === "function") w.gtag("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
  else (w.dataLayer = w.dataLayer || []).push(["consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v }]);
  window.dispatchEvent(new CustomEvent(EVT, { detail: v }));
}

/** Best guess at whether the visitor is in a consent-required region (time zone based; GTM uses the real region). */
function likelyEeaUkCh(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    return tz.startsWith("Europe/") || tz === "Atlantic/Reykjavik" || tz === "Atlantic/Canary" || tz === "Atlantic/Madeira" || tz === "Atlantic/Azores";
  } catch {
    return true;
  }
}

/** Mirrors the Google defaults for non-Google tags (Meta Pixel). */
export function adConsentGranted(): boolean {
  const c = getChoice();
  if (c) return c === "granted";
  return DEFAULT_OUTSIDE_EEA === "granted" && !likelyEeaUkCh();
}

export function onConsentChange(fn: (granted: boolean) => void) {
  const h = (e: Event) => fn((e as CustomEvent<Choice>).detail === "granted");
  window.addEventListener(EVT, h);
  return () => window.removeEventListener(EVT, h);
}
