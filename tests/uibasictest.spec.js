const {test, expect} = require('@playwright/test');

// Test case 1: page title validation
test("Page title validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
}); 

// Test case 2: valid login / password
test("Valid login / password", async ({page}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2");
  await page.locator("#signInBtn").click();
  console.log(await page.locator(':text-is("ProtoCommerce Home")').textContent());
  await expect(page.locator(':text-is("ProtoCommerce Home")')).toContainText("ProtoCommerce Home");
});

// Test case 3: invalid login / password
test("Invalid login / password", async ({page}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("1234");
  await page.locator("#password").fill("1234");
  await page.locator("#signInBtn").click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

// Test case 4: empty login / password
test("Empty login / password", async ({page}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("");
  await page.locator("#password").fill("");
  await page.locator("#signInBtn").click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Empty");
});

// Test case 5: ratio button / dropdown
test.only("UI controls", async ({page}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const documentLink = page.locator("[href*='documents-request']");

  // static dropdown
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("Consultant");

  // ratio button
  await page.locator(".radiotextsty").last().click(); // last()   ou nth(número que você quiser)
  await page.locator("#okayBtn").click();
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  // unchecked checkbox
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  // checked checkbox
  await page.locator("#terms").check();
  await expect(page.locator("#terms")).toBeChecked();

  // blinking link
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});