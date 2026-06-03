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
        "I keep my contractor work intentionally narrow: Angular audits, refactor sprints, and architecture advisory for teams dealing with frontend complexity.",
      services,
      nonFitCriteria: site.nonFitCriteria,
      firstStep: {
        title: "The first step is usually a scoped Angular audit.",
        summary:
          "Send the product context, Angular version, team size, current pain, timeline, and constraints. I will use that to confirm whether the next move should be audit, stabilization, advisory, or no-fit.",
        href: "/contact?context=services",
        label: "Request an Angular audit"
      }
    };
  });

export const loadServicesPage = loadServicesPageFromRepository(astroContentRepository);
