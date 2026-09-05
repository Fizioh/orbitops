from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum


class OperationalStatus(StrEnum):
    ACTIVE = "ACTIVE"
    DEGRADED = "DEGRADED"
    MAINTENANCE = "MAINTENANCE"
    RETIRED = "RETIRED"


class OrbitRegime(StrEnum):
    LEO = "LEO"
    MEO = "MEO"
    GEO = "GEO"
    HEO = "HEO"


class SatelliteType(StrEnum):
    EARTH_OBSERVATION = "EARTH_OBSERVATION"
    COMMUNICATIONS = "COMMUNICATIONS"
    TECHNOLOGY = "TECHNOLOGY"


@dataclass(frozen=True, slots=True)
class OrbitalElementSet:
    id: str
    satellite_id: str
    line1: str
    line2: str
    epoch_utc: datetime
    version: int
    source: str


@dataclass(frozen=True, slots=True)
class Satellite:
    id: str
    catalog_id: str
    name: str
    satellite_type: SatelliteType
    orbit_regime: OrbitRegime
    operational_status: OperationalStatus
    inclination_deg: float
    altitude_km: float
    payload: str
