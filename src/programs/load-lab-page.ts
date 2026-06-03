import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";

export const loadLabPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const posts = yield* repository.listLabPosts;

    return {
      title: "Technical Lab",
      summary:
        "Notes from the work. Things worth writing down because they are not obvious until you have seen the failure mode they prevent.",
      posts
    };
  });

export const loadLabPage = loadLabPageFromRepository(astroContentRepository);
