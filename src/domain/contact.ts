export type EngagementType = "diagnosis" | "implementation" | "advisory" | "unsure";

export type ContactInquiry = {
  readonly name: string;
  readonly email: string;
  readonly productContext: string;
  readonly angularVersion: string;
  readonly teamSize: string;
  readonly pain: string;
  readonly engagementType: EngagementType;
  readonly timeline: string;
  readonly budgetComfort: string;
  readonly consent: boolean;
};

export type ContactFit = "good-fit" | "possible-fit" | "not-fit";

export type ContactSubmissionResult = {
  readonly fit: ContactFit;
  readonly message: string;
};
