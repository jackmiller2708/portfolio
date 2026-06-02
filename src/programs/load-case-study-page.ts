import { Effect } from "effect";
import type { ContentRepository } from "@services/ContentRepository";

export const loadCaseStudyPageFromRepository = (repository: ContentRepository, slug: string) =>
  Effect.gen(function* () {
    const caseStudy = yield* repository.getCaseStudyBySlug(slug);
    const systemMap = yield* repository.getSystemMap;

    return {
      caseStudy,
      systemMap,
      cta: {
        title: "Start a similar diagnostic.",
        summary:
          "Share the current product context and the risk you want made explicit before larger implementation work.",
        href: `/contact?context=case-study&case=${caseStudy.slug}`,
        label: "Start contact"
      }
    };
  });

export const loadCaseStudyPage = (slug: string) =>
  Effect.gen(function* () {
    const { astroContentRepository } = yield* Effect.promise(
      async () => await import("@services/AstroContentRepository")
    );

    return yield* loadCaseStudyPageFromRepository(astroContentRepository, slug);
  });
