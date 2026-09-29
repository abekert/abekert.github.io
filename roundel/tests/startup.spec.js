const { test, expect } = require("./fixtures");
const { loadStartup } = require("./helpers");

test("startup begins with Make and does not flash the final Tap to start text", async ({ page }) => {
  await loadStartup(page);
  const firstFrame = await page.evaluate(() => ({
    text: document.querySelector("#roundel-text").textContent,
    title: document.querySelector("#roundel-title").textContent,
    booting: document.body.classList.contains("is-booting"),
    background: getComputedStyle(document.body).backgroundImage,
    dockOpacity: getComputedStyle(document.querySelector(".hud-panel-triggers")).opacity
  }));
  expect(firstFrame.text).toBe("MAKE");
  expect(firstFrame.title).toContain("MAKE");
  expect(firstFrame.booting).toBe(true);
  expect(firstFrame.background).toContain("radial-gradient");
  expect(firstFrame.dockOpacity).toBe("0");
  await page.waitForTimeout(120);
  await expect(page.locator("#roundel-text")).not.toHaveText("TAP TO START");
  await page.waitForFunction(() => !document.body.classList.contains("is-booting"), null, { timeout: 8_000 });
  await expect(page.locator(".hud-panel-triggers")).toHaveCSS("opacity", "1");
});

test("startup keeps the Make state through the early animation frames", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-09-29T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-09-29T00:00:01Z"));
  await loadStartup(page);
  const observations = [];
  let elapsed = 0;
  for (const delay of [50, 150, 500]) {
    await page.clock.runFor(delay - elapsed);
    elapsed = delay;
    observations.push(await page.evaluate(() => ({
      text: document.querySelector("#roundel-text").textContent,
      title: document.querySelector("#roundel-title").textContent,
      booting: document.body.classList.contains("is-booting"),
      background: getComputedStyle(document.body).backgroundImage
    })));
  }

  for (const observation of observations) {
    expect(observation.text).toBe("MAKE");
    expect(observation.title).toContain("MAKE");
    expect(observation.booting).toBe(true);
    expect(observation.background).toContain("radial-gradient");
  }
});

test("reduced motion still starts with the Make state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await loadStartup(page);
  await expect(page.locator("body")).not.toHaveClass(/is-booting/);
  await expect(page.locator("#roundel-text")).toHaveText("TAP TO START");
});

test("startup accepts frame timestamps slightly earlier than its animation start", async ({ page }) => {
  await page.addInitScript(() => {
    const requestFrame = window.requestAnimationFrame.bind(window);
    // Model work already performed in a frame before the animation starts.
    window.requestAnimationFrame = (callback) => requestFrame((timestamp) => callback(timestamp - 32));
  });
  await loadStartup(page);
  await page.waitForFunction(() => !document.body.classList.contains("is-booting"), null, { timeout: 8_000 });
  await expect(page.locator("#roundel-text")).toHaveText("TAP TO START");
  expect(await page.locator("#roundel-svg circle").evaluateAll((circles) =>
    circles.every((circle) => Number(circle.getAttribute("r")) >= 0))).toBe(true);
});
