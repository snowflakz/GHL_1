import { useEffect, useState } from "react";
import { AFFILIATE_URL } from "@/lib/bootcamp";
import { cn } from "@/lib/utils";

/**
 * Phone-only bottom bar. Stays hidden while the hero CTA (#hero-cta) is on screen,
 * so there are never two identical buttons in view, then slides up into the thumb zone.
 */
export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const ctas = Array.from(document.querySelectorAll<HTMLElement>("[data-cta]"));
    if (!hero || !("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    // Show only once the hero CTA is above the fold and no other in-page CTA is on screen.
    const visible = new Set<Element>();
    let heroAbove = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
        if (e.target === hero) heroAbove = !e.isIntersecting && e.boundingClientRect.top < 0;
      }
      setShow(heroAbove && visible.size === 0);
    });
    ctas.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn("sticky-cta fixed inset-x-0 bottom-0 z-50 border-t border-border glass px-4 pt-3 sm:hidden", show ? "is-visible" : "pointer-events-none")}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <a
        href={AFFILIATE_URL}
        target="_blank"
        rel="noopener sponsored"
        tabIndex={show ? 0 : -1}
        className="flex min-h-12 items-center justify-center rounded-full bg-gradient-primary py-3.5 text-center font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Get Free Trial + Bootcamp →
      </a>
    </div>
  );
}
