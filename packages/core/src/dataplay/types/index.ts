/**
 * Dataplay Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/dataplay.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CountryConstraint = components["schemas"]["CountryConstraint"];
export type DataPlay = components["schemas"]["DataPlay"];
export type DataPlayCreate = components["schemas"]["DataPlayCreate"];
export type DataPlayId = components["schemas"]["DataPlayId"];
export type DataPlayUpdate = components["schemas"]["DataPlayUpdate"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateDataPlayRequestInput = NonNullable<operations["createDataPlay"]["requestBody"]>["content"]["application/json"];
export type UpdateDataPlayRequestInput = NonNullable<operations["updateDataPlay"]["requestBody"]>["content"]["application/json"];
export type UpdateDataPlayRequest = UpdateDataPlayRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDataPlaysParams = NonNullable<operations["listDataPlays"]["parameters"]["query"]>;
export type GetDataPlayParams = operations["getDataPlay"]["parameters"]["path"];
export type UpdateDataPlayParams = operations["updateDataPlay"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDataPlaysResponse = operations["listDataPlays"]["responses"]["200"]["content"]["application/json"];
export type CreateDataPlayResponse = operations["createDataPlay"]["responses"]["201"]["content"]["application/json"];
export type GetDataPlayResponse = operations["getDataPlay"]["responses"]["200"]["content"]["application/json"];
export type UpdateDataPlayResponse = operations["updateDataPlay"]["responses"]["200"]["content"]["application/json"];


