# Page Specs: Portfolio Index

Status: Proposed

Date: 2026-06-02

## Purpose

This index defines shared page rules and links to isolated per-page specs for the portfolio.

Each page spec covers content requirements, initial state, loading state, failure state, view transitions, UML user stories, accessibility requirements, and acceptance criteria.

## Global Page Rules

### Rendering

- Core content should render without critical client JavaScript.
- Static pages fail at build time when required content is invalid.
- Client islands must have static or accessible fallback content.
- Route-level loading states are minimal because Astro serves pre-rendered HTML for most pages.

### Navigation Transition

```txt
current page
  -> user activates nav/link/CTA
  -> browser loads target route
  -> target page initial state
```

Optional page transition motion may use a subtle fade only. Reduced motion disables non-essential transition animation.

### Shared Failure Rules

| Failure | Behavior |
|---|---|
| Required content missing | Fail build. |
| Invalid content schema | Fail build. |
| Unknown dynamic slug | Render 404. |
| Optional preview content missing | Omit optional preview if minimum content requirement remains satisfied. |
| Client island data invalid | Render static fallback. |
| Contact service failure | Show accessible retry/direct-email fallback. |

## Page Specs

| Page | Route | Spec |
|---|---|---|
| Home | `/` | `docs/page-specs/home.md` |
| Services | `/services` | `docs/page-specs/services.md` |
| Case Studies | `/case-studies`, `/case-studies/[slug]` | `docs/page-specs/case-studies.md` |
| Technical Lab | `/lab`, `/lab/[slug]` | `docs/page-specs/technical-lab.md` |
| Sample Audit | `/sample-audit` | `docs/page-specs/sample-audit.md` |
| About | `/about` | `docs/page-specs/about.md` |
| Contact | `/contact` | `docs/page-specs/contact.md` |
| Not Found | `404` | `docs/page-specs/not-found.md` |

## Related Documents

- `docs/architecture/portfolio_architectural_foundation.md`
- `docs/content-models/portfolio_content_models.md`
- `docs/data-flows/content-to-page-data-flow.md`
- `docs/data-flows/contact-intake-data-flow.md`
- `docs/error-models/portfolio_error_model.md`
- `docs/ui/component-management.md`
- `docs/ui/styling-conventions.md`
- `docs/portfolio_design_system_award_update.md`
- `docs/portfolio_requirements_technical_spec_award_update.md`

