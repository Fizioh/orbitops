import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Button,
  EmptyState,
  KeyValue,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/ui/primitives";
import { getConjunction, getSatellite } from "@/mocks/demoData";
import { formatM, formatUtc } from "@/shared/lib/format";

const workflow: Array<string> = [
  "DETECTED",
  "ANALYSIS",
  "MONITORING",
  "MANEUVER_CONSIDERED",
  "MANEUVER_APPROVED",
  "EXECUTED",
  "RESOLVED",
];

export function ConjunctionDetailPage() {
  const { conjunctionId = "" } = useParams();
  const event = getConjunction(conjunctionId);
  const [simulated, setSimulated] = useState(false);

  if (!event) {
    return <EmptyState title="Conjunction not found" detail={`No event “${conjunctionId}”.`} />;
  }

  const primary = getSatellite(event.primaryObjectId);
  const activeIdx = workflow.indexOf(event.workflowState);

  return (
    <section className="space-y-6 oo-fade-up">
      <PageHeader
        title={event.id}
        subtitle={`${primary?.catalogId ?? event.primaryObjectId} vs ${event.secondaryObjectId}`}
        actions={
          <Link
            to="/conjunctions"
            className="text-sm text-[var(--oo-muted)] hover:text-[var(--oo-fg)]"
          >
            ← Events
          </Link>
        }
      />

      <div className="flex flex-wrap gap-2">
        <StatusBadge
          label={event.riskLevel}
          tone={event.riskLevel === "HIGH" ? "danger" : event.riskLevel === "MEDIUM" ? "warn" : "ok"}
        />
        <StatusBadge label={event.workflowState} tone="accent" />
        <StatusBadge label="SIMULATION ONLY" tone="warn" />
      </div>

      <Panel eyebrow="Workflow" title="Conjunction state machine">
        <ol className="flex flex-wrap gap-2">
          {workflow.map((state, idx) => (
            <li
              key={state}
              className={`border px-2 py-1 font-mono text-[11px] ${
                idx === activeIdx
                  ? "border-[var(--oo-accent)] bg-[var(--oo-accent-soft)] text-[var(--oo-accent)]"
                  : idx < activeIdx
                    ? "border-[var(--oo-border)] text-[var(--oo-muted)]"
                    : "border-[var(--oo-border)] text-[var(--oo-muted)] opacity-50"
              }`}
            >
              {state}
            </li>
          ))}
        </ol>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Geometry at TCA">
          <KeyValue
            items={[
              { label: "TCA", value: formatUtc(event.tcaUtc) },
              { label: "Miss distance", value: formatM(event.missDistanceM) },
              {
                label: "Relative velocity",
                value: `${event.relativeVelocityKmS.toFixed(1)} km/s`,
              },
              {
                label: "Primary",
                value: (
                  <Link
                    to={`/satellites/${event.primaryObjectId}`}
                    className="text-[var(--oo-accent)] hover:underline"
                  >
                    {primary?.catalogId ?? event.primaryObjectId}
                  </Link>
                ),
              },
              { label: "Secondary", value: event.secondaryObjectId },
            ]}
          />
        </Panel>

        <Panel
          eyebrow="Maneuver simulation"
          title="Delta-v what-if"
          actions={
            <Button onClick={() => setSimulated(true)} disabled={simulated}>
              {simulated ? "Simulated" : "Run simulation"}
            </Button>
          }
        >
          <div className="mb-3 border border-[var(--oo-warn)]/40 bg-[var(--oo-warn)]/10 px-3 py-2 text-xs text-[var(--oo-warn)]">
            SIMULATION ONLY — not flight-critical, not for real commanding.
          </div>
          <KeyValue
            items={[
              { label: "Maneuver time", value: "2026-09-07 22:10 UTC" },
              { label: "Delta-v", value: "0.12 m/s" },
              { label: "Direction", value: "Along-track (+V)" },
              {
                label: "Miss before",
                value: formatM(event.missDistanceM),
              },
              {
                label: "Miss after simulation",
                value: simulated
                  ? formatM(event.simulatedMissDistanceM ?? 0)
                  : "—",
              },
            ]}
          />
          {simulated && (
            <p className="mt-4 text-sm text-[var(--oo-ok)]">
              Predicted miss distance after maneuver:{" "}
              <span className="font-mono">
                {((event.simulatedMissDistanceM ?? 0) / 1000).toFixed(1)} km
              </span>{" "}
              (was {formatM(event.missDistanceM)}).
            </p>
          )}
        </Panel>
      </div>

      <Panel title="Relative geometry (schematic)">
        <div className="relative h-48 overflow-hidden border border-[var(--oo-border)] bg-[var(--oo-bg)]">
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(var(--oo-border) 1px, transparent 1px), linear-gradient(90deg, var(--oo-border) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            className="absolute h-3 w-3 rounded-full bg-[var(--oo-accent)]"
            style={{ left: "42%", top: "48%" }}
            title="Primary"
          />
          <div
            className="absolute h-3 w-3 rounded-full bg-[var(--oo-danger)]"
            style={{ left: simulated ? "68%" : "46%", top: "44%" }}
            title="Secondary"
          />
          <svg className="absolute inset-0 h-full w-full">
            <line
              x1="20%"
              y1="70%"
              x2="80%"
              y2="25%"
              stroke="var(--oo-accent)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <line
              x1="15%"
              y1="30%"
              x2={simulated ? "85%" : "75%"}
              y2="65%"
              stroke="var(--oo-danger)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>
          <p className="absolute bottom-2 left-3 font-mono text-[11px] text-[var(--oo-muted)]">
            Schematic only · Phase 7 will bind real relative trajectories
          </p>
        </div>
      </Panel>
    </section>
  );
}
