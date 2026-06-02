# Implementation Plan: V1 Foundation

Status: Accepted

Date: 2026-06-02

## Objective

Build the first portfolio foundation with Astro, TypeScript, Effect, content schemas, core pages, and baseline QA. V1 should establish the architecture and conversion path before V1.5/V2 signature polish.

## Inputs

| Input                                     | Status   | Notes                                                                 |
| ----------------------------------------- | -------- | --------------------------------------------------------------------- |
| `ADR-001-stack-boundaries`                | Accepted | Defines Astro, TypeScript, and Effect roles.                          |
| `ADR-002-content-data-flow`               | Accepted | Defines content validation and view model flow.                       |
| `ADR-003-error-model`                     | Accepted | Defines typed error handling.                                         |
| `ADR-004-effect-service-layers`           | Accepted | Defines dependency boundaries.                                        |
| `ADR-005-client-islands-and-interactions` | Accepted | Defines client JS boundaries.                                         |
| `ADR-006-component-architecture`          | Accepted | Defines component taxonomy and dependency rules.                      |
| `ADR-007-styling-system`                  | Accepted | Defines token/scoped CSS styling foundation.                          |
| Portfolio architecture foundation         | Proposed | Guides source layout.                                                 |
| Portfolio page specs                      | Proposed | Defines per-page content, state, transition, and user-story behavior. |

## Scope

### In Scope

- Astro + TypeScript scaffold.
- Effect dependency.
- Global design tokens and base layout.
- Component taxonomy folders and naming conventions.
- Content collections and schemas.
- Core domain/error types.
- Initial Effect programs for page loaders.
- Home, Services, Sample Audit, and Contact.
- Initial, loading, failure, and transition behavior for V1 pages.
- Basic static system map or placeholder data model.
- Baseline typecheck/build/QA scripts.

### Out of Scope

- Fully polished signature architecture map.
- Final case study detail pages.
- Full Technical Lab detail experience.
- Downloadable audit PDF.
- Award submission assets.

## Work Breakdown

| Step | Description                                                                                           | Verification                                                   |
| ---- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 1    | Scaffold Astro + TypeScript project.                                                                  | Project builds with empty pages.                               |
| 2    | Add tokens, global CSS, component folders, layout shell, nav, footer, skip link.                      | Visual smoke check and keyboard navigation.                    |
| 3    | Add Effect, domain models, schemas, and error taxonomy.                                               | Typecheck and unit tests for schemas/errors.                   |
| 4    | Add content collections and fixture content.                                                          | Build fails for invalid fixtures and passes valid content.     |
| 5    | Add page loader programs for Home, Services, Sample Audit, Contact.                                   | Loader tests cover success and missing content.                |
| 6    | Build core components: `ServiceCard`, `ProofStrip`, `EvidencePanel`, `AuditFinding`, `ContactIntake`. | Component render checks.                                       |
| 7    | Build core pages.                                                                                     | Static render smoke tests.                                     |
| 8    | Implement V1 page states and transitions from page specs.                                             | Initial, loading, failure, and CTA transitions verified.       |
| 9    | Add contact intake program with test services.                                                        | Success, validation failure, spam, and delivery failure tests. |
| 10   | Add reduced-motion and static interaction fallback rules.                                             | Manual and automated checks where possible.                    |
| 11   | Add Lighthouse/axe/Playwright baseline scripts.                                                       | Core pages meet initial QA threshold.                          |

## File/Module Plan

| Path                          | Purpose                                            |
| ----------------------------- | -------------------------------------------------- |
| `src/domain/*`                | Domain models and errors.                          |
| `src/schemas/*`               | Content and contact schemas.                       |
| `src/programs/*`              | Effect page loaders and contact workflow.          |
| `src/services/*`              | Service interfaces.                                |
| `src/layers/*`                | Live/test/preview service implementations.         |
| `src/content/*`               | Services, audit findings, lab posts, case studies. |
| `src/components/*`            | Presentational UI.                                 |
| `src/components/primitives/*` | Reusable low-level UI primitives.                  |
| `src/components/atoms/*`      | Small domain-aware display elements.               |
| `src/components/molecules/*`  | Small composed UI groups.                          |
| `src/components/organisms/*`  | Larger reusable interface blocks.                  |
| `src/components/sections/*`   | Page-level content bands.                          |
| `src/components/templates/*`  | Page family layouts.                               |
| `src/islands/*`               | Hydrated interactions.                             |
| `src/styles/tokens.css`       | Design system tokens.                              |
| `src/pages/*`                 | Astro routes.                                      |

## Acceptance Criteria

- Home, Services, Sample Audit, and Contact render.
- Core content is readable without critical client JavaScript.
- Content schemas validate required public data.
- Contact workflow has typed success and failure paths.
- V1 pages implement documented initial, loading, failure, and transition states.
- Components do not read raw content or environment config.
- Component files, folders, props, and styles follow UI conventions.
- Global CSS is limited to tokens, base styles, utilities, and accessibility helpers.
- Initial QA scripts exist and run.
- Reduced-motion behavior is defined for animated components.

## Risks

| Risk                                             | Mitigation                                                                             |
| ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Effect adds too much ceremony.                   | Restrict Effect to workflows with dependencies, failures, async work, or side effects. |
| Content model becomes too rigid.                 | Start with required V1 fields and allow optional evidence extensions.                  |
| Contact provider decision delays implementation. | Use service interface and test/preview layer first.                                    |
| Signature map delays V1.                         | Ship static/basic map in V1 and polish in V2.                                          |

## Verification Checklist

- Typecheck passes.
- Build passes.
- Content validation passes.
- Core route smoke tests pass.
- Contact program tests pass.
- Keyboard navigation checked.
- Reduced motion checked.
- Lighthouse and axe baseline run on core pages.

## Follow-Up

- V1.5: add two case studies, four lab posts, and basic system map interaction.
- V2: polish explicit system map and before/after toggles.
- V3: award polish, refined motion, and submission assets.
