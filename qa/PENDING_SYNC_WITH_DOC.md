# 📋 Pending Sync With Christopher's Testing Organization Doc

**Google Doc (Testing Org):** https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing

**Purpose of this file:** Track anything in Christopher's Testing Organization Doc that differs from what's built in this repo so we can discuss and update accordingly.

> ⚠️ The sandbox environment that built this repo cannot access Google Docs (DNS blocked).
> Sophal: please read through the Testing Org Doc and paste any sections here that look different from what we have.
> We will update the repo to match the correct info.

---

## 🔵 What We THINK Is Correct (Based on Christopher's Printed Workflow Doc)

These are the key decisions already built into the repo. Flag any that differ from the Testing Org Doc:

| # | What We Built | Confidence | Flag if Different |
|---|--------------|------------|-------------------|
| 1 | Platform URL: `https://frontend-tan-five-46.vercel.app` | ✅ High | [ ] Different |
| 2 | Admin email: `admin@mrsurety.com` | ✅ High | [ ] Different |
| 3 | All QA account password: `MrSurety2026!` | ✅ High | [ ] Different |
| 4 | Referral link opens combined sign-up + service request (single form) | ✅ High | [ ] Different |
| 5 | Form fields: Name, Email, Phone, Password, Property Address, Service Type | ✅ High | [ ] Different |
| 6 | Deposit = 10% of total estimate, paid by credit card | ✅ High | [ ] Different |
| 7 | Calendar opens immediately after deposit is paid | ✅ High | [ ] Different |
| 8 | Homeowner sees requests under "My Requests" | ✅ High | [ ] Different |
| 9 | Referral code is single-use per form (cannot reuse for new form) | ✅ High | [ ] Different |
| 10 | Agent linking: Method 1 = referral link, Method 2 = homeowner enters agent email | ✅ High | [ ] Different |
| 11 | Contractor must be admin-approved before bidding | ✅ High | [ ] Different |
| 12 | DocuSign docs: Work Order Contract, Resale Certificate, Completion Sign-off, Lien Waiver | ⚠️ Medium | [ ] Different |
| 13 | Technician receives work order by email + DocuSign | ⚠️ Medium | [ ] Different |
| 14 | Agent Upload Invite: contractor sends secure link to insurance agent for COI/endorsement upload | ⚠️ Medium | [ ] Different |
| 15 | Upload invite link expires after 7 days | ⚠️ Medium | [ ] Different |
| 16 | Test user emails use domain `@mrsurety-qa.com` | ⚠️ Medium | [ ] Different |
| 17 | Admin can approve/reject contractor registrations and agent-homeowner links | ✅ High | [ ] Different |

---

## 🔴 Open Questions — Things We're NOT Sure About

These need to be confirmed with you or from the doc:

| # | Question | Current Assumption | Status |
|---|---------|-------------------|--------|
| Q1 | What exact service types appear in the dropdown? (Roofing, Electrical, Plumbing, HVAC, General Construction — correct?) | We used these 5 | ❓ Unconfirmed |
| Q2 | Does the homeowner receive a DocuSign work order, or is that only for contractor + technician? | We assumed homeowner + contractor sign work order | ❓ Unconfirmed |
| Q3 | Is there a Resale Certificate step for ALL jobs, or only certain ones? | We marked it as "if applicable" | ❓ Unconfirmed |
| Q4 | Does the agent get a commission notification? And where does that show up? | We noted it shows in agent dashboard | ❓ Unconfirmed |
| Q5 | What is the exact email for Christopher to receive QA results? Is it `c.palmer@mrsurety.com`? | We used `c.palmer@mrsurety.com` | ❓ Unconfirmed |
| Q6 | Is the admin auto-notified for every event, or only certain ones? | We assume all major events | ❓ Unconfirmed |
| Q7 | Are there specific names or branding for the DocuSign templates Christopher provided? | We used generic names | ❓ Unconfirmed |
| Q8 | What should the Google Drive folder structure look like? (We proposed one in `qa/README.md`) | Proposed structure | ❓ Unconfirmed |
| Q9 | Are there any specific test scenarios listed in the Testing Org Doc not in our test suite? | Unknown — can't read doc | ❓ Needs paste |
| Q10 | Any specific formatting/naming Christopher wants for screenshots or videos? | We used our own naming convention | ❓ Unconfirmed |

---

## 📝 Notes From Discussion With Sophal

> Paste sections of the Testing Organization Doc here as you review it.
> We will update the repo to match.

```
[ PASTE DOC SECTIONS HERE ]
```

---

## ✅ Already Resolved

| # | Question | Resolution | Date |
|---|---------|-----------|------|
| R1 | What is the live app URL? | `https://frontend-tan-five-46.vercel.app` — confirmed from Christopher | 2026-03-13 |
| R2 | What password do all accounts use? | `MrSurety2026!` — confirmed from Christopher's printed workflow doc | 2026-03-13 |
| R3 | Does referral link go to login page or sign-up page? | Sign-up page — combined form. Confirmed from Christopher's doc. | 2026-03-13 |
| R4 | Does deposit trigger calendar or is it a separate step? | Calendar opens immediately after deposit. Confirmed. | 2026-03-13 |
| R5 | What are the referral code rules? | Single-use per form, cannot reuse for new form. Confirmed from Christopher's doc. | 2026-03-13 |
