import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const load = (name: string) =>
  JSON.parse(readFileSync(join(__dirname, "..", "sample-data", name), "utf-8"));

describe("sample data", () => {
  it("sensors.json has plausible values", () => {
    const rows = load("sensors.json");
    expect(Array.isArray(rows) && rows.length > 0).toBe(true);
    for (const r of rows) {
      expect(typeof r.fieldId).toBe("string");
      expect(Number.isNaN(Date.parse(r.timestamp))).toBe(false);
      expect(r.soilMoisturePct).toBeGreaterThanOrEqual(0);
      expect(r.soilMoisturePct).toBeLessThanOrEqual(100);
      expect(r.temperatureC).toBeGreaterThan(-10);
      expect(r.temperatureC).toBeLessThan(60);
      expect(r.rainfallMm).toBeGreaterThanOrEqual(0);
      expect(r.simulated).toBe(true);
    }
  });

  it("alerts.json has required fields and a known type", () => {
    const rows = load("alerts.json");
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) {
      expect(["pest", "disease", "flood", "drought"]).toContain(r.type);
      expect(r.description.length).toBeGreaterThan(0);
      expect(Number.isInteger(r.confirmations)).toBe(true);
      expect(Number.isNaN(Date.parse(r.createdAt))).toBe(false);
    }
  });

  it("schemes.json is trilingual and links to official https sites", () => {
    const rows = load("schemes.json");
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) {
      for (const lang of ["en", "hi", "or"]) {
        expect(r.summary[lang]?.length).toBeGreaterThan(0);
      }
      expect(r.officialUrl.startsWith("https://")).toBe(true);
    }
  });

  it("voice_queries.json covers en, hi and or", () => {
    const rows = load("voice_queries.json");
    const langs = new Set(rows.map((r: { lang: string }) => r.lang));
    expect(langs).toEqual(new Set(["en", "hi", "or"]));
    for (const r of rows) expect(r.text.trim().length).toBeGreaterThan(0);
  });
});
