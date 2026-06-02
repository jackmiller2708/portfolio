# Implementation Plan: V1 Page Completion

Status: Draft

Date: 2026-06-02

## Objective

Complete the V1 public page experience by replacing placeholder layouts with structured, content-backed pages; adding reusable proof, evidence, SEO, and contact components; and making the first conversion path from Home, Services, Sample Audit, and Contact coherent without relying on critical client JavaScript.

## Inputs

| Input                                                  | Status   | Notes                                                                        |
| ------------------------------------------------------ | -------- | ---------------------------------------------------------------------------- |
| `docs/roadmap.md` Phase 3                              | Draft    | Defines the V1 page completion checklist.                                    |
| `docs/page-specs/home.md`                              | Accepted | Defines hero, proof strip, service preview, audit preview, lab preview.      |
| `docs/page-specs/services.md`                          | Accepted | Defines offer comparison, deliverables, fit guidance, and first step.        |
| `docs/page-specs/sample-audit.md`                      | Accepted | Defines severity grouping, risk matrix, finding detail, and roadmap.         |
| `docs/page-specs/contact.md`                           | Accepted | Defines intake fields and success/failure states.                            |
| `docs/page-specs/about.md`                             | Accepted | Defines professional context and working-style content.                      |
| `docs/content-models/portfolio_content_models.md`      | Accepted | Defines site metadata, SEO needs, services, audit findings, and about needs. |
| `docs/adrs/ADR-002-content-data-flow.md`               | Accepted | Keeps page data flowing through loaders/view models.                         |
| `docs/adrs/ADR-004-effect-service-layers.md`           | Accepted | Keeps workflow logic in Effect programs and services.                        |
| `docs/adrs/ADR-005-client-islands-and-interactions.md` | Accepted | Keeps contact and hero interaction enhancement isolated.                     |
| `docs/adrs/ADR-006-component-architecture.md`          | Accepted | Defines component taxonomy and dependency rules.                             |
| `docs/adrs/ADR-007-styling-system.md`                  | Accepted | Defines token-based global and scoped styling rules.                         |

## Scope

### In Scope

- Full V1 Home structure: hero, static `HeroSystemMap`, proof strip, services preview, audit preview, lab preview, and CTA.
- Services page sections for deliverables, best fit, not fit, and first step.
- Sample Audit sections for severity grouping, risk matrix, finding detail, sprint roadmap, and CTA.
- Contact intake UI states for initial, submitting, success, validation failure, spam/unavailable, delivery failure, and direct-email fallback.
- About content source through either a content collection or typed site metadata.
- Site-wide SEO metadata helper with title, description, canonical URL, and Open Graph defaults.
- Reusable `ProofStrip`, `EvidencePanel`, and `ContactIntake` component or island.
- Focused unit tests for loader/helper behavior changed in this phase.

### Out of Scope

- Playwright route smoke tests, axe checks, Lighthouse scripts, and responsive checklist automation. These belong to Phase 4.
- Fully interactive or polished system map behavior. This belongs to Phase 5 and Phase 6.
- Expanded real case studies and full lab posts. These belong to Phase 5.
- Final Open Graph artwork and award submission assets. These belong to Phase 7.
- Production email provider integration beyond the existing contact workflow boundaries.

## Work Breakdown

| Step | Description                                                                                                       | Verification                                                                                                       |
| ---- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1    | Audit current page view models and content schemas against Phase 3 page needs.                                    | Confirm required data is available or identify the smallest schema additions.                                      |
| 2    | Add SEO metadata helper and extend `BaseLayout` props for canonical and Open Graph tags.                          | Build output includes description, canonical, `og:title`, `og:description`, `og:image`, and `og:url`.              |
| 3    | Add about content through a small content collection or typed `siteMeta` extension.                               | About page renders from validated data and build fails for missing required fields.                                |
| 4    | Add reusable `ProofStrip` component for compact credibility facts.                                                | Home can render proof points without page-local repeated markup.                                                   |
| 5    | Add reusable `EvidencePanel` component for evidence, risk, recommendation, and CTA blocks.                        | Home and Sample Audit can reuse evidence presentation without raw content access.                                  |
| 6    | Replace Home placeholder layout with V1 structure and include static `HeroSystemMap`.                             | First viewport contains hero positioning, primary CTA, secondary CTA, and readable system-map fallback.            |
| 7    | Expand Services page with deliverable, best-fit, not-fit, and first-step sections.                                | Each service exposes outputs, fit criteria, exclusions, and a contact CTA with service context.                    |
| 8    | Expand Sample Audit with severity grouping, risk matrix, roadmap, and diagnostic CTA.                             | Findings are grouped by severity, matrix has text labels, and sprint roadmap is readable without color dependency. |
| 9    | Move contact form markup into `ContactIntake` component or island and model UI states.                            | Form exposes accessible status areas, error summary slots, field-level errors, and direct-email fallback.          |
| 10   | Connect contact workflow outcomes to visible states where static/server support exists.                           | Success, validation, spam/unavailable, delivery failure, and fallback messaging are represented by typed UI state. |
| 11   | Add or update focused tests for SEO helper, about loader, home loader, audit grouping, and contact state mapping. | `npm test` covers changed non-trivial logic.                                                                       |
| 12   | Run formatting, linting, typecheck, tests, and build.                                                             | `npm run quality` passes.                                                                                          |

## File/Module Plan

| Path                                                         | Purpose                                                                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `src/layouts/BaseLayout.astro`                               | Accept normalized SEO metadata and render standard meta, canonical, and Open Graph tags.          |
| `src/utils/seo.ts`                                           | Build page metadata from site defaults, route paths, and page overrides.                          |
| `src/content.config.ts`                                      | Add about collection or extend site metadata with validated Phase 3 fields.                       |
| `src/content/about/*` or `src/content/site-meta/main.json`   | Store professional context, working style, quality philosophy, availability, and social defaults. |
| `src/domain/site.ts`                                         | Represent SEO, navigation, availability, non-fit, proof, and about metadata as typed domain data. |
| `src/programs/load-home-page.ts`                             | Return proof strip, audit preview, lab preview, CTA, and hero map view data.                      |
| `src/programs/load-services-page.ts`                         | Return service detail sections and first-step CTA data.                                           |
| `src/programs/load-sample-audit-page.ts`                     | Return severity groups, risk matrix rows, and sprint roadmap data.                                |
| `src/programs/load-contact-page.ts`                          | Return contact copy, direct email fallback, fit guidance, and initial form state data.            |
| `src/programs/load-about-page.ts`                            | Load typed about page content if a separate collection is selected.                               |
| `src/components/sections/ProofStrip/ProofStrip.astro`        | Render compact proof points with semantic list markup.                                            |
| `src/components/organisms/EvidencePanel/EvidencePanel.astro` | Render evidence-oriented panels for proof and audit contexts.                                     |
| `src/islands/HeroSystemMap/HeroSystemMap.astro`              | Provide static V1 hero system map with text equivalent and reduced-motion-safe rendering.         |
| `src/islands/ContactIntake/ContactIntake.astro`              | Render the contact intake form and accessible state messaging.                                    |
| `src/pages/index.astro`                                      | Compose the full V1 Home page.                                                                    |
| `src/pages/services.astro`                                   | Compose detailed service sections and first-step CTA.                                             |
| `src/pages/sample-audit.astro`                               | Compose report-style audit sections.                                                              |
| `src/pages/contact.astro`                                    | Delegate form UI to `ContactIntake` and render fallback/contact context.                          |
| `src/pages/about.astro`                                      | Render about content from typed data.                                                             |
| `src/**/*.test.ts`                                           | Add focused tests for changed loaders, grouping logic, SEO helper, and state mapping.             |

## Acceptance Criteria

- Home renders hero, proof strip, services, audit preview, lab preview, CTA, and static system map.
- Services renders deliverables, best-fit, not-fit, and first-step sections for every V1 service.
- Sample Audit renders findings grouped by severity, an accessible risk matrix, and sprint roadmap.
- Contact renders accessible initial, submitting, success, validation, spam/unavailable, delivery failure, and direct-email fallback states.
- About content is validated through a content collection or typed site metadata.
- Every public page can emit title, description, canonical URL, Open Graph title, Open Graph description, Open Graph image, and Open Graph URL.
- Reusable `ProofStrip`, `EvidencePanel`, and `ContactIntake` components are present and used by page-level compositions.
- Components receive typed props and do not read raw content collections or environment config.
- Core page content remains readable without critical client JavaScript.
- `npm run quality` passes.

## Risks

| Risk                                                           | Mitigation                                                                                          |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Page completion expands into Phase 5 content work.             | Use existing placeholder case study/lab content only as previews; defer full detail depth.          |
| Contact server handling becomes deployment-specific too early. | Keep provider behavior behind existing workflow services and model visible UI states independently. |
| SEO helper duplicates layout responsibility.                   | Keep helper pure and let `BaseLayout` own rendering of tags.                                        |
| Static hero map grows into V2 interaction work.                | Limit Phase 3 to a readable static map and text equivalent.                                         |
| New components become too generic.                             | Build for the current Home, Services, Sample Audit, and Contact use cases only.                     |

## Verification Checklist

- `npm run format:check`
- `npm run lint`
- `npm run check`
- `npm test`
- `npm run build`
- Home first viewport checked at desktop and mobile widths.
- Services offer sections checked for every service.
- Sample Audit checked for severity labels that do not rely on color alone.
- Contact form checked with keyboard focus order and visible status/error messaging.
- Reduced-motion media query checked for `HeroSystemMap`.

## Follow-Up

- Phase 4: add Playwright smoke tests, axe accessibility checks, Lighthouse/performance checks, keyboard checklist, reduced-motion checklist, responsive viewport checks, CI, and npm audit review.
- Phase 5: expand case studies and lab posts, implement detail routes, and add the basic system map content model.
- Phase 6: add richer system map interaction, hotspot details, keyboard/touch support, and visual regression checks.
