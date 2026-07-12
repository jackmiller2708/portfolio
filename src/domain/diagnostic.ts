export type DiagnosticOption = {
  readonly id: string;
  readonly label: string;
  readonly hint: string;
  readonly pain: string;
  readonly recommendedService: {
    readonly id: string;
    readonly title: string;
    readonly href: string;
  };
  readonly auditFinding: {
    readonly id: string;
    readonly title: string;
    readonly href: string;
  };
  readonly systemMapState: "messy" | "explicit";
  readonly referenceHref: string;
  readonly cta: {
    readonly label: string;
    readonly href: string;
  };
};

export type DiagnosticOptionSeed = {
  readonly id: string;
  readonly label: string;
  readonly hint: string;
  readonly pain: string;
  readonly serviceId: string;
  readonly auditFindingId: string;
  readonly systemMapState: DiagnosticOption["systemMapState"];
  readonly ctaLabel: string;
};
