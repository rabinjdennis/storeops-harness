# StoreOps Claude Code Development Harness

## 1. Purpose

This repository contains the StoreOps API and a Claude Code development
harness for governed AI-assisted development.

The harness exists to ensure that generated code follows the StoreOps
architecture, coding standards, testing requirements, and module boundaries.

The harness must prefer architectural correctness and business-rule
compliance over simply producing code that compiles.

---

## 2. StoreOps Architecture Rules

The application contains five modules:

- activities
- programmes
- staff
- alerts
- reports

Each module follows:

Routes → Service → Repository

### Module boundaries

1. A module must not directly import another module's Repository.
2. Cross-module side effects must use the shared EventBus.
3. A module may read information from another module only through an
   approved read-only interface/service boundary.
4. Repositories must not call external services.
5. Services and routes must use the typed AppError hierarchy for expected
   application errors.
6. Services and routes must not throw raw Error objects.
7. Avoid circular imports between modules.
8. Business rules belong in the Service layer.
9. HTTP concerns belong in the Route layer.
10. Persistence concerns belong in the Repository layer.

---

## 3. Baseline Quality Checks

The baseline automated checks are:

```bash
npm run typecheck
npm run lint
npm test -- --coverage