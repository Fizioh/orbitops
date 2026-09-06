import { NavLink, Outlet } from "react-router-dom";

import { StatusBadge } from "@/components/ui/primitives";
import { kpis } from "@/mocks/demoData";
import { cx } from "@/shared/lib/format";

const navItems = [
  { to: "/", label: "Operations" },
  { to: "/map", label: "Map" },
  { to: "/satellites", label: "Satellites" },
  { to: "/missions", label: "Missions" },
  { to: "/schedule", label: "Schedule" },
  { to: "/conjunctions", label: "Conjunctions" },
] as const;

export function AppShell() {
  return (
    <div className="min-h-screen text-[var(--oo-fg)]">
      <header className="sticky top-0 z-20 border-b border-[var(--oo-border)] bg-[var(--oo-panel)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-3">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-display text-xl font-semibold tracking-tight text-[var(--oo-accent)]">
                OrbitOps
              </p>
              <p className="text-[11px] text-[var(--oo-muted)]">
                Mission Planning · Orbital Operations · Constraints
              </p>
            </div>
            <StatusBadge label="DEMO DATA" tone="accent" />
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span className="inline-flex items-center gap-2 text-xs text-[var(--oo-muted)]">
              <span className="oo-live-dot h-1.5 w-1.5 rounded-full bg-[var(--oo-ok)]" />
              {kpis.activeSatellites} active · {kpis.highRiskConjunctions} high-risk conj.
            </span>
          </div>
          <nav className="flex flex-wrap gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cx(
                    "px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-[var(--oo-accent-soft)] text-[var(--oo-accent)]"
                      : "text-[var(--oo-muted)] hover:text-[var(--oo-fg)]",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
