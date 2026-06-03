# Portfolio Design System & Interaction Direction - Award-Informed Update

Version 2.1 - June 2026

## Direction

> Calm technical premium.

The site should feel like a senior engineer opening the system map and walking through exactly where risk, flow, and ownership live. It should not feel like a generic neon developer landing page or a heavy 3D playground.

## Voice Direction

The portfolio's written tone is **inviting, not demanding**. The reader is a collaborator figuring out fit — not a skeptic to be convinced. Copy should guide, not gate.

| Avoid                         | Prefer                                          | Reason                                                                |
| ----------------------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| proof, prove                  | examples, past work, reference work, findings   | "Proof" implies the reader doubts you; "examples" opens a door.       |
| inspect                       | explore, see, take a look at                    | "Inspect" is clinical and directive; "explore" invites participation. |
| Case proof                    | Past work, How engagements go, Reference work   | "Proof" frames the reader as a judge.                                 |
| before the service list       | (remove gating language entirely)               | Telling visitors what order to read in feels presumptuous.            |
| Scope [noun] risk (as a CTA)  | Explore this, Talk through this, See an example | Action labels should feel like an offer, not a command.               |
| A report shape built around … | What a finding looks like, How findings arrive  | Describe the reader's experience, not the artifact's structure.       |
| Redacted and synthetic proof  | Anonymized examples, Reference engagements      | "Proof" on a page heading immediately sets an adversarial register.   |

**Rule of thumb:** if a section heading or CTA could appear on a government audit form, rewrite it. The site demonstrates competence through clarity and substance — it does not need to announce that demonstration.

## Brand Attributes

| Attribute     | Meaning                                       | Interface behavior                                              |
| ------------- | --------------------------------------------- | --------------------------------------------------------------- |
| Explicit      | Nothing important is hidden or vague.         | Clear headings, structure, diagrams, CTAs.                      |
| Architectural | The work is about systems and boundaries.     | Layered cards, grids, flow lines, module maps.                  |
| Precise       | Senior attention to detail.                   | Tight typography, consistent spacing, restrained animation.     |
| Practical     | Quality under constraints.                    | Case studies show tradeoffs, budget, timeline, team capacity.   |
| Memorable     | Enough signature interaction to stay in mind. | One interactive architecture map and subtle system-flow motion. |

## Core Visual Metaphor

Use frontend systems as the visual language: feature boundaries, stream paths, data states, risk hotspots, decisions, and stabilization.

- Hero motif: minimal animated system map.
- Before/after motif: messy scattered nodes become explicit bounded modules.
- Evidence motif: claims pair with diagrams, snippets, decision records, audit findings.
- Contact motif: scoped engineering diagnostic, not generic "message me".

## Color Tokens

| Token             | Light   | Dark    | Use                                      |
| ----------------- | ------- | ------- | ---------------------------------------- |
| --color-accent    | #E0478B | #E0478B | CTA, focus ring, selected diagram nodes. |
| --color-bg        | #FAFAFC | #0E0F14 | Main background.                         |
| --color-surface   | #FFFFFF | #171820 | Cards and panels.                        |
| --color-surface-2 | #F2F4F8 | #20222C | Code blocks and diagrams.                |
| --color-text      | #17171C | #F3F4F8 | Primary text.                            |
| --color-muted     | #5E606A | #A7AAB8 | Secondary text.                          |
| --color-border    | #D9DDE7 | #303442 | Borders and separators.                  |
| --color-success   | #237A57 | #6CE0A6 | Stable/positive states.                  |
| --color-warning   | #946200 | #FFD166 | Medium risk markers.                     |
| --color-danger    | #B42318 | #FF8A80 | Critical risk markers.                   |

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

| Component         | Purpose                                                     |
| ----------------- | ----------------------------------------------------------- |
| HeroSystemMap     | Signature visual that explains system boundaries.           |
| ServiceCard       | Turns services into concrete, legible offers.               |
| CredibilityStrip  | Fast scan of relevant experience signals. (was: ProofStrip) |
| CaseStudyCard     | Preview technical depth and how past engagements have gone. |
| EvidencePanel     | Diagrams, snippets, audit findings, metrics.                |
| BeforeAfterToggle | Shows architecture improvement.                             |
| DecisionRecord    | Shows senior engineering reasoning.                         |
| LabSnippet        | Technical writing preview.                                  |
| AuditFinding      | Sample audit finding.                                       |
| ContactIntake     | Pre-qualifies leads.                                        |

> **Note on `ProofStrip` → `CredibilityStrip`:** The component name is internal, but "proof" as a concept tends to leak into nearby copywriting. Naming it around the reader's experience (building confidence, scanning credibility) keeps writers from defaulting to adversarial framing in headlines and labels.

## Page-Level Specs

| Page              | Intent                                     | Blocks                                                                                     |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Home              | Immediate trust and memorable positioning. | Hero, credibility strip, services, selected case studies, map preview, lab preview, CTA.   |
| Services          | Turn skills into concrete offers.          | Offer comparison, deliverables, good-fit signals, out-of-scope notes, first step.          |
| Case Study Detail | Show how you think.                        | Problem, constraints, map, decisions, tradeoffs, snippets, result, next step.              |
| Technical Lab     | Public view of engineering thinking.       | Article/demo cards by Angular, RxJS, TypeScript, Architecture.                             |
| Sample Audit      | Make the audit format tangible.            | Severity list, findings, risk matrix, roadmap, sprint recommendation.                      |
| About             | Professional human context.                | Working style, constraints, quality philosophy, languages, availability.                   |
| Contact           | Connect with good-fit leads.               | Intake form, email/social, availability rules, notes on where the work is and isn't a fit. |

### Page copy guidance by location

**Home — section formerly titled "Case proof before the service list"**
Rename to: _"How past engagements have gone"_ or _"A look at past work"_. Remove any language that implies the visitor must read this section before proceeding.

**Home — section formerly titled "Inspect the architecture proof"**
Rename to: _"The architecture in context"_ or _"See the boundary work"_. The map section should invite exploration, not direct examination.

**Home — diagnostic panel CTA "Scope state risk"**
Replace with: _"Explore this"_ or _"Talk through this"_. Action labels are offers, not instructions.

**Home — section formerly titled "A report shape built around evidence and sequence"**
Rename to: _"What a finding looks like"_ or _"How findings are delivered"_. Focus on the reader's experience of the artifact, not its structural description.

**Home — delivery style label "Evidence first"**
Keep this — it reads as a working principle, not a demand. The surrounding copy is what needs softening.

**Case Studies index — page subtitle "Redacted and synthetic proof of constraints, decisions, tradeoffs, and outcomes"**
Replace with: _"Anonymized examples of past engagements: constraints, decisions, tradeoffs, and outcomes."_ The word "proof" here is the headline of the entire section — it sets the register for everything below it.

**Services page — exclusion block heading "Boundaries that keep scope useful"**
This heading is good — keep it. The framing of exclusions as something that protects the engagement (rather than rejecting the client) is already the right instinct.

## Motion System

- Entrance reveal: opacity + small Y movement, 400-650ms.
- Line drawing: SVG flow lines for system maps.
- State transition: messy architecture to explicit architecture.
- Micro-interactions: card/button/node response, scale <= 1.02.
- Page transition: optional subtle fade only.
- Pointer effect: optional desktop-only accent glow.

Reduced-motion mode must disable scroll scrubbing, line drawing, parallax, and morphing. Static diagrams or simple fades replace them.

## Signature Interaction: Explicit System Map

1. Initial state shows a tangled Angular frontend: large component, scattered services, implicit state, unhandled errors, no clear ownership.
2. Toggle/scroll groups the map into UI, feature boundary, data access, domain model, error model, cache, API.
3. Hover/focus/tap surfaces risk notes and the stabilizing technique applied.
4. "Show decisions" overlays ADR markers.
5. Static SVG fallback gives the same explanation without interaction.

## Do / Do Not

| Do                                                   | Do not                                                  |
| ---------------------------------------------------- | ------------------------------------------------------- |
| Use one strong technical metaphor.                   | Add unrelated 3D just because award sites use 3D.       |
| Use animation to explain flows.                      | Make people wait to read content.                       |
| Use case studies to show how the work goes.          | Use cards that only list tech logos.                    |
| Make contact and services obvious.                   | Hide navigation in experimental UI.                     |
| Keep dark mode readable.                             | Use low-contrast neon everywhere.                       |
| Tie code snippets to outcomes.                       | Flood pages with code.                                  |
| Design for touch and mobile.                         | Assume hover is enough.                                 |
| Write CTAs as offers ("Explore this", "Let's talk"). | Write CTAs as commands ("Scope risk", "Inspect proof"). |
| Let the work demonstrate quality quietly.            | Announce that you are proving something.                |

## Build Phases

1. V1 Foundation: static content, design tokens, home, services, contact, sample audit.
2. V1.5 Reference work: two case studies, two lab notes, basic system map.
3. V2 Signature: polished explicit system map and before/after toggles.
4. V3 Award polish: micro-interactions, motion refinement, submission assets.
