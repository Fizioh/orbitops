import { Navigate, Route, Routes } from "react-router-dom";

import { AppShell } from "@/components/layout/AppShell";
import { ConjunctionDetailPage } from "@/features/conjunctions/pages/ConjunctionDetailPage";
import { ConjunctionsPage } from "@/features/conjunctions/pages/ConjunctionsPage";
import { MapPage } from "@/features/map/pages/MapPage";
import { MissionDetailPage } from "@/features/missions/pages/MissionDetailPage";
import { MissionsPage } from "@/features/missions/pages/MissionsPage";
import { DashboardPage } from "@/features/operations/pages/DashboardPage";
import { SatelliteDetailPage } from "@/features/satellites/pages/SatelliteDetailPage";
import { SatellitesPage } from "@/features/satellites/pages/SatellitesPage";
import { SchedulePage } from "@/features/schedule/pages/SchedulePage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="satellites" element={<SatellitesPage />} />
        <Route path="satellites/:satelliteId" element={<SatelliteDetailPage />} />
        <Route path="missions" element={<MissionsPage />} />
        <Route path="missions/:missionId" element={<MissionDetailPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="conjunctions" element={<ConjunctionsPage />} />
        <Route path="conjunctions/:conjunctionId" element={<ConjunctionDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
