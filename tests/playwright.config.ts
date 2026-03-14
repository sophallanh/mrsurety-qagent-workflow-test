import { defineConfig, devices } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * MrSurety QA – Playwright Configuration
 *
 * Quick start (from the tests/ directory):
 *   cp .env.example .env          # one-time setup: copies the correct base URL + credentials
 *   npm install
 *   npx playwright install chromium
 *   npx playwright test
 *
 * Live App: https://frontend-tan-five-46.vercel.app
 * Admin:    admin@mrsurety.com  /  see .env.example for credentials
 *
 * To point at a different environment, edit the MRSURETY_BASE_URL line in your .env file.
 * If you have no .env, the hardcoded Vercel URL above is used as a fallback.
 */

// ---------------------------------------------------------------------------
// Load .env from the tests/ directory if it exists.
// Values from .env take precedence over shell environment variables so that
// a stale `export MRSURETY_BASE_URL=https://staging.mrsurety.com` in your
// shell can be corrected simply by running:
//   cp .env.example .env
// ---------------------------------------------------------------------------
try {
  const envPath = path.join(__dirname, '.env');
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    // Match KEY=value lines; skip comments and blank lines
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m) {
      // .env wins over stale shell exports; edit .env to switch environments
      process.env[m[1]] = m[2];
    }
  }
} catch {
  // .env not found – fall back to shell env vars or the hardcoded defaults below
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
