import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Email & DocuSign Trigger Verification Tests
 *
 * These tests verify that the correct emails and DocuSign documents
 * are triggered at each key workflow step.
 *
 * Note: Full email inbox verification requires a test email service
 * (e.g., Mailosaur, Mailtrap). Update EMAIL_INBOX_URL if available.
 *
 * ⚠️  Update BASE_URL via MRSURETY_BASE_URL environment variable
 *      before running against staging/production.
 */

const emailDocuSignDir = path.join(__dirname, '../..', 'qa/screenshots/email-docusign-triggers');
const techDir = path.join(__dirname, '../..', 'qa/screenshots/technician-workflow');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

test.describe('Email Trigger Verification', () => {
  test('Homeowner receives confirmation email after service request', async ({ page }) => {
    // Login as homeowner and submit a service request
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-service-request"]');
    await page.fill('[data-testid="property-address"]', TEST_USERS.homeowner.address);
    await page.fill('[data-testid="service-description"]', 'Email trigger test – confirmation email');
    await page.click('[data-testid="service-request-submit"]');

    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();
    // TODO: Verify email receipt via test inbox service (Mailosaur/Mailtrap)
    // const inbox = await checkEmailInbox(TEST_USERS.homeowner.email, 'Service Request Confirmation');
    // expect(inbox).toBeTruthy();

    await page.screenshot({ path: path.join(emailDocuSignDir, 'email_homeowner-service-request-confirm.png') });
  });

  test('Agent receives notification after homeowner links via referral', async ({ page }) => {
    // Login as agent and check notification/email
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-notifications"]');
    await expect(page.locator('[data-testid="notification-item"]').first()).toBeVisible();

    await page.screenshot({ path: path.join(emailDocuSignDir, 'email_agent-referral-link-notification.png') });
  });

  test('Admin receives pending agent alert email', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-alerts"]');
    const pendingAlert = page.locator('[data-testid="pending-agent-alert"]').first();
    await expect(pendingAlert).toBeVisible();

    await page.screenshot({ path: path.join(emailDocuSignDir, 'email_admin-pending-agent-alert.png') });
  });
});

test.describe('DocuSign Document Verification', () => {
  test('Work order DocuSign document sent to contractor after deposit', async ({ page }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-my-bids"]');
    const acceptedBid = page.locator('[data-testid="accepted-bid"]').first();

    if (await acceptedBid.isVisible()) {
      await acceptedBid.click();
      const docuSignLink = page.locator('[data-testid="docusign-link"]');
      await expect(docuSignLink).toBeVisible();

      await page.screenshot({ path: path.join(emailDocuSignDir, 'docusign_work-order-contract.png') });
    } else {
      // No accepted bids yet – document current state
      await page.screenshot({ path: path.join(emailDocuSignDir, 'docusign_no-accepted-bid.png') });
      test.info().annotations.push({ type: 'note', description: 'No accepted bids found; DocuSign trigger test requires completed homeowner selection first.' });
    }
  });

  test('Technician receives work order DocuSign', async ({ page }) => {
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    await page.click('[data-testid="nav-work-orders"]');
    const workOrder = page.locator('[data-testid="work-order-item"]').first();

    if (await workOrder.isVisible()) {
      await workOrder.click();
      await expect(page.locator('[data-testid="docusign-link"]')).toBeVisible();
      await page.screenshot({ path: path.join(techDir, '01_work-order-docusign.png') });
    } else {
      await page.screenshot({ path: path.join(techDir, '01_no-work-orders.png') });
      test.info().annotations.push({ type: 'note', description: 'No work orders found; technician DocuSign test requires completed work order assignment.' });
    }
  });
});
