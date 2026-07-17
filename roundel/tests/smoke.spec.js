const { test, expect } = require("@playwright/test");
const { loadEditor } = require("./helpers");

test("editor loads with the expected controls and no document overflow", async ({ page }) => {
  await loadEditor(page);

  await expect(page.locator("#roundel-text")).toHaveText("MAKE");
  await expect(page.locator(".hud-panel-trigger")).toHaveCount(6);
  await expect(page.locator(".style-button")).not.toHaveCount(0);

  const geometry = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollHeight: document.documentElement.scrollHeight,
    clientHeight: document.documentElement.clientHeight
  }));

  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth);
  expect(geometry.scrollHeight).toBeLessThanOrEqual(geometry.clientHeight);
});

test("dock labels are in the documented order", async ({ page }) => {
  await loadEditor(page);
  await expect(page.locator(".hud-panel-trigger")).toHaveText(["Font", "Size", "Style", "Scene", "Ring", "Bar"]);
});

test("all settings panels can be opened and closed", async ({ page }) => {
  await loadEditor(page);
  for (const menu of ["font", "font-size", "font-style", "background", "ring", "bar"]) {
    const trigger = page.locator(`.hud-panel-trigger[data-menu="${menu}"]`);
    await trigger.hover();
    await expect(page.locator(`[data-menu-panel="${menu}"]`)).toBeVisible();
    await page.locator(`[data-menu-panel="${menu}"] [data-close-menu]`).click();
    await expect(page.locator(`[data-menu-panel="${menu}"]`)).toBeHidden();
  }
});

test("the Roundel artwork is centred in the available stage", async ({ page }) => {
  await loadEditor(page);
  const result = await page.evaluate(() => {
    const stage = document.querySelector("#roundel-stage").getBoundingClientRect();
    const svg = document.querySelector("#roundel-svg").getBoundingClientRect();
    return {
      stageCentre: stage.left + stage.width / 2,
      svgCentre: svg.left + svg.width / 2,
      viewportCentre: innerWidth / 2
    };
  });
  expect(Math.abs(result.svgCentre - result.stageCentre)).toBeLessThanOrEqual(1);
  expect(Math.abs(result.stageCentre - result.viewportCentre)).toBeLessThanOrEqual(2);
});
