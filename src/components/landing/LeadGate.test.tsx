import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";

/**
 * Verifies the browser half of the tracking:
 *   - every affiliate click fires `Lead` and is NOT blocked (the link opens HighLevel as normal)
 *   - the optional reminder box appears after the click; an email adds CompleteRegistration + webhook
 * fbq and fetch are stubbed, so nothing reaches Meta or a real webhook.
 */
const PIXEL = "111122223333";
const HOOK = "https://hooks.example.test/lead";

async function setup() {
  vi.resetModules();
  vi.useFakeTimers({ shouldAdvanceTime: true });
  vi.stubEnv("VITE_META_PIXEL_ID", PIXEL);
  vi.stubEnv("VITE_LEAD_WEBHOOK_URL", HOOK);
  const fbq = vi.fn();
  (window as unknown as { fbq: unknown }).fbq = fbq;
  const fetchMock = vi.fn().mockResolvedValue(new Response(null));
  vi.stubGlobal("fetch", fetchMock);
  const { installOfferClickTracking } = await import("@/lib/tracking");
  const { LeadGateProvider } = await import("./LeadGate");
  const { CTA } = await import("./CTA");
  const uninstall = installOfferClickTracking();
  render(
    <LeadGateProvider>
      <CTA placement="hero" />
      <a href="https://www.gohighlevel.com/ai?fp_ref=x" data-offer="ai" data-placement="mid">blog link</a>
    </LeadGateProvider>,
  );
  return { fbq, fetchMock, uninstall };
}

const tracked = (fbq: ReturnType<typeof vi.fn>) => fbq.mock.calls.filter((c) => c[0] === "track").map((c) => c[1]);
const clickNotPrevented = (el: Element) => fireEvent.click(el); // fireEvent returns false if preventDefault was called

describe("affiliate click tracking + optional reminder", () => {
  afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("CTA click fires Lead with placement and does not block the link", async () => {
    const { fbq, uninstall } = await setup();
    const cta = screen.getByRole("link", { name: /claim my free trial/i });
    expect(clickNotPrevented(cta)).toBe(true);
    expect(tracked(fbq)).toEqual(["Lead"]);
    expect(fbq.mock.calls[0]?.[2]).toEqual({ content_name: "bootcamp", content_category: "hero" });
    expect(fbq.mock.calls[0]?.[3]).toHaveProperty("eventID"); // ready for Conversions API dedup
    expect(cta.getAttribute("href")).toContain("fp_ref=tayo17");
    uninstall();
  });

  it("blog/offer links fire Lead too (no popup)", async () => {
    const { fbq, uninstall } = await setup();
    expect(clickNotPrevented(screen.getByText("blog link"))).toBe(true);
    expect(fbq.mock.calls[0]?.slice(0, 3)).toEqual(["track", "Lead", { content_name: "ai", content_category: "mid" }]);
    await act(async () => { vi.advanceTimersByTime(600); });
    expect(screen.queryByRole("dialog")).toBeNull();
    uninstall();
  });

  it("reminder box appears after the CTA click; email adds CompleteRegistration + webhook", async () => {
    const { fbq, fetchMock, uninstall } = await setup();
    fireEvent.click(screen.getByRole("link", { name: /claim my free trial/i }));
    await act(async () => { vi.advanceTimersByTime(600); });
    fireEvent.change(await screen.findByLabelText(/^email/i), { target: { value: "Pixel.Test+qa@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /send me the reminder/i }));

    expect(tracked(fbq)).toEqual(["Lead", "CompleteRegistration"]);
    expect(fbq.mock.calls.find((c) => c[0] === "init")).toEqual(["init", PIXEL, { em: "pixel.test+qa@example.com" }]);
    const [url, opts] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(HOOK);
    expect(JSON.parse(String(opts.body))).toMatchObject({ email: "Pixel.Test+qa@example.com", offer: "bootcamp", placement: "hero" });
    expect(screen.getByRole("status").textContent).toMatch(/on the list/i);
    uninstall();
  });

  it("'No thanks' closes the box: only the Lead from the click is sent", async () => {
    const { fbq, fetchMock, uninstall } = await setup();
    fireEvent.click(screen.getByRole("link", { name: /claim my free trial/i }));
    await act(async () => { vi.advanceTimersByTime(600); });
    fireEvent.click(await screen.findByRole("button", { name: /no thanks/i }));
    expect(tracked(fbq)).toEqual(["Lead"]);
    expect(fetchMock).not.toHaveBeenCalled();
    uninstall();
  });
});
