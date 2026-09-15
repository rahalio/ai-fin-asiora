/**
 * Gates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/gates.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type EthicsFlag = components["schemas"]["EthicsFlag"];
export type EthicsFlagCreate = components["schemas"]["EthicsFlagCreate"];
export type EthicsFlagId = components["schemas"]["EthicsFlagId"];
export type EthicsStatus = components["schemas"]["EthicsStatus"];
export type EthicsTheme = components["schemas"]["EthicsTheme"];
export type EthicsWaiver = components["schemas"]["EthicsWaiver"];
export type TalentGate = components["schemas"]["TalentGate"];
export type TalentGateEval = components["schemas"]["TalentGateEval"];
export type TalentGateId = components["schemas"]["TalentGateId"];
export type Talent = operations["listTalentGates"]["responses"]["200"]["content"]["application/json"]["data"];
export type Ethic = operations["listEthicsFlags"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type EvaluateTalentGateRequestInput = NonNullable<operations["evaluateTalentGate"]["requestBody"]>["content"]["application/json"];
export type RaiseEthicsFlagRequestInput = NonNullable<operations["raiseEthicsFlag"]["requestBody"]>["content"]["application/json"];
export type WaiveEthicsFlagRequestInput = NonNullable<operations["waiveEthicsFlag"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListTalentGatesParams = NonNullable<operations["listTalentGates"]["parameters"]["query"]>;
export type ListEthicsFlagsParams = NonNullable<operations["listEthicsFlags"]["parameters"]["query"]>;
export type WaiveEthicsFlagParams = operations["waiveEthicsFlag"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListTalentGatesResponse = operations["listTalentGates"]["responses"]["200"]["content"]["application/json"];
export type EvaluateTalentGateResponse = operations["evaluateTalentGate"]["responses"]["200"]["content"]["application/json"];
export type ListEthicsFlagsResponse = operations["listEthicsFlags"]["responses"]["200"]["content"]["application/json"];
export type RaiseEthicsFlagResponse = operations["raiseEthicsFlag"]["responses"]["201"]["content"]["application/json"];
export type WaiveEthicsFlagResponse = operations["waiveEthicsFlag"]["responses"]["200"]["content"]["application/json"];


