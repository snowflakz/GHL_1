import { useMemo, useState } from "react";
import { Calculator, TrendingDown } from "lucide-react";
import { OptInButton } from "@/components/funnel/OptIn";

/**
 * "Add up your stack" calculator. Starting figures are the example monthly prices from HighLevel's own
 * comparison chart (labelled as such); readers tick what they use and type what they actually pay.
 */
type Row = { job: string; stage: "Capture" | "Nurture" | "Close" | "Grow"; example: number };

export const STACK: Row[] = [
  { job: "Website builder", stage: "Capture", example: 29 },
  { job: "Sales funnels", stage: "Capture", example: 297 },
  { job: "Surveys & forms", stage: "Capture", example: 49 },
  { job: "Call tracking", stage: "Capture", example: 49 },
  { job: "CRM & pipeline", stage: "Nurture", example: 99 },
  { job: "Email marketing", stage: "Nurture", example: 99 },
  { job: "Two-way SMS", stage: "Nurture", example: 99 },
  { job: "Workflow automation", stage: "Nurture", example: 169 },
  { job: "Booking & appointments", stage: "Close", example: 29 },
  { job: "Document signing", stage: "Close", example: 47 },
  { job: "Courses & digital products", stage: "Close", example: 99 },
  { job: "Reputation management", stage: "Grow", example: 159 },
  { job: "Community", stage: "Grow", example: 89 },
  { job: "Tracking & analytics", stage: "Grow", example: 299 },
];

const STAGE_COLOR: Record<Row["stage"], string> = {
  Capture: "text-accent",
  Nurture: "text-primary-glow",
  Close: "text-success",
  Grow: "text-violet",
};

const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StackCalculator() {
  const [rows, setRows] = useState(() => STACK.map((r) => ({ ...r, on: true, cost: r.example })));
  const [plan, setPlan] = useState<97 | 297>(97);

  const total = useMemo(() => rows.reduce((s, r) => s + (r.on ? r.cost || 0 : 0), 0), [rows]);
  const monthly = Math.max(0, total - plan);
  const yearly = monthly * 12;
  const pct = total > 0 ? Math.min(100, Math.round((plan / total) * 100)) : 100;

  const update = (i: number, patch: Partial<(typeof rows)[number]>) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  return (
    <section data-reveal="scale" aria-labelledby="calc-title" className="my-12 overflow-hidden rounded-3xl border border-primary/30 bg-card">
      <div className="border-b border-border p-6 sm:p-8">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet"><Calculator className="h-4 w-4" aria-hidden /> Interactive</p>
        <h3 id="calc-title" className="mt-2 font-display text-2xl font-bold sm:text-3xl">Add up your software stack</h3>
        <p className="mt-2 max-w-[60ch] text-base text-muted-foreground">Untick what you don't use and type in what you actually pay. Starting figures are the example prices from HighLevel's own comparison chart.</p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px]">
        <ul className="divide-y divide-border/70">
          {rows.map((r, i) => (
            <li key={r.job} className={`flex items-center gap-3 px-5 py-3 transition-opacity duration-200 sm:px-8 ${r.on ? "" : "opacity-45"}`}>
              <input id={`calc-${i}`} type="checkbox" checked={r.on} onChange={(e) => update(i, { on: e.target.checked })} className="h-5 w-5 shrink-0 cursor-pointer accent-[var(--primary)]" />
              <label htmlFor={`calc-${i}`} className="min-w-0 flex-1 cursor-pointer">
                <span className="block truncate text-[0.975rem] font-medium text-foreground">{r.job}</span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${STAGE_COLOR[r.stage]}`}>{r.stage}</span>
              </label>
              <span className="text-sm text-muted-foreground" aria-hidden>$</span>
              <input
                type="number" inputMode="decimal" min={0} step={1} value={r.cost} disabled={!r.on}
                aria-label={`${r.job} monthly cost in dollars`}
                onChange={(e) => update(i, { cost: Math.max(0, Number(e.target.value) || 0) })}
                className="h-10 w-20 rounded-lg border border-input bg-background px-2 text-right text-sm tabular-nums outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-60 sm:w-24"
              />
              <span className="hidden text-xs text-muted-foreground sm:inline">/mo</span>
            </li>
          ))}
        </ul>

        <aside className="border-t border-border bg-background/40 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your separate tools</p>
            <p className="mt-1 font-display text-4xl font-bold tabular-nums" aria-live="polite">{usd(total)}<span className="text-base font-medium text-muted-foreground">/mo</span></p>

            <fieldset className="mt-6">
              <legend className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Compare with HighLevel</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([97, 297] as const).map((p) => (
                  <button key={p} type="button" aria-pressed={plan === p} onClick={() => setPlan(p)} className={`min-h-11 rounded-xl border px-3 text-sm font-semibold transition-colors duration-200 ${plan === p ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                    {p === 97 ? "Starter $97" : "Unlimited $297"}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6" aria-hidden>
              <div className="h-3 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-gradient-primary transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} /></div>
              <p className="mt-1.5 text-xs text-muted-foreground">HighLevel is {pct}% of your current spend</p>
            </div>

            <div className="mt-6 rounded-2xl border border-success/30 bg-success/[0.07] p-4">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-success"><TrendingDown className="h-4 w-4" aria-hidden /> You could save</p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums text-foreground" aria-live="polite">{usd(monthly)}<span className="text-base font-medium text-muted-foreground">/mo</span></p>
              <p className="text-sm text-muted-foreground tabular-nums">{usd(yearly)} a year</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Before HighLevel's SMS, email and call usage, which is billed separately. Plus: HighLevel's white-label mobile app has no separate-tool equivalent.</p>

            <OptInButton placement="calculator" className="group mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-5 font-bold text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Test it free for 30 days →
            </OptInButton>
          </div>
        </aside>
      </div>
    </section>
  );
}
