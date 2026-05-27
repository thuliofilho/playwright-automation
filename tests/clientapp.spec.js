const { test, expect } = require("@playwright/test");

test.only("E2E", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const email = "thulioqaeng@gmail.com";
  const productName = "ZARA COAT 3";
  const products = await page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("h3:has-text('ZARA COAT 3')").first().waitFor();

  const inTheCart = await page
    .locator("h3:has-text('ZARA COAT 3')")
    .isVisible();
  expect(inTheCart).toBeTruthy();

  await page.locator("text=Checkout").click();

  const dropdownDateMonth = page.locator("select").nth(0);
  await dropdownDateMonth.selectOption("01");

  const dropdownDateDay = page.locator("select").nth(1);
  await dropdownDateDay.selectOption("16");

  await page
    .locator("//div[@class='payment__cc']//div[2]//input[1]")
    .fill("800");

  await page
    .locator("[placeholder*='Country']")
    .pressSequentially("bra", { delay: 150 });

  await page.waitForSelector(".ta-results");
  await page.locator("button.ta-item:has-text('Brazil')").click();

  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email,
  );
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
});
