/**
 * LogoutRepository — sandbox no-op.
 */
import type { LogoutRepository } from "@asiora/services/identity";
import { responseMeta } from "../_shared/sandbox-store.js";

export class LogoutRepositoryDdb implements LogoutRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async operatorLogout(
    input: Parameters<LogoutRepository["operatorLogout"]>[0]
  ): Promise<Awaited<ReturnType<LogoutRepository["operatorLogout"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    return { data: { ok: true }, ...responseMeta(correlationId) } as never;
  }
}
