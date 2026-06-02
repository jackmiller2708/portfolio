# ADR-004: Effect Service Layers

Status: Accepted

Date: 2026-06-02

## Decision

Use Effect service/layer boundaries for dependencies that perform data access, configuration access, spam checks, contact delivery, logging, or other side effects.

## Context

The portfolio will have mostly static pages, but it still needs workflows with dependencies: content repositories, config/env values, contact delivery, spam protection, analytics-safe diagnostics, and potentially future downloadable audit/report generation.

## Options Considered

| Option | Summary | Tradeoff |
|---|---|---|
| Direct imports | Programs import concrete modules directly. | Simple, but harder to test and replace. |
| Manual dependency parameters | Functions receive dependencies as arguments. | Explicit, but repetitive as workflows grow. |
| Effect services/layers | Dependencies are declared and provided through layers. | More structure, stronger testability and composition. |

## Rationale

Effect layers fit the desired system shape: explicit boundaries, testable services, and controlled side effects. They also allow preview/test/live implementations without changing page code.

## Consequences

### Positive

- Contact workflow can use fake services in tests.
- Content loading can be tested with fixtures.
- Config and secrets stay out of components.
- Future integrations can be added without changing domain code.

### Negative

- Service definitions must stay focused.
- The project should avoid wrapping purely presentational logic in layers.

### Follow-Up

- Define live, test, and preview layer expectations.
- Define initial services: `ContentRepository`, `ContactRepository`, `EmailService`, `SpamProtection`, `ConfigService`, and `Logger`.

## Verification

- Programs declare dependencies instead of importing concrete service implementations directly.
- Test layers exist for contact and content workflows.
- No frontend secrets are exposed to client islands.

## Related Documents

- `docs/architecture/portfolio_architectural_foundation.md`
- `docs/data-flows/contact-intake-data-flow.md`
- `docs/implementation/v1-foundation-implementation-plan.md`

