---
title: Data and error modeling for Angular workflows
summary: A note on representing loading, success, empty, and failure states explicitly.
topic: Architecture
takeaway: Typed data states keep UI behavior predictable under normal API failure.
codeLanguage: typescript
relatedServices:
  - angular-system-audit
  - architecture-advisory
---

Data and error states should be modeled before components render them. Otherwise every component invents its own idea of loading, empty, partial, retry, and failed behavior.

## Practical rule

Name states by the user or operator experience, then map API details into those states before rendering.

```ts
type RemoteState<T> =
  | { readonly status: "loading" }
  | { readonly status: "ready"; readonly data: T }
  | { readonly status: "empty" }
  | { readonly status: "retryable-error"; readonly message: string }
  | { readonly status: "blocked"; readonly reason: string };
```

This keeps templates from turning transport failures into scattered conditional rendering rules.
