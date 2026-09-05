import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Operations" },
  { to: "/satellites", label: "Satellites" },
  { to: "/missions", label: "Missions" },
  { to: "/schedule", label: "Schedule" },
  { to: "/conjunctions", label: "Conjunctions" },
] as const;

export function AppShell() {
  return (
    <div className="min-h-screen bg-[var(--oo-bg)] text-[var(--oo-fg)]">
      <header className="border-b border-[var(--oo-border)] bg-[var(--oo-panel)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-[var(--oo-accent)]">
              OrbitOps
            </p>
            <p className="text-xs text-[var(--oo-muted)]">
              Mission Planning · Orbital Operations · Constraints
            </p>
          </div>
          <nav className="flex flex-wrap gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  [
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-[var(--oo-accent-soft)] text-[var(--oo-accent)]"
                      : "text-[var(--oo-muted)] hover:text-[var(--oo-fg)]",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
