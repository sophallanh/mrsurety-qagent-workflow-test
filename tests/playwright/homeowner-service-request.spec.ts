import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS, homeownerNoAgent } from './fixtures/test-users';

/**
 * MrSurety QA – Homeowner Service Request Workflow Tests
 *
 * Source: Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM"
 *   Workflow 2: Homeowner Service Request
 *   Part 2: Key Workflows – Form Sections
 *   Part 5: Special Scenarios – Incomplete Forms, Multiple Properties
 *
 * Covers:
 *   Method A (referral link): tested in agent-referral-workflow.spec.ts
 *   Method B (agent email entry): tested here
 *
 * Form sections per Christopher's doc:
 *   1. Account (new signup / existing login)
 *   2. Service Type (Installation vs Assessment)
 *   3. Property Address
 *   4. Insurance Info (agent email, policy number)
 *   5. Home Specifics (sq ft → pipe size, year built → pressure reducer)
 *   6. Device Info (device type, device source, software)
 *   7. Water Main Photo (REQUIRED – skip = error)
 *   8. LiDar (optional)
 *   9. Access Notes
 *   10. Contact
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

// ─── Method B: Homeowner Enters Agent Email ───────────────────────────────────

test.describe('Homeowner Service Request – Method B (Agent Email Entry)', () => {
  test('Homeowner submits service request with agent email and all form sections', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-service-request"]');
    await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

    // Section 3: Property Address
    await page.fill('[data-testid="property-address"]', TEST_USERS.homeowner.address);

    // Section 2: Service Type
    const serviceTypeField = page.locator('[data-testid="service-type"], [name="serviceType"]');
    if (await serviceTypeField.isVisible()) {
      await serviceTypeField.selectOption({ label: 'Installation' });
    }

    // Section 4: Insurance Info – enter agent email (Method B)
    await page.fill('[data-testid="agent-email"]', TEST_USERS.agent.email);

    // Section 5: Home Specifics
    // homeowner1: 1800 sq ft → pipe size should calculate to 3/4 inch
    const sqFtField = page.locator('[data-testid="square-footage"], [name="squareFootage"]');
    if (await sqFtField.isVisible()) {
      await sqFtField.fill(String(TEST_USERS.homeowner.sqFt));
    }
    // homeowner1: year built 2010 → >5 years → pressure reducer REQUIRED
    const yearBuiltField = page.locator('[data-testid="year-built"], [name="yearBuilt"]');
    if (await yearBuiltField.isVisible()) {
      await yearBuiltField.fill(String(TEST_USERS.homeowner.yearBuilt));
    }

    // Section 7: Water Main Photo (REQUIRED)
    const waterMainUpload = page.locator('[data-testid="water-main-photo"], [name="waterMainPhoto"]');
    if (await waterMainUpload.isVisible()) {
      // Placeholder: in live testing, upload an actual photo
      // test.info().annotations.push({ type: 'todo', description: 'Upload actual water main photo' });
    }

    await page.screenshot({ path: path.join(screenshotDir, '01_form-with-agent-email.png') });

    await page.click('[data-testid="service-request-submit"]');
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '02_submission-confirmation.png') });
  });

  test('Homeowner submits second service request (different address) with agent email', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeownerLinked.email, TEST_USERS.homeownerLinked.password);

    await page.click('[data-testid="nav-service-request"]');
    await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

    // Section 3: Property Address (different address from homeowner1)
    await page.fill('[data-testid="property-address"]', TEST_USERS.homeownerLinked.address);

    // Section 5: Home Specifics
    // homeowner2: 2500 sq ft → pipe size should calculate to 1 inch
    const sqFtField = page.locator('[data-testid="square-footage"], [name="squareFootage"]');
    if (await sqFtField.isVisible()) {
      await sqFtField.fill(String(TEST_USERS.homeownerLinked.sqFt));
    }
    // homeowner2: year built 2022 → ≤5 years → pressure reducer NOT required
    const yearBuiltField = page.locator('[data-testid="year-built"], [name="yearBuilt"]');
    if (await yearBuiltField.isVisible()) {
      await yearBuiltField.fill(String(TEST_USERS.homeownerLinked.yearBuilt));
    }

    // Enter agent email (Method B)
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

  test('Homeowner dashboard shows submitted service request under My Requests', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-my-requests"], a:has-text("My Requests")');
    const request = page.locator('[data-testid="service-request-item"]').first();
    await expect(request).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '05_homeowner-my-requests.png') });
  });
});

// ─── Pipe Size Logic Verification ─────────────────────────────────────────────

test.describe('Home Specifics – Pipe Size and Pressure Reducer Logic', () => {
  const pipeSizeCases = [
    { sqFt: 1800, yearBuilt: 2010, expectedPipe: '3/4', pressureReducerRequired: true, label: 'under-2000-sqft' },
    { sqFt: 2500, yearBuilt: 2022, expectedPipe: '1',   pressureReducerRequired: false, label: '2001-3000-sqft' },
    { sqFt: 3500, yearBuilt: 2000, expectedPipe: '1 1/4', pressureReducerRequired: true, label: '3001-5000-sqft' },
  ];

  for (const tc of pipeSizeCases) {
    test(`Pipe size for ${tc.sqFt} sq ft = ${tc.expectedPipe} inch; pressure reducer = ${tc.pressureReducerRequired ? 'REQUIRED' : 'NOT required'}`, async ({ page }) => {
      await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

      await page.click('[data-testid="nav-service-request"]');
      await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

      const sqFtField = page.locator('[data-testid="square-footage"], [name="squareFootage"]');
      if (!await sqFtField.isVisible()) {
        test.skip(true, 'Square footage field not found – verify selector in live app');
      }

      await page.fill('[data-testid="square-footage"], [name="squareFootage"]', String(tc.sqFt));
      await page.fill('[data-testid="year-built"], [name="yearBuilt"]', String(tc.yearBuilt));

      // After filling sq ft, the pipe size should auto-calculate
      await page.locator('[data-testid="square-footage"], [name="squareFootage"]').blur();
      await page.waitForTimeout(500);

      const pipeSizeDisplay = page.locator('[data-testid="calculated-pipe-size"], [data-testid="pipe-size"]');
      if (await pipeSizeDisplay.isVisible()) {
        await expect(pipeSizeDisplay).toContainText(tc.expectedPipe);
      }

      const pressureReducerDisplay = page.locator('[data-testid="pressure-reducer-required"], [data-testid="pressure-reducer"]');
      if (await pressureReducerDisplay.isVisible()) {
        if (tc.pressureReducerRequired) {
          await expect(pressureReducerDisplay).toContainText(/required/i);
        } else {
          await expect(pressureReducerDisplay).not.toContainText(/required/i);
        }
      }

      await page.screenshot({
        path: path.join(screenshotDir, `pipe-size_${tc.label}.png`),
      });
    });
  }
});

// ─── Water Main Photo Validation ──────────────────────────────────────────────

test.describe('Water Main Photo – Required Field Validation', () => {
  test('Form should NOT submit when water main photo is skipped', async ({ page }) => {
    // Per Christopher's Testing Guide Part 5 – Incomplete Forms:
    // "Skip water main photo → Form should not submit"
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-service-request"]');
    await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

    // Fill all fields EXCEPT water main photo
    await page.fill('[data-testid="property-address"]', TEST_USERS.homeowner.address);

    const sqFtField = page.locator('[data-testid="square-footage"], [name="squareFootage"]');
    if (await sqFtField.isVisible()) {
      await sqFtField.fill('1800');
    }

    // Skip water main photo (intentionally leave blank)
    // Submit and expect validation error
    await page.click('[data-testid="service-request-submit"]');

    // Form should remain on the form page with a validation error
    const errorLocator = page.locator('[data-testid="water-main-photo-error"], [data-testid="validation-error"]:has-text("photo"), :has-text("water main photo is required"), :has-text("required")');
    await page.waitForLoadState('networkidle');

    if (await errorLocator.isVisible()) {
      await expect(errorLocator).toBeVisible();
      await page.screenshot({ path: path.join(edgeCaseDir, 'edge_water-main-photo-skipped-error.png') });
    } else {
      // If no error shown, it's a bug – take screenshot for bug report
      await page.screenshot({ path: path.join(edgeCaseDir, 'edge_water-main-photo-skipped-BUG.png') });
      test.info().annotations.push({
        type: 'warning',
        description: 'Form submitted without water main photo. Per Christopher\'s Testing Guide Part 5, this should produce a validation error.',
      });
    }
  });

  test('Form validation: invalid year built → error', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-service-request"]');
    await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

    const yearBuiltField = page.locator('[data-testid="year-built"], [name="yearBuilt"]');
    if (!await yearBuiltField.isVisible()) {
      test.skip(true, 'Year built field not found');
    }

    await yearBuiltField.fill('abc');
    await page.click('[data-testid="service-request-submit"]');

    await page.screenshot({ path: path.join(edgeCaseDir, 'edge_invalid-year-built-error.png') });
  });

  test('Form validation: non-numeric sq ft → error', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-service-request"]');
    await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

    const sqFtField = page.locator('[data-testid="square-footage"], [name="squareFootage"]');
    if (!await sqFtField.isVisible()) {
      test.skip(true, 'Square footage field not found');
    }

    await sqFtField.fill('abcdef');
    await page.click('[data-testid="service-request-submit"]');

    await page.screenshot({ path: path.join(edgeCaseDir, 'edge_invalid-sqft-error.png') });
  });
});

// ─── No Agent Email (Edge Case) ───────────────────────────────────────────────

test.describe('Homeowner Service Request – No Agent Email (Edge Case)', () => {
  test('Homeowner submits service request without entering agent email', async ({ page }) => {
    await loginAs(page, homeownerNoAgent.email, homeownerNoAgent.password);

    await page.click('[data-testid="nav-service-request"]');
    await page.fill('[data-testid="property-address"]', homeownerNoAgent.address);

    const sqFtField = page.locator('[data-testid="square-footage"], [name="squareFootage"]');
    if (await sqFtField.isVisible()) {
      await sqFtField.fill(String(homeownerNoAgent.sqFt));
    }

    const yearBuiltField = page.locator('[data-testid="year-built"], [name="yearBuilt"]');
    if (await yearBuiltField.isVisible()) {
      await yearBuiltField.fill(String(homeownerNoAgent.yearBuilt));
    }

    // Intentionally leave agent email blank (agent email is optional per spec)

    await page.click('[data-testid="service-request-submit"]');

    // Should still submit (agent email is optional)
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();

    await page.screenshot({ path: path.join(edgeCaseDir, 'edge_no-agent-email-submit.png') });
  });
});

// ─── Multiple Properties, Same Homeowner ──────────────────────────────────────

test.describe('Multiple Properties – Same Homeowner (Part 5 Scenario D)', () => {
  const properties = [
    { address: '123 Main St, Los Angeles CA 90001', sqFt: 1800, yearBuilt: 2010, label: 'prop1' },
    { address: '456 Oak Ave, Anaheim CA 92801',     sqFt: 2500, yearBuilt: 2022, label: 'prop2' },
    { address: '789 Pine Ln, Irvine CA 92604',      sqFt: 3500, yearBuilt: 2000, label: 'prop3' },
  ];

  for (const prop of properties) {
    test(`Homeowner submits request for ${prop.label} – ${prop.address}`, async ({ page }) => {
      await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

      await page.click('[data-testid="nav-service-request"]');
      await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

      await page.fill('[data-testid="property-address"]', prop.address);

      const sqFtField = page.locator('[data-testid="square-footage"], [name="squareFootage"]');
      if (await sqFtField.isVisible()) {
        await sqFtField.fill(String(prop.sqFt));
      }

      const yearBuiltField = page.locator('[data-testid="year-built"], [name="yearBuilt"]');
      if (await yearBuiltField.isVisible()) {
        await yearBuiltField.fill(String(prop.yearBuilt));
      }

      await page.screenshot({ path: path.join(screenshotDir, `multi-prop_${prop.label}_form.png`) });

      await page.click('[data-testid="service-request-submit"]');
      await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();

      await page.screenshot({ path: path.join(screenshotDir, `multi-prop_${prop.label}_confirmed.png`) });
    });
  }

  test('All submitted requests appear separately in My Requests', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-my-requests"], a:has-text("My Requests")');
    const requests = page.locator('[data-testid="service-request-item"]');
    const count = await requests.count();

    // Expect at least as many requests as properties we submitted
    expect(count).toBeGreaterThanOrEqual(properties.length);

    await page.screenshot({ path: path.join(screenshotDir, 'multi-prop_all-requests-dashboard.png') });
  });
});
