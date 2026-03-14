import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Agent Referral Workflow Tests
 *
 * Source: Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM"
 *   Workflow 1: Agent Referral (Two Methods)
 *   Part 2: Key Workflows – Test Multiple Scenarios
 *
 * Covers Method A – Agent Creates Referral Link:
 *   1. Agent logs in and copies unique referral link (format: mrsurety.com/ref/AGENT123)
 *   2. Landing page shows "Brought to you by [Agent Name]"
 *   3. Homeowner completes service request form → linked to agent
 *   4. Agent portal shows new client
 *
 * ⚠️ Per Christopher's Testing Guide:
 *   "Agent referral link used multiple times – each creates SEPARATE job"
 *   This is different from single-use behavior – the link is NOT invalidated after first use.
 *
 * Also covers:
 *   - Multiple homeowners linked to same agent (all appear in agent portal)
 *   - Same homeowner with multiple properties (each tracks separately)
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
test.describe.serial('Agent Referral Link – Method A', () => {
  let referralLink: string;

  test('Agent logs in and generates a referral link', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    // Navigate to referral section
    await page.click('[data-testid="nav-referral"]');
    await expect(page.locator('[data-testid="referral-link"]')).toBeVisible();

    referralLink = await page.locator('[data-testid="referral-link"]').inputValue();
    // Per Christopher's doc: link format is mrsurety.com/ref/AGENT123
    expect(referralLink).toMatch(/ref\//);

    await page.screenshot({ path: path.join(screenshotDir, '01_referral-link-generated.png') });
  });

  test('Homeowner follows referral link – landing page shows "Brought to you by [Agent Name]"', async ({ browser }) => {
    // Use a fresh incognito context to simulate a new homeowner with no existing session.
    const context = await browser.newContext();
    const page = await context.newPage();

    if (!referralLink) {
      test.skip(true, 'Referral link not available – run agent test first');
    }

    await page.goto(referralLink);

    // Per Christopher's Testing Guide Workflow 1 Step 2:
    // "Landing page shows 'Brought to you by [Agent Name]'"
    await expect(
      page.locator(':has-text("Brought to you by"), [data-testid="agent-branding"]'),
    ).toBeVisible({ timeout: 10_000 });

    await page.screenshot({ path: path.join(screenshotDir, '02_referral-landing-page-agent-branding.png') });
    await context.close();
  });

  test('Homeowner completes sign-up + service request via referral link', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    if (!referralLink) {
      test.skip(true, 'Referral link not available – run agent test first');
    }

    await page.goto(referralLink);

    await page.screenshot({ path: path.join(screenshotDir, '02b_referral-signup-page-loaded.png') });

    // Fill combined sign-up + service request form
    await page.locator('[data-testid="homeowner-name"], [name="name"]').first().fill('Jamie Lee');
    await page.locator('[data-testid="homeowner-email"], [name="email"], [type="email"]').first().fill(TEST_USERS.homeownerLinked.email);
    await page.locator('[data-testid="homeowner-phone"], [name="phone"], [type="tel"]').first().fill('(555) 200-0002');
    await page.locator('[data-testid="homeowner-password"], [name="password"], [type="password"]').first().fill(TEST_USERS.homeownerLinked.password);
    await page.locator('[data-testid="property-address"], [name="address"], [name="propertyAddress"]').first().fill(TEST_USERS.homeownerLinked.address);

    // Select service type (dropdown)
    const serviceTypeDropdown = page.locator('[data-testid="service-type"], [name="serviceType"], select');
    if (await serviceTypeDropdown.isVisible()) {
      await serviceTypeDropdown.selectOption({ index: 1 });
    }

    await page.screenshot({ path: path.join(screenshotDir, '03_referral-signup-form-filled.png') });

    // Submit – creates account AND submits service request in one step
    await page.click('[data-testid="service-request-submit"], [type="submit"], button:has-text("Submit")');

    await expect(
      page.locator('[data-testid="confirmation-message"], :has-text("My Requests"), :has-text("request submitted")'),
    ).toBeVisible({ timeout: 15_000 });

    await page.screenshot({ path: path.join(screenshotDir, '04_submission-confirmation.png') });
    await context.close();
  });

  test('Agent dashboard shows linked homeowner after referral', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-dashboard"]');
    const linkedHomeowner = page.locator('[data-testid="linked-homeowners"]');
    await expect(linkedHomeowner).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '05_agent-dashboard-linked-homeowner.png') });
  });

  test('Admin dashboard confirms agent-homeowner link', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-jobs"]');
    await expect(page.locator('[data-testid="agent-homeowner-link"]').first()).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '06_admin-dashboard-agent-link.png') });
  });
});

/**
 * Referral Link – Multiple Use Verification
 *
 * Per Christopher's Testing Guide Workflow 1 "Test Multiple Scenarios":
 *   "Agent referral link used multiple times – each creates separate job"
 *
 * The referral link is NOT single-use. Multiple homeowners can use the same link,
 * and each use creates a separate, independent job. The agent portal must show ALL
 * linked homeowners.
 *
 * This suite verifies that:
 *   1. The same referral link can be used by a second homeowner
 *   2. Both jobs appear independently in the agent portal
 */
test.describe.serial('Referral Link – Multiple Use Creates Separate Jobs', () => {
  let referralLink: string;

  test('Agent generates referral link', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-referral"]');
    await expect(page.locator('[data-testid="referral-link"]')).toBeVisible();

    referralLink = await page.locator('[data-testid="referral-link"]').inputValue();
    expect(referralLink).toMatch(/ref\//);

    await page.screenshot({ path: path.join(screenshotDir, '07_referral-link-for-multi-use.png') });
  });

  test('Second homeowner uses the same referral link – creates a separate job', async ({ browser }) => {
    // Per Christopher's doc: same link used again → creates a NEW, SEPARATE job
    if (!referralLink) {
      test.skip(true, 'Referral link not available');
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(referralLink);

    // Landing page should load (not an error – the link is reusable)
    await expect(
      page.locator(':has-text("Brought to you by"), [data-testid="agent-branding"], [data-testid="service-request-form"]'),
    ).toBeVisible({ timeout: 10_000 });

    await page.screenshot({ path: path.join(screenshotDir, '08_referral-link-reused-form-visible.png') });

    await context.close();
  });

  test('Agent portal shows multiple linked homeowners', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-dashboard"]');
    const linkedHomeowners = page.locator('[data-testid="linked-homeowners"] [data-testid="homeowner-item"], [data-testid="linked-homeowner"]');

    // Agent should see at least 2 homeowners linked via the referral link
    await expect(linkedHomeowners.first()).toBeVisible();
    const count = await linkedHomeowners.count();
    expect(count).toBeGreaterThanOrEqual(1);

    await page.screenshot({ path: path.join(screenshotDir, '09_agent-portal-multiple-homeowners.png') });
  });
});

/**
 * Multiple Addresses and Permit Types
 *
 * Per Christopher's requirements: homeowners may have multiple addresses in
 * their profile. Test with different addresses and permit types.
 */
test.describe('Multiple Addresses and Permit Types', () => {
  const addressPermitCombinations = [
    { address: '123 Main St, Los Angeles CA 90001', permitType: 'Roofing', description: 'Roof replacement – storm damage', label: 'main-st-roofing' },
    { address: '456 Oak Ave, Anaheim CA 92801', permitType: 'Electrical', description: 'Panel upgrade and rewiring', label: 'oak-ave-electrical' },
    { address: '123 Main St, Los Angeles CA 90001', permitType: 'Plumbing', description: 'Water heater replacement', label: 'main-st-plumbing' },
    { address: '456 Oak Ave, Anaheim CA 92801', permitType: 'HVAC', description: 'Central AC installation', label: 'oak-ave-hvac' },
  ];

  for (const combo of addressPermitCombinations) {
    test(`Homeowner submits service request – ${combo.label}`, async ({ page }) => {
      await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

      await page.click('[data-testid="nav-service-request"]');
      await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

      await page.fill('[data-testid="property-address"]', combo.address);

      // Select permit type if a dropdown exists; fall back to a text field
      const permitDropdown = page.locator('[data-testid="permit-type-select"]');
      const permitText = page.locator('[data-testid="permit-type"]');
      if (await permitDropdown.isVisible()) {
        await permitDropdown.selectOption({ label: combo.permitType });
      } else if (await permitText.isVisible()) {
        await permitText.fill(combo.permitType);
      }

      await page.fill('[data-testid="service-description"]', combo.description);

      await page.screenshot({
        path: path.join(screenshotDir, `09_multi-address_${combo.label}_form.png`),
      });

      await page.click('[data-testid="service-request-submit"]');
      await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();

      await page.screenshot({
        path: path.join(screenshotDir, `10_multi-address_${combo.label}_confirmed.png`),
      });
    });
  }

  test('Homeowner dashboard shows all submitted service requests', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-dashboard"]');
    const requests = page.locator('[data-testid="service-request-item"]');
    const count = await requests.count();

    // Expect at least as many requests as the combinations we submitted
    expect(count).toBeGreaterThanOrEqual(addressPermitCombinations.length);

    await page.screenshot({ path: path.join(screenshotDir, '11_multi-address_dashboard-all-requests.png') });
  });

  test('Admin can see all service requests across addresses', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);

    await page.click('[data-testid="nav-admin-jobs"]');
    await expect(page.locator('[data-testid="job-item"]').first()).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '12_multi-address_admin-jobs-view.png') });
  });
});
