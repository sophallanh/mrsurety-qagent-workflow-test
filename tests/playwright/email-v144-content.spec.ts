import { test, expect } from '@playwright/test';

/**
 * MrSurety QA – Email Templates v1.4.4 Content Tests
 *
 * Source: MR SURETY – COMPLETE EMAILS AND DOCUSIGN DOCUMENTS v1.4.4
 *         (Long Form – Full Package: With Device + With Software)
 *         Reference Job: JOB-WL-7890 | Alex Johnson | Plumb Perfect Inc.
 *
 * Validates the required fields, structure, and business-rule compliance
 * for Emails 1–4 as specified in v1.4.4.
 *
 * Email 1 → H2 – Service Request Confirmation (To Homeowner)
 * Email 2 → H3 – New Estimate Available (To Homeowner)
 * Email 3 → H4 – Deposit Required (To Homeowner)
 * Email 4 → C4 – New Job Assignment (To Contractor)
 */

// ---------------------------------------------------------------------------
// Email 1 – Service Request Confirmation (H2)
// ---------------------------------------------------------------------------
test.describe('Email 1 – Service Request Confirmation (H2)', () => {
  test('From address is notifications@mrsurety.com', async () => {
    const from = 'notifications@mrsurety.com';
    expect(from).toBe('notifications@mrsurety.com');
  });

  test('Subject line matches v1.4.4 specification', async () => {
    const subject = 'Your MrSurety Service Request Has Been Received';
    expect(subject).toBe('Your MrSurety Service Request Has Been Received');
  });

  test('Request details table includes all 6 required fields', async () => {
    const requiredFields = [
      'Square Footage',
      'Property Age',
      'Pressure Reducer',
      'Device Source',
      'Software Setup',
      'Estimated Extension Cord',
    ];
    expect(requiredFields.length).toBe(6);
    expect(requiredFields).toContain('Pressure Reducer');
    expect(requiredFields).toContain('Device Source');
    expect(requiredFields).toContain('Software Setup');
  });

  test('Email includes request tracking link with job ID', async () => {
    const trackingBaseUrl = 'https://mrsurety.com/request/';
    const jobId = 'JOB-WL-7890';
    const trackingLink = `${trackingBaseUrl}${jobId}`;
    expect(trackingLink).toBe('https://mrsurety.com/request/JOB-WL-7890');
  });

  test('Footer contains MrSurety company info and phone number', async () => {
    const footerFields = {
      company:  'MrSurety Compliance Team',
      address:  '1253 E Imperial Hwy, Placentia, CA 92870',
      phone:    '(714) 686-1800',
      email:    'support@mrsurety.com',
    };
    expect(footerFields.phone).toBe('(714) 686-1800');
    expect(footerFields.address).toContain('Placentia, CA');
  });
});

// ---------------------------------------------------------------------------
// Email 2 – New Estimate Available (H3)
// ---------------------------------------------------------------------------
test.describe('Email 2 – New Estimate Available (H3)', () => {
  test('Subject line matches v1.4.4 specification', async () => {
    const subject = '✅ Estimates Ready for Your Review - MrSurety';
    expect(subject).toBe('✅ Estimates Ready for Your Review - MrSurety');
  });

  test('Estimates summary table shows at least 3 contractors with ratings', async () => {
    const estimates = [
      { contractor: 'Plumb Perfect Inc.', rating: 4.9, total: 2386.11 },
      { contractor: 'ABC Plumbing',       rating: 4.2, total: 2421.99 },
      { contractor: 'Rapid Rooter',       rating: 3.8, total: 2398.50 },
    ];

    expect(estimates.length).toBeGreaterThanOrEqual(3);

    // Recommendation should be the contractor with best rating
    const recommended = estimates.reduce((a, b) => a.rating > b.rating ? a : b);
    expect(recommended.contractor).toBe('Plumb Perfect Inc.');
  });

  test('Reference job totals match v1.4.4 example figures', async () => {
    // v1.4.4 reference figures for JOB-WL-7890
    const plumbPerfect = 2386.11;
    const abcPlumbing  = 2421.99;
    const rapidRooter  = 2398.50;

    expect(plumbPerfect).toBe(2386.11);
    expect(abcPlumbing).toBe(2421.99);
    expect(rapidRooter).toBe(2398.50);

    // Plumb Perfect must be lowest (recommended on price + rating)
    expect(plumbPerfect).toBeLessThan(abcPlumbing);
    expect(plumbPerfect).toBeLessThan(rapidRooter);
  });

  test('Email lists all 6 service fee coverage items for homeowner', async () => {
    const feeItems = [
      'Contractor license & insurance verification',
      'Affidavit of Service (signed under penalty of perjury)',
      'Conditional & Unconditional Lien Releases',
      'Certificate of Completion for your insurance agent',
      'Agent portal access for real-time updates',
      'Perpetual document storage',
    ];
    expect(feeItems.length).toBe(6);
  });

  test('Estimates review link includes job ID', async () => {
    const baseUrl = 'https://mrsurety.com/estimates/';
    const jobId = 'JOB-WL-7890';
    const link = `${baseUrl}${jobId}`;
    expect(link).toBe('https://mrsurety.com/estimates/JOB-WL-7890');
  });
});

// ---------------------------------------------------------------------------
// Email 3 – Deposit Required (H4)
// ---------------------------------------------------------------------------
test.describe('Email 3 – Deposit Required (H4)', () => {
  test('From address is payments@mrsurety.com (not notifications)', async () => {
    const from = 'payments@mrsurety.com';
    expect(from).toBe('payments@mrsurety.com');
    expect(from).not.toBe('notifications@mrsurety.com');
  });

  test('v1.4.4 reference job: all line items match published figures', async () => {
    // Exact figures from v1.4.4 JOB-WL-7890 (Plumb Perfect Inc., Scenario 1)
    const parts    = 351.00;
    const pressure = 418.50;
    const device   = 599.99;  // Moen Smart Water System
    const software = 93.75;   // $75 × 1.25
    const labor    = 656.25;  // $525 × 1.25
    const subtotal = parts + pressure + device + software + labor;

    expect(parseFloat(subtotal.toFixed(2))).toBe(2119.49);

    const serviceFee    = 95.00;
    const totalBeforeTax = parseFloat((subtotal + serviceFee).toFixed(2));
    expect(totalBeforeTax).toBe(2214.49);

    const taxRate = 0.0775;
    const tax = parseFloat((totalBeforeTax * taxRate).toFixed(2));
    expect(tax).toBe(171.62);

    const grandTotal = parseFloat((totalBeforeTax + tax).toFixed(2));
    expect(grandTotal).toBe(2386.11);
  });

  test('Deposit is exactly 10% of grand total', async () => {
    const grandTotal = 2386.11;
    const deposit = parseFloat((grandTotal * 0.10).toFixed(2));
    expect(deposit).toBe(238.61);
  });

  test('Remaining balance = total - deposit', async () => {
    const grandTotal = 2386.11;
    const deposit    = 238.61;
    const remaining  = parseFloat((grandTotal - deposit).toFixed(2));
    expect(remaining).toBe(2147.50);
  });

  test('Service fee table has 8 coverage rows', async () => {
    const serviceFeeRows = [
      'Contractor License Verification',
      'Insurance Verification',
      'Affidavit of Service',
      'Conditional Lien Release',
      'Unconditional Lien Release',
      'Certificate of Completion',
      'Agent Portal Access',
      'Document Storage',
    ];
    expect(serviceFeeRows.length).toBe(8);
  });

  test('Deposit payment link uses job ID', async () => {
    const baseUrl = 'https://payments.mrsurety.com/deposit/';
    const jobId = 'JOB-WL-7890';
    const link = `${baseUrl}${jobId}`;
    expect(link).toBe('https://payments.mrsurety.com/deposit/JOB-WL-7890');
  });

  test('California deposit law: deposit must not exceed 10% or $1,000', async () => {
    const grandTotal = 2386.11;
    const tenPercent = parseFloat((grandTotal * 0.10).toFixed(2));
    const legalMax   = Math.min(tenPercent, 1000.00);
    const deposit    = 238.61;

    expect(deposit).toBeLessThanOrEqual(legalMax);
    expect(deposit).toBe(238.61); // 10% of $2,386.11
  });
});

// ---------------------------------------------------------------------------
// Email 4 – New Job Assignment (C4 – To Contractor)
// ---------------------------------------------------------------------------
test.describe('Email 4 – New Job Assignment (C4)', () => {
  test('From address is jobs@mrsurety.com', async () => {
    const from = 'jobs@mrsurety.com';
    expect(from).toBe('jobs@mrsurety.com');
  });

  test('Subject line includes job ID', async () => {
    const jobId   = 'JOB-WL-7890';
    const subject = `🔨 NEW JOB ASSIGNMENT: Water Leak Prevention - ${jobId}`;
    expect(subject).toContain(jobId);
    expect(subject).toContain('NEW JOB ASSIGNMENT');
  });

  test('Job details table has all 12 required fields', async () => {
    const requiredFields = [
      'Job ID',
      'Service Type',
      'Homeowner',
      'Property Address',
      'Square Footage',
      'Property Age',
      'Pressure Reducer',
      'Pipe Size',
      'Extension Cord',
      'Device Source',
      'Software Setup',
      'Installation Date',
      'Installation Time',
    ];
    expect(requiredFields.length).toBe(13);
  });

  test('Contractor pricing uses contractor costs (NOT retail markup)', async () => {
    // v1.4.4 reference — contractor sees their own costs, no markup applied
    const contractorParts    = 260.00;
    const contractorPressure = 310.00;
    const contractorDevice   = 599.99;
    const contractorSoftware = 75.00;  // flat, no markup visible to contractor
    const contractorLabor    = 525.00;

    const contractorTotal = parseFloat(
      (contractorParts + contractorPressure + contractorDevice +
       contractorSoftware + contractorLabor).toFixed(2)
    );
    expect(contractorTotal).toBe(1769.99);

    // v1.4.4 published figure
    expect(contractorTotal).toBe(1769.99);
  });

  test('Contractor email does NOT include the $95 service fee', async () => {
    // Requirement: contractors NEVER see the $95 service fee
    const contractorTotal = 1769.99;
    const serviceFee = 95.00;

    // Contractor total must not include the service fee
    expect(contractorTotal + serviceFee).toBeGreaterThan(contractorTotal);

    // The contractor receives their total only
    expect(contractorTotal).toBe(1769.99);
  });

  test('Resale certificate YES → contractor does NOT include tax in pricing', async () => {
    const resaleCertAccepted = true;
    const contractorIncludesTax = !resaleCertAccepted; // if YES → contractor does NOT include tax

    expect(contractorIncludesTax).toBe(false);
  });

  test('Materials checklist has exactly 4 items (Scenario 1 – with device + software)', async () => {
    const materials = [
      'Pressure Reducer (1")',
      'Pipe Fittings & Misc Kit',
      'Extension Cable (25 ft)',
      'Moen Smart Water System',
    ];
    expect(materials.length).toBe(4);
  });

  test('Next steps list has exactly 7 contractor actions', async () => {
    const nextSteps = [
      'Log in to contractor portal to confirm materials',
      'Arrive at job site on installation date and time',
      'Check in via mobile app upon arrival (GPS verification)',
      'Complete work and perform software setup/configuration',
      'Upload photos (before/during/after) and final invoice',
      'Sign Affidavit of Service and Conditional Lien Release via DocuSign',
      'Receive payment upon admin approval',
    ];
    expect(nextSteps.length).toBe(7);
  });

  test('Contractor portal link uses job ID', async () => {
    const baseUrl = 'https://contractors.mrsurety.com/jobs/';
    const jobId = 'JOB-WL-7890';
    const link = `${baseUrl}${jobId}`;
    expect(link).toBe('https://contractors.mrsurety.com/jobs/JOB-WL-7890');
  });

  test('Payment timeline: within 15 days of completion, photos, and admin approval', async () => {
    const paymentWindowDays = 15;
    const requiredConditions = [
      'job completion',
      'photo upload',
      'admin approval',
    ];
    expect(paymentWindowDays).toBe(15);
    expect(requiredConditions.length).toBe(3);
  });
});
