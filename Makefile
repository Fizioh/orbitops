.PHONY: help dev up down logs seed reset test test-backend test-frontend lint typecheck benchmark clean

help:
	@echo OrbitOps targets:
	@echo   make dev          - start full local stack
	@echo   make down         - stop stack
	@echo   make seed         - load demo dataset
	@echo   make reset        - wipe volumes and restart
	@echo   make test         - run backend + frontend tests
	@echo   make lint         - run linters
	@echo   make typecheck    - mypy + tsc
	@echo   make benchmark    - run benchmark suite

dev up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f api worker frontend

seed:
	docker compose exec api python manage.py seed_demo

reset:
	docker compose down -v
	docker compose up --build -d
	@$(MAKE) seed

test: test-backend test-frontend

test-backend:
	cd backend && python -m pytest

test-frontend:
	cd frontend && npm test

lint:
	cd backend && ruff check .
	cd frontend && npm run lint

typecheck:
	cd backend && mypy
	cd frontend && npm run typecheck

benchmark:
	@echo Benchmark suite lands with orbit/scheduling cores. See docs/benchmarks.md

clean:
	docker compose down -v
	rm -rf backend/.pytest_cache backend/.mypy_cache backend/.ruff_cache frontend/dist
