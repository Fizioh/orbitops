# OrbitOps

**Mission Planning · Orbital Operations · Constraint Management**

Open-source satellite mission operations platform for a small constellation.
OrbitOps is a portfolio-grade showcase of mission control software — not a
space-themed 3D toy. Cesium is a visualization layer; the product is planning,
constraints, scheduling, power, telemetry, and conjunction workflows.

> **Status:** Phase 0 — foundation. Local stack and documentation skeleton.

---

## Live Demo

_Coming soon_ — demo mode runs fully offline with seeded synthetic data.

## Quick start

```bash
cp .env.example .env
docker compose up --build
```

Then open:

- Frontend: http://localhost:5173
- API: http://localhost:8000/api
- API health: http://localhost:8000/api/health/

Seed the demo dataset:

```bash
make seed
```

## Problem

Small constellation operators need more than a globe. They need to:

- propagate and version orbital elements
- predict ground-station passes under real constraints
- task payloads with explainable feasibility and scoring
- schedule contacts without double-booking antennas
- forecast power and storage
- monitor conjunctions with a clear operational workflow

OrbitOps models those workflows end-to-end in a modular monolith that is easy
to run, inspect, and extend.

## Features (roadmap)

| Area | Capability |
|------|------------|
| Constellation | Satellite status, orbit view, detail panels |
| Ground ops | Stations, antennas, pass prediction, contact windows |
| Missions | Requests, feasibility, scoring, scheduling |
| Resources | Power forecast, storage constraints |
| Telemetry | Simulated streams, alerts, history |
| Conjunctions | Detection, workflow, maneuver simulation |
| Ops | Dashboard KPIs, alert center, audit log, time travel |

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and
[docs/adr/](docs/adr/) for decisions.

```text
orbitops/
├── backend/          # Django + DRF modular monolith + Celery
├── frontend/         # React + TypeScript + Vite + Cesium
├── infra/            # Terraform (AWS demo)
├── docs/             # Architecture, ADR, science, scaling
├── docker-compose.yml
└── Makefile
```

**Stack:** React, TypeScript, Vite, CesiumJS, TanStack Query/Table, Django,
DRF, PostgreSQL, PostGIS, Celery, Redis, Skyfield/sgp4, Docker, Terraform, AWS.

## Running locally

Requirements: Docker and Docker Compose.

```bash
make dev      # docker compose up
make test     # backend + frontend tests
make lint     # ruff, mypy, eslint
make seed     # demo constellation
make reset    # wipe volumes and reseed
```

Without Docker (dev): see [CONTRIBUTING.md](CONTRIBUTING.md).

## Testing

```bash
make test
```

Critical coverage targets: domain services, constraints, scheduling,
orbital helpers (with explicit scientific tolerances).

## Scientific assumptions

OrbitOps uses recognized libraries (SGP4 via Skyfield/sgp4). Models for power,
conjunction miss distance, and scoring are intentionally simplified and
documented in [docs/scientific-assumptions.md](docs/scientific-assumptions.md).

**This is not flight-critical software.** Maneuver and conjunction tools are
labeled **SIMULATION ONLY**.

## Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System context and module map |
| [ADR index](docs/adr/README.md) | Architecture Decision Records |
| [scientific-assumptions.md](docs/scientific-assumptions.md) | Model honesty |
| [scaling.md](docs/scaling.md) | What changes at 500 / 10k satellites |
| [benchmarks.md](docs/benchmarks.md) | Propagation and scheduling benches |
| [licenses.md](docs/licenses.md) | Dependency and dataset licenses |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Setup and PR expectations |

## License

Licensed under the [Apache License 2.0](LICENSE).

## Roadmap

1. **Phase 0** — Foundation (current)
2. **Phase 1** — Premium UI with mock data
3. **Phase 2** — Orbit core + scientific tests
4. **Phase 3** — Ground stations and scheduling
5. **Phase 4** — Mission tasking and feasibility
6. **Phase 5** — Power and storage
7. **Phase 6** — Telemetry and alerts
8. **Phase 7** — Conjunction workflows
9. **Phase 8** — AWS / Terraform
10. **Phase 9** — Open-source polish and live demo
