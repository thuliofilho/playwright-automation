// @ts-check
import { defineConfig, devices } from "@playwright/test";

const config = {
  testDir: "./tests",
  timeout: 40 * 1000, // 
  expect: {
    timeout: 40 * 1000, // only for assertions
  },
  reporter: "html",

  use: {
    browserName: "chromium", //webkit, firefox, etc.
    headless: true,
    screenshot: "on", //on, off
    trace: "retain-on-failure", //on, off
  },
};

module.exports = config;