import { Effect } from "effect";
import type { AuditFinding } from "@domain/audit";
import type { LabPost } from "@domain/lab";
import type { ServiceOffer } from "@domain/service";
import type { Locale, SiteMeta } from "@domain/site";
import type { SystemMap } from "@domain/system-map";
import type { CaseStudy } from "@domain/case-study";
import type { DiagnosticOption, DiagnosticOptionSeed } from "@domain/diagnostic";
import type { ContentRepository } from "@services/ContentRepository";
import {
  localizeCaseStudies,
  localizeFindings,
  localizeHref,
  localizeLabPosts,
  localizeServices,
  localizeSiteMeta,
  localizeSystemMap
} from "@i18n/content";
import { defaultLocale, localePath } from "@i18n/locales";

const diagnosticSeeds: readonly DiagnosticOptionSeed[] = [
  {
    id: "unclear-state",
    label: "Unclear state",
    hint: "No single owner for state",
    pain: "Ownership is spread across components, services, and route effects.",
    serviceId: "angular-system-audit",
    auditFindingId: "implicit-state",
    systemMapState: "messy",
    ctaLabel: "Start with state"
  },
  {
    id: "cache-data",
    label: "Cache and data behavior",
    hint: "Screens disagree with each other",
    pain: "Screens disagree because cache rules, refresh timing, and API state are implicit.",
    serviceId: "frontend-stabilization",
    auditFindingId: "cache-semantics",
    systemMapState: "explicit",
    ctaLabel: "Discuss data flow"
  },
  {
    id: "error-recovery",
    label: "Weak error recovery",
    hint: "Failures reach users silently",
    pain: "Failures reach users without a named recovery path or testable fallback.",
    serviceId: "frontend-stabilization",
    auditFindingId: "unhandled-errors",
    systemMapState: "explicit",
    ctaLabel: "Review recovery paths"
  },
  {
    id: "refactor-planning",
    label: "Refactor planning",
    hint: "No low-risk sequence yet",
    pain: "The team knows the system needs change but lacks a low-risk sequence.",
    serviceId: "architecture-advisory",
    auditFindingId: "implicit-state",
    systemMapState: "explicit",
    ctaLabel: "Plan the sequence"
  }
];

const diagnosticVi: Record<
  string,
  Pick<DiagnosticOptionSeed, "label" | "hint" | "pain" | "ctaLabel">
> = {
  "unclear-state": {
    label: "State không rõ owner",
    hint: "Không ai sở hữu state",
    pain: "Ownership bị rải qua component, service, và route effect.",
    ctaLabel: "Bắt đầu với state"
  },
  "cache-data": {
    label: "Cache và data behavior",
    hint: "Các màn hình không khớp nhau",
    pain: "Các màn hình không khớp vì cache rule, refresh timing, và API state còn ẩn.",
    ctaLabel: "Trao đổi data flow"
  },
  "error-recovery": {
    label: "Error recovery yếu",
    hint: "Failure tới thẳng người dùng",
    pain: "Failure tới người dùng mà không có recovery path được đặt tên hoặc fallback có thể test.",
    ctaLabel: "Review recovery path"
  },
  "refactor-planning": {
    label: "Kế hoạch refactor",
    hint: "Chưa có chuỗi an toàn",
    pain: "Đội biết hệ thống cần thay đổi nhưng thiếu chuỗi thực hiện ít rủi ro.",
    ctaLabel: "Lên sequence"
  }
};

const findById = <Value extends { readonly id: string }>(
  values: readonly Value[],
  id: string
): Value | undefined => values.find((value) => value.id === id);

const buildDiagnostics = (
  services: readonly ServiceOffer[],
  auditFindings: readonly AuditFinding[],
  locale: Locale
): readonly DiagnosticOption[] =>
  diagnosticSeeds.map((seed) => {
    const localizedSeed = locale === "vi" ? { ...seed, ...diagnosticVi[seed.id] } : seed;
    const service = findById(services, seed.serviceId) ?? services[0];
    const finding = findById(auditFindings, seed.auditFindingId) ?? auditFindings[0];

    return {
      id: seed.id,
      label: localizedSeed.label,
      hint: localizedSeed.hint,
      pain: localizedSeed.pain,
      recommendedService: {
        id: service?.id ?? seed.serviceId,
        title:
          service?.title ??
          (locale === "vi" ? "Audit hệ thống frontend" : "Frontend systems diagnostic"),
        href: localizeHref(locale, service ? `/services#${service.id}` : "/services")
      },
      auditFinding: {
        id: finding?.id ?? seed.auditFindingId,
        title: finding?.title ?? (locale === "vi" ? "Phát hiện audit mẫu" : "Sample audit finding"),
        href: localizeHref(locale, finding ? `/sample-audit#${finding.id}` : "/sample-audit")
      },
      systemMapState: seed.systemMapState,
      referenceHref: localizeHref(
        locale,
        finding ? `/sample-audit#${finding.id}` : "/sample-audit"
      ),
      cta: {
        label: localizedSeed.ctaLabel,
        href: localizeHref(locale, `/contact?diagnostic=${seed.id}`)
      }
    };
  });

const buildReferenceCards = (caseStudies: readonly CaseStudy[], locale: Locale) =>
  caseStudies.slice(0, 2).map((caseStudy) => ({
    slug: caseStudy.slug,
    title: caseStudy.title,
    problem: caseStudy.problem,
    decision: caseStudy.decisions[0]?.title ?? "Make the system boundary explicit",
    result: caseStudy.result,
    href: localePath(locale, `/case-studies/${caseStudy.slug}`)
  }));

export type HomePageViewModel = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly summary: string;
  };
  readonly credibilityPoints: SiteMeta["credibilityPoints"];
  readonly services: readonly ServiceOffer[];
  readonly auditPreview: {
    readonly summary: string;
    readonly findings: readonly AuditFinding[];
  };
  readonly diagnostics: readonly DiagnosticOption[];
  readonly explorationStrip: readonly {
    readonly label: string;
    readonly href: string;
  }[];
  readonly referenceCards: ReturnType<typeof buildReferenceCards>;
  readonly labPreview: readonly LabPost[];
  readonly heroMap: SystemMap;
  readonly cta: {
    readonly title: string;
    readonly summary: string;
    readonly href: string;
    readonly label: string;
  };
};

export const loadHomePageFromRepository = (
  repository: ContentRepository,
  locale: Locale = defaultLocale
): Effect.Effect<HomePageViewModel> =>
  Effect.gen(function* () {
    const site = localizeSiteMeta(yield* repository.getSiteMeta, locale);
    const services = localizeServices(yield* repository.listServices, locale);
    const auditFindings = localizeFindings(yield* repository.listAuditFindings, locale);
    const labPosts = localizeLabPosts(yield* repository.listLabPosts, locale);
    const caseStudies = localizeCaseStudies(yield* repository.listCaseStudies, locale);
    const systemMap = localizeSystemMap(yield* repository.getSystemMap, locale);

    return {
      hero: {
        eyebrow:
          locale === "vi"
            ? "Nguyen Ngoc Huy / Jack · Angular Frontend Systems Engineer · Việt Nam"
            : "Nguyen Ngoc Huy / Jack · Angular Frontend Systems Engineer · Vietnam",
        title:
          locale === "vi"
            ? "Hệ thống Angular phức tạp,\nđược làm rõ."
            : "Complex Angular systems,\nmade explicit.",
        summary:
          locale === "vi"
            ? "Tôi giúp các đội audit, refactor, và ổn định ứng dụng Angular khi state ownership, RxJS flow, data access, và error handling đã trở nên tốn kém để thay đổi."
            : "I help teams audit, refactor, and stabilize Angular applications where state ownership, RxJS flows, data access, and error handling have become expensive to change."
      },
      credibilityPoints: site.credibilityPoints,
      services: services.slice(0, 3),
      auditPreview: {
        summary:
          locale === "vi"
            ? "Một mẫu review: dấu hiệu quan sát được, rủi ro hệ thống, và đề xuất có sequence."
            : "A sample of the review shape: observable evidence, system risk, and a sequenced recommendation.",
        findings: auditFindings.slice(0, 2)
      },
      diagnostics: buildDiagnostics(services, auditFindings, locale),
      explorationStrip: [
        { label: locale === "vi" ? "Bản đồ hệ thống" : "System map", href: "#system-map" },
        { label: locale === "vi" ? "Công việc cũ" : "Past work", href: "#past-work" },
        {
          label: locale === "vi" ? "Phát hiện audit" : "Audit findings",
          href: localePath(locale, "/sample-audit")
        },
        { label: locale === "vi" ? "Ghi chú lab" : "Lab notes", href: localePath(locale, "/lab") }
      ],
      referenceCards: buildReferenceCards(caseStudies, locale),
      labPreview: labPosts.slice(0, 2),
      heroMap: systemMap,
      cta: {
        title:
          locale === "vi"
            ? "Yêu cầu audit frontend Angular."
            : "Request an Angular frontend audit.",
        summary:
          locale === "vi"
            ? "Gửi ngữ cảnh sản phẩm, phiên bản Angular, quy mô đội, điểm đau hiện tại, và timeline. Tôi sẽ dùng thông tin đó để xác định bước đầu hợp lý là audit, stabilization sprint, advisory, hay no-fit."
            : "Send the product context, Angular version, team size, current pain, and timeline. I will use that to decide whether the right first step is an audit, stabilization sprint, advisory session, or no-fit.",
        href: localePath(locale, "/contact"),
        label: locale === "vi" ? "Yêu cầu audit Angular" : "Request an Angular audit"
      }
    };
  });
