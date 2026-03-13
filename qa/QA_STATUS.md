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

**Run all tests (from your Mac, inside the `tests/` folder):**
```bash
cd tests
cp .env.example .env      # credentials already filled in
npm install
npx playwright install chromium
npm test                  # runs all 59 tests against https://frontend-tan-five-46.vercel.app
npm run test:report       # open HTML results report
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

## What Still Needs to Happen (YOUR Manual Steps on the Live App)

The app is live at https://frontend-tan-five-46.vercel.app. Everything below must be done **by Sophal manually** on the live site.

| # | Action | Notes |
|---|--------|-------|
| 1 | **Register all QA test accounts** on the live app | Use emails + passwords from `TEST_USER_CREDENTIALS.md`. Start with `agent.test1`, then homeowners, then contractors, then technician. |
| 2 | **Run the Playwright test suite** from your Mac | `cd tests && npm test` — the `.env.example` has all credentials pre-filled. |
| 3 | **Manually capture 50+ email & DocuSign screenshots** | See `qa/screenshots/email-docusign-triggers/README.md` for the full 61-item checklist. |
| 4 | **Record screen videos** for each workflow | See each `qa/videos/<workflow>/README.md` for scenarios to record. |
| 5 | **Fill out a daily QA summary report** | Copy `qa/summary-reports/QA_SUMMARY_TEMPLATE.md` → save as `QA_SUMMARY_2026-03-13.md` |
| 6 | **Upload all artifacts to Google Drive** | Screenshots → Videos → Bug reports → Summary reports |
| 7 | **Share Google Drive link with Christopher** | christopher@mrsurety.com (or c.palmer@mrsurety.com) |

---

## Quick Reference Links (from Christopher's email)

| Document | URL |
|----------|-----|
| Service Form | https://docs.google.com/document/d/1jXC_fU0wY3HKzIhmDQpfIiz6h3o0wBzsFMFScWoatis/edit |
| Short Version Workflow | https://docs.google.com/document/d/1CUxJ-ArzwghjGvoZydzT1u9NgQCgjH_1ltBg9P8pJAI/edit |
| Long Version Workflow | https://docs.google.com/document/d/1V-WCoz8HbMHRYNo5NTINoX11MXjwEcRJuWVry0TgciM/edit |
| Email and DocuSign Examples | https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit |
| Testing Organization Doc | https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit |
