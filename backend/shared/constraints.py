from __future__ import annotations

from dataclasses import dataclass
from enum import StrEnum
from typing import Protocol


class ConstraintSeverity(StrEnum):
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"


@dataclass(frozen=True, slots=True)
class ConstraintResult:
    valid: bool
    reason: str
    severity: ConstraintSeverity
    code: str
    details: dict[str, object] | None = None


class ConstraintContext(Protocol):
    pass


class Constraint(Protocol):
    code: str

    def evaluate(self, context: ConstraintContext) -> ConstraintResult: ...
