import { createFileRoute, Link } from "@tanstack/react-router";
import { delay } from "@/components/motion/Reveal";
import {
  ArrowRight, BadgeCheck, Boxes, CalendarCheck, CalendarDays, Check, ClipboardList, Clock, Copy, Gift, Globe, Info, Layers,
  LayoutTemplate, Mail, MessageSquare, Palette, PhoneMissed, Receipt, Rocket, Share2, ShieldCheck, Star, Timer, Users,
  Video, Workflow, X, Zap,
} from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { CTA } from "@/components/landing/CTA";
import { Countdown } from "@/components/landing/Countdown";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { OptInButton } from "@/components/funnel/OptIn";
import { VideoEmbed } from "@/components/landing/VideoEmbed";
import { GuideCards } from "@/components/landing/GuideCards";
import { Testimonials } from "@/components/landing/Testimonials";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TITLE = "NuvoraCore | HighLevel Setup & Automation for Local Business";
const DESC = "NuvoraCore is an independent HighLevel affiliate. Get HighLevel's free 30-day trial and join its free live setup bootcamp to automate leads, bookings and follow-up.";

const faqs: [string, string][] = [
  ["Are you HighLevel?", "No. NuvoraCore is an independent HighLevel affiliate, not HighLevel, a HighLevel employee, agent or official partner. The trial, the live bootcamp and the 3 bonuses are all provided by HighLevel."],
  ["I'm not technical. Can I really do this?", "Yes. HighLevel's bootcamp is click-by-click with a live HighLevel coach and breakout rooms, so you're not left stuck on the tech."],
  ["Will I be charged?", "HighLevel's trial is free for 30 days. Cancel anytime during the trial without being charged. The subscription rebills monthly after the trial unless cancelled; communication surcharges and usage fees may apply."],
  ["Is the bootcamp really live?", "Yes. It's HighLevel's live Zoom class, hosted by the HighLevel team every weekday at 11am CT. The schedule is set by HighLevel and subject to change. Sessions are live and not recorded."],
  ["How long does the bootcamp take?", "60 minutes max. You leave with your HighLevel account set up and your first automations switched on."],
  ["What do I need to join?", "Request your seat with any button on this page, then start HighLevel's free trial. You can book your bootcamp seat right after."],
  ["What is HighLevel?", "HighLevel is an all-in-one sales and marketing platform: CRM, funnels, websites, email and SMS, booking calendars, reviews and automation in one account, so you can replace a stack of separate tools."],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/brand/og-nuvoracore.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/brand/og-nuvoracore.png" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      }),
    }],
  }),
  component: Index,
});

/** Affiliate disclosure: plainly visible, normal size, shown near the hero and in the footer. */
const DISCLOSURE =
  "Disclosure: I'm an independent HighLevel affiliate, not a HighLevel employee or agent. I receive referral payments from HighLevel and may earn a commission if you sign up, at no extra cost to you. Opinions here are my own and are not statements by HighLevel Inc. HighLevel and its logo are trademarks of HighLevel, Inc. This site is not owned or operated by HighLevel.";

const SCHEDULE_NOTE = "Schedule set by HighLevel and subject to change. Sessions are live and not recorded.";

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`cv-auto mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:py-28 ${className}`}>{children}</section>;
}

/* Fluid type: sized for the device, not just shrunk. */
const H2 = "text-[clamp(1.875rem,3.2vw+1.1rem,3rem)] font-bold leading-[1.1] tracking-tight";

const nav: [string, string][] = [["#watch", "Watch"], ["#replaces", "What it replaces"], ["#bootcamp", "The bootcamp"], ["#agencies", "For agencies"], ["#faq", "FAQ"], ["/blog", "Free guides"]];

const NAV_LINK = "inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const bootcampFacts: [typeof Clock, string, string][] = [
  [CalendarDays, "When", "Every weekday, 11am CT"],
  [Video, "Where", "Live on Zoom, hosted by the HighLevel team"],
  [Timer, "Length", "60 minutes max"],
  [BadgeCheck, "Cost", "Free with HighLevel's 30-day trial"],
];

/** Typical separate tools HighLevel replaces (generic categories: no competitor brands or prices). */
const REPLACES: [typeof Clock, string, string][] = [
  [Users, "CRM", "A standalone CRM for contacts and deals"],
  [LayoutTemplate, "Funnels & landing pages", "A separate funnel or landing page builder"],
  [Globe, "Website builder", "A website builder and hosting plan"],
  [Mail, "Email marketing", "An email marketing tool"],
  [MessageSquare, "SMS / text marketing", "A texting or SMS platform"],
  [CalendarCheck, "Booking & calendar", "An appointment scheduling app"],
  [Star, "Reviews & reputation", "A review management tool"],
  [ClipboardList, "Forms & surveys", "A form or survey builder"],
  [Workflow, "Workflow automation", "An automation or integration tool"],
  [PhoneMissed, "Missed-call text-back", "A missed-call texting add-on"],
  [Share2, "Social media planner", "A social scheduling tool"],
  [Receipt, "Invoicing & payments", "An invoicing or payments app"],
];

function NextBootcampCard() {
  return (
    <aside aria-label="Next live bootcamp" className="rounded-3xl glass p-5 text-left shadow-glow sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <span className="relative flex h-2.5 w-2.5"><span className="absolute inset-0 rounded-full bg-success" /></span>
          Next live bootcamp
        </p>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">Free seat</span>
      </div>
      <p className="mt-3 font-display text-[clamp(2rem,5vw,2.75rem)] leading-none text-gradient"><Countdown /></p>
      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border pt-5 sm:grid-cols-4 lg:grid-cols-2">
        {bootcampFacts.map(([I, k, v]) => (
          <div key={k} className="flex gap-3">
            <I className="mt-0.5 h-5 w-5 shrink-0 text-primary-glow" aria-hidden />
            <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt><dd className="mt-0.5 text-sm font-medium">{v}</dd></div>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex gap-2 text-xs leading-relaxed text-muted-foreground"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />{SCHEDULE_NOTE}</p>
      <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
        {["A live HighLevel coach clicks through it with you", "Missed-call text-back, booking and reviews set up", "Leave with your follow-up running on autopilot"].map((t) => (
          <li key={t} className="flex items-start gap-2.5 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />{t}</li>
        ))}
      </ul>
    </aside>
  );
}

function Index() {
  return <LandingPage />;
}

function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-background focus:px-4 focus:py-2">Skip to content</a>

      {/* Top bar: short on phones, full sentence from tablet up */}
      <div className="bg-gradient-primary px-4 py-2 text-center text-[13px] font-medium text-primary-foreground sm:text-sm">
        <Clock className="mr-1 inline h-4 w-4 align-[-3px]" aria-hidden />
        <span className="sm:hidden">HighLevel's live bootcamp · weekdays 11am CT · in <Countdown /></span>
        <span className="hidden sm:inline">HighLevel's free live bootcamp runs weekdays at 11am CT · Next session in <Countdown /></span>
      </div>

      {/* Header: logo-only on phones (sticky bar carries the CTA), button on tablet, nav on desktop */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-8 sm:py-3">
          <BrandLogo />
          <nav aria-label="Page sections" className="hidden items-center gap-0.5 xl:flex">
            {nav.map(([href, label]) =>
              href.startsWith("/") ? (
                <Link key={href} to={href} className={NAV_LINK}>{label}</Link>
              ) : (
                <a key={href} href={href} className={NAV_LINK}>{label}</a>
              ),
            )}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/blog" className={`${NAV_LINK} xl:hidden`}>Guides</Link>
            <OptInButton placement="header" className="shine group inline-flex min-h-10 shrink-0 items-center whitespace-nowrap gap-1.5 rounded-full bg-gradient-primary px-4 text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-11 sm:px-5">
              <span className="sm:hidden">Free trial</span><span className="hidden sm:inline">Start Free Trial</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </OptInButton>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero — phone: left-aligned stack, full-width CTA · tablet: centred, card as wide strip · desktop: split with bootcamp card */}
        <div className="relative bg-hero-glow">
          <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-12 lg:pb-28 lg:pt-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div className="hero-stagger sm:text-center lg:text-left">
                {/* Short disclosure: always inside the first screen on phones. Full text sits under the CTA. */}
                <p className="text-[0.8125rem] leading-snug text-muted-foreground" data-testid="hero-disclosure">
                  Independent HighLevel affiliate, not HighLevel. I may earn a commission if you sign up.{" "}
                  <a href="#disclosure" className="underline underline-offset-2 hover:text-foreground">Full disclosure</a>
                </p>
                <h1 className="mt-4 text-[clamp(2rem,4.6vw+0.6rem,3.6rem)] font-bold leading-[1.06] tracking-tight sm:mx-auto sm:max-w-3xl lg:mx-0 lg:text-[clamp(2.5rem,3.4vw,3.6rem)]">
                  HighLevel's Free 30-Day Trial <span className="text-gradient">+ Live Setup Bootcamp</span>
                  <span className="mt-2 block text-[0.45em] font-semibold leading-snug tracking-normal text-muted-foreground">(3 bonuses included by HighLevel)</span>
                </h1>
                <p className="mt-4 font-display text-xl font-semibold text-foreground sm:mx-auto sm:max-w-2xl sm:text-2xl lg:mx-0 lg:max-w-xl">
                  Automate your leads and bookings on HighLevel in under 60 minutes, live and free.
                </p>
                <p className="mt-4 text-lg text-muted-foreground sm:mx-auto sm:max-w-2xl lg:mx-0 lg:max-w-xl">
                  For local businesses, coaches and service providers. Replace the separate tools you're paying for, and leave with lead follow-up, booking and reviews running on their own. Hosted live on Zoom by the HighLevel team.
                </p>
                <CTA
                  id="hero-cta"
                  placement="hero"
                  pulse
                  label={<><span className="sm:hidden">Claim Free Trial + Bootcamp Seat</span><span className="hidden sm:inline">Claim My Free Trial + Bootcamp Seat</span></>}
                  className="mt-8 items-stretch sm:items-center lg:items-start" buttonClassName="w-full sm:w-auto" subClassName="sm:text-center lg:text-left" />
                <p id="disclosure" className="mt-6 max-w-xl scroll-mt-24 text-[0.95rem] leading-relaxed text-muted-foreground sm:mx-auto lg:mx-0">{DISCLOSURE}</p>
              </div>
              <div className="animate-fade-up [animation-delay:340ms] sm:mx-auto sm:w-full sm:max-w-3xl lg:max-w-none">
                <NextBootcampCard />
              </div>
            </div>
          </section>
        </div>

        {/* Proof */}
        <div className="border-y border-border bg-card/50">
          <p className="mx-auto max-w-3xl px-5 pt-8 text-center text-base font-medium text-foreground/90 sm:px-8 sm:pt-10 sm:text-lg">
            The platform agencies, SaaS founders, startups and local businesses run on, for a fraction of what a stack of separate tools costs.
          </p>
          <dl className="mx-auto grid max-w-6xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
            {[["7M+", "AI voice calls"], ["7.3B", "Leads generated"], ["179M", "Appointments booked"], ["$5.2B+", "Sales facilitated in 2025"]].map(([n, l], i) => (
              <div key={l} className={`flex flex-col-reverse py-7 text-center sm:py-10 ${i % 2 === 0 ? "border-r border-border" : ""} ${i < 2 ? "border-b border-border lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}>
                <dt className="mt-1 px-2 text-sm text-muted-foreground">{l}</dt>
                <dd className="font-display text-3xl font-bold tabular-nums text-gradient sm:text-4xl">{n}</dd>
              </div>
            ))}
          </dl>
          <p className="mx-auto max-w-6xl border-t border-border px-5 py-3 text-center text-xs text-muted-foreground sm:px-8">Platform-wide figures across all HighLevel accounts, as published by HighLevel on gohighlevel.com (November 2026). They are not a promise of any individual's results or earnings.</p>
        </div>

        {/* Video: proof right after the hero, for visitors who want to see it before they click */}
        {/* Desktop: video capped so heading + video + "Save My Free Seat" fit in one screen; button sits right under the video. */}
        <section id="watch" className="cv-auto relative mx-auto max-w-7xl scroll-mt-24 px-5 pt-16 sm:px-8 sm:pt-20 lg:scroll-mt-0 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p data-reveal className="text-sm font-semibold uppercase tracking-widest text-violet">Watch before you join</p>
            <h2 data-reveal className={`${H2} mt-3`}>See exactly how the <span className="text-gradient">live bootcamp</span> works</h2>
            <p data-reveal className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground sm:text-xl">HighLevel's official bootcamp, hosted live on Zoom by the HighLevel team. A HighLevel coach walks you through it, step by step.</p>
          </div>
          {/* Desktop width follows screen height: as big as fits with the heading and button on screen (480–864px wide). */}
          <div data-reveal="scale" className="relative mx-auto mt-8 sm:mt-10 lg:max-w-[max(30rem,min(54rem,calc((100svh_-_410px)*1.7778)))]">
            <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-primary/25 via-violet/20 to-primary-glow/25 blur-3xl" />
            <div className="relative"><VideoEmbed id="ICBwheORWVs" title="HighLevel free live bootcamp, explained by the coach" poster="/video/bootcamp-coach.jpg" /></div>
          </div>
          <CTA className="mt-6 items-stretch sm:items-center sm:mt-7" buttonClassName="w-full sm:w-auto" label="Save My Free Seat" placement="video" />
          <ul className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-3">
            {["A HighLevel coach clicks through every setting with you", "Breakout rooms the moment you get stuck", "Leave with follow-up, booking and reviews on"].map((t, i) => (
              <li key={t} data-reveal style={delay(i * 80)} className="flex items-start gap-3 rounded-2xl border border-border bg-card/50 p-4 text-[1.0625rem]"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />{t}</li>
            ))}
          </ul>
        </section>

        {/* What it replaces — typical tool categories, no brands or prices */}
        <Section id="replaces">
          <div className="mx-auto max-w-3xl text-center">
            <p data-reveal className="text-sm font-semibold uppercase tracking-widest text-violet">What it replaces</p>
            <h2 data-reveal className={`${H2} mt-3`}>One platform instead of <span className="text-gradient">10+ separate tools</span></h2>
            <p data-reveal className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">These are the typical tools an agency, SaaS founder, startup or local business pays for separately. HighLevel includes all of them in one account, often for a fraction of the combined cost.</p>
          </div>
          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {REPLACES.map(([I, job, typical], i) => (
              <li key={job} data-reveal style={delay((i % 3) * 60)} className="flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-4 sm:p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15"><I className="h-5 w-5 text-primary-glow" aria-hidden /></span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-semibold text-foreground">{job} <Check className="h-4 w-4 shrink-0 text-success" aria-label="Included in HighLevel" /></p>
                  <p className="mt-0.5 text-sm text-muted-foreground">Replaces: {typical}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted-foreground">
            Typical tool categories, not specific products. Some features and usage limits depend on the HighLevel plan you choose. Want the numbers for your own stack?{" "}
            <Link to="/blog/$slug" params={{ slug: "what-does-gohighlevel-replace" }} className="font-medium text-foreground underline underline-offset-4">Add up your own savings</Link>
          </p>
        </Section>

        {/* Not a webinar */}
        <Section className="pt-0 sm:pt-0 lg:pt-0">
          <h2 data-reveal className={`${H2} text-center`}>This is <span className="text-gradient">not</span> another webinar</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground sm:text-lg">It's HighLevel's live class where you get set up together, and you can ask questions the whole way.</p>
          <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2 md:gap-6">
            <div data-reveal className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-muted-foreground sm:text-xl">Trying alone</h3>
              <ul className="mt-5 space-y-3">
                {["Hours of YouTube tutorials", "Stuck on settings and setup", "Paying for 5+ separate tools", "No one to answer your questions"].map((t) => (
                  <li key={t} className="flex gap-3 text-muted-foreground"><X className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />{t}</li>
                ))}
              </ul>
            </div>
            <div data-reveal style={delay(100)} className="rounded-3xl border border-primary/40 bg-card p-6 shadow-glow sm:p-8">
              <h3 className="text-lg font-semibold sm:text-xl">With HighLevel's bootcamp</h3>
              <ul className="mt-5 space-y-3">
                {["Done in 60 minutes, live", "A HighLevel coach clicks through it with you", "CRM, funnels, email, SMS & booking in one place", "Ask anything in real time"].map((t) => (
                  <li key={t} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* What you'll do — phone: compact rows · tablet: 2×2 cards · desktop: 4 across */}
        <Section id="bootcamp" className="pt-0 sm:pt-0 lg:pt-0">
          <h2 data-reveal className={`${H2} text-center`}>What you'll do in the bootcamp</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground sm:text-lg">HighLevel's official live bootcamp, hosted on Zoom by the HighLevel team every weekday at 11am CT.</p>
          <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {[
              [Zap, "Set up your account", "Get your HighLevel workspace ready step by step."],
              [Rocket, "Launch a funnel", "Install a ready-made template and publish it in minutes."],
              [Users, "Capture & follow up", "Connect forms, CRM and automatic follow-ups."],
              [Clock, "60 minutes max", "Leave with your setup done, not homework."],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof Zap;
              return (
                <div key={t as string} data-reveal style={delay(i * 80)} className="lift flex items-start gap-4 rounded-2xl glass p-4 sm:block sm:rounded-3xl sm:p-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary sm:h-12 sm:w-12 sm:rounded-2xl"><I className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" aria-hidden /></div>
                  <div>
                    <h3 className="text-base font-semibold sm:mt-4 sm:text-lg">{t as string}</h3>
                    <p className="mt-1 text-[0.95rem] text-muted-foreground sm:mt-2 sm:text-base">{d as string}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mx-auto mt-6 flex max-w-2xl justify-center gap-2 text-center text-sm text-muted-foreground"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{SCHEDULE_NOTE}</p>
          <CTA className="mt-8 sm:mt-10" label="Save My Free Bootcamp Seat" placement="bootcamp-section" />
        </Section>

        {/* Bonuses (provided by HighLevel) — phone: stacked · tablet: 2 + 1 wide · desktop: 3 across */}
        <div className="bg-card/40">
          <Section id="bonuses">
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent"><Gift className="mr-1 inline h-4 w-4 align-[-2px]" aria-hidden /> Included free with HighLevel's official bootcamp</p>
            <h2 data-reveal className={`${H2} mt-3 text-center`}>3 bonuses included by HighLevel</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {[
                ["5-Day Reviews Challenge Course (by HighLevel)", "Learn to set up automated review requests and reputation management inside HighLevel."],
                ["The SaaSpreneur Playbook (by HighLevel)", "HighLevel's course on packaging the platform as a subscription service."],
                ["Snapshots & Funnels (by HighLevel)", "Ready-made funnel and automation templates you can install."],
              ].map(([t, d], i) => (
                <div key={t} data-reveal style={delay(i * 90)} className={`lift relative rounded-3xl border border-border bg-background p-6 pt-8 sm:p-8 ${i === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground sm:left-8">INCLUDED BY HIGHLEVEL · #{i + 1}</span>
                  <h3 className="text-lg font-semibold sm:text-xl">{t}</h3>
                  <p className="mt-3 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">Bonuses are provided by HighLevel, not by NuvoraCore, and may change at HighLevel's discretion.</p>
          </Section>
        </div>

        {/* For agencies */}
        <Section id="agencies">
          <div className="mx-auto max-w-3xl text-center">
            <p data-reveal className="text-sm font-semibold uppercase tracking-widest text-violet">For agencies</p>
            <h2 data-reveal className={`${H2} mt-3`}>Run client accounts <span className="text-gradient">under your own brand</span></h2>
            <p data-reveal className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">If you look after marketing for other businesses, HighLevel has tools built for managing many clients from one place.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {[
              [Palette, "White-label branding", "Put your own brand, domain and colours on the platform your clients log in to."],
              [Layers, "Client sub-accounts", "Give each client their own workspace for contacts, calendars, funnels and automations."],
              [Boxes, "Resell as your own SaaS", "Package HighLevel as your own branded software service for clients (SaaS mode)."],
              [Copy, "Snapshots", "Save a complete setup once and deploy it to a new client account in minutes."],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof Zap;
              return (
                <div key={t as string} data-reveal style={delay(i * 80)} className="rounded-3xl border border-border bg-card/50 p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary"><I className="h-5 w-5 text-primary-foreground" aria-hidden /></span>
                  <h3 className="mt-4 text-lg font-semibold">{t as string}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
          <p className="mx-auto mt-8 flex max-w-3xl justify-center gap-2 text-center text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>Some agency features, such as unlimited sub-accounts and SaaS mode, depend on the HighLevel plan you choose. <Link to="/blog/$slug" params={{ slug: "gohighlevel-pricing" }} className="font-medium text-foreground underline underline-offset-4">Compare plans in my pricing guide</Link>.</span>
          </p>
        </Section>

        {/* Steps — phone & tablet: vertical timeline · desktop: horizontal track */}
        <Section id="steps" className="pt-0 sm:pt-0 lg:pt-0">
          <h2 data-reveal className={`${H2} text-center`}>Get started in 3 simple steps</h2>
          <ol className="mx-auto mt-12 grid max-w-2xl gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-6">
            {[
              ["Request your seat", "Tap the button, then start HighLevel's free 30-day trial. Cancel anytime during the trial."],
              ["Join the live bootcamp", "Pick any weekday at 11am CT. A HighLevel coach guides you step by step."],
              ["Put it to work", "Use your new funnels, CRM and automations in your day-to-day business."],
            ].map(([t, d], i, arr) => (
              <li key={t} data-reveal style={delay(i * 100)} className="relative flex gap-5 lg:block lg:rounded-3xl lg:glass lg:p-8">
                {i < arr.length - 1 && <span aria-hidden className="draw-line absolute left-7 top-16 -bottom-8 w-px bg-gradient-to-b from-primary via-violet/60 to-transparent lg:hidden" />}
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-primary/40 bg-card font-display text-xl font-bold text-gradient lg:h-auto lg:w-auto lg:place-items-start lg:rounded-none lg:border-0 lg:bg-transparent lg:text-5xl">0{i + 1}</div>
                <div className="pt-2 lg:pt-0">
                  <h3 className="text-lg font-semibold sm:text-xl lg:mt-4">{t}</h3>
                  <p className="mt-2 text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <CTA className="mt-12" label="Start Step 1 Now" placement="steps" />
        </Section>

        {/* Testimonials: only real, permissioned quotes. Hidden while empty (see components/landing/Testimonials.tsx). */}
        <Testimonials heading={<h2 data-reveal className={`${H2} text-center`}>What bootcamp attendees say</h2>} />

        {/* FAQ — phone & tablet: centred single column · desktop: sticky intro left, answers right */}
        <Section id="faq" className="lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="text-center lg:sticky lg:top-24 lg:self-start lg:text-left">
            <h2 data-reveal className={H2}>Questions? Answered.</h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground lg:mx-0">Still unsure? Start HighLevel's free trial, join one bootcamp, and decide after you've seen it work.</p>
            <CTA className="mt-8 hidden lg:flex lg:items-start" label="Start Free Trial" placement="faq" subClassName="text-left" />
          </div>
          <Accordion type="single" collapsible className="mx-auto mt-8 max-w-3xl lg:mx-0 lg:mt-0 lg:max-w-none">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="min-h-14 text-left text-base sm:text-lg">{q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        {/* Guides: four large animated cards, for visitors who want to read before deciding (and internal links for SEO) */}
        <section id="guides" className="cv-auto relative mx-auto max-w-[88rem] scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p data-reveal className="text-sm font-semibold uppercase tracking-widest text-violet">Free guides</p>
              <h2 data-reveal className={`${H2} mt-2`}>Not ready yet? <span className="text-gradient">Read up first</span></h2>
              <p data-reveal className="mt-3 text-lg text-muted-foreground">Short, honest guides for business owners. No jargon, no fluff, just what you need to decide.</p>
            </div>
            <Link to="/blog" className="group inline-flex min-h-11 items-center gap-1.5 self-start rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:self-auto">All 11 guides <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></Link>
          </div>
          <GuideCards />
        </section>

        {/* Final CTA */}
        <div className="relative bg-hero-glow">
          <Section className="text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary-glow" aria-hidden />
            <h2 data-reveal className={`${H2} mx-auto mt-4 max-w-3xl`}>Your next bootcamp starts in <span className="block text-gradient sm:inline"><Countdown /></span></h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Start HighLevel's free 30-day trial and book your seat. {SCHEDULE_NOTE}</p>
            <CTA className="mt-10 items-stretch sm:items-center" buttonClassName="w-full sm:w-auto" placement="final" />
          </Section>
        </div>
      </main>

      <SiteFooter className="pb-28 sm:pb-0" />

      <StickyCTA />
    </div>
  );
}
