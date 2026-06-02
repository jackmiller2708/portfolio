import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadServicesPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const services = yield* repository.listServices;
    const site = yield* repository.getSiteMeta;

    return {
      title: "Services",
      summary:
        "Scoped frontend architecture services for Angular teams that need clearer boundaries and safer delivery.",
      services,
      nonFitCriteria: site.nonFitCriteria,
      firstStep: {
        title: "The first step is a narrow diagnostic.",
        summary:
          "Send the product context, system pain, timeline, and constraints. The reply can confirm fit before any larger commitment.",
        href: "/contact?context=services",
        label: "Start with contact"
      }
    };
  });

export const loadServicesPage = loadServicesPageFromRepository(astroContentRepository);
