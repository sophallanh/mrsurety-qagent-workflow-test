import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Agent Referral Workflow Tests
 *
 * Covers Method 1: Agent generates referral link → Homeowner follows link
 * and submits service request → Agent/Admin confirm link in dashboard.
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

// Use serial mode so referralLink captured in test 1 is available in test 2
test.describe.serial('Agent Referral Link – Method 1', () => {
  let referralLink: string;

  test('Agent logs in and generates a referral link', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    // Navigate to referral section
    await page.click('[data-testid="nav-referral"]');
    await expect(page.locator('[data-testid="referral-link"]')).toBeVisible();

    referralLink = await page.locator('[data-testid="referral-link"]').inputValue();
    expect(referralLink).toContain('mrsurety');

    await page.screenshot({ path: path.join(screenshotDir, '01_referral-link-generated.png') });
  });

  test('Homeowner follows referral link and completes service request', async ({ browser }) => {
    // Use a fresh incognito context to simulate a new homeowner
    const context = await browser.newContext();
    const page = await context.newPage();

    if (!referralLink) {
      test.skip(true, 'Referral link not available – run agent test first');
    }

    await page.goto(referralLink);
    await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

    // Fill out service request form
    await page.fill('[data-testid="homeowner-first-name"]', 'Jamie');
    await page.fill('[data-testid="homeowner-last-name"]', 'Lee');
    await page.fill('[data-testid="homeowner-email"]', TEST_USERS.homeownerLinked.email);
    await page.fill('[data-testid="homeowner-phone"]', '(555) 200-0002');
    await page.fill('[data-testid="property-address"]', TEST_USERS.homeownerLinked.address);

    await page.screenshot({ path: path.join(screenshotDir, '02_service-request-form.png') });

    await page.click('[data-testid="service-request-submit"]');
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '03_submission-confirmation.png') });
    await context.close();
  });

  test('Agent dashboard shows linked homeowner after referral', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-dashboard"]');
    const linkedHomeowner = page.locator('[data-testid="linked-homeowners"]');
    await expect(linkedHomeowner).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '04_agent-dashboard-linked-homeowner.png') });
  });

  test('Admin dashboard confirms agent-homeowner link', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-jobs"]');
    await expect(page.locator('[data-testid="agent-homeowner-link"]').first()).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '05_admin-dashboard-agent-link.png') });
  });
});
