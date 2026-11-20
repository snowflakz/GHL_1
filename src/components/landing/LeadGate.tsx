import { createContext, useCallback, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import { BellRing, Check, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LEAD_WEBHOOK_URL, identify, isValidEmail, sendLeadToWebhook, track } from "@/lib/tracking";

/**
 * Optional, AFTER-click email capture. The affiliate link is never blocked:
 *   1. Visitor clicks a bootcamp CTA -> MetaPixel fires `Lead` -> HighLevel opens in a new tab (normal link).
 *   2. Back on this tab, a small box offers the bootcamp schedule + a reminder.
 *   3. If they leave an email -> advanced matching + `CompleteRegistration` + webhook (for abandoned-checkout follow-up).
 * Shown only when a webhook is configured (never ask for an email that goes nowhere), and always in local dev.
 */
const GATE_ON = Boolean(LEAD_WEBHOOK_URL) || import.meta.env.DEV;

type Ctx = { offerReminder: (placement: string) => void; enabled: boolean };
const LeadGateCtx = createContext<Ctx>({ offerReminder: () => {}, enabled: false });
export const useLeadGate = () => useContext(LeadGateCtx);

export function LeadGateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const placement = useRef("cta");
  const shownOnce = useRef(false);

  const offerReminder = useCallback((p: string) => {
    if (shownOnce.current) return; // never nag: once per visit
    shownOnce.current = true;
    placement.current = p;
    setError("");
    // Let the new tab open first; the box is waiting when they come back.
    window.setTimeout(() => setOpen(true), 400);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const firstName = String(data.get("firstName") ?? "").trim();
    if (!isValidEmail(email)) {
      setError("Enter a valid email, like you@business.com");
      return;
    }
    identify(email, firstName || undefined);
    track("CompleteRegistration", { content_name: "bootcamp reminder", content_category: placement.current });
    sendLeadToWebhook({ email, firstName: firstName || undefined, offer: "bootcamp", placement: placement.current });
    setDone(true);
    window.setTimeout(() => setOpen(false), 1600);
  };

  return (
    <LeadGateCtx.Provider value={{ offerReminder, enabled: GATE_ON }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="max-w-md overflow-hidden rounded-3xl border-border bg-card p-0 sm:max-w-lg">
          <div aria-hidden className="h-1.5 w-full bg-gradient-primary" />
          <div className="p-6 sm:p-8">
            {done ? (
              <div className="py-6 text-center" role="status">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15"><Check className="h-6 w-6 text-success" aria-hidden /></span>
                <DialogTitle className="mt-4 font-display text-2xl font-bold">You're on the list</DialogTitle>
                <DialogDescription className="mt-2 text-muted-foreground">Finish your free trial in the HighLevel tab. Your reminder is on its way.</DialogDescription>
              </div>
            ) : (
              <>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet"><BellRing className="h-4 w-4" aria-hidden /> Optional</p>
                <DialogTitle className="mt-2 font-display text-2xl font-bold leading-tight sm:text-[1.7rem]">Want the bootcamp schedule and a reminder?</DialogTitle>
                <DialogDescription className="mt-3 text-base leading-relaxed text-muted-foreground">
                  HighLevel just opened in a new tab so you can start your <strong className="text-foreground">30-day free trial</strong>. Leave your email and I'll send the live bootcamp times, and help if you get stuck.
                </DialogDescription>

                <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="lg-first" className="text-sm font-medium">First name <span className="text-muted-foreground">(optional)</span></label>
                    <input id="lg-first" name="firstName" type="text" autoComplete="given-name" className="mt-1.5 block min-h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition-[border-color,box-shadow] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40" />
                  </div>
                  <div>
                    <label htmlFor="lg-email" className="text-sm font-medium">Email</label>
                    <input
                      id="lg-email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false}
                      placeholder="you@business.com…" aria-invalid={Boolean(error)} aria-describedby={error ? "lg-err" : undefined}
                      onInput={() => error && setError("")}
                      className="mt-1.5 block min-h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition-[border-color,box-shadow] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive"
                    />
                    {error && <p id="lg-err" role="alert" className="mt-1.5 text-sm text-destructive">{error}</p>}
                  </div>
                  <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-primary px-6 text-base font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card">
                    Send me the reminder
                  </button>
                </form>

                <div className="mt-4 flex flex-col items-center gap-2 text-center">
                  <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Lock className="h-3.5 w-3.5" aria-hidden /> No spam. Unsubscribe anytime.</p>
                  <button type="button" onClick={() => setOpen(false)} className="min-h-10 rounded text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    No thanks
                  </button>
                  {import.meta.env.DEV && !LEAD_WEBHOOK_URL && <p className="text-xs text-accent">Dev preview: no webhook set, so emails aren't sent anywhere yet.</p>}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </LeadGateCtx.Provider>
  );
}

/**
 * Click handler for bootcamp CTAs. Never blocks the link: HighLevel opens normally and the
 * `Lead` is fired by MetaPixel. This only queues the optional reminder box for when they return.
 */
export function useGateClick(placement: string) {
  const { offerReminder, enabled } = useLeadGate();
  return () => {
    if (enabled) offerReminder(placement);
  };
}
