import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import type { SystemMap } from "@domain/system-map";
import type { ContentRepository } from "@services/ContentRepository";
import { loadSystemMapFromRepository } from "./load-system-map";

const systemMap: SystemMap = {
  id: "main",
  title: "System map",
  summary: "Makes system flow readable.",
  fallbackLabel: "Main system map",
  groups: [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" }
  ],
  nodes: [
    {
      id: "ui",
      label: "UI",
      group: "frontend",
      description: "User-facing state."
    },
    {
      id: "api",
      label: "API",
      group: "backend",
      description: "Server boundary."
    }
  ],
  edges: [{ from: "ui", to: "api", label: "Request" }],
  riskMarkers: [{ nodeId: "ui", label: "Implicit cache" }],
  decisionMarkers: [{ nodeId: "api", label: "Typed errors" }],
  states: {
    messy: "Implicit ownership",
    explicit: "Named boundaries"
  }
};

const repository: ContentRepository = {
  listServices: Effect.succeed([]),
  listAuditFindings: Effect.succeed([]),
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
  getSystemMap: Effect.succeed(systemMap),
  getSiteMeta: Effect.sync(() => {
    throw new Error("Not used in this test");
  })
};

describe("loadSystemMap", () => {
  it("returns validated main map data", async () => {
    const viewModel = await Effect.runPromise(loadSystemMapFromRepository(repository));

    expect(viewModel.id).toBe("main");
    expect(viewModel.nodes).toHaveLength(2);
    expect(viewModel.edges[0]?.label).toBe("Request");
    expect(viewModel.states.explicit).toContain("Named");
  });
});
