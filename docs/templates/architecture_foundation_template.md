# Architecture Foundation: Title

Status: Draft

Date: YYYY-MM-DD

## Purpose

Describe the architectural concern this document defines.

## Scope

### In Scope

- Systems, modules, workflows, or pages covered.

### Out of Scope

- Adjacent concerns intentionally left to other documents.

## Guiding Requirements

| Requirement      | Source                 | Architectural implication                               |
| ---------------- | ---------------------- | ------------------------------------------------------- |
| Requirement name | Source document or ADR | What this means for structure, data, or implementation. |

## System Boundaries

Describe the major layers and their responsibilities.

```txt
Layer A
  Responsibility

Layer B
  Responsibility
```

## Dependency Direction

Define what can import or depend on what.

```txt
pages/components -> programs -> services -> domain/schemas
```

## Runtime Model

Explain what runs at build time, server/request time, and client time.

| Runtime             | Responsibilities | Must not do |
| ------------------- | ---------------- | ----------- |
| Build time          |                  |             |
| Server/request time |                  |             |
| Client time         |                  |             |

## Data Ownership

Define which layer owns source data, decoded domain data, and page view models.

## Side Effects

List side effects and the layer/service responsible for each.

| Side effect | Owner           | Notes               |
| ----------- | --------------- | ------------------- |
| Example     | Example service | Example constraint. |

## Error Strategy

Summarize how this foundation handles typed errors, defects, fallbacks, and user-facing messages.

## Testing Strategy

Define required tests and checks.

## Open Questions

- Question that must be resolved before implementation.

## Related Documents

- `docs/portfolio_design_system_award_update.md`
- `docs/portfolio_requirements_technical_spec_award_update.md`
