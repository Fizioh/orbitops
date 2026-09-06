import { Link } from "react-router-dom";

import { PageHeader, Panel, StatusBadge } from "@/components/ui/primitives";
import { conjunctions, getSatellite } from "@/mocks/demoData";
import { formatM, formatUtc } from "@/shared/lib/format";

function riskTone(level: string): "ok" | "warn" | "danger" {
  if (level === "HIGH") return "danger";
  if (level === "MEDIUM") return "warn";
  return "ok";
}

export function ConjunctionsPage() {
  return (
    <section className="space-y-6 oo-fade-up">
      <PageHeader
        title="Conjunction monitoring"
        subtitle="Screened close approaches for the DEMO constellation. Maneuver tools are simulation only."
      />

      <Panel eyebrow="Events" title="Active and recent">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.14em] text-[var(--oo-muted)]">
              <tr className="border-b border-[var(--oo-border)]">
                <th className="pb-3 pr-3 font-medium">Event</th>
                <th className="pb-3 pr-3 font-medium">Primary</th>
                <th className="pb-3 pr-3 font-medium">Secondary</th>
                <th className="pb-3 pr-3 font-medium">TCA</th>
                <th className="pb-3 pr-3 font-medium">Miss</th>
                <th className="pb-3 pr-3 font-medium">Risk</th>
                <th className="pb-3 font-medium">Workflow</th>
              </tr>
            </thead>
            <tbody>
              {conjunctions.map((event) => {
                const primary = getSatellite(event.primaryObjectId);
                return (
                  <tr key={event.id} className="border-b border-[var(--oo-border)]/70">
                    <td className="py-3 pr-3">
                      <Link
                        to={`/conjunctions/${event.id}`}
                        className="font-mono text-[var(--oo-accent)] hover:underline"
                      >
                        {event.id}
                      </Link>
                    </td>
                    <td className="py-3 pr-3 font-mono text-xs">
                      {primary?.catalogId ?? event.primaryObjectId}
                    </td>
                    <td className="py-3 pr-3 font-mono text-xs">{event.secondaryObjectId}</td>
                    <td className="py-3 pr-3 font-mono text-xs">{formatUtc(event.tcaUtc)}</td>
                    <td className="py-3 pr-3 font-mono">{formatM(event.missDistanceM)}</td>
                    <td className="py-3 pr-3">
                      <StatusBadge label={event.riskLevel} tone={riskTone(event.riskLevel)} />
                    </td>
                    <td className="py-3 font-mono text-xs text-[var(--oo-muted)]">
                      {event.workflowState}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </section>
  );
}
