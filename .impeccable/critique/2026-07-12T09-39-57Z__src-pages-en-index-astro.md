---
target: src/pages/index.astro -> src/pages/en/index.astro
total_score: 28
p0_count: 0
p1_count: 1
timestamp: 2026-07-12T09-39-57Z
slug: src-pages-en-index-astro
---
⚠️ DEGRADED: single-context (Assessment A sub-agent failed with external usage limit; Assessment B completed in a sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Diagnostic selection has state, but the system-map proof can render visually empty even while controls exist offstage. |
| 2 | Match System / Real World | 4 | Language is sharply matched to Angular technical leads and names real pains. |
| 3 | User Control and Freedom | 3 | Anchor CTAs and toggles are clear; map drawer/close exists, but homepage active location is absent. |
| 4 | Consistency and Standards | 3 | Token system is strong; one title size drifts from DESIGN.md and nav active state misses the homepage. |
| 5 | Error Prevention | 2 | Diagnostic choices are safe, but there is little prevention around misclassification or no-fit routing on this page. |
| 6 | Recognition Rather Than Recall | 3 | Actions are labeled and content is explicit; the four diagnostic choices still require technical parsing. |
| 7 | Flexibility and Efficiency of Use | 2 | Good direct anchors, but no accelerated path for a returning technical lead beyond scanning. |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and credible, but repeated white panels flatten the middle of the page. |
| 9 | Error Recovery | 2 | Homepage itself has few error states; interactive proof recovery depends on hidden/static fallback behavior. |
| 10 | Help and Documentation | 4 | Lab, sample audit, case studies, and explicit proof routes provide strong self-serve context. |
| **Total** | | **28/40** | **Good foundation, with one major proof-breaker** |

## Anti-Patterns Verdict

**LLM assessment:** This does not read as generic AI slop at first glance. The positioning is specific, the copy has a real technical point of view, and the restrained palette matches the documented brand. The main slop risk is not the usual gradient/card/template problem; it is that several sections resolve into similar bordered panels, so the page sometimes feels more like a tidy technical document than a living diagnostic instrument.

**Deterministic scan:** One advisory finding: `design-system-font-size` at `src/pages/en/index.astro:409`, where `.reference-card span` uses `font-size: 1.2rem` outside the documented DESIGN.md type ramp. This is low-risk drift, not a user-facing bug, but the detector is right that the title size is undocumented.

**Visual overlays:** No reliable user-visible overlay is available. Assessment B reported mutable injection was unavailable through the exposed Browser plugin surface, so `detect.js` was not injected. Fallback evidence came from CLI detector output, Playwright screenshots, DOM snapshots, and computed element positions.

## Overall Impression

The homepage has the right brain: concrete Angular pain, good-fit filtering, real proof routes, and a human specialist behind it. The biggest opportunity is to make the signature interaction actually deliver the product philosophy. Right now the page says “made explicit,” but the system map can appear blank because the node controls are projected outside the stage. That is the one place the interface must not blink.

## What's Working

1. The hero positioning is strong. “Complex Angular systems, made explicit” is memorable, and the subhead names state ownership, RxJS flows, data access, and error handling without sounding like a keyword dump.
2. The diagnostic selector is strategically right. It converts abstract services into pains a technical lead recognizes: unclear state, cache/data behavior, weak recovery, refactor planning.
3. The proof ecosystem is coherent. Credibility strip, past work, sample audit, system map, and lab notes all support the same claim instead of scattering into unrelated portfolio trophies.

## Priority Issues

**[P1] Signature system map can render visually empty**

**Why it matters:** The map is the page's proof moment. In rendered evidence, the stage was visible at `x=131`, but all `.system-map__node` controls projected around `x=58`, outside the clipped stage. The screenshot therefore shows a large empty grid where the interface should demonstrate technical craft. This directly undermines PRODUCT.md's promise: simple surface, technical depth underneath.

**Fix:** Rework the projection math in `src/islands/HeroSystemMap/HeroSystemMap.astro`, especially around `projectButtons()` lines 572-575 and the camera/layout scaling around lines 395-447. Verify that node buttons remain inside `.system-map__stage` at desktop and mobile sizes. Add a Playwright check that asserts each `.system-map__node` bounding box intersects the stage box.

**Suggested command:** `$impeccable polish src/islands/HeroSystemMap/HeroSystemMap.astro`

**[P2] The diagnostic choice set is useful but cognitively dense**

**Why it matters:** Four options is within the working-memory limit, but each card includes a label plus a full technical pain sentence. A first-time visitor has to compare four similar system-failure descriptions before seeing the recommended path. The content is good; the comparison burden is the issue.

**Fix:** Give the options a stronger scan structure: short labels, one emphasized keyword per pain, and a clearer selected-to-result relationship. Consider moving the long pain text into the result panel or exposing it progressively on selection. Keep the four options, but make the decision feel lighter.

**Suggested command:** `$impeccable clarify src/pages/en/index.astro`

**[P2] Homepage location is not visibly active in the global nav**

**Why it matters:** Rendered DOM showed `activeNav: []` on `/en/`. Users can still navigate, but the sticky header does not confirm where they are. This weakens visibility of system status and makes the homepage feel less deliberately instrumented than the rest of the system.

**Fix:** Adjust active-link matching in `src/layouts/BaseLayout.astro` so locale home paths count as active when `currentPath` is `/en` or `/en/`. If the brand link is the home indicator, give it a subtle current state instead of only marking nav links.

**Suggested command:** `$impeccable harden src/layouts/BaseLayout.astro`

**[P2] Middle sections flatten into similar white proof panels**

**Why it matters:** Past work, diagnostic result, lab cards, and CTA-style panels share the same bordered-card language. The restraint is on-brand, but it makes the emotional journey plateau after the hero. The page needs one more crafted moment before the final CTA, especially if the system map is intended as that peak.

**Fix:** Once the map is fixed, let it carry the peak. Then reduce card sameness by making past-work cards read more like compact technical postmortems and lab cards read more like notes. Same tokens, different composition.

**Suggested command:** `$impeccable layout src/pages/en/index.astro`

**[P3] One card-title size is outside the documented type ramp**

**Why it matters:** `.reference-card span` uses `1.2rem`, which is not in DESIGN.md. It is not visually harmful, but it weakens the new design contract.

**Fix:** Use `var(--t-h3)` if the card title should be a formal title, or document an intermediate title token if `1.2rem` is intentional.

**Suggested command:** `$impeccable typeset src/pages/en/index.astro`

## Persona Red Flags

**Jordan (First-Timer):** Jordan understands the hero, but the diagnostic section asks them to choose among four nuanced Angular failure modes before they have seen the service model. “Cache and data behavior” versus “Weak error recovery” is meaningful to a lead, but a less certain visitor may hesitate. The result panel helps, but only after the initial choice.

**Riley (Stress Tester):** Riley will notice the map failure quickly: the page promises an interactive architecture map, but the stage can appear empty while the controls are technically present outside the visible box. That looks like an implementation defect in the most proof-heavy component.

**Casey (Distracted Mobile User):** Casey gets a strong hero and diagnostic stack, but the page becomes long quickly. The system-map section occupies a lot of vertical space; if it appears blank on mobile, it becomes a major abandonment point before lab and CTA content.

**Mina (Technical Lead Evaluating Contractor Fit):** Mina wants to know whether this engineer can turn ambiguous Angular risk into a plan. The diagnostic copy and past-work cards are promising, but the broken map creates doubt precisely because it is a technical artifact. For this persona, a proof interaction failing is more damaging than a decorative section failing.

## Minor Observations

- `src/pages/index.astro` is only a redirect to `/en/`; future critiques should target `src/pages/en/index.astro` directly unless redirect behavior is the subject.
- The root CTA language is clear, but “Request an audit” and “Request an Angular audit” appear in different places. That may be intentional, but one canonical primary CTA would be cleaner.
- The theme toggle is visible and useful, but on mobile it compresses to “Dark” plus an icon/control cluster that feels slightly utility-heavy in the first viewport.
- The final CTA did not become a strong visual endpoint in the captured first pass; make sure the page ends with a memorable close rather than just another EvidencePanel.

## Questions to Consider

- What if the system map became the page's unmistakable peak, with the diagnostic selector feeding it more visibly?
- Should the diagnostic cards ask the visitor to self-identify their pain, or should the page first diagnose through a more guided question?
- If a technical lead only scans the hero, diagnostic labels, and map, do they understand why Jack is different from a competent Angular developer?
