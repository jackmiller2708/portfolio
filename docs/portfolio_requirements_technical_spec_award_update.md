# Portfolio Requirements & Technical Specification - Award-Informed Update

Version 2.0 - June 2026

## Research Summary

Award-winning portfolio sites are not just resumes with nicer colors. They combine a clear concept, strong visual direction, memorable interaction, good usability, and content that proves the person can solve valuable problems.

For this Angular contractor portfolio, the goal is not maximum spectacle. The goal is a premium technical portfolio that makes frontend architecture skill visible without making the site feel like a toy.

## Award Signals To Translate Into Requirements

| Award signal             | What it rewards                             | Portfolio interpretation                                                                                      |
| ------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Awwwards scoring         | Design, usability, creativity, content      | Balance visual polish with clear service positioning. Animation must not block scanning/contact.              |
| Awwwards Developer Award | Developer craft after SOTD-level evaluation | Show implementation quality through performance, accessibility, progressive enhancement, and technical demos. |
| CSS Design Awards        | UI, UX, Innovation                          | Refined UI, obvious user path, and one or two original technical interactions.                                |
| Portfolio galleries      | Creative content showcasing                 | Services, case studies, demos, proof, and contact are the core experience.                                    |

## Core Thesis

The portfolio should communicate:

> I make complex frontend systems explicit, safer, and easier to evolve.

The visual system should feel architectural, precise, and calm. The interaction system should demonstrate craft, but never compete with the message.

## Award-Winning Characteristics To Include

1. Immediate positioning: hero states Angular Frontend Systems Engineer and the outcome: audit, refactor, stabilize complex Angular systems.
2. Strong concept: “frontend systems made explicit” through maps, flows, boundaries, risk markers, and before/after system diagrams.
3. Editorial design: typography, spacing, visual rhythm, and case study pages feel intentional.
4. Purposeful motion: scroll reveals, line drawing, state transitions, subtle parallax, all disabled/simplified under reduced motion.
5. Technical signature: interactive architecture map or RxJS flow explainer, not a generic 3D model.
6. Proof over claims: case studies include problem, constraints, architecture decision, tradeoffs, implementation, result, next recommendation.
7. Fast and accessible craft: Core Web Vitals, WCAG AA contrast, keyboard navigation, responsive layout, reduced motion.
8. Clear conversion path: CTA in hero, nav, services, and contact.

## Updated Information Architecture

1. Home
2. Services
3. Case Studies
4. Technical Lab
5. Sample Audit
6. About
7. Contact

## Functional Requirements

| ID    | Requirement                  | Acceptance criteria                                                                                         |
| ----- | ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| FR-01 | Hero positioning             | Title, specialization, core outcome, and CTA visible without scrolling on desktop and high-end mobile.      |
| FR-02 | Service cards                | Every service includes client pain, output, best fit, and CTA.                                              |
| FR-03 | Case study template          | Includes context, constraints, problem, decision, tradeoffs, before/after, visuals, result, recommendation. |
| FR-04 | Interactive architecture map | Shows messy vs explicit frontend states with static fallback.                                               |
| FR-05 | Technical lab                | At least four entries: RxJS cleanup, data/error modeling, Hash/Equal, cache semantics.                      |
| FR-06 | Sample audit                 | Fake Angular audit report viewable as page and later downloadable.                                          |
| FR-07 | Contact flow                 | Asks product, Angular version, team size, pain, diagnosis vs implementation, timeline, budget comfort.      |
| FR-08 | Responsive support           | Usable on mobile, tablet, laptop, desktop, and touch devices.                                               |
| FR-09 | Bilingual-ready              | Supports English-first and future Vietnamese variant.                                                       |
| FR-10 | Privacy-safe proof           | Case studies can redact employer/client names and use synthetic diagrams.                                   |

## Non-Functional Requirements

- Performance: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 mindset; Lighthouse Performance >= 90 on mobile for core pages.
- Accessibility: WCAG 2.2 AA baseline; contrast >= 4.5:1; focus states; keyboard navigation; semantic headings; alt text; skip link; reduced motion.
- Motion safety: all non-essential animations respect prefers-reduced-motion.
- Content maintainability: case studies, lab posts, and service copy are content-driven via MDX/schema.
- SEO/social: title, description, Open Graph image, canonical URL, useful structured data.
- Reliability: no blocking third-party scripts.
- Security: spam-protected contact flow and no frontend secrets.
- Maintainability: typed content schema, design tokens, component library, QA scripts.

## Recommended Tech Stack

| Layer         | Recommended tech                        | Reason                                                                                            |
| ------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Framework     | Astro + TypeScript                      | Content-heavy, static, fast, MDX, selective interactive islands.                                  |
| Alternative   | Next.js + React                         | Good for R3F and React ecosystem, but more complexity than needed.                                |
| Angular proof | Angular demos or separate demo apps     | Show Angular strength through labs/case studies instead of forcing marketing shell to be Angular. |
| Styling       | CSS variables + Tailwind or CSS modules | Design tokens and predictable responsive system.                                                  |
| Content       | MDX + typed content schema              | Easy case studies and lab notes.                                                                  |
| Animation     | CSS transitions + GSAP ScrollTrigger    | Controlled scroll storytelling.                                                                   |
| Optional 3D   | Three.js or React Three Fiber island    | Only for one signature architecture interaction.                                                  |
| Diagrams      | SVG / Mermaid / custom data-driven SVG  | Crisp, accessible, maintainable architecture visuals.                                             |
| Code display  | Shiki or Expressive Code                | High-quality snippets.                                                                            |
| Deployment    | Vercel, Netlify, Cloudflare Pages       | Static hosting and branch previews.                                                               |
| QA            | Lighthouse CI, axe, Playwright          | Protect performance, accessibility, and critical flows.                                           |

## Launch Checklist

- Responsive from 360px to 1440px+.
- Core content readable without critical JavaScript.
- Lighthouse mobile target met for home/services/case/contact.
- Keyboard navigation complete.
- Reduced-motion mode works.
- Every case study has one clear business/engineering takeaway.
- Every service has best-fit and not-fit blocks.
- Contact CTA is obvious.
- No confidential employer/client content exposed.
