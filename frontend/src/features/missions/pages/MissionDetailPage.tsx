import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Button,
  EmptyState,
  KeyValue,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/ui/primitives";
import { getMission, getSatellite } from "@/mocks/demoData";
import { formatUtc } from "@/shared/lib/format";
import type { Feasibility } from "@/shared/types/domain";

function feasibilityTone(value: Feasibility): "ok" | "warn" | "danger" {
  if (value === "FEASIBLE") return "ok";
  if (value === "CONDITIONALLY_FEASIBLE") return "warn";
  return "danger";
}

export function MissionDetailPage() {
  const { missionId = "" } = useParams();
  const mission = getMission(missionId);
  const [selectedId, setSelectedId] = useState<string | null>(
    mission?.recommendedSatelliteId ?? null,
  );
  const [scheduled, setScheduled] = useState(false);

  const selected = useMemo(
    () => mission?.candidates.find((c) => c.satelliteId === selectedId) ?? null,
    [mission, selectedId],
  );

  if (!mission) {
    return <EmptyState title="Mission not found" detail={`No mission “${missionId}”.`} />;
  }

  return (
    <section className="space-y-6 oo-fade-up">
      <PageHeader
        title={mission.id}
        subtitle={`${mission.missionType} · target ${mission.targetName}`}
        actions={
          <Link to="/missions" className="text-sm text-[var(--oo-muted)] hover:text-[var(--oo-fg)]">
            ← Queue
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-1" eyebrow="Request" title="Observation target">
          <KeyValue
            items={[
              { label: "Target", value: mission.targetName },
              {
                label: "Location",
                value: `${mission.targetLatDeg.toFixed(2)}°, ${mission.targetLonDeg.toFixed(2)}°`,
              },
              {
                label: "Window",
                value: `${formatUtc(mission.windowStartUtc)} → ${formatUtc(mission.windowEndUtc)}`,
              },
              { label: "Required resolution", value: `< ${mission.requiredResolutionM.toFixed(1)} m` },
              { label: "Max cloud cover", value: `${mission.maxCloudCoverPct}%` },
              { label: "Priority", value: String(mission.priority) },
            ]}
          />
        </Panel>

        <Panel
          className="lg:col-span-2"
          eyebrow="Feasibility engine"
          title={`${mission.candidates.length || "No"} candidate satellites`}
          actions={
            mission.recommendedSatelliteId ? (
              <StatusBadge label={`Recommended ${mission.recommendedSatelliteId}`} tone="accent" />
            ) : null
          }
        >
          {mission.candidates.length === 0 ? (
            <p className="text-sm text-[var(--oo-muted)]">
              Candidates not evaluated in this mock row. Open TASK-2917 for the full scoring demo.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="text-[10px] uppercase tracking-[0.14em] text-[var(--oo-muted)]">
                  <tr className="border-b border-[var(--oo-border)]">
                    <th className="pb-2 pr-2 font-medium">Satellite</th>
                    <th className="pb-2 pr-2 font-medium">Opportunity</th>
                    <th className="pb-2 pr-2 font-medium">Off-nadir</th>
                    <th className="pb-2 pr-2 font-medium">Resolution</th>
                    <th className="pb-2 pr-2 font-medium">Battery after</th>
                    <th className="pb-2 pr-2 font-medium">Score</th>
                    <th className="pb-2 font-medium">Feasibility</th>
                  </tr>
                </thead>
                <tbody>
                  {mission.candidates.map((candidate) => {
                    const sat = getSatellite(candidate.satelliteId);
                    const active = selectedId === candidate.satelliteId;
                    return (
                      <tr
                        key={candidate.satelliteId}
                        className={`cursor-pointer border-b border-[var(--oo-border)]/70 ${active ? "bg-[var(--oo-accent-soft)]" : "hover:bg-white/[0.02]"}`}
                        onClick={() => setSelectedId(candidate.satelliteId)}
                      >
                        <td className="py-3 pr-2">
                          <Link
                            to={`/satellites/${candidate.satelliteId}`}
                            className="font-mono text-[var(--oo-accent)] hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {sat?.catalogId ?? candidate.satelliteId}
                          </Link>
                        </td>
                        <td className="py-3 pr-2 font-mono text-xs">
                          {candidate.opportunityUtc.slice(11, 19)} UTC
                        </td>
                        <td className="py-3 pr-2 font-mono">{candidate.offNadirDeg.toFixed(1)}°</td>
                        <td className="py-3 pr-2 font-mono">
                          {candidate.expectedResolutionM.toFixed(2)} m
                        </td>
                        <td className="py-3 pr-2 font-mono">
                          <span
                            className={
                              candidate.batteryAfterPct < 22 ? "text-[var(--oo-danger)]" : undefined
                            }
                          >
                            {candidate.batteryAfterPct}%
                          </span>
                        </td>
                        <td className="py-3 pr-2 font-mono text-base">{candidate.score}/100</td>
                        <td className="py-3">
                          <StatusBadge
                            label={candidate.feasibility}
                            tone={feasibilityTone(candidate.feasibility)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>

      {selected && (
        <Panel
          eyebrow="Explainability"
          title={`Why ${selected.satelliteId}`}
          actions={
            <Button
              disabled={selected.feasibility === "NOT_FEASIBLE" || scheduled}
              onClick={() => setScheduled(true)}
            >
              {scheduled ? "Scheduled (demo)" : "Schedule selected satellite"}
            </Button>
          }
        >
          <ul className="space-y-2 text-sm">
            {selected.reasons.map((reason) => (
              <li key={reason} className="flex gap-2">
                <span className="text-[var(--oo-accent)]">▸</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
          {selected.feasibility === "NOT_FEASIBLE" && (
            <div className="mt-4 border border-[var(--oo-danger)]/40 bg-[var(--oo-danger)]/10 px-3 py-3 text-sm">
              <p className="font-medium text-[var(--oo-danger)]">MISSION REJECTED</p>
              <p className="mt-1 text-[var(--oo-muted)]">
                Reason: Insufficient power margin. Predicted battery after operation:{" "}
                {selected.batteryAfterPct}%. Minimum safe threshold: 22%.
              </p>
            </div>
          )}
          {scheduled && (
            <div className="mt-4 border border-[var(--oo-ok)]/40 bg-[var(--oo-ok)]/10 px-3 py-3 text-sm">
              Mission queued on {selected.satelliteId}. Open{" "}
              <Link to="/schedule" className="text-[var(--oo-accent)] hover:underline">
                Schedule
              </Link>{" "}
              to inspect conflicts with the existing downlink.
            </div>
          )}
        </Panel>
      )}
    </section>
  );
}
