import { createFileRoute } from "@tanstack/react-router";
import { BlogFooter, BlogHeader } from "@/components/blog/BlogChrome";
import { setChoice } from "@/lib/consent";

/** PLACEHOLDER: replace with the address people can write to about their data. */
const PRIVACY_CONTACT_EMAIL = "PRIVACY_CONTACT_EMAIL";
const UPDATED = "21 November 2026";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · NuvoraCore" },
      { name: "description", content: "How NuvoraCore collects and uses your email, cookies and Google Ads tracking data, and the choices you have." },
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

        <H>Information you give me</H>
        <p className="mt-3">When you request the free trial and bonuses, the form collects your <strong>first name</strong> and <strong>email address</strong>. It also records the page you were on, the time, and how you found the site (see below). I use this to send you the bootcamp details, the bonuses and follow-up emails about getting set up. Every email includes an unsubscribe link, and you can unsubscribe at any time.</p>
        <p className="mt-3">Your details are stored in the email and CRM tools I use to send these messages. I don't sell your information.</p>

        <H>Cookies and similar technologies</H>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li><strong>Your cookie choice</strong> is remembered in your browser so the banner doesn't keep reappearing.</li>
          <li><strong>Ad click and campaign details</strong> (Google click IDs such as gclid, gbraid, wbraid, and utm_ campaign tags) are kept in a first-party cookie for 90 days, so I can tell which ads bring people to the site and pass a reference to my affiliate account when you start a trial.</li>
          <li><strong>Google Tag Manager and Google Ads</strong> set cookies to measure ad performance, when your consent settings allow it.</li>
          <li>If enabled, the <strong>Meta Pixel</strong> measures visits and sign-ups from Facebook and Instagram ads, only after you accept cookies.</li>
        </ul>

        <H>Google Ads tracking</H>
        <p className="mt-3">I use Google Ads to show ads and Google Tag Manager to measure them. When you submit the form or start your trial, a conversion is recorded in Google Ads. With <strong>Enhanced Conversions</strong>, your email address and first name are hashed (converted to an unreadable code) in your browser before being sent to Google, which uses them to match conversions to ad clicks. Google's use of this data is described in its <a className="underline underline-offset-4" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">partner sites policy</a>.</p>
        <p className="mt-3">This site uses Google Consent Mode. Where your region requires consent, advertising and analytics cookies stay off until you accept them.</p>

        <H>Your choices</H>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Change your cookie choice at any time: <button type="button" onClick={() => setChoice("denied")} className="underline underline-offset-4">reject cookies</button> or <button type="button" onClick={() => setChoice("granted")} className="underline underline-offset-4">accept cookies</button>.</li>
          <li>Unsubscribe from emails using the link in any email.</li>
          <li>Ask to see, correct or delete your information by emailing <a className="underline underline-offset-4" href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>.</li>
          <li>Control Google ad personalisation at <a className="underline underline-offset-4" href="https://adssettings.google.com" target="_blank" rel="noopener">adssettings.google.com</a>.</li>
        </ul>

        <H>HighLevel</H>
        <p className="mt-3">When you start a trial, you're taken to HighLevel's own website, and HighLevel's privacy policy applies to anything you give them there. This site is not owned or operated by HighLevel.</p>
      </main>
      <BlogFooter />
    </div>
  );
}
