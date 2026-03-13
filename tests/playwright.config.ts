import { defineConfig, devices } from '@playwright/test';

/**
 * MrSurety QA – Playwright Configuration
 *
 * Set MRSURETY_BASE_URL environment variable to the staging/production URL
 * before running tests. Example:
 *   MRSURETY_BASE_URL=https://staging.mrsurety.com npx playwright test
 */
export default defineConfig({
  testDir: './playwright',
  timeout: 60_000,
  retries: 1,
  reporter: [
    ['html', { outputFolder: '../qa/test-results/playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.MRSURETY_BASE_URL || 'https://staging.mrsurety.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
