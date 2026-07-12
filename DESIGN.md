---
name: Nguyen Ngoc Huy / Jack Miller Portfolio
description: A restrained technical portfolio where simple surfaces reveal deep frontend systems craft through precise interaction.
colors:
  diagnostic-blue: "#3f63d7"
  diagnostic-blue-dark: "#7b9cff"
  deep-obsidian: "#0c0d10"
  obsidian-surface: "#13141a"
  obsidian-panel: "#1a1b23"
  obsidian-rail: "#20222c"
  obsidian-text: "#e8e6e0"
  cool-paper: "#f4f5fa"
  paper-surface: "#ffffff"
  paper-panel: "#eceef6"
  paper-rail: "#e2e4f0"
  ink: "#12131a"
  muted-ink: "#5a5d6e"
  faint-ink: "#8a8d9e"
  technical-violet: "#6d4fe8"
  stable-green: "#237a57"
  warning-amber: "#946200"
  risk-red: "#b42318"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "3rem / 4.5rem"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "0"
  headline:
    fontFamily: "Epilogue, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "0"
  title:
    fontFamily: "Epilogue, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0"
  body:
    fontFamily: "Epilogue, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
rounded:
  control: "calc(1px + 0.5rem)"
  panel: "calc(1px + 0.5rem + 0.75rem)"
  pill: "999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "3rem"
  section-wide: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.diagnostic-blue}"
    textColor: "{colors.paper-surface}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1rem"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1rem"
    height: "44px"
  panel:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "1.5rem"
  input:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.75rem"
---

# Design System: Nguyen Ngoc Huy / Jack Miller Portfolio

## 1. Overview

**Creative North Star: "The Living Diagnostic"**

The system should feel like a diagnostic instrument that happens to be a portfolio: quiet in its shell, exact in its feedback, and visibly technical once touched. It is not trying to impress through volume. It earns attention through precise state changes, clear hierarchy, bilingual content discipline, and the sense that every component has an explicit contract.

The visual register is restrained and technical, with a light/dark token system, one decisive blue accent, flat panels, tight radii, and motion as the proof layer. The product claim says the interface may look simple at a glance, but the details should reveal technical depth. That means hover, focus, selected, page, and system-map transitions must feel deliberate enough to show craft without delaying reading.

This system rejects generic agency/studio branding, broad "frontend developer" positioning, static brochure polish, and any shallow UI that looks simple because there is no deeper system underneath. Simplicity is allowed. Shallow simplicity is not.

**Key Characteristics:**
- Restrained first impression, assertive interaction response.
- Cool neutral surfaces with one diagnostic accent.
- Typography that separates human explanation from technical labels.
- Depth through tonal layering, focus rings, and state motion rather than heavy shadows.
- Named-person credibility: the system must keep Nguyen Ngoc Huy / Jack visible.

## 2. Colors

The palette is cool, clinical, and deliberately narrow: a paper/obsidian surface system, one blue diagnostic accent, and semantic status colors for audit evidence.

### Primary

- **Diagnostic Blue**: The primary action, focus, selected-node, and proof-navigation color. Use it sparingly enough that it continues to feel like a signal, not decoration.
- **Diagnostic Blue Dark**: The dark-mode equivalent for active states and system-map highlights. It should feel luminous against Deep Obsidian, never neon.

### Secondary

- **Technical Violet**: A supporting accent for hover nuance and secondary emphasis. Use it as a small counterpoint only; it must not become a purple-blue gradient theme.

### Tertiary

- **Stable Green**: Resolved, stable, decision, or positive system states.
- **Warning Amber**: Medium-risk markers and caution states.
- **Risk Red**: Critical findings, risk badges, validation errors, and audit severity.

### Neutral

- **Deep Obsidian**: Dark-mode page background and the most technical atmosphere of the brand.
- **Obsidian Surface / Obsidian Panel / Obsidian Rail**: Dark-mode layering for cards, nested panels, and active or diagram surfaces.
- **Obsidian Text**: Primary text in dark mode.
- **Cool Paper**: Light-mode page background. It is blue-tinted, not cream, beige, or warm paper.
- **Paper Surface / Paper Panel / Paper Rail**: Light-mode card, nested panel, and active-state surfaces.
- **Ink / Muted Ink / Faint Ink**: Primary, secondary, and disabled or placeholder text in light mode.

### Named Rules

**The One Signal Rule.** Blue is the diagnostic signal. It belongs on CTAs, focus rings, active nodes, and selected states; it does not wash whole sections unless the section is explicitly about state.

**The No Warm Neutral Rule.** Do not drift into cream, sand, beige, parchment, or warm editorial paper. This portfolio is cool, technical, and controlled.

**The Status Means Status Rule.** Green, amber, and red are semantic. Never use them as decorative palette expansion.

## 3. Typography

**Display Font:** Fraunces, with Georgia as the conceptual fallback.
**Body Font:** Epilogue, with system-ui and sans-serif fallbacks.
**Label/Mono Font:** JetBrains Mono, with monospace fallback.

**Character:** Fraunces appears as a controlled display moment, not a whole editorial costume. Epilogue carries the working voice: precise, readable, and quietly mechanical. JetBrains Mono labels technical metadata, but it must never become lazy shorthand for "developer."

### Hierarchy

- **Display** (300, `3rem` to `4.5rem`, `1.05`): Hero-only positioning and the rare expressive moment. Use italic only where the phrase needs human tension.
- **Headline** (800, `2rem`, `1.12`): Section headings, page headings when the hero is not display-led, and strong scan points.
- **Title** (700, `1.375rem`, `1.15`): Card titles, panel titles, service names, finding names.
- **Body** (400, `0.95rem`, `1.6`): Primary prose, descriptions, form text, and page copy. Keep long prose around 65-75ch.
- **Label** (500, `0.75rem`, `1.4`): Badges, metadata, diagnostic labels, and compact technical markers. Uppercase is permitted for short labels only.

### Named Rules

**The One Display Moment Rule.** Fraunces is a controlled signal, not the page texture. If every section starts to feel editorial, the typography has escaped its role.

**The No Costume Mono Rule.** JetBrains Mono labels systems and metadata. It must not be used as a blanket developer aesthetic.

## 4. Elevation

This system is flat by default and layered by tone. Depth comes from surface contrast, borders, focus rings, active-state fills, and precise motion. Shadows are allowed only as interaction evidence: a lifted button, an active diagram node, or a temporary focus glow. Resting cards should not float.

### Shadow Vocabulary

- **Accent Lift** (`0 8px 24px color-mix(in srgb, var(--color-accent) 12%, transparent)`): Button hover only. It should feel like the action waking up, not like a card shadow.
- **Focus Glow** (`0 0 0 4px var(--color-accent-dim)`): Active diagram nodes and selected proof controls.

### Named Rules

**The Flat Until Touched Rule.** Panels rest on borders and tonal layering. Elevation appears only in response to interaction or selection.

**The No Ghost Card Rule.** Do not pair broad decorative shadows with 1px bordered cards. Pick tonal layering and border clarity first.

## 5. Components

### Buttons

Buttons are compact, confident controls with a visible minimum target size and a technical lift on hover.

- **Shape:** Tight control radius (`calc(1px + 0.5rem)`), never oversized rounded cards.
- **Primary:** Diagnostic Blue background, white text, 44px minimum height, `0.5rem 1rem` padding, 700 weight.
- **Hover / Focus:** Border shifts to the accent, hover lifts `translateY(-2px)`, and focus uses a 2px Diagnostic Blue outline with 3px offset.
- **Secondary:** Paper Surface background, Ink text, same dimensions, same state rhythm.

### Chips

Chips and badges are semantic markers. Risk and decision tags use status colors with low-chroma fills and tight radius.

- **Style:** Small mono labels or bold body labels, `var(--radius-1)`, tokenized status fills.
- **State:** Selected chips use border and background contrast; never rely on layout movement to indicate selection.

### Cards / Containers

Cards are decision surfaces, not decorative blocks.

- **Corner Style:** Panel radius (`calc(1px + 0.5rem + 0.75rem)`).
- **Background:** Paper Surface or Obsidian Surface; nested areas use Paper Panel or Obsidian Panel.
- **Shadow Strategy:** Flat at rest. Hover may move `-2px` or `-3px` when the component is an interactive choice, and must disable transform under reduced motion.
- **Border:** Always tokenized, usually `1px solid var(--color-border)`.
- **Internal Padding:** Usually `1.5rem`; dense proof panels may use `1rem`.

### Inputs / Fields

Inputs should feel like system fields, not marketing form decoration.

- **Style:** Paper Surface background, Ink text, tokenized 1px border, control radius, `0.75rem` padding.
- **Focus:** Border shifts to Diagnostic Blue and the global focus-visible outline remains available.
- **Error / Disabled:** Risk Red for errors, Faint Ink for disabled or placeholder copy. Placeholder contrast must remain readable.

### Navigation

Navigation is sticky, compact, and utility-minded. The brand name and role carry identity; links stay quiet until hover or active state.

Use a translucent tokenized background, 1px bottom border, and blur only as a functional sticky-header treatment. Active links should be clear by text or border state, not by color flooding.

### System Map

The system map is the signature component. It is the visual proof that the site can make messy architecture explicit.

Use diagram surfaces, node buttons, canvas lines, and detail drawers to show state transition. Reduced motion must replace the live stage with the static fallback. Selected nodes use Diagnostic Blue borders and a focus glow; risk and decision states use semantic badges.

## 6. Do's and Don'ts

### Do:

- **Do** preserve the "quiet at rest, assertive in state changes" component feel.
- **Do** use Diagnostic Blue for CTAs, selected states, focus rings, and active architecture nodes.
- **Do** keep light mode cool and paper-like without becoming cream, beige, or editorial.
- **Do** use motion to explain state, flow, and technical behavior.
- **Do** keep Nguyen Ngoc Huy / Jack visible as the accountable specialist.
- **Do** respect `prefers-reduced-motion` and provide static fallbacks for animated proof.

### Don't:

- **Don't** make the site feel like generic agency/studio branding.
- **Don't** broaden the positioning into generic "frontend developer" portfolio language.
- **Don't** ship shallow UI-only prettiness that cannot survive technical scrutiny.
- **Don't** rely on static brochure polish where an interaction or artifact should prove the claim.
- **Don't** use gradient text, decorative glassmorphism, repeated eyebrow scaffolding, or big rounded icon cards.
- **Don't** let simplicity become emptiness. The simple surface must have a technical system underneath it.
