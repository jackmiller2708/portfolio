import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadCaseStudiesPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const caseStudies = yield* repository.listCaseStudies;

    return {
      title: "Case Studies",
      summary:
        "Anonymized examples of Angular frontend systems work: constraints, decisions, tradeoffs, and outcomes without private client details.",
      caseStudies
    };
  });

export const loadCaseStudiesPage = loadCaseStudiesPageFromRepository(astroContentRepository);
