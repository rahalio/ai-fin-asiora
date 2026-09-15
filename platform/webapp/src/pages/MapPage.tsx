import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  api,
  Envelope,
  Initiative,
  IdeaIntake,
  ListData,
  OverlapCluster,
  Vertical,
} from "@/lib/api";

const verticals = [
  { key: "aiOps", label: "AI ops" },
  { key: "insurance", label: "Insurance" },
  { key: "assetManagement", label: "Asset management" },
  { key: "realEstate", label: "Real estate" },
] as const;

export function MapPage() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [intakes, setIntakes] = useState<IdeaIntake[]>([]);
  const [overlaps, setOverlaps] = useState<OverlapCluster[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [vertical, setVertical] = useState<Vertical>("insurance");

  async function load() {
    const [i, t, o] = await Promise.all([
      api.get<Envelope<ListData<Initiative>>>("/v1/initiatives"),
      api.get<Envelope<ListData<IdeaIntake>>>("/v1/intakes"),
      api.get<Envelope<ListData<OverlapCluster>>>("/v1/overlaps"),
    ]);
    setInitiatives(i.data.items);
    setIntakes(t.data.items);
    setOverlaps(o.data.items);
  }

  useEffect(() => {
    load().catch((e) => setError(String(e.message || e)));
  }, []);

  async function createInitiative(e: FormEvent) {
    e.preventDefault();
    await api.post("/v1/initiatives", {
      name,
      vertical,
      owner: "Group strategy",
    });
    setName("");
    await load();
  }

  const unpostured = useMemo(
    () =>
      initiatives.filter(
        (i) =>
          i.vertical === "insurance" &&
          (!i.insuranceScenario || i.insuranceScenario === "none"),
      ),
    [initiatives],
  );

  const slaBreaches = intakes.filter(
    (t) =>
      (t.status === "new" || t.status === "owned") &&
      t.slaDueAt &&
      new Date(t.slaDueAt).getTime() < Date.now(),
  );

  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between gap-4">
        <div>
          <div className="font-seal text-3xl text-[var(--teal-deep)]">Asiora map</div>
          <p className="text-sm text-[var(--muted)] mt-1">
            One composition across insurance, AM, RE, and AI — not four appendices.
          </p>
        </div>
        <div className="flex gap-2">
          <Link className="btn-ghost btn" to="/intakes">
            Intake queue
          </Link>
          <Link className="btn" to="/packs">
            Board pack
          </Link>
        </div>
      </header>

      {error ? <div className="panel text-[var(--coral)]">{error}</div> : null}

      <form className="panel grid gap-2 md:grid-cols-[1fr_180px_auto]" onSubmit={createInitiative}>
        <input
          className="input"
          placeholder="New initiative name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className="select"
          value={vertical}
          onChange={(e) => setVertical(e.target.value as Vertical)}
        >
          {verticals.map((v) => (
            <option key={v.key} value={v.key}>
              {v.label}
            </option>
          ))}
        </select>
        <button className="btn" type="submit">
          File initiative
        </button>
      </form>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="panel">
          <div className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Unpostured insurance
          </div>
          <div className="text-2xl font-semibold mt-1">{unpostured.length}</div>
          <span className="chip chip-coral mt-2">Needs scenario</span>
        </div>
        <div className="panel">
          <div className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Intake SLA breaches
          </div>
          <div className="text-2xl font-semibold mt-1">{slaBreaches.length}</div>
          <span className="chip chip-coral mt-2">Own or expire</span>
        </div>
        <div className="panel">
          <div className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Open overlaps
          </div>
          <div className="text-2xl font-semibold mt-1">
            {overlaps.filter((o) => o.status === "open").length}
          </div>
          <span className="chip chip-amber mt-2">Capital at risk</span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {verticals.map((v) => {
          const items = initiatives.filter((i) => i.vertical === v.key);
          return (
            <section key={v.key} className="panel">
              <h2 className="font-semibold text-[var(--teal-deep)]">{v.label}</h2>
              <p className="text-xs text-[var(--muted)] mb-3">{items.length} bets</p>
              <ul className="space-y-2">
                {items.length === 0 ? (
                  <li className="text-sm text-[var(--muted)]">No initiatives yet</li>
                ) : (
                  items.map((i) => (
                    <li key={i.id}>
                      <Link className="text-sm font-medium underline-offset-2 hover:underline" to={`/initiatives/${i.id}`}>
                        {i.name}
                      </Link>
                      <div className="mt-1 flex flex-wrap gap-1">
                        <span className="chip chip-teal">{i.status}</span>
                        {i.vertical === "insurance" &&
                        (!i.insuranceScenario || i.insuranceScenario === "none") ? (
                          <span className="chip chip-coral">unpostured</span>
                        ) : null}
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
