const { test: base, expect } = require("@playwright/test");

// Listen before navigation, including for SVG rendering errors which do not
// produce a JavaScript pageerror and previously escaped the smoke tests.
const test = base.extend({
  browserErrors: [async ({ page }, use, testInfo) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await use(errors);
    if (errors.length) {
      await testInfo.attach("browser-errors", { body: errors.join("\n"), contentType: "text/plain" });
    }
    expect(errors, "No JavaScript, SVG rendering, or console errors").toEqual([]);
  }, { auto: true }]
});

module.exports = { test, expect };
