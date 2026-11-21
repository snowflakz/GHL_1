import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { affiliateUrlWithSubId, captureAttribution, flushLeadQueue, getAttribution, isValidEmail, pushDL, submitLead } from "@/lib/funnel";
import { identify, track } from "@/lib/tracking";

/**
 * Opt-in step in front of the affiliate link.
 * Every CTA calls `openOptIn(placement)` -> form (first name, email, hidden gclid) -> POST to FORM_ENDPOINT_URL
 * -> dataLayer `optin_submit` (with user_data for Enhanced Conversions) -> thank-you step with ONE button to the
 * affiliate link (+ gclid sub-ID), same tab, which pushes `trial_click` before navigating.
 * The affiliate link is rendered nowhere else on the site.
 */
type Ctx = { openOptIn: (placement: string) => void };
const OptInCtx = createContext<Ctx>({ openOptIn: () => {} });
export const useOptIn = () => useContext(OptInCtx);

export function OptInProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "thanks">("form");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [gclid, setGclid] = useState("");
  const placement = useRef("cta");

  // Capture gclid/gbraid/wbraid + utm_* on landing, and retry any lead that failed to send last time.
  useEffect(() => {
    captureAttribution();
    void flushLeadQueue();
  }, []);

  const openOptIn = useCallback((p: string) => {
    placement.current = p;
    setGclid(getAttribution().gclid ?? "");
    setError("");
    setStep((s) => (s === "thanks" ? "thanks" : "form")); // someone who already opted in goes straight to step 2
    setOpen(true);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const firstName = String(data.get("first_name") ?? "").trim();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email, like you@business.com");
      (e.currentTarget.elements.namedItem("email") as HTMLInputElement | null)?.focus();
      return;
    }
    setBusy(true);
    const attr = getAttribution();
    const utm = Object.fromEntries(Object.entries(attr).filter(([k]) => k.startsWith("utm_"))) as Record<string, string>;
    const delivery = await submitLead({
      first_name: firstName,
      email,
      gclid: String(data.get("gclid") ?? ""),
      ...(attr.gbraid ? { gbraid: attr.gbraid } : {}),
      ...(attr.wbraid ? { wbraid: attr.wbraid } : {}),
      utm,
      page: window.location.href,
      submitted_at: new Date().toISOString(),
      source: `nuvoracore:${placement.current}`,
    });
    // The lead is safe (sent, or queued in this browser and retried), so this counts as a successful opt-in.
    pushDL({ event: "optin_submit", placement: placement.current, lead_delivery: delivery, user_data: { email, first_name: firstName } });
    identify(email, firstName || undefined);
    track("Lead", { content_name: "bootcamp opt-in", content_category: placement.current });
    setBusy(false);
    setStep("thanks");
  };

  const onTrialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = e.currentTarget.href;
    track("InitiateCheckout", { content_name: "bootcamp trial", content_category: placement.current });
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      pushDL({ event: "trial_click", placement: placement.current });
      return; // respect "open in new tab"
    }
    e.preventDefault();
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.assign(url);
    };
    // Wait for GTM to send the conversion before leaving (eventCallback), with a hard fallback if GTM is blocked.
    pushDL({ event: "trial_click", placement: placement.current, eventCallback: go, eventTimeout: 1500 });
    window.setTimeout(go, 1700);
  };

  return (
    <OptInCtx.Provider value={{ openOptIn }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92dvh] max-w-md overflow-y-auto rounded-3xl border-border bg-card p-0 sm:max-w-lg">
          <div aria-hidden className="h-1.5 w-full bg-gradient-primary" />
          {step === "form" ? (
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet">Step 1 of 2</p>
              <DialogTitle className="mt-2 font-display text-2xl font-bold leading-tight sm:text-[1.7rem]">Claim your free 30-day trial + 3 bonuses</DialogTitle>
              <DialogDescription className="mt-3 text-base leading-relaxed text-muted-foreground">
                Tell me where to send your bootcamp details and bonuses. Next, you'll start your free 30-day HighLevel trial.
              </DialogDescription>
              <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4" aria-label="Free trial opt-in">
                <input type="hidden" name="gclid" value={gclid} readOnly />
                <div>
                  <label htmlFor="optin-first" className="text-sm font-medium">First name</label>
                  <input id="optin-first" name="first_name" type="text" autoComplete="given-name" className="mt-1.5 block min-h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition-[border-color,box-shadow] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40" />
                </div>
                <div>
                  <label htmlFor="optin-email" className="text-sm font-medium">Email <span className="text-muted-foreground">(required)</span></label>
                  <input
                    id="optin-email" name="email" type="email" inputMode="email" autoComplete="email" required spellCheck={false}
                    placeholder="you@business.com…" aria-invalid={Boolean(error)} aria-describedby={error ? "optin-err" : undefined}
                    onBlur={(e) => e.currentTarget.value && !isValidEmail(e.currentTarget.value) && setError("Please enter a valid email, like you@business.com")}
                    onInput={() => error && setError("")}
                    className="mt-1.5 block min-h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition-[border-color,box-shadow] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive"
                  />
                  {error && <p id="optin-err" role="alert" className="mt-1.5 text-sm text-destructive">{error}</p>}
                </div>
                <button type="submit" disabled={busy} className="shine group inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:text-lg">
                  {busy ? "Sending…" : "Get My Free 30-Day Trial + Bonuses"}
                  {!busy && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />}
                </button>
              </form>
              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted-foreground">
                <Lock className="h-3.5 w-3.5" aria-hidden /> No spam. Unsubscribe anytime.
                <Link to="/privacy" onClick={() => setOpen(false)} className="underline underline-offset-4 hover:text-foreground">Privacy policy</Link>
              </p>
            </div>
          ) : (
            <div className="p-6 text-center sm:p-8">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15"><CheckCircle2 className="h-8 w-8 text-success" aria-hidden /></span>
              <DialogTitle className="mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl">You're in! Step 2: start your free 30-day trial</DialogTitle>
              <DialogDescription className="mx-auto mt-3 max-w-sm text-base text-muted-foreground">Your bootcamp details are on the way. Activate your trial now so it's ready for the live session.</DialogDescription>
              <a
                href={affiliateUrlWithSubId()}
                rel="sponsored"
                onClick={onTrialClick}
                className="shine group mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                Start my free 30-day trial <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
              <p className="mt-3 text-xs text-muted-foreground">Opens HighLevel's sign-up page. Affiliate link: I may earn a commission at no extra cost to you.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </OptInCtx.Provider>
  );
}

/** A CTA button that opens the opt-in. Renders a real <button>, never a link to the affiliate URL. */
export function OptInButton({ placement, className, children }: { placement: string; className?: string; children: ReactNode }) {
  const { openOptIn } = useOptIn();
  return (
    <button type="button" data-cta-optin data-placement={placement} onClick={() => openOptIn(placement)} className={className}>
      {children}
    </button>
  );
}
