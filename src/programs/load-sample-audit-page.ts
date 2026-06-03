import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";
import {
  buildAuditWalkthrough,
  buildRiskMatrix,
  buildSprintRoadmap,
  groupFindingsBySeverity
} from "@utils/audit-view";

export const loadSampleAuditPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const findings = yield* repository.listAuditFindings;
    const roadmap = buildSprintRoadmap(findings);

    return {
      title: "Sample Audit",
      summary:
        "A privacy-safe example of how an Angular frontend systems review connects symptoms, risk, and next steps.",
      findings,
      severityGroups: groupFindingsBySeverity(findings),
      riskMatrix: buildRiskMatrix(findings),
      roadmap,
      walkthrough: buildAuditWalkthrough(findings, roadmap),
      cta: {
        title: "Want this shape of review on your system?",
        summary:
          "Use the contact form to describe the product, Angular version, current risk, and constraints for a scoped audit.",
        href: "/contact?context=sample-audit",
        label: "Request a similar audit"
      }
    };
  });

export const loadSampleAuditPage = loadSampleAuditPageFromRepository(astroContentRepository);
