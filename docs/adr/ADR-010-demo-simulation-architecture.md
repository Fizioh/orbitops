# ADR-010 — Demo simulation architecture

**Status:** Accepted  
**Date:** 2026-09-05

## Context

The project must run with `docker compose up` and no commercial SaaS. Recruiters
need a scripted journey (mission conflict + conjunction maneuver).

## Decision

Provide a **Demo mode** with:

- synthetic constellation (e.g. 24 satellites, 7 ground stations)
- seeded missions, schedules, telemetry history, conjunctions
- clearly labeled DEMO / SIMULATION ONLY entities
- no required Cesium Ion, AWS, or paid APIs for local demo

## Consequences

- Reproducible recruiter path (TASK-2917, CONJ-00418 scenarios)
- Honest labeling avoids implying flight operations
- Seed command is part of the product surface (`make seed`)

## Alternatives considered

- Live CelesTrak-only demo: network dependency and license clarity burden
- Empty database onboarding: weak first impression
