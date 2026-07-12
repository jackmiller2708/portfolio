import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

test.describe("Smoke Tests", () => {
  test("Home page should load and have title", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/Nguyen Ngoc Huy \/ Jack/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText("Complex Angular systems, made explicit.");
  });

  test("Vietnamese home and language switch render localized chrome", async ({ page }) => {
    await page.goto("/vi");
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");
    await expect(page.locator("main h1")).toContainText("Hệ thống Angular phức tạp, được làm rõ.");
    await expect(page.getByRole("navigation", { name: "Điều hướng chính" })).toContainText(
      "Dịch vụ"
    );
    await expect(page.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/");
  });

  test("Vietnamese secondary routes render localized content", async ({ page }) => {
    test.slow();
    await page.goto("/vi/contact");
    await expect(page.locator("main h1")).toContainText("Yêu cầu audit frontend Angular");
    await expect(page.getByLabel("Tên")).toBeVisible();

    await page.goto("/vi/sample-audit");
    await expect(page.locator("main h1")).toContainText("Mẫu audit");
    await expect(page.getByRole("heading", { name: "Xem báo cáo đầy đủ" })).toBeVisible();

    await page.goto("/vi/case-studies/checkout-stabilization");
    await expect(page.getByRole("heading", { name: "Tóm tắt ca" })).toBeVisible();

    await page.goto("/vi/lab/rxjs-cleanup");
    await expect(page.getByRole("heading", { name: "Dịch vụ liên quan" })).toBeVisible();
  });

  test("public source does not use proof framing", async () => {
    const files = [
      "src/pages/index.astro",
      "src/pages/en/services.astro",
      "src/pages/en/case-studies/index.astro",
      "src/pages/en/sample-audit.astro",
      "src/pages/en/lab/index.astro",
      "src/pages/en/about.astro",
      "src/pages/en/contact.astro",
      "src/programs/load-home-page.ts",
      "src/programs/load-case-studies-page.ts",
      "src/content/site-meta/main.json"
    ];

    for (const file of files) {
      const contents = readFileSync(join(process.cwd(), file), "utf8");
      expect(contents).not.toMatch(/\bproof\b/i);
    }
  });

  test("Home diagnostic selector updates reference path and CTA", async ({ page }) => {
    await page.goto("/en");

    const diagnostic = page.locator("[data-diagnostic-selector]");
    await expect(diagnostic).toBeVisible();

    await diagnostic.getByRole("button", { name: /Cache and data behavior/ }).click();
    await expect(diagnostic.locator("[data-diagnostic-service]")).toContainText(
      "Frontend Stabilization"
    );
    await expect(diagnostic.locator("[data-diagnostic-reference]")).toContainText(
      "Cache semantics are undocumented"
    );
    await expect(diagnostic.locator("[data-diagnostic-map-state]")).toContainText("explicit");
    await expect(diagnostic.locator("[data-diagnostic-cta]")).toHaveAttribute(
      "href",
      "/en/contact?diagnostic=cache-data"
    );
  });

  test("Home diagnostic selector scrolls result into view on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto("/en");

    const diagnostic = page.locator("[data-diagnostic-selector]");
    await diagnostic.getByRole("button", { name: /Cache and data behavior/ }).click();
    await expect(diagnostic.locator("[data-diagnostic-result]")).toBeInViewport();
  });

  test("Theme switch toggles the page theme", async ({ page }) => {
    await page.goto("/en");

    const toggle = page.getByRole("button", { name: "Switch theme" });
    await expect(toggle).toBeVisible();
    await expect(toggle.locator("svg")).toHaveCount(2);

    const before = await page.locator("html").getAttribute("data-theme");
    await toggle.click();
    const after = await page.locator("html").getAttribute("data-theme");

    expect(after).not.toBe(before);
    expect(["light", "dark"]).toContain(after);
  });

  test("Mobile header is compact and expandable", async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto("/en");

    const header = page.locator(".site-header");
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    const toggle = page.getByRole("button", { name: "Open navigation" });
    await expect(header).toBeVisible();
    await expect(nav).not.toBeVisible();

    const closedBox = await header.boundingBox();
    expect(closedBox?.height).toBeLessThanOrEqual(64);

    await toggle.click();
    await expect(page.getByRole("button", { name: "Close navigation" })).toBeVisible();
    await expect(nav).toBeVisible();

    const openBox = await header.boundingBox();
    expect(openBox?.height).toBeGreaterThan(closedBox?.height ?? 0);
    expect(openBox?.height).toBeLessThan(220);
  });

  test("Tablet header stays compact instead of wrapping navigation", async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 900 });
    await page.goto("/en", { waitUntil: "domcontentloaded" });

    const header = page.locator(".site-header");
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    const navElement = page.locator("#site-navigation");
    const toggle = page.getByRole("button", { name: "Open navigation" });
    await expect(nav).not.toBeVisible();

    const closedBox = await header.boundingBox();
    expect(closedBox?.height).toBeLessThanOrEqual(64);

    const transition = await navElement.evaluate(
      (element) => getComputedStyle(element).transitionProperty
    );
    expect(transition).toContain("max-height");

    await toggle.click();
    await expect(nav).toBeVisible();
    const openBox = await header.boundingBox();
    expect(openBox?.height).toBeGreaterThan(closedBox?.height ?? 0);
  });

  test("Desktop theme switch keeps a stable header width", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/en", { waitUntil: "domcontentloaded" });

    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    const toggle = page.getByRole("button", { name: "Switch theme" });
    const beforeNavBox = await nav.boundingBox();
    const beforeToggleBox = await toggle.boundingBox();

    await toggle.click();

    const afterNavBox = await nav.boundingBox();
    const afterToggleBox = await toggle.boundingBox();
    expect(afterToggleBox?.width).toBeCloseTo(beforeToggleBox?.width ?? 0, 0);
    expect(afterNavBox?.x).toBeCloseTo(beforeNavBox?.x ?? 0, 0);
  });

  test("Client-side navigation keeps theme and page interactions initialized", async ({ page }) => {
    test.slow();
    await page.goto("/en");
    await page.evaluate(() => localStorage.setItem("theme", "dark"));
    await page.goto("/en/sample-audit", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/en\/sample-audit$/);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    const walkthrough = page.locator("[data-audit-walkthrough]");
    await walkthrough.getByRole("button", { name: "Risk" }).click();
    await expect(walkthrough.locator("[data-phase-label]")).toContainText("Risk");
  });

  test("Reduced motion disables page view-transition animation", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/en");

    const duration = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement, "::view-transition-new(root)");
      return style.animationDuration;
    });

    expect(duration).toBe("0s");
    await context.close();
  });

  test("Mobile system map shows one selected-node detail surface", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 760 });
    await page.goto("/en", { waitUntil: "domcontentloaded" });

    const map = page.locator("[data-system-map]").first();
    await map.scrollIntoViewIfNeeded();
    await expect(map.locator("[data-node-id]").first()).toBeVisible();
    await expect(map).toHaveAttribute("data-three-map-ready", "true", { timeout: 15_000 });
    await map.locator("[data-node-id]").first().click();

    await expect(map.locator("[data-map-drawer]")).toBeVisible();
    await expect(map.locator("[data-map-details]")).not.toBeVisible();
  });

  test("Touch tablet system map does not duplicate selected-node details", async ({ browser }) => {
    const context = await browser.newContext({
      hasTouch: true,
      viewport: { width: 768, height: 1024 }
    });
    const page = await context.newPage();
    await page.goto("/en", { waitUntil: "domcontentloaded" });

    const map = page.locator("[data-system-map]").first();
    await map.scrollIntoViewIfNeeded();
    await expect(map.locator("[data-node-id]").first()).toBeVisible();
    await expect(map).toHaveAttribute("data-compact", "true", { timeout: 15_000 });
    await map.locator("[data-node-id]").nth(1).click();

    await expect(map.locator("[data-map-drawer]")).toBeVisible();
    await expect(map.locator("[data-map-details]")).not.toBeVisible();
    await context.close();
  });

  test("Services page should load and display services", async ({ page }) => {
    await page.goto("/en/services");
    await expect(page).toHaveTitle(/Services \| Nguyen Ngoc Huy \/ Jack/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();

    const serviceCards = page.locator(".service-card");
    expect(await serviceCards.count()).toBeGreaterThan(0);
  });

  test("Sample Audit page should load", async ({ page }) => {
    await page.goto("/en/sample-audit");
    await expect(page).toHaveTitle(/Sample Audit \| Nguyen Ngoc Huy \/ Jack/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();
  });

  test("Sample Audit walkthrough updates visible phase content", async ({ page }) => {
    await page.goto("/en/sample-audit");

    const walkthrough = page.locator("[data-audit-walkthrough]");
    await expect(walkthrough).toBeVisible();
    await walkthrough.getByRole("button", { name: "Risk" }).click();
    await expect(walkthrough.locator("[data-phase-label]")).toContainText("Risk");
    await expect(page.getByRole("heading", { name: "Full report view" })).toBeVisible();
    await expect(page.getByText("Read the full walkthrough")).toBeVisible();
    await expect(walkthrough.locator(".audit-walkthrough__static")).toContainText(
      "Sprint sequence"
    );
  });

  test("Contact page should load and display intake form", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page).toHaveTitle(/Contact \| Nguyen Ngoc Huy \/ Jack/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();

    const form = page.locator("form.contact-form");
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("data-astro-reload", "");
    await expect(form.getByLabel("Name")).toBeVisible();
    await expect(form.getByLabel("Email")).toBeVisible();
  });

  test("Contact advisory selector updates recommendation and form context", async ({ page }) => {
    await page.goto("/en/contact");

    const advisory = page.locator("[data-advisory-flow]");
    await expect(advisory).toBeVisible();
    await advisory.getByRole("button", { name: /Refactor planning/ }).click();
    await expect(advisory.locator("[data-advisory-title]")).toContainText("Architecture Advisory");
    await expect(page.locator("#engagementType")).toHaveValue("advisory");
    await expect(page.locator("#pain")).toHaveValue(/Refactor planning/);
  });

  test("About page should load", async ({ page }) => {
    await page.goto("/en/about");
    await expect(page).toHaveTitle(/About Nguyen Ngoc Huy \| Nguyen Ngoc Huy \/ Jack/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();
  });

  test("Case study detail page should load", async ({ page }) => {
    await page.goto("/en/case-studies/checkout-stabilization");
    await expect(page).toHaveTitle(/Checkout flow stabilization/);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Problem" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recommended next reads" })).toBeVisible();
  });

  test("Lab detail page should load", async ({ page }) => {
    await page.goto("/en/lab/rxjs-cleanup");
    await expect(page).toHaveTitle(/RxJS cleanup without hiding ownership/);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Related services" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recommended next reads" })).toBeVisible();
  });

  test("404 page should render correctly", async ({ page }) => {
    const response = await page.goto("/non-existent-page");
    expect(response?.status()).toBe(404);
    await expect(page.locator("main h1")).toContainText(/not available/i);
  });
});
