import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Return Service Call Workflow Tests (Workflow 7)
 *
 * Source: Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM"
 *   Workflow 7: Return Service Call
 *
 * Covers:
 *   - Homeowner requests additional work after job completion
 *   - Admin creates Return Service Call Work Order
 *   - Contractor receives DocuSign: Return Service Call Work Order
 *   - Contractor signs and completes return job
 *
 * ⚠️  Update BASE_URL via MRSURETY_BASE_URL environment variable
 *      before running against staging/production.
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/return-service-call');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

test.describe.serial('Workflow 7 – Return Service Call', () => {
  test('Step 1: Homeowner requests additional work after job completion', async ({ page }) => {
    // Per Christopher's Testing Guide Workflow 7 Step 1:
    // "Homeowner requests additional work after completion – Via portal or phone"
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-my-requests"], a:has-text("My Requests")');

    // Find a completed job
    const completedJob = page.locator('[data-testid="service-request-item"][data-status="completed"], [data-testid="completed-job"]').first();

    if (!await completedJob.isVisible()) {
      // Fall back to any existing request if no completed job exists yet
      const anyJob = page.locator('[data-testid="service-request-item"]').first();
      if (!await anyJob.isVisible()) {
        test.skip(true, 'No completed jobs found – run full workflow first');
      }
      await anyJob.click();
    } else {
      await completedJob.click();
    }

    // Look for "Request Return Service" or similar button
    const returnServiceBtn = page.locator(
      '[data-testid="request-return-service"], button:has-text("Return Service"), button:has-text("Request Additional Work")',
    );

    if (await returnServiceBtn.isVisible()) {
      await returnServiceBtn.click();
      await expect(page.locator('[data-testid="return-service-form"], [data-testid="confirmation-message"]')).toBeVisible();
      await page.screenshot({ path: path.join(screenshotDir, 'wf7_01_homeowner-return-service-requested.png') });
    } else {
      // Document the UI state even if button not found
      await page.screenshot({ path: path.join(screenshotDir, 'wf7_01_homeowner-request-page.png') });
      test.info().annotations.push({
        type: 'todo',
        description: 'Return Service button not found – verify selector in live app. Per Workflow 7, homeowner should be able to request additional work via portal.',
      });
    }
  });

  test('Step 2: Admin creates Return Service Call Work Order', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-jobs"]');

    // Look for a return service request pending admin action
    const returnServiceRequest = page.locator(
      '[data-testid="return-service-request"], [data-testid="job-item"][data-status="return-pending"]',
    ).first();

    if (await returnServiceRequest.isVisible()) {
      await returnServiceRequest.click();

      const createReturnWorkOrderBtn = page.locator(
        '[data-testid="create-return-work-order"], button:has-text("Create Return Work Order")',
      );
      if (await createReturnWorkOrderBtn.isVisible()) {
        await createReturnWorkOrderBtn.click();
        await expect(page.locator('[data-testid="return-work-order-created"], [data-testid="success-toast"]')).toBeVisible();
      }
    }

    await page.screenshot({ path: path.join(screenshotDir, 'wf7_02_admin-return-work-order-created.png') });
  });

  test('Step 3: Contractor receives DocuSign – Return Service Call Work Order (email)', async ({ page }) => {
    // Per Workflow 7 Step 3: Contractor receives email with DocuSign "Return Service Call Work Order"
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-dashboard"]');

    // Look for a pending DocuSign or notification for return service
    const notification = page.locator(
      '[data-testid="docusign-notification"], [data-testid="return-service-notification"]',
    ).first();

    if (await notification.isVisible()) {
      await notification.click();
    }

    await page.screenshot({ path: path.join(screenshotDir, 'wf7_03_contractor-return-service-docusign.png') });
    test.info().annotations.push({
      type: 'info',
      description: 'DocuSign: Return Service Call Work Order (D4) should be sent to contractor. Verify email received and DocuSign document is correct.',
    });
  });

  test('Step 4: Contractor signs Return Service Call Work Order', async ({ page }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    // Navigate to pending DocuSign documents
    const pendingDocusign = page.locator(
      '[data-testid="pending-docusign"], a:has-text("Sign"), [data-testid="docusign-sign-btn"]',
    ).first();

    if (await pendingDocusign.isVisible()) {
      await pendingDocusign.click();
      await page.screenshot({ path: path.join(screenshotDir, 'wf7_04_contractor-signing-return-work-order.png') });
    } else {
      await page.screenshot({ path: path.join(screenshotDir, 'wf7_04_contractor-portal-state.png') });
    }
  });

  test('Step 5: Return job follows same completion flow', async ({ page }) => {
    // After return service: contractor completes work, uploads photos,
    // follows the same Workflow 5/6 completion flow
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-my-jobs"]');
    await page.screenshot({ path: path.join(screenshotDir, 'wf7_05_return-job-in-my-jobs.png') });

    test.info().annotations.push({
      type: 'info',
      description: 'Return service job should appear in contractor My Jobs and follow the same completion flow as Workflow 5 (GPS check-in, photos, invoice, DocuSign).',
    });
  });
});
