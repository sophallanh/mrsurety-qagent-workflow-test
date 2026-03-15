import { defineConfig, devices } from '@playwright/test';

/**
 * MrSurety QA – Playwright Configuration
 *
 * Live app: https://frontend-tan-five-46.vercel.app
 *
 * To run tests against the live app, either:
 *   a) Copy tests/.env.example → tests/.env and run: cd tests && npm test
 *   b) Pass the URL inline:
 *      MRSURETY_BASE_URL=https://frontend-tan-five-46.vercel.app npx playwright test
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
    baseURL: process.env.MRSURETY_BASE_URL || 'https://frontend-tan-five-46.vercel.app',
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
