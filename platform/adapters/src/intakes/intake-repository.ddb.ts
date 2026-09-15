/**
 * IntakeRepository — in-memory sandbox.
 */
import type { IntakeRepository } from "@asiora/services/intakes";
import { intakesById, nowIso, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

function slaDue(): string {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
}

export class IntakeRepositoryDdb implements IntakeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listIdeaIntakes(input: Parameters<IntakeRepository["listIdeaIntakes"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...intakesById.values()];
    if (raw.status) items = items.filter((i) => i.status === raw.status);
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async createIdeaIntake(input: Parameters<IntakeRepository["createIdeaIntake"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? "");
    const entity = {
      id,
      title: String(raw.title ?? ""),
      source: raw.source ? String(raw.source) : undefined,
      notes: raw.notes ? String(raw.notes) : undefined,
      status: "new",
      slaDueAt: slaDue(),
      createdAt: nowIso(),
    };
    intakesById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }

  async getIdeaIntake(input: Parameters<IntakeRepository["getIdeaIntake"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.intakeId ?? raw.id ?? "");
    const entity = intakesById.get(id);
    if (!entity) return null as never;
    return { data: entity, ...responseMeta(correlationId) };
  }
}
