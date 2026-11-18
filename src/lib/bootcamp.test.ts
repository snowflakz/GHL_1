import { describe, expect, it } from "vitest";
import { nextBootcamp } from "./bootcamp";

describe("nextBootcamp", () => {
  it("is 11am CT the same weekday when before 11am", () => {
    // Fri Nov 13 2026, 15:00 UTC = 9am CST
    expect(nextBootcamp(new Date("2026-11-13T15:00:00Z")).toISOString()).toBe("2026-11-13T17:00:00.000Z");
  });
  it("skips the weekend to Monday 11am CT", () => {
    // Fri Nov 13 2026, 18:00 UTC = noon CST
    expect(nextBootcamp(new Date("2026-11-13T18:00:00Z")).toISOString()).toBe("2026-11-16T17:00:00.000Z");
  });
});
