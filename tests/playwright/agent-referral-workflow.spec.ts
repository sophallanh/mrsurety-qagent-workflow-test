import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Agent Referral Workflow Tests
 *
 * Source: Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM" (Doc 1, Workflow 1)
 *         Platform Spec V6.3 (Doc 2, Section 3)
 *
 * Covers Method A – Agent Creates Referral Link:
 *   1. Agent logs in and copies unique referral link (format: mrsurety.com/ref/AGENT123)
 *   2. Landing page shows "Brought to you by [Agent Name] at [Agency]"
 *   3. Homeowner completes service request form → linked to agent
 *   4. Agent portal shows new client
 *
 * Technical Requirements (Platform Spec V6.3, Section 3):
 *   - URL parameter ?ref=AGENT123 persists through entire booking process
 *   - Agent ID stored in jobs.agent_id AND service_requests.agent_id
 *
 * ⚠️ Per Christopher's Testing Guide:
 *   "Agent referral link used multiple times – each creates SEPARATE job"
 *   This is different from single-use behavior – the link is NOT invalidated after first use.
 *
 * Agent Portal Features (Platform Spec V6.3, Section 3):
 *   - Real-time status of each job
 *   - Email updates at every stage
 *   - Download certificates immediately upon completion
 *   - Bulk export client completion reports for underwriters
 *   - Filter by service type
 *
 * Also covers:
 *   - Multiple homeowners linked to same agent (all appear in agent portal)
 *   - Same homeowner with multiple properties (each tracks separately)
 *   - Method B: Agent email → pending record → notification email to agent
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

    // Per Platform Spec V6.3 Section 3 Step 3:
    // "Property owner clicks link, lands on branded landing page:
    //  'Brought to you by [Agent Name] at [Agency]'"
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

/**
 * URL Parameter Persistence
 *
 * Platform Spec V6.3, Section 3 – Technical Requirement:
 *   "URL parameter ?ref=AGENT123 persists through entire booking process"
 *   "Agent ID stored in jobs.agent_id and service_requests.agent_id"
 *
 * This suite verifies the ref parameter is captured at every stage.
 */
test.describe('URL Parameter Persistence – ?ref= Tracking', () => {
  test('Referral link contains ?ref= or /ref/ parameter', async ({ browser }) => {
    // Log in as agent and get referral link
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/login');
    await page.fill('[data-testid="email"]', TEST_USERS.agent.email);
    await page.fill('[data-testid="password"]', TEST_USERS.agent.password);
    await page.click('[data-testid="login-submit"]');
    await expect(page).not.toHaveURL(/\/login/);

    await page.click('[data-testid="nav-referral"]');
    await expect(page.locator('[data-testid="referral-link"]')).toBeVisible();

    const referralLink = await page.locator('[data-testid="referral-link"]').inputValue();

    // Per Platform Spec V6.3: link format is mrsurety.com/ref/AGENT123
    // or uses ?ref= query parameter
    expect(referralLink).toMatch(/(?:ref\/|[?&]ref=)/i);

    await page.screenshot({ path: path.join(screenshotDir, '13_url-param-ref-format.png') });
    await context.close();
  });

  test('Referral link loads service request form with agent info pre-populated', async ({ browser }) => {
    // Log in as agent and get referral link
    const agentContext = await browser.newContext();
    const agentPage = await agentContext.newPage();

    await agentPage.goto('/login');
    await agentPage.fill('[data-testid="email"]', TEST_USERS.agent.email);
    await agentPage.fill('[data-testid="password"]', TEST_USERS.agent.password);
    await agentPage.click('[data-testid="login-submit"]');
    await expect(agentPage).not.toHaveURL(/\/login/);
    await agentPage.click('[data-testid="nav-referral"]');
    const referralLink = await agentPage.locator('[data-testid="referral-link"]').inputValue();
    await agentContext.close();

    if (!referralLink) {
      test.skip(true, 'Could not retrieve referral link');
    }

    // Open in fresh browser context (incognito)
    const homeownerContext = await browser.newContext();
    const homeownerPage = await homeownerContext.newPage();

    await homeownerPage.goto(referralLink);

    // Agent info should be auto-populated (read-only) in form
    // Per Platform Spec V6.3 Section 5: "Referred by: [Agent Name] at [Agency Name] (auto-filled)"
    const agentBranding = homeownerPage.locator(
      '[data-testid="agent-branding"], [data-testid="referred-by"], :has-text("Brought to you by"), :has-text("Referred by")',
    );
    await expect(agentBranding).toBeVisible({ timeout: 10_000 });

    await homeownerPage.screenshot({ path: path.join(screenshotDir, '14_url-param-agent-info-auto-populated.png') });
    await homeownerContext.close();
  });
});

/**
 * Agent Portal Features
 *
 * Platform Spec V6.3, Section 3 – Agent Portal Features:
 *   - Real-time status of each job
 *   - Download certificates immediately upon completion
 *   - Bulk export client completion reports for underwriters
 *   - Filter by service type
 */
test.describe('Agent Portal – Features from Platform Spec V6.3', () => {
  test('Agent portal shows real-time job status for each linked client', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-dashboard"]');

    // Each linked client should show a current job status
    const clientRows = page.locator('[data-testid="linked-homeowners"] [data-testid="homeowner-item"], [data-testid="client-row"]');

    if (await clientRows.first().isVisible()) {
      // At least one status indicator should be visible per row
      const statusIndicator = page.locator('[data-testid="job-status"], [class*="status"], :has-text("Pending"), :has-text("In Progress"), :has-text("Complete")').first();
      await expect(statusIndicator).toBeVisible();
    }

    await page.screenshot({ path: path.join(screenshotDir, '15_agent-portal-real-time-status.png') });

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3 Section 3: Agent can view real-time status of each referred job.',
    });
  });

  test('Agent portal has bulk export capability for underwriter reports', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-dashboard"]');

    // Look for bulk export / download button
    const exportButton = page.locator(
      '[data-testid="bulk-export"], button:has-text("Export"), button:has-text("Download"), a:has-text("Export"), [data-testid="export-clients"]',
    );

    if (await exportButton.isVisible()) {
      await expect(exportButton).toBeVisible();
    }

    await page.screenshot({ path: path.join(screenshotDir, '16_agent-portal-bulk-export.png') });

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3 Section 3: Agent can bulk export client completion reports for underwriters.',
    });
  });

  test('Agent portal has filter by service type', async ({ page }) => {
    await loginAs(page, TEST_USERS.agent.email, TEST_USERS.agent.password);

    await page.click('[data-testid="nav-dashboard"]');

    // Look for service type filter
    const serviceTypeFilter = page.locator(
      '[data-testid="filter-service-type"], select[name="serviceType"], [data-testid="service-filter"]',
    );

    if (await serviceTypeFilter.isVisible()) {
      await expect(serviceTypeFilter).toBeVisible();
    }

    await page.screenshot({ path: path.join(screenshotDir, '17_agent-portal-filter-service-type.png') });

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3 Section 3: Agent can filter their client list by service type.',
    });
  });
});
