# ADR-003: Error Model

Status: Accepted

Date: 2026-06-02

## Decision

Model recoverable workflow failures as typed domain errors. Treat unexpected runtime failures as defects. Do not use anonymous thrown errors as the normal control flow for content loading, page data preparation, contact submission, or configuration access.

## Context

The portfolio must be reliable, accessible, spam-protected, privacy-safe, and maintainable. Error handling affects build failures, broken content, form submission, user-facing copy, logging, and testing.

## Options Considered

| Option | Summary | Tradeoff |
|---|---|---|
| Generic `try/catch` | Catch exceptions where needed. | Fast to write, but errors become inconsistent and hard to test. |
| Framework-level errors only | Let Astro/runtime handle failures. | Acceptable for defects, poor for domain workflows. |
| Typed domain errors with Effect | Represent expected failures explicitly. | More upfront modeling, stronger behavior guarantees. |

## Rationale

The site's message is architectural clarity. Hidden failure states undermine that. Typed errors make content failures, contact failures, validation failures, and fallback behavior visible in code and docs.

## Consequences

### Positive

- Failure behavior is testable.
- User-facing error copy can stay consistent.
- Defects are not mistaken for normal business states.
- Contact and content workflows become easier to reason about.

### Negative

- Error types must be maintained as workflows evolve.
- Over-modeling small local UI states should be avoided.

### Follow-Up

- Define the portfolio error taxonomy.
- Define handling rules for build-time, server/request-time, and client-time failures.
- Define redacted diagnostics rules.

## Verification

- Known workflow failures have named error types.
- Contact submission has success and failure tests.
- Invalid content fixtures produce expected validation failures.
- User-facing error states pass accessibility checks.

## Related Documents

- `docs/error-models/portfolio_error_model.md`
- `docs/data-flows/contact-intake-data-flow.md`
- `docs/data-flows/content-to-page-data-flow.md`

