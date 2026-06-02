# Phase 4: V1 Quality Gate

This plan covers the implementation of the V1 Quality Gate for the portfolio project, ensuring the V1 page experience is tested, accessible, performant, and automatically verified in CI.

## User Review Required

> [!NOTE]
> The plan has been approved with the addition of the README.md and Phase 3 commit. We will now proceed with execution.

## Proposed Changes

### 0. Phase 3 Conclusion

#### [NEW] [README.md](file:///d:/Projects/portfolio/README.md)

- Create a proper `README.md` for the project explaining the purpose (Frontend Systems Portfolio), tech stack (Astro, TypeScript, Effect), and how to run it locally. Include a link to the `docs/` folder for architecture and roadmap context.

#### Git Commit

- Stage the `docs/roadmap.md` modifications and the new `README.md`.
- Commit these changes with the message `docs: conclude phase 3 and add readme` to finalize Phase 3.

### 1. Automation and Viewport Expansion

#### [MODIFY] [scripts/verify-ui.mjs](file:///d:/Projects/portfolio/scripts/verify-ui.mjs)

- Update the `viewports` array to include the required responsive checks:
  - `mobile`: 360px width
  - `tablet`: 768px width
  - `laptop`: 1024px width
  - `desktop`: 1280px width
- Ensure the script still validates all existing checks across these new breakpoints.

### 2. Accessibility (Axe Checks)

#### [NEW] [tests/a11y.spec.ts](file:///d:/Projects/portfolio/tests/a11y.spec.ts)

- Install `@axe-core/playwright` as a dev dependency.
- Create a Playwright test file that iterates over the core routes (`/`, `/services`, `/sample-audit`, `/contact`, `/about`, and `/404`) and runs Axe accessibility checks on each.
- Configure `playwright.config.ts` (if needed) to run these alongside or separately from standard Vitest tests.

### 3. Smoke Tests

#### [NEW] [tests/smoke.spec.ts](file:///d:/Projects/portfolio/tests/smoke.spec.ts)

- Create standard Playwright smoke tests for Home, Services, Sample Audit, Contact, and 404.
- Test basic interactions and ensure pages load without critical errors.

#### [NEW] [playwright.config.ts](file:///d:/Projects/portfolio/playwright.config.ts)

- Add a Playwright configuration file to manage the smoke and accessibility test execution against a local dev server.

### 4. Performance Checks (Lighthouse)

#### [NEW] [scripts/verify-performance.mjs](file:///d:/Projects/portfolio/scripts/verify-performance.mjs)

- Install `lighthouse` and `puppeteer` (or integrate via Playwright) as dev dependencies.
- Create a custom script to run Lighthouse over the core routes and assert minimum threshold scores (e.g., > 90 for performance, accessibility, SEO, best practices).
- Add a `"verify:perf"` script to `package.json`.

### 5. Manual Checklists

#### [NEW] [docs/quality-gate/manual-checklists.md](file:///d:/Projects/portfolio/docs/quality-gate/manual-checklists.md)

- Create a document detailing the **Keyboard navigation checklist** (focus order, visible focus rings, no traps).
- Detail the **Reduced-motion verification checklist** (verifying animations/transitions respect `prefers-reduced-motion`).

### 6. Continuous Integration

#### [NEW] [.github/workflows/quality.yml](file:///d:/Projects/portfolio/.github/workflows/quality.yml)

- Define a GitHub Actions workflow triggered on push and pull requests to `main`.
- The workflow will:
  - Install dependencies (`npm ci`).
  - Run the `npm run quality` script.
  - Install Playwright browsers (`npx playwright install --with-deps`).
  - Run the UI verification and smoke tests.

### 7. NPM Audit Review

- Run `npm audit` and address any high/critical vulnerabilities by updating packages or adding overrides/resolutions to `package.json`.

## Verification Plan

### Automated Tests

- Ensure `npm run quality` executes Vitest, ESLint, Prettier, Astro check, and building successfully.
- Ensure `npx playwright test` passes the newly written Axe accessibility and smoke tests.
- Ensure `node scripts/verify-ui.mjs` and `node scripts/verify-performance.mjs` run without failures in the expanded viewports.

### Manual Verification

- Review the generated Lighthouse reports.
- Follow the manual checklists for Keyboard Navigation and Reduced Motion.
