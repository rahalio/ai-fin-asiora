/**
 * ExpireRepository — in-memory sandbox.
 */
import type { ExpireRepository } from "@asiora/services/intakes";
import { intakesById, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class ExpireRepositoryDdb implements ExpireRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async expireIdeaIntake(input: Parameters<ExpireRepository["expireIdeaIntake"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.intakeId ?? "");
    const existing = intakesById.get(id);
    if (!existing) return null as never;
    const entity = { ...existing, status: "expired" };
    intakesById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }
}
