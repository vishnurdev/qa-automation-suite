// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const UI_URL = 'https://www.saucedemo.com';
const API_URL = 'https://jsonplaceholder.typicode.com';

module.exports = defineConfig({
  timeout: 30_000,
  expect: { timeout: 7_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    testIdAttribute: 'data-test', // SauceDemo uses data-test="..." on its elements
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: UI_URL },
    },
    {
      name: 'mobile-chrome',
      testDir: './tests/ui',
      grep: /@smoke/, // only the smoke tests on mobile, to keep CI fast
      use: { ...devices['Pixel 7'], baseURL: UI_URL },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: API_URL, extraHTTPHeaders: { Accept: 'application/json' } },
    },
  ],
});
