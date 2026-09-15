/**
 * PublishPublisher — in-memory sandbox (updates pack status).
 */
import type { PublishPublisher } from "@asiora/services/packs";
import { nowIso, packsById, responseMeta } from "../_shared/sandbox-store.js";

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export class PublishPublisherAdapter implements PublishPublisher {
  constructor(private readonly _http?: unknown) {}

  async publishBoardPack(input: Parameters<PublishPublisher["publishBoardPack"]>[0]) {
    const raw = asRecord(input);
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.packId ?? raw.id ?? "");
    const existing = packsById.get(id);
    if (!existing) return null as never;
    const entity = {
      ...existing,
      status: "published",
      publishedAt: nowIso(),
      downloadUri: `https://api.asiora.local/v1/packs/${id}/download`,
    };
    packsById.set(id, entity);
    return { data: entity, ...responseMeta(correlationId) };
  }
}
