import { Link } from "@tanstack/react-router";

/**
 * NuvoraCore brand logo, always linked to the home page.
 * - "header": mark + wordmark for the 32px header slot. WebP with PNG fallback, 1x/2x, eager (above the fold).
 * - "footer": mark + wordmark + tagline lockup, lazy (below the fold).
 * Explicit width/height on every image prevents layout shift.
 */
export function BrandLogo({ variant = "header", className = "" }: { variant?: "header" | "footer"; className?: string }) {
  const focus = "inline-block shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  if (variant === "footer") {
    return (
      <Link to="/" aria-label="NuvoraCore home" className={`${focus} ${className}`}>
        <img src="/brand/nuvoracore-lockup.png" srcSet="/brand/nuvoracore-lockup.png 1x, /brand/nuvoracore-lockup@2x.png 2x" alt="NuvoraCore" width={253} height={56} loading="lazy" decoding="async" className="h-14 w-auto" />
      </Link>
    );
  }
  return (
    <Link to="/" aria-label="NuvoraCore home" className={`${focus} ${className}`}>
      <picture>
        <source type="image/webp" srcSet="/brand/nuvoracore-logo.webp 1x, /brand/nuvoracore-logo@2x.webp 2x" />
        <img src="/brand/nuvoracore-logo.png" srcSet="/brand/nuvoracore-logo.png 1x, /brand/nuvoracore-logo@2x.png 2x" alt="NuvoraCore" width={177} height={32} fetchPriority="high" decoding="async" className="h-8 w-auto" />
      </picture>
    </Link>
  );
}
