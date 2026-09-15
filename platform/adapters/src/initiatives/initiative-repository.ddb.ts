/**
 * InitiativeRepository — in-memory sandbox.
 */
import type { InitiativeRepository } from "@asiora/services/initiatives";
import {
  initiativesById,
  nowIso,
  responseMeta,
} from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class InitiativeRepositoryDdb implements InitiativeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listInitiatives(input: Parameters<InitiativeRepository["listInitiatives"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...initiativesById.values()];
    if (raw.vertical) items = items.filter((i) => i.vertical === raw.vertical);
    if (raw.status) items = items.filter((i) => i.status === raw.status);
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async createInitiative(input: Parameters<InitiativeRepository["createInitiative"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? "");
    const now = nowIso();
    const entity = {
      id,
      name: String(raw.name ?? ""),
      vertical: raw.vertical,
      status: "intake",
      insuranceScenario: "none",
      owner: raw.owner ? String(raw.owner) : undefined,
      summary: raw.summary ? String(raw.summary) : undefined,
      countries: (raw.countries as string[] | undefined) ?? [],
      crossVerticalDeps: (raw.crossVerticalDeps as string[] | undefined) ?? [],
      governanceMode: raw.governanceMode ?? "unset",
      consortiumNotes: raw.consortiumNotes ? String(raw.consortiumNotes) : undefined,
      createdAt: now,
      updatedAt: now,
    };
    initiativesById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }

  async getInitiative(input: Parameters<InitiativeRepository["getInitiative"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.initiativeId ?? raw.id ?? "");
    const entity = initiativesById.get(id);
    if (!entity) return null as never;
    return { data: entity, ...responseMeta(correlationId) };
  }

  async updateInitiative(input: Parameters<InitiativeRepository["updateInitiative"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.initiativeId ?? raw.id ?? "");
    const existing = initiativesById.get(id);
    if (!existing) return null as never;
    const updated = {
      ...existing,
      ...Object.fromEntries(
        Object.entries(raw).filter(
          ([k]) =>
            ![
              "initiativeId",
              "id",
              "orgId",
              "correlationId",
              "createdByActorId",
              "createdByActorType",
            ].includes(k)
        )
      ),
      id,
      updatedAt: nowIso(),
    };
    initiativesById.set(id, updated);
    return { data: updated, ...responseMeta(correlationId) };
  }
}
