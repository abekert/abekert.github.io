const { test, expect } = require("@playwright/test");
const { loadEditor, setText } = require("./helpers");

test.describe("sharing", () => {
  test("opens and closes Share without changing editor text", async ({ page }) => {
    await loadEditor(page);
    const before = await page.locator("#roundel-text").textContent();
    await page.locator("#share-button").click();
    await expect(page.locator("#share-menu")).toBeVisible();
    await page.locator("#share-button").click();
    await expect(page.locator("#share-menu")).toBeHidden();
    await expect(page.locator("#roundel-text")).toHaveText(before);
  });

  test.describe("landscape Share", () => {
    test.use({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });

    test("uses the free horizontal space", async ({ page }) => {
      await loadEditor(page);
      await page.locator("#share-button").click();
      const result = await page.evaluate(() => {
        const menu = document.querySelector("#share-menu").getBoundingClientRect();
        const button = document.querySelector("#share-button").getBoundingClientRect();
        return { menu, button };
      });
      expect(result.menu.left).toBeLessThan(result.button.left);
      expect(result.menu.top).toBeGreaterThanOrEqual(0);
      expect(result.menu.bottom).toBeLessThanOrEqual(390);
    });
  });

  test("format switching is reflected in the share UI", async ({ page }) => {
    await loadEditor(page);
    await page.locator("#share-button").click();
    await page.locator('[data-share-format="card"]').click();
    await expect(page.locator('[data-share-format="card"]')).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#share-format-hint")).toContainText("footer");
    await page.locator('[data-share-format="clean"]').click();
    await expect(page.locator('[data-share-format="clean"]')).toHaveAttribute("aria-pressed", "true");
  });

  test("copy edit link preserves the current editor state", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: "http://127.0.0.1:4173" });
    await loadEditor(page);
    await setText(page, "TAP TO START");
    await page.locator("#share-button").click();
    await page.locator("#copy-link-button").click();
    await expect(page.locator("#export-status")).toHaveText("Link copied.");
    const link = await page.evaluate(() => navigator.clipboard.readText());
    expect(link).toContain("ref=share");
    expect(link).toContain("text=TAP+TO+START");
    expect(link).toContain("preset=custom");
    expect(link).toContain("active=enamel");
  });

  test("editable SVG export contains the current text", async ({ page }) => {
    await loadEditor(page);
    await setText(page, "UNDERGROUND");
    await page.locator("#share-button").click();
    await page.locator(".share-more summary").click();
    const downloadPromise = page.waitForEvent("download");
    await page.locator("#export-svg-button").click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.svg$/);
    const stream = await download.createReadStream();
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const svg = Buffer.concat(chunks).toString("utf8");
    expect(svg).toContain("UNDERGROUND");
    expect(svg).toContain("roundel-svg");
  });

  test("clean and card PNG exports download the selected format", async ({ page }) => {
    test.setTimeout(60_000);

    for (const format of ["clean", "card"]) {
      await page.goto("/roundel/index.html?test=1");
      await page.waitForFunction(() => document.fonts.status === "loaded");
      await page.locator("#share-button").click();
      await page.locator(".share-more summary").click();
      await page.locator(`[data-share-format="${format}"]`).click();
      const downloadPromise = page.waitForEvent("download");
      await page.locator("#export-button").click();
      const download = await downloadPromise;
      const stream = await download.createReadStream();
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      const png = Buffer.concat(chunks);

      expect(download.suggestedFilename()).toMatch(/\.png$/);
      expect(png.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
      expect(png.length).toBeGreaterThan(1000);
      await expect(page.locator("#export-status")).toContainText(format === "card" ? "Share card" : "PNG");
    }
  });

  test("share capability controls reflect the current browser APIs", async ({ page }) => {
    await loadEditor(page);
    await page.locator("#share-button").click();
    const result = await page.evaluate(() => ({
      nativeText: document.querySelector("#native-share-button").textContent.trim(),
      copyHidden: document.querySelector("#copy-image-button").hidden,
      hasShare: typeof navigator.share === "function",
      hasClipboardWrite: Boolean(navigator.clipboard && navigator.clipboard.write),
      hasClipboardItem: typeof window.ClipboardItem === "function"
    }));

    if (result.hasShare && result.hasClipboardWrite && result.hasClipboardItem) {
      expect(result.nativeText).toMatch(/Share image|Share edit link/);
    } else if (result.hasShare) {
      expect(result.nativeText).toBe("Share edit link");
    } else if (result.hasClipboardWrite && result.hasClipboardItem) {
      expect(result.nativeText).toBe("Copy image");
    } else {
      expect(result.nativeText).toBe("Download image");
    }
    expect(result.copyHidden).toBe(!result.hasShare || !result.hasClipboardWrite || !result.hasClipboardItem);
  });
});
