/**
 * Site-wide settings for the paid-traffic funnel.
 *
 * PLACEHOLDER (fill in before launch):
 *   LEAD_WEBHOOK_URL  your HighLevel sub-account Inbound Webhook URL. The opt-in POSTs each lead here (JSON body).
 * While it still holds the placeholder text, leads are kept in the visitor's browser and retried later.
 *
 * Affiliate links are used EXACTLY as HighLevel issued them: nothing is appended, rewritten or redirected.
 */
export const LEAD_WEBHOOK_URL = "<PASTE MY GHL INBOUND WEBHOOK URL HERE>";

export const GTM_ID = "GTM-573KHFFH";
export const SITE_NAME = "NuvoraCore";

/** True while the webhook placeholder hasn't been replaced with a real https URL. */
export const webhookConfigured = () => /^https:\/\//.test(LEAD_WEBHOOK_URL);
