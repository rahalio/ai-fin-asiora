/**
 * Packs DDD Dependencies - Composition root (hand-wired publish).
 */

import {
  PackRepositoryAdapter,
  PublishPublisherAdapter,
} from "@asiora/adapters/packs";
import { getIdGeneratorService } from "@asiora/adapters";
import type { AdapterDynamoDBClient } from "@asiora/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteCreateBoardPack,
  ExecuteGetBoardPack,
  ExecuteListBoardPacks,
  ExecutePublishBoardPack,
} from "@asiora/services/packs/usecases";
import type {
  PackRepository,
  PublishPublisher,
} from "@asiora/services/packs/ports";

export interface PacksDomainModule {
  repos: {
    packs: PackRepository;
    publishes: PublishPublisher;
  };
  useCases: {
    packs: {
      create: ExecuteCreateBoardPack;
      get: ExecuteGetBoardPack;
      list: ExecuteListBoardPacks;
    };
    publishes: {
      get: ExecutePublishBoardPack;
    };
  };
}

export function buildPacksDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): PacksDomainModule {
  const packs = new PackRepositoryAdapter(dynamoClient);
  const publishes = new PublishPublisherAdapter();

  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();

  return {
    repos: { packs, publishes },
    useCases: {
      packs: {
        create: new ExecuteCreateBoardPack(executionContext, idGenerator, packs),
        get: new ExecuteGetBoardPack(executionContext, idGenerator, packs),
        list: new ExecuteListBoardPacks(executionContext, idGenerator, packs),
      },
      publishes: {
        get: new ExecutePublishBoardPack(
          executionContext,
          idGenerator,
          publishes,
          packs,
        ),
      },
    },
  };
}
