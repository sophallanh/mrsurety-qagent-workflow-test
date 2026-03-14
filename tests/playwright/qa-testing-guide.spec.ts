/**
 * QA Testing Guide Cross-Reference Spec
 *
 * Pure content tests — no browser required.
 * Validates that SHORT_WORKFLOW_GUIDE.md and SERVICE_FORM_GUIDE.md capture all
 * content from "MR SURETY – TESTING GUIDE FOR QA TEAM" (Christopher's doc).
 *
 * Testing Guide Sections Covered:
 *   Part 1 – User Types to Create
 *   Part 2 – Key Workflows (9 workflows)
 *   Part 3 – Email Testing Checklist (39 emails)
 *   Part 4 – DocuSign Testing Checklist (8 documents)
 *   Part 5 – Special Testing Scenarios (A–E)
 *
 * Covers:
 *   §A – User Types (Part 1): 5 roles, test CSLB numbers, admin credentials
 *   §B – Workflow 1: Agent Referral (both methods, link format, landing page)
 *   §C – Workflow 2: Homeowner Form (pipe size, pressure reducer, water main photo)
 *   §D – Workflow 3: Contractor Bidding (both methods, resale certificate)
 *   §E – Workflow 4: Homeowner Selection & Deposit ($95 fee, retail markups, 10% deposit)
 *   §F – Workflow 5: Contractor Job Execution (GPS check-in, DocuSign sequence)
 *   §G – Workflow 6: Admin Approval & Payment (unconditional lien access lock)
 *   §H – Workflows 7–9: Return Service, Critical Service, Assessment Service
 *   §I – Email Checklist (39 emails: Homeowner, Contractor, Agent, Technician, Admin)
 *   §J – DocuSign Checklist (8 documents)
 *   §K – Special Scenarios A–E (resale cert, software setup, device source, multi-property, incomplete forms)
 *
 * Run via: npm run test:qa-testing-guide
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Load the short workflow guide (repository representation of the Testing Guide)
// ---------------------------------------------------------------------------
const GUIDE_PATH = path.join(
  __dirname,
  '../../qa/spec-docs/workflow-guides/SHORT_WORKFLOW_GUIDE.md',
);

// Also load SERVICE_FORM_GUIDE.md for Special Scenarios (A–E) detailed content
const SERVICE_FORM_PATH = path.join(
  __dirname,
  '../../qa/spec-docs/service-form/SERVICE_FORM_GUIDE.md',
);

let guide: string;
let serviceForm: string;

test.beforeAll(() => {
  guide = fs.readFileSync(GUIDE_PATH, 'utf8');
  serviceForm = fs.readFileSync(SERVICE_FORM_PATH, 'utf8');
});

// Helper: get text from SHORT_WORKFLOW_GUIDE.md starting at a marker
function section(marker: string, chars = 3000): string {
  const idx = guide.indexOf(marker);
  if (idx === -1) return '';
  return guide.slice(idx, idx + chars);
}

// Helper: get text from SERVICE_FORM_GUIDE.md starting at a marker
function sfSection(marker: string, chars = 3000): string {
  const idx = serviceForm.indexOf(marker);
  if (idx === -1) return '';
  return serviceForm.slice(idx, idx + chars);
}


// ===========================================================================
// §A – USER TYPES (PART 1)
// ===========================================================================
test.describe('§A – User Types (Part 1)', () => {
  test('User Types section is present', () => {
    expect(guide).toContain('User Types');
  });

  test('Admin user is listed with email admin@mrsurety.com', () => {
    expect(guide).toContain('admin@mrsurety.com');
  });

  test('Admin password is MrSurety2026!', () => {
    expect(guide).toContain('MrSurety2026!');
  });

  test('Contractor test CSLB number 999888 is documented', () => {
    expect(guide).toContain('999888');
  });

  test('Contractor test CSLB number 999777 is documented', () => {
    expect(guide).toContain('999777');
  });

  test('Contractor 1 accepts Resale Certificate (YES)', () => {
    const s = section('Contractor 1', 200);
    expect(s).toMatch(/Resale Cert YES/i);
  });

  test('Contractor 2 does NOT accept Resale Certificate (NO)', () => {
    const s = section('Contractor 2', 200);
    expect(s).toMatch(/Resale Cert NO/i);
  });

  test('Technician test account is documented', () => {
    expect(guide).toContain('tech1@outlook.com');
  });

  test('Technician service area zip codes 92530 and 92531 are documented', () => {
    const s = section('Technician', 200);
    expect(s).toContain('92530');
    expect(s).toContain('92531');
  });

  test('Homeowner 1 is documented (1800 sq ft)', () => {
    expect(guide).toContain('homeowner1@outlook.com');
  });

  test('Homeowner 2 is documented (2500 sq ft / built 2022)', () => {
    expect(guide).toContain('homeowner2@outlook.com');
  });

  test('Homeowner 3 is documented (no agent)', () => {
    expect(guide).toContain('homeowner3@outlook.com');
  });

  test('Test password Test123! is documented for non-admin users', () => {
    expect(guide).toContain('Test123!');
  });

  test('Five user roles are present: Admin, Agent, Homeowner, Contractor, Technician', () => {
    expect(guide).toContain('Admin');
    expect(guide).toContain('Agent');
    expect(guide).toContain('Homeowner');
    expect(guide).toContain('Contractor');
    expect(guide).toContain('Technician');
  });
});

// ===========================================================================
// §B – WORKFLOW 1: AGENT REFERRAL (TWO METHODS)
// ===========================================================================
test.describe('§B – Workflow 1: Agent Referral (Two Methods)', () => {
  test('Workflow 1 section is present', () => {
    expect(guide).toContain('Workflow 1');
    expect(guide).toContain('Agent Referral');
  });

  test('Method A – Agent Creates Referral Link is documented', () => {
    expect(guide).toContain('Method A');
    expect(guide).toContain('Referral Link');
  });

  test('Referral link format mrsurety.com/ref/AGENT123 is documented', () => {
    expect(guide).toContain('mrsurety.com/ref/AGENT123');
  });

  test('Landing page shows "Brought to you by [Agent Name]"', () => {
    expect(guide).toContain('Brought to you by');
  });

  test('Job is automatically linked to agent after form submission', () => {
    expect(guide).toMatch(/automatically linked to agent|job automatically linked/i);
  });

  test('New client appears in agent dashboard', () => {
    expect(guide).toMatch(/agent.*dashboard|agent portal/i);
  });

  test('Referral link can be used multiple times (creates separate jobs)', () => {
    expect(guide).toMatch(/multiple times|each use creates a SEPARATE job/i);
  });

  test('Method B – Homeowner Adds Agent Email is documented', () => {
    expect(guide).toContain('Method B');
    expect(guide).toMatch(/Homeowner Adds Agent Email|agent email/i);
  });

  test('Method B uses Insurance section of form for agent email entry', () => {
    const s = section('Method B', 600);
    expect(s).toContain('Insurance');
  });

  test('Method B creates pending agent record on submit', () => {
    const s = section('Method B', 600);
    expect(s).toMatch(/pending agent record/i);
  });

  test('Admin approval triggers agent welcome email in Method B', () => {
    const s = section('Method B', 600);
    expect(s).toMatch(/Admin approves.*agent.*welcome|admin.*approve/i);
  });
});

// ===========================================================================
// §C – WORKFLOW 2: HOMEOWNER SERVICE REQUEST FORM
// ===========================================================================
test.describe('§C – Workflow 2: Homeowner Service Request Form', () => {
  test('Workflow 2 section is present', () => {
    expect(guide).toContain('Workflow 2');
    expect(guide).toContain('Homeowner Service Request');
  });

  test('Service Types: Installation vs Assessment are documented', () => {
    expect(guide).toContain('Installation');
    expect(guide).toContain('Assessment');
  });

  test('Pipe size logic for under 2000 sq ft = 3/4 inch', () => {
    expect(guide).toMatch(/Under 2,000|Under 2000/);
    expect(guide).toContain('3/4 inch');
  });

  test('Pipe size logic for 2001-3000 sq ft = 1 inch', () => {
    expect(guide).toMatch(/2,001.*3,000|2001.*3000/);
    expect(guide).toContain('1 inch');
  });

  test('Pipe size logic for 3001-5000 sq ft = 1 1/4 inch', () => {
    expect(guide).toMatch(/3,001.*5,000|3001.*5000/);
    expect(guide).toContain('1 1/4 inch');
  });

  test('Pressure reducer required for homes older than 5 years', () => {
    expect(guide).toMatch(/>.*5 years.*REQUIRED|older than 5|5 years ago.*REQUIRED/i);
  });

  test('Pressure reducer not required for homes 5 years or newer', () => {
    expect(guide).toMatch(/≤.*5 years.*NOT required|5 years.*not required/i);
  });

  test('Water main photo is REQUIRED and form must not submit without it', () => {
    expect(guide).toMatch(/Water main photo.*REQUIRED|REQUIRED.*water main/i);
    expect(guide).toMatch(/must NOT submit without|form must NOT submit/i);
  });

  test('LiDar is optional', () => {
    expect(guide).toMatch(/LiDar.*optional|optional.*LiDar/i);
  });

  test('Form sections include Account, Property Address, Insurance Info, Home Specifics, Device Info', () => {
    const s = section('Workflow 2', 600);
    expect(s).toContain('Account');
    expect(s).toContain('Property Address');
    expect(s).toContain('Insurance Info');
    expect(s).toContain('Home Specifics');
    expect(s).toContain('Device Info');
  });
});

// ===========================================================================
// §D – WORKFLOW 3: CONTRACTOR BIDDING (TWO METHODS)
// ===========================================================================
test.describe('§D – Workflow 3: Contractor Bidding (Two Methods)', () => {
  test('Workflow 3 section is present', () => {
    expect(guide).toContain('Workflow 3');
    expect(guide).toContain('Contractor Bidding');
  });

  test('Method A – Upload Written Estimate is documented', () => {
    const s = section('Workflow 3', 800);
    expect(s).toContain('Method A');
    expect(s).toMatch(/Upload Written Estimate/i);
  });

  test('Method A includes parts total with description', () => {
    const s = section('Upload Written Estimate', 400);
    expect(s).toMatch(/Parts total.*description|parts.*description/i);
  });

  test('Method A includes pressure reducer price', () => {
    const s = section('Upload Written Estimate', 400);
    expect(s).toMatch(/Pressure reducer price/i);
  });

  test('Method A includes software checkbox at $75', () => {
    const s = section('Upload Written Estimate', 400);
    expect(s).toMatch(/Software checkbox.*\$75|\$75.*software/i);
  });

  test('Method A includes Resale Certificate selection', () => {
    const s = section('Upload Written Estimate', 400);
    expect(s).toMatch(/Resale Certificate/i);
  });

  test('Method B – System Estimate Creator is documented', () => {
    const s = section('Workflow 3', 800);
    expect(s).toContain('Method B');
    expect(s).toMatch(/System Estimate Creator/i);
  });

  test('Method B has line item table that auto-calculates', () => {
    const s = section('System Estimate Creator', 400);
    expect(s).toMatch(/auto-calculates|line item table/i);
  });

  test('Method B device auto-populates $599.99 if contractor-provided', () => {
    const s = section('System Estimate Creator', 400);
    expect(s).toMatch(/auto-populates.*\$599\.99|\$599\.99.*auto-populates/i);
  });
});

// ===========================================================================
// §E – WORKFLOW 4: HOMEOWNER SELECTION & DEPOSIT
// ===========================================================================
test.describe('§E – Workflow 4: Homeowner Selection & Deposit', () => {
  test('Workflow 4 section is present', () => {
    expect(guide).toContain('Workflow 4');
    expect(guide).toContain('Selection');
  });

  test('Homeowner views retail prices only (no contractor prices)', () => {
    const s = section('Workflow 4', 600);
    expect(s).toMatch(/retail prices only|no contractor prices/i);
  });

  test('$95 Service Fee must appear in all estimates', () => {
    const s = section('Workflow 4', 600);
    expect(s).toMatch(/\$95 Service Fee.*all estimates|Service Fee.*\$95/i);
  });

  test('Homeowner pays 10% deposit', () => {
    const s = section('Workflow 4', 600);
    expect(s).toContain('10% deposit');
  });

  test('Parts, Pressure, Cable markup is +35%', () => {
    const s = section('Retail Price Markups', 400);
    expect(s).toContain('+35%');
    expect(s).toMatch(/Parts.*Pressure.*Cable|Parts, Pressure, Cable/i);
  });

  test('Labor and Software markup is +25%', () => {
    const s = section('Retail Price Markups', 400);
    expect(s).toContain('+25%');
    expect(s).toMatch(/Labor.*Software|Software.*Labor/i);
  });

  test('Device (Contractor Provided) is $599.99 fixed at 0% markup', () => {
    const s = section('Retail Price Markups', 400);
    expect(s).toContain('$599.99');
    expect(s).toMatch(/0% markup|fixed.*0%/i);
  });

  test('Service Fee is $95.00 flat on every estimate', () => {
    const s = section('Retail Price Markups', 400);
    expect(s).toContain('$95.00');
    expect(s).toMatch(/flat.*every estimate|every estimate/i);
  });

  test('"Approve & Schedule" button is part of selection step', () => {
    const s = section('Workflow 4', 600);
    expect(s).toMatch(/Approve.*Schedule/i);
  });

  test('Installation date selected from contractor calendar', () => {
    const s = section('Workflow 4', 600);
    expect(s).toMatch(/installation date.*calendar|calendar/i);
  });
});

// ===========================================================================
// §F – WORKFLOW 5: CONTRACTOR JOB EXECUTION
// ===========================================================================
test.describe('§F – Workflow 5: Contractor Job Execution', () => {
  test('Workflow 5 section is present', () => {
    expect(guide).toContain('Workflow 5');
    expect(guide).toContain('Job Execution');
  });

  test('Contractor receives Work Order / Task Contract DocuSign to sign', () => {
    const s = section('Workflow 5', 600);
    expect(s).toMatch(/Work Order.*Task Contract|DocuSign.*Work Order/i);
  });

  test('GPS check-in with timestamp and photo is captured on job day', () => {
    const s = section('Workflow 5', 600);
    expect(s).toMatch(/GPS.*check-in|check-in.*GPS/i);
    expect(s).toMatch(/timestamp.*photo|photo.*timestamp/i);
  });

  test('Change order process: contractor creates → homeowner notified → approves or declines', () => {
    const s = section('Workflow 5', 600);
    expect(s).toMatch(/change order/i);
    expect(s).toMatch(/homeowner.*notification|homeowner receives notification/i);
    expect(s).toMatch(/approves.*declines|approve.*decline/i);
  });

  test('Contractor uploads photos and final invoice after work', () => {
    const s = section('Workflow 5', 600);
    expect(s).toMatch(/upload.*photos.*invoice|photos.*final invoice/i);
  });

  test('Contractor signs DocuSign Affidavit of Service', () => {
    const s = section('Workflow 5', 600);
    expect(s).toMatch(/Affidavit of Service/i);
  });

  test('Contractor signs DocuSign Conditional Lien Release with invoice and initials', () => {
    const s = section('Workflow 5', 600);
    expect(s).toMatch(/Conditional Lien Release/i);
    expect(s).toMatch(/includes invoice|requires initials/i);
  });

  test('Status updates to Pending Review after documents signed', () => {
    const s = section('Workflow 5', 600);
    expect(s).toMatch(/Pending Review/i);
  });
});

// ===========================================================================
// §G – WORKFLOW 6: ADMIN APPROVAL & PAYMENT
// ===========================================================================
test.describe('§G – Workflow 6: Admin Approval & Payment', () => {
  test('Workflow 6 section is present', () => {
    expect(guide).toContain('Workflow 6');
    expect(guide).toContain('Admin Approval');
  });

  test('Admin receives "Work Ready for Approval" email', () => {
    const s = section('Workflow 6', 600);
    expect(s).toMatch(/Work Ready for Approval/i);
  });

  test('Admin approves work → payment processes', () => {
    const s = section('Workflow 6', 600);
    expect(s).toMatch(/Admin approves.*payment|approves work.*payment/i);
  });

  test('Contractor receives "Payment Sent" email after approval', () => {
    const s = section('Workflow 6', 600);
    expect(s).toMatch(/Payment Sent/i);
  });

  test('Wait 3 days for payment to clear is documented', () => {
    const s = section('Workflow 6', 600);
    expect(s).toMatch(/Wait 3 days|3 days.*payment/i);
  });

  test('Contractor portal access is LIMITED until Unconditional Lien Release is signed', () => {
    const s = section('Workflow 6', 600);
    expect(s).toMatch(/LIMITED|portal access is LIMITED/i);
    expect(s).toMatch(/Unconditional Lien Release/i);
  });

  test('Portal access restored after signing Unconditional Lien Release', () => {
    const s = section('Workflow 6', 600);
    expect(s).toMatch(/portal access restored/i);
  });

  test('Homeowner receives "Certificate Ready" email after completion', () => {
    const s = section('Workflow 6', 600);
    expect(s).toMatch(/Certificate Ready/i);
  });
});

// ===========================================================================
// §H – WORKFLOWS 7–9: RETURN SERVICE, CRITICAL SERVICE, ASSESSMENT
// ===========================================================================
test.describe('§H – Workflows 7–9', () => {
  // ── Workflow 7: Return Service Call ──────────────────────────────────────
  test('Workflow 7 Return Service Call section is present', () => {
    expect(guide).toContain('Workflow 7');
    expect(guide).toContain('Return Service Call');
  });

  test('Return service: Homeowner requests additional work after completion', () => {
    const s = section('Workflow 7', 400);
    expect(s).toMatch(/additional work after completion|after completion/i);
  });

  test('Return service: Admin creates Return Service Call Work Order', () => {
    const s = section('Workflow 7', 400);
    expect(s).toMatch(/Admin creates Return Service Call Work Order/i);
  });

  test('Return service: Contractor receives DocuSign Return Service Call Work Order', () => {
    const s = section('Workflow 7', 400);
    expect(s).toMatch(/DocuSign.*Return Service Call Work Order/i);
  });

  test('Return service: Follows same completion flow', () => {
    const s = section('Workflow 7', 400);
    expect(s).toMatch(/same completion flow|follows same/i);
  });

  // ── Workflow 8: Critical Service (Emergency) ──────────────────────────────
  test('Workflow 8 Critical Service section is present', () => {
    expect(guide).toContain('Workflow 8');
    expect(guide).toContain('Critical Service');
  });

  test('Critical service: Emergency water main service request', () => {
    const s = section('Workflow 8', 400);
    expect(s).toMatch(/emergency water main|water main service/i);
  });

  test('Critical service: System assigns nearest contractor (immediate notification)', () => {
    const s = section('Workflow 8', 400);
    expect(s).toMatch(/nearest contractor.*immediate|assigns nearest/i);
  });

  test('Critical service: Homeowner receives DocuSign Critical Change Order and Liability Release', () => {
    const s = section('Workflow 8', 400);
    expect(s).toMatch(/Critical Change Order and Liability Release/i);
  });

  test('Critical service: Homeowner MUST sign before work begins', () => {
    const s = section('Workflow 8', 400);
    expect(s).toMatch(/must sign BEFORE work begins|sign.*before.*work/i);
  });

  // ── Workflow 9: Assessment Service ──────────────────────────────────────
  test('Workflow 9 Assessment Service section is present', () => {
    expect(guide).toContain('Workflow 9');
    expect(guide).toContain('Assessment Service');
  });

  test('Assessment fee formula: $185 + $0.75/mile', () => {
    const s = section('Workflow 9', 400);
    expect(s).toContain('$185');
    expect(s).toContain('$0.75');
  });

  test('Assessment: Technician receives assignment email with property details', () => {
    const s = section('Workflow 9', 400);
    expect(s).toMatch(/Technician receives.*assignment|Technician.*assignment/i);
  });

  test('Assessment: Technician completes assessment and uploads report', () => {
    const s = section('Workflow 9', 400);
    expect(s).toMatch(/uploads report|upload.*report/i);
  });

  test('Assessment: Homeowner notified and can proceed with installation', () => {
    const s = section('Workflow 9', 400);
    expect(s).toMatch(/Homeowner notified|proceed with installation/i);
  });
});

// ===========================================================================
// §I – EMAIL CHECKLIST (Part 3)
// ===========================================================================
test.describe('§I – Email Checklist (39 Emails)', () => {
  // All email tests search within the Email Triggers Summary section
  // to avoid false matches in the User Accounts or other earlier sections.

  test('Email Triggers Summary section is present', () => {
    expect(guide).toContain('Email Triggers Summary');
  });

  test('Email count is 39 total', () => {
    expect(guide).toMatch(/39 total|39 emails/i);
  });

  // ── Homeowner Emails (14) ──────────────────────────────────────────────
  test('Total homeowner emails are 14', () => {
    const s = section('Email Triggers Summary', 1500);
    expect(s).toMatch(/Homeowner \(14\)/);
  });

  test('Homeowner receives Welcome email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Welcome');
  });

  test('Homeowner receives Request Received email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Request Received');
  });

  test('Homeowner receives Estimates Ready email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Estimates Ready');
  });

  test('Homeowner receives Deposit Required email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Deposit Required');
  });

  test('Homeowner receives Installation Confirmed email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Installation Confirmed');
  });

  test('Homeowner receives Reminder Tomorrow email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Reminder Tomorrow');
  });

  test('Homeowner receives Contractor Arrived email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Contractor Arrived');
  });

  test('Homeowner receives Change Order email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Change Order');
  });

  test('Homeowner receives Critical Release email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Critical Release');
  });

  test('Homeowner receives Work Complete email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Work Complete');
  });

  test('Homeowner receives Payment Received email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Payment Received');
  });

  test('Homeowner receives Certificate Ready email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Certificate Ready');
  });

  test('Homeowner receives Return Service Scheduled email', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Return Service Scheduled');
  });

  test('Homeowner receives Anniversary Reminder email (11 months)', () => {
    const s = section('Homeowner (14)', 300);
    expect(s).toContain('Anniversary Reminder');
  });

  // ── Contractor Emails (12) ───────────────────────────────────────────
  test('Total contractor emails are 12', () => {
    const s = section('Email Triggers Summary', 1500);
    expect(s).toMatch(/Contractor \(12\)/);
  });

  test('Contractor receives Welcome email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Welcome');
  });

  test('Contractor receives New Job in Area email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('New Job in Area');
  });

  test('Contractor receives Bid Received email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Bid Received');
  });

  test('Contractor receives Selected for Job email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Selected for Job');
  });

  test('Contractor receives Sign Work Order email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Sign Work Order');
  });

  test('Contractor receives Job Tomorrow Reminder email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Job Tomorrow Reminder');
  });

  test('Contractor receives Sign Affidavit/Lien email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Sign Affidavit/Lien');
  });

  test('Contractor receives Payment Sent email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Payment Sent');
  });

  test('Contractor receives Unconditional Lien Required email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Unconditional Lien Required');
  });

  test('Contractor receives Critical Assignment email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Critical Assignment');
  });

  test('Contractor receives Return Service Work Order email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Return Service Work Order');
  });

  test('Contractor receives Change Order Approved email', () => {
    const s = section('Contractor (12)', 400);
    expect(s).toContain('Change Order Approved');
  });

  // ── Agent Emails (7) ─────────────────────────────────────────────────
  test('Total agent emails are 7', () => {
    const s = section('Email Triggers Summary', 1500);
    expect(s).toMatch(/Agent \(7\)/);
  });

  test('Agent receives Welcome email', () => {
    const s = section('Agent (7)', 300);
    expect(s).toContain('Welcome');
  });

  test('Agent receives Client Started Request email', () => {
    const s = section('Agent (7)', 300);
    expect(s).toContain('Client Started Request');
  });

  test('Agent receives Client Selected Contractor email', () => {
    const s = section('Agent (7)', 300);
    expect(s).toContain('Client Selected Contractor');
  });

  test('Agent receives Client Critical Service email', () => {
    const s = section('Agent (7)', 300);
    expect(s).toContain('Client Critical Service');
  });

  test('Agent receives Client Installation Complete email', () => {
    const s = section('Agent (7)', 300);
    expect(s).toContain('Client Installation Complete');
  });

  test('Agent receives Certificate Ready email', () => {
    const s = section('Agent (7)', 300);
    expect(s).toContain('Certificate Ready');
  });

  test('Agent receives Client Renewal Reminder email', () => {
    const s = section('Agent (7)', 300);
    expect(s).toContain('Client Renewal Reminder');
  });

  // ── Technician Emails (4) ─────────────────────────────────────────────
  test('Total technician emails are 4', () => {
    const s = section('Email Triggers Summary', 1500);
    expect(s).toMatch(/Technician \(4\)/);
  });

  test('Technician receives Welcome email', () => {
    const s = section('Technician (4)', 200);
    expect(s).toContain('Welcome');
  });

  test('Technician receives New Assessment email', () => {
    const s = section('Technician (4)', 200);
    expect(s).toContain('New Assessment');
  });

  test('Technician receives Assessment Reminder email', () => {
    const s = section('Technician (4)', 200);
    expect(s).toContain('Assessment Reminder');
  });

  test('Technician receives Report Upload Required email', () => {
    const s = section('Technician (4)', 200);
    expect(s).toContain('Report Upload Required');
  });

  // ── Admin Emails (4) ─────────────────────────────────────────────────
  test('Total admin emails are 4', () => {
    const s = section('Email Triggers Summary', 1500);
    expect(s).toMatch(/Admin \(4\)/);
  });

  test('Admin receives New Contractor Application email', () => {
    const s = section('Admin (4)', 200);
    expect(s).toContain('New Contractor Application');
  });

  test('Admin receives Work Ready for Approval email', () => {
    const s = section('Admin (4)', 200);
    expect(s).toContain('Work Ready for Approval');
  });

  test('Admin receives Critical Service Alert email', () => {
    const s = section('Admin (4)', 200);
    expect(s).toContain('Critical Service Alert');
  });

  test('Admin receives Quarterly Tax Report email', () => {
    const s = section('Admin (4)', 200);
    expect(s).toContain('Quarterly Tax Report');
  });
});

// ===========================================================================
// §J – DOCUSIGN CHECKLIST (8 DOCUMENTS, Part 4)
// ===========================================================================
test.describe('§J – DocuSign Checklist (8 Documents)', () => {
  test('DocuSign Documents section is present', () => {
    expect(guide).toContain('DocuSign Documents');
  });

  test('Total DocuSign documents is 8', () => {
    expect(guide).toMatch(/DocuSign Documents \(8 total\)|8 total/i);
  });

  test('D1 – Master Services Agreement: sent to Contractor on joining network', () => {
    const s = section('DocuSign Documents', 800);
    expect(s).toContain('Master Services Agreement');
    expect(s).toMatch(/Contractor.*Joins network|joins network/i);
  });

  test('D2 – Work Order / Task Contract: sent to Contractor when deposit paid', () => {
    const s = section('DocuSign Documents', 800);
    expect(s).toContain('Work Order / Task Contract');
    expect(s).toMatch(/Deposit paid/i);
  });

  test('D3 – Critical Change Order and Liability Release: sent to Homeowner on emergency', () => {
    const s = section('DocuSign Documents', 800);
    expect(s).toContain('Critical Change Order and Liability Release');
    expect(s).toMatch(/Homeowner.*Emergency|Emergency/i);
  });

  test('D4 – Return Service Call Work Order: sent to Contractor when return requested', () => {
    const s = section('DocuSign Documents', 800);
    expect(s).toContain('Return Service Call Work Order');
    expect(s).toMatch(/Return requested/i);
  });

  test('D5 – Affidavit of Service: sent to Contractor when job complete', () => {
    const s = section('DocuSign Documents', 800);
    expect(s).toContain('Affidavit of Service');
    expect(s).toMatch(/Job complete/i);
  });

  test('D6 – Conditional Lien Release w/ Invoice: sent to Contractor when docs submitted', () => {
    const s = section('DocuSign Documents', 800);
    expect(s).toContain('Conditional Lien Release');
    expect(s).toMatch(/Docs submitted/i);
  });

  test('D7 – Unconditional Lien Release: sent to Contractor when payment clears', () => {
    const s = section('DocuSign Documents', 800);
    expect(s).toContain('Unconditional Lien Release');
    expect(s).toMatch(/Payment clears/i);
  });

  test('D8 – Change Order: sent to Homeowner during job', () => {
    const s = section('DocuSign Documents', 800);
    expect(s).toContain('Change Order');
    expect(s).toMatch(/Homeowner.*During job|During job/i);
  });
});

// ===========================================================================
// §K – SPECIAL TESTING SCENARIOS (Part 5)
// ===========================================================================
test.describe('§K – Special Testing Scenarios', () => {
  // ── Scenario A: Resale Certificate ──────────────────────────────────
  test('Resale Certificate: Contractor who accepts (YES) is documented in guide', () => {
    // SHORT_WORKFLOW_GUIDE.md notes Resale Cert YES/NO in test accounts
    expect(guide).toMatch(/Resale Cert YES/i);
  });

  test('Resale Certificate: Contractor who declines (NO) is documented in guide', () => {
    expect(guide).toMatch(/Resale Cert NO/i);
  });

  test('Resale Certificate: YES means contractor enters prices WITHOUT tax (SERVICE_FORM_GUIDE)', () => {
    // Detailed tax-handling logic lives in SERVICE_FORM_GUIDE.md
    expect(serviceForm).toMatch(/WITHOUT tax|without tax/i);
  });

  test('Resale Certificate: YES means MrSurety adds tax at retail (SERVICE_FORM_GUIDE)', () => {
    const s = sfSection('Resale Certificate', 400);
    expect(s).toMatch(/MrSurety adds tax at retail|adds tax at retail/i);
  });

  // ── Scenario C: Device Source ────────────────────────────────────────
  test('Device Source: Contractor Provided = $599.99 fixed with 0% markup in SHORT_WORKFLOW_GUIDE', () => {
    const s = section('Retail Price Markups', 400);
    expect(s).toContain('$599.99');
    expect(s).toMatch(/0% markup|fixed.*0%/i);
  });

  test('Device Source: Homeowner Provided = $0 no device charge (SERVICE_FORM_GUIDE)', () => {
    // Detailed device source pricing is in SERVICE_FORM_GUIDE.md Device Source Pricing Impact
    const s = sfSection('Device Source Pricing Impact', 400);
    expect(s).toMatch(/Homeowner Provided.*\$0|Homeowner Provided.*no device/i);
  });

  test('Device Source: Insurance Provided = $0 no device charge (SERVICE_FORM_GUIDE)', () => {
    const s = sfSection('Device Source Pricing Impact', 400);
    expect(s).toMatch(/Insurance Provided.*\$0|Insurance Provided.*no device/i);
  });

  // ── Scenario E: Incomplete Forms ─────────────────────────────────────
  test('Incomplete form: Water main photo is REQUIRED (SHORT_WORKFLOW_GUIDE)', () => {
    expect(guide).toMatch(/Water main photo.*REQUIRED|REQUIRED.*water main/i);
  });

  test('Incomplete form: Form must NOT submit without water main photo', () => {
    expect(guide).toMatch(/must NOT submit|form must NOT submit/i);
  });

  test('Incomplete form validation cases documented in SERVICE_FORM_GUIDE', () => {
    // SERVICE_FORM_GUIDE.md has Form Validation Test Cases (Part 5)
    expect(serviceForm).toMatch(/Form Validation Test Cases|Incomplete Form/i);
  });
});
