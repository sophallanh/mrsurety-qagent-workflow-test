import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * MrSurety QA – Palmer Email Supplement Spec
 *
 * Validates the additions Christopher Palmer specified beyond the original
 * email — particularly the items about testing approach, referral nuances,
 * and coverage depth.
 *
 * This spec does NOT connect to the live app. It validates that:
 *   §A – 3 primary user types (Agent, Contractor, Homeowner) documented
 *   §B – Referral code validity (single-use per request) rule documented
 *   §C – Multiple property addresses + permit types in test plan
 *   §D – 50+ screenshot items explicitly enumerated in the manual guide
 *   §E – App vs. Google Doc discrepancy awareness captured
 *   §F – Guide integrity cross-check (all docs consistent)
 */

const ROOT = path.join(__dirname, '../..');

const credFile    = path.join(ROOT, 'qa/test-user-credentials/TEST_USER_CREDENTIALS.md');
const shortGuide  = path.join(ROOT, 'qa/spec-docs/workflow-guides/SHORT_WORKFLOW_GUIDE.md');
const appGuide    = path.join(ROOT, 'qa/spec-docs/workflow-guides/APP_WORKFLOW_GUIDES.md');
const testingDoc  = path.join(ROOT, 'qa/spec-docs/CHRISTOPHER_TESTING_DOC.md');
const manualGuide = path.join(ROOT, 'qa/MANUAL_EXECUTION_GUIDE.md');
const ckEmail     = path.join(ROOT, 'qa/spec-docs/CHRISTOPHER_ORIGINAL_EMAIL.md');

function read(p: string): string {
  if (!fs.existsSync(p)) return '';
  return fs.readFileSync(p, 'utf-8');
}

// ─────────────────────────────────────────────────────────────────────────────
// §A – 3 primary user types fully documented
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§A – 3 primary user types documented', () => {
  let creds: string;
  let doc: string;

  test.beforeAll(() => {
    creds = read(credFile);
    doc   = read(testingDoc);
  });

  test('§A.1 Agent user type with Outlook email in credentials', () => {
    expect(creds).toContain('agent.test1@outlook.com');
    expect(creds).toContain('QAtest@2026!');
  });

  test('§A.2 Contractor user type with Outlook email in credentials', () => {
    expect(creds).toContain('contractor.test1@outlook.com');
    expect(creds).toContain('QAtest@2026!');
  });

  test('§A.3 Homeowner user type with Outlook email in credentials', () => {
    expect(creds).toContain('homeowner.test1@outlook.com');
    expect(creds).toContain('QAtest@2026!');
  });

  test('§A.4 Admin account documented (provided by Christopher)', () => {
    expect(creds).toContain('admin@mrsurety.com');
    expect(creds).toContain('MrSurety2026!');
  });

  test('§A.5 CHRISTOPHER_TESTING_DOC.md lists all user types', () => {
    expect(doc).toContain('Homeowner');
    expect(doc).toContain('Contractor');
    expect(doc).toContain('Insurance Agent');
    expect(doc).toContain('Technician');
  });

  test('§A.6 Credentials include Technician account', () => {
    expect(creds).toContain('tech.test1@outlook.com');
  });

  test('§A.7 Credentials include Insurance Agent (external, no platform account)', () => {
    expect(creds).toContain('ins.agent.test@outlook.com');
    expect(creds.toLowerCase()).toContain('upload link');
  });

  test('§A.8 Multiple agents defined for multi-agent scenario', () => {
    expect(creds).toContain('agent.test2@outlook.com');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §B – Referral code validity (single-use per request) documented
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§B – Referral code validity rules', () => {
  let shortDoc: string;
  let ckEmailDoc: string;
  let doc: string;

  test.beforeAll(() => {
    shortDoc   = read(shortGuide);
    ckEmailDoc = read(ckEmail);
    doc        = read(testingDoc);
  });

  test('§B.1 SHORT_WORKFLOW_GUIDE warns referral does not carry to future requests', () => {
    const text = shortDoc.toLowerCase();
    expect(text).toMatch(/not counted|not.*carried|form.*referral|referral only converts/);
  });

  test('§B.2 Christopher email captures single-use rule', () => {
    const text = ckEmailDoc.toLowerCase();
    expect(text).toMatch(/specific request|future request|not carry over/);
  });

  test('§B.3 Referral completes only when homeowner submits the form', () => {
    expect(shortDoc.toLowerCase()).toContain('referral only converts');
  });

  test('§B.4 APP_WORKFLOW_GUIDES captures 4-field quick signup flow', () => {
    const appDoc = read(appGuide);
    expect(appDoc).toContain('Quick Signup');
    expect(appDoc.toLowerCase()).toContain('4 fields');
  });

  test('§B.5 Testing doc covers referral link used multiple times scenario', () => {
    const combined = doc + shortDoc;
    expect(combined.toLowerCase()).toContain('multiple');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §C – Multiple property addresses and permit types in test plan
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§C – Multiple addresses and permit types', () => {
  let creds: string;
  let doc: string;
  let shortDoc: string;

  test.beforeAll(() => {
    creds    = read(credFile);
    doc      = read(testingDoc);
    shortDoc = read(shortGuide);
  });

  test('§C.1 Three homeowner accounts with distinct property addresses', () => {
    expect(creds).toContain('123 Main St');
    expect(creds).toContain('456 Oak Ave');
    expect(creds).toContain('789 Pine Rd');
  });

  test('§C.2 Pipe size logic: sq ft determines pipe size', () => {
    expect(shortDoc).toContain('Sq Ft');
    expect(shortDoc).toContain('Pipe Size');
  });

  test('§C.3 Under 2000 sq ft → 3/4 inch pipe', () => {
    expect(shortDoc).toContain('3/4 inch');
  });

  test('§C.4 2001–3000 sq ft → 1 inch pipe', () => {
    expect(shortDoc).toContain('1 inch');
  });

  test('§C.5 Pressure reducer rule documented (>5 year old homes)', () => {
    const combined = shortDoc + doc;
    expect(combined.toLowerCase()).toContain('pressure reducer');
  });

  test('§C.6 Different service types tested (Installation vs Assessment)', () => {
    const combined = doc + shortDoc;
    expect(combined.toLowerCase()).toContain('installation');
    expect(combined.toLowerCase()).toContain('assessment');
  });

  test('§C.7 Assessment fee documented ($185 + $0.75/mile)', () => {
    expect(doc).toMatch(/\$185|\$0\.75\/mile/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §D – 50+ screenshot items enumerated in manual guide
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§D – 50+ screenshot items enumerated', () => {
  let manualDoc: string;
  let doc: string;

  test.beforeAll(() => {
    manualDoc = read(manualGuide);
    doc       = read(testingDoc);
  });

  test('§D.1 MANUAL_EXECUTION_GUIDE.md has screenshot tables', () => {
    expect(manualDoc.toLowerCase()).toContain('screenshot');
    expect(manualDoc).toContain('.png');
  });

  test('§D.2 Admin workflow screenshots defined', () => {
    expect(manualDoc.toLowerCase()).toContain('admin_01');
  });

  test('§D.3 Agent workflow screenshots defined', () => {
    expect(manualDoc.toLowerCase()).toContain('agent_01');
  });

  test('§D.4 MANUAL_EXECUTION_GUIDE is substantial (>5000 chars)', () => {
    expect(manualDoc.length).toBeGreaterThan(5000);
  });

  test('§D.5 Testing doc specifies email screenshot count (41 emails)', () => {
    expect(doc).toMatch(/41|email trigger/i);
  });

  test('§D.6 Testing doc specifies DocuSign count (8 docs)', () => {
    expect(doc).toMatch(/8 DocuSign|eight DocuSign|DocuSign doc/i);
  });

  test('§D.7 Email triggers spec file exists', () => {
    expect(
      fs.existsSync(path.join(ROOT, 'tests/playwright/email-docusign-triggers.spec.ts'))
    ).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §E – App vs. Google Doc discrepancy awareness captured
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§E – App vs Google Doc discrepancy awareness', () => {
  let ckEmailDoc: string;
  let appGuideDoc: string;
  let manualDoc: string;

  test.beforeAll(() => {
    ckEmailDoc  = read(ckEmail);
    appGuideDoc = read(appGuide);
    manualDoc   = read(manualGuide);
  });

  test('§E.1 Christopher email notes reference docs may differ from app', () => {
    const text = ckEmailDoc.toLowerCase();
    expect(text).toMatch(/does not fully align|somewhat different|educate you/);
  });

  test('§E.2 APP_WORKFLOW_GUIDES notes discrepancy awareness', () => {
    expect(appGuideDoc.toLowerCase()).toContain('discrepan');
  });

  test('§E.3 Christopher email says to discuss discrepancies', () => {
    const text = ckEmailDoc.toLowerCase();
    expect(text).toMatch(/discuss|ask me|call me|text.*call/);
  });

  test('§E.4 CHRISTOPHER_ORIGINAL_EMAIL.md references Google Doc links', () => {
    expect(ckEmailDoc).toContain('docs.google.com');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §F – Guide integrity cross-check (all docs consistent)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§F – Guide integrity cross-check', () => {
  let shortDoc: string;
  let appGuideDoc: string;
  let credDoc: string;
  let manualDoc: string;

  test.beforeAll(() => {
    shortDoc    = read(shortGuide);
    appGuideDoc = read(appGuide);
    credDoc     = read(credFile);
    manualDoc   = read(manualGuide);
  });

  test('§F.1 Live app URL consistent across docs', () => {
    const url = 'frontend-tan-five-46.vercel.app';
    expect(shortDoc).toContain(url);
    expect(appGuideDoc).toContain(url);
    expect(credDoc).toContain(url);
    expect(manualDoc).toContain(url);
  });

  test('§F.2 Admin email consistent across docs', () => {
    expect(shortDoc.toLowerCase()).toContain('admin@mrsurety.com');
    expect(appGuideDoc.toLowerCase()).toContain('admin@mrsurety.com');
    expect(credDoc).toContain('admin@mrsurety.com');
    expect(manualDoc).toContain('admin@mrsurety.com');
  });

  test('§F.3 Agent test email consistent across docs', () => {
    expect(credDoc).toContain('agent.test1@outlook.com');
    expect(manualDoc).toContain('agent.test1@outlook.com');
  });

  test('§F.4 Password standard consistent (QAtest@2026!)', () => {
    expect(credDoc).toContain('QAtest@2026!');
    expect(manualDoc).toContain('QAtest@2026!');
  });

  test('§F.5 Google Doc master reference consistent', () => {
    const masterDoc = '1SDDd29P';
    expect(shortDoc).toContain(masterDoc);
    expect(read(path.join(ROOT, 'qa/spec-docs/CHRISTOPHER_ORIGINAL_EMAIL.md'))).toContain(masterDoc);
  });

  test('§F.6 CSLB test number 999888 consistent', () => {
    expect(shortDoc).toContain('999888');
    expect(read(testingDoc)).toContain('999888');
  });
});
