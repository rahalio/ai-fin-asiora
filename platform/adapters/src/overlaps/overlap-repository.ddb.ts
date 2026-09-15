/**
 * OverlapRepository — in-memory sandbox.
 */
import type { OverlapRepository } from "@asiora/services/overlaps";
import { nowIso, overlapsById, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class OverlapRepositoryDdb implements OverlapRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listOverlapClusters(input: Parameters<OverlapRepository["listOverlapClusters"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...overlapsById.values()];
    if (raw.status) items = items.filter((i) => i.status === raw.status);
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async createOverlapCluster(input: Parameters<OverlapRepository["createOverlapCluster"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? "");
    const entity = {
      id,
      title: String(raw.title ?? ""),
      status: "open",
      memberInitiativeIds: (raw.memberInitiativeIds as string[] | undefined) ?? [],
      customerOutcome: raw.customerOutcome ? String(raw.customerOutcome) : undefined,
      capitalAtRisk: raw.capitalAtRisk ? String(raw.capitalAtRisk) : undefined,
      createdAt: nowIso(),
    };
    overlapsById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }

  async getOverlapCluster(input: Parameters<OverlapRepository["getOverlapCluster"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.overlapId ?? raw.id ?? "");
    const entity = overlapsById.get(id);
    if (!entity) return null as never;
    return { data: entity, ...responseMeta(correlationId) };
  }
}
