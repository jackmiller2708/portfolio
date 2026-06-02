# Data Flow: Content To Page

Status: Proposed

Date: 2026-06-02

## Purpose

Define how portfolio content moves from source files into rendered pages and interactive view models.

## Sources

| Source         | Type                          | Owner              | Notes                            |
| -------------- | ----------------------------- | ------------------ | -------------------------------- |
| Services       | MDX/frontmatter or typed data | Content collection | Used by Home and Services.       |
| Case studies   | MDX/frontmatter               | Content collection | Can be redacted or synthetic.    |
| Lab posts      | MDX/frontmatter               | Content collection | At least four required entries.  |
| Audit findings | MDX/frontmatter or typed data | Content collection | Used by Sample Audit.            |
| Site metadata  | Typed config/content          | Content collection | SEO, availability, social links. |

## Target Outputs

| Output                         | Consumer                       | Shape                                   |
| ------------------------------ | ------------------------------ | --------------------------------------- |
| Home page view model           | Home page/components           | `HomePageViewModel`                     |
| Services page view model       | Services page/components       | `ServicesPageViewModel`                 |
| Case study view model          | Case detail page/components    | `CaseStudyPageViewModel`                |
| Lab listing/detail view models | Technical Lab pages/components | `LabIndexViewModel`, `LabPostViewModel` |
| Audit page view model          | Sample Audit page/components   | `SampleAuditViewModel`                  |
| System map view model          | Hero/SystemMap island          | `SystemMapViewModel`                    |

## Flow

```txt
content source
  -> content collection schema
  -> Effect Schema/domain decode
  -> redaction and normalization
  -> page loader program
  -> page view model
  -> Astro page
  -> presentational components or serialized island data
```

## Validation

Required validation:

- Every service has client pain, output, best fit, not-fit/exclusion guidance, and CTA.
- Every case study has context, constraints, problem, decision, tradeoffs, before/after, result, and next recommendation.
- Every case study declares redaction status.
- Lab posts declare topic category, summary, technical takeaway, and related stack.
- Audit findings declare severity, affected area, evidence, risk, and recommendation.
- Public metadata has page title, description, canonical path, and Open Graph fields.

## Transformation Rules

- Raw content dates become normalized ISO strings.
- Tags/categories become constrained enum values.
- Case study private names become public-safe aliases.
- Long summaries are trimmed or rejected according to component limits.
- Page loaders choose featured/selected entries rather than pages deciding inline.
- Client islands receive only the specific fields needed for interaction.

## Failure Modes

| Failure                        | Error type              | Fallback or response                                       |
| ------------------------------ | ----------------------- | ---------------------------------------------------------- |
| Required content missing       | `MissingContentError`   | Fail build for core pages.                                 |
| Invalid content shape          | `ContentDecodeError`    | Fail build.                                                |
| Case study redaction missing   | `PrivacyRedactionError` | Fail build.                                                |
| Optional lab entry unavailable | `MissingContentError`   | Exclude from optional lists if minimum count is still met. |
| System map data invalid        | `ContentDecodeError`    | Render static fallback only if fallback data is valid.     |

## Privacy And Redaction

Case studies must explicitly declare one of:

- `public`: client/employer names can be shown.
- `redacted`: names are replaced with public-safe labels.
- `synthetic`: diagrams and data are representative.

Private implementation details, employer secrets, client names without permission, internal URLs, credentials, and proprietary metrics must not appear in public output.

## Observability

Build output should report:

- number of services
- number of case studies
- number of lab posts
- number of audit findings
- redacted/synthetic case study count
- validation failures with file references

## Verification

- Schema tests for each content type.
- Fixture tests for valid, invalid, and redacted content.
- Page loader tests for Home, Services, Case Study, Lab, and Sample Audit.
- Static render smoke tests for core pages.
- SEO metadata checks for public pages.

## Related Documents

- `docs/adrs/ADR-002-content-data-flow.md`
- `docs/content-models/portfolio_content_models.md`
- `docs/error-models/portfolio_error_model.md`
