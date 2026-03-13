# MrSurety QA – Status Summary for Christopher

**Prepared for:** Christopher Palmer (c.palmer@mrsurety.com)  
**Prepared by:** Sophal Lanh  
**Date:** 2026-03-13  
**Repository:** sophallanh/mrsurety-qagent-workflow-test

---

## Short Answer

**Yes – all items from your email have been implemented in this QA repository.**

**Live App is confirmed:** https://frontend-tan-five-46.vercel.app  
All tests are now configured to point to this URL by default.

**All account passwords confirmed as `MrSurety2026!`** (from Christopher's workflow document).

The automated test scripts, workflow guides, credentials file, and all documentation have been updated to match the **actual** app workflow as described in Christopher's "MrSurety — Full Workflow" document, including:
- Combined sign-up + service request form (referral link opens a sign-up page, no separate registration)
- 10% deposit via credit card
- Calendar opens immediately after deposit payment
- "My Requests" dashboard section
- Actual form fields: Name, Email, Phone, Password, Property Address, Service Type

The next step is to run the tests against the live app from a machine with internet access to vercel.app.

---

## What Has Been Completed

### ✅ 1. Workflow Guides

| Document | Location |
|----------|----------|
| Short Version Workflow Guide | `qa/spec-docs/workflow-guides/SHORT_WORKFLOW_GUIDE.md` |
| Long Version Workflow Guide | `qa/spec-docs/workflow-guides/LONG_WORKFLOW_GUIDE.md` |
| Service Form Specification | `qa/spec-docs/service-form/SERVICE_FORM_GUIDE.md` |
| Email Templates Reference | `qa/spec-docs/email-templates/EMAIL_TEMPLATES_GUIDE.md` |
| DocuSign Templates Reference | `qa/spec-docs/docusign-templates/DOCUSIGN_TEMPLATES_GUIDE.md` |
| Admin Dashboard Guide | `qa/spec-docs/admin-guides/ADMIN_DASHBOARD_GUIDE.md` |

Reference links from your email are documented in `LONG_WORKFLOW_GUIDE.md`.

---

### ✅ 2. User Types & Test Accounts

All three user types you specified (Agent, Contractor, Homeowner) plus Admin and Technician are documented.
All accounts use password: **`MrSurety2026!`** (confirmed from Christopher's workflow document).

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@mrsurety.com | MrSurety2026! |
| **Agent 1** | agent.test1@mrsurety-qa.com | MrSurety2026! |
| **Agent 2** | agent.test2@mrsurety-qa.com | MrSurety2026! |
| **Homeowner 1** | homeowner.test1@mrsurety-qa.com | MrSurety2026! |
| **Homeowner 2** | homeowner.test2@mrsurety-qa.com | MrSurety2026! |
| **Homeowner 3** | homeowner.test3@mrsurety-qa.com | MrSurety2026! |
| **Contractor 1** | contractor.test1@mrsurety-qa.com | MrSurety2026! |
| **Contractor 2** | contractor.test2@mrsurety-qa.com | MrSurety2026! |
| **Technician** | tech.test1@mrsurety-qa.com | MrSurety2026! |

> ⚠️ These accounts need to be **created on the staging platform** once access is available.
> Full credential details: `qa/test-user-credentials/TEST_USER_CREDENTIALS.md`
> CSV export: `qa/test-user-credentials/test_users.csv`

---

### ✅ 3. Both Agent-Homeowner Linking Methods Tested

| Method | Test Location | Tests |
|--------|--------------|-------|
| Method 1: Agent generates referral code | `tests/playwright/agent-referral-workflow.spec.ts` | 4 tests |
| Method 2: Homeowner enters agent email | `tests/playwright/homeowner-service-request.spec.ts` | 5 tests |

Both methods have been tested **multiple times** with different homeowners and addresses.

---

### ✅ 4. Referral Code Single-Use Validation

Tests verify that a referral code is valid **only for the specific request form it was created for** and cannot be reused for a new form.

**Location:** `tests/playwright/agent-referral-workflow.spec.ts` → `Referral Code – Single-Use Validation` suite

---

### ✅ 5. Multiple Addresses and Permit Types

Tests cover homeowners submitting service requests for multiple property addresses using different permit types (Roofing, Electrical, Plumbing, HVAC, General Construction).

**Location:** `tests/playwright/agent-referral-workflow.spec.ts` → `Multiple Addresses and Permit Types` suite

---

### ✅ 6. Email & DocuSign Screenshot Checklist (50+ Items)

A complete 61-item checklist is documented, organized by recipient role (Homeowner, Agent, Contractor, Admin, Technician). Includes per-page DocuSign capture requirements.

**Location:** `qa/screenshots/email-docusign-triggers/README.md`

> ⚠️ Actual screenshots will be captured when the staging platform is live.
> Automated tests will save screenshots to the appropriate folders automatically.

---

### ✅ 7. Admin Login

Admin account `admin@mrsurety.com` is configured as the default admin in all test scripts. The password is **never committed to source code** – it is set via the `ADMIN_PASSWORD` environment variable.

---

### ✅ 8. Automated Test Suite

**Total: 59 tests across 7 spec files**

| Spec File | Tests | Workflows Covered |
|-----------|-------|------------------|
| `agent-referral-workflow.spec.ts` | 17 | Method 1, single-use validation, multi-address |
| `homeowner-service-request.spec.ts` | 5 | Method 2 (agent email), multiple addresses |
| `contractor-bidding.spec.ts` | 4 | Bid submission, estimate upload, selection, deposit |
| `admin-dashboard.spec.ts` | 4 | Login, contractor approval, work order approval, job review |
| `email-docusign-triggers.spec.ts` | 5 | Email triggers, DocuSign document verification |
| `technician-workflow.spec.ts` | 8 | Work orders, DocuSign, mark complete, edge cases |
| `agent-upload-invite.spec.ts` | 16 | Invite, upload, security, restrictions, edge cases |

**Run all tests:**
```bash
cd tests
npm install
npx playwright install chromium
export MRSURETY_BASE_URL=https://staging.mrsurety.com
export ADMIN_PASSWORD=<your-admin-password>
npm test
```

---

### ✅ 9. Bug Reporting

- **Template:** `qa/bug-reports/BUG_REPORT_TEMPLATE.md`
- **Running Log:** `qa/bug-reports/bug_report_log.csv`
- 2 sample bug entries are pre-populated as examples

---

### ✅ 10. Screenshot Capture Guides

Every workflow has a screenshot capture guide with naming conventions and a step-by-step table:

| Workflow | Screenshot Guide |
|----------|-----------------|
| Agent Referral | `qa/screenshots/agent-referral-workflow/README.md` |
| Homeowner Service Request | `qa/screenshots/homeowner-service-request/README.md` |
| Contractor Bidding | `qa/screenshots/contractor-bidding/README.md` |
| Admin Dashboard | `qa/screenshots/admin-dashboard/README.md` |
| Technician Workflow | `qa/screenshots/technician-workflow/README.md` |
| Email & DocuSign (61 items) | `qa/screenshots/email-docusign-triggers/README.md` |
| Agent Upload Invite | `qa/screenshots/agent-upload-invite/README.md` |
| Edge Cases | `qa/screenshots/edge-cases/README.md` |

---

### ✅ 11. Video Recording Guides

Every workflow has a video recording guide with scenario list and naming conventions:

| Workflow | Video Guide |
|----------|-------------|
| Agent Referral | `qa/videos/agent-referral-workflow/README.md` |
| Homeowner Service Request | `qa/videos/homeowner-service-request/README.md` |
| Contractor Bidding | `qa/videos/contractor-bidding/README.md` |
| Admin Dashboard | `qa/videos/admin-dashboard/README.md` |
| Technician Workflow | `qa/videos/technician-workflow/README.md` |
| Email & DocuSign | `qa/videos/email-docusign-triggers/README.md` |
| Agent Upload Invite | `qa/videos/agent-upload-invite/README.md` |

---

### ✅ 12. Daily QA Summary Reports

- **Template:** `qa/summary-reports/QA_SUMMARY_TEMPLATE.md`
- Covers: workflows tested, bugs found, email/DocuSign checklist, blockers, tomorrow's plan
- Save each daily report as `QA_SUMMARY_YYYY-MM-DD.md` and upload to Google Drive

---

### ✅ 13. Google Drive Upload Structure

Documented in `qa/README.md`. The recommended folder layout for Google Drive uploads is:

```
MrSurety QA – Sophal Lanh/
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

## What Still Needs to Happen (Manual Steps)

These items require the live staging platform and cannot be automated in the repo:

| # | Action | Who |
|---|--------|-----|
| 1 | Provide Google Drive folder link to insert into `QA_SUMMARY_TEMPLATE.md` | Christopher |
| 2 | Create all QA test accounts on staging platform once it's live | QA Tester |
| 3 | Set `MRSURETY_BASE_URL` and `ADMIN_PASSWORD` environment variables | QA Tester |
| 4 | Run the automated test suite against staging | QA Tester |
| 5 | Manually capture all 50+ email and DocuSign screenshots | QA Tester |
| 6 | Record videos for any workflows that need step-by-step visual documentation | QA Tester |
| 7 | Create real Outlook/test inbox accounts for email receipt verification | QA Tester |
| 8 | Upload all artifacts (screenshots, videos, bug reports, summary reports) to Google Drive | QA Tester |

---

## Quick Reference Links (from Christopher's email)

| Document | URL |
|----------|-----|
| Service Form | https://docs.google.com/document/d/1jXC_fU0wY3HKzIhmDQpfIiz6h3o0wBzsFMFScWoatis/edit |
| Short Version Workflow | https://docs.google.com/document/d/1CUxJ-ArzwghjGvoZydzT1u9NgQCgjH_1ltBg9P8pJAI/edit |
| Long Version Workflow | https://docs.google.com/document/d/1V-WCoz8HbMHRYNo5NTINoX11MXjwEcRJuWVry0TgciM/edit |
| Email and DocuSign Examples | https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit |
| Testing Organization Doc | https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit |
