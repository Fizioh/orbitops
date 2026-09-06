import { describe, expect, it } from "vitest";

import { conjunctions, kpis, missions, satellites } from "@/mocks/demoData";

describe("demo dataset", () => {
  it("seeds recruiter demo scale", () => {
    expect(satellites).toHaveLength(24);
    expect(kpis.groundStationsOnline).toBe(6);
    expect(kpis.scheduleConflicts).toBe(3);
    expect(kpis.highRiskConjunctions).toBe(1);
  });

  it("includes TASK-2917 Dubai scenario", () => {
    const mission = missions.find((m) => m.id === "TASK-2917");
    expect(mission?.targetName).toBe("Dubai");
    expect(mission?.candidates).toHaveLength(5);
    expect(mission?.recommendedSatelliteId).toBe("DEMO-EOS-17");
    expect(mission?.candidates[0]?.score).toBe(94);
  });

  it("includes CONJ-00418 high-risk event", () => {
    const event = conjunctions.find((c) => c.id === "CONJ-00418");
    expect(event?.riskLevel).toBe("HIGH");
    expect(event?.missDistanceM).toBe(184);
    expect(event?.simulatedMissDistanceM).toBe(2800);
  });
});
