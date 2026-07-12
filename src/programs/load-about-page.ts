import type { ContentRepository } from "@services/ContentRepository";
import type { Locale } from "@domain/site";

import { localizeHref, localizeSiteMeta } from "@i18n/content";
import { astroContentRepository } from "@services/AstroContentRepository";
import { defaultLocale } from "@i18n/locales";
import { Effect } from "effect";

export const loadAboutPageFromRepository = (repository: ContentRepository, locale: Locale = defaultLocale) => Effect.gen(function* () {
  const site = localizeSiteMeta(yield* repository.getSiteMeta, locale);

  return {
    title: locale === "vi" ? "Huy là ai?" : "Who Am I?",
    summary:
      locale === "vi"
        ? "Tôi là Huy, một kỹ sư phần mềm chuyên về hệ thông Angular."
        : "I am an Angular Frontend Systems Engineer based in Vietnam. You can call me Jack.",
    about: site.about,
    contactEmail: site.contactEmail,
    nonFitCriteria: site.nonFitCriteria,
    cta: {
      href: localizeHref(locale, "/contact?context=about"),
      label: locale === "vi" ? "Yêu cầu audit" : "Request an audit"
    }
  };
});

export const loadAboutPage = loadAboutPageFromRepository(astroContentRepository);
