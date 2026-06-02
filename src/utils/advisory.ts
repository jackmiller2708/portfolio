import type { AdvisoryRecommendation } from "@domain/advisory";
import type { ServiceOffer } from "@domain/service";

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

const fallbackService = (services: readonly ServiceOffer[], serviceId: string) =>
  services.find((service) => service.id === serviceId) ?? services[0];

export const buildAdvisoryRecommendations = (
  services: readonly ServiceOffer[]
): readonly AdvisoryRecommendation[] =>
  seeds.map((seed) => {
    const service = fallbackService(services, seed.recommendedServiceId);

    return {
      id: seed.id,
      label: seed.label,
      pain: seed.pain,
      recommendedServiceId: service?.id ?? seed.recommendedServiceId,
      recommendedServiceTitle: service?.title ?? "Angular System Audit",
      reason: seed.reason,
      contactHref: `/contact?advisory=${seed.id}&service=${service?.id ?? seed.recommendedServiceId}`
    };
  });
