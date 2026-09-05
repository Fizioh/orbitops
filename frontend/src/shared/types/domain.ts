export type OperationalStatus =
  | "ACTIVE"
  | "DEGRADED"
  | "MAINTENANCE"
  | "RETIRED";

export type OrbitRegime = "LEO" | "MEO" | "GEO" | "HEO";

export interface Satellite {
  id: string;
  catalogId: string;
  name: string;
  satelliteType: string;
  orbitRegime: OrbitRegime;
  operationalStatus: OperationalStatus;
  inclinationDeg: number;
  altitudeKm: number;
  payload: string;
}

export interface GroundStation {
  id: string;
  name: string;
  latitudeDeg: number;
  longitudeDeg: number;
  altitudeM: number;
  status: "OPERATIONAL" | "MAINTENANCE" | "OFFLINE";
}

export interface PassWindow {
  satelliteId: string;
  groundStationId: string;
  aosUtc: string;
  losUtc: string;
  maxElevationDeg: number;
  durationSec: number;
}

export interface Mission {
  id: string;
  targetName: string;
  missionType: string;
  windowStartUtc: string;
  windowEndUtc: string;
  status: string;
}

export interface TelemetrySnapshot {
  satelliteId: string;
  capturedAtUtc: string;
  batteryPct: number;
  temperatureC: number;
  storageUsedGb: number;
  storageCapacityGb: number;
}

export interface ConjunctionEvent {
  id: string;
  primaryObjectId: string;
  secondaryObjectId: string;
  tcaUtc: string;
  missDistanceM: number;
  relativeVelocityKmS: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
}

export interface ScheduleBlock {
  id: string;
  resourceId: string;
  resourceKind: "satellite" | "ground_station";
  kind: "observation" | "downlink" | "maintenance" | "maneuver" | "idle";
  startUtc: string;
  endUtc: string;
  label: string;
}
