---
title: Implicit state ownership across feature boundaries
severity: critical
area: state
evidence: Multiple services mutate shared state without a declared owner or recovery path.
risk: Feature changes can create regressions in unrelated workflows.
recommendation: Define feature state ownership and isolate data access behind explicit boundaries.
sprint: 1
---

Shared state should have a declared owner, lifecycle, and error strategy.
