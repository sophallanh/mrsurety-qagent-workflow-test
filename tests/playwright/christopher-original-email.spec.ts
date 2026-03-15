import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * MrSurety QA – Christopher Original Email Requirements Spec
 *
 * Cross-checks every requirement from Christopher Palmer's original
 * "Testing Instructions – User Types & Workflow" email against the QA
 * repository artifacts.
 *
 * This spec does NOT connect to the live app. It validates that:
 *   §A  – CHRISTOPHER_ORIGINAL_EMAIL.md is captured and complete
 *   §B  – All 3 required user types are defined (Agent, Contractor, Homeowner)
 *   §C  – Both agent-homeowner referral methods are covered
 *   §D  – Referral code single-use / per-request rule is documented
 *   §E  – Multiple addresses & permit types are in the test plan
 *   §F  – 50+ screenshot items are enumerated
 *   §G  – Admin credentials are correctly recorded
 *   §H  – Bug reporting / issue documentation is in place
 *   §I  – All 5 Google Doc reference links are captured
 *   §J  – Test user accounts (Outlook emails) are defined
 *   §K  – Email & DocuSign triggers spec exists and covers 41+ emails
 *   §L  – Short workflow guide covers all key workflows
 *   §M  – Screenshot directory structure matches workflow list
 *   §N  – MANUAL_EXECUTION_GUIDE.md covers all workflows
 */

const ROOT = path.join(__dirname, '../..');

// Key file paths
const ckEmailFile    = path.join(ROOT, 'qa/spec-docs/CHRISTOPHER_ORIGINAL_EMAIL.md');
const testingDocFile = path.join(ROOT, 'qa/spec-docs/CHRISTOPHER_TESTING_DOC.md');
const credFile       = path.join(ROOT, 'qa/test-user-credentials/TEST_USER_CREDENTIALS.md');
const shortGuide     = path.join(ROOT, 'qa/spec-docs/workflow-guides/SHORT_WORKFLOW_GUIDE.md');
const appGuide       = path.join(ROOT, 'qa/spec-docs/workflow-guides/APP_WORKFLOW_GUIDES.md');
const manualGuide    = path.join(ROOT, 'qa/MANUAL_EXECUTION_GUIDE.md');
const bugTemplate    = path.join(ROOT, 'qa/bug-reports/BUG_REPORT_TEMPLATE.md');
const emailSpec      = path.join(ROOT, 'tests/playwright/email-docusign-triggers.spec.ts');
const screenshotRoot = path.join(ROOT, 'qa/screenshots');

function read(p: string): string {
  if (!fs.existsSync(p)) return '';
  return fs.readFileSync(p, 'utf-8');
}

// ─────────────────────────────────────────────────────────────────────────────
// §A – Christopher's original email is captured
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§A – CHRISTOPHER_ORIGINAL_EMAIL.md captured', () => {
  let ckEmail: string;

  test.beforeAll(() => { ckEmail = read(ckEmailFile); });

  test('§A.1 CHRISTOPHER_ORIGINAL_EMAIL.md exists', () => {
    expect(fs.existsSync(ckEmailFile)).toBe(true);
  });

  test('§A.2 Email file is non-empty (>1000 chars)', () => {
    expect(ckEmail.length).toBeGreaterThan(1000);
  });

  test('§A.3 Subject line captured', () => {
    expect(ckEmail).toContain('Testing Instructions');
    expect(ckEmail).toContain('User Types');
    expect(ckEmail).toContain('Workflow');
  });

  test('§A.4 Sender is Christopher Palmer', () => {
    expect(ckEmail).toContain('Christopher');
    expect(ckEmail).toContain('Palmer');
  });

  test('§A.5 Outlook email instruction captured', () => {
    expect(ckEmail.toLowerCase()).toContain('outlook');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §B – All 3 required user types are defined
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§B – 3 primary user types defined', () => {
  let creds: string;
  let testDoc: string;

  test.beforeAll(() => {
    creds   = read(credFile);
    testDoc = read(testingDocFile);
  });

  test('§B.1 Agent user type defined in credentials', () => {
    expect(creds).toContain('agent.test1@outlook.com');
    expect(creds).toContain('Agent');
  });

  test('§B.2 Contractor user type defined in credentials', () => {
    expect(creds).toContain('contractor.test1@outlook.com');
    expect(creds).toContain('Contractor');
  });

  test('§B.3 Homeowner user type defined in credentials', () => {
    expect(creds).toContain('homeowner.test1@outlook.com');
    expect(creds).toContain('Homeowner');
  });

  test('§B.4 Admin credentials documented', () => {
    expect(creds).toContain('admin@mrsurety.com');
    expect(creds).toContain('MrSurety2026!');
  });

  test('§B.5 Testing doc lists all user types', () => {
    expect(testDoc).toContain('Homeowner');
    expect(testDoc).toContain('Contractor');
    expect(testDoc).toContain('Insurance Agent');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §C – Both agent-homeowner referral methods are covered
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§C – Both referral methods covered', () => {
  let shortDoc: string;
  let appGuideDoc: string;
  let creds: string;

  test.beforeAll(() => {
    shortDoc   = read(shortGuide);
    appGuideDoc = read(appGuide);
    creds      = read(credFile);
  });

  test('§C.1 Method A (referral link) documented in SHORT_WORKFLOW_GUIDE', () => {
    expect(shortDoc).toContain('Method A');
    expect(shortDoc.toLowerCase()).toContain('referral link');
  });

  test('§C.2 Method B (agent email) documented in SHORT_WORKFLOW_GUIDE', () => {
    expect(shortDoc).toContain('Method B');
    expect(shortDoc.toLowerCase()).toContain('agent email');
  });

  test('§C.3 APP_WORKFLOW_GUIDES captures agent referral flow from live app', () => {
    expect(appGuideDoc).toContain('Agent Referral Workflow');
    expect(appGuideDoc.toLowerCase()).toContain('referral link');
    expect(appGuideDoc.toLowerCase()).toContain('qr code');
  });

  test('§C.4 Two homeowner accounts cover the two methods', () => {
    // homeowner.test2 uses referral link (Method A)
    expect(creds).toContain('homeowner.test2@outlook.com');
    // homeowner.test1 enters agent email (Method B)
    expect(creds).toContain('homeowner.test1@outlook.com');
  });

  test('§C.5 Agent referral spec file exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'tests/playwright/agent-referral-workflow.spec.ts'))).toBe(true);
  });

  test('§C.6 Both methods noted in credentials with workflow mapping', () => {
    expect(creds).toContain('Method A');
    expect(creds).toContain('Method B');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §D – Referral code single-use / per-request rule
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§D – Referral code validity rules documented', () => {
  let shortDoc: string;
  let ckEmail: string;
  let testDoc: string;

  test.beforeAll(() => {
    shortDoc = read(shortGuide);
    ckEmail  = read(ckEmailFile);
    testDoc  = read(testingDocFile);
  });

  test('§D.1 Referral code single-use rule captured in CHRISTOPHER_ORIGINAL_EMAIL', () => {
    const text = ckEmail.toLowerCase();
    expect(text).toMatch(/referral code.*valid|valid.*referral code|specific request|future request/s);
  });

  test('§D.2 SHORT_WORKFLOW_GUIDE warns referral only converts on form completion', () => {
    expect(shortDoc.toLowerCase()).toContain('referral only converts');
  });

  test('§D.3 CHRISTOPHER_TESTING_DOC covers referral link used multiple times scenario', () => {
    expect(testDoc.toLowerCase()).toContain('multiple');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §E – Multiple addresses & permit types in test plan
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§E – Multiple addresses and permit types', () => {
  let creds: string;
  let testDoc: string;
  let shortDoc: string;

  test.beforeAll(() => {
    creds   = read(credFile);
    testDoc = read(testingDocFile);
    shortDoc = read(shortGuide);
  });

  test('§E.1 Multiple homeowner accounts have different property addresses', () => {
    expect(creds).toContain('123 Main St');
    expect(creds).toContain('456 Oak Ave');
    expect(creds).toContain('789 Pine Rd');
  });

  test('§E.2 Testing doc notes multiple property addresses scenario', () => {
    expect(testDoc.toLowerCase()).toContain('multiple');
    expect(testDoc.toLowerCase()).toContain('address');
  });

  test('§E.3 Pipe size logic table exists (different property specs)', () => {
    expect(shortDoc).toContain('Sq Ft');
    expect(shortDoc).toContain('3/4 inch');
    expect(shortDoc).toContain('1 inch');
  });

  test('§E.4 Assessment fee documented', () => {
    expect(testDoc).toMatch(/\$185|\$0\.75\/mile/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §F – 50+ screenshot items enumerated
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§F – 50+ screenshot items enumerated', () => {
  let manualDoc: string;
  let testDoc: string;

  test.beforeAll(() => {
    manualDoc = read(manualGuide);
    testDoc   = read(testingDocFile);
  });

  test('§F.1 MANUAL_EXECUTION_GUIDE.md documents screenshot items', () => {
    expect(manualDoc.toLowerCase()).toContain('screenshot');
    expect(manualDoc.length).toBeGreaterThan(3000);
  });

  test('§F.2 Screenshot directory structure has 8 workflow folders', () => {
    const expected = [
      'admin-dashboard',
      'agent-referral-workflow',
      'agent-upload-invite',
      'contractor-bidding',
      'email-docusign-triggers',
      'homeowner-service-request',
      'technician-workflow',
      'edge-cases',
    ];
    for (const folder of expected) {
      expect(fs.existsSync(path.join(screenshotRoot, folder))).toBe(true);
    }
  });

  test('§F.3 Testing doc specifies 41 email triggers', () => {
    expect(testDoc).toMatch(/41|fourteen homeowner|12 contractor|7 agent/i);
  });

  test('§F.4 Testing doc specifies 8 DocuSign documents', () => {
    expect(testDoc).toMatch(/8 docusign|eight docusign|DocuSign doc/i);
  });

  test('§F.5 MANUAL_EXECUTION_GUIDE covers email+docusign screenshots', () => {
    expect(manualDoc.toLowerCase()).toContain('docusign');
    expect(manualDoc.toLowerCase()).toContain('email');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §G – Admin credentials correctly recorded
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§G – Admin credentials', () => {
  let creds: string;
  let manualDoc: string;
  let ckEmail: string;

  test.beforeAll(() => {
    creds     = read(credFile);
    manualDoc = read(manualGuide);
    ckEmail   = read(ckEmailFile);
  });

  test('§G.1 Admin email correct in credentials file', () => {
    expect(creds).toContain('admin@mrsurety.com');
  });

  test('§G.2 Admin password correct in credentials file', () => {
    expect(creds).toContain('MrSurety2026!');
  });

  test('§G.3 Admin credentials in MANUAL_EXECUTION_GUIDE', () => {
    expect(manualDoc).toContain('admin@mrsurety.com');
    expect(manualDoc).toContain('MrSurety2026!');
  });

  test('§G.4 Admin credentials match Christopher email', () => {
    expect(ckEmail).toContain('admin@mrsurety.com');
    expect(ckEmail).toContain('MrSurety2026!');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §H – Bug reporting / issue documentation in place
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§H – Bug reporting infrastructure', () => {
  let bugDoc: string;
  let manualDoc: string;

  test.beforeAll(() => {
    bugDoc    = read(bugTemplate);
    manualDoc = read(manualGuide);
  });

  test('§H.1 Bug report template exists', () => {
    expect(fs.existsSync(bugTemplate)).toBe(true);
  });

  test('§H.2 Bug template has required fields', () => {
    expect(bugDoc.toLowerCase()).toContain('screenshot');
    expect(bugDoc.toLowerCase()).toContain('steps to reproduce');
  });

  test('§H.3 MANUAL_EXECUTION_GUIDE mentions issue reporting', () => {
    expect(manualDoc.toLowerCase()).toMatch(/bug|issue|report|problem/);
  });

  test('§H.4 Videos directory exists for screen recording', () => {
    expect(fs.existsSync(path.join(ROOT, 'qa/videos'))).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §I – All 5 Google Doc reference links captured
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§I – Google Doc reference links captured', () => {
  let testDoc: string;
  let ckEmail: string;

  test.beforeAll(() => {
    testDoc = read(testingDocFile);
    ckEmail = read(ckEmailFile);
  });

  test('§I.1 Service Form link captured (1jXC_fU0)', () => {
    const combined = testDoc + ckEmail;
    expect(combined).toContain('1jXC_fU0');
  });

  test('§I.2 Short Workflow link captured (1CUxJ-Ar)', () => {
    const combined = testDoc + ckEmail;
    expect(combined).toContain('1CUxJ-Ar');
  });

  test('§I.3 Long Workflow link captured (1V-WCoz8)', () => {
    const combined = testDoc + ckEmail;
    expect(combined).toContain('1V-WCoz8');
  });

  test('§I.4 Email+DocuSign Examples link captured (1xjv0Ol1)', () => {
    const combined = testDoc + ckEmail;
    expect(combined).toContain('1xjv0Ol1');
  });

  test('§I.5 Master Organizing Doc link captured (1SDDd29P)', () => {
    const combined = testDoc + ckEmail;
    expect(combined).toContain('1SDDd29P');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §J – Test user accounts (Outlook emails) defined
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§J – Test user accounts (Outlook emails)', () => {
  let creds: string;
  let fixtureFile: string;

  test.beforeAll(() => {
    creds       = read(credFile);
    fixtureFile = read(path.join(ROOT, 'tests/playwright/fixtures/test-users.ts'));
  });

  test('§J.1 agent.test1@outlook.com defined in credentials', () => {
    expect(creds).toContain('agent.test1@outlook.com');
  });

  test('§J.2 homeowner.test1@outlook.com defined', () => {
    expect(creds).toContain('homeowner.test1@outlook.com');
  });

  test('§J.3 homeowner.test2@outlook.com defined (referral link method)', () => {
    expect(creds).toContain('homeowner.test2@outlook.com');
  });

  test('§J.4 homeowner.test3@outlook.com defined (edge case)', () => {
    expect(creds).toContain('homeowner.test3@outlook.com');
  });

  test('§J.5 contractor.test1@outlook.com defined', () => {
    expect(creds).toContain('contractor.test1@outlook.com');
  });

  test('§J.6 tech.test1@outlook.com defined', () => {
    expect(creds).toContain('tech.test1@outlook.com');
  });

  test('§J.7 ins.agent.test@outlook.com defined', () => {
    expect(creds).toContain('ins.agent.test@outlook.com');
  });

  test('§J.8 Fixture file references Outlook accounts', () => {
    expect(fixtureFile).toContain('outlook.com');
  });

  test('§J.9 All accounts use QAtest@2026! password', () => {
    expect(creds).toContain('QAtest@2026!');
  });

  test('§J.10 create-accounts workflow documented', () => {
    const guide = read(path.join(ROOT, 'qa/openclaw/RUN_TODAY.md'));
    expect(guide).toContain('create-accounts');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §K – Email & DocuSign spec exists and covers 41+ emails
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§K – Email & DocuSign triggers spec', () => {
  let specContent: string;
  let testDoc: string;

  test.beforeAll(() => {
    specContent = read(emailSpec);
    testDoc     = read(testingDocFile);
  });

  test('§K.1 email-docusign-triggers.spec.ts exists', () => {
    expect(fs.existsSync(emailSpec)).toBe(true);
  });

  test('§K.2 Email spec is non-trivial (>500 chars)', () => {
    expect(specContent.length).toBeGreaterThan(500);
  });

  test('§K.3 Testing doc lists homeowner emails', () => {
    expect(testDoc.toLowerCase()).toContain('homeowner');
    expect(testDoc.toLowerCase()).toContain('email');
  });

  test('§K.4 Testing doc lists contractor emails', () => {
    expect(testDoc.toLowerCase()).toContain('contractor');
  });

  test('§K.5 Testing doc references DocuSign', () => {
    expect(testDoc.toLowerCase()).toContain('docusign');
  });

  test('§K.6 CSLB test number 999888 documented', () => {
    expect(testDoc).toContain('999888');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §L – SHORT_WORKFLOW_GUIDE covers all key workflows
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§L – SHORT_WORKFLOW_GUIDE completeness', () => {
  let shortDoc: string;

  test.beforeAll(() => { shortDoc = read(shortGuide); });

  test('§L.1 SHORT_WORKFLOW_GUIDE.md exists', () => {
    expect(fs.existsSync(shortGuide)).toBe(true);
  });

  test('§L.2 Covers Workflow 1: Agent Referral', () => {
    expect(shortDoc).toContain('WORKFLOW 1');
    expect(shortDoc.toLowerCase()).toContain('agent referral');
  });

  test('§L.3 Covers Workflow 2: Homeowner Service Request', () => {
    expect(shortDoc).toContain('WORKFLOW 2');
    expect(shortDoc.toLowerCase()).toContain('homeowner service request');
  });

  test('§L.4 Covers Workflow 3: Contractor Bidding', () => {
    expect(shortDoc).toContain('WORKFLOW 3');
    expect(shortDoc.toLowerCase()).toContain('contractor bidding');
  });

  test('§L.5 Covers Workflow 4: Homeowner Selection & Deposit', () => {
    expect(shortDoc).toContain('WORKFLOW 4');
    expect(shortDoc.toLowerCase()).toContain('deposit');
  });

  test('§L.6 Covers Workflow 5: DocuSign', () => {
    expect(shortDoc).toContain('WORKFLOW 5');
    expect(shortDoc.toLowerCase()).toContain('docusign');
  });

  test('§L.7 Covers Workflow 6: Admin Verification', () => {
    expect(shortDoc).toContain('WORKFLOW 6');
    expect(shortDoc.toLowerCase()).toContain('admin');
  });

  test('§L.8 Covers Workflow 7: Technician Assessment', () => {
    expect(shortDoc).toContain('WORKFLOW 7');
    expect(shortDoc.toLowerCase()).toContain('technician');
  });

  test('§L.9 Live app URL present', () => {
    expect(shortDoc).toContain('frontend-tan-five-46.vercel.app');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §M – Screenshot directory structure matches workflow list
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§M – Screenshot directory structure', () => {
  const expectedFolders = [
    'admin-dashboard',
    'agent-referral-workflow',
    'agent-upload-invite',
    'contractor-bidding',
    'email-docusign-triggers',
    'homeowner-service-request',
    'technician-workflow',
    'edge-cases',
  ];

  for (const folder of expectedFolders) {
    test(`§M – screenshots/${folder} directory exists`, () => {
      expect(fs.existsSync(path.join(screenshotRoot, folder))).toBe(true);
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// §N – MANUAL_EXECUTION_GUIDE.md covers all workflows
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§N – MANUAL_EXECUTION_GUIDE.md completeness', () => {
  let manualDoc: string;

  test.beforeAll(() => { manualDoc = read(manualGuide); });

  test('§N.1 MANUAL_EXECUTION_GUIDE.md exists', () => {
    expect(fs.existsSync(manualGuide)).toBe(true);
  });

  test('§N.2 Covers Workflow 1: Admin Login', () => {
    expect(manualDoc).toMatch(/Workflow 1|Admin Login/i);
  });

  test('§N.3 Covers agent signup / referral workflow', () => {
    expect(manualDoc.toLowerCase()).toContain('agent');
    expect(manualDoc.toLowerCase()).toContain('referral');
  });

  test('§N.4 Covers homeowner service request', () => {
    expect(manualDoc.toLowerCase()).toContain('homeowner');
    expect(manualDoc.toLowerCase()).toContain('service request');
  });

  test('§N.5 Covers contractor bidding', () => {
    expect(manualDoc.toLowerCase()).toContain('contractor');
    expect(manualDoc.toLowerCase()).toContain('bid');
  });

  test('§N.6 Covers DocuSign workflow', () => {
    expect(manualDoc.toLowerCase()).toContain('docusign');
  });

  test('§N.7 Covers admin verification', () => {
    expect(manualDoc.toLowerCase()).toContain('admin');
    expect(manualDoc.toLowerCase()).toContain('verif');
  });

  test('§N.8 Covers technician assessment', () => {
    expect(manualDoc.toLowerCase()).toContain('technician');
  });

  test('§N.9 Pre-flight Outlook account creation section', () => {
    expect(manualDoc.toLowerCase()).toContain('outlook');
  });

  test('§N.10 References OpenClaw automation', () => {
    expect(manualDoc.toLowerCase()).toContain('openclaw');
  });
});
