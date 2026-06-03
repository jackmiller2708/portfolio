import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

test.describe("Smoke Tests", () => {
  test("Home page should load and have title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Frontend Systems Portfolio/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText("Complex systems, made explicit.");
  });

  test("public source does not use proof framing", async () => {
    const files = [
      "src/pages/index.astro",
      "src/pages/services.astro",
      "src/pages/case-studies/index.astro",
      "src/pages/sample-audit.astro",
      "src/pages/lab/index.astro",
      "src/pages/about.astro",
      "src/pages/contact.astro",
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
    await page.goto("/");

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
      "/contact?diagnostic=cache-data"
    );
  });

  test("Home diagnostic selector scrolls result into view on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto("/");

    const diagnostic = page.locator("[data-diagnostic-selector]");
    await diagnostic.getByRole("button", { name: /Cache and data behavior/ }).click();
    await expect(diagnostic.locator("[data-diagnostic-result]")).toBeInViewport();
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
    test.slow();
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem("theme", "dark"));
    await page.goto("/sample-audit", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/sample-audit$/);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

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
    await expect(page.getByText("Read the full walkthrough")).toBeVisible();
    await expect(walkthrough.locator(".audit-walkthrough__static")).toContainText(
      "Sprint sequence"
    );
  });

  test("Contact page should load and display intake form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact \| Frontend Systems Portfolio/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();

    const form = page.locator("form.contact-form");
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("data-astro-reload", "");
    await expect(form.getByLabel("Name")).toBeVisible();
    await expect(form.getByLabel("Email")).toBeVisible();
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
