# StoreOps Review Guidance

## Purpose

Review generated changes objectively against the approved sprint contract,
acceptance criteria, architecture principles, and automated quality gates.

The review must be evidence-based and reproducible.

---

## Review Order

Review in this order:

1. Read the approved sprint contract.
2. Read the Generator summary.
3. Inspect the changed files.
4. Check acceptance criteria.
5. Check business rules.
6. Check architecture.
7. Check tests.
8. Run automated quality checks.
9. Determine the verdict.
10. Record concrete evidence.

---

## Acceptance Criteria Review

For every acceptance criterion:

1. Locate the implementation that addresses it.
2. Locate tests that demonstrate it.
3. Determine whether the expected behavior actually occurs.
4. Record PASS or FAIL.
5. Include evidence.

Do not assume that an implementation passes merely because a test exists.

---

## Architecture Review

Check the changed code for:

- Routes → Service → Repository layering
- direct cross-module Repository imports
- inappropriate cross-module dependencies
- EventBus usage for cross-module side effects
- raw Error throws in Services or Routes
- business logic inside Routes
- business orchestration inside Repositories
- external service calls from Repositories
- circular dependencies

---

## Business-Rule Review

Identify the actual business rules from the sprint contract.

Verify that:

- valid operations produce the expected outcome;
- invalid operations are rejected;
- edge cases are handled;
- state changes are correct;
- cross-module effects occur correctly.

---

## Test Review

Tests should prove behavior.

Check whether tests verify:

- acceptance criteria
- business outcomes
- state changes
- relevant errors
- important negative cases
- cross-module effects when applicable

A test suite that only checks HTTP status codes is insufficient when
business behavior is part of the requirement.

---

## Automated Checks

Run:

```bash
npm run typecheck
npm run lint
npm test -- --coverage