import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Metric, PageHeader, Panel, StatusBadge } from "@/components/ui/primitives";
import { fetchHealth } from "@/features/operations/api/health";
import { alerts, kpis, opsEvents } from "@/mocks/demoData";
import { formatUtcShort } from "@/shared/lib/format";

function severityTone(severity: string): "ok" | "warn" | "danger" | "neutral" {
  if (severity === "HIGH") return "danger";
  if (severity === "MEDIUM") return "warn";
  return "neutral";
}

export function DashboardPage() {
  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
    retry: false,
  });

  return (
    <section className="space-y-6 oo-fade-up">
      <PageHeader
        title="Mission Control"
        subtitle="Live operational picture for the DEMO constellation. Cesium and charts come later — constraints and workflows are the product."
        actions={
          <div className="text-right text-xs text-[var(--oo-muted)]">
            <p>Demo epoch</p>
            <p className="font-mono text-[var(--oo-fg)]">2026-09-05 14:30 UTC</p>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 oo-fade-up-delay-1">
        <Metric label="Active satellites" value={kpis.activeSatellites} hint="of 24 in constellation" />
        <Metric
          label="Ground stations online"
          value={kpis.groundStationsOnline}
          hint="1 in maintenance"
          tone="ok"
        />
        <Metric label="Contacts today" value={kpis.contactsToday} />
        <Metric label="Imaging tasks" value={kpis.imagingTasks} />
        <Metric
          label="Schedule conflicts"
          value={kpis.scheduleConflicts}
          tone="warn"
          hint="Open scheduler to resolve"
        />
        <Metric label="Power alerts" value={kpis.powerAlerts} tone="danger" />
        <Metric
          label="High-risk conjunctions"
          value={kpis.highRiskConjunctions}
          tone="danger"
          hint="CONJ-00418"
        />
        <Metric label="Telemetry anomalies" value={kpis.telemetryAnomalies} tone="warn" />
      </div>

      <div className="grid gap-4 lg:grid-cols-5 oo-fade-up-delay-2">
        <Panel
          className="lg:col-span-3"
          eyebrow="Alert center"
          title="Requires operator attention"
          actions={
            <Link to="/schedule" className="text-xs text-[var(--oo-accent)] hover:underline">
              Resolve conflicts →
            </Link>
          }
        >
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--oo-border)] pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge label={alert.severity} tone={severityTone(alert.severity)} />
                    <StatusBadge label={alert.kind.replaceAll("_", " ")} tone="neutral" />
                  </div>
                  <p className="mt-2 text-sm font-medium">{alert.title}</p>
                  <p className="mt-1 text-xs text-[var(--oo-muted)]">{alert.detail}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[11px] text-[var(--oo-muted)]">
                    {formatUtcShort(alert.createdAtUtc)}
                  </p>
                  {alert.relatedId ? (
                    <Link
                      to={
                        alert.kind === "conjunction_warning"
                          ? `/conjunctions/${alert.relatedId}`
                          : alert.kind === "schedule_conflict"
                            ? "/schedule"
                            : alert.relatedId.startsWith("DEMO-")
                              ? `/satellites/${alert.relatedId}`
                              : "/missions/TASK-2917"
                      }
                      className="mt-2 inline-block text-xs text-[var(--oo-accent)] hover:underline"
                    >
                      Open
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="lg:col-span-2" eyebrow="Event timeline" title="System events">
          <ol className="space-y-3">
            {opsEvents.map((event) => (
              <li key={event.id} className="grid grid-cols-[auto_1fr] gap-3">
                <span className="font-mono text-[11px] text-[var(--oo-muted)]">
                  {formatUtcShort(event.atUtc).slice(0, 8)}
                </span>
                <span className="text-sm">{event.message}</span>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <Panel eyebrow="Demo path" title="Recruiter walkthrough">
        <div className="grid gap-3 md:grid-cols-3">
          <Link
            to="/missions/TASK-2917"
            className="border border-[var(--oo-border)] bg-[var(--oo-panel-2)] p-4 transition hover:border-[var(--oo-accent)]"
          >
            <p className="font-mono text-xs text-[var(--oo-accent)]">01</p>
            <p className="mt-2 text-sm font-medium">Open TASK-2917 (Dubai)</p>
            <p className="mt-1 text-xs text-[var(--oo-muted)]">
              5 candidates · DEMO-EOS-17 score 94
            </p>
          </Link>
          <Link
            to="/schedule"
            className="border border-[var(--oo-border)] bg-[var(--oo-panel-2)] p-4 transition hover:border-[var(--oo-accent)]"
          >
            <p className="font-mono text-xs text-[var(--oo-accent)]">02</p>
            <p className="mt-2 text-sm font-medium">Resolve schedule conflicts</p>
            <p className="mt-1 text-xs text-[var(--oo-muted)]">
              Shift downlink to Madrid
            </p>
          </Link>
          <Link
            to="/conjunctions/CONJ-00418"
            className="border border-[var(--oo-border)] bg-[var(--oo-panel-2)] p-4 transition hover:border-[var(--oo-accent)]"
          >
            <p className="font-mono text-xs text-[var(--oo-accent)]">03</p>
            <p className="mt-2 text-sm font-medium">Inspect CONJ-00418</p>
            <p className="mt-1 text-xs text-[var(--oo-muted)]">
              Simulate maneuver · 184 m → 2.8 km
            </p>
          </Link>
        </div>
      </Panel>

      <div className="border border-[var(--oo-border)] bg-[var(--oo-panel)] px-4 py-3 text-sm">
        <p className="text-[var(--oo-muted)]">API health</p>
        {healthQuery.isLoading && <p className="mt-1 font-mono">Checking…</p>}
        {healthQuery.isError && (
          <p className="mt-1 font-mono text-[var(--oo-warn)]">
            offline — UI runs on mock demo data
          </p>
        )}
        {healthQuery.data && (
          <p className="mt-1 font-mono text-[var(--oo-ok)]">
            {healthQuery.data.status} · demo={String(healthQuery.data.demo_mode)}
          </p>
        )}
      </div>
    </section>
  );
}
