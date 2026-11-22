import { ArrowRight } from "lucide-react";
import { OptInButton, TRIAL_FINE_PRINT } from "@/components/funnel/OptIn";
import { cn } from "@/lib/utils";

type CTAProps = {
  label?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  sub?: boolean;
  /** Extra classes for the fine print (e.g. alignment). */
  subClassName?: string;
  /** Attention pulse. Use on one button per page only (the hero). */
  pulse?: boolean;
  id?: string;
  /** Where on the page this CTA sits; recorded with the tracking events. */
  placement?: string;
};

/** Primary CTA: opens the opt-in form (never links straight to the affiliate URL). */
export function CTA({ label = "Claim My Free Trial + Bootcamp Seat", className, buttonClassName, sub = true, subClassName, pulse = false, id, placement = "section" }: CTAProps) {
  return (
    <div id={id} data-cta className={cn("flex flex-col items-center gap-2", className)}>
      <OptInButton
        placement={placement}
        className={cn(
          // The pulsing hero button skips the hover shine (its overflow clip would hide the pulse ring).
          !pulse && "shine",
          "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-center text-base font-bold text-primary-foreground shadow-glow transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-8 sm:text-lg",
          pulse && "relative animate-pulse-ring",
          buttonClassName,
        )}
      >
        {label}
        <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
      </OptInButton>
      {sub && <p className={cn("max-w-md text-center text-xs leading-relaxed text-muted-foreground", subClassName)}>{TRIAL_FINE_PRINT}</p>}
    </div>
  );
}
