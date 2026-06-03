import { test, expect, type Page } from "@playwright/test";

test.describe("System Map", () => {
  const scrollToMap = async (page: Page) => {
    await page
      .locator("[data-system-map]")
      .first()
      .evaluate((element) => {
        element.scrollIntoView({ block: "center" });
      });
  };

  test("supports state toggle and hotspot detail updates", async ({ page }) => {
    await page.goto("/");

    const map = page.locator("[data-system-map]").first();
    await expect(map).toBeVisible();
    await expect(map.locator("canvas[data-map-canvas]")).toBeVisible();
    await scrollToMap(page);
    await expect(map).toHaveAttribute("data-three-map-ready", "true");

    await map.getByRole("button", { name: "Bounded" }).click();
    await expect(map.locator("[data-state-copy='explicit']")).toBeVisible();

    await map.getByRole("button", { name: /Feature boundary/ }).click();
    await expect(map.locator("[data-map-details]")).toContainText(/Risk hotspot|Decision overlay/);
  });

  test("uses distinct messy and bounded node layouts", async ({ page }) => {
    await page.goto("/");

    const map = page.locator("[data-system-map]").first();
    await scrollToMap(page);
    await expect(map).toHaveAttribute("data-three-map-ready", "true");
    const boundaryNode = map.locator("[data-node-id='feature-boundary']");
    const roadmapNode = map.locator("[data-node-id='roadmap']");
    await expect(boundaryNode).toBeVisible();

    const messyBoundary = await boundaryNode.boundingBox();
    const messyRoadmap = await roadmapNode.boundingBox();

    await map.getByRole("button", { name: "Bounded" }).click();
    await page.waitForTimeout(650);

    const boundedBoundary = await boundaryNode.boundingBox();
    const boundedRoadmap = await roadmapNode.boundingBox();

    expect(messyBoundary?.x).not.toBe(boundedBoundary?.x);
    expect(messyRoadmap?.y).not.toBe(boundedRoadmap?.y);
  });

  test("renders a nonblank Three.js canvas", async ({ page }) => {
    await page.goto("/");
    const map = page.locator("[data-system-map]").first();
    await scrollToMap(page);
    await expect(map).toHaveAttribute("data-three-map-ready", "true");

    const isNonblank = await page
      .locator("canvas[data-map-canvas]")
      .first()
      .evaluate((canvas) => {
        const source = canvas as HTMLCanvasElement;
        const blank = document.createElement("canvas");
        blank.width = source.width;
        blank.height = source.height;

        return source.toDataURL("image/png") !== blank.toDataURL("image/png");
      });

    expect(isNonblank).toBe(true);
  });

  test("captures desktop and mobile map screenshots", async ({ page }) => {
    test.slow();
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    let map = page.locator("[data-system-map]").first();
    await expect(map).toBeVisible();
    await scrollToMap(page);
    await expect(map).toHaveAttribute("data-three-map-ready", "true");
    await map.screenshot({
      path: "test-results/system-map-desktop.png"
    });

    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    map = page.locator("[data-system-map]").first();
    await expect(map).toBeVisible();
    await scrollToMap(page);
    await expect(map).toHaveAttribute("data-three-map-ready", "true");
    await map.screenshot({
      path: "test-results/system-map-mobile.png"
    });
  });
});
