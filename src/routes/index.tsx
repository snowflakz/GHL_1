import { createFileRoute, Link } from "@tanstack/react-router";
import { delay } from "@/components/motion/Reveal";
import { Check, X, Zap, Users, Rocket, Star, Gift, Clock, ShieldCheck, CalendarDays, Video, Timer, BadgeCheck } from "lucide-react";
import logoUrl from "@/assets/highlevel-logo.png";
import { CTA } from "@/components/landing/CTA";
import { Countdown } from "@/components/landing/Countdown";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { LeadGateProvider, useGateClick } from "@/components/landing/LeadGate";
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
  return <section id={id} className={`mx-auto max-w-6xl scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20 lg:py-28 ${className}`}>{children}</section>;
}

/* Fluid type: sized for the device, not just shrunk. */
const H2 = "text-[clamp(1.875rem,3.2vw+1.1rem,3rem)] font-bold leading-[1.1] tracking-tight";

const nav: [string, string][] = [["#bootcamp", "The bootcamp"], ["#bonuses", "Bonuses"], ["#faq", "FAQ"], ["/blog", "Guides"]];

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
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8 sm:py-5">
        <img src={logoUrl} alt="HighLevel" width={274} height={64} fetchPriority="high" className="h-8 w-auto sm:h-10" />
        <nav aria-label="Page sections" className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
          {nav.map(([href, label]) => (
            <a key={href} href={href} className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Link to="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden">Guides</Link>
          <a href={AFFILIATE_URL} target="_blank" rel="noopener sponsored" data-offer="bootcamp" data-placement="header" onClick={headerGate} className="hidden min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex">
            Start Free Trial
          </a>
        </div>
      </header>

      <main id="main">
        {/* Hero — phone: left-aligned stack, full-width CTA · tablet: centred, card as wide strip · desktop: split with bootcamp card */}
        <div className="relative bg-hero-glow">
          <section className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div className="animate-fade-up sm:text-center lg:text-left">
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
              <div className="animate-fade-up [animation-delay:80ms] sm:mx-auto sm:w-full sm:max-w-3xl lg:max-w-none">
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
                {i < arr.length - 1 && <span aria-hidden className="absolute left-7 top-16 -bottom-8 w-px bg-gradient-to-b from-primary/60 to-transparent lg:hidden" />}
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

        {/* Guides: internal links for SEO and for readers who want more before deciding */}
        <Section id="guides" className="pt-0 sm:pt-0 lg:pt-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-violet">Free guides</p>
              <h2 data-reveal className={`${H2} mt-2`}>Not ready yet? Read up first</h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">All 10 guides →</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["gohighlevel-pricing", "Pricing & plans", "GoHighLevel pricing, every plan explained"],
              ["highlevel-ai-receptionist", "AI & automation", "The AI receptionist that answers at 9:14pm"],
              ["highlevel-5-day-challenge", "Training", "Build a marketing system in 5 days"],
            ].map(([slug = "", cat, title], i) => (
              <Link key={slug} to="/blog/$slug" params={{ slug }} data-reveal style={delay(i * 90)} className="lift group overflow-hidden rounded-2xl border border-border bg-card/50 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <img src={`/blog/${slug}.svg`} alt="" width={1200} height={630} loading="lazy" decoding="async" className="aspect-[1200/630] w-full object-cover" />
                <div className="p-5">
                  <p className={`text-xs font-semibold uppercase tracking-widest ${cat === "AI & automation" ? "text-violet" : "text-primary-glow"}`}>{cat}</p>
                  <p className="mt-1.5 font-display text-lg font-semibold leading-snug">{title}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>

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
      <footer className="border-t border-border pb-28 sm:pb-10">
        <div className="mx-auto max-w-6xl px-5 py-10 text-center sm:px-8 lg:flex lg:items-start lg:gap-12 lg:text-left">
          <img src={logoUrl} alt="HighLevel" width={274} height={64} loading="lazy" className="mx-auto h-7 w-auto opacity-80 lg:mx-0 lg:mt-1" />
          <div className="lg:flex-1">
            <p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground lg:mx-0 lg:mt-0 lg:max-w-3xl"><strong className="text-foreground">Affiliate disclaimer:</strong> <Disclaimer /> HighLevel and its logo are trademarks of HighLevel, Inc. This page is not owned or operated by HighLevel.</p>
            <p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} · Independent affiliate page · <Link to="/blog" className="underline underline-offset-4 hover:text-foreground">HighLevel guides</Link></p>
          </div>
        </div>
      </footer>

      <StickyCTA />
    </div>
  );
}
