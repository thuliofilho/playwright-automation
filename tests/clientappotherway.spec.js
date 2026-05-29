const { test, expect } = require("@playwright/test");

test("E2E", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const email = "thulioqaeng@gmail.com";
  const productName = "ZARA COAT 3";
  const products = await page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add To Cart" }).click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole('button', {name:"Checkout"}).click();

  const dropdownDateMonth = page.locator("select").nth(0);
  await dropdownDateMonth.selectOption("01");

  const dropdownDateDay = page.locator("select").nth(1);
  await dropdownDateDay.selectOption("16");

  await page.getByRole('textbox').nth(1).fill("800")

  await page.locator("div input").nth(2).fill("User Test")

  await page.getByPlaceholder("Select Country")
    .pressSequentially("bra", { delay: 150 });

  await page.getByRole("button", {name:"Brazil"}).click();

  await expect(page.getByText(email).first()).toHaveText(
    email,
  );
  await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();


  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
});

