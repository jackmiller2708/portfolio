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
        "Scoped frontend architecture work for Angular teams dealing with blurred boundaries, brittle flows, and delivery risk.",
      services,
      nonFitCriteria: site.nonFitCriteria,
      firstStep: {
        title: "The first step is a narrow diagnostic.",
        summary:
          "Send the product context, system pain, timeline, and constraints. The first reply can confirm fit before any larger commitment.",
        href: "/contact?context=services",
        label: "Start a diagnostic"
      }
    };
  });

export const loadServicesPage = loadServicesPageFromRepository(astroContentRepository);
