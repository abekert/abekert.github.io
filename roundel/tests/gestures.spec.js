const { test, expect } = require("@playwright/test");
const { loadEditor } = require("./helpers");

test.describe("touch interaction", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("clears preset preview when a touch becomes a scroll", async ({ page }) => {
    await loadEditor(page);
    const result = await page.locator(".style-strip").evaluate((strip) => {
      const button = strip.querySelector(".style-button");
      const bounds = button.getBoundingClientRect();
      strip.dispatchEvent(new PointerEvent("pointerdown", {
        bubbles: true,
        pointerId: 7,
        pointerType: "touch",
        clientX: bounds.left + 10,
        clientY: bounds.top + 10
      }));
      strip.dispatchEvent(new PointerEvent("pointermove", {
        bubbles: true,
        pointerId: 7,
        pointerType: "touch",
        clientX: bounds.left + 35,
        clientY: bounds.top + 10
      }));
      return {
        scrolling: strip.classList.contains("is-scroll-gesture"),
        previewCount: strip.querySelectorAll(".is-preview").length
      };
    });

    expect(result.scrolling).toBe(true);
    expect(result.previewCount).toBe(0);
  });

  test("disables system selection for controls but not the text input", async ({ page }) => {
    await loadEditor(page);
    const values = await page.evaluate(() => ({
      button: getComputedStyle(document.querySelector(".hud-panel-trigger")).userSelect,
      panel: getComputedStyle(document.querySelector(".floating-menu")).userSelect,
      input: getComputedStyle(document.querySelector("#sign-text")).userSelect
    }));

    expect(values.button).toBe("none");
    expect(values.panel).toBe("none");
    expect(values.input).toBe("auto");
  });

  test("preset rail uses horizontal touch scrolling and remains scrollable", async ({ page }) => {
    await loadEditor(page);
    const result = await page.evaluate(() => ({
      touchAction: getComputedStyle(document.querySelector(".style-strip")).touchAction,
      overflowX: getComputedStyle(document.querySelector(".style-strip")).overflowX,
      viewport: document.querySelector('meta[name="viewport"]').getAttribute("content")
    }));
    expect(result.touchAction).toContain("pan-x");
    expect(["auto", "scroll"]).toContain(result.overflowX);
    expect(result.viewport).toContain("user-scalable=no");
    expect(result.viewport).toContain("maximum-scale=1");
  });

  test("a touch tap selects a preset without a swipe", async ({ page }) => {
    await loadEditor(page);
    const target = page.locator('.style-button[data-preset="rail"]');
    await target.click();
    await expect(target).toHaveClass(/is-active/);
  });

  test("long press cannot select preset or panel labels", async ({ page }) => {
    await loadEditor(page);
    await page.locator(".style-button").first().dispatchEvent("pointerdown", {
      pointerId: 8, pointerType: "touch", clientX: 40, clientY: 40
    });
    await page.waitForTimeout(650);
    const result = await page.evaluate(() => ({
      selection: window.getSelection().toString(),
      button: getComputedStyle(document.querySelector(".style-button")).userSelect,
      label: getComputedStyle(document.querySelector(".toggle")).userSelect
    }));
    expect(result.selection).toBe("");
    expect(result.button).toBe("none");
    expect(result.label).toBe("none");
  });

  test("the document stays fixed while panels and dock are used", async ({ page }) => {
    await loadEditor(page);
    await page.locator('.hud-panel-trigger[data-menu="font-style"]').click();
    const result = await page.evaluate(() => ({
      bodyOverflow: getComputedStyle(document.body).overflow,
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      viewportWidth: innerWidth,
      viewportHeight: innerHeight
    }));
    expect(result.bodyOverflow).toBe("hidden");
    expect(result.documentWidth).toBeLessThanOrEqual(result.viewportWidth);
    expect(result.documentHeight).toBeLessThanOrEqual(result.viewportHeight);
  });
});
