import type { ReactNode } from "react";

import { cx } from "@/shared/lib/format";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm text-[var(--oo-muted)]">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

interface PanelProps {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export function Panel({ title, eyebrow, children, className, actions }: PanelProps) {
  return (
    <section
      className={cx(
        "border border-[var(--oo-border)] bg-[var(--oo-panel)]",
        className,
      )}
    >
      {(title || eyebrow || actions) && (
        <div className="flex items-start justify-between gap-3 border-b border-[var(--oo-border)] px-4 py-3">
          <div>
            {eyebrow ? (
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--oo-muted)]">
                {eyebrow}
              </p>
            ) : null}
            {title ? <h2 className="text-sm font-medium">{title}</h2> : null}
          </div>
          {actions}
        </div>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

interface MetricProps {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "ok" | "warn" | "danger";
}

export function Metric({ label, value, hint, tone = "default" }: MetricProps) {
  const toneClass =
    tone === "ok"
      ? "text-[var(--oo-ok)]"
      : tone === "warn"
        ? "text-[var(--oo-warn)]"
        : tone === "danger"
          ? "text-[var(--oo-danger)]"
          : "text-[var(--oo-fg)]";

  return (
    <div className="border border-[var(--oo-border)] bg-[var(--oo-panel)] px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--oo-muted)]">{label}</p>
      <p className={cx("mt-2 font-mono text-2xl tabular-nums", toneClass)}>{value}</p>
      {hint ? <p className="mt-1 text-xs text-[var(--oo-muted)]">{hint}</p> : null}
    </div>
  );
}

interface StatusBadgeProps {
  label: string;
  tone?: "neutral" | "ok" | "warn" | "danger" | "accent";
}

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  const styles: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
    neutral: "border-[var(--oo-border)] text-[var(--oo-muted)]",
    ok: "border-[var(--oo-ok)]/40 text-[var(--oo-ok)] bg-[var(--oo-ok)]/10",
    warn: "border-[var(--oo-warn)]/40 text-[var(--oo-warn)] bg-[var(--oo-warn)]/10",
    danger: "border-[var(--oo-danger)]/40 text-[var(--oo-danger)] bg-[var(--oo-danger)]/10",
    accent: "border-[var(--oo-accent)]/40 text-[var(--oo-accent)] bg-[var(--oo-accent-soft)]",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide",
        styles[tone],
      )}
    >
      {label}
    </span>
  );
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[var(--oo-accent)] text-[#06120f] hover:brightness-110"
      : variant === "danger"
        ? "border border-[var(--oo-danger)] text-[var(--oo-danger)] hover:bg-[var(--oo-danger)]/10"
        : "border border-[var(--oo-border)] text-[var(--oo-fg)] hover:bg-white/5";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40",
        styles,
      )}
    >
      {children}
    </button>
  );
}

interface EmptyStateProps {
  title: string;
  detail?: string;
}

export function EmptyState({ title, detail }: EmptyStateProps) {
  return (
    <div className="border border-dashed border-[var(--oo-border)] px-4 py-10 text-center">
      <p className="text-sm font-medium">{title}</p>
      {detail ? <p className="mt-1 text-xs text-[var(--oo-muted)]">{detail}</p> : null}
    </div>
  );
}

interface KeyValueProps {
  items: Array<{ label: string; value: ReactNode }>;
}

export function KeyValue({ items }: KeyValueProps) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-[var(--oo-muted)]">
            {item.label}
          </dt>
          <dd className="mt-1 font-mono text-sm">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
