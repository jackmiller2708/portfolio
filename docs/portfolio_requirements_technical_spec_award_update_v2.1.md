# Portfolio Requirements & Technical Specification - Award-Informed Update

Version 2.1 - June 2026

## Research Summary

Award-winning portfolio sites are not just resumes with nicer colors. They combine a clear concept, strong visual direction, memorable interaction, good usability, and content that shows the person can solve valuable problems.

For this Angular contractor portfolio, the goal is not maximum spectacle. The goal is a premium technical portfolio that makes frontend architecture skill visible without making the site feel like a toy — or like a cross-examination.

## Award Signals To Translate Into Requirements

| Award signal             | What it rewards                             | Portfolio interpretation                                                                                      |
| ------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Awwwards scoring         | Design, usability, creativity, content      | Balance visual polish with clear service positioning. Animation must not block scanning/contact.              |
| Awwwards Developer Award | Developer craft after SOTD-level evaluation | Show implementation quality through performance, accessibility, progressive enhancement, and technical demos. |
| CSS Design Awards        | UI, UX, Innovation                          | Refined UI, obvious user path, and one or two original technical interactions.                                |
| Portfolio galleries      | Creative content showcasing                 | Services, case studies, demos, reference work, and contact are the core experience.                           |

## Core Thesis

The portfolio should communicate:

> I make complex frontend systems explicit, safer, and easier to evolve.

The visual system should feel architectural, precise, and calm. The interaction system should demonstrate craft, but never compete with the message.

## Voice Principles

The written tone across all pages should be **inviting, not adversarial**. The reader is a technical lead or engineering manager who is evaluating fit — they don't need to be convinced through force; they need to see clearly.

**Four tests for any piece of copy:**

1. Does it sound like something a trusted senior engineer would say in a conversation, or does it sound like a legal brief?
2. Does the CTA feel like an offer the reader can take or leave, or a directive they're expected to follow?
3. Does the section heading describe the reader's experience, or does it describe an artifact the writer is presenting?
4. Is the word "proof" doing real work here, or is "example", "finding", or "reference" more accurate and less combative?

## Updated Information Architecture

1. Home
2. Services
3. Case Studies
4. Technical Lab
5. Sample Audit
6. About
7. Contact

## Copy Inventory — Before / After

The following changes propagate the voice update across every page. These are not optional polish items; they change the register the site operates in.

### Home

| Location                              | Current                                           | Updated                                                          |
| ------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| Section heading                       | Case proof before the service list                | How past engagements have gone                                   |
| Section heading                       | Inspect the architecture proof                    | The architecture in context                                      |
| Section heading                       | A report shape built around evidence and sequence | What a finding looks like                                        |
| Delivery style label (in feature row) | Evidence first                                    | Evidence first _(keep — reads as working principle, not demand)_ |
| Inline label in diagnostic panel      | Proof                                             | Example / Reference finding                                      |
| CTA button in diagnostic panel        | Scope state risk                                  | Explore this                                                     |

### Case Studies index

| Location      | Current                                                                          | Updated                                                                                   |
| ------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Page subtitle | Redacted and synthetic proof of constraints, decisions, tradeoffs, and outcomes. | Anonymized examples of past engagements: constraints, decisions, tradeoffs, and outcomes. |

### Services

| Location             | Current                                 | Updated                                        |
| -------------------- | --------------------------------------- | ---------------------------------------------- |
| Page framing overall | (copy is already relatively well-toned) | No structural changes needed; spot-check CTAs. |
| Section heading      | Boundaries that keep scope useful       | _(keep — this framing is already inviting)_    |

### About

No structural changes needed. The existing voice on this page is already collegial and clear.

### Sample Audit, Lab, Contact

No structural changes needed. These pages are functional and do not carry the "proof" framing problem.

## Functional Requirements

| ID    | Requirement                  | Acceptance criteria                                                                                         |
| ----- | ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| FR-01 | Hero positioning             | Title, specialization, core outcome, and CTA visible without scrolling on desktop and high-end mobile.      |
| FR-02 | Service cards                | Every service includes client pain, output, good-fit signals, and CTA.                                      |
| FR-03 | Case study template          | Includes context, constraints, problem, decision, tradeoffs, before/after, visuals, result, recommendation. |
| FR-04 | Interactive architecture map | Shows tangled vs explicit frontend states with static fallback.                                             |
| FR-05 | Technical lab                | At least four entries: RxJS cleanup, data/error modeling, Hash/Equal, cache semantics.                      |
| FR-06 | Sample audit                 | Angular audit report format viewable as page and later downloadable.                                        |
| FR-07 | Contact flow                 | Asks product, Angular version, team size, pain, diagnostic vs implementation, timeline, budget comfort.     |
| FR-08 | Responsive support           | Usable on mobile, tablet, laptop, desktop, and touch devices.                                               |
| FR-09 | Bilingual-ready              | Supports English-first and future Vietnamese variant.                                                       |
| FR-10 | Privacy-safe examples        | Case studies redact employer/client names and use synthetic or anonymized diagrams.                         |

> **FR-10 note:** Changed "Privacy-safe proof" → "Privacy-safe examples". The requirement is the same; the label no longer signals adversarial intent.

## Non-Functional Requirements

- Performance: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 mindset; Lighthouse Performance >= 90 on mobile for core pages.
- Accessibility: WCAG 2.2 AA baseline; contrast >= 4.5:1; focus states; keyboard navigation; semantic headings; alt text; skip link; reduced motion.
- Motion safety: all non-essential animations respect prefers-reduced-motion.
- Content maintainability: case studies, lab posts, and service copy are content-driven via MDX/schema.
- SEO/social: title, description, Open Graph image, canonical URL, useful structured data.
- Reliability: no blocking third-party scripts.
- Security: spam-protected contact flow and no frontend secrets.
- Maintainability: typed content schema, design tokens, component library, QA scripts.

## Award-Winning Characteristics To Include

1. **Immediate positioning:** hero states Angular Frontend Systems Engineer and the outcome — audit, refactor, stabilize complex Angular systems.
2. **Strong concept:** "frontend systems made explicit" through maps, flows, boundaries, risk markers, and before/after system diagrams.
3. **Editorial design:** typography, spacing, visual rhythm, and case study pages feel intentional.
4. **Purposeful motion:** scroll reveals, line drawing, state transitions, subtle parallax, all disabled/simplified under reduced motion.
5. **Technical signature:** interactive architecture map or RxJS flow explainer — not a generic 3D model.
6. **Demonstration over declaration:** case studies include problem, constraints, architecture decision, tradeoffs, implementation, result, next recommendation. The work speaks; the copy contextualizes.
7. **Fast and accessible craft:** Core Web Vitals, WCAG AA contrast, keyboard navigation, responsive layout, reduced motion.
8. **Clear conversion path:** CTA in hero, nav, services, and contact. CTAs are worded as offers, not commands.

> **Note on point 6:** "Proof over claims" has been reframed as "Demonstration over declaration." The intent is identical — show real work, don't just assert quality — but the language no longer implies the reader is a doubter who needs to be overruled.

## Recommended Tech Stack

| Layer         | Recommended tech                        | Reason                                                                                                 |
| ------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Framework     | Astro + TypeScript                      | Content-heavy, static, fast, MDX, selective interactive islands.                                       |
| Alternative   | Next.js + React                         | Good for R3F and React ecosystem, but more complexity than needed.                                     |
| Angular demos | Angular demo apps or embedded islands   | Show Angular strength through labs/case studies rather than forcing the marketing shell to be Angular. |
| Styling       | CSS variables + Tailwind or CSS modules | Design tokens and predictable responsive system.                                                       |
| Content       | MDX + typed content schema              | Easy case studies and lab notes.                                                                       |
| Animation     | CSS transitions + GSAP ScrollTrigger    | Controlled scroll storytelling.                                                                        |
| Optional 3D   | Three.js or React Three Fiber island    | Only for one signature architecture interaction.                                                       |
| Diagrams      | SVG / Mermaid / custom data-driven SVG  | Crisp, accessible, maintainable architecture visuals.                                                  |
| Code display  | Shiki or Expressive Code                | High-quality code snippets.                                                                            |
| Deployment    | Vercel, Netlify, Cloudflare Pages       | Static hosting and branch previews.                                                                    |
| QA            | Lighthouse CI, axe, Playwright          | Protect performance, accessibility, and critical flows.                                                |

## Launch Checklist

- Responsive from 360px to 1440px+.
- Core content readable without critical JavaScript.
- Lighthouse mobile target met for home/services/case/contact.
- Keyboard navigation complete.
- Reduced-motion mode works.
- Every case study has one clear business/engineering takeaway.
- Every service has good-fit and out-of-scope notes.
- Contact CTA is obvious and worded as an offer.
- No confidential employer/client content exposed.
- No instance of "proof" as a section heading, page subtitle, CTA label, or inline label anywhere on the live site.
