import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";

// OptIn links to /privacy with the router's <Link>; a plain anchor is enough for these tests.
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...rest }: { to: string; children: React.ReactNode }) => <a href={to} {...rest}>{children}</a>,
}));

const BOOTCAMP = "https://www.gohighlevel.com/highlevel-bootcamp?fp_ref=tayo17";
const clearCookies = () => document.cookie.split(";").forEach((c) => (document.cookie = `${c.split("=")[0]?.trim()}=; Max-Age=0; Path=/`));
const dl = () => (window.dataLayer ?? []) as Record<string, unknown>[];

async function load(search = "") {
  vi.resetModules();
  window.history.replaceState({}, "", `/${search}`);
  const funnel = await import("@/lib/funnel");
  const { OptInProvider } = await import("./OptIn");
  const { CTA } = await import("@/components/landing/CTA");
  return { funnel, OptInProvider, CTA };
}

describe("attribution + sub-ID", () => {
  beforeEach(() => { clearCookies(); localStorage.clear(); window.dataLayer = []; });

  it("no gclid: affiliate link is exactly the original URL", async () => {
    const { funnel } = await load();
    expect(funnel.affiliateUrlWithSubId()).toBe(BOOTCAMP);
  });

  it("stores gclid, gbraid, wbraid and utm_* in a first-party cookie and appends gclid as the sub-ID", async () => {
    const { funnel } = await load("?gclid=TEST.GCLID_123&gbraid=GB1&wbraid=WB1&utm_source=google&utm_campaign=bootcamp");
    funnel.captureAttribution();
    const a = funnel.getAttribution();
    expect(a).toMatchObject({ gclid: "TEST.GCLID_123", gbraid: "GB1", wbraid: "WB1", utm_source: "google", utm_campaign: "bootcamp" });
    expect(document.cookie).toContain("nc_attr=");
    expect(funnel.affiliateUrlWithSubId()).toBe(`${BOOTCAMP}&SUBID_PARAM=TEST.GCLID_123`);
  });
});

describe("opt-in flow", () => {
  beforeEach(() => { clearCookies(); localStorage.clear(); window.dataLayer = []; });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  it("CTA opens the form (no affiliate link on the page), validates email, pushes optin_submit, then shows the only affiliate link", async () => {
    const { OptInProvider, CTA } = await load("?gclid=GCLID_ABC");
    const assign = vi.fn();
    vi.stubGlobal("location", { ...window.location, assign, href: "http://localhost/?gclid=GCLID_ABC", search: "?gclid=GCLID_ABC", pathname: "/" });
    render(<OptInProvider><CTA placement="hero" /></OptInProvider>);

    // CTA is a button, not a link, and the affiliate URL isn't rendered anywhere yet.
    expect(document.querySelector(`a[href*="highlevel-bootcamp"]`)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /claim my free trial/i }));

    // Hidden gclid field carries the stored click ID.
    const hidden = (await screen.findByRole("dialog")).querySelector('input[name="gclid"]') as HTMLInputElement;
    expect(hidden.type).toBe("hidden");
    expect(hidden.value).toBe("GCLID_ABC");

    // Invalid email is blocked.
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "nope" } });
    fireEvent.click(screen.getByRole("button", { name: /get my free 30-day trial \+ bonuses/i }));
    expect(screen.getByRole("alert").textContent).toMatch(/valid email/i);
    expect(dl().some((e) => e["event"] === "optin_submit")).toBe(false);

    // Valid submit.
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "ada@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /get my free 30-day trial \+ bonuses/i }));

    await screen.findByText(/you're in! step 2: start your free 30-day trial/i);
    const optin = dl().find((e) => e["event"] === "optin_submit");
    expect(optin).toMatchObject({ event: "optin_submit", placement: "hero", lead_delivery: "queued", user_data: { email: "ada@example.com", first_name: "Ada" } });

    // FORM_ENDPOINT_URL is still a placeholder, so the lead must be kept in the retry queue, not lost.
    const queue = JSON.parse(localStorage.getItem("nc_lead_queue") ?? "[]");
    expect(queue).toHaveLength(1);
    expect(queue[0].lead).toMatchObject({ email: "ada@example.com", first_name: "Ada", gclid: "GCLID_ABC" });

    // Thank-you step: ONE affiliate link, with the sub-ID, same tab.
    const links = document.querySelectorAll(`a[href*="highlevel-bootcamp"]`);
    expect(links).toHaveLength(1);
    const trial = links[0] as HTMLAnchorElement;
    expect(trial.getAttribute("href")).toBe(`${BOOTCAMP}&SUBID_PARAM=GCLID_ABC`);
    expect(trial.getAttribute("target")).toBeNull();

    // Clicking it pushes trial_click (with an eventCallback so GTM can send before navigating), then navigates.
    fireEvent.click(trial);
    const tc = dl().find((e) => e["event"] === "trial_click");
    expect(tc).toMatchObject({ event: "trial_click", eventTimeout: 1500 });
    expect(typeof tc?.["eventCallback"]).toBe("function");
    (tc?.["eventCallback"] as () => void)();
    await waitFor(() => expect(assign).toHaveBeenCalledWith(`${BOOTCAMP}&SUBID_PARAM=GCLID_ABC`));
  });
});
