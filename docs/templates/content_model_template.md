# Content Model: Title

Status: Draft

Date: YYYY-MM-DD

## Purpose

Define the content collection, schema, and page view model for a content type.

## Collection

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | `string` | Yes | Public display title. |

## Schema Rules

Document validation constraints, derived fields, slugs, dates, tags, and allowed values.

## Domain Model

```ts
type Example = {
  readonly id: string;
  readonly title: string;
};
```

## Page View Model

```ts
type ExamplePageViewModel = {
  readonly heading: string;
  readonly summary: string;
};
```

## Redaction Rules

State what can be public, synthetic, anonymized, or omitted.

## SEO And Social

Define title, description, canonical URL, Open Graph fields, and structured data needs.

## Rendering Requirements

List pages/components that consume this model.

## Verification

- Schema validation
- Fixture coverage
- SEO metadata checks
- Public redaction review

## Related Documents

- Related data flow
- Related ADRs
- Related page specs

