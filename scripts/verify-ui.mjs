/* eslint-disable max-lines-per-function, complexity */
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.UI_BASE_URL ?? "http://localhost:4321";
const outputDir = path.join(process.cwd(), "test-results", "ui-verification");
const routes = [
  "/en",
  "/en/services",
  "/en/sample-audit",
  "/en/contact",
  "/en/about",
  "/en/case-studies/checkout-stabilization",
  "/en/lab/rxjs-cleanup"
];
const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 360, height: 800 }
];

const getRouteName = (route) =>
  route === "/en" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");

const inspectPage = async (page, route, viewport) =>
  page.evaluate(
    ({ route, viewport }) => {
      const getCssVar = (name) =>
        getComputedStyle(document.documentElement).getPropertyValue(name).trim();

      const isVisible = (element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);

        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.visibility !== "hidden" &&
          style.display !== "none"
        );
      };

      const inspectedElements = [
        ...document.querySelectorAll(
          "h1, h2, h3, p, a, button, input, select, textarea, .service-card, .evidence-panel, .matrix-card, .roadmap-card, .contact-intake__status"
        )
      ].filter(isVisible);

      const overflowElements = inspectedElements
        .filter((element) => element.scrollWidth > element.clientWidth + 1)
        .map((element) => ({
          selector:
            element.className && typeof element.className === "string"
              ? `.${element.className.split(/\s+/).join(".")}`
              : element.tagName.toLowerCase(),
          text: element.textContent?.trim().slice(0, 80) ?? "",
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth
        }));

      const roundedElements = [
        ...document.querySelectorAll(
          ".service-card, .evidence-panel, .matrix-card, .roadmap-card, .fit-card, .first-step, .audit-cta, .fit-note, .about-list, .communication, .button-link"
        )
      ]
        .filter(isVisible)
        .map((element) => {
          const style = getComputedStyle(element);
          const radius = Number.parseFloat(style.borderTopLeftRadius);
          const padding = Number.parseFloat(style.paddingTop);
          const innerRadius = Number.parseFloat(getCssVar("--radius-inner")) || 1;

          return {
            selector:
              element.className && typeof element.className === "string"
                ? `.${element.className.split(/\s+/).join(".")}`
                : element.tagName.toLowerCase(),
            radius,
            expectedMax: padding + innerRadius
          };
        })
        .filter((item) => item.radius > item.expectedMax + 0.5);

      const containers = [...document.querySelectorAll(".u-container")]
        .filter(isVisible)
        .map((element) => {
          const rect = element.getBoundingClientRect();

          return {
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          };
        });

      const contactStates = [...document.querySelectorAll(".contact-intake__status")]
        .filter(isVisible)
        .map((element) => element.textContent?.trim().replace(/\s+/g, " ") ?? "");
      const contactForm = document.querySelector(".contact-form");
      const contactLabels = contactForm
        ? [...contactForm.querySelectorAll("label")].filter(isVisible).length
        : 0;
      const contactFraming = document.querySelector(".contact-form__framing");

      const systemMap = document.querySelector("[data-system-map]");
      const systemMapRect = systemMap?.getBoundingClientRect();
      const systemMapCanvas = systemMap?.querySelector("canvas[data-map-canvas]");
      const systemMapCanvasRect = systemMapCanvas?.getBoundingClientRect();

      const h1 = document.querySelector("h1");
      const main = document.querySelector("main");
      const h1Rect = h1?.getBoundingClientRect();
      const mainRect = main?.getBoundingClientRect();

      return {
        route,
        viewport,
        title: document.title,
        colors: {
          bg: getCssVar("--color-bg"),
          surface: getCssVar("--color-surface"),
          surface2: getCssVar("--color-surface-2"),
          text: getCssVar("--color-text"),
          muted: getCssVar("--color-muted"),
          accent: getCssVar("--color-accent"),
          border: getCssVar("--color-border")
        },
        horizontalOverflow:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
        h1: {
          text: h1?.textContent?.trim() ?? "",
          top: h1Rect ? Math.round(h1Rect.top) : null,
          width: h1Rect ? Math.round(h1Rect.width) : null
        },
        mainTop: mainRect ? Math.round(mainRect.top) : null,
        containers,
        overflowElements,
        roundedElements,
        contactStates,
        contactLabels,
        contactFraming: contactFraming?.textContent?.trim() ?? "",
        containsProof: /\bproof\b/i.test(document.body.textContent ?? ""),
        systemMap: systemMapRect
          ? {
              width: Math.round(systemMapRect.width),
              height: Math.round(systemMapRect.height),
              canvasWidth: systemMapCanvasRect ? Math.round(systemMapCanvasRect.width) : 0,
              canvasHeight: systemMapCanvasRect ? Math.round(systemMapCanvasRect.height) : 0,
              nodes: document.querySelectorAll("[data-system-map] [data-node-id]").length,
              states: document.querySelectorAll("[data-system-map] [data-map-state]").length
            }
          : null
      };
    },
    { route, viewport: viewport.name }
  );

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });

  for (const route of routes) {
    const url = `${baseUrl}${route}`;

    await page.goto(url, { waitUntil: "networkidle" });
    if (route === "/en") {
      await page
        .locator("[data-system-map]")
        .first()
        .waitFor({ state: "visible", timeout: 15_000 });
      await page
        .locator("[data-system-map]")
        .first()
        .evaluate((element) => {
          element.scrollIntoView({ block: "center" });
        });
      await page
        .locator("[data-system-map]")
        .first()
        .waitFor({ state: "visible", timeout: 15_000 });
      await page
        .locator("[data-system-map]")
        .first()
        .waitFor({ state: "attached", timeout: 15_000 });
      await page
        .locator("[data-system-map][data-three-map-ready='true']")
        .first()
        .waitFor({ state: "attached", timeout: 15_000 });
    }
    await page.screenshot({
      path: path.join(outputDir, `${getRouteName(route)}-${viewport.name}.png`),
      fullPage: true
    });
    results.push(await inspectPage(page, route, viewport));
  }

  await page.close();
}

await browser.close();

const issues = [];

for (const result of results) {
  const label = `${result.route} ${result.viewport}`;

  if (result.horizontalOverflow > 1) {
    issues.push(`${label}: horizontal overflow ${result.horizontalOverflow}px`);
  }

  if (!result.h1.text) {
    issues.push(`${label}: missing h1`);
  }

  if (result.overflowElements.length > 0) {
    issues.push(`${label}: ${result.overflowElements.length} text/control overflow candidates`);
  }

  if (result.roundedElements.length > 0) {
    issues.push(`${label}: rounded elements over 8px`);
  }

  if (result.containsProof) {
    issues.push(`${label}: public proof framing detected`);
  }

  if (result.route === "/en/contact") {
    if (result.contactStates.length !== 0) {
      issues.push(`${label}: obsolete visible contact states found`);
    }

    if (!result.contactFraming) {
      issues.push(`${label}: missing contact framing sentence`);
    }

    if (result.contactLabels < 10) {
      issues.push(`${label}: expected persistent contact labels, found ${result.contactLabels}`);
    }
  }

  if (result.route === "/en" && result.systemMap) {
    if (result.systemMap.nodes < 6 || result.systemMap.states < 2) {
      issues.push(`${label}: system map missing expected nodes or states`);
    }

    if (result.systemMap.height < 360) {
      issues.push(`${label}: system map height is too small`);
    }

    if (result.systemMap.canvasWidth < 280 || result.systemMap.canvasHeight < 300) {
      issues.push(`${label}: Three.js map canvas is too small`);
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  screenshots: outputDir,
  results,
  issues
};

await writeFile(path.join(outputDir, "report.json"), JSON.stringify(report, null, 2));

if (issues.length > 0) {
  console.error(`UI verification found ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }

  process.exitCode = 1;
} else {
  console.log(`UI verification passed for ${results.length} route/viewport combinations.`);
  console.log(`Screenshots and report written to ${outputDir}`);
}
