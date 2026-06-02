# Architecture Foundation: Portfolio

Status: Proposed

Date: 2026-06-02

## Purpose

Define the architectural foundation for the portfolio before implementation begins. This document establishes boundaries between Astro, TypeScript, Effect, content, client islands, data flow, errors, and side effects.

## Scope

### In Scope

- Site architecture for Home, Services, Case Studies, Technical Lab, Sample Audit, About, and Contact.
- Content loading and page data preparation.
- Per-page content, state, transition, and user-story requirements.
- Effect program boundaries.
- Error handling and fallback strategy.
- Contact intake workflow.
- Static rendering, client islands, and reduced-motion behavior.

### Out of Scope

- Final visual polish and motion timing details.
- Deployment provider selection.
- Exact package versions.
- Final copywriting for all content entries.

## Guiding Requirements

| Requirement               | Source            | Architectural implication                                               |
| ------------------------- | ----------------- | ----------------------------------------------------------------------- |
| Fast and accessible craft | Requirements spec | Prefer static rendering, minimal JS, explicit reduced-motion fallbacks. |
| Content maintainability   | Requirements spec | Use content collections, schemas, and page view models.                 |
| Proof over claims         | Requirements spec | Case studies, audits, and lab notes are typed public proof surfaces.    |
| Signature system map      | Design system     | Use one focused interactive island with static fallback.                |
| Clear conversion path     | Requirements spec | Contact workflow must be reliable, validated, and spam-protected.       |
| Bilingual-ready           | Requirements spec | Content models should allow locale-aware expansion.                     |
| Privacy-safe proof        | Requirements spec | Redaction rules must be part of content validation and review.          |
| Page state coverage       | Page specs        | Each page defines initial, loading, failure, and transition behavior.   |

## System Boundaries

```txt
Astro pages
  Routing, metadata, static generation, page composition.

Astro components
  Presentational rendering from typed props/view models.

Client islands
  Signature interactions, contact enhancement, local UI state.

Effect programs
  Data loading, workflow orchestration, validation, error handling.

Effect services/layers
  Content access, config, contact delivery, spam protection, logging.

Domain models
  Stable business/content concepts independent of rendering.

Schemas
  Runtime validation and decoding for content and user input.

Content source
  MDX/content entries and public metadata.
```

## Dependency Direction

```txt
pages
  -> programs
  -> services
  -> schemas/domain

components
  -> domain/view-model types

client islands
  -> serialized safe view models
  -> local UI state

domain/schemas
  -> no page/component imports
```

Rules:

- Pages can call programs and pass returned view models to components.
- Components cannot query content repositories or read environment configuration.
- Programs can depend on services and schemas.
- Services provide side effects and data access behind explicit interfaces.
- Client islands cannot receive secrets, raw private data, or unvalidated content.
- Component folders follow the component management convention.
- Styling uses CSS custom properties, Astro scoped styles, and CSS Modules by default.

## Runtime Model

| Runtime             | Responsibilities                                                                   | Must not do                                                              |
| ------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Build time          | Load public content, validate schemas, create static page data, produce routes.    | Hide critical content errors or depend on browser APIs.                  |
| Server/request time | Handle contact submission if server endpoints are used.                            | Expose secrets to client code or return raw internal errors.             |
| Client time         | Run local interaction state, progressive form enhancement, system map interaction. | Own core content loading, secret-dependent work, or required navigation. |

## Proposed Source Layout

```txt
src/
  components/
    primitives/
    atoms/
    molecules/
    organisms/
    sections/
    templates/
  content/
  content.config.ts
  domain/
    audit.ts
    case-study.ts
    contact.ts
    errors.ts
    lab.ts
    service.ts
  islands/
    HeroSystemMap/
    BeforeAfterToggle/
    ContactIntake/
  layouts/
  pages/
  programs/
    load-about-page.ts
    load-case-study-page.ts
    load-contact-page.ts
    load-home-page.ts
    load-lab-page.ts
    load-sample-audit-page.ts
    load-services-page.ts
    submit-contact-intake.ts
  schemas/
    audit.schema.ts
    case-study.schema.ts
    contact.schema.ts
    lab.schema.ts
    service.schema.ts
  services/
    ConfigService.ts
    ContactRepository.ts
    ContentRepository.ts
    EmailService.ts
    Logger.ts
    SpamProtection.ts
  layers/
    live.ts
    preview.ts
    test.ts
  styles/
    tokens.css
    global.css
```

## Data Ownership

| Data                | Owner                  | Notes                                                                         |
| ------------------- | ---------------------- | ----------------------------------------------------------------------------- |
| Raw content         | `src/content`          | MDX/frontmatter remains source data only.                                     |
| Decoded content     | schemas/programs       | Invalid content fails early.                                                  |
| Domain models       | `src/domain`           | Stable vocabulary for services, case studies, audits, lab posts, and contact. |
| Page view models    | `src/programs`         | Components receive render-ready data.                                         |
| Client island state | island components      | Local interaction only.                                                       |
| Contact input       | contact schema/program | Validated before side effects.                                                |

## Side Effects

| Side effect               | Owner               | Notes                                      |
| ------------------------- | ------------------- | ------------------------------------------ |
| Read content collections  | `ContentRepository` | Can have live and fixture implementations. |
| Read environment/config   | `ConfigService`     | Secrets never serialized to client.        |
| Submit contact inquiry    | `ContactRepository` | Storage provider can change later.         |
| Send contact notification | `EmailService`      | Optional depending on deployment path.     |
| Spam/rate-limit check     | `SpamProtection`    | Must run before delivery.                  |
| Logging/diagnostics       | `Logger`            | Redact private contact fields.             |

## Effect Program Boundaries

Use Effect for workflows with one or more of these traits:

- validation or decoding
- async work
- dependencies
- recoverable failures
- retries or fallback behavior
- side effects
- test-specific service substitution

Do not use Effect for:

- static component formatting
- simple CSS/class selection
- local hover/open/closed state
- animation timing
- one-line pure transformations without meaningful failure

## Error Strategy

Recoverable workflow failures use typed errors. Unexpected runtime failures are treated as defects.

Build-time content errors should fail the build when they affect required pages. Optional content can have explicit fallback behavior only when defined by the relevant data-flow spec.

Contact errors must produce accessible user-facing states without leaking internal diagnostics.

## Testing Strategy

- Typecheck all source.
- Validate content collections during build.
- Unit test schema decoding and view model mapping.
- Test Effect programs with test layers.
- Smoke test Home, Services, Sample Audit, and Contact.
- Run accessibility checks on core pages and error states.
- Verify reduced-motion behavior for animated islands.

## Open Questions

- Which deployment platform will host contact endpoints?
- Which contact delivery mechanism is preferred: email API, form provider, CRM, or storage-first?
- Should Vietnamese content be implemented in V1 as placeholders or only schema-ready?

## Related Documents

- `docs/adrs/ADR-001-stack-boundaries.md`
- `docs/adrs/ADR-002-content-data-flow.md`
- `docs/adrs/ADR-003-error-model.md`
- `docs/adrs/ADR-004-effect-service-layers.md`
- `docs/adrs/ADR-005-client-islands-and-interactions.md`
- `docs/adrs/ADR-006-component-architecture.md`
- `docs/adrs/ADR-007-styling-system.md`
- `docs/data-flows/content-to-page-data-flow.md`
- `docs/data-flows/contact-intake-data-flow.md`
- `docs/error-models/portfolio_error_model.md`
- `docs/content-models/portfolio_content_models.md`
- `docs/ui/component-management.md`
- `docs/ui/styling-conventions.md`
- `docs/page-specs/portfolio_page_specs.md`
- `docs/portfolio_design_system_award_update.md`
- `docs/portfolio_requirements_technical_spec_award_update.md`
