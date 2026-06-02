# ADR-007: Styling System

Status: Accepted

Date: 2026-06-02

## Decision

Use CSS custom properties for design tokens, Astro scoped styles and CSS Modules for component styles, and small global utility classes for layout/accessibility primitives.

Do not use Tailwind or StyleX as the default styling foundation for V1. Use BEM-style class naming only where a component needs explicit element/modifier hooks, especially in CSS Modules or global utility contexts.

## Context

The design direction is calm technical premium: restrained, precise, readable, and component-driven. The site needs strong typography, tokens, dark mode, responsive layout, reduced-motion support, and low runtime overhead.

Tailwind can move quickly, but it can make award-level editorial components harder to read and review when class strings grow. StyleX is powerful, but it adds ecosystem and build constraints that are unnecessary for a mostly static Astro site. Plain global BEM is predictable, but too broad for component-local styling.

## Options Considered

| Option | Summary | Tradeoff |
|---|---|---|
| Tailwind | Utility-first classes in markup. | Fast, but large class strings can obscure component intent. |
| Global BEM | Global CSS with block/element/modifier naming. | Predictable, but global scope can become hard to maintain. |
| StyleX | Typed atomic CSS-in-JS style system. | Strong compile-time model, but added complexity for Astro. |
| Tokens + scoped CSS/CSS Modules | Native CSS with component locality and global tokens. | Slightly more manual, but clear, portable, and low overhead. |

## Rationale

The portfolio needs editorial control and design-token discipline more than rapid utility composition. Native CSS custom properties and scoped styles fit Astro well, avoid unnecessary runtime cost, and make dark mode, reduced motion, and responsive rules explicit.

## Consequences

### Positive

- Styling remains framework-light and portable.
- Design tokens are visible and reusable.
- Component CSS is easy to inspect.
- Reduced-motion and accessibility states are straightforward.

### Negative

- Utility-heavy developers may find Tailwind faster for early layout.
- Some shared layout patterns need explicit utility classes.
- Variant management must be documented to avoid ad hoc class growth.

### Follow-Up

- Add styling convention.
- Add design tokens during scaffold.
- Add CSS review checks once source exists.

## Verification

- Global CSS is limited to tokens, reset/base rules, typography, layout utilities, and accessibility helpers.
- Component-specific styles live beside the component.
- No component uses hard-coded colors outside token definitions.
- Reduced-motion rules exist for non-essential animation.
- Focus, hover, active, disabled, light, and dark states are covered for interactive components.

## Related Documents

- `docs/ui/styling-conventions.md`
- `docs/portfolio_design_system_award_update.md`
- `docs/architecture/portfolio_architectural_foundation.md`

