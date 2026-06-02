import { Effect } from "effect";
import type { ContentRepository } from "@services/ContentRepository";
import { buildCaseStudyRecommendedReads } from "@utils/recommended-read";

export const loadCaseStudyPageFromRepository = (repository: ContentRepository, slug: string) =>
  Effect.gen(function* () {
    const caseStudy = yield* repository.getCaseStudyBySlug(slug);
    const systemMap = yield* repository.getSystemMap;
    const caseStudies = yield* repository.listCaseStudies;
    const labPosts = yield* repository.listLabPosts;

    return {
      caseStudy,
      systemMap,
      recommendedReads: buildCaseStudyRecommendedReads(caseStudy.slug, caseStudies, labPosts),
      cta: {
        title: "Start a similar diagnostic.",
        summary: `Share the current product context, especially constraints like ${caseStudy.constraints[0] ?? "delivery pressure"}, so the first diagnostic can stay scoped.`,
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
