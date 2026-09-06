import { Link } from "react-router-dom";

import { PageHeader, Panel, StatusBadge } from "@/components/ui/primitives";
import { satellites } from "@/mocks/demoData";
import { formatKm } from "@/shared/lib/format";

function statusTone(status: string): "ok" | "warn" | "danger" | "neutral" {
  if (status === "ACTIVE") return "ok";
  if (status === "DEGRADED") return "warn";
  if (status === "MAINTENANCE") return "neutral";
  return "danger";
}

export function SatellitesPage() {
  return (
    <section className="space-y-6 oo-fade-up">
      <PageHeader
        title="Constellation"
        subtitle="24 DEMO Earth-observation satellites. Operational status, power, and next contact at a glance."
      />

      <Panel eyebrow="Fleet" title="Satellites">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.14em] text-[var(--oo-muted)]">
              <tr className="border-b border-[var(--oo-border)]">
                <th className="pb-3 pr-3 font-medium">ID</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 pr-3 font-medium">Orbit</th>
                <th className="pb-3 pr-3 font-medium">Altitude</th>
                <th className="pb-3 pr-3 font-medium">Battery</th>
                <th className="pb-3 pr-3 font-medium">Storage</th>
                <th className="pb-3 pr-3 font-medium">Payload</th>
                <th className="pb-3 font-medium">Next mission</th>
              </tr>
            </thead>
            <tbody>
              {satellites.map((sat) => (
                <tr
                  key={sat.id}
                  className="border-b border-[var(--oo-border)]/70 hover:bg-white/[0.02]"
                >
                  <td className="py-3 pr-3">
                    <Link
                      to={`/satellites/${sat.id}`}
                      className="font-mono text-[var(--oo-accent)] hover:underline"
                    >
                      {sat.catalogId}
                    </Link>
                    <p className="text-xs text-[var(--oo-muted)]">{sat.name}</p>
                  </td>
                  <td className="py-3 pr-3">
                    <StatusBadge
                      label={sat.operationalStatus}
                      tone={statusTone(sat.operationalStatus)}
                    />
                  </td>
                  <td className="py-3 pr-3 font-mono text-xs">
                    {sat.orbitRegime} · {sat.inclinationDeg.toFixed(1)}°
                  </td>
                  <td className="py-3 pr-3 font-mono">{formatKm(sat.altitudeKm)}</td>
                  <td className="py-3 pr-3 font-mono">
                    <span
                      className={
                        sat.batteryPct < 30
                          ? "text-[var(--oo-danger)]"
                          : sat.batteryPct < 50
                            ? "text-[var(--oo-warn)]"
                            : undefined
                      }
                    >
                      {sat.batteryPct}%
                    </span>
                  </td>
                  <td className="py-3 pr-3 font-mono text-xs">
                    {sat.storageUsedGb} / {sat.storageCapacityGb} GB
                  </td>
                  <td className="py-3 pr-3">{sat.payload}</td>
                  <td className="py-3 font-mono text-xs text-[var(--oo-muted)]">
                    {sat.nextMissionId ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </section>
  );
}
