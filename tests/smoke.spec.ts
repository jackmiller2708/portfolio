import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("Home page should load and have title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Frontend Systems Portfolio/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();
  });

  test("Home diagnostic selector updates proof path and CTA", async ({ page }) => {
    await page.goto("/");

    const diagnostic = page.locator("[data-diagnostic-selector]");
    await expect(diagnostic).toBeVisible();

    await diagnostic.getByRole("button", { name: /Cache and data behavior/ }).click();
    await expect(diagnostic.locator("[data-diagnostic-service]")).toContainText(
      "Frontend Stabilization"
    );
    await expect(diagnostic.locator("[data-diagnostic-proof]")).toContainText(
      "Cache semantics are undocumented"
    );
    await expect(diagnostic.locator("[data-diagnostic-map-state]")).toContainText("explicit");
    await expect(diagnostic.locator("[data-diagnostic-cta]")).toHaveAttribute(
      "href",
      "/contact?diagnostic=cache-data"
    );
  });

  test("Theme switch toggles the page theme", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Switch theme" });
    await expect(toggle).toBeVisible();
    await expect(toggle.locator("svg")).toHaveCount(2);

    const before = await page.locator("html").getAttribute("data-theme");
    await toggle.click();
    const after = await page.locator("html").getAttribute("data-theme");

    expect(after).not.toBe(before);
    expect(["light", "dark"]).toContain(after);
  });

  test("Client-side navigation keeps theme and page interactions initialized", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Switch theme" }).click();
    const selectedTheme = await page.locator("html").getAttribute("data-theme");
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Sample Audit", exact: true })
      .click();

    await expect(page).toHaveURL(/\/sample-audit$/);
    await expect(page.locator("html")).toHaveAttribute("data-theme", selectedTheme ?? "");

    const walkthrough = page.locator("[data-audit-walkthrough]");
    await walkthrough.getByRole("button", { name: "Risk" }).click();
    await expect(walkthrough.locator("[data-phase-label]")).toContainText("Risk");
  });

  test("Reduced motion disables page view-transition animation", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");

    const duration = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement, "::view-transition-new(root)");
      return style.animationDuration;
    });

    expect(duration).toBe("0s");
    await context.close();
  });

  test("Services page should load and display services", async ({ page }) => {
    await page.goto("/services");
    await expect(page).toHaveTitle(/Services \| Frontend Systems Portfolio/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();

    const serviceCards = page.locator(".service-card");
    expect(await serviceCards.count()).toBeGreaterThan(0);
  });

  test("Sample Audit page should load", async ({ page }) => {
    await page.goto("/sample-audit");
    await expect(page).toHaveTitle(/Sample Audit \| Frontend Systems Portfolio/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();
  });

  test("Sample Audit walkthrough updates visible phase content", async ({ page }) => {
    await page.goto("/sample-audit");

    const walkthrough = page.locator("[data-audit-walkthrough]");
    await expect(walkthrough).toBeVisible();
    await walkthrough.getByRole("button", { name: "Risk" }).click();
    await expect(walkthrough.locator("[data-phase-label]")).toContainText("Risk");
    await expect(page.getByRole("heading", { name: "Full report view" })).toBeVisible();
  });

  test("Contact page should load and display intake form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact \| Frontend Systems Portfolio/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();

    const form = page.locator("form.contact-form");
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("data-astro-reload", "");
  });

  test("Contact advisory selector updates recommendation and form context", async ({ page }) => {
    await page.goto("/contact");

    const advisory = page.locator("[data-advisory-flow]");
    await expect(advisory).toBeVisible();
    await advisory.getByRole("button", { name: /Refactor planning/ }).click();
    await expect(advisory.locator("[data-advisory-title]")).toContainText("Architecture Advisory");
    await expect(page.locator("#engagementType")).toHaveValue("advisory");
    await expect(page.locator("#pain")).toHaveValue(/Refactor planning/);
  });

  test("About page should load", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About \| Frontend Systems Portfolio/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();
  });

  test("Case study detail page should load", async ({ page }) => {
    await page.goto("/case-studies/checkout-stabilization");
    await expect(page).toHaveTitle(/Checkout flow stabilization/);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Problem" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recommended next reads" })).toBeVisible();
  });

  test("Lab detail page should load", async ({ page }) => {
    await page.goto("/lab/rxjs-cleanup");
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
