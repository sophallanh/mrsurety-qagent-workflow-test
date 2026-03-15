import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * MrSurety QA – In-App Workflow Guides Spec
 *
 * Validates that the content captured from the live app's built-in workflow guides
 * (4 screenshots from 2026-03-14) is correctly recorded in the repository.
 *
 * Covers:
 *  §A – APP_WORKFLOW_GUIDES.md exists and has required sections
 *  §B – Agent Referral Workflow (7 steps + Rewards Program)
 *  §C – Homeowner Referral Workflow (7 steps)
 *  §D – Full Workflow (Phase 1, Phase 2, After-Work)
 *  §E – Built-in app test credentials (@mrsurety.com accounts)
 *  §F – TEST_USER_CREDENTIALS.md includes app built-in accounts
 *  §G – SHORT_WORKFLOW_GUIDE.md updated with rewards program
 *  §H – Key testing notes captured
 */

const ROOT = path.join(__dirname, '../..');
const appGuideFile = path.join(ROOT, 'qa/spec-docs/workflow-guides/APP_WORKFLOW_GUIDES.md');
const credFile     = path.join(ROOT, 'qa/test-user-credentials/TEST_USER_CREDENTIALS.md');
const shortGuide   = path.join(ROOT, 'qa/spec-docs/workflow-guides/SHORT_WORKFLOW_GUIDE.md');

let appGuide: string;
let credDoc: string;
let shortDoc: string;

test.beforeAll(() => {
  appGuide = fs.readFileSync(appGuideFile, 'utf-8');
  credDoc  = fs.readFileSync(credFile, 'utf-8');
  shortDoc = fs.readFileSync(shortGuide, 'utf-8');
});

// ─────────────────────────────────────────────────────────────────────────────
// §A – File existence and structure
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§A – APP_WORKFLOW_GUIDES.md structure', () => {
  test('§A.1 APP_WORKFLOW_GUIDES.md exists', () => {
    expect(fs.existsSync(appGuideFile)).toBe(true);
  });

  test('§A.2 file is non-empty (>2000 chars)', () => {
    expect(appGuide.length).toBeGreaterThan(2000);
  });

  test('§A.3 has source citation to live app URL', () => {
    expect(appGuide).toContain('frontend-tan-five-46.vercel.app');
  });

  test('§A.4 has capture date 2026-03-14', () => {
    expect(appGuide).toContain('2026-03-14');
  });

  test('§A.5 contains Agent Referral Workflow section', () => {
    expect(appGuide).toContain('Agent Referral Workflow');
  });

  test('§A.6 contains Homeowner Referral Workflow section', () => {
    expect(appGuide).toContain('Homeowner Referral Workflow');
  });

  test('§A.7 contains Full Workflow section', () => {
    expect(appGuide).toContain('Full Workflow');
  });

  test('§A.8 contains built-in test credentials section', () => {
    expect(appGuide).toContain('Built-In Test Credentials');
  });

  test('§A.9 contains Key Testing Notes section', () => {
    expect(appGuide).toContain('Key Testing Notes');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §B – Agent Referral Workflow
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§B – Agent Referral Workflow (7 steps)', () => {
  test('§B.1 step 1: Log Into Your Agent Dashboard', () => {
    expect(appGuide).toContain('Log Into Your Agent Dashboard');
  });

  test('§B.2 step 2: Copy referral link or QR code', () => {
    expect(appGuide).toContain('Copy Your Referral Link or QR Code');
  });

  test('§B.3 step 3: Share With Homeowners', () => {
    expect(appGuide).toContain('Share With Homeowners');
  });

  test('§B.4 step 4: Homeowner Creates Account — 4 fields only', () => {
    expect(appGuide).toContain('Homeowner Creates Account (Quick Signup)');
    expect(appGuide).toContain('4 fields');
  });

  test('§B.5 step 5: "Finish Your Referral" dashboard card', () => {
    expect(appGuide).toContain('Finish Your Referral from');
  });

  test('§B.6 agent automatically linked — homeowner never types agent email', () => {
    expect(appGuide).toContain('automatically linked');
  });

  test('§B.7 step 6: Track via Clients tab', () => {
    expect(appGuide).toContain('Track Your Referrals');
  });

  test('§B.8 Rewards Program section present', () => {
    expect(appGuide).toContain('Rewards Program');
  });

  test('§B.9 Rewards: 100 points per paid work order', () => {
    expect(appGuide).toContain('100 points');
  });

  test('§B.10 Rewards tiers: Bronze → Silver → Gold', () => {
    expect(appGuide).toContain('Bronze');
    expect(appGuide).toContain('Silver');
    expect(appGuide).toContain('Gold');
  });

  test('§B.11 Tips for Success section present', () => {
    expect(appGuide).toContain('Tips for Success');
  });

  test('§B.12 key tip: referral only converts when service request form completed', () => {
    expect(appGuide).toContain('Referral only converts when the homeowner completes the service request form');
  });

  test('§B.13 key tip: same homeowner can use multiple agents links', () => {
    expect(appGuide).toContain('multiple agents');
  });

  test('§B.14 QR code mentioned for business cards / printed materials', () => {
    expect(appGuide).toContain('QR code');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §C – Homeowner Referral Workflow
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§C – Homeowner Referral Workflow (7 steps)', () => {
  test('§C.1 Step 1 header: Create Your Account', () => {
    expect(appGuide).toContain('Step 1');
    expect(appGuide).toContain('Create Your Account');
  });

  test('§C.2 step 1: receive referral link from insurance agent', () => {
    expect(appGuide).toContain('Receive Referral Link From Your Insurance Agent');
  });

  test('§C.3 step 2: click link and sign up — 4 fields', () => {
    expect(appGuide).toContain('Click the Link & Sign Up');
    expect(appGuide).toContain('name, email, phone, and password');
  });

  test('§C.4 step 3: verify email', () => {
    expect(appGuide).toContain('Verify Your Email');
  });

  test('§C.5 Step 2 header: Complete Your Service Request', () => {
    expect(appGuide).toContain('Step 2');
    expect(appGuide).toContain('Complete Your Service Request');
  });

  test('§C.6 step 4: log into dashboard at app URL', () => {
    expect(appGuide).toContain('Log Into Your Dashboard');
  });

  test('§C.7 step 5: "Finish Your Referral in Action Required" card', () => {
    expect(appGuide).toContain('Finish Your Referral');
    expect(appGuide).toContain('Action Required');
  });

  test('§C.8 step 6: Fill Out the Service Request Form', () => {
    expect(appGuide).toContain('Fill Out the Service Request Form');
  });

  test('§C.9 agent is automatically linked in homeowner guide too', () => {
    const idx = appGuide.indexOf('Homeowner Referral Workflow');
    const section = appGuide.slice(idx, idx + 3000);
    expect(section).toContain('automatically connected');
  });

  test('§C.10 After Submission section with step 7', () => {
    expect(appGuide).toContain('After Submission');
    expect(appGuide).toContain('Track Your Service Request');
  });

  test('§C.11 Good to Know tips present', () => {
    expect(appGuide).toContain('Good to Know');
  });

  test('§C.12 support contact: admin@mrsurety.com', () => {
    expect(appGuide).toContain('admin@mrsurety.com');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §D – Full Workflow (all phases)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§D – Full Workflow phases', () => {
  test('§D.1 Phase 1: Agent Creates Referral', () => {
    expect(appGuide).toContain('Phase 1');
    expect(appGuide).toContain('Agent Creates Referral');
  });

  test('§D.2 Phase 1 step 1: log in as Agent', () => {
    const idx = appGuide.indexOf('Phase 1');
    const section = appGuide.slice(idx, idx + 1000);
    expect(section).toContain('Log in as the Agent');
  });

  test('§D.3 Phase 1 step 2: copy referral link from dashboard', () => {
    const idx = appGuide.indexOf('Phase 1');
    const section = appGuide.slice(idx, idx + 1000);
    expect(section).toContain('Copy your referral link');
  });

  test('§D.4 Phase 1 step 3: share link with homeowner', () => {
    const idx = appGuide.indexOf('Phase 1');
    const section = appGuide.slice(idx, idx + 1000);
    expect(section).toContain('Share the link');
  });

  test('§D.5 Phase 2: Homeowner Signs Up & Requests Service', () => {
    expect(appGuide).toContain('Phase 2');
    expect(appGuide).toContain('Homeowner Signs Up');
  });

  test('§D.6 Phase 2 step 1: click referral link', () => {
    const idx = appGuide.indexOf('Phase 2');
    const section = appGuide.slice(idx, idx + 2000);
    expect(section).toContain('Click the referral link');
  });

  test('§D.7 Phase 2 step 2: fill out form with address + service type', () => {
    const idx = appGuide.indexOf('Phase 2');
    const section = appGuide.slice(idx, idx + 2000);
    expect(section).toContain('property address, service type');
  });

  test('§D.8 Phase 2 step 5: wait for estimate email', () => {
    const idx = appGuide.indexOf('Phase 2');
    const section = appGuide.slice(idx, idx + 2000);
    expect(section).toContain('Wait for your estimate');
  });

  test('§D.9 After-work: Pay the remaining balance', () => {
    expect(appGuide).toContain('Pay the remaining balance');
  });

  test('§D.10 After-work: Sign the lien releases via DocuSign', () => {
    expect(appGuide).toContain('Sign the lien releases');
    expect(appGuide).toContain('DocuSign');
  });

  test('§D.11 After-work: View documents page', () => {
    expect(appGuide).toContain("View your documents");
    expect(appGuide).toContain("Documents");
  });

  test('§D.12 schedule installation via calendar after payment', () => {
    expect(appGuide).toContain('Schedule your installation');
    expect(appGuide).toContain('calendar');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §E – Built-in app test credentials in APP_WORKFLOW_GUIDES.md
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§E – Built-in app test credentials', () => {
  test('§E.1 admin@mrsurety.com in guide', () => {
    expect(appGuide).toContain('admin@mrsurety.com');
  });

  test('§E.2 testowner@mrsurety.com listed', () => {
    expect(appGuide).toContain('testowner@mrsurety.com');
  });

  test('§E.3 testpro@mrsurety.com listed', () => {
    expect(appGuide).toContain('testpro@mrsurety.com');
  });

  test('§E.4 testagent2@mrsurety.com listed', () => {
    expect(appGuide).toContain('testagent2@mrsurety.com');
  });

  test('§E.5 all @mrsurety.com accounts use password MrSurety2026!', () => {
    const idx = appGuide.indexOf('testowner@mrsurety.com');
    const section = appGuide.slice(idx - 100, idx + 500);
    expect(section).toContain('MrSurety2026!');
  });

  test('§E.6 clarification that @mrsurety.com accounts are separate from @outlook.com QA accounts', () => {
    expect(appGuide).toContain('@outlook.com');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §F – TEST_USER_CREDENTIALS.md includes built-in app accounts
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§F – TEST_USER_CREDENTIALS.md has app built-in accounts', () => {
  test('§F.1 Built-In App Test Accounts section exists', () => {
    expect(credDoc).toContain('Built-In App Test Accounts');
  });

  test('§F.2 testowner@mrsurety.com in credentials doc', () => {
    expect(credDoc).toContain('testowner@mrsurety.com');
  });

  test('§F.3 testpro@mrsurety.com in credentials doc', () => {
    expect(credDoc).toContain('testpro@mrsurety.com');
  });

  test('§F.4 testagent2@mrsurety.com in credentials doc', () => {
    expect(credDoc).toContain('testagent2@mrsurety.com');
  });

  test('§F.5 all @mrsurety.com accounts use MrSurety2026!', () => {
    const idx = credDoc.indexOf('testowner@mrsurety.com');
    const section = credDoc.slice(idx - 100, idx + 500);
    expect(section).toContain('MrSurety2026!');
  });

  test('§F.6 explanation: use @outlook.com for automated/email testing', () => {
    expect(credDoc).toContain('@outlook.com');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §G – SHORT_WORKFLOW_GUIDE.md has rewards program
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§G – SHORT_WORKFLOW_GUIDE.md updated with rewards program', () => {
  test('§G.1 Rewards Program mentioned in short guide', () => {
    expect(shortDoc).toContain('Rewards');
  });

  test('§G.2 100 points per paid work order in short guide', () => {
    expect(shortDoc).toContain('100 points');
  });

  test('§G.3 Bronze → Silver → Gold tiers in short guide', () => {
    expect(shortDoc).toContain('Bronze');
    expect(shortDoc).toContain('Silver');
    expect(shortDoc).toContain('Gold');
  });

  test('§G.4 referral converts only when service request form completed', () => {
    expect(shortDoc).toContain('only converts when homeowner completes the service request form');
  });

  test('§G.5 "Finish Your Referral" dashboard card mentioned', () => {
    expect(shortDoc).toContain('Finish Your Referral');
  });

  test('§G.6 4-field homeowner signup mentioned', () => {
    expect(shortDoc).toContain('4 fields');
  });

  test('§G.7 Clients tab for tracking referrals mentioned', () => {
    expect(shortDoc).toContain('Clients');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// §H – Key testing notes captured in APP_WORKFLOW_GUIDES.md
// ─────────────────────────────────────────────────────────────────────────────
test.describe('§H – Key testing notes from screenshots', () => {
  test('§H.1 notes: homeowner signup = 4 fields only', () => {
    expect(appGuide).toContain("4 fields only");
  });

  test('§H.2 notes: service request completed separately via dashboard card', () => {
    expect(appGuide).toContain("Finish Your Referral");
  });

  test('§H.3 notes: referral not counted if form not completed', () => {
    expect(appGuide).toContain("signs up but doesn't complete");
  });

  test('§H.4 notes: multi-agent referral — multiple cards on homeowner dashboard', () => {
    expect(appGuide).toContain("multiple agents");
  });

  test('§H.5 notes: 100 points per paid work order in testing notes table', () => {
    const idx = appGuide.indexOf('Key Testing Notes');
    const section = appGuide.slice(idx);
    expect(section).toContain('100 points');
  });

  test('§H.6 notes: use testowner/testpro/testagent2 for quick manual testing', () => {
    const idx = appGuide.indexOf('Key Testing Notes');
    const section = appGuide.slice(idx);
    expect(section).toContain('testowner');
    expect(section).toContain('testpro');
    expect(section).toContain('testagent2');
  });

  test('§H.7 notes: point counter should increment on agent dashboard after payment', () => {
    const idx = appGuide.indexOf('Key Testing Notes');
    const section = appGuide.slice(idx);
    expect(section).toContain('point counter');
  });
});
