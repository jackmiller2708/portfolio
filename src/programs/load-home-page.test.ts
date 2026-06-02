import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import { loadHomePage } from "./load-home-page";

describe("loadHomePage", () => {
  it("returns hero positioning and service offers", async () => {
    const viewModel = await Effect.runPromise(loadHomePage);

    expect(viewModel.hero.title).toContain("frontend systems");
    expect(viewModel.services).toHaveLength(3);
  });
});
