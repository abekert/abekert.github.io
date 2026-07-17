const { test, expect } = require("@playwright/test");
const { loadStartup } = require("./helpers");

test("startup begins with Make and does not flash the final Tap to start text", async ({ page }) => {
  await loadStartup(page);
  const firstFrame = await page.evaluate(() => ({
    text: document.querySelector("#roundel-text").textContent,
    title: document.querySelector("#roundel-title").textContent,
    booting: document.body.classList.contains("is-booting"),
    background: getComputedStyle(document.body).backgroundImage,
    dockOpacity: getComputedStyle(document.querySelector(".hud-panel-triggers")).opacity
  }));
  expect(firstFrame.text).toBe("MAKE");
  expect(firstFrame.title).toContain("MAKE");
  expect(firstFrame.booting).toBe(true);
  expect(firstFrame.background).toContain("radial-gradient");
  expect(firstFrame.dockOpacity).toBe("0");
  await page.waitForTimeout(120);
  await expect(page.locator("#roundel-text")).not.toHaveText("TAP TO START");
  await page.waitForFunction(() => !document.body.classList.contains("is-booting"), null, { timeout: 8_000 });
  await expect(page.locator(".hud-panel-triggers")).toHaveCSS("opacity", "1");
});

test("startup keeps the Make state through the early animation frames", async ({ page }) => {
  await loadStartup(page);
  for (const delay of [50, 150, 500]) {
    await page.waitForTimeout(delay);
    await expect(page.locator("#roundel-text")).not.toHaveText("TAP TO START");
  }
});

test("reduced motion still starts with the Make state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await loadStartup(page);
  await expect(page.locator("body")).not.toHaveClass(/is-booting/);
  await expect(page.locator("#roundel-text")).toHaveText("TAP TO START");
});
