import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { OptInButton } from "@/components/funnel/OptIn";
import { OFFERS, type OfferKey } from "@/lib/bootcamp";

const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\(([^)]+)\)/g;

/** Renders the tiny inline markup used in post content (see content/types.ts). */
export function Rich({ x, offer }: { x: string; offer: OfferKey }): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of x.matchAll(TOKEN)) {
    if (m.index! > last) out.push(x.slice(last, m.index));
    if (m[1]) {
      out.push(<strong key={i++} className="font-semibold text-foreground"><Rich x={m[1]} offer={offer} /></strong>);
    } else {
      const text = m[2] ?? "";
      const href = m[3] ?? "";
      if (href.startsWith("@")) {
        const key = (href === "@offer" ? offer : href.slice(1)) as OfferKey;
        // The bootcamp affiliate link only ever appears on the opt-in thank-you step.
        if (key === "bootcamp") {
          out.push(
            <OptInButton key={i++} placement="in-text" className="inline cursor-pointer p-0 text-left font-medium text-primary-glow underline decoration-primary-glow/40 underline-offset-4 transition-colors hover:decoration-primary-glow">
              {text}
            </OptInButton>,
          );
          last = m.index! + m[0].length;
          continue;
        }
        out.push(
          <a key={i++} href={OFFERS[key].url} target="_blank" rel="sponsored noopener" data-offer={key} className="font-medium text-primary-glow underline decoration-primary-glow/40 underline-offset-4 transition-colors hover:decoration-primary-glow">
            {text}
          </a>,
        );
      } else {
        out.push(
          <Link key={i++} to={href} className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground">
            {text}
          </Link>,
        );
      }
    }
    last = m.index! + m[0].length;
  }
  if (last < x.length) out.push(x.slice(last));
  return <Fragment>{out}</Fragment>;
}

export const plainText = (x: string) => x.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\([^)]+\)/g, "$1");
