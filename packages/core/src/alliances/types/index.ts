/**
 * Alliances Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/alliances.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AllianceId = components["schemas"]["AllianceId"];
export type AllianceScore = components["schemas"]["AllianceScore"];
export type AllianceScoreCreate = components["schemas"]["AllianceScoreCreate"];
export type HubPeriphery = components["schemas"]["HubPeriphery"];
export type Alliance = operations["listAllianceScores"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateAllianceScoreRequestInput = NonNullable<operations["createAllianceScore"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAllianceScoresParams = NonNullable<operations["listAllianceScores"]["parameters"]["query"]>;
export type GetAllianceScoreParams = operations["getAllianceScore"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAllianceScoresResponse = operations["listAllianceScores"]["responses"]["200"]["content"]["application/json"];
export type CreateAllianceScoreResponse = operations["createAllianceScore"]["responses"]["201"]["content"]["application/json"];
export type GetAllianceScoreResponse = operations["getAllianceScore"]["responses"]["200"]["content"]["application/json"];


