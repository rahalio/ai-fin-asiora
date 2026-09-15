import { FormEvent, useEffect, useState } from "react";
import { api, Envelope, EthicsFlag, ListData } from "@/lib/api";

export function EthicsPage() {
  const [flags, setFlags] = useState<EthicsFlag[]>([]);
  const [initiativeId, setInitiativeId] = useState("");
  const [theme, setTheme] = useState("genomics");
  const [waiverId, setWaiverId] = useState("");
  const [rationale, setRationale] = useState("");

  async function load() {
    const res = await api.get<Envelope<ListData<EthicsFlag>>>("/v1/gates/ethics");
    setFlags(res.data.items);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function raise(e: FormEvent) {
    e.preventDefault();
    await api.post("/v1/gates/ethics", {
      initiativeId,
      theme,
      detail: "Customer-impact review required",
    });
    setInitiativeId("");
    await load();
  }

  async function waive(e: FormEvent) {
    e.preventDefault();
    await api.post(`/v1/gates/ethics/${waiverId}/waiver`, {
      waiverRationale: rationale,
    });
    setRationale("");
    await load();
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="font-seal text-3xl text-[var(--teal-deep)]">Ethics gates</div>
        <p className="text-sm text-[var(--muted)]">
          Genomics / wellness flags before customer impact (BR-7).
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        <form className="panel space-y-3" onSubmit={raise}>
          <h2 className="font-semibold">Raise flag</h2>
          <input
            className="input"
            placeholder="Initiative id"
            value={initiativeId}
            onChange={(e) => setInitiativeId(e.target.value)}
            required
          />
          <select className="select" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="genomics">genomics</option>
            <option value="wellness">wellness</option>
            <option value="conduct">conduct</option>
            <option value="other">other</option>
          </select>
          <button className="btn" type="submit">
            Raise
          </button>
        </form>
        <form className="panel space-y-3" onSubmit={waive}>
          <h2 className="font-semibold">Record waiver</h2>
          <input
            className="input"
            placeholder="Ethics flag id"
            value={waiverId}
            onChange={(e) => setWaiverId(e.target.value)}
            required
          />
          <input
            className="input"
            placeholder="Waiver rationale"
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            required
          />
          <button className="btn" type="submit">
            Waive
          </button>
        </form>
      </div>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Theme</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {flags.map((f) => (
              <tr key={f.id}>
                <td>
                  <code className="text-xs">{f.id}</code>
                  <div className="text-xs text-[var(--muted)]">{f.initiativeId}</div>
                </td>
                <td>{f.theme}</td>
                <td>
                  <span
                    className={`chip ${f.status === "open" ? "chip-coral" : "chip-teal"}`}
                  >
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
