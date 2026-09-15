import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const setInsuranceScenario_Body = z
  .object({
    insuranceScenario: z.enum([
      'channel',
      'machineUw',
      'flexibleProduct',
      'ezLife',
      'hybrid',
    ]),
    rationale: z.string().optional(),
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
const ScenarioPostureId = z.string();
const InsuranceScenarioChoice = z.enum([
  'channel',
  'machineUw',
  'flexibleProduct',
  'ezLife',
  'hybrid',
]);
const ScenarioPosture = z
  .object({
    id: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    insuranceScenario: z.enum([
      'channel',
      'machineUw',
      'flexibleProduct',
      'ezLife',
      'hybrid',
    ]),
    rationale: z.string().optional(),
    setAt: z.string().datetime({ offset: true }).optional(),
    setBy: z.string().optional(),
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
const ScenarioPostureListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
              initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
              insuranceScenario: z.enum([
                'channel',
                'machineUw',
                'flexibleProduct',
                'ezLife',
                'hybrid',
              ]),
              rationale: z.string().optional(),
              setAt: z.string().datetime({ offset: true }).optional(),
              setBy: z.string().optional(),
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
const ScenarioPostureResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
        initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
        insuranceScenario: z.enum([
          'channel',
          'machineUw',
          'flexibleProduct',
          'ezLife',
          'hybrid',
        ]),
        rationale: z.string().optional(),
        setAt: z.string().datetime({ offset: true }).optional(),
        setBy: z.string().optional(),
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
const ScenarioPostureSet = z
  .object({
    insuranceScenario: z.enum([
      'channel',
      'machineUw',
      'flexibleProduct',
      'ezLife',
      'hybrid',
    ]),
    rationale: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  setInsuranceScenario_Body,
  Problem,
  ScenarioPostureId,
  InsuranceScenarioChoice,
  ScenarioPosture,
  ResponseMeta,
  ScenarioPostureListResponse,
  ScenarioPostureResponse,
  ScenarioPostureSet,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/initiatives/:initiativeId/scenario',
    alias: 'getInitiativeScenario',
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
            id: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            insuranceScenario: z.enum([
              'channel',
              'machineUw',
              'flexibleProduct',
              'ezLife',
              'hybrid',
            ]),
            rationale: z.string().optional(),
            setAt: z.string().datetime({ offset: true }).optional(),
            setBy: z.string().optional(),
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
    method: 'put',
    path: '/v1/initiatives/:initiativeId/scenario',
    alias: 'setInsuranceScenario',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: setInsuranceScenario_Body,
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
            id: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            insuranceScenario: z.enum([
              'channel',
              'machineUw',
              'flexibleProduct',
              'ezLife',
              'hybrid',
            ]),
            rationale: z.string().optional(),
            setAt: z.string().datetime({ offset: true }).optional(),
            setBy: z.string().optional(),
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
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
    path: '/v1/scenarios',
    alias: 'listScenarioPostures',
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
        name: 'unposturedOnly',
        type: 'Query',
        schema: z.boolean().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  initiativeId: z
                    .string()
                    .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
                  insuranceScenario: z.enum([
                    'channel',
                    'machineUw',
                    'flexibleProduct',
                    'ezLife',
                    'hybrid',
                  ]),
                  rationale: z.string().optional(),
                  setAt: z.string().datetime({ offset: true }).optional(),
                  setBy: z.string().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
