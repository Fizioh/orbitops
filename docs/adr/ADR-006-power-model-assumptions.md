# ADR-006 — Power model assumptions

**Status:** Accepted  
**Date:** 2026-09-05

## Context

Battery feasibility gates imaging and downlink. A full spacecraft EPS model is
out of scope for a portfolio MVP.

## Decision

Use a **simple coherent model**:

- battery capacity (Wh) and state of charge (%)
- constant or sunlight-gated solar generation (W)
- idle / payload / communication draw (W)
- eclipse approximated from orbital geometry (sunlit vs night)

Document units and simplifications in `docs/scientific-assumptions.md`.

## Consequences

- Explainable reject reasons (“predicted battery 17% < 22%”)
- Easy property tests (SoC ∈ [0, 100], energy balance)
- Not suitable for flight operations

## Alternatives considered

- Ignore power: unrealistic mission planning
- High-fidelity EPS: overengineering for MVP
