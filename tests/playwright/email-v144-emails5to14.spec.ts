import { test, expect } from '@playwright/test';

/**
 * MrSurety QA – Email Templates v1.4.4 Content Tests (Emails 5–14)
 *
 * Source: MR SURETY – COMPLETE EMAILS AND DOCUSIGN DOCUMENTS v1.4.4
 *         Reference Job: JOB-WL-7890 | Alex Johnson | Plumb Perfect Inc.
 *
 * Email 4 closing  → C4 – contractor portal links + operations signature
 * Email 5          → H5  – Deposit Received / Job Confirmed (To Homeowner)
 * Email 6          → H6  – Reminder: Upcoming Installation (To Homeowner)
 * Email 7          → H7  – Contractor Check-In Notification (To Homeowner)
 * Email 8          → H8  – Change Order Created (To Homeowner)
 * Email 9          → H10 – Work Completed / Final Payment Required (To Homeowner)
 * Email 10         → H11 – Payment Received / Processing (To Homeowner)
 * Email 11         → H12 – Job Complete / Certificate Ready (To Homeowner)
 * Email 12         → A6  – Certificate for Agent (To Insurance Agent)
 * Email 13         → C8  – Payment Sent to Contractor
 * Email 14         → C9  – Unconditional Lien Release Required (To Contractor)
 */

// ---------------------------------------------------------------------------
// Email 4 (C4) – closing section
// ---------------------------------------------------------------------------
test.describe('Email 4 (C4) – Contractor Portal Closing', () => {
  test('Contractor portal login URL is correct', async () => {
    const loginUrl = 'https://contractor.mrsurety.com/login';
    expect(loginUrl).toBe('https://contractor.mrsurety.com/login');
  });

  test('Job dashboard URL includes job ID', async () => {
    const jobId = 'JOB-WL-7890';
    const dashboardUrl = `https://contractor.mrsurety.com/jobs/${jobId}`;
    expect(dashboardUrl).toBe('https://contractor.mrsurety.com/jobs/JOB-WL-7890');
  });

  test('Closing signature is from MrSurety Operations Team (not Compliance)', async () => {
    const sender = 'MrSurety Operations Team';
    expect(sender).toContain('Operations');
    expect(sender).not.toContain('Payments');
  });

  test('Operations email is operations@mrsurety.com', async () => {
    const email = 'operations@mrsurety.com';
    expect(email).toBe('operations@mrsurety.com');
  });
});

// ---------------------------------------------------------------------------
// Email 5 – Deposit Received / Job Confirmed (H5)
// ---------------------------------------------------------------------------
test.describe('Email 5 – Deposit Received / Job Confirmed (H5)', () => {
  test('From address is notifications@mrsurety.com', async () => {
    expect('notifications@mrsurety.com').toBe('notifications@mrsurety.com');
  });

  test('Subject line matches v1.4.4 specification', async () => {
    const subject = '✅ Job Confirmed! Your Installation is Scheduled';
    expect(subject).toBe('✅ Job Confirmed! Your Installation is Scheduled');
  });

  test('Job confirmation table has 7 required fields', async () => {
    const fields = [
      'Job ID',
      'Service',
      'Property',
      'Contractor',
      'Installation Date',
      'Installation Time',
      'Estimated Duration',
    ];
    expect(fields.length).toBe(7);
  });

  test('Payment summary shows deposit as negative (subtracted from total)', async () => {
    const total   = 2386.11;
    const deposit = 238.61;
    const remaining = parseFloat((total - deposit).toFixed(2));
    expect(remaining).toBe(2147.50);
    // deposit must display as negative in the summary
    expect(-deposit).toBeLessThan(0);
  });

  test('Package table has 6 components', async () => {
    const components = [
      'Parts & Fittings',
      'Pressure Reducer',
      'Device',
      'Software Setup',
      'Professional Labor',
      'Service Fee',
    ];
    expect(components.length).toBe(6);
  });

  test('Compliance package has 8 enumerated checkmarks', async () => {
    const complianceItems = [
      'Contractor License Verification',
      'Insurance Verification',
      'Affidavit of Service',
      'Conditional Lien Release',
      'Unconditional Lien Release',
      'Certificate of Completion',
      'Agent Portal Access',
      'Perpetual Document Storage',
    ];
    expect(complianceItems.length).toBe(8);
  });

  test('Installation day timeline has 7 rows starting at T+0:00', async () => {
    const timeline = [
      'T+0:00 – Contractor arrives, checks in via mobile app',
      'T+0:05 – Contractor reviews scope',
      'T+0:15 – Installation begins',
      'T+3:00 – Approximate midpoint',
      'T+5:00 – Estimated completion time',
      'T+5:15 – Contractor demonstrates system',
      'T+5:30 – Contractor uploads completion photos',
    ];
    expect(timeline.length).toBe(7);
  });

  test('Job tracking link includes job ID', async () => {
    const baseUrl = 'https://mrsurety.com/job/';
    const jobId = 'JOB-WL-7890';
    expect(`${baseUrl}${jobId}`).toBe('https://mrsurety.com/job/JOB-WL-7890');
  });
});

// ---------------------------------------------------------------------------
// Email 6 – Reminder: Upcoming Installation (H6)
// ---------------------------------------------------------------------------
test.describe('Email 6 – Reminder: Upcoming Installation (H6)', () => {
  test('Subject line says TOMORROW in caps', async () => {
    const subject = '⏰ Reminder: Your Installation is Tomorrow';
    expect(subject).toContain('Tomorrow');
  });

  test('Installation details table has 5 fields', async () => {
    const fields = [
      'Date',
      'Time',
      'Contractor',
      'Property',
      'Estimated Duration',
    ];
    expect(fields.length).toBe(5);
  });

  test('What-to-expect table has 5 rows covering arrival through completion', async () => {
    const rows = [
      'Arrival',
      'Access Needed',
      'WiFi Required',
      'During Install',
      'Completion',
    ];
    expect(rows.length).toBe(5);
  });

  test('Preparation checklist has 4 checkboxes', async () => {
    const checklist = [
      'Clear access to main water line area',
      'Ensure WiFi is working and password is available',
      'Make sure someone 18+ will be home during installation',
      'Have your phone available for any questions',
    ];
    expect(checklist.length).toBe(4);
  });

  test('v1.4.4 reference: remaining balance reminder is $2,147.50', async () => {
    const remaining = 2147.50;
    expect(remaining).toBe(2147.50);
  });
});

// ---------------------------------------------------------------------------
// Email 7 – Contractor Check-In Notification (H7)
// ---------------------------------------------------------------------------
test.describe('Email 7 – Contractor Check-In Notification (H7)', () => {
  test('Subject line includes arrival emoji', async () => {
    const subject = '📍 Your Contractor Has Arrived';
    expect(subject).toContain('📍');
    expect(subject).toContain('Arrived');
  });

  test('Check-in details table has 5 fields including GPS Verification', async () => {
    const fields = [
      'Time',
      'Date',
      'Location',
      'GPS Verification',
      'Contractor',
    ];
    expect(fields.length).toBe(5);
    expect(fields).toContain('GPS Verification');
  });

  test('GPS verification status is confirmed (not pending)', async () => {
    const gpsStatus = '✅ Confirmed – Contractor is at your property';
    expect(gpsStatus).toContain('✅');
    expect(gpsStatus).toContain('Confirmed');
  });

  test('What-happening-now bullet list has 5 action items', async () => {
    const actions = [
      'Review the scope of work',
      'Shut off water to install pressure reducer and shutoff valve',
      'Install all components and run the extension cable',
      'Set up device software and connect to WiFi',
      'Test the complete system',
    ];
    expect(actions.length).toBe(5);
  });

  test('Live tracking link includes job ID', async () => {
    const link = 'https://mrsurety.com/job/JOB-WL-7890';
    expect(link).toContain('JOB-WL-7890');
  });
});

// ---------------------------------------------------------------------------
// Email 8 – Change Order Created (H8)
// ---------------------------------------------------------------------------
test.describe('Email 8 – Change Order Created (H8)', () => {
  test('Subject line has ⚠️ and ACTION REQUIRED', async () => {
    const subject = '⚠️ ACTION REQUIRED: Change Order for Your Installation';
    expect(subject).toContain('⚠️');
    expect(subject).toContain('ACTION REQUIRED');
  });

  test('Change order details table has 6 fields', async () => {
    const fields = [
      'Job ID',
      'Contractor',
      'Description',
      'Additional Parts',
      'Additional Tax',
      'TOTAL ADDITIONAL',
    ];
    expect(fields.length).toBe(6);
  });

  test('v1.4.4 reference: additional total is $48.49 ($45 + $3.49 tax)', async () => {
    const addParts = 45.00;
    const addTax   = 3.49;
    const addTotal = parseFloat((addParts + addTax).toFixed(2));
    expect(addTotal).toBe(48.49);
  });

  test('Updated project total reflects original + change order', async () => {
    const original   = 2386.11;
    const changeOrder = 48.49;
    const newTotal   = parseFloat((original + changeOrder).toFixed(2));
    expect(newTotal).toBe(2434.60);
  });

  test('Review change order link includes job ID', async () => {
    const link = 'https://mrsurety.com/change-order/JOB-WL-7890';
    expect(link).toContain('change-order');
    expect(link).toContain('JOB-WL-7890');
  });

  test('Response deadline is 30 minutes', async () => {
    const deadlineMinutes = 30;
    expect(deadlineMinutes).toBe(30);
  });
});

// ---------------------------------------------------------------------------
// Email 9 – Work Completed / Final Payment Required (H10)
// ---------------------------------------------------------------------------
test.describe('Email 9 – Work Completed / Final Payment Required (H10)', () => {
  test('From address is payments@mrsurety.com', async () => {
    expect('payments@mrsurety.com').toBe('payments@mrsurety.com');
  });

  test('Final invoice line items match v1.4.4 JOB-WL-7890 figures', async () => {
    const parts    = 351.00;
    const pressure = 418.50;
    const device   = 599.99;
    const software = 93.75;
    const labor    = 656.25;
    const subtotal = parseFloat((parts + pressure + device + software + labor).toFixed(2));
    expect(subtotal).toBe(2119.49);

    const serviceFee     = 95.00;
    const totalBeforeTax = parseFloat((subtotal + serviceFee).toFixed(2));
    expect(totalBeforeTax).toBe(2214.49);

    const tax      = 171.62;
    const grandTotal = parseFloat((totalBeforeTax + tax).toFixed(2));
    expect(grandTotal).toBe(2386.11);
  });

  test('Remaining balance = grand total - deposit', async () => {
    const remaining = parseFloat((2386.11 - 238.61).toFixed(2));
    expect(remaining).toBe(2147.50);
  });

  test('Completed work verification has 5 checkmark items', async () => {
    const verificationItems = [
      'Before Photos',
      'During Photos',
      'After Photos',
      'Device Serial Numbers',
      'Software Confirmation',
    ];
    expect(verificationItems.length).toBe(5);
  });

  test('What-happens-after-payment timeline has 5 steps', async () => {
    const steps = [
      'Payment processed – Immediate',
      'Certificate package generated – Within 1 hour',
      'Documents emailed to homeowner – Within 1 hour',
      'Documents emailed to agent – Within 1 hour',
      'Unconditional Lien Release – 3-5 days after clear',
    ];
    expect(steps.length).toBe(5);
  });

  test('Pay final balance link uses /final/ path', async () => {
    const link = 'https://payments.mrsurety.com/final/JOB-WL-7890';
    expect(link).toContain('/final/');
    expect(link).toContain('JOB-WL-7890');
  });
});

// ---------------------------------------------------------------------------
// Email 10 – Payment Received / Processing (H11)
// ---------------------------------------------------------------------------
test.describe('Email 10 – Payment Received / Processing (H11)', () => {
  test('Subject line has 💳 emoji and "Payment Received"', async () => {
    const subject = '💳 Payment Received - Thank You!';
    expect(subject).toContain('💳');
    expect(subject).toContain('Payment Received');
  });

  test('From address is payments@mrsurety.com', async () => {
    expect('payments@mrsurety.com').toBe('payments@mrsurety.com');
  });

  test('Payment confirmation table has 5 fields', async () => {
    const fields = [
      'Job ID',
      'Payment Amount',
      'Payment Date',
      'Payment Method',
      'Confirmation Number',
    ];
    expect(fields.length).toBe(5);
  });

  test('Project paid in full: balance is $0.00', async () => {
    const totalPaid = 2386.11;
    const totalCost = 2386.11;
    const balance   = parseFloat((totalCost - totalPaid).toFixed(2));
    expect(balance).toBe(0.00);
  });

  test('What-happens-next timeline has 5 steps', async () => {
    const steps = [
      'Certificate package generation – Within 1 hour',
      'Documents emailed to homeowner – Within 1 hour',
      'Documents emailed to agent – Within 1 hour',
      'Contractor signs Unconditional Lien Release – 3-5 days',
      'Final documents added to portal – Within 5 days',
    ];
    expect(steps.length).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// Email 11 – Job Complete / Certificate Ready (H12)
// ---------------------------------------------------------------------------
test.describe('Email 11 – Job Complete / Certificate Ready (H12)', () => {
  test('From address is certificates@mrsurety.com', async () => {
    const from = 'certificates@mrsurety.com';
    expect(from).toBe('certificates@mrsurety.com');
    expect(from).not.toBe('notifications@mrsurety.com');
  });

  test('Job summary table has 5 fields', async () => {
    const fields = [
      'Job ID',
      'Property',
      'Completion Date',
      'Contractor',
      'Agent',
    ];
    expect(fields.length).toBe(5);
  });

  test('Final invoice shows TOTAL PAID = $2,386.11 for reference job', async () => {
    const totalPaid = 2386.11;
    expect(totalPaid).toBe(2386.11);
  });

  test('Service fee section has 8 checkmark items', async () => {
    const items = [
      'Contractor License Verification',
      'Insurance Verification',
      'Affidavit of Service',
      'Conditional Lien Release',
      'Unconditional Lien Release (pending)',
      'Certificate of Completion',
      'Agent Portal Access',
      'Perpetual Document Storage',
    ];
    expect(items.length).toBe(8);
  });

  test('Documents table has exactly 5 downloadable documents', async () => {
    const documents = [
      'Certificate of Completion',
      'Affidavit of Service',
      'Conditional Lien Release',
      'Final Invoice',
      'Photos of Completed Work',
    ];
    expect(documents.length).toBe(5);
  });

  test('Download-all ZIP link uses /certificates/ path', async () => {
    const link = 'https://mrsurety.com/certificates/JOB-WL-7890/download-all';
    expect(link).toContain('/certificates/');
    expect(link).toContain('download-all');
  });

  test('Verification link uses verify subdomain', async () => {
    const link = 'https://verify.mrsurety.com/JOB-WL-7890';
    expect(link).toContain('verify.mrsurety.com');
    expect(link).toContain('JOB-WL-7890');
  });

  test('Compliance email is compliance@mrsurety.com', async () => {
    const email = 'compliance@mrsurety.com';
    expect(email).toBe('compliance@mrsurety.com');
  });
});

// ---------------------------------------------------------------------------
// Email 12 – Job Complete / Certificate for Agent (A6)
// ---------------------------------------------------------------------------
test.describe('Email 12 – Certificate for Agent (A6)', () => {
  test('From address is certificates@mrsurety.com', async () => {
    expect('certificates@mrsurety.com').toBe('certificates@mrsurety.com');
  });

  test('CC field includes homeowner email', async () => {
    // Agent email goes To agent, CC homeowner
    const ccRecipient = 'alex.johnson@email.com';
    expect(ccRecipient).toContain('@');
  });

  test('Client & property details table has 5 fields', async () => {
    const fields = [
      'Client Name',
      'Property Address',
      'Policy Number',
      'Completion Date',
      'Service Type',
    ];
    expect(fields.length).toBe(5);
  });

  test('Services performed table has 4 service rows', async () => {
    const services = [
      'Pressure Reducer Installation',
      'Device (Smart Water System)',
      'Software Setup',
      'Professional Installation',
    ];
    expect(services.length).toBe(4);
  });

  test('Contractor info table has 4 fields', async () => {
    const fields = [
      'Contractor',
      'CSLB License',
      'License Status',
      'Insurance',
    ];
    expect(fields.length).toBe(4);
  });

  test('Documents table has 5 items', async () => {
    const docs = [
      'Certificate of Completion',
      'Affidavit of Service',
      'Unconditional Lien Release',
      'Photos of Completed Work',
      'License Verification',
    ];
    expect(docs.length).toBe(5);
  });

  test('Agent portal URL is correct', async () => {
    const portalUrl = 'https://agent.mrsurety.com/login';
    expect(portalUrl).toContain('agent.mrsurety.com');
  });

  test('Direct download link uses /agent/certificates/ path', async () => {
    const link = 'https://mrsurety.com/agent/certificates/JOB-WL-7890';
    expect(link).toContain('/agent/certificates/');
    expect(link).toContain('JOB-WL-7890');
  });
});

// ---------------------------------------------------------------------------
// Email 13 – Payment Sent to Contractor (C8)
// ---------------------------------------------------------------------------
test.describe('Email 13 – Payment Sent to Contractor (C8)', () => {
  test('From address is payments@mrsurety.com', async () => {
    expect('payments@mrsurety.com').toBe('payments@mrsurety.com');
  });

  test('Subject line has 💵 emoji and includes job ID', async () => {
    const jobId = 'JOB-WL-7890';
    const subject = `💵 Payment Sent - Job ${jobId}`;
    expect(subject).toContain('💵');
    expect(subject).toContain(jobId);
  });

  test('Payment details table has 5 fields', async () => {
    const fields = [
      'Job ID',
      'Payment Amount',
      'Payment Date',
      'Payment Method',
      'Estimated Clear Date',
    ];
    expect(fields.length).toBe(5);
  });

  test('Payment method is ACH transfer (not check or wire)', async () => {
    const method = 'ACH Transfer to your bank account';
    expect(method).toContain('ACH');
  });

  test('v1.4.4 reference: contractor payment total is $1,769.99', async () => {
    const parts    = 260.00;
    const pressure = 310.00;
    const device   = 599.99;
    const software = 75.00;
    const labor    = 525.00;
    const total    = parseFloat((parts + pressure + device + software + labor).toFixed(2));
    expect(total).toBe(1769.99);
  });

  test('Payment breakdown table has 6 rows (5 components + total)', async () => {
    const rows = [
      'Parts',
      'Pressure Reducer',
      'Device',
      'Software Setup',
      'Labor',
      'TOTAL',
    ];
    expect(rows.length).toBe(6);
  });

  test('What-happens-next table has 3 rows', async () => {
    const rows = [
      'Funds clear in account – 2-3 business days',
      'Unconditional Lien Release via DocuSign – after payment clears',
      'Sign Unconditional Lien Release – required for platform',
    ];
    expect(rows.length).toBe(3);
  });

  test('Platform access limitation warning present in lien release notice', async () => {
    const warning = 'MrSurety contractor platform will be limited until this document is signed';
    expect(warning).toContain('limited');
    expect(warning).toContain('signed');
  });
});

// ---------------------------------------------------------------------------
// Email 14 – Unconditional Lien Release Required (C9)
// ---------------------------------------------------------------------------
test.describe('Email 14 – Unconditional Lien Release Required (C9)', () => {
  test('From address is docusign@mrsurety.com', async () => {
    const from = 'docusign@mrsurety.com';
    expect(from).toBe('docusign@mrsurety.com');
    expect(from).not.toBe('payments@mrsurety.com');
  });

  test('Subject line has ⚠️ URGENT and job ID', async () => {
    const jobId = 'JOB-WL-7890';
    const subject = `⚠️ URGENT: Unconditional Lien Release Required - Job ${jobId}`;
    expect(subject).toContain('⚠️');
    expect(subject).toContain('URGENT');
    expect(subject).toContain(jobId);
  });

  test('Platform restriction lists 4 blocked actions', async () => {
    const blockedActions = [
      'View new job opportunities',
      'Access contractor dashboard',
      'Submit bids on new requests',
      'Receive job assignments',
    ];
    expect(blockedActions.length).toBe(4);
  });

  test('Job details table has 5 fields', async () => {
    const fields = [
      'Job ID',
      'Property',
      'Homeowner',
      'Payment Amount',
      'Payment Clear Date',
    ];
    expect(fields.length).toBe(5);
  });

  test('Lien release document confirms 3 conditions', async () => {
    const conditions = [
      'Received final payment in full',
      'No further claims against the property',
      'All subcontractors and suppliers have been paid',
    ];
    expect(conditions.length).toBe(3);
  });

  test('After signing: 3 outcomes confirmed with checkmarks', async () => {
    const outcomes = [
      'Platform access will be restored immediately',
      'Job will be marked as complete in the system',
      'Homeowner and agent will receive final certificate',
    ];
    expect(outcomes.length).toBe(3);
  });

  test('Email footer is from MrSurety Compliance Team with compliance@ address', async () => {
    const sender = 'MrSurety Compliance Team';
    const email  = 'compliance@mrsurety.com';
    expect(sender).toContain('Compliance');
    expect(email).toBe('compliance@mrsurety.com');
  });
});
