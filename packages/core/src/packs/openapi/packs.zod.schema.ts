import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createBoardPack_Body = z
  .object({
    periodLabel: z.string().min(1),
    initiativeIds: z.array(z.string()).optional(),
    summary: z.string().optional(),
  })
  .passthrough();
const PackStatus = z.enum(['draft', 'published']);
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
const PackId = z.string();
const BoardPack = z
  .object({
    id: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['draft', 'published']),
    periodLabel: z.string(),
    downloadUri: z.string().url().optional(),
    initiativeIds: z.array(z.string()).optional(),
    summary: z.string().optional(),
    publishedAt: z.string().datetime({ offset: true }).optional(),
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
const BoardPackListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['draft', 'published']),
              periodLabel: z.string(),
              downloadUri: z.string().url().optional(),
              initiativeIds: z.array(z.string()).optional(),
              summary: z.string().optional(),
              publishedAt: z.string().datetime({ offset: true }).optional(),
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
const BoardPackCreate = z
  .object({
    periodLabel: z.string().min(1),
    initiativeIds: z.array(z.string()).optional(),
    summary: z.string().optional(),
  })
  .passthrough();
const BoardPackResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['draft', 'published']),
        periodLabel: z.string(),
        downloadUri: z.string().url().optional(),
        initiativeIds: z.array(z.string()).optional(),
        summary: z.string().optional(),
        publishedAt: z.string().datetime({ offset: true }).optional(),
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
  createBoardPack_Body,
  PackStatus,
  Problem,
  PackId,
  BoardPack,
  ResponseMeta,
  BoardPackListResponse,
  BoardPackCreate,
  BoardPackResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/packs',
    alias: 'listBoardPacks',
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
        schema: z.enum(['draft', 'published']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum(['draft', 'published']),
                  periodLabel: z.string(),
                  downloadUri: z.string().url().optional(),
                  initiativeIds: z.array(z.string()).optional(),
                  summary: z.string().optional(),
                  publishedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/packs',
    alias: 'createBoardPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createBoardPack_Body,
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
            id: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['draft', 'published']),
            periodLabel: z.string(),
            downloadUri: z.string().url().optional(),
            initiativeIds: z.array(z.string()).optional(),
            summary: z.string().optional(),
            publishedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/packs/:packId',
    alias: 'getBoardPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'packId',
        type: 'Path',
        schema: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['draft', 'published']),
            periodLabel: z.string(),
            downloadUri: z.string().url().optional(),
            initiativeIds: z.array(z.string()).optional(),
            summary: z.string().optional(),
            publishedAt: z.string().datetime({ offset: true }).optional(),
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
  {
    method: 'post',
    path: '/v1/packs/:packId/publish',
    alias: 'publishBoardPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'packId',
        type: 'Path',
        schema: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['draft', 'published']),
            periodLabel: z.string(),
            downloadUri: z.string().url().optional(),
            initiativeIds: z.array(z.string()).optional(),
            summary: z.string().optional(),
            publishedAt: z.string().datetime({ offset: true }).optional(),
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
