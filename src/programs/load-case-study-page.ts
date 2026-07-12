import { Effect } from "effect";
import type { ContentRepository } from "@services/ContentRepository";
import { buildCaseStudyRecommendedReads } from "@utils/recommended-read";
import type { Locale } from "@domain/site";
import {
  localizeCaseStudies,
  localizeHref,
  localizeLabPosts,
  localizeSystemMap
} from "@i18n/content";
import { defaultLocale } from "@i18n/locales";

export const loadCaseStudyPageFromRepository = (
  repository: ContentRepository,
  slug: string,
  locale: Locale = defaultLocale
) =>
  Effect.gen(function* () {
    const caseStudies = localizeCaseStudies(yield* repository.listCaseStudies, locale);
    const caseStudy =
      caseStudies.find((item) => item.slug === slug) ??
      (yield* repository.getCaseStudyBySlug(slug));
    const systemMap = localizeSystemMap(yield* repository.getSystemMap, locale);
    const labPosts = localizeLabPosts(yield* repository.listLabPosts, locale);

    return {
      caseStudy,
      systemMap,
      recommendedReads: buildCaseStudyRecommendedReads(caseStudy.slug, caseStudies, labPosts),
      cta: {
        title:
          locale === "vi"
            ? "Yêu cầu audit frontend Angular."
            : "Request an Angular frontend audit.",
        summary:
          locale === "vi"
            ? "Chia sẻ ngữ cảnh sản phẩm, phiên bản Angular, và phần hệ thống đã trở nên tốn kém để thay đổi. Bước đầu có thể giữ phạm vi hẹp."
            : "Share the current product context, Angular version, and the part of the system that has become expensive to change. The first step can stay narrow.",
        href: localizeHref(locale, `/contact?context=case-study&case=${caseStudy.slug}`),
        label: locale === "vi" ? "Yêu cầu audit Angular" : "Request an Angular audit"
      }
    };
  });

export const loadCaseStudyPage = (slug: string, locale: Locale = defaultLocale) =>
  Effect.gen(function* () {
    const { astroContentRepository } = yield* Effect.promise(
      async () => await import("@services/AstroContentRepository")
    );

    return yield* loadCaseStudyPageFromRepository(astroContentRepository, slug, locale);
  });
