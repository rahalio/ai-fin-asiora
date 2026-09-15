import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createAllianceScore_Body = z
  .object({
    partnerName: z.string(),
    hubPeriphery: z.enum(['hub', 'periphery', 'unclear']),
    country: z.string(),
    initiativeId: z.string().optional(),
    regulatoryFeasibility: z.string().optional(),
    mitigation: z.string().optional(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const AllianceId = z.string();
const HubPeriphery = z.enum(['hub', 'periphery', 'unclear']);
const AllianceScore = z
  .object({
    id: z.string().regex(/^aln_[0-9A-HJKMNP-TV-Z]{26}$/),
    partnerName: z.string(),
    hubPeriphery: z.enum(['hub', 'periphery', 'unclear']),
    regulatoryFeasibility: z.string().optional(),
    country: z.string(),
    initiativeId: z
      .string()
      .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    mitigation: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const AllianceScoreListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^aln_[0-9A-HJKMNP-TV-Z]{26}$/),
              partnerName: z.string(),
              hubPeriphery: z.enum(['hub', 'periphery', 'unclear']),
              regulatoryFeasibility: z.string().optional(),
              country: z.string(),
              initiativeId: z
                .string()
                .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              mitigation: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const AllianceScoreCreate = z
  .object({
    partnerName: z.string(),
    hubPeriphery: z.enum(['hub', 'periphery', 'unclear']),
    country: z.string(),
    initiativeId: z.string().optional(),
    regulatoryFeasibility: z.string().optional(),
    mitigation: z.string().optional(),
  })
  .passthrough();
const AllianceScoreResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^aln_[0-9A-HJKMNP-TV-Z]{26}$/),
        partnerName: z.string(),
        hubPeriphery: z.enum(['hub', 'periphery', 'unclear']),
        regulatoryFeasibility: z.string().optional(),
        country: z.string(),
        initiativeId: z
          .string()
          .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        mitigation: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createAllianceScore_Body,
  Problem,
  AllianceId,
  HubPeriphery,
  AllianceScore,
  ResponseMeta,
  AllianceScoreListResponse,
  AllianceScoreCreate,
  AllianceScoreResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/alliances',
    alias: 'listAllianceScores',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'country',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^aln_[0-9A-HJKMNP-TV-Z]{26}$/),
                  partnerName: z.string(),
                  hubPeriphery: z.enum(['hub', 'periphery', 'unclear']),
                  regulatoryFeasibility: z.string().optional(),
                  country: z.string(),
                  initiativeId: z
                    .string()
                    .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  mitigation: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/alliances',
    alias: 'createAllianceScore',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAllianceScore_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^aln_[0-9A-HJKMNP-TV-Z]{26}$/),
            partnerName: z.string(),
            hubPeriphery: z.enum(['hub', 'periphery', 'unclear']),
            regulatoryFeasibility: z.string().optional(),
            country: z.string(),
            initiativeId: z
              .string()
              .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            mitigation: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/alliances/:allianceId',
    alias: 'getAllianceScore',
    requestFormat: 'json',
    parameters: [
      {
        name: 'allianceId',
        type: 'Path',
        schema: z.string().regex(/^aln_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^aln_[0-9A-HJKMNP-TV-Z]{26}$/),
            partnerName: z.string(),
            hubPeriphery: z.enum(['hub', 'periphery', 'unclear']),
            regulatoryFeasibility: z.string().optional(),
            country: z.string(),
            initiativeId: z
              .string()
              .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            mitigation: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
