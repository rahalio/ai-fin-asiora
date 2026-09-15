/**
 * EthicRepository — in-memory sandbox.
 */
import type { EthicRepository } from "@asiora/services/gates";
import { ethicsFlagsById, nowIso, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class EthicRepositoryDdb implements EthicRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listEthicsFlags(input: Parameters<EthicRepository["listEthicsFlags"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...ethicsFlagsById.values()];
    if (raw.status) items = items.filter((i) => i.status === raw.status);
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async raiseEthicsFlag(input: Parameters<EthicRepository["raiseEthicsFlag"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? "");
    const entity = {
      id,
      initiativeId: String(raw.initiativeId ?? ""),
      theme: raw.theme ?? "other",
      status: "open",
      detail: raw.detail ? String(raw.detail) : undefined,
      createdAt: nowIso(),
    };
    ethicsFlagsById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }
}
