import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import type { CaseStudy } from "@domain/case-study";
import type { SystemMap } from "@domain/system-map";
import type { ContentRepository } from "@services/ContentRepository";
import { loadCaseStudyPageFromRepository } from "./load-case-study-page";

const caseStudy: CaseStudy = {
  id: "checkout-stabilization",
  slug: "checkout-stabilization",
  title: "Checkout Stabilization",
  summary: "Synthetic stabilization case.",
  redactionStatus: "synthetic",
  context: "A checkout surface with reliability risk.",
  constraints: ["No private metrics", "No client names"],
  problem: "State and error handling were hard to reason about.",
  decisions: [{ title: "Model states", rationale: "Make transitions explicit." }],
  tradeoffs: ["More ceremony in exchange for clearer ownership."],
  beforeAfter: {
    before: ["Implicit async state"],
    after: ["Named state transitions"]
  },
  evidence: [{ label: "Review", detail: "Failure paths became visible." }],
  result: "The implementation became easier to audit.",
  recommendation: "Start with a diagnostic pass before rebuilding."
};

const systemMap: SystemMap = {
  id: "main",
  title: "System map",
  summary: "Shows the relevant system boundaries.",
  fallbackLabel: "Checkout flow",
  groups: [{ id: "ui", label: "UI" }],
  nodes: [
    {
      id: "cart",
      label: "Cart",
      group: "ui",
      description: "Collects checkout intent."
    }
  ],
  edges: [],
  riskMarkers: [{ nodeId: "cart", label: "Implicit state" }],
  decisionMarkers: [{ nodeId: "cart", label: "State model" }],
  states: {
    messy: "Unclear flow",
    explicit: "Bounded flow"
  }
};

const repository: ContentRepository = {
  listServices: Effect.succeed([]),
  listAuditFindings: Effect.succeed([]),
  listLabPosts: Effect.succeed([]),
  listCaseStudies: Effect.succeed([caseStudy]),
  getCaseStudyBySlug: (slug) =>
    slug === caseStudy.slug
      ? Effect.succeed(caseStudy)
      : Effect.sync(() => {
          throw new Error(`Missing case study: ${slug}`);
        }),
  getLabPostBySlug: () =>
    Effect.sync(() => {
      throw new Error("Not used in this test");
    }),
  getSystemMap: Effect.succeed(systemMap),
  getSiteMeta: Effect.sync(() => {
    throw new Error("Not used in this test");
  })
};

describe("loadCaseStudyPage", () => {
  it("returns case study detail fields and system map data", async () => {
    const viewModel = await Effect.runPromise(
      loadCaseStudyPageFromRepository(repository, "checkout-stabilization")
    );

    expect(viewModel.caseStudy.problem).toContain("State");
    expect(viewModel.caseStudy.beforeAfter.after).toContain("Named state transitions");
    expect(viewModel.systemMap.nodes).toHaveLength(1);
    expect(viewModel.cta.href).toContain("checkout-stabilization");
  });

  it("fails when the case study slug is missing", async () => {
    await expect(
      Effect.runPromise(loadCaseStudyPageFromRepository(repository, "missing"))
    ).rejects.toThrow("Missing case study: missing");
  });
});
