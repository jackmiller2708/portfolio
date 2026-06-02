# My Frontend Systems Portfolio

Hi, I'm a Frontend Systems Engineer, and this repository contains the source code for my personal portfolio. 

I built this site to serve as more than just a digital resume—it's a direct reflection of how I approach engineering. My core professional focus is to **make complex frontend systems explicit, safer, and easier to evolve.** This portfolio is designed from the ground up to communicate exactly that.

Instead of relying on flashy 3D spectacle or experimental UI patterns that distract from the content, I aimed for a "calm technical premium" aesthetic. The site uses architectural visual metaphors to highlight what I actually do: managing risk, optimizing data flow, and clarifying ownership boundaries in large-scale applications (specifically Angular).

## Why I Built It This Way

When designing this portfolio, I wanted the architecture and the user experience of the site itself to mirror the quality of the work I deliver to clients:

- **Architectural Storytelling:** The interactive system map isn't just a gimmick. It visually translates the messy reality of large frontend codebases into bounded, explicit architecture.
- **Proof over Claims:** You won't just find a list of technologies here. My case studies and lab notes dive deep into real-world constraints, engineering tradeoffs, architectural decisions, and the concrete before/after improvements I've driven.
- **Fast and Accessible Craft:** Craft matters. The site adheres to strict non-functional requirements, ensuring Lighthouse scores stay ≥ 90, maintaining WCAG 2.2 AA contrast, supporting robust keyboard navigation, and respecting reduced-motion preferences out of the box.

## The Tech Stack

To keep the site fast and the logic robust, this project is built with:

- **Framework**: [Astro](https://astro.build/) for static site generation, blazing fast initial loads, and selective interactive islands.
- **Typing**: TypeScript (because explicit contracts prevent implicit bugs).
- **Logic & Flow**: [Effect](https://effect.website/) for robust workflow handling, error management, and dependency injection.
- **Styling**: Token-based vanilla CSS defined in `src/styles`.
- **Quality Gate**: Vitest, Playwright (for E2E & Axe accessibility checks), Lighthouse, ESLint, and Prettier.

## Running It Locally

If you're exploring the code and want to spin the site up yourself:

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

## Documentation

For a deeper dive into the planning, roadmap, and architectural decisions behind this portfolio, check out the [docs/](docs) directory. Specifically:

- **[Design & Tech Specs](docs/portfolio_requirements_technical_spec_award_update.md)**: The core thesis, non-functional requirements, and design direction that guided this build.
- **[Roadmap](docs/roadmap.md)**: Task tracking and phase planning (from Foundation to Award Polish).
- **[Architecture ADRs](docs/adrs)**: The *why* behind the tech stack, content data flows, and component architecture.
