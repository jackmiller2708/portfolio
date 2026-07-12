import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/en",
  "/en/services",
  "/en/sample-audit",
  "/en/contact",
  "/en/about",
  "/en/case-studies/checkout-stabilization",
  "/en/lab/rxjs-cleanup",
  "/404"
];

test.describe("Accessibility Checks (Axe)", () => {
  for (const route of routes) {
    test(`Should not have any automatically detectable accessibility issues on ${route}`, async ({
      page
    }) => {
      await page.goto(route);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
