/**
 * TalentRepository — in-memory sandbox.
 */
import type { TalentRepository } from "@asiora/services/gates";
import { nowIso, responseMeta, talentGatesById } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class TalentRepositoryDdb implements TalentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTalentGates(input: Parameters<TalentRepository["listTalentGates"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...talentGatesById.values()];
    if (raw.failedOnly === true || raw.failedOnly === "true") {
      items = items.filter((i) => !i.passed);
    }
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async evaluateTalentGate(input: Parameters<TalentRepository["evaluateTalentGate"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? "");
    const coverageGap = typeof raw.coverageGap === "number" ? raw.coverageGap : Number(raw.coverageGap ?? 0);
    const entity = {
      id,
      initiativeId: String(raw.initiativeId ?? ""),
      passed: coverageGap <= 0.2,
      coverageGap,
      requiredRoles: (raw.requiredRoles as string[] | undefined) ?? [],
      evaluatedAt: nowIso(),
    };
    talentGatesById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }
}
