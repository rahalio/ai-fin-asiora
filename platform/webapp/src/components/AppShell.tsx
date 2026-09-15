import { NavLink, Outlet } from "react-router-dom";
import { clearSession } from "@/lib/api";

const links = [
  { to: "/", label: "Multi-vertical map", end: true },
  { to: "/insurance", label: "Insurance postures" },
  { to: "/diligence", label: "AM diligence" },
  { to: "/data-plays", label: "RE data plays" },
  { to: "/alliances", label: "Alliances & talent" },
  { to: "/ethics", label: "Ethics gates" },
  { to: "/overlaps", label: "Overlap clusters" },
  { to: "/intakes", label: "Festival intake" },
  { to: "/decisions", label: "Funding ledger" },
  { to: "/packs", label: "Board packs" },
];

export function AppShell() {
  return (
    <div className="asiora-shell">
      <aside className="asiora-nav">
        <div>
          <div className="font-seal text-2xl tracking-wide">Asiora</div>
          <div className="mt-1 text-xs opacity-75">SEA portfolio seal</div>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="btn-ghost"
          style={{ color: "#f5f0e8", borderColor: "rgba(245,240,232,0.3)" }}
          onClick={() => {
            clearSession();
            window.location.href = "/login";
          }}
        >
          Sign out
        </button>
      </aside>
      <main className="asiora-main">
        <Outlet />
      </main>
    </div>
  );
}
