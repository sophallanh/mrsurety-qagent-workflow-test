# MrSurety QA – Test User Credentials

**Last Updated:** 2026-03-13  
**Live App:** https://frontend-tan-five-46.vercel.app  
**Prepared by:** Sophal Lanh  

> ⚠️ **Do not share these credentials publicly. For internal QA use only.**
>
> **All accounts use the shared QA password: `MrSurety2026!`** (from Christopher's workflow document).

---

## Admin

| Email | Password | Notes |
|-------|----------|-------|
| admin@mrsurety.com | MrSurety2026! | **Official admin account provided by Christopher.** Use for all admin approvals, dashboard review, and job tracking. |

---

## Agents

| Email | Password | Name | Company | Notes |
|-------|----------|------|---------|-------|
| agent.test1@mrsurety-qa.com | MrSurety2026! | Alex Johnson | Surety Realty | Primary agent tester; use for referral link generation |
| agent.test2@mrsurety-qa.com | MrSurety2026! | Maria Garcia | HomeGuard Agency | Secondary agent; test multi-agent scenarios |

---

## Homeowners

| Email | Password | Name | Property Address | Notes |
|-------|----------|------|-----------------|-------|
| homeowner.test1@mrsurety-qa.com | MrSurety2026! | Sam Williams | 123 Main St, Los Angeles CA 90001 | Standard homeowner test account |
| homeowner.test2@mrsurety-qa.com | MrSurety2026! | Jamie Lee | 456 Oak Ave, Anaheim CA 92801 | Linked to agent.test1 via referral |
| homeowner.test3@mrsurety-qa.com | MrSurety2026! | Chris Brown | 789 Pine Rd, Irvine CA 92604 | Edge case: no agent email entered |

---

## Contractors

| Email | Password | Name | Company | Notes |
|-------|----------|------|---------|-------|
| contractor.test1@mrsurety-qa.com | MrSurety2026! | Bob Miller | Miller Construction LLC | Primary contractor; upload bid and estimate |
| contractor.test2@mrsurety-qa.com | MrSurety2026! | Linda Chen | Chen Builders Inc | Secondary contractor; test competing bids |

---

## Technicians

| Email | Password | Name | Company | Notes |
|-------|----------|------|---------|-------|
| tech.test1@mrsurety-qa.com | MrSurety2026! | Dave Torres | Torres Services | Assigned technician; verify work order receipt |

---

## Insurance Agent (External – No Platform Account)

> This persona is the contractor's **external insurance agent** who receives a secure one-time upload link via email.
> They do **not** have a platform account. Access is via the link only.

| Email | Name | Company | Notes |
|-------|------|---------|-------|
| ins.agent.test@mrsurety-qa.com | Rachel Kim | Kim Insurance Brokers | Used for Agent Upload Invite System tests; receives secure link from contractor.test1 |

---

## Account Registration Notes

- All accounts must be **created on the live platform** at https://frontend-tan-five-46.vercel.app
- Password for all QA accounts: **MrSurety2026!**
- Use the **agent referral link** method (agent.test1 → homeowner.test2) for referral flow tests.
- Use the **homeowner agent-email method** (homeowner.test1 → enters agent.test1 email) for email-based linking.
- Contractor accounts require approval before bidding; confirm admin receives and approves contractor registration.
- **Key: The referral link opens a sign-up page** – homeowner creates their account AND submits service request in one step. No separate registration step required.
- After each test cycle, document which accounts were used and any password resets applied.
