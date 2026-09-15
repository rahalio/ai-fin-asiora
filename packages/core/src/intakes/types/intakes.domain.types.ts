/**
 * Intakes Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/intakes.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type IdeaIntake = components["schemas"]["IdeaIntake"];
export type IdeaIntakeCreate = components["schemas"]["IdeaIntakeCreate"];
export type IntakeAssign = components["schemas"]["IntakeAssign"];
export type IntakeConvert = components["schemas"]["IntakeConvert"];
export type IntakeId = components["schemas"]["IntakeId"];
export type IntakeStatus = components["schemas"]["IntakeStatus"];
export type Intake = operations["listIdeaIntakes"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateIdeaIntakeRequestInput = NonNullable<operations["createIdeaIntake"]["requestBody"]>["content"]["application/json"];
export type AssignIdeaIntakeRequestInput = NonNullable<operations["assignIdeaIntake"]["requestBody"]>["content"]["application/json"];
export type ConvertIdeaIntakeRequestInput = NonNullable<operations["convertIdeaIntake"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListIdeaIntakesParams = NonNullable<operations["listIdeaIntakes"]["parameters"]["query"]>;
export type GetIdeaIntakeParams = operations["getIdeaIntake"]["parameters"]["path"];
export type AssignIdeaIntakeParams = operations["assignIdeaIntake"]["parameters"]["path"];
export type ConvertIdeaIntakeParams = operations["convertIdeaIntake"]["parameters"]["path"];
export type ExpireIdeaIntakeParams = operations["expireIdeaIntake"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListIdeaIntakesResponse = operations["listIdeaIntakes"]["responses"]["200"]["content"]["application/json"];
export type CreateIdeaIntakeResponse = operations["createIdeaIntake"]["responses"]["201"]["content"]["application/json"];
export type GetIdeaIntakeResponse = operations["getIdeaIntake"]["responses"]["200"]["content"]["application/json"];
export type AssignIdeaIntakeResponse = operations["assignIdeaIntake"]["responses"]["200"]["content"]["application/json"];
export type ConvertIdeaIntakeResponse = operations["convertIdeaIntake"]["responses"]["200"]["content"]["application/json"];
export type ExpireIdeaIntakeResponse = operations["expireIdeaIntake"]["responses"]["200"]["content"]["application/json"];


