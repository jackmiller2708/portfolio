![reversal](https://capsule-render.vercel.app/api?type=waving&height=300&text=Jack%20Miller&textBg=false&fontAlign=50&animation=fadeIn&section=header&desc=The%20Web%20Developer&descAlignY=55&fontAlignY=40&stroke=fff&strokeWidth=1&theme=onedark)

> **"Make complex frontend systems explicit, safer, and easier to evolve."**

Hi, I'm a Frontend Systems Engineer. While most portfolios are built to showcase flashy 3D spectacles or experimental UI trends, I built this space to reflect how I actually approach software engineering in production: with intent, predictability, and a deep respect for constraints.

This repository holds the source code for my personal portfolio a living example of a "calm technical premium" system designed from the ground up to manage chaos, optimize data flow, and clarify ownership boundaries.

---

## The Philosophy Behind the Build

I treat my portfolio exactly like I treat a client's production codebase. I didn't want to just _tell_ you I care about architecture; I wanted to prove it through the constraints of this site:

- **Architectural Storytelling over Flash:** The interactive system map on the site isn't a gimmick. It visually translates the often-messy reality of large frontend codebases into bounded, explicit architecture. It s a direct reflection of my daily work wrangling large-scale Angular applications.
- **Tradeoffs over Tech-Stacks:** You won't find a mindless bulleted list of buzzwords here. My case studies and lab notes dive deep into real-world constraints, engineering tradeoffs, and the concrete before/after metrics I've driven.
- **The Craft of Non-Functionals:** Fast, accessible UI isn't a "nice-to-have" feature to sprinkle on at the end it's a baseline requirement.

The site enforces strict quality gates out of the box: keeping Lighthouse scores ≥ 90, maintaining WCAG 2.2 AA contrast, and natively respecting reduced-motion preferences.

## The Stack (And Why It's Here)

I chose these tools because they solve specific engineering problems, not because they are trendy:

- **Framework**: [Astro](https://astro.build/) for static site generation. It gives me blazing fast initial loads while letting me selectively sprinkle in interactive islands only where they add value.
- **Typing**: TypeScript. Because explicit contracts prevent implicit, late-night production bugs.
- **Logic & Flow**: [Effect](https://effect.website/). A personal favorite for robust workflow handling, explicit error management, and predictable dependency injection.
- **Styling**: Token-based vanilla CSS defined in `src/styles`. No heavy runtime overhead, just clean architectural layout.
