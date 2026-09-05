from __future__ import annotations

from enum import StrEnum


class DistanceUnit(StrEnum):
    KM = "km"
    M = "m"


class VelocityUnit(StrEnum):
    KM_S = "km/s"
    M_S = "m/s"


class AngleUnit(StrEnum):
    DEG = "deg"
    RAD = "rad"


class EnergyUnit(StrEnum):
    WH = "Wh"


class PowerUnit(StrEnum):
    W = "W"


class StorageUnit(StrEnum):
    GB = "GB"


CANONICAL_DISTANCE = DistanceUnit.KM
CANONICAL_ANGLE = AngleUnit.DEG
CANONICAL_TIMEZONE = "UTC"
