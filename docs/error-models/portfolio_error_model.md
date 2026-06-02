# Error Model: Portfolio

Status: Proposed

Date: 2026-06-02

## Purpose

Define the portfolio's error taxonomy, handling rules, fallbacks, diagnostics, and testing expectations.

## Principles

- Recoverable errors are modeled explicitly.
- Defects are not silently converted into normal states.
- User-facing messages are clear without exposing implementation details.
- Build-time content errors should fail early where possible.
- Client islands must have accessible static or reduced-motion fallbacks.

## Error Taxonomy

| Error                    | Category                       | Cause                                                    | Owner                       |
| ------------------------ | ------------------------------ | -------------------------------------------------------- | --------------------------- |
| `ContentDecodeError`     | Recoverable build-time         | Content exists but fails schema/domain validation.       | Content schemas/programs    |
| `MissingContentError`    | Recoverable build-time         | Required content is missing.                             | Content repository/programs |
| `PrivacyRedactionError`  | Recoverable build-time         | Public content violates redaction requirements.          | Content programs            |
| `InvalidRouteParamError` | Recoverable route-time         | Slug/route parameter does not match known content.       | Page loader programs        |
| `ContactValidationError` | Recoverable request-time       | Submitted contact input is invalid.                      | Contact schema/program      |
| `SpamProtectionError`    | Recoverable request-time       | Submission is blocked or suspicious.                     | Spam protection service     |
| `ContactDeliveryError`   | Recoverable request-time       | Storage/email/provider delivery fails.                   | Contact/email services      |
| `ConfigError`            | Recoverable deployment-time    | Required environment/config value is missing or invalid. | Config service              |
| `InteractionDataError`   | Recoverable render/client-time | Serialized island data is incomplete or invalid.         | Page loader/island boundary |
| `UnexpectedDefect`       | Defect                         | Runtime failure outside expected workflow failures.      | Program boundary/logger     |

## Error Shapes

Typed errors should be structured enough for testing and diagnostics.

```ts
type PortfolioError =
  | ContentDecodeError
  | MissingContentError
  | PrivacyRedactionError
  | InvalidRouteParamError
  | ContactValidationError
  | SpamProtectionError
  | ContactDeliveryError
  | ConfigError
  | InteractionDataError;
```

Each error should include:

- `_tag`
- short message
- safe context
- source path, route, or workflow where relevant

Errors must not include secrets or private contact details.

## Handling Rules

| Error                    | Handling                                                                  | User-facing behavior                                          |
| ------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `ContentDecodeError`     | Fail build for required content.                                          | None; fixed before deploy.                                    |
| `MissingContentError`    | Fail build for required pages; omit optional entries if minimums are met. | None for build failure; graceful omission for optional lists. |
| `PrivacyRedactionError`  | Fail build.                                                               | None; fixed before deploy.                                    |
| `InvalidRouteParamError` | Return not-found page.                                                    | Clear 404 with navigation back to useful pages.               |
| `ContactValidationError` | Return field-level errors.                                                | Accessible inline errors and summary.                         |
| `SpamProtectionError`    | Block or suppress delivery.                                               | Generic response, no spam rule disclosure.                    |
| `ContactDeliveryError`   | Retry if configured, then fallback.                                       | Ask user to email directly or retry.                          |
| `ConfigError`            | Fail startup/build or disable affected endpoint.                          | Contact temporarily unavailable if runtime-only.              |
| `InteractionDataError`   | Render static fallback.                                                   | Static diagram or non-interactive explanation.                |
| `UnexpectedDefect`       | Log redacted diagnostic.                                                  | Generic error state.                                          |

## Fallbacks

- System map: static SVG and text equivalent.
- Before/after toggle: both states readable as static sections.
- Contact: direct email fallback if delivery provider fails.
- Optional lab/case study listings: omit optional entries if minimum content requirement remains satisfied.
- Required core pages: fail build when critical page data is invalid.

## Logging And Diagnostics

Allowed diagnostic fields:

- `_tag`
- workflow name
- source file path for content
- route slug
- environment name
- timestamp
- redacted provider status

Disallowed diagnostic fields:

- secrets
- provider tokens
- full contact message
- full email address
- private client or employer names
- proprietary URLs or identifiers

## Testing

- Unit tests for error constructors and guards.
- Schema tests for invalid content and contact input.
- Program tests for content loading and contact delivery failure paths.
- Page tests for 404 and contact error UI.
- Accessibility checks for error summaries and field-level errors.
- Reduced-motion and static fallback checks for interactive diagrams.

## Related Documents

- `docs/adrs/ADR-003-error-model.md`
- `docs/data-flows/content-to-page-data-flow.md`
- `docs/data-flows/contact-intake-data-flow.md`
