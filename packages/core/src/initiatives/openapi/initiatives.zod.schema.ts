import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createInitiative_Body = z
  .object({
    name: z.string().min(1),
    vertical: z.enum(['aiOps', 'insurance', 'assetManagement', 'realEstate']),
    owner: z.string().optional(),
    summary: z.string().optional(),
    countries: z.array(z.string()).optional(),
    crossVerticalDeps: z.array(z.string()).optional(),
    governanceMode: z.enum(['consortium', 'unilateral', 'unset']).optional(),
    consortiumNotes: z.string().optional(),
  })
  .passthrough();
const updateInitiative_Body = z
  .object({
    name: z.string(),
    owner: z.string(),
    summary: z.string(),
    status: z.enum(['intake', 'scored', 'funded', 'killed', 'scaled']),
    countries: z.array(z.string()),
    crossVerticalDeps: z.array(z.string()),
    governanceMode: z.enum(['consortium', 'unilateral', 'unset']),
    consortiumNotes: z.string(),
  })
  .partial()
  .passthrough();
const Vertical = z.enum([
  'aiOps',
  'insurance',
  'assetManagement',
  'realEstate',
]);
const InitiativeStatus = z.enum([
  'intake',
  'scored',
  'funded',
  'killed',
  'scaled',
]);
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
const InitiativeId = z.string();
const InsuranceScenario = z.enum([
  'channel',
  'machineUw',
  'flexibleProduct',
  'ezLife',
  'hybrid',
  'none',
]);
const GovernanceMode = z.enum(['consortium', 'unilateral', 'unset']);
const Initiative = z
  .object({
    id: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    vertical: z.enum(['aiOps', 'insurance', 'assetManagement', 'realEstate']),
    status: z.enum(['intake', 'scored', 'funded', 'killed', 'scaled']),
    insuranceScenario: z
      .enum([
        'channel',
        'machineUw',
        'flexibleProduct',
        'ezLife',
        'hybrid',
        'none',
      ])
      .optional(),
    owner: z.string().optional(),
    summary: z.string().optional(),
    countries: z.array(z.string()).optional(),
    crossVerticalDeps: z
      .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    governanceMode: z.enum(['consortium', 'unilateral', 'unset']).optional(),
    consortiumNotes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
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
const InitiativeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              vertical: z.enum([
                'aiOps',
                'insurance',
                'assetManagement',
                'realEstate',
              ]),
              status: z.enum([
                'intake',
                'scored',
                'funded',
                'killed',
                'scaled',
              ]),
              insuranceScenario: z
                .enum([
                  'channel',
                  'machineUw',
                  'flexibleProduct',
                  'ezLife',
                  'hybrid',
                  'none',
                ])
                .optional(),
              owner: z.string().optional(),
              summary: z.string().optional(),
              countries: z.array(z.string()).optional(),
              crossVerticalDeps: z
                .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
                .optional(),
              governanceMode: z
                .enum(['consortium', 'unilateral', 'unset'])
                .optional(),
              consortiumNotes: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }).optional(),
              updatedAt: z.string().datetime({ offset: true }).optional(),
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
const InitiativeCreate = z
  .object({
    name: z.string().min(1),
    vertical: z.enum(['aiOps', 'insurance', 'assetManagement', 'realEstate']),
    owner: z.string().optional(),
    summary: z.string().optional(),
    countries: z.array(z.string()).optional(),
    crossVerticalDeps: z.array(z.string()).optional(),
    governanceMode: z.enum(['consortium', 'unilateral', 'unset']).optional(),
    consortiumNotes: z.string().optional(),
  })
  .passthrough();
const InitiativeResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        vertical: z.enum([
          'aiOps',
          'insurance',
          'assetManagement',
          'realEstate',
        ]),
        status: z.enum(['intake', 'scored', 'funded', 'killed', 'scaled']),
        insuranceScenario: z
          .enum([
            'channel',
            'machineUw',
            'flexibleProduct',
            'ezLife',
            'hybrid',
            'none',
          ])
          .optional(),
        owner: z.string().optional(),
        summary: z.string().optional(),
        countries: z.array(z.string()).optional(),
        crossVerticalDeps: z
          .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
          .optional(),
        governanceMode: z
          .enum(['consortium', 'unilateral', 'unset'])
          .optional(),
        consortiumNotes: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }).optional(),
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
const InitiativeUpdate = z
  .object({
    name: z.string(),
    owner: z.string(),
    summary: z.string(),
    status: z.enum(['intake', 'scored', 'funded', 'killed', 'scaled']),
    countries: z.array(z.string()),
    crossVerticalDeps: z.array(z.string()),
    governanceMode: z.enum(['consortium', 'unilateral', 'unset']),
    consortiumNotes: z.string(),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createInitiative_Body,
  updateInitiative_Body,
  Vertical,
  InitiativeStatus,
  Problem,
  InitiativeId,
  InsuranceScenario,
  GovernanceMode,
  Initiative,
  ResponseMeta,
  InitiativeListResponse,
  InitiativeCreate,
  InitiativeResponse,
  InitiativeUpdate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/initiatives',
    alias: 'listInitiatives',
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
        name: 'vertical',
        type: 'Query',
        schema: z
          .enum(['aiOps', 'insurance', 'assetManagement', 'realEstate'])
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['intake', 'scored', 'funded', 'killed', 'scaled'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  vertical: z.enum([
                    'aiOps',
                    'insurance',
                    'assetManagement',
                    'realEstate',
                  ]),
                  status: z.enum([
                    'intake',
                    'scored',
                    'funded',
                    'killed',
                    'scaled',
                  ]),
                  insuranceScenario: z
                    .enum([
                      'channel',
                      'machineUw',
                      'flexibleProduct',
                      'ezLife',
                      'hybrid',
                      'none',
                    ])
                    .optional(),
                  owner: z.string().optional(),
                  summary: z.string().optional(),
                  countries: z.array(z.string()).optional(),
                  crossVerticalDeps: z
                    .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .optional(),
                  governanceMode: z
                    .enum(['consortium', 'unilateral', 'unset'])
                    .optional(),
                  consortiumNotes: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/initiatives',
    alias: 'createInitiative',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createInitiative_Body,
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
            id: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            vertical: z.enum([
              'aiOps',
              'insurance',
              'assetManagement',
              'realEstate',
            ]),
            status: z.enum(['intake', 'scored', 'funded', 'killed', 'scaled']),
            insuranceScenario: z
              .enum([
                'channel',
                'machineUw',
                'flexibleProduct',
                'ezLife',
                'hybrid',
                'none',
              ])
              .optional(),
            owner: z.string().optional(),
            summary: z.string().optional(),
            countries: z.array(z.string()).optional(),
            crossVerticalDeps: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            governanceMode: z
              .enum(['consortium', 'unilateral', 'unset'])
              .optional(),
            consortiumNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
        status: 400,
        description: `Malformed request`,
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
    path: '/v1/initiatives/:initiativeId',
    alias: 'getInitiative',
    requestFormat: 'json',
    parameters: [
      {
        name: 'initiativeId',
        type: 'Path',
        schema: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            vertical: z.enum([
              'aiOps',
              'insurance',
              'assetManagement',
              'realEstate',
            ]),
            status: z.enum(['intake', 'scored', 'funded', 'killed', 'scaled']),
            insuranceScenario: z
              .enum([
                'channel',
                'machineUw',
                'flexibleProduct',
                'ezLife',
                'hybrid',
                'none',
              ])
              .optional(),
            owner: z.string().optional(),
            summary: z.string().optional(),
            countries: z.array(z.string()).optional(),
            crossVerticalDeps: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            governanceMode: z
              .enum(['consortium', 'unilateral', 'unset'])
              .optional(),
            consortiumNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'patch',
    path: '/v1/initiatives/:initiativeId',
    alias: 'updateInitiative',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateInitiative_Body,
      },
      {
        name: 'initiativeId',
        type: 'Path',
        schema: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            vertical: z.enum([
              'aiOps',
              'insurance',
              'assetManagement',
              'realEstate',
            ]),
            status: z.enum(['intake', 'scored', 'funded', 'killed', 'scaled']),
            insuranceScenario: z
              .enum([
                'channel',
                'machineUw',
                'flexibleProduct',
                'ezLife',
                'hybrid',
                'none',
              ])
              .optional(),
            owner: z.string().optional(),
            summary: z.string().optional(),
            countries: z.array(z.string()).optional(),
            crossVerticalDeps: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            governanceMode: z
              .enum(['consortium', 'unilateral', 'unset'])
              .optional(),
            consortiumNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
