/**
 * Packs Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/packs.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BoardPack = components["schemas"]["BoardPack"];
export type BoardPackCreate = components["schemas"]["BoardPackCreate"];
export type PackId = components["schemas"]["PackId"];
export type PackStatus = components["schemas"]["PackStatus"];
export type Pack = operations["listBoardPacks"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateBoardPackRequestInput = NonNullable<operations["createBoardPack"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListBoardPacksParams = NonNullable<operations["listBoardPacks"]["parameters"]["query"]>;
export type GetBoardPackParams = operations["getBoardPack"]["parameters"]["path"];
export type PublishBoardPackParams = operations["publishBoardPack"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListBoardPacksResponse = operations["listBoardPacks"]["responses"]["200"]["content"]["application/json"];
export type CreateBoardPackResponse = operations["createBoardPack"]["responses"]["201"]["content"]["application/json"];
export type GetBoardPackResponse = operations["getBoardPack"]["responses"]["200"]["content"]["application/json"];
export type PublishBoardPackResponse = operations["publishBoardPack"]["responses"]["200"]["content"]["application/json"];


