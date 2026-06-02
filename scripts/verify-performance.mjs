/* eslint-disable complexity */
import fs from "fs/promises";
import path from "path";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer";

const routes = ["/", "/services", "/sample-audit", "/contact", "/about"];
const baseUrl = process.env.UI_BASE_URL ?? "http://127.0.0.1:4321";
const outputDir = path.join(process.cwd(), "test-results", "performance");

async function runLighthouse() {
  await fs.mkdir(outputDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });
  const port = new URL(browser.wsEndpoint()).port;

  const results = [];
  const issues = [];

  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    console.log(`Running Lighthouse for ${url}`);

    const options = {
      logLevel: "error",
      output: "html",
      port,
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
    };

    const runnerResult = await lighthouse(url, options);

    const reportHtml = runnerResult.report;
    const routeName = route === "/" ? "home" : route.replace(/^\//, "");
    await fs.writeFile(path.join(outputDir, `${routeName}.html`), reportHtml);

    const scores = runnerResult.lhr.categories;
    const result = {
      route,
      performance: scores.performance.score * 100,
      accessibility: scores.accessibility.score * 100,
      bestPractices: scores["best-practices"].score * 100,
      seo: scores.seo.score * 100
    };
    results.push(result);

    if (result.performance < 90) issues.push(`${route}: Performance ${result.performance} < 90`);
    if (result.accessibility < 90)
      issues.push(`${route}: Accessibility ${result.accessibility} < 90`);
    if (result.bestPractices < 90)
      issues.push(`${route}: Best Practices ${result.bestPractices} < 90`);
    if (result.seo < 90) issues.push(`${route}: SEO ${result.seo} < 90`);
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

runLighthouse().catch(console.error);
