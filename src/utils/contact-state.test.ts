import { describe, expect, it } from "vitest";
import { contactStateFromFailure, successContactState } from "./contact-state";

describe("contact state mapping", () => {
  it("maps validation failures to summarized validation state", () => {
    const state = contactStateFromFailure({
      _tag: "ContactValidationError",
      message: "Invalid email."
    });

    expect(state.kind).toBe("validation");
    expect(state.message).toContain("required fields");
  });

  it("maps success messages", () => {
    expect(successContactState("Received.")).toEqual({
      kind: "success",
      message: "Received."
    });
  });
});
