import { Effect, Schema } from "effect";
import type {
  ContactDeliveryError,
  ContactValidationError,
  SpamProtectionError
} from "@domain/errors";
import type { ContactFit, ContactInquiry, ContactSubmissionResult } from "@domain/contact";
import { ContactInquirySchema } from "@schemas/contact.schema";

export type ContactWorkflowDeps = {
  readonly checkSpam: (inquiry: ContactInquiry) => Effect.Effect<boolean, SpamProtectionError>;
  readonly deliver: (inquiry: ContactInquiry) => Effect.Effect<void, ContactDeliveryError>;
};

export const previewContactWorkflowDeps: ContactWorkflowDeps = {
  checkSpam: () => Effect.succeed(false),
  deliver: () => Effect.void
};

const decodeInquiry = (input: unknown): Effect.Effect<ContactInquiry, ContactValidationError> =>
  Effect.try({
    try: () => Schema.decodeUnknownSync(ContactInquirySchema)(input) as ContactInquiry,
    catch: () =>
      ({
        _tag: "ContactValidationError",
        message: "Contact inquiry has invalid or missing fields."
      }) satisfies ContactValidationError
  });

const classifyInquiry = (inquiry: ContactInquiry): ContactFit => {
  const pain = inquiry.pain.toLowerCase();
  const context = inquiry.productContext.toLowerCase();
  const mentionsAngular = context.includes("angular") || inquiry.angularVersion.length > 0;
  const hasSystemPain =
    pain.includes("state") ||
    pain.includes("architecture") ||
    pain.includes("error") ||
    pain.includes("refactor");

  if (mentionsAngular && hasSystemPain) {
    return "good-fit";
  }

  if (mentionsAngular) {
    return "possible-fit";
  }

  return "not-fit";
};

export const submitContactIntake = (
  input: unknown,
  deps: ContactWorkflowDeps = previewContactWorkflowDeps
): Effect.Effect<
  ContactSubmissionResult,
  ContactValidationError | ContactDeliveryError | SpamProtectionError
> =>
  Effect.gen(function* () {
    const inquiry = yield* decodeInquiry(input);
    const isSpam = yield* deps.checkSpam(inquiry);

    if (isSpam) {
      return yield* Effect.fail({
        _tag: "SpamProtectionError",
        message: "Contact inquiry could not be accepted."
      } satisfies SpamProtectionError);
    }

    yield* deps.deliver(inquiry);

    return {
      fit: classifyInquiry(inquiry),
      message: "Inquiry received. The next response can focus on the system context."
    };
  });
