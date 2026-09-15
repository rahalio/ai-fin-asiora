/**
 * ConvertRepository — in-memory sandbox.
 */
import type { ConvertRepository } from "@asiora/services/intakes";
import {
  initiativesById,
  intakesById,
  nowIso,
  responseMeta,
  sandboxId,
} from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class ConvertRepositoryDdb implements ConvertRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async convertIdeaIntake(input: Parameters<ConvertRepository["convertIdeaIntake"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.intakeId ?? "");
    const existing = intakesById.get(id);
    if (!existing) return null as never;
    const initiativeId = sandboxId("ini");
    const now = nowIso();
    initiativesById.set(initiativeId, {
      id: initiativeId,
      name: String(raw.name ?? existing.title ?? "Converted idea"),
      vertical: raw.vertical ?? "aiOps",
      status: "intake",
      insuranceScenario: "none",
      owner: raw.owner ? String(raw.owner) : existing.owner,
      summary: existing.notes,
      countries: [],
      crossVerticalDeps: [],
      governanceMode: "unset",
      createdAt: now,
      updatedAt: now,
    });
    const entity = {
      ...existing,
      status: "converted",
      convertedInitiativeId: initiativeId,
      owner: raw.owner ? String(raw.owner) : existing.owner,
    };
    intakesById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }
}
