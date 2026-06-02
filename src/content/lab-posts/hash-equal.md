---
title: Hash and Equal as frontend architecture tools
summary: A practical look at stable identity and comparison in TypeScript-heavy frontends.
topic: TypeScript
takeaway: Stable equality rules reduce accidental cache and state bugs.
codeLanguage: typescript
relatedServices:
  - architecture-advisory
---

Identity and equality rules matter when frontend data becomes shared system state. If a cache, signal, store, or memoized selector cannot explain equality, the system can drift into accidental updates or stale views.

## Practical rule

Define identity at the boundary where shared state enters the frontend. Do not let every consumer decide what counts as the same record.

```ts
type RecordKey = `${string}:${string}`;

const toRecordKey = (source: string, id: string): RecordKey => `${source}:${id}`;
```

The important part is not the helper itself. It is the decision that identity is stable, named, and reviewable.
