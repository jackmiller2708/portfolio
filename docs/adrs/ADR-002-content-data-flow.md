# ADR-002: Content Data Flow

Status: Accepted

Date: 2026-06-02

## Decision

Content must flow from source files through schema validation, domain normalization, page view model creation, and then rendering. Astro pages and components must not consume raw frontmatter or unvalidated content directly.

## Context

The portfolio relies on services, case studies, technical lab notes, audit findings, and availability/contact metadata. These content types support credibility, SEO, privacy-safe proof, and conversion.

The requirements call for content maintainability through MDX/schema and privacy-safe redacted case studies. That requires a predictable data path.

## Options Considered

| Option | Summary | Tradeoff |
|---|---|---|
| Raw MDX/frontmatter in pages | Pages query and render content directly. | Simple, but validation and redaction become scattered. |
| Astro content collections only | Use Astro schema and direct collection access. | Good baseline, but workflow errors and transformations are less explicit. |
| Astro content collections + Effect programs | Decode, normalize, and transform content through typed programs. | More structure, but stronger data flow and testing. |

## Rationale

The portfolio should not treat content as loose page decoration. Services, case studies, audits, and lab notes are product surfaces. They need validation, redaction rules, derived metadata, and stable page view models.

## Consequences

### Positive

- Content quality failures can fail early.
- Page components stay presentational.
- Redaction rules can be enforced consistently.
- Future bilingual support has a clear data boundary.

### Negative

- Content additions require schema compliance.
- View model mapping adds a small maintenance layer.

### Follow-Up

- Define content models for services, case studies, lab posts, audit findings, and site metadata.
- Define content-to-page data flow.
- Add fixtures for valid and invalid content once implementation starts.

## Verification

- Content schemas reject incomplete service cards, case studies, lab posts, and audit findings.
- Page loader programs produce stable view models.
- Redaction checks exist for case studies.
- Build fails for required public pages with missing critical content.

## Related Documents

- `docs/data-flows/content-to-page-data-flow.md`
- `docs/content-models/portfolio_content_models.md`
- `docs/portfolio_requirements_technical_spec_award_update.md`

