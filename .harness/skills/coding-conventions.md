# StoreOps Coding Conventions

## TypeScript

Use TypeScript with strict type checking.

Prefer:

- explicit interfaces for domain models
- explicit input types for service methods
- meaningful variable and function names
- small focused functions
- readonly properties where appropriate
- type-safe return values

Avoid:

- `any` unless there is a documented justification
- unnecessary type assertions
- duplicated business logic
- overly large functions
- unused variables or imports

---

## Naming

Use clear names that describe business intent.

Examples:

```text
ActivityService
ActivityRepository
createActivity
getActivityById
ACTIVITY_NOT_FOUND