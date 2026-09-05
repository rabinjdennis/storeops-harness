# StoreOps API — Working Specification

## 1. Purpose

This document defines the working REST API specification for the StoreOps application used in the AI-Native Tech Architect Programme — Build Track.

The programme PDF requires a StoreOps application with five modules and nine REST endpoints. The supplied programme PDF does not contain the detailed endpoint inventory from the referenced StoreOps Project Scaffold.

Therefore, the endpoint definitions in this document are **learner implementation decisions** and must be treated as a working specification rather than an official programme-provided endpoint contract.

If the official StoreOps Project Scaffold becomes available, this specification must be reviewed against it before the final submission.

---

## 2. StoreOps Modules

The application contains five modules:

1. Activities
2. Programmes
3. Staff
4. Alerts
5. Reports

Each module follows the required layered architecture:

```text
Routes → Service → Repository
```

The modules must remain independently structured and must not introduce circular imports.

Cross-module side effects must use the EventBus rather than directly accessing another module's repository.

---

## 3. Proposed REST Endpoints

| # | Method | Endpoint               | Owning Module | Purpose                                  |
| - | ------ | ---------------------- | ------------- | ---------------------------------------- |
| 1 | GET    | `/api/activities`      | Activities    | List activities                          |
| 2 | POST   | `/api/activities`      | Activities    | Create an activity                       |
| 3 | GET    | `/api/programmes/:id`  | Programmes    | Retrieve a programme                     |
| 4 | POST   | `/api/programmes`      | Programmes    | Create a programme                       |
| 5 | GET    | `/api/staff/:id`       | Staff         | Retrieve staff information               |
| 6 | PUT    | `/api/tasks/:id`       | Activities    | Update a task                            |
| 7 | POST   | `/api/alerts`          | Alerts        | Create an alert                          |
| 8 | GET    | `/api/alerts`          | Alerts        | List alerts                              |
| 9 | GET    | `/api/reports/summary` | Reports       | Retrieve a read-only operational summary |

---

## 4. Endpoint Details

### 4.1 List Activities

**GET `/api/activities`**

Returns the activities available in StoreOps.

Expected successful response:

```json
{
  "activities": []
}
```

The exact activity fields will be defined by the application domain model.

---

### 4.2 Create Activity

**POST `/api/activities`**

Creates a new activity.

Example request:

```json
{
  "name": "Store inspection",
  "description": "Complete the scheduled store inspection"
}
```

Expected successful response:

```json
{
  "activity": {
    "id": "activity-001",
    "name": "Store inspection",
    "description": "Complete the scheduled store inspection"
  }
}
```

The exact fields may be refined when the official Scaffold becomes available.

---

### 4.3 Get Programme

**GET `/api/programmes/:id`**

Retrieves a programme using its identifier.

Example:

```text
GET /api/programmes/programme-001
```

Expected successful response:

```json
{
  "programme": {
    "id": "programme-001"
  }
}
```

---

### 4.4 Create Programme

**POST `/api/programmes`**

Creates a new programme.

Example request:

```json
{
  "name": "Summer Operations Programme"
}
```

Expected successful response:

```json
{
  "programme": {
    "id": "programme-001",
    "name": "Summer Operations Programme"
  }
}
```

---

### 4.5 Get Staff Member

**GET `/api/staff/:id`**

Retrieves staff information using a staff identifier.

Example:

```text
GET /api/staff/staff-001
```

Expected successful response:

```json
{
  "staff": {
    "id": "staff-001"
  }
}
```

---

### 4.6 Update Task

**PUT `/api/tasks/:id`**

Updates a task.

Example:

```text
PUT /api/tasks/task-001
```

Example request:

```json
{
  "status": "COMPLETED"
}
```

A successful update may publish a domain event through the EventBus.

For example:

```text
Task updated
    ↓
TaskUpdated event
    ↓
EventBus
    ↓
Interested module(s)
```

The endpoint is owned by the Activities module because tasks are treated as part of operational activities.

This endpoint will also be used as the foundation for demonstrating the **Shift Handover Bulk Update** feature identified in the programme material.

---

### 4.7 Create Alert

**POST `/api/alerts`**

Creates or raises an operational alert.

Example request:

```json
{
  "type": "TASK_DELAYED",
  "message": "Task has exceeded its expected completion time"
}
```

Expected successful response:

```json
{
  "alert": {
    "id": "alert-001",
    "type": "TASK_DELAYED",
    "message": "Task has exceeded its expected completion time"
  }
}
```

---

### 4.8 List Alerts

**GET `/api/alerts`**

Returns operational alerts.

Expected successful response:

```json
{
  "alerts": []
}
```

---

### 4.9 Operational Summary Report

**GET `/api/reports/summary`**

Returns a read-only operational summary.

Expected successful response:

```json
{
  "summary": {
    "totalActivities": 0,
    "totalAlerts": 0
  }
}
```

The Reports module must remain read-only.

It must not expose create, update, or delete operations for reports.

---

## 5. Architecture Rules

The following rules apply to all nine endpoints.

### Rule 1 — Layering

Requests must flow through:

```text
Route
  ↓
Service
  ↓
Repository
```

Routes must not contain business logic.

Services must contain business logic.

Repositories are responsible for data access.

---

### Rule 2 — No direct cross-module repository access

A module must not directly import or call another module's repository.

Incorrect:

```text
Activities Service
       ↓
Alerts Repository
```

Correct:

```text
Activities Service
       ↓
EventBus
       ↓
Alerts
```

---

### Rule 3 — EventBus for cross-module side effects

Cross-module side effects must be communicated through the EventBus.

For example:

```text
TaskUpdated
     ↓
EventBus
     ↓
Alerts module
```

---

### Rule 4 — Typed application errors

Application errors must use a typed `AppError` containing:

* `code`
* `message`
* `statusCode`

Services and routes must not throw raw `Error` objects.

---

### Rule 5 — Reports are read-only

The Reports module may read operational information required to produce reports but must not modify operational state.

---

### Rule 6 — No circular imports

Modules must not introduce circular dependencies.

---

### Rule 7 — Repository responsibility

Repositories must handle data access only.

Repositories must not call external services.

---

## 6. Primary Harness Demonstration

The primary feature selected for the harness demonstration is:

**Shift Handover Bulk Update**

The intended architectural flow is:

```text
User Request
     ↓
Activities Route
     ↓
Activities Service
     ↓
Activities Repository
     ↓
Task Updated
     ↓
EventBus
     ↓
Interested Consumers
```

The implementation will be evaluated for:

* Correct business behavior
* Correct module ownership
* Routes → Service → Repository layering
* EventBus usage
* Type safety
* Automated tests
* Error handling
* Absence of prohibited cross-module repository imports
* Lint and type-check success

---

## 7. Specification Status

**STATUS: WORKING SPECIFICATION**

This document represents learner-defined implementation decisions made because the detailed StoreOps Project Scaffold and Reference Harness referenced by the programme PDF were not available.

Before final submission:

1. Compare this specification with the official Scaffold if it becomes available.
2. Correct any endpoint, field, naming, or behavior differences.
3. Record any material architectural changes in the project documentation.
4. Ensure the final demonstrated implementation matches the approved specification.
