# UI Convention: Component Management

Status: Accepted

Date: 2026-06-02

## Purpose

Define how components are categorized, named, composed, and kept separate from data/program layers.

## Scope

### In Scope

- Astro components.
- Client islands.
- Shared UI primitives.
- Page sections.
- Component folder structure.
- Component dependency rules.

### Out of Scope

- Final visual design details.
- Motion choreography details.
- Content schema fields.

## Rule Summary

Components are presentational by default. They receive typed props or page view models, render semantic markup, and delegate data loading, validation, configuration, and side effects to page loader programs and Effect services.

Use Atomic Design as a scale taxonomy, but enforce n-layer architecture for dependencies.

## Component Taxonomy

| Category  | Purpose                                         | Examples                                                        |
| --------- | ----------------------------------------------- | --------------------------------------------------------------- |
| Primitive | Lowest-level reusable UI or HTML wrapper.       | `Button`, `IconButton`, `TextLink`, `Badge`, `SkipLink`         |
| Atom      | Small display element with one clear job.       | `SeverityBadge`, `MetricValue`, `RiskMarker`, `CodeLabel`       |
| Molecule  | Small composition of atoms/primitives.          | `ServiceSummary`, `ProofItem`, `FindingHeader`, `ContactField`  |
| Organism  | Larger reusable section or functional UI block. | `ServiceCard`, `EvidencePanel`, `AuditFinding`, `ContactIntake` |
| Section   | Page-level content band.                        | `HomeHero`, `ServicesComparison`, `SampleAuditRoadmap`          |
| Template  | Layout structure for a page family.             | `CaseStudyTemplate`, `LabPostTemplate`                          |
| Island    | Hydrated interactive component.                 | `HeroSystemMap`, `BeforeAfterToggle`, `ContactIntakeIsland`     |

Atomic terms describe scale only. They do not override dependency rules.

## Proposed Folder Layout

```txt
src/
  components/
    primitives/
      Button/
        Button.astro
        Button.module.css
        Button.types.ts
      Badge/
    atoms/
    molecules/
    organisms/
    sections/
    templates/
  islands/
    HeroSystemMap/
      HeroSystemMap.astro
      HeroSystemMap.client.ts
      HeroSystemMap.module.css
      HeroSystemMap.types.ts
  layouts/
  pages/
```

Use a folder per component once the component has styles, types, tests, stories, examples, or variants. Single-file components are acceptable for very small atoms.

## Naming

### Components

- Component files use PascalCase: `ServiceCard.astro`.
- Component folders use PascalCase: `ServiceCard/`.
- Exported component/type names use PascalCase: `ServiceCardProps`.
- Props types use the component name plus `Props`.
- View model types use the page or feature name plus `ViewModel`.
- Client-only implementation files may use `.client.ts` or `.client.tsx`.

Examples:

```txt
ServiceCard/
  ServiceCard.astro
  ServiceCard.module.css
  ServiceCard.types.ts

HeroSystemMap/
  HeroSystemMap.astro
  HeroSystemMap.client.ts
  HeroSystemMap.module.css
  HeroSystemMap.types.ts
```

### Props

Props must be explicit and typed.

```ts
export type ServiceCardProps = {
  readonly title: string;
  readonly summary: string;
  readonly clientPain: string;
  readonly outputs: readonly string[];
  readonly cta: {
    readonly label: string;
    readonly href: string;
  };
};
```

Avoid passing raw content entries to components. Pass view models or shaped props.

### Tests And Examples

When added:

- Tests: `ServiceCard.test.ts`
- Visual/example files: `ServiceCard.example.astro`
- Fixtures: `ServiceCard.fixture.ts`

## Dependency Rules

Allowed:

```txt
pages -> programs -> services/layers
pages -> layouts/components
components -> components
components -> domain/view-model types
islands -> island-safe types
```

Forbidden:

```txt
components -> programs
components -> services
components -> layers
components -> process.env/import.meta.env secrets
components -> raw content collection queries
islands -> private data or secrets
```

Page sections can receive a large section view model. Smaller primitives should receive narrow props.

## N-Layer UI Boundary

```txt
Domain
  Stable concepts: ServiceOffer, CaseStudy, AuditFinding, ContactInquiry.

Program
  Effect loaders and workflows produce view models.

Page
  Calls programs, sets metadata, chooses layout.

Section/Template
  Composes organisms and molecules.

Organism/Molecule/Atom/Primitive
  Renders typed props and emits user actions.

Island
  Owns local interaction state and progressive enhancement only.
```

## Composition Rules

- Prefer semantic HTML before custom abstractions.
- Keep components small enough that the rendered structure is obvious.
- Do not create atoms for every HTML element.
- Do not nest UI cards inside other cards.
- Do not make page sections into floating cards.
- Repeated visual patterns should become components after the second real use.
- Keep page-specific sections in `sections/` until reuse is proven.

## State Rules

| State type              | Owner                                                       |
| ----------------------- | ----------------------------------------------------------- |
| Content/data state      | Effect program and page view model.                         |
| Form validation state   | Contact program; island may mirror field-level interaction. |
| Hover/focus/open state  | Component or island.                                        |
| Animation state         | Component/island, respecting reduced motion.                |
| Async side-effect state | Effect program or endpoint.                                 |

## Accessibility Rules

- Use semantic elements before ARIA.
- Every interactive element must be keyboard reachable.
- Focus states must be visible and tokenized.
- Icon-only buttons require accessible labels.
- Error summaries must be associated with fields.
- Diagrams need text equivalents or static fallback descriptions.
- Client islands must not be the only way to access core content.

## Verification

- Typecheck props and view models.
- Component render tests for key organisms.
- Accessibility checks for navigation, contact, cards, and interactive diagrams.
- Manual keyboard pass for all interactive components.
- Reduced-motion pass for islands and animated sections.

## Related Documents

- `docs/adrs/ADR-006-component-architecture.md`
- `docs/adrs/ADR-001-stack-boundaries.md`
- `docs/adrs/ADR-005-client-islands-and-interactions.md`
- `docs/architecture/portfolio_architectural_foundation.md`
- `docs/portfolio_design_system_award_update.md`
