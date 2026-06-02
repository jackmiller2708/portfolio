# Data Flow: Title

Status: Draft

Date: YYYY-MM-DD

## Purpose

Describe the workflow or data path this document covers.

## Sources

| Source | Type | Owner | Notes |
|---|---|---|---|
| Example content file | MDX/frontmatter | Content collection | Example note. |

## Target Outputs

| Output | Consumer | Shape |
|---|---|---|
| Example view model | Astro page/component | `ExampleViewModel` |

## Flow

```txt
source data
  -> validation/decoding
  -> domain model
  -> page/program view model
  -> rendered component or response
```

## Validation

Define schema requirements, required fields, derived fields, and rejected states.

## Transformation Rules

List important transformations from raw input to domain data to view model.

## Failure Modes

| Failure | Error type | Fallback or response |
|---|---|---|
| Invalid field | `ExampleDecodeError` | Fail build or show safe fallback. |

## Privacy And Redaction

State what must not appear in public output.

## Observability

Describe logs, traces, metrics, or build-time reports needed for this flow.

## Verification

- Schema tests
- Fixture tests
- Page rendering checks
- Accessibility or SEO checks where relevant

## Related Documents

- Related ADRs
- Related content model
- Related implementation plan

