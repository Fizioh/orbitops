# Security baseline

OrbitOps is open source but still treats security as a product requirement.

## Principles

- No secrets in the repository (see `.env.example`)
- Input validation at API boundaries (DRF + Zod)
- Demo mode must not require third-party credentials
- Dependency updates via Dependabot
- Secret scanning via gitleaks (pre-commit) and GitHub secret scanning when enabled

## Upcoming (with auth surfaces)

- Session / token auth for non-demo deployments
- RBAC for operator actions (approve mission, approve maneuver)
- Rate limiting on mutating endpoints
- Safe upload constraints if TLE import files are accepted

## Reporting

Prefer private disclosure for security issues until a public process is published.
