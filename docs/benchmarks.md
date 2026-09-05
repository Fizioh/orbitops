# Benchmarks

Simple, reproducible timings for orbital and scheduling workloads.
Record environment, commit SHA, and command when updating numbers.

## How to run

```bash
make benchmark
```

(Implemented when orbit and scheduling cores land.)

## Target scenarios

| Benchmark | Description | Soft target (dev laptop) |
|-----------|-------------|--------------------------|
| Propagate 1 sat / 24 h | 60 s steps | < 200 ms |
| Propagate 100 sats / 1 h | 60 s steps | < 5 s |
| Pass windows | 1 sat × 7 stations × 24 h | < 1 s |
| Schedule generate | demo day contacts | < 2 s |

## Rules

- Benchmarks live under `backend/benchmarks/` (or `scripts/benchmarks/`)
- Prefer pure domain functions for microbench
- Do not chase micro-optimizations that hurt clarity
- Publish results in PRs that change orbital/scheduling hot paths

## Results log

| Date | Commit | Machine | Notes | Results |
|------|--------|---------|-------|---------|
| — | — | — | Phase 0 placeholder | — |
