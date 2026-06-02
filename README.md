# Frontend Systems Portfolio

> "I make complex frontend systems explicit, safer, and easier to evolve."

An award-targeted portfolio designed to showcase senior frontend architecture and systems engineering. The site embraces a **"calm technical premium"** aesthetic—avoiding generic 3D spectacle in favor of precise, architectural visual metaphors that highlight risk, data flow, and ownership boundaries.

## Core Intent & Award-Informed Direction

This project is built around the following principles to target developer craft and UI/UX awards:

- **Architectural Metaphor**: Using frontend systems as the visual language (feature boundaries, stream paths, data states, risk hotspots, decisions).
- **Proof over Claims**: Showcasing real-world constraints, tradeoffs, architectural decisions, and before/after improvements in case studies and lab notes.
- **Fast and Accessible Craft**: Meeting strict non-functional requirements including Lighthouse scores ≥ 90, WCAG 2.2 AA contrast, robust keyboard navigation, and responsive reduced-motion states.
- **Signature Interaction**: An explicit, interactive system map that translates messy frontend states into bounded, explicit architecture.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) for static site generation, fast LCP, and selective interactive islands.
- **Typing**: TypeScript.
- **Logic / Flow**: [Effect](https://effect.website/) for robust workflow handling, error management, and dependency injection.
- **Styling**: Token-based vanilla CSS defined in `src/styles`.
- **Testing & Quality Gate**: Vitest, Playwright (E2E & Axe accessibility), Lighthouse, ESLint, Prettier.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Check project quality (Lint, Typecheck, Build)**:
   ```bash
   npm run quality
   ```

4. **Run E2E Smoke & Accessibility (Axe) Tests**:
   ```bash
   npm run test:e2e
   ```

5. **Verify UI Constraints & Performance**:
   ```bash
   npm run verify:ui
   npm run verify:perf
   ```
   These custom scripts validate viewport rendering, semantic elements, and headless Lighthouse scores.

## Documentation and Architecture

For details on project planning, roadmap status, and architectural decisions, please see the [docs/](docs) directory. Specifically:

- **[Award Updates & Tech Specs](docs/portfolio_requirements_technical_spec_award_update.md)**: The core thesis, non-functional requirements, and design direction.
- **[Roadmap](docs/roadmap.md)**: The current phase and task tracking (V1 Foundation → V1.5 Proof → V2 Signature → V3 Award polish).
- **[Architecture ADRs](docs/adrs)**: Architecture Decision Records (e.g., content data flow, Effect service layers, component architecture).
