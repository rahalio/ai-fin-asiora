import { FormEvent, useEffect, useState } from "react";
import { api, Envelope, FundingDecision, ListData } from "@/lib/api";

export function DecisionsPage() {
  const [items, setItems] = useState<FundingDecision[]>([]);
  const [initiativeId, setInitiativeId] = useState("");
  const [outcome, setOutcome] = useState("fund");
  const [rationale, setRationale] = useState("");

  async function load() {
    const res = await api.get<Envelope<ListData<FundingDecision>>>("/v1/decisions");
    setItems(res.data.items);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function record(e: FormEvent) {
    e.preventDefault();
    await api.post("/v1/decisions", { initiativeId, outcome, rationale });
    setRationale("");
    await load();
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="font-seal text-3xl text-[var(--teal-deep)]">Funding ledger</div>
        <p className="text-sm text-[var(--muted)]">
          Immutable fund / kill / scale stamps across verticals.
        </p>
      </header>

      <form className="panel space-y-3" onSubmit={record}>
        <input
          className="input"
          placeholder="Initiative id"
          value={initiativeId}
          onChange={(e) => setInitiativeId(e.target.value)}
          required
        />
        <select className="select" value={outcome} onChange={(e) => setOutcome(e.target.value)}>
          <option value="fund">fund</option>
          <option value="kill">kill</option>
          <option value="scale">scale</option>
          <option value="pause">pause</option>
        </select>
        <input
          className="input"
          placeholder="Rationale"
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
        />
        <button className="btn" type="submit">
          Stamp decision
        </button>
      </form>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Decision</th>
              <th>Outcome</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id}>
                <td>
                  <div className="text-sm">{d.initiativeId}</div>
                  <div className="text-xs text-[var(--muted)]">{d.rationale}</div>
                </td>
                <td>
                  <span className="stamp">{d.outcome}</span>
                </td>
                <td className="text-xs">{d.decidedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
