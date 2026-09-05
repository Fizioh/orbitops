# Contributing to OrbitOps

Thanks for helping improve an open-source mission operations platform.
Quality beats feature count.

## Setup

```bash
cp .env.example .env
docker compose up --build
make seed
```

Frontend: http://localhost:5173 · API: http://localhost:8000/api

### Without Docker (optional)

- Python 3.12+, Node 22+, PostgreSQL 16 + PostGIS, Redis 7
- See `backend/` and `frontend/` READMEs when added

## Branch conventions

- `feat/<area>-<short-desc>`
- `fix/<area>-<short-desc>`
- `docs/<short-desc>`
- `chore/<short-desc>`
- `test/<area>-<short-desc>`
- `refactor/<area>-<short-desc>`

## Commit messages

Follow Conventional Commits style:

```text
feat(scheduling): add ground station conflict resolution
test(orbit): add regression fixtures for pass prediction
refactor(power): separate forecast model from telemetry state
```

Avoid: `fix`, `stuff`, `update`.

## Code style

- Backend: Ruff + mypy; type hints on domain and services
- Frontend: TypeScript `strict`, ESLint, Prettier
- Domain logic not in Django views or React components
- No secrets; use `.env.example` for new variables

## Testing

```bash
make test
make lint
```

Required for domain PRs:

- unit tests for pure functions (tolerances for orbital math)
- explainable constraint failures covered by tests

## Pull requests

- Small, reviewable diffs
- Describe **why** and demo path if UI changes
- Link ADR updates when decisions change
- CI must be green

## Product reminder

Cesium is visualization. The product is mission planning, constraints, and
orbital operations. Prefer three excellent workflows over fifteen shallow ones.
