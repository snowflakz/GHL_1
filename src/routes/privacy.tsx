import { createFileRoute } from "@tanstack/react-router";
import { BlogFooter, BlogHeader } from "@/components/blog/BlogChrome";
import { setChoice } from "@/lib/consent";

/** PLACEHOLDER: replace with the address people can write to about their data. */
const PRIVACY_CONTACT_EMAIL = "PRIVACY_CONTACT_EMAIL";
const UPDATED = "22 November 2026";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · NuvoraCore" },
      { name: "description", content: "How NuvoraCore collects and uses your email, cookies, Google and Meta tracking data, how the HighLevel affiliate relationship works, and how to unsubscribe or ask for deletion." },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 font-display text-2xl font-bold text-foreground">{children}</h2>;
}

function Privacy() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <BlogHeader />
      <main id="main" className="mx-auto max-w-3xl px-5 py-12 text-[1.0625rem] leading-relaxed text-foreground/85 sm:px-8 sm:py-16">
        <h1 className="text-[clamp(2rem,3vw+1rem,3rem)] font-bold leading-tight tracking-tight text-foreground">Privacy policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated {UPDATED}</p>
        <p className="mt-6">This site is run by NuvoraCore, an independent HighLevel affiliate. This page explains what information is collected when you use the site, why, and the choices you have.</p>

        <H>The affiliate relationship</H>
        <p className="mt-3">I'm an independent HighLevel affiliate, not HighLevel, a HighLevel employee, agent or official partner. When you start HighLevel's free trial through a link on this site and later become a paying customer, HighLevel may pay me a commission, at no extra cost to you. HighLevel identifies the referral from the affiliate link itself; I don't add your name, email or any other personal details to that link. The free trial, the live bootcamp and its bonuses are provided by HighLevel, not by NuvoraCore.</p>

        <H>Information you give me</H>
        <p className="mt-3">When you request the free trial and bootcamp details, the form collects your <strong>first name</strong> and <strong>email address</strong>. Along with them it records the time, the page address (without any query string) and how you found the site: the ad click ID and campaign tags described below.</p>
        <p className="mt-3">I use your email only to send you the bootcamp details and follow-up emails about getting set up on HighLevel. Your details are stored in the HighLevel CRM account I use to send these messages. I don't sell or rent your information, and your email is never put in a web address or query string.</p>

        <H>Cookies and similar technologies</H>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li><strong>Your cookie choice</strong> is remembered in your browser's local storage so the banner doesn't keep reappearing.</li>
          <li><strong>Ad click and campaign details</strong> (Google click IDs gclid, gbraid and wbraid, and the utm_source, utm_medium, utm_campaign, utm_term and utm_content tags) are kept in your browser's session storage, which is cleared when you close the tab. They're sent with the form so I know which ad or search brought you here.</li>
          <li><strong>Google Tag Manager</strong> loads the Google tags below. It doesn't set advertising cookies itself.</li>
          <li><strong>Google Ads</strong> sets cookies (such as _gcl_au) to measure which ads lead to sign-ups, when your consent settings allow it.</li>
          <li><strong>Google Analytics</strong>, where enabled, sets cookies (such as _ga) to count visits and see how pages are used, when your consent settings allow it.</li>
          <li><strong>Meta Pixel</strong>, where enabled, measures visits and sign-ups from Facebook and Instagram ads. It loads only after you accept cookies, and no email or other personal details are sent to Meta.</li>
        </ul>

        <H>Google Ads and Analytics</H>
        <p className="mt-3">I use Google Ads to show ads and Google Tag Manager to measure them. When you submit the form, or click through to HighLevel's trial, a conversion is recorded. With <strong>Enhanced Conversions</strong>, your email address and first name are hashed (converted to an unreadable code) in your browser before being sent to Google, which uses them to match conversions to ad clicks. Google's use of this data is described in its <a className="underline underline-offset-4" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">partner sites policy</a>.</p>
        <p className="mt-3">This site uses Google Consent Mode. Where your region requires consent (the EEA, the UK and Switzerland), advertising and analytics cookies stay off until you accept them.</p>

        <H>Unsubscribing and deleting your data</H>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li><strong>Unsubscribe</strong> at any time with the link at the bottom of every email, or by emailing <a className="underline underline-offset-4" href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>.</li>
          <li><strong>Ask to see, correct or delete</strong> your information by emailing <a className="underline underline-offset-4" href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>. I'll delete your contact record and confirm by email.</li>
          <li><strong>Change your cookie choice</strong> at any time: <button type="button" onClick={() => setChoice("denied")} className="underline underline-offset-4">reject cookies</button> or <button type="button" onClick={() => setChoice("granted")} className="underline underline-offset-4">accept cookies</button>.</li>
          <li>Control Google ad personalisation at <a className="underline underline-offset-4" href="https://adssettings.google.com" target="_blank" rel="noopener">adssettings.google.com</a>.</li>
        </ul>

        <H>HighLevel</H>
        <p className="mt-3">When you start a trial, you're taken to HighLevel's own website, and HighLevel's privacy policy applies to anything you give them there. This site is not owned or operated by HighLevel.</p>
      </main>
      <BlogFooter />
    </div>
  );
}
