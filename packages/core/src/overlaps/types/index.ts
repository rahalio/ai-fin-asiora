/**
 * Overlaps Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/overlaps.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type OverlapCluster = components["schemas"]["OverlapCluster"];
export type OverlapClusterCreate = components["schemas"]["OverlapClusterCreate"];
export type OverlapId = components["schemas"]["OverlapId"];
export type OverlapResolve = components["schemas"]["OverlapResolve"];
export type OverlapStatus = components["schemas"]["OverlapStatus"];
export type Overlap = operations["listOverlapClusters"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateOverlapClusterRequestInput = NonNullable<operations["createOverlapCluster"]["requestBody"]>["content"]["application/json"];
export type ResolveOverlapClusterRequestInput = NonNullable<operations["resolveOverlapCluster"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListOverlapClustersParams = NonNullable<operations["listOverlapClusters"]["parameters"]["query"]>;
export type GetOverlapClusterParams = operations["getOverlapCluster"]["parameters"]["path"];
export type ResolveOverlapClusterParams = operations["resolveOverlapCluster"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListOverlapClustersResponse = operations["listOverlapClusters"]["responses"]["200"]["content"]["application/json"];
export type CreateOverlapClusterResponse = operations["createOverlapCluster"]["responses"]["201"]["content"]["application/json"];
export type GetOverlapClusterResponse = operations["getOverlapCluster"]["responses"]["200"]["content"]["application/json"];
export type ResolveOverlapClusterResponse = operations["resolveOverlapCluster"]["responses"]["200"]["content"]["application/json"];


