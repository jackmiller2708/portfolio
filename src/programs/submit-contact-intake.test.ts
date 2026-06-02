import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import { submitContactIntake, type ContactWorkflowDeps } from "./submit-contact-intake";

const validInput = {
  name: "Jane Lead",
  email: "jane@example.com",
  productContext: "Angular SaaS product",
  angularVersion: "17",
  teamSize: "6 engineers",
  pain: "State ownership and error handling are unclear in critical flows.",
  engagementType: "diagnosis",
  timeline: "this quarter",
  budgetComfort: "not sure",
  consent: true
} as const;

describe("submitContactIntake", () => {
  it("classifies and delivers a valid inquiry", async () => {
    const result = await Effect.runPromise(submitContactIntake(validInput));

    expect(result.fit).toBe("good-fit");
  });

  it("fails invalid input as a validation error", async () => {
    const result = await Effect.runPromiseExit(
      submitContactIntake({
        ...validInput,
        email: "invalid",
        consent: false
      })
    );

    expect(result._tag).toBe("Failure");
  });

  it("fails suspicious input through spam protection", async () => {
    const deps: ContactWorkflowDeps = {
      checkSpam: () =>
        Effect.fail({
          _tag: "SpamProtectionError",
          message: "blocked"
        }),
      deliver: () => Effect.void
    };
    const result = await Effect.runPromiseExit(submitContactIntake(validInput, deps));

    expect(result._tag).toBe("Failure");
  });
});
