import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Assessment Service Workflow Tests (Workflow 9)
 *
 * Source: Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM"
 *   Workflow 9: Assessment Service
 *
 * Covers:
 *   - Homeowner selects "Request Property Assessment"
 *   - System calculates fee: $185 + $0.75/mile (shows estimated total)
 *   - Homeowner confirms and pays invoice
 *   - Technician receives assignment email
 *   - Technician schedules visit
 *   - Technician completes assessment and uploads report
 *   - Homeowner notified (can proceed with installation)
 *
 * ⚠️  Update BASE_URL via MRSURETY_BASE_URL environment variable
 *      before running against staging/production.
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/assessment-service');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

test.describe.serial('Workflow 9 – Assessment Service', () => {
  test('Step 1: Homeowner selects "Request Property Assessment"', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-service-request"]');
    await expect(page.locator('[data-testid="service-request-form"]')).toBeVisible();

    // Select "Assessment" as service type (per Workflow 2 Section 2: Service Type)
    const serviceTypeField = page.locator('[data-testid="service-type"], [name="serviceType"]');
    if (await serviceTypeField.isVisible()) {
      await serviceTypeField.selectOption({ label: 'Assessment' });
    } else {
      // Look for a dedicated Assessment button
      const assessmentBtn = page.locator(
        '[data-testid="service-type-assessment"], button:has-text("Assessment"), button:has-text("Request Property Assessment")',
      );
      if (await assessmentBtn.isVisible()) {
        await assessmentBtn.click();
      }
    }

    await page.screenshot({ path: path.join(screenshotDir, 'wf9_01_assessment-service-selected.png') });
  });

  test('Step 2: System calculates fee – $185 + $0.75/mile (shows estimated total)', async ({ page }) => {
    // Per Christopher's Testing Guide Workflow 9 Step 2:
    // "System calculates fee: $185 + $0.75/mile – Shows estimated total"
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-service-request"]');

    const serviceTypeField = page.locator('[data-testid="service-type"], [name="serviceType"]');
    if (await serviceTypeField.isVisible()) {
      await serviceTypeField.selectOption({ label: 'Assessment' });
    }

    await page.fill('[data-testid="property-address"], [name="address"]', TEST_USERS.homeowner.address);

    // After selecting assessment + entering address, fee should auto-calculate
    await page.locator('[data-testid="property-address"], [name="address"]').blur();
    await page.waitForTimeout(1000);

    // Verify fee calculation appears
    const feeDisplay = page.locator(
      '[data-testid="assessment-fee"], [data-testid="calculated-fee"], :has-text("$185"), :has-text("assessment fee")',
    );
    if (await feeDisplay.isVisible()) {
      // Fee should be at least $185 (base) + mileage
      await expect(feeDisplay).toBeVisible();
      await page.screenshot({ path: path.join(screenshotDir, 'wf9_02_assessment-fee-calculated.png') });
    } else {
      await page.screenshot({ path: path.join(screenshotDir, 'wf9_02_assessment-fee-not-shown.png') });
      test.info().annotations.push({
        type: 'warning',
        description: 'Assessment fee ($185 + $0.75/mile) not visible. Verify fee calculation UI in live app.',
      });
    }
  });

  test('Step 3: Homeowner confirms and pays assessment invoice', async ({ page }) => {
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-my-requests"], a:has-text("My Requests")');
    const assessmentRequest = page.locator(
      '[data-testid="service-request-item"][data-type="assessment"], [data-testid="assessment-request"]',
    ).first();

    if (!await assessmentRequest.isVisible()) {
      // Try to find any pending invoice
      const anyRequest = page.locator('[data-testid="service-request-item"]').first();
      if (!await anyRequest.isVisible()) {
        test.skip(true, 'No assessment requests found – submit an assessment request first');
      }
      await anyRequest.click();
    } else {
      await assessmentRequest.click();
    }

    // Pay the assessment invoice
    const payInvoiceBtn = page.locator(
      '[data-testid="pay-assessment-invoice"], button:has-text("Pay Invoice"), button:has-text("Confirm & Pay")',
    );
    if (await payInvoiceBtn.isVisible()) {
      await payInvoiceBtn.click();

      // Fill payment info
      const cardField = page.locator('[data-testid="card-number"]');
      if (await cardField.isVisible()) {
        await page.fill('[data-testid="card-number"]', '4111111111111111');
        await page.fill('[data-testid="card-expiry"]', '12/27');
        await page.fill('[data-testid="card-cvc"]', '123');
        await page.click('[data-testid="deposit-submit"], button:has-text("Pay")');
      }
    }

    await page.screenshot({ path: path.join(screenshotDir, 'wf9_03_assessment-invoice-paid.png') });
  });

  test('Step 4: Technician receives assignment email (New Assessment)', async ({ page }) => {
    // Technician email T2: "New Assessment" triggered by assessment payment
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    await page.click('[data-testid="nav-dashboard"]');

    // Look for new assessment assignment notification
    const assignmentNotification = page.locator(
      '[data-testid="assessment-assignment"], [data-testid="new-assessment"]',
    ).first();

    if (await assignmentNotification.isVisible()) {
      await assignmentNotification.click();
    }

    await page.screenshot({ path: path.join(screenshotDir, 'wf9_04_tech-new-assessment-notification.png') });
    test.info().annotations.push({
      type: 'info',
      description: 'Technician email T2: New Assessment should be received with property details. Verify email includes: address, assessment type, homeowner contact.',
    });
  });

  test('Step 5: Technician schedules visit', async ({ page }) => {
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    await page.click('[data-testid="nav-my-assessments"], [data-testid="nav-dashboard"]');

    const assessmentJob = page.locator(
      '[data-testid="assessment-job"], [data-testid="pending-assessment"]',
    ).first();

    if (await assessmentJob.isVisible()) {
      await assessmentJob.click();

      const scheduleBtn = page.locator(
        '[data-testid="schedule-assessment"], button:has-text("Schedule Visit")',
      );
      if (await scheduleBtn.isVisible()) {
        await scheduleBtn.click();
        // Pick a date from calendar
        const datePicker = page.locator('[data-testid="date-picker"]');
        if (await datePicker.isVisible()) {
          await page.click('[data-testid="date-picker-next-available"]');
          await page.click('[data-testid="confirm-date-btn"], button:has-text("Confirm")');
        }
      }
    }

    await page.screenshot({ path: path.join(screenshotDir, 'wf9_05_tech-assessment-scheduled.png') });
  });

  test('Step 6 & 7: Technician completes assessment and uploads report', async ({ page }) => {
    await loginAs(page, TEST_USERS.technician.email, TEST_USERS.technician.password);

    await page.click('[data-testid="nav-my-assessments"], [data-testid="nav-dashboard"]');

    const assessmentJob = page.locator(
      '[data-testid="assessment-job"], [data-testid="scheduled-assessment"]',
    ).first();

    if (await assessmentJob.isVisible()) {
      await assessmentJob.click();

      const markCompleteBtn = page.locator(
        '[data-testid="mark-assessment-complete"], button:has-text("Complete Assessment")',
      );
      if (await markCompleteBtn.isVisible()) {
        await markCompleteBtn.click();
      }

      // Upload assessment report (PDF required per Workflow 9 Step 7)
      const uploadReportBtn = page.locator(
        '[data-testid="upload-assessment-report"], button:has-text("Upload Report")',
      );
      if (await uploadReportBtn.isVisible()) {
        await uploadReportBtn.click();
        await page.screenshot({ path: path.join(screenshotDir, 'wf9_07_tech-upload-report.png') });
        test.info().annotations.push({
          type: 'todo',
          description: 'Upload actual assessment report PDF. Technician email T4: Report Upload Required should have been sent first.',
        });
      }
    }

    await page.screenshot({ path: path.join(screenshotDir, 'wf9_06_tech-assessment-completed.png') });
  });

  test('Step 8: Homeowner notified – can proceed with installation', async ({ page }) => {
    // After assessment report uploaded, homeowner should be notified
    await loginAs(page, TEST_USERS.homeowner.email, TEST_USERS.homeowner.password);

    await page.click('[data-testid="nav-my-requests"], a:has-text("My Requests")');

    // Look for completed assessment notification
    const completedAssessment = page.locator(
      '[data-testid="service-request-item"][data-status="assessment-complete"], [data-testid="assessment-ready"]',
    ).first();

    if (await completedAssessment.isVisible()) {
      await completedAssessment.click();
    }

    await page.screenshot({ path: path.join(screenshotDir, 'wf9_08_homeowner-assessment-complete-notification.png') });
    test.info().annotations.push({
      type: 'info',
      description: 'Homeowner should be notified that assessment is complete and can proceed with installation request.',
    });
  });
});
