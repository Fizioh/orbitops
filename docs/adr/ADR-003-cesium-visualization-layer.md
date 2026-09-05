# ADR-003 — Why Cesium is only a visualization layer

**Status:** Accepted  
**Date:** 2026-09-05

## Context

Recruiters expect a globe. Product value is mission planning and constraints.
A 3D Earth without ops workflows would be a space-themed demo, not OrbitOps.

## Decision

Use **CesiumJS for visualization only**: Earth, satellites, orbits, ground
tracks, stations, targets, footprints. Business rules stay in backend services.

## Consequences

- Clear product positioning: “Mission Planning + Orbital Operations”
- Frontend map feature stays replaceable (e.g. 2D map fallback)
- Cesium Ion token optional; demo works without commercial dependency

## Alternatives considered

- Three.js custom globe: more control, more maintenance
- Mapbox 2D only: weaker orbit storytelling for constellation demos
