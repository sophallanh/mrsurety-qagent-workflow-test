# MrSurety QA – Daily Summary Report

**Date:** 2026-03-13  
**Tester:** Sophal Lanh  
**Live App:** https://frontend-tan-five-46.vercel.app  
**Build / Version:** Live (Vercel deployment)  
**Platform Status:** ✅ Live

---

## Documents Reviewed Today

- [x] MrSurety — Full Workflow (Christopher's printed document with credentials)
- [x] Short/Long Workflow Docs (Google Docs links)
- [x] Service Form Specification
- [x] Email & DocuSign Templates reference
- [x] Admin/Contractor/Homeowner/Technician Guides
- [x] Agent Upload Invite System spec

---

## What Was Built Today (QA Infrastructure)

All of the following were created in the GitHub repo `sophallanh/mrsurety-qagent-workflow-test`:

| Artifact | Status | Location |
|----------|--------|----------|
| Full workflow guides (short + long) | ✅ Done | `qa/spec-docs/workflow-guides/` |
| Service form spec with actual fields | ✅ Done | `qa/spec-docs/service-form/` |
| Email + DocuSign templates reference | ✅ Done | `qa/spec-docs/email-templates/` + `docusign-templates/` |
| Admin dashboard guide | ✅ Done | `qa/spec-docs/admin-guides/` |
| Test user credentials (all roles) | ✅ Done | `qa/test-user-credentials/` |
| Bug report template + CSV log | ✅ Done | `qa/bug-reports/` |
| Screenshot capture guides (8 workflows) | ✅ Done | `qa/screenshots/<workflow>/README.md` |
| Video recording guides (7 workflows) | ✅ Done | `qa/videos/<workflow>/README.md` |
| 59 Playwright automated tests (7 spec files) | ✅ Done | `tests/playwright/` |
| `.env.example` with all credentials pre-filled | ✅ Done | `tests/.env.example` |
| QA status summary for Christopher | ✅ Done | `qa/QA_STATUS.md` |

---

## Workflows Tested Today

| Workflow | Status | Notes |
|----------|--------|-------|
| Agent Referral Link – Method 1 | ⏳ Pending | Accounts not yet created on live app |
| Homeowner Agent-Email Linking – Method 2 | ⏳ Pending | Accounts not yet created on live app |
| Homeowner Service Request Form (8-step flow) | ⏳ Pending | |
| Contractor Bidding / Estimate Upload | ⏳ Pending | |
| Homeowner Estimate Review & 10% Deposit | ⏳ Pending | |
| Calendar / Installation Scheduling | ⏳ Pending | |
| Work Order Generation & DocuSign | ⏳ Pending | |
| Admin Dashboard – Approval Flow | ⏳ Pending | |
| Technician Work Order Receipt | ⏳ Pending | |
| Email Trigger Verification | ⏳ Pending | |
| DocuSign Document Verification | ⏳ Pending | |
| Agent Upload Invite – Contractor Sends Invite | ⏳ Pending | |
| Agent Upload Invite – Insurance Agent Uploads | ⏳ Pending | |
| Agent Upload Invite – Security Controls | ⏳ Pending | |

**Status Legend:** ✅ Pass | ❌ Fail | ⚠️ Partial | ⏳ Pending | 🔄 In Progress

---

## Bugs Found Today

_None yet – testing has not started on the live app. All accounts still need to be registered._

| Bug ID | Title | Severity | Workflow | Status |
|--------|-------|----------|----------|--------|
| – | – | – | – | – |

---

## Screenshots Captured

_None yet – to be captured once QA accounts are registered on the live platform._

---

## Email / DocuSign Checklist

| Trigger | Expected Email/Doc | Received? |
|---------|--------------------|-----------|
| Homeowner submits via referral link | Confirmation email | ⏳ |
| Agent referral used | Agent notification | ⏳ |
| Contractor bid submitted | Homeowner notification | ⏳ |
| Homeowner approves estimate | Contractor notification | ⏳ |
| 10% deposit paid | Homeowner + Admin receipt | ⏳ |
| Installation scheduled | Contractor + Homeowner | ⏳ |
| Work order created | Contractor + Technician + DocuSign | ⏳ |
| DocuSign completed | All parties | ⏳ |
| Job marked complete | All parties | ⏳ |
| Agent Upload invite sent | Secure link to insurance agent | ⏳ |
| Insurance agent uploads docs | Notification to contractor | ⏳ |
| Contractor revokes invite | Notification to agent | ⏳ |

---

## Blockers / Open Questions

1. **QA test accounts not yet created on the live platform** – this is the #1 blocker. Must register agent, homeowner(s), contractor(s), technician on https://frontend-tan-five-46.vercel.app before any workflow testing can begin.
2. **Google Drive folder link not yet provided** – need a Google Drive folder URL to add to QA summary reports before sending to Christopher.
3. **Automated tests cannot run from this CI environment** – must run from a Mac or machine with internet access to vercel.app. Command: `cd tests && npm test`.

---

## Tomorrow's Plan

- [ ] **Register all QA test accounts** on the live app (start with agent.test1, then homeowners, then contractors, technician)
- [ ] Run the agent referral workflow (Method 1) — copy link → homeowner follows → submits form
- [ ] Run the homeowner agent-email link flow (Method 2)
- [ ] Test contractor bidding workflow end-to-end
- [ ] Test 10% deposit payment and calendar scheduling
- [ ] Verify all email triggers and DocuSign documents
- [ ] Capture 50+ screenshots per the checklist in `qa/screenshots/email-docusign-triggers/README.md`
- [ ] Fill out bug reports for any issues found
- [ ] Upload all artifacts to Google Drive
- [ ] Send summary to Christopher

---

## Notes / Observations

- Christopher's printed workflow document confirmed: all platform accounts use password `MrSurety2026!`
- The referral link flow is a **single sign-up page** — homeowner fills Name, Email, Phone, Password, Property Address, Service Type → one submit creates account AND service request simultaneously
- Deposit is **10% of total estimate** via credit card; calendar opens immediately after payment
- Homeowner sees their requests under **"My Requests"** in their dashboard
- All Playwright test scripts have been updated to match this exact behavior

---

**Submitted to:** Christopher Palmer (c.palmer@mrsurety.com)  
**Google Drive Folder:** https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing
