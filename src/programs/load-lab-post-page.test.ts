import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import type { LabPost } from "@domain/lab";
import type { ServiceOffer } from "@domain/service";
import type { CaseStudy } from "@domain/case-study";
import type { ContentRepository } from "@services/ContentRepository";
import { loadLabPostPageFromRepository } from "./load-lab-post-page";

const labPost: LabPost = {
  id: "rxjs-cleanup",
  slug: "rxjs-cleanup",
  title: "RxJS Cleanup",
  summary: "Practical cleanup note.",
  topic: "RxJS",
  takeaway: "Name subscription ownership before refactoring.",
  codeLanguage: "typescript",
  relatedServices: ["frontend-stabilization"]
};

const service: ServiceOffer = {
  id: "frontend-stabilization",
  title: "Frontend Stabilization",
  summary: "Reduce production risk.",
  clientPain: "The UI is difficult to trust.",
  outputs: ["Risk list"],
  bestFit: ["Teams with recurring regressions"],
  notFit: ["Pure marketing redesigns"],
  cta: {
    label: "Start",
    href: "/contact"
  }
};

const caseStudy: CaseStudy = {
  id: "checkout-stabilization",
  slug: "checkout-stabilization",
  title: "Checkout Stabilization",
  summary: "Synthetic checkout proof.",
  redactionStatus: "synthetic",
  context: "Checkout context.",
  constraints: ["Synthetic"],
  problem: "Implicit state.",
  decisions: [{ title: "Model states", rationale: "Clarify ownership." }],
  tradeoffs: ["More explicit contracts."],
  beforeAfter: {
    before: ["Implicit state"],
    after: ["Explicit state"]
  },
  evidence: [{ label: "Flow", detail: "Recovery became visible." }],
  result: "Lower risk.",
  recommendation: "Start narrow."
};

const repository: ContentRepository = {
  listServices: Effect.succeed([service]),
  listAuditFindings: Effect.succeed([]),
  listLabPosts: Effect.succeed([labPost]),
  listCaseStudies: Effect.succeed([caseStudy]),
  getCaseStudyBySlug: () =>
    Effect.sync(() => {
      throw new Error("Not used in this test");
    }),
  getLabPostBySlug: (slug) =>
    slug === labPost.slug
      ? Effect.succeed(labPost)
      : Effect.sync(() => {
          throw new Error(`Missing lab post: ${slug}`);
        }),
  getSystemMap: Effect.sync(() => {
    throw new Error("Not used in this test");
  }),
  getSiteMeta: Effect.sync(() => {
    throw new Error("Not used in this test");
  })
};

describe("loadLabPostPage", () => {
  it("returns lab detail fields and related services", async () => {
    const viewModel = await Effect.runPromise(
      loadLabPostPageFromRepository(repository, "rxjs-cleanup")
    );

    expect(viewModel.post.topic).toBe("RxJS");
    expect(viewModel.post.codeLanguage).toBe("typescript");
    expect(viewModel.relatedServices).toHaveLength(1);
    expect(viewModel.recommendedReads.map((read) => read.title)).toEqual([
      "Frontend Stabilization",
      "Checkout Stabilization"
    ]);
  });

  it("fails when the lab slug is missing", async () => {
    await expect(
      Effect.runPromise(loadLabPostPageFromRepository(repository, "missing"))
    ).rejects.toThrow("Missing lab post: missing");
  });
});
