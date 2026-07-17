const { test, expect } = require("@playwright/test");
const { choosePreset, loadEditor, openMenu, readTextBounds, setRange, setText } = require("./helpers");

test.describe("text geometry", () => {
  test("Bar grips resize only the Bar geometry", async ({ page }) => {
    await loadEditor(page);
    const beforeText = await readTextBounds(page);
    const beforeBar = await page.locator("#bar-fill").evaluate((node) => {
      const box = node.getBBox();
      return { width: box.width, height: box.height };
    });
    const rightGrip = page.locator(".bar-grip-right");
    const rightBox = await rightGrip.boundingBox();

    await page.mouse.move(rightBox.x + rightBox.width / 2, rightBox.y + rightBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(rightBox.x + rightBox.width / 2 + 36, rightBox.y + rightBox.height / 2);
    await page.mouse.up();
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

    const afterWidthText = await readTextBounds(page);
    const afterWidthBar = await page.locator("#bar-fill").evaluate((node) => {
      const box = node.getBBox();
      return { width: box.width, height: box.height };
    });
    expect(afterWidthBar.width).toBeGreaterThan(beforeBar.width);
    expect(Math.abs(afterWidthText.width - beforeText.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(afterWidthText.height - beforeText.height)).toBeLessThanOrEqual(1);

    const topGrip = page.locator(".bar-grip-top");
    const topBox = await topGrip.boundingBox();
    await page.mouse.move(topBox.x + topBox.width / 2, topBox.y + topBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(topBox.x + topBox.width / 2, topBox.y + topBox.height / 2 - 24);
    await page.mouse.up();
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

    const afterHeightText = await readTextBounds(page);
    const afterHeightBar = await page.locator("#bar-fill").evaluate((node) => {
      const box = node.getBBox();
      return { width: box.width, height: box.height };
    });
    expect(afterHeightBar.height).toBeGreaterThan(beforeBar.height);
    expect(Math.abs(afterHeightText.width - beforeText.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(afterHeightText.height - beforeText.height)).toBeLessThanOrEqual(1);
  });

  test("Heritage caret follows the visible transformed text", async ({ page }) => {
    await loadEditor(page);
    await choosePreset(page, "heritage");
    await setText(page, "UNDERGROUND");
    await page.locator("#sign-text").focus();
    await page.locator("#sign-text").evaluate((input) => {
      input.setSelectionRange(5, 5);
      input.dispatchEvent(new Event("select", { bubbles: true }));
      document.dispatchEvent(new Event("selectionchange"));
    });
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

    const result = await page.evaluate(() => {
      const caret = document.querySelector(".heritage-input-caret");
      const liveText = document.querySelector("#roundel-text");
      const caretBox = caret.getBoundingClientRect();
      const textBox = liveText.getBoundingClientRect();
      return {
        hidden: caret.hidden,
        height: caretBox.height,
        x: caretBox.x,
        textLeft: textBox.left,
        textRight: textBox.right,
        top: caretBox.top,
        textTop: textBox.top,
        textBottom: textBox.bottom
      };
    });

    expect(result.hidden).toBe(false);
    expect(result.height).toBeGreaterThan(20);
    expect(result.x).toBeGreaterThanOrEqual(result.textLeft - 2);
    expect(result.x).toBeLessThanOrEqual(result.textRight + 2);
    expect(result.top).toBeGreaterThanOrEqual(result.textTop - 2);
    expect(result.top + result.height).toBeLessThanOrEqual(result.textBottom + 2);
  });

  test("Bar width changes do not resize the text", async ({ page }) => {
    await loadEditor(page);
    const before = await readTextBounds(page);
    const barWidth = await page.locator("#bar-width").getAttribute("max");
    await setRange(page, "bar-width", barWidth);
    const after = await readTextBounds(page);
    expect(Math.abs(after.width - before.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(after.height - before.height)).toBeLessThanOrEqual(1);
  });

  test("Bar Thickness changes do not resize text and respect the text minimum", async ({ page }) => {
    await loadEditor(page);
    const before = await readTextBounds(page);
    const input = page.locator("#bar-height-adjust");
    await setRange(page, "bar-height-adjust", -72);
    const after = await readTextBounds(page);
    const bar = await page.locator("#bar-fill").evaluate((node) => {
      const box = node.getBBox();
      return { x: box.x, y: box.y, width: box.width, height: box.height };
    });

    expect(Math.abs(after.width - before.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(after.height - before.height)).toBeLessThanOrEqual(1);
    expect(Number(await input.inputValue())).toBeGreaterThanOrEqual(Number(await input.getAttribute("min")));
    expect(bar.height).toBeGreaterThan(64);
  });

  test("Width and Height controls affect independent axes", async ({ page }) => {
    await loadEditor(page);
    const initial = await readTextBounds(page);
    await openMenu(page, "font-size");

    await setRange(page, "text-width-adjust", 120);
    const wider = await readTextBounds(page);
    expect(wider.width).toBeGreaterThan(initial.width);
    expect(Math.abs(wider.height - initial.height)).toBeLessThanOrEqual(2);

    await setRange(page, "text-width-adjust", 100);
    await setRange(page, "text-height-adjust", 120);
    const taller = await readTextBounds(page);
    expect(taller.height).toBeGreaterThan(initial.height);
    expect(Math.abs(taller.width - initial.width)).toBeLessThanOrEqual(2);
  });

  test("Size is monotonic and reset restores the default", async ({ page }) => {
    await loadEditor(page);
    await setText(page, "TAP");
    await openMenu(page, "font-size");
    const values = [];

    for (const value of [0, 16, 32]) {
      await setRange(page, "text-size-adjust", value);
      values.push((await readTextBounds(page)).width);
    }

    expect(values[1]).toBeGreaterThanOrEqual(values[0]);
    expect(values[2]).toBeGreaterThanOrEqual(values[1]);
    await setRange(page, "text-size-adjust", 0);
    await expect(page.locator('[data-reset-control="text-size-adjust"]')).toBeDisabled();
    await setRange(page, "text-size-adjust", 24);
    await expect(page.locator('[data-reset-control="text-size-adjust"]')).toBeEnabled();
    await page.locator('[data-reset-control="text-size-adjust"]').click();
    await expect(page.locator("#text-size-adjust")).toHaveValue("0");
    await expect(page.locator('[data-reset-control="text-size-adjust"]')).toBeDisabled();
  });

  test("reset buttons reserve a stable hit area", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font-size");
    const result = await page.locator('[data-reset-control="text-size-adjust"]').evaluate((button) => ({
      width: button.getBoundingClientRect().width,
      height: button.getBoundingClientRect().height,
      display: getComputedStyle(button).display
    }));

    expect(result.width).toBeGreaterThanOrEqual(24);
    expect(result.height).toBeGreaterThanOrEqual(24);
    expect(result.display).not.toBe("none");
  });

  test("Heritage renders ornaments using the text colour", async ({ page }) => {
    await loadEditor(page);
    await choosePreset(page, "heritage");
    await setText(page, "HELLO\nWORLD");

    const result = await page.evaluate(() => {
      const ornaments = document.querySelector("#bar-ornaments");
      const text = document.querySelector("#roundel-text");
      return {
        children: ornaments.children.length,
        ornamentFill: ornaments.getAttribute("fill"),
        textFill: text.getAttribute("fill")
      };
    });

    expect(result.children).toBeGreaterThan(0);
    expect(result.ornamentFill).toBe(result.textFill);
  });

  test("multiline Heritage rules are present without document overflow", async ({ page }) => {
    await loadEditor(page);
    await choosePreset(page, "modernRules");
    await setText(page, "HELLO\nWORLD");
    await openMenu(page, "font-style");

    await expect(page.locator("#letter-rules")).toBeChecked();
    const overflow = await page.evaluate(() => ({
      ornaments: document.querySelector("#bar-ornaments").children.length,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth
    }));
    expect(overflow.ornaments).toBeGreaterThan(0);
    expect(overflow.documentWidth).toBeLessThanOrEqual(overflow.viewportWidth);
  });

  test("outer rules follow the complete first and last glyph bounds", async ({ page }) => {
    await loadEditor(page);
    await choosePreset(page, "modernRules");
    await setText(page, "TUTOR");
    await openMenu(page, "font-style");

    const result = await page.evaluate(() => {
      const text = document.querySelector("#roundel-text");
      const line = text.querySelector("[data-line-index='0']");
      const barBox = document.querySelector("#bar-fill").getBBox();
      const rules = [...document.querySelectorAll("#bar-ornaments line")];
      const outer = rules.slice().sort((a, b) => Number(a.getAttribute("y1")) - Number(b.getAttribute("y1")));
      const box = text.getBBox();
      return {
        text: { x: box.x, y: box.y, width: box.width, height: box.height },
        bar: { x: barBox.x, y: barBox.y, width: barBox.width, height: barBox.height },
        first: { x1: Number(outer[0].getAttribute("x1")), x2: Number(outer[0].getAttribute("x2")) },
        last: { x1: Number(outer[outer.length - 1].getAttribute("x1")), x2: Number(outer[outer.length - 1].getAttribute("x2")) },
        count: rules.length
      };
    });

    expect(result.count).toBe(4);
    expect(result.first.x1).toBeGreaterThanOrEqual(result.text.x - 1);
    expect(result.last.x2).toBeLessThanOrEqual(result.text.x + result.text.width + 1);
    expect(result.first.x1).toBeGreaterThan(result.bar.x);
    expect(result.last.x2).toBeLessThan(result.bar.x + result.bar.width);
  });

  test("multiline rules have independent rows and symmetric vertical offsets", async ({ page }) => {
    await loadEditor(page);
    await choosePreset(page, "modernRules");
    await setText(page, "HELLO\nWORLD");
    await openMenu(page, "font-style");

    const rows = await page.locator("#bar-ornaments line").evaluateAll((lines) => {
      return lines.map((line) => Number(line.getAttribute("y1"))).sort((a, b) => a - b);
    });

    expect(rows.length).toBe(8);
    expect(new Set(rows.map((value) => Math.round(value))).size).toBeGreaterThanOrEqual(4);
    expect(rows[3]).toBeLessThan(rows[4]);
    expect(rows[0]).toBeLessThan(rows[rows.length - 1]);
  });

  test("hexagons are per-glyph, skip spaces, point outward, and use text colour", async ({ page }) => {
    await loadEditor(page);
    await choosePreset(page, "heritage");
    await setText(page, "AB CD");
    await openMenu(page, "font-style");

    const result = await page.evaluate(() => {
      const paths = [...document.querySelectorAll("#bar-ornaments path")];
      const text = document.querySelector("#roundel-text");
      return {
        count: paths.length,
        fill: document.querySelector("#bar-ornaments").getAttribute("fill"),
        textFill: getComputedStyle(text).fill,
        paths: paths.map((path) => path.getAttribute("d"))
      };
    });

    expect(result.count).toBe(4);
    expect(result.fill).toBe(result.textFill);
    result.paths.forEach((path) => {
      expect(path).toMatch(/^M[-0-9.]+ [-0-9.]+L[-0-9.]+ [-0-9.]+H[-0-9.]+L/);
      expect(path).toContain("Z");
    });
  });

  test("Join spaces merges ordinary rules, while hexagons remain separated", async ({ page }) => {
    await loadEditor(page);
    await choosePreset(page, "heritage");
    await setText(page, "AB CD");
    await openMenu(page, "font-style");
    await page.locator("#hexagonal-letter-rules").uncheck();

    await page.locator("#join-letter-rule-spaces").check();
    const joined = await page.locator("#bar-ornaments line").count();
    await page.locator("#join-letter-rule-spaces").uncheck();
    const separated = await page.locator("#bar-ornaments line").count();

    expect(joined).toBe(2);
    expect(separated).toBe(4);
  });

  test("space dots replace spaces and keep adjacent glyphs apart", async ({ page }) => {
    await loadEditor(page);
    await setText(page, "TAP TO START");
    await openMenu(page, "font-style");
    await page.locator("#space-dots").check();

    const result = await page.evaluate(() => {
      const text = document.querySelector("#roundel-text");
      return {
        value: text.textContent,
        dxCount: text.querySelectorAll("[dx]").length,
        dots: (text.textContent.match(/·/g) || []).length
      };
    });

    expect(result.dots).toBe(2);
    expect(result.value).not.toContain(" ");
    expect(result.dxCount).toBeGreaterThan(0);
  });

  test("Wall Style keeps its cast geometry behind an opaque Bar outline", async ({ page }) => {
    await loadEditor(page);
    await choosePreset(page, "wallMount");
    await page.waitForTimeout(900);

    const result = await page.evaluate(() => {
      const ringCast = document.querySelector("#wall-depth-ring-cast");
      const barCast = document.querySelector("#wall-depth-bar-cast");
      const border = document.querySelector("#bar-border");
      const bar = document.querySelector("#bar-fill").getBBox();
      return {
        stage: document.querySelector("#roundel-stage").className,
        ringPath: ringCast.getAttribute("d"),
        barPath: barCast.getAttribute("d"),
        borderOpacity: Number(border.getAttribute("stroke-opacity")),
        borderWidth: Number(border.getAttribute("stroke-width")),
        bar: { x: bar.x, y: bar.y, width: bar.width, height: bar.height }
      };
    });

    expect(result.stage).toContain("is-wall-mount");
    expect(result.ringPath.length).toBeGreaterThan(40);
    expect(result.barPath.length).toBeGreaterThan(40);
    expect(result.borderOpacity).toBe(1);
    expect(result.borderWidth).toBeGreaterThan(0);
    expect(result.bar.width).toBeGreaterThan(0);
    expect(result.bar.height).toBeGreaterThan(0);
  });
});
