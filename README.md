![reversal](https://capsule-render.vercel.app/api?type=waving&height=300&text=Jack%20Miller&textBg=false&fontAlign=50&animation=fadeIn&section=header&desc=The%20Web%20Developer&descAlignY=55&fontAlignY=40&stroke=fff&strokeWidth=1&theme=onedark)

> **"Make complex frontend systems explicit, safer, and easier to evolve."**

Hi, I'm Jack — a Frontend Systems Engineer who spends most of his time inside large Angular codebases, making invisible architectural debt visible and expensive rewrites avoidable.

This repository is the source for my personal portfolio. It's also a working argument: that a personal site can be built with the same discipline you'd bring to a production system — explicit boundaries, intentional tradeoffs, and zero tolerance for accidental complexity.

## Why It's Built This Way

Most portfolio sites are built to impress in a 10-second scroll. This one is built to hold up under scrutiny — because that's the standard I hold client work to.

A few concrete decisions that reflect that:

- **The interactive system map** visualizes frontend architecture the way I actually think about it — as bounded regions with explicit data flow, not as a flat file tree. It's the same mental model I use when onboarding into unfamiliar codebases.
- **The case studies don't hide the ugly parts.** Real engineering involves constraints, wrong turns, and before/after numbers that don't always look heroic. That's what you'll find here.
- **Non-functional requirements are first-class.** Lighthouse ≥ 90, WCAG 2.2 AA contrast, and `prefers-reduced-motion` support aren't checkboxes at the end of the project — they're enforced from the start, which is the only way they actually hold.

## The Stack

Each tool here earns its place by solving a specific problem. Here's the honest version:

| Tool                              | Why it's here                                                             | What it costs                                                       |
| --------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [Astro](https://astro.build/)     | Zero JS by default, islands architecture for selective interactivity      | Smaller ecosystem, occasional rough edges with complex island state |
| TypeScript                        | Explicit contracts at the boundary between systems                        | Upfront investment; pays off fast in refactors                      |
| [Effect](https://effect.website/) | Explicit error channels, composable workflows, typed dependency injection | Steep learning curve; not a casual import                           |
| Vanilla CSS (token-based)         | No runtime overhead, full control over the cascade                        | Manual work that a utility framework would automate                 |

## Getting Started

```bash
pnpm install
pnpm dev
```

The dev server runs at `localhost:4321`. Lighthouse CI runs on every pull request via the included GitHub Action.

---

If something in here sparks a question — about the architecture, a tradeoff, or anything else — I'm reachable at jackmiller0899@gmail.com.
