/**
 * Palmer Email Supplement Spec
 *
 * Pure content tests — no browser required.
 * Validates that SHORT_WORKFLOW_GUIDE.md captures all additional details from
 * the supplemental email sent by c.palmer@mrsurety.com on Mar 13, 2026.
 *
 * Key additions beyond the main Testing Guide:
 *   §A – 3 Primary User Types (Agent, Contractor, Homeowner) to be created by tester
 *   §B – Referral Code Validity (single-use per request, not reusable across forms)
 *   §C – Multiple Addresses + Permit Types for homeowner testing
 *   §D – Screenshot Requirement (50+ email/DocuSign items)
 *   §E – Discrepancy awareness (app may differ from docs; discuss with Christopher)
 *
 * Source: c.palmer@mrsurety.com email, Mar 13, 2026
 * Run via: npm run test:palmer-email-supplement
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Load SHORT_WORKFLOW_GUIDE.md
// ---------------------------------------------------------------------------
const GUIDE_PATH = path.join(
  __dirname,
  '../../qa/spec-docs/workflow-guides/SHORT_WORKFLOW_GUIDE.md',
);

let guide: string;

test.beforeAll(() => {
  guide = fs.readFileSync(GUIDE_PATH, 'utf8');
});

// Helper: extract a slice of the guide starting at a marker
function section(marker: string, chars = 2000): string {
  const idx = guide.indexOf(marker);
  if (idx === -1) return '';
  return guide.slice(idx, idx + chars);
}

// ===========================================================================
// §A – THREE PRIMARY USER TYPES
// ===========================================================================
test.describe('§A – 3 Primary User Types (Palmer Email)', () => {
  test('Guide mentions the 3 primary user types: Agent, Contractor, Homeowner', () => {
    expect(guide).toMatch(/Agent.*Contractor.*Homeowner|3 primary user types/is);
  });

  test('Guide notes Agent as primary user type', () => {
    const s = section('3 primary user types', 500);
    expect(s).toMatch(/Agent/i);
  });

  test('Guide notes Contractor as primary user type', () => {
    const s = section('3 primary user types', 500);
    expect(s).toMatch(/Contractor/i);
  });

  test('Guide notes Homeowner as primary user type', () => {
    const s = section('3 primary user types', 500);
    expect(s).toMatch(/Homeowner/i);
  });

  test('Guide states all user accounts should be created by the tester', () => {
    expect(guide).toMatch(/created by the tester|create.*by you|created by you/i);
  });

  test('Guide notes Outlook.com or another email service for receiving test emails', () => {
    expect(guide).toMatch(/Outlook\.com|outlook\.com/i);
  });

  test('Guide includes CSLB license requirement for contractors (use 999888)', () => {
    expect(guide).toMatch(/CSLB/i);
    expect(guide).toContain('999888');
  });
});

// ===========================================================================
// §B – REFERRAL CODE VALIDITY (SINGLE-USE PER REQUEST)
// ===========================================================================
test.describe('§B – Referral Code Validity (Palmer Email)', () => {
  test('Guide contains "Referral Code Validity" section', () => {
    expect(guide).toContain('Referral Code Validity');
  });

  test('Guide states referral code is valid only for the specific request form', () => {
    const s = section('Referral Code Validity', 500);
    expect(s).toMatch(/valid only for the specific request form|specific request/i);
  });

  test('Guide states referral code will not carry over to future request forms', () => {
    const s = section('Referral Code Validity', 500);
    expect(s).toMatch(/will not carry over|not carry over/i);
  });

  test('Guide instructs to test both methods multiple times', () => {
    expect(guide).toMatch(/test both methods multiple times|both methods.*multiple times/i);
  });

  test('Guide covers Method A – Agent Creates Referral Link/Code', () => {
    expect(guide).toMatch(/Method A/i);
    expect(guide).toMatch(/referral link|referral code/i);
  });

  test('Guide covers Method B – Homeowner Adds Agent Email', () => {
    expect(guide).toMatch(/Method B/i);
    expect(guide).toMatch(/agent email/i);
  });

  test('Agent referral link format documented (mrsurety.com/ref/AGENT123)', () => {
    expect(guide).toContain('mrsurety.com/ref/AGENT123');
  });

  test('Landing page "Brought to you by [Agent Name]" is documented', () => {
    expect(guide).toContain('Brought to you by');
  });
});

// ===========================================================================
// §C – MULTIPLE ADDRESSES + PERMIT TYPES
// ===========================================================================
test.describe('§C – Multiple Addresses & Permit Types (Palmer Email)', () => {
  test('Guide notes homeowners may have multiple addresses in their profile', () => {
    expect(guide).toMatch(/multiple addresses|Homeowners may have multiple/i);
  });

  test('Guide states to test with different addresses', () => {
    const s = section('Multiple Addresses', 600);
    expect(s).toMatch(/different addresses/i);
  });

  test('Guide mentions permit types as a dimension to test', () => {
    expect(guide).toMatch(/permit types|different permit types/i);
  });

  test('Guide notes each request with different address should be tracked separately', () => {
    expect(guide).toMatch(/tracked separately|each request is.*separate/i);
  });

  test('Multiple homeowner test accounts with different properties documented', () => {
    // The guide has Homeowner 1, 2, 3 with different sq ft / addresses
    expect(guide).toMatch(/Homeowner 1|homeowner1/i);
    expect(guide).toMatch(/Homeowner 2|homeowner2/i);
  });
});

// ===========================================================================
// §D – SCREENSHOT REQUIREMENT (50+ ITEMS)
// ===========================================================================
test.describe('§D – Screenshot Requirement (Palmer Email)', () => {
  test('Guide includes screenshot requirement for email documents', () => {
    expect(guide).toMatch(/Screenshot.*email|screenshot.*email/i);
  });

  test('Guide specifies 50+ items to screenshot', () => {
    expect(guide).toMatch(/over 50|50\+ items|more than 50/i);
  });

  test('Guide includes DocuSign documents in screenshot scope', () => {
    expect(guide).toMatch(/DocuSign/i);
  });

  test('Guide references Google Drive upload for screenshots', () => {
    expect(guide).toMatch(/Google Drive|google drive/i);
  });

  test('Guide covers email verbiage review requirement', () => {
    expect(guide).toMatch(/verbiage|wording|email.*review/i);
  });
});

// ===========================================================================
// §E – DISCREPANCY AWARENESS (APP MAY DIFFER FROM DOCS)
// ===========================================================================
test.describe('§E – Discrepancy Awareness (Palmer Email)', () => {
  test('Guide warns that app may differ somewhat from the reference docs', () => {
    expect(guide).toMatch(/differs from|differ|discrepancy/i);
  });

  test('Guide instructs to discuss discrepancies with Christopher before logging as bug', () => {
    expect(guide).toMatch(/discuss.*Christopher|discuss.*before/i);
  });

  test('Guide has admin login documented (admin@mrsurety.com)', () => {
    expect(guide).toContain('admin@mrsurety.com');
  });

  test('Admin password is documented (MrSurety2026!)', () => {
    expect(guide).toContain('MrSurety2026!');
  });

  test('Email and DocuSign noted as critical / legally required', () => {
    // The guide must note that email and DocuSign are critical / legal
    expect(guide).toMatch(/email.*DocuSign|DocuSign.*email/i);
    expect(guide).toMatch(/legal|legally required|critical/i);
  });
});

// ===========================================================================
// §F – CROSS-CHECK: GUIDE INTEGRITY AFTER UPDATES
// ===========================================================================
test.describe('§F – Guide Integrity After Palmer Email Updates', () => {
  test('SHORT_WORKFLOW_GUIDE.md is non-empty', () => {
    expect(guide.length).toBeGreaterThan(500);
  });

  test('Guide still contains all 9 workflow headings', () => {
    expect(guide).toMatch(/Workflow 1/i);
    expect(guide).toMatch(/Workflow 2/i);
    expect(guide).toMatch(/Workflow 3/i);
    expect(guide).toMatch(/Workflow 4/i);
    expect(guide).toMatch(/Workflow 5/i);
    expect(guide).toMatch(/Workflow 6/i);
    expect(guide).toMatch(/Workflow 7/i);
    expect(guide).toMatch(/Workflow 8/i);
    expect(guide).toMatch(/Workflow 9/i);
  });

  test('Guide still documents 39 total email triggers', () => {
    expect(guide).toContain('39 total');
  });

  test('Guide still documents 8 DocuSign documents', () => {
    expect(guide).toMatch(/8 DocuSign|8 total/i);
  });

  test('Pipe size chart still present (3/4 inch / 1 inch / 1 1/4 inch)', () => {
    expect(guide).toContain('3/4 inch');
    expect(guide).toContain('1 inch');
    expect(guide).toContain('1 1/4 inch');
  });

  test('Pressure reducer logic still present', () => {
    expect(guide).toMatch(/Pressure Reducer Logic/i);
  });

  test('$95 Service Fee still documented', () => {
    expect(guide).toContain('$95');
  });

  test('10% deposit still documented', () => {
    expect(guide).toMatch(/10%.*deposit|deposit.*10%/i);
  });

  test('Assessment fee formula ($185 + $0.75/mile) still present', () => {
    expect(guide).toContain('$185');
    expect(guide).toContain('$0.75/mile');
  });

  test('Unconditional Lien Release portal access lock still documented', () => {
    expect(guide).toMatch(/Unconditional Lien Release/i);
    expect(guide).toMatch(/LIMITED|limited/i);
  });
});
