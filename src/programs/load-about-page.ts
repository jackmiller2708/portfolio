import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadAboutPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const site = yield* repository.getSiteMeta;

    return {
      title: "About",
      summary:
        "Professional context, working style, and quality philosophy for frontend systems work.",
      about: site.about,
      contactEmail: site.contactEmail,
      cta: {
        href: "/contact?context=about",
        label: "Start a diagnostic"
      }
    };
  });

export const loadAboutPage = loadAboutPageFromRepository(astroContentRepository);
