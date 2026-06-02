# Implementation Plan: V1.5 Proof

Status: Accepted

Date: 2026-06-02

## Objective

Add enough privacy-safe proof for the portfolio to support technical review: two expanded case studies, four fuller lab posts, detail routes, a basic content-backed system map, and a redaction checklist.

## Scope

### In Scope

- Expand the two existing case studies with constraints, decisions, tradeoffs, before/after, evidence, result, and recommendation.
- Expand the four existing lab posts with practical technical content and related services.
- Implement static detail routes for case studies and lab posts.
- Add a basic `system-map` content collection and renderable static map data.
- Add privacy/redaction checklist for case studies.

### Out of Scope

- Final system-map hotspot interactions and ADR overlays.
- Downloadable audit PDFs.
- Public client names, private metrics, screenshots, or proprietary diagrams.
- Final award-submission polish.

## Verification

- `npm run quality`
- Case study and lab detail smoke coverage.
- Axe coverage for one case detail and one lab detail route.
- Privacy checklist reviewed before completing Phase 5.
