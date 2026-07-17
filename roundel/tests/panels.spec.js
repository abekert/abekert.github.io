const { test, expect } = require("@playwright/test");
const { loadEditor, openMenu, rect } = require("./helpers");

test.describe("desktop panels", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("centres the panel and pointer on the active dock button", async ({ page }) => {
    await loadEditor(page);
    const panel = await openMenu(page, "font-style");
    await page.waitForTimeout(260);

    const result = await page.evaluate(() => {
      const panelRect = document.querySelector("#menu-font-style").getBoundingClientRect();
      const buttonRect = document.querySelector(".hud-panel-trigger[data-menu=font-style]").getBoundingClientRect();
      const dockRect = document.querySelector(".hud-panel-triggers").getBoundingClientRect();
      const pointerLeft = parseFloat(getComputedStyle(document.querySelector("#menu-pointer")).left);
      return {
        centreDelta: (panelRect.left + panelRect.width / 2) - (buttonRect.left + buttonRect.width / 2),
        pointerDelta: pointerLeft - (buttonRect.left + buttonRect.width / 2),
        dockGap: dockRect.top - panelRect.bottom
      };
    });

    expect(Math.abs(result.centreDelta)).toBeLessThanOrEqual(1);
    expect(Math.abs(result.pointerDelta)).toBeLessThanOrEqual(1);
    expect(result.dockGap).toBeGreaterThanOrEqual(0);
    await expect(panel).toBeVisible();
  });

  test("clicking the active trigger closes and a second click reopens", async ({ page }) => {
    await loadEditor(page);
    const trigger = page.locator('.hud-panel-trigger[data-menu="font-style"]');
    await trigger.hover();
    await expect(page.locator("#menu-font-style")).toBeVisible();
    await trigger.click();
    await expect(page.locator("#menu-font-style")).toBeHidden();
    await trigger.click();
    await expect(page.locator("#menu-font-style")).toBeVisible();
  });
});

test.describe("portrait panels", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("keeps the dock visible and clickable while a panel is open", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font-style");
    await page.waitForTimeout(300);

    const result = await page.evaluate(() => {
      const dock = document.querySelector(".hud-panel-triggers");
      const dockRect = dock.getBoundingClientRect();
      const elementAtDock = document.elementFromPoint(dockRect.left + dockRect.width / 2, dockRect.top + 24);
      return {
        opacity: getComputedStyle(dock).opacity,
        pointerEvents: getComputedStyle(dock).pointerEvents,
        hit: Boolean(elementAtDock && elementAtDock.closest(".hud-panel-trigger"))
      };
    });

    expect(result.opacity).toBe("1");
    expect(result.pointerEvents).toBe("auto");
    expect(result.hit).toBe(true);
  });

  test("places panels above the dock and keeps the pointer below the panel", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font-style");
    await page.waitForTimeout(220);

    const panelRect = await rect(page, "#menu-font-style");
    const dockRect = await rect(page, ".hud-panel-triggers");
    const pointerTop = await page.locator("#menu-pointer").evaluate((element) => parseFloat(getComputedStyle(element).top));

    expect(panelRect.bottom).toBeLessThanOrEqual(dockRect.top);
    expect(pointerTop).toBeGreaterThanOrEqual(panelRect.bottom - 1);
  });

  test("opens exactly one panel at a time", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font");
    await page.locator('.hud-panel-trigger[data-menu="background"]').click();
    await expect(page.locator("#menu-font")).toBeHidden();
    await expect(page.locator("#menu-background")).toBeVisible();
  });

  test("close control is large enough for touch and hides the pointer", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font-style");
    await page.waitForTimeout(220);
    const hit = await page.locator("#menu-font-style .menu-close").evaluate((button) => button.getBoundingClientRect().toJSON());
    expect(hit.width).toBeGreaterThanOrEqual(44);
    expect(hit.height).toBeGreaterThanOrEqual(44);
    await page.locator("#menu-font-style .menu-close").click();
    await expect(page.locator("#menu-font-style")).toBeHidden();
    await expect(page.locator("#menu-pointer")).toBeHidden();
  });

  test("panels expose the intended split controls and grids", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font");
    await expect(page.locator("#menu-font .font-button")).toHaveCount(5);
    await expect(page.locator("#menu-font .range-field")).toHaveCount(0);

    await page.locator('.hud-panel-trigger[data-menu="font-size"]').click();
    await expect(page.locator("#menu-font-size input[type=range]")).toHaveCount(3);
    await expect(page.locator("#menu-font-size .toggle")).toHaveCount(0);

    await page.locator('.hud-panel-trigger[data-menu="font-style"]').click();
    await expect(page.locator("#menu-font-style .toggle")).toHaveCount(7);

    await page.locator('.hud-panel-trigger[data-menu="background"]').click();
    const sceneColumns = await page.locator("#menu-background .background-grid").evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length);
    expect(sceneColumns).toBe(3);
  });

  test("slider adjustment fades inactive content and removes blur", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "bar");
    const slider = page.locator("#bar-width");
    await slider.dispatchEvent("pointerdown", { pointerId: 4, pointerType: "touch", clientX: 100, clientY: 100 });
    await page.waitForTimeout(220);

    const state = await page.locator("#menu-bar").evaluate((menu) => ({
      adjusting: menu.classList.contains("is-range-adjusting"),
      blur: getComputedStyle(menu).backdropFilter,
      inactiveOpacity: getComputedStyle(menu.querySelector(".menu-header")).opacity
    }));
    expect(state.adjusting).toBe(true);
    expect(state.blur).toBe("none");
    expect(Number(state.inactiveOpacity)).toBeLessThanOrEqual(0.1);

    await slider.dispatchEvent("pointerup", { pointerId: 4, pointerType: "touch" });
    await expect(page.locator("#menu-bar")).not.toHaveClass(/is-range-adjusting/);
  });

  test("dock fits narrow portrait viewports without document overflow", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await loadEditor(page);
    const result = await page.evaluate(() => {
      const dock = document.querySelector(".hud-panel-triggers").getBoundingClientRect();
      return { width: dock.width, viewport: innerWidth, documentWidth: document.documentElement.scrollWidth };
    });
    expect(result.width).toBeLessThanOrEqual(result.viewport);
    expect(result.documentWidth).toBeLessThanOrEqual(result.viewport);
  });
});

test.describe("landscape panels", () => {
  test.use({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });

  test("uses a vertical dock and places panels to its right", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font-style");
    await page.waitForTimeout(300);

    const result = await page.evaluate(() => {
      const dock = document.querySelector(".hud-panel-triggers").getBoundingClientRect();
      const panel = document.querySelector("#menu-font-style").getBoundingClientRect();
      const button = document.querySelector(".hud-panel-trigger[data-menu=font-style]").getBoundingClientRect();
      const pointer = document.querySelector("#menu-pointer").getBoundingClientRect();
      return {
        dockWidth: dock.width,
        dockHeight: dock.height,
        panelLeft: panel.left,
        dockRight: dock.right,
        panelTop: panel.top,
        panelBottom: panel.bottom,
        pointerLeft: pointer.left,
        pointerTop: pointer.top,
        buttonCentreY: button.top + button.height / 2
      };
    });

    expect(result.dockWidth).toBeLessThan(result.dockHeight);
    expect(result.panelLeft).toBeGreaterThanOrEqual(result.dockRight);
    expect(result.panelTop).toBeGreaterThanOrEqual(0);
    expect(result.panelBottom).toBeLessThanOrEqual(390);
    expect(Math.abs(result.pointerLeft - result.panelLeft)).toBeLessThanOrEqual(1);
    expect(Math.abs(result.pointerTop - result.buttonCentreY)).toBeLessThanOrEqual(1);
  });

  test("opens Share to the left and keeps it inside the viewport", async ({ page }) => {
    await loadEditor(page);
    await page.locator("#share-button").click();
    await expect(page.locator("#share-menu")).toBeVisible();

    const result = await page.evaluate(() => {
      const menu = document.querySelector("#share-menu").getBoundingClientRect();
      const button = document.querySelector("#share-button").getBoundingClientRect();
      return { menu, button };
    });

    expect(result.menu.right).toBeLessThanOrEqual(844);
    expect(result.menu.bottom).toBeLessThanOrEqual(390);
    expect(result.menu.left).toBeLessThan(result.button.left);
  });

  test("keeps a tall panel inside the viewport and scrollable", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font-style");
    const result = await page.evaluate(() => {
      const panel = document.querySelector("#menu-font-style");
      return {
        top: panel.getBoundingClientRect().top,
        bottom: panel.getBoundingClientRect().bottom,
        overflowY: getComputedStyle(panel).overflowY
      };
    });
    expect(result.top).toBeGreaterThanOrEqual(0);
    expect(result.bottom).toBeLessThanOrEqual(390);
    expect(["auto", "scroll"]).toContain(result.overflowY);
  });

  test("narrow landscape keeps a non-overlapping vertical dock", async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await loadEditor(page);
    const result = await page.evaluate(() => {
      const buttons = [...document.querySelectorAll(".hud-panel-trigger")].map((button) => button.getBoundingClientRect());
      const dock = document.querySelector(".hud-panel-triggers").getBoundingClientRect();
      return {
        dock,
        gaps: buttons.slice(1).map((rect, index) => rect.top - buttons[index].bottom),
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight
      };
    });
    // The centered transform includes the dock's 1px border and fractional
    // device-pixel rounding; it must not drift materially off-screen.
    expect(result.dock.left).toBeGreaterThanOrEqual(-6);
    expect(result.dock.bottom).toBeLessThanOrEqual(375);
    expect(result.gaps.every((gap) => gap >= -1)).toBe(true);
    expect(result.documentWidth).toBeLessThanOrEqual(667);
    expect(result.documentHeight).toBeLessThanOrEqual(375);
  });

  test("rotation recalculates the panel side and pointer", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font-style");
    await page.setViewportSize({ width: 844, height: 390 });
    await page.waitForTimeout(100);
    const landscape = await page.evaluate(() => ({
      left: document.querySelector("#menu-font-style").getBoundingClientRect().left,
      dockRight: document.querySelector(".hud-panel-triggers").getBoundingClientRect().right
    }));
    expect(landscape.left).toBeGreaterThanOrEqual(landscape.dockRight - 1);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(100);
    const portrait = await page.evaluate(() => ({
      bottom: document.querySelector("#menu-font-style").getBoundingClientRect().bottom,
      dockTop: document.querySelector(".hud-panel-triggers").getBoundingClientRect().top
    }));
    expect(portrait.bottom).toBeLessThanOrEqual(portrait.dockTop + 1);
  });
});
