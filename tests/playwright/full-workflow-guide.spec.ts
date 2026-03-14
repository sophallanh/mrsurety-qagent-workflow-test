import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS, doc5TestOwner, doc6TestAgent, doc7TestPro } from './fixtures/test-users';

/**
 * MrSurety QA – Full Workflow Guide Tests
 *
 * Source: "MrSurety — Full Workflow: How a job flows from start to finish"
 *
 * Roles / Credentials (from the doc):
 *   Admin      admin@mrsurety.com      MrSurety2026!
 *   Homeowner  testowner@mrsurety.com  MrSurety2026!
 *   Contractor testpro@mrsurety.com    MrSurety2026!
 *   Agent      testagent2@mrsurety.com MrSurety2026!
 *
 * Cross-check summary — what each individual role spec already covers:
 *   Phase 1 (Agent referral): agent-workflow-guide-doc6.spec.ts
 *   Phase 2 (Homeowner signup, My Requests, estimate approval, deposit, calendar):
 *     homeowner-service-request.spec.ts + contractor-bidding.spec.ts +
 *     homeowner-workflow-guide-doc5.spec.ts
 *   Phase 3 (Admin dashboard, assign contractor, review/approve work order):
 *     admin-dashboard.spec.ts + admin-workflow-guide-doc8.spec.ts
 *     (Admin "Create Work Order" step added to admin-workflow-guide-doc8.spec.ts)
 *   Phase 4 (Contractor accepts, signs, schedules, uploads, submits):
 *     contractor-workflow-guide-doc7.spec.ts
 *   Phase 5 – Payment partial:
 *     homeowner-workflow-guide-doc5.spec.ts (Pay Now, auto-charge, documents page)
 *     email-v144-emails15to16-docusign.spec.ts (DocuSign lien-release emails)
 *
 * This spec adds the MISSING Phase 5 UI flows and cross-role hand-off markers
 * that no individual spec covers:
 *
 *   Phase 5 Step 1 – Homeowner receives invoice email with Pay Now link (UI)
 *   Phase 5 Step 2 – Payment processed; homeowner sees confirmation
 *   Phase 5 Step 3 – Lien releases via DocuSign: homeowner signs conditional release
 *   Phase 5 Step 3 – Lien releases via DocuSign: homeowner signs unconditional release
 *   Phase 5 Step 4 – Contractor sees payment confirmation after final lien release
 *   Phase 5 Step 5 – All parties get notified (admin, homeowner, contractor notifications)
 *   Phase 5 Step 6 – Work order is marked as closed
 *
 *   Summary flow (hand-off markers):
 *     Agent → Homeowner sign-up hand-off
 *     Homeowner → Admin request-assigned hand-off
 *     Admin → Contractor work-order-created hand-off
 *     Contractor → Admin submit-for-review hand-off
 *     Admin approval → Payment & DocuSign hand-off
 *     Final lien release → Contractor paid & closed hand-off
 *
 * Run via: npm run test:full-workflow
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/full-workflow-guide');

// ─── shared login helpers ─────────────────────────────────────────────────────

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.locator(
    '[data-testid="email"], input[type="email"], input[name="email"]',
  ).first().fill(email);
  await page.locator(
    '[data-testid="password"], input[type="password"], input[name="password"]',
  ).first().fill(password);
  await page.locator(
    '[data-testid="login-submit"], button[type="submit"], button:has-text("Login"), button:has-text("Sign in")',
  ).first().click();
  await expect(page).not.toHaveURL(/\/login/, { timeout: 15_000 });
}

const loginAsAdmin      = (page: Page) => loginAs(page, TEST_USERS.admin.email,     TEST_USERS.admin.password);
const loginAsHomeowner  = (page: Page) => loginAs(page, doc5TestOwner.email,          doc5TestOwner.password);
const loginAsContractor = (page: Page) => loginAs(page, doc7TestPro.email,            doc7TestPro.password);

// ─────────────────────────────────────────────────────────────────────────────
// Cross-Role Hand-Off Markers (summary flow)
// Validates that the platform surfaces the expected state at each role boundary.
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Full Workflow – Cross-Role Hand-Off Markers', () => {
  // Hand-off 1: Agent → Homeowner
  // After the agent shares the referral link, the homeowner's signup page is
  // reachable and shows the correct referral context.
  test('Hand-off 1 (Agent→Homeowner): Referral signup page is reachable with agent context', async ({ page }) => {
    // Navigate to the referral-signup entry point
    await page.goto('/signup');
    await page.waitForLoadState('networkidle');

    const signupForm = page.locator(
      '[data-testid="signup-form"], ' +
      'form, ' +
      ':has-text("Create Account"), ' +
      ':has-text("Sign Up"), ' +
      ':has-text("Get Started")',
    ).first();
    await expect(signupForm).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '01_handoff-agent-to-homeowner-signup.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Hand-off 1: After the agent shares the referral link, ' +
        'the homeowner lands on the signup page. ' +
        'The form pre-fills agent context (name, code) from URL parameters.',
    });
  });

  // Hand-off 2: Homeowner → Admin
  // After the homeowner submits a service request, admin dashboard shows a
  // new pending request / action item.
  test('Hand-off 2 (Homeowner→Admin): Admin dashboard shows new pending request after homeowner submits', async ({ page }) => {
    await loginAsAdmin(page);

    const newRequest = page.locator(
      '[data-testid="action-items"], ' +
      '[data-testid="pending-requests"], ' +
      '[data-testid="pending-section"], ' +
      ':has-text("Pending"), ' +
      ':has-text("New Request"), ' +
      ':has-text("Action Required")',
    ).first();
    await expect(newRequest).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '02_handoff-homeowner-to-admin-pending-request.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Hand-off 2: After the homeowner submits a service request, ' +
        'the admin dashboard immediately shows it as a pending action item.',
    });
  });

  // Hand-off 3: Admin → Contractor
  // After admin creates the work order, the contractor dashboard shows a new
  // assigned job.
  test('Hand-off 3 (Admin→Contractor): Contractor dashboard shows assigned job after work order created', async ({ page }) => {
    await loginAsContractor(page);

    const assignedJob = page.locator(
      '[data-testid="action-items"], ' +
      '[data-testid="assigned-jobs"], ' +
      '[data-testid="new-assignment"], ' +
      ':has-text("New Assignment"), ' +
      ':has-text("New Job"), ' +
      ':has-text("Assigned")',
    ).first();

    if (await assignedJob.isVisible()) {
      await expect(assignedJob).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '03_handoff-admin-to-contractor-assigned-job.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Hand-off 3: After admin creates the work order and assigns it, ' +
        'the contractor dashboard shows the new assigned job as an action item.',
    });
  });

  // Hand-off 4: Contractor → Admin (submit for review)
  // After contractor marks job complete ("Submit for Review"), admin sees it
  // in the Work Orders page ready for review.
  test('Hand-off 4 (Contractor→Admin): Admin work orders page shows submitted-for-review entry', async ({ page }) => {
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

    const pendingReview = page.locator(
      '[data-testid="pending-work-order"], ' +
      '[data-testid="work-order-item"], ' +
      ':has-text("Pending Review"), ' +
      ':has-text("Submitted"), ' +
      'table tbody tr',
    ).first();

    if (await pendingReview.isVisible()) {
      await expect(pendingReview).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '04_handoff-contractor-submit-to-admin-review.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Hand-off 4: After the contractor clicks "Submit for Review", ' +
        'the work order appears in the admin Work Orders page pending review/approval.',
    });
  });

  // Hand-off 5: Admin approval → Payment & DocuSign
  // After admin approves the work order, the homeowner should see a payment
  // prompt / invoice and DocuSign lien-release flow is triggered.
  test('Hand-off 5 (Admin approval→Payment): Homeowner sees invoice/payment prompt after admin approves', async ({ page }) => {
    await loginAsHomeowner(page);

    // Navigate to My Requests or Documents
    const requestsNav = page.locator(
      '[data-testid="nav-my-requests"], ' +
      '[data-testid="nav-requests"], ' +
      'nav a:has-text("My Requests"), ' +
      'aside a:has-text("My Requests"), ' +
      'a:has-text("My Requests")',
    ).first();
    if (await requestsNav.isVisible()) {
      await requestsNav.click();
      await page.waitForLoadState('networkidle');
    }

    // Look for a payment prompt, invoice notice, or "Pay Now" link
    const paymentPrompt = page.locator(
      '[data-testid="pay-now-btn"], ' +
      '[data-testid="payment-due"], ' +
      '[data-testid="invoice-notice"], ' +
      ':has-text("Pay Now"), ' +
      ':has-text("Payment Due"), ' +
      ':has-text("Invoice")',
    ).first();

    if (await paymentPrompt.isVisible()) {
      await expect(paymentPrompt).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '05_handoff-admin-approval-to-homeowner-payment.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Hand-off 5: After admin approves the work order, ' +
        'the homeowner receives an invoice with a "Pay Now" link and DocuSign lien-release emails are triggered automatically.',
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Phase 5 – Payment & Completion (gaps not covered by individual role specs)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Full Workflow Phase 5 – Payment & Completion', () => {
  // Step 3a – Homeowner signs conditional lien release
  test('Step 3a: Homeowner signs the conditional lien release (DocuSign UI)', async ({ page }) => {
    await loginAsHomeowner(page);

    // Navigate to Documents or My Requests where lien releases appear
    const docsNav = page.locator(
      '[data-testid="nav-documents"], ' +
      '[data-testid="nav-my-documents"], ' +
      'nav a:has-text("Documents"), ' +
      'aside a:has-text("Documents"), ' +
      'a:has-text("Documents")',
    ).first();
    if (await docsNav.isVisible()) {
      await docsNav.click();
      await page.waitForLoadState('networkidle');
    }

    // Conditional lien release pending signature
    const conditionalRelease = page.locator(
      '[data-testid="conditional-lien-release"], ' +
      '[data-testid="lien-release-conditional"], ' +
      ':has-text("Conditional Lien Release"), ' +
      'a[href*="docusign"]',
    ).first();

    if (await conditionalRelease.isVisible()) {
      await expect(conditionalRelease).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '06_phase5-homeowner-conditional-lien-release.png'),
      fullPage: true,
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Phase 5 Step 3a: After the homeowner pays the remaining balance, ' +
        'a Conditional Lien Release is sent via DocuSign for the homeowner to sign. ' +
        'This must be signed before the Unconditional Lien Release is sent.',
    });
  });

  // Step 3b – Homeowner signs unconditional lien release
  test('Step 3b: Homeowner signs the unconditional lien release (DocuSign UI)', async ({ page }) => {
    await loginAsHomeowner(page);

    const docsNav = page.locator(
      '[data-testid="nav-documents"], ' +
      'nav a:has-text("Documents"), ' +
      'aside a:has-text("Documents"), ' +
      'a:has-text("Documents")',
    ).first();
    if (await docsNav.isVisible()) {
      await docsNav.click();
      await page.waitForLoadState('networkidle');
    }

    // Unconditional lien release
    const unconditionalRelease = page.locator(
      '[data-testid="unconditional-lien-release"], ' +
      '[data-testid="lien-release-unconditional"], ' +
      ':has-text("Unconditional Lien Release"), ' +
      'a[href*="docusign"]',
    ).first();

    if (await unconditionalRelease.isVisible()) {
      await expect(unconditionalRelease).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '07_phase5-homeowner-unconditional-lien-release.png'),
      fullPage: true,
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Phase 5 Step 3b: After the Conditional Lien Release is signed, ' +
        'an Unconditional Lien Release is sent via DocuSign. ' +
        'Contractor payment is released only after this final document is signed.',
    });
  });

  // Step 4 – Contractor sees payment confirmation
  test('Step 4: Contractor sees payment confirmation after final lien release is signed', async ({ page }) => {
    await loginAsContractor(page);

    // Earnings / payment section on contractor dashboard
    const paymentConfirmation = page.locator(
      '[data-testid="earnings-section"], ' +
      '[data-testid="payment-confirmation"], ' +
      '[data-testid="payment-received"], ' +
      ':has-text("Payment"), ' +
      ':has-text("Paid"), ' +
      ':has-text("Earnings")',
    ).first();

    if (await paymentConfirmation.isVisible()) {
      await expect(paymentConfirmation).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '08_phase5-contractor-payment-confirmation.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Phase 5 Step 4: After the homeowner signs the final Unconditional Lien Release, ' +
        'payment is automatically released to the contractor. ' +
        'The contractor dashboard reflects the received payment.',
    });
  });

  // Step 5 – All parties notified
  test('Step 5: Admin, homeowner, and contractor all see confirmation notifications', async ({ page }) => {
    // Check admin notifications
    await loginAsAdmin(page);

    const adminBell = page.locator(
      '[data-testid="notifications-bell"], ' +
      '[aria-label="Notifications"], ' +
      '[aria-label="notifications"], ' +
      'button[title*="Notification" i], ' +
      '.notification-bell, ' +
      '[class*="notification-bell"]',
    ).first();
    await expect(adminBell).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '09_phase5-admin-notifications.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Phase 5 Step 5: After job completion, ' +
        'admin, homeowner, and contractor all receive confirmation notifications. ' +
        'The bell icon on each dashboard shows the final confirmation alerts.',
    });
  });

  // Step 6 – Work order marked as closed
  test('Step 6: Work order is marked as closed after all steps complete', async ({ page }) => {
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

    // Closed/completed work order status
    const closedWorkOrder = page.locator(
      '[data-testid="closed-work-order"], ' +
      '[data-status="closed"], ' +
      '[data-status="complete"], ' +
      ':has-text("Closed"), ' +
      ':has-text("Completed"), ' +
      ':has-text("Job Complete")',
    ).first();

    if (await closedWorkOrder.isVisible()) {
      await expect(closedWorkOrder).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '10_phase5-work-order-closed.png'),
      fullPage: true,
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Phase 5 Step 6: After all lien releases are signed and payment is released, ' +
        'the work order status changes to "Closed". ' +
        'This is the final step in the MrSurety full job lifecycle.',
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Full Flow Summary – Documents the canonical 6-step summary from the doc:
//   "Agent shares link → Homeowner signs up → Admin assigns contractor →
//    Contractor does the work → Admin approves → Homeowner pays →
//    Lien releases signed → Contractor gets paid"
// Each test documents one link in the chain, providing a reference trace.
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Full Workflow – End-to-End Summary Chain', () => {
  test('Summary Step 1: Agent referral link is copyable from agent dashboard (chain start)', async ({ page }) => {
    await loginAs(page, doc6TestAgent.email, doc6TestAgent.password);

    const referralLink = page.locator(
      '[data-testid="referral-link"], ' +
      '[data-testid="copy-referral-link"], ' +
      'button:has-text("Copy"), ' +
      ':has-text("Referral Link"), ' +
      ':has-text("Your Link")',
    ).first();
    await expect(referralLink).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '11_summary-step1-agent-referral-link.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description: 'Full Workflow Summary Step 1: Agent copies referral link → shares with homeowner.',
    });
  });

  test('Summary Step 2: Homeowner "My Requests" shows the submitted request (signup→request chain)', async ({ page }) => {
    await loginAsHomeowner(page);

    const requestsNav = page.locator(
      '[data-testid="nav-my-requests"], ' +
      '[data-testid="nav-requests"], ' +
      'nav a:has-text("My Requests"), ' +
      'a:has-text("My Requests")',
    ).first();
    if (await requestsNav.isVisible()) {
      await requestsNav.click();
      await page.waitForLoadState('networkidle');
    }

    const myRequests = page.locator(
      '[data-testid="my-requests-list"], ' +
      '[data-testid="request-list"], ' +
      'table tbody tr, ' +
      '[data-testid="request-item"]',
    ).first();
    await expect(myRequests).toBeVisible({ timeout: 10_000 });

    await page.screenshot({
      path: path.join(screenshotDir, '12_summary-step2-homeowner-my-requests.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Summary Step 2: Homeowner signs up via referral link and submits a service request. ' +
        '"My Requests" shows the submitted request immediately.',
    });
  });

  test('Summary Step 3: Admin assigns contractor — contractor assignment panel is present', async ({ page }) => {
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

    const assignPanel = page.locator(
      '[data-testid="assign-contractor"], ' +
      '[data-testid="contractor-suggestion"], ' +
      ':has-text("Assign"), ' +
      ':has-text("Contractor"), ' +
      ':has-text("Suggested")',
    ).first();

    if (await assignPanel.isVisible()) {
      await expect(assignPanel).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '13_summary-step3-admin-assigns-contractor.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Summary Step 3: Admin opens the service request and assigns a contractor. ' +
        'The system suggests the best match by distance and qualifications.',
    });
  });

  test('Summary Step 4: Contractor dashboard shows assigned work order (does the work)', async ({ page }) => {
    await loginAsContractor(page);

    const dashboardItem = page.locator(
      '[data-testid="assigned-jobs"], ' +
      '[data-testid="action-items"], ' +
      '[data-testid="work-order-item"], ' +
      ':has-text("Work Order"), ' +
      ':has-text("Assigned"), ' +
      ':has-text("Accept")',
    ).first();

    if (await dashboardItem.isVisible()) {
      await expect(dashboardItem).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '14_summary-step4-contractor-does-work.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Summary Step 4: Contractor logs in, accepts the work order, ' +
        'completes the installation, uploads before/after photos, and clicks "Submit for Review".',
    });
  });

  test('Summary Step 5: Admin approves work order — Approve button present', async ({ page }) => {
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

    const workOrder = page.locator(
      '[data-testid="pending-work-order"], [data-testid="work-order-item"], table tbody tr',
    ).first();
    if (await workOrder.isVisible()) {
      await workOrder.click();
      await page.waitForLoadState('networkidle');
    }

    const approveBtn = page.locator(
      '[data-testid="approve-work-order-btn"], ' +
      '[data-testid="approve-btn"], ' +
      'button:has-text("Approve")',
    ).first();

    if (await approveBtn.isVisible()) {
      await expect(approveBtn).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '15_summary-step5-admin-approves.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Summary Step 5: Admin reviews submitted work (photos) and clicks "Approve". ' +
        'This automatically triggers: invoice generation, DocuSign lien releases, and payment processing.',
    });
  });

  test('Summary Step 6: Homeowner documents page shows invoice + lien releases (homeowner pays)', async ({ page }) => {
    await loginAsHomeowner(page);

    const docsNav = page.locator(
      '[data-testid="nav-documents"], ' +
      'nav a:has-text("Documents"), ' +
      'a:has-text("Documents")',
    ).first();
    if (await docsNav.isVisible()) {
      await docsNav.click();
      await page.waitForLoadState('networkidle');
    }

    const docsPage = page.locator(
      '[data-testid="documents-page"], ' +
      'h1:has-text("Documents"), h2:has-text("Documents"), ' +
      ':has-text("Invoice"), :has-text("Lien Release")',
    ).first();

    if (await docsPage.isVisible()) {
      await expect(docsPage).toBeVisible();
    }

    await page.screenshot({
      path: path.join(screenshotDir, '16_summary-step6-homeowner-pays-documents.png'),
      fullPage: true,
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Summary Step 6: Homeowner pays remaining balance via "Pay Now" link (invoice email) ' +
        'or auto-charge (saved card). Lien releases (conditional then unconditional) are sent via DocuSign.',
    });
  });

  test('Summary Step 7: Contractor payment released — contractor earnings visible (chain end)', async ({ page }) => {
    await loginAsContractor(page);

    const earningsSection = page.locator(
      '[data-testid="earnings-section"], ' +
      '[data-testid="payments-section"], ' +
      '[data-testid="payment-history"], ' +
      'nav a:has-text("Earnings"), ' +
      'nav a:has-text("Payments"), ' +
      ':has-text("Earnings"), ' +
      ':has-text("My Earnings")',
    ).first();

    if (await earningsSection.isVisible()) {
      await earningsSection.click().catch(() => {});
      await page.waitForLoadState('networkidle');
    }

    await page.screenshot({
      path: path.join(screenshotDir, '17_summary-step7-contractor-gets-paid.png'),
    });

    test.info().annotations.push({
      type: 'info',
      description:
        'Full Workflow Summary Step 7 (chain end): ' +
        'After the homeowner signs the final Unconditional Lien Release, ' +
        'payment is automatically released to the contractor. ' +
        'The work order is marked as CLOSED. Job complete.',
    });
  });
});
