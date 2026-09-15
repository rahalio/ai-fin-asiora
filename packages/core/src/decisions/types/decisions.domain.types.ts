/**
 * Decisions Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/decisions.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DecisionId = components["schemas"]["DecisionId"];
export type FundingDecision = components["schemas"]["FundingDecision"];
export type FundingDecisionCreate = components["schemas"]["FundingDecisionCreate"];
export type FundingOutcome = components["schemas"]["FundingOutcome"];
export type Decision = operations["listFundingDecisions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RecordFundingDecisionRequestInput = NonNullable<operations["recordFundingDecision"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFundingDecisionsParams = NonNullable<operations["listFundingDecisions"]["parameters"]["query"]>;
export type GetFundingDecisionParams = operations["getFundingDecision"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFundingDecisionsResponse = operations["listFundingDecisions"]["responses"]["200"]["content"]["application/json"];
export type RecordFundingDecisionResponse = operations["recordFundingDecision"]["responses"]["201"]["content"]["application/json"];
export type GetFundingDecisionResponse = operations["getFundingDecision"]["responses"]["200"]["content"]["application/json"];


