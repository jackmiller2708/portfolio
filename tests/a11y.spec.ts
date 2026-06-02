import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/services", "/sample-audit", "/contact", "/about", "/404"];

test.describe("Accessibility Checks (Axe)", () => {
  for (const route of routes) {
    test(`Should not have any automatically detectable accessibility issues on ${route}`, async ({ page }) => {
      await page.goto(route);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
