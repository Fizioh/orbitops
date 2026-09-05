# Scaling notes

OrbitOps starts as a modular monolith for ~24 demo satellites. This document
records what would change — without building the 10,000-satellite architecture
on day one.

## At ~24 satellites (current target)

- Single API + Celery workers is enough
- On-demand propagation + Redis short-window cache
- Telemetry at 30–60 s cadence fits PostgreSQL
- Priority + earliest-feasible scheduling is transparent and fast

## At ~500 satellites

| Concern | Likely change |
|---------|----------------|
| Propagation | Shard Celery by satellite id hash; longer Redis TTLs |
| Pass prediction | Precompute rolling 24–48 h windows nightly + invalidate on TLE update |
| Telemetry | Time-series store or partitioned tables; downsample for UI |
| Scheduling | Keep constraint API; introduce OR-Tools / CP-SAT for station packing |
| DB | Read replica for dashboards; careful indexes on schedule intervals |

## At ~10,000 satellites

| Concern | Likely change |
|---------|----------------|
| Propagation | Dedicated compute service; possibly GPU/batch; avoid chatty ORM |
| Telemetry ingestion | Queue + stream processor; hot/cold storage |
| Conjunction screening | Spatial indexing / catalog pipeline; not pairwise N² in app |
| Scheduling | Separated optimization service; human-in-the-loop review queues |
| API | Extract read models; still prefer few services over microservice sprawl |

## Extraction order (if needed)

1. Orbit propagation workers  
2. Telemetry ingestion  
3. Conjunction screening  
4. Scheduling optimizer  

Prefer **vertical extraction with clear interfaces** over premature Kafka/K8s.
