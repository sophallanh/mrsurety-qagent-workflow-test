/**
 * Palmer Supplement 2 Spec
 *
 * Pure content tests — no browser required.
 * Validates that SHORT_WORKFLOW_GUIDE.md captures all additional details from
 * the second supplemental message from Christopher Palmer (Mar 14, 2026).
 *
 * Key additions covered:
 *   §A – Agent Upload Invite System (contractor portal feature)
 *   §B – Contractor side of the invite flow
 *   §C – Insurance agent side of the invite flow (no login required)
 *   §D – Security controls on the invite link
 *   §E – Document upload restrictions (COI/endorsements only via invite)
 *   §F – Testing approach guidance (read docs first, incremental feedback)
 *   §G – Cross-check: guide integrity after additions
 *
 * Source: Christopher Palmer follow-up email, Mar 14, 2026
 * Run via: npm run test:palmer-supplement2
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
function section(marker: string, chars = 3000): string {
  const idx = guide.indexOf(marker);
  if (idx === -1) return '';
  return guide.slice(idx, idx + chars);
}

// ===========================================================================
// §A – AGENT UPLOAD INVITE SYSTEM (TOP-LEVEL PRESENCE)
// ===========================================================================
test.describe('§A – Agent Upload Invite System (Palmer Supplement 2)', () => {
  test('Guide contains "Agent Upload Invite System" section heading', () => {
    expect(guide).toContain('Agent Upload Invite System');
  });

  test('Guide identifies this as a NEW contractor portal feature', () => {
    const s = section('Agent Upload Invite System', 500);
    expect(s).toMatch(/NEW feature|new feature|Contractor Portal Feature/i);
  });

  test('Guide references contractor inviting their insurance agent', () => {
    const s = section('Agent Upload Invite System', 1000);
    expect(s).toMatch(/insurance agent/i);
    expect(s).toMatch(/invite/i);
  });

  test('Guide mentions that invite allows uploading insurance documents', () => {
    const s = section('Agent Upload Invite System', 1000);
    expect(s).toMatch(/insurance document|upload.*document/i);
  });
});

// ===========================================================================
// §B – CONTRACTOR SIDE OF INVITE FLOW
// ===========================================================================
test.describe('§B – Contractor Side of Invite Flow', () => {
  test('Guide documents "Invite Agent to Upload Documents" section on Documents page', () => {
    expect(guide).toContain('Invite Agent to Upload Documents');
  });

  test('Guide states contractor enters insurance agent email and sends invite', () => {
    const s = section('Contractor Side', 800);
    expect(s).toMatch(/insurance agent.*email|enter.*agent.*email/i);
  });

  test('Guide documents "Send Invite" button', () => {
    expect(guide).toContain('Send Invite');
  });

  test('Guide states agent receives email with secure upload link', () => {
    const s = section('Contractor Side', 800);
    expect(s).toMatch(/secure upload link|secure.*link/i);
  });

  test('Guide documents contractor can view active invites list', () => {
    const s = section('Contractor Side', 800);
    expect(s).toMatch(/active invite|active.*invite/i);
  });

  test('Guide documents contractor can see document count per invite', () => {
    const s = section('Contractor Side', 1000);
    expect(s).toMatch(/documents uploaded|doc.*count|number of.*document/i);
  });

  test('Guide documents contractor can revoke an invite', () => {
    const s = section('Contractor Side', 1000);
    expect(s).toMatch(/revoke|Revoke/);
  });
});

// ===========================================================================
// §C – INSURANCE AGENT SIDE OF INVITE FLOW (NO LOGIN)
// ===========================================================================
test.describe('§C – Insurance Agent Side (No Login Required)', () => {
  test('Guide states agent can open link without logging in', () => {
    const s = section('Insurance Agent Side', 1000);
    expect(s).toMatch(/no login required|without log|no.*login/i);
  });

  test('Guide documents agent sees document checklist (uploaded vs still needed)', () => {
    const s = section('Insurance Agent Side', 1000);
    expect(s).toMatch(/checklist/i);
    expect(s).toMatch(/uploaded|still needed/i);
  });

  test('Guide documents agent can select multiple files at once', () => {
    const s = section('Insurance Agent Side', 1000);
    expect(s).toMatch(/multiple files|select.*multiple/i);
  });

  test('Guide documents agent assigns document type per file', () => {
    const s = section('Insurance Agent Side', 1000);
    expect(s).toMatch(/document type|doc.*type/i);
  });

  test('Guide documents agent assigns carrier name per file', () => {
    const s = section('Insurance Agent Side', 1000);
    expect(s).toMatch(/carrier name|Carrier name/i);
  });

  test('Guide documents agent assigns effective date per file', () => {
    const s = section('Insurance Agent Side', 1000);
    expect(s).toMatch(/effective date|Effective date/i);
  });

  test('Guide documents "Upload All" button saves files to contractor profile', () => {
    expect(guide).toContain('Upload All');
    const s = section('Upload All', 300);
    expect(s).toMatch(/contractor.*profile|contractor's profile/i);
  });
});

// ===========================================================================
// §D – SECURITY CONTROLS ON INVITE LINK
// ===========================================================================
test.describe('§D – Security Controls on Invite Link', () => {
  test('Guide has a "Security Controls" section', () => {
    expect(guide).toContain('Security Controls');
  });

  test('Guide states only the contractor can initiate the invite (contractor-initiated)', () => {
    const s = section('Security Controls', 1500);
    expect(s).toMatch(/contractor.*initiat|contractor-initiated|only the contractor/i);
  });

  test('Guide states each link is unique and locked to one contractor', () => {
    const s = section('Security Controls', 1500);
    expect(s).toMatch(/locked to.*contractor|unique.*contractor|one contractor/i);
  });

  test('Guide states agent can only upload (not view, download, or delete)', () => {
    const s = section('Security Controls', 1500);
    expect(s).toMatch(/upload only|only upload/i);
    expect(s).toMatch(/cannot view|can.*not view|cannot.*download|cannot.*delete/i);
  });

  test('Guide states links expire after 7 days', () => {
    const s = section('Security Controls', 1500);
    expect(s).toMatch(/7.day|7 day|seven.day/i);
    expect(s).toMatch(/expir/i);
  });

  test('Guide states contractor can revoke access instantly', () => {
    const s = section('Security Controls', 1500);
    expect(s).toMatch(/revoke|instant.*cancel/i);
  });

  test('Guide states revoked link shows error or expired page', () => {
    const s = section('Security Controls', 2000);
    expect(s).toMatch(/revoked.*link.*error|error.*expired|expired.*page/i);
  });

  test('Guide states without the exact link there is no access', () => {
    const s = section('Security Controls', 2000);
    expect(s).toMatch(/without.*link.*no access|no.*access.*without|zero access/i);
  });
});

// ===========================================================================
// §E – DOCUMENT UPLOAD RESTRICTIONS (COI/ENDORSEMENTS ONLY VIA INVITE)
// ===========================================================================
test.describe('§E – Document Upload Restrictions via Invite', () => {
  test('Guide has a "Document Upload Restrictions" section', () => {
    expect(guide).toMatch(/Document Upload Restriction|upload.*restriction/i);
  });

  test('Guide states agent CAN upload COI (Certificate of Insurance)', () => {
    const s = section('Document Upload Restrictions', 1000);
    expect(s).toMatch(/COI|Certificate of Insurance/i);
  });

  test('Guide states agent CAN upload endorsements', () => {
    const s = section('Document Upload Restrictions', 1000);
    expect(s).toMatch(/endorsement/i);
  });

  test('Guide states CSLB card can only be uploaded by contractor (not via invite)', () => {
    const s = section('Document Upload Restrictions', 1500);
    expect(s).toMatch(/CSLB/i);
    expect(s).toMatch(/contractor only|Contractor only/i);
  });

  test('Guide states W-9 can only be uploaded by contractor', () => {
    const s = section('Document Upload Restrictions', 1500);
    expect(s).toMatch(/W-9/i);
    expect(s).toMatch(/contractor only|Contractor only/i);
  });

  test('Guide states Bond can only be uploaded by contractor', () => {
    const s = section('Document Upload Restrictions', 1500);
    expect(s).toMatch(/Bond|bond/i);
    expect(s).toMatch(/contractor only|Contractor only/i);
  });

  test('Guide states Photo ID can only be uploaded by contractor', () => {
    const s = section('Document Upload Restrictions', 1500);
    expect(s).toMatch(/Photo ID|photo id/i);
    expect(s).toMatch(/contractor only|Contractor only/i);
  });
});

// ===========================================================================
// §F – TESTING APPROACH GUIDANCE (PALMER EMAIL MAR 14, 2026)
// ===========================================================================
test.describe('§F – Testing Approach Guidance (Palmer Supplement 2)', () => {
  test('Guide has a "Testing Approach" section', () => {
    expect(guide).toMatch(/Testing Approach|testing approach/i);
  });

  test('Guide instructs to read all documents first before testing', () => {
    const s = section('Testing Approach', 1500);
    expect(s).toMatch(/read.*document.*first|Read through all document/i);
  });

  test('Guide instructs to create users and get acclimated to the workflow', () => {
    const s = section('Testing Approach', 1500);
    expect(s).toMatch(/create.*user.*acclimat|get acclimat|acclimated/i);
  });

  test('Guide states overall goal is to find errors and wording issues', () => {
    const s = section('Testing Approach', 1500);
    expect(s).toMatch(/error.*wording|wording.*error|errors or wording/i);
  });

  test('Guide documents suggested first test run: agent → referral code → homeowner → service request → admin', () => {
    const s = section('Testing Approach', 2000);
    expect(s).toMatch(/first test run|Suggested first test/i);
    expect(s).toMatch(/referral code/i);
    expect(s).toMatch(/service request/i);
    expect(s).toMatch(/Admin.*portal|admin/i);
  });

  test('Guide instructs to submit findings incrementally (end of day, not per item)', () => {
    const s = section('Testing Approach', 2000);
    expect(s).toMatch(/end of.*day|each.*day|incremental/i);
    expect(s).toMatch(/not.*every.*item|not after every/i);
  });

  test('Guide notes that testing always takes longer than expected', () => {
    const s = section('Testing Approach', 2000);
    expect(s).toMatch(/longer than.*expect|takes longer/i);
  });

  test('Guide instructs to discuss unclear items with Christopher (not auto-log as bug)', () => {
    const s = section('Testing Approach', 2000);
    expect(s).toMatch(/discuss.*Christopher|discuss.*before.*bug/i);
  });
});

// ===========================================================================
// §G – CROSS-CHECK: GUIDE INTEGRITY AFTER ADDITIONS
// ===========================================================================
test.describe('§G – Guide Integrity After Palmer Supplement 2 Additions', () => {
  test('SHORT_WORKFLOW_GUIDE.md is non-empty and well-sized', () => {
    expect(guide.length).toBeGreaterThan(1000);
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

  test('Pressure Reducer Logic still present', () => {
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

  test('Admin login still documented (admin@mrsurety.com / MrSurety2026!)', () => {
    expect(guide).toContain('admin@mrsurety.com');
    expect(guide).toContain('MrSurety2026!');
  });

  test('Referral code validity rule still documented', () => {
    expect(guide).toContain('Referral Code Validity');
    expect(guide).toMatch(/will not carry over|not carry over/i);
  });

  test('Screenshot requirement (50+ items) still documented', () => {
    expect(guide).toMatch(/over 50|50\+ items|more than 50/i);
  });

  test('Method A and Method B referral still documented', () => {
    expect(guide).toMatch(/Method A/i);
    expect(guide).toMatch(/Method B/i);
  });
});
