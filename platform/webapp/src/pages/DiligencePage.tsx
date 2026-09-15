import { FormEvent, useEffect, useState } from "react";
import {
  api,
  DiligenceChecklist,
  Envelope,
  Initiative,
  ListData,
} from "@/lib/api";

export function DiligencePage() {
  const [items, setItems] = useState<DiligenceChecklist[]>([]);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [initiativeId, setInitiativeId] = useState("");
  const [complete, setComplete] = useState(true);
  const [risk, setRisk] = useState("medium");

  async function load() {
    const [d, i] = await Promise.all([
      api.get<Envelope<ListData<DiligenceChecklist>>>("/v1/diligence"),
      api.get<Envelope<ListData<Initiative>>>(
        "/v1/initiatives?vertical=assetManagement",
      ),
    ]);
    setItems(d.data.items);
    setInitiatives(i.data.items);
    if (!initiativeId && i.data.items[0]) setInitiativeId(i.data.items[0].id);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function upsert(e: FormEvent) {
    e.preventDefault();
    await api.put(`/v1/initiatives/${initiativeId}/diligence`, {
      diligenceComplete: complete,
      integrationRisk: risk,
      processReady: complete,
      controlsReady: complete,
      dataReady: complete,
      metricsReady: complete,
      talentReady: complete,
      orgReady: complete,
    });
    await load();
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="font-seal text-3xl text-[var(--teal-deep)]">AM diligence</div>
        <p className="text-sm text-[var(--muted)]">
          Diligence and integration checklists before scale funding (BR-3).
        </p>
      </header>

      <form className="panel space-y-3" onSubmit={upsert}>
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
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={complete}
            onChange={(e) => setComplete(e.target.checked)}
          />
          Diligence complete
        </label>
        <select className="select" value={risk} onChange={(e) => setRisk(e.target.value)}>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <button className="btn" type="submit">
          Save checklist
        </button>
      </form>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Initiative</th>
              <th>Complete</th>
              <th>Integration risk</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>{i.initiativeId}</td>
                <td>
                  {i.diligenceComplete ? (
                    <span className="chip chip-teal">ready</span>
                  ) : (
                    <span className="chip chip-coral">blocked for scale</span>
                  )}
                </td>
                <td>{i.integrationRisk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
