import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoUrl from "@/assets/highlevel-logo.png";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AFFILIATE_URL } from "@/lib/bootcamp";

const navLink =
  "inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&.active]:bg-secondary [&.active]:text-foreground";

/** Sticky, readable header for the guides: Home and Guides always visible, plus the main offer as a solid button. */
export function BlogHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-8 sm:py-3">
        <Link to="/" aria-label="Home" className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <img src={logoUrl} alt="HighLevel" width={274} height={64} fetchPriority="high" className="h-7 w-auto sm:h-8" />
        </Link>
        <nav aria-label="Site" className="flex items-center gap-0.5 sm:gap-1">
          <span className="hidden sm:contents"><Link to="/" activeOptions={{ exact: true }} className={navLink}>Home</Link></span>
          <Link to="/blog" activeOptions={{ exact: true }} className={navLink}>Guides</Link>
          <a href={AFFILIATE_URL} target="_blank" rel="sponsored noopener" data-offer="bootcamp" data-placement="blog-header" className="shine group ml-1 inline-flex min-h-10 shrink-0 items-center whitespace-nowrap gap-1.5 rounded-full bg-gradient-primary px-4 text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-11 sm:px-5">
            <span className="sm:hidden">Free trial</span><span className="hidden sm:inline">Free trial + bootcamp</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return <SiteFooter note="Prices and offers were checked on the date shown on each guide and can change, so the HighLevel page is always the final word." />;
}
