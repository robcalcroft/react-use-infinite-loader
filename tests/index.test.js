describe("react-use-infinite-loader", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:1234");
  });

  it("should load 20 items on load", async () => {
    await page.waitForSelector(".item");
    const itemsCount = await page.evaluate(
      () => document.querySelectorAll(".item").length
    );
    expect(itemsCount).toBe(20);
  });

  it("should load 20 new items when you scroll to the bottom (40 in total)", async () => {
    // Scroll to the bottom of the page
    await page.evaluate(() => window.scrollTo(0, 10000));
    // Wait for a fake load time
    await page.waitFor(1000);
    const itemsCount = await page.evaluate(
      () => document.querySelectorAll(".item").length
    );
    expect(itemsCount).toBe(40);
  });
});
