# Units and time conventions

Canonical units for domain code and APIs. UI may format for display but must
not silently change storage units.

## Time

- Store all business timestamps in **UTC** (`datetime` with `tzinfo=UTC`)
- APIs exchange ISO-8601 strings with `Z` or explicit offset
- Orbital math uses consistent time scales via Skyfield/Astropy helpers
- UI may show local time as a secondary label

## Naming

Prefer explicit suffixes in pure functions when ambiguity exists:

- `altitude_km`
- `elevation_deg`
- `battery_wh`
- `draw_w`
- `miss_distance_m`
- `delta_v_m_s`

## Angles

- Domain and JSON APIs: **degrees**
- Convert to radians at the mathematical boundary only
