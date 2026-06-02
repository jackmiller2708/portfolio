import { test, expect } from "@playwright/test";

test.describe("System Map", () => {
  test("supports state toggle and hotspot detail updates", async ({ page }) => {
    await page.goto("/");

    const map = page.locator("[data-system-map]").first();
    await expect(map).toBeVisible();

    await map.getByRole("button", { name: "Bounded" }).click();
    await expect(map.locator("[data-state-copy='explicit']")).toBeVisible();

    await map.getByRole("button", { name: /Feature boundary/ }).click();
    await expect(map.locator("[data-map-details]")).toContainText(/Risk hotspot|Decision overlay/);
  });

  test("captures desktop and mobile map screenshots", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await expect(page.locator("[data-system-map]").first()).toBeVisible();
    await page.locator("[data-system-map]").first().screenshot({
      path: "test-results/system-map-desktop.png"
    });

    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    await expect(page.locator("[data-system-map]").first()).toBeVisible();
    await page.locator("[data-system-map]").first().screenshot({
      path: "test-results/system-map-mobile.png"
    });
  });
});
