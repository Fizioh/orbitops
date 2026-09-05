import { useQuery } from "@tanstack/react-query";

import { fetchHealth } from "@/features/operations/api/health";

export function DashboardPage() {
  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
  });

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Mission Control
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--oo-muted)]">
          Foundation shell for constellation operations. Domain logic stays on
          the API; this UI wires workflows, explainability, and situational
          awareness.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active satellites", value: "—" },
          { label: "Ground stations", value: "—" },
          { label: "Contacts today", value: "—" },
          { label: "Schedule conflicts", value: "—" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="border border-[var(--oo-border)] bg-[var(--oo-panel)] px-4 py-5"
          >
            <p className="text-xs uppercase tracking-wide text-[var(--oo-muted)]">
              {kpi.label}
            </p>
            <p className="mt-2 font-mono text-2xl">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="border border-[var(--oo-border)] bg-[var(--oo-panel)] px-4 py-4 text-sm">
        <p className="text-[var(--oo-muted)]">API health</p>
        {healthQuery.isLoading && <p className="mt-1 font-mono">Checking…</p>}
        {healthQuery.isError && (
          <p className="mt-1 font-mono text-[var(--oo-danger)]">
            unreachable (start docker compose)
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
