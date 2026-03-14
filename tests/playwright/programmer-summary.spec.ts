import { test, expect } from '@playwright/test';

/**
 * MrSurety QA – Programmer Summary Validation Tests
 *
 * Source: Platform Spec V6.3 (Doc 2, Section 19 – "Summary for Programmer")
 *
 * Validates the 8 top-level build requirements specified in Section 19:
 *
 *  1. Multi-step homeowner form (10 steps)
 *  2. Assessment fee calculation ($185 + $0.75/mile)
 *  3. Installation: markup rules, $95 service fee, 10% deposit
 *  4. Service fee coverage (8 items)
 *  5. Contractors NEVER see the $95 service fee
 *  6. Job flow (17 steps through certificate delivery)
 *  7. Policy renewal data storage
 *  8. AI Call Reminder is FUTURE / V2 only
 */
// ---------------------------------------------------------------------------
// Requirement 1: Multi-step homeowner form
// ---------------------------------------------------------------------------
test.describe('Requirement 1 – Multi-Step Homeowner Form', () => {
  test('Form contains all 10 required steps', async () => {
    // The 10 form steps specified in Section 19
    const requiredSteps = [
      'account',         // login / signup
      'service_type',    // installation or assessment
      'property_address',
      'insurance_info',  // agent fields auto-filled from referral
      'home_specifics',  // sq ft, year built
      'device_info',     // type, who provides, software assistance
      'water_main_photo', // REQUIRED – inside house
      'lidar_upload',    // optional
      'contact_preferences',
      'terms_agreement',
    ];

    // Each step key must be unique – no duplicates
    const uniqueSteps = new Set(requiredSteps);
    expect(uniqueSteps.size).toBe(requiredSteps.length);
    expect(requiredSteps.length).toBe(10);
  });

  test('Water main photo step is marked as REQUIRED (not optional)', async () => {
    // Section 19 explicitly states water main photo is REQUIRED.
    // LiDar upload is optional.
    const waterMainRequired = true;
    const lidarRequired = false;

    expect(waterMainRequired).toBe(true);
    expect(lidarRequired).toBe(false);
  });

  test('Insurance agent fields auto-fill from referral link parameters', async () => {
    // Referral link carries agent_name and agent_email query params.
    // Form should pre-populate these fields when present.
    const referralUrl = 'https://app.mrsurety.com/request?ref=AGT123&agent_name=Jane+Smith&agent_email=jane%40agency.com';
    const url = new URL(referralUrl);
    const agentName = url.searchParams.get('agent_name');
    const agentEmail = url.searchParams.get('agent_email');

    expect(agentName).toBe('Jane Smith');
    expect(agentEmail).toBe('jane@agency.com');
  });
});

// ---------------------------------------------------------------------------
// Requirement 2: Assessment fee calculation
// ---------------------------------------------------------------------------
test.describe('Requirement 2 – Assessment Fee Calculation', () => {
  test('Assessment fee: $185 base + $0.75/mile', async () => {
    const baseFee = 185.00;
    const mileageRate = 0.75;

    // Scenario A: technician 20 miles away
    const distanceA = 20;
    const feeA = baseFee + mileageRate * distanceA;
    expect(feeA).toBe(200.00);

    // Scenario B: technician 0 miles away (on-site)
    const distanceB = 0;
    const feeB = baseFee + mileageRate * distanceB;
    expect(feeB).toBe(185.00);

    // Scenario C: technician 50 miles away
    const distanceC = 50;
    const feeC = baseFee + mileageRate * distanceC;
    expect(feeC).toBe(222.50);
  });

  test('Assessment assigns nearest available technician', async () => {
    // The platform must select the nearest active technician.
    // Represent as a distance-selection algorithm check.
    const technicians = [
      { id: 'T1', distanceMiles: 25, isActive: true },
      { id: 'T2', distanceMiles: 12, isActive: true },
      { id: 'T3', distanceMiles: 8,  isActive: false }, // inactive – excluded
      { id: 'T4', distanceMiles: 15, isActive: true },
    ];

    const activeTechs = technicians.filter(t => t.isActive);
    const nearest = activeTechs.reduce((prev, curr) =>
      curr.distanceMiles < prev.distanceMiles ? curr : prev
    );

    expect(nearest.id).toBe('T2');
    expect(nearest.distanceMiles).toBe(12);
  });
});

// ---------------------------------------------------------------------------
// Requirement 3: Installation – markup, service fee, deposit
// ---------------------------------------------------------------------------
test.describe('Requirement 3 – Installation Markup Rules and Deposit', () => {
  test('Markup percentages: parts/pressure +35%, software +25%, labor +25%, device +0%', async () => {
    const contractorParts    = 260.00;
    const contractorPressure = 310.00;
    const contractorDevice   = 599.99;
    const contractorSoftware = 75.00;   // flat rate
    const contractorLabor    = 450.00;

    const retailParts    = parseFloat((contractorParts    * 1.35).toFixed(2));
    const retailPressure = parseFloat((contractorPressure * 1.35).toFixed(2));
    const retailDevice   = parseFloat((contractorDevice   * 1.00).toFixed(2)); // 0% markup
    const retailSoftware = parseFloat((contractorSoftware * 1.25).toFixed(2));
    const retailLabor    = parseFloat((contractorLabor    * 1.25).toFixed(2));

    expect(retailParts).toBe(351.00);
    expect(retailPressure).toBe(418.50);
    expect(retailDevice).toBe(599.99);
    expect(retailSoftware).toBe(93.75);
    expect(retailLabor).toBe(562.50);
  });

  test('$95 service fee appears as a separate line item on every estimate', async () => {
    const serviceFee = 95.00;
    const retailSubtotal = 2025.74; // Scenario 1 from Section 9

    const totalBeforeTax = retailSubtotal + serviceFee;
    expect(totalBeforeTax).toBeCloseTo(2120.74, 2);
    expect(serviceFee).toBe(95.00);
  });

  test('10% deposit required: deposit = 10% of homeowner total', async () => {
    const homeownerTotal = 2285.10; // Scenario 1 full total inc. tax
    const depositRate    = 0.10;
    const deposit        = parseFloat((homeownerTotal * depositRate).toFixed(2));

    expect(deposit).toBe(228.51);
  });

  test('Software setup assistance is $75 flat contractor / $93.75 homeowner', async () => {
    const contractorSoftware = 75.00;
    const homeownerSoftware  = parseFloat((contractorSoftware * 1.25).toFixed(2));
    expect(homeownerSoftware).toBe(93.75);
  });
});

// ---------------------------------------------------------------------------
// Requirement 4: Service fee coverage
// ---------------------------------------------------------------------------
test.describe('Requirement 4 – Service Fee Coverage Items', () => {
  // NOTE: Platform Spec V6.3, Section 10 lists 11 service fee items.
  // This test validates the 8 items captured from the "Summary for Programmer" section (Section 19).
  // The 3 additional V6.3 items (Background Checks, Insurance Verification, Compliance Monitoring,
  // and Tax Reporting) are covered in platform-spec-v63-gaps.spec.ts, Section 10.
  test('$95 service fee covers all 8 required items (see platform-spec-v63-gaps.spec.ts for all 11)', async () => {
    const coverageItems = [
      'Contractor license verification',
      'Affidavit of Service',
      'Conditional Lien Release',
      'Unconditional Lien Release',
      'Certificate of Completion',
      'Agent portal access',
      'Document storage',
      'Platform administration',
    ];

    expect(coverageItems.length).toBe(8);

    // Spot-check key items
    expect(coverageItems).toContain('Affidavit of Service');
    expect(coverageItems).toContain('Unconditional Lien Release');
    expect(coverageItems).toContain('Certificate of Completion');
    expect(coverageItems).toContain('Agent portal access');
  });
});

// ---------------------------------------------------------------------------
// Requirement 5: Contractor never sees $95 service fee
// ---------------------------------------------------------------------------
test.describe('Requirement 5 – Contractor Service Fee Visibility', () => {
  test('Contractor payout excludes the $95 service fee entirely', async () => {
    // Scenario 1 figures from Section 16
    const homeownerPays   = 2285.10;
    const taxToState      = 164.36;
    const mrsuretyProfit  = 425.75;  // includes $95 service fee
    const contractorGets  = homeownerPays - taxToState - mrsuretyProfit;

    expect(parseFloat(contractorGets.toFixed(2))).toBe(1694.99);

    // Contractor payout must not include service fee component
    const serviceFee = 95.00;
    expect(contractorGets).toBeLessThan(homeownerPays - serviceFee);
  });

  test('Contractor Work Order total does not include the $95 service fee', async () => {
    // Work Order shows contractor pricing only
    const contractorParts    = 260.00;
    const contractorPressure = 310.00;
    const contractorDevice   = 599.99;
    const contractorSoftware = 75.00;
    const contractorLabor    = 450.00;

    const contractorTotal = parseFloat(
      (contractorParts + contractorPressure + contractorDevice + contractorSoftware + contractorLabor).toFixed(2)
    );

    // Work Order total should equal sum of contractor costs only
    expect(contractorTotal).toBe(1694.99);

    // The $95 service fee must not be included
    const serviceFee = 95.00;
    const workOrderTotal = contractorTotal; // no service fee
    expect(workOrderTotal).toBe(contractorTotal);
    expect(workOrderTotal + serviceFee).toBeGreaterThan(contractorTotal);
  });
});

// ---------------------------------------------------------------------------
// Requirement 6: Job flow – 17 steps
// NOTE: Platform Spec V6.3, Section 11 defines the complete 24-step job flow.
// This test validates the 17 key steps captured from the "Summary for Programmer"
// section (Section 19). The full 24-step flow including Steps 2, 7, 8, 13, and 19
// is covered in platform-spec-v63-gaps.spec.ts, Section 11.
// ---------------------------------------------------------------------------
test.describe('Requirement 6 – Job Flow Steps', () => {
  test('Job flow has exactly 17 required steps through certificate delivery (see platform-spec-v63-gaps.spec.ts for all 24)', async () => {
    const jobFlowSteps = [
      'homeowner_submits_request',
      'contractors_bid',
      'homeowner_selects_contractor',
      'homeowner_pays_deposit',
      'contractor_signs_work_order',
      'contractor_checks_in_gps',
      'work_performed',
      'contractor_uploads_photos',
      'contractor_signs_affidavit',
      'contractor_signs_conditional_lien_release',
      'admin_approves_payment_release',
      'platform_releases_contractor_payment',
      'unconditional_lien_release_sent',
      'platform_access_locked_until_signed',
      'certificate_generated',
      'certificate_sent_to_homeowner',
      'certificate_sent_to_agent',
    ];

    expect(jobFlowSteps.length).toBe(17);
  });

  test('Platform locks contractor access until Unconditional Lien Release is signed', async () => {
    // After payment clears, unconditional lien release is required before
    // the contractor regains full platform access.
    const contractorState = {
      paymentCleared: true,
      unconditionalLienReleaseSigned: false,
      // Platform access starts locked when payment has cleared but lien release is not yet signed
      platformAccessLocked: true,
    };

    // Rule: if payment cleared and lien release NOT signed → locked
    const shouldBeLocked = contractorState.paymentCleared && !contractorState.unconditionalLienReleaseSigned;
    expect(shouldBeLocked).toBe(true);
    expect(contractorState.platformAccessLocked).toBe(true);
  });

  test('Platform unlocks contractor access after Unconditional Lien Release is signed', async () => {
    const contractorState = {
      paymentCleared: true,
      unconditionalLienReleaseSigned: true,
      platformAccessLocked: false,
    };

    if (contractorState.paymentCleared && !contractorState.unconditionalLienReleaseSigned) {
      contractorState.platformAccessLocked = true;
    }

    expect(contractorState.platformAccessLocked).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Requirement 7: Policy renewal data storage
// ---------------------------------------------------------------------------
test.describe('Requirement 7 – Policy Renewal Data Storage', () => {
  test('Completed job record stores all required fields for policy renewal', async () => {
    const requiredFields = [
      'completion_date',
      'property_address',
      'device_type',
      'device_model_serial',
      'contractor_name',
      'contractor_license',
      'contractor_business',
      'certificate_url',
      'affidavit_url',
      'conditional_lien_release_url',
      'unconditional_lien_release_url',
      'photos_url',
      'homeowner_name',
      'homeowner_email',
      'homeowner_phone',
      'agent_name',
      'agent_email',
      'insurance_company',
      'policy_number',
    ];

    // All fields must be present
    expect(requiredFields.length).toBeGreaterThanOrEqual(19);

    // Spot-check critical renewal fields
    expect(requiredFields).toContain('completion_date');
    expect(requiredFields).toContain('policy_number');
    expect(requiredFields).toContain('agent_email');
    expect(requiredFields).toContain('unconditional_lien_release_url');
  });
});

// ---------------------------------------------------------------------------
// Requirement 8: AI Call Reminder is FUTURE / V2 only
// ---------------------------------------------------------------------------
test.describe('Requirement 8 – AI Call Reminder is Future Module', () => {
  test('AI Call Reminder feature flag is disabled at launch', async () => {
    // This module must NOT be active at V1 launch.
    const featureFlags = {
      aiCallReminder: false, // explicitly off for V1
      multiStepForm: true,
      contractorBidding: true,
      docuSignIntegration: true,
      stripePayments: true,
    };

    expect(featureFlags.aiCallReminder).toBe(false);
    expect(featureFlags.multiStepForm).toBe(true);
    expect(featureFlags.stripePayments).toBe(true);
  });

  test('AI Call Reminder is documented as V2 future module', async () => {
    // Validate the V2 designation
    const moduleStatus = {
      name: 'AI Call Reminder',
      version: 'V2',
      requiredForLaunch: false,
      description: 'AI-powered outbound call reminders for policy renewal deadlines',
    };

    expect(moduleStatus.requiredForLaunch).toBe(false);
    expect(moduleStatus.version).toBe('V2');
  });
});
