import { FormEvent, useEffect, useState } from "react";
import { api, Envelope, IdeaIntake, ListData } from "@/lib/api";

export function IntakesPage() {
  const [items, setItems] = useState<IdeaIntake[]>([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [selected, setSelected] = useState("");
  const [vertical, setVertical] = useState("aiOps");

  async function load() {
    const res = await api.get<Envelope<ListData<IdeaIntake>>>("/v1/intakes");
    setItems(res.data.items);
    if (!selected && res.data.items[0]) setSelected(res.data.items[0].id);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    await api.post("/v1/intakes", {
      title,
      source: "Singapore FinTech Festival",
      notes: "Festival booth capture",
    });
    setTitle("");
    await load();
  }

  async function assign(e: FormEvent) {
    e.preventDefault();
    await api.post(`/v1/intakes/${selected}/assign`, { owner });
    await load();
  }

  async function convert(e: FormEvent) {
    e.preventDefault();
    await api.post(`/v1/intakes/${selected}/convert`, {
      vertical,
      name: title || undefined,
      owner: owner || undefined,
    });
    await load();
  }

  async function expire(e: FormEvent) {
    e.preventDefault();
    await api.post(`/v1/intakes/${selected}/expire`);
    await load();
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="font-seal text-3xl text-[var(--teal-deep)]">Festival intake</div>
        <p className="text-sm text-[var(--muted)]">
          Convert ideas to owned portfolio items within SLA or expire (BR-10).
        </p>
      </header>

      <form className="panel space-y-3" onSubmit={create}>
        <h2 className="font-semibold">Capture idea</h2>
        <input
          className="input"
          placeholder="Idea title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Capture
        </button>
      </form>

      <div className="panel space-y-3">
        <h2 className="font-semibold">Operate queue</h2>
        <select className="select" value={selected} onChange={(e) => setSelected(e.target.value)}>
          {items.map((i) => (
            <option key={i.id} value={i.id}>
              {i.title} ({i.status})
            </option>
          ))}
        </select>
        <div className="grid gap-2 md:grid-cols-3">
          <form onSubmit={assign} className="space-y-2">
            <input
              className="input"
              placeholder="Owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
            <button className="btn w-full" type="submit">
              Assign
            </button>
          </form>
          <form onSubmit={convert} className="space-y-2">
            <select
              className="select"
              value={vertical}
              onChange={(e) => setVertical(e.target.value)}
            >
              <option value="aiOps">aiOps</option>
              <option value="insurance">insurance</option>
              <option value="assetManagement">assetManagement</option>
              <option value="realEstate">realEstate</option>
            </select>
            <button className="btn w-full" type="submit">
              Convert
            </button>
          </form>
          <form onSubmit={expire}>
            <button className="btn-ghost btn w-full" type="submit">
              Expire
            </button>
          </form>
        </div>
      </div>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Idea</th>
              <th>Status</th>
              <th>Owner / SLA</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => {
              const breach =
                (i.status === "new" || i.status === "owned") &&
                i.slaDueAt &&
                new Date(i.slaDueAt).getTime() < Date.now();
              return (
                <tr key={i.id}>
                  <td>{i.title}</td>
                  <td>
                    <span className={`chip ${breach ? "chip-coral" : "chip-teal"}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="text-sm">
                    {i.owner || "—"}
                    <div className="text-xs text-[var(--muted)]">{i.slaDueAt}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
