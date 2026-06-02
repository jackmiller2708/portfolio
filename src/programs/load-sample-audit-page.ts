import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";
import { buildRiskMatrix, buildSprintRoadmap, groupFindingsBySeverity } from "@utils/audit-view";

export const loadSampleAuditPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const findings = yield* repository.listAuditFindings;

    return {
      title: "Sample Audit",
      summary:
        "A privacy-safe example of how an Angular frontend systems audit reports evidence, risk, and next steps.",
      findings,
      severityGroups: groupFindingsBySeverity(findings),
      riskMatrix: buildRiskMatrix(findings),
      roadmap: buildSprintRoadmap(findings),
      cta: {
        title: "Want this shape of review on your system?",
        summary:
          "Use the contact form to describe the product, current risk, and constraints for a scoped diagnostic.",
        href: "/contact?context=sample-audit",
        label: "Request similar diagnostic"
      }
    };
  });

export const loadSampleAuditPage = loadSampleAuditPageFromRepository(astroContentRepository);
