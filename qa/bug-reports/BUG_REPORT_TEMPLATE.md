# MrSurety QA – Bug Report Template

**Instructions:** Copy this template for each new bug found. Save as `BUG-<ID>_<short-title>.md` in the `/qa/bug-reports/` folder and attach relevant screenshots.

---

## Bug ID: BUG-001

**Title:** _Short descriptive title of the bug_

**Date Reported:** YYYY-MM-DD  
**Reported By:** Sophal Lanh  
**Environment:** Staging / QA  
**App Version / Build:** _e.g., v0.1.0-beta or commit SHA_  

---

## Severity

- [ ] 🔴 Critical – Blocks testing or core workflow
- [ ] 🟠 High – Major feature broken, workaround exists
- [ ] 🟡 Medium – Partial feature failure, usable with workaround
- [ ] 🟢 Low – Minor UI/UX issue or wording

---

## Workflow Affected

- [ ] Agent Referral Link
- [ ] Homeowner Agent-Email Linking
- [ ] Homeowner Service Request Form
- [ ] Contractor Bidding / Estimate Upload
- [ ] Homeowner Estimate Selection / Deposit
- [ ] Work Order / DocuSign Flow
- [ ] Admin Dashboard / Approval
- [ ] Technician Work Order Receipt
- [ ] Agent Upload Invite System – Contractor Invite Flow
- [ ] Agent Upload Invite System – Insurance Agent Upload
- [ ] Agent Upload Invite System – Security / Access Control
- [ ] Agent Upload Invite System – Document Type Restrictions
- [ ] Email Trigger
- [ ] DocuSign Document
- [ ] Resale Certificate Flow
- [ ] Other: _______________

---

## User Role(s) Affected

- [ ] Agent (MrSurety Referral Agent)
- [ ] Insurance Agent (External – no platform account; uses secure upload link)
- [ ] Homeowner
- [ ] Contractor
- [ ] Technician
- [ ] Admin

---

## Steps to Reproduce

1. Log in as `[role]` using `[email]`
2. Navigate to `[page / feature]`
3. Perform action: `[describe action]`
4. _Add more steps as needed_

---

## Expected Result

_Describe what should happen according to the spec/workflow guide._

---

## Actual Result

_Describe what actually happened. Include any error messages, UI glitches, or missing behavior._

---

## Screenshots / Videos

| # | File | Description |
|---|------|-------------|
| 1 | `screenshots/...` | _Describe what the screenshot shows_ |

---

## Additional Notes / Context

_Any relevant observations, patterns, or related issues. Include workarounds if found._

---

## Status

- [ ] Open
- [ ] In Progress (Dev)
- [ ] Fixed – Awaiting Verification
- [ ] Verified Fixed
- [ ] Won't Fix / By Design

---

## Resolution Notes

_Fill in once resolved: what was the fix, which build includes it, and who verified._
