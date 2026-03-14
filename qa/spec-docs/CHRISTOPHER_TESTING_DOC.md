# Christopher's Testing Instructions – Master Reference Doc

> **This is the primary source-of-truth document for QA testing on MrSurety.**  
> When in doubt about any workflow, field, email, or expected behavior — check here first.

## 📄 Google Doc Link

**[MrSurety QA Testing Instructions (Christopher's Doc)](https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing)**

```
https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing
```

---

## How to Use This Doc

1. **Before testing any workflow** — open this doc and read the relevant section
2. **When you see something unexpected** — compare the live app behavior against what this doc says
3. **When filing a bug report** — reference the specific section of this doc that the bug violates
4. **When something seems different** — discuss with Sophal before marking as a bug (the doc may have been updated)

---

## Where This Doc Fits in the QA Process

```
Christopher's Doc (this link)
        │
        ▼
qa/MANUAL_EXECUTION_GUIDE.md   ← step-by-step manual testing guide (references this doc)
        │
        ▼
qa/openclaw/workflows/mrsurety_qa.py  ← automated Playwright script (runs all 9 workflows)
        │
        ▼
qa/openclaw/output/                   ← screenshots, videos, reports
        │
        ▼
MrSurety_QA_YYYY-MM-DD.zip → Google Drive → Email to c.palmer@mrsurety.com
```

---

## Quick Reference: What Christopher Asked For

Based on the testing instructions, the QA team must verify:

| # | Requirement | Who | How Automated |
|---|-------------|-----|---------------|
| 1 | 3 user types: Agent, Homeowner, Contractor | All 3 | `--workflow agent-signup`, `homeowner-service-request`, `contractor-bidding` |
| 2 | Agent referral via link (Method A) | Homeowner | `--workflow homeowner-service-request` |
| 3 | Agent referral via email entry (Method B) | Homeowner | `--workflow homeowner-service-request` |
| 4 | Referral code valid for 1 request only | Admin | `--workflow admin-verification` |
| 5 | Multiple property addresses + permit types | Homeowner | `--workflow homeowner-service-request` |
| 6 | 50+ screenshots capturing all emails + UI flows | All | `--workflow email-docusign` |
| 7 | Admin dashboard visible and navigable | Admin | `--workflow admin-login` |
| 8 | Contractor bid & estimate upload | Contractor | `--workflow contractor-bidding` |
| 9 | Homeowner deposit via Stripe | Homeowner | `--workflow homeowner-deposit` |
| 10 | Work order generation + DocuSign | Admin | `--workflow work-order-docusign` |
| 11 | Technician receives work order | Technician | `--workflow technician-workflow` |
| 12 | Agent upload invite + security controls | Agent/Contractor | `--workflow agent-upload-invite` |
| 13 | Bug reports filed for any discrepancies | QA Team | `qa/bug-reports/` |
| 14 | Results uploaded to Google Drive | QA Team | `_package_and_upload()` in mrsurety_qa.py |

---

## Test Accounts (pre-created)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mrsurety.com | MrSurety2026! |
| Agent 1 | agent.test1@outlook.com | QAtest@2026! |
| Agent 2 | agent.test2@outlook.com | QAtest@2026! |
| Homeowner A (referral link) | homeowner.test2@outlook.com | QAtest@2026! |
| Homeowner B (agent email) | homeowner.test1@outlook.com | QAtest@2026! |
| Homeowner C (no agent) | homeowner.test3@outlook.com | QAtest@2026! |
| Contractor 1 | contractor.test1@outlook.com | QAtest@2026! |
| Contractor 2 | contractor.test2@outlook.com | QAtest@2026! |
| Technician | tech.test1@outlook.com | QAtest@2026! |
| Insurance Agent | ins.agent.test@outlook.com | QAtest@2026! |

---

## Contact

**Christopher Palmer (MrSurety):** c.palmer@mrsurety.com  
**QA Team Lead:** Sophal Lanh

---

_Last updated: 2026-03-14 — Add this link to any new QA guide or spec doc created for this project._
