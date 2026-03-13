import { defineConfig, devices } from '@playwright/test';

/**
 * MrSurety QA – Playwright Configuration
 *
 * Live App: https://frontend-tan-five-46.vercel.app
 * Admin:    admin@mrsurety.com  /  set ADMIN_PASSWORD env var
 *
 * Override via environment variable if needed:
 *   MRSURETY_BASE_URL=https://frontend-tan-five-46.vercel.app npx playwright test
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
