import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactECharts from "echarts-for-react";

import {
  EmptyState,
  KeyValue,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/ui/primitives";
import {
  getGroundStation,
  getSatellite,
  passesForSatellite,
  powerForecastForSatellite,
  telemetryForSatellite,
} from "@/mocks/demoData";
import { formatDurationSec, formatKm, formatUtc, formatUtcShort } from "@/shared/lib/format";

const tabs = [
  "Overview",
  "Orbit",
  "Schedule",
  "Telemetry",
  "Power",
  "Missions",
  "Conjunctions",
  "History",
] as const;

type Tab = (typeof tabs)[number];

export function SatelliteDetailPage() {
  const { satelliteId = "" } = useParams();
  const satellite = getSatellite(satelliteId);
  const [tab, setTab] = useState<Tab>("Overview");

  const passes = useMemo(
    () => (satellite ? passesForSatellite(satellite.id) : []),
    [satellite],
  );
  const telemetry = useMemo(
    () => (satellite ? telemetryForSatellite(satellite.id) : []),
    [satellite],
  );
  const power = useMemo(
    () => (satellite ? powerForecastForSatellite(satellite.id) : []),
    [satellite],
  );

  if (!satellite) {
    return (
      <EmptyState
        title="Satellite not found"
        detail={`No demo satellite matches “${satelliteId}”.`}
      />
    );
  }

  const nextStation = satellite.nextContactStationId
    ? getGroundStation(satellite.nextContactStationId)
    : undefined;

  const batteryOption = {
    backgroundColor: "transparent",
    grid: { left: 40, right: 16, top: 24, bottom: 28 },
    xAxis: {
      type: "category",
      data: power.map((p) => p.atUtc.slice(11, 16)),
      axisLabel: { color: "#8b9aab", fontSize: 10 },
      axisLine: { lineStyle: { color: "#273341" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLabel: { color: "#8b9aab", formatter: "{value}%" },
      splitLine: { lineStyle: { color: "#273341" } },
    },
    series: [
      {
        type: "line",
        data: power.map((p) => p.batteryPct),
        smooth: true,
        showSymbol: false,
        lineStyle: { color: "#3db8a0", width: 2 },
        areaStyle: { color: "rgba(61,184,160,0.15)" },
        markArea: {
          itemStyle: { color: "rgba(224,122,106,0.08)" },
          data: power
            .map((p, idx) =>
              !p.inSunlight
                ? [{ xAxis: power[idx]?.atUtc.slice(11, 16) }, { xAxis: power[idx + 1]?.atUtc.slice(11, 16) }]
                : null,
            )
            .filter(Boolean),
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: (params: Array<{ dataIndex: number; value: number }>) => {
        const point = power[params[0]?.dataIndex ?? 0];
        if (!point) return "";
        return `${formatUtcShort(point.atUtc)}<br/>Battery ${point.batteryPct}%<br/>${point.inSunlight ? "Sunlight" : "Eclipse"}${point.eventLabel ? `<br/>${point.eventLabel}` : ""}`;
      },
    },
  };

  const telemetryOption = {
    backgroundColor: "transparent",
    legend: { textStyle: { color: "#8b9aab" }, top: 0 },
    grid: { left: 40, right: 16, top: 36, bottom: 28 },
    xAxis: {
      type: "category",
      data: telemetry.map((t) => t.capturedAtUtc.slice(11, 16)),
      axisLabel: { color: "#8b9aab", fontSize: 10 },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#8b9aab" },
      splitLine: { lineStyle: { color: "#273341" } },
    },
    series: [
      {
        name: "Battery %",
        type: "line",
        data: telemetry.map((t) => t.batteryPct),
        showSymbol: false,
        color: "#3db8a0",
      },
      {
        name: "Temp °C",
        type: "line",
        data: telemetry.map((t) => t.temperatureC),
        showSymbol: false,
        color: "#d4a24c",
      },
      {
        name: "Storage GB",
        type: "line",
        data: telemetry.map((t) => t.storageUsedGb),
        showSymbol: false,
        color: "#6aa6d8",
      },
    ],
    tooltip: { trigger: "axis" },
  };

  return (
    <section className="space-y-6 oo-fade-up">
      <PageHeader
        title={satellite.catalogId}
        subtitle={`${satellite.name} · ${satellite.satelliteType.replaceAll("_", " ")} · ${satellite.orbitRegime}`}
        actions={
          <Link to="/satellites" className="text-sm text-[var(--oo-muted)] hover:text-[var(--oo-fg)]">
            ← Fleet
          </Link>
        }
      />

      <div className="flex flex-wrap gap-2">
        <StatusBadge
          label={satellite.operationalStatus}
          tone={
            satellite.operationalStatus === "ACTIVE"
              ? "ok"
              : satellite.operationalStatus === "DEGRADED"
                ? "warn"
                : "neutral"
          }
        />
        <StatusBadge label={satellite.payload} tone="accent" />
        <StatusBadge label={`Battery ${satellite.batteryPct}%`} tone={satellite.batteryPct < 30 ? "danger" : "neutral"} />
      </div>

      <div className="flex flex-wrap gap-1 border-b border-[var(--oo-border)] pb-px">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={
              tab === item
                ? "border-b-2 border-[var(--oo-accent)] px-3 py-2 text-sm text-[var(--oo-accent)]"
                : "px-3 py-2 text-sm text-[var(--oo-muted)] hover:text-[var(--oo-fg)]"
            }
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Current state">
            <KeyValue
              items={[
                { label: "Latitude", value: `${satellite.latitudeDeg.toFixed(2)}°` },
                { label: "Longitude", value: `${satellite.longitudeDeg.toFixed(2)}°` },
                { label: "Altitude", value: formatKm(satellite.altitudeKm) },
                { label: "Velocity", value: `${satellite.velocityKmS.toFixed(2)} km/s` },
                { label: "Inclination", value: `${satellite.inclinationDeg.toFixed(1)}°` },
                {
                  label: "Storage",
                  value: `${satellite.storageUsedGb} / ${satellite.storageCapacityGb} GB`,
                },
              ]}
            />
          </Panel>
          <Panel title="Next operations">
            <KeyValue
              items={[
                {
                  label: "Next ground contact",
                  value: nextStation
                    ? `${nextStation.name} · ${satellite.nextContactAosUtc ? formatUtc(satellite.nextContactAosUtc) : "—"}`
                    : "—",
                },
                {
                  label: "Next mission",
                  value: satellite.nextMissionId ? (
                    <Link
                      className="text-[var(--oo-accent)] hover:underline"
                      to={`/missions/${satellite.nextMissionId}`}
                    >
                      {satellite.nextMissionId}
                    </Link>
                  ) : (
                    "—"
                  ),
                },
                {
                  label: "Alerts",
                  value:
                    satellite.id === "DEMO-EOS-08"
                      ? "Power threshold · Payload temperature"
                      : "None",
                },
              ]}
            />
          </Panel>
        </div>
      )}

      {tab === "Orbit" && (
        <Panel title="Orbit summary" eyebrow="Mock geometry">
          <KeyValue
            items={[
              { label: "Regime", value: satellite.orbitRegime },
              { label: "Altitude", value: formatKm(satellite.altitudeKm) },
              { label: "Inclination", value: `${satellite.inclinationDeg.toFixed(1)}°` },
              { label: "Ground track", value: "Available in Phase 2 Cesium view" },
            ]}
          />
          <div className="mt-4">
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[var(--oo-muted)]">
              Upcoming passes
            </p>
            {passes.length === 0 ? (
              <p className="text-sm text-[var(--oo-muted)]">No seeded passes for this satellite.</p>
            ) : (
              <ul className="space-y-2">
                {passes.map((pass) => {
                  const gs = getGroundStation(pass.groundStationId);
                  return (
                    <li
                      key={pass.id}
                      className="flex flex-wrap justify-between gap-2 border border-[var(--oo-border)] px-3 py-2 text-sm"
                    >
                      <span>{gs?.name ?? pass.groundStationId}</span>
                      <span className="font-mono text-xs text-[var(--oo-muted)]">
                        AOS {formatUtcShort(pass.aosUtc)} · LOS {formatUtcShort(pass.losUtc)} ·{" "}
                        {formatDurationSec(pass.durationSec)} · max el {pass.maxElevationDeg}°
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Panel>
      )}

      {tab === "Telemetry" && (
        <Panel title="Telemetry (24h mock)" eyebrow="Simulated">
          <ReactECharts option={telemetryOption} style={{ height: 320 }} />
        </Panel>
      )}

      {tab === "Power" && (
        <Panel title="Battery forecast (24h)" eyebrow="Sunlight / eclipse / ops">
          <ReactECharts option={batteryOption} style={{ height: 320 }} />
          <p className="mt-2 text-xs text-[var(--oo-muted)]">
            Shaded regions approximate eclipse. Event markers appear in tooltip when missions or
            downlinks draw power.
          </p>
        </Panel>
      )}

      {(tab === "Schedule" ||
        tab === "Missions" ||
        tab === "Conjunctions" ||
        tab === "History") && (
        <Panel title={tab}>
          <p className="text-sm text-[var(--oo-muted)]">
            Detailed {tab.toLowerCase()} for {satellite.catalogId} wires to shared schedule /
            mission / conjunction views in this demo. Use the global navigation for the full
            operational surfaces.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link to="/schedule" className="text-[var(--oo-accent)] hover:underline">
              Open schedule
            </Link>
            <Link to="/missions" className="text-[var(--oo-accent)] hover:underline">
              Open missions
            </Link>
            <Link to="/conjunctions" className="text-[var(--oo-accent)] hover:underline">
              Open conjunctions
            </Link>
          </div>
        </Panel>
      )}
    </section>
  );
}
