import { createFileRoute, Link } from "@tanstack/react-router";
import { delay } from "@/components/motion/Reveal";
import { ArrowRight, Check, X, Zap, Users, Rocket, Star, Gift, Clock, ShieldCheck, CalendarDays, Video, Timer, BadgeCheck } from "lucide-react";
import logoUrl from "@/assets/highlevel-logo.png";
import { CTA } from "@/components/landing/CTA";
import { Countdown } from "@/components/landing/Countdown";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { LeadGateProvider, useGateClick } from "@/components/landing/LeadGate";
import { VideoEmbed } from "@/components/landing/VideoEmbed";
import { GuideCards } from "@/components/landing/GuideCards";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AFFILIATE_URL } from "@/lib/bootcamp";

const TITLE = "HighLevel Free Trial (30 Days) + Free Live Bootcamp";
const DESC = "For local businesses, coaches and service providers: automate your leads, booking and follow-up on HighLevel in one free 60-minute live bootcamp, with a 30-day free trial.";

const faqs: [string, string][] = [
  ["I'm not technical. Can I really do this?", "Yes. The bootcamp is click-by-click with a live HighLevel coach and breakout rooms, so you never get stuck on the tech."],
  ["Will I be charged?", "The trial is free for 30 days and you can cancel anytime before it ends without paying the subscription. Small messaging fees (SMS/email) may apply if you use them during the trial."],
  ["Is the bootcamp really live?", "Yes. It's a live Zoom class every weekday at 11am CT (Central Time), not a pre-recorded webinar. You can ask questions in real time."],
  ["How long does the bootcamp take?", "60 minutes max. You leave with your HighLevel account set up and a working launch."],
  ["What do I need to join?", "Just sign up for the free trial through the button on this page. You'll get access to book your bootcamp seat right after."],
  ["What is HighLevel?", "HighLevel is an all-in-one sales and marketing platform: CRM, funnels, websites, email and SMS, booking calendars, reviews and automation, all in one place, so you can replace a stack of separate tools."],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/blog/og/free-highlevel-bootcamp.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/blog/og/free-highlevel-bootcamp.png" },
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

const Disclaimer = () => (
  <>I'm an independent HighLevel affiliate, <strong>not a HighLevel employee or staff member</strong>. I may earn a commission if you sign up, at no extra cost to you.</>
);

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:py-28 ${className}`}>{children}</section>;
}

/* Fluid type: sized for the device, not just shrunk. */
const H2 = "text-[clamp(1.875rem,3.2vw+1.1rem,3rem)] font-bold leading-[1.1] tracking-tight";

const nav: [string, string][] = [["#watch", "Watch"], ["#bootcamp", "The bootcamp"], ["#bonuses", "Bonuses"], ["#faq", "FAQ"], ["/blog", "Free guides"]];

const NAV_LINK = "inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const bootcampFacts: [typeof Clock, string, string][] = [
  [CalendarDays, "When", "Every weekday, 11am CT"],
  [Video, "Where", "Live on Zoom"],
  [Timer, "Length", "60 minutes max"],
  [BadgeCheck, "Cost", "Free with your 30-day trial"],
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
      <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
        {["A live coach clicks through it with you", "Missed-call text-back, booking and reviews set up", "Leave with your follow-up running on autopilot"].map((t) => (
          <li key={t} className="flex items-start gap-2.5 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />{t}</li>
        ))}
      </ul>
    </aside>
  );
}

function Index() {
  return <LeadGateProvider><LandingPage /></LeadGateProvider>;
}

function LandingPage() {
  const headerGate = useGateClick("header");
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-background focus:px-4 focus:py-2">Skip to content</a>

      {/* Top bar: short on phones, full sentence from tablet up */}
      <div className="bg-gradient-primary px-4 py-2 text-center text-[13px] font-medium text-primary-foreground sm:text-sm">
        <Clock className="mr-1 inline h-4 w-4 align-[-3px]" aria-hidden />
        <span className="sm:hidden">Live bootcamp weekdays 11am CT · in <Countdown /></span>
        <span className="hidden sm:inline">Free live bootcamp every weekday at 11am CT · Next one starts in <Countdown /></span>
      </div>

      {/* Header: logo-only on phones (sticky bar carries the CTA), button on tablet, nav on desktop */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-8 sm:py-3">
          <Link to="/" aria-label="Home" className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <img src={logoUrl} alt="HighLevel" width={274} height={64} fetchPriority="high" className="h-8 w-auto sm:h-9" />
          </Link>
          <nav aria-label="Page sections" className="hidden items-center gap-1 lg:flex">
            {nav.map(([href, label]) =>
              href.startsWith("/") ? (
                <Link key={href} to={href} className={NAV_LINK}>{label}</Link>
              ) : (
                <a key={href} href={href} className={NAV_LINK}>{label}</a>
              ),
            )}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/blog" className={`${NAV_LINK} lg:hidden`}>Guides</Link>
            <a href={AFFILIATE_URL} target="_blank" rel="noopener sponsored" data-offer="bootcamp" data-placement="header" onClick={headerGate} className="shine group inline-flex min-h-10 shrink-0 items-center whitespace-nowrap gap-1.5 rounded-full bg-gradient-primary px-4 text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-11 sm:px-5">
              <span className="sm:hidden">Free trial</span><span className="hidden sm:inline">Start Free Trial</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero — phone: left-aligned stack, full-width CTA · tablet: centred, card as wide strip · desktop: split with bootcamp card */}
        <div className="relative bg-hero-glow">
          <section className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div className="hero-stagger sm:text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-success" aria-hidden /> Live every weekday · 100% free to join
                </span>
                <h1 className="mt-5 text-[clamp(2.25rem,5.2vw+0.6rem,4rem)] font-bold leading-[1.05] tracking-tight sm:mx-auto sm:max-w-3xl lg:mx-0 lg:text-[clamp(2.75rem,3.9vw,4rem)]">
                  Automate your leads and bookings on HighLevel <span className="text-gradient">in under 60 minutes</span>, live and free
                </h1>
                <p className="mt-5 text-lg text-muted-foreground sm:mx-auto sm:max-w-2xl sm:text-xl lg:mx-0 lg:max-w-xl">
                  For local businesses, coaches and service providers. Replace the separate tools you're paying for, and leave with lead follow-up, booking and reviews running on their own. Includes a <strong className="text-foreground">30-day free trial</strong> and a live, click-by-click bootcamp.
                </p>
                <CTA
                  id="hero-cta"
                  placement="hero"
                  pulse
                  label={<><span className="sm:hidden">Claim Free Trial + Bootcamp Seat</span><span className="hidden sm:inline">Claim My Free Trial + Bootcamp Seat</span></>}
                  className="mt-8 items-stretch sm:items-center lg:items-start" buttonClassName="w-full sm:w-auto" />
                <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted-foreground sm:mx-auto lg:mx-0"><Disclaimer /></p>
              </div>
              <div className="animate-fade-up [animation-delay:340ms] sm:mx-auto sm:w-full sm:max-w-3xl lg:max-w-none">
                <NextBootcampCard />
              </div>
            </div>
          </section>
        </div>

        {/* Proof */}
        <div className="border-y border-border bg-card/50">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
            {[["60 min", "Live setup, start to finish"], ["7.3B", "Leads generated on HighLevel"], ["179M", "Appointments booked"], ["$5.2B+", "Sales facilitated in 2025"]].map(([n, l], i) => (
              <div key={l} className={`flex flex-col-reverse py-7 text-center sm:py-10 ${i % 2 === 0 ? "border-r border-border" : ""} ${i < 2 ? "border-b border-border lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}>
                <dt className="mt-1 px-2 text-sm text-muted-foreground">{l}</dt>
                <dd className="font-display text-3xl font-bold tabular-nums text-gradient sm:text-4xl">{n}</dd>
              </div>
            ))}
          </dl>
          <p className="mx-auto max-w-6xl border-t border-border px-5 py-3 text-center text-xs text-muted-foreground sm:px-8">Platform figures as published by HighLevel on gohighlevel.com (November 2026).</p>
        </div>

        {/* Video: proof right after the hero, for visitors who want to see it before they click */}
        <section id="watch" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 pt-16 sm:px-8 sm:pt-20 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <p data-reveal className="text-sm font-semibold uppercase tracking-widest text-violet">Watch before you join</p>
            <h2 data-reveal className={`${H2} mt-3`}>See exactly how the <span className="text-gradient">live bootcamp</span> works</h2>
            <p data-reveal className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">A real HighLevel coach walks you through it, step by step.</p>
          </div>
          <div data-reveal="scale" className="relative mt-10 sm:mt-12">
            <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-primary/25 via-violet/20 to-primary-glow/25 blur-3xl" />
            <div className="relative"><VideoEmbed id="ICBwheORWVs" title="HighLevel free live bootcamp, explained by the coach" poster="/video/bootcamp-coach.jpg" /></div>
          </div>
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <ul className="grid gap-4 sm:grid-cols-3">
              {["A coach clicks through every setting with you", "Breakout rooms the moment you get stuck", "Leave with follow-up, booking and reviews on"].map((t, i) => (
                <li key={t} data-reveal style={delay(i * 80)} className="flex items-start gap-3 rounded-2xl border border-border bg-card/50 p-4 text-[1.0625rem]"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />{t}</li>
              ))}
            </ul>
            <CTA className="items-stretch lg:items-end" buttonClassName="w-full sm:w-auto" label="Save My Free Seat" placement="video" />
          </div>
        </section>

        {/* Not a webinar */}
        <Section>
          <h2 data-reveal className={`${H2} text-center`}>This is <span className="text-gradient">not</span> another webinar</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground sm:text-lg">It's a live class where we get stuff done together, and you can ask questions the whole way.</p>
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
              <h3 className="text-lg font-semibold sm:text-xl">With the bootcamp</h3>
              <ul className="mt-5 space-y-3">
                {["Done in 60 minutes, live", "A coach clicks through it with you", "CRM, funnels, email, SMS & booking in one place", "Ask anything in real time"].map((t) => (
                  <li key={t} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* What you'll do — phone: compact rows · tablet: 2×2 cards · desktop: 4 across */}
        <Section id="bootcamp" className="pt-0 sm:pt-0 lg:pt-0">
          <h2 data-reveal className={`${H2} text-center`}>What you'll do in the bootcamp</h2>
          <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {[
              [Zap, "Set up your account", "Get your HighLevel workspace ready step by step."],
              [Rocket, "Launch a funnel", "Plug in a proven template and go live in minutes."],
              [Users, "Capture & follow up", "Connect forms, CRM and automatic follow-ups."],
              [Clock, "60 minutes max", "Leave with a finished launch, not homework."],
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
          <CTA className="mt-10 sm:mt-12" label="Save My Free Bootcamp Seat" placement="bootcamp-section" />
        </Section>

        {/* Bonuses — phone: stacked · tablet: 2 + 1 wide · desktop: 3 across */}
        <div className="bg-card/40">
          <Section id="bonuses">
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent"><Gift className="mr-1 inline h-4 w-4 align-[-2px]" aria-hidden /> Included free when you join today</p>
            <h2 data-reveal className={`${H2} mt-3 text-center`}>3 free bonuses</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {[
                ["5-Day Reviews Challenge Course", "Build a business around one valuable offer: collecting positive online reviews for local businesses. Training, tools and templates included."],
                ["The SaaSPreneur Playbook", "HighLevel's flagship course for launching a low-ticket, recurring subscription offer in your local market."],
                ["Snapshots & Funnels", "Plug-and-play funnel templates you can install in one click and launch in minutes."],
              ].map(([t, d], i) => (
                <div key={t} data-reveal style={delay(i * 90)} className={`lift relative rounded-3xl border border-border bg-background p-6 pt-8 sm:p-8 ${i === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground sm:left-8">FREE BONUS #{i + 1}</span>
                  <h3 className="text-lg font-semibold sm:text-xl">{t}</h3>
                  <p className="mt-3 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Steps — phone & tablet: vertical timeline · desktop: horizontal track */}
        <Section id="steps">
          <h2 data-reveal className={`${H2} text-center`}>Get started in 3 simple steps</h2>
          <ol className="mx-auto mt-12 grid max-w-2xl gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-6">
            {[
              ["Start your free trial", "Click the button and create your account. Free for 30 days, cancel anytime."],
              ["Join the live bootcamp", "Pick any weekday at 11am CT. A HighLevel coach guides you step by step."],
              ["Grow your business", "Use your new funnels, CRM and automations to win more clients."],
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

        {/* Reviews — phone & tablet: swipeable rail with peek · desktop: 3 across */}
        <div className="bg-card/40">
          <Section id="reviews">
            <div className="flex justify-center gap-1 text-accent" aria-hidden>{[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}</div>
            <h2 data-reveal className={`${H2} mt-4 text-center`}>4.9/5 from 2,000+ reviews</h2>
            <div
              tabIndex={0}
              role="region"
              aria-label="Reviews, scroll sideways for more"
              className="snap-rail -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:-mx-8 sm:mt-12 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0"
            >
              {[
                ["I'd been putting off HighLevel for months. One hour in the bootcamp and my first funnel was live.", "Agency owner"],
                ["The breakout rooms made the difference. Every time I got stuck, someone helped right away.", "Marketing consultant"],
                ["I'm not techy at all, but I finished with my CRM, calendar and follow-ups working.", "Local business owner"],
              ].map(([q, a], i) => (
                <figure key={a} data-reveal style={delay(i * 90)} className="w-[84%] shrink-0 snap-start rounded-3xl border border-border bg-background p-6 sm:w-[46%] sm:p-8 lg:w-auto">
                  <blockquote className="text-base sm:text-lg">“{q}”</blockquote>
                  <figcaption className="mt-4 text-sm text-muted-foreground">— {a}</figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground lg:hidden" aria-hidden>Swipe for more →</p>
          </Section>
        </div>

        {/* FAQ — phone & tablet: centred single column · desktop: sticky intro left, answers right */}
        <Section id="faq" className="lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="text-center lg:sticky lg:top-10 lg:self-start lg:text-left">
            <h2 data-reveal className={H2}>Questions? Answered.</h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground lg:mx-0">Still unsure? Start the free trial, join one bootcamp, and decide after you've seen it work.</p>
            <CTA className="mt-8 hidden lg:flex lg:items-start" label="Start Free Trial" sub={false} placement="faq" />
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
        <section id="guides" className="relative mx-auto max-w-[88rem] scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-28">
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
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Start your free 30-day trial now and you're in. It costs nothing to try.</p>
            <CTA className="mt-10 items-stretch sm:items-center" buttonClassName="w-full sm:w-auto" placement="final" />
          </Section>
        </div>
      </main>

      {/* Footer — stacked on phones/tablets, logo + legal side by side on desktop */}
      <SiteFooter className="pb-28 sm:pb-0" />

      <StickyCTA />
    </div>
  );
}
