# Data Flow: Contact Intake

Status: Proposed

Date: 2026-06-02

## Purpose

Define how a visitor's contact inquiry is validated, classified, protected from spam, delivered, and represented back to the user.

## Sources

| Source | Type | Owner | Notes |
|---|---|---|---|
| Contact form | User input | `ContactIntake` | Progressive enhancement should preserve accessibility. |
| Runtime config | Environment/config | `ConfigService` | Contains destination and provider settings. |
| Spam signal | Request metadata/provider | `SpamProtection` | Implementation depends on deployment. |

## Target Outputs

| Output | Consumer | Shape |
|---|---|---|
| Contact result | Contact page/island | `ContactSubmissionResult` |
| Inquiry record | Storage/email provider | `ContactInquiry` |
| Redacted diagnostic event | Logger | `ContactDiagnosticEvent` |

## Flow

```txt
form input
  -> contact schema decode
  -> normalize fields
  -> spam/rate-limit check
  -> classify inquiry fit
  -> persist or send
  -> redacted diagnostic log
  -> accessible success/error response
```

## Required Fields

- name
- email
- product or company context
- Angular version or frontend stack
- team size
- main pain
- preferred engagement type: diagnosis, implementation, advisory, or unsure
- timeline
- budget comfort
- consent to be contacted

## Validation

- Email must be syntactically valid.
- Budget comfort must use defined ranges or explicit "not sure".
- Timeline must use defined ranges.
- Main pain must meet minimum useful length and maximum safe length.
- Consent must be true before delivery.
- Unexpected fields are ignored or rejected depending on implementation.

## Classification Rules

The workflow should classify inquiries as:

- `good-fit`: matches Angular systems audit/refactor/stabilization work.
- `possible-fit`: needs clarification.
- `not-fit`: outside stated services or budget/timeline constraints.

Classification informs response copy and internal prioritization. It must not block delivery unless the message is spam or invalid.

## Failure Modes

| Failure | Error type | Fallback or response |
|---|---|---|
| Invalid input | `ContactValidationError` | Show field-level accessible errors. |
| Missing consent | `ContactValidationError` | Show consent requirement. |
| Spam detected | `SpamProtectionError` | Show generic non-committal response or block submission. |
| Provider unavailable | `ContactDeliveryError` | Show retry/contact-by-email fallback. |
| Config missing | `ConfigError` | Fail deployment/build or return unavailable state. |
| Unexpected defect | `UnexpectedDefect` | Log redacted diagnostic and show generic fallback. |

## Privacy And Redaction

Logs must not include:

- full message body
- full email address
- company-sensitive details
- request secrets or provider tokens

Allowed diagnostics:

- error type
- timestamp
- deployment environment
- redacted email domain
- inquiry classification
- provider result code where safe

## Observability

Track:

- validation failure count
- spam rejection count
- successful delivery count
- provider failure count
- not-fit/possible-fit/good-fit classification count

Analytics must not require blocking third-party scripts.

## Verification

- Unit tests for schema validation.
- Program tests for success, invalid input, spam rejection, delivery failure, and config failure.
- Accessibility test for field errors and submission status.
- No secrets exposed to client bundles.
- Manual test for no-JS fallback if supported by deployment route.

## Related Documents

- `docs/adrs/ADR-003-error-model.md`
- `docs/adrs/ADR-004-effect-service-layers.md`
- `docs/error-models/portfolio_error_model.md`

