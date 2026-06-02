import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadLabPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const posts = yield* repository.listLabPosts;

    return {
      title: "Technical Lab",
      summary: "Focused notes on Angular, RxJS, TypeScript, and architecture decisions.",
      posts
    };
  });

export const loadLabPage = loadLabPageFromRepository(astroContentRepository);
