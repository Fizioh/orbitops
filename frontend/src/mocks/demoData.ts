import type {
  ConjunctionEvent,
  GroundStation,
  Mission,
  OpsAlert,
  OpsEvent,
  OpsKpis,
  PassWindow,
  PowerForecastPoint,
  Satellite,
  ScheduleBlock,
  ScheduleConflict,
  TelemetrySnapshot,
} from "@/shared/types/domain";

const DEMO_DAY = "2026-09-05";

function satId(n: number): string {
  return `DEMO-EOS-${String(n).padStart(2, "0")}`;
}

function catalogId(n: number): string {
  return `SAT-${String(40 + n).padStart(3, "0")}`;
}

export const groundStations: GroundStation[] = [
  {
    id: "gs-toulouse",
    name: "Toulouse",
    latitudeDeg: 43.6045,
    longitudeDeg: 1.444,
    altitudeM: 150,
    status: "OPERATIONAL",
    antennas: 2,
    bands: ["S-band", "X-band"],
  },
  {
    id: "gs-madrid",
    name: "Madrid",
    latitudeDeg: 40.4168,
    longitudeDeg: -3.7038,
    altitudeM: 650,
    status: "OPERATIONAL",
    antennas: 2,
    bands: ["S-band", "X-band"],
  },
  {
    id: "gs-svalbard",
    name: "Svalbard",
    latitudeDeg: 78.2307,
    longitudeDeg: 15.4078,
    altitudeM: 480,
    status: "OPERATIONAL",
    antennas: 3,
    bands: ["S-band", "X-band", "Ka-band"],
  },
  {
    id: "gs-perth",
    name: "Perth",
    latitudeDeg: -31.9505,
    longitudeDeg: 115.8605,
    altitudeM: 20,
    status: "OPERATIONAL",
    antennas: 2,
    bands: ["S-band", "X-band"],
  },
  {
    id: "gs-fairbanks",
    name: "Fairbanks",
    latitudeDeg: 64.8378,
    longitudeDeg: -147.7164,
    altitudeM: 140,
    status: "OPERATIONAL",
    antennas: 2,
    bands: ["S-band", "X-band"],
  },
  {
    id: "gs-singapore",
    name: "Singapore",
    latitudeDeg: 1.3521,
    longitudeDeg: 103.8198,
    altitudeM: 15,
    status: "MAINTENANCE",
    antennas: 1,
    bands: ["S-band"],
  },
  {
    id: "gs-santiago",
    name: "Santiago",
    latitudeDeg: -33.4489,
    longitudeDeg: -70.6693,
    altitudeM: 570,
    status: "OPERATIONAL",
    antennas: 2,
    bands: ["S-band", "X-band"],
  },
];

const stationCycle = groundStations.map((g) => g.id);

export const satellites: Satellite[] = Array.from({ length: 24 }, (_, i) => {
  const n = i + 1;
  const active = n !== 22;
  const degraded = n === 8 || n === 15;
  return {
    id: satId(n),
    catalogId: catalogId(n),
    name: satId(n),
    satelliteType: "EARTH_OBSERVATION",
    orbitRegime: "LEO",
    operationalStatus: !active
      ? "MAINTENANCE"
      : degraded
        ? "DEGRADED"
        : "ACTIVE",
    inclinationDeg: 97.2 + (n % 5) * 0.1,
    altitudeKm: 530 + (n % 7) * 4,
    velocityKmS: 7.58 + (n % 3) * 0.01,
    batteryPct: 55 + ((n * 7) % 40),
    storageUsedGb: 40 + ((n * 11) % 70),
    storageCapacityGb: 128,
    payload: n % 3 === 0 ? "SAR" : "Optical",
    latitudeDeg: ((n * 17) % 140) - 70,
    longitudeDeg: ((n * 29) % 360) - 180,
    nextContactStationId: stationCycle[n % stationCycle.length] ?? null,
    nextContactAosUtc: `${DEMO_DAY}T${String(12 + (n % 8)).padStart(2, "0")}:${String((n * 3) % 60).padStart(2, "0")}:00Z`,
    nextMissionId: n === 17 ? "TASK-2917" : n % 5 === 0 ? `TASK-${2900 + n}` : null,
  };
});

export const passes: PassWindow[] = [
  {
    id: "pass-042-tls",
    satelliteId: "DEMO-EOS-03",
    groundStationId: "gs-toulouse",
    aosUtc: `${DEMO_DAY}T14:42:18Z`,
    losUtc: `${DEMO_DAY}T14:49:51Z`,
    maxElevationDeg: 71.2,
    durationSec: 453,
  },
  {
    id: "pass-017-tls",
    satelliteId: "DEMO-EOS-17",
    groundStationId: "gs-toulouse",
    aosUtc: `${DEMO_DAY}T11:38:00Z`,
    losUtc: `${DEMO_DAY}T11:46:20Z`,
    maxElevationDeg: 64.1,
    durationSec: 500,
  },
  {
    id: "pass-041-tls",
    satelliteId: "DEMO-EOS-02",
    groundStationId: "gs-toulouse",
    aosUtc: `${DEMO_DAY}T13:14:00Z`,
    losUtc: `${DEMO_DAY}T13:22:00Z`,
    maxElevationDeg: 48.5,
    durationSec: 480,
  },
  {
    id: "pass-018-tls",
    satelliteId: "DEMO-EOS-04",
    groundStationId: "gs-toulouse",
    aosUtc: `${DEMO_DAY}T13:17:00Z`,
    losUtc: `${DEMO_DAY}T13:29:00Z`,
    maxElevationDeg: 52.0,
    durationSec: 720,
  },
];

export const missions: Mission[] = [
  {
    id: "TASK-2917",
    targetName: "Dubai",
    targetLatDeg: 25.2048,
    targetLonDeg: 55.2708,
    missionType: "Optical imaging",
    windowStartUtc: `${DEMO_DAY}T10:00:00Z`,
    windowEndUtc: `${DEMO_DAY}T14:00:00Z`,
    requiredResolutionM: 1.0,
    maxCloudCoverPct: 20,
    status: "EVALUATED",
    priority: 1,
    recommendedSatelliteId: "DEMO-EOS-17",
    candidates: [
      {
        satelliteId: "DEMO-EOS-17",
        opportunityUtc: `${DEMO_DAY}T11:42:00Z`,
        offNadirDeg: 13.7,
        expectedResolutionM: 0.72,
        batteryAfterPct: 68,
        score: 94,
        feasibility: "FEASIBLE",
        reasons: ["Power margin OK", "Off-nadir within limits", "Slot available after downlink shift"],
      },
      {
        satelliteId: "DEMO-EOS-11",
        opportunityUtc: `${DEMO_DAY}T12:05:00Z`,
        offNadirDeg: 21.4,
        expectedResolutionM: 0.91,
        batteryAfterPct: 61,
        score: 81,
        feasibility: "FEASIBLE",
        reasons: ["Higher off-nadir", "Good power margin"],
      },
      {
        satelliteId: "DEMO-EOS-05",
        opportunityUtc: `${DEMO_DAY}T11:18:00Z`,
        offNadirDeg: 18.2,
        expectedResolutionM: 0.85,
        batteryAfterPct: 54,
        score: 76,
        feasibility: "CONDITIONALLY_FEASIBLE",
        reasons: ["Conflicts with existing downlink", "Requires station handoff"],
      },
      {
        satelliteId: "DEMO-EOS-09",
        opportunityUtc: `${DEMO_DAY}T13:10:00Z`,
        offNadirDeg: 28.9,
        expectedResolutionM: 1.15,
        batteryAfterPct: 49,
        score: 58,
        feasibility: "CONDITIONALLY_FEASIBLE",
        reasons: ["Resolution near threshold", "Late in window"],
      },
      {
        satelliteId: "DEMO-EOS-08",
        opportunityUtc: `${DEMO_DAY}T10:40:00Z`,
        offNadirDeg: 12.1,
        expectedResolutionM: 0.68,
        batteryAfterPct: 17,
        score: 22,
        feasibility: "NOT_FEASIBLE",
        reasons: ["Insufficient power margin", "Predicted battery 17% < 22%"],
      },
    ],
  },
  {
    id: "TASK-2901",
    targetName: "Singapore Strait",
    targetLatDeg: 1.26,
    targetLonDeg: 103.85,
    missionType: "Optical imaging",
    windowStartUtc: `${DEMO_DAY}T08:00:00Z`,
    windowEndUtc: `${DEMO_DAY}T12:00:00Z`,
    requiredResolutionM: 1.5,
    maxCloudCoverPct: 30,
    status: "SCHEDULED",
    priority: 2,
    recommendedSatelliteId: "DEMO-EOS-05",
    candidates: [],
  },
  {
    id: "TASK-2888",
    targetName: "Rotterdam Port",
    targetLatDeg: 51.95,
    targetLonDeg: 4.14,
    missionType: "SAR imaging",
    windowStartUtc: `${DEMO_DAY}T15:00:00Z`,
    windowEndUtc: `${DEMO_DAY}T19:00:00Z`,
    requiredResolutionM: 3.0,
    maxCloudCoverPct: 100,
    status: "REQUESTED",
    priority: 3,
    recommendedSatelliteId: null,
    candidates: [],
  },
];

export const scheduleBlocks: ScheduleBlock[] = [
  {
    id: "blk-img-042",
    resourceId: "DEMO-EOS-03",
    resourceKind: "satellite",
    kind: "observation",
    startUtc: `${DEMO_DAY}T13:14:00Z`,
    endUtc: `${DEMO_DAY}T13:22:00Z`,
    label: "Imaging TASK-2910",
    conflictIds: ["conflict-1"],
  },
  {
    id: "blk-dl-042",
    resourceId: "DEMO-EOS-03",
    resourceKind: "satellite",
    kind: "downlink",
    startUtc: `${DEMO_DAY}T13:18:00Z`,
    endUtc: `${DEMO_DAY}T13:28:00Z`,
    label: "Downlink Toulouse",
    conflictIds: ["conflict-1"],
  },
  {
    id: "blk-dl-018",
    resourceId: "DEMO-EOS-04",
    resourceKind: "satellite",
    kind: "downlink",
    startUtc: `${DEMO_DAY}T13:17:00Z`,
    endUtc: `${DEMO_DAY}T13:29:00Z`,
    label: "Downlink Toulouse",
    conflictIds: ["conflict-2"],
  },
  {
    id: "blk-gs-tls-a",
    resourceId: "gs-toulouse",
    resourceKind: "ground_station",
    kind: "downlink",
    startUtc: `${DEMO_DAY}T13:14:00Z`,
    endUtc: `${DEMO_DAY}T13:22:00Z`,
    label: "SAT-042 contact",
    conflictIds: ["conflict-2"],
  },
  {
    id: "blk-gs-tls-b",
    resourceId: "gs-toulouse",
    resourceKind: "ground_station",
    kind: "downlink",
    startUtc: `${DEMO_DAY}T13:17:00Z`,
    endUtc: `${DEMO_DAY}T13:29:00Z`,
    label: "SAT-018 contact",
    conflictIds: ["conflict-2"],
  },
  {
    id: "blk-img-017",
    resourceId: "DEMO-EOS-17",
    resourceKind: "satellite",
    kind: "observation",
    startUtc: `${DEMO_DAY}T11:42:00Z`,
    endUtc: `${DEMO_DAY}T11:48:00Z`,
    label: "Imaging TASK-2917",
    conflictIds: ["conflict-3"],
  },
  {
    id: "blk-dl-017",
    resourceId: "DEMO-EOS-17",
    resourceKind: "satellite",
    kind: "downlink",
    startUtc: `${DEMO_DAY}T11:45:00Z`,
    endUtc: `${DEMO_DAY}T11:55:00Z`,
    label: "Downlink Toulouse",
    conflictIds: ["conflict-3"],
  },
  {
    id: "blk-maint-08",
    resourceId: "DEMO-EOS-08",
    resourceKind: "satellite",
    kind: "maintenance",
    startUtc: `${DEMO_DAY}T09:00:00Z`,
    endUtc: `${DEMO_DAY}T10:30:00Z`,
    label: "Payload safe mode",
    conflictIds: [],
  },
  {
    id: "blk-gs-mad",
    resourceId: "gs-madrid",
    resourceKind: "ground_station",
    kind: "downlink",
    startUtc: `${DEMO_DAY}T12:00:00Z`,
    endUtc: `${DEMO_DAY}T12:10:00Z`,
    label: "SAT-011 contact",
    conflictIds: [],
  },
];

export const scheduleConflicts: ScheduleConflict[] = [
  {
    id: "conflict-1",
    title: "Double booking on DEMO-EOS-03",
    resourceId: "DEMO-EOS-03",
    blockIds: ["blk-img-042", "blk-dl-042"],
    suggestion: "Shift downlink to Madrid Ground Station (13:20–13:30 UTC).",
  },
  {
    id: "conflict-2",
    title: "Antenna conflict at Toulouse",
    resourceId: "gs-toulouse",
    blockIds: ["blk-gs-tls-a", "blk-gs-tls-b"],
    suggestion: "Move SAT-018 contact to Svalbard (13:18–13:30 UTC).",
  },
  {
    id: "conflict-3",
    title: "TASK-2917 overlaps downlink",
    resourceId: "DEMO-EOS-17",
    blockIds: ["blk-img-017", "blk-dl-017"],
    suggestion: "Shift downlink to Madrid Ground Station after imaging.",
  },
];

export const conjunctions: ConjunctionEvent[] = [
  {
    id: "CONJ-00418",
    primaryObjectId: "DEMO-EOS-03",
    secondaryObjectId: "OBJECT-58493",
    tcaUtc: "2026-09-08T04:21:00Z",
    missDistanceM: 184,
    relativeVelocityKmS: 12.4,
    riskLevel: "HIGH",
    workflowState: "ANALYSIS",
    simulatedMissDistanceM: 2800,
  },
  {
    id: "CONJ-00401",
    primaryObjectId: "DEMO-EOS-12",
    secondaryObjectId: "OBJECT-22110",
    tcaUtc: "2026-09-07T18:05:00Z",
    missDistanceM: 920,
    relativeVelocityKmS: 9.1,
    riskLevel: "MEDIUM",
    workflowState: "MONITORING",
    simulatedMissDistanceM: null,
  },
  {
    id: "CONJ-00388",
    primaryObjectId: "DEMO-EOS-19",
    secondaryObjectId: "OBJECT-90112",
    tcaUtc: "2026-09-06T22:40:00Z",
    missDistanceM: 2400,
    relativeVelocityKmS: 7.8,
    riskLevel: "LOW",
    workflowState: "RESOLVED",
    simulatedMissDistanceM: null,
  },
];

export const alerts: OpsAlert[] = [
  {
    id: "alert-conj-1",
    kind: "conjunction_warning",
    severity: "HIGH",
    title: "High-risk conjunction CONJ-00418",
    detail: "Miss distance 184 m · TCA 08 Sep 2026 04:21 UTC",
    relatedId: "CONJ-00418",
    createdAtUtc: `${DEMO_DAY}T14:22:00Z`,
  },
  {
    id: "alert-conflict-1",
    kind: "schedule_conflict",
    severity: "MEDIUM",
    title: "3 schedule conflicts require resolution",
    detail: "Includes TASK-2917 imaging vs downlink overlap",
    relatedId: "conflict-3",
    createdAtUtc: `${DEMO_DAY}T13:05:00Z`,
  },
  {
    id: "alert-power-1",
    kind: "power_threshold",
    severity: "HIGH",
    title: "DEMO-EOS-08 battery forecast below 22%",
    detail: "Predicted SoC 17% after proposed imaging",
    relatedId: "DEMO-EOS-08",
    createdAtUtc: `${DEMO_DAY}T12:48:00Z`,
  },
  {
    id: "alert-power-2",
    kind: "power_threshold",
    severity: "MEDIUM",
    title: "DEMO-EOS-15 unexpected drain",
    detail: "Idle draw +18% vs baseline last 40 min",
    relatedId: "DEMO-EOS-15",
    createdAtUtc: `${DEMO_DAY}T12:10:00Z`,
  },
  {
    id: "alert-tm-1",
    kind: "telemetry_anomaly",
    severity: "MEDIUM",
    title: "Payload temperature high on DEMO-EOS-08",
    detail: "42.6 °C · threshold 40 °C",
    relatedId: "DEMO-EOS-08",
    createdAtUtc: `${DEMO_DAY}T11:55:00Z`,
  },
  {
    id: "alert-gs-1",
    kind: "ground_station_unavailable",
    severity: "LOW",
    title: "Singapore ground station in maintenance",
    detail: "Estimated return 06 Sep 18:00 UTC",
    relatedId: "gs-singapore",
    createdAtUtc: `${DEMO_DAY}T08:00:00Z`,
  },
];

export const opsEvents: OpsEvent[] = [
  { id: "ev-1", atUtc: `${DEMO_DAY}T14:22:00Z`, message: "High-risk conjunction detected CONJ-00418" },
  { id: "ev-2", atUtc: `${DEMO_DAY}T14:14:00Z`, message: "Storage utilization DEMO-EOS-03 at 87%" },
  { id: "ev-3", atUtc: `${DEMO_DAY}T14:12:00Z`, message: "Imaging task TASK-2910 executed" },
  { id: "ev-4", atUtc: `${DEMO_DAY}T14:08:00Z`, message: "Contact DEMO-EOS-03 completed" },
  { id: "ev-5", atUtc: `${DEMO_DAY}T14:01:00Z`, message: "Contact DEMO-EOS-03 started (Toulouse)" },
  { id: "ev-6", atUtc: `${DEMO_DAY}T13:17:00Z`, message: "Schedule conflict detected at Toulouse" },
  { id: "ev-7", atUtc: `${DEMO_DAY}T11:42:00Z`, message: "TASK-2917 candidate scoring completed" },
];

export const kpis: OpsKpis = {
  activeSatellites: satellites.filter((s) => s.operationalStatus === "ACTIVE").length,
  groundStationsOnline: groundStations.filter((g) => g.status === "OPERATIONAL").length,
  contactsToday: 42,
  imagingTasks: 18,
  scheduleConflicts: scheduleConflicts.length,
  powerAlerts: alerts.filter((a) => a.kind === "power_threshold").length,
  highRiskConjunctions: conjunctions.filter((c) => c.riskLevel === "HIGH").length,
  telemetryAnomalies: alerts.filter((a) => a.kind === "telemetry_anomaly").length,
};

export function getSatellite(id: string): Satellite | undefined {
  return satellites.find((s) => s.id === id || s.catalogId === id);
}

export function getMission(id: string): Mission | undefined {
  return missions.find((m) => m.id === id);
}

export function getConjunction(id: string): ConjunctionEvent | undefined {
  return conjunctions.find((c) => c.id === id);
}

export function getGroundStation(id: string): GroundStation | undefined {
  return groundStations.find((g) => g.id === id);
}

export function passesForSatellite(satelliteId: string): PassWindow[] {
  return passes.filter((p) => p.satelliteId === satelliteId);
}

export function telemetryForSatellite(satelliteId: string): TelemetrySnapshot[] {
  const base = getSatellite(satelliteId);
  if (!base) return [];
  return Array.from({ length: 24 }, (_, i) => {
    const hour = String(i).padStart(2, "0");
    const drift = Math.sin(i / 3) * 4;
    return {
      satelliteId,
      capturedAtUtc: `${DEMO_DAY}T${hour}:00:00Z`,
      batteryPct: Math.min(100, Math.max(10, base.batteryPct + drift - i * 0.4)),
      temperatureC: 18 + Math.sin(i / 2) * 6 + (satelliteId === "DEMO-EOS-08" ? 12 : 0),
      storageUsedGb: Math.min(base.storageCapacityGb, base.storageUsedGb + i * 0.8),
      storageCapacityGb: base.storageCapacityGb,
      signalQuality: 0.7 + Math.sin(i) * 0.2,
      attitudeErrorDeg: 0.05 + Math.abs(Math.sin(i / 4)) * 0.2,
    };
  });
}

export function powerForecastForSatellite(satelliteId: string): PowerForecastPoint[] {
  const base = getSatellite(satelliteId);
  if (!base) return [];
  let soc = base.batteryPct;
  return Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const inSunlight = hour % 6 < 4;
    if (inSunlight) soc = Math.min(100, soc + 1.8);
    else soc = Math.max(5, soc - 1.2);
    let eventLabel: string | null = null;
    if (satelliteId === "DEMO-EOS-17" && hour === 11 && minute === "30") {
      soc = Math.max(5, soc - 8);
      eventLabel = "Imaging TASK-2917";
    }
    if (satelliteId === "DEMO-EOS-17" && hour === 12 && minute === "00") {
      soc = Math.max(5, soc - 4);
      eventLabel = "Downlink Madrid";
    }
    return {
      atUtc: `${DEMO_DAY}T${String(hour).padStart(2, "0")}:${minute}:00Z`,
      batteryPct: Number(soc.toFixed(1)),
      inSunlight,
      eventLabel,
    };
  });
}
