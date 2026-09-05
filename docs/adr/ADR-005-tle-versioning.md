# ADR-005 — TLE versioning

**Status:** Accepted  
**Date:** 2026-09-05

## Context

Orbital elements change. Silently overwriting TLEs destroys auditability and
breaks historical replay (“time travel”).

## Decision

Treat each orbital element set as an **immutable versioned record**:

- ingest → validate → append new version
- current pointer references the active version
- never overwrite prior TLE rows

## Consequences

- Propagation always cites `orbital_element_set_id` + epoch
- Time travel can reconstruct which TLE was active
- Slightly more storage; acceptable at constellation demo scale

## Alternatives considered

- Mutable single row: simple, unacceptable for audit/history
- External TLE service only: breaks offline demo mode
