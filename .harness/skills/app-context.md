# StoreOps Application Context

## Purpose

StoreOps is a retail operations API.

The application is organized into five business modules:

- activities
- programmes
- staff
- alerts
- reports

## Technology Stack

- Node.js 20 LTS
- TypeScript 5.x
- Express 4.x
- Jest
- Supertest
- ESLint

## Application Architecture

Each module follows:

Routes → Service → Repository

Shared infrastructure is located under:

src/shared/

Current shared components include:

- AppError
- error handler
- EventBus

## API Scope

The learner-defined working API specification is maintained in:

STOREOPS_API_SPEC.md

That document is explicitly a working specification because the
programme's separate StoreOps Scaffold document is not currently
available in this repository.

If the official Scaffold becomes available, compare the working
specification against it before treating learner-defined endpoint details
as authoritative.

## Development Goal

The harness is intended to support governed AI-assisted development of
StoreOps features.

The primary demonstration feature is:

Shift Handover Bulk Update.