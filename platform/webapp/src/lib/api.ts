const API_KEY_STORAGE = "asiora:apiKey";
const DEMO_KEY = "asiora_demo_local_dev_key";

export function getApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || DEMO_KEY;
}

export function setApiKey(key: string) {
  localStorage.setItem(API_KEY_STORAGE, key);
}

export function clearSession() {
  localStorage.removeItem(API_KEY_STORAGE);
  localStorage.removeItem("asiora:authed");
}

export function markAuthed() {
  localStorage.setItem("asiora:authed", "1");
}

export function isAuthed(): boolean {
  return localStorage.getItem("asiora:authed") === "1";
}

export type Envelope<T> = {
  data: T;
  meta?: { correlationId?: string; generatedAt?: string };
};

export type ListData<T> = {
  items: T[];
  nextCursor?: string;
};

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("X-API-Key", getApiKey());
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (init.method && init.method !== "GET" && !headers.has("Idempotency-Key")) {
    headers.set("Idempotency-Key", crypto.randomUUID());
  }
  const res = await fetch(path, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
};

export type Vertical = "aiOps" | "insurance" | "assetManagement" | "realEstate";

export type Initiative = {
  id: string;
  name: string;
  vertical: Vertical;
  status: string;
  insuranceScenario?: string;
  owner?: string;
  summary?: string;
  countries?: string[];
  governanceMode?: string;
};

export type IdeaIntake = {
  id: string;
  title: string;
  status: string;
  owner?: string;
  source?: string;
  slaDueAt?: string;
  convertedInitiativeId?: string;
};

export type AllianceScore = {
  id: string;
  partnerName: string;
  hubPeriphery: string;
  country: string;
  regulatoryFeasibility?: string;
};

export type TalentGate = {
  id: string;
  initiativeId: string;
  passed: boolean;
  coverageGap?: number;
};

export type EthicsFlag = {
  id: string;
  initiativeId: string;
  theme: string;
  status: string;
  detail?: string;
};

export type FundingDecision = {
  id: string;
  initiativeId: string;
  outcome: string;
  rationale?: string;
  decidedAt?: string;
};

export type BoardPack = {
  id: string;
  status: string;
  periodLabel: string;
  downloadUri?: string;
};

export type DataPlay = {
  id: string;
  name: string;
  initiativeId: string;
  dataSources?: string[];
  monetisationHypothesis?: string;
  crossSellAllowed?: boolean;
  countryConstraints?: Array<{
    country: string;
    localisationOk: boolean;
    consentBasis: string;
  }>;
};

export type OverlapCluster = {
  id: string;
  title: string;
  status: string;
  memberInitiativeIds: string[];
  capitalAtRisk?: string;
  customerOutcome?: string;
};

export type DiligenceChecklist = {
  id: string;
  initiativeId: string;
  diligenceComplete: boolean;
  integrationRisk: string;
  waived?: boolean;
};

export type ScenarioPosture = {
  id: string;
  initiativeId: string;
  insuranceScenario: string;
  rationale?: string;
};
