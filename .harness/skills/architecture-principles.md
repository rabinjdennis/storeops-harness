# StoreOps Architecture Principles

## Layering

Every module follows:

Routes → Service → Repository

### Routes

Routes are responsible for:

- HTTP request handling
- HTTP response formatting
- calling the appropriate Service

Routes must not contain business logic.

### Services

Services are responsible for:

- business rules
- validation
- orchestration
- application-level decisions

Expected application errors must use AppError.

Services must not throw raw Error objects.

### Repositories

Repositories are responsible for:

- persistence
- retrieval
- updating domain data

Repositories must not contain business orchestration.

Repositories must not call external services.

---

## Module Boundaries

StoreOps has five modules:

- activities
- programmes
- staff
- alerts
- reports

A module must not directly import another module's Repository.

Cross-module side effects must use EventBus.

When another module's information is required for reading, use an
approved read-only boundary.

---

## Error Handling

Expected application errors use:

AppError

AppError contains:

- code
- message
- statusCode

Do not introduce raw Error throws in Services or Routes.

---

## Dependency Rules

Avoid:

- circular module dependencies
- direct sibling Repository imports
- persistence logic in Routes
- business logic in Routes
- external service calls from Repositories

Prefer:

- clear module ownership
- Service-level business rules
- EventBus for cross-module side effects
- typed application errors
- tests that verify business behavior