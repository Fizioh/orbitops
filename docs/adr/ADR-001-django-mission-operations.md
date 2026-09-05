# ADR-001 — Why Django for mission operations

**Status:** Accepted  
**Date:** 2026-09-05

## Context

OrbitOps needs a reliable API, admin tooling, ORM with migrations, auth/RBAC,
and background job integration for a modular monolith aimed at recruiters and
contributors who must understand the domain quickly.

## Decision

Use **Django + Django REST Framework** as the application framework for the
API and domain orchestration. Domain logic lives in explicit service layers,
not in views.

## Consequences

- Fast path to typed serializers, permissions, and migrations
- Celery integrates cleanly for async orbital and scheduling work
- Risk of “fat views” if discipline slips — mitigated by domain/application split

## Alternatives considered

- FastAPI: excellent typing and async, less batteries for admin/ORM conventions
- Node/Nest: duplicates scientific Python ecosystem needs for Skyfield/sgp4
