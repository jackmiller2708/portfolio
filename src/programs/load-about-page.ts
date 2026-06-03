import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadAboutPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const site = yield* repository.getSiteMeta;

    return {
      title: "About Nguyen Ngoc Huy",
      summary:
        "I am an Angular Frontend Systems Engineer based in Vietnam. English-speaking teams can call me Jack.",
      about: site.about,
      contactEmail: site.contactEmail,
      nonFitCriteria: site.nonFitCriteria,
      cta: {
        href: "/contact?context=about",
        label: "Request an audit"
      }
    };
  });

export const loadAboutPage = loadAboutPageFromRepository(astroContentRepository);
