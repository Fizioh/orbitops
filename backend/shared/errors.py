from __future__ import annotations

from dataclasses import dataclass
from enum import StrEnum
from typing import Any


class ErrorCode(StrEnum):
    MISSION_NOT_FEASIBLE = "MISSION_NOT_FEASIBLE"
    SCHEDULE_CONFLICT = "SCHEDULE_CONFLICT"
    VALIDATION_ERROR = "VALIDATION_ERROR"
    NOT_FOUND = "NOT_FOUND"
    INTERNAL_ERROR = "INTERNAL_ERROR"


@dataclass(frozen=True, slots=True)
class ErrorDetail:
    code: ErrorCode
    message: str
    reason: str | None = None
    details: dict[str, Any] | None = None


class OrbitOpsError(Exception):
    def __init__(self, detail: ErrorDetail) -> None:
        self.detail = detail
        super().__init__(detail.message)
