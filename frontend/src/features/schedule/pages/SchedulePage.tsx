import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Button, PageHeader, Panel, StatusBadge } from "@/components/ui/primitives";
import {
  getGroundStation,
  getSatellite,
  scheduleBlocks,
  scheduleConflicts,
} from "@/mocks/demoData";
import { formatUtcShort } from "@/shared/lib/format";
import type { ScheduleBlock } from "@/shared/types/domain";

const DAY_START = Date.parse("2026-09-05T08:00:00Z");
const DAY_END = Date.parse("2026-09-05T16:00:00Z");
const SPAN = DAY_END - DAY_START;

const rows = [
  ...["DEMO-EOS-03", "DEMO-EOS-04", "DEMO-EOS-17", "DEMO-EOS-08"].map((id) => ({
    id,
    kind: "satellite" as const,
  })),
  ...["gs-toulouse", "gs-madrid"].map((id) => ({
    id,
    kind: "ground_station" as const,
  })),
];

function blockColor(kind: ScheduleBlock["kind"]): string {
  if (kind === "observation") return "var(--oo-observation)";
  if (kind === "downlink") return "var(--oo-downlink)";
  if (kind === "maintenance") return "var(--oo-maintenance)";
  if (kind === "maneuver") return "var(--oo-maneuver)";
  return "var(--oo-muted)";
}

function leftPct(iso: string): number {
  return ((Date.parse(iso) - DAY_START) / SPAN) * 100;
}

function widthPct(startUtc: string, endUtc: string): number {
  return ((Date.parse(endUtc) - Date.parse(startUtc)) / SPAN) * 100;
}

function rowLabel(id: string, kind: "satellite" | "ground_station"): string {
  if (kind === "satellite") {
    return getSatellite(id)?.catalogId ?? id;
  }
  return getGroundStation(id)?.name ?? id;
}

export function SchedulePage() {
  const [resolved, setResolved] = useState<string[]>([]);
  const openConflicts = scheduleConflicts.filter((c) => !resolved.includes(c.id));

  const blocksByRow = useMemo(() => {
    const map = new Map<string, ScheduleBlock[]>();
    for (const row of rows) {
      map.set(
        row.id,
        scheduleBlocks.filter((b) => b.resourceId === row.id),
      );
    }
    return map;
  }, []);

  return (
    <section className="space-y-6 oo-fade-up">
      <PageHeader
        title="Operations schedule"
        subtitle="Timeline for satellites and ground stations. Conflicts are highlighted; resolution proposals are explicit."
        actions={
          <Button
            disabled={openConflicts.length === 0}
            onClick={() => setResolved(scheduleConflicts.map((c) => c.id))}
          >
            Resolve conflicts
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2" eyebrow="Timeline" title="2026-09-05 · 08:00–16:00 UTC">
          <div className="mb-3 flex flex-wrap gap-3 text-[11px] text-[var(--oo-muted)]">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2" style={{ background: "var(--oo-observation)" }} /> Observation
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2" style={{ background: "var(--oo-downlink)" }} /> Downlink
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2" style={{ background: "var(--oo-maintenance)" }} /> Maintenance
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 bg-[var(--oo-danger)]" /> Conflict
            </span>
          </div>

          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row.id} className="grid grid-cols-[120px_1fr] items-center gap-3">
                <div className="truncate font-mono text-xs text-[var(--oo-muted)]">
                  {rowLabel(row.id, row.kind)}
                </div>
                <div className="relative h-10 border border-[var(--oo-border)] bg-[var(--oo-bg)]">
                  {(blocksByRow.get(row.id) ?? []).map((block) => {
                    const hasConflict =
                      block.conflictIds.some((id) => !resolved.includes(id)) &&
                      block.conflictIds.length > 0;
                    return (
                      <div
                        key={block.id}
                        title={`${block.label} · ${formatUtcShort(block.startUtc)}–${formatUtcShort(block.endUtc)}`}
                        className="absolute top-1 bottom-1 overflow-hidden px-1 text-[10px] leading-8 text-[#06120f]"
                        style={{
                          left: `${leftPct(block.startUtc)}%`,
                          width: `${Math.max(widthPct(block.startUtc, block.endUtc), 1.5)}%`,
                          background: blockColor(block.kind),
                          outline: hasConflict ? "2px solid var(--oo-danger)" : undefined,
                          opacity: resolved.some((id) => block.conflictIds.includes(id))
                            ? 0.45
                            : 1,
                        }}
                      >
                        {block.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Conflict management" title={`${openConflicts.length} open`}>
          {openConflicts.length === 0 ? (
            <div className="space-y-3 text-sm">
              <StatusBadge label="All clear" tone="ok" />
              <p>
                Proposed resolutions applied in demo mode: shift overlapping downlinks to Madrid /
                Svalbard.
              </p>
              <p className="text-[var(--oo-muted)]">
                Next: inspect{" "}
                <Link to="/satellites/DEMO-EOS-17" className="text-[var(--oo-accent)] hover:underline">
                  DEMO-EOS-17 power forecast
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {openConflicts.map((conflict) => (
                <li key={conflict.id} className="border border-[var(--oo-border)] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <StatusBadge label="Conflict detected" tone="danger" />
                    <button
                      type="button"
                      className="text-xs text-[var(--oo-accent)] hover:underline"
                      onClick={() => setResolved((prev) => [...prev, conflict.id])}
                    >
                      Apply suggestion
                    </button>
                  </div>
                  <p className="mt-2 text-sm font-medium">{conflict.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-[var(--oo-muted)]">
                    {conflict.resourceId}
                  </p>
                  <p className="mt-2 text-xs text-[var(--oo-muted)]">{conflict.suggestion}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </section>
  );
}
