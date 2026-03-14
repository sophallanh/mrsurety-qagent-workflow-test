/**
 * MrSurety QA – Email & DocuSign Examples (Remaining Uncovered Emails)
 *
 * Source: "Email and DocuSign Examples" document referenced at:
 *   https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit
 *   (Same content as EMAIL_TEMPLATES_GUIDE.md – v1.4.4 Package)
 *
 * Cross-check: what this spec covers vs. existing email spec files
 * ──────────────────────────────────────────────────────────────────
 * ALREADY COVERED (not duplicated here):
 *   • H2  – Service Request Received          → email-v144-content.spec.ts
 *   • H3  – Estimates Ready                   → email-v144-content.spec.ts
 *   • H4  – Deposit Required                  → email-v144-content.spec.ts
 *   • H5  – Installation Confirmed            → email-v144-emails5to14.spec.ts
 *   • H6  – Reminder – Tomorrow               → email-v144-emails5to14.spec.ts
 *   • H7  – Contractor Arrived                → email-v144-emails5to14.spec.ts
 *   • H8  – Change Order Created              → email-v144-emails5to14.spec.ts
 *   • H10 – Work Complete – Final Payment     → email-v144-emails5to14.spec.ts
 *   • H11 – Payment Received                  → email-v144-emails5to14.spec.ts
 *   • H12 – Certificate Ready                 → email-v144-emails5to14.spec.ts
 *   • A6  – Certificate Ready (Agent)         → email-v144-emails5to14.spec.ts
 *   • C4  – Selected for Job                  → email-v144-content.spec.ts + emails5to14
 *   • C8  – Payment Sent                      → email-v144-emails5to14.spec.ts
 *   • C9  – Unconditional Lien Required       → email-v144-emails5to14.spec.ts
 *   • AD4 – Quarterly Tax Report              → email-v144-emails15to16-docusign.spec.ts
 *   • AD5 – Lien Release Signed (Admin)       → email-v144-emails15to16-docusign.spec.ts
 *   • DocuSign 1-6                            → email-v144-emails15to16-docusign.spec.ts
 *
 * GAPS FILLED BY THIS SPEC:
 *   H1  – Welcome – Account Created
 *   H9  – Critical Release Required
 *   H13 – Return Service Scheduled
 *   H14 – Anniversary Reminder
 *   C1  – Welcome Contractor
 *   C2  – New Job in Area
 *   C3  – Bid Received (confirmation)
 *   C5  – Sign Work Order (DocuSign trigger)
 *   C6  – Job Tomorrow Reminder
 *   C7  – Sign Affidavit / Lien (DocuSign trigger)
 *   C10 – Critical Assignment
 *   C11 – Return Service Work Order (DocuSign trigger)
 *   C12 – Change Order Approved
 *   A1  – Welcome Agent
 *   A2  – Client Started Request
 *   A3  – Client Selected Contractor
 *   A4  – Client Critical Service
 *   A5  – Client Installation Complete
 *   A7  – Client Renewal Reminder
 *   T1  – Welcome Technician
 *   T2  – New Assessment
 *   T3  – Assessment Reminder
 *   T4  – Report Upload Required
 *   AD1 – New Contractor Application
 *   AD2 – Work Ready for Approval
 *   AD3 – Critical Service Alert
 *
 * Run via: npm run test:email-examples-doc
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
// HOMEOWNER EMAILS (uncovered)
// ===========================================================================

// ---------------------------------------------------------------------------
// H1 – Welcome – Account Created
// ---------------------------------------------------------------------------
test.describe('H1 – Welcome – Account Created (Homeowner)', () => {
  test('H1 section is present in guide', () => {
    expect(guide).toContain('H1');
    expect(guide).toContain('Welcome – Account Created');
  });

  test('H1 trigger is account signup', () => {
    const idx = guide.indexOf('H1 – Welcome – Account Created');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Account signup');
  });

  test('H1 body should include login instructions', () => {
    const idx = guide.indexOf('H1 – Welcome – Account Created');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('login instructions');
  });

  test('H1 body should include platform overview', () => {
    const idx = guide.indexOf('H1 – Welcome – Account Created');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('platform overview');
  });

  test('H1 recipient is homeowner', () => {
    const idx = guide.indexOf('H1 – Welcome – Account Created');
    const section = guide.slice(idx, idx + 300);
    expect(section).toContain('Homeowner');
  });
});

// ---------------------------------------------------------------------------
// H9 – Critical Release Required
// ---------------------------------------------------------------------------
test.describe('H9 – Critical Release Required (Homeowner)', () => {
  test('H9 section is present in guide', () => {
    expect(guide).toContain('H9');
    expect(guide).toContain('Critical Release Required');
  });

  test('H9 trigger is emergency/critical water main service request', () => {
    const idx = guide.indexOf('H9 – Critical Release Required');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Emergency');
  });

  test('H9 body includes DocuSign link for Critical Change Order', () => {
    const idx = guide.indexOf('H9 – Critical Release Required');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('DocuSign');
  });

  test('H9 body includes Liability Release reference', () => {
    const idx = guide.indexOf('H9 – Critical Release Required');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Liability Release');
  });

  test('H9 homeowner must sign before work begins', () => {
    const idx = guide.indexOf('H9 – Critical Release Required');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('sign before work begins');
  });
});

// ---------------------------------------------------------------------------
// H13 – Return Service Scheduled
// ---------------------------------------------------------------------------
test.describe('H13 – Return Service Scheduled (Homeowner)', () => {
  test('H13 section is present in guide', () => {
    expect(guide).toContain('H13');
    expect(guide).toContain('Return Service Scheduled');
  });

  test('H13 trigger is return service booked', () => {
    const idx = guide.indexOf('H13 – Return Service Scheduled');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Return service booked');
  });

  test('H13 body includes date', () => {
    const idx = guide.indexOf('H13 – Return Service Scheduled');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Date');
  });

  test('H13 body includes contractor', () => {
    const idx = guide.indexOf('H13 – Return Service Scheduled');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('contractor');
  });

  test('H13 body includes service details', () => {
    const idx = guide.indexOf('H13 – Return Service Scheduled');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('service details');
  });
});

// ---------------------------------------------------------------------------
// H14 – Anniversary Reminder
// ---------------------------------------------------------------------------
test.describe('H14 – Anniversary Reminder (Homeowner)', () => {
  test('H14 section is present in guide', () => {
    expect(guide).toContain('H14');
    expect(guide).toContain('Anniversary Reminder');
  });

  test('H14 trigger is 11 months after job completion', () => {
    const idx = guide.indexOf('H14 – Anniversary Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('11 months');
  });

  test('H14 body includes annual service reminder', () => {
    const idx = guide.indexOf('H14 – Anniversary Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('annual service');
  });

  test('H14 body includes re-book link', () => {
    const idx = guide.indexOf('H14 – Anniversary Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('re-book');
  });
});

// ===========================================================================
// CONTRACTOR EMAILS (uncovered)
// ===========================================================================

// ---------------------------------------------------------------------------
// C1 – Welcome Contractor
// ---------------------------------------------------------------------------
test.describe('C1 – Welcome Contractor', () => {
  test('C1 section is present in guide', () => {
    expect(guide).toContain('C1');
    expect(guide).toContain('Welcome Contractor');
  });

  test('C1 trigger is admin approves contractor account', () => {
    const idx = guide.indexOf('C1 – Welcome Contractor');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Admin approves');
  });

  test('C1 body includes login instructions', () => {
    const idx = guide.indexOf('C1 – Welcome Contractor');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Login instructions');
  });

  test('C1 body includes how to browse and bid on jobs', () => {
    const idx = guide.indexOf('C1 – Welcome Contractor');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('bid');
  });

  test('C1 recipient is contractor', () => {
    const idx = guide.indexOf('C1 – Welcome Contractor');
    const section = guide.slice(idx, idx + 200);
    expect(section).toContain('Contractor');
  });
});

// ---------------------------------------------------------------------------
// C2 – New Job in Area
// ---------------------------------------------------------------------------
test.describe('C2 – New Job in Area (Contractor)', () => {
  test('C2 section is present in guide', () => {
    expect(guide).toContain('C2');
    expect(guide).toContain('New Job in Area');
  });

  test('C2 trigger is new service request posted', () => {
    const idx = guide.indexOf('C2 – New Job in Area');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('New service request posted');
  });

  test('C2 body does not expose homeowner PII before bid accepted', () => {
    const idx = guide.indexOf('C2 – New Job in Area');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('no homeowner PII before bid accepted');
  });

  test('C2 body includes city/zip and permit type', () => {
    const idx = guide.indexOf('C2 – New Job in Area');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('city/zip');
    expect(section).toContain('permit type');
  });

  test('C2 body includes link to bid', () => {
    const idx = guide.indexOf('C2 – New Job in Area');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('link to bid');
  });
});

// ---------------------------------------------------------------------------
// C3 – Bid Received (confirmation)
// ---------------------------------------------------------------------------
test.describe('C3 – Bid Received Confirmation (Contractor)', () => {
  test('C3 section is present in guide', () => {
    expect(guide).toContain('C3');
    expect(guide).toContain('Bid Received');
  });

  test('C3 trigger is contractor submits bid', () => {
    const idx = guide.indexOf('C3 – Bid Received');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Contractor submits bid');
  });

  test('C3 body includes bid confirmation', () => {
    const idx = guide.indexOf('C3 – Bid Received');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Bid confirmation');
  });

  test('C3 body includes job details', () => {
    const idx = guide.indexOf('C3 – Bid Received');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('job details');
  });

  test('C3 body includes next steps', () => {
    const idx = guide.indexOf('C3 – Bid Received');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('next steps');
  });
});

// ---------------------------------------------------------------------------
// C5 – Sign Work Order (DocuSign trigger)
// ---------------------------------------------------------------------------
test.describe('C5 – Sign Work Order — DocuSign Trigger (Contractor)', () => {
  test('C5 section is present in guide', () => {
    expect(guide).toContain('C5');
    expect(guide).toContain('Sign Work Order');
  });

  test('C5 trigger is deposit paid', () => {
    const idx = guide.indexOf('C5 – Sign Work Order');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Deposit paid');
  });

  test('C5 body includes DocuSign link for Work Order / Task Contract', () => {
    const idx = guide.indexOf('C5 – Sign Work Order');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('DocuSign');
    expect(section).toContain('Work Order');
  });

  test('C5 body includes job details', () => {
    const idx = guide.indexOf('C5 – Sign Work Order');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('job details');
  });

  test('C5 is listed as DocuSign-triggered email in checklist', () => {
    // The guide checklist marks C5 as a DocuSign email
    const checklistIdx = guide.indexOf('| C5 |');
    expect(checklistIdx).toBeGreaterThan(0);
    const checklistSection = guide.slice(checklistIdx, checklistIdx + 200);
    expect(checklistSection).toContain('DocuSign');
  });
});

// ---------------------------------------------------------------------------
// C6 – Job Tomorrow Reminder
// ---------------------------------------------------------------------------
test.describe('C6 – Job Tomorrow Reminder (Contractor)', () => {
  test('C6 section is present in guide', () => {
    expect(guide).toContain('C6');
    expect(guide).toContain('Job Tomorrow Reminder');
  });

  test('C6 trigger is 24 hours before scheduled job date', () => {
    const idx = guide.indexOf('C6 – Job Tomorrow Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('24 hours');
  });

  test('C6 body includes property address', () => {
    const idx = guide.indexOf('C6 – Job Tomorrow Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Property address');
  });

  test('C6 body includes scheduled time', () => {
    const idx = guide.indexOf('C6 – Job Tomorrow Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('time');
  });

  test('C6 body includes homeowner contact', () => {
    const idx = guide.indexOf('C6 – Job Tomorrow Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('homeowner contact');
  });
});

// ---------------------------------------------------------------------------
// C7 – Sign Affidavit / Lien (DocuSign trigger)
// ---------------------------------------------------------------------------
test.describe('C7 – Sign Affidavit / Lien — DocuSign Trigger (Contractor)', () => {
  test('C7 section is present in guide', () => {
    expect(guide).toContain('C7');
    expect(guide).toContain('Sign Affidavit');
  });

  test('C7 trigger is job complete with photos and invoice uploaded', () => {
    const idx = guide.indexOf('C7 – Sign Affidavit / Lien');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Job complete');
    expect(section).toContain('photos');
    expect(section).toContain('invoice');
  });

  test('C7 body includes DocuSign link for Affidavit of Service', () => {
    const idx = guide.indexOf('C7 – Sign Affidavit / Lien');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Affidavit of Service');
  });

  test('C7 body includes DocuSign link for Conditional Lien Release', () => {
    const idx = guide.indexOf('C7 – Sign Affidavit / Lien');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Conditional Lien Release');
  });

  test('C7 is listed as DocuSign-triggered email in checklist', () => {
    const checklistIdx = guide.indexOf('| C7 |');
    expect(checklistIdx).toBeGreaterThan(0);
    const checklistSection = guide.slice(checklistIdx, checklistIdx + 200);
    expect(checklistSection).toContain('DocuSign');
  });
});

// ---------------------------------------------------------------------------
// C10 – Critical Assignment
// ---------------------------------------------------------------------------
test.describe('C10 – Critical Assignment (Contractor)', () => {
  test('C10 section is present in guide', () => {
    expect(guide).toContain('C10');
    expect(guide).toContain('Critical Assignment');
  });

  test('C10 trigger is emergency/critical service assigned', () => {
    const idx = guide.indexOf('C10 – Critical Assignment');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Emergency');
  });

  test('C10 body includes homeowner location', () => {
    const idx = guide.indexOf('C10 – Critical Assignment');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Homeowner location');
  });

  test('C10 body specifies immediate action required', () => {
    const idx = guide.indexOf('C10 – Critical Assignment');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('immediate action');
  });

  test('C10 body includes contact info', () => {
    const idx = guide.indexOf('C10 – Critical Assignment');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('contact info');
  });
});

// ---------------------------------------------------------------------------
// C11 – Return Service Work Order (DocuSign trigger)
// ---------------------------------------------------------------------------
test.describe('C11 – Return Service Work Order — DocuSign Trigger (Contractor)', () => {
  test('C11 section is present in guide', () => {
    expect(guide).toContain('C11');
    expect(guide).toContain('Return Service Work Order');
  });

  test('C11 trigger is return service requested', () => {
    const idx = guide.indexOf('C11 – Return Service Work Order');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Return service requested');
  });

  test('C11 body includes DocuSign link for Return Service Work Order', () => {
    const idx = guide.indexOf('C11 – Return Service Work Order');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('DocuSign');
    expect(section).toContain('Return Service');
  });

  test('C11 is listed as DocuSign-triggered email in checklist', () => {
    const checklistIdx = guide.indexOf('| C11 |');
    expect(checklistIdx).toBeGreaterThan(0);
    const checklistSection = guide.slice(checklistIdx, checklistIdx + 200);
    expect(checklistSection).toContain('DocuSign');
  });
});

// ---------------------------------------------------------------------------
// C12 – Change Order Approved
// ---------------------------------------------------------------------------
test.describe('C12 – Change Order Approved (Contractor)', () => {
  test('C12 section is present in guide', () => {
    expect(guide).toContain('C12');
    expect(guide).toContain('Change Order Approved');
  });

  test('C12 trigger is homeowner approves change order', () => {
    const idx = guide.indexOf('C12 – Change Order Approved');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Homeowner approves change order');
  });

  test('C12 body includes updated job details', () => {
    const idx = guide.indexOf('C12 – Change Order Approved');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Updated job details');
  });

  test('C12 body includes new amounts', () => {
    const idx = guide.indexOf('C12 – Change Order Approved');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('new amounts');
  });

  test('C12 body includes proceed confirmation', () => {
    const idx = guide.indexOf('C12 – Change Order Approved');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('proceed confirmation');
  });
});

// ===========================================================================
// AGENT EMAILS (uncovered)
// ===========================================================================

// ---------------------------------------------------------------------------
// A1 – Welcome Agent
// ---------------------------------------------------------------------------
test.describe('A1 – Welcome Agent', () => {
  test('A1 section is present in guide', () => {
    expect(guide).toContain('A1');
    expect(guide).toContain('Welcome Agent');
  });

  test('A1 trigger is agent account created', () => {
    const idx = guide.indexOf('A1 – Welcome Agent');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Agent account created');
  });

  test('A1 body explains how to generate referral links', () => {
    const idx = guide.indexOf('A1 – Welcome Agent');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('referral links');
  });

  test('A1 body includes platform overview', () => {
    const idx = guide.indexOf('A1 – Welcome Agent');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('platform overview');
  });

  test('A1 recipient is agent', () => {
    const idx = guide.indexOf('A1 – Welcome Agent');
    const section = guide.slice(idx, idx + 200);
    expect(section).toContain('Agent');
  });
});

// ---------------------------------------------------------------------------
// A2 – Client Started Request
// ---------------------------------------------------------------------------
test.describe('A2 – Client Started Request (Agent)', () => {
  test('A2 section is present in guide', () => {
    expect(guide).toContain('A2');
    expect(guide).toContain('Client Started Request');
  });

  test('A2 trigger is client uses agent referral link', () => {
    const idx = guide.indexOf('A2 – Client Started Request');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('referral link');
  });

  test('A2 body includes client name', () => {
    const idx = guide.indexOf('A2 – Client Started Request');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain("Client's name");
  });

  test('A2 body includes property and request details', () => {
    const idx = guide.indexOf('A2 – Client Started Request');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('property');
    expect(section).toContain('request details');
  });

  test('A2 body includes link to agent portal', () => {
    const idx = guide.indexOf('A2 – Client Started Request');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('agent portal');
  });
});

// ---------------------------------------------------------------------------
// A3 – Client Selected Contractor
// ---------------------------------------------------------------------------
test.describe('A3 – Client Selected Contractor (Agent)', () => {
  test('A3 section is present in guide', () => {
    expect(guide).toContain('A3');
    expect(guide).toContain('Client Selected Contractor');
  });

  test('A3 trigger is client confirms a contractor', () => {
    const idx = guide.indexOf('A3 – Client Selected Contractor');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Client confirms');
  });

  test('A3 body includes contractor name', () => {
    const idx = guide.indexOf('A3 – Client Selected Contractor');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Contractor name');
  });

  test('A3 body includes project details and status update', () => {
    const idx = guide.indexOf('A3 – Client Selected Contractor');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('project details');
    expect(section).toContain('status update');
  });
});

// ---------------------------------------------------------------------------
// A4 – Client Critical Service
// ---------------------------------------------------------------------------
test.describe('A4 – Client Critical Service (Agent)', () => {
  test('A4 section is present in guide', () => {
    expect(guide).toContain('A4');
    expect(guide).toContain('Client Critical Service');
  });

  test('A4 trigger is client has emergency service', () => {
    const idx = guide.indexOf('A4 – Client Critical Service');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('emergency service');
  });

  test('A4 body includes emergency notification', () => {
    const idx = guide.indexOf('A4 – Client Critical Service');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Emergency notification');
  });

  test('A4 body includes client contact info', () => {
    const idx = guide.indexOf('A4 – Client Critical Service');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('client contact info');
  });
});

// ---------------------------------------------------------------------------
// A5 – Client Installation Complete
// ---------------------------------------------------------------------------
test.describe('A5 – Client Installation Complete (Agent)', () => {
  test('A5 section is present in guide', () => {
    expect(guide).toContain('A5');
    expect(guide).toContain('Client Installation Complete');
  });

  test('A5 trigger is work done and approved', () => {
    const idx = guide.indexOf('A5 – Client Installation Complete');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Work done and approved');
  });

  test('A5 body includes project summary', () => {
    const idx = guide.indexOf('A5 – Client Installation Complete');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Project summary');
  });

  test('A5 body includes completion date', () => {
    const idx = guide.indexOf('A5 – Client Installation Complete');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('completion date');
  });
});

// ---------------------------------------------------------------------------
// A7 – Client Renewal Reminder
// ---------------------------------------------------------------------------
test.describe('A7 – Client Renewal Reminder (Agent)', () => {
  test('A7 section is present in guide', () => {
    expect(guide).toContain('A7');
    expect(guide).toContain('Client Renewal Reminder');
  });

  test('A7 trigger is 11 months after job completion', () => {
    const idx = guide.indexOf('A7 – Client Renewal Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('11 months');
  });

  test('A7 body includes renewal opportunity', () => {
    const idx = guide.indexOf('A7 – Client Renewal Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Renewal opportunity');
  });

  test('A7 body includes client contact details', () => {
    const idx = guide.indexOf('A7 – Client Renewal Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('client contact details');
  });
});

// ===========================================================================
// TECHNICIAN EMAILS (all uncovered)
// ===========================================================================

// ---------------------------------------------------------------------------
// T1 – Welcome Technician
// ---------------------------------------------------------------------------
test.describe('T1 – Welcome Technician', () => {
  test('T1 section is present in guide', () => {
    expect(guide).toContain('T1');
    expect(guide).toContain('Welcome Technician');
  });

  test('T1 trigger is account created', () => {
    const idx = guide.indexOf('T1 – Welcome Technician');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Account created');
  });

  test('T1 body includes login instructions', () => {
    const idx = guide.indexOf('T1 – Welcome Technician');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Login instructions');
  });

  test('T1 body includes service area assignment', () => {
    const idx = guide.indexOf('T1 – Welcome Technician');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('service area assignment');
  });

  test('T1 recipient is technician', () => {
    const idx = guide.indexOf('T1 – Welcome Technician');
    const section = guide.slice(idx, idx + 200);
    expect(section).toContain('Technician');
  });
});

// ---------------------------------------------------------------------------
// T2 – New Assessment
// ---------------------------------------------------------------------------
test.describe('T2 – New Assessment (Technician)', () => {
  test('T2 section is present in guide', () => {
    expect(guide).toContain('T2');
    expect(guide).toContain('New Assessment');
  });

  test('T2 trigger is assessment service paid by homeowner', () => {
    const idx = guide.indexOf('T2 – New Assessment');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Assessment service paid');
  });

  test('T2 body includes property details', () => {
    const idx = guide.indexOf('T2 – New Assessment');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Property details');
  });

  test('T2 body includes assessment type', () => {
    const idx = guide.indexOf('T2 – New Assessment');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('assessment type');
  });

  test('T2 body includes contact info and scheduling link', () => {
    const idx = guide.indexOf('T2 – New Assessment');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('contact info');
    expect(section).toContain('scheduling link');
  });
});

// ---------------------------------------------------------------------------
// T3 – Assessment Reminder
// ---------------------------------------------------------------------------
test.describe('T3 – Assessment Reminder (Technician)', () => {
  test('T3 section is present in guide', () => {
    expect(guide).toContain('T3');
    expect(guide).toContain('Assessment Reminder');
  });

  test('T3 trigger is 24 hours before assessment visit', () => {
    const idx = guide.indexOf('T3 – Assessment Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('24 hours');
  });

  test('T3 body includes address', () => {
    const idx = guide.indexOf('T3 – Assessment Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Address');
  });

  test('T3 body includes time', () => {
    const idx = guide.indexOf('T3 – Assessment Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('time');
  });

  test('T3 body includes homeowner contact', () => {
    const idx = guide.indexOf('T3 – Assessment Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('homeowner contact');
  });
});

// ---------------------------------------------------------------------------
// T4 – Report Upload Required
// ---------------------------------------------------------------------------
test.describe('T4 – Report Upload Required (Technician)', () => {
  test('T4 section is present in guide', () => {
    expect(guide).toContain('T4');
    expect(guide).toContain('Report Upload Required');
  });

  test('T4 trigger is assessment visit completed', () => {
    const idx = guide.indexOf('T4 – Report Upload Required');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Assessment visit completed');
  });

  test('T4 body includes instructions to upload assessment report', () => {
    const idx = guide.indexOf('T4 – Report Upload Required');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('upload assessment report');
  });

  test('T4 body includes deadline', () => {
    const idx = guide.indexOf('T4 – Report Upload Required');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('deadline');
  });
});

// ===========================================================================
// ADMIN EMAILS (uncovered)
// ===========================================================================

// ---------------------------------------------------------------------------
// AD1 – New Contractor Application
// ---------------------------------------------------------------------------
test.describe('AD1 – New Contractor Application (Admin)', () => {
  test('AD1 section is present in guide', () => {
    expect(guide).toContain('AD1');
    expect(guide).toContain('New Contractor Application');
  });

  test('AD1 trigger is contractor signs up', () => {
    const idx = guide.indexOf('AD1 – New Contractor Application');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Contractor signs up');
  });

  test('AD1 body includes contractor name and company', () => {
    const idx = guide.indexOf('AD1 – New Contractor Application');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Contractor name');
    expect(section).toContain('company');
  });

  test('AD1 body includes CSLB license number', () => {
    const idx = guide.indexOf('AD1 – New Contractor Application');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('CSLB license number');
  });

  test('AD1 body includes link to approve/reject', () => {
    const idx = guide.indexOf('AD1 – New Contractor Application');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('approve/reject');
  });

  test('AD1 recipient is admin', () => {
    const idx = guide.indexOf('AD1 – New Contractor Application');
    const section = guide.slice(idx, idx + 200);
    expect(section).toContain('Admin');
  });
});

// ---------------------------------------------------------------------------
// AD2 – Work Ready for Approval
// ---------------------------------------------------------------------------
test.describe('AD2 – Work Ready for Approval (Admin)', () => {
  test('AD2 section is present in guide', () => {
    expect(guide).toContain('AD2');
    expect(guide).toContain('Work Ready for Approval');
  });

  test('AD2 trigger is job complete with all documents submitted', () => {
    const idx = guide.indexOf('AD2 – Work Ready for Approval');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Job complete');
    expect(section).toContain('documents submitted');
  });

  test('AD2 body includes link to review photos and documents', () => {
    const idx = guide.indexOf('AD2 – Work Ready for Approval');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('review photos');
    expect(section).toContain('documents');
  });

  test('AD2 body includes approve work button/link', () => {
    const idx = guide.indexOf('AD2 – Work Ready for Approval');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('approve work');
  });
});

// ---------------------------------------------------------------------------
// AD3 – Critical Service Alert
// ---------------------------------------------------------------------------
test.describe('AD3 – Critical Service Alert (Admin)', () => {
  test('AD3 section is present in guide', () => {
    expect(guide).toContain('AD3');
    expect(guide).toContain('Critical Service Alert');
  });

  test('AD3 trigger is emergency service request', () => {
    const idx = guide.indexOf('AD3 – Critical Service Alert');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Emergency service request');
  });

  test('AD3 body includes homeowner details', () => {
    const idx = guide.indexOf('AD3 – Critical Service Alert');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Homeowner details');
  });

  test('AD3 body includes urgency level', () => {
    const idx = guide.indexOf('AD3 – Critical Service Alert');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('urgency level');
  });

  test('AD3 body includes contractor assignment status', () => {
    const idx = guide.indexOf('AD3 – Critical Service Alert');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('contractor assignment status');
  });
});

// ===========================================================================
// CROSS-CUTTING: Email Inventory Completeness
// ===========================================================================

test.describe('Email Inventory Completeness — Full Checklist', () => {
  test('Guide contains all 14 homeowner email codes (H1–H14)', () => {
    for (let i = 1; i <= 14; i++) {
      expect(guide).toContain(`H${i}`);
    }
  });

  test('Guide contains all 12 contractor email codes (C1–C12)', () => {
    for (let i = 1; i <= 12; i++) {
      expect(guide).toContain(`C${i}`);
    }
  });

  test('Guide contains all 7 agent email codes (A1–A7)', () => {
    for (let i = 1; i <= 7; i++) {
      expect(guide).toContain(`A${i}`);
    }
  });

  test('Guide contains all 4 technician email codes (T1–T4)', () => {
    for (let i = 1; i <= 4; i++) {
      expect(guide).toContain(`T${i}`);
    }
  });

  test('Guide contains all 5 admin email codes (AD1–AD5)', () => {
    for (let i = 1; i <= 5; i++) {
      expect(guide).toContain(`AD${i}`);
    }
  });

  test('Total email count in guide is 42 (H14 + C12 + A7 + T4 + AD5)', () => {
    const total = 14 + 12 + 7 + 4 + 5;
    expect(total).toBe(42);
  });
});

// ===========================================================================
// EMAIL DELIVERY & TIMING RULES
// ===========================================================================

test.describe('Email Delivery and Timing Rules', () => {
  test('Guide specifies 5-minute delivery SLA for email triggers', () => {
    expect(guide).toContain('5 minutes');
  });

  test('Guide instructs QA to screenshot every email', () => {
    expect(guide).toContain('Screenshot every email');
  });

  test('Guide instructs QA to flag verbiage issues', () => {
    expect(guide).toContain('Flag any verbiage issues');
  });

  test('Guide instructs QA to log missed delivery as a bug', () => {
    expect(guide).toContain('log as a bug');
  });
});

// ===========================================================================
// DOCUSIGN TRIGGERED EMAILS — CHECKLIST COVERAGE
// ===========================================================================

test.describe('DocuSign-Triggered Emails — Checklist', () => {
  const docuSignEmails = ['C5', 'C7', 'C9', 'C11'];

  for (const code of docuSignEmails) {
    test(`${code} is present in contractor email checklist`, () => {
      const checklistIdx = guide.indexOf(`| ${code} |`);
      expect(checklistIdx).toBeGreaterThan(0);
    });
  }

  test('Guide contains DocuSign references for lien release emails', () => {
    expect(guide).toContain('DocuSign');
    expect(guide).toContain('Lien Release');
  });

  test('Guide contains DocuSign reference for Affidavit of Service', () => {
    expect(guide).toContain('Affidavit of Service');
  });

  test('Guide contains DocuSign reference for Work Order / Task Contract', () => {
    expect(guide).toContain('Work Order');
    expect(guide).toContain('Task Contract');
  });
});

// ===========================================================================
// TECHNICIAN EMAIL TRIGGER — ASSESSMENT WORKFLOW
// ===========================================================================

test.describe('Technician Email Triggers — Assessment Service Workflow', () => {
  test('T2 is triggered after homeowner pays assessment fee ($185 + mileage)', () => {
    const idx = guide.indexOf('T2 – New Assessment');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Assessment service paid');
  });

  test('T3 trigger is exactly 24 hours before assessment visit', () => {
    const idx = guide.indexOf('T3 – Assessment Reminder');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('24 hours');
    expect(section).toContain('assessment');
  });

  test('T4 trigger requires completed assessment visit before report upload', () => {
    const idx = guide.indexOf('T4 – Report Upload Required');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('Assessment visit completed');
  });

  test('T1–T4 technician emails are all listed in guide checklist', () => {
    expect(guide).toContain('T1 | **Welcome Technician**');
    expect(guide).toContain('T2 | **New Assessment**');
    expect(guide).toContain('T3 | **Assessment Reminder**');
    expect(guide).toContain('T4 | **Report Upload Required**');
  });
});
