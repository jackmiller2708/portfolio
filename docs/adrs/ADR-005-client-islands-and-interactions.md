# ADR-005: Client Islands And Interactions

Status: Accepted

Date: 2026-06-02

## Decision

Use client islands only for interaction that materially improves the portfolio: the architecture map, before/after toggles, contact form enhancement, and focused demos. Keep core content readable and navigable without critical client JavaScript.

## Context

The design system calls for one memorable technical interaction and subtle system-flow motion. The requirements also call for fast performance, accessibility, reduced motion, and clear conversion paths.

## Options Considered

| Option              | Summary                           | Tradeoff                                            |
| ------------------- | --------------------------------- | --------------------------------------------------- |
| Mostly static Astro | Minimal JS.                       | Fast, but may underserve the signature interaction. |
| Interactive islands | Hydrate only specific components. | Balanced craft and performance.                     |
| Full SPA            | Hydrate the whole site.           | More JS than needed and worse fit for content.      |

## Rationale

The site should demonstrate craft without hiding content behind animation or heavy runtime behavior. Islands give enough interactivity while preserving static rendering and performance.

## Consequences

### Positive

- Core pages remain fast and crawlable.
- Reduced-motion and static fallbacks are easier to enforce.
- Signature interactions can be built deliberately.

### Negative

- Island data boundaries must be explicit.
- Some interactions need duplicate static fallback content.

### Follow-Up

- Define view models for interactive islands.
- Define static SVG fallback requirements for the system map.
- Add reduced-motion verification.

## Verification

- Navigation and core content work without client JS.
- Interactive islands receive serialized safe view models.
- Reduced-motion disables line drawing, parallax, morphing, and scroll scrubbing.
- Keyboard and touch flows work for the system map and contact form.

## Related Documents

- `docs/portfolio_design_system_award_update.md`
- `docs/portfolio_requirements_technical_spec_award_update.md`
- `docs/architecture/portfolio_architectural_foundation.md`
