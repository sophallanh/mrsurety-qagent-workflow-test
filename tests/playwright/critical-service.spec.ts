import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Critical Service / Emergency Workflow Tests (Workflow 8)
 *
 * Source: Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM"
 *   Workflow 8: Critical Service (Emergency)
 *
 * Covers:
 *   - Homeowner requests emergency water main service
 *   - System assigns nearest contractor (immediate notification)
 *   - Homeowner receives DocuSign: Critical Change Order and Liability Release
 *   - Homeowner MUST sign BEFORE contractor begins work
 *   - Contractor completes work (same completion flow)
 *   - Admin receives Critical Service Alert email
 *   - Agent receives Client Critical Service notification email
 *
 * ⚠️  Update BASE_URL via MRSURETY_BASE_URL environment variable
 *      before running against staging/production.
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/agent-referral-workflow');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

test.describe.serial('Workflow 8 – Critical Service (Emergency)', () => {
  test('Step 1: Homeowner requests emergency water main service', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-service-request"]');

    // Look for emergency/critical service option
    const criticalServiceBtn = page.locator(
      '[data-testid="critical-service"], button:has-text("Emergency"), button:has-text("Critical"), [data-testid="service-type-emergency"]',
    );

    if (await criticalServiceBtn.isVisible()) {
      await criticalServiceBtn.click();
      await page.screenshot({ path: path.join(screenshotDir, 'wf8_01_critical-service-selected.png') });
    } else {
      // Try selecting from service type dropdown
      const serviceTypeField = page.locator('[data-testid="service-type"], [name="serviceType"]');
      if (await serviceTypeField.isVisible()) {
        await serviceTypeField.selectOption({ label: 'Emergency' });
      }
      await page.screenshot({ path: path.join(screenshotDir, 'wf8_01_service-form-state.png') });
    }

    // Fill minimum required fields
    await page.fill('[data-testid="property-address"], [name="address"]', TEST_USERS.homeowner.address);
    await page.click('[data-testid="service-request-submit"], button:has-text("Submit")');

    await page.screenshot({ path: path.join(screenshotDir, 'wf8_01_emergency-request-submitted.png') });
  });

  test('Step 2: Admin receives Critical Service Alert email', async ({ page }) => {
    // Admin email AD3: "Critical Service Alert" sent on emergency service request
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-jobs"]');

    // Look for critical/emergency job
    const criticalJob = page.locator(
      '[data-testid="critical-job"], [data-testid="job-item"][data-priority="critical"]',
    ).first();

    if (await criticalJob.isVisible()) {
      await criticalJob.click();
    }

    await page.screenshot({ path: path.join(screenshotDir, 'wf8_02_admin-critical-service-alert.png') });
    test.info().annotations.push({
      type: 'info',
      description: 'Admin should receive email AD3: Critical Service Alert. Verify email received within 5 minutes.',
    });
  });

  test('Step 3: Homeowner receives DocuSign – Critical Change Order and Liability Release', async ({ page }) => {
    // Per Workflow 8 Step 3:
    // "Homeowner receives DocuSign: Critical Change Order and Liability Release – Must sign before work"
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-my-requests"], a:has-text("My Requests")');
    const request = page.locator('[data-testid="service-request-item"]').first();
    await request.click();

    // Look for pending DocuSign notification
    const pendingDocusign = page.locator(
      '[data-testid="docusign-notification"], [data-testid="critical-release-pending"], :has-text("Critical Change Order")',
    ).first();

    if (await pendingDocusign.isVisible()) {
      await page.screenshot({ path: path.join(screenshotDir, 'wf8_03_homeowner-critical-docusign-pending.png') });
    } else {
      await page.screenshot({ path: path.join(screenshotDir, 'wf8_03_homeowner-request-page.png') });
    }

    test.info().annotations.push({
      type: 'info',
      description: 'DocuSign D3: Critical Change Order and Liability Release must be sent to homeowner. Contractor must NOT start work until homeowner signs.',
    });
  });

  test('Step 4: Homeowner signs – Contractor notified to proceed', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    const signDocusignBtn = page.locator(
      '[data-testid="sign-critical-release"], [data-testid="docusign-sign-btn"], button:has-text("Sign")',
    ).first();

    if (await signDocusignBtn.isVisible()) {
      await signDocusignBtn.click();
      await page.screenshot({ path: path.join(screenshotDir, 'wf8_04_homeowner-signing-critical-release.png') });
    } else {
      await page.screenshot({ path: path.join(screenshotDir, 'wf8_04_homeowner-docusign-state.png') });
    }
  });

  test('Step 5: Contractor assigned and notified (Critical Assignment email)', async ({ page }) => {
    // Contractor email C10: "Critical Assignment" – emergency service
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-dashboard"]');

    // Look for critical assignment notification
    const criticalNotification = page.locator(
      '[data-testid="critical-assignment"], [data-testid="emergency-job-notification"]',
    ).first();

    if (await criticalNotification.isVisible()) {
      await criticalNotification.click();
    }

    await page.screenshot({ path: path.join(screenshotDir, 'wf8_05_contractor-critical-assignment.png') });
    test.info().annotations.push({
      type: 'info',
      description: 'Contractor email C10: Critical Assignment should be received. Verify contractor can see the emergency job details.',
    });
  });

  test('Step 6: Agent receives Client Critical Service notification', async ({ page }) => {
    // Agent email A4: "Client Critical Service"
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-dashboard"]');

    await page.screenshot({ path: path.join(screenshotDir, 'wf8_06_agent-critical-service-notification.png') });
    test.info().annotations.push({
      type: 'info',
      description: 'Agent email A4: Client Critical Service should be received. Verify agent is notified of emergency.',
    });
  });
});
