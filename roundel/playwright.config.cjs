const fs = require("node:fs");
const { defineConfig } = require("@playwright/test");

const systemChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    launchOptions: fs.existsSync(process.env.CHROME_PATH || systemChrome)
      ? { executablePath: process.env.CHROME_PATH || systemChrome }
      : undefined
  },
  webServer: {
    command: "python3 -m http.server 4173 --directory ..",
    url: "http://127.0.0.1:4173/roundel/index.html",
    reuseExistingServer: !process.env.CI,
    timeout: 10_000
  }
});
