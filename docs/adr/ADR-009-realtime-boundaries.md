# ADR-009 — Realtime boundaries

**Status:** Accepted  
**Date:** 2026-09-05

## Context

Making every endpoint realtime increases complexity and obscures the domain
API. Recruiters should see deliberate engineering boundaries.

## Decision

Use WebSocket or SSE **only** for:

- telemetry
- active mission execution
- alerts
- optional position ticks for the map

Planning, feasibility, scheduling, CRUD remain REST.

## Consequences

- Clear operational “live” surfaces
- Easier testing and caching for REST domain APIs
- Fewer moving parts in CI

## Alternatives considered

- Full GraphQL subscriptions everywhere: unnecessary for MVP
- Polling only: acceptable fallback if WS disabled
