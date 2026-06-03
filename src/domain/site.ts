export type SiteMeta = {
  readonly title: string;
  readonly description: string;
  readonly siteUrl: string;
  readonly ogImage: string;
  readonly availability: string;
  readonly contactEmail: string;
  readonly credibilityPoints: readonly {
    readonly label: string;
    readonly value: string;
    readonly detail: string;
  }[];
  readonly nonFitCriteria: readonly string[];
  readonly about: {
    readonly context: string;
    readonly workingStyle: readonly string[];
    readonly qualityPhilosophy: readonly string[];
    readonly communication: string;
  };
};

export type PageSeoInput = {
  readonly title?: string;
  readonly description?: string;
  readonly path: string;
  readonly ogImage?: string;
};

export type PageSeo = {
  readonly title: string;
  readonly description: string;
  readonly canonicalUrl: string;
  readonly ogTitle: string;
  readonly ogDescription: string;
  readonly ogImage: string;
  readonly ogUrl: string;
};
