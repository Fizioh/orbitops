export function formatUtc(iso: string): string {
  const d = new Date(iso);
  return d.toISOString().replace("T", " ").replace(".000Z", " UTC");
}

export function formatUtcShort(iso: string): string {
  return iso.slice(11, 19) + " UTC";
}

export function formatDurationSec(durationSec: number): string {
  const m = Math.floor(durationSec / 60);
  const s = durationSec % 60;
  return `${m}m${String(s).padStart(2, "0")}s`;
}

export function formatKm(value: number, digits = 1): string {
  return `${value.toFixed(digits)} km`;
}

export function formatM(value: number, digits = 0): string {
  return `${value.toFixed(digits)} m`;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
