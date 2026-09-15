/**
 * DiligenceRepository — in-memory sandbox.
 */
import type { DiligenceRepository } from "@asiora/services/diligence";
import {
  diligenceByInitiativeId,
  nowIso,
  responseMeta,
  sandboxId,
} from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class DiligenceRepositoryDdb implements DiligenceRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDiligenceChecklists(input: Parameters<DiligenceRepository["listDiligenceChecklists"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...diligenceByInitiativeId.values()];
    if (raw.incompleteOnly === true || raw.incompleteOnly === "true") {
      items = items.filter((i) => !i.diligenceComplete);
    }
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async getDiligence(input: Parameters<DiligenceRepository["getDiligence"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const initiativeId = String(raw.initiativeId ?? "");
    const entity = diligenceByInitiativeId.get(initiativeId);
    if (!entity) return null as never;
    return { data: entity, ...responseMeta(correlationId) };
  }

  async upsertDiligence(input: Parameters<DiligenceRepository["upsertDiligence"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const initiativeId = String(raw.initiativeId ?? "");
    const existing = diligenceByInitiativeId.get(initiativeId);
    const entity = {
      id: existing?.id ?? String(raw.id ?? sandboxId("dil")),
      initiativeId,
      diligenceComplete: Boolean(raw.diligenceComplete),
      integrationRisk: raw.integrationRisk ?? "medium",
      processReady: Boolean(raw.processReady),
      controlsReady: Boolean(raw.controlsReady),
      dataReady: Boolean(raw.dataReady),
      metricsReady: Boolean(raw.metricsReady),
      talentReady: Boolean(raw.talentReady),
      orgReady: Boolean(raw.orgReady),
      notes: raw.notes ? String(raw.notes) : undefined,
      waived: Boolean(raw.waived),
      waiverRationale: raw.waiverRationale ? String(raw.waiverRationale) : undefined,
      updatedAt: nowIso(),
    };
    diligenceByInitiativeId.set(initiativeId, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }
}
