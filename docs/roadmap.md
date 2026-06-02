# Portfolio Roadmap

Version 1.0 - June 2026

## Purpose

Track the portfolio from documentation foundation through V1 launch, V1.5 proof, V2 signature interaction, V3 award polish, and post-V3 UX consulting proof.

## Current Status

The project has a committed planning foundation, Astro scaffold, tooling, content model, content-backed loaders, initial pages, and contact workflow foundation.

Latest commits:

- `900e713 docs: establish portfolio planning foundation`
- `3d30698 feat: scaffold astro portfolio foundation`
- `86db7f3 feat: wire portfolio content foundation`
- `6d3e31e test: add v1 quality gate`
- `1d444b8 docs: update readme`
- `189f88e feat: add v1.5 proof content`
- `2905c28 feat: add signature system map`
- `67b2df6 Complete home page diagnostic view model`

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

- [x] Implement explicit system map messy state.
- [x] Implement explicit system map bounded state.
- [x] Add risk hotspot interactions.
- [x] Add ADR/decision overlay.
- [x] Add keyboard and touch interaction support.
- [x] Add static SVG fallback.
- [x] Add before/after architecture toggle.
- [x] Add reduced-motion-specific static experience.
- [x] Add visual regression or screenshot checks for the map.

## Phase 7: V3 Award Polish

- [x] Refine editorial rhythm across pages.
- [x] Refine motion timing and transitions.
- [x] Add subtle system-flow line drawing where useful.
- [x] Improve dark-mode diagram readability.
- [x] Add final OG image.
- [x] Add submission screenshots/assets.
- [x] Run final Lighthouse and accessibility pass.
- [x] Run final privacy-safe content review.

## Phase 8: UX QA Polish

Source: `ui-ux-pro-max` accessibility, performance, and professional UI checks.

- [x] Add favicon and confirm no Lighthouse console errors on Home.
- [x] Fix Home heading order around the system-map detail heading.
- [x] Improve dark-mode accent contrast for labels and severity markers.
- [x] Add active navigation state without adding visual clutter.
- [x] Confirm all interactive controls have pointer affordance, visible focus, and stable hover states.
- [x] Re-run `npm run quality`, `npm run verify:ui`, and production-preview `npm run verify:perf`.

## Phase 9: Interactive Diagnostic Experience

Goal: Let visitors experience the consulting value before contacting.

- [x] Add a compact Home diagnostic selector for common frontend-system pains: unclear state, unreliable cache/data behavior, weak error recovery, and refactor planning.
- [x] Connect each diagnostic option to a recommended service, relevant sample audit finding, system-map state, and route-specific CTA.
- [x] Keep the interaction minimal, keyboard-accessible, and reduced-motion safe.
- [x] Add a typed diagnostic content model or view model so options are not hard-coded in the template.
- [x] Add unit coverage for diagnostic selection data.
- [x] Add Playwright coverage for selector states and CTA updates.

## Phase 10: Proof-First Home Flow

Source: `ui-ux-pro-max` portfolio-grid and before-after transformation patterns, adapted for technical proof rather than visual masonry.

- [x] Reorder the Home proof path around system map, case studies, sample audit, and lab notes.
- [x] Add a compact "what you can inspect" strip near the hero.
- [x] Add proof cards that summarize problem, decision, and result for each case study.
- [x] Make the primary path lead from diagnostic selector to proof artifact to contact.
- [x] Reduce same-weight card grids where progressive disclosure would scan better.

## Phase 11: Guided Sample Audit Walkthrough

Goal: Demonstrate UX consulting through clearer technical information design.

- [ ] Convert the sample audit from a static report page into a guided walkthrough.
- [ ] Let visitors step through symptom, evidence, risk, recommendation, and sprint sequence.
- [ ] Preserve the full report view for scanning.
- [ ] Add route-specific CTA copy for audit scoping.
- [ ] Add keyboard and touch support for walkthrough controls.
- [ ] Add axe and smoke coverage for the walkthrough.

## Phase 12: Case Study Experience Upgrade

- [ ] Add stronger before/after architecture comparison blocks to detail pages.
- [ ] Make constraints, decisions, tradeoffs, evidence, result, and recommendation easier to scan.
- [ ] Add "recommended next read" links at the bottom of case-study and lab detail pages.
- [ ] Add contact CTA variants that reference each case study's constraints.
- [ ] Keep all proof synthetic, redacted, or public-safe.

## Phase 13: Advisory Contact Flow

- [ ] Add a lightweight "what I would ask first" advisory flow before or within Contact.
- [ ] Recommend audit, stabilization, or advisory based on user-provided context.
- [ ] Keep form fields minimal and avoid a heavy quote-builder experience.
- [ ] Add accessible loading, validation, and fallback states for the new flow.
- [ ] Add tests for advisory recommendation logic.

## Phase 14: Performance And Asset Maturity

Source: `ui-ux-pro-max` Astro performance guidance.

- [ ] Add route-specific OG assets for major proof routes.
- [ ] Add an asset and client-JS budget check for future interaction growth.
- [ ] Keep Astro island hydration limited to genuinely interactive components.
- [ ] Consider critical CSS or component CSS consolidation only if render-blocking savings become material after added interactions.
- [ ] Add production-preview performance verification to the release checklist.

## Phase 15: Visual System Tightening

- [ ] Keep the minimal visual language, but make interactive proof states more discoverable.
- [ ] Evaluate whether typography needs a readability-first adjustment after user feedback.
- [ ] Avoid a masonry/gallery redesign unless more visual proof assets become available.
- [ ] Avoid luxury/gold or generic SaaS-blue palette drift; preserve the current technical brand.
- [ ] Document any token changes in styling conventions.

## Immediate Next Milestone

Begin **Phase 11: Guided Sample Audit Walkthrough**.

Next implementation plan to draft: `docs/implementation/v5-guided-sample-audit-implementation-plan.md`.
