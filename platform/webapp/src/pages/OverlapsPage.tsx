import { FormEvent, useEffect, useState } from "react";
import { api, Envelope, ListData, OverlapCluster } from "@/lib/api";

export function OverlapsPage() {
  const [items, setItems] = useState<OverlapCluster[]>([]);
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState("");
  const [resolveId, setResolveId] = useState("");
  const [resolution, setResolution] = useState("split");

  async function load() {
    const res = await api.get<Envelope<ListData<OverlapCluster>>>("/v1/overlaps");
    setItems(res.data.items);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    await api.post("/v1/overlaps", {
      title,
      memberInitiativeIds: members
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      customerOutcome: "Same SEA customer journey",
      capitalAtRisk: "TBD",
    });
    setTitle("");
    setMembers("");
    await load();
  }

  async function resolve(e: FormEvent) {
    e.preventDefault();
    await api.post(`/v1/overlaps/${resolveId}/resolve`, {
      resolution,
      differentiationNotes: "Documented split / merge decision",
    });
    await load();
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="font-seal text-3xl text-[var(--teal-deep)]">Overlap clusters</div>
        <p className="text-sm text-[var(--muted)]">
          Same customer outcome across verticals — surface and resolve double-funding (BR-9).
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        <form className="panel space-y-3" onSubmit={create}>
          <h2 className="font-semibold">Create cluster</h2>
          <input
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="input"
            placeholder="Member initiative ids (comma-separated)"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            required
          />
          <button className="btn" type="submit">
            Create
          </button>
        </form>
        <form className="panel space-y-3" onSubmit={resolve}>
          <h2 className="font-semibold">Resolve</h2>
          <input
            className="input"
            placeholder="Overlap id"
            value={resolveId}
            onChange={(e) => setResolveId(e.target.value)}
            required
          />
          <select
            className="select"
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
          >
            <option value="merged">merged</option>
            <option value="split">split</option>
            <option value="resolved">resolved</option>
          </select>
          <button className="btn" type="submit">
            Resolve
          </button>
        </form>
      </div>

      <div className="panel">
        {items.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Healthy — no overlap clusters.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Cluster</th>
                <th>Members</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id}>
                  <td>
                    {o.title}
                    <div className="text-xs text-[var(--muted)]">{o.id}</div>
                  </td>
                  <td>{(o.memberInitiativeIds || []).join(", ")}</td>
                  <td>
                    <span
                      className={`chip ${o.status === "open" ? "chip-amber" : "chip-teal"}`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
