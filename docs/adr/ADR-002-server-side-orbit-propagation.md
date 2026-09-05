# ADR-002 — Why orbital propagation runs server-side

**Status:** Accepted  
**Date:** 2026-09-05

## Context

The UI needs satellite positions and ground tracks. Running SGP4 in the browser
looks impressive but makes feasibility, scheduling, and audit inconsistent.

## Decision

**Authoritative propagation runs on the server** (Skyfield/sgp4). The frontend
may interpolate short display segments but never owns mission-critical results.

## Consequences

- Single source of truth for passes, power forecasts, and conjunction screens
- Cacheable, testable, and auditable computations
- API must expose position/pass endpoints efficiently (Redis cache)

## Alternatives considered

- Client-only propagation: demos well, fails for scheduling consistency
- Precompute millions of positions: storage heavy without clear need (ADR-008)
