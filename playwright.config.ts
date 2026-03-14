import { defineConfig, devices } from '@playwright/test';

/**
 * MrSurety QA – Root-level Playwright Configuration
 *
 * This file lets you run tests from the REPO ROOT without needing to
 * cd into the tests/ subdirectory first:
 *
 *   npm install && npx playwright install chromium
 *   npx playwright test                                       # run all tests
 *   npx playwright test homeowner-workflow-guide-doc5.spec.ts # run one file
 *   npx playwright test admin-dashboard.spec.ts               # run admin tests
 *
 * Live App: https://frontend-tan-five-46.vercel.app
 * Admin:    admin@mrsurety.com  /  set ADMIN_PASSWORD env var
 *
 * Override base URL:
 *   MRSURETY_BASE_URL=https://frontend-tan-five-46.vercel.app npx playwright test
 */
export default defineConfig({
  testDir: './tests/playwright',
  timeout: 60_000,
  retries: 1,
  reporter: [
    ['html', { outputFolder: 'qa/test-results/playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.MRSURETY_BASE_URL || 'https://frontend-tan-five-46.vercel.app',
    screenshot: 'on',
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
