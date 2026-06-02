# Implementation Plan: V4 UX Consulting Proof

Status: Accepted

Date: 2026-06-02

## Objective

Complete the UX QA polish, Home diagnostic selector, and proof-first Home flow in one pass.

## Scope

### In Scope

- Add favicon and active navigation state.
- Fix Home/system-map heading order and dark-mode accent contrast.
- Add a typed diagnostic selector backed by the Home view model.
- Connect diagnostic options to services, audit proof, map state, and route-specific contact CTAs.
- Reorder Home around diagnostic, system map, case proof, sample audit, lab notes, services, and contact.
- Add proof cards for case-study problem, decision, and result summaries.
- Add unit and Playwright coverage for diagnostic data and selector updates.

### Out of Scope

- Guided sample-audit walkthrough.
- Case-study detail-page redesign.
- Advisory contact recommendation flow.
- New private proof, client screenshots, or unreleased metrics.

## Verification

- `npm run quality`
- `npm run test:e2e`
- `npm run verify:ui`
- `npm run verify:perf` against the production preview server
