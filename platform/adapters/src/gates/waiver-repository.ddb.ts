/**
 * WaiverRepository — in-memory sandbox.
 */
import type { WaiverRepository } from "@asiora/services/gates";
import { ethicsFlagsById, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class WaiverRepositoryDdb implements WaiverRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async waiveEthicsFlag(input: Parameters<WaiverRepository["waiveEthicsFlag"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.ethicsFlagId ?? raw.id ?? "");
    const existing = ethicsFlagsById.get(id);
    if (!existing) return null as never;
    const entity = {
      ...existing,
      status: "waived",
      waiverRationale: String(raw.waiverRationale ?? ""),
    };
    ethicsFlagsById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }
}
