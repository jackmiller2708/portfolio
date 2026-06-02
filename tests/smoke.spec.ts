import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("Home page should load and have title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Frontend Systems Portfolio/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();
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

  test("Contact page should load and display intake form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact \| Frontend Systems Portfolio/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();

    const form = page.locator("form.contact-form");
    await expect(form).toBeVisible();
  });

  test("About page should load", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About \| Frontend Systems Portfolio/);
    const heroHeading = page.locator("main h1");
    await expect(heroHeading).toBeVisible();
  });

  test("Case study detail page should load", async ({ page }) => {
    await page.goto("/case-studies/checkout-stabilization");
    await expect(page).toHaveTitle(/Checkout Stabilization/);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Problem" })).toBeVisible();
  });

  test("Lab detail page should load", async ({ page }) => {
    await page.goto("/lab/rxjs-cleanup");
    await expect(page).toHaveTitle(/RxJS Cleanup/);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Related services" })).toBeVisible();
  });

  test("404 page should render correctly", async ({ page }) => {
    const response = await page.goto("/non-existent-page");
    expect(response?.status()).toBe(404);
    await expect(page.locator("main h1")).toContainText(/not available/i);
  });
});
