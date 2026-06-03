# Portfolio Design System — Deep Obsidian

Version 2.2 — June 2026 — LOCKED DIRECTION

---

## 1. Direction Statement

> Calm technical depth. A senior engineer who sees what others walk past — and makes it legible.

The site should feel like a considered, living application. Not a document. Not a brochure.
Every surface has intention. Every transition has weight. Nothing snaps.

---

## 2. Brand Voice (Locked)

The tone is that of a trusted senior engineer thinking out loud with a peer —
not a consultant pitching a service. Confident without performing confidence.

**Four rules that apply to every piece of copy:**

1. Let the work speak. Don't announce that you're demonstrating quality.
2. CTAs are offers, not commands. "Explore this" not "Inspect proof."
3. Describe the reader's experience, not the artifact's structure.
4. One opinion per page. The site should have a point of view, not just information.

---

## 3. Hero Copy (Rewritten)

### Headline

```
Complex systems,
made explicit.
```

_"made explicit" renders in Fraunces italic — this is the only Fraunces italic in the site._

### Subheading

```
Architecture audits, refactors, and stabilization for Angular teams
dealing with state that drifted, boundaries that blurred,
and code that became expensive to change.
```

### Supporting line (below subhead, smaller, muted)

```
I don't just identify what's wrong. I show you exactly where,
why it got there, and what a better path looks like.
```

### CTAs

- Primary: `Start a diagnostic →`
- Secondary: `See past work`

### Rationale

The original line (_"I make complex frontend systems explicit, safer, and easier to evolve"_)
is accurate but passive. It describes an outcome. The rewrite describes a _situation the
reader is already in_ and positions you as the person who resolves it. "Expensive to change"
is the phrase technical leads feel viscerally. The supporting line introduces the personality:
someone who doesn't just audit, but reasons through it with you.

---

## 4. Page-Level Content Direction

### Home

The home page has one job: make a technical lead feel _this person understands my problem_
within 8 seconds, then give them a clear next action.

**Sequence:**

1. Hero — positioning + CTA
2. Credibility strip — 3 signals, horizontal, no prose
3. Diagnostic panel — interactive pain selector (the conversion engine)
4. Past work — 2 case study cards, no more
5. System map — the signature visual moment
6. Lab preview — 2 entries max, with a "More in the lab →" link
7. Footer CTA — single line + button

**What to cut from the current home:**

- The "Delivery style / Evidence first" feature row — it's telling not showing.
  Replace it by _being_ evidence-first in the case studies and map.
- Any section that describes the methodology in prose before demonstrating it visually.

### Services

Each service card must answer three questions in order:

1. What situation does this serve? (the pain, in the client's language)
2. What do you walk away with? (concrete output, not a process description)
3. Is this you? (a 2-line good-fit signal and a 1-line out-of-scope note)

No nested lists. No methodology prose. The card is a decision surface, not a brochure.

### Case Studies

The editorial voice on case study pages should feel like a postmortem written by
someone who cares — not a portfolio piece written to impress. Use first-person sparingly
but deliberately. "The boundary wasn't unclear — it was never drawn." is better than
"This engagement involved unclear boundaries."

Each case study must have exactly one sentence that contains a genuine opinion.

### Lab

The lab is where your intellectual character lives. Each entry needs:

- A claim in the title, not a topic. "Cache semantics before cache helpers" not "Caching in Angular."
- One paragraph that earns the claim before expanding on it.
- Optional: a code snippet or diagram that makes the abstract concrete.

The lab intro (currently missing) should read:

```
Notes from the work. Things worth writing down because they're
not obvious until you've seen the failure mode they prevent.
```

### About

Currently the weakest page. It needs one thing it doesn't have: **a stated philosophy**.
Not working style bullets. A paragraph that says something only you would say.

Suggested structure:

1. One philosophy paragraph — your actual belief about what good frontend work is
2. How you work — 3 short paragraphs, not bullets
3. What you won't do — honest, specific, respectful
4. Where you're based + availability

Draft philosophy paragraph (to be personalised):

```
Most frontend problems aren't framework problems. They're boundary problems —
places where ownership was never declared, where the next person had to guess,
where "it works" became the only definition of done. I'm interested in the work
that makes those boundaries visible before they become expensive.
```

### Contact

The intake form is the right instinct. The framing needs one small addition —
a sentence above the form that sets the register:

```
This isn't a contact form. It's a short diagnostic so the first conversation
can start somewhere useful.
```

---

## 5. Color Tokens (Locked)

### Dark Mode

| Token                   | Value                    | Usage                                    |
| ----------------------- | ------------------------ | ---------------------------------------- |
| `--color-bg`            | `#0C0D10`                | Page background                          |
| `--color-surface`       | `#13141A`                | Cards, panels, nav background            |
| `--color-surface-2`     | `#1A1B23`                | Code blocks, nested panels, hover states |
| `--color-surface-3`     | `#20222C`                | Active states, selected items            |
| `--color-border`        | `rgba(255,255,255,0.07)` | All borders and dividers                 |
| `--color-border-accent` | `rgba(123,156,255,0.25)` | Focused/active borders                   |
| `--color-text`          | `#E8E6E0`                | Primary text                             |
| `--color-muted`         | `#6B6D7A`                | Secondary text, captions, metadata       |
| `--color-muted-2`       | `#4A4C58`                | Placeholder text, disabled states        |
| `--color-accent`        | `#7B9CFF`                | CTAs, focus rings, active nodes, links   |
| `--color-accent-dim`    | `rgba(123,156,255,0.12)` | Badge backgrounds, subtle highlights     |
| `--color-accent-glow`   | `rgba(123,156,255,0.06)` | Radial glow behind hero, map center      |
| `--color-violet`        | `#A78BFA`                | Hover state on accent elements           |
| `--color-success`       | `#4ADE80`                | Stable/resolved states                   |
| `--color-warning`       | `#FFC850`                | Medium severity markers                  |
| `--color-danger`        | `#FF6B6B`                | Critical severity markers                |
| `--color-danger-dim`    | `rgba(255,107,107,0.12)` | Critical badge backgrounds               |

### Light Mode

| Token                   | Value                   | Notes                                                |
| ----------------------- | ----------------------- | ---------------------------------------------------- |
| `--color-bg`            | `#F4F5FA`               | Cool white — not pure white, slightly blue-tinted    |
| `--color-surface`       | `#FFFFFF`               | Cards and panels                                     |
| `--color-surface-2`     | `#ECEEF6`               | Code blocks, nested panels                           |
| `--color-surface-3`     | `#E2E4F0`               | Active states                                        |
| `--color-border`        | `rgba(0,0,0,0.08)`      | All borders                                          |
| `--color-border-accent` | `rgba(74,111,232,0.25)` | Focused/active borders                               |
| `--color-text`          | `#12131A`               | Primary text                                         |
| `--color-muted`         | `#5A5D6E`               | Secondary text                                       |
| `--color-muted-2`       | `#8A8D9E`               | Placeholder, disabled                                |
| `--color-accent`        | `#4A6FE8`               | Darker, more saturated — maintains contrast on light |
| `--color-accent-dim`    | `rgba(74,111,232,0.08)` | Badge backgrounds                                    |
| `--color-accent-glow`   | `rgba(74,111,232,0.04)` | Subtle highlights                                    |
| `--color-violet`        | `#6D4FE8`               | Hover on accent                                      |

**Implementation note:** `--color-accent` is not a single fixed value.
It shifts between modes via `[data-theme="dark"]` and `[data-theme="light"]`
on the root element. Never flatten it to one value with opacity tricks —
the contrast requirements are different on each surface.

---

## 6. Typography (Locked)

### Font Stack

| Role          | Family        | Weights Used    | Fallback              |
| ------------- | ------------- | --------------- | --------------------- |
| Display       | Fraunces      | 300, 300 italic | Georgia, serif        |
| Headings      | Epilogue      | 700, 800        | system-ui, sans-serif |
| Body          | Epilogue      | 300, 400        | system-ui, sans-serif |
| Code + labels | IBM Plex Mono | 400, 500        | monospace             |

### Usage Rules

- **Fraunces is used exactly twice on the entire site:**
  1. The h1 hero headline (`font-weight: 300`)
  2. The site logo/wordmark in the nav (`font-weight: 300`)
     The italic variant appears only in the hero line "made explicit." — nowhere else.
- **Epilogue handles all other headings (h2–h4), body text, UI labels, and navigation.**
- **IBM Plex Mono handles:** badge labels, severity tags, section eyebrows,
  code snippets, the monospace accent on the system map node labels.

### Type Scale

| Step        | Size (desktop)             | Size (mobile)             | Weight  | Family        | Usage                            |
| ----------- | -------------------------- | ------------------------- | ------- | ------------- | -------------------------------- |
| `--t-hero`  | `clamp(44px, 5.5vw, 72px)` | `clamp(36px, 10vw, 48px)` | 300     | Fraunces      | H1 hero only                     |
| `--t-h2`    | `32px`                     | `26px`                    | 800     | Epilogue      | Section headings                 |
| `--t-h3`    | `22px`                     | `19px`                    | 700     | Epilogue      | Card titles, sub-sections        |
| `--t-h4`    | `16px`                     | `15px`                    | 700     | Epilogue      | Labels, panel headings           |
| `--t-body`  | `15px`                     | `15px`                    | 400     | Epilogue      | Prose, descriptions              |
| `--t-small` | `13px`                     | `13px`                    | 300–400 | Epilogue      | Secondary descriptions, captions |
| `--t-mono`  | `11px`                     | `10px`                    | 400–500 | IBM Plex Mono | Badges, tags, eyebrows           |
| `--t-code`  | `13px`                     | `12px`                    | 400     | IBM Plex Mono | Code blocks                      |

### Spacing & Measure

- Line height body: `1.65`
- Line height headings: `1.1–1.15`
- Prose measure: `62–72ch` — never let body text run full-width
- Letter spacing hero: `-0.02em`
- Letter spacing h2–h3: `-0.025em`
- Letter spacing mono labels: `0.12–0.18em` uppercase

---

## 7. Motion System (Locked)

### Philosophy

Motion follows the **Craft/Notion principle**: fluid, slightly playful, never abrupt.
Nothing snaps into place. Nothing waits to be noticed. Motion explains — it doesn't decorate.

The test for any animation: _does removing it make the interface harder to understand,
or just less satisfying?_ If the answer is "just less satisfying," the animation must
still be tasteful enough to earn its place.

### Easing Tokens

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1); /* primary — most entrances */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1); /* state changes, toggles */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* interactive responses — slight overshoot */
--ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1); /* exits, fades */
```

**`--ease-spring` is the personality of the site.** It gives interactive elements
the "slightly playful" quality — a button tap bounces 2–3% past its target before settling.
A card hover lifts with a tiny overshoot. A selected diagnostic option settles into its
active state rather than cutting to it. Used sparingly and consistently, this is what
makes the site feel like an app rather than a document.

### Duration Scale

```css
--duration-instant: 80ms; /* hover color changes, focus rings */
--duration-fast: 180ms; /* button states, badge transitions */
--duration-base: 320ms; /* card entrances, panel reveals */
--duration-slow: 520ms; /* page-level reveals, map transitions */
--duration-crawl: 800ms; /* hero entrance, first-load sequence */
```

### Entrance Animations

**Scroll reveal (default for all sections below the hero):**

```css
/* Initial state */
opacity: 0;
transform: translateY(18px);

/* Revealed state */
opacity: 1;
transform: translateY(0);
transition:
  opacity var(--duration-base) var(--ease-out-expo),
  transform var(--duration-base) var(--ease-out-expo);
```

Stagger sibling elements by `60ms`. Never stagger more than 4 items in a sequence —
after 4, the stagger becomes a wait.

**Hero entrance (first load only, not on route change):**

```
1. Eyebrow fades in         — 0ms delay,   --duration-base
2. H1 slides up + fades in  — 80ms delay,  --duration-crawl
3. Subhead fades in         — 200ms delay, --duration-slow
4. Supporting line fades in — 320ms delay, --duration-base
5. CTAs slide up + fade in  — 420ms delay, --duration-base, --ease-spring
6. Hero glow pulses softly  — 600ms delay, infinite, 4s period
```

**Page transitions (route changes):**

- Outgoing page: `opacity 0` over `--duration-fast`, `--ease-gentle`
- Incoming page: `opacity 1` + `translateY(-8px → 0)` over `--duration-base`, `--ease-out-expo`
- No sliding panels. No scale transforms. Clean and fast.

### Interactive Element Behaviour

**Buttons (primary + ghost):**

```
Hover:  translateY(-2px), 180ms, --ease-spring
        box-shadow lifts gently
Active: translateY(0px), scale(0.98), 80ms, --ease-gentle
Focus:  2px solid --color-accent ring, 2px offset, instant
```

**Cards:**

```
Hover:  translateY(-3px), border-color → --color-border-accent
        180ms, --ease-spring
        subtle box-shadow lift
Active: translateY(-1px), 80ms
```

**Diagnostic pain selector options:**

```
Idle:    border: --color-border, background: transparent
Hover:   border: --color-border-accent (dim), background: --color-surface-2
         150ms, --ease-out-expo
Selected: border: --color-accent, background: --color-accent-dim
          220ms, --ease-spring
          Left accent bar slides in from left: scaleX(0 → 1), --ease-spring
```

**Recommended path panel update (when selection changes):**

```
Old content: opacity 1 → 0, translateY(0 → -6px), 150ms, --ease-gentle
New content: opacity 0 → 1, translateY(8px → 0), 220ms, --ease-out-expo
             100ms delay after old content exits
```

Mobile: scroll the panel into view smoothly after the content updates.
`element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })`

**Nav links:**

```
Hover:   color → --color-text, 120ms, --ease-gentle
Active:  color → --color-accent, bottom border 2px --color-accent
         Border animates: scaleX(0 → 1) from left, 200ms, --ease-spring
```

**Badge hover:**

```
Hover: scale(1.04), 120ms, --ease-spring
       background brightens slightly
```

**Theme toggle (dark/light):**

```
Icon rotates 180°, 300ms, --ease-in-out-quart
Page background crossfades, 400ms, --ease-gentle
All color tokens transition simultaneously via CSS transition on :root
```

### SVG / Diagram Motion

**System map line drawing:**

```
stroke-dashoffset animation: path length → 0
Duration: --duration-slow per line, staggered by 80ms per connection
Easing: --ease-out-expo
Trigger: IntersectionObserver at 30% visibility
```

**Map node entrance:**

```
scale(0.7) + opacity(0) → scale(1) + opacity(1)
Duration: --duration-base
Easing: --ease-spring (gives nodes a slight "pop" into existence)
Stagger: 40ms per node
```

**Node tap/click (mobile + desktop):**

```
Tapped node:    scale(1 → 1.08 → 1), 300ms, --ease-spring
                border-color → --color-accent
                glow ring appears: box-shadow 0 0 0 4px --color-accent-dim
Info panel:     slides up from bottom (mobile) or fades in adjacent (desktop)
                translateY(12px → 0) + opacity(0 → 1), --duration-base, --ease-out-expo
```

### Reduced Motion

When `prefers-reduced-motion: reduce` is set:

- All `transform` animations: disabled. Elements appear in final position.
- All `opacity` animations: retained at 50% of original duration.
- SVG line drawing: replaced with static diagram (all paths visible immediately).
- Map node entrance: fade only, no scale.
- Spring easing: replaced with `--ease-gentle` on all interactive elements.
- Hero entrance sequence: collapsed to a single `opacity 0 → 1` at `--duration-base`.
- Scroll-triggered reveals: disabled. All content visible at paint.

**Never disable focus rings or active states under reduced motion.**

---

## 8. Signature Interaction — System Map (Mobile-First Rebuild)

### Problem with current implementation

The map assumes hover. On mobile: no affordance, labels too small, toggle has no active
state, no scroll feedback on interaction. The accessible text fallback reads as an
afterthought rather than the primary content.

### Rebuilt Interaction Model

**Desktop (hover + click):**

- Nodes are visually distinct: labelled circles/rectangles with risk indicators
- Hover: node lifts (spring), tooltip appears adjacent with risk/decision note
- Click: node enters "selected" state, info panel updates with full detail
- "Show decisions" toggle: ADR markers overlay the map
- Messy/Bounded toggle: morphs the layout with SVG path animation

**Mobile (tap to explore — proper touch version):**

The mobile map is a **separate, purpose-built layout** — not a scaled-down desktop map.

```
Layout:
┌─────────────────────────────┐
│  [Messy]  [Bounded]         │  ← Toggle, full-width, pill style
│                             │
│     ┌──────────────────┐    │
│     │   SVG map        │    │  ← Simplified node layout, larger tap targets
│     │   (touch-ready)  │    │    Min tap target: 44×44px per WCAG
│     └──────────────────┘    │
│                             │
│  ┌──────────────────────┐   │  ← Info drawer, slides up on node tap
│  │ [Node name]          │   │    Persists until another node tapped or dismissed
│  │ Risk: [description]  │   │
│  │ Technique: [...]     │   │
│  │              [×]     │   │
│  └──────────────────────┘   │
└─────────────────────────────┘
```

**Mobile tap behaviour:**

1. First visit: a subtle animated pulse on one node after 1.5s delay —
   signals "these are tappable" without an instruction label.
2. Tap a node: node enters selected state (spring scale + accent ring),
   info drawer slides up from bottom of map container.
3. Tap another node: drawer content crossfades, selected state transfers.
4. Tap outside / dismiss [×]: drawer slides down, node deselects.
5. Toggle Messy/Bounded: nodes animate to new positions (translate, not cut),
   connections redraw, drawer closes if open.

**Node tap targets on mobile:**
Increase the invisible touch area beyond the visual element using CSS padding
or an invisible overlay element. Visual size can be smaller than 44px;
the touch area must not be.

**The info drawer on mobile is the accessible text content, designed.**
It's not a fallback — it's the primary way to read the map on mobile.
Every node's risk note and stabilizing technique lives here, in full prose,
with the same visual treatment as a card component.

### Static fallback (reduced motion + no JS):

A single SVG showing the Bounded state with all labels visible,
risk indicators colour-coded, and a legend. No interaction, no toggle.
Looks like a diagram from a well-produced engineering document.

---

## 9. Component Inventory (Updated)

| Component           | Font roles                            | Key motion                               |
| ------------------- | ------------------------------------- | ---------------------------------------- |
| `HeroBlock`         | Fraunces h1, Epilogue sub+body        | Entrance sequence, glow pulse            |
| `CredibilityStrip`  | IBM Plex Mono label, Epilogue value   | Scroll reveal, stagger 3 items           |
| `ServiceCard`       | Epilogue h3 + body                    | Card hover lift, spring                  |
| `DiagnosticPanel`   | Epilogue body, IBM Plex Mono tags     | Option select spring, panel crossfade    |
| `CaseStudyCard`     | Epilogue h3 + body                    | Card hover lift, image parallax (subtle) |
| `SystemMap`         | IBM Plex Mono node labels             | Line draw, node spring entrance + tap    |
| `EvidencePanel`     | Epilogue body, IBM Plex Mono tags     | Scroll reveal                            |
| `BeforeAfterToggle` | Epilogue label                        | SVG morph, --ease-in-out-quart           |
| `LabEntry`          | Epilogue h3 + body                    | Scroll reveal, hover lift                |
| `AuditFinding`      | IBM Plex Mono severity, Epilogue body | Scroll reveal, badge hover scale         |
| `ContactIntake`     | Epilogue labels + body                | Field focus ring spring, submit pulse    |
| `NavBar`            | Fraunces logo, Epilogue links         | Active border scale, theme toggle spin   |

---

## 10. Build Phase Update

| Phase             | Scope                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------- |
| **V1 Foundation** | Design tokens, font loading, dark/light switch, home skeleton, services, contact        |
| **V1.5 Content**  | Two case studies, lab with 4 entries + intro, sample audit stepper fixed, about rewrite |
| **V2 Signature**  | System map desktop (full interaction), mobile map (tap rebuild), before/after toggles   |
| **V2.5 Motion**   | Full motion pass — entrance sequences, spring interactions, page transitions, hero glow |
| **V3 Polish**     | Reduced motion audit, Lighthouse pass, accessibility audit, award submission assets     |

---

## 11. Launch Gate

The following must all be true before the site is considered shippable:

- [ ] No instance of "proof" as a heading, CTA, label, or page subtitle
- [ ] Hero rewrite live (`Complex systems, made explicit.`)
- [ ] About page has a philosophy paragraph, not just working-style bullets
- [ ] Lab has an intro paragraph
- [ ] Contact form has a framing sentence above it
- [ ] System map mobile: tap targets ≥ 44px, info drawer works, pulse hint on first visit
- [ ] Diagnostic panel: scroll-into-view on mobile after selection
- [ ] Case study CTA: no template strings rendering literally
- [ ] Nav: active state visible on all pages
- [ ] All `--ease-spring` interactions feel settled, not bouncy — QA on real devices
- [ ] `prefers-reduced-motion` tested and confirmed working
- [ ] Lighthouse mobile ≥ 90 on home, services, contact
- [ ] Both dark and light mode: every surface readable, every accent contrast-compliant
