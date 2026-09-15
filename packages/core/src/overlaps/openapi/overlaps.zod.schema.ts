import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createOverlapCluster_Body = z
  .object({
    title: z.string().min(1),
    memberInitiativeIds: z.array(z.string()).min(2),
    customerOutcome: z.string().optional(),
    capitalAtRisk: z.string().optional(),
  })
  .passthrough();
const resolveOverlapCluster_Body = z
  .object({
    resolution: z.enum(['merged', 'split', 'resolved']),
    differentiationNotes: z.string().optional(),
    killInitiativeIds: z.array(z.string()).optional(),
  })
  .passthrough();
const OverlapStatus = z.enum(['open', 'merged', 'split', 'resolved']);
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
const OverlapId = z.string();
const OverlapCluster = z
  .object({
    id: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
    title: z.string(),
    status: z.enum(['open', 'merged', 'split', 'resolved']),
    memberInitiativeIds: z.array(
      z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
    ),
    customerOutcome: z.string().optional(),
    capitalAtRisk: z.string().optional(),
    differentiationNotes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    resolvedAt: z.string().datetime({ offset: true }).optional(),
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
const OverlapClusterListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
              title: z.string(),
              status: z.enum(['open', 'merged', 'split', 'resolved']),
              memberInitiativeIds: z.array(
                z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
              ),
              customerOutcome: z.string().optional(),
              capitalAtRisk: z.string().optional(),
              differentiationNotes: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }).optional(),
              resolvedAt: z.string().datetime({ offset: true }).optional(),
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
const OverlapClusterCreate = z
  .object({
    title: z.string().min(1),
    memberInitiativeIds: z.array(z.string()).min(2),
    customerOutcome: z.string().optional(),
    capitalAtRisk: z.string().optional(),
  })
  .passthrough();
const OverlapClusterResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
        title: z.string(),
        status: z.enum(['open', 'merged', 'split', 'resolved']),
        memberInitiativeIds: z.array(
          z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
        ),
        customerOutcome: z.string().optional(),
        capitalAtRisk: z.string().optional(),
        differentiationNotes: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
        resolvedAt: z.string().datetime({ offset: true }).optional(),
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
const OverlapResolve = z
  .object({
    resolution: z.enum(['merged', 'split', 'resolved']),
    differentiationNotes: z.string().optional(),
    killInitiativeIds: z.array(z.string()).optional(),
  })
  .passthrough();

export const schemas: any = {
  createOverlapCluster_Body,
  resolveOverlapCluster_Body,
  OverlapStatus,
  Problem,
  OverlapId,
  OverlapCluster,
  ResponseMeta,
  OverlapClusterListResponse,
  OverlapClusterCreate,
  OverlapClusterResponse,
  OverlapResolve,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/overlaps',
    alias: 'listOverlapClusters',
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
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'merged', 'split', 'resolved']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  title: z.string(),
                  status: z.enum(['open', 'merged', 'split', 'resolved']),
                  memberInitiativeIds: z.array(
                    z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
                  ),
                  customerOutcome: z.string().optional(),
                  capitalAtRisk: z.string().optional(),
                  differentiationNotes: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                  resolvedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/overlaps',
    alias: 'createOverlapCluster',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createOverlapCluster_Body,
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
            id: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            status: z.enum(['open', 'merged', 'split', 'resolved']),
            memberInitiativeIds: z.array(
              z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            customerOutcome: z.string().optional(),
            capitalAtRisk: z.string().optional(),
            differentiationNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/overlaps/:overlapId',
    alias: 'getOverlapCluster',
    requestFormat: 'json',
    parameters: [
      {
        name: 'overlapId',
        type: 'Path',
        schema: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            status: z.enum(['open', 'merged', 'split', 'resolved']),
            memberInitiativeIds: z.array(
              z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            customerOutcome: z.string().optional(),
            capitalAtRisk: z.string().optional(),
            differentiationNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
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
  {
    method: 'post',
    path: '/v1/overlaps/:overlapId/resolve',
    alias: 'resolveOverlapCluster',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: resolveOverlapCluster_Body,
      },
      {
        name: 'overlapId',
        type: 'Path',
        schema: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            status: z.enum(['open', 'merged', 'split', 'resolved']),
            memberInitiativeIds: z.array(
              z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            customerOutcome: z.string().optional(),
            capitalAtRisk: z.string().optional(),
            differentiationNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
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
