# Portfolio Roadmap

Version 1.0 - June 2026

## Purpose

Track the portfolio from documentation foundation through V1 launch, V1.5 proof, V2 signature interaction, and V3 award polish.

## Current Status

The project has a committed planning foundation, Astro scaffold, tooling, content model, content-backed loaders, initial pages, and contact workflow foundation.

Latest commits:

- `900e713 docs: establish portfolio planning foundation`
- `3d30698 feat: scaffold astro portfolio foundation`
- `86db7f3 feat: wire portfolio content foundation`
- `6d3e31e test: add v1 quality gate`
- `1d444b8 docs: update readme`

## Phase 0: Planning Foundation

- [x] Add design-system direction.
- [x] Add requirements and technical specification.
- [x] Add documentation conventions.
- [x] Add reusable templates for ADRs, architecture, data flow, errors, content models, UI conventions, page specs, and implementation plans.
- [x] Add architecture foundation.
- [x] Add ADRs for stack boundaries, content data flow, error model, Effect layers, client islands, component architecture, and styling.
- [x] Add data-flow specs for content-to-page and contact intake.
- [x] Add error model.
- [x] Add content model.
- [x] Add UI/component/styling conventions.
- [x] Add isolated page specs with initial, loading, failure, transitions, and UML user stories.
- [x] Accept stable architecture, UI, page, tooling, and implementation docs.

## Phase 1: Repository And Tooling Foundation

- [x] Initialize git.
- [x] Add commit message template.
- [x] Add PR template.
- [x] Add `.gitattributes`.
- [x] Add `.gitignore`.
- [x] Scaffold Astro + TypeScript project.
- [x] Add Effect.
- [x] Add Prettier with Astro plugin.
- [x] Add ESLint with Astro, TypeScript, and accessibility rules.
- [x] Add Vitest.
- [x] Add quality script.
- [x] Verify `npm run quality`.

## Phase 2: V1 Content And Data Foundation

- [x] Add Astro content collections.
- [x] Use explicit Astro 6 content loaders.
- [x] Add initial service content.
- [x] Add initial sample audit findings.
- [x] Add initial lab post placeholders.
- [x] Add initial case study placeholders.
- [x] Add site metadata.
- [x] Add domain models for services, audits, lab posts, case studies, site metadata, and contact.
- [x] Add `ContentRepository` interface.
- [x] Add Astro-backed content repository.
- [x] Wire Home, Services, Sample Audit, Contact, Case Studies, and Lab pages to content loaders.
- [x] Add contact intake schema.
- [x] Add contact intake Effect workflow.
- [x] Add tests for home loader and contact workflow.

## Phase 3: V1 Page Completion

- [x] Replace placeholder home layout with full V1 structure: hero, proof strip, services, audit preview, lab preview, CTA.
- [x] Add basic static `HeroSystemMap` into Home hero.
- [x] Expand Services page with deliverables, best-fit, not-fit, and first-step sections.
- [x] Expand Sample Audit with severity grouping, risk matrix, and sprint roadmap.
- [x] Expand Contact page with accessible success, validation, spam, delivery failure, and direct-email fallback states.
- [x] Add About content collection or typed metadata.
- [x] Add site-wide SEO metadata helpers.
- [x] Add Open Graph defaults.
- [x] Add canonical URL handling.
- [x] Add reusable proof-strip component.
- [x] Add reusable evidence panel component.
- [x] Add reusable contact intake component or island.

## Phase 4: V1 Quality Gate

- [x] Add Playwright smoke tests for Home, Services, Sample Audit, Contact, and 404.
- [x] Add axe accessibility checks for core routes.
- [x] Add Lighthouse script or CI-friendly performance checks.
- [x] Add keyboard navigation checklist.
- [x] Add reduced-motion verification checklist.
- [x] Add responsive viewport checks for 360px, tablet, laptop, and desktop.
- [x] Add CI workflow that runs `npm run quality`.
- [x] Review npm audit findings and decide whether to remediate, accept, or pin.

## Phase 5: V1.5 Proof

- [x] Expand two case studies beyond placeholders.
- [x] Add case study detail route implementation.
- [x] Add four technical lab entries with real content.
- [x] Add lab detail route implementation.
- [x] Add basic system map content model.
- [x] Add basic static/interactive system map.
- [x] Add privacy/redaction review checklist for case studies.

## Phase 6: V2 Signature Interaction

- [ ] Implement explicit system map messy state.
- [ ] Implement explicit system map bounded state.
- [ ] Add risk hotspot interactions.
- [ ] Add ADR/decision overlay.
- [ ] Add keyboard and touch interaction support.
- [ ] Add static SVG fallback.
- [ ] Add before/after architecture toggle.
- [ ] Add reduced-motion-specific static experience.
- [ ] Add visual regression or screenshot checks for the map.

## Phase 7: V3 Award Polish

- [ ] Refine editorial rhythm across pages.
- [ ] Refine motion timing and transitions.
- [ ] Add subtle system-flow line drawing where useful.
- [ ] Improve dark-mode diagram readability.
- [ ] Add final OG image.
- [ ] Add submission screenshots/assets.
- [ ] Run final Lighthouse and accessibility pass.
- [ ] Run final privacy-safe content review.

## Immediate Next Milestone

Begin **Phase 6: V2 Signature Interaction**.

Implementation plan: draft `docs/implementation/v2-signature-interaction-implementation-plan.md`.
