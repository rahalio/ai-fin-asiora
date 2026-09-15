import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDataPlay_Body = z
  .object({
    name: z.string().min(1),
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    dataSources: z.array(z.string()).optional(),
    monetisationHypothesis: z.string().optional(),
    crossSellAllowed: z.boolean().optional(),
    countryConstraints: z
      .array(
        z
          .object({
            country: z.string(),
            localisationOk: z.boolean(),
            consentBasis: z.string(),
            notes: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
  })
  .passthrough();
const updateDataPlay_Body = z
  .object({
    name: z.string(),
    dataSources: z.array(z.string()),
    monetisationHypothesis: z.string(),
    crossSellAllowed: z.boolean(),
    countryConstraints: z.array(
      z
        .object({
          country: z.string(),
          localisationOk: z.boolean(),
          consentBasis: z.string(),
          notes: z.string().optional(),
        })
        .passthrough()
    ),
  })
  .partial()
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
const DataPlayId = z.string();
const CountryConstraint = z
  .object({
    country: z.string(),
    localisationOk: z.boolean(),
    consentBasis: z.string(),
    notes: z.string().optional(),
  })
  .passthrough();
const DataPlay = z
  .object({
    id: z.string().regex(/^dpl_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    dataSources: z.array(z.string()).optional(),
    monetisationHypothesis: z.string().optional(),
    crossSellAllowed: z.boolean().optional(),
    countryConstraints: z
      .array(
        z
          .object({
            country: z.string(),
            localisationOk: z.boolean(),
            consentBasis: z.string(),
            notes: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
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
const DataPlayListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^dpl_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
              dataSources: z.array(z.string()).optional(),
              monetisationHypothesis: z.string().optional(),
              crossSellAllowed: z.boolean().optional(),
              countryConstraints: z
                .array(
                  z
                    .object({
                      country: z.string(),
                      localisationOk: z.boolean(),
                      consentBasis: z.string(),
                      notes: z.string().optional(),
                    })
                    .passthrough()
                )
                .optional(),
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
const DataPlayCreate = z
  .object({
    name: z.string().min(1),
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    dataSources: z.array(z.string()).optional(),
    monetisationHypothesis: z.string().optional(),
    crossSellAllowed: z.boolean().optional(),
    countryConstraints: z
      .array(
        z
          .object({
            country: z.string(),
            localisationOk: z.boolean(),
            consentBasis: z.string(),
            notes: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
  })
  .passthrough();
const DataPlayResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^dpl_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
        dataSources: z.array(z.string()).optional(),
        monetisationHypothesis: z.string().optional(),
        crossSellAllowed: z.boolean().optional(),
        countryConstraints: z
          .array(
            z
              .object({
                country: z.string(),
                localisationOk: z.boolean(),
                consentBasis: z.string(),
                notes: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
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
const DataPlayUpdate = z
  .object({
    name: z.string(),
    dataSources: z.array(z.string()),
    monetisationHypothesis: z.string(),
    crossSellAllowed: z.boolean(),
    countryConstraints: z.array(
      z
        .object({
          country: z.string(),
          localisationOk: z.boolean(),
          consentBasis: z.string(),
          notes: z.string().optional(),
        })
        .passthrough()
    ),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createDataPlay_Body,
  updateDataPlay_Body,
  Problem,
  DataPlayId,
  CountryConstraint,
  DataPlay,
  ResponseMeta,
  DataPlayListResponse,
  DataPlayCreate,
  DataPlayResponse,
  DataPlayUpdate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/data-plays',
    alias: 'listDataPlays',
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
        name: 'initiativeId',
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
                  id: z.string().regex(/^dpl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  initiativeId: z
                    .string()
                    .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dataSources: z.array(z.string()).optional(),
                  monetisationHypothesis: z.string().optional(),
                  crossSellAllowed: z.boolean().optional(),
                  countryConstraints: z
                    .array(
                      z
                        .object({
                          country: z.string(),
                          localisationOk: z.boolean(),
                          consentBasis: z.string(),
                          notes: z.string().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
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
    path: '/v1/data-plays',
    alias: 'createDataPlay',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDataPlay_Body,
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
            id: z.string().regex(/^dpl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            dataSources: z.array(z.string()).optional(),
            monetisationHypothesis: z.string().optional(),
            crossSellAllowed: z.boolean().optional(),
            countryConstraints: z
              .array(
                z
                  .object({
                    country: z.string(),
                    localisationOk: z.boolean(),
                    consentBasis: z.string(),
                    notes: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/data-plays/:dataPlayId',
    alias: 'getDataPlay',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dataPlayId',
        type: 'Path',
        schema: z.string().regex(/^dpl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^dpl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            dataSources: z.array(z.string()).optional(),
            monetisationHypothesis: z.string().optional(),
            crossSellAllowed: z.boolean().optional(),
            countryConstraints: z
              .array(
                z
                  .object({
                    country: z.string(),
                    localisationOk: z.boolean(),
                    consentBasis: z.string(),
                    notes: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
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
    path: '/v1/data-plays/:dataPlayId',
    alias: 'updateDataPlay',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateDataPlay_Body,
      },
      {
        name: 'dataPlayId',
        type: 'Path',
        schema: z.string().regex(/^dpl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^dpl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            dataSources: z.array(z.string()).optional(),
            monetisationHypothesis: z.string().optional(),
            crossSellAllowed: z.boolean().optional(),
            countryConstraints: z
              .array(
                z
                  .object({
                    country: z.string(),
                    localisationOk: z.boolean(),
                    consentBasis: z.string(),
                    notes: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
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
