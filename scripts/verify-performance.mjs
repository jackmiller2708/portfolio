/* eslint-disable complexity */
import fs from "fs/promises";
import path from "path";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer";

const routes = [
  "/",
  "/services",
  "/sample-audit",
  "/contact",
  "/about",
  "/case-studies/checkout-stabilization",
  "/lab/rxjs-cleanup"
];
const baseUrl = process.env.UI_BASE_URL ?? "http://localhost:4321";
const outputDir = path.join(process.cwd(), "test-results", "performance");

const preflightRoute = async (url) => {
  try {
    return await fetch(url);
  } catch {
    throw new Error(
      `Could not reach ${url}. Build and start the production preview first: npm run build, then npm run preview -- --host localhost`
    );
  }
};

async function runLighthouse() {
  await fs.mkdir(outputDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    timeout: 120000,
    args: [
      "--allow-insecure-localhost",
      "--disable-features=HttpsFirstBalancedModeAutoEnable,HttpsUpgrades"
    ]
  });
  const port = new URL(browser.wsEndpoint()).port;

  const results = [];
  const issues = [];

  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    console.log(`Running Lighthouse for ${url}`);

    const response = await preflightRoute(url);
    if (!response.ok) {
      issues.push(`${route}: preflight returned HTTP ${response.status}`);
      continue;
    }

    const options = {
      logLevel: "error",
      output: "html",
      port,
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
    };

    const runnerResult = await lighthouse(url, options);
    const lhr = runnerResult.lhr;

    const reportHtml = runnerResult.report;
    const routeName = route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");
    await fs.writeFile(path.join(outputDir, `${routeName}.html`), reportHtml);

    if (lhr.runtimeError) {
      issues.push(`${route}: ${lhr.runtimeError.code} - ${lhr.runtimeError.message}`);
      continue;
    }

    if (lhr.finalDisplayedUrl.startsWith("chrome-error://")) {
      issues.push(`${route}: Chrome loaded ${lhr.finalDisplayedUrl} instead of ${url}`);
      continue;
    }

    const scores = lhr.categories;
    const getScore = (category, label) => {
      const score = category.score;

      if (score === null) {
        issues.push(`${route}: ${label} score unavailable`);

        return null;
      }

      return Math.round(score * 100);
    };

    const result = {
      route,
      performance: getScore(scores.performance, "Performance"),
      accessibility: getScore(scores.accessibility, "Accessibility"),
      bestPractices: getScore(scores["best-practices"], "Best Practices"),
      seo: getScore(scores.seo, "SEO")
    };
    results.push(result);

    if (result.performance !== null && result.performance < 90)
      issues.push(`${route}: Performance ${result.performance} < 90`);
    if (result.accessibility !== null && result.accessibility < 90)
      issues.push(`${route}: Accessibility ${result.accessibility} < 90`);
    if (result.bestPractices !== null && result.bestPractices < 90)
      issues.push(`${route}: Best Practices ${result.bestPractices} < 90`);
    if (result.seo !== null && result.seo < 90) issues.push(`${route}: SEO ${result.seo} < 90`);
  }

  await browser.close();

  console.log("Performance Results:");
  console.table(results);

  if (issues.length > 0) {
    console.error(`Performance verification found ${issues.length} issue(s):`);
    for (const issue of issues) {
      console.error(`- ${issue}`);
    }
    process.exitCode = 1;
  } else {
    console.log(`Performance verification passed for all routes.`);
  }
}

runLighthouse().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
