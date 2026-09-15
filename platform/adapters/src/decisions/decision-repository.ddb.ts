/**
 * DecisionRepository — in-memory sandbox.
 */
import type { DecisionRepository } from "@asiora/services/decisions";
import { decisionsById, nowIso, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class DecisionRepositoryDdb implements DecisionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listFundingDecisions(input: Parameters<DecisionRepository["listFundingDecisions"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...decisionsById.values()];
    if (raw.outcome) items = items.filter((i) => i.outcome === raw.outcome);
    if (raw.initiativeId) items = items.filter((i) => i.initiativeId === raw.initiativeId);
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async recordFundingDecision(input: Parameters<DecisionRepository["recordFundingDecision"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? "");
    const entity = {
      id,
      initiativeId: String(raw.initiativeId ?? ""),
      outcome: raw.outcome,
      rationale: raw.rationale ? String(raw.rationale) : undefined,
      decidedAt: nowIso(),
    };
    decisionsById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }

  async getFundingDecision(input: Parameters<DecisionRepository["getFundingDecision"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.decisionId ?? raw.id ?? "");
    const entity = decisionsById.get(id);
    if (!entity) return null as never;
    return { data: entity, ...responseMeta(correlationId) };
  }
}
