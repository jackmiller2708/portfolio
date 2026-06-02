import { Effect } from "effect";
import { loadHomePage } from "./load-home-page";

export const loadServicesPage = Effect.map(loadHomePage, (home) => ({
  title: "Services",
  summary:
    "Scoped frontend architecture services for Angular teams that need clearer boundaries and safer delivery.",
  services: home.services
}));
