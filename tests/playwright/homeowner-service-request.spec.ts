import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS, homeownerNoAgent } from './fixtures/test-users';

/**
 * MrSurety QA – Homeowner Service Request Workflow Tests
 *
 * Covers:
 *   Method 2: Homeowner submits service request and enters agent email
 *             in the insurance section → Admin sees pending agent → Approves →
 *             Agent receives welcome email.
 *
 * ⚠️  Update BASE_URL via MRSURETY_BASE_URL environment variable
 *      before running against staging/production.
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/homeowner-service-request');
const edgeCaseDir = path.join(__dirname, '../..', 'qa/screenshots/edge-cases');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

test.describe('Homeowner Service Request – Method 2 (Agent Email Entry)', () => {
  test('Homeowner submits service request with agent email', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-service-request"]');
    await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

    await page.fill('[data-testid="property-address"]', TEST_USERS.homeowner.address);
    await page.fill('[data-testid="service-description"]', 'Water damage repair in kitchen');

    // Insurance / Agent email section
    await page.fill('[data-testid="agent-email"]', TEST_USERS.agent.email);

    await page.screenshot({ path: path.join(screenshotDir, '01_form-with-agent-email.png') });

    await page.click('[data-testid="service-request-submit"]');
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '02_submission-confirmation.png') });
  });

  test('Homeowner submits second service request (different address) with agent email', async ({ page }) => {
    // Tests that Method 2 works for multiple addresses / permit types
    await loginAs(page, TEST_USERS.homeownerLinked.email, TEST_USERS.homeownerLinked.password);

    await page.click('[data-testid="nav-service-request"]');
    await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

    await page.fill('[data-testid="property-address"]', TEST_USERS.homeownerLinked.address);
    await page.fill('[data-testid="service-description"]', 'Electrical panel upgrade');

    // Select permit type if dropdown exists
    const permitDropdown = page.locator('[data-testid="permit-type-select"]');
    if (await permitDropdown.isVisible()) {
      await permitDropdown.selectOption({ label: 'Electrical' });
    }

    // Enter agent email (Method 2)
    await page.fill('[data-testid="agent-email"]', TEST_USERS.agent.email);

    await page.screenshot({ path: path.join(screenshotDir, '06_second-address-form-with-agent-email.png') });

    await page.click('[data-testid="service-request-submit"]');
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '07_second-address-submission-confirmation.png') });
  });

  test('Admin sees pending agent and approves', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-pending-agents"]');
    const pendingAgent = page.locator('[data-testid="pending-agent"]').first();
    await expect(pendingAgent).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '03_admin-pending-agent.png') });

    await pendingAgent.locator('[data-testid="approve-agent-btn"]').click();
    await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '04_admin-agent-approved.png') });
  });

  test('Homeowner dashboard shows submitted service request', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-dashboard"]');
    const request = page.locator('[data-testid="service-request-item"]').first();
    await expect(request).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '05_homeowner-dashboard-request.png') });
  });
});

test.describe('Homeowner Service Request – No Agent Email (Edge Case)', () => {
  test('Homeowner submits service request without entering agent email', async ({ page }) => {
    await loginAs(page, homeownerNoAgent.email, homeownerNoAgent.password);

    await page.click('[data-testid="nav-service-request"]');
    await page.fill('[data-testid="property-address"]', homeownerNoAgent.address);
    await page.fill('[data-testid="service-description"]', 'Roof inspection required');
    // Intentionally leave agent email blank

    await page.click('[data-testid="service-request-submit"]');

    // Should still submit (agent email is optional per workflow spec)
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();

    await page.screenshot({ path: path.join(edgeCaseDir, 'edge_no-agent-email-submit.png') });
  });
});
