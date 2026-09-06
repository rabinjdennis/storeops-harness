# StoreOps Evaluation Criteria

## Purpose

Evaluate every generated sprint consistently against measurable quality
dimensions and hard gates.

The Evaluator must use evidence rather than subjective judgment.

---

## Evaluation Dimensions

Evaluate the implementation across these dimensions:

### 1. Acceptance Criteria

Question:

> Does the implementation satisfy every mandatory acceptance criterion?

Check:

- expected behavior
- successful scenarios
- negative scenarios
- edge cases identified by the contract

---

### 2. Business Rules

Question:

> Does the implementation enforce the required StoreOps business rules?

Check:

- validation
- state transitions
- business constraints
- correct resulting state
- error behavior

---

### 3. Architecture

Question:

> Does the implementation follow StoreOps architecture?

Check:

- Routes → Service → Repository
- module boundaries
- EventBus usage
- absence of circular dependencies
- AppError usage
- repository responsibilities

---

### 4. Test Quality

Question:

> Do the tests prove business behavior?

Check:

- acceptance criteria coverage
- meaningful assertions
- positive cases
- negative cases
- business outcomes
- relevant cross-module behavior

HTTP status assertions alone are insufficient when the requirement includes
business behavior.

---

### 5. Code Quality

Question:

> Is the implementation maintainable and consistent with project
> conventions?

Check:

- TypeScript strictness
- naming
- readability
- appropriate separation of concerns
- unnecessary duplication
- unnecessary complexity

---

### 6. Scope Compliance

Question:

> Did the Generator implement the approved sprint without unnecessary
> expansion?

Check:

- requested changes are implemented
- unrelated behavior is not changed
- necessary dependencies are documented

---

## Hard Gates

Regardless of other scores, the following must pass for a PASS verdict:

1. TypeScript type check
2. ESLint
3. Jest tests
4. Mandatory acceptance criteria
5. Critical architecture rules

Run:

```bash
npm run typecheck
npm run lint
npm test -- --coverage