import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";
import type { Locale } from "@domain/site";
import { localizeLabPosts } from "@i18n/content";
import { defaultLocale } from "@i18n/locales";

export const loadLabPageFromRepository = (
  repository: ContentRepository,
  locale: Locale = defaultLocale
) =>
  Effect.gen(function* () {
    const posts = localizeLabPosts(yield* repository.listLabPosts, locale);

    return {
      title: locale === "vi" ? "Technical Lab" : "Technical Lab",
      summary:
        locale === "vi"
          ? "Ghi chú về Angular, RxJS, TypeScript, và các quyết định kiến trúc frontend dễ bị bỏ qua cho đến khi hệ thống bắt đầu hỏng quanh chúng."
          : "Notes on Angular, RxJS, TypeScript, and frontend architecture decisions that are easy to miss until a system starts failing around them.",
      posts
    };
  });

export const loadLabPage = loadLabPageFromRepository(astroContentRepository);
