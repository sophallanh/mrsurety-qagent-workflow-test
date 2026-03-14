import { defineConfig, devices } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * MrSurety QA – Root-level Playwright Configuration
 *
 * Quick start (from the REPO ROOT):
 *   cp .env.example .env          # credentials live in .env – no shell quoting needed
 *   npm install
 *   npx playwright install chromium
 *   npx playwright test                                        # run all tests
 *   npx playwright test homeowner-workflow-guide-doc5.spec.ts  # run one spec
 *   npx playwright test admin-dashboard.spec.ts                # run admin tests
 *
 * Live App: https://frontend-tan-five-46.vercel.app
 * Admin:    admin@mrsurety.com / see .env.example for default password
 *
 * Env vars can also be overridden inline:
 *   MRSURETY_BASE_URL=https://staging.example.com npx playwright test
 */

// ---------------------------------------------------------------------------
// Load .env from the repo root if it exists.
// Values from .env take precedence over shell environment variables so that
// a stale `export MRSURETY_BASE_URL=https://staging.mrsurety.com` in your
// shell can be corrected simply by running: cp .env.example .env
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
