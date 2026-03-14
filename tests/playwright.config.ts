import { defineConfig, devices } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * MrSurety QA – Playwright Configuration
 *
 * Quick start (from the tests/ directory):
 *   cp .env.example .env          # credentials live in .env – no shell quoting needed
 *   npm install
 *   npx playwright install chromium
 *   npx playwright test
 *
 * Live App: https://frontend-tan-five-46.vercel.app
 * Admin:    admin@mrsurety.com  /  set ADMIN_PASSWORD env var
 *
 * Override via environment variable if needed:
 *   MRSURETY_BASE_URL=https://frontend-tan-five-46.vercel.app npx playwright test
 */

// ---------------------------------------------------------------------------
// Load .env from the tests/ directory if it exists.
// This means you never need to run 'export VAR="value!"' in your shell
// (which triggers zsh history expansion on '!').  Just edit .env instead.
// ---------------------------------------------------------------------------
try {
  const envPath = path.join(__dirname, '.env');
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    // Match KEY=value lines; skip comments and blank lines
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m) {
      // Don't override variables that were already set in the shell environment
      process.env[m[1]] ??= m[2];
    }
  }
} catch {
  // .env not found – that's fine; env vars may be set directly in the shell
}

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
