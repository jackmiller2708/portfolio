import { Effect } from "effect";
import type { ContentRepository } from "@services/ContentRepository";
import { buildLabRecommendedReads } from "@utils/recommended-read";

export const loadLabPostPageFromRepository = (repository: ContentRepository, slug: string) =>
  Effect.gen(function* () {
    const post = yield* repository.getLabPostBySlug(slug);
    const services = yield* repository.listServices;
    const caseStudies = yield* repository.listCaseStudies;

    const relatedServices = services.filter((service) =>
      post.relatedServices?.includes(service.id)
    );

    return {
      post,
      relatedServices,
      recommendedReads: buildLabRecommendedReads(post, services, caseStudies)
    };
  });

export const loadLabPostPage = (slug: string) =>
  Effect.gen(function* () {
    const { astroContentRepository } = yield* Effect.promise(
      async () => await import("@services/AstroContentRepository")
    );

    return yield* loadLabPostPageFromRepository(astroContentRepository, slug);
  });
