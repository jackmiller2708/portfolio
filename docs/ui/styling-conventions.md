# UI Convention: Styling Conventions

Status: Accepted

Date: 2026-06-02

## Purpose

Define the styling system, CSS naming rules, token usage, responsive behavior, and accessibility state requirements.

## Scope

### In Scope

- Global CSS.
- Design tokens.
- Component scoped styles.
- CSS Modules.
- Utility classes.
- BEM-style naming rules.
- Dark mode and reduced motion.

### Out of Scope

- Final art direction beyond the approved design system.
- Exact animation implementation libraries.
- Third-party component libraries.

## Rule Summary

Use CSS custom properties plus Astro scoped styles and CSS Modules. Keep global CSS small. Do not use Tailwind or StyleX as the V1 foundation. Use BEM-style naming selectively where class hooks need explicit structure.

## Styling Stack

| Concern          | Choice                             | Notes                                                             |
| ---------------- | ---------------------------------- | ----------------------------------------------------------------- |
| Design tokens    | CSS custom properties              | Colors, spacing, typography, radius, shadow, z-index, motion.     |
| Base styles      | Global CSS                         | Reset, body, typography, links, focus, selection, media defaults. |
| Component styles | Astro scoped styles or CSS Modules | Prefer locality over broad global selectors.                      |
| Utilities        | Small global utility layer         | Layout/accessibility helpers only.                                |
| Tailwind         | Not default                        | Can be reconsidered only through a new ADR.                       |
| StyleX           | Not default                        | Can be reconsidered only through a new ADR.                       |
| BEM              | Selective convention               | Useful for global utilities or complex component CSS Modules.     |

## Global CSS Rules

Global CSS may contain:

- reset/base rules
- design tokens
- typography defaults
- layout primitives
- accessibility helpers
- reduced-motion defaults
- theme selectors

Global CSS must not contain page-specific or component-specific styling.

Allowed global utility examples:

```css
.u-container {
}
.u-stack {
}
.u-grid {
}
.u-visually-hidden {
}
.u-skip-link {
}
```

## Token Rules

Every color must come from a token or semantic alias.

Required token groups:

```txt
--color-*
--font-*
--space-*
--size-*
--radius-*
--border-*
--shadow-*
--duration-*
--ease-*
--z-*
```

Component styles should use semantic tokens when available:

```css
.root {
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

Avoid raw hex values outside token definition files.

## Component CSS Naming

For CSS Modules:

```css
.root {
}
.header {
}
.title {
}
.body {
}
.footer {
}
.action {
}
.isSelected {
}
.isDisabled {
}
.variantPrimary {
}
.variantQuiet {
}
```

For global or complex non-module CSS, use BEM-style names:

```css
.service-card {
}
.service-card__header {
}
.service-card__title {
}
.service-card--featured {
}
```

Do not mix arbitrary naming styles inside the same component.

## Variant Rules

Variants should be finite and named by purpose, not appearance alone.

Preferred:

```txt
primary
secondary
quiet
danger
success
warning
selected
disabled
```

Avoid:

```txt
pink
big
fancy
glow
special
```

Appearance can change later; purpose should remain stable.

## Layout Rules

- Use the 12-column grid for desktop page layout.
- Use one-column layout on mobile.
- Use `max-width` containers between `1180px` and `1280px`.
- Use `20px` to `24px` mobile side padding.
- Use stable dimensions for boards, grids, icon buttons, counters, tiles, and diagrams.
- Avoid layout shifts on hover, focus, loading, and selected states.
- Do not use viewport-width font scaling.
- Letter spacing must be `0` unless a specific type style needs otherwise.

## Responsive Rules

- Design from `360px` upward.
- Verify mobile, tablet, laptop, and desktop.
- Touch behavior must not depend on hover.
- Long headings and buttons must wrap cleanly.
- Components must not overflow horizontally unless intentionally scrollable.

## Dark Mode Rules

- Use semantic tokens for light/dark values.
- Do not create separate component CSS blocks for every theme unless necessary.
- Maintain WCAG AA contrast in both themes.
- Diagrams must remain readable in both themes.

## Motion Rules

- Non-essential motion must respect `prefers-reduced-motion`.
- Reduced motion disables scroll scrubbing, line drawing, parallax, and morphing.
- Micro-interaction scale must stay at or below `1.02`.
- Motion should explain state or flow, not delay reading.

Baseline reduced-motion rule:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Use component-specific reduced-motion rules for diagrams and scroll-linked interactions.

## Accessibility State Rules

Interactive components must define:

- default
- hover where relevant
- focus-visible
- active
- disabled
- selected/current where relevant
- error where relevant

Focus rings should use the accent token and remain visible against light and dark backgrounds.

## Interactive Proof Rules

- Proof controls should use plain buttons, links, and panels with stable dimensions.
- Selected states should use border or text contrast, not layout movement or scale.
- Diagram state differences should be carried by actual layout/content changes, not decorative pseudo-elements alone.
- Dark/light theme switching should rely on semantic tokens and preserve system preference as the default fallback.
- Route-specific OG assets should match the same restrained palette and avoid gradients or decorative imagery.

## CSS Review Checklist

- No raw color values outside token files.
- No component-specific styles in global CSS.
- No one-note palette drift beyond the design system.
- No hover/focus layout shift.
- No text overflow in buttons/cards at mobile widths.
- Reduced-motion behavior exists for animated components.
- Dark mode contrast remains readable.
- Touch and keyboard states are covered.

## Related Documents

- `docs/adrs/ADR-007-styling-system.md`
- `docs/portfolio_design_system_award_update.md`
- `docs/ui/component-management.md`
- `docs/architecture/portfolio_architectural_foundation.md`
