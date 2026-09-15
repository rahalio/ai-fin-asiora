/**
 * ScenarioRepository — in-memory sandbox.
 */
import type { ScenarioRepository } from "@asiora/services/scenarios";
import {
  initiativesById,
  nowIso,
  responseMeta,
  scenariosByInitiativeId,
  sandboxId,
} from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class ScenarioRepositoryDdb implements ScenarioRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listScenarioPostures(input: Parameters<ScenarioRepository["listScenarioPostures"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    let items = [...scenariosByInitiativeId.values()];
    if (raw.unposturedOnly === true || raw.unposturedOnly === "true") {
      const postured = new Set(scenariosByInitiativeId.keys());
      items = [...initiativesById.values()]
        .filter((i) => i.vertical === "insurance" && !postured.has(String(i.id)))
        .map((i) => ({
          id: sandboxId("scn"),
          initiativeId: i.id,
          insuranceScenario: "none",
          rationale: "unpostured",
        }));
    }
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async getInitiativeScenario(input: Parameters<ScenarioRepository["getInitiativeScenario"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const initiativeId = String(raw.initiativeId ?? "");
    const entity = scenariosByInitiativeId.get(initiativeId);
    if (!entity) return null as never;
    return { data: entity, ...responseMeta(correlationId) };
  }

  async setInsuranceScenario(input: Parameters<ScenarioRepository["setInsuranceScenario"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const initiativeId = String(raw.initiativeId ?? "");
    const initiative = initiativesById.get(initiativeId);
    if (!initiative) return null as never;
    if (initiative.vertical !== "insurance") {
      const err = new Error("Scenario posture only applies to insurance initiatives") as Error & {
        statusCode?: number;
      };
      err.statusCode = 422;
      throw err;
    }
    const entity = {
      id: String(raw.id ?? sandboxId("scn")),
      initiativeId,
      insuranceScenario: raw.insuranceScenario,
      rationale: raw.rationale ? String(raw.rationale) : undefined,
      setAt: nowIso(),
    };
    scenariosByInitiativeId.set(initiativeId, entity);
    initiative.insuranceScenario = raw.insuranceScenario;
    initiative.updatedAt = nowIso();
    initiativesById.set(initiativeId, initiative);
    return { data: entity, ...responseMeta(correlationId) };
  }
}
