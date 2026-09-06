import { describe, expect, it } from "vitest";

import { formatDurationSec, formatKm } from "@/shared/lib/format";
import type { Satellite } from "@/shared/types/domain";

describe("domain display helpers", () => {
  it("formats altitude with explicit km unit", () => {
    const satellite: Satellite = {
      id: "DEMO-EOS-01",
      catalogId: "SAT-041",
      name: "DEMO-EOS-01",
      satelliteType: "EARTH_OBSERVATION",
      orbitRegime: "LEO",
      operationalStatus: "ACTIVE",
      inclinationDeg: 97.6,
      altitudeKm: 548,
      velocityKmS: 7.6,
      batteryPct: 82,
      storageUsedGb: 82,
      storageCapacityGb: 128,
      payload: "Optical",
      latitudeDeg: 12.4,
      longitudeDeg: 55.2,
      nextContactStationId: "gs-toulouse",
      nextContactAosUtc: "2026-09-05T14:42:18Z",
      nextMissionId: null,
    };
    expect(formatKm(satellite.altitudeKm)).toBe("548.0 km");
  });

  it("formats pass duration", () => {
    expect(formatDurationSec(453)).toBe("7m33s");
  });
});
