import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";
import {
  buildAuditWalkthrough,
  buildRiskMatrix,
  buildSprintRoadmap,
  groupFindingsBySeverity
} from "@utils/audit-view";
import type { Locale } from "@domain/site";
import { localizeFindings, localizeHref } from "@i18n/content";
import { defaultLocale } from "@i18n/locales";

export const loadSampleAuditPageFromRepository = (
  repository: ContentRepository,
  locale: Locale = defaultLocale
) =>
  Effect.gen(function* () {
    const findings = localizeFindings(yield* repository.listAuditFindings, locale);
    const roadmap = buildSprintRoadmap(findings);

    return {
      title: locale === "vi" ? "Mẫu audit" : "Sample Audit",
      summary:
        locale === "vi"
          ? "Một ví dụ privacy-safe về cách review hệ thống frontend Angular nối triệu chứng, rủi ro, và bước tiếp theo."
          : "A privacy-safe example of how an Angular frontend systems review connects symptoms, risk, and next steps.",
      findings,
      severityGroups: groupFindingsBySeverity(findings),
      riskMatrix: buildRiskMatrix(findings),
      roadmap,
      walkthrough: buildAuditWalkthrough(findings, roadmap),
      cta: {
        title:
          locale === "vi"
            ? "Muốn review theo cấu trúc này trên hệ thống của bạn?"
            : "Want this shape of review on your system?",
        summary:
          locale === "vi"
            ? "Dùng form liên hệ để mô tả sản phẩm, phiên bản Angular, rủi ro hiện tại, và constraint cho một scoped audit."
            : "Use the contact form to describe the product, Angular version, current risk, and constraints for a scoped audit.",
        href: localizeHref(locale, "/contact?context=sample-audit"),
        label: locale === "vi" ? "Yêu cầu audit tương tự" : "Request a similar audit"
      }
    };
  });

export const loadSampleAuditPage = (locale: Locale = defaultLocale) =>
  loadSampleAuditPageFromRepository(astroContentRepository, locale);
