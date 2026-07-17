const { test, expect } = require("@playwright/test");
const { choosePreset, loadEditor, openMenu } = require("./helpers");

test.describe("preset contracts", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("starts the carousel at the beginning", async ({ page }) => {
    await loadEditor(page);
    await expect.poll(() => page.locator(".style-strip").evaluate((strip) => strip.scrollLeft)).toBe(0);
    await expect(page.locator(".style-strip")).toHaveClass(/is-at-start/);
  });

  test("keeps carousel position when selecting a phone preset", async ({ page }) => {
    await loadEditor(page);
    const before = await page.locator(".style-strip").evaluate((strip) => {
      strip.scrollLeft = 120;
      return strip.scrollLeft;
    });

    await page.locator('.style-button[data-preset="rail"]').evaluate((button) => button.click());
    await expect(page.locator('.style-button[data-preset="rail"]')).toHaveClass(/is-active/);
    const after = await page.locator(".style-strip").evaluate((strip) => strip.scrollLeft);
    expect(after).toBe(before);
  });

  test("applies Heritage controls as a complete preset contract", async ({ page }) => {
    await loadEditor(page);
    await choosePreset(page, "heritage");
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await openMenu(page, "font-style");

    await expect(page.locator("#letter-rules")).toBeChecked();
    await expect(page.locator("#hexagonal-letter-rules")).toBeChecked();
    await expect(page.locator("#white-inset")).not.toBeChecked();
    await expect(page.locator("#outer-letter-rules")).not.toBeChecked();
  });

  test("keeps dependent Letter rules controls coherent", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font-style");

    await expect(page.locator("#outer-letter-rules")).toBeDisabled();
    await expect(page.locator("#hexagonal-letter-rules")).toBeDisabled();
    await expect(page.locator("#join-letter-rule-spaces")).toBeDisabled();

    await page.locator("#letter-rules").check();
    await expect(page.locator("#outer-letter-rules")).toBeEnabled();
    await expect(page.locator("#hexagonal-letter-rules")).toBeEnabled();
    await expect(page.locator("#join-letter-rule-spaces")).toBeEnabled();

    await page.locator("#hexagonal-letter-rules").check();
    await expect(page.locator("#join-letter-rule-spaces")).toBeDisabled();
  });

  test("enables Large dots only with Space dots", async ({ page }) => {
    await loadEditor(page);
    await openMenu(page, "font-style");
    await expect(page.locator("#large-space-dots")).toBeDisabled();
    await page.locator("#space-dots").check();
    await expect(page.locator("#large-space-dots")).toBeEnabled();
  });

  test("Transport dot contracts match the reference family", async ({ page }) => {
    const expected = {
      airline: { dots: true, large: true },
      dial: { dots: true, large: false },
      rail: { dots: true, large: false },
      underground: { dots: false, large: false },
      buses: { dots: false, large: false }
    };

    await loadEditor(page);
    await openMenu(page, "font-style");
    for (const [preset, contract] of Object.entries(expected)) {
      await choosePreset(page, preset);
      await expect(page.locator("#space-dots")).toHaveJSProperty("checked", contract.dots);
      await expect(page.locator("#large-space-dots")).toHaveJSProperty("checked", contract.large);
      if (contract.dots) {
        await expect(page.locator("#large-space-dots")).toBeEnabled();
      } else {
        await expect(page.locator("#large-space-dots")).toBeDisabled();
      }
    }
  });

  test("all Transport presets keep the reference geometry family", async ({ page }) => {
    const transport = [
      "underground", "rail", "elizabeth", "overground", "dlr", "river", "trams",
      "buses", "coaches", "cycles", "dial", "taxi", "airline"
    ];

    await loadEditor(page);
    await openMenu(page, "font-style");
    for (const preset of transport) {
      await choosePreset(page, preset);
      const state = await page.evaluate(() => ({
        active: document.querySelector(`.style-button.is-active`).dataset.preset,
        barWidth: Number(document.querySelector("#bar-width").value),
        barHeight: Number(document.querySelector("#bar-height-adjust").value),
        font: document.querySelector("#font-choice").value,
        background: document.querySelector("#background-choice").value,
        gradients: document.querySelector("#use-gradients").checked,
        shadow: document.querySelector("#use-shadow").checked,
        inset: document.querySelector("#white-inset").checked,
        rules: document.querySelector("#letter-rules").checked
      }));

      expect(state.active).toBe(preset);
      expect(state.barWidth).toBe(570);
      expect(state.barHeight).toBe(0);
      expect(state.font).toBe("gill");
      expect(state.background).toBe("none");
      expect(state.gradients).toBe(false);
      expect(state.shadow).toBe(false);
      expect(state.inset).toBe(false);
      expect(state.rules).toBe(false);
    }
  });

  test("preset switching is idempotent and does not leak custom controls", async ({ page }) => {
    await loadEditor(page);
    await choosePreset(page, "heritage");
    const original = await page.evaluate(() => ({
      text: document.querySelector("#roundel-text").textContent,
      barControl: document.querySelector("#bar-width").value,
      hex: document.querySelector("#hexagonal-letter-rules").checked
    }));

    await openMenu(page, "font-style");
    await page.locator("#hexagonal-letter-rules").uncheck();
    await choosePreset(page, "redDisc");
    await choosePreset(page, "heritage");
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const restored = await page.evaluate(() => ({
      text: document.querySelector("#roundel-text").textContent,
      barControl: document.querySelector("#bar-width").value,
      hex: document.querySelector("#hexagonal-letter-rules").checked
    }));

    expect(restored).toEqual(original);
  });

  test("URL state restores size, proportions, dots, and Letter rules", async ({ page }) => {
    await page.goto("/roundel/index.html?preset=heritage&size=12&textheight=118&textwidth=86&dots=1&largedots=0&rules=1&outerrules=1&hexrules=0&joinspaces=0");
    await page.waitForFunction(() => document.fonts.status === "loaded");
    await expect(page.locator("#text-size-adjust")).toHaveValue("12");
    await expect(page.locator("#text-height-adjust")).toHaveValue("118");
    await expect(page.locator("#text-width-adjust")).toHaveValue("86");
    await expect(page.locator("#space-dots")).toBeChecked();
    await expect(page.locator("#large-space-dots")).not.toBeChecked();
    await expect(page.locator("#letter-rules")).toBeChecked();
    await expect(page.locator("#outer-letter-rules")).toBeChecked();
    await expect(page.locator("#hexagonal-letter-rules")).not.toBeChecked();
    await expect(page.locator("#join-letter-rule-spaces")).not.toBeChecked();
  });
});
