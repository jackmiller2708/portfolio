import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import type { ContentRepository } from "@services/ContentRepository";
import { loadHomePageFromRepository } from "./load-home-page";

const repository: ContentRepository = {
  listServices: Effect.succeed([
    {
      id: "angular-system-audit",
      title: "Angular System Audit",
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
  listAuditFindings: Effect.succeed([
    {
      id: "implicit-state",
      title: "Implicit state ownership",
      severity: "high",
      area: "state",
      evidence: "State is shared across unrelated components.",
      risk: "Changes can create hidden regressions.",
      recommendation: "Name the owner before refactoring."
    }
  ]),
  listLabPosts: Effect.succeed([]),
  listCaseStudies: Effect.succeed([]),
  getCaseStudyBySlug: () =>
    Effect.sync(() => {
      throw new Error("Not used in this test");
    }),
  getLabPostBySlug: () =>
    Effect.sync(() => {
      throw new Error("Not used in this test");
    }),
  getSystemMap: Effect.succeed({
    id: "main",
    title: "System map",
    summary: "Shows the bounded system.",
    fallbackLabel: "System flow",
    groups: [{ id: "input", label: "Input" }],
    nodes: [
      {
        id: "intake",
        label: "Intake",
        group: "input",
        description: "Requests enter the system."
      }
    ],
    edges: [],
    riskMarkers: [],
    decisionMarkers: [],
    states: {
      messy: "Implicit coupling",
      explicit: "Explicit ownership"
    }
  }),
  getSiteMeta: Effect.succeed({
    title: "Site",
    description: "Description",
    siteUrl: "https://example.com",
    ogImage: "/og/default.png",
    availability: "Available",
    contactEmail: "hello@example.com",
    credibilityPoints: [
      {
        label: "Focus",
        value: "Angular",
        detail: "Systems work"
      }
    ],
    nonFitCriteria: ["Not fit"],
    about: {
      context: "Context",
      philosophy: "Boundaries matter.",
      workingStyle: ["Diagnostic first"],
      qualityPhilosophy: ["Make decisions visible"],
      communication: "Async"
    }
  })
};

describe("loadHomePage", () => {
  it("returns hero positioning and service offers", async () => {
    const viewModel = await Effect.runPromise(loadHomePageFromRepository(repository));

    expect(viewModel.hero.title).toBe("Complex systems,\nmade explicit.");
    expect(viewModel.services).toHaveLength(1);
    expect(viewModel.credibilityPoints).toHaveLength(1);
    expect(viewModel.heroMap.states.explicit).toBe("Explicit ownership");
  });

  it("returns diagnostic options connected to services, reference findings, and map state", async () => {
    const viewModel = await Effect.runPromise(loadHomePageFromRepository(repository));
    const diagnostic = viewModel.diagnostics[0];

    expect(viewModel.diagnostics).toHaveLength(4);
    expect(diagnostic?.recommendedService.title).toBe("Angular System Audit");
    expect(diagnostic?.auditFinding.title).toBe("Implicit state ownership");
    expect(diagnostic?.systemMapState).toBe("messy");
    expect(diagnostic?.cta.href).toBe("/contact?diagnostic=unclear-state");
  });
});
