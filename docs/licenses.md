# Licenses and third-party attributions

OrbitOps is licensed under **Apache License 2.0** (see `/LICENSE`).

This file tracks important dependencies and datasets so the public repository
stays license-clean. Update when adding significant libraries or data.

## Application license

| Component | License |
|-----------|---------|
| OrbitOps source | Apache-2.0 |

## Planned major dependencies

| Dependency | Typical license | Role |
|------------|-----------------|------|
| Django / DRF | BSD-3-Clause | API |
| PostgreSQL / PostGIS | PostgreSQL License | Data |
| Celery / Redis clients | BSD | Jobs / cache |
| Skyfield | MIT | Orbit helpers |
| sgp4 | MIT | SGP4 propagator |
| Astropy | BSD-3-Clause | Time / coords helpers |
| NumPy / SciPy | BSD | Numerics |
| OR-Tools | Apache-2.0 | Optional scheduler |
| React / Vite | MIT | Frontend |
| CesiumJS | Apache-2.0 | Visualization |
| TanStack Query / Table | MIT | Data UI |
| ECharts | Apache-2.0 | Charts |

Exact versions and license texts ship with lockfiles and vendor notices.

## Datasets

| Dataset | Source | License / terms | Notes |
|---------|--------|-----------------|-------|
| Demo constellation | Synthetic OrbitOps | Apache-2.0 | Preferred for demos |
| Public TLEs (if used) | CelesTrak / Space-Track | Check provider ToS | Attribute; do not imply operational authority |

## Rules

- No proprietary models or incompatible datasets
- No secrets in history
- Prefer synthetic DEMO-* identifiers in screenshots and seed data
