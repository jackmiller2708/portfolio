# Error Model: Title

Status: Draft

Date: YYYY-MM-DD

## Purpose

Define the errors, defects, fallbacks, and user-facing behavior for a workflow or system area.

## Principles

- Recoverable errors are modeled explicitly.
- Defects are not silently converted into normal states.
- User-facing messages are clear without exposing implementation details.
- Build-time content errors should fail early where possible.

## Error Taxonomy

| Error | Category | Cause | Owner |
|---|---|---|---|
| `ExampleError` | Recoverable | Example cause. | Example layer. |

## Error Shapes

Define the typed shape of each error.

```ts
type ExampleError = {
  readonly _tag: "ExampleError";
  readonly message: string;
};
```

## Handling Rules

| Error | Handling | User-facing behavior |
|---|---|---|
| `ExampleError` | Example handling. | Example response. |

## Fallbacks

Define fallback content, fallback UI, retry behavior, or build failure behavior.

## Logging And Diagnostics

Define what should be logged and what must be redacted.

## Testing

- Unit tests for constructors and handlers
- Integration tests for failed workflows
- Accessibility checks for error UI
- Redaction checks

## Related Documents

- Related ADRs
- Related data flow
- Related implementation plan

