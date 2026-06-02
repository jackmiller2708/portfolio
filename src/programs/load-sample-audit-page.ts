import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadSampleAuditPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const findings = yield* repository.listAuditFindings;

    return {
      title: "Sample Audit",
      summary:
        "A privacy-safe example of how an Angular frontend systems audit reports evidence, risk, and next steps.",
      findings
    };
  });

export const loadSampleAuditPage = loadSampleAuditPageFromRepository(astroContentRepository);
