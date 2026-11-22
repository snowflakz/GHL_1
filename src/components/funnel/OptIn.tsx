import { createContext, useCallback, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { AFFILIATE_URL } from "@/lib/bootcamp";
import { captureAttribution, flushLeadQueue, getAttribution, isAffiliateHref, isValidEmail, pushAffiliateClick, pushDL, sendLead } from "@/lib/funnel";
import { track } from "@/lib/tracking";

/** Trial fine print shown under every primary CTA and in the opt-in. */
export const TRIAL_FINE_PRINT =
  "30-day free trial from HighLevel. Cancel anytime during the trial without being charged. The subscription rebills monthly after the trial unless cancelled; communication surcharges and usage fees may apply.";

/**
 * Opt-in (Step 1 of 2) in front of the affiliate link.
 * CTA -> form (first name, email, hidden gclid) -> dataLayer `generate_lead` -> lead sent to the webhook in the
 * background (1.5s timeout, never blocks) -> Step 2 with ONE same-tab button to the affiliate URL, exactly as
 * HighLevel issued it. Any click to a HighLevel affiliate URL anywhere on the site pushes `affiliate_click`.
 */
type Ctx = { openOptIn: (placement: string) => void };
const OptInCtx = createContext<Ctx>({ openOptIn: () => {} });
export const useOptIn = () => useContext(OptInCtx);

export function OptInProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "thanks">("form");
  const [error, setError] = useState("");
  const [gclid, setGclid] = useState("");
  const [placement, setPlacement] = useState("cta");

  useEffect(() => {
    captureAttribution();
    void flushLeadQueue();

    // affiliate_click for every HighLevel affiliate link on the site (the Step 2 button handles its own push).
    const onClick = (e: MouseEvent) => {
      if (e.type === "auxclick" && e.button !== 1) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.hasAttribute("data-affiliate-step2") || !isAffiliateHref(a.href)) return;
      pushAffiliateClick({ placement: a.dataset["placement"] ?? "link" });
    };
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("auxclick", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("auxclick", onClick, { capture: true });
    };
  }, []);

  const openOptIn = useCallback((p: string) => {
    setPlacement(p);
    setGclid(getAttribution().gclid ?? "");
    setError("");
    setOpen(true);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const firstName = String(data.get("first_name") ?? "").trim();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email, like you@business.com");
      (e.currentTarget.elements.namedItem("email") as HTMLInputElement | null)?.focus();
      return;
    }
    const a = getAttribution();
    // Successful opt-in: tell GTM first (Enhanced Conversions reads user_data), then send the lead in the background.
    pushDL({ event: "generate_lead", lead_source: "nuvoracore_optin", user_data: { email, first_name: firstName }, gclid: a.gclid ?? "", utm_term: a.utm_term ?? "", utm_campaign: a.utm_campaign ?? "" });
    track("Lead", { content_name: "bootcamp opt-in", content_category: placement });
    void sendLead({
      first_name: firstName,
      email,
      gclid: String(data.get("gclid") ?? a.gclid ?? ""),
      gbraid: a.gbraid ?? "",
      wbraid: a.wbraid ?? "",
      utm_source: a.utm_source ?? "",
      utm_medium: a.utm_medium ?? "",
      utm_campaign: a.utm_campaign ?? "",
      utm_term: a.utm_term ?? "",
      utm_content: a.utm_content ?? "",
      timestamp: new Date().toISOString(),
      page_url: window.location.origin + window.location.pathname, // path only: no query string in stored URLs
    });
    setStep("thanks");
  };

  const onTrialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = e.currentTarget.href;
    track("InitiateCheckout", { content_name: "bootcamp trial", content_category: placement });
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      pushAffiliateClick({ placement: "optin-step2" });
      return;
    }
    e.preventDefault();
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.assign(url);
    };
    // Let GTM send the conversion before leaving (eventCallback), with a hard fallback if GTM is blocked.
    pushAffiliateClick({ placement: "optin-step2", eventCallback: go, eventTimeout: 1500 });
    window.setTimeout(go, 1700);
  };

  const disclosure = "I'm an independent HighLevel affiliate and may earn a commission if you sign up, at no extra cost to you.";

  return (
    <OptInCtx.Provider value={{ openOptIn }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92dvh] max-w-md overflow-y-auto rounded-3xl border-border bg-card p-0 sm:max-w-lg">
          <div aria-hidden className="h-1.5 w-full bg-gradient-primary" />
          {step === "form" ? (
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet">Step 1 of 2</p>
              <DialogTitle className="mt-2 font-display text-2xl font-bold leading-tight sm:text-[1.7rem]">Get HighLevel's free 30-day trial + live bootcamp</DialogTitle>
              <DialogDescription className="mt-3 text-base leading-relaxed text-muted-foreground">
                Tell me where to send the bootcamp details. Next, you'll start HighLevel's free 30-day trial, with 3 bonuses included by HighLevel.
              </DialogDescription>
              {/* method="post" so that, even without JavaScript, the email can never end up in the URL. */}
              <form method="post" onSubmit={onSubmit} noValidate className="mt-6 space-y-4" aria-label="Free trial opt-in">
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
                <p className="rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm leading-relaxed text-foreground/85" data-testid="optin-disclosure">{disclosure}</p>
                <button type="submit" className="shine group inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:text-lg">
                  Continue to My Free 30-Day Trial <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                <Lock className="mr-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
                By continuing you agree to receive bootcamp details by email. Unsubscribe anytime.{" "}
                <Link to="/privacy" onClick={() => setOpen(false)} className="underline underline-offset-4 hover:text-foreground">Privacy policy</Link>
              </p>
              <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">{TRIAL_FINE_PRINT}</p>
            </div>
          ) : (
            <div className="p-6 text-center sm:p-8">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15"><CheckCircle2 className="h-8 w-8 text-success" aria-hidden /></span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-violet">Step 2 of 2</p>
              <DialogTitle className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl">You're in! Step 2: start your free 30-day trial</DialogTitle>
              <DialogDescription className="mx-auto mt-3 max-w-sm text-base text-muted-foreground">Your bootcamp details are on the way. Start HighLevel's trial now so your account is ready for the live session.</DialogDescription>
              <a
                href={AFFILIATE_URL}
                rel="sponsored"
                data-affiliate-step2
                onClick={onTrialClick}
                className="shine group mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                Start my free 30-day trial <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{TRIAL_FINE_PRINT}</p>
              <p className="mt-2 text-xs text-muted-foreground">{disclosure}</p>
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
