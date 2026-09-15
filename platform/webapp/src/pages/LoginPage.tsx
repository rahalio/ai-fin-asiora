import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiKey, markAuthed, setApiKey } from "@/lib/api";

export function LoginPage() {
  const navigate = useNavigate();
  const [apiKey, setKey] = useState(getApiKey());
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      setApiKey(apiKey.trim() || "asiora_demo_local_dev_key");
      const res = await fetch("/health");
      if (!res.ok) throw new Error("API unavailable");
      markAuthed();
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <div
      style={{
        minHeight: "100%",
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at 20% 20%, rgba(15,107,107,0.15), transparent 45%), #f5f0e8",
      }}
    >
      <form className="panel" style={{ width: 420, maxWidth: "92vw" }} onSubmit={onSubmit}>
        <div className="font-seal text-3xl text-[var(--teal-deep)]">Asiora</div>
        <p className="text-sm text-[var(--muted)] mt-2 mb-4">
          SEA multi-vertical transformation portfolio console. Enter the tenant API key
          (demo key is prefilled).
        </p>
        <label className="text-sm font-medium">API key</label>
        <input
          className="input mt-1 mb-3"
          value={apiKey}
          onChange={(e) => setKey(e.target.value)}
        />
        {error ? <p className="text-sm text-[var(--coral)] mb-3">{error}</p> : null}
        <button className="btn w-full" type="submit">
          Enter portfolio
        </button>
      </form>
    </div>
  );
}
