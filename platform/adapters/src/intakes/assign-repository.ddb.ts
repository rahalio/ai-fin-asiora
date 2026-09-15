/**
 * AssignRepository — in-memory sandbox.
 */
import type { AssignRepository } from "@asiora/services/intakes";
import { intakesById, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class AssignRepositoryDdb implements AssignRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async assignIdeaIntake(input: Parameters<AssignRepository["assignIdeaIntake"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.intakeId ?? "");
    const existing = intakesById.get(id);
    if (!existing) return null as never;
    const entity = {
      ...existing,
      owner: String(raw.owner ?? existing.owner ?? ""),
      status: "owned",
    };
    intakesById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }
}
