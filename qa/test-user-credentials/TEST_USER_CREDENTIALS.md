# MrSurety QA – Test User Credentials

**Last Updated:** 2026-03-14  
**Live App:** https://frontend-tan-five-46.vercel.app  
**Prepared by:** Sophal Lanh  

> ⚠️ **Do not share these credentials publicly. For internal QA use only.**

---

## How to Create These Accounts

Run this **once** before executing any other workflow:
```bash
cd qa/openclaw
cp .env.example .env
python3 workflows/mrsurety_qa.py --workflow create-accounts
```

Or create them manually at: **https://frontend-tan-five-46.vercel.app/signup**

---

## Admin (already exists — provided by Christopher)

| Email | Password | Notes |
|-------|----------|-------|
| admin@mrsurety.com | MrSurety2026! | Real admin — DO NOT change password |

---

## Built-In App Test Accounts (pre-seeded by Christopher, from in-app Full Workflow guide)

> These accounts are pre-seeded in the app for quick manual testing.
> Use the @outlook.com accounts below for automated/email testing.

| Role | Email | Password |
|------|-------|----------|
| Homeowner | testowner@mrsurety.com | MrSurety2026! |
| Contractor | testpro@mrsurety.com | MrSurety2026! |
| Agent | testagent2@mrsurety.com | MrSurety2026! |

---

## Agents

| Email | Password | Name | Company | Workflow |
|-------|----------|------|---------|----------|
| agent.test1@outlook.com | QAtest@2026! | Alex Johnson | Surety Realty | Workflow 2 — referral link generation |
| agent.test2@outlook.com | QAtest@2026! | Maria Garcia | HomeGuard Agency | Multi-agent scenario |
| agent.test3@outlook.com | QAtest@2026! | James Wilson | Wilson Insurance Group | Third agent — upload invite & referral tests |

---

## Homeowners

| Email | Password | Name | Property Address | Workflow |
|-------|----------|------|-----------------|----------|
| homeowner.test2@outlook.com | QAtest@2026! | Jamie Lee | 456 Oak Ave, Anaheim CA 92801 | Workflow 3 Method A — uses referral link |
| homeowner.test1@outlook.com | QAtest@2026! | Sam Williams | 123 Main St, Los Angeles CA 90001 | Workflow 3 Method B — enters agent email |
| homeowner.test3@outlook.com | QAtest@2026! | Chris Brown | 789 Pine Rd, Irvine CA 92604 | Edge case — no agent email entered |

---

## Contractors

| Email | Password | Name | Company | Workflow |
|-------|----------|------|---------|----------|
| contractor.test1@outlook.com | QAtest@2026! | Bob Miller | Miller Construction LLC | Workflow 4 — submits bid & estimate |
| contractor.test2@outlook.com | QAtest@2026! | Linda Chen | Chen Builders Inc | Competing bid scenario |
| contractor.test3@outlook.com | QAtest@2026! | Tony Rivera | Rivera Home Services | Third contractor — upload invite sender |

---

## Technicians

| Email | Password | Name | Company | Workflow |
|-------|----------|------|---------|----------|
| tech.test1@outlook.com | QAtest@2026! | Dave Torres | Torres Services | Workflow 8 — receives & completes work order |

---

## Insurance Agent (External – No Platform Account)

> This persona is the contractor's **external insurance agent** who receives a secure one-time upload link via email.
> They do **not** have a platform account. Access is via the link only.

| Email | Name | Company | Workflow |
|-------|------|---------|----------|
| ins.agent.test@outlook.com | Rachel Kim | Kim Insurance Brokers | Workflow 9 — receives secure upload link from contractor.test1 |

**Environment variable:** `INSURANCE_AGENT_EMAIL=ins.agent.test@outlook.com`

---

## Account Registration Notes

- **Create a real Outlook inbox** for each email address before running `create-accounts`
- All accounts are registered on the **live app** (https://frontend-tan-five-46.vercel.app) only
- Use the **agent referral link** method (agent.test1 → homeowner.test2) for Workflow 2–3 Method A
- Use the **homeowner agent-email method** (homeowner.test1 → enters agent.test1 email) for Workflow 3 Method B
- Contractor accounts require admin approval — admin logs in and approves (Workflow 7)
- After each test cycle, document which accounts were used and any password resets

