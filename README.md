# Frontend Systems Portfolio

A portfolio designed around making frontend system risk visible and actionable through focused diagnostics, architecture, and practical implementation constraints.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) for static site generation, content collections, and island architecture.
- **Typing**: TypeScript.
- **Logic / Flow**: [Effect](https://effect.website/) for robust workflow handling, error management, and dependency injection (e.g., content loading, contact form states).
- **Styling**: Token-based vanilla CSS defined in `src/styles`.
- **Testing / Quality**: Vitest, Playwright, ESLint, Prettier.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Check project quality**:
   ```bash
   npm run quality
   ```
   This command runs formatting checks, linting, type-checking, Vitest, and the Astro build step.

4. **Verify UI Constraints**:
   ```bash
   npm run verify:ui
   ```
   This runs a Playwright-based script (`scripts/verify-ui.mjs`) to test horizontal overflow, semantic HTML elements, and UI bounds across various viewports.

## Documentation and Architecture

For details on project planning, roadmap status, and architectural decisions, please see the [docs/](docs) directory. Specifically:

- **[Roadmap](docs/roadmap.md)**: The current phase and task tracking for the portfolio.
- **[Architecture ADRs](docs/adrs)**: Architecture Decision Records (e.g., content data flow, Effect service layers, component architecture).
- **[Content Models](docs/content-models)**: Structure for services, audit findings, lab posts, and site metadata.
