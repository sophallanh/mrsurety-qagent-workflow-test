# 📋 What to Send Christopher – Checklist

**For:** Sophal Lanh  
**Date:** 2026-03-13

---

## ✅ The QA Infrastructure is 100% Complete

Everything in the GitHub repo is built and ready. Here is exactly what you send Christopher and what you still need to do yourself on the live app.

> 📋 **Testing Organization Doc (from Christopher):**  
> https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing  
> See `qa/PENDING_SYNC_WITH_DOC.md` for a checklist of things to verify/discuss from this doc.

---

## 📤 Send Christopher RIGHT NOW

### 1. GitHub Repository Link
> **URL:** https://github.com/sophallanh/mrsurety-qagent-workflow-test

Tell him: *"Here is the full QA test suite and documentation package. It includes 59 automated Playwright tests across 7 workflows, full workflow guides, screenshot capture checklists, bug report templates, and video recording guides."*

### 2. QA Status Summary
> **File:** `qa/QA_STATUS.md`  
> Or just copy-paste the text from that file into an email.

### 3. Today's Summary Report
> **File:** `qa/summary-reports/QA_SUMMARY_2026-03-13.md`
> *(Fill in the Google Drive link before sending)*

---

## 🔲 Things YOU Still Need to Do (Before Sending More to Christopher)

These are the **only** remaining items. None of them require code changes — they all require YOU on the live app:

### Step 1 – Create QA Test Accounts on the Live App
Go to: https://frontend-tan-five-46.vercel.app

Register these accounts (in this order):

| Role | Email | Password |
|------|-------|----------|
| Agent (you test as) | agent.test1@mrsurety-qa.com | MrSurety2026! |
| Homeowner 1 | homeowner.test1@mrsurety-qa.com | MrSurety2026! |
| Homeowner 2 (linked via referral) | homeowner.test2@mrsurety-qa.com | MrSurety2026! |
| Contractor | contractor.test1@mrsurety-qa.com | MrSurety2026! |
| Technician | tech.test1@mrsurety-qa.com | MrSurety2026! |

Admin already exists: **admin@mrsurety.com / MrSurety2026!**

---

### Step 2 – Run the Automated Tests From Your Mac

```bash
cd mrsurety-qagent-workflow-test/tests
cp .env.example .env
npm install
npx playwright install chromium
npm test
```

This will run all 59 tests and save screenshots automatically to `qa/screenshots/`.

---

### Step 3 – Manually Walk Through the 8-Step Homeowner Flow

Do this yourself so you can screenshot everything Christopher needs:

1. Log in as agent → copy referral link from dashboard
2. Open link in incognito browser → fill out sign-up form (Name, Email, Phone, Password, Address, Service Type)
3. Submit → confirm account created + service request submitted
4. Log in as homeowner → verify request appears under "My Requests"
5. Log in as contractor → submit a bid with an estimate document
6. Log in as homeowner → approve estimate → click "Pay Deposit" (10%) → enter credit card → schedule on calendar
7. Log in as admin → verify all steps are tracked on the admin dashboard
8. Check all email inboxes for every trigger email

---

### Step 4 – Capture 50+ Screenshots

Follow the checklist in:  
`qa/screenshots/email-docusign-triggers/README.md`

Save screenshots to the correct folders under `qa/screenshots/`.

---

### Step 5 – Upload to Google Drive & Share

Create a Google Drive folder: **MrSurety QA – Sophal Lanh**

Upload:
- `qa/screenshots/` (all captured screenshots)
- `qa/summary-reports/QA_SUMMARY_2026-03-13.md`
- `qa/bug-reports/` (any bugs found)
- `qa/spec-docs/` (all the spec documents)

Then share the link with Christopher at c.palmer@mrsurety.com.

---

## 🚫 What's BLOCKING You Right Now

Only one thing is blocking you from running the tests:

> **The sandbox environment this code was built in cannot reach vercel.app** (DNS blocked in CI).  
> **You can run everything just fine from your Mac.** The `.env.example` file has all credentials ready.

---

## 📊 What's Already Done (Proof)

| Item | Done? | Location |
|------|-------|----------|
| 59 Playwright automated tests | ✅ | `tests/playwright/*.spec.ts` |
| Workflow guides (short + long) | ✅ | `qa/spec-docs/workflow-guides/` |
| Service form spec (actual fields from Christopher's doc) | ✅ | `qa/spec-docs/service-form/` |
| Email + DocuSign templates reference | ✅ | `qa/spec-docs/email-templates/` |
| Admin dashboard guide | ✅ | `qa/spec-docs/admin-guides/` |
| All credentials updated (MrSurety2026!) | ✅ | `qa/test-user-credentials/` |
| 50+ screenshot capture checklist | ✅ | `qa/screenshots/email-docusign-triggers/README.md` |
| Video recording guides (7 workflows) | ✅ | `qa/videos/*/README.md` |
| Bug report template + CSV log | ✅ | `qa/bug-reports/` |
| Daily QA summary template + today's report | ✅ | `qa/summary-reports/` |
| `.env.example` with all credentials pre-filled | ✅ | `tests/.env.example` |
| Live app URL set as default in Playwright config | ✅ | `tests/playwright.config.ts` |
| QA status summary doc for Christopher | ✅ | `qa/QA_STATUS.md` |
| Today's summary report (pre-filled) | ✅ | `qa/summary-reports/QA_SUMMARY_2026-03-13.md` |

**Total files in repo:** 55+  
**Total automated tests:** 59 across 7 spec files  
**Total workflows covered:** Agent Referral, Homeowner Service Request, Contractor Bidding, Admin Dashboard, Technician, Email/DocuSign, Agent Upload Invite, Edge Cases
