from __future__ import annotations

from shared.constraints import ConstraintResult, ConstraintSeverity


def test_constraint_result_is_explicable() -> None:
    result = ConstraintResult(
        valid=False,
        reason="Insufficient power margin",
        severity=ConstraintSeverity.ERROR,
        code="POWER_CONSTRAINT",
        details={"predicted_battery_pct": 17.0, "minimum_safe_pct": 22.0},
    )
    assert result.valid is False
    assert result.details is not None
    assert result.details["predicted_battery_pct"] == 17.0
