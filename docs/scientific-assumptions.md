# Scientific assumptions

OrbitOps is **not flight-critical**. Models are good enough to demonstrate
mission-operations engineering, not to command real spacecraft.

## Units (canonical)

| Quantity | Unit | Notes |
|----------|------|-------|
| Distance (orbital) | km | Altitude, miss distance may also show m |
| Distance (miss) | m | Conjunction miss distance |
| Velocity | km/s | Relative velocity may show m/s in UI |
| Angles (API/domain) | degrees | Convert to radians only at math boundaries |
| Time | UTC | All stored timestamps are timezone-aware UTC |
| Energy | Wh | Battery capacity |
| Power | W | Generation and consumption |
| Storage | GB | Payload data volume |
| Mass / delta-v | m/s | Maneuver simulation only |

## TLE / SGP4

- Propagation uses **sgp4** via **Skyfield** (or equivalent wrapper) — never a
  hand-rolled SGP4.
- TLEs are approximate; LEO accuracy degrades with age.
- Demo TLEs may be synthetic; labeled as DEMO.
- Element sets are versioned (ADR-005); propagation cites the version used.

## Pass prediction

- Geometric visibility uses elevation above a minimum threshold.
- Atmosphere, terrain masking, and link-budget fading are **not** modeled in MVP.
- Communication windows apply additional operational constraints on top of AOS/LOS.

## Power

- Solar generation is approximated (constant in sunlight or simple illuminated fraction).
- Eclipse from coarse orbital sun geometry — not a high-fidelity EPS.
- Thermal coupling to battery is simulated for alerts, not physics-grade.

## Storage

- Imaging adds a fixed or resolution-scaled GB cost.
- Downlink frees storage at a configured rate.
- No RAID / file-system simulation.

## Mission scoring

Scores are weighted heuristics (off-nadir, resolution, power margin, schedule fit).
Weights are documented in code and must remain explainable in API responses.

## Conjunctions

- Screening uses simplified relative geometry / miss-distance estimates suitable
  for demo workflows.
- Risk levels (LOW/MEDIUM/HIGH) are threshold-based heuristics.
- Maneuver outcomes are **SIMULATION ONLY**.

## What we intentionally omit

- Precise force models (drag, SRP, higher harmonics) beyond SGP4
- Cryptographic command authentication
- Real RF link budgets
- Collision probability (Pc) formal methods
