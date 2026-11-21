import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { OptInButton } from "@/components/funnel/OptIn";

/**
 * Shared footer for the homepage and every guide. Links are grouped by intent, sized for easy
 * tapping (min 44px rows on phones) and bright enough to scan, with the primary offer repeated
 * as a clear button for visitors who reach the bottom ready to act.
 */
export const DISCLOSURE =
  "Disclosure: I'm an independent HighLevel affiliate, not a HighLevel employee or agent. I receive referral payments from HighLevel and may earn a commission if you sign up, at no extra cost to you. Opinions here are my own and are not statements by HighLevel Inc. HighLevel and its logo are trademarks of HighLevel, Inc. This site is not owned or operated by HighLevel.";

type L = { label: string; to: string; hash?: string; slug?: string };
const COLS: { title: string; links: L[] }[] = [
  {
    title: "Start here",
    links: [
      { label: "Free live bootcamp", to: "/" },
      { label: "Watch how it works", to: "/", hash: "watch" },
      { label: "What HighLevel replaces", to: "/blog/$slug", slug: "what-does-gohighlevel-replace" },
      { label: "GoHighLevel pricing", to: "/blog/$slug", slug: "gohighlevel-pricing" },
    ],
  },
  {
    title: "Popular guides",
    links: [
      { label: "AI receptionist", to: "/blog/$slug", slug: "highlevel-ai-receptionist" },
      { label: "5 Day Challenge", to: "/blog/$slug", slug: "highlevel-5-day-challenge" },
      { label: "Annual plans compared", to: "/blog/$slug", slug: "highlevel-annual-plans-starter-vs-unlimited" },
      { label: "SaaS Pro free trial", to: "/blog/$slug", slug: "highlevel-saas-pro-free-trial" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "All 11 guides", to: "/blog" },
      { label: "Questions answered", to: "/", hash: "faq" },
      { label: "Privacy policy", to: "/privacy" },
    ],
  },
];

const linkCls =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-md text-[0.975rem] font-medium text-foreground/85 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 sm:py-1.5";

export function SiteFooter({ note, className = "" }: { note?: string; className?: string }) {
  return (
    <footer className={`cv-auto border-t border-border bg-card/30 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr] lg:gap-12">
          <div>
            <BrandLogo variant="footer" />
            <p className="mt-4 max-w-xs text-[0.975rem] leading-relaxed text-muted-foreground">Plain-English guides and a free live bootcamp for business owners getting started on HighLevel.</p>
            <OptInButton placement="footer" className="shine group mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-primary px-6 font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Claim free trial + bootcamp <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </OptInButton>
          </div>

          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-glow">{col.title}</p>
              <ul className="mt-3 sm:mt-4 sm:space-y-1">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} {...(l.slug ? { params: { slug: l.slug } } : {})} {...(l.hash ? { hash: l.hash } : {})} className={linkCls}>
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8 leading-relaxed">
          <p className="max-w-4xl text-[0.95rem] text-foreground/80">{DISCLOSURE}</p>
          {note && <p className="mt-3 max-w-4xl text-sm text-muted-foreground">{note}</p>}
          <p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} NuvoraCore · Independent affiliate site · <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy policy</Link></p>
        </div>
      </div>
    </footer>
  );
}
