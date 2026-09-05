# ADR-008 — Historical telemetry storage strategy

**Status:** Accepted  
**Date:** 2026-09-05

## Context

Telemetry and power must support charts and time travel without storing every
propagated orbital sample forever.

## Decision

- Store **telemetry snapshots** at controlled cadence (e.g. 30–60 s demo)
- Store **orbital element versions**, not dense ephemerides by default
- Compute positions on demand or cache short windows in Redis
- Retain schedule / mission / conjunction state transitions as event history

## Consequences

- Bounded disk for demo constellation
- Time travel reconstructs state from versions + events + on-demand propagate
- Benchmarks must track compute vs storage tradeoff

## Alternatives considered

- Dense ephemeris tables: expensive, hard to justify early
- No history: kills demo value of audit and time travel
