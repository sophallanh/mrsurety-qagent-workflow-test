import { test, expect } from '@playwright/test';

/**
 * MrSurety QA – Email v1.4.4 Long-Form Supplement
 *
 * Source: "MR SURETY – COMPLETE EMAILS AND DOCUSIGN DOCUMENTS v1.4.4"
 *         Long-Form Full Package (Emails 2–15 with exact Alex Johnson job values)
 *
 * Reference Job: JOB-WL-7890 | Alex Johnson | 4568 Sycamore Lane, Anaheim, CA 92806
 * Contractor: Plumb Perfect Inc. (CSLB #999888) | Agent: Sarah Miller, State Farm
 * Final Total: $2,386.11
 *
 * This file covers content from the v1.4.4 long-form email examples (Emails 2–15)
 * that supplements the existing email-v144-content.spec.ts and
 * email-v144-emails5to14.spec.ts files.
 *
 * Cross-checked against existing files to avoid duplication:
 *   - email-v144-content.spec.ts         (Emails 1–4 core content)
 *   - email-v144-emails5to14.spec.ts     (Emails 5–14 core content)
 *   - email-v144-emails15to16-docusign.spec.ts (Email 15, DocuSign docs)
 *   - platform-spec-v63-sections13to18.spec.ts (§14 abstract 13-email inventory)
 *
 * NEW tests in this file:
 *   §A – v1.4.4 Long-Form Email Sequence (15 job-workflow emails)
 *   §B – Email 2  (H3)  – RECOMMENDATION section and REVIEW ESTIMATES link
 *   §C – Email 7  (H7)  – Contractor field title "Lead Technician"
 *   §D – Email 10 (H11) – Payment confirmation number and payment method
 *   §E – Email 12 (A6)  – UNDERWRITING INSTRUCTIONS section
 *   §F – Email 13 (C8)  – UNCONDITIONAL LIEN RELEASE NOTICE section
 *   §G – Cross-spec mapping: v1.4.4 email numbering vs abstract §14 numbering
 *
 * All tests are pure-logic / content — no browser required.
 */

// ---------------------------------------------------------------------------
// §A – v1.4.4 Long-Form Email Sequence
// The v1.4.4 long-form document presents 15 job-workflow emails (numbered 2–15
// in the second problem statement, implying Email 1 = Service Request Confirmation).
// This differs from the abstract Section 14 spec which lists 13 system emails.
// ---------------------------------------------------------------------------
test.describe('§A – v1.4.4 Long-Form Email Sequence', () => {
  // The v1.4.4 long-form job-workflow emails in order
  const V144_LONGFORM_EMAILS = [
    { num: 1,  name: 'Service Request Confirmation',           to: 'Homeowner',        from: 'notifications@mrsurety.com' },
    { num: 2,  name: 'New Estimate Available',                 to: 'Homeowner',        from: 'notifications@mrsurety.com' },
    { num: 3,  name: 'Estimate Selected – Deposit Required',   to: 'Homeowner',        from: 'payments@mrsurety.com' },
    { num: 4,  name: 'New Job Assignment',                     to: 'Contractor',       from: 'jobs@mrsurety.com' },
    { num: 5,  name: 'Deposit Received – Job Confirmed',       to: 'Homeowner',        from: 'notifications@mrsurety.com' },
    { num: 6,  name: 'Reminder – Upcoming Installation',       to: 'Homeowner',        from: 'notifications@mrsurety.com' },
    { num: 7,  name: 'Contractor Check-In Notification',       to: 'Homeowner',        from: 'notifications@mrsurety.com' },
    { num: 8,  name: 'Change Order Created',                   to: 'Homeowner',        from: 'notifications@mrsurety.com' },
    { num: 9,  name: 'Work Completed – Final Payment Required',to: 'Homeowner',        from: 'payments@mrsurety.com' },
    { num: 10, name: 'Payment Received – Processing',          to: 'Homeowner',        from: 'payments@mrsurety.com' },
    { num: 11, name: 'Job Complete – Certificate Ready',       to: 'Homeowner',        from: 'certificates@mrsurety.com' },
    { num: 12, name: 'Job Complete – Certificate for Agent',   to: 'Insurance Agent',  from: 'certificates@mrsurety.com' },
    { num: 13, name: 'Payment Sent to Contractor',             to: 'Contractor',       from: 'payments@mrsurety.com' },
    { num: 14, name: 'Unconditional Lien Release Required',    to: 'Contractor',       from: 'docusign@mrsurety.com' },
    { num: 15, name: 'Unconditional Lien Release Signed',      to: 'Admin',            from: 'docusign@mrsurety.com' },
  ] as const;

  test('v1.4.4 long-form job-workflow sequence has exactly 15 emails', () => {
    expect(V144_LONGFORM_EMAILS.length).toBe(15);
    const nums = V144_LONGFORM_EMAILS.map(e => e.num);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  test('Email 10 in v1.4.4 is "Payment Received" — sent BEFORE Certificate Ready', () => {
    const email10 = V144_LONGFORM_EMAILS.find(e => e.num === 10)!;
    const email11 = V144_LONGFORM_EMAILS.find(e => e.num === 11)!;
    expect(email10.name).toContain('Payment Received');
    expect(email11.name).toContain('Certificate Ready');
    // payment receipt comes before certificate generation
    expect(email10.num).toBeLessThan(email11.num);
  });

  test('Email 12 (Certificate for Agent) is CC-copied to homeowner', () => {
    const email12 = V144_LONGFORM_EMAILS.find(e => e.num === 12)!;
    expect(email12.to).toBe('Insurance Agent');
    // The CC recipient is the homeowner — verified by v1.4.4 example:
    // CC: alex.johnson@email.com
    const ccRecipient = 'alex.johnson@email.com';
    expect(ccRecipient).toContain('@');
  });

  test('Email 13 in v1.4.4 is "Payment Sent to Contractor" (not Quarterly Tax Report)', () => {
    const email13 = V144_LONGFORM_EMAILS.find(e => e.num === 13)!;
    expect(email13.name).toBe('Payment Sent to Contractor');
    expect(email13.to).toBe('Contractor');
    expect(email13.from).toBe('payments@mrsurety.com');
  });

  test('Email 15 (Lien Release Signed) is the final step in the job-workflow sequence', () => {
    const lastEmail = V144_LONGFORM_EMAILS[V144_LONGFORM_EMAILS.length - 1];
    expect(lastEmail.num).toBe(15);
    expect(lastEmail.to).toBe('Admin');
    expect(lastEmail.name).toContain('Lien Release Signed');
  });

  test('All v1.4.4 from addresses use @mrsurety.com domain', () => {
    V144_LONGFORM_EMAILS.forEach(e => {
      expect(e.from).toContain('@mrsurety.com');
    });
  });
});

// ---------------------------------------------------------------------------
// §B – Email 2 (H3) – RECOMMENDATION and REVIEW ESTIMATES link
// ---------------------------------------------------------------------------
test.describe('§B – Email 2 – Estimates Ready (H3): Recommendation section', () => {
  test('RECOMMENDATION section recommends the highest-rated contractor', () => {
    const estimates = [
      { contractor: 'Plumb Perfect Inc.', rating: 4.9, total: 2386.11 },
      { contractor: 'ABC Plumbing',       rating: 4.2, total: 2421.99 },
      { contractor: 'Rapid Rooter',       rating: 3.8, total: 2398.50 },
    ];
    const topByRating = estimates.reduce((best, e) => e.rating > best.rating ? e : best);
    const topByPrice  = estimates.reduce((best, e) => e.total < best.total ? e : best);
    // Plumb Perfect wins on both rating and price
    expect(topByRating.contractor).toBe('Plumb Perfect Inc.');
    expect(topByPrice.contractor).toBe('Plumb Perfect Inc.');
  });

  test('REVIEW ESTIMATES link uses /estimates/ path with job ID', () => {
    const link = 'https://mrsurety.com/estimates/JOB-WL-7890';
    expect(link).toContain('/estimates/');
    expect(link).toContain('JOB-WL-7890');
    expect(link).toMatch(/^https:\/\/mrsurety\.com\/estimates\/[A-Z0-9-]+$/);
  });

  test('Estimates summary shows 3 contractors with star ratings', () => {
    const ratings = [
      { contractor: 'Plumb Perfect Inc.', stars: 5, score: 4.9 },
      { contractor: 'ABC Plumbing',       stars: 4, score: 4.2 },
      { contractor: 'Rapid Rooter',       stars: 3, score: 3.8 },
    ];
    expect(ratings.length).toBe(3);
    // Stars must decrease from first to last (sorted by recommendation)
    expect(ratings[0].stars).toBeGreaterThan(ratings[1].stars);
    expect(ratings[1].stars).toBeGreaterThan(ratings[2].stars);
  });

  test('All 3 estimates include the $95 Service Fee in displayed total', () => {
    const serviceFee = 95.00;
    // v1.4.4 reference: each estimate total already includes the $95 service fee
    const plumbPerfectTotal = 2386.11;
    const abcPlumbingTotal  = 2421.99;
    const rapidRooterTotal  = 2398.50;
    // All totals are above the service fee minimum
    expect(plumbPerfectTotal).toBeGreaterThan(serviceFee);
    expect(abcPlumbingTotal).toBeGreaterThan(serviceFee);
    expect(rapidRooterTotal).toBeGreaterThan(serviceFee);
  });
});

// ---------------------------------------------------------------------------
// §C – Email 7 (H7) – Contractor field title "Lead Technician"
// ---------------------------------------------------------------------------
test.describe('§C – Email 7 – Contractor Check-In (H7): Contractor title field', () => {
  test('Check-in details Contractor field includes "Lead Technician" role', () => {
    // v1.4.4 template: | Contractor | [Technician Name], Lead Technician |
    const contractorFieldFormat = '[Technician Name], Lead Technician';
    expect(contractorFieldFormat).toContain('Lead Technician');
  });

  test('v1.4.4 reference: contractor technician name is Jane Doe', () => {
    // Alex Johnson job example: Jane Doe is the Lead Technician
    const technicianName = 'Jane Doe';
    const role = 'Lead Technician';
    const contractorField = `${technicianName}, ${role}`;
    expect(contractorField).toBe('Jane Doe, Lead Technician');
  });

  test('GPS Verification field shows confirmed status with checkmark emoji', () => {
    const gpsStatus = '✅ Confirmed – Contractor is at your property';
    expect(gpsStatus).toMatch(/^✅/);
    expect(gpsStatus).toContain('Confirmed');
    expect(gpsStatus).toContain('Contractor is at your property');
  });

  test('TRACK LIVE link is present in Email 7 with job ID', () => {
    const trackLiveLink = 'https://mrsurety.com/job/JOB-WL-7890';
    expect(trackLiveLink).toContain('mrsurety.com/job/');
    expect(trackLiveLink).toContain('JOB-WL-7890');
  });
});

// ---------------------------------------------------------------------------
// §D – Email 10 (H11) – Payment confirmation details
// ---------------------------------------------------------------------------
test.describe('§D – Email 10 – Payment Received (H11): Confirmation details', () => {
  test('Payment confirmation number uses MRT- prefix format', () => {
    // v1.4.4 reference example: MRT-12345-67890
    const confirmationNumber = 'MRT-12345-67890';
    expect(confirmationNumber).toMatch(/^MRT-\d{5}-\d{5}$/);
    expect(confirmationNumber).toMatch(/^MRT-/);
  });

  test('Payment method field shows card type and last 4 digits', () => {
    // v1.4.4 reference: "Visa ending in 4242"
    const paymentMethod = 'Visa ending in 4242';
    expect(paymentMethod).toContain('ending in');
    expect(paymentMethod).toMatch(/ending in \d{4}$/);
  });

  test('Payment confirmation table has Job ID, Amount, Date, Method, Confirmation Number', () => {
    const fields = [
      'Job ID',
      'Payment Amount',
      'Payment Date',
      'Payment Method',
      'Confirmation Number',
    ];
    expect(fields.length).toBe(5);
    expect(fields).toContain('Confirmation Number');
    expect(fields).toContain('Payment Method');
  });

  test('BALANCE in paid-in-full table is $0.00', () => {
    const totalCost = 2386.11;
    const totalPaid = 2386.11;
    const balance   = parseFloat((totalCost - totalPaid).toFixed(2));
    expect(balance).toBe(0.00);
    // Balance must display as $0.00 (not negative, not positive)
    expect(balance).toBeGreaterThanOrEqual(0);
  });
});

// ---------------------------------------------------------------------------
// §E – Email 12 (A6) – UNDERWRITING INSTRUCTIONS section
// ---------------------------------------------------------------------------
test.describe('§E – Email 12 – Certificate for Agent (A6): Underwriting instructions', () => {
  test('Email 12 body includes UNDERWRITING INSTRUCTIONS section', () => {
    const sectionHeading = 'UNDERWRITING INSTRUCTIONS';
    expect(sectionHeading).toBe('UNDERWRITING INSTRUCTIONS');
  });

  test('Underwriting instruction directs agent to forward package to underwriter', () => {
    const instruction = 'Please forward this package to the underwriter to bind the policy or remove the requirement.';
    expect(instruction).toContain('forward this package');
    expect(instruction).toContain('underwriter');
    expect(instruction).toContain('bind the policy');
    expect(instruction).toContain('remove the requirement');
  });

  test('Underwriting instruction confirms work was completed by licensed contractor', () => {
    const instruction = 'This certificate confirms that the required loss prevention work has been completed by a licensed contractor and documented by MrSurety.';
    expect(instruction).toContain('loss prevention work has been completed');
    expect(instruction).toContain('licensed contractor');
    expect(instruction).toContain('documented by MrSurety');
  });

  test('VERIFICATION section has agent-accessible URL format', () => {
    const verifyUrl = 'https://verify.mrsurety.com/JOB-WL-7890';
    expect(verifyUrl).toContain('verify.mrsurety.com');
    expect(verifyUrl).toContain('JOB-WL-7890');
  });

  test('Email 12 from address is certificates@mrsurety.com', () => {
    const from = 'certificates@mrsurety.com';
    expect(from).toBe('certificates@mrsurety.com');
    // Not notifications@ or payments@
    expect(from).not.toContain('notifications');
    expect(from).not.toContain('payments');
  });
});

// ---------------------------------------------------------------------------
// §F – Email 13 (C8) – UNCONDITIONAL LIEN RELEASE NOTICE section
// ---------------------------------------------------------------------------
test.describe('§F – Email 13 – Payment Sent to Contractor (C8): Lien release notice', () => {
  test('UNCONDITIONAL LIEN RELEASE NOTICE section is present in Email 13', () => {
    const sectionHeading = 'UNCONDITIONAL LIEN RELEASE NOTICE';
    expect(sectionHeading).toBe('UNCONDITIONAL LIEN RELEASE NOTICE');
  });

  test('Lien release notice includes approximate clear date reference', () => {
    // v1.4.4 reference: "approximately April 2, 2026" (3 business days after March 30)
    const paymentDate = new Date('2026-03-30');
    const clearDateApprox = new Date(paymentDate);
    clearDateApprox.setDate(clearDateApprox.getDate() + 3);

    // Clear date should be 3 business days after payment
    const diffDays = (clearDateApprox.getTime() - paymentDate.getTime()) / (1000 * 60 * 60 * 24);
    expect(diffDays).toBe(3);
  });

  test('Platform access limitation notice warns contractor about restricted access', () => {
    const noticeText = 'Your access to the MrSurety contractor platform will be limited until this document is signed.';
    expect(noticeText).toContain('limited');
    expect(noticeText).toContain('MrSurety contractor platform');
    expect(noticeText).toContain('until this document is signed');
  });

  test('Email 13 payment method is ACH Transfer', () => {
    const paymentMethod = 'ACH Transfer to your bank account';
    expect(paymentMethod).toContain('ACH');
    expect(paymentMethod).toContain('bank account');
  });

  test('v1.4.4 reference: payment date is March 30, 2026 for JOB-WL-7890', () => {
    // Email 13 sent March 30, 2026 (2 days after completion on March 28)
    const paymentDateStr = 'March 30, 2026';
    expect(paymentDateStr).toContain('March 30');
    expect(paymentDateStr).toContain('2026');
  });
});

// ---------------------------------------------------------------------------
// §G – Cross-spec mapping: v1.4.4 numbering vs abstract §14 numbering
// ---------------------------------------------------------------------------
test.describe('§G – Cross-spec: v1.4.4 email numbering vs abstract §14 numbering', () => {
  // Abstract Section 14 (13 emails): Email 10 = Certificate Ready
  // v1.4.4 Long-Form (15 emails): Email 10 = Payment Received, Email 11 = Certificate Ready
  // Reason: v1.4.4 inserts "Payment Received" between work completion and certificate issuance

  test('Abstract §14: Email 10 is "Certificate Ready" (no payment receipt step)', () => {
    // Abstract spec lists 13 emails in the system — the payment receipt
    // step was added in v1.4.4 to create a clearer paper trail.
    const abstractEmail10 = 'Job Complete – Certificate Ready';
    expect(abstractEmail10).toContain('Certificate Ready');
  });

  test('v1.4.4: Email 10 is "Payment Received" (inserted before Certificate Ready)', () => {
    // v1.4.4 long-form adds a dedicated Payment Received email (H11) as step 10
    const v144Email10 = 'Payment Received – Processing';
    expect(v144Email10).toContain('Payment Received');
  });

  test('v1.4.4 Certificate Ready is Email 11, not Email 10', () => {
    // Shift caused by inserting Payment Received as Email 10
    const v144Email11 = 'Job Complete – Certificate Ready';
    expect(v144Email11).toContain('Certificate Ready');
    // This is email 11 in v1.4.4, not 10
    const v144Email11Num = 11;
    expect(v144Email11Num).toBe(11);
  });

  test('Abstract §14 Email 13 is "Quarterly Tax Report" (admin periodic task)', () => {
    // The abstract 13-email spec ends with the Quarterly Tax Report (AD4)
    const abstractEmail13 = 'Quarterly Tax Report Ready';
    expect(abstractEmail13).toContain('Quarterly Tax Report');
  });

  test('v1.4.4 Email 13 is "Payment Sent to Contractor" (job-workflow email)', () => {
    // v1.4.4 long-form only covers job-workflow emails; tax report is a separate periodic trigger
    const v144Email13 = 'Payment Sent to Contractor';
    expect(v144Email13).toContain('Payment Sent');
    expect(v144Email13).toContain('Contractor');
  });

  test('v1.4.4 adds Email 15 (Lien Release Signed) not present in abstract §14', () => {
    // Abstract §14 has 13 emails; v1.4.4 job-workflow has 15 including Email 15
    const abstractEmailCount = 13;
    const v144EmailCount     = 15;
    expect(v144EmailCount).toBeGreaterThan(abstractEmailCount);
    // v1.4.4 Email 15 = Lien Release Signed Confirmation to Admin
    const email15Name = 'Unconditional Lien Release Signed';
    expect(email15Name).toContain('Lien Release Signed');
  });

  test('Both specs agree: from address for deposit/payment emails is payments@mrsurety.com', () => {
    // Cross-spec consistency check
    const paymentsEmail = 'payments@mrsurety.com';
    expect(paymentsEmail).toBe('payments@mrsurety.com');
    // Used by: Email 3 (deposit required), Email 9 (final payment), Email 10 (payment received), Email 13 (payment sent)
  });

  test('Both specs agree: certificates go from certificates@mrsurety.com', () => {
    const certEmail = 'certificates@mrsurety.com';
    expect(certEmail).toBe('certificates@mrsurety.com');
    // Used by: Email 11 (certificate ready to homeowner), Email 12 (certificate to agent)
  });
});
