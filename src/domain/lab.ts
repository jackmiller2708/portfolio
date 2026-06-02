export type LabTopic = "Angular" | "RxJS" | "TypeScript" | "Architecture";

export type LabPost = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly topic: LabTopic;
  readonly takeaway: string;
  readonly codeLanguage?: string;
  readonly relatedServices?: readonly string[];
};
