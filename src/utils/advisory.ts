import type { AdvisoryRecommendation } from "@domain/advisory";
import type { Locale } from "@domain/site";
import type { ServiceOffer } from "@domain/service";
import { localizeHref } from "@i18n/content";

type AdvisorySeed = {
  readonly id: string;
  readonly label: string;
  readonly pain: string;
  readonly recommendedServiceId: string;
  readonly reason: string;
};

const seeds: readonly AdvisorySeed[] = [
  {
    id: "unclear-state",
    label: "Unclear state",
    pain: "State ownership is spread across components, services, and route effects.",
    recommendedServiceId: "angular-system-audit",
    reason: "Start with an audit that names state owners and the riskiest transition points."
  },
  {
    id: "cache-data",
    label: "Cache and data behavior",
    pain: "Screens disagree because cache rules and refresh timing are implicit.",
    recommendedServiceId: "frontend-stabilization",
    reason: "Stabilization can make data ownership, invalidation, and stale UI states explicit."
  },
  {
    id: "error-recovery",
    label: "Weak error recovery",
    pain: "Failures reach users without a named recovery path.",
    recommendedServiceId: "frontend-stabilization",
    reason: "Stabilization work can define recovery states before larger feature changes."
  },
  {
    id: "refactor-planning",
    label: "Refactor planning",
    pain: "The team knows the system needs change but lacks a low-risk sequence.",
    recommendedServiceId: "architecture-advisory",
    reason: "Advisory work can sequence the refactor around constraints and visible risk."
  },
  {
    id: "unsure",
    label: "Unsure",
    pain: "The risk is visible, but the first scope is not obvious yet.",
    recommendedServiceId: "angular-system-audit",
    reason: "A diagnostic audit is the safest first step when the right engagement is unclear."
  }
];

const viSeeds: Record<string, Pick<AdvisorySeed, "label" | "pain" | "reason">> = {
  "unclear-state": {
    label: "State không rõ owner",
    pain: "State ownership bị rải qua component, service, và route effect.",
    reason: "Bắt đầu bằng audit để đặt tên owner state và các transition rủi ro nhất."
  },
  "cache-data": {
    label: "Cache và data behavior",
    pain: "Các màn hình không khớp vì cache rule và refresh timing còn ẩn.",
    reason: "Stabilization có thể làm rõ data ownership, invalidation, và stale UI state."
  },
  "error-recovery": {
    label: "Error recovery yếu",
    pain: "Failure tới người dùng mà không có recovery path được đặt tên.",
    reason: "Stabilization có thể định nghĩa recovery state trước các thay đổi feature lớn hơn."
  },
  "refactor-planning": {
    label: "Kế hoạch refactor",
    pain: "Đội biết hệ thống cần thay đổi nhưng thiếu chuỗi thực hiện ít rủi ro.",
    reason: "Advisory có thể sequence refactor quanh constraint và rủi ro nhìn thấy được."
  },
  unsure: {
    label: "Chưa chắc",
    pain: "Rủi ro đã thấy, nhưng scope đầu tiên chưa rõ.",
    reason: "Audit diagnostic là bước đầu an toàn nhất khi engagement phù hợp chưa rõ."
  }
};

const fallbackService = (services: readonly ServiceOffer[], serviceId: string) =>
  services.find((service) => service.id === serviceId) ?? services[0];

export const buildAdvisoryRecommendations = (
  services: readonly ServiceOffer[],
  locale: Locale = "en"
): readonly AdvisoryRecommendation[] =>
  seeds.map((seed) => {
    const localizedSeed = locale === "vi" ? { ...seed, ...viSeeds[seed.id] } : seed;
    const service = fallbackService(services, seed.recommendedServiceId);

    return {
      id: seed.id,
      label: localizedSeed.label,
      pain: localizedSeed.pain,
      recommendedServiceId: service?.id ?? seed.recommendedServiceId,
      recommendedServiceTitle:
        service?.title ?? (locale === "vi" ? "Audit hệ thống Angular" : "Angular System Audit"),
      reason: localizedSeed.reason,
      contactHref: localizeHref(
        locale,
        `/contact?advisory=${seed.id}&service=${service?.id ?? seed.recommendedServiceId}`
      )
    };
  });
