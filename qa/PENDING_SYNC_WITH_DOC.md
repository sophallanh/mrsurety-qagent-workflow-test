# 📋 Pending Sync With Christopher's Testing Organization Doc

**Google Doc (Testing Org):** https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing

**Status:** ✅ Full document content received and synced on 2026-03-13

---

## ✅ What Was Updated From Christopher's Testing Guide

All items below were updated in the repo to match Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM":

| # | What Was Changed | File(s) Updated |
|---|-----------------|----------------|
| 1 | Test user emails → `@outlook.com` (was `@mrsurety-qa.com`) | `fixtures/test-users.ts`, `.env.example`, credentials docs |
| 2 | Test user passwords → `Test123!` (was `MrSurety2026!` for QA accounts) | `fixtures/test-users.ts`, `.env.example`, credentials docs |
| 3 | CSLB license numbers added: 999888 (contractor1), 999777 (contractor2) | `fixtures/test-users.ts`, `TEST_USER_CREDENTIALS.md` |
| 4 | Contractor resale cert fields added | `fixtures/test-users.ts` |
| 5 | Pipe size logic added (sq ft → pipe size) | `SERVICE_FORM_GUIDE.md`, `TEST_USER_CREDENTIALS.md`, homeowner test |
| 6 | Pressure reducer logic added (year built → requirement) | `SERVICE_FORM_GUIDE.md`, `TEST_USER_CREDENTIALS.md`, homeowner test |
| 7 | Water main photo marked REQUIRED with validation test | `SERVICE_FORM_GUIDE.md`, `homeowner-service-request.spec.ts` |
| 8 | All 10 form sections documented (Account → Contact) | `SERVICE_FORM_GUIDE.md` |
| 9 | Device source pricing: Contractor=$599.99/0% markup, Homeowner/Insurance=$0 | `SERVICE_FORM_GUIDE.md`, `contractor-bidding.spec.ts` |
| 10 | Software: $75 flat + 25% markup = $93.75 retail | `SERVICE_FORM_GUIDE.md`, `pricing-calculation.spec.ts` |
| 11 | Retail markup formulas: Parts/Pressure/Cable +35%, Labor/Software +25% | `SERVICE_FORM_GUIDE.md`, `pricing-calculation.spec.ts` |
| 12 | $95 Service Fee – must appear in ALL estimates | `SERVICE_FORM_GUIDE.md`, `contractor-bidding.spec.ts`, `pricing-calculation.spec.ts` |
| 13 | Contractor bidding: both methods (Upload Written Estimate + System Creator) | `contractor-bidding.spec.ts` (full rewrite) |
| 14 | Resale Certificate: YES = MrSurety adds tax; NO = contractor includes tax | `SERVICE_FORM_GUIDE.md`, `pricing-calculation.spec.ts` |
| 15 | Referral link behavior updated: multiple uses = separate jobs (was wrongly "single-use") | `agent-referral-workflow.spec.ts` |
| 16 | Referral link format: `mrsurety.com/ref/AGENT123` | `agent-referral-workflow.spec.ts` |
| 17 | Landing page must show "Brought to you by [Agent Name]" | `agent-referral-workflow.spec.ts` |
| 18 | Email list expanded to 39+ emails (was 22) | `EMAIL_TEMPLATES_GUIDE.md` |
| 19 | DocuSign list expanded to 8 documents (was 5) | `DOCUSIGN_TEMPLATES_GUIDE.md` |
| 20 | Screenshot checklist updated to match new email/docusign lists | `email-docusign-triggers/README.md` |
| 21 | New DocuSign D3: Critical Change Order and Liability Release | `DOCUSIGN_TEMPLATES_GUIDE.md` |
| 22 | New DocuSign D4: Return Service Call Work Order | `DOCUSIGN_TEMPLATES_GUIDE.md` |
| 23 | New DocuSign D5: Affidavit of Service | `DOCUSIGN_TEMPLATES_GUIDE.md` |
| 24 | New DocuSign D6: Conditional Lien Release w/ Invoice (requires initials) | `DOCUSIGN_TEMPLATES_GUIDE.md` |
| 25 | New DocuSign D7: Unconditional Lien Release (portal access lock) | `DOCUSIGN_TEMPLATES_GUIDE.md` |
| 26 | New DocuSign D8: Change Order (during job) | `DOCUSIGN_TEMPLATES_GUIDE.md` |
| 27 | Contractor portal access lock before D7 (Unconditional Lien Release) | `DOCUSIGN_TEMPLATES_GUIDE.md`, `SHORT_WORKFLOW_GUIDE.md` |
| 28 | GPS check-in (timestamp + photo) during job execution | `SHORT_WORKFLOW_GUIDE.md` |
| 29 | Change order during job execution (homeowner approve/decline) | `SHORT_WORKFLOW_GUIDE.md` |
| 30 | New Workflow 7: Return Service Call | `return-service-call.spec.ts` (new) |
| 31 | New Workflow 8: Critical Service / Emergency | `critical-service.spec.ts` (new) |
| 32 | New Workflow 9: Assessment Service ($185 + $0.75/mile) | `assessment-service.spec.ts` (new) |
| 33 | New pricing calculation test suite | `pricing-calculation.spec.ts` (new) |
| 34 | Workflow guides (SHORT + LONG) updated for all 9 workflows | `SHORT_WORKFLOW_GUIDE.md`, `LONG_WORKFLOW_GUIDE.md` |
| 35 | Anniversary Reminder email: 11 months after job | `EMAIL_TEMPLATES_GUIDE.md` |
| 36 | Google Drive folder structure updated | `SHORT_WORKFLOW_GUIDE.md` |
| 37 | SERVICE_FORM_GUIDE.md updated with complete Assessment Option programmer spec | `SERVICE_FORM_GUIDE.md` |
| 38 | New technicians DB table documented | `SERVICE_FORM_GUIDE.md` |
| 39 | New assessment_requests DB table documented | `SERVICE_FORM_GUIDE.md` |
| 40 | 8 API endpoints for Assessment flow documented | `SERVICE_FORM_GUIDE.md` |
| 41 | 6 email notification types for Assessment flow documented | `SERVICE_FORM_GUIDE.md` |
| 42 | Full Assessment workflow (9 steps) documented | `SERVICE_FORM_GUIDE.md` |
| 43 | Service request status workflow (assessment + installation paths) documented | `SERVICE_FORM_GUIDE.md` |
| 44 | New spec test file: service-form-assessment-doc-spec.spec.ts (88 tests §A–§M) | `tests/playwright/service-form-assessment-doc-spec.spec.ts` |

---

## 🔵 Items Confirmed Correct (No Change Needed)

| # | Item | Confirmed |
|---|------|-----------|
| 1 | Platform URL: `https://frontend-tan-five-46.vercel.app` | ✅ |
| 2 | Admin email: `admin@mrsurety.com` | ✅ |
| 3 | Admin password: `MrSurety2026!` | ✅ |
| 4 | Deposit = 10% of total estimate, paid by credit card | ✅ |
| 5 | Calendar opens immediately after deposit is paid | ✅ |
| 6 | Homeowner sees requests under "My Requests" | ✅ |
| 7 | Agent linking: Method A = referral link, Method B = homeowner enters agent email | ✅ |
| 8 | Contractor must be admin-approved before bidding | ✅ |

---

## ❓ Open Questions (Still Need Discussion)

| # | Question | Status |
|---|---------|--------|
| Q1 | What specific service types appear in the dropdown? (Installation, Assessment, Emergency confirmed — others?) | Discuss |
| Q2 | Is there a technician DocuSign work order receipt, or only the 8 listed? | Discuss |
| Q3 | What exact verbiage does Christopher want in the DocuSign templates? | Discuss |
| Q4 | Is there a referral commission structure or payout to agents? | Discuss |
| Q5 | For the assessment service: how is mileage calculated? (GPS distance from tech service area?) | Discuss |
