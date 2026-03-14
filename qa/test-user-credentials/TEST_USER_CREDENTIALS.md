# MrSurety QA – Test User Credentials

**Last Updated:** 2026-03-13  
**Live App:** https://frontend-tan-five-46.vercel.app  
**Source:** Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM" – Parts 1 & 8  
**Prepared by:** Sophal Lanh  

> ⚠️ **Do not share these credentials publicly. For internal QA use only.**

---

## Admin

| Email | Password | Notes |
|-------|----------|-------|
| admin@mrsurety.com | MrSurety2026! | **Official admin account provided by Christopher. Password unchanged.** |

---

## Agents

Per Christopher's doc: email domain `@test.com` or `@outlook.com`, password `Test123!`

| Email | Password | Name | Company | Notes |
|-------|----------|------|---------|-------|
| agent1@outlook.com | Test123! | Alex Johnson | State Farm Test | Primary agent tester; use for referral link generation (Method A) |
| agent2@outlook.com | Test123! | Maria Garcia | Allstate Test | Secondary agent; test multi-agent scenarios |

---

## Homeowners

Per Christopher's doc: email `@outlook.com`, password `Test123!`

| Email | Password | Name | Property Address | Sq Ft | Year Built | Notes |
|-------|----------|------|-----------------|-------|------------|-------|
| homeowner1@outlook.com | Test123! | Sam Williams | 123 Main St, Los Angeles CA 90001 | 1,800 | 2010 | Pipe: 3/4" (under 2000 sq ft); Pressure reducer: REQUIRED (>5 yr) |
| homeowner2@outlook.com | Test123! | Jamie Lee | 456 Oak Ave, Anaheim CA 92801 | 2,500 | 2022 | Pipe: 1" (2001-3000 sq ft); Pressure reducer: NOT required (≤5 yr) |
| homeowner3@outlook.com | Test123! | Chris Brown | 789 Pine Ln, Irvine CA 92604 | 3,500 | 2000 | Pipe: 1 1/4" (3001-5000 sq ft); No agent email (edge case) |

---

## Contractors

Per Christopher's doc: email `@test.com` or `@outlook.com`, password `Test123!`, CSLB test numbers

| Email | Password | Name | Company | CSLB | Resale Cert | Notes |
|-------|----------|------|---------|------|-------------|-------|
| contractor1@outlook.com | Test123! | Bob Miller | Miller Construction LLC | 999888 | YES | Accepts resale cert → MrSurety adds tax at retail; Primary contractor |
| contractor2@outlook.com | Test123! | Linda Chen | Chen Builders Inc | 999777 | NO | Does NOT accept resale cert → includes tax in prices; secondary bidder |

> **CSLB numbers per Christopher's doc:** 999888 (contractor 1), 999777 (contractor 2)

---

## Technicians

Per Christopher's doc: email `@test.com`, password `Test123!`

| Email | Password | Name | Service Area | Notes |
|-------|----------|------|-------------|-------|
| tech1@outlook.com | Test123! | Dave Torres | 92530, 92531 | Assessment service and work order receipt |

---

## Insurance Agent (External – No Platform Account)

> This persona is the contractor's **external insurance agent** who receives a secure one-time upload link via email.
> They do **not** have a platform account. Access is via the link only.

| Email | Name | Company | Notes |
|-------|------|---------|-------|
| ins.agent.test@outlook.com | Rachel Kim | Kim Insurance Brokers | Used for Agent Upload Invite System tests; receives secure link from contractor1 |

---

## Pipe Size Logic (from Christopher's Testing Guide Part 2)

| Square Footage | Expected Pipe Size |
|---------------|-------------------|
| Under 2,000 sq ft | 3/4 inch |
| 2,001 – 3,000 sq ft | 1 inch |
| 3,001 – 5,000 sq ft | 1 1/4 inch |

## Pressure Reducer Logic

| Home Age | Requirement |
|----------|------------|
| Built > 5 years ago | REQUIRED |
| Built ≤ 5 years ago | NOT REQUIRED |

---

## Account Registration Notes

- All QA test accounts must be **created on the live platform** at https://frontend-tan-five-46.vercel.app
- QA account password: **Test123!** (per Christopher's Testing Guide Part 8)
- Admin password: **MrSurety2026!** (provided by Christopher — unchanged)
- Contractor accounts require **admin approval** and a **CSLB license number** before bidding
- Homeowner accounts need **water main photo upload** when creating a service request
- Referral link format: `mrsurety.com/ref/AGENT123` — landing page shows "Brought to you by [Agent Name]"
- After each test cycle, document which accounts were used and any password resets applied
