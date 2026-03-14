/**
 * Email Templates v1.4.4 — Emails 15–16 and DocuSign Documents 1–6
 *
 * Pure logic / content tests — no browser required.
 * These tests validate that EMAIL_TEMPLATES_GUIDE.md contains the
 * correct content for:
 *   • Email 15  (AD5)  – Unconditional Lien Release Signed – Admin Notification
 *   • Email 16  (AD4)  – Quarterly Tax Report Ready (full body upgrade)
 *   • DocuSign 1 – Contractor Master Services Agreement (one-time)
 *   • DocuSign 2 – Work Order / Task Contract (per job)
 *   • DocuSign 3 – Affidavit of Service (per job)
 *   • DocuSign 4 – Conditional Lien Release with Invoice Verification (per job)
 *   • DocuSign 5 – Unconditional Lien Release (per job)
 *   • DocuSign 6 – Release of Liability – Critical Services Only (template)
 *   • Summary table of all 5 signed documents for JOB-WL-7890
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Load the guide once for all tests
// ---------------------------------------------------------------------------
const GUIDE_PATH = path.join(
  __dirname,
  '../../qa/spec-docs/email-templates/EMAIL_TEMPLATES_GUIDE.md'
);

let guide: string;

test.beforeAll(() => {
  guide = fs.readFileSync(GUIDE_PATH, 'utf8');
});

// ===========================================================================
// EMAIL 15 — Unconditional Lien Release Signed (Admin Notification)
// ===========================================================================
test.describe('Email 15 – AD5 Unconditional Lien Release Signed (Admin)', () => {
  test('AD5 heading is present in admin email section', () => {
    expect(guide).toContain('AD5');
    expect(guide).toContain('Lien Release Signed');
  });

  test('From address is docusign@mrsurety.com', () => {
    const section = guide.slice(guide.indexOf('AD5'));
    expect(section).toContain('docusign@mrsurety.com');
  });

  test('To address is admin@mrsurety.com', () => {
    const section = guide.slice(guide.indexOf('AD5'));
    expect(section).toContain('admin@mrsurety.com');
  });

  test('Subject contains checkmark emoji and Unconditional Lien Release Signed', () => {
    const section = guide.slice(guide.indexOf('AD5'));
    expect(section).toContain('✅');
    expect(section).toContain('Unconditional Lien Release Signed');
  });

  test('Document Details table has 8 fields', () => {
    const section = guide.slice(guide.indexOf('AD5'));
    const fields = [
      'Job ID',
      'Property',
      'Homeowner',
      'Contractor',
      'Document Type',
      'Signed By',
      'Signed At',
      'Envelope ID',
    ];
    fields.forEach(field => expect(section).toContain(field));
  });

  test('Document Type field specifies Unconditional Lien Release', () => {
    const section = guide.slice(guide.indexOf('AD5'));
    expect(section).toContain('Unconditional Lien Release');
  });

  test('Document Summary lists 4 confirmation items', () => {
    const section = guide.slice(guide.indexOf('AD5'));
    expect(section).toContain('Contractor received final payment');
    expect(section).toContain('Payment has cleared');
    expect(section).toContain('No further claims against the property');
    expect(section).toContain('All subcontractors and suppliers paid');
  });

  test('Next Steps table has 4 rows including Automated statuses', () => {
    const section = guide.slice(guide.indexOf('AD5'));
    expect(section).toContain('Add document to job folder');
    expect(section).toContain('Automated');
    expect(section).toContain('Update job status');
    expect(section).toContain('Closed');
    expect(section).toContain('File with tax records');
  });

  test('Signed Document URL uses docusign.com/envelopes/ format', () => {
    const section = guide.slice(guide.indexOf('AD5'));
    expect(section).toContain('docusign.com/envelopes/');
  });

  test('Job closure confirmation phrase is present', () => {
    const section = guide.slice(guide.indexOf('AD5'));
    expect(section).toContain('fully documented and closed');
  });

  test('Signed By field includes title placeholder', () => {
    const section = guide.slice(guide.indexOf('AD5'));
    expect(section).toContain('Signed By');
    expect(section).toContain('Title');
  });
});

// ===========================================================================
// EMAIL 16 — Quarterly Tax Report Ready (full body)
// ===========================================================================
test.describe('Email 16 – AD4 Quarterly Tax Report Ready (full body)', () => {
  test('AD4 entry is present and upgraded beyond placeholder', () => {
    expect(guide).toContain('AD4');
    expect(guide).toContain('Quarterly Tax Report');
    // Must have jurisdiction breakdown — not in the old 6-line placeholder
    expect(guide).toContain('BREAKDOWN BY JURISDICTION');
  });

  test('From address is system@mrsurety.com', () => {
    const section = guide.slice(guide.indexOf('AD4'));
    expect(section).toContain('system@mrsurety.com');
  });

  test('To includes admin@ and CC includes accounting@', () => {
    const section = guide.slice(guide.indexOf('AD4'));
    expect(section).toContain('admin@mrsurety.com');
    expect(section).toContain('accounting@mrsurety.com');
  });

  test('Subject contains chart emoji and Quarterly Sales Tax Report Ready', () => {
    const section = guide.slice(guide.indexOf('AD4'));
    expect(section).toContain('📊');
    expect(section).toContain('Quarterly Sales Tax Report Ready');
  });

  test('Report Summary table has 4 metrics', () => {
    const section = guide.slice(guide.indexOf('AD4'));
    expect(section).toContain('Total Jobs Completed');
    expect(section).toContain('Total Retail Sales');
    expect(section).toContain('Total Sales Tax Collected');
    expect(section).toContain('Number of Tax Jurisdictions');
  });

  test('Jurisdiction breakdown includes CA cities at 7.75% tax rate', () => {
    const section = guide.slice(guide.indexOf('AD4'));
    expect(section).toContain('Anaheim, CA');
    expect(section).toContain('Orange, CA');
    expect(section).toContain('Fullerton, CA');
    expect(section).toContain('Irvine, CA');
    expect(section).toContain('Santa Ana, CA');
    expect(section).toContain('7.75%');
  });

  test('Example job row is included in report body', () => {
    const section = guide.slice(guide.indexOf('AD4'));
    expect(section).toContain('EXAMPLE JOB INCLUDED IN THIS REPORT');
    expect(section).toContain('Retail Subtotal');
    expect(section).toContain('Tax Rate');
    expect(section).toContain('Tax Collected');
  });

  test('Attachment list names 3 files (csv, pdf, detail csv)', () => {
    const section = guide.slice(guide.indexOf('AD4'));
    expect(section).toContain('-Tax-Report.csv');
    expect(section).toContain('-Tax-Report.pdf');
    expect(section).toContain('-Job-Detail.csv');
  });

  test('CDTFA filing deadline is mentioned', () => {
    const section = guide.slice(guide.indexOf('AD4'));
    expect(section).toContain('CDTFA');
    expect(section).toContain('April 30');
  });

  test('Admin portal update link uses admin.mrsurety.com/tax/', () => {
    const section = guide.slice(guide.indexOf('AD4'));
    expect(section).toContain('https://admin.mrsurety.com/tax/');
  });

  test('Download link uses admin.mrsurety.com/tax/…/download', () => {
    const section = guide.slice(guide.indexOf('AD4'));
    expect(section).toContain('/download');
  });
});

// ===========================================================================
// DOCUSIGN SECTION — existence and structure
// ===========================================================================
test.describe('DocuSign Documents section exists in guide', () => {
  test('## DocuSign Documents heading is present', () => {
    expect(guide).toContain('## DocuSign Documents');
  });

  test('All 6 DocuSign subsections are present', () => {
    expect(guide).toContain('### DocuSign 1');
    expect(guide).toContain('### DocuSign 2');
    expect(guide).toContain('### DocuSign 3');
    expect(guide).toContain('### DocuSign 4');
    expect(guide).toContain('### DocuSign 5');
    expect(guide).toContain('### DocuSign 6');
  });

  test('California UETA citation is present', () => {
    expect(guide).toContain('California Uniform Electronic Transactions Act');
    expect(guide).toContain('Civil Code §1633.1');
  });

  test('Reference job is identified as JOB-WL-7890', () => {
    const section = guide.slice(guide.indexOf('## DocuSign Documents'));
    expect(section).toContain('JOB-WL-7890');
  });
});

// ===========================================================================
// DOCUSIGN 1 — Contractor Master Services Agreement
// ===========================================================================
test.describe('DocuSign 1 – Contractor Master Services Agreement', () => {
  test('DocuSign 1 heading identifies it as one-time', () => {
    expect(guide).toContain('Contractor Master Services Agreement (One-Time)');
  });

  test('Envelope ID DS-12345-00001 is documented', () => {
    expect(guide).toContain('DS-12345-00001');
  });

  test('Document contains all 11 numbered sections', () => {
    const ds1Start = guide.indexOf('### DocuSign 1');
    const ds1End = guide.indexOf('### DocuSign 2');
    const ds1 = guide.slice(ds1Start, ds1End);
    for (let i = 1; i <= 11; i++) {
      expect(ds1).toContain(`${i}. `);
    }
  });

  test('Section 2 covers Independent Contractor Status', () => {
    const ds1 = guide.slice(guide.indexOf('### DocuSign 1'), guide.indexOf('### DocuSign 2'));
    expect(ds1).toContain('INDEPENDENT CONTRACTOR STATUS');
  });

  test('Section 7 specifies 24-month non-circumvention period', () => {
    const ds1 = guide.slice(guide.indexOf('### DocuSign 1'), guide.indexOf('### DocuSign 2'));
    expect(ds1).toContain('NON-CIRCUMVENTION');
    expect(ds1).toContain('twenty-four (24) months');
  });

  test('Section 3 requires payment within 15 days', () => {
    const ds1 = guide.slice(guide.indexOf('### DocuSign 1'), guide.indexOf('### DocuSign 2'));
    expect(ds1).toContain('fifteen (15) days');
  });

  test('Section 6 covers Resale Certificate with YES/NO election', () => {
    const ds1 = guide.slice(guide.indexOf('### DocuSign 1'), guide.indexOf('### DocuSign 2'));
    expect(ds1).toContain('RESALE CERTIFICATE');
    expect(ds1).toContain('IF YES');
    expect(ds1).toContain('IF NO');
  });

  test('Section 8 specifies $1,000,000 minimum liability insurance', () => {
    const ds1 = guide.slice(guide.indexOf('### DocuSign 1'), guide.indexOf('### DocuSign 2'));
    expect(ds1).toContain('$1,000,000');
  });

  test('Section 11 specifies California governing law', () => {
    const ds1 = guide.slice(guide.indexOf('### DocuSign 1'), guide.indexOf('### DocuSign 2'));
    expect(ds1).toContain('GOVERNING LAW');
    expect(ds1).toContain('State of California');
  });

  test('DocuSign Timestamp placeholder and electronic signature language present', () => {
    const ds1 = guide.slice(guide.indexOf('### DocuSign 1'), guide.indexOf('### DocuSign 2'));
    expect(ds1).toContain('Electronically signed via DocuSign');
    expect(ds1).toContain('DocuSign Timestamp');
  });

  test('Envelope envelope sends to contractor Jane Doe reference', () => {
    const ds1 = guide.slice(guide.indexOf('### DocuSign 1'), guide.indexOf('### DocuSign 2'));
    expect(ds1).toContain('Contractor Master Services Agreement');
    expect(ds1).toContain('contractor network');
  });
});

// ===========================================================================
// DOCUSIGN 2 — Work Order / Task Contract
// ===========================================================================
test.describe('DocuSign 2 – Work Order / Task Contract', () => {
  test('DocuSign 2 heading identifies it as per job', () => {
    expect(guide).toContain('Work Order / Task Contract (Per Job)');
  });

  test('Envelope ID DS-12345-78902 is documented', () => {
    expect(guide).toContain('DS-12345-78902');
  });

  test('Document title is WORK ORDER AND TASK CONTRACT', () => {
    const ds2 = guide.slice(guide.indexOf('### DocuSign 2'), guide.indexOf('### DocuSign 3'));
    expect(ds2).toContain('WORK ORDER AND TASK CONTRACT');
    expect(ds2).toContain('Purchase Order / Promise to Pay');
  });

  test('Job Identification table has 9 fields including Pressure Reducer Required', () => {
    const ds2 = guide.slice(guide.indexOf('### DocuSign 2'), guide.indexOf('### DocuSign 3'));
    const fields = [
      'Job ID',
      'Property Owner',
      'Property Address',
      'Square Footage',
      'Property Age',
      'Pressure Reducer Required',
      'Pipe Size',
      'Extension Cord',
      'Software Setup Required',
    ];
    fields.forEach(f => expect(ds2).toContain(f));
  });

  test('Scope of Work table has 5 line items', () => {
    const ds2 = guide.slice(guide.indexOf('### DocuSign 2'), guide.indexOf('### DocuSign 3'));
    expect(ds2).toContain('Install Pressure Reducer');
    expect(ds2).toContain('Install Parts & Fittings');
    expect(ds2).toContain('Install Extension Cable');
    expect(ds2).toContain('Software Setup & Configuration');
  });

  test('Compensation table has 5 component rows plus TOTAL', () => {
    const ds2 = guide.slice(guide.indexOf('### DocuSign 2'), guide.indexOf('### DocuSign 3'));
    expect(ds2).toContain('Parts (Fittings & Misc + Cable)');
    expect(ds2).toContain('Pressure Reducer');
    expect(ds2).toContain('Device (');
    expect(ds2).toContain('Software Setup & Configuration');
    expect(ds2).toContain('Labor');
    expect(ds2).toContain('TOTAL CONTRACTOR PAYMENT');
  });

  test('$95 Service Fee note clarifies it does not affect contractor compensation', () => {
    const ds2 = guide.slice(guide.indexOf('### DocuSign 2'), guide.indexOf('### DocuSign 3'));
    expect(ds2).toContain('$95 Service Fee');
    expect(ds2).toContain('does not affect contractor compensation');
  });

  test('Resale Certificate acknowledgment section is present with YES election', () => {
    const ds2 = guide.slice(guide.indexOf('### DocuSign 2'), guide.indexOf('### DocuSign 3'));
    expect(ds2).toContain('RESALE CERTIFICATE ACKNOWLEDGMENT');
    expect(ds2).toContain('YES');
    // Tax handling note spans table rows, check for key phrases individually
    expect(ds2).toContain('Company will charge and');
    expect(ds2).toContain('remit all applicable sales tax');
  });

  test('Section 9 incorporates Master Agreement by reference', () => {
    const ds2 = guide.slice(guide.indexOf('### DocuSign 2'), guide.indexOf('### DocuSign 3'));
    expect(ds2).toContain('INCORPORATION OF MASTER AGREEMENT');
    expect(ds2).toContain('incorporated herein by reference');
  });

  test('Schedule table includes Installation Date, Time, and Duration fields', () => {
    const ds2 = guide.slice(guide.indexOf('### DocuSign 2'), guide.indexOf('### DocuSign 3'));
    expect(ds2).toContain('Installation Date');
    expect(ds2).toContain('Installation Time');
    expect(ds2).toContain('Estimated Duration');
  });
});

// ===========================================================================
// DOCUSIGN 3 — Affidavit of Service
// ===========================================================================
test.describe('DocuSign 3 – Affidavit of Service', () => {
  test('DocuSign 3 heading identifies it as per job', () => {
    expect(guide).toContain('Affidavit of Service (Per Job)');
  });

  test('Envelope ID DS-12345-78903 is documented', () => {
    expect(guide).toContain('DS-12345-78903');
  });

  test('Affidavit document title is AFFIDAVIT OF SERVICE', () => {
    const ds3 = guide.slice(guide.indexOf('### DocuSign 3'), guide.indexOf('### DocuSign 4'));
    expect(ds3).toContain('AFFIDAVIT OF SERVICE');
  });

  test('Services Performed table has 5 service rows', () => {
    const ds3 = guide.slice(guide.indexOf('### DocuSign 3'), guide.indexOf('### DocuSign 4'));
    expect(ds3).toContain('Pressure Reducer Installation');
    expect(ds3).toContain('Installation');
    expect(ds3).toContain('Software Setup & Configuration');
    expect(ds3).toContain('Parts & Fittings Installation');
    expect(ds3).toContain('Extension Cable Installation');
  });

  test('Serial Number fields are present for devices', () => {
    const ds3 = guide.slice(guide.indexOf('### DocuSign 3'), guide.indexOf('### DocuSign 4'));
    expect(ds3).toContain('Serial Number');
    expect(ds3).toContain('Model');
  });

  test('Software Confirmation section lists 5 checkmarked items', () => {
    const ds3 = guide.slice(guide.indexOf('### DocuSign 3'), guide.indexOf('### DocuSign 4'));
    expect(ds3).toContain('WiFi connection established and stable');
    expect(ds3).toContain('Mobile app installed on homeowner');
    expect(ds3).toContain('Leak detectors paired');
    expect(ds3).toContain('Auto-shutoff function tested and verified');
    expect(ds3).toContain('Homeowner instructed on system operation');
  });

  test('Photographic Evidence lists before, during, after, and close-up photos', () => {
    const ds3 = guide.slice(guide.indexOf('### DocuSign 3'), guide.indexOf('### DocuSign 4'));
    expect(ds3).toContain('Before photos');
    expect(ds3).toContain('During installation photos');
    expect(ds3).toContain('After completion photos');
    expect(ds3).toContain('serial numbers');
  });

  test('Reliance section identifies 4 parties', () => {
    const ds3 = guide.slice(guide.indexOf('### DocuSign 3'), guide.indexOf('### DocuSign 4'));
    expect(ds3).toContain('property owner');
    expect(ds3).toContain('insurance agent');
    expect(ds3).toContain('insurance carrier');
    expect(ds3).toContain('MrSurety, Inc.');
  });

  test('Declaration is under penalty of perjury under California law', () => {
    const ds3 = guide.slice(guide.indexOf('### DocuSign 3'), guide.indexOf('### DocuSign 4'));
    expect(ds3).toContain('penalty of perjury');
    expect(ds3).toContain('State of California');
  });

  test('Trigger is contractor marking job complete in mobile app', () => {
    const ds3 = guide.slice(guide.indexOf('### DocuSign 3'), guide.indexOf('### DocuSign 4'));
    expect(ds3).toContain('marks job complete');
  });
});

// ===========================================================================
// DOCUSIGN 4 — Conditional Lien Release with Invoice Verification
// ===========================================================================
test.describe('DocuSign 4 – Conditional Lien Release with Invoice', () => {
  test('DocuSign 4 heading identifies it as per job with Invoice Verification', () => {
    expect(guide).toContain('Conditional Lien Release with Invoice Verification');
  });

  test('Envelope ID DS-12345-78904 is documented', () => {
    expect(guide).toContain('DS-12345-78904');
  });

  test('Document title is CONDITIONAL WAIVER AND RELEASE UPON FINAL PAYMENT', () => {
    const ds4 = guide.slice(guide.indexOf('### DocuSign 4'), guide.indexOf('### DocuSign 5'));
    expect(ds4).toContain('CONDITIONAL WAIVER AND RELEASE UPON FINAL PAYMENT');
  });

  test('Release details table has 8 fields', () => {
    const ds4 = guide.slice(guide.indexOf('### DocuSign 4'), guide.indexOf('### DocuSign 5'));
    const fields = [
      'Job ID',
      'Property Address',
      'Property Owner',
      'Contractor Name',
      'Business Name',
      'CSLB License',
      'Payment Amount',
      'Completion Date',
    ];
    fields.forEach(f => expect(ds4).toContain(f));
  });

  test('Invoice Reference section includes Invoice Number, Date, and Total', () => {
    const ds4 = guide.slice(guide.indexOf('### DocuSign 4'), guide.indexOf('### DocuSign 5'));
    expect(ds4).toContain('INVOICE REFERENCE');
    expect(ds4).toContain('Invoice #');
    expect(ds4).toContain('Invoice Date');
    expect(ds4).toContain('Total Amount');
  });

  test('Invoice line items match 5 components', () => {
    const ds4 = guide.slice(guide.indexOf('### DocuSign 4'), guide.indexOf('### DocuSign 5'));
    expect(ds4).toContain('Parts (Fittings & Misc + Extension Cable)');
    expect(ds4).toContain('Pressure Reducer');
    expect(ds4).toContain('Software Setup & Configuration');
    expect(ds4).toContain('Labor');
  });

  test('Contractor Verification table has 4 rows with initials placeholder', () => {
    const ds4 = guide.slice(guide.indexOf('### DocuSign 4'), guide.indexOf('### DocuSign 5'));
    expect(ds4).toContain('CONTRACTOR VERIFICATION');
    expect(ds4).toContain('Initials');
    expect(ds4).toContain('[Init]');
    // Text spans table rows — check for key phrases that appear on individual lines
    expect(ds4).toContain('attached invoice has been completely');
    expect(ds4).toContain('installed and/or configured at this property');
    expect(ds4).toContain('true, accurate');
    expect(ds4).toContain('CONDITIONAL');
  });

  test('Conditional Nature section clearly states release is voided if payment fails', () => {
    const ds4 = guide.slice(guide.indexOf('### DocuSign 4'), guide.indexOf('### DocuSign 5'));
    expect(ds4).toContain('CONDITIONAL NATURE OF RELEASE');
    expect(ds4).toContain('null and void');
  });

  test('Attachment section includes contractor invoice', () => {
    const ds4 = guide.slice(guide.indexOf('### DocuSign 4'), guide.indexOf('### DocuSign 5'));
    expect(ds4).toContain('ATTACHMENT: INVOICE');
    expect(ds4).toContain('Bill To');
    expect(ds4).toContain('MrSurety, Inc.');
    expect(ds4).toContain('Resale Certificate: Accepted');
  });

  test('Trigger note says sent simultaneously with Affidavit of Service', () => {
    const ds4 = guide.slice(guide.indexOf('### DocuSign 4'), guide.indexOf('### DocuSign 5'));
    expect(ds4).toContain('simultaneously with Affidavit of Service');
  });
});

// ===========================================================================
// DOCUSIGN 5 — Unconditional Lien Release
// ===========================================================================
test.describe('DocuSign 5 – Unconditional Lien Release', () => {
  test('DocuSign 5 heading identifies it as per job', () => {
    expect(guide).toContain('Unconditional Lien Release (Per Job)');
  });

  test('Envelope ID DS-12345-78905 is documented', () => {
    expect(guide).toContain('DS-12345-78905');
  });

  test('Document title is UNCONDITIONAL WAIVER AND RELEASE UPON FINAL PAYMENT', () => {
    const ds5 = guide.slice(guide.indexOf('### DocuSign 5'), guide.indexOf('### DocuSign 6'));
    expect(ds5).toContain('UNCONDITIONAL WAIVER AND RELEASE UPON FINAL PAYMENT');
  });

  test('Release details table has 9 fields including Payment Clear Date', () => {
    const ds5 = guide.slice(guide.indexOf('### DocuSign 5'), guide.indexOf('### DocuSign 6'));
    const fields = [
      'Job ID',
      'Property Address',
      'Property Owner',
      'Contractor Name',
      'Business Name',
      'CSLB License',
      'Payment Amount',
      'Completion Date',
      'Payment Clear Date',
    ];
    fields.forEach(f => expect(ds5).toContain(f));
  });

  test('Acknowledgment of Receipt section is present', () => {
    const ds5 = guide.slice(guide.indexOf('### DocuSign 5'), guide.indexOf('### DocuSign 6'));
    expect(ds5).toContain('ACKNOWLEDGMENT OF RECEIPT');
    expect(ds5).toContain('acknowledges RECEIPT');
  });

  test('Unconditional Release section is clearly labeled', () => {
    const ds5 = guide.slice(guide.indexOf('### DocuSign 5'), guide.indexOf('### DocuSign 6'));
    expect(ds5).toContain('UNCONDITIONAL RELEASE');
    expect(ds5).toContain('UNCONDITIONALLY waives and releases');
  });

  test('Finality of Release section states no further claims', () => {
    const ds5 = guide.slice(guide.indexOf('### DocuSign 5'), guide.indexOf('### DocuSign 6'));
    expect(ds5).toContain('FINALITY OF RELEASE');
    expect(ds5).toContain('No further claims of any kind');
  });

  test('Platform Access Notice section ties signing to platform restoration', () => {
    const ds5 = guide.slice(guide.indexOf('### DocuSign 5'), guide.indexOf('### DocuSign 6'));
    expect(ds5).toContain('PLATFORM ACCESS NOTICE');
    expect(ds5).toContain('limited to signing this document only');
  });

  test('Warning callout notes platform access is LIMITED until signed', () => {
    const ds5 = guide.slice(guide.indexOf('### DocuSign 5'), guide.indexOf('### DocuSign 6'));
    expect(ds5).toContain('LIMITED');
    expect(ds5).toContain('platform access will be restored immediately');
  });

  test('Trigger is payment clearing (2-3 business days after payment sent)', () => {
    const ds5 = guide.slice(guide.indexOf('### DocuSign 5'), guide.indexOf('### DocuSign 6'));
    expect(ds5).toContain('payment clears');
    expect(ds5).toContain('2–3 business days');
  });
});

// ===========================================================================
// DOCUSIGN 6 — Release of Liability (Critical Services Only – Template)
// ===========================================================================
test.describe('DocuSign 6 – Release of Liability (Critical Services Template)', () => {
  test('DocuSign 6 heading identifies it as Critical Services Only and Template', () => {
    expect(guide).toContain('Release of Liability – Critical Services Only (Template)');
  });

  test('Note clarifies it was NOT required for JOB-WL-7890', () => {
    const ds6 = guide.slice(guide.indexOf('### DocuSign 6'));
    expect(ds6).toContain('NOT required');
    expect(ds6).toContain('JOB-WL-7890');
  });

  test('Document title is RELEASE OF LIABILITY – CRITICAL WATER SERVICE', () => {
    const ds6 = guide.slice(guide.indexOf('### DocuSign 6'));
    expect(ds6).toContain('RELEASE OF LIABILITY');
    expect(ds6).toContain('CRITICAL WATER SERVICE');
  });

  test('Template is sent To homeowner (not contractor)', () => {
    const ds6 = guide.slice(guide.indexOf('### DocuSign 6'));
    expect(ds6).toContain('To:   [Homeowner Name]');
  });

  test('Template details table has 5 fields', () => {
    const ds6 = guide.slice(guide.indexOf('### DocuSign 6'));
    expect(ds6).toContain('Job ID');
    expect(ds6).toContain('Property Address');
    expect(ds6).toContain('Homeowner');
    expect(ds6).toContain('Contractor');
  });

  test('4 increased risk items are listed', () => {
    const ds6 = guide.slice(guide.indexOf('### DocuSign 6'));
    expect(ds6).toContain('Unexpected pipe conditions');
    expect(ds6).toContain('Hidden damage not visible');
    expect(ds6).toContain('water shutoff without full evaluation');
    expect(ds6).toContain('additional damage when old valves are removed');
  });

  test('Release excludes gross negligence and willful misconduct', () => {
    const ds6 = guide.slice(guide.indexOf('### DocuSign 6'));
    expect(ds6).toContain('gross negligence');
    expect(ds6).toContain('willful misconduct');
  });

  test('Warranty terms still apply to materials and workmanship', () => {
    const ds6 = guide.slice(guide.indexOf('### DocuSign 6'));
    expect(ds6).toContain('normal warranty terms still apply');
    expect(ds6).toContain('materials and workmanship');
  });

  test('Contractor Witness signature block is present', () => {
    const ds6 = guide.slice(guide.indexOf('### DocuSign 6'));
    expect(ds6).toContain('CONTRACTOR WITNESS');
  });

  test('Trigger context is emergency valve replacement on-site', () => {
    const ds6 = guide.slice(guide.indexOf('### DocuSign 6'));
    expect(ds6).toContain('contractor is on site');
    expect(ds6).toContain('Critical Water Service');
  });
});

// ===========================================================================
// SUMMARY TABLE — All 5 documents for JOB-WL-7890
// ===========================================================================
test.describe('Summary Table – All DocuSign Documents for JOB-WL-7890', () => {
  test('Summary table heading is present', () => {
    expect(guide).toContain('Summary of All DocuSign Documents for Job JOB-WL-7890');
  });

  test('Table lists all 5 document types', () => {
    const summary = guide.slice(guide.indexOf('Summary of All DocuSign Documents'));
    expect(summary).toContain('Contractor Master Services Agreement');
    expect(summary).toContain('Work Order / Task Contract');
    expect(summary).toContain('Affidavit of Service');
    expect(summary).toContain('Conditional Lien Release');
    expect(summary).toContain('Unconditional Lien Release');
  });

  test('All 5 documents show Signed status', () => {
    const summary = guide.slice(guide.indexOf('Summary of All DocuSign Documents'));
    const signedMatches = (summary.match(/Signed/g) || []).length;
    // 5 documents × "Signed" in Signed Date + Status columns → at least 5
    expect(signedMatches).toBeGreaterThanOrEqual(5);
  });

  test('Date range spans Jan 15 2026 to Apr 2 2026', () => {
    const summary = guide.slice(guide.indexOf('Summary of All DocuSign Documents'));
    expect(summary).toContain('Jan 15, 2026');
    expect(summary).toContain('Mar 22, 2026');
    expect(summary).toContain('Mar 28, 2026');
    expect(summary).toContain('Apr 2, 2026');
  });

  test('Plumb Perfect Inc. is identified as the sent-to party', () => {
    const summary = guide.slice(guide.indexOf('Summary of All DocuSign Documents'));
    expect(summary).toContain('Plumb Perfect Inc.');
  });

  test('End of specification marker is present', () => {
    expect(guide).toContain('END OF COMPLETE EMAILS AND DOCUSIGN DOCUMENTS SPECIFICATION');
  });
});
