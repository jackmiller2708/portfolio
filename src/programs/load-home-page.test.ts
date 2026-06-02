import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import type { ContentRepository } from "@services/ContentRepository";
import { loadHomePageFromRepository } from "./load-home-page";

const repository: ContentRepository = {
  listServices: Effect.succeed([
    {
      id: "audit",
      title: "Audit",
      summary: "Find risks.",
      clientPain: "Unknown risk.",
      outputs: ["roadmap"],
      bestFit: ["Angular teams"],
      notFit: ["visual redesigns"],
      cta: {
        label: "Start",
        href: "/contact"
      }
    }
  ]),
  listAuditFindings: Effect.succeed([]),
  listLabPosts: Effect.succeed([]),
  listCaseStudies: Effect.succeed([]),
  getSiteMeta: Effect.succeed({
    title: "Site",
    description: "Description",
    siteUrl: "https://example.com",
    ogImage: "/og/default.png",
    availability: "Available",
    contactEmail: "hello@example.com",
    proofPoints: [
      {
        label: "Focus",
        value: "Angular",
        detail: "Systems work"
      }
    ],
    nonFitCriteria: ["Not fit"],
    about: {
      context: "Context",
      workingStyle: ["Diagnostic first"],
      qualityPhilosophy: ["Make decisions visible"],
      communication: "Async"
    }
  })
};

describe("loadHomePage", () => {
  it("returns hero positioning and service offers", async () => {
    const viewModel = await Effect.runPromise(loadHomePageFromRepository(repository));

    expect(viewModel.hero.title).toContain("frontend systems");
    expect(viewModel.services).toHaveLength(1);
    expect(viewModel.proofPoints).toHaveLength(1);
  });
});
