import { Effect } from "effect";
import type { AuditFinding } from "@domain/audit";

const findings: readonly AuditFinding[] = [
  {
    id: "implicit-state",
    title: "Implicit state ownership across feature boundaries",
    severity: "critical",
    evidence: "Multiple services mutate shared state without a declared owner or recovery path.",
    risk: "Feature changes can create regressions in unrelated workflows.",
    recommendation:
      "Define feature state ownership and isolate data access behind explicit boundaries."
  },
  {
    id: "unhandled-errors",
    title: "Unhandled data and error states in user-facing flows",
    severity: "high",
    evidence:
      "Loading, empty, retry, and failure states are handled inconsistently across screens.",
    risk: "Users see broken or ambiguous states during normal API failures.",
    recommendation: "Introduce typed request states and shared error presentation rules."
  }
];

export const loadSampleAuditPage = Effect.succeed({
  title: "Sample Audit",
  summary:
    "A privacy-safe example of how an Angular frontend systems audit reports evidence, risk, and next steps.",
  findings
});
