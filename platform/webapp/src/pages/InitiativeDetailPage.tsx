import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, Envelope, Initiative } from "@/lib/api";

export function InitiativeDetailPage() {
  const { initiativeId = "" } = useParams();
  const [item, setItem] = useState<Initiative | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [governanceMode, setGovernanceMode] = useState("consortium");
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    const res = await api.get<Envelope<Initiative>>(`/v1/initiatives/${initiativeId}`);
    setItem(res.data);
    setGovernanceMode((res.data.governanceMode as string) || "consortium");
  }

  useEffect(() => {
    load().catch((e) => setError(String(e.message || e)));
  }, [initiativeId]);

  async function saveGovernance(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    await api.patch(`/v1/initiatives/${initiativeId}`, {
      governanceMode,
      consortiumNotes:
        governanceMode === "consortium"
          ? "Consortium governance attached"
          : "Labelled unilateral",
    });
    await load();
    setMsg("Governance updated");
  }

  if (error) return <div className="panel text-[var(--coral)]">{error}</div>;
  if (!item) return <div className="panel">Loading…</div>;

  return (
    <div className="space-y-4">
      <Link to="/" className="text-sm text-[var(--teal)]">
        ← Back to map
      </Link>
      <header className="panel">
        <div className="font-seal text-3xl text-[var(--teal-deep)]">{item.name}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="chip chip-teal">{item.vertical}</span>
          <span className="chip chip-teal">{item.status}</span>
          {item.vertical === "insurance" &&
          (!item.insuranceScenario || item.insuranceScenario === "none") ? (
            <span className="chip chip-coral">unpostured</span>
          ) : (
            <span className="chip chip-teal">{item.insuranceScenario}</span>
          )}
        </div>
        <p className="text-sm text-[var(--muted)] mt-3">
          Owner: {item.owner || "unassigned"} · Countries:{" "}
          {(item.countries || []).join(", ") || "—"}
        </p>
      </header>

      <form className="panel space-y-3" onSubmit={saveGovernance}>
        <h2 className="font-semibold">Collective-solution labeling (BR-8)</h2>
        <select
          className="select"
          value={governanceMode}
          onChange={(e) => setGovernanceMode(e.target.value)}
        >
          <option value="consortium">Consortium</option>
          <option value="unilateral">Unilateral</option>
          <option value="unset">Unset</option>
        </select>
        <button className="btn" type="submit">
          Save governance
        </button>
        {msg ? <p className="text-sm text-[var(--teal)]">{msg}</p> : null}
      </form>
    </div>
  );
}
