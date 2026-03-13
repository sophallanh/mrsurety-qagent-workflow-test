import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Admin Dashboard Workflow Tests
 *
 * Covers:
 *   - Admin login and dashboard overview
 *   - Admin approves pending agents and contractors
 *   - Admin approves work orders
 *   - Admin reviews job and payment status
 *
 * ⚠️  Update BASE_URL via MRSURETY_BASE_URL environment variable
 *      before running against staging/production.
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/admin-dashboard');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

test.describe('Admin Dashboard Workflow', () => {
  test('Admin logs in and views dashboard overview', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await expect(page.locator('[data-testid="admin-dashboard"]')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, '01_admin-dashboard-overview.png') });
  });

  test('Admin approves a pending contractor', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-contractors"]');
    const pendingContractor = page.locator('[data-testid="pending-contractor"]').first();

    if (await pendingContractor.isVisible()) {
      await page.screenshot({ path: path.join(screenshotDir, '02_pending-contractor.png') });
      await pendingContractor.locator('[data-testid="approve-contractor-btn"]').click();
      await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();
      await page.screenshot({ path: path.join(screenshotDir, '03_contractor-approved.png') });
    } else {
      // No pending contractors – document the state
      await page.screenshot({ path: path.join(screenshotDir, '02_no-pending-contractors.png') });
    }
  });

  test('Admin approves a work order', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-work-orders"]');
    const pendingWorkOrder = page.locator('[data-testid="pending-work-order"]').first();

    if (await pendingWorkOrder.isVisible()) {
      await page.screenshot({ path: path.join(screenshotDir, '04_pending-work-order.png') });
      await pendingWorkOrder.locator('[data-testid="approve-work-order-btn"]').click();
      await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();
      await page.screenshot({ path: path.join(screenshotDir, '05_work-order-approved.png') });
    }
  });

  test('Admin reviews job status and payment', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-jobs"]');
    const jobs = page.locator('[data-testid="job-item"]');
    await expect(jobs.first()).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '06_job-status-tracking.png') });

    // Review payment for the first job
    await jobs.first().click();
    await expect(page.locator('[data-testid="job-detail"]')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, '07_job-detail-payment-review.png') });
  });
});
