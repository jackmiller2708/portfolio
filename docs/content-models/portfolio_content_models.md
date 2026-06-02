# Content Model: Portfolio

Status: Proposed

Date: 2026-06-02

## Purpose

Define the initial content collections, schema intent, domain models, redaction rules, SEO needs, and rendering consumers for the portfolio.

## Collections

| Collection      | Purpose                                                     | Minimum for V1/V1.5                                 |
| --------------- | ----------------------------------------------------------- | --------------------------------------------------- |
| `services`      | Buyable offers and fit guidance.                            | 3 services in V1.                                   |
| `caseStudies`   | Technical proof through redacted/synthetic project stories. | 2 in V1.5.                                          |
| `labPosts`      | Public proof of thinking and technical writing.             | 4 in V1.5.                                          |
| `auditFindings` | Sample audit report findings.                               | Enough for severity list, risk matrix, and roadmap. |
| `siteMeta`      | SEO, social, navigation, availability, contact rules.       | Required in V1.                                     |
| `systemMap`     | Nodes, groups, risks, decisions for architecture map.       | Basic map in V1.5, polished in V2.                  |

## Service Model

| Field        | Type       | Required | Notes                         |
| ------------ | ---------- | -------- | ----------------------------- |
| `id`         | `string`   | Yes      | Stable key.                   |
| `title`      | `string`   | Yes      | Offer name.                   |
| `summary`    | `string`   | Yes      | Short public summary.         |
| `clientPain` | `string`   | Yes      | Problem the buyer recognizes. |
| `outputs`    | `string[]` | Yes      | Concrete deliverables.        |
| `bestFit`    | `string[]` | Yes      | Qualification guidance.       |
| `notFit`     | `string[]` | Yes      | Exclusions and boundaries.    |
| `cta`        | object     | Yes      | Label and target.             |
| `priority`   | `number`   | Yes      | Display ordering.             |

## Case Study Model

| Field             | Type       | Required | Notes                                       |
| ----------------- | ---------- | -------- | ------------------------------------------- |
| `id`              | `string`   | Yes      | Stable key.                                 |
| `slug`            | `string`   | Yes      | Public URL slug.                            |
| `title`           | `string`   | Yes      | Public title.                               |
| `summary`         | `string`   | Yes      | Listing summary.                            |
| `redactionStatus` | enum       | Yes      | `public`, `redacted`, or `synthetic`.       |
| `context`         | `string`   | Yes      | Product/team context.                       |
| `constraints`     | `string[]` | Yes      | Timeline, budget, team, legacy constraints. |
| `problem`         | `string`   | Yes      | Core technical/business problem.            |
| `decisions`       | object[]   | Yes      | ADR-like decisions.                         |
| `tradeoffs`       | `string[]` | Yes      | Costs and alternatives.                     |
| `beforeAfter`     | object     | Yes      | Architecture state comparison.              |
| `evidence`        | object[]   | Yes      | Snippets, diagrams, findings, metrics.      |
| `result`          | `string`   | Yes      | Outcome.                                    |
| `recommendation`  | `string`   | Yes      | Next step or advisory note.                 |

## Lab Post Model

| Field             | Type       | Required | Notes                                    |
| ----------------- | ---------- | -------- | ---------------------------------------- |
| `id`              | `string`   | Yes      | Stable key.                              |
| `slug`            | `string`   | Yes      | Public URL slug.                         |
| `title`           | `string`   | Yes      | Public title.                            |
| `topic`           | enum       | Yes      | Angular, RxJS, TypeScript, Architecture. |
| `summary`         | `string`   | Yes      | Listing summary.                         |
| `takeaway`        | `string`   | Yes      | Practical conclusion.                    |
| `codeLanguage`    | `string`   | Optional | For code-heavy posts.                    |
| `relatedServices` | `string[]` | Optional | Service IDs.                             |

Required initial topics:

- RxJS cleanup
- data/error modeling
- Hash/Equal
- cache semantics

## Audit Finding Model

| Field            | Type     | Required | Notes                                                           |
| ---------------- | -------- | -------- | --------------------------------------------------------------- |
| `id`             | `string` | Yes      | Stable key.                                                     |
| `title`          | `string` | Yes      | Finding title.                                                  |
| `severity`       | enum     | Yes      | Critical, high, medium, low.                                    |
| `area`           | enum     | Yes      | State, data access, errors, performance, architecture, testing. |
| `evidence`       | `string` | Yes      | Observable symptom.                                             |
| `risk`           | `string` | Yes      | Business/engineering impact.                                    |
| `recommendation` | `string` | Yes      | Suggested fix.                                                  |
| `sprint`         | `number` | Optional | Roadmap grouping.                                               |

## Site Metadata Model

Required:

- default title
- default description
- canonical site URL
- Open Graph image path
- navigation items
- availability note
- contact email or contact route
- social links
- non-fit criteria

## System Map Model

Required:

- nodes
- groups
- edges
- risk markers
- decision markers
- messy state
- explicit state
- static fallback labels

Client islands must receive only safe serialized map data.

## Redaction Rules

Case studies must not expose:

- client/employer names without permission
- private architecture diagrams
- internal repositories
- production incidents that identify a client
- proprietary metrics
- screenshots containing private data

Synthetic diagrams are preferred when proof matters but client details are sensitive.

## SEO And Social

Every public page needs:

- title
- description
- canonical path
- Open Graph title
- Open Graph description
- Open Graph image

Case studies and lab posts should include useful technical keywords without turning titles into keyword lists.

## Rendering Requirements

| Model         | Consumers                                       |
| ------------- | ----------------------------------------------- |
| Service       | Home, Services, Contact CTA context.            |
| Case Study    | Home previews, Case Studies index, Case detail. |
| Lab Post      | Home lab preview, Technical Lab index/detail.   |
| Audit Finding | Sample Audit, Home proof snippets if selected.  |
| Site Metadata | Layout, SEO, navigation, Contact.               |
| System Map    | Home hero, map preview, case study diagrams.    |

## Verification

- Schema validation for each collection.
- Fixture coverage for valid and invalid entries.
- Redaction review for case studies.
- SEO metadata checks for each page type.
- Component render tests for long titles and summaries.

## Related Documents

- `docs/adrs/ADR-002-content-data-flow.md`
- `docs/data-flows/content-to-page-data-flow.md`
- `docs/portfolio_requirements_technical_spec_award_update.md`
