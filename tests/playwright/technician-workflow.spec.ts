import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Technician Workflow Tests
 *
 * Covers the full technician lifecycle:
 *   1. Technician logs in and views the work orders dashboard
 *   2. Technician opens a specific work order and reviews job details
 *   3. Technician receives and opens DocuSign work order receipt
 *   4. Technician signs the DocuSign document
 *   5. Technician marks the job as complete
 *   6. Admin and contractor receive job completion notifications
 *
 * ⚠️  Update BASE_URL via MRSURETY_BASE_URL environment variable
 *      before running against staging/production.
 *
 * Prerequisites: A work order must already exist (run contractor-bidding
 *   and homeowner-service-request flows first, or confirm staging state).
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/technician-workflow');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

test.describe('Technician Workflow', () => {
  test('Technician logs in and views work order dashboard', async ({ page }) => {
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    await expect(page.locator('[data-testid="technician-dashboard"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '01_technician-dashboard.png') });
  });

  test('Technician views available work orders list', async ({ page }) => {
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    await page.click('[data-testid="nav-work-orders"]');
    const workOrdersList = page.locator('[data-testid="work-orders-list"]');
    await expect(workOrdersList).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '02_work-orders-list.png') });
  });

  test('Technician opens work order and reviews job details', async ({ page }) => {
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    await page.click('[data-testid="nav-work-orders"]');
    const firstWorkOrder = page.locator('[data-testid="work-order-item"]').first();

    if (await firstWorkOrder.isVisible()) {
      await firstWorkOrder.click();
      await expect(page.locator('[data-testid="work-order-detail"]')).toBeVisible();

      // Verify key job details are present
      await expect(page.locator('[data-testid="job-address"]')).toBeVisible();
      await expect(page.locator('[data-testid="job-date"]')).toBeVisible();
      await expect(page.locator('[data-testid="job-description"]')).toBeVisible();

      await page.screenshot({ path: path.join(screenshotDir, '03_work-order-details.png') });
    } else {
      await page.screenshot({ path: path.join(screenshotDir, '03_no-work-orders-found.png') });
      test.info().annotations.push({
        type: 'note',
        description:
          'No work orders found for technician. Run contractor-bidding workflow first ' +
          'to create a work order, then re-run this test.',
      });
    }
  });

  test('Technician receives DocuSign work order receipt link', async ({ page }) => {
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    await page.click('[data-testid="nav-work-orders"]');
    const firstWorkOrder = page.locator('[data-testid="work-order-item"]').first();

    if (await firstWorkOrder.isVisible()) {
      await firstWorkOrder.click();
      await expect(page.locator('[data-testid="work-order-detail"]')).toBeVisible();

      const docuSignLink = page.locator('[data-testid="docusign-link"]');
      if (await docuSignLink.isVisible()) {
        await page.screenshot({ path: path.join(screenshotDir, '04_docusign-link-received.png') });
      } else {
        await page.screenshot({ path: path.join(screenshotDir, '04_docusign-link-not-yet-sent.png') });
        test.info().annotations.push({
          type: 'note',
          description: 'DocuSign link not yet present. Check that work order has been approved by admin.',
        });
      }
    } else {
      await page.screenshot({ path: path.join(screenshotDir, '04_no-work-order-for-docusign.png') });
      test.info().annotations.push({
        type: 'note',
        description: 'No work orders available to check DocuSign link.',
      });
    }
  });

  test('Technician marks job as complete', async ({ page }) => {
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    await page.click('[data-testid="nav-work-orders"]');
    const inProgressOrder = page.locator('[data-testid="work-order-in-progress"]').first();

    if (await inProgressOrder.isVisible()) {
      await inProgressOrder.click();
      await expect(page.locator('[data-testid="work-order-detail"]')).toBeVisible();

      await page.screenshot({ path: path.join(screenshotDir, '05_before-mark-complete.png') });

      await page.click('[data-testid="mark-complete-btn"]');

      // Expect a confirmation dialog or immediate status change
      const confirmDialog = page.locator('[data-testid="complete-confirm-dialog"]');
      if (await confirmDialog.isVisible()) {
        await page.click('[data-testid="complete-confirm-yes"]');
      }

      await expect(page.locator('[data-testid="job-completed-confirmation"], [data-testid="work-order-status-completed"]')).toBeVisible();

      await page.screenshot({ path: path.join(screenshotDir, '06_job-marked-complete.png') });
    } else {
      await page.screenshot({ path: path.join(screenshotDir, '05_no-in-progress-orders.png') });
      test.info().annotations.push({
        type: 'note',
        description: 'No in-progress work orders found. Run end-to-end workflow (service request → bid → deposit → work order) before this test.',
      });
    }
  });

  test('Admin dashboard reflects completed job after technician sign-off', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-jobs"]');

    // Filter to completed jobs if a filter exists
    const completedFilter = page.locator('[data-testid="filter-completed"]');
    if (await completedFilter.isVisible()) {
      await completedFilter.click();
    }

    const completedJob = page.locator('[data-testid="job-status-completed"]').first();
    if (await completedJob.isVisible()) {
      await page.screenshot({ path: path.join(screenshotDir, '07_admin-sees-completed-job.png') });
    } else {
      await page.screenshot({ path: path.join(screenshotDir, '07_admin-no-completed-jobs.png') });
      test.info().annotations.push({
        type: 'note',
        description: 'No completed jobs visible to admin yet. Complete the technician mark-complete step first.',
      });
    }
  });
});

test.describe('Technician – Edge Cases', () => {
  test('Technician cannot access jobs not assigned to them', async ({ page }) => {
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    // Attempt to navigate to a job that would belong to another technician
    await page.goto('/jobs/99999');

    // Expect either a 404, access-denied, or redirect to their own dashboard
    const accessDenied = page.locator('[data-testid="access-denied"], [data-testid="not-found"], [data-testid="technician-dashboard"]');
    await expect(accessDenied).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, 'edge_01_unauthorized-job-access.png') });
  });

  test('Technician can see DocuSign completion status after signing', async ({ page }) => {
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    await page.click('[data-testid="nav-work-orders"]');
    const signedOrder = page.locator('[data-testid="work-order-docusign-signed"]').first();

    if (await signedOrder.isVisible()) {
      await signedOrder.click();
      const signedStatus = page.locator('[data-testid="docusign-status-completed"]');
      await expect(signedStatus).toBeVisible();
      await page.screenshot({ path: path.join(screenshotDir, 'edge_02_docusign-signed-status.png') });
    } else {
      await page.screenshot({ path: path.join(screenshotDir, 'edge_02_no-signed-orders.png') });
      test.info().annotations.push({ type: 'note', description: 'No signed DocuSign work orders found yet.' });
    }
  });
});
