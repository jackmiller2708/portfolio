import { describe, expect, it } from "vitest";
import type { AuditFinding } from "@domain/audit";
import {
  buildAuditWalkthrough,
  buildRiskMatrix,
  buildSprintRoadmap,
  groupFindingsBySeverity
} from "@utils/audit-view";

const findings: readonly AuditFinding[] = [
  {
    id: "a",
    title: "Unhandled errors",
    severity: "high",
    area: "errors",
    evidence: "Errors leak.",
    risk: "Users get stuck.",
    recommendation: "Add explicit handling.",
    sprint: 1
  },
  {
    id: "b",
    title: "Implicit state",
    severity: "medium",
    area: "state",
    evidence: "State is duplicated.",
    risk: "Flows drift.",
    recommendation: "Define ownership.",
    sprint: 2
  }
];

describe("sample audit view helpers", () => {
  it("groups findings by severity order", () => {
    const groups = groupFindingsBySeverity(findings);

    expect(groups.map((group) => group.severity)).toEqual(["high", "medium"]);
  });

  it("builds risk matrix rows and sprint roadmap", () => {
    expect(buildRiskMatrix(findings)[0]).toMatchObject({
      severity: "high",
      count: 1,
      areas: ["errors"]
    });
    expect(buildSprintRoadmap(findings).map((step) => step.sprint)).toEqual([1, 2]);
  });

  it("builds walkthrough steps from findings and sprint sequence", () => {
    const roadmap = buildSprintRoadmap(findings);
    const walkthrough = buildAuditWalkthrough(findings, roadmap);

    expect(walkthrough).toHaveLength(2);
    expect(walkthrough[0]).toMatchObject({
      findingId: "a",
      symptom: "Unhandled errors",
      evidence: "Errors leak.",
      risk: "Users get stuck.",
      recommendation: "Add explicit handling.",
      sprintTitle: "Sprint 1"
    });
  });
});
