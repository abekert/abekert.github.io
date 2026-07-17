const { test, expect } = require("@playwright/test");
const { choosePreset, loadEditor, openMenu, setText } = require("./helpers");

async function prepareArtwork(page, preset, text) {
  await loadEditor(page);
  await choosePreset(page, preset);
  await setText(page, text);
  await page.addStyleTag({
    content: `
      *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
      .hud-actions, .hud-panel-triggers, .style-strip, .hotspot, .bar-grip, .live-text-editor { display: none !important; }
    `
  });
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

test.describe("visual regression snapshots", () => {
  test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

  test("Heritage multiline hexagon composition", async ({ page }) => {
    await prepareArtwork(page, "heritage", "UNDERGROUND\nTAP TO START");
    await expect(page.locator("#roundel-stage")).toHaveScreenshot("heritage-multiline.png", {
      animations: "disabled",
      caret: "hide",
      scale: "css"
    });
  });

  test("Modern rules composition", async ({ page }) => {
    await prepareArtwork(page, "modernRules", "TAP TO START");
    await expect(page.locator("#roundel-stage")).toHaveScreenshot("modern-rules.png", {
      animations: "disabled",
      caret: "hide",
      scale: "css"
    });
  });

  test("Red Disc and Signboard retain breathing room", async ({ page }) => {
    await prepareArtwork(page, "redDisc", "UNDERGROUND");
    await expect(page.locator("#roundel-stage")).toHaveScreenshot("red-disc.png", {
      animations: "disabled",
      caret: "hide",
      scale: "css"
    });
    await prepareArtwork(page, "signboard", "UNDERGROUND");
    await expect(page.locator("#roundel-stage")).toHaveScreenshot("signboard.png", {
      animations: "disabled",
      caret: "hide",
      scale: "css"
    });
  });

  test("panel transparency and outline pointer", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font-style");
    await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; }" });
    await expect(page.locator("#menu-font-style")).toHaveScreenshot("style-panel.png", {
      animations: "disabled",
      caret: "hide",
      scale: "css"
    });
  });

  test("Scene tile previews and Wall Style remain stable", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "background");
    await page.addStyleTag({
      content: `
        *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
        .hud-actions, .style-strip, .hotspot, .bar-grip, .live-text-editor { display: none !important; }
      `
    });
    for (const id of ["none", "night", "plaque", "brick-white", "brick-red", "brick-yellow", "street-post", "station-floor", "stone-wall"]) {
      if (await page.locator("#menu-background").isHidden()) {
        await page.evaluate(() => document.body.classList.remove("is-hud-idle"));
        await openMenu(page, "background");
      }
      await page.locator(`#menu-background [data-background="${id}"]`).click();
      // Scene changes use the same JS visual transition as the editor. Wait
      // for that transition to finish before capturing a deterministic frame.
      await page.waitForTimeout(900);
      await expect(page.locator("#roundel-stage")).toHaveScreenshot(`scene-${id}.png`, {
        animations: "disabled",
        caret: "hide",
        scale: "css",
        // SVG filter rasterization differs by a small number of edge pixels
        // across Chrome versions, especially on the station-floor backdrop.
        maxDiffPixels: 1000
      });
    }

    await choosePreset(page, "wallMount");
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await expect(page.locator("#roundel-stage")).toHaveScreenshot("wall-style.png", {
      animations: "disabled",
      caret: "hide",
      scale: "css"
    });
  });
});
