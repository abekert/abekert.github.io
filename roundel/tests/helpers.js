const { expect } = require("@playwright/test");

async function loadEditor(page, options = {}) {
  const query = options.query || "test=1";

  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  await page.goto(`/roundel/index.html?${query}`);
  await page.waitForFunction(() => document.fonts.status === "loaded");
  await expect(page.locator("#roundel-svg")).toBeVisible();
  await page.evaluate(() => document.body.classList.remove("is-hud-idle"));
}

async function loadStartup(page) {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  await page.goto("/roundel/index.html");
}

async function waitForIntro(page) {
  await page.waitForFunction(() => !document.body.classList.contains("is-booting"), null, {
    timeout: 8_000
  });
  await page.waitForFunction(() => document.fonts.status === "loaded");
}

async function openMenu(page, name) {
  const trigger = page.locator(`.hud-panel-trigger[data-menu="${name}"]`);
  const isDesktop = await page.evaluate(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.innerWidth > 640);

  // Desktop triggers open on hover as well as click. Hovering avoids the
  // deliberate click-to-close path being triggered by Playwright's synthetic
  // pointerenter + click sequence.
  if (isDesktop) {
    await trigger.hover();
  } else {
    await trigger.click();
  }
  const panel = page.locator(`[data-menu-panel="${name}"]`);
  await expect(panel).toBeVisible();
  return panel;
}

async function closeMenu(page, name) {
  await page.locator(`[data-menu-panel="${name}"] [data-close-menu]`).click();
  await expect(page.locator(`[data-menu-panel="${name}"]`)).toBeHidden();
}

async function setRange(page, id, value) {
  await page.locator(`#${id}`).evaluate((input, nextValue) => {
    input.value = String(nextValue);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, value);
  // Range handlers coalesce rendering into requestAnimationFrame so that
  // dragging remains smooth. Wait for the frame before reading SVG geometry.
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function setText(page, value) {
  await page.locator("#sign-text").fill(value);
  await page.locator("#sign-text").dispatchEvent("change");
}

async function choosePreset(page, id) {
  await page.locator(`.style-button[data-preset="${id}"]`).evaluate((button) => button.click());
  await expect(page.locator(`.style-button[data-preset="${id}"]`)).toHaveClass(/is-active/);
}

async function rect(page, selector) {
  return page.locator(selector).evaluate((element) => element.getBoundingClientRect().toJSON());
}

async function readTextBounds(page) {
  return page.locator("#roundel-text").evaluate((text) => {
    const bounds = text.getBBox();
    return { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height };
  });
}

module.exports = {
  choosePreset,
  closeMenu,
  loadEditor,
  loadStartup,
  openMenu,
  readTextBounds,
  rect,
  setRange,
  setText,
  waitForIntro
};
