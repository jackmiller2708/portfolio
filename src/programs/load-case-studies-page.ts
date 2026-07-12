import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";
import type { Locale } from "@domain/site";
import { localizeCaseStudies } from "@i18n/content";
import { defaultLocale } from "@i18n/locales";

export const loadCaseStudiesPageFromRepository = (
  repository: ContentRepository,
  locale: Locale = defaultLocale
) =>
  Effect.gen(function* () {
    const caseStudies = localizeCaseStudies(yield* repository.listCaseStudies, locale);

    return {
      title: locale === "vi" ? "Ca thực tế" : "Case Studies",
      summary:
        locale === "vi"
          ? "Các ví dụ đã ẩn danh về công việc hệ thống frontend Angular: constraint, quyết định, đánh đổi, và outcome không kèm chi tiết khách hàng riêng tư."
          : "Anonymized examples of Angular frontend systems work: constraints, decisions, tradeoffs, and outcomes without private client details.",
      caseStudies
    };
  });

export const loadCaseStudiesPage = loadCaseStudiesPageFromRepository(astroContentRepository);
