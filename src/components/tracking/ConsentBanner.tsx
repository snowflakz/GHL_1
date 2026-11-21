import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getChoice, setChoice } from "@/lib/consent";

/** Small cookie banner (accept / reject). Shown until the visitor chooses; updates Google Consent Mode v2. */
export function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Delay so the banner never competes with the hero for first paint (LCP).
    const t = window.setTimeout(() => setShow(getChoice() === null), 1200);
    return () => window.clearTimeout(t);
  }, []);
  if (!show) return null;

  const choose = (v: "granted" | "denied") => {
    setChoice(v);
    setShow(false);
  };

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie preferences" className="consent-banner fixed inset-x-3 bottom-24 z-[60] mx-auto max-w-md rounded-2xl border border-border bg-card/95 p-4 shadow-glow backdrop-blur-md sm:inset-x-auto sm:bottom-5 sm:left-5 sm:mx-0 sm:p-5">
      <p className="text-sm leading-relaxed text-foreground/90">
        I use cookies to understand traffic and measure Google Ads results. Accept to allow them, or reject to keep only what the site needs to work.{" "}
        <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy policy</Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => choose("denied")} className="min-h-10 flex-1 rounded-full border border-border px-4 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Reject</button>
        <button type="button" onClick={() => choose("granted")} className="min-h-10 flex-1 rounded-full bg-gradient-primary px-4 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Accept</button>
      </div>
    </div>
  );
}
