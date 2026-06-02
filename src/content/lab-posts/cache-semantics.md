---
title: Cache semantics before cache helpers
summary: A note on defining ownership, invalidation, and stale data before adding cache utilities.
topic: Angular
takeaway: Cache helpers are safer when cache semantics are documented first.
codeLanguage: typescript
relatedServices:
  - frontend-stabilization
  - angular-system-audit
---

Cache behavior needs explicit product and engineering semantics. A helper can store data, but it cannot decide whether stale data is acceptable, who invalidates it, or what happens during refresh.

## Practical rule

Write the cache contract before choosing the cache mechanism.

```ts
type CachePolicy = {
  readonly owner: "feature" | "session";
  readonly staleAfter: "navigation" | "mutation" | "manual-refresh";
  readonly recovery: "show-stale" | "block-until-refresh";
};
```

Once those semantics are visible, the implementation choice becomes much less risky.
