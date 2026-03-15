import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * MrSurety QA – Palmer Supplement 2 Spec
 *
 * Validates the Agent Upload Invite System artifacts and testing approach
 * additions from the Palmer supplemental instructions.
 *
 * This spec does NOT connect to the live app. It validates that:
 *   §A – Contractor side: send invite, view invites, revoke invite
 *   §B – Insurance agent side: secure link, checklist, upload flow
 *   §C – Security controls documented and spec'd
 *   §D – Upload restrictions documented (COI/endorsements only)
 *   §E – Testing approach: test accounts, multiple scenarios
 *   §F – Agent upload invite spec file exists and is comprehensive
 *   §G – Guide integrity (all agent upload docs consistent)
 *   §H – Live app URL verified in key config and guide files
 */

const ROOT = path.join(__dirname, '../..');

const agentUploadSpec  = path.join(ROOT, 'tests/playwright/agent-upload-invite.spec.ts');
const credFile         = path.join(ROOT, 'qa/test-user-credentials/TEST_USER_CREDENTIALS.md');
const shortGuide       = path.join(ROOT, 'qa/spec-docs/workflow-guides/SHORT_WORKFLOW_GUIDE.md');
const manualGuide      = path.join(ROOT, 'qa/MANUAL_EXECUTION_GUIDE.md');
const testingDoc       = path.join(ROOT, 'qa/spec-docs/CHRISTOPHER_TESTING_DOC.md');
const playwrightConfig = path.join(ROOT, 'tests/playwright.config.ts');
const envExample       = path.join(ROOT, 'tests/.env.example');
const openclawEnv      = path.join(ROOT, 'qa/openclaw/.env.example');
const appGuide         = path.join(ROOT, 'qa/spec-docs/workflow-guides/APP_WORKFLOW_GUIDES.md');

function read(p: string): string {
  if (!fs.existsSync(p)) return '';
  return fs.readFileSync(p, 'utf-8');
}

// ─────────────────────────────────────────────────────────────────────────────
// §A – Contractor side: send invite, view invites, revoke invite
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§A – Contractor side of Agent Upload Invite System', () => {
  let spec: string;

  test.beforeAll(() => { spec = read(agentUploadSpec); });

  test('§A.1 agent-upload-invite.spec.ts exists', () => {
    expect(fs.existsSync(agentUploadSpec)).toBe(true);
  });

  test('§A.2 Spec covers sending invite to insurance agent', () => {
    const text = spec.toLowerCase();
    expect(text).toContain('invite');
    expect(text).toContain('insurance agent');
  });

  test('§A.3 Spec covers viewing active invites', () => {
    expect(spec.toLowerCase()).toContain('active invite');
  });

  test('§A.4 Spec covers revoking an invite', () => {
    expect(spec.toLowerCase()).toContain('revok');
  });

  test('§A.5 Contractor test account defined', () => {
    const creds = read(credFile);
    expect(creds).toContain('contractor.test1@outlook.com');
  });

  test('§A.6 Insurance agent email defined (external, no platform account)', () => {
    const creds = read(credFile);
    expect(creds).toContain('ins.agent.test@outlook.com');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §B – Insurance agent side: secure link, checklist, upload flow
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§B – Insurance agent side (secure link only)', () => {
  let spec: string;

  test.beforeAll(() => { spec = read(agentUploadSpec); });

  test('§B.1 Spec covers receiving secure upload link', () => {
    const text = spec.toLowerCase();
    expect(text).toContain('secure');
    expect(text).toContain('upload link');
  });

  test('§B.2 Spec covers document checklist view', () => {
    expect(spec.toLowerCase()).toContain('checklist');
  });

  test('§B.3 Spec covers uploading COI documents', () => {
    const text = spec.toLowerCase();
    expect(text).toContain('coi');
  });

  test('§B.4 Spec covers uploading endorsement documents', () => {
    expect(spec.toLowerCase()).toContain('endorsement');
  });

  test('§B.5 Insurance agent has no platform login (link only)', () => {
    const creds = read(credFile);
    expect(creds.toLowerCase()).toContain('upload link');
    expect(creds.toLowerCase()).toContain('no platform account');
  });

  test('§B.6 AGENT_UPLOAD_LINK environment variable required', () => {
    expect(spec).toContain('AGENT_UPLOAD_LINK');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §C – Security controls documented and spec'd
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§C – Security controls', () => {
  let spec: string;

  test.beforeAll(() => { spec = read(agentUploadSpec); });

  test('§C.1 Spec covers link locked to one contractor', () => {
    const text = spec.toLowerCase();
    expect(text).toMatch(/locked|specific contractor|one specific/);
  });

  test('§C.2 Spec covers revoked link returns error', () => {
    expect(spec.toLowerCase()).toContain('revoked');
    expect(spec).toContain('REVOKED_UPLOAD_LINK');
  });

  test('§C.3 Spec covers expired link (>7 days) rejected', () => {
    expect(spec.toLowerCase()).toContain('expired');
    expect(spec).toContain('EXPIRED_UPLOAD_LINK');
  });

  test('§C.4 Spec covers direct URL manipulation gives no access', () => {
    const text = spec.toLowerCase();
    expect(text).toMatch(/direct url|url manipulation|other contractor/);
  });

  test('§C.5 Agent upload-only permission (no view/download/delete)', () => {
    const text = spec.toLowerCase();
    expect(text).toMatch(/agent can only upload|no view|upload.{0,30}only/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §D – Upload restrictions documented (COI/endorsements only)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§D – Upload restrictions', () => {
  let spec: string;
  let manual: string;

  test.beforeAll(() => {
    spec   = read(agentUploadSpec);
    manual = read(manualGuide);
  });

  test('§D.1 Upload allows COI documents', () => {
    expect(spec.toLowerCase()).toContain('coi');
  });

  test('§D.2 Upload allows endorsement documents', () => {
    expect(spec.toLowerCase()).toContain('endorsement');
  });

  test('§D.3 Upload blocks CSLB license docs', () => {
    const text = spec.toLowerCase();
    expect(text).toContain('cslb');
    expect(text).toMatch(/cslb.*block|block.*cslb|no.*cslb|cslb.*restriction/);
  });

  test('§D.4 Upload blocks W-9 documents', () => {
    const text = spec.toLowerCase();
    expect(text).toContain('w-9');
    expect(text).toMatch(/w-9.*block|block.*w-9|no.*w-9/);
  });

  test('§D.5 Upload blocks bond documents', () => {
    expect(spec.toLowerCase()).toContain('bond');
  });

  test('§D.6 Upload blocks photo ID documents', () => {
    const text = spec.toLowerCase();
    expect(text).toMatch(/photo id|id.*block/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §E – Testing approach: test accounts, multiple scenarios
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§E – Testing approach', () => {
  let creds: string;
  let shortDoc: string;
  let testDoc: string;

  test.beforeAll(() => {
    creds    = read(credFile);
    shortDoc = read(shortGuide);
    testDoc  = read(testingDoc);
  });

  test('§E.1 Multiple contractor accounts defined', () => {
    expect(creds).toContain('contractor.test1@outlook.com');
    expect(creds).toContain('contractor.test2@outlook.com');
  });

  test('§E.2 Multiple homeowner accounts for different scenarios', () => {
    expect(creds).toContain('homeowner.test1@outlook.com');
    expect(creds).toContain('homeowner.test2@outlook.com');
    expect(creds).toContain('homeowner.test3@outlook.com');
  });

  test('§E.3 create-accounts workflow documented in RUN_TODAY', () => {
    const runToday = read(path.join(ROOT, 'qa/openclaw/RUN_TODAY.md'));
    expect(runToday).toContain('create-accounts');
  });

  test('§E.4 OpenClaw script has all 9 workflows + create-accounts', () => {
    const script = read(path.join(ROOT, 'qa/openclaw/workflows/mrsurety_qa.py'));
    expect(script).toContain('create-accounts');
    expect(script).toContain('admin-login');
    expect(script).toContain('agent-signup');
    expect(script).toContain('homeowner-service-request');
    expect(script).toContain('contractor-bidding');
    expect(script).toContain('homeowner-deposit');
    expect(script).toContain('work-order-docusign');
    expect(script).toContain('admin-verification');
    expect(script).toContain('technician-workflow');
    expect(script).toContain('agent-upload-invite');
  });

  test('§E.5 Both referral methods tested (Method A and Method B)', () => {
    const combined = shortDoc + testDoc;
    expect(combined).toContain('Method A');
    expect(combined).toContain('Method B');
  });

  test('§E.6 Edge case: homeowner with no agent defined', () => {
    expect(creds).toContain('homeowner.test3@outlook.com');
    expect(creds.toLowerCase()).toContain('edge case');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §F – Agent upload invite spec is comprehensive
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§F – Agent upload invite spec comprehensiveness', () => {
  let spec: string;

  test.beforeAll(() => { spec = read(agentUploadSpec); });

  test('§F.1 Spec is substantial (>3000 chars)', () => {
    expect(spec.length).toBeGreaterThan(3000);
  });

  test('§F.2 Spec has clear section headers', () => {
    const text = spec.toLowerCase();
    expect(text).toContain('contractor side');
    expect(text).toContain('insurance agent side');
    expect(text).toContain('security');
  });

  test('§F.3 Spec uses TEST_USERS fixture', () => {
    expect(spec).toContain('TEST_USERS');
    expect(spec).toContain('insuranceAgent');
  });

  test('§F.4 Spec captures screenshots to correct directory', () => {
    expect(spec).toContain('agent-upload-invite');
    expect(spec).toContain('screenshot');
  });

  test('§F.5 Screenshot directory for agent-upload-invite exists', () => {
    expect(
      fs.existsSync(path.join(ROOT, 'qa/screenshots/agent-upload-invite'))
    ).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §G – Guide integrity: all agent upload docs consistent
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§G – Agent upload docs integrity', () => {
  let manual: string;
  let creds: string;
  let script: string;

  test.beforeAll(() => {
    manual = read(manualGuide);
    creds  = read(credFile);
    script = read(path.join(ROOT, 'qa/openclaw/workflows/mrsurety_qa.py'));
  });

  test('§G.1 Manual guide covers agent upload invite workflow', () => {
    const text = manual.toLowerCase();
    expect(text).toMatch(/agent upload|upload invite|insurance agent/);
  });

  test('§G.2 Credentials reference INSURANCE_AGENT_EMAIL env var', () => {
    const combined = creds + script;
    expect(combined).toContain('INSURANCE_AGENT_EMAIL');
  });

  test('§G.3 OpenClaw script implements agent-upload-invite workflow', () => {
    expect(script).toContain('agent-upload-invite');
    expect(script.toLowerCase()).toContain('upload');
  });

  test('§G.4 Insurance agent email consistent across docs', () => {
    expect(creds).toContain('ins.agent.test@outlook.com');
    expect(manual).toContain('ins.agent.test@outlook.com');
  });

  test('§G.5 Agent upload workflow has its own screenshot folder', () => {
    expect(
      fs.existsSync(path.join(ROOT, 'qa/screenshots/agent-upload-invite'))
    ).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §H – Live app URL verified in key config and guide files
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§H – Live app URL consistency', () => {
  const LIVE_URL = 'frontend-tan-five-46.vercel.app';

  test('§H.1 Live URL present in SHORT_WORKFLOW_GUIDE.md', () => {
    expect(read(shortGuide)).toContain(LIVE_URL);
  });

  test('§H.2 Live URL present in playwright.config.ts', () => {
    expect(read(playwrightConfig)).toContain(LIVE_URL);
  });

  test('§H.3 Live URL present in tests/.env.example', () => {
    expect(read(envExample)).toContain(LIVE_URL);
  });

  test('§H.4 Live URL present in openclaw .env.example', () => {
    expect(read(openclawEnv)).toContain(LIVE_URL);
  });

  test('§H.5 Live URL present in APP_WORKFLOW_GUIDES.md', () => {
    expect(read(appGuide)).toContain(LIVE_URL);
  });
});
