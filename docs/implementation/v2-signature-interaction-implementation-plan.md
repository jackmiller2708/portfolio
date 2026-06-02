# Implementation Plan: V2 Signature Interaction

Status: Accepted

Date: 2026-06-02

## Objective

Turn the content-backed system map into the portfolio's signature interaction without making it depend on private client details or complex runtime state.

## Scope

### In Scope

- Render messy and bounded architecture states from the system-map content model.
- Add risk hotspot and decision-overlay interactions.
- Support keyboard, pointer, and touch activation through native buttons.
- Provide a static SVG no-JavaScript fallback and accessible text equivalent.
- Keep reduced-motion users on a static readable experience.
- Add screenshot-oriented Playwright coverage for the system map.

### Out of Scope

- Client-specific architecture diagrams.
- Animated canvas/WebGL rendering.
- Downloadable interactive artifacts.

## Verification

- `npm run quality`
- `npm run verify:ui`
- System-map Playwright coverage for state toggles, hotspot details, and screenshot capture.
