const { test, expect } = require("./fixtures");

for (const width of [390, 1280]) {
  test(`homepage loads one responsive portrait at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    const requests = [];
    page.on("request", (request) => {
      if (request.url().includes("/images/alexander-bekert")) requests.push(request.url());
    });
    await page.goto("/");
    const portrait = page.getByRole("img", { name: "Portrait of Alexander Bekert" });
    await expect.poll(() => portrait.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    const photo = await portrait.evaluate((img) => ({
      source: img.currentSrc, width: img.clientWidth, height: img.clientHeight
    }));
    expect(photo.source).toMatch(/alexander-bekert-(320|640|960|1600)\.avif$/);
    expect(Math.abs(photo.width - photo.height)).toBeLessThanOrEqual(1);
    expect(requests).toHaveLength(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}

for (const [path, count] of [["/pushout/", 1], ["/pushout/html/story.html", 2], ["/pushout/html/trottoir.html", 1]]) {
  test(`YouTube connects only after activation on ${path}`, async ({ page }) => {
    const youtubeRequests = [];
    // Keep this regression independent of Google Fonts and YouTube availability.
    await page.route("https://fonts.googleapis.com/**", (route) => route.fulfill({ contentType: "text/css", body: "" }));
    await page.route("https://www.youtube-nocookie.com/**", (route) => route.fulfill({ contentType: "text/html", body: "<title>Test video</title>" }));
    page.on("request", (request) => {
      if (/youtube|ytimg/.test(new URL(request.url()).hostname)) youtubeRequests.push(request.url());
    });
    await page.goto(path);
    await page.locator("body").press("End");
    await expect(page.locator("a.video-preview")).toHaveCount(count);
    await expect(page.locator("iframe")).toHaveCount(0);
    expect(youtubeRequests).toHaveLength(0);
    const preview = page.locator("a.video-preview").first();
    const title = await preview.getAttribute("data-video-title");
    const box = await preview.boundingBox();
    await preview.press("Enter");
    const player = page.locator("iframe");
    await expect(player).toHaveAttribute("title", title);
    await expect(player).toHaveAttribute("src", /youtube-nocookie\.com\/embed\/.*autoplay=1/);
    await expect(player).toBeFocused();
    expect(youtubeRequests).toHaveLength(1);
    await expect(page.locator("a.video-preview")).toHaveCount(count - 1);
    const playerBox = await player.boundingBox();
    expect(Math.abs(playerBox.width - box.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(playerBox.height - box.height)).toBeLessThanOrEqual(1);
  });
}

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("video preview remains a usable YouTube link", async ({ page }) => {
    await page.route("https://fonts.googleapis.com/**", (route) => route.fulfill({ contentType: "text/css", body: "" }));
    await page.goto("/pushout/");
    await expect(page.getByRole("link", { name: "Play Push Out trailer" })).toHaveAttribute("href", "https://www.youtube.com/watch?v=-lYyybNpL7s");
    await expect(page.locator("iframe")).toHaveCount(0);
  });
});
