import { describe, expect, it } from "vitest";
import { findAssetBudgetIssues } from "./asset-budget";

describe("asset budget", () => {
  it("passes when assets stay within budget", () => {
    expect(
      findAssetBudgetIssues({
        clientAssets: [{ route: "all routes", bytes: 1024 }],
        ogAssets: [{ path: "public/og/home.svg", bytes: 1024 }]
      })
    ).toEqual([]);
  });

  it("reports oversized client and OG assets", () => {
    const issues = findAssetBudgetIssues({
      clientAssets: [{ route: "all routes", bytes: 46 * 1024 }],
      ogAssets: [{ path: "public/og/large.svg", bytes: 151 * 1024 }]
    });

    expect(issues).toHaveLength(3);
  });
});
