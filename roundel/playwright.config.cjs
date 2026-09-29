const { defineConfig } = require("@playwright/test");

const port = Number(process.env.TEST_PORT || 4173);
const baseURL = `http://127.0.0.1:${port}`;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  globalTimeout: 300_000,
  workers: 2,
  expect: {
    timeout: 5_000
  },
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL,
    browserName: "chromium",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    // Use Playwright's pinned browser unless a deliberate diagnostic override is supplied.
    launchOptions: process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : undefined
  },
  webServer: {
    command: `python3 -m http.server ${port} --bind 127.0.0.1 --directory ..`,
    cwd: __dirname,
    url: `${baseURL}/roundel/index.html`,
    stdout: "ignore",
    stderr: "pipe",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  }
});
