# MrSurety QA – Test User Credentials

**Last Updated:** 2026-03-13  
**Environment:** Staging / QA  
**Prepared by:** Sophal Lanh  

> ⚠️ **Do not share these credentials publicly. For internal QA use only.**

---

## Agents

| Email | Password | Name | Company | Notes |
|-------|----------|------|---------|-------|
| agent.test1@mrsurety-qa.com | QAtest@123 | Alex Johnson | Surety Realty | Primary agent tester; use for referral link generation |
| agent.test2@mrsurety-qa.com | QAtest@123 | Maria Garcia | HomeGuard Agency | Secondary agent; test multi-agent scenarios |

---

## Homeowners

| Email | Password | Name | Property Address | Notes |
|-------|----------|------|-----------------|-------|
| homeowner.test1@mrsurety-qa.com | QAtest@123 | Sam Williams | 123 Main St, Los Angeles CA 90001 | Standard homeowner test account |
| homeowner.test2@mrsurety-qa.com | QAtest@123 | Jamie Lee | 456 Oak Ave, Anaheim CA 92801 | Linked to agent.test1 via referral |
| homeowner.test3@mrsurety-qa.com | QAtest@123 | Chris Brown | 789 Pine Rd, Irvine CA 92604 | Edge case: no agent email entered |

---

## Contractors

| Email | Password | Name | Company | Notes |
|-------|----------|------|---------|-------|
| contractor.test1@mrsurety-qa.com | QAtest@123 | Bob Miller | Miller Construction LLC | Primary contractor; upload bid and estimate |
| contractor.test2@mrsurety-qa.com | QAtest@123 | Linda Chen | Chen Builders Inc | Secondary contractor; test competing bids |

---

## Technicians

| Email | Password | Name | Company | Notes |
|-------|----------|------|---------|-------|
| tech.test1@mrsurety-qa.com | QAtest@123 | Dave Torres | Torres Services | Assigned technician; verify work order receipt |

---

## Admin

| Email | Password | Name | Notes |
|-------|----------|------|-------|
| admin.qa@mrsurety-qa.com | QAadmin@123 | QA Admin | Internal admin account for approvals and dashboard review |

---

## Account Registration Notes

- All accounts should be registered on the **staging** environment only.
- Use the **agent referral link** method (agent.test1 → homeowner.test2) for referral flow tests.
- Use the **homeowner agent-email method** (homeowner.test1 → enters agent.test1 email) for email-based linking.
- Contractor accounts require approval before bidding; confirm admin receives and approves contractor registration.
- After each test cycle, document which accounts were used and any password resets applied.
