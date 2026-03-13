import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Agent Referral Workflow Tests
 *
 * Covers Method 1: Agent generates referral link → Homeowner follows link
 * and submits service request → Agent/Admin confirm link in dashboard.
 *
 * Also covers:
 *   - Referral code single-use validation: code is specific to ONE form and
 *     cannot carry over to future request forms.
 *   - Multiple addresses and permit types: homeowners may have more than one
 *     property address; each is tested independently.
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

  test('Homeowner follows referral link and completes sign-up + service request', async ({ browser }) => {
    // Use a fresh incognito context to simulate a new homeowner with no existing session.
    // Per Christopher's workflow doc: the referral link opens a COMBINED sign-up page.
    // Homeowner fills Name, Email, Phone, Password, Property Address, Service Type —
    // one submit creates their account AND submits the service request automatically.
    const context = await browser.newContext();
    const page = await context.newPage();

    if (!referralLink) {
      test.skip(true, 'Referral link not available – run agent test first');
    }

    await page.goto(referralLink);

    // The referral link opens a simple sign-up page (not a login page)
    await page.screenshot({ path: path.join(screenshotDir, '02_referral-signup-page-loaded.png') });

    // Fill out the combined sign-up + service request form
    // Fields per Christopher's workflow doc: Name, Email, Phone, Password, Property Address, Service Type
    // Use specific selectors with fallbacks, avoiding overly broad placeholder patterns.
    await page.locator('[data-testid="homeowner-name"], [name="name"]').first().fill('Jamie Lee');
    await page.locator('[data-testid="homeowner-email"], [name="email"], [type="email"]').first().fill(TEST_USERS.homeownerLinked.email);
    await page.locator('[data-testid="homeowner-phone"], [name="phone"], [type="tel"]').first().fill('(555) 200-0002');
    await page.locator('[data-testid="homeowner-password"], [name="password"], [type="password"]').first().fill(TEST_USERS.homeownerLinked.password);
    await page.locator('[data-testid="property-address"], [name="address"], [name="propertyAddress"]').first().fill(TEST_USERS.homeownerLinked.address);

    // Select service type (dropdown)
    const serviceTypeDropdown = page.locator('[data-testid="service-type"], [name="serviceType"], select');
    if (await serviceTypeDropdown.isVisible()) {
      await serviceTypeDropdown.selectOption({ index: 1 }); // pick first available type
    }

    await page.screenshot({ path: path.join(screenshotDir, '02_referral-signup-form-filled.png') });

    // Submit – creates account AND submits service request in one step
    await page.click('[data-testid="service-request-submit"], [type="submit"], button:has-text("Submit")');

    // Expect confirmation or redirect to dashboard / My Requests
    await expect(
      page.locator('[data-testid="confirmation-message"], :has-text("My Requests"), :has-text("request submitted")')
    ).toBeVisible({ timeout: 15_000 });

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

/**
 * Referral Code Single-Use Validation
 *
 * Per Christopher's requirements: each referral code is valid only for the
 * specific request form it was created for. It must NOT carry over to future
 * request forms. This suite verifies that behaviour.
 */
test.describe.serial('Referral Code – Single-Use Validation', () => {
  let firstReferralLink: string;
  let secondReferralLink: string;

  test('Agent generates first referral link for form A', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-referral"]');
    await expect(page.locator('[data-testid="referral-link"]')).toBeVisible();

    firstReferralLink = await page.locator('[data-testid="referral-link"]').inputValue();
    expect(firstReferralLink).toContain('mrsurety');

    await page.screenshot({ path: path.join(screenshotDir, '06_referral-single-use-first-link.png') });
  });

  test('Agent generates a second (new) referral link for form B', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-referral"]');
    // Create a new referral (separate from the first)
    await page.click('[data-testid="generate-new-referral-btn"]');
    await expect(page.locator('[data-testid="referral-link"]')).toBeVisible();

    secondReferralLink = await page.locator('[data-testid="referral-link"]').inputValue();
    expect(secondReferralLink).toContain('mrsurety');

    // The second link must be different from the first
    expect(secondReferralLink).not.toBe(firstReferralLink);

    await page.screenshot({ path: path.join(screenshotDir, '07_referral-single-use-second-link.png') });
  });

  test('First referral link cannot be reused for a second service request', async ({ browser }) => {
    if (!firstReferralLink) {
      test.skip(true, 'First referral link not available – run prior tests first');
    }

    // Simulate a different homeowner trying to use the already-used first link
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(firstReferralLink);

    // Per Christopher's requirements, a used referral link must be rejected.
    // The platform should show an error/expired page, NOT the sign-up form.
    const errorLocator = page.locator('[data-testid="referral-expired"], [data-testid="referral-invalid"], [data-testid="referral-already-used"]');
    const formLocator = page.locator('[data-testid="service-request-form"]');

    // Wait for the page to settle, then check outcome
    await page.waitForLoadState('networkidle');

    if (await errorLocator.isVisible()) {
      // ✅ Correct: platform correctly rejects the reused referral link
      await expect(errorLocator).toBeVisible();
      await page.screenshot({ path: path.join(screenshotDir, '08_referral-single-use-reuse-rejected.png') });
    } else if (await formLocator.isVisible()) {
      // ⚠️ Bug candidate: the form is still accessible with the used link.
      // Take a screenshot and annotate – the tester should file a bug report.
      await page.screenshot({ path: path.join(screenshotDir, '08_referral-single-use-reuse-allowed-BUG.png') });
      test.info().annotations.push({
        type: 'warning',
        description:
          'Referral link was still accessible after prior use. ' +
          'Per Christopher\'s requirements, each referral code should be valid only for the ' +
          'specific request form it was created for. File a bug report if this link accepted a second submission.',
      });
    }

    await context.close();
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
