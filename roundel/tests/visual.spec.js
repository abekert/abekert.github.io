const { test, expect } = require("./fixtures");
const { choosePreset, loadEditor, openMenu, setRange, setText } = require("./helpers");

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

async function expectWallCornerSnapshot(page, corner, name) {
  const clip = await page.locator("#bar-border").evaluate((border, selectedCorner) => {
    const box = border.getBoundingClientRect();
    const size = 190;
    return selectedCorner === "upper-right" ? {
      x: box.right - 78,
      y: box.top - 54,
      width: size,
      height: size
    } : {
      x: box.left - 112,
      y: box.bottom - 136,
      width: size,
      height: size
    };
  }, corner);
  const image = await page.screenshot({
    animations: "disabled",
    caret: "hide",
    clip,
    scale: "css"
  });
  expect(image).toMatchSnapshot(name, { maxDiffPixels: 120 });
}

test.describe("visual regression snapshots", () => {
  // Reduced motion also disables the app's requestAnimationFrame transitions;
  // disabling CSS animations alone does not freeze SVG interpolation.
  test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });

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
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)));
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

  test("Wall Style corner crops remain seamless across Bar sizes and multiline text", async ({ page }) => {
    const states = [
      { label: "single-compact", text: "WALL STYLE", width: 720, height: -12 },
      { label: "double-wide", text: "WALL\nSTYLE", width: 1000, height: 24 }
    ];

    for (const state of states) {
      await prepareArtwork(page, "wallMount", state.text);
      await setRange(page, "bar-width", state.width);
      await setRange(page, "bar-height-adjust", state.height);
      await expectWallCornerSnapshot(page, "upper-right", `wall-${state.label}-upper-right.png`);
      await expectWallCornerSnapshot(page, "lower-left", `wall-${state.label}-lower-left.png`);
    }
  });
});
