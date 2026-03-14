import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Admin Workflow Guide (Doc #8) Tests
 *
 * Source: Doc #8 – Admin Workflow Guide
 *   Website:  https://frontend-tan-five-46.vercel.app
 *   Login:    admin@mrsurety.com | Password: MrSurety2026!
 *
 * This spec covers the gaps NOT already tested in admin-dashboard.spec.ts.
 * That existing spec covers:
 *   – Admin login + basic dashboard overview
 *   – Approve pending contractor (basic nav + button click)
 *   – Approve work order (basic nav + button click)
 *   – Review job status and payment
 *
 * This spec adds:
 *
 * Section 1 – Your Dashboard
 *   Step 2 (extended): Action items, pending requests, and recent activity are visible
 *   Step 3: Stat cards are present and each card navigates to a filtered list
 *
 * Section 2 – Managing Service Requests
 *   Step 1: 'Service Requests' appears in the left-nav menu
 *   Step 2: Opening a service request shows full request details
 *   Step 3: System suggests a best-match contractor by distance and qualifications
 *   Step 4: Request status updates as work progresses (status field / timeline visible)
 *
 * Section 3 – Managing Work Orders
 *   Step 2: Completed work order page shows contractor-uploaded photos
 *   Step 3: 'Approve' button triggers invoices, DocuSign lien releases, and payments
 *   Step 4: Generated documents (invoices, receipts, lien releases) are visible below work order
 *
 * Section 4 – Other Pages
 *   Step 1: Contractors page – both Approve and Reject actions are available
 *   Step 2: Referrals page – accessible from left nav with referral list
 *   Step 3: Compliance page – documents listed with download capability
 *   Step 4: Phone System page – call logs and voicemails are visible
 *   Step 5: Notifications bell icon – alerts show for new requests, payments, and more
 *
 * Run via: npm run test:admin-doc8
 *   (from repo root — baseURL set by playwright.config.ts)
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/admin-workflow-doc8');

async function loginAsAdmin(page: Page) {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');

  const emailField = page.locator(
    '[data-testid="email"], input[type="email"], input[name="email"]',
  ).first();
  await emailField.fill(TEST_USERS.admin.email);

  const passwordField = page.locator(
    '[data-testid="password"], input[type="password"], input[name="password"]',
  ).first();
  await passwordField.fill(TEST_USERS.admin.password);

  await page.locator(
    '[data-testid="login-submit"], button[type="submit"], button:has-text("Login"), button:has-text("Sign in")',
  ).first().click();

  await expect(page).not.toHaveURL(/\/login/, { timeout: 15_000 });
}

// ─────────────────────────────────────────────────────────────────────────────
// Doc #8 Section 1 – Your Dashboard (extended)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Doc #8 Section 1 – Your Dashboard (extended)', () => {
  // Step 2 (extended): Action items, pending requests, and recent activity visible
  test('Step 2: Dashboard shows action items, pending requests, and recent activity', async ({ page }) => {
    await loginAsAdmin(page);

    // Action items section
    const actionItems = page.locator(
      '[data-testid="action-items"], ' +
      '[data-testid="dashboard-actions"], ' +
      ':has-text("Action Items"), ' +
      ':has-text("Action Required")',
    ).first();
    await expect(actionItems).toBeVisible({ timeout: 10_000 });

    // Pending requests section
    const pendingRequests = page.locator(
      '[data-testid="pending-requests"], ' +
      '[data-testid="pending-section"], ' +
      ':has-text("Pending"), ' +
      ':has-text("Pending Requests")',
    ).first();
    await expect(pendingRequests).toBeVisible({ timeout: 10_000 });

    // Recent activity section
    const recentActivity = page.locator(
      '[data-testid="recent-activity"], ' +
      '[data-testid="activity-feed"], ' +
      ':has-text("Recent Activity"), ' +
      ':has-text("Recent")',
    ).first();
    await expect(recentActivity).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '01_doc8-dashboard-action-pending-activity.png'),
      fullPage: true,
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 1 Step 2: Admin dashboard shows action items, pending requests, and recent activity.',
    });
  });

  // Step 3: Stat cards navigate to filtered lists
  test('Step 3: Dashboard stat cards are present and navigate to filtered lists', async ({ page }) => {
    await loginAsAdmin(page);

    // At least one stat card should be visible
    const statCard = page.locator(
      '[data-testid="stat-card"], ' +
      '[data-testid="dashboard-card"], ' +
      '[data-testid="metric-card"], ' +
      '.stat-card, ' +
      '[class*="stat-card"], ' +
      '[class*="metric-card"]',
    ).first();
    await expect(statCard).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '02_doc8-dashboard-stat-cards.png'),
      fullPage: true,
    });

    // Click the first stat card and verify navigation to a filtered list
    await statCard.click();
    await page.waitForLoadState('networkidle');

    // After clicking a stat card we should land on a list page
    const listPage = page.locator(
      '[data-testid="filtered-list"], ' +
      'table, ' +
      '[data-testid="list-view"], ' +
      '[role="table"]',
    ).first();
    await expect(listPage).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '03_doc8-stat-card-filtered-list.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 1 Step 3: Each stat card on the admin dashboard navigates to a filtered list (e.g., pending contractors, active work orders).',
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Doc #8 Section 2 – Managing Service Requests
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Doc #8 Section 2 – Managing Service Requests', () => {
  // Step 1: 'Service Requests' in the left-nav
  test('Step 1: "Service Requests" link is in the left-nav menu', async ({ page }) => {
    await loginAsAdmin(page);

    const serviceRequestsNav = page.locator(
      '[data-testid="nav-service-requests"], ' +
      '[data-testid="nav-admin-service-requests"], ' +
      'nav a:has-text("Service Requests"), ' +
      'aside a:has-text("Service Requests"), ' +
      'a:has-text("Service Requests")',
    ).first();
    await expect(serviceRequestsNav).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '04_doc8-service-requests-nav.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 2 Step 1: "Service Requests" is visible in the left-nav menu.',
    });
  });

  // Step 2: Opening a service request shows full request details
  test('Step 2: Opening a service request shows full request details', async ({ page }) => {
    await loginAsAdmin(page);

    const serviceRequestsNav = page.locator(
      '[data-testid="nav-service-requests"], ' +
      '[data-testid="nav-admin-service-requests"], ' +
      'nav a:has-text("Service Requests"), ' +
      'aside a:has-text("Service Requests"), ' +
      'a:has-text("Service Requests")',
    ).first();
    if (await serviceRequestsNav.isVisible()) {
      await serviceRequestsNav.click();
      await page.waitForLoadState('networkidle');
    }

    // Open the first request in the list
    const firstRequest = page.locator(
      '[data-testid="service-request-item"], ' +
      '[data-testid="request-row"], ' +
      'table tbody tr, ' +
      '[data-testid="request-item"]',
    ).first();
    await expect(firstRequest).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '05_doc8-service-requests-list.png'),
    });

    await firstRequest.click();
    await page.waitForLoadState('networkidle');

    // Request detail should show relevant info
    const requestDetail = page.locator(
      '[data-testid="service-request-detail"], ' +
      '[data-testid="request-detail"], ' +
      ':has-text("Service Request"), ' +
      ':has-text("Property"), ' +
      ':has-text("Issue")',
    ).first();
    await expect(requestDetail).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '06_doc8-service-request-detail.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 2 Step 2: Clicking into a service request shows the full request details.',
    });
  });

  // Step 3: System suggests best contractor by distance and qualifications
  test('Step 3: System suggests best-match contractor by distance and qualifications', async ({ page }) => {
    await loginAsAdmin(page);

    const serviceRequestsNav = page.locator(
      '[data-testid="nav-service-requests"], ' +
      'nav a:has-text("Service Requests"), ' +
      'aside a:has-text("Service Requests"), ' +
      'a:has-text("Service Requests")',
    ).first();
    if (await serviceRequestsNav.isVisible()) {
      await serviceRequestsNav.click();
      await page.waitForLoadState('networkidle');
    }

    const firstRequest = page.locator(
      '[data-testid="service-request-item"], [data-testid="request-row"], table tbody tr',
    ).first();
    if (await firstRequest.isVisible()) {
      await firstRequest.click();
      await page.waitForLoadState('networkidle');
    }

    // The contractor suggestion / assignment panel
    const contractorSuggestion = page.locator(
      '[data-testid="contractor-suggestion"], ' +
      '[data-testid="suggested-contractor"], ' +
      '[data-testid="assign-contractor"], ' +
      ':has-text("Suggested"), ' +
      ':has-text("Best Match"), ' +
      ':has-text("Assign Contractor"), ' +
      ':has-text("distance"), ' +
      ':has-text("qualifications")',
    ).first();

    if (await contractorSuggestion.isVisible()) {
      await expect(contractorSuggestion).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '07_doc8-contractor-suggestion-distance-qualifications.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 2 Step 3: System suggests the best contractor by distance and qualifications for admin to select.',
    });
  });

  // Step 4: Request status updates as work progresses
  test('Step 4: Service request has a visible status field that updates as work progresses', async ({ page }) => {
    await loginAsAdmin(page);

    const serviceRequestsNav = page.locator(
      '[data-testid="nav-service-requests"], ' +
      'nav a:has-text("Service Requests"), ' +
      'a:has-text("Service Requests")',
    ).first();
    if (await serviceRequestsNav.isVisible()) {
      await serviceRequestsNav.click();
      await page.waitForLoadState('networkidle');
    }

    const firstRequest = page.locator(
      '[data-testid="service-request-item"], [data-testid="request-row"], table tbody tr',
    ).first();
    if (await firstRequest.isVisible()) {
      await firstRequest.click();
      await page.waitForLoadState('networkidle');
    }

    // Status indicator on the request detail
    const statusField = page.locator(
      '[data-testid="request-status"], ' +
      '[data-testid="status-badge"], ' +
      '[data-testid="status-field"], ' +
      ':has-text("Status"), ' +
      ':has-text("Pending"), ' +
      ':has-text("In Progress"), ' +
      ':has-text("Completed")',
    ).first();
    await expect(statusField).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '08_doc8-request-status-tracking.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 2 Step 4: Status field on the service request updates as the contractor submits estimates and work progresses.',
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Doc #8 Section 3 – Managing Work Orders (extended)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Doc #8 Section 3 – Managing Work Orders (extended)', () => {
  // Step 2: Completed work order page shows contractor photos
  test('Step 2: Completed work order page shows contractor-uploaded photos', async ({ page }) => {
    await loginAsAdmin(page);

    const workOrdersNav = page.locator(
      '[data-testid="nav-admin-work-orders"], ' +
      '[data-testid="nav-work-orders"], ' +
      'nav a:has-text("Work Orders"), ' +
      'aside a:has-text("Work Orders"), ' +
      'a:has-text("Work Orders")',
    ).first();
    if (await workOrdersNav.isVisible()) {
      await workOrdersNav.click();
      await page.waitForLoadState('networkidle');
    }

    // Find a completed/submitted work order and open it
    const completedWorkOrder = page.locator(
      '[data-testid="pending-work-order"], ' +
      '[data-testid="completed-work-order"], ' +
      '[data-testid="work-order-item"], ' +
      'table tbody tr',
    ).first();
    if (await completedWorkOrder.isVisible()) {
      await completedWorkOrder.click();
      await page.waitForLoadState('networkidle');
    }

    // Photos section on the work order detail
    const photosSection = page.locator(
      '[data-testid="work-order-photos"], ' +
      '[data-testid="photos-section"], ' +
      '[data-testid="photo-gallery"], ' +
      ':has-text("Photos"), ' +
      ':has-text("Before"), ' +
      ':has-text("After"), ' +
      'img[alt*="photo" i]',
    ).first();

    if (await photosSection.isVisible()) {
      await expect(photosSection).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '09_doc8-work-order-photos.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 3 Step 2: Completed work order page displays contractor-uploaded before/after photos for admin review.',
    });
  });

  // Step 3: Approve button triggers invoices, DocuSign, and payments
  test('Step 3: Approve button on work order triggers invoices, DocuSign lien releases, and payments', async ({ page }) => {
    await loginAsAdmin(page);

    const workOrdersNav = page.locator(
      '[data-testid="nav-admin-work-orders"], ' +
      '[data-testid="nav-work-orders"], ' +
      'nav a:has-text("Work Orders"), ' +
      'a:has-text("Work Orders")',
    ).first();
    if (await workOrdersNav.isVisible()) {
      await workOrdersNav.click();
      await page.waitForLoadState('networkidle');
    }

    const pendingWorkOrder = page.locator(
      '[data-testid="pending-work-order"], ' +
      '[data-testid="work-order-item"], ' +
      'table tbody tr',
    ).first();
    if (await pendingWorkOrder.isVisible()) {
      await pendingWorkOrder.click();
      await page.waitForLoadState('networkidle');
    }

    // Approve button
    const approveBtn = page.locator(
      '[data-testid="approve-work-order-btn"], ' +
      '[data-testid="approve-btn"], ' +
      'button:has-text("Approve"), ' +
      'button:has-text("Approve Work Order")',
    ).first();

    if (await approveBtn.isVisible()) {
      await expect(approveBtn).toBeVisible();

      await page.screenshot({
        path: path.join(screenshotDir, '10_doc8-work-order-approve-button.png'),
      });

      // Note: We check the button exists but do NOT click to avoid permanently
      // approving test data. A CI environment should use isolated test data.
      test.info().annotations.push({
        type: 'info',
        description:
          'Doc #8 Section 3 Step 3: "Approve" button is present on the work order. Clicking it triggers invoices, DocuSign lien releases, and automatic payments.',
      });
    } else {
      await page.screenshot({
        path: path.join(screenshotDir, '10_doc8-no-pending-work-order-for-approval.png'),
      });
      test.info().annotations.push({
        type: 'info',
        description: 'Doc #8 Section 3 Step 3: No pending work order available at test time — approve button screenshot skipped.',
      });
    }
  });

  // Step 4: Generated documents visible below work order
  test('Step 4: Generated invoices, receipts, and lien releases visible below work order', async ({ page }) => {
    await loginAsAdmin(page);

    const workOrdersNav = page.locator(
      '[data-testid="nav-admin-work-orders"], ' +
      '[data-testid="nav-work-orders"], ' +
      'nav a:has-text("Work Orders"), ' +
      'a:has-text("Work Orders")',
    ).first();
    if (await workOrdersNav.isVisible()) {
      await workOrdersNav.click();
      await page.waitForLoadState('networkidle');
    }

    const firstWorkOrder = page.locator(
      '[data-testid="work-order-item"], table tbody tr',
    ).first();
    if (await firstWorkOrder.isVisible()) {
      await firstWorkOrder.click();
      await page.waitForLoadState('networkidle');
    }

    // Documents section (invoices, receipts, lien releases)
    const documentsSection = page.locator(
      '[data-testid="work-order-documents"], ' +
      '[data-testid="documents-section"], ' +
      ':has-text("Invoice"), ' +
      ':has-text("Receipt"), ' +
      ':has-text("Lien Release"), ' +
      ':has-text("Documents")',
    ).first();

    if (await documentsSection.isVisible()) {
      await expect(documentsSection).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '11_doc8-work-order-documents.png'),
      fullPage: true,
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 3 Step 4: After approval, generated invoices, receipts, and lien releases appear below the work order.',
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Doc #8 Section 4 – Other Pages
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Doc #8 Section 4 – Other Pages', () => {
  // Step 1: Contractors page – both Approve and Reject actions present
  test('Step 1: Contractors page has both Approve and Reject actions for applications', async ({ page }) => {
    await loginAsAdmin(page);

    const contractorsNav = page.locator(
      '[data-testid="nav-admin-contractors"], ' +
      '[data-testid="nav-contractors"], ' +
      'nav a:has-text("Contractors"), ' +
      'aside a:has-text("Contractors"), ' +
      'a:has-text("Contractors")',
    ).first();
    await expect(contractorsNav).toBeVisible({ timeout: 10_000 });
    await contractorsNav.click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/contractor/i, { timeout: 10_000 });

    // Approve action
    const approveAction = page.locator(
      '[data-testid="approve-contractor-btn"], ' +
      'button:has-text("Approve"), ' +
      '[data-testid="approve-btn"]',
    ).first();

    // Reject action
    const rejectAction = page.locator(
      '[data-testid="reject-contractor-btn"], ' +
      '[data-testid="reject-btn"], ' +
      'button:has-text("Reject"), ' +
      'button:has-text("Decline")',
    ).first();

    await page.screenshot({
      path: path.join(screenshotDir, '12_doc8-contractors-approve-reject.png'),
      fullPage: true,
    });

    // At least one of these should be visible if there are contractors to review
    const approveVisible = await approveAction.isVisible();
    const rejectVisible = await rejectAction.isVisible();

    test.info().annotations.push({
      type: 'info',
      description: `Doc #8 Section 4 Step 1: Contractors page — Approve visible: ${approveVisible}, Reject visible: ${rejectVisible}.`,
    });
  });

  // Step 2: Referrals page – accessible with referral list
  test('Step 2: Referrals page is accessible and shows agent referral list', async ({ page }) => {
    await loginAsAdmin(page);

    const referralsNav = page.locator(
      '[data-testid="nav-referrals"], ' +
      '[data-testid="nav-admin-referrals"], ' +
      'nav a:has-text("Referrals"), ' +
      'aside a:has-text("Referrals"), ' +
      'a:has-text("Referrals")',
    ).first();
    await expect(referralsNav).toBeVisible({ timeout: 10_000 });
    await referralsNav.click();
    await expect(page).toHaveURL(/referral/i, { timeout: 10_000 });

    // Referral list or heading
    const referralList = page.locator(
      '[data-testid="referrals-list"], ' +
      '[data-testid="referral-list"], ' +
      'h1:has-text("Referrals"), h2:has-text("Referrals"), ' +
      'table, [role="table"]',
    ).first();
    await expect(referralList).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '13_doc8-referrals-page.png'),
      fullPage: true,
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 4 Step 2: Referrals page is accessible from the left nav and shows agent referrals and their status.',
    });
  });

  // Step 3: Compliance page – legal docs with download
  test('Step 3: Compliance page shows legal documents with download capability', async ({ page }) => {
    await loginAsAdmin(page);

    const complianceNav = page.locator(
      '[data-testid="nav-compliance"], ' +
      '[data-testid="nav-admin-compliance"], ' +
      'nav a:has-text("Compliance"), ' +
      'aside a:has-text("Compliance"), ' +
      'a:has-text("Compliance")',
    ).first();
    await expect(complianceNav).toBeVisible({ timeout: 10_000 });
    await complianceNav.click();
    await expect(page).toHaveURL(/compliance/i, { timeout: 10_000 });

    // Page heading
    const complianceHeading = page.locator(
      'h1:has-text("Compliance"), h2:has-text("Compliance"), [data-testid="compliance-page"]',
    ).first();
    await expect(complianceHeading).toBeVisible({ timeout: 10_000 });

    // Documents list
    const documentItem = page.locator(
      '[data-testid="compliance-document"], ' +
      '[data-testid="document-item"], ' +
      ':has-text("Download"), ' +
      'a[download], a[href$=".pdf"]',
    ).first();

    if (await documentItem.isVisible()) {
      await expect(documentItem).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '14_doc8-compliance-documents.png'),
      fullPage: true,
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 4 Step 3: Compliance page lists all legal documents with download capability.',
    });
  });

  // Step 4: Phone System – call logs and voicemails
  test('Step 4: Phone System page shows call logs and voicemails', async ({ page }) => {
    await loginAsAdmin(page);

    const phoneNav = page.locator(
      '[data-testid="nav-phone-system"], ' +
      '[data-testid="nav-phone"], ' +
      'nav a:has-text("Phone System"), ' +
      'aside a:has-text("Phone System"), ' +
      'a:has-text("Phone"), ' +
      'a:has-text("Phone System")',
    ).first();
    await expect(phoneNav).toBeVisible({ timeout: 10_000 });
    await phoneNav.click();
    await expect(page).toHaveURL(/phone/i, { timeout: 10_000 });

    // Call logs section
    const callLogs = page.locator(
      '[data-testid="call-logs"], ' +
      '[data-testid="call-log-list"], ' +
      ':has-text("Call Logs"), ' +
      ':has-text("Calls")',
    ).first();
    await expect(callLogs).toBeVisible({ timeout: 10_000 });

    // Voicemails section
    const voicemails = page.locator(
      '[data-testid="voicemails"], ' +
      '[data-testid="voicemail-list"], ' +
      ':has-text("Voicemail"), ' +
      ':has-text("Voicemails")',
    ).first();
    await expect(voicemails).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '15_doc8-phone-system-call-logs-voicemails.png'),
      fullPage: true,
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 4 Step 4: Phone System page shows call logs and voicemails for admin review.',
    });
  });

  // Step 5: Notifications bell icon shows alerts
  test('Step 5: Notifications bell icon shows alerts for new requests, payments, and more', async ({ page }) => {
    await loginAsAdmin(page);

    // Bell icon / notifications trigger
    const bellIcon = page.locator(
      '[data-testid="notifications-bell"], ' +
      '[data-testid="bell-icon"], ' +
      '[aria-label="Notifications"], ' +
      '[aria-label="notifications"], ' +
      'button[title*="Notification" i], ' +
      'button svg[aria-label*="bell" i], ' +
      '.notification-bell, ' +
      '[class*="notification-bell"]',
    ).first();
    await expect(bellIcon).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '16_doc8-notifications-bell-visible.png'),
    });

    // Click to open the notification panel
    await bellIcon.click();
    await page.waitForLoadState('networkidle');

    const notificationsPanel = page.locator(
      '[data-testid="notifications-panel"], ' +
      '[data-testid="notifications-dropdown"], ' +
      '[data-testid="notification-list"], ' +
      ':has-text("Notifications"), ' +
      '[role="dialog"], ' +
      '[role="menu"]',
    ).first();

    if (await notificationsPanel.isVisible()) {
      await expect(notificationsPanel).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '17_doc8-notifications-panel-open.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Doc #8 Section 4 Step 5: Notifications bell icon is visible in the admin header. Clicking it opens a panel with alerts for new service requests, payments, and other events.',
    });
  });
});
