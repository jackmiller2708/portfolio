import { Effect } from "effect";
import type { ContentRepository } from "@services/ContentRepository";
import { buildLabRecommendedReads } from "@utils/recommended-read";
import type { Locale } from "@domain/site";
import { localizeCaseStudies, localizeLabPosts, localizeServices } from "@i18n/content";
import { defaultLocale } from "@i18n/locales";

export const loadLabPostPageFromRepository = (
  repository: ContentRepository,
  slug: string,
  locale: Locale = defaultLocale
) =>
  Effect.gen(function* () {
    const posts = localizeLabPosts(yield* repository.listLabPosts, locale);
    const post =
      posts.find((item) => item.slug === slug) ?? (yield* repository.getLabPostBySlug(slug));
    const services = localizeServices(yield* repository.listServices, locale);
    const caseStudies = localizeCaseStudies(yield* repository.listCaseStudies, locale);

    const relatedServices = services.filter((service) =>
      post.relatedServices?.includes(service.id)
    );

    return {
      post,
      relatedServices,
      recommendedReads: buildLabRecommendedReads(post, services, caseStudies)
    };
  });

export const loadLabPostPage = (slug: string, locale: Locale = defaultLocale) =>
  Effect.gen(function* () {
    const { astroContentRepository } = yield* Effect.promise(
      async () => await import("@services/AstroContentRepository")
    );

    return yield* loadLabPostPageFromRepository(astroContentRepository, slug, locale);
  });
