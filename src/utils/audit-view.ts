import type { AuditFinding, AuditSeverity } from "@domain/audit";

const severityOrder: readonly AuditSeverity[] = ["critical", "high", "medium", "low"];

export type AuditSeverityGroup = {
  readonly severity: AuditSeverity;
  readonly findings: readonly AuditFinding[];
};

export type AuditRiskMatrixRow = {
  readonly severity: AuditSeverity;
  readonly count: number;
  readonly areas: readonly string[];
};

export type AuditRoadmapStep = {
  readonly sprint: number;
  readonly title: string;
  readonly findings: readonly AuditFinding[];
};

export const groupFindingsBySeverity = (
  findings: readonly AuditFinding[]
): readonly AuditSeverityGroup[] =>
  severityOrder
    .map((severity) => ({
      severity,
      findings: findings.filter((finding) => finding.severity === severity)
    }))
    .filter((group) => group.findings.length > 0);

export const buildRiskMatrix = (findings: readonly AuditFinding[]): readonly AuditRiskMatrixRow[] =>
  groupFindingsBySeverity(findings).map((group) => ({
    severity: group.severity,
    count: group.findings.length,
    areas: [...new Set(group.findings.map((finding) => finding.area))]
  }));

export const buildSprintRoadmap = (
  findings: readonly AuditFinding[]
): readonly AuditRoadmapStep[] => {
  const sprintNumbers = [
    ...new Set(
      findings
        .map((finding) => finding.sprint)
        .filter((sprint): sprint is number => typeof sprint === "number")
    )
  ].toSorted((left, right) => left - right);

  return sprintNumbers.map((sprint) => ({
    sprint,
    title: `Sprint ${sprint}`,
    findings: findings.filter((finding) => finding.sprint === sprint)
  }));
};
