import { defineConfig, devices } from "@playwright/test";

const useWebServer = process.env.PLAYWRIGHT_SKIP_WEBSERVER !== "1";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4321",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  webServer: useWebServer
    ? {
        command: "npx cross-env ASTRO_TELEMETRY_DISABLED=1 astro dev --host localhost --port 4321",
        url: "http://localhost:4321",
        reuseExistingServer: !process.env.CI,
        stdout: "ignore",
        stderr: "pipe"
      }
    : undefined
});
