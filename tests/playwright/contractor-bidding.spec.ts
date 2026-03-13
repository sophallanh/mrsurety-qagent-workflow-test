import { test, expect, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Contractor Bidding Workflow Tests
 *
 * Covers:
 *   - Contractor logs in and views available job
 *   - Contractor submits bid / uploads estimate
 *   - Homeowner receives notification and selects estimate
 *   - Homeowner completes deposit and picks calendar date
 *
 * ⚠️  Update BASE_URL via MRSURETY_BASE_URL environment variable
 *      before running against staging/production.
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/contractor-bidding');
const sampleEstimatePath = path.join(__dirname, 'fixtures/sample-estimate.pdf');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

test.describe('Contractor Bidding Workflow', () => {
  test('Contractor views available job and submits a bid', async ({ page }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-available-jobs"]');
    const firstJob = page.locator('[data-testid="job-item"]').first();
    await expect(firstJob).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '01_available-jobs-list.png') });

    await firstJob.click();
    await expect(page.locator('[data-testid="job-detail"]')).toBeVisible();

    // Submit a bid via the bid creator
    await page.click('[data-testid="create-bid-btn"]');
    await expect(page.locator('[data-testid="bid-creator"]')).toBeVisible();

    await page.fill('[data-testid="bid-amount"]', '2500');
    await page.fill('[data-testid="bid-description"]', 'Complete kitchen water damage repair including drywall, flooring, and repainting.');

    await page.screenshot({ path: path.join(screenshotDir, '02_bid-creator-filled.png') });

    await page.click('[data-testid="bid-submit"]');
    await expect(page.locator('[data-testid="bid-submitted-confirmation"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '03_bid-submitted-confirmation.png') });
  });

  test('Contractor uploads an estimate document', async ({ page }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-my-bids"]');
    const firstBid = page.locator('[data-testid="bid-item"]').first();
    await firstBid.click();

    // Skip file upload if sample estimate PDF has not been added to fixtures yet
    if (!fs.existsSync(sampleEstimatePath)) {
      test.skip(true, `Sample estimate PDF not found at ${sampleEstimatePath}. Add the file to run this test.`);
    }

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('[data-testid="upload-estimate-btn"]'),
    ]);
    await fileChooser.setFiles(sampleEstimatePath);

    await expect(page.locator('[data-testid="estimate-uploaded"]')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, '04_estimate-uploaded.png') });
  });

  test('Homeowner selects contractor estimate', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-my-requests"]');
    const request = page.locator('[data-testid="service-request-item"]').first();
    await request.click();

    await expect(page.locator('[data-testid="bids-section"]')).toBeVisible();
    const firstBid = page.locator('[data-testid="bid-card"]').first();
    await expect(firstBid).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '05_homeowner-bid-review.png') });

    await firstBid.locator('[data-testid="select-bid-btn"]').click();
    await expect(page.locator('[data-testid="bid-selected-confirmation"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '06_bid-selected.png') });
  });

  test('Homeowner completes deposit and picks service date', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-my-requests"]');
    const request = page.locator('[data-testid="service-request-item"]').first();
    await request.click();

    // Deposit flow
    await page.click('[data-testid="pay-deposit-btn"]');
    await expect(page.locator('[data-testid="deposit-form"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '07_deposit-form.png') });

    await page.fill('[data-testid="card-number"]', '4111111111111111');
    await page.fill('[data-testid="card-expiry"]', '12/27');
    await page.fill('[data-testid="card-cvc"]', '123');
    await page.click('[data-testid="deposit-submit"]');

    await expect(page.locator('[data-testid="deposit-confirmed"]')).toBeVisible();

    // Calendar date selection
    await expect(page.locator('[data-testid="date-picker"]')).toBeVisible();
    await page.click('[data-testid="date-picker-next-available"]');
    await page.click('[data-testid="confirm-date-btn"]');

    await expect(page.locator('[data-testid="date-confirmed"]')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, '08_date-confirmed.png') });
  });
});
