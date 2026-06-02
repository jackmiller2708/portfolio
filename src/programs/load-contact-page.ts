import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadContactPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const site = yield* repository.getSiteMeta;

    return {
      title: "Start with a scoped engineering diagnostic.",
      summary:
        "Share the product context, Angular version, team shape, current pain, timeline, and budget comfort so the first response can be useful.",
      availability: site.availability,
      contactEmail: site.contactEmail
    };
  });

export const loadContactPage = loadContactPageFromRepository(astroContentRepository);
