import type {
  ContactDeliveryError,
  ContactValidationError,
  SpamProtectionError
} from "@domain/errors";

export type ContactIntakeState =
  | {
      readonly kind: "initial";
      readonly message: string;
    }
  | {
      readonly kind: "submitting";
      readonly message: string;
    }
  | {
      readonly kind: "success";
      readonly message: string;
    }
  | {
      readonly kind: "validation";
      readonly message: string;
      readonly summary: readonly string[];
    }
  | {
      readonly kind: "blocked";
      readonly message: string;
    }
  | {
      readonly kind: "delivery";
      readonly message: string;
    };

type ContactFailure = ContactValidationError | SpamProtectionError | ContactDeliveryError;

export const initialContactState: Extract<ContactIntakeState, { readonly kind: "initial" }> = {
  kind: "initial",
  message: "Complete the diagnostic fields and include enough context for a useful first response."
};

export const submittingContactState: Extract<ContactIntakeState, { readonly kind: "submitting" }> =
  {
    kind: "submitting",
    message: "Submitting inquiry. Form values stay available while the request is processed."
  };

export const successContactState = (message: string): ContactIntakeState => ({
  kind: "success",
  message
});

export const contactStateFromFailure = (error: ContactFailure): ContactIntakeState => {
  if (error._tag === "ContactValidationError") {
    return {
      kind: "validation",
      message: "Some required fields need attention before this inquiry can be sent.",
      summary: [error.message]
    };
  }

  if (error._tag === "SpamProtectionError") {
    return {
      kind: "blocked",
      message:
        "This inquiry could not be accepted. Use the direct email fallback if this is a legitimate request."
    };
  }

  return {
    kind: "delivery",
    message:
      "The inquiry could not be delivered right now. Try again or use the direct email fallback."
  };
};
