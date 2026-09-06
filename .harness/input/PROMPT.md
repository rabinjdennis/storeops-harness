# StoreOps Harness Build Prompt

## Objective

Implement the StoreOps API using the working specification in
`STOREOPS_API_SPEC.md`.

The primary demonstration feature is:

**Shift Handover Bulk Update**

## Requirements

Build the StoreOps API using:

- TypeScript
- Node.js 20 LTS
- Express
- Jest
- Supertest
- ESLint

Follow the architecture:

Routes → Service → Repository

The five StoreOps modules are:

- activities
- programmes
- staff
- alerts
- reports

## Architecture Rules

1. Do not create circular imports.
2. Do not directly import another module's repository.
3. Cross-module side effects must use EventBus.
4. Readers of another module must be read-only.
5. Services and routes must use AppError for expected errors.
6. Do not use raw `Error` in services or routes.
7. Repositories must not call external services.

## Baseline Checks

The project must pass:

```text
npm run typecheck
npm run lint
npm test -- --coverage
```