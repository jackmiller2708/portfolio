import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadLabPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const posts = yield* repository.listLabPosts;

    return {
      title: "Technical Lab",
      summary:
        "Notes on Angular, RxJS, TypeScript, and frontend architecture decisions that are easy to miss until a system starts failing around them.",
      posts
    };
  });

export const loadLabPage = loadLabPageFromRepository(astroContentRepository);
