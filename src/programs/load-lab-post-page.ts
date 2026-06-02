import { Effect } from "effect";
import type { ContentRepository } from "@services/ContentRepository";

export const loadLabPostPageFromRepository = (repository: ContentRepository, slug: string) =>
  Effect.gen(function* () {
    const post = yield* repository.getLabPostBySlug(slug);
    const services = yield* repository.listServices;

    const relatedServices = services.filter((service) =>
      post.relatedServices?.includes(service.id)
    );

    return {
      post,
      relatedServices
    };
  });

export const loadLabPostPage = (slug: string) =>
  Effect.gen(function* () {
    const { astroContentRepository } = yield* Effect.promise(
      async () => await import("@services/AstroContentRepository")
    );

    return yield* loadLabPostPageFromRepository(astroContentRepository, slug);
  });
