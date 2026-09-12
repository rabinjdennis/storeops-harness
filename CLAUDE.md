# StoreOps Claude Code Development Harness

## 1. Purpose

This repository contains the StoreOps API and a Claude Code development
harness for governed AI-assisted development.

The harness wraps Claude Code development in a controlled workflow that
enforces StoreOps architecture, coding standards, testing requirements,
module boundaries, and evaluation gates.

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
   approved read-only service/interface boundary.

4. Repositories must not call external services.

5. Services and routes must use the typed AppError hierarchy for expected
   application errors.

6. Services and routes must not throw raw Error objects.

7. Avoid circular imports between modules.

8. Business rules belong in the Service layer.

9. HTTP concerns belong in the Route layer.

10. Persistence concerns belong in the Repository layer.

These rules are non-negotiable evaluation gates.

---

## 3. Baseline Quality Checks

The baseline automated checks are:

```bash
npm run typecheck
npm run lint
npm test -- --coverage
```

The Evaluator must consider these checks when determining the sprint verdict.

---

## 4. Harness Entry Point

A developer starts a harness run using the feature prompt in:

```text
PROMPT.md
```

The prompt must identify the StoreOps feature to implement.

The primary demonstration feature is:

```text
Shift Handover Bulk Update
```

The Planner reads:

```text
PROMPT.md
STOREOPS_API_SPEC.md
.harness/skills/app-context.md
.harness/skills/architecture-principles.md
.harness/skills/sprint-decomposition.md
```

The Planner must not modify application source code or tests.

---

## 5. Harness Components

The harness contains four bounded components:

### Planner

File:

```text
.harness/agents/planner.agent.md
```

Responsibility:

- Decompose the feature requirement.
- Produce `spec.md`.
- Produce sprint contracts.
- Define GIVEN/WHEN/THEN acceptance criteria.
- Identify business rules and architectural constraints.
- Stop at the approval gate.

Produces:

```text
.harness/output/spec.md
.harness/output/sprint-N-contract.md
```

The Planner output must contain:

```text
STATUS: AWAITING APPROVAL
```

---

### Generator

File:

```text
.harness/agents/generator.agent.md
```

Responsibility:

- Read the approved sprint contract.
- Implement only the approved sprint scope.
- Follow StoreOps architecture rules.
- Add or update tests.
- Run the baseline automated checks.
- Produce a generator summary.

Produces:

```text
src/
tests/
.harness/output/generator-summary.md
```

The Generator must not begin until the sprint contract has been approved.

---

### Evaluator

File:

```text
.harness/agents/evaluator.agent.md
```

Responsibility:

- Independently review Generator output.
- Evaluate every acceptance criterion.
- Evaluate StoreOps architecture rules.
- Review automated checks.
- Review business-rule compliance.
- Review test quality.
- Review scope compliance.
- Provide file-level and line-level feedback.

Produces:

```text
.harness/output/evaluator-feedback.md
```

The Evaluator must return exactly one of:

```text
PASS
CONDITIONAL PASS
FAIL
```

---

### Monitor

File:

```text
.harness/agents/monitor.agent.md
```

Responsibility:

- Run after every Evaluator verdict.
- Record sprint outcome.
- Record iteration count.
- Record escalation status.
- Record estimated token cost when available.
- Record quality trend observations.
- Identify recurring problems and possible skill-file improvements.

Produces:

```text
.harness/reviews/sprint-N-run-log.md
```

The Monitor must not change application code or alter the Evaluator verdict.

---

## 6. Harness Workflow

The normal workflow is:

```text
Developer
   |
   v
PROMPT.md
   |
   v
Planner
   |
   +--> spec.md
   |
   +--> sprint-N-contract.md
   |
   v
STATUS: AWAITING APPROVAL
   |
   v
Developer types APPROVED
   |
   v
Generator
   |
   v
Evaluator
   |
   +--> PASS
   |      |
   |      v
   |   Monitor
   |      |
   |      v
   |   Next Sprint
   |
   +--> CONDITIONAL PASS
   |      |
   |      v
   |   Monitor
   |      |
   |      v
   |   Generator resolves conditions
   |
   +--> FAIL
          |
          v
       Monitor
          |
          v
       Generator retry
```

After the developer approves the Planner output, the
Generator → Evaluator loop must run autonomously.

The developer should not manually trigger each Generator/Evaluator
iteration. The developer re-enters the workflow only when escalation is
required.

---

## 7. Approval Gate

The Planner must stop after producing the specification and sprint
contract.

The sprint contract must contain:

```text
STATUS: AWAITING APPROVAL
```

The Generator must not execute while the status remains:

```text
STATUS: AWAITING APPROVAL
```

The developer approves the sprint by changing the contract status to:

```text
STATUS: APPROVED
```

Only an approved sprint contract may be passed to the Generator.

---

## 8. Evaluator Routing

After every Generator run, the Evaluator produces:

```text
.harness/output/evaluator-feedback.md
```

The orchestrator reads the verdict.

### PASS

If:

```text
VERDICT: PASS
```

then:

1. Run the Monitor.
2. Archive the sprint run information.
3. Advance to the next sprint.
4. If there are no remaining sprints, mark the feature run complete.

### CONDITIONAL PASS

If:

```text
VERDICT: CONDITIONAL PASS
```

then:

1. Run the Monitor.
2. Read the required conditions.
3. Return the conditions to the Generator.
4. Generator resolves the conditions.
5. Evaluator reviews the updated implementation.

A Conditional Pass must not be treated as final completion until its
required conditions are resolved.

### FAIL

If:

```text
VERDICT: FAIL
```

then:

1. Run the Monitor.
2. Read the Evaluator's required corrections.
3. Return the feedback to the Generator.
4. Increment the sprint iteration counter.
5. Generator retries the same sprint.
6. Evaluator reviews the retry.

The orchestrator must not silently advance to the next sprint after FAIL.

---

## 9. Iteration Limit and Escalation

Each sprint has a maximum of three Generator/Evaluator iterations.

The iteration counter starts at:

```text
1
```

If the sprint still has a FAIL verdict after the third iteration, the
orchestrator must stop autonomous retries.

Create:

```text
.harness/output/escalation.md
```

The escalation notice must contain:

- Sprint identifier
- Iterations attempted
- Current Evaluator verdict
- Blocking issue
- Required developer decision
- Relevant file and line references

Example:

```markdown
# Harness Escalation

## Sprint

Sprint 1

## Iterations

3

## Verdict

FAIL

## Blocking Issue

<blocking issue>

## Required Developer Decision

<decision required>

## File and Line References

<file and line references>
```

The developer must decide how to proceed before another attempt is made.

---

## 10. Handoff Artifacts

Agents communicate through explicit files rather than relying on
implicit conversation state.

The expected handoff chain is:

```text
PROMPT.md
    ↓
spec.md
    ↓
sprint-N-contract.md
    ↓
generator-summary.md
    ↓
evaluator-feedback.md
    ↓
sprint-N-run-log.md
```

Each artifact must contain enough information for the next agent to
perform its responsibility independently.

Machine-readable status and verdict markers must be preserved exactly.

---

## 11. Context Scoping

Each agent invocation must read only the context required for its
responsibility.

Agents should prefer:

- CLAUDE.md
- the current sprint contract
- relevant StoreOps skills
- relevant source files
- relevant tests
- the previous handoff artifact

Agents must not depend on a long accumulated conversational context.

At sprint boundaries, the next agent should begin from the written
handoff artifacts rather than assuming knowledge from a previous
conversation.

This keeps context bounded and reduces context-window degradation.

---

## 12. Skill Usage

Before acting, each agent must read the skills relevant to its role.

### Planner

Required:

```text
.harness/skills/app-context.md
.harness/skills/architecture-principles.md
.harness/skills/sprint-decomposition.md
```

### Generator

Required:

```text
.harness/skills/app-context.md
.harness/skills/architecture-principles.md
.harness/skills/coding-conventions.md
.harness/skills/api-integration.md
.harness/skills/how-to-test.md
```

### Evaluator

Required:

```text
.harness/skills/app-context.md
.harness/skills/architecture-principles.md
.harness/skills/how-to-review.md
.harness/skills/evaluation-criteria.md
```

### Monitor

Required:

```text
.harness/skills/app-context.md
```

The Monitor additionally reads the Generator summary and Evaluator
feedback from the completed sprint.

---

## 13. Evaluation Gates

The Evaluator must treat the following as hard architectural gates:

### Module Boundary

There must be no direct import from one module's Repository into
another module.

### EventBus

Cross-module side effects must use EventBus rather than direct
service-to-service coupling.

### Error Contract

Services and routes must not use raw:

```typescript
throw new Error(...)
```

Expected application errors must use AppError.

### Layer Separation

The implementation must preserve:

```text
Routes → Service → Repository
```

Routes must not contain business logic.

Repositories must not contain HTTP concerns or call external services.

### Automated Checks

The implementation must be evaluated against:

```bash
npm run typecheck
npm run lint
npm test -- --coverage
```

---

## 14. CI/CD Relationship

The harness is a development-time governance layer.

The Evaluator's automated checks provide an early quality gate before
changes are accepted as complete.

Existing CI/CD pipeline checks remain authoritative.

The harness does not replace CI/CD.

The relationship is:

```text
Claude Code Harness
       |
       v
Generator
       |
       v
Evaluator
       |
       v
Developer-approved output
       |
       v
Git
       |
       v
CI/CD pipeline
       |
       v
Deployment
```

A change that passes the harness must still satisfy the repository's
normal CI/CD gates.

---

## 15. Review Archive

Completed sprint evidence must be preserved under:

```text
.harness/reviews/
```

The review archive is the governance audit trail.

For the demonstration run, it must contain the relevant:

```text
generator-summary.md
evaluator-feedback.md
sprint-N-run-log.md
```

The final demonstration artifacts must provide a traceable chain:

```text
Sprint Contract
      ↓
Generator Output
      ↓
Evaluator Verdict
      ↓
Monitor Run Log
```

---

## 16. Primary Demonstration Feature

The primary demonstration feature is:

**Shift Handover Bulk Update**

The implementation must demonstrate the harness end-to-end on this
feature or another approved feature of comparable complexity.

The final demonstration must show the resulting endpoint running
successfully.

---

## 17. Completion Criteria

A feature sprint is complete only when:

1. The sprint contract was approved.
2. The Generator implemented the approved scope.
3. Tests were added or updated appropriately.
4. Baseline automated checks were evaluated.
5. Architecture rules were evaluated.
6. Business rules were evaluated.
7. The Evaluator produced a final PASS.
8. The Monitor produced the sprint run log.
9. Required review artifacts are preserved under `.harness/reviews/`.

The harness must never treat compilation alone as successful completion.