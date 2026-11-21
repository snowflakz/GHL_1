/**
 * Site-wide settings for the paid-traffic funnel.
 *
 * PLACEHOLDERS (fill these in before launch):
 *   FORM_ENDPOINT_URL  URL the opt-in form POSTs to (HighLevel sub-account form/inbound webhook, or your email tool).
 *   SUBID_PARAM        FirstPromoter sub-ID parameter name, from your HighLevel affiliate dashboard.
 * While a value still equals its placeholder text, the site keeps working: leads are queued in the
 * visitor's browser and retried, and the sub-ID is appended under the literal name "SUBID_PARAM".
 */
export const FORM_ENDPOINT_URL = "FORM_ENDPOINT_URL";
export const SUBID_PARAM = "SUBID_PARAM";

export const GTM_ID = "GTM-573KHFFH";
export const SITE_NAME = "NuvoraCore";

/** True while a placeholder hasn't been replaced with a real value. */
export const isPlaceholder = (v: string, name: string) => !v || v === name;
