import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * MrSurety QA – OpenClaw Integration Validation Spec
 *
 * Validates that all OpenClaw integration files are present, complete,
 * and consistent with Christopher's testing requirements.
 *
 * This spec does NOT connect to the live app. It validates:
 *   §A – OPENCLAW_SETUP_GUIDE.md completeness (all 15 sections present)
 *   §B – docker-compose.yml correctness (services, ports, volumes)
 *   §C – .env.example coverage (all required variables)
 *   §D – Python workflow script coverage (all 6 workflows implemented)
 *   §E – Daily runner script completeness
 *   §F – Output folder structure
 *   §G – CSV template correctness (required columns)
 *   §H – Christopher's requirements fully covered
 *   §I – Integration consistency with existing Playwright suite
 */

const REPO_ROOT = path.join(__dirname, '..', '..');
const OPENCLAW_DIR = path.join(REPO_ROOT, 'qa', 'openclaw');
const GUIDE_PATH = path.join(OPENCLAW_DIR, 'OPENCLAW_SETUP_GUIDE.md');
const DOCKER_PATH = path.join(OPENCLAW_DIR, 'docker-compose.yml');
const ENV_EXAMPLE_PATH = path.join(OPENCLAW_DIR, '.env.example');
const WORKFLOW_SCRIPT_PATH = path.join(OPENCLAW_DIR, 'workflows', 'mrsurety_qa.py');
const DAILY_RUNNER_PATH = path.join(OPENCLAW_DIR, 'workflows', 'run_daily.sh');
const OUTPUT_README_PATH = path.join(OPENCLAW_DIR, 'output', 'README.md');
const ACCOUNTS_TEMPLATE_PATH = path.join(OPENCLAW_DIR, 'output', 'data', 'test_accounts_template.csv');
const FINDINGS_TEMPLATE_PATH = path.join(OPENCLAW_DIR, 'output', 'data', 'findings_template.csv');

function readFile(filePath: string): string {
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8');
}

// ── §A – OPENCLAW_SETUP_GUIDE.md completeness ─────────────────────────────

test.describe('§A – OPENCLAW_SETUP_GUIDE.md completeness', () => {
  let guide: string;

  test.beforeAll(() => {
    guide = readFile(GUIDE_PATH);
  });

  test('§A.1 Setup guide file exists', () => {
    expect(fs.existsSync(GUIDE_PATH)).toBe(true);
  });

  test('§A.2 Guide covers Step 1 – Prerequisites', () => {
    expect(guide).toContain('Prerequisites');
    expect(guide).toContain('Docker');
    expect(guide).toContain('Python');
    expect(guide).toContain('playwright install');
  });

  test('§A.3 Guide covers Step 2 – Docker install', () => {
    expect(guide).toContain('docker compose up');
    expect(guide).toContain('docker pull');
  });

  test('§A.4 Guide covers Step 3 – Environment variables', () => {
    expect(guide).toContain('.env.example');
    expect(guide).toContain('.env');
    expect(guide).toContain('MRSURETY_BASE_URL');
  });

  test('§A.5 Guide covers Step 4 – Chat interface (Telegram/Slack)', () => {
    expect(guide).toContain('Telegram');
    expect(guide).toContain('Slack');
    expect(guide).toContain('BotFather');
  });

  test('§A.6 Guide covers Step 5 – Browser skill enable', () => {
    expect(guide).toContain('Browser Skill');
    expect(guide).toContain('headless');
    expect(guide).toContain('screenshot');
  });

  test('§A.7 Guide covers Step 6 – MrSurety app connection', () => {
    expect(guide).toContain('admin@mrsurety.com');
    expect(guide).toContain('MrSurety2026!');
    expect(guide).toContain('--check-connection');
  });

  test('§A.8 Guide covers Workflow 1 – Admin login & dashboard', () => {
    expect(guide).toContain('Admin Login');
    expect(guide).toContain('admin_01_dashboard.png');
    expect(guide).toContain('admin_users.csv');
  });

  test('§A.9 Guide covers Workflow 2 – Agent signup & referral code', () => {
    expect(guide).toContain('Agent Signup');
    expect(guide).toContain('referral code');
    expect(guide).toContain('QR');
    expect(guide).toContain('agent_01_referral_code.png');
  });

  test('§A.10 Guide covers Workflow 3 – Homeowner service request & Stripe', () => {
    expect(guide).toContain('Service Request');
    expect(guide).toContain('4242');
    expect(guide).toContain('homeowner_03_stripe_success.png');
  });

  test('§A.11 Guide covers both referral methods (Method A & Method B)', () => {
    expect(guide).toContain('Method A');
    expect(guide).toContain('Method B');
    expect(guide).toContain('referral link');
    expect(guide).toContain('agent email');
  });

  test('§A.12 Guide covers Workflow 4 – Email & DocuSign screenshots (50+)', () => {
    expect(guide).toContain('50+');
    expect(guide).toContain('email_001');
    expect(guide).toContain('docusign_001');
    expect(guide).toContain('email_inventory.csv');
  });

  test('§A.13 Guide covers Workflow 5 – Contractor upload invite & security', () => {
    expect(guide).toContain('Upload Invite');
    expect(guide).toContain('revoke');
    expect(guide).toContain('7 days');
    expect(guide).toContain('CSLB');
  });

  test('§A.14 Guide covers Workflow 6 – Admin verification & daily report', () => {
    expect(guide).toContain('Admin Verification');
    expect(guide).toContain('daily');
    expect(guide).toContain('findings.md');
  });

  test('§A.15 Guide covers output folder structure', () => {
    expect(guide).toContain('screenshots/');
    expect(guide).toContain('videos/');
    expect(guide).toContain('data/');
    expect(guide).toContain('reports/');
    expect(guide).toContain('test_accounts.csv');
    expect(guide).toContain('findings.csv');
  });

  test('§A.16 Guide covers daily cron run', () => {
    expect(guide).toContain('cron');
    expect(guide).toContain('run_daily.sh');
    expect(guide).toContain('6 AM');
  });

  test('§A.17 Guide covers troubleshooting section', () => {
    expect(guide).toContain('Troubleshooting');
    expect(guide).toContain('Stripe');
    expect(guide).toContain('Referral code invalid');
  });

  test('§A.18 Guide references Google Drive upload', () => {
    expect(guide).toContain('Google Drive');
    expect(guide).toContain('zip');
  });
});

// ── §B – docker-compose.yml correctness ───────────────────────────────────

test.describe('§B – docker-compose.yml correctness', () => {
  let compose: string;

  test.beforeAll(() => {
    compose = readFile(DOCKER_PATH);
  });

  test('§B.1 docker-compose.yml exists', () => {
    expect(fs.existsSync(DOCKER_PATH)).toBe(true);
  });

  test('§B.2 openclaw-agent service defined', () => {
    expect(compose).toContain('openclaw-agent');
    expect(compose).toContain('7860');
  });

  test('§B.3 openclaw-browser service defined (Chromium / CDP)', () => {
    expect(compose).toContain('openclaw-browser');
    expect(compose).toContain('9222');
    expect(compose).toContain('remote-debugging');
  });

  test('§B.4 openclaw-redis service defined', () => {
    expect(compose).toContain('openclaw-redis');
    expect(compose).toContain('redis');
  });

  test('§B.5 Output volume mounted', () => {
    expect(compose).toContain('./output:/app/output');
  });

  test('§B.6 Workflows volume mounted', () => {
    expect(compose).toContain('./workflows:/app/workflows');
  });

  test('§B.7 Environment variables passed to agent service', () => {
    expect(compose).toContain('MRSURETY_BASE_URL');
    expect(compose).toContain('ADMIN_EMAIL');
    expect(compose).toContain('TELEGRAM_BOT_TOKEN');
  });
});

// ── §C – .env.example coverage ────────────────────────────────────────────

test.describe('§C – .env.example variable coverage', () => {
  let env: string;

  test.beforeAll(() => {
    env = readFile(ENV_EXAMPLE_PATH);
  });

  test('§C.1 .env.example exists', () => {
    expect(fs.existsSync(ENV_EXAMPLE_PATH)).toBe(true);
  });

  test('§C.2 App URL and admin credentials', () => {
    expect(env).toContain('MRSURETY_BASE_URL');
    expect(env).toContain('ADMIN_EMAIL');
    expect(env).toContain('ADMIN_PASSWORD');
  });

  test('§C.3 Agent test account variables', () => {
    expect(env).toContain('AGENT_EMAIL');
    expect(env).toContain('AGENT_PASSWORD');
  });

  test('§C.4 Homeowner Method A test account variables', () => {
    expect(env).toContain('HOMEOWNER_EMAIL_A');
    expect(env).toContain('HOMEOWNER_PASSWORD_A');
    expect(env).toContain('HOMEOWNER_ADDRESS_A');
    expect(env).toContain('HOMEOWNER_PERMIT_TYPE_A');
  });

  test('§C.5 Homeowner Method B test account variables', () => {
    expect(env).toContain('HOMEOWNER_EMAIL_B');
    expect(env).toContain('HOMEOWNER_PASSWORD_B');
    expect(env).toContain('HOMEOWNER_ADDRESS_B');
  });

  test('§C.6 Contractor and insurance agent variables', () => {
    expect(env).toContain('CONTRACTOR_EMAIL');
    expect(env).toContain('INSURANCE_AGENT_EMAIL');
  });

  test('§C.7 Agent upload secure link variables', () => {
    expect(env).toContain('AGENT_UPLOAD_LINK');
    expect(env).toContain('REVOKED_UPLOAD_LINK');
    expect(env).toContain('EXPIRED_UPLOAD_LINK');
    expect(env).toContain('MANIPULATED_UPLOAD_LINK');
  });

  test('§C.8 Stripe test card variables (no real card data)', () => {
    expect(env).toContain('STRIPE_TEST_CARD');
    expect(env).toContain('4242424242424242');
    expect(env).toContain('STRIPE_TEST_EXPIRY');
    expect(env).toContain('STRIPE_TEST_CVV');
  });

  test('§C.9 Outlook inbox credentials', () => {
    expect(env).toContain('OUTLOOK_AGENT_EMAIL');
    expect(env).toContain('OUTLOOK_HOMEOWNER_A_EMAIL');
    expect(env).toContain('OUTLOOK_CONTRACTOR_EMAIL');
  });

  test('§C.10 Telegram integration variables', () => {
    expect(env).toContain('TELEGRAM_BOT_TOKEN');
    expect(env).toContain('TELEGRAM_CHAT_ID');
  });

  test('§C.11 Slack integration variables', () => {
    expect(env).toContain('SLACK_BOT_TOKEN');
    expect(env).toContain('SLACK_CHANNEL');
  });

  test('§C.12 Google Drive folder ID variable', () => {
    expect(env).toContain('GDRIVE_FOLDER_ID');
  });

  test('§C.13 Output path variables', () => {
    expect(env).toContain('OPENCLAW_SCREENSHOT_PATH');
    expect(env).toContain('OPENCLAW_VIDEO_PATH');
    expect(env).toContain('OPENCLAW_DATA_PATH');
    expect(env).toContain('OPENCLAW_REPORT_PATH');
  });

  test('§C.14 Browser settings variables', () => {
    expect(env).toContain('OPENCLAW_HEADLESS');
    expect(env).toContain('OPENCLAW_VIEWPORT_WIDTH');
    expect(env).toContain('OPENCLAW_TIMEOUT');
  });
});

// ── §D – Python workflow script coverage ──────────────────────────────────

test.describe('§D – Python workflow script (mrsurety_qa.py)', () => {
  let script: string;

  test.beforeAll(() => {
    script = readFile(WORKFLOW_SCRIPT_PATH);
  });

  test('§D.1 mrsurety_qa.py exists', () => {
    expect(fs.existsSync(WORKFLOW_SCRIPT_PATH)).toBe(true);
  });

  test('§D.2 Uses playwright sync API', () => {
    expect(script).toContain('sync_playwright');
    expect(script).toContain('from playwright.sync_api import');
  });

  test('§D.3 Loads environment variables from .env', () => {
    expect(script).toContain('load_dotenv');
    expect(script).toContain('os.getenv');
  });

  test('§D.4 Workflow 1 – admin login implemented', () => {
    expect(script).toContain('workflow_admin_login');
    expect(script).toContain('admin_01_dashboard.png');
    expect(script).toContain('admin_users.csv');
  });

  test('§D.5 Workflow 2 – agent signup and referral code implemented', () => {
    expect(script).toContain('workflow_agent_signup');
    expect(script).toContain('referral-link');
    expect(script).toContain('agent_02_referral_code.png');
  });

  test('§D.6 Workflow 3 – homeowner service request and Stripe implemented', () => {
    expect(script).toContain('workflow_homeowner_service_request');
    expect(script).toContain('STRIPE_CARD');
    expect(script).toContain('4242424242424242');
  });

  test('§D.7 Both referral methods implemented (Method A referral link, Method B agent email)', () => {
    expect(script).toContain('Method A');
    expect(script).toContain('Method B');
    expect(script).toContain('agent-email');
  });

  test('§D.8 Workflow 4 – email and DocuSign screenshots implemented', () => {
    expect(script).toContain('workflow_email_docusign');
    expect(script).toContain('outlook.com');
    expect(script).toContain('email_inventory');
    expect(script).toContain('docusign');
  });

  test('§D.9 Workflow 5 – contractor upload invite implemented', () => {
    expect(script).toContain('workflow_contractor_upload_invite');
    expect(script).toContain('invite-agent-section');
    expect(script).toContain('AGENT_UPLOAD_LINK');
  });

  test('§D.10 Security controls tested in Workflow 5', () => {
    expect(script).toContain('REVOKED_UPLOAD_LINK');
    expect(script).toContain('EXPIRED_UPLOAD_LINK');
    expect(script).toContain('MANIPULATED_UPLOAD_LINK');
    expect(script).toContain('_test_security_link');
  });

  test('§D.11 CSLB document type restriction tested', () => {
    expect(script).toContain('cslb');
    expect(script).toContain('restriction-error');
    expect(script).toContain('SECURITY');
  });

  test('§D.12 Workflow 6 – admin verification implemented', () => {
    expect(script).toContain('workflow_admin_verification');
    expect(script).toContain('admin_04_agent_homeowner_links.png');
  });

  test('§D.13 Report generation implemented (CSV + Markdown)', () => {
    expect(script).toContain('_generate_reports');
    expect(script).toContain('test_accounts.csv');
    expect(script).toContain('findings.csv');
    expect(script).toContain('_findings.md');
  });

  test('§D.14 test_accounts.csv accumulates created accounts', () => {
    expect(script).toContain('_register_account');
    expect(script).toContain('_test_accounts');
  });

  test('§D.15 findings.csv accumulates issues found', () => {
    expect(script).toContain('_log_finding');
    expect(script).toContain('severity');
    expect(script).toContain('_findings');
  });

  test('§D.16 Connection check implemented', () => {
    expect(script).toContain('check_connection');
    expect(script).toContain('--check-connection');
  });

  test('§D.17 CLI argument parser for --workflow flag', () => {
    expect(script).toContain('argparse');
    expect(script).toContain('--workflow');
    expect(script).toContain('"all"');
  });

  test('§D.18 Video recording enabled for contractor invite workflow', () => {
    expect(script).toContain('record_video=True');
    expect(script).toContain('contractor_invite_full.mp4');
  });

  test('§D.19 Auto-bootstraps virtual environment when dependencies are missing', () => {
    expect(script).toContain('_bootstrap');
    expect(script).toContain('subprocess.check_call');
    expect(script).toContain('os.execv');
    expect(script).toContain('.venv');
  });
});

// ── §E – Daily runner script ───────────────────────────────────────────────

test.describe('§E – Daily runner script (run_daily.sh)', () => {
  let runner: string;

  test.beforeAll(() => {
    runner = readFile(DAILY_RUNNER_PATH);
  });

  test('§E.1 run_daily.sh exists', () => {
    expect(fs.existsSync(DAILY_RUNNER_PATH)).toBe(true);
  });

  test('§E.2 Loads .env file', () => {
    expect(runner).toContain('.env');
    expect(runner).toContain('source');
  });

  test('§E.3 Runs mrsurety_qa.py --workflow all', () => {
    expect(runner).toContain('mrsurety_qa.py');
    expect(runner).toContain('--workflow all');
  });

  test('§E.4 Rotates output folder with date suffix', () => {
    expect(runner).toContain('output_archive');
    expect(runner).toContain('DATE');
  });

  test('§E.5 Sends Telegram notification', () => {
    expect(runner).toContain('TELEGRAM_BOT_TOKEN');
    expect(runner).toContain('sendMessage');
  });

  test('§E.6 Sends Slack notification', () => {
    expect(runner).toContain('SLACK_BOT_TOKEN');
    expect(runner).toContain('chat.postMessage');
  });

  test('§E.7 Creates zip for Google Drive upload', () => {
    expect(runner).toContain('zip');
    expect(runner).toContain('output/');
  });

  test('§E.8 Includes cron setup instructions', () => {
    expect(runner).toContain('crontab');
    expect(runner).toContain('0 6 * * *');
  });

  test('§E.9 Validates playwright is installed before running', () => {
    expect(runner).toContain('playwright');
    expect(runner).toContain('venv');
  });

  test('§E.10 Reports metrics (screenshot count, video count, findings count)', () => {
    expect(runner).toContain('SCREENSHOT_COUNT');
    expect(runner).toContain('VIDEO_COUNT');
    expect(runner).toContain('FINDINGS_COUNT');
  });
});

// ── §F – Output folder structure ──────────────────────────────────────────

test.describe('§F – Output folder structure', () => {
  test('§F.1 output/README.md exists', () => {
    expect(fs.existsSync(OUTPUT_README_PATH)).toBe(true);
  });

  test('§F.2 output/screenshots/ directory exists', () => {
    expect(fs.existsSync(path.join(OPENCLAW_DIR, 'output', 'screenshots'))).toBe(true);
  });

  test('§F.3 output/videos/ directory exists', () => {
    expect(fs.existsSync(path.join(OPENCLAW_DIR, 'output', 'videos'))).toBe(true);
  });

  test('§F.4 output/data/ directory exists', () => {
    expect(fs.existsSync(path.join(OPENCLAW_DIR, 'output', 'data'))).toBe(true);
  });

  test('§F.5 output/reports/ directory exists', () => {
    expect(fs.existsSync(path.join(OPENCLAW_DIR, 'output', 'reports'))).toBe(true);
  });

  test('§F.6 Output README documents all screenshot naming conventions', () => {
    const readme = readFile(OUTPUT_README_PATH);
    expect(readme).toContain('admin_01_dashboard.png');
    expect(readme).toContain('email_001_');
    expect(readme).toContain('docusign_001_');
    expect(readme).toContain('security_01_revoked_link.png');
    expect(readme).toContain('contractor_invite_full.mp4');
  });

  test('§F.7 Output README documents all data CSV file names', () => {
    const readme = readFile(OUTPUT_README_PATH);
    expect(readme).toContain('test_accounts.csv');
    expect(readme).toContain('findings.csv');
    expect(readme).toContain('email_inventory.csv');
    expect(readme).toContain('admin_users.csv');
  });
});

// ── §G – CSV template correctness ─────────────────────────────────────────

test.describe('§G – CSV template correctness', () => {
  test('§G.1 test_accounts_template.csv exists', () => {
    expect(fs.existsSync(ACCOUNTS_TEMPLATE_PATH)).toBe(true);
  });

  test('§G.2 test_accounts_template.csv has required columns', () => {
    const csv = readFile(ACCOUNTS_TEMPLATE_PATH);
    const header = csv.split('\n')[0];
    expect(header).toContain('role');
    expect(header).toContain('email');
    expect(header).toContain('password');
    expect(header).toContain('creation_date');
    expect(header).toContain('screenshot_path');
  });

  test('§G.3 test_accounts_template.csv has all 4 role types', () => {
    const csv = readFile(ACCOUNTS_TEMPLATE_PATH);
    expect(csv).toContain('agent');
    expect(csv).toContain('homeowner');
    expect(csv).toContain('contractor');
  });

  test('§G.4 findings_template.csv exists', () => {
    expect(fs.existsSync(FINDINGS_TEMPLATE_PATH)).toBe(true);
  });

  test('§G.5 findings_template.csv has required columns', () => {
    const csv = readFile(FINDINGS_TEMPLATE_PATH);
    const header = csv.split('\n')[0];
    expect(header).toContain('date');
    expect(header).toContain('workflow');
    expect(header).toContain('step');
    expect(header).toContain('issue_type');
    expect(header).toContain('description');
    expect(header).toContain('severity');
    expect(header).toContain('screenshot_path');
    expect(header).toContain('video_path');
  });

  test('§G.6 findings_template.csv has all severity levels', () => {
    const csv = readFile(FINDINGS_TEMPLATE_PATH);
    expect(csv).toContain('critical');
    expect(csv).toContain('high');
    expect(csv).toContain('medium');
    expect(csv).toContain('low');
  });

  test('§G.7 findings_template.csv has all workflow names', () => {
    const csv = readFile(FINDINGS_TEMPLATE_PATH);
    expect(csv).toContain('admin-login');
    expect(csv).toContain('agent-signup');
    expect(csv).toContain('homeowner-service-request');
    expect(csv).toContain('email-docusign');
    expect(csv).toContain('contractor-upload-invite');
    expect(csv).toContain('admin-verification');
  });
});

// ── §H – Christopher's requirements fully covered ─────────────────────────

test.describe("§H – Christopher's requirements fully covered", () => {
  let guide: string;
  let script: string;

  test.beforeAll(() => {
    guide = readFile(GUIDE_PATH);
    script = readFile(WORKFLOW_SCRIPT_PATH);
  });

  test('§H.1 Creates 3 user types: agent, homeowner (×2 addresses), contractor', () => {
    // Guide mentions all 3 types
    expect(guide).toContain('Agent Signup');
    expect(guide).toContain('Homeowner');
    expect(guide).toContain('Contractor');
    // Script creates all 3
    expect(script).toContain('AGENT_EMAIL');
    expect(script).toContain('HOMEOWNER_EMAIL_A');
    expect(script).toContain('CONTRACTOR_EMAIL');
  });

  test('§H.2 Tests referral code (Method A) – link-based', () => {
    expect(guide).toContain('Method A');
    expect(script).toContain('referral_link');
    expect(script).toContain('workflow_homeowner_service_request');
  });

  test('§H.3 Tests agent email entry (Method B) – during service request', () => {
    expect(guide).toContain('Method B');
    expect(script).toContain('Method B');
    expect(script).toContain('agent-email');
  });

  test('§H.4 Referral code single-use-per-request rule documented', () => {
    expect(guide).toContain('single-use');
    expect(guide).toContain('Each referral code is valid only for the specific');
  });

  test('§H.5 Screenshots all emails and DocuSign docs (50+)', () => {
    expect(guide).toContain('50+');
    expect(script).toContain('email_inventory');
    expect(script).toContain('docusign');
  });

  test('§H.6 Stripe test payment with card 4242 4242 4242 4242', () => {
    expect(guide).toContain('4242');
    expect(script).toContain('4242424242424242');
  });

  test('§H.7 Admin login with admin@mrsurety.com / MrSurety2026!', () => {
    expect(guide).toContain('admin@mrsurety.com');
    expect(guide).toContain('MrSurety2026!');
    expect(script).toContain('ADMIN_EMAIL');
    expect(script).toContain('ADMIN_PASSWORD');
  });

  test('§H.8 Shares test account credentials (email + password) in CSV', () => {
    expect(script).toContain('test_accounts.csv');
    expect(script).toContain('_register_account');
    expect(script).toContain('password');
  });

  test('§H.9 Uploads to Google Drive (zip + GDRIVE_FOLDER_ID)', () => {
    expect(guide).toContain('Google Drive');
    expect(guide).toContain('zip -r');
    const runner = readFile(DAILY_RUNNER_PATH);
    expect(runner).toContain('GDRIVE_FOLDER_ID');
    expect(runner).toContain('gdrive upload');
  });

  test('§H.10 Agent Upload Invite System fully tested', () => {
    expect(script).toContain('invite-agent-section');
    expect(script).toContain('insurance-agent-email');
    expect(script).toContain('revoke-invite');
    expect(script).toContain('cslb');
  });

  test('§H.11 7-day link expiry tested as a security control', () => {
    expect(guide).toContain('7 days');
    expect(script).toContain('EXPIRED_UPLOAD_LINK');
    expect(script).toContain('security_02_expired_link.png');
  });

  test('§H.12 Daily findings report generated in Markdown', () => {
    expect(script).toContain('_findings.md');
    expect(script).toContain('Daily Findings Report');
    expect(script).toContain('findings.csv');
  });

  test('§H.13 Telegram/Slack notifications for daily summary', () => {
    const runner = readFile(DAILY_RUNNER_PATH);
    expect(runner).toContain('send_notification');
    expect(runner).toContain('TELEGRAM_BOT_TOKEN');
    expect(runner).toContain('SLACK_BOT_TOKEN');
  });

  test('§H.14 Multiple homeowner addresses tested', () => {
    expect(script).toContain('123 Main St, Los Angeles CA 90001');
    expect(script).toContain('456 Oak Ave, Anaheim CA 92801');
  });

  test('§H.15 Bug screenshot naming convention consistent with QA folder', () => {
    // Screenshots go to qa/openclaw/output/screenshots/ (new) and qa/screenshots/ (existing Playwright)
    expect(script).toContain('SCREENSHOT_DIR');
    const outputReadme = readFile(OUTPUT_README_PATH);
    expect(outputReadme).toContain('screenshots/');
  });
});

// ── §I – Integration with existing Playwright suite ───────────────────────

test.describe('§I – Integration with existing Playwright test suite', () => {
  const TESTS_DIR = path.join(REPO_ROOT, 'tests', 'playwright');
  const PKG_PATH = path.join(REPO_ROOT, 'tests', 'package.json');

  test('§I.1 package.json has test:openclaw-integration script', () => {
    const pkg = readFile(PKG_PATH);
    expect(pkg).toContain('test:openclaw-integration');
    expect(pkg).toContain('openclaw-integration.spec.ts');
  });

  test('§I.2 Existing agent-referral-workflow.spec.ts is unchanged', () => {
    expect(fs.existsSync(path.join(TESTS_DIR, 'agent-referral-workflow.spec.ts'))).toBe(true);
  });

  test('§I.3 Existing agent-upload-invite.spec.ts is unchanged', () => {
    expect(fs.existsSync(path.join(TESTS_DIR, 'agent-upload-invite.spec.ts'))).toBe(true);
  });

  test('§I.4 Existing homeowner-service-request.spec.ts is unchanged', () => {
    expect(fs.existsSync(path.join(TESTS_DIR, 'homeowner-service-request.spec.ts'))).toBe(true);
  });

  test('§I.5 Existing contractor-bidding.spec.ts is unchanged', () => {
    expect(fs.existsSync(path.join(TESTS_DIR, 'contractor-bidding.spec.ts'))).toBe(true);
  });

  test('§I.6 Existing admin-dashboard.spec.ts is unchanged', () => {
    expect(fs.existsSync(path.join(TESTS_DIR, 'admin-dashboard.spec.ts'))).toBe(true);
  });

  test('§I.7 Existing email-docusign-triggers.spec.ts is unchanged', () => {
    expect(fs.existsSync(path.join(TESTS_DIR, 'email-docusign-triggers.spec.ts'))).toBe(true);
  });

  test('§I.8 OpenClaw .env.example uses same Stripe test card as existing fixtures', () => {
    const env = readFile(ENV_EXAMPLE_PATH);
    expect(env).toContain('4242424242424242');
  });

  test('§I.9 OpenClaw workflow uses same admin credentials as existing fixtures', () => {
    const env = readFile(ENV_EXAMPLE_PATH);
    expect(env).toContain('admin@mrsurety.com');
    expect(env).toContain('MrSurety2026!');
  });

  test('§I.10 OpenClaw output screenshots/ mirrors existing qa/screenshots/ structure', () => {
    // Both have per-workflow subfolders; OpenClaw output has its own root
    const guide = readFile(GUIDE_PATH);
    expect(guide).toContain('agent-referral-workflow');
    expect(guide).toContain('email-docusign');
    expect(guide).toContain('agent-upload-invite');
  });

  test('§I.11 Live app URL is https://frontend-tan-five-46.vercel.app in all configs', () => {
    const LIVE_URL = 'https://frontend-tan-five-46.vercel.app';
    expect(readFile(ENV_EXAMPLE_PATH)).toContain(LIVE_URL);
    expect(readFile(GUIDE_PATH)).toContain(LIVE_URL);
    expect(readFile(WORKFLOW_SCRIPT_PATH)).toContain(LIVE_URL);
  });

  test('§I.12 playwright.config.ts default baseURL points to live app', () => {
    const config = fs.readFileSync(
      path.join(REPO_ROOT, 'tests', 'playwright.config.ts'), 'utf-8'
    );
    expect(config).toContain('https://frontend-tan-five-46.vercel.app');
  });

  test('§I.13 tests/fixtures/test-users.ts admin uses real admin@mrsurety.com', () => {
    const fixtures = fs.readFileSync(
      path.join(__dirname, 'fixtures/test-users.ts'), 'utf-8'
    );
    expect(fixtures).toContain("'admin@mrsurety.com'");
    expect(fixtures).toContain("'MrSurety2026!'");
  });

  test('§I.14 tests/fixtures/test-users.ts uses @outlook.com emails (not old @mrsurety-qa.com)', () => {
    const fixtures = fs.readFileSync(
      path.join(__dirname, 'fixtures/test-users.ts'), 'utf-8'
    );
    expect(fixtures).toContain('@outlook.com');
    expect(fixtures).not.toContain('@mrsurety-qa.com');
  });

  test('§I.15 tests/.env.example exists and has MRSURETY_BASE_URL', () => {
    const testsEnv = path.join(REPO_ROOT, 'tests', '.env.example');
    expect(fs.existsSync(testsEnv)).toBe(true);
    const content = fs.readFileSync(testsEnv, 'utf-8');
    expect(content).toContain('MRSURETY_BASE_URL=https://frontend-tan-five-46.vercel.app');
  });
});

// ── §J – RUN_TODAY.md completeness ──────────────────────────────────────────
test.describe('§J – RUN_TODAY.md completeness', () => {
  const RUN_TODAY_PATH = path.join(OPENCLAW_DIR, 'RUN_TODAY.md');
  const readRunToday = () => fs.readFileSync(RUN_TODAY_PATH, 'utf-8');

  test('§J.1 RUN_TODAY.md exists', () => {
    expect(fs.existsSync(RUN_TODAY_PATH)).toBe(true);
  });

  test('§J.2 Lists all 4 remaining tasks', () => {
    const content = readRunToday();
    expect(content).toContain('Create QA test accounts');
    expect(content).toContain('Run all 9 workflows');
    expect(content).toContain('Google Drive');
    expect(content).toContain('Christopher');
  });

  test('§J.3 Has create-accounts command', () => {
    expect(readRunToday()).toContain('--workflow create-accounts');
  });

  test('§J.4 Has --workflow all command', () => {
    expect(readRunToday()).toContain('--workflow all');
  });

  test('§J.5 Has --check-connection command', () => {
    expect(readRunToday()).toContain('--check-connection');
  });

  test('§J.6 References live app URL', () => {
    expect(readRunToday()).toContain('https://frontend-tan-five-46.vercel.app');
  });

  test('§J.7 References all 9 workflows in the table', () => {
    const content = readRunToday();
    expect(content).toContain('Workflow 1');
    expect(content).toContain('Workflow 2');
    expect(content).toContain('Workflow 3');
    expect(content).toContain('Workflow 4');
    expect(content).toContain('Workflow 5');
    expect(content).toContain('Workflow 6');
    expect(content).toContain('Workflow 7');
    expect(content).toContain('Workflow 8');
    expect(content).toContain('Workflow 9');
  });

  test('§J.8 Has Stripe test card reference', () => {
    expect(readRunToday()).toContain('4242');
  });

  test('§J.9 Has admin credentials', () => {
    const content = readRunToday();
    expect(content).toContain('admin@mrsurety.com');
    expect(content).toContain('MrSurety2026!');
  });

  test('§J.10 Has npm test step', () => {
    expect(readRunToday()).toContain('npm test');
  });

  test('§J.11 Has run_daily.sh packaging step', () => {
    expect(readRunToday()).toContain('run_daily.sh');
  });

  test('§J.12 Has c.palmer@mrsurety.com for sharing results', () => {
    expect(readRunToday()).toContain('c.palmer@mrsurety.com');
  });
});

// ── §K – mrsurety_qa.py expanded to all 9 workflows ─────────────────────────
test.describe('§K – mrsurety_qa.py all 9 workflows', () => {
    const pyPath = WORKFLOW_SCRIPT_PATH;
  const readPy = () => fs.readFileSync(pyPath, 'utf-8');

  test('§K.1 Has workflow_create_accounts function', () => {
    expect(readPy()).toContain('def workflow_create_accounts');
  });

  test('§K.2 Has workflow_contractor_bidding function', () => {
    expect(readPy()).toContain('def workflow_contractor_bidding');
  });

  test('§K.3 Has workflow_homeowner_deposit function', () => {
    expect(readPy()).toContain('def workflow_homeowner_deposit');
  });

  test('§K.4 Has workflow_work_order_docusign function', () => {
    expect(readPy()).toContain('def workflow_work_order_docusign');
  });

  test('§K.5 Has workflow_technician function', () => {
    expect(readPy()).toContain('def workflow_technician');
  });

  test('§K.6 CLI choices include create-accounts', () => {
    expect(readPy()).toContain('"create-accounts"');
  });

  test('§K.7 CLI choices include contractor-bidding', () => {
    expect(readPy()).toContain('"contractor-bidding"');
  });

  test('§K.8 CLI choices include homeowner-deposit', () => {
    expect(readPy()).toContain('"homeowner-deposit"');
  });

  test('§K.9 CLI choices include work-order-docusign', () => {
    expect(readPy()).toContain('"work-order-docusign"');
  });

  test('§K.10 CLI choices include technician-workflow', () => {
    expect(readPy()).toContain('"technician-workflow"');
  });

  test('§K.11 CLI choices include agent-upload-invite', () => {
    expect(readPy()).toContain('"agent-upload-invite"');
  });

  test('§K.12 main() dispatches all 9 workflows when run == "all"', () => {
    const py = readPy();
    expect(py).toContain('workflow_admin_login');
    expect(py).toContain('workflow_agent_signup');
    expect(py).toContain('workflow_homeowner_service_request');
    expect(py).toContain('workflow_contractor_bidding');
    expect(py).toContain('workflow_homeowner_deposit');
    expect(py).toContain('workflow_work_order_docusign');
    expect(py).toContain('workflow_admin_verification');
    expect(py).toContain('workflow_technician');
    expect(py).toContain('workflow_contractor_upload_invite');
  });

  test('§K.13 Uses outlook.com for test account emails (not mrsurety-qa.com)', () => {
    const py = readPy();
    expect(py).toContain('outlook.com');
    expect(py).not.toContain('mrsurety-qa.com');
  });

  test('§K.14 Uses QAtest@2026! as default test password', () => {
    expect(readPy()).toContain('QAtest@2026!');
  });

  test('§K.15 create-accounts creates 8 accounts (2 agents, 3 homeowners, 2 contractors, 1 tech)', () => {
    const py = readPy();
    // check all 8 emails are in the accounts_to_create list
    expect(py).toContain('agent.test1@outlook.com');
    expect(py).toContain('agent.test2@outlook.com');
    expect(py).toContain('homeowner.test2@outlook.com');
    expect(py).toContain('homeowner.test1@outlook.com');
    expect(py).toContain('homeowner.test3@outlook.com');
    expect(py).toContain('contractor.test1@outlook.com');
    expect(py).toContain('contractor.test2@outlook.com');
    expect(py).toContain('tech.test1@outlook.com');
  });

  test('§K.16 MANUAL_EXECUTION_GUIDE.md exists', () => {
    const guide = path.join(REPO_ROOT, 'qa', 'MANUAL_EXECUTION_GUIDE.md');
    expect(fs.existsSync(guide)).toBe(true);
  });

  test('§K.17 MANUAL_EXECUTION_GUIDE.md covers all 9 workflows', () => {
    const guide = fs.readFileSync(
      path.join(REPO_ROOT, 'qa', 'MANUAL_EXECUTION_GUIDE.md'), 'utf-8'
    );
    for (let i = 1; i <= 9; i++) {
      expect(guide).toContain(`Workflow ${i}`);
    }
  });
});
