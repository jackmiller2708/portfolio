---
title: RxJS cleanup without hiding ownership
summary: A short note on making stream ownership and teardown visible.
topic: RxJS
takeaway: Stream cleanup should clarify ownership instead of scattering unsubscribe mechanics.
codeLanguage: typescript
relatedServices:
  - frontend-stabilization
---

RxJS cleanup is most useful when it also makes ownership boundaries obvious. The point is not to make every subscription disappear; the point is to show which feature owns the stream, when it stops, and what state remains after cleanup.

## Practical rule

Cleanup belongs near the feature boundary that owns the stream. If teardown code is scattered across components, the team can still leak behavior even when the code technically unsubscribes.

```ts
const state$ = trigger$.pipe(
  switchMap(() => loadFeatureState()),
  shareReplay({ bufferSize: 1, refCount: true })
);
```

The useful review question is whether `trigger$` and `state$` belong to the same feature boundary. If they do not, the cleanup mechanism is probably hiding an ownership problem.
