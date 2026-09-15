import { FormEvent, useEffect, useState } from "react";
import {
  api,
  DataPlay,
  Envelope,
  Initiative,
  ListData,
} from "@/lib/api";

export function DataPlaysPage() {
  const [plays, setPlays] = useState<DataPlay[]>([]);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [name, setName] = useState("");
  const [initiativeId, setInitiativeId] = useState("");
  const [country, setCountry] = useState("SG");
  const [localisationOk, setLocalisationOk] = useState(true);

  async function load() {
    const [p, i] = await Promise.all([
      api.get<Envelope<ListData<DataPlay>>>("/v1/data-plays"),
      api.get<Envelope<ListData<Initiative>>>("/v1/initiatives?vertical=realEstate"),
    ]);
    setPlays(p.data.items);
    setInitiatives(i.data.items);
    if (!initiativeId && i.data.items[0]) setInitiativeId(i.data.items[0].id);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    await api.post("/v1/data-plays", {
      name,
      initiativeId,
      dataSources: ["property IoT anonymised aggregates"],
      monetisationHypothesis: "Cross-sell only where consent allows",
      crossSellAllowed: localisationOk,
      countryConstraints: [
        {
          country,
          localisationOk,
          consentBasis: localisationOk ? "local consent + residency" : "pending",
        },
      ],
    });
    setName("");
    await load();
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="font-seal text-3xl text-[var(--teal-deep)]">RE data plays</div>
        <p className="text-sm text-[var(--muted)]">
          Sources, consent/localisation by market, monetisation hypothesis (BR-4).
        </p>
      </header>

      <form className="panel space-y-3" onSubmit={create}>
        <input
          className="input"
          placeholder="Play name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className="select"
          value={initiativeId}
          onChange={(e) => setInitiativeId(e.target.value)}
        >
          {initiatives.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <input
            className="input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={localisationOk}
              onChange={(e) => setLocalisationOk(e.target.checked)}
            />
            Localisation OK
          </label>
        </div>
        <button className="btn" type="submit">
          Register play
        </button>
      </form>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Play</th>
              <th>Countries</th>
              <th>Cross-sell</th>
            </tr>
          </thead>
          <tbody>
            {plays.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>
                  {(p.countryConstraints || []).map((c) => (
                    <span
                      key={c.country}
                      className={`chip mr-1 ${c.localisationOk ? "chip-teal" : "chip-amber"}`}
                    >
                      {c.country}
                    </span>
                  ))}
                </td>
                <td>{p.crossSellAllowed ? "allowed" : "blocked"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
