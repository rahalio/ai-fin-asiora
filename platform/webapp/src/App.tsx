import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { isAuthed } from "@/lib/api";
import { LoginPage } from "@/pages/LoginPage";
import { MapPage } from "@/pages/MapPage";
import { InitiativeDetailPage } from "@/pages/InitiativeDetailPage";
import { InsurancePage } from "@/pages/InsurancePage";
import { DiligencePage } from "@/pages/DiligencePage";
import { DataPlaysPage } from "@/pages/DataPlaysPage";
import { AlliancesPage } from "@/pages/AlliancesPage";
import { EthicsPage } from "@/pages/EthicsPage";
import { OverlapsPage } from "@/pages/OverlapsPage";
import { IntakesPage } from "@/pages/IntakesPage";
import { DecisionsPage } from "@/pages/DecisionsPage";
import { PacksPage } from "@/pages/PacksPage";

function RequireAuth({ children }: { children: ReactNode }) {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<MapPage />} />
        <Route path="initiatives/:initiativeId" element={<InitiativeDetailPage />} />
        <Route path="insurance" element={<InsurancePage />} />
        <Route path="diligence" element={<DiligencePage />} />
        <Route path="data-plays" element={<DataPlaysPage />} />
        <Route path="alliances" element={<AlliancesPage />} />
        <Route path="ethics" element={<EthicsPage />} />
        <Route path="overlaps" element={<OverlapsPage />} />
        <Route path="intakes" element={<IntakesPage />} />
        <Route path="decisions" element={<DecisionsPage />} />
        <Route path="packs" element={<PacksPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
