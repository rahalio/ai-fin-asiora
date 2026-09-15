import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  api,
  Envelope,
  Initiative,
  ListData,
  ScenarioPosture,
} from "@/lib/api";

const scenarios = [
  "channel",
  "machineUw",
  "flexibleProduct",
  "ezLife",
  "hybrid",
] as const;

export function InsurancePage() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [postures, setPostures] = useState<ScenarioPosture[]>([]);
  const [selected, setSelected] = useState("");
  const [scenario, setScenario] = useState<(typeof scenarios)[number]>("channel");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const [i, p] = await Promise.all([
      api.get<Envelope<ListData<Initiative>>>("/v1/initiatives?vertical=insurance"),
      api.get<Envelope<ListData<ScenarioPosture>>>("/v1/scenarios"),
    ]);
    setInitiatives(i.data.items);
    setPostures(p.data.items);
    if (!selected && i.data.items[0]) setSelected(i.data.items[0].id);
  }

  useEffect(() => {
    load().catch((e) => setError(String(e.message || e)));
  }, []);

  const unpostured = useMemo(
    () =>
      initiatives.filter(
        (i) => !i.insuranceScenario || i.insuranceScenario === "none",
      ),
    [initiatives],
  );

  async function setPosture(e: FormEvent) {
    e.preventDefault();
    await api.put(`/v1/initiatives/${selected}/scenario`, {
      insuranceScenario: scenario,
      rationale: "Asiora board posture",
    });
    await load();
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="font-seal text-3xl text-[var(--teal-deep)]">
          Insurance postures
        </div>
        <p className="text-sm text-[var(--muted)]">
          Force channel / machine-UW / flexible / E-Z life / hybrid — no generic “digital.”
        </p>
      </header>
      {error ? <div className="panel text-[var(--coral)]">{error}</div> : null}

      <div className="panel">
        <span className="chip chip-coral">{unpostured.length} unpostured</span>
        <ul className="mt-3 space-y-2">
          {unpostured.map((i) => (
            <li key={i.id}>
              <Link to={`/initiatives/${i.id}`} className="font-medium">
                {i.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <form className="panel space-y-3" onSubmit={setPosture}>
        <h2 className="font-semibold">Assign posture</h2>
        <select className="select" value={selected} onChange={(e) => setSelected(e.target.value)}>
          {initiatives.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
        <select
          className="select"
          value={scenario}
          onChange={(e) => setScenario(e.target.value as (typeof scenarios)[number])}
        >
          {scenarios.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className="btn" type="submit">
          Set posture
        </button>
      </form>

      <div className="panel">
        <h2 className="font-semibold mb-2">Recorded postures</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Initiative</th>
              <th>Scenario</th>
            </tr>
          </thead>
          <tbody>
            {postures.map((p) => (
              <tr key={p.id}>
                <td>{p.initiativeId}</td>
                <td>
                  <span className="chip chip-teal">{p.insuranceScenario}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
