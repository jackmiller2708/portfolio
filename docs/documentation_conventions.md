# Documentation Conventions

Version 1.0 - June 2026

## Purpose

Documentation should make architecture, design, data flow, and implementation decisions explicit before the site is built. Each document must be specific enough to guide implementation and testing, but short enough to remain maintainable.

## Document Types

| Type                    | Template                                        | Use when                                                                                                      |
| ----------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ADR                     | `templates/adr_template.md`                     | A decision affects architecture, dependencies, data flow, deployment, security, or long-term maintainability. |
| Architecture Foundation | `templates/architecture_foundation_template.md` | Defining system boundaries, layers, runtime model, and dependency direction.                                  |
| Data Flow               | `templates/data_flow_template.md`               | Describing how content, user input, API data, or build-time data moves through the system.                    |
| Error Model             | `templates/error_model_template.md`             | Defining recoverable errors, defects, validation failures, fallback behavior, and user-facing messages.       |
| Content Model           | `templates/content_model_template.md`           | Defining MDX/content collections, schema fields, redaction rules, and page view models.                       |
| UI Convention           | `templates/ui_convention_template.md`           | Defining component taxonomy, naming, styling, accessibility, and design-system rules.                         |
| Page Spec               | `templates/page_spec_template.md`               | Defining page content, initial/loading/failure states, transitions, and user stories.                         |
| Implementation Plan     | `templates/implementation_plan_template.md`     | Breaking approved architecture into scoped build steps and verification tasks.                                |

## Naming

- ADRs: `docs/adrs/ADR-000-short-title.md`
- Architecture specs: `docs/architecture/short-title.md`
- Data flow specs: `docs/data-flows/short-title.md`
- Error specs: `docs/error-models/short-title.md`
- Content specs: `docs/content-models/short-title.md`
- UI conventions: `docs/ui/short-title.md`
- Page specs: `docs/page-specs/short-title.md`
- Implementation plans: `docs/implementation/short-title.md`

Use lowercase kebab-case for descriptive filenames. ADR numbers are zero-padded and assigned in order.

## Status Values

Use one of these status values:

- `Draft`: being shaped and not yet binding.
- `Proposed`: ready for review.
- `Accepted`: approved and should guide implementation.
- `Superseded`: replaced by a newer document.
- `Rejected`: considered but not adopted.

## Writing Rules

- Start with the decision or purpose, then provide rationale.
- State tradeoffs directly.
- Separate domain concerns from implementation mechanics.
- Include verification requirements for anything that affects behavior.
- Prefer typed examples over vague prose.
- Keep diagrams simple and implementation-relevant.
- Do not document speculative features unless they affect current architecture.

## Cross-References

Each document should link to related docs where useful:

- Design direction: `docs/portfolio_design_system_award_update.md`
- Requirements: `docs/portfolio_requirements_technical_spec_award_update.md`
- ADRs that constrain the document
- Implementation plans derived from the document
