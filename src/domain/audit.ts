export type AuditSeverity = "critical" | "high" | "medium" | "low";

export type AuditFinding = {
  readonly id: string;
  readonly title: string;
  readonly severity: AuditSeverity;
  readonly area: string;
  readonly evidence: string;
  readonly risk: string;
  readonly recommendation: string;
  readonly sprint?: number;
};
