export type RedactionStatus = "public" | "redacted" | "synthetic";

export type CaseStudy = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly redactionStatus: RedactionStatus;
};
