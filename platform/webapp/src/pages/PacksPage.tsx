import { FormEvent, useEffect, useState } from "react";
import { api, BoardPack, Envelope, ListData } from "@/lib/api";

export function PacksPage() {
  const [items, setItems] = useState<BoardPack[]>([]);
  const [periodLabel, setPeriodLabel] = useState("SEA ExCo Q review");
  const [selected, setSelected] = useState("");

  async function load() {
    const res = await api.get<Envelope<ListData<BoardPack>>>("/v1/packs");
    setItems(res.data.items);
    if (!selected && res.data.items[0]) setSelected(res.data.items[0].id);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    await api.post("/v1/packs", {
      periodLabel,
      summary: "Multi-vertical heatmap pack",
    });
    await load();
  }

  async function publish(e: FormEvent) {
    e.preventDefault();
    await api.post(`/v1/packs/${selected}/publish`);
    await load();
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="font-seal text-3xl text-[var(--teal-deep)]">Board packs</div>
        <p className="text-sm text-[var(--muted)]">
          One multi-vertical heatmap — not four disconnected appendices (BR-11).
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        <form className="panel space-y-3" onSubmit={create}>
          <h2 className="font-semibold">Generate draft</h2>
          <input
            className="input"
            value={periodLabel}
            onChange={(e) => setPeriodLabel(e.target.value)}
          />
          <button className="btn" type="submit">
            Create pack
          </button>
        </form>
        <form className="panel space-y-3" onSubmit={publish}>
          <h2 className="font-semibold">Publish</h2>
          <select className="select" value={selected} onChange={(e) => setSelected(e.target.value)}>
            {items.map((p) => (
              <option key={p.id} value={p.id}>
                {p.periodLabel} ({p.status})
              </option>
            ))}
          </select>
          <button className="btn" type="submit">
            Publish
          </button>
        </form>
      </div>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Status</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.periodLabel}
                  <div className="font-seal text-sm text-[var(--teal)]">Asiora seal</div>
                </td>
                <td>
                  <span className={`chip ${p.status === "published" ? "chip-teal" : "chip-amber"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="text-xs">{p.downloadUri || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
