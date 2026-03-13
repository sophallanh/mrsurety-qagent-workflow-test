# MrSurety QA – Automated Test Suite & QA Package

**Repository:** `sophallanh/mrsurety-qagent-workflow-test`  
**Purpose:** Automated QA for Agent Referral Workflows, Agent Upload Invite System, and all platform workflows for MrSurety  
**Prepared by:** Sophal Lanh  
**Last Updated:** 2026-03-13  

---

## Folder Structure

```
mrsurety-qagent-workflow-test/
├── qa/
│   ├── test-user-credentials/       # Test accounts CSV and Markdown reference
│   ├── bug-reports/                 # Bug report template and running log (CSV)
│   ├── summary-reports/             # Daily QA summary report templates
│   ├── screenshots/                 # Screenshot captures organized by workflow
│   │   ├── agent-referral-workflow/
│   │   ├── homeowner-service-request/
│   │   ├── contractor-bidding/
│   │   ├── admin-dashboard/
│   │   ├── technician-workflow/
│   │   ├── email-docusign-triggers/
│   │   ├── agent-upload-invite/     # ← Agent Upload Invite System
│   │   └── edge-cases/
│   ├── videos/                      # Screen recording captures by workflow
│   │   ├── agent-referral-workflow/
│   │   ├── homeowner-service-request/
│   │   ├── contractor-bidding/
│   │   ├── admin-dashboard/
│   │   ├── technician-workflow/
│   │   ├── email-docusign-triggers/
│   │   └── agent-upload-invite/     # ← Agent Upload Invite System
│   └── spec-docs/                   # Platform spec and guide documents (PDFs)
│       ├── service-form/
│       ├── email-templates/
│       ├── docusign-templates/
│       ├── workflow-guides/
│       └── admin-guides/
└── tests/
    ├── package.json
    ├── playwright.config.ts
    └── playwright/
        ├── fixtures/
        │   ├── test-users.ts
        │   ├── sample-estimate-placeholder.md
        │   ├── sample-coi-placeholder.md
        │   └── sample-endorsement-placeholder.md
        ├── agent-referral-workflow.spec.ts
        ├── homeowner-service-request.spec.ts
        ├── contractor-bidding.spec.ts
        ├── admin-dashboard.spec.ts
        ├── email-docusign-triggers.spec.ts
        ├── technician-workflow.spec.ts
        └── agent-upload-invite.spec.ts  # ← Agent Upload Invite System
```

---

## Quick Start

### 1. Install Dependencies

```bash
cd tests
npm install
npx playwright install chromium
```

### 2. Set Environment Variables

```bash
export MRSURETY_BASE_URL=https://staging.mrsurety.com
export AGENT_EMAIL=agent.test1@mrsurety-qa.com
export AGENT_PASSWORD=QAtest@123
# Admin account – provided by Christopher; password MUST be set via env var (never hardcode)
export ADMIN_EMAIL=admin@mrsurety.com
export ADMIN_PASSWORD=<admin-password-from-christopher>
# Agent Upload Invite System – set these when running invite tests:
export INSURANCE_AGENT_EMAIL=ins.agent.test@mrsurety-qa.com
export AGENT_UPLOAD_LINK=https://staging.mrsurety.com/agent-upload/<token>
export REVOKED_UPLOAD_LINK=https://staging.mrsurety.com/agent-upload/<revoked-token>
export EXPIRED_UPLOAD_LINK=https://staging.mrsurety.com/agent-upload/<expired-token>
# ... (see qa/test-user-credentials/TEST_USER_CREDENTIALS.md for all accounts)
```

### 3. Run Tests

```bash
cd tests
npm test                     # Run all tests (headless)
npm run test:headed          # Run with visible browser
npm run test:report          # Open HTML test report
```

---

## Manual Testing

Follow the README files in each `qa/screenshots/<workflow>/` folder for:
- Step-by-step screenshot capture instructions
- Naming conventions for screenshots and videos
- Edge case scenarios to test manually

---

## QA Artifacts for Google Drive Upload

Organize your Google Drive folder as follows:

```
MrSurety QA – [Your Name]/
├── Test User Credentials/
├── Bug Reports/
├── Summary Reports/
├── Screenshots/
│   ├── Agent Referral Workflow/
│   ├── Homeowner Service Request/
│   ├── Contractor Bidding/
│   ├── Admin Dashboard/
│   ├── Technician Workflow/
│   ├── Email & DocuSign Triggers/
│   ├── Agent Upload Invite System/
│   └── Edge Cases/
├── Videos/
└── Spec Docs/
```

---

## Reporting Bugs

1. Copy `qa/bug-reports/BUG_REPORT_TEMPLATE.md`
2. Save as `BUG-<ID>_<short-title>.md`
3. Add entry to `qa/bug-reports/bug_report_log.csv`
4. Attach screenshots from the relevant workflow folder

---

## Daily Reports

1. Copy `qa/summary-reports/QA_SUMMARY_TEMPLATE.md`
2. Save as `QA_SUMMARY_YYYY-MM-DD.md`
3. Fill out workflows tested, bugs found, and tomorrow's plan
4. Upload to Google Drive and share with Christopher nightly
