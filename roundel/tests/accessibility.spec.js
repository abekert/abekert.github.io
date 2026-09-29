const { test, expect } = require("./fixtures");
const { loadEditor } = require("./helpers");

test("Share contains keyboard focus and returns it on Escape or Close", async ({ page }) => {
  await loadEditor(page);
  const share = page.locator("#share-button");
  const close = page.getByRole("button", { name: "Close share menu" });
  const privacy = page.locator(".share-privacy");
  await share.focus();
  await page.keyboard.press("Enter");
  await expect(close).toBeFocused();
  await expect(page.locator("#roundel-form")).toHaveAttribute("inert", "");
  await page.keyboard.press("Shift+Tab");
  await expect(privacy).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#share-menu")).toBeHidden();
  await expect(share).toBeFocused();
  await expect(page.locator("#roundel-form")).not.toHaveAttribute("inert", "");
  await page.keyboard.press("Enter");
  await close.click();
  await expect(share).toBeFocused();
  await page.locator("#sign-text").fill("STILL EDITABLE");
  await expect(page.locator("#roundel-text")).toHaveText("STILL EDITABLE");
});

test.describe("mobile accessibility", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("Share stays open while the user reads it", async ({ page }) => {
    await loadEditor(page);
    await page.locator("#share-button").click();
    await page.waitForTimeout(3500);
    await expect(page.getByRole("dialog", { name: "Share and export" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Close share menu" })).toBeFocused();
  });

  test("a touch pinch zooms the page without editing the sign", async ({ page, context }) => {
    await loadEditor(page);
    const before = await page.locator("#roundel-text").textContent();
    const client = await context.newCDPSession(page);
    await client.send("Input.synthesizePinchGesture", {
      x: 195, y: 300, scaleFactor: 2, gestureSourceType: "touch"
    });
    await expect.poll(() => page.evaluate(() => window.visualViewport.scale)).toBeGreaterThan(1.5);
    await expect(page.locator("#roundel-text")).toHaveText(before);
    await client.detach();
  });

  for (const width of [320, 390]) {
    test(`resize targets remain usable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await loadEditor(page);
      const targets = await page.locator(".bar-grip").evaluateAll((grips) => grips.map((grip) => {
        const box = grip.getBoundingClientRect();
        const points = [[box.left + 2, box.top + 2], [box.right - 2, box.bottom - 2]];
        return {
          width: box.width, height: box.height, left: box.left, right: box.right,
          action: getComputedStyle(grip).touchAction,
          reachable: points.every(([x, y]) => document.elementFromPoint(x, y)?.closest(".bar-grip") === grip)
        };
      }));
      for (const target of targets) {
        expect(target.width).toBeGreaterThanOrEqual(44);
        expect(target.height).toBeGreaterThanOrEqual(44);
        expect(target.left).toBeGreaterThanOrEqual(-1);
        expect(target.right).toBeLessThanOrEqual(width + 1);
        expect(target.reachable).toBe(true);
        expect(target.action).toContain("pinch-zoom");
      }
      await page.locator("#sign-text").fill("ACCESSIBLE");
      await expect(page.locator("#roundel-text")).toHaveText("ACCESSIBLE");
    });
  }
});
