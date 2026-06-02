---
title: Cache semantics are undocumented
severity: medium
area: data access
evidence: Several streams cache API responses without expiry, invalidation, or ownership rules.
risk: Users can see stale data and engineers cannot predict when updates propagate.
recommendation: Define cache ownership, invalidation triggers, and stale-data UI states.
sprint: 2
---

Caching should be an explicit product and engineering decision.
