# OrbitOps backend

Django + DRF modular monolith. Domain logic lives in services, not views.

## Layout

```text
config/           Django project (settings, urls, celery)
apps/             Feature modules (satellites, orbit, …)
shared/           Cross-cutting types, units, errors
tests/            Cross-app integration tests
```

## Local commands

Prefer repo root Makefile / Docker Compose. From this directory:

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -e ".[dev]"
pytest
ruff check .
mypy
```
