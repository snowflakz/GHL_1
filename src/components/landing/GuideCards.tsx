import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import { delay } from "@/components/motion/Reveal";

/**
 * Homepage "Free guides" showcase: four large, animated cards.
 * Phone: swipeable rail with a peek of the next card. Tablet: 2×2. Desktop: 4 across.
 * Motion: staggered scroll reveal, lift + gradient border glow + light sweep on hover (hover devices only),
 * cover zoom. All transform/opacity; switched off for reduced motion.
 */
type Guide = { slug: string; tag: string; tone: string; hook: string; title: string; learn: [string, string] };

const GUIDES: Guide[] = [
  {
    slug: "what-does-gohighlevel-replace",
    tag: "Save money",
    tone: "from-success/30",
    hook: "Paying for 5+ separate tools?",
    title: "What GoHighLevel replaces, and what you'd save",
    learn: ["The 15 jobs it covers, in plain English", "A calculator for your real monthly savings"],
  },
  {
    slug: "highlevel-ai-receptionist",
    tag: "AI & automation",
    tone: "from-violet/35",
    hook: "Missing calls after hours?",
    title: "The AI receptionist that answers at 9:14pm",
    learn: ["What each AI agent does for you", "A first-hour setup checklist"],
  },
  {
    slug: "gohighlevel-pricing",
    tag: "Pricing",
    tone: "from-primary/35",
    hook: "Not sure which plan fits?",
    title: "GoHighLevel pricing, every plan explained",
    learn: ["Starter vs Unlimited vs Founder", "The usage fees nobody mentions"],
  },
  {
    slug: "highlevel-5-day-challenge",
    tag: "Free training",
    tone: "from-accent/30",
    hook: "Want it built by Friday?",
    title: "Build a marketing system in 5 days",
    learn: ["What you build each day", "How to finish (most people don't)"],
  },
];

export function GuideCards() {
  return (
    <div className="snap-rail -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
      {GUIDES.map((g, i) => (
        <Link
          key={g.slug}
          to="/blog/$slug"
          params={{ slug: g.slug }}
          data-reveal
          style={delay(i * 90)}
          className="guide-card group relative flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
        >
          {/* gradient border glow on hover */}
          <span aria-hidden className="guide-card__glow pointer-events-none absolute -inset-px rounded-3xl" />
          <div className="relative overflow-hidden">
            <img src={`/blog/${g.slug}.svg`} alt="" width={1200} height={630} loading="lazy" decoding="async" className="aspect-[1200/630] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
            <span aria-hidden className={`absolute inset-0 bg-gradient-to-t ${g.tone} via-transparent to-transparent opacity-80`} />
            <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground backdrop-blur">{g.tag}</span>
            <span aria-hidden className="guide-card__sheen pointer-events-none absolute inset-0" />
          </div>
          <div className="relative flex flex-1 flex-col p-6">
            <p className="font-display text-sm font-semibold text-primary-glow">{g.hook}</p>
            <h3 className="mt-2 font-display text-xl font-bold leading-snug text-foreground sm:text-[1.35rem]">{g.title}</h3>
            <ul className="mt-4 space-y-2">
              {g.learn.map((l) => (
                <li key={l} className="flex items-start gap-2 text-[0.95rem] text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />{l}</li>
              ))}
            </ul>
            <span className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground"><BookOpen className="h-4 w-4" aria-hidden /> Free guide</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">Read it <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden /></span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
