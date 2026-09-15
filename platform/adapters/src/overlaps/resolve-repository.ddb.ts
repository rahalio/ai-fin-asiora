/**
 * ResolveRepository — in-memory sandbox.
 */
import type { ResolveRepository } from "@asiora/services/overlaps";
import { nowIso, overlapsById, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class ResolveRepositoryDdb implements ResolveRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async resolveOverlapCluster(input: Parameters<ResolveRepository["resolveOverlapCluster"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.overlapId ?? raw.id ?? "");
    const existing = overlapsById.get(id);
    if (!existing) return null as never;
    const entity = {
      ...existing,
      status: raw.resolution ?? "resolved",
      differentiationNotes: raw.differentiationNotes
        ? String(raw.differentiationNotes)
        : existing.differentiationNotes,
      resolvedAt: nowIso(),
    };
    overlapsById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }
}
