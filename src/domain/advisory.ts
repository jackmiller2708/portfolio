export type AdvisoryRecommendation = {
  readonly id: string;
  readonly label: string;
  readonly pain: string;
  readonly recommendedServiceId: string;
  readonly recommendedServiceTitle: string;
  readonly reason: string;
  readonly contactHref: string;
};
