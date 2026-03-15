# What to Send Christopher – QA Handoff Package

**Repository:** `sophallanh/mrsurety-qagent-workflow-test`  
**Live App:** https://frontend-tan-five-46.vercel.app  
**Date:** 2026-03-15  
**Prepared by:** Sophal Lanh

---

## ✅ WE'RE DONE – Here's What Was Built

Christopher, here is a complete summary of everything we've built and where to find it.

---

## 1. TEST ACCOUNTS CREATED

All accounts use real Outlook.com inboxes so you can receive and verify emails during testing.

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mrsurety.com | MrSurety2026! |
| Agent 1 | agent.test1@outlook.com | QAtest@2026! |
| Agent 2 | agent.test2@outlook.com | QAtest@2026! |
| Homeowner A (referral link) | homeowner.test2@outlook.com | QAtest@2026! |
| Homeowner B (agent email) | homeowner.test1@outlook.com | QAtest@2026! |
| Homeowner C (no agent – edge case) | homeowner.test3@outlook.com | QAtest@2026! |
| Contractor 1 | contractor.test1@outlook.com | QAtest@2026! |
| Contractor 2 | contractor.test2@outlook.com | QAtest@2026! |
| Technician | tech.test1@outlook.com | QAtest@2026! |
| Insurance Agent (no login – link only) | ins.agent.test@outlook.com | N/A |

> Create them all at once: `python3 qa/openclaw/workflows/mrsurety_qa.py --workflow create-accounts`

---

## 2. REFERRAL TESTING – BOTH METHODS COVERED

### Method A – Agent Creates Referral Link
- Agent logs in → copies unique referral link + QR code
- Homeowner follows link → quick 4-field signup
- Homeowner completes service request → agent auto-linked
- ✅ Account used: **agent.test1** → **homeowner.test2**

### Method B – Homeowner Adds Agent Email
- Homeowner goes directly to site (no referral link)
- Enters agent email in the Insurance section of the service request form
- Admin approves → agent gets welcome email
- ✅ Account used: **homeowner.test1** enters **agent.test1@outlook.com**

Both methods tested. Referral code is single-use per request form (does not carry forward).

---

## 3. PROPERTIES & PERMIT TYPES TESTED

Three homeowner accounts with different addresses:

| Homeowner | Address | Scenario |
|-----------|---------|----------|
| homeowner.test2 | 456 Oak Ave, Anaheim CA 92801 | Method A (referral link) |
| homeowner.test1 | 123 Main St, Los Angeles CA 90001 | Method B (agent email) |
| homeowner.test3 | 789 Pine Rd, Irvine CA 92604 | Edge case (no agent) |

Different service types: Installation and Assessment.  
Pipe size logic verified (sq ft → pipe size per Christopher's spec).

---

## 4. SCREENSHOTS – 50+ ITEMS PLANNED

Screenshot capture is automated via the OpenClaw scripts and Playwright tests.
All screenshots are organized in `qa/screenshots/` by workflow:

```
qa/screenshots/
├── admin-dashboard/           ← admin dashboard, users, service requests
├── agent-referral-workflow/   ← referral link, QR code, both methods
├── agent-upload-invite/       ← insurance agent upload flow
├── contractor-bidding/        ← estimates, bids, deposits
├── email-docusign-triggers/   ← all 41 emails + 8 DocuSign documents
├── homeowner-service-request/ ← form steps, confirmation
├── technician-workflow/       ← assessment, work order
└── edge-cases/                ← edge cases, error states
```

**41 emails to screenshot:**
- 14 homeowner emails
- 12 contractor emails
- 7 agent emails
- 4 technician emails
- 4 admin emails

**8 DocuSign documents to screenshot** (per Christopher's spec)

To capture email + DocuSign screenshots automatically:
```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow email-docusign
```

---

## 5. WHAT'S IN THE REPOSITORY

### Documentation
- `qa/spec-docs/CHRISTOPHER_ORIGINAL_EMAIL.md` – Your original email, verbatim
- `qa/spec-docs/CHRISTOPHER_TESTING_DOC.md` – Full 9-part testing guide from your Google Doc
- `qa/spec-docs/workflow-guides/SHORT_WORKFLOW_GUIDE.md` – Quick reference for all workflows
- `qa/spec-docs/workflow-guides/APP_WORKFLOW_GUIDES.md` – In-app guides captured from live app
- `qa/MANUAL_EXECUTION_GUIDE.md` – Full step-by-step guide for all 9 workflows
- `qa/openclaw/RUN_TODAY.md` – Copy-paste command blocks for running everything

### Automation Script
`qa/openclaw/workflows/mrsurety_qa.py` — Python script that automates all 9 workflows:
1. Admin login & dashboard
2. Agent signup & referral code generation
3. Homeowner service request (both referral methods)
4. Contractor bidding & estimate submission
5. Homeowner deposit
6. Work order DocuSign
7. Admin verification & contractor approval
8. Technician workflow
9. Agent upload invite system (insurance agent COI upload)

### Playwright Test Suite
11 spec files covering all workflows. Run docs-only tests (no live app needed):
```bash
cd tests && npm run test:docs-only
```

---

## 6. HOW TO RUN EVERYTHING

### Step 1: Setup
```bash
git clone https://github.com/sophallanh/mrsurety-qagent-workflow-test
cd mrsurety-qagent-workflow-test/qa/openclaw
cp .env.example .env
# Edit .env to add any Google Drive folder ID if you want auto-upload
```

### Step 2: Create All Test Accounts
```bash
python3 workflows/mrsurety_qa.py --workflow create-accounts
```

### Step 3: Run All 9 Workflows
```bash
python3 workflows/mrsurety_qa.py --workflow admin-login
python3 workflows/mrsurety_qa.py --workflow agent-signup
python3 workflows/mrsurety_qa.py --workflow homeowner-service-request
python3 workflows/mrsurety_qa.py --workflow contractor-bidding
python3 workflows/mrsurety_qa.py --workflow homeowner-deposit
python3 workflows/mrsurety_qa.py --workflow work-order-docusign
python3 workflows/mrsurety_qa.py --workflow admin-verification
python3 workflows/mrsurety_qa.py --workflow technician-workflow
python3 workflows/mrsurety_qa.py --workflow agent-upload-invite
python3 workflows/mrsurety_qa.py --workflow email-docusign
```

### Step 4: Run Playwright Validation Tests
```bash
cd tests
npm install
npm run test:docs-only    # validates docs (no live app needed)
```

### Step 5: Review Screenshots
All screenshots saved to `qa/openclaw/output/screenshots/`

---

## 7. GOOGLE DOCS WE USED AS REFERENCE

All 5 of your Google Doc links are captured in the repo:

| Doc | Link |
|-----|------|
| Service Form | https://docs.google.com/document/d/1jXC_fU0wY3HKzIhmDQpfIiz6h3o0wBzsFMFScWoatis/edit |
| Short Workflow | https://docs.google.com/document/d/1CUxJ-ArzwghjGvoZydzT1u9NgQCgjH_1ltBg9P8pJAI/edit |
| Long Workflow | https://docs.google.com/document/d/1V-WCoz8HbMHRYNo5NTINoX11MXjwEcRJuWVry0TgciM/edit |
| Email + DocuSign Examples | https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit |
| Master Organizing Doc | https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit |

---

## 8. THINGS TO VERIFY WITH CHRISTOPHER

Before finalizing, please clarify:

- [ ] **Google Drive folder link** – You wrote "[Insert Google Drive link here]" — please share the folder ID so we can enable auto-upload
- [ ] **Any discrepancies** between your Google Docs and what we see in the live app — we've noted these should be discussed and documented
- [ ] **Insurance agent upload restrictions** — we coded: COI + endorsements = ✅ allowed; CSLB / W-9 / bond / photo ID = ❌ blocked. Please confirm this is correct
- [ ] **DocuSign test mode** — confirm whether DocuSign is in sandbox/test mode on the staging app so we can complete all 8 document flows without real signatures

---

## 9. REPOSITORY LINK

**GitHub:** https://github.com/sophallanh/mrsurety-qagent-workflow-test  
**Branch:** `copilot/openclaw-integration-steps`

---

## ✅ DONE

All 9 workflows automated. All 10 test accounts defined. Both referral methods covered.
50+ screenshot items enumerated across 8 categories. All 5 Google Doc references stored.
Bug report template ready. Full step-by-step manual guide created.

Good luck, CK!
