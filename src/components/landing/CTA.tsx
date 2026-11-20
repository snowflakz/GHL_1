import { ArrowRight } from "lucide-react";
import { AFFILIATE_URL } from "@/lib/bootcamp";
import { cn } from "@/lib/utils";
import { useGateClick } from "./LeadGate";

type CTAProps = {
  label?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  sub?: boolean;
  /** Attention pulse. Use on one button per page only (the hero). */
  pulse?: boolean;
  id?: string;
  /** Where on the page this CTA sits; recorded with the tracking events. */
  placement?: string;
};

export function CTA({ label = "Claim My Free Trial + Bootcamp Seat", className, buttonClassName, sub = true, pulse = false, id, placement = "section" }: CTAProps) {
  const onClick = useGateClick(placement);
  return (
    <div id={id} data-cta className={cn("flex flex-col items-center gap-2", className)}>
      <a
        href={AFFILIATE_URL}
        target="_blank"
        rel="noopener sponsored"
        data-offer="bootcamp"
        data-placement={placement}
        onClick={onClick}
        className={cn(
          "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-center text-base font-bold text-primary-foreground shadow-glow transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-8 sm:text-lg",
          pulse && "animate-pulse-ring",
          buttonClassName,
        )}
      >
        {label}
        <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
      </a>
      {sub && <p className="text-sm text-muted-foreground">100% free for 30 days · Cancel anytime</p>}
    </div>
  );
}
