import { Effect } from "effect";
import type { ServiceOffer } from "@domain/service";
import type { ContentRepository } from "@services/ContentRepository";

export type HomePageViewModel = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly summary: string;
  };
  readonly services: readonly ServiceOffer[];
};

export const loadHomePageFromRepository = (
  repository: ContentRepository
): Effect.Effect<HomePageViewModel> =>
  Effect.gen(function* () {
    const services = yield* repository.listServices;

    return {
      hero: {
        eyebrow: "Angular Frontend Systems Engineer",
        title: "I make complex frontend systems explicit, safer, and easier to evolve.",
        summary:
          "Architecture audits, refactors, and stabilization work for Angular teams dealing with unclear state, data flow, ownership, and errors."
      },
      services
    };
  });
