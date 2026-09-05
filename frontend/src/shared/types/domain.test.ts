import { describe, expect, it } from "vitest";

import type { Satellite } from "@/shared/types/domain";

function formatAltitudeKm(altitudeKm: number): string {
  return `${altitudeKm.toFixed(1)} km`;
}

describe("domain display helpers", () => {
  it("formats altitude with explicit km unit", () => {
    const satellite: Satellite = {
      id: "DEMO-EOS-01",
      catalogId: "SAT-042",
      name: "DEMO-EOS-01",
      satelliteType: "EARTH_OBSERVATION",
      orbitRegime: "LEO",
      operationalStatus: "ACTIVE",
      inclinationDeg: 97.6,
      altitudeKm: 548,
      payload: "Optical",
    };
    expect(formatAltitudeKm(satellite.altitudeKm)).toBe("548.0 km");
  });
});
