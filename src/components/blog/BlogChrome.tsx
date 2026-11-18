import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/highlevel-logo.png";
import { AFFILIATE_URL } from "@/lib/bootcamp";

export function BlogHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link to="/" aria-label="Home" className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <img src={logoUrl} alt="HighLevel" width={274} height={64} fetchPriority="high" className="h-7 w-auto sm:h-8" />
        </Link>
        <nav aria-label="Site" className="flex items-center gap-5 text-sm">
          <Link to="/blog" className="text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground">Guides</Link>
          <a href={AFFILIATE_URL} target="_blank" rel="sponsored noopener" data-offer="bootcamp" className="hidden min-h-10 items-center rounded-full border border-border px-4 font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex">
            Free bootcamp
          </a>
        </nav>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground sm:px-8 lg:flex lg:items-start lg:justify-between lg:gap-12">
        <p className="max-w-3xl">
          <strong className="text-foreground">Affiliate disclosure:</strong> I'm an independent HighLevel affiliate, not a HighLevel employee. Some links on this site are affiliate links, so I may earn a commission if you sign up, at no extra cost to you. Prices and offers were checked on the date shown on each guide and can change, so the HighLevel page is always the final word. HighLevel and its logo are trademarks of HighLevel, Inc.
        </p>
        <nav aria-label="Footer" className="mt-6 flex gap-5 lg:mt-0">
          <Link to="/" className="hover:text-foreground">Free bootcamp</Link>
          <Link to="/blog" className="hover:text-foreground">All guides</Link>
        </nav>
      </div>
    </footer>
  );
}
