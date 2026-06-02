# ADR-001: Stack Boundaries

Status: Accepted

Date: 2026-06-02

## Decision

Use Astro and TypeScript as the site delivery stack, with Effect as the program foundation for data loading, validation, workflow orchestration, dependency management, and typed error handling.

Astro owns routing, rendering, static generation, content integration, and selective client islands. Effect owns programs with dependencies, async work, side effects, validation, and recoverable failures.

## Context

The portfolio needs to communicate senior Angular/frontend architecture skill while remaining fast, accessible, maintainable, and content-driven. The requirements call for typed content schema, clear data handling, reliable contact flow, privacy-safe proof, QA scripts, and explicit handling of errors and fallbacks.

Astro is a strong fit for the public marketing and content shell. Effect is a strong fit for the architectural foundation because it makes tasks, dependencies, data decoding, errors, and side effects explicit.

## Options Considered

| Option                   | Summary                                              | Tradeoff                                                                         |
| ------------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| Astro + plain TypeScript | Use functions, schemas, and local `try/catch`.       | Lower initial complexity, but error and dependency handling can become implicit. |
| Astro + Effect           | Use Effect programs for workflows and typed failure. | More upfront structure, but clearer boundaries and testable programs.            |
| Angular shell            | Build the whole portfolio in Angular.                | Shows Angular directly, but worse fit for static content, MDX, and minimal JS.   |
| Next.js + React          | Use React ecosystem and server features.             | More moving parts than needed for this portfolio.                                |

## Rationale

Astro keeps the public site fast and content-first. Effect gives the non-visual system a disciplined foundation that matches the portfolio thesis: complex frontend systems made explicit.

This separation prevents presentational components from becoming responsible for content decoding, contact workflow logic, configuration access, or error handling.

## Consequences

### Positive

- Data and workflow boundaries are explicit from the start.
- Recoverable errors can be modeled instead of hidden in generic exceptions.
- Content and contact workflows can be tested without rendering pages.
- The architecture itself becomes credible proof of the portfolio's message.

### Negative

- The project has more structure before the first page exists.
- Contributors need basic familiarity with Effect concepts.
- Small workflows may feel heavier than plain functions if boundaries are not kept pragmatic.

### Follow-Up

- Define the architecture foundation.
- Define data flow and error model specs.
- Define content models and schema boundaries.
- Reflect these boundaries in the initial scaffold.

## Verification

- Page modules call loader programs instead of decoding content inline.
- Contact workflow is represented as a typed program with explicit dependencies.
- Domain errors are declared centrally.
- Components receive view models or typed props and do not access repositories directly.
- Tests cover at least one success and failure path per program.

## Related Documents

- `docs/architecture/portfolio_architectural_foundation.md`
- `docs/data-flows/content-to-page-data-flow.md`
- `docs/data-flows/contact-intake-data-flow.md`
- `docs/error-models/portfolio_error_model.md`
- `docs/portfolio_design_system_award_update.md`
- `docs/portfolio_requirements_technical_spec_award_update.md`
