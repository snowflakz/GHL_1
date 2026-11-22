import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";

// OptIn links to /privacy with the router's <Link>; a plain anchor is enough for these tests.
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...rest }: { to: string; children: React.ReactNode }) => <a href={to} {...rest}>{children}</a>,
}));

const BOOTCAMP = "https://www.gohighlevel.com/highlevel-bootcamp?fp_ref=tayo17";
const dl = () => (window.dataLayer ?? []) as Record<string, unknown>[];

async function load(search = "") {
  vi.resetModules();
  window.history.replaceState({}, "", `/${search}`);
  const funnel = await import("@/lib/funnel");
  const bootcamp = await import("@/lib/bootcamp");
  const { OptInProvider } = await import("./OptIn");
  const { CTA } = await import("@/components/landing/CTA");
  return { funnel, bootcamp, OptInProvider, CTA };
}

const reset = () => { sessionStorage.clear(); localStorage.clear(); window.dataLayer = []; };

describe("attribution", () => {
  beforeEach(reset);

  it("stores gclid, gbraid, wbraid and every utm_* in sessionStorage (no cookie)", async () => {
    const { funnel } = await load("?gclid=TEST.GCLID_123&gbraid=GB1&wbraid=WB1&utm_source=google&utm_medium=cpc&utm_campaign=bootcamp&utm_term=highlevel+trial&utm_content=ad1");
    funnel.captureAttribution();
    expect(funnel.getAttribution()).toEqual({
      gclid: "TEST.GCLID_123", gbraid: "GB1", wbraid: "WB1",
      utm_source: "google", utm_medium: "cpc", utm_campaign: "bootcamp", utm_term: "highlevel trial", utm_content: "ad1",
    });
    expect(JSON.parse(sessionStorage.getItem("nc_attr") ?? "{}").gclid).toBe("TEST.GCLID_123");
    expect(document.cookie).not.toContain("nc_attr");
  });

  it("every affiliate URL is untouched: no appended parameters", async () => {
    const { bootcamp } = await load("?gclid=XYZ");
    expect(bootcamp.AFFILIATE_URL).toBe(BOOTCAMP);
    for (const o of Object.values(bootcamp.OFFERS)) expect(o.url).toMatch(/\?fp_ref=tayo17$/);
  });
});

describe("opt-in flow", () => {
  beforeEach(reset);
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  it("CTA opens the form, shows disclosure and consent, pushes generate_lead, then shows the exact affiliate link", async () => {
    const q = "?gclid=GCLID_ABC&utm_term=crm+software&utm_campaign=search1";
    const { OptInProvider, CTA } = await load(q);
    const assign = vi.fn();
    vi.stubGlobal("location", { ...window.location, assign, origin: "http://localhost", href: `http://localhost/${q}`, search: q, pathname: "/" });
    render(<OptInProvider><CTA placement="hero" /></OptInProvider>);

    // Fine print sits under the CTA.
    expect(screen.getByText(/30-day free trial from HighLevel\. Cancel anytime during the trial without being charged/)).toBeTruthy();
    // CTA is a button, and no affiliate URL is rendered yet.
    expect(document.querySelector(`a[href*="gohighlevel.com"]`)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /claim my free trial/i }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog.querySelector("form")?.getAttribute("method")).toBe("post");
    const hidden = dialog.querySelector('input[name="gclid"]') as HTMLInputElement;
    expect(hidden.type).toBe("hidden");
    expect(hidden.value).toBe("GCLID_ABC");
    expect(screen.getByTestId("optin-disclosure").textContent).toBe("I'm an independent HighLevel affiliate and may earn a commission if you sign up, at no extra cost to you.");
    expect(dialog.textContent).toContain("By continuing you agree to receive bootcamp details by email. Unsubscribe anytime.");
    expect(dialog.querySelector('a[href="/privacy"]')).not.toBeNull();
    expect(dialog.querySelector('input[type="checkbox"]')).toBeNull();

    // Invalid email is blocked.
    const submit = screen.getByRole("button", { name: /continue to my free 30-day trial/i });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "nope" } });
    fireEvent.click(submit);
    expect(screen.getByRole("alert").textContent).toMatch(/valid email/i);
    expect(dl().some((e) => e["event"] === "generate_lead")).toBe(false);

    // Valid submit.
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "ada@example.com" } });
    fireEvent.click(submit);

    await screen.findByText(/you're in! step 2: start your free 30-day trial/i);
    expect(dl().find((e) => e["event"] === "generate_lead")).toEqual({
      event: "generate_lead", lead_source: "nuvoracore_optin", user_data: { email: "ada@example.com", first_name: "Ada" },
      gclid: "GCLID_ABC", utm_term: "crm software", utm_campaign: "search1",
    });

    // The webhook is still a placeholder, so the lead is kept in the retry queue (never in a URL).
    await waitFor(() => expect(JSON.parse(localStorage.getItem("nc_lead_queue") ?? "[]")).toHaveLength(1));
    const lead = JSON.parse(localStorage.getItem("nc_lead_queue") ?? "[]")[0].lead;
    expect(lead).toMatchObject({ email: "ada@example.com", first_name: "Ada", gclid: "GCLID_ABC", utm_term: "crm software", utm_campaign: "search1", page_url: "http://localhost/" });
    expect(lead.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);

    // Step 2: ONE affiliate link, exactly as issued, same tab.
    const links = document.querySelectorAll(`a[href*="gohighlevel.com"]`);
    expect(links).toHaveLength(1);
    const trial = links[0] as HTMLAnchorElement;
    expect(trial.getAttribute("href")).toBe(BOOTCAMP);
    expect(trial.getAttribute("target")).toBeNull();

    // Click pushes affiliate_click with an eventCallback, then navigates to the unmodified URL.
    fireEvent.click(trial);
    const ac = dl().filter((e) => e["event"] === "affiliate_click");
    expect(ac).toHaveLength(1);
    expect(ac[0]).toMatchObject({ event: "affiliate_click", destination: "highlevel", utm_term: "crm software", eventTimeout: 1500 });
    (ac[0]?.["eventCallback"] as () => void)();
    await waitFor(() => expect(assign).toHaveBeenCalledWith(BOOTCAMP));

    // No PII anywhere in the dataLayer's URL-like values.
    expect(window.location.search).not.toContain("ada");
  });

  it("any other affiliate link on the page pushes affiliate_click", async () => {
    const { OptInProvider } = await load("?utm_term=funnel+builder");
    render(<OptInProvider><a href="https://www.gohighlevel.com/970?fp_ref=tayo17" data-placement="blog" onClick={(e) => e.preventDefault()}>plan</a></OptInProvider>);
    fireEvent.click(screen.getByText("plan"));
    expect(dl().find((e) => e["event"] === "affiliate_click")).toMatchObject({ destination: "highlevel", utm_term: "funnel builder", placement: "blog" });
  });
});

describe("nextBootcamp (weekdays 11:00 America/Chicago)", () => {
  it("before 11:00 CT on a weekday: same day", async () => {
    const { bootcamp } = await load();
    // Wed 25 Nov 2026, 09:00 CST (UTC-6) = 15:00Z
    expect(bootcamp.nextBootcamp(new Date("2026-11-25T15:00:00Z")).toISOString()).toBe("2026-11-25T17:00:00.000Z");
  });
  it("after 11:00 CT: next weekday", async () => {
    const { bootcamp } = await load();
    expect(bootcamp.nextBootcamp(new Date("2026-11-25T17:00:01Z")).toISOString()).toBe("2026-11-26T17:00:00.000Z");
  });
  it("Friday after the session skips the weekend to Monday", async () => {
    const { bootcamp } = await load();
    expect(bootcamp.nextBootcamp(new Date("2026-11-27T18:00:00Z")).toISOString()).toBe("2026-11-30T17:00:00.000Z");
  });
  it("Saturday and Sunday go to Monday", async () => {
    const { bootcamp } = await load();
    expect(bootcamp.nextBootcamp(new Date("2026-11-28T12:00:00Z")).toISOString()).toBe("2026-11-30T17:00:00.000Z");
    expect(bootcamp.nextBootcamp(new Date("2026-11-29T23:00:00Z")).toISOString()).toBe("2026-11-30T17:00:00.000Z");
  });
  it("uses daylight time in summer (CDT, UTC-5)", async () => {
    const { bootcamp } = await load();
    expect(bootcamp.nextBootcamp(new Date("2026-07-15T12:00:00Z")).toISOString()).toBe("2026-07-15T16:00:00.000Z");
  });
  it("handles the weekend DST switch (Fri before → Mon after)", async () => {
    const { bootcamp } = await load();
    // DST ends Sun 1 Nov 2026: Friday 30 Oct after session is CDT, Monday 2 Nov 11:00 is CST (17:00Z)
    expect(bootcamp.nextBootcamp(new Date("2026-10-30T17:00:00Z")).toISOString()).toBe("2026-11-02T17:00:00.000Z");
  });
  it("is deterministic: the same instant always gives the same session (no reset on reload)", async () => {
    const { bootcamp } = await load();
    const t = new Date("2026-11-25T10:00:00Z");
    expect(bootcamp.nextBootcamp(t).getTime()).toBe(bootcamp.nextBootcamp(new Date(t)).getTime());
  });
});
