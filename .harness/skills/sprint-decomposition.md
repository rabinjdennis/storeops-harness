# Sprint Decomposition Guidance

## Purpose

Use this guidance when converting a feature request into small,
implementable StoreOps sprints.

## Decomposition Principles

Each sprint should have:

- one clear objective
- limited scope
- explicit inputs
- concrete implementation changes
- testable acceptance criteria
- architecture checks
- a definition of done

Prefer several small sprints over one large implementation sprint.

## Acceptance Criteria

Acceptance criteria must use:

GIVEN
WHEN
THEN

Each criterion should describe an observable behavior.

### Good Example

GIVEN a valid activity exists
WHEN the client requests the activity by ID
THEN the API returns HTTP 200 and the activity details

### Poor Example

The activity API should work correctly.

The second example is not sufficiently testable.

## Include Negative Cases

Where relevant, acceptance criteria should cover:

- missing resources
- invalid input
- unauthorized operations
- duplicate operations
- boundary conditions
- architectural violations

## Sprint Ordering

Consider dependencies when ordering sprints.

A typical sequence is:

1. Domain/model changes
2. Repository changes
3. Service/business rules
4. API/routes
5. Cross-module event integration
6. Tests and validation

The exact sequence should be adapted to the feature.

## Architecture Awareness

Every sprint must identify architecture rules relevant to its changes.

The Planner must not design a solution that violates StoreOps module
boundaries simply because it is easier to implement.

## Assumptions

If the feature request does not provide enough information, explicitly
record assumptions and open questions in `spec.md`.

Do not silently invent business requirements.