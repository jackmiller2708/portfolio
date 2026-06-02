import { Effect } from "effect";
import type { ContentRepository } from "@services/ContentRepository";

export const loadSystemMapFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    return yield* repository.getSystemMap;
  });

export const loadSystemMap = Effect.gen(function* () {
  const { astroContentRepository } = yield* Effect.promise(
    async () => await import("@services/AstroContentRepository")
  );

  return yield* loadSystemMapFromRepository(astroContentRepository);
});
