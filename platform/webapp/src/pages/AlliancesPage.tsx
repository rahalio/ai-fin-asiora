import { FormEvent, useEffect, useState } from "react";
import {
  AllianceScore,
  api,
  Envelope,
  ListData,
  TalentGate,
} from "@/lib/api";

export function AlliancesPage() {
  const [alliances, setAlliances] = useState<AllianceScore[]>([]);
  const [talents, setTalents] = useState<TalentGate[]>([]);
  const [partnerName, setPartnerName] = useState("");
  const [country, setCountry] = useState("SG");
  const [hub, setHub] = useState("hub");
  const [initiativeId, setInitiativeId] = useState("");
  const [coverageGap, setCoverageGap] = useState(0.1);

  async function load() {
    const [a, t] = await Promise.all([
      api.get<Envelope<ListData<AllianceScore>>>("/v1/alliances"),
      api.get<Envelope<ListData<TalentGate>>>("/v1/gates/talent"),
    ]);
    setAlliances(a.data.items);
    setTalents(t.data.items);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function createAlliance(e: FormEvent) {
    e.preventDefault();
    await api.post("/v1/alliances", {
      partnerName,
      hubPeriphery: hub,
      country,
      regulatoryFeasibility: "review required",
    });
    setPartnerName("");
    await load();
  }

  async function evaluateTalent(e: FormEvent) {
    e.preventDefault();
    await api.post("/v1/gates/talent", {
      initiativeId,
      requiredRoles: ["ML engineer", "actuarial AI lead"],
      coverageGap,
    });
    await load();
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="font-seal text-3xl text-[var(--teal-deep)]">
          Alliances and talent
        </div>
        <p className="text-sm text-[var(--muted)]">
          Hub-vs-periphery scores and talent gates for transformative bets (BR-5, BR-6).
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        <form className="panel space-y-3" onSubmit={createAlliance}>
          <h2 className="font-semibold">Score alliance</h2>
          <input
            className="input"
            placeholder="Partner"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            required
          />
          <input
            className="input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <select className="select" value={hub} onChange={(e) => setHub(e.target.value)}>
            <option value="hub">hub</option>
            <option value="periphery">periphery</option>
            <option value="unclear">unclear</option>
          </select>
          <button className="btn" type="submit">
            Score
          </button>
        </form>

        <form className="panel space-y-3" onSubmit={evaluateTalent}>
          <h2 className="font-semibold">Evaluate talent gate</h2>
          <input
            className="input"
            placeholder="Initiative id (ini_…)"
            value={initiativeId}
            onChange={(e) => setInitiativeId(e.target.value)}
            required
          />
          <input
            className="input"
            type="number"
            step="0.05"
            value={coverageGap}
            onChange={(e) => setCoverageGap(Number(e.target.value))}
          />
          <button className="btn" type="submit">
            Evaluate
          </button>
        </form>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="panel">
          <h2 className="font-semibold mb-2">Alliances</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Partner</th>
                <th>Hub</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {alliances.map((a) => (
                <tr key={a.id}>
                  <td>{a.partnerName}</td>
                  <td>{a.hubPeriphery}</td>
                  <td>{a.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <h2 className="font-semibold mb-2">Talent gates</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Initiative</th>
                <th>Result</th>
                <th>Gap</th>
              </tr>
            </thead>
            <tbody>
              {talents.map((t) => (
                <tr key={t.id}>
                  <td>{t.initiativeId}</td>
                  <td>
                    {t.passed ? (
                      <span className="chip chip-teal">pass</span>
                    ) : (
                      <span className="chip chip-coral">block</span>
                    )}
                  </td>
                  <td>{t.coverageGap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
