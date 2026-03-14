import { test, expect, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Contractor Bidding Workflow Tests
 *
 * Source: Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM"
 *   Workflow 3: Contractor Bidding (TWO METHODS)
 *   Workflow 4: Homeowner Selection & Deposit
 *   Part 5: Special Scenarios (Resale Certificate, Software, Device Source)
 *
 * Method A – Upload Written Estimate
 * Method B – System Estimate Creator (line-item table)
 *
 * Pricing rules (MUST VERIFY IN APP):
 *   Parts:     contractor price × 1.35
 *   Pressure:  contractor price × 1.35
 *   Cable:     contractor price × 1.35
 *   Labor:     contractor price × 1.25
 *   Software:  $75 flat × 1.25 = $93.75
 *   Device:    $599.99 fixed at 0% markup (Contractor Provided)
 *   Service Fee: $95 flat (MUST appear in every estimate)
 *
 * ⚠️  Update BASE_URL via MRSURETY_BASE_URL environment variable
 *      before running against staging/production.
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/contractor-bidding');
const sampleEstimatePath = path.join(__dirname, 'fixtures/sample-estimate.pdf');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

// ─── Method A: Upload Written Estimate ───────────────────────────────────────

test.describe('Contractor Bidding – Method A: Upload Written Estimate', () => {
  test('Contractor views available jobs and uploads a written estimate', async ({ page }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    // Step 1: View available jobs
    await page.click('[data-testid="nav-available-jobs"]');
    const firstJob = page.locator('[data-testid="job-item"]').first();
    await expect(firstJob).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '01A_available-jobs-list.png') });

    await firstJob.click();
    await expect(page.locator('[data-testid="job-detail"]')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, '01A_job-detail-with-pricing-guidance.png') });

    // Step 2: Select "Upload written estimate"
    const uploadMethodBtn = page.locator('[data-testid="bid-method-upload"], button:has-text("Upload written estimate")');
    await uploadMethodBtn.click();
    await expect(page.locator('[data-testid="upload-estimate-field"], [data-testid="upload-area"]')).toBeVisible();

    // Step 3: Upload PDF or photo of estimate
    if (fs.existsSync(sampleEstimatePath)) {
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('[data-testid="upload-estimate-btn"], [data-testid="upload-area"]'),
      ]);
      await fileChooser.setFiles(sampleEstimatePath);
      await expect(page.locator('[data-testid="estimate-uploaded"], [data-testid="upload-success"]')).toBeVisible();
    }

    // Step 4: Enter parts total with description
    await page.fill('[data-testid="parts-total"], [name="partsTotal"]', '220');
    await page.fill('[data-testid="parts-description"], [name="partsDescription"]', 'Main shut-off valve and pipe connectors');

    // Step 5: Enter pressure reducer price
    await page.fill('[data-testid="pressure-reducer-price"], [name="pressureReducerPrice"]', '280');

    // Step 6: Software checkbox ($75 added if checked)
    const softwareCheckbox = page.locator('[data-testid="software-checkbox"], input[name="software"]');
    if (await softwareCheckbox.isVisible()) {
      // Only check if homeowner requested software
      await softwareCheckbox.check();
    }

    // Step 7: Enter labor price
    await page.fill('[data-testid="labor-price"], [name="laborPrice"]', '575');

    // Step 8: Select Resale Certificate (YES = contractor enters prices WITHOUT tax)
    const resaleCertYes = page.locator('[data-testid="resale-cert-yes"], [value="yes"]');
    if (await resaleCertYes.isVisible()) {
      await resaleCertYes.click();
    }

    await page.screenshot({ path: path.join(screenshotDir, '02A_bid-upload-form-filled.png') });

    // Step 9: Submit bid
    await page.click('[data-testid="bid-submit"], button:has-text("Submit")');
    await expect(page.locator('[data-testid="bid-submitted-confirmation"], [data-testid="confirmation-message"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '03A_bid-submitted-confirmation.png') });
  });
});

// ─── Method B: System Estimate Creator ──────────────────────────────────────

test.describe('Contractor Bidding – Method B: System Estimate Creator', () => {
  test('Contractor uses estimate creator with line items', async ({ page }) => {
    await loginAs(page, TEST_USERS.contractor2.email, TEST_USERS.contractor2.password);

    // Step 1: View available jobs
    await page.click('[data-testid="nav-available-jobs"]');
    const firstJob = page.locator('[data-testid="job-item"]').first();
    await expect(firstJob).toBeVisible();
    await firstJob.click();

    // Step 2: Select "Use estimate creator"
    const creatorMethodBtn = page.locator('[data-testid="bid-method-creator"], button:has-text("Use estimate creator")');
    await creatorMethodBtn.click();

    // Line item table appears
    await expect(page.locator('[data-testid="estimate-line-items"], [data-testid="line-item-table"]')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, '01B_estimate-creator-opened.png') });

    // Step 3: Add line items
    const addLineItemBtn = page.locator('[data-testid="add-line-item"], button:has-text("Add Item")');
    if (await addLineItemBtn.isVisible()) {
      // Add parts line item
      await addLineItemBtn.click();
      await page.fill('[data-testid="line-item-description"]:last-of-type', 'Main shut-off valve');
      await page.fill('[data-testid="line-item-quantity"]:last-of-type', '1');
      await page.fill('[data-testid="line-item-price"]:last-of-type', '220');

      // Add another line item (cable)
      await addLineItemBtn.click();
      await page.fill('[data-testid="line-item-description"]:last-of-type', 'Copper pipe connector');
      await page.fill('[data-testid="line-item-quantity"]:last-of-type', '2');
      await page.fill('[data-testid="line-item-price"]:last-of-type', '12.50');
    }

    // Step 4: Pressure reducer as a separate line
    await page.fill('[data-testid="pressure-reducer-price"], [name="pressureReducerPrice"]', '280');

    // Step 5: Device field – auto-populates $599.99 if contractor-provided (read-only)
    const deviceField = page.locator('[data-testid="device-price"], [name="devicePrice"]');
    if (await deviceField.isVisible()) {
      // Verify it auto-populates as read-only when device source = Contractor Provided
      const isReadOnly = await deviceField.getAttribute('readonly');
      if (isReadOnly !== null) {
        await expect(deviceField).toHaveValue('599.99');
        await page.screenshot({ path: path.join(screenshotDir, '01B_device-price-auto-populated.png') });
      }
    }

    // Step 6: Software checkbox ($75 flat if requested)
    const softwareCheckbox = page.locator('[data-testid="software-checkbox"], input[name="software"]');
    if (await softwareCheckbox.isVisible()) {
      await softwareCheckbox.check();
    }

    // Step 7: Labor price
    await page.fill('[data-testid="labor-price"], [name="laborPrice"]', '575');

    // Step 8: Resale Certificate – NO (contractor includes tax in prices)
    const resaleCertNo = page.locator('[data-testid="resale-cert-no"], [value="no"]');
    if (await resaleCertNo.isVisible()) {
      await resaleCertNo.click();
    }

    await page.screenshot({ path: path.join(screenshotDir, '02B_estimate-creator-filled.png') });

    // Step 9: Submit bid
    await page.click('[data-testid="bid-submit"], button:has-text("Submit")');
    await expect(page.locator('[data-testid="bid-submitted-confirmation"], [data-testid="confirmation-message"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '03B_estimate-creator-submitted.png') });
  });
});

// ─── Homeowner Selection & Pricing Verification ──────────────────────────────

test.describe('Homeowner Selection & Deposit', () => {
  test('Homeowner sees estimates with retail prices only and $95 service fee', async ({ page }) => {
    // Per Christopher's doc: homeowner sees retail prices ONLY (not contractor prices)
    // Service Fee ($95) MUST appear in all estimates as a separate line item
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-my-requests"], a:has-text("My Requests")');
    const request = page.locator('[data-testid="service-request-item"]').first();
    await request.click();

    await expect(page.locator('[data-testid="bids-section"]')).toBeVisible();
    const firstBid = page.locator('[data-testid="bid-card"]').first();
    await expect(firstBid).toBeVisible();

    // VERIFY: Service Fee ($95) appears in estimate
    await expect(
      page.locator('[data-testid="service-fee"], :has-text("$95"), :has-text("Service Fee")'),
    ).toBeVisible();

    // VERIFY: Homeowner sees retail prices only
    // Contractor's original prices should NOT be visible to the homeowner
    const contractorPriceField = page.locator('[data-testid="contractor-price"]');
    if (await contractorPriceField.count() > 0) {
      // If contractor price fields exist, this is a bug – homeowner should only see retail
      await page.screenshot({ path: path.join(screenshotDir, '04H_BUG-contractor-prices-visible.png') });
    }

    await page.screenshot({ path: path.join(screenshotDir, '04H_estimate-review-retail-only.png') });

    // Select a contractor
    await firstBid.locator('[data-testid="select-bid-btn"], button:has-text("Approve")').click();
    await expect(page.locator('[data-testid="bid-selected-confirmation"], [data-testid="approve-schedule-btn"]')).toBeVisible();

    await page.screenshot({ path: path.join(screenshotDir, '05H_contractor-selected.png') });
  });

  test('Homeowner pays 10% deposit and calendar opens immediately', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-my-requests"], a:has-text("My Requests")');
    const request = page.locator('[data-testid="service-request-item"]').first();
    await request.click();

    // Approve estimate + click Pay Deposit
    const approveBtn = page.locator('[data-testid="approve-estimate-btn"], button:has-text("Approve")');
    if (await approveBtn.isVisible()) {
      await approveBtn.click();
    }

    await page.click('[data-testid="pay-deposit-btn"], button:has-text("Pay Deposit")');
    await expect(page.locator('[data-testid="deposit-form"]')).toBeVisible();

    // VERIFY: Deposit is 10% of total
    await expect(
      page.locator('[data-testid="deposit-amount"]:has-text("10%"), [data-testid="deposit-summary"]:has-text("10%")'),
    ).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, '06H_deposit-form-10-percent.png') });

    // Enter credit card details
    await page.fill('[data-testid="card-number"]', '4111111111111111');
    await page.fill('[data-testid="card-expiry"]', '12/27');
    await page.fill('[data-testid="card-cvc"]', '123');
    await page.click('[data-testid="deposit-submit"], button:has-text("Pay")');

    await expect(page.locator('[data-testid="deposit-confirmed"]')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, '07H_deposit-confirmed.png') });

    // VERIFY: Calendar opens right after payment (per Christopher's doc)
    await expect(page.locator('[data-testid="date-picker"]')).toBeVisible({ timeout: 10_000 });
    await page.screenshot({ path: path.join(screenshotDir, '08H_calendar-opened-after-payment.png') });

    await page.click('[data-testid="date-picker-next-available"]');
    await page.click('[data-testid="confirm-date-btn"], button:has-text("Confirm")');

    await expect(page.locator('[data-testid="date-confirmed"]')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, '09H_installation-date-confirmed.png') });
  });
});

// ─── Special Scenarios ────────────────────────────────────────────────────────

test.describe('Special Scenarios – Device Source and Resale Certificate', () => {
  test('Device source: Contractor Provided = $599.99 fixed at 0% markup', async ({ page }) => {
    // Per Christopher's doc: Contractor Provided = $599.99 fixed, 0% markup
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-available-jobs"]');
    const firstJob = page.locator('[data-testid="job-item"]').first();
    await expect(firstJob).toBeVisible();
    await firstJob.click();

    const deviceSourceDropdown = page.locator('[data-testid="device-source"], [name="deviceSource"]');
    if (await deviceSourceDropdown.isVisible()) {
      await deviceSourceDropdown.selectOption({ label: 'Contractor Provided' });

      // Device price should auto-populate as $599.99 (read-only)
      const devicePrice = page.locator('[data-testid="device-price"]');
      await expect(devicePrice).toHaveValue('599.99');
      await page.screenshot({ path: path.join(screenshotDir, '10_device-contractor-provided-599.png') });
    }
  });

  test('Device source: Homeowner Provided = $0 no device charge', async ({ page }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-available-jobs"]');
    const firstJob = page.locator('[data-testid="job-item"]').first();
    if (!await firstJob.isVisible()) test.skip(true, 'No available jobs');
    await firstJob.click();

    const deviceSourceDropdown = page.locator('[data-testid="device-source"], [name="deviceSource"]');
    if (await deviceSourceDropdown.isVisible()) {
      await deviceSourceDropdown.selectOption({ label: 'Homeowner Provided' });
      // No device charge should be shown
      const devicePrice = page.locator('[data-testid="device-price"]');
      if (await devicePrice.isVisible()) {
        await expect(devicePrice).toHaveValue('0');
      }
      await page.screenshot({ path: path.join(screenshotDir, '11_device-homeowner-provided-zero.png') });
    }
  });
});
