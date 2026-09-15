/**
 * DataPlayRepository — in-memory sandbox.
 */
import type { DataPlayRepository } from "@asiora/services/dataplay";
import { dataPlaysById, nowIso, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class DataPlayRepositoryDdb implements DataPlayRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDataPlays(input: Parameters<DataPlayRepository["listDataPlays"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...dataPlaysById.values()];
    if (raw.initiativeId) items = items.filter((i) => i.initiativeId === raw.initiativeId);
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async createDataPlay(input: Parameters<DataPlayRepository["createDataPlay"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? "");
    const now = nowIso();
    const entity = {
      id,
      name: String(raw.name ?? ""),
      initiativeId: String(raw.initiativeId ?? ""),
      dataSources: (raw.dataSources as string[] | undefined) ?? [],
      monetisationHypothesis: raw.monetisationHypothesis
        ? String(raw.monetisationHypothesis)
        : undefined,
      crossSellAllowed: Boolean(raw.crossSellAllowed),
      countryConstraints: (raw.countryConstraints as unknown[]) ?? [],
      createdAt: now,
      updatedAt: now,
    };
    dataPlaysById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }

  async getDataPlay(input: Parameters<DataPlayRepository["getDataPlay"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.dataPlayId ?? raw.id ?? "");
    const entity = dataPlaysById.get(id);
    if (!entity) return null as never;
    return { data: entity, ...responseMeta(correlationId) };
  }

  async updateDataPlay(input: Parameters<DataPlayRepository["updateDataPlay"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.dataPlayId ?? raw.id ?? "");
    const existing = dataPlaysById.get(id);
    if (!existing) return null as never;
    const updated = {
      ...existing,
      ...Object.fromEntries(
        Object.entries(raw).filter(
          ([k]) =>
            ![
              "dataPlayId",
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
    dataPlaysById.set(id, updated);
    return { data: updated, ...responseMeta(correlationId) };
  }
}
