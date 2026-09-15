import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createIdeaIntake_Body = z
  .object({
    title: z.string().min(1),
    source: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const convertIdeaIntake_Body = z
  .object({
    vertical: z.enum(['aiOps', 'insurance', 'assetManagement', 'realEstate']),
    name: z.string().optional(),
    owner: z.string().optional(),
  })
  .passthrough();
const IntakeStatus = z.enum(['new', 'owned', 'converted', 'expired']);
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
const IntakeId = z.string();
const IdeaIntake = z
  .object({
    id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
    title: z.string(),
    source: z.string().optional(),
    status: z.enum(['new', 'owned', 'converted', 'expired']),
    owner: z.string().optional(),
    notes: z.string().optional(),
    slaDueAt: z.string().datetime({ offset: true }).optional(),
    convertedInitiativeId: z
      .string()
      .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
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
const IdeaIntakeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
              title: z.string(),
              source: z.string().optional(),
              status: z.enum(['new', 'owned', 'converted', 'expired']),
              owner: z.string().optional(),
              notes: z.string().optional(),
              slaDueAt: z.string().datetime({ offset: true }).optional(),
              convertedInitiativeId: z
                .string()
                .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
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
const IdeaIntakeCreate = z
  .object({
    title: z.string().min(1),
    source: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const IdeaIntakeResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
        title: z.string(),
        source: z.string().optional(),
        status: z.enum(['new', 'owned', 'converted', 'expired']),
        owner: z.string().optional(),
        notes: z.string().optional(),
        slaDueAt: z.string().datetime({ offset: true }).optional(),
        convertedInitiativeId: z
          .string()
          .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
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
const IntakeAssign = z.object({ owner: z.string().min(1) }).passthrough();
const IntakeConvert = z
  .object({
    vertical: z.enum(['aiOps', 'insurance', 'assetManagement', 'realEstate']),
    name: z.string().optional(),
    owner: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  createIdeaIntake_Body,
  convertIdeaIntake_Body,
  IntakeStatus,
  Problem,
  IntakeId,
  IdeaIntake,
  ResponseMeta,
  IdeaIntakeListResponse,
  IdeaIntakeCreate,
  IdeaIntakeResponse,
  IntakeAssign,
  IntakeConvert,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/intakes',
    alias: 'listIdeaIntakes',
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
        schema: z.enum(['new', 'owned', 'converted', 'expired']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
                  title: z.string(),
                  source: z.string().optional(),
                  status: z.enum(['new', 'owned', 'converted', 'expired']),
                  owner: z.string().optional(),
                  notes: z.string().optional(),
                  slaDueAt: z.string().datetime({ offset: true }).optional(),
                  convertedInitiativeId: z
                    .string()
                    .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
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
    path: '/v1/intakes',
    alias: 'createIdeaIntake',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createIdeaIntake_Body,
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
            id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            source: z.string().optional(),
            status: z.enum(['new', 'owned', 'converted', 'expired']),
            owner: z.string().optional(),
            notes: z.string().optional(),
            slaDueAt: z.string().datetime({ offset: true }).optional(),
            convertedInitiativeId: z
              .string()
              .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
    path: '/v1/intakes/:intakeId',
    alias: 'getIdeaIntake',
    requestFormat: 'json',
    parameters: [
      {
        name: 'intakeId',
        type: 'Path',
        schema: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            source: z.string().optional(),
            status: z.enum(['new', 'owned', 'converted', 'expired']),
            owner: z.string().optional(),
            notes: z.string().optional(),
            slaDueAt: z.string().datetime({ offset: true }).optional(),
            convertedInitiativeId: z
              .string()
              .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
    path: '/v1/intakes/:intakeId/assign',
    alias: 'assignIdeaIntake',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ owner: z.string().min(1) }).passthrough(),
      },
      {
        name: 'intakeId',
        type: 'Path',
        schema: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            source: z.string().optional(),
            status: z.enum(['new', 'owned', 'converted', 'expired']),
            owner: z.string().optional(),
            notes: z.string().optional(),
            slaDueAt: z.string().datetime({ offset: true }).optional(),
            convertedInitiativeId: z
              .string()
              .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
    path: '/v1/intakes/:intakeId/convert',
    alias: 'convertIdeaIntake',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: convertIdeaIntake_Body,
      },
      {
        name: 'intakeId',
        type: 'Path',
        schema: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            source: z.string().optional(),
            status: z.enum(['new', 'owned', 'converted', 'expired']),
            owner: z.string().optional(),
            notes: z.string().optional(),
            slaDueAt: z.string().datetime({ offset: true }).optional(),
            convertedInitiativeId: z
              .string()
              .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
    path: '/v1/intakes/:intakeId/expire',
    alias: 'expireIdeaIntake',
    requestFormat: 'json',
    parameters: [
      {
        name: 'intakeId',
        type: 'Path',
        schema: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            source: z.string().optional(),
            status: z.enum(['new', 'owned', 'converted', 'expired']),
            owner: z.string().optional(),
            notes: z.string().optional(),
            slaDueAt: z.string().datetime({ offset: true }).optional(),
            convertedInitiativeId: z
              .string()
              .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
