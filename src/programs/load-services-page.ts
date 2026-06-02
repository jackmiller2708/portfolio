import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import { loadHomePageFromRepository } from "./load-home-page";

export const loadServicesPage = Effect.map(
  loadHomePageFromRepository(astroContentRepository),
  (home) => ({
    title: "Services",
    summary:
      "Scoped frontend architecture services for Angular teams that need clearer boundaries and safer delivery.",
    services: home.services
  })
);
