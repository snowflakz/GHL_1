import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { adConsentGranted, onConsentChange } from "@/lib/consent";
import { initPixel, pixelEnabled, track } from "@/lib/tracking";

/**
 * Loads the Meta Pixel only when VITE_META_PIXEL_ID is set AND the visitor has granted ad consent,
 * then sends PageView on every route. Conversion events are sent by the opt-in (lib/tracking.ts).
 */
export function MetaPixel() {
  const router = useRouter();

  useEffect(() => {
    if (!pixelEnabled()) return;
    let unsub: (() => void) | undefined;
    const start = () => {
      if (window.fbq) return;
      initPixel();
      track("PageView");
      unsub = router.subscribe("onResolved", ({ fromLocation, toLocation }) => {
        if (fromLocation && fromLocation.href !== toLocation.href) track("PageView");
      });
    };
    if (adConsentGranted()) start();
    const off = onConsentChange((granted) => granted && start());
    return () => {
      unsub?.();
      off();
    };
  }, [router]);

  return null;
}
