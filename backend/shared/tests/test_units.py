from __future__ import annotations

from shared.units import CANONICAL_ANGLE, CANONICAL_DISTANCE, CANONICAL_TIMEZONE


def test_canonical_units() -> None:
    assert CANONICAL_DISTANCE.value == "km"
    assert CANONICAL_ANGLE.value == "deg"
    assert CANONICAL_TIMEZONE == "UTC"
