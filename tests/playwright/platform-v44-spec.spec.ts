/**
 * Platform Spec V4.4 Cross-Check
 *
 * Pure content tests — no browser required.
 * Validates that SERVICE_FORM_GUIDE.md captures all V4.4-specific additions
 * ("MR SURETY – COMPLETE PLATFORM SPECIFICATION V4.4 – Complete Reference Document").
 *
 * V4.4 expands V4.3 with:
 *   - Full company info (email, website, resale cert)
 *   - Contractor base prices table
 *   - Service request homeowner input fields + pipe size chart
 *   - Contractor estimate Method A (upload) and Method B (system creator)
 *   - Corrected Scenario 4 total ($1,638.61 vs V4.3's $1,638.62)
 *   - Expanded service fee items (11 vs V4.3's 6)
 *   - Complete 23-step job flow (vs V4.3's 12)
 *   - All 13 emails (subjects + key content)
 *   - All 5 DocuSign documents
 *   - Database schema (8 tables)
 *   - API integrations (9 services)
 *   - Programmer summary (10 points)
 *
 * Covers:
 *   §A – Company Information (V4.4 additions)
 *   §B – Contractor Base Prices Table
 *   §C – Service Request Homeowner Input Fields + Pipe Size Chart
 *   §D – Contractor Estimate Methods A & B
 *   §E – V4.4 Corrected Scenario 4 Total
 *   §F – Expanded Service Fee (11 Items)
 *   §G – Complete 23-Step Job Flow
 *   §H – All 13 System Emails
 *   §I – All 5 DocuSign Documents
 *   §J – Database Schema (8 Tables) + API Integrations (9 Services)
 *   §K – Programmer Summary (10 Points)
 *
 * Run via: npm run test:platform-v44-spec
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Load the guide once for all tests
// ---------------------------------------------------------------------------
const GUIDE_PATH = path.join(
  __dirname,
  '../../qa/spec-docs/service-form/SERVICE_FORM_GUIDE.md'
);

const TAX_RATE = 0.0775; // 7.75% – California sales tax example used in V4.4 spec

let guide: string;

test.beforeAll(() => {
  guide = fs.readFileSync(GUIDE_PATH, 'utf8');
});

// Helper: get text starting at a marker
function section(marker: string, chars = 2000): string {
  const idx = guide.indexOf(marker);
  if (idx === -1) return '';
  return guide.slice(idx, idx + chars);
}

// ===========================================================================
// §A – COMPANY INFORMATION (V4.4 ADDITIONS)
// ===========================================================================
test.describe('§A – V4.4 Company Information', () => {
  test('V4.4 Platform Spec Cross-Reference section is present', () => {
    expect(guide).toContain('V4.4 Platform Spec Cross-Reference');
  });

  test('Legal name is MrSurety, Inc.', () => {
    const s = section('V4.4 Company Information');
    expect(s).toContain('MrSurety, Inc.');
  });

  test('Address is 1253 E Imperial Hwy, Placentia, CA 92870', () => {
    const s = section('V4.4 Company Information');
    expect(s).toContain('1253 E Imperial Hwy, Placentia, CA 92870');
  });

  test('Phone is (714) 686-1800', () => {
    const s = section('V4.4 Company Information');
    expect(s).toContain('(714) 686-1800');
  });

  test('Email is support@mrsurety.com', () => {
    const s = section('V4.4 Company Information');
    expect(s).toContain('support@mrsurety.com');
  });

  test('Website is www.mrsurety.com', () => {
    const s = section('V4.4 Company Information');
    expect(s).toContain('www.mrsurety.com');
  });

  test('Resale Certificate is California Seller\'s Permit', () => {
    const s = section('V4.4 Company Information');
    expect(s).toContain("California Seller's Permit");
  });
});

// ===========================================================================
// §B – CONTRACTOR BASE PRICES TABLE
// ===========================================================================
test.describe('§B – V4.4 Contractor Base Prices Table', () => {
  test('Contractor base prices section is present', () => {
    expect(guide).toContain('V4.4 Contractor Base Prices');
  });

  test('Parts contractor price is $260.00', () => {
    const s = section('V4.4 Contractor Base Prices');
    expect(s).toContain('$260.00');
  });

  test('Pressure Reducer (1") contractor price is $310.00', () => {
    const s = section('V4.4 Contractor Base Prices');
    expect(s).toContain('Pressure Reducer (1")');
    expect(s).toContain('$310.00');
  });

  test('Device (Moen System) contractor price is $599.99', () => {
    const s = section('V4.4 Contractor Base Prices');
    expect(s).toContain('Device (Moen System)');
    expect(s).toContain('$599.99');
  });

  test('Software Setup contractor price is $75.00', () => {
    const s = section('V4.4 Contractor Base Prices');
    expect(s).toContain('Software Setup');
    expect(s).toContain('$75.00');
  });

  test('Labor contractor price is $525.00', () => {
    const s = section('V4.4 Contractor Base Prices');
    expect(s).toContain('$525.00');
  });

  test('Contractor Total is $1,769.99', () => {
    const s = section('V4.4 Contractor Base Prices');
    expect(s).toContain('$1,769.99');
  });
});

// ===========================================================================
// §C – SERVICE REQUEST HOMEOWNER INPUT FIELDS + PIPE SIZE CHART
// ===========================================================================
test.describe('§C – V4.4 Service Request Homeowner Input Fields', () => {
  test('Service request section is present', () => {
    expect(guide).toContain('V4.4 Service Request');
  });

  test('Property Address field is documented', () => {
    const s = section('V4.4 Service Request', 3000);
    expect(s).toContain('Property Address');
  });

  test('Square Footage field is documented', () => {
    const s = section('V4.4 Service Request', 3000);
    expect(s).toContain('Square Footage');
  });

  test('Service Category dropdown is documented', () => {
    const s = section('V4.4 Service Request', 3000);
    expect(s).toContain('Service Category');
    expect(s).toContain('Dropdown');
  });

  test('Distance Preference field is documented', () => {
    const s = section('V4.4 Service Request', 3000);
    expect(s).toContain('Distance Preference');
  });

  test('Device Source radio is documented', () => {
    const s = section('V4.4 Service Request', 3000);
    expect(s).toContain('Device Source');
    expect(s).toContain('Radio');
  });

  test('Software Setup Yes/No field is documented', () => {
    const s = section('V4.4 Service Request', 3000);
    expect(s).toContain('Software Setup');
    expect(s).toContain('Yes/No');
  });

  test('System auto-calculation: pressure reducer if age >5 years', () => {
    const s = section('V4.4 System Auto-Calculations', 1000);
    expect(s).toContain('Pressure Reducer Required');
    expect(s).toContain('>5 years');
  });

  test('System auto-calculation: extension cord 25 ft', () => {
    const s = section('V4.4 System Auto-Calculations', 1000);
    expect(s).toContain('Extension Cord');
    expect(s).toContain('25 ft');
  });

  test('System auto-calculation: pipe size based on sq ft', () => {
    const s = section('V4.4 System Auto-Calculations', 1000);
    expect(s).toContain('Pipe Size');
    expect(s).toContain('sq ft');
  });

  test('Pipe size chart: up to 2000 sq ft → 3/4 inch', () => {
    const s = section('V4.4 Pipe Size Chart', 500);
    expect(s).toContain('Up to 2000 sq ft');
    expect(s).toContain('3/4 inch');
  });

  test('Pipe size chart: 2001–3000 sq ft → 1 inch', () => {
    const s = section('V4.4 Pipe Size Chart', 500);
    expect(s).toContain('2001');
    expect(s).toContain('3000 sq ft');
    expect(s).toContain('1 inch');
  });

  test('Pipe size chart: 3001–5000 sq ft → 1 1/4 inch', () => {
    const s = section('V4.4 Pipe Size Chart', 500);
    expect(s).toContain('3001');
    expect(s).toContain('5000 sq ft');
    expect(s).toContain('1 1/4 inch');
  });
});

// ===========================================================================
// §D – CONTRACTOR ESTIMATE METHODS A & B
// ===========================================================================
test.describe('§D – V4.4 Contractor Estimate Methods', () => {
  test('Contractor estimate methods section is present', () => {
    expect(guide).toContain('V4.4 Contractor Estimate Methods');
  });

  test('Method A: Upload Written Estimate exists', () => {
    const s = section('V4.4 Contractor Estimate Methods', 3000);
    expect(s).toContain('Method A');
    expect(s).toContain('Upload Written Estimate');
  });

  test('Method A: step 1 uploads PDF or photo', () => {
    const s = section('Method A: Upload Written Estimate', 1000);
    expect(s).toContain('PDF or photo');
    expect(s).toContain('estimate');
  });

  test('Method A has 7 steps', () => {
    const s = section('Method A: Upload Written Estimate', 1000);
    // Steps 1–7 should be present
    expect(s).toContain('| 7   |');
  });

  test('Method B: System Estimate Creator exists', () => {
    const s = section('V4.4 Contractor Estimate Methods', 3000);
    expect(s).toContain('Method B');
    expect(s).toContain('System Estimate Creator');
  });

  test('Method B: Moen Smart Water System line item', () => {
    const s = section('Method B: System Estimate Creator', 1000);
    expect(s).toContain('Moen Smart Water System');
    expect(s).toContain('$599.99');
  });

  test('Method B: Pressure Reducer line item', () => {
    const s = section('Method B: System Estimate Creator', 1000);
    expect(s).toContain('Pressure Reducer (1")');
    expect(s).toContain('$310.00');
  });

  test('Method B: Extension Cable at $2.00/ft for 25 ft', () => {
    const s = section('Method B: System Estimate Creator', 1000);
    expect(s).toContain('Extension Cable');
    expect(s).toContain('$2.00/ft');
    expect(s).toContain('$50.00');
  });

  test('Method B: Software Setup line item', () => {
    const s = section('Method B: System Estimate Creator', 1000);
    expect(s).toContain('Software Setup');
    expect(s).toContain('$75.00');
  });

  test('Method B: Contractor Total is $1,769.99', () => {
    const s = section('Method B: System Estimate Creator', 1000);
    expect(s).toContain('$1,769.99');
  });

  test('Resale certificate election: contractor accepts or declines per job', () => {
    // Resale Certificate handling is documented in the guide's dedicated section
    expect(guide).toContain('Resale Certificate');
    // V4.4 Work Order DocuSign also references it
    const s = section('DocuSign 2: Work Order', 600);
    expect(s).toContain('RESALE CERTIFICATE');
  });
});

// ===========================================================================
// §E – V4.4 CORRECTED SCENARIO 4 TOTAL
// ===========================================================================
test.describe('§E – V4.4 Corrected Scenario 4 Total', () => {
  test('V4.4 corrected Scenario 4 total section is present', () => {
    expect(guide).toContain('V4.4 Corrected Scenario 4 Total');
  });

  test('V4.4 Scenario 4 total is $1,638.61', () => {
    const s = section('V4.4 Corrected Scenario 4 Total', 500);
    expect(s).toContain('$1,638.61');
  });

  test('Scenario 4 subtotal is $1,425.75', () => {
    const s = section('V4.4 Corrected Scenario 4 Total', 500);
    expect(s).toContain('$1,425.75');
  });

  test('Scenario 4 tax base is $1,520.75', () => {
    const s = section('V4.4 Corrected Scenario 4 Total', 500);
    expect(s).toContain('$1,520.75');
  });

  test('Scenario 4 tax is $117.86', () => {
    const s = section('V4.4 Corrected Scenario 4 Total', 500);
    expect(s).toContain('$117.86');
  });

  test('V4.3 vs V4.4 rounding difference is noted', () => {
    const s = section('V4.4 Corrected Scenario 4 Total', 500);
    expect(s).toContain('V4.3');
    expect(s).toContain('$1,638.62');
    expect(s).toContain('rounding');
  });

  test('Arithmetic check: $1,425.75 + $95.00 + $117.86 = $1,638.61', () => {
    const subtotal = 1425.75;
    const fee = 95.00;
    const tax = Math.round(1520.75 * TAX_RATE * 100) / 100;
    const total = Math.round((subtotal + fee + tax) * 100) / 100;
    expect(tax).toBe(117.86);
    expect(total).toBe(1638.61);
  });
});

// ===========================================================================
// §F – EXPANDED SERVICE FEE (11 ITEMS)
// ===========================================================================
test.describe('§F – V4.4 Expanded Service Fee Coverage (11 Items)', () => {
  test('V4.4 service fee section is present', () => {
    expect(guide).toContain('V4.4 Service Fee Coverage (11 Items)');
  });

  test('Service fee has 11 items documented', () => {
    const s = section('V4.4 Service Fee Coverage (11 Items)', 2000);
    const items = [
      'Contractor License Verification',
      'Background Checks',
      'Insurance Verification',
      'Affidavit of Service',
      'Conditional Lien Release',
      'Unconditional Lien Release',
      'Certificate of Completion',
      'Agent Portal Access',
      'Document Storage',
      'Compliance Monitoring',
      'Tax Reporting',
    ];
    for (const item of items) {
      expect(s).toContain(item);
    }
  });

  test('Item 1: Contractor License Verification', () => {
    const s = section('V4.4 Service Fee Coverage (11 Items)', 2000);
    expect(s).toContain('Contractor License Verification');
    expect(s).toContain('licensed, insured professionals');
  });

  test('Item 2: Background Checks (new in V4.4)', () => {
    const s = section('V4.4 Service Fee Coverage (11 Items)', 2000);
    expect(s).toContain('Background Checks');
    expect(s).toContain('vetted');
  });

  test('Item 3: Insurance Verification (new in V4.4)', () => {
    const s = section('V4.4 Service Fee Coverage (11 Items)', 2000);
    expect(s).toContain('Insurance Verification');
    expect(s).toContain('Liability insurance');
  });

  test('Item 10: Compliance Monitoring (new in V4.4)', () => {
    const s = section('V4.4 Service Fee Coverage (11 Items)', 2000);
    expect(s).toContain('Compliance Monitoring');
  });

  test('Item 11: Tax Reporting (new in V4.4)', () => {
    const s = section('V4.4 Service Fee Coverage (11 Items)', 2000);
    expect(s).toContain('Tax Reporting');
    expect(s).toContain('remitted');
  });

  test('Note: V4.4 adds 4 new items vs V4.3', () => {
    const s = section('V4.4 Service Fee Coverage (11 Items)', 2000);
    expect(s).toContain('V4.3');
    expect(s).toContain('6 items');
    expect(s).toContain('V4.4 adds');
  });
});

// ===========================================================================
// §G – COMPLETE 23-STEP JOB FLOW
// ===========================================================================
test.describe('§G – V4.4 Complete 23-Step Job Flow', () => {
  test('V4.4 Complete Job Flow section is present', () => {
    expect(guide).toContain('V4.4 Complete Job Flow (23 Steps)');
  });

  test('Job flow has 23 steps', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('| 23  |');
  });

  test('Step 1: Homeowner submits service request', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('Homeowner');
    expect(s).toContain('Submits service request');
  });

  test('Step 6: Homeowner pays 10% deposit with deposit receipt', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('10% deposit');
    expect(s).toContain('Deposit receipt');
  });

  test('Step 9: System sends Work Order via DocuSign', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('DocuSign: Work Order');
  });

  test('Step 11: Contractor GPS check-in with timestamp and photo', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('GPS');
    expect(s).toContain('timestamp');
    expect(s).toContain('Check-in record');
  });

  test('Step 13: Change order if needed, homeowner approves', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('change order');
    expect(s).toContain('Change Order');
  });

  test('Step 15: Affidavit of Service via DocuSign', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('DocuSign: Affidavit');
  });

  test('Step 16: Conditional Lien Release via DocuSign', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('DocuSign: Conditional');
  });

  test('Step 20: Unconditional Lien Release via DocuSign after payment', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('DocuSign: Unconditional');
  });

  test('Step 22: Certificate generated and emailed to homeowner + agent', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('Certificate');
    expect(s).toContain('homeowner + agent');
  });

  test('Step 23: Agent downloads certificate for underwriter', () => {
    const s = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s).toContain('| 23  |');
    expect(s).toContain('underwriter');
  });
});

// ===========================================================================
// §H – ALL 13 SYSTEM EMAILS
// ===========================================================================
test.describe('§H – V4.4 All 13 System Emails', () => {
  test('V4.4 All System Emails section is present', () => {
    expect(guide).toContain('V4.4 All System Emails (13 Emails)');
  });

  test('Email table has 13 entries', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('| 13|');
  });

  test('Email 1: Service Request Confirmation to Homeowner', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Service Request Has Been Received');
    expect(s).toContain('Homeowner');
    expect(s).toContain('Service request submitted');
  });

  test('Email 2: New Estimate Available to Homeowner', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Estimates Ready for Your Review');
    expect(s).toContain('Contractor bids received');
  });

  test('Email 3: Estimate Selected – Deposit Required to Homeowner', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Complete Your Deposit to Confirm Installation');
    expect(s).toContain('Estimate selected');
  });

  test('Email 4: New Job Assignment to Contractor', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('NEW JOB ASSIGNMENT');
    expect(s).toContain('Contractor');
    expect(s).toContain('Job assigned after deposit');
  });

  test('Email 5: Job Confirmed to Homeowner', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Job Confirmed! Your Installation is Scheduled');
    expect(s).toContain('Deposit payment received');
  });

  test('Email 6: Installation Reminder to Homeowner', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Your Installation is Tomorrow');
    expect(s).toContain('24 hours before install');
  });

  test('Email 7: Contractor Has Arrived to Homeowner', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Your Contractor Has Arrived');
    expect(s).toContain('Contractor GPS check-in');
  });

  test('Email 8: Change Order to Homeowner', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Change Order for Your Installation');
    expect(s).toContain('Change order created');
  });

  test('Email 9: Work Complete – Final Payment to Homeowner', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Work Complete - Final Payment Required');
    expect(s).toContain('Work uploaded');
  });

  test('Email 10: Certificate Ready to Homeowner', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Certificate Ready for Download');
    expect(s).toContain('Payment cleared + docs done');
  });

  test('Email 11: Certificate for Agent', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Certificate Attached');
    expect(s).toContain('Agent');
    expect(s).toContain('Job complete, cert generated');
  });

  test('Email 12: Unconditional Lien Release Required – Contractor', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('URGENT: Unconditional Lien Release Required');
    expect(s).toContain('Contractor');
    expect(s).toContain('Payment cleared');
  });

  test('Email 13: Quarterly Tax Report to Admin', () => {
    const s = section('V4.4 All System Emails (13 Emails)', 3000);
    expect(s).toContain('Quarterly Sales Tax Report Ready');
    expect(s).toContain('Admin');
    expect(s).toContain('End of quarter');
  });

  test('Email 3 content: includes Service Fee $95.00 as separate line', () => {
    const s = section('Email 3 Content', 500);
    expect(s).toContain('Service Fee: $95.00');
    expect(s).toContain('DEPOSIT REQUIRED (10%)');
  });

  test('Email 9 content: includes Service Fee $95.00 and REMAINING BALANCE', () => {
    const s = section('Email 9 Content', 500);
    expect(s).toContain('Service Fee: $95.00');
    expect(s).toContain('REMAINING BALANCE');
  });
});

// ===========================================================================
// §I – ALL 5 DOCUSIGN DOCUMENTS
// ===========================================================================
test.describe('§I – V4.4 All 5 DocuSign Documents', () => {
  test('V4.4 All DocuSign Documents section is present', () => {
    expect(guide).toContain('V4.4 All DocuSign Documents (5 Documents)');
  });

  test('DocuSign table shows 5 documents', () => {
    const s = section('V4.4 All DocuSign Documents (5 Documents)', 2000);
    expect(s).toContain('| 5 |');
  });

  test('DocuSign 1: Contractor Master Services Agreement (one-time)', () => {
    const s = section('V4.4 All DocuSign Documents (5 Documents)', 2000);
    expect(s).toContain('Contractor Master Services Agreement');
    expect(s).toContain('One-time');
  });

  test('DocuSign 2: Work Order / Task Contract (per job)', () => {
    const s = section('V4.4 All DocuSign Documents (5 Documents)', 2000);
    expect(s).toContain('Work Order / Task Contract');
    expect(s).toContain('Per job');
  });

  test('DocuSign 3: Affidavit of Service (per job)', () => {
    const s = section('V4.4 All DocuSign Documents (5 Documents)', 2000);
    expect(s).toContain('Affidavit of Service');
  });

  test('DocuSign 4: Conditional Lien Release with Invoice (per job)', () => {
    const s = section('V4.4 All DocuSign Documents (5 Documents)', 2000);
    expect(s).toContain('Conditional Lien Release with Invoice');
  });

  test('DocuSign 5: Unconditional Lien Release (after payment)', () => {
    const s = section('V4.4 All DocuSign Documents (5 Documents)', 2000);
    expect(s).toContain('Unconditional Lien Release');
    expect(s).toContain('After payment');
  });

  test('Note: V4.4 adds 2 new docs vs V4.3 (MSA + Unconditional)', () => {
    const s = section('V4.4 All DocuSign Documents (5 Documents)', 2000);
    expect(s).toContain('V4.3');
    expect(s).toContain('3 DocuSign documents');
    expect(s).toContain('V4.4 adds');
  });

  test('DocuSign 2 Work Order: contractor prices with $95 service fee note', () => {
    const s = section('DocuSign 2: Work Order', 600);
    expect(s).toContain('Parts: $260.00');
    expect(s).toContain('Pressure Reducer: $310.00');
    expect(s).toContain('Device: $599.99');
    expect(s).toContain('Software Setup: $75.00');
    expect(s).toContain('Labor: $525.00');
    expect(s).toContain('$95 Service Fee to MrSurety');
  });

  test('DocuSign 2 Work Order: RESALE CERTIFICATE field', () => {
    const s = section('DocuSign 2: Work Order', 600);
    expect(s).toContain('RESALE CERTIFICATE');
  });

  test('DocuSign 4 Conditional Lien Release: 3 initialed clauses', () => {
    const s = section('DocuSign 4: Conditional Lien Release', 700);
    expect(s).toContain('(initials)');
    expect(s).toContain('completely');
    expect(s).toContain('All items listed were installed');
    expect(s).toContain('invoice is true and accurate');
  });

  test('DocuSign 5 Unconditional Lien Release: platform access notice', () => {
    const s = section('DocuSign 5: Unconditional Lien Release', 500);
    expect(s).toContain('PLATFORM ACCESS NOTICE');
    expect(s).toContain('continued access to the MrSurety');
  });
});

// ===========================================================================
// §J – DATABASE SCHEMA + API INTEGRATIONS
// ===========================================================================
test.describe('§J – V4.4 Database Schema (8 Tables) + API Integrations (9 Services)', () => {
  test('V4.4 Database Schema section is present', () => {
    expect(guide).toContain('V4.4 Database Schema (8 Tables)');
  });

  test('users table is documented with role field', () => {
    const s = section('V4.4 Database Schema (8 Tables)', 3000);
    expect(s).toContain('users');
    expect(s).toContain('role (homeowner/contractor/agent/admin)');
  });

  test('service_requests table includes property_age and software_required', () => {
    const s = section('V4.4 Database Schema (8 Tables)', 3000);
    expect(s).toContain('service_requests');
    expect(s).toContain('property_age');
    expect(s).toContain('software_required');
  });

  test('contractor_bids table includes resale_cert_accepted', () => {
    const s = section('V4.4 Database Schema (8 Tables)', 3000);
    expect(s).toContain('contractor_bids');
    expect(s).toContain('resale_cert_accepted');
  });

  test('jobs table has service_fee defaulting to $95.00', () => {
    const s = section('V4.4 Database Schema (8 Tables)', 3000);
    expect(s).toContain('jobs');
    expect(s).toContain('service_fee (default 95.00)');
  });

  test('line_items table has type column with all 5 line types', () => {
    const s = section('V4.4 Database Schema (8 Tables)', 3000);
    expect(s).toContain('line_items');
    expect(s).toContain('type (parts/pressure/device/software/labor)');
  });

  test('documents table has all 5 DocuSign document types', () => {
    const s = section('V4.4 Database Schema (8 Tables)', 3000);
    expect(s).toContain('documents');
    expect(s).toContain('type (work_order/affidavit/conditional/unconditional/certificate)');
  });

  test('check_ins table has GPS coordinates', () => {
    const s = section('V4.4 Database Schema (8 Tables)', 3000);
    expect(s).toContain('check_ins');
    expect(s).toContain('gps_lat');
    expect(s).toContain('gps_long');
  });

  test('tax_reports table has quarter field format YYYY-Q', () => {
    const s = section('V4.4 Database Schema (8 Tables)', 3000);
    expect(s).toContain('tax_reports');
    expect(s).toContain('YYYY-Q');
  });

  test('V4.4 API Integrations section is present', () => {
    expect(guide).toContain('V4.4 API Integrations (9 Services)');
  });

  test('Stripe integration for payments', () => {
    const s = section('V4.4 API Integrations (9 Services)', 1000);
    expect(s).toContain('Stripe');
    expect(s).toContain('Payment processing');
  });

  test('DocuSign integration for legal documents', () => {
    const s = section('V4.4 API Integrations (9 Services)', 1000);
    expect(s).toContain('DocuSign');
    expect(s).toContain('All legal documents');
  });

  test('Google Maps integration for address validation', () => {
    const s = section('V4.4 API Integrations (9 Services)', 1000);
    expect(s).toContain('Google Maps');
    expect(s).toContain('Address validation');
  });

  test('TaxJar/Avalara for sales tax calculation', () => {
    const s = section('V4.4 API Integrations (9 Services)', 1000);
    expect(s).toContain('TaxJar');
    expect(s).toContain('Sales tax calculation');
  });

  test('Twilio/SendGrid for email notifications', () => {
    const s = section('V4.4 API Integrations (9 Services)', 1000);
    expect(s).toContain('Twilio');
    expect(s).toContain('SendGrid');
    expect(s).toContain('Email notifications');
  });

  test('GPS Services for check-in verification', () => {
    const s = section('V4.4 API Integrations (9 Services)', 1000);
    expect(s).toContain('GPS Services');
    expect(s).toContain('Check-in verification');
  });
});

// ===========================================================================
// §K – PROGRAMMER SUMMARY (10 POINTS)
// ===========================================================================
test.describe('§K – V4.4 Programmer Summary (10 Points)', () => {
  test('V4.4 Programmer Summary section is present', () => {
    expect(guide).toContain('V4.4 Programmer Summary (10 Points)');
  });

  test('Point 1: Homeowner submits request with address, sq ft, property age, device source, software required', () => {
    const s = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s).toContain('property age');
    expect(s).toContain('device source');
    expect(s).toContain('software required');
  });

  test('Point 2: System auto-calculates pressure reducer, extension cord, pipe size', () => {
    const s = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s).toContain('pressure reducer if age >5');
    expect(s).toContain('25 ft default');
    expect(s).toContain('pipe size by sq ft');
  });

  test('Point 3: Contractors bid with 5 numbers', () => {
    const s = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s).toContain('5 numbers');
    expect(s).toContain('Parts $260');
    expect(s).toContain('Pressure $310');
    expect(s).toContain('Device $599.99');
    expect(s).toContain('Software $75');
    expect(s).toContain('Labor $525');
  });

  test('Point 4: System applies markups + $95 service fee + tax', () => {
    const s = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s).toContain('Parts ×1.35');
    expect(s).toContain('Pressure ×1.35');
    expect(s).toContain('Device ×1.00');
    expect(s).toContain('Software ×1.25');
    expect(s).toContain('Labor ×1.25');
    expect(s).toContain('$95 Service Fee');
  });

  test('Point 5: Four retail totals (A, B, C, D)', () => {
    const s = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s).toContain('A=$2,386.11');
    expect(s).toContain('B=$2,285.10');
    expect(s).toContain('C=$1,739.62');
    expect(s).toContain('D=$1,638.61');
  });

  test('Point 6: Homeowner pays 10% deposit then final balance', () => {
    const s = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s).toContain('10% deposit');
    expect(s).toContain('final balance');
  });

  test('Point 7: Contractor complete workflow including Unconditional Lien Release', () => {
    const s = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s).toContain('Unconditional Lien Release');
    expect(s).toContain('$1,769.99');
  });

  test('Point 8: System generates certificate, emails homeowner + agent', () => {
    const s = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s).toContain('certificate package');
    expect(s).toContain('homeowner + agent');
  });

  test('Point 9: Service Fee ($95) always a separate line item', () => {
    const s = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s).toContain('separate line item');
    expect(s).toContain('every estimate and invoice');
  });

  test('Point 10: Quarterly tax reports for state filing', () => {
    const s = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s).toContain('Quarterly tax reports');
    expect(s).toContain('state filing');
  });
});

// ===========================================================================
// §L – CROSS-SPEC CONSISTENCY (V4.3 vs V4.4)
// ===========================================================================
test.describe('§L – V4.3 vs V4.4 Cross-Spec Consistency', () => {
  test('V4.4 preserves all V4.3 markup rates (Parts ×1.35, Pressure ×1.35, Device ×1.00, Software ×1.25, Labor ×1.25)', () => {
    // Confirm the V4.3 section still has the rates
    const s43 = section('V4.3 Pricing Rules');
    expect(s43).toContain('+35%');
    expect(s43).toContain('+25%');
    expect(s43).toContain('+0%');
    expect(s43).toContain('$95');
  });

  test('V4.4 Scenario 1 total $2,386.11 is same as V4.3', () => {
    const s43 = section('V4.3 Four Pricing Scenarios');
    expect(s43).toContain('$2,386.11');
    const s44 = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s44).toContain('A=$2,386.11');
  });

  test('V4.4 Scenario 2 total $2,285.10 is same as V4.3', () => {
    const s43 = section('V4.3 Four Pricing Scenarios');
    expect(s43).toContain('$2,285.10');
    const s44 = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s44).toContain('B=$2,285.10');
  });

  test('V4.4 Scenario 3 total $1,739.62 is same as V4.3', () => {
    const s43 = section('V4.3 Four Pricing Scenarios');
    expect(s43).toContain('$1,739.62');
    const s44 = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s44).toContain('C=$1,739.62');
  });

  test('V4.4 Scenario 4 corrected from $1,638.62 (V4.3) to $1,638.61', () => {
    const s43 = section('V4.3 Four Pricing Scenarios', 3000);
    // V4.3 has the note about V4.4 correction
    expect(s43).toContain('$1,638.62');
    const s44 = section('V4.4 Programmer Summary (10 Points)', 3000);
    expect(s44).toContain('D=$1,638.61');
  });

  test('V4.4 job flow is superset of V4.3 (23 steps vs 12)', () => {
    const s43 = section('V4.3 Job Flow (12 Steps', 2000);
    expect(s43).toContain('| 12  |');
    const s44 = section('V4.4 Complete Job Flow (23 Steps)', 3000);
    expect(s44).toContain('| 23  |');
  });

  test('V4.4 DocuSign documents extend V4.3 (5 docs vs 3)', () => {
    const s43 = section('V4.3 DocuSign Documents');
    expect(s43).toContain('Work Order');
    expect(s43).toContain('Affidavit of Service');
    expect(s43).toContain('Conditional Lien Release');
    // V4.4 adds Master Services Agreement and Unconditional Lien Release
    const s44 = section('V4.4 All DocuSign Documents (5 Documents)', 2000);
    expect(s44).toContain('Contractor Master Services Agreement');
    expect(s44).toContain('Unconditional Lien Release');
  });

  test('Contractor sees only their prices in all Work Orders (V4.3 and V4.4)', () => {
    const s43 = section('V4.3 DocuSign Documents');
    expect(s43).toContain('Contractor prices only');
    const s44 = section('DocuSign 2: Work Order', 600);
    expect(s44).toContain('$95 Service Fee to MrSurety');
  });

  test('Arithmetic: V4.4 Scenario 1 markup chain is correct', () => {
    // Parts: 260 * 1.35 = 351
    expect(Math.round(260 * 1.35 * 100) / 100).toBe(351.00);
    // Pressure: 310 * 1.35 = 418.50
    expect(Math.round(310 * 1.35 * 100) / 100).toBe(418.50);
    // Device: 599.99 * 1.00 = 599.99
    expect(Math.round(599.99 * 1.00 * 100) / 100).toBe(599.99);
    // Software: 75 * 1.25 = 93.75
    expect(Math.round(75 * 1.25 * 100) / 100).toBe(93.75);
    // Labor: 525 * 1.25 = 656.25
    expect(Math.round(525 * 1.25 * 100) / 100).toBe(656.25);
    // Subtotal
    const subtotal = 351 + 418.50 + 599.99 + 93.75 + 656.25;
    expect(Math.round(subtotal * 100) / 100).toBe(2119.49);
    // Tax base = subtotal + $95
    const taxBase = subtotal + 95;
    expect(Math.round(taxBase * 100) / 100).toBe(2214.49);
    // Tax = 7.75%
    const tax = Math.round(taxBase * TAX_RATE * 100) / 100;
    expect(tax).toBe(171.62);
    // Total
    expect(Math.round((taxBase + tax) * 100) / 100).toBe(2386.11);
  });
});
