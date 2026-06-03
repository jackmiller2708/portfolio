import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadAboutPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const site = yield* repository.getSiteMeta;

    return {
      title: "About",
      summary: "A practical view of frontend architecture under real delivery constraints.",
      about: site.about,
      contactEmail: site.contactEmail,
      nonFitCriteria: site.nonFitCriteria,
      cta: {
        href: "/contact?context=about",
        label: "Start a diagnostic"
      }
    };
  });

export const loadAboutPage = loadAboutPageFromRepository(astroContentRepository);
