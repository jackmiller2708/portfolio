# Portfolio Design System & Interaction Direction - Award-Informed Update

Version 2.0 - June 2026

## Direction

> Calm technical premium.

The site should feel like a senior engineer opening the system map and showing exactly where risk, flow, and ownership live. It should not feel like a generic neon developer landing page or a heavy 3D playground.

## Brand Attributes

| Attribute | Meaning | Interface behavior |
|---|---|---|
| Explicit | Nothing important is hidden or vague. | Clear headings, structure, diagrams, CTAs. |
| Architectural | The work is about systems and boundaries. | Layered cards, grids, flow lines, module maps. |
| Precise | Senior attention to detail. | Tight typography, consistent spacing, restrained animation. |
| Practical | Quality under constraints. | Case studies show tradeoffs, budget, timeline, team capacity. |
| Memorable | Enough signature interaction to stay in mind. | One interactive architecture map and subtle system-flow motion. |

## Core Visual Metaphor

Use frontend systems as the visual language: feature boundaries, stream paths, data states, risk hotspots, decisions, and stabilization.

- Hero motif: minimal animated system map.
- Before/after motif: messy scattered nodes become explicit bounded modules.
- Evidence motif: claims pair with diagrams, snippets, decision records, audit findings.
- Contact motif: scoped engineering diagnostic, not generic “message me”.

## Color Tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| --color-accent | #E0478B | #E0478B | CTA, focus ring, selected diagram nodes. |
| --color-bg | #FAFAFC | #0E0F14 | Main background. |
| --color-surface | #FFFFFF | #171820 | Cards and panels. |
| --color-surface-2 | #F2F4F8 | #20222C | Code blocks and diagrams. |
| --color-text | #17171C | #F3F4F8 | Primary text. |
| --color-muted | #5E606A | #A7AAB8 | Secondary text. |
| --color-border | #D9DDE7 | #303442 | Borders and separators. |
| --color-success | #237A57 | #6CE0A6 | Stable/positive states. |
| --color-warning | #946200 | #FFD166 | Medium risk markers. |
| --color-danger | #B42318 | #FF8A80 | Critical risk markers. |

## Typography

- Display: Space Grotesk, Satoshi, Inter Tight, or similar.
- Body: Inter, IBM Plex Sans, or system sans.
- Code: JetBrains Mono or IBM Plex Mono.
- Hero: 44-72px desktop, 34-44px mobile.
- Body: 16-18px with 1.55-1.7 line height.
- Prose measure: 65-78 characters.

## Layout System

- 12-column grid on desktop, max width 1180-1280px.
- Single column mobile, 20-24px side padding.
- Hero: copy + system map on desktop; copy first on mobile.
- Case studies: editorial summary rail + content + evidence panels; one-column on mobile.
- Contact: intake form + availability/constraints.

## Component System

| Component | Purpose |
|---|---|
| HeroSystemMap | Signature visual that explains system boundaries. |
| ServiceCard | Turns services into buyable offers. |
| ProofStrip | Fast credibility scan. |
| CaseStudyCard | Preview technical depth. |
| EvidencePanel | Diagrams, snippets, audit findings, metrics. |
| BeforeAfterToggle | Shows architecture improvement. |
| DecisionRecord | Shows senior engineering reasoning. |
| LabSnippet | Technical writing preview. |
| AuditFinding | Sample audit evidence. |
| ContactIntake | Pre-qualifies leads. |

## Motion System

- Entrance reveal: opacity + small Y movement, 400-650ms.
- Line drawing: SVG flow lines for system maps.
- State transition: messy architecture to explicit architecture.
- Micro-interactions: card/button/node response, scale <= 1.02.
- Page transition: optional subtle fade only.
- Pointer effect: optional desktop-only accent glow.

Reduced-motion mode must disable scroll scrubbing, line drawing, parallax, and morphing. Static diagrams or simple fades replace them.

## Page-Level Specs

| Page | Intent | Blocks |
|---|---|---|
| Home | Immediate trust and memorable positioning. | Hero, proof strip, services, selected case studies, map preview, lab preview, CTA. |
| Services | Turn skills into offers. | Offer comparison, deliverables, best fit, exclusions, first step. |
| Case Study Detail | Show how you think. | Problem, constraints, map, decisions, tradeoffs, snippets, result, next step. |
| Technical Lab | Public proof of thinking. | Article/demo cards by Angular, RxJS, TypeScript, Architecture. |
| Sample Audit | Make audit tangible. | Severity list, findings, risk matrix, roadmap, sprint recommendation. |
| About | Professional human context. | Working style, constraints, quality philosophy, languages, availability. |
| Contact | Convert good-fit leads. | Intake form, email/social, availability rules, non-fit criteria. |

## Signature Interaction: Explicit System Map

1. Initial state shows messy Angular frontend: large component, scattered services, implicit state, unhandled errors, unknown ownership.
2. Toggle/scroll groups the map into UI, feature boundary, data access, domain model, error model, cache, API.
3. Hover/focus/tap reveals risk and stabilizing technique.
4. “Show decisions” overlays ADR markers.
5. Static SVG fallback gives the same explanation.

## Do / Do Not

| Do | Do not |
|---|---|
| Use one strong technical metaphor. | Add unrelated 3D just because award sites use 3D. |
| Use animation to explain flows. | Make people wait to read content. |
| Use case studies as proof. | Use cards that only list tech logos. |
| Make contact and services obvious. | Hide navigation in experimental UI. |
| Keep dark mode readable. | Use low-contrast neon everywhere. |
| Tie code snippets to outcomes. | Flood pages with code. |
| Design for touch and mobile. | Assume hover is enough. |

## Build Phases

1. V1 Foundation: static content, design tokens, home, services, contact, sample audit.
2. V1.5 Proof: two case studies, two lab notes, basic system map.
3. V2 Signature: polished explicit system map and before/after toggles.
4. V3 Award polish: micro-interactions, motion refinement, submission assets.
