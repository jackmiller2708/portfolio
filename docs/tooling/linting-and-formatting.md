# Tooling: Linting And Formatting

Status: Accepted

Date: 2026-06-02

## Purpose

Define the formatter and linter stack for the Astro portfolio and explain the readability rules used by the project.

## Decision

Use:

- Prettier with `prettier-plugin-astro` for formatting.
- ESLint with `eslint-plugin-astro` for Astro-aware linting.
- TypeScript ESLint for TypeScript linting.
- `eslint-plugin-jsx-a11y` for accessibility-oriented template checks.
- `astro check` for framework and type diagnostics.

Oxlint can be added later as a fast supplemental JavaScript/TypeScript linter, but it is not the primary Astro linter because it does not cover the full Astro template surface.

## Scripts

| Script                 | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| `npm run format`       | Format project files with Prettier.                     |
| `npm run format:check` | Check formatting without writing changes.               |
| `npm run lint`         | Run ESLint.                                             |
| `npm run lint:fix`     | Run ESLint autofixes.                                   |
| `npm run check`        | Run Astro diagnostics.                                  |
| `npm run quality`      | Run formatting, linting, Astro check, tests, and build. |

## Readability Rule Rationale

The rules are based on two practical findings from cognitive science and software-engineering research:

- Working memory is limited, so code should reduce unnecessary mental bookkeeping.
- Code complexity correlates with lower readability and understandability.

Rules that support this:

| Rule                           | Reason                                                          |
| ------------------------------ | --------------------------------------------------------------- |
| `complexity <= 8`              | Keeps branching paths small enough to review.                   |
| `max-depth <= 3`               | Reduces nested state tracking.                                  |
| `max-lines-per-function <= 80` | Encourages focused functions without forcing tiny abstractions. |
| `max-nested-callbacks <= 3`    | Prevents callback pyramids and hidden flow.                     |
| `max-params <= 4`              | Keeps function contracts scannable.                             |
| `no-nested-ternary`            | Avoids dense expression branching.                              |
| `curly`                        | Makes branch boundaries explicit.                               |
| `prefer-const` and `no-var`    | Clarifies mutation intent.                                      |
| `eqeqeq`                       | Avoids coercion surprises.                                      |

These are warnings where judgment may be needed and errors where ambiguity is rarely useful.

## Sources

- Astro editor setup recommends Prettier with the official Astro plugin for CLI/editor formatting and documents ESLint, Stylelint, and Biome options: <https://docs.astro.build/en/editor-setup/>
- `prettier-plugin-astro` is the official Prettier plugin for formatting `.astro` files: <https://github.com/withastro/prettier-plugin-astro>
- `eslint-plugin-astro` supports linting Astro components, including frontmatter, templates, expressions, directives, and client scripts: <https://github.com/ota-meshi/eslint-plugin-astro>
- Cognitive load theory treats working-memory limits as central to understanding and learning: <https://pmc.ncbi.nlm.nih.gov/articles/PMC6435105/>
- Cowan's working-memory research argues for a small chunk capacity, often around four chunks: <https://memory.psych.missouri.edu/assets/doc/articles/2001/cowan-bbs-2001.pdf>
- Empirical software-engineering studies connect code complexity with readability and understandability: <https://arxiv.org/abs/1909.01760>
- Empirical validation work supports cognitive complexity as a source-code understandability measure: <https://arxiv.org/abs/2007.12520>

## Related Documents

- `docs/ui/component-management.md`
- `docs/ui/styling-conventions.md`
- `docs/architecture/portfolio_architectural_foundation.md`
