# ADR-004 — Scheduling algorithm strategy

**Status:** Accepted  
**Date:** 2026-09-05

## Context

Ground contacts and payload tasks conflict on antennas, satellites, power, and
transition time. A black-box optimizer hides tradeoffs from operators and
interviewers.

## Decision

**Phase 1 algorithm:** priority + earliest feasible slot, with explicit
constraint evaluation and alternative proposals (e.g. shift station).

**Later:** optional OR-Tools model with the same constraint interface and a
documented objective function.

## Inputs

- Pass / communication windows
- Mission priorities and deadlines
- Antenna and station availability
- Power and storage projections
- Existing exclusive reservations

## Objective (simple strategy)

1. Respect hard constraints
2. Prefer higher mission priority
3. Prefer earlier feasible start
4. Prefer lower conflict disruption when resolving

## Consequences

- Explainable schedules and conflict resolutions
- Easy unit tests without solver flakiness
- OR-Tools can plug into the same constraint abstraction

## Alternatives considered

- OR-Tools first: powerful but opaque for early demos
- Manual-only scheduling: insufficient product signal
