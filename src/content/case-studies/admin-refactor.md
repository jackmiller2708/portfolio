---
title: Admin feature boundary refactor
summary: A redacted case study for separating UI, data access, domain rules, and error states in a legacy admin area.
redactionStatus: redacted
context: A legacy Angular admin area used by internal operators to review records, apply updates, and recover from data inconsistencies.
constraints:
  - Private domain terminology has been removed.
  - Screenshots, repository paths, and internal workflow names are not included.
  - The feature had to keep supporting daily operational use during the refactor.
problem: UI components, data access, and domain rules were tightly coupled, making small admin changes risky and hard to review.
decisions:
  - title: Split feature shell from data access
    rationale: The shell could handle layout and navigation while a dedicated data layer owned loading and mutation behavior.
  - title: Make operator errors explicit
    rationale: Recovery states needed to describe what an operator could do next, not just that a request failed.
  - title: Record tradeoffs as lightweight decisions
    rationale: The team needed context for why some legacy paths were kept temporarily.
tradeoffs:
  - Several legacy forms kept their original markup during the first pass.
  - The team accepted short-term adapter code to avoid a risky cutover.
  - Some internal terminology is generalized here to preserve confidentiality.
beforeAfter:
  before:
    - Components fetched data and applied domain rules directly.
    - Error messages were tied to backend response details.
    - Feature ownership was unclear across admin subflows.
  after:
    - Data access moved behind feature-specific services.
    - Error states described operator recovery options.
    - Refactor steps were documented as reviewable decisions.
evidence:
  - label: Boundary map
    detail: The feature was split into shell, data access, domain rules, and presentation states.
  - label: Error model
    detail: Operator-facing failures were grouped by recovery path.
  - label: Migration notes
    detail: Temporary adapters were documented with removal triggers.
result: The admin area gained clearer ownership boundaries and safer review paths for future changes without exposing private operational details.
recommendation: Begin similar admin refactors by separating read/write ownership before changing presentation components.
---

## What changed

The refactor started with a boundary map rather than a component rewrite. That made it clear which code owned layout, fetching, domain rules, and operator-facing states.

The first implementation pass kept some legacy pieces in place while moving the riskiest data and error behavior behind explicit feature boundaries.

## Redaction note

This case study intentionally removes identifying domain terms, screenshots, repository paths, workflow names, and production details.
