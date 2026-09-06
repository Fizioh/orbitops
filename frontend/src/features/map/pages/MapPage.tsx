import { Link } from "react-router-dom";

import { PageHeader, Panel, StatusBadge } from "@/components/ui/primitives";
import { groundStations, missions, satellites } from "@/mocks/demoData";

export function MapPage() {
  return (
    <section className="space-y-6 oo-fade-up">
      <PageHeader
        title="Global mission map"
        subtitle="Phase 1 placeholder for constellation situational awareness. Cesium Earth view lands in Phase 2."
      />

      <Panel eyebrow="Visualization" title="Constellation overview">
        <div className="relative h-[420px] overflow-hidden border border-[var(--oo-border)] bg-[#0a1018]">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, #1b3a4a 0%, #0a1018 55%), repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(39,51,65,0.5) 28px), repeating-linear-gradient(90deg, transparent, transparent 27px, rgba(39,51,65,0.5) 28px)",
            }}
          />
          <div className="absolute left-1/2 top-[55%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--oo-accent)]/30 bg-[var(--oo-accent)]/5" />
          {satellites.slice(0, 18).map((sat, idx) => {
            const angle = (idx / 18) * Math.PI * 2;
            const r = 28 + (idx % 4) * 8;
            const x = 50 + Math.cos(angle) * r;
            const y = 55 + Math.sin(angle) * (r * 0.45);
            return (
              <Link
                key={sat.id}
                to={`/satellites/${sat.id}`}
                className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--oo-accent)] shadow-[0_0_8px_rgba(61,184,160,0.8)] transition hover:scale-150"
                style={{ left: `${x}%`, top: `${y}%` }}
                title={sat.catalogId}
              />
            );
          })}
          {groundStations.map((gs, idx) => (
            <div
              key={gs.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${18 + idx * 11}%`,
                top: `${72 + (idx % 2) * 8}%`,
              }}
              title={gs.name}
            >
              <div
                className={`h-2.5 w-2.5 rotate-45 ${gs.status === "OPERATIONAL" ? "bg-[var(--oo-info)]" : "bg-[var(--oo-warn)]"}`}
              />
            </div>
          ))}
          <div className="absolute left-4 top-4 space-y-2">
            <StatusBadge label="Cesium pending · Phase 2" tone="warn" />
            <p className="max-w-xs text-xs text-[var(--oo-muted)]">
              Markers are schematic. Click a satellite node to open detail.
            </p>
          </div>
          <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 text-[11px] text-[var(--oo-muted)]">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[var(--oo-accent)]" /> Satellite
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rotate-45 bg-[var(--oo-info)]" /> Ground station
            </span>
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Active target">
          <p className="text-sm">Dubai · TASK-2917</p>
          <Link
            to="/missions/TASK-2917"
            className="mt-2 inline-block text-xs text-[var(--oo-accent)] hover:underline"
          >
            Open mission
          </Link>
        </Panel>
        <Panel title="Filters (mock)">
          <p className="text-xs text-[var(--oo-muted)]">
            Satellite · Orbit type · Mission · Ground station · Alert — wired in Phase 2 with live
            layers.
          </p>
        </Panel>
        <Panel title="Coverage">
          <p className="text-sm">{missions.length} tasked targets in demo seed</p>
          <p className="mt-1 text-xs text-[var(--oo-muted)]">
            Footprints render with Cesium coverage polygons later.
          </p>
        </Panel>
      </div>
    </section>
  );
}
