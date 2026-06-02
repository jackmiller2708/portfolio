# ADR-006: Component Architecture

Status: Accepted

Date: 2026-06-02

## Decision

Use an Astro-friendly component architecture that combines Atomic Design naming with n-layer dependency rules.

Atomic Design describes component scale. The n-layer architecture controls data and dependency direction. Components are presentational by default and receive typed props or view models from page loader programs.

## Context

The portfolio will include reusable service cards, evidence panels, audit findings, case study sections, contact intake, and interactive system maps. Without component conventions, the implementation can drift into page-specific components, duplicated CSS, raw content access inside UI, and unclear ownership.

## Options Considered

| Option                        | Summary                                                 | Tradeoff                                                         |
| ----------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| Atomic Design only            | Organize atoms, molecules, organisms, templates, pages. | Useful UI taxonomy, but weak for data/program boundaries.        |
| Feature-only folders          | Organize by page or feature.                            | Good locality, but shared design-system primitives can fragment. |
| n-layer only                  | Organize by domain/program/component layers.            | Strong architecture, but weaker UI scale vocabulary.             |
| Atomic Design + n-layer rules | Use UI taxonomy and explicit import boundaries.         | More conventions, but clearer ownership.                         |

## Rationale

The portfolio's UI needs reusable polish and strong data discipline. Atomic Design is useful for component scale, while the n-layer rules prevent components from reaching into content repositories, Effect services, config, or side-effectful workflows.

## Consequences

### Positive

- Components have predictable names, folders, and responsibilities.
- Page code remains focused on routing and composition.
- Presentational UI does not own data loading.
- Shared primitives can evolve without page-specific coupling.

### Negative

- Some components may not fit perfectly into Atomic Design categories.
- Early implementation needs discipline to avoid unnecessary abstraction.

### Follow-Up

- Add component management convention.
- Reflect component folders in the V1 implementation plan.
- Add lint or review checks once the project exists.

## Verification

- Components do not import `programs`, `services`, `layers`, or environment config.
- Pages call loader programs and pass view models down.
- Interactive islands receive serialized safe data.
- Shared UI primitives are not duplicated per page.

## Related Documents

- `docs/ui/component-management.md`
- `docs/architecture/portfolio_architectural_foundation.md`
- `docs/adrs/ADR-001-stack-boundaries.md`
- `docs/adrs/ADR-005-client-islands-and-interactions.md`
