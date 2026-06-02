# Implementation Plan: V5 Guided Proof And Advisory Flow

Status: Accepted

Date: 2026-06-03

## Objective

Complete roadmap phases 11-15 in one pass: guided sample audit, upgraded proof detail pages, advisory contact flow, route-specific OG assets, asset budgets, and final visual-system tightening.

## Scope

### In Scope

- Add a guided sample audit walkthrough while preserving the full report view.
- Improve case-study and lab detail scanning with before/after proof and recommended next reads.
- Add a lightweight advisory selector inside Contact.
- Add route-specific OG SVG assets for major proof routes.
- Add an asset budget verification script.
- Document final interaction and token conventions.

### Out of Scope

- New private client proof, unreleased metrics, or screenshot claims.
- New package dependencies.
- A separate advisory route.
- A masonry/gallery redesign.

## Verification

- `npm run quality`
- `npm run test:e2e`
- `npm run verify:ui`
- `npm run verify:perf` against the production preview server
- `npm run verify:budget`
