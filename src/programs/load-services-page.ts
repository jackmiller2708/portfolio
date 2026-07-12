import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";
import type { Locale } from "@domain/site";
import { localizeHref, localizeServices, localizeSiteMeta } from "@i18n/content";
import { defaultLocale } from "@i18n/locales";

export const loadServicesPageFromRepository = (
  repository: ContentRepository,
  locale: Locale = defaultLocale
) =>
  Effect.gen(function* () {
    const services = localizeServices(yield* repository.listServices, locale);
    const site = localizeSiteMeta(yield* repository.getSiteMeta, locale);

    return {
      title: locale === "vi" ? "Dịch vụ" : "Services",
      summary:
        locale === "vi"
          ? "Tôi giữ phạm vi contractor có chủ đích hẹp: audit Angular, refactor sprint, và advisory kiến trúc cho các đội đang gặp độ phức tạp frontend."
          : "I keep my contractor work intentionally narrow: Angular audits, refactor sprints, and architecture advisory for teams dealing with frontend complexity.",
      services,
      nonFitCriteria: site.nonFitCriteria,
      firstStep: {
        title:
          locale === "vi"
            ? "Bước đầu thường là một audit Angular có phạm vi rõ."
            : "The first step is usually a scoped Angular audit.",
        summary:
          locale === "vi"
            ? "Gửi ngữ cảnh sản phẩm, phiên bản Angular, quy mô đội, điểm đau hiện tại, timeline, và constraint. Tôi sẽ dùng thông tin đó để xác nhận bước tiếp theo nên là audit, stabilization, advisory, hay no-fit."
            : "Send the product context, Angular version, team size, current pain, timeline, and constraints. I will use that to confirm whether the next move should be audit, stabilization, advisory, or no-fit.",
        href: localizeHref(locale, "/contact?context=services"),
        label: locale === "vi" ? "Yêu cầu audit Angular" : "Request an Angular audit"
      }
    };
  });

export const loadServicesPage = loadServicesPageFromRepository(astroContentRepository);
