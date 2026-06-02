import { describe, expect, it } from "vitest";
import type { ServiceOffer } from "@domain/service";
import { buildAdvisoryRecommendations } from "./advisory";

const services: readonly ServiceOffer[] = [
  {
    id: "angular-system-audit",
    title: "Angular System Audit",
    summary: "Audit risk.",
    clientPain: "Risk is unclear.",
    outputs: ["Finding list"],
    bestFit: ["Angular teams"],
    notFit: ["Visual redesign"],
    cta: { label: "Start audit", href: "/contact?service=angular-system-audit" }
  },
  {
    id: "frontend-stabilization",
    title: "Frontend Stabilization",
    summary: "Stabilize flows.",
    clientPain: "Flows regress.",
    outputs: ["State model"],
    bestFit: ["Delivery teams"],
    notFit: ["One-off bugs"],
    cta: { label: "Start stabilization", href: "/contact?service=frontend-stabilization" }
  },
  {
    id: "architecture-advisory",
    title: "Architecture Advisory",
    summary: "Plan change.",
    clientPain: "Sequence is unclear.",
    outputs: ["Plan"],
    bestFit: ["Leads"],
    notFit: ["No refactor appetite"],
    cta: { label: "Start advisory", href: "/contact?service=architecture-advisory" }
  }
];

describe("advisory recommendations", () => {
  it("maps advisory pains to expected service recommendations", () => {
    const recommendations = buildAdvisoryRecommendations(services);

    expect(
      Object.fromEntries(
        recommendations.map((recommendation) => [
          recommendation.id,
          recommendation.recommendedServiceId
        ])
      )
    ).toEqual({
      "unclear-state": "angular-system-audit",
      "cache-data": "frontend-stabilization",
      "error-recovery": "frontend-stabilization",
      "refactor-planning": "architecture-advisory",
      unsure: "angular-system-audit"
    });
  });
});
