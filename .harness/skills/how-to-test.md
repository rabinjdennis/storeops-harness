# StoreOps Testing Guidance

## Purpose

Tests must demonstrate that StoreOps features satisfy their business
requirements and acceptance criteria.

A passing HTTP status code alone is not sufficient evidence of correct
business behavior.

---

## Test Layers

Prefer tests at the appropriate layer.

### Service Tests

Service tests should verify:

- business rules
- validation
- successful operations
- expected errors
- state changes
- cross-module behavior where applicable

### API Tests

API tests should verify:

- HTTP status
- response body
- business outcome
- error response
- validation behavior

---

## Acceptance Criteria

Every important acceptance criterion should have corresponding test
coverage.

For each criterion ask:

1. What input or precondition is required?
2. What action is performed?
3. What observable result proves the criterion passed?

Translate this into a test.

---

## GIVEN / WHEN / THEN

Acceptance criteria use:

```text
GIVEN <precondition>
WHEN <action>
THEN <expected result>