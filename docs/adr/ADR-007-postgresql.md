# ADR-007 — Why PostgreSQL

**Status:** Accepted  
**Date:** 2026-09-05

## Context

Need relational integrity for schedules, missions, audit, and optional spatial
queries for stations/targets.

## Decision

Use **PostgreSQL** with **PostGIS only where spatially justified** (stations,
targets, coverage queries). Do not force geography types on every model.

## Consequences

- Strong constraints, indexes, and Django support
- Spatial when needed without schema complexity everywhere
- RDS path for AWS demo is straightforward

## Alternatives considered

- SQLite: poor concurrency for workers
- MongoDB: weaker relational scheduling/audit story
