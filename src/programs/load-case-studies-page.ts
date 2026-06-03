import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadCaseStudiesPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const caseStudies = yield* repository.listCaseStudies;

    return {
      title: "Case Studies",
      summary:
        "Anonymized examples of past engagements: constraints, decisions, tradeoffs, and outcomes.",
      caseStudies
    };
  });

export const loadCaseStudiesPage = loadCaseStudiesPageFromRepository(astroContentRepository);
