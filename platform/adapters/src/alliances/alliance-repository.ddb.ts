/**
 * AllianceRepository — in-memory sandbox.
 */
import type { AllianceRepository } from "@asiora/services/alliances";
import { alliancesById, nowIso, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class AllianceRepositoryDdb implements AllianceRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listAllianceScores(input: Parameters<AllianceRepository["listAllianceScores"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...alliancesById.values()];
    if (raw.country) items = items.filter((i) => i.country === raw.country);
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async createAllianceScore(input: Parameters<AllianceRepository["createAllianceScore"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? "");
    const entity = {
      id,
      partnerName: String(raw.partnerName ?? ""),
      hubPeriphery: raw.hubPeriphery,
      regulatoryFeasibility: raw.regulatoryFeasibility ? String(raw.regulatoryFeasibility) : undefined,
      country: String(raw.country ?? ""),
      initiativeId: raw.initiativeId ? String(raw.initiativeId) : undefined,
      mitigation: raw.mitigation ? String(raw.mitigation) : undefined,
      createdAt: nowIso(),
    };
    alliancesById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }

  async getAllianceScore(input: Parameters<AllianceRepository["getAllianceScore"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.allianceId ?? raw.id ?? "");
    const entity = alliancesById.get(id);
    if (!entity) return null as never;
    return { data: entity, ...responseMeta(correlationId) };
  }
}
