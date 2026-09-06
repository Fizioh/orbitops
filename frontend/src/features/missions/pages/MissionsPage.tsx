import { Link } from "react-router-dom";

import { PageHeader, Panel, StatusBadge } from "@/components/ui/primitives";
import { missions } from "@/mocks/demoData";
import { formatUtc } from "@/shared/lib/format";

export function MissionsPage() {
  return (
    <section className="space-y-6 oo-fade-up">
      <PageHeader
        title="Mission planner"
        subtitle="Observation requests with explainable feasibility and scoring. Start with TASK-2917 (Dubai)."
      />

      <Panel eyebrow="Requests" title="Mission queue">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.14em] text-[var(--oo-muted)]">
              <tr className="border-b border-[var(--oo-border)]">
                <th className="pb-3 pr-3 font-medium">Mission</th>
                <th className="pb-3 pr-3 font-medium">Target</th>
                <th className="pb-3 pr-3 font-medium">Type</th>
                <th className="pb-3 pr-3 font-medium">Window (UTC)</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Recommended</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((mission) => (
                <tr key={mission.id} className="border-b border-[var(--oo-border)]/70">
                  <td className="py-3 pr-3">
                    <Link
                      to={`/missions/${mission.id}`}
                      className="font-mono text-[var(--oo-accent)] hover:underline"
                    >
                      {mission.id}
                    </Link>
                    <p className="text-xs text-[var(--oo-muted)]">Priority {mission.priority}</p>
                  </td>
                  <td className="py-3 pr-3">{mission.targetName}</td>
                  <td className="py-3 pr-3">{mission.missionType}</td>
                  <td className="py-3 pr-3 font-mono text-xs">
                    {formatUtc(mission.windowStartUtc).slice(0, 16)}
                    <br />
                    {formatUtc(mission.windowEndUtc).slice(0, 16)}
                  </td>
                  <td className="py-3 pr-3">
                    <StatusBadge
                      label={mission.status}
                      tone={mission.status === "EVALUATED" ? "accent" : "neutral"}
                    />
                  </td>
                  <td className="py-3 font-mono text-xs">
                    {mission.recommendedSatelliteId ?? "—"}
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
