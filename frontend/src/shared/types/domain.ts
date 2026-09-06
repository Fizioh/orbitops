export type OperationalStatus =
  | "ACTIVE"
  | "DEGRADED"
  | "MAINTENANCE"
  | "RETIRED";

export type OrbitRegime = "LEO" | "MEO" | "GEO" | "HEO";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type Feasibility =
  | "FEASIBLE"
  | "CONDITIONALLY_FEASIBLE"
  | "NOT_FEASIBLE";

export type AlertKind =
  | "schedule_conflict"
  | "power_threshold"
  | "telemetry_anomaly"
  | "ground_station_unavailable"
  | "mission_deadline_risk"
  | "conjunction_warning";

export type ConjunctionWorkflowState =
  | "DETECTED"
  | "ANALYSIS"
  | "MONITORING"
  | "MANEUVER_CONSIDERED"
  | "MANEUVER_APPROVED"
  | "EXECUTED"
  | "RESOLVED";

export type ScheduleBlockKind =
  | "observation"
  | "downlink"
  | "maintenance"
  | "maneuver"
  | "idle";

export interface Satellite {
  id: string;
  catalogId: string;
  name: string;
  satelliteType: string;
  orbitRegime: OrbitRegime;
  operationalStatus: OperationalStatus;
  inclinationDeg: number;
  altitudeKm: number;
  velocityKmS: number;
  batteryPct: number;
  storageUsedGb: number;
  storageCapacityGb: number;
  payload: string;
  latitudeDeg: number;
  longitudeDeg: number;
  nextContactStationId: string | null;
  nextContactAosUtc: string | null;
  nextMissionId: string | null;
}

export interface GroundStation {
  id: string;
  name: string;
  latitudeDeg: number;
  longitudeDeg: number;
  altitudeM: number;
  status: "OPERATIONAL" | "MAINTENANCE" | "OFFLINE";
  antennas: number;
  bands: string[];
}

export interface PassWindow {
  id: string;
  satelliteId: string;
  groundStationId: string;
  aosUtc: string;
  losUtc: string;
  maxElevationDeg: number;
  durationSec: number;
}

export interface MissionCandidate {
  satelliteId: string;
  opportunityUtc: string;
  offNadirDeg: number;
  expectedResolutionM: number;
  batteryAfterPct: number;
  score: number;
  feasibility: Feasibility;
  reasons: string[];
}

export interface Mission {
  id: string;
  targetName: string;
  targetLatDeg: number;
  targetLonDeg: number;
  missionType: string;
  windowStartUtc: string;
  windowEndUtc: string;
  requiredResolutionM: number;
  maxCloudCoverPct: number;
  status: string;
  priority: number;
  recommendedSatelliteId: string | null;
  candidates: MissionCandidate[];
}

export interface TelemetrySnapshot {
  satelliteId: string;
  capturedAtUtc: string;
  batteryPct: number;
  temperatureC: number;
  storageUsedGb: number;
  storageCapacityGb: number;
  signalQuality: number;
  attitudeErrorDeg: number;
}

export interface PowerForecastPoint {
  atUtc: string;
  batteryPct: number;
  inSunlight: boolean;
  eventLabel: string | null;
}

export interface ConjunctionEvent {
  id: string;
  primaryObjectId: string;
  secondaryObjectId: string;
  tcaUtc: string;
  missDistanceM: number;
  relativeVelocityKmS: number;
  riskLevel: RiskLevel;
  workflowState: ConjunctionWorkflowState;
  simulatedMissDistanceM: number | null;
}

export interface ScheduleBlock {
  id: string;
  resourceId: string;
  resourceKind: "satellite" | "ground_station";
  kind: ScheduleBlockKind;
  startUtc: string;
  endUtc: string;
  label: string;
  conflictIds: string[];
}

export interface ScheduleConflict {
  id: string;
  title: string;
  resourceId: string;
  blockIds: string[];
  suggestion: string;
}

export interface OpsAlert {
  id: string;
  kind: AlertKind;
  severity: RiskLevel;
  title: string;
  detail: string;
  relatedId: string | null;
  createdAtUtc: string;
}

export interface OpsEvent {
  id: string;
  atUtc: string;
  message: string;
}

export interface OpsKpis {
  activeSatellites: number;
  groundStationsOnline: number;
  contactsToday: number;
  imagingTasks: number;
  scheduleConflicts: number;
  powerAlerts: number;
  highRiskConjunctions: number;
  telemetryAnomalies: number;
}
