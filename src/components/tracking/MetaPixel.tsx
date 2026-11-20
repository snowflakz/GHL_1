import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { initPixel, installOfferClickTracking, pixelEnabled, track } from "@/lib/tracking";

/**
 * Loads the Meta Pixel (only when VITE_META_PIXEL_ID is set), sends PageView on every route, and
 * fires `Lead` on EVERY affiliate-link click (homepage and blog alike).
 *
 * Why the click is the conversion: the trial/booking happens on gohighlevel.com, where this site's
 * pixel can't run, so the outbound affiliate click is the strongest signal available to Meta.
 * Actual sign-ups are confirmed in the HighLevel affiliate dashboard (fp_ref), not here.
 */
export function MetaPixel() {
  const router = useRouter();

  useEffect(() => {
    if (!pixelEnabled()) return;
    initPixel();
    track("PageView");
    const unsub = router.subscribe("onResolved", ({ fromLocation, toLocation }) => {
      if (fromLocation && fromLocation.href !== toLocation.href) track("PageView");
    });
    const uninstall = installOfferClickTracking();
    return () => {
      unsub();
      uninstall();
    };
  }, [router]);

  return null;
}
