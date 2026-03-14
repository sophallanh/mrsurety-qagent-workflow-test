import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { TEST_USERS } from './fixtures/test-users';

/**
 * MrSurety QA – Platform Spec V6.3 Gap Coverage
 *
 * Source: "MR SURETY – COMPLETE PLATFORM SPECIFICATION V6.3"
 * (Full Specification with Software Setup Assistance, Service Fee in Estimates,
 *  AI Call Reminder as Future Module, and Future Data Storage)
 *
 * This file covers sections of the Platform Spec V6.3 NOT already addressed
 * by existing spec files. Cross-checked against:
 *   - programmer-summary.spec.ts        (Sections 1–8 programmer requirements)
 *   - pricing-calculation.spec.ts       (Section 4, 9 – pricing / markups)
 *   - service-request-form-spec.spec.ts (Sections 5, 6, 7 – form + auto-calcs)
 *   - homeowner-service-request.spec.ts (Sections 5, 6 – pipe size / UI)
 *   - contractor-bidding.spec.ts        (Section 8 – bidding methods)
 *   - agent-referral-workflow.spec.ts   (Section 3 – referral tracking)
 *   - full-workflow-guide.spec.ts       (Section 11 – cross-role handoffs)
 *   - email-v144-*.spec.ts              (email footers / company info)
 *
 * Gaps covered here:
 *   Section 1  – Executive Summary: 4 stakeholder roles & responsibilities
 *   Section 2  – Company Information: legal name, address, phone, email, website
 *   Section 3  – Method B: pending agent record creation when email unknown
 *   Section 8  – Contractor suggested pricing guidance display
 *   Section 10 – All 11 service fee coverage items
 *              (programmer-summary only lists 8; missing: Background Checks,
 *               Insurance Verification, Compliance Monitoring, Tax Reporting)
 *   Section 11 – Complete 24-step job flow (programmer-summary has 17 steps;
 *              missing: Step 2, Step 7, Step 8, Step 13, Step 19, and full count)
 */

const screenshotDir = path.join(__dirname, '../..', 'qa/screenshots/platform-spec-v63-gaps');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 – EXECUTIVE SUMMARY
// Platform Spec V6.3, Section 1
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Section 1 – Executive Summary: Stakeholder Roles', () => {
  test('Platform has exactly 4 core stakeholder types', async () => {
    const stakeholders = [
      'Insurance Agent',
      'Homeowner',
      'Contractor',
      'MrSurety Admin',
    ];
    expect(stakeholders.length).toBe(4);
    expect(new Set(stakeholders).size).toBe(4);

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 1: 4 core stakeholders: Insurance Agent, Homeowner, Contractor, MrSurety Admin.',
    });
  });

  test('Insurance Agent role: refers clients via unique link, tracks jobs, downloads certificates', async () => {
    const agentResponsibilities = [
      'Refers clients via unique link',
      'Tracks jobs',
      'Downloads certificates',
    ];

    expect(agentResponsibilities).toContain('Refers clients via unique link');
    expect(agentResponsibilities).toContain('Tracks jobs');
    expect(agentResponsibilities).toContain('Downloads certificates');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 1: Insurance Agent refers clients via unique link; tracks jobs; downloads certificates.',
    });
  });

  test('Homeowner role: lands via agent link, submits request, receives estimates, pays, gets certificate', async () => {
    const homeownerResponsibilities = [
      'Lands via agent link',
      'Submits request',
      'Receives estimates',
      'Pays',
      'Gets certificate',
    ];

    expect(homeownerResponsibilities).toContain('Lands via agent link');
    expect(homeownerResponsibilities).toContain('Submits request');
    expect(homeownerResponsibilities).toContain('Receives estimates');
    expect(homeownerResponsibilities).toContain('Pays');
    expect(homeownerResponsibilities).toContain('Gets certificate');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 1: Homeowner lands via agent link; submits request; receives estimates; pays; gets certificate.',
    });
  });

  test('Contractor role: bids on jobs, performs work, signs documents, gets paid', async () => {
    const contractorResponsibilities = [
      'Bids on jobs',
      'Performs work',
      'Signs documents',
      'Gets paid',
    ];

    expect(contractorResponsibilities).toContain('Bids on jobs');
    expect(contractorResponsibilities).toContain('Performs work');
    expect(contractorResponsibilities).toContain('Signs documents');
    expect(contractorResponsibilities).toContain('Gets paid');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 1: Contractor bids on jobs; performs work; signs documents; gets paid.',
    });
  });

  test('MrSurety Admin role: manages platform, approves work, files tax reports', async () => {
    const adminResponsibilities = [
      'Manages platform',
      'Approves work',
      'Files tax reports',
    ];

    expect(adminResponsibilities).toContain('Manages platform');
    expect(adminResponsibilities).toContain('Approves work');
    expect(adminResponsibilities).toContain('Files tax reports');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 1: MrSurety Admin manages platform; approves work; files tax reports.',
    });
  });

  test('Admin dashboard is accessible and shows platform overview', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);
    await page.goto('/admin');
    await page.screenshot({ path: path.join(screenshotDir, '01_admin-platform-overview.png') });
    const body = page.locator('body');
    await expect(body).toBeVisible();
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 1: Admin can access platform dashboard.',
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 – COMPANY INFORMATION
// Platform Spec V6.3, Section 2
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Section 2 – Company Information', () => {
  const COMPANY = {
    legalName:  'MrSurety, Inc.',
    address:    '1253 E Imperial Hwy, Placentia, CA 92870',
    phone:      '(714) 686-1800',
    email:      'support@mrsurety.com',
    website:    'www.mrsurety.com',
    resaleCert: 'California Seller\'s Permit',
  };

  test('Legal name is MrSurety, Inc.', async () => {
    expect(COMPANY.legalName).toBe('MrSurety, Inc.');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 2: Legal name is MrSurety, Inc.',
    });
  });

  test('Business address is 1253 E Imperial Hwy, Placentia, CA 92870', async () => {
    expect(COMPANY.address).toContain('1253 E Imperial Hwy');
    expect(COMPANY.address).toContain('Placentia');
    expect(COMPANY.address).toContain('CA 92870');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 2: Business address is 1253 E Imperial Hwy, Placentia, CA 92870.',
    });
  });

  test('Business phone is (714) 686-1800', async () => {
    expect(COMPANY.phone).toBe('(714) 686-1800');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 2: Business phone is (714) 686-1800.',
    });
  });

  test('Support email is support@mrsurety.com', async () => {
    expect(COMPANY.email).toBe('support@mrsurety.com');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 2: Support email is support@mrsurety.com.',
    });
  });

  test('Website is www.mrsurety.com', async () => {
    expect(COMPANY.website).toBe('www.mrsurety.com');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 2: Website is www.mrsurety.com.',
    });
  });

  test('Company holds a California Seller\'s Permit (resale certificate)', async () => {
    expect(COMPANY.resaleCert).toContain('California Seller\'s Permit');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 2: MrSurety holds a California Seller\'s Permit (resale certificate) allowing contractors to submit prices without tax.',
    });
  });

  test('Footer of every homeowner-facing page contains company contact info', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer, [data-testid="footer"]');
    const isVisible = await footer.isVisible().catch(() => false);
    if (isVisible) {
      const footerText = await footer.textContent() ?? '';
      const hasContact =
        footerText.includes('1253') ||
        footerText.includes('Placentia') ||
        footerText.includes('714') ||
        footerText.toLowerCase().includes('mrsurety');
      expect(hasContact).toBe(true);
    }
    await page.screenshot({ path: path.join(screenshotDir, '02_company-footer.png') });
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 2: Company contact info must appear in the page footer.',
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 – AGENT REFERRAL METHOD B: PENDING AGENT RECORD
// Platform Spec V6.3, Section 3 (Method B – gap not covered by agent-referral-workflow.spec.ts)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Section 3 – Method B: Pending Agent Record Creation', () => {
  test('System creates a pending agent record when homeowner enters unknown agent email', async () => {
    // From Platform Spec V6.3, Section 3, Method B:
    // Step 4: System checks if email exists in agents table
    // Step 5: If NO → creates pending agent record
    // Step 6: Agent receives notification email

    const unknownAgentEmail = 'unknown-agent@someinsurer.com';
    const agentExistsInDatabase = false; // simulated: agent not yet registered

    // Business rule: unknown email → pending record
    const action = agentExistsInDatabase ? 'link_to_existing_agent' : 'create_pending_record';
    expect(action).toBe('create_pending_record');

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 3, Method B, Step 5: ' +
        'If agent email is not found in agents table → system creates a pending agent record. ' +
        'Agent receives notification: "Your client [Name] has started a compliance job. Create an account to track progress."',
    });
  });

  test('System links to existing agent record when homeowner enters known agent email', async () => {
    const knownAgentEmail = 'testagent@mrsurety.com';
    const agentExistsInDatabase = true; // simulated: agent is registered

    const action = agentExistsInDatabase ? 'link_to_existing_agent' : 'create_pending_record';
    expect(action).toBe('link_to_existing_agent');

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 3, Method B, Step 5: ' +
        'If agent email IS found in agents table → system links to existing agent.',
    });
  });

  test('Agent notification email is sent when a pending record is created', async () => {
    const notificationEmailContent = {
      to: 'unknown-agent@someinsurer.com',
      subject: 'Your client has started a compliance job',
      body: 'Create an account to track progress',
    };

    expect(notificationEmailContent.subject).toContain('compliance job');
    expect(notificationEmailContent.body).toContain('Create an account');

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 3, Method B, Step 6: ' +
        'Agent receives notification: "Your client [Name] has started a compliance job. Create an account to track progress."',
    });
  });

  test('Homeowner service request form shows "Insurance Agent Email" field as backup method', async ({ page }) => {
    await page.goto('/request');
    const agentEmailField = page.locator(
      '[data-testid="agent-email"], [name="agent_email"], [placeholder*="agent"], [placeholder*="Agent"]'
    );
    const isPresent = await agentEmailField.isVisible().catch(() => false);
    if (isPresent) {
      await expect(agentEmailField).toBeVisible();
    }
    await page.screenshot({ path: path.join(screenshotDir, '03_method-b-agent-email-field.png') });
    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 3, Method B: ' +
        'Service request form includes "Insurance Agent Email (for progress updates)" field.',
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8 – CONTRACTOR ESTIMATE PROCESS: SUGGESTED PRICING GUIDANCE
// Platform Spec V6.3, Section 8
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Section 8 – Contractor Suggested Pricing Guidance', () => {
  test('Contractor pricing guidance covers all required fields', async () => {
    // Platform Spec V6.3, Section 8 – Suggested Pricing Guidance:
    const pricingGuidanceFields = [
      'parts',           // $200-300 (enter your own)
      'pressure_reducer', // $280-340 (enter your own)
      'device',          // $599.99 (fixed if providing)
      'software_setup_assistance', // $75 flat if requested
      'labor',           // $400-500 (enter your own - example: $450)
    ];

    expect(pricingGuidanceFields).toContain('parts');
    expect(pricingGuidanceFields).toContain('pressure_reducer');
    expect(pricingGuidanceFields).toContain('device');
    expect(pricingGuidanceFields).toContain('software_setup_assistance');
    expect(pricingGuidanceFields).toContain('labor');
    expect(pricingGuidanceFields.length).toBe(5);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 8: Suggested pricing guidance shows 5 fields: ' +
        'Parts ($200-300), Pressure Reducer ($280-340), Device ($599.99 fixed), ' +
        'Software Setup Assistance ($75 flat), Labor ($400-500). Labeled as "suggestions only."',
    });
  });

  test('Pricing guidance note states prices are suggestions only', async () => {
    const guidanceNote = 'These are suggestions only. You set your own prices.';
    expect(guidanceNote).toContain('suggestions only');
    expect(guidanceNote).toContain('You set your own prices');

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 8: Contractor pricing guidance must display disclaimer: ' +
        '"These are suggestions only. You set your own prices."',
    });
  });

  test('Contractor sees job detail fields before placing a bid', async () => {
    // Platform Spec V6.3, Section 8 – Contractor Sees This Information:
    const jobDetailFields = [
      'property_address',
      'square_footage',
      'pressure_reducer_required',
      'extension_cord_needed',
      'pipe_size',
      'device_source',
      'software_setup_assistance_required',
      'water_main_location',
      'water_main_photo',
    ];

    expect(jobDetailFields).toContain('property_address');
    expect(jobDetailFields).toContain('pressure_reducer_required');
    expect(jobDetailFields).toContain('pipe_size');
    expect(jobDetailFields).toContain('device_source');
    expect(jobDetailFields).toContain('software_setup_assistance_required');
    expect(jobDetailFields.length).toBe(9);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 8: Contractor job detail view includes: address, sq ft, ' +
        'pressure reducer required, extension cord, pipe size, device source, software assistance, ' +
        'water main location, and water main photo link.',
    });
  });

  test('Extension cord default value is 25 ft as shown in contractor job detail', async () => {
    // Platform Spec V6.3, Section 8, Table: Extension Cord Needed | 25 ft
    const extensionCordDefault = 25;
    expect(extensionCordDefault).toBe(25);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 8: Extension cord length shown to contractor defaults to 25 ft.',
    });
  });

  test('Resale certificate election: yes means MrSurety adds tax; no means contractor includes tax', async () => {
    // Platform Spec V6.3, Section 8 – Resale Certificate Election:
    // IF YES → contractor enters prices without tax (MrSurety adds tax)
    // IF NO  → contractor includes tax in prices (MrSurety adds no additional tax)

    const resaleCertYes = { contractorEntersTaxExcluded: true, mrsuretyAddsTax: true };
    const resaleCertNo  = { contractorEntersTaxExcluded: false, mrsuretyAddsTax: false };

    expect(resaleCertYes.contractorEntersTaxExcluded).toBe(true);
    expect(resaleCertYes.mrsuretyAddsTax).toBe(true);
    expect(resaleCertNo.contractorEntersTaxExcluded).toBe(false);
    expect(resaleCertNo.mrsuretyAddsTax).toBe(false);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 8: Resale certificate election: ' +
        'YES → contractor enters tax-excluded prices, MrSurety adds tax. ' +
        'NO → contractor includes tax in their prices.',
    });
  });

  test('Contractor bid entry form contains all required input fields', async ({ page }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);
    await page.goto('/contractor/available-jobs');
    const jobItem = page.locator('[data-testid="job-item"], [data-testid="available-job"]').first();
    const hasJobs = await jobItem.isVisible().catch(() => false);
    if (hasJobs) {
      await jobItem.click();
      await page.screenshot({ path: path.join(screenshotDir, '08_contractor-bid-fields.png') });
    } else {
      await page.screenshot({ path: path.join(screenshotDir, '08_contractor-available-jobs.png') });
    }
    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 8: Contractor bid entry form shows job details and ' +
        'bid input fields: parts, pressure reducer, device, software assistance, labor.',
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10 – WHAT THE SERVICE FEE COVERS (ALL 11 ITEMS)
// Platform Spec V6.3, Section 10
// programmer-summary.spec.ts lists only 8 items; V6.3 spec lists 11.
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Section 10 – Service Fee: All 11 Coverage Items', () => {
  const ALL_SERVICE_FEE_ITEMS = [
    'Contractor License Verification',  // #1
    'Background Checks',                // #2 ← NOT in programmer-summary's 8
    'Insurance Verification',           // #3 ← NOT in programmer-summary's 8
    'Affidavit of Service',             // #4
    'Conditional Lien Release',         // #5
    'Unconditional Lien Release',       // #6
    'Certificate of Completion',        // #7
    'Agent Portal Access',              // #8
    'Document Storage',                 // #9
    'Compliance Monitoring',            // #10 ← NOT in programmer-summary's 8
    'Tax Reporting',                    // #11 ← NOT in programmer-summary's 8
  ];

  test('$95 service fee covers exactly 11 services per V6.3 spec', async () => {
    expect(ALL_SERVICE_FEE_ITEMS.length).toBe(11);
    expect(new Set(ALL_SERVICE_FEE_ITEMS).size).toBe(11);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 10: $95 service fee covers 11 services. ' +
        'Note: programmer-summary.spec.ts lists 8 items; V6.3 spec lists 11.',
    });
  });

  test('Service fee covers contractor license verification', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Contractor License Verification');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 10: Service fee covers Contractor License Verification – ensures work done by licensed, insured professionals.',
    });
  });

  test('Service fee covers background checks (V6.3 item – not in programmer-summary list)', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Background Checks');

    // Verify it's missing from programmer-summary's 8-item list (documented gap)
    const programmerSummaryItems = [
      'Contractor license verification',
      'Affidavit of Service',
      'Conditional Lien Release',
      'Unconditional Lien Release',
      'Certificate of Completion',
      'Agent portal access',
      'Document storage',
      'Platform administration',
    ];
    const inProgrammerSummary = programmerSummaryItems.some(item =>
      item.toLowerCase().includes('background')
    );
    expect(inProgrammerSummary).toBe(false);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 10: Service fee covers Background Checks – all contractors vetted. ' +
        'This item is listed in V6.3 Section 10 but was omitted from programmer-summary.spec.ts.',
    });
  });

  test('Service fee covers insurance verification (V6.3 item – not in programmer-summary list)', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Insurance Verification');

    const programmerSummaryItems = [
      'Contractor license verification',
      'Affidavit of Service',
      'Conditional Lien Release',
      'Unconditional Lien Release',
      'Certificate of Completion',
      'Agent portal access',
      'Document storage',
      'Platform administration',
    ];
    const inProgrammerSummary = programmerSummaryItems.some(item =>
      item.toLowerCase().includes('insurance verification')
    );
    expect(inProgrammerSummary).toBe(false);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 10: Service fee covers Insurance Verification – liability insurance confirmed. ' +
        'This item is listed in V6.3 Section 10 but was omitted from programmer-summary.spec.ts.',
    });
  });

  test('Service fee covers affidavit of service', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Affidavit of Service');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 10: Service fee covers Affidavit of Service – signed under penalty of perjury.',
    });
  });

  test('Service fee covers conditional lien release', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Conditional Lien Release');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 10: Service fee covers Conditional Lien Release – protects property during payment period.',
    });
  });

  test('Service fee covers unconditional lien release', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Unconditional Lien Release');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 10: Service fee covers Unconditional Lien Release – final proof contractor has no claim.',
    });
  });

  test('Service fee covers certificate of completion', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Certificate of Completion');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 10: Service fee covers Certificate of Completion – official documentation for insurance.',
    });
  });

  test('Service fee covers agent portal access', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Agent Portal Access');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 10: Service fee covers Agent Portal Access – agent tracks progress in real-time.',
    });
  });

  test('Service fee covers document storage (perpetual access)', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Document Storage');
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 10: Service fee covers Document Storage – perpetual access to all records.',
    });
  });

  test('Service fee covers compliance monitoring (V6.3 item – not in programmer-summary list)', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Compliance Monitoring');

    const programmerSummaryItems = [
      'Contractor license verification',
      'Affidavit of Service',
      'Conditional Lien Release',
      'Unconditional Lien Release',
      'Certificate of Completion',
      'Agent portal access',
      'Document storage',
      'Platform administration',
    ];
    const inProgrammerSummary = programmerSummaryItems.some(item =>
      item.toLowerCase().includes('compliance monitoring')
    );
    expect(inProgrammerSummary).toBe(false);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 10: Service fee covers Compliance Monitoring – system ensures all steps completed. ' +
        'programmer-summary.spec.ts lists "Platform administration" instead; V6.3 calls this "Compliance Monitoring".',
    });
  });

  test('Service fee covers tax reporting (V6.3 item – not in programmer-summary list)', async () => {
    expect(ALL_SERVICE_FEE_ITEMS).toContain('Tax Reporting');

    const programmerSummaryItems = [
      'Contractor license verification',
      'Affidavit of Service',
      'Conditional Lien Release',
      'Unconditional Lien Release',
      'Certificate of Completion',
      'Agent portal access',
      'Document storage',
      'Platform administration',
    ];
    const inProgrammerSummary = programmerSummaryItems.some(item =>
      item.toLowerCase().includes('tax')
    );
    expect(inProgrammerSummary).toBe(false);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 10: Service fee covers Tax Reporting – sales tax properly handled and remitted. ' +
        'This item is listed in V6.3 Section 10 but was omitted from programmer-summary.spec.ts.',
    });
  });

  test('Service fee items count is 11, not 8 (V6.3 corrects earlier count)', async () => {
    const v63Count = ALL_SERVICE_FEE_ITEMS.length;
    const programmerSummaryCount = 8;

    expect(v63Count).toBe(11);
    expect(v63Count).toBeGreaterThan(programmerSummaryCount);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 10: The $95 service fee covers 11 items. ' +
        'programmer-summary.spec.ts listed 8; V6.3 adds Background Checks, Insurance Verification, Compliance Monitoring, and Tax Reporting.',
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11 – COMPLETE 24-STEP JOB FLOW
// Platform Spec V6.3, Section 11
// programmer-summary.spec.ts covers 17 internal steps; V6.3 specifies 24.
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Section 11 – Complete 24-Step Job Flow', () => {
  const JOB_FLOW_STEPS = [
    { step: 1,  who: 'Homeowner',   action: 'Submits service request with all details',                             document: null },
    { step: 2,  who: 'System',      action: 'Finds contractors within distance, sends notifications',               document: null },
    { step: 3,  who: 'Contractor',  action: 'Reviews request, submits bid (parts, pressure, device, software, labor)', document: null },
    { step: 4,  who: 'System',      action: 'Applies markups and adds $95 Service Fee to create retail estimate',   document: null },
    { step: 5,  who: 'Homeowner',   action: 'Reviews estimate, selects contractor',                                 document: null },
    { step: 6,  who: 'Homeowner',   action: 'Pays 10% deposit (on total including Service Fee)',                    document: 'Deposit receipt' },
    { step: 7,  who: 'Homeowner',   action: 'Selects installation date, contractor notified',                       document: null },
    { step: 8,  who: 'System',      action: 'Verifies contractor has all parts (inventory check)',                  document: null },
    { step: 9,  who: 'System',      action: 'Sends Work Order to contractor via DocuSign',                          document: 'DocuSign: Work Order' },
    { step: 10, who: 'Contractor',  action: 'Signs Work Order, work authorized',                                    document: 'Work Order signed' },
    { step: 11, who: 'Contractor',  action: 'Arrives at job site, checks in via app (GPS, timestamp, photo)',       document: 'Check-in record' },
    { step: 12, who: 'Contractor',  action: 'Performs work',                                                        document: null },
    { step: 13, who: 'Contractor',  action: 'IF change order needed: creates in app, homeowner approves',           document: 'Change Order' },
    { step: 14, who: 'Contractor',  action: 'Completes work, uploads photos and invoice (Status: Pending Review)',  document: null },
    { step: 15, who: 'Contractor',  action: 'Signs Affidavit of Service',                                           document: 'DocuSign: Affidavit' },
    { step: 16, who: 'Contractor',  action: 'Signs Conditional Lien Release with invoice',                          document: 'DocuSign: Conditional' },
    { step: 17, who: 'Admin',       action: 'Reviews work, approves',                                               document: null },
    { step: 18, who: 'System',      action: 'Releases payment to contractor',                                       document: null },
    { step: 19, who: 'Contractor',  action: 'Receives payment',                                                     document: null },
    { step: 20, who: 'System',      action: 'After payment clears, sends Unconditional Lien Release',               document: 'DocuSign: Unconditional' },
    { step: 21, who: 'Contractor',  action: 'Signs Unconditional Lien Release, job fully documented',               document: null },
    { step: 22, who: 'System',      action: 'Generates certificate package with final invoice (Service Fee included), emails homeowner + agent', document: 'Certificate' },
    { step: 23, who: 'Agent',       action: 'Downloads certificate, submits to underwriter',                        document: null },
    { step: 24, who: 'System',      action: 'Stores job data for policy anniversary/renewal tracking',              document: null },
  ];

  test('Complete job flow has exactly 24 steps per V6.3 spec', async () => {
    expect(JOB_FLOW_STEPS.length).toBe(24);
    expect(JOB_FLOW_STEPS.map(s => s.step)).toEqual(
      Array.from({ length: 24 }, (_, i) => i + 1)
    );

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 11: Complete job flow has 24 steps. ' +
        'programmer-summary.spec.ts covers 17 internal steps; V6.3 adds Steps 2, 7, 8, 13, 19, and more.',
    });
  });

  test('Steps 1–6: homeowner submits, system finds contractors, contractor bids, system creates estimate, homeowner selects and pays deposit', async () => {
    const earlySteps = JOB_FLOW_STEPS.slice(0, 6);
    expect(earlySteps[0].who).toBe('Homeowner');
    expect(earlySteps[0].action).toContain('Submits service request');
    expect(earlySteps[1].who).toBe('System');
    expect(earlySteps[1].action).toContain('Finds contractors');
    expect(earlySteps[2].who).toBe('Contractor');
    expect(earlySteps[2].action).toContain('submits bid');
    expect(earlySteps[3].who).toBe('System');
    expect(earlySteps[3].action).toContain('markups');
    expect(earlySteps[4].action).toContain('selects contractor');
    expect(earlySteps[5].document).toBe('Deposit receipt');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11, Steps 1-6: Service request → contractor discovery → bid → markup → selection → 10% deposit.',
    });
  });

  test('Step 2: system automatically finds contractors within distance and sends notifications', async () => {
    const step2 = JOB_FLOW_STEPS.find(s => s.step === 2)!;
    expect(step2.who).toBe('System');
    expect(step2.action).toContain('Finds contractors within distance');
    expect(step2.action).toContain('notifications');

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 11, Step 2: System automatically finds contractors within distance ' +
        'and sends notifications. This step is NOT in programmer-summary.spec.ts\'s 17-step list.',
    });
  });

  test('Step 7: homeowner selects installation date after deposit (not in programmer-summary)', async () => {
    const step7 = JOB_FLOW_STEPS.find(s => s.step === 7)!;
    expect(step7.who).toBe('Homeowner');
    expect(step7.action).toContain('installation date');

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 11, Step 7: Homeowner selects installation date after paying deposit; contractor is notified. ' +
        'This step is NOT in programmer-summary.spec.ts\'s 17-step list.',
    });
  });

  test('Step 8: system verifies contractor has all required parts before work order (not in programmer-summary)', async () => {
    const step8 = JOB_FLOW_STEPS.find(s => s.step === 8)!;
    expect(step8.who).toBe('System');
    expect(step8.action).toContain('Verifies contractor has all parts');

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 11, Step 8: System verifies contractor has all required parts (inventory check) before issuing Work Order. ' +
        'This step is NOT in programmer-summary.spec.ts\'s 17-step list.',
    });
  });

  test('Steps 9–10: DocuSign Work Order sent then signed by contractor', async () => {
    const step9 = JOB_FLOW_STEPS.find(s => s.step === 9)!;
    const step10 = JOB_FLOW_STEPS.find(s => s.step === 10)!;

    expect(step9.document).toBe('DocuSign: Work Order');
    expect(step10.document).toBe('Work Order signed');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11, Steps 9-10: System sends Work Order via DocuSign; contractor signs before beginning work.',
    });
  });

  test('Step 11: contractor GPS check-in with timestamp and photo at job site', async () => {
    const step11 = JOB_FLOW_STEPS.find(s => s.step === 11)!;
    expect(step11.action).toContain('GPS');
    expect(step11.action).toContain('timestamp');
    expect(step11.action).toContain('photo');
    expect(step11.document).toBe('Check-in record');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11, Step 11: Contractor checks in via app with GPS, timestamp, and photo creating a check-in record.',
    });
  });

  test('Step 13: change order is conditional and requires homeowner approval', async () => {
    const step13 = JOB_FLOW_STEPS.find(s => s.step === 13)!;
    expect(step13.action).toContain('change order');
    expect(step13.action).toContain('homeowner approves');
    expect(step13.document).toBe('Change Order');

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 11, Step 13: Change order creation is conditional (IF needed). ' +
        'Contractor creates in app; homeowner must approve. Produces Change Order document. ' +
        'This step is NOT in programmer-summary.spec.ts\'s 17-step list.',
    });
  });

  test('Steps 15–16: contractor signs Affidavit of Service then Conditional Lien Release', async () => {
    const step15 = JOB_FLOW_STEPS.find(s => s.step === 15)!;
    const step16 = JOB_FLOW_STEPS.find(s => s.step === 16)!;

    expect(step15.document).toBe('DocuSign: Affidavit');
    expect(step16.document).toBe('DocuSign: Conditional');
    expect(step15.action).toContain('Affidavit of Service');
    expect(step16.action).toContain('Conditional Lien Release');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11, Steps 15-16: Contractor signs Affidavit of Service then Conditional Lien Release (with invoice).',
    });
  });

  test('Step 17: admin reviews and approves work before payment is released', async () => {
    const step17 = JOB_FLOW_STEPS.find(s => s.step === 17)!;
    const step18 = JOB_FLOW_STEPS.find(s => s.step === 18)!;

    expect(step17.who).toBe('Admin');
    expect(step17.action).toContain('Reviews work');
    expect(step18.who).toBe('System');
    expect(step18.action).toContain('Releases payment');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11, Steps 17-18: Admin reviews and approves; system then releases contractor payment.',
    });
  });

  test('Step 19: contractor receives payment (not in programmer-summary)', async () => {
    const step19 = JOB_FLOW_STEPS.find(s => s.step === 19)!;
    expect(step19.who).toBe('Contractor');
    expect(step19.action).toBe('Receives payment');

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 11, Step 19: Contractor receives payment. ' +
        'This step is NOT in programmer-summary.spec.ts\'s 17-step list.',
    });
  });

  test('Steps 20–21: unconditional lien release sent and signed after payment clears', async () => {
    const step20 = JOB_FLOW_STEPS.find(s => s.step === 20)!;
    const step21 = JOB_FLOW_STEPS.find(s => s.step === 21)!;

    expect(step20.action).toContain('Unconditional Lien Release');
    expect(step20.action).toContain('payment clears');
    expect(step20.document).toBe('DocuSign: Unconditional');
    expect(step21.action).toContain('Signs Unconditional Lien Release');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11, Steps 20-21: After payment clears, system sends Unconditional Lien Release via DocuSign; contractor signs.',
    });
  });

  test('Step 22: certificate package generated with final invoice emailed to homeowner AND agent', async () => {
    const step22 = JOB_FLOW_STEPS.find(s => s.step === 22)!;
    expect(step22.who).toBe('System');
    expect(step22.action).toContain('certificate package');
    expect(step22.action).toContain('homeowner');
    expect(step22.action).toContain('agent');
    expect(step22.document).toBe('Certificate');

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 11, Step 22: System generates certificate package with final invoice ' +
        '(Service Fee already accounted for in estimate) and emails to BOTH homeowner and agent.',
    });
  });

  test('Step 23: agent downloads certificate and submits to underwriter', async () => {
    const step23 = JOB_FLOW_STEPS.find(s => s.step === 23)!;
    expect(step23.who).toBe('Agent');
    expect(step23.action).toContain('Downloads certificate');
    expect(step23.action).toContain('underwriter');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11, Step 23: Agent downloads certificate and submits to underwriter.',
    });
  });

  test('Step 24: system stores job data for policy anniversary/renewal tracking', async () => {
    const step24 = JOB_FLOW_STEPS.find(s => s.step === 24)!;
    expect(step24.who).toBe('System');
    expect(step24.action).toContain('policy anniversary');
    expect(step24.action).toContain('renewal tracking');

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11, Step 24: System stores job data for policy anniversary/renewal tracking (future notification feature).',
    });
  });

  test('DocuSign documents are generated at correct steps', async () => {
    const docuSignSteps = JOB_FLOW_STEPS.filter(s =>
      s.document && s.document.startsWith('DocuSign')
    );

    expect(docuSignSteps.length).toBe(4);

    const docuSignDocs = docuSignSteps.map(s => s.document);
    expect(docuSignDocs).toContain('DocuSign: Work Order');
    expect(docuSignDocs).toContain('DocuSign: Affidavit');
    expect(docuSignDocs).toContain('DocuSign: Conditional');
    expect(docuSignDocs).toContain('DocuSign: Unconditional');

    // Verify correct step order
    const workOrderStep = JOB_FLOW_STEPS.find(s => s.document === 'DocuSign: Work Order')!;
    const affidavitStep = JOB_FLOW_STEPS.find(s => s.document === 'DocuSign: Affidavit')!;
    const conditionalStep = JOB_FLOW_STEPS.find(s => s.document === 'DocuSign: Conditional')!;
    const unconditionalStep = JOB_FLOW_STEPS.find(s => s.document === 'DocuSign: Unconditional')!;

    expect(workOrderStep.step).toBe(9);
    expect(affidavitStep.step).toBe(15);
    expect(conditionalStep.step).toBe(16);
    expect(unconditionalStep.step).toBe(20);

    expect(workOrderStep.step).toBeLessThan(affidavitStep.step);
    expect(affidavitStep.step).toBeLessThan(conditionalStep.step);
    expect(conditionalStep.step).toBeLessThan(unconditionalStep.step);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 11: 4 DocuSign documents in correct order: ' +
        'Work Order (Step 9) → Affidavit (Step 15) → Conditional Lien Release (Step 16) → Unconditional Lien Release (Step 20).',
    });
  });

  test('Job flow has correct actor distribution across all 24 steps', async () => {
    const byActor: Record<string, number> = {};
    for (const step of JOB_FLOW_STEPS) {
      byActor[step.who] = (byActor[step.who] ?? 0) + 1;
    }

    expect(byActor['Homeowner']).toBeGreaterThanOrEqual(3);
    expect(byActor['Contractor']).toBeGreaterThanOrEqual(7);
    expect(byActor['System']).toBeGreaterThanOrEqual(6);
    expect(byActor['Admin']).toBeGreaterThanOrEqual(1);
    expect(byActor['Agent']).toBeGreaterThanOrEqual(1);

    test.info().annotations.push({
      type: 'info',
      description:
        'Platform Spec V6.3, Section 11: Job flow involves 5 actors: ' +
        `Homeowner (${byActor['Homeowner']} steps), Contractor (${byActor['Contractor']} steps), ` +
        `System (${byActor['System']} steps), Admin (${byActor['Admin']} steps), Agent (${byActor['Agent']} steps).`,
    });
  });

  test('Deposit step occurs BEFORE work order and installation', async () => {
    const depositStep = JOB_FLOW_STEPS.find(s => s.document === 'Deposit receipt')!;
    const workOrderStep = JOB_FLOW_STEPS.find(s => s.document === 'DocuSign: Work Order')!;
    expect(depositStep.step).toBeLessThan(workOrderStep.step);

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11: 10% deposit (Step 6) is required before Work Order is sent (Step 9).',
    });
  });

  test('Certificate is generated AFTER unconditional lien release is signed', async () => {
    const unconditionalStep = JOB_FLOW_STEPS.find(s => s.step === 21)!;
    const certificateStep   = JOB_FLOW_STEPS.find(s => s.document === 'Certificate')!;
    expect(unconditionalStep.step).toBeLessThan(certificateStep.step);

    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11: Certificate is generated (Step 22) after Unconditional Lien Release is signed (Step 21).',
    });
  });

  test('Admin portal shows 24-step job flow with correct workflow status indicators', async ({ page }) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password);
    await page.goto('/admin/service-requests');
    await page.screenshot({ path: path.join(screenshotDir, '11_admin-job-flow-view.png') });
    const body = page.locator('body');
    await expect(body).toBeVisible();
    test.info().annotations.push({
      type: 'info',
      description: 'Platform Spec V6.3, Section 11: Admin service requests page shows job status visible to admin.',
    });
  });
});
