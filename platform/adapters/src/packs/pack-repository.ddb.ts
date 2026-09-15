/**
 * PackRepository — in-memory sandbox.
 */
import type { PackRepository } from "@asiora/services/packs";
import { nowIso, packsById, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class PackRepositoryDdb implements PackRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listBoardPacks(input: Parameters<PackRepository["listBoardPacks"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...packsById.values()];
    if (raw.status) items = items.filter((i) => i.status === raw.status);
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async createBoardPack(input: Parameters<PackRepository["createBoardPack"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? "");
    const entity = {
      id,
      status: "draft",
      periodLabel: String(raw.periodLabel ?? ""),
      initiativeIds: (raw.initiativeIds as string[] | undefined) ?? [],
      summary: raw.summary ? String(raw.summary) : undefined,
      createdAt: nowIso(),
    };
    packsById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }

  async getBoardPack(input: Parameters<PackRepository["getBoardPack"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.packId ?? raw.id ?? "");
    const entity = packsById.get(id);
    if (!entity) return null as never;
    return { data: entity, ...responseMeta(correlationId) };
  }
}
