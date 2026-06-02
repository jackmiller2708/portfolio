export type RedactionStatus = "public" | "redacted" | "synthetic";

export type CaseStudy = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly redactionStatus: RedactionStatus;
  readonly context: string;
  readonly constraints: readonly string[];
  readonly problem: string;
  readonly decisions: readonly {
    readonly title: string;
    readonly rationale: string;
  }[];
  readonly tradeoffs: readonly string[];
  readonly beforeAfter: {
    readonly before: readonly string[];
    readonly after: readonly string[];
  };
  readonly evidence: readonly {
    readonly label: string;
    readonly detail: string;
  }[];
  readonly result: string;
  readonly recommendation: string;
};
