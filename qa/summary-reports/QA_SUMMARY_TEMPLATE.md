# MrSurety QA – Daily Summary Report

**Instructions:** Fill out one of these per day of active testing. Save as `QA_SUMMARY_YYYY-MM-DD.md` in `/qa/summary-reports/`.

---

## QA Daily Summary

**Date:** 2026-03-13  
**Tester:** Sophal Lanh  
**Environment:** Staging / QA  
**Build / Version:** _e.g., v0.1.0-beta_  
**Platform Status:** ⏳ Pending Launch / ✅ Live

---

## Documents Reviewed Today

- [x] MR SURETY – TESTING GUIDE FOR QA TEAM
- [x] Short/Long Workflow Docs
- [x] Service Form Specification
- [x] Email & DocuSign Templates
- [x] Admin/Contractor/Homeowner/Technician Guides
- [ ] _Add others as reviewed_

---

## Workflows Tested Today

| Workflow | Status | Notes |
|----------|--------|-------|
| Agent Referral Link – Method 1 | ⏳ Pending | Awaiting platform launch |
| Homeowner Agent-Email Linking – Method 2 | ⏳ Pending | Awaiting platform launch |
| Homeowner Service Request Form | ⏳ Pending | |
| Contractor Bidding / Estimate Upload | ⏳ Pending | |
| Homeowner Estimate Selection & Deposit | ⏳ Pending | |
| Work Order Generation & DocuSign | ⏳ Pending | |
| Admin Dashboard – Approval Flow | ⏳ Pending | |
| Technician Work Order Receipt | ⏳ Pending | |
| Email Trigger Verification | ⏳ Pending | |
| DocuSign Document Verification | ⏳ Pending | |
| Resale Certificate Flow | ⏳ Pending | |
| Software Bid / Device Source Scenarios | ⏳ Pending | |
| **Agent Upload Invite – Contractor Sends Invite** | ⏳ Pending | |
| **Agent Upload Invite – Insurance Agent Uploads Docs** | ⏳ Pending | |
| **Agent Upload Invite – Contractor Views & Revokes** | ⏳ Pending | |
| **Agent Upload Invite – Security Controls** | ⏳ Pending | |
| **Agent Upload Invite – Doc Type Restrictions** | ⏳ Pending | |
| **Agent Upload Invite – Edge Cases** | ⏳ Pending | |

**Status Legend:** ✅ Pass | ❌ Fail | ⚠️ Partial | ⏳ Pending | 🔄 In Progress

---

## Bugs Found Today

| Bug ID | Title | Severity | Workflow | Status |
|--------|-------|----------|----------|--------|
| BUG-001 | _See bug-reports/_ | | | Open |

_Link each bug to its full report in `/qa/bug-reports/`._

---

## Screenshots Captured

| Workflow | Filename | Description |
|----------|----------|-------------|
| | | |

_Link to `/qa/screenshots/<workflow>/` for full captures._

---

## Email / DocuSign Checklist

| Trigger | Expected Email/Doc | Received? | Notes |
|---------|--------------------|-----------|-------|
| Homeowner submits service request | Confirmation email to homeowner | ⏳ | |
| Agent linked via referral link | Welcome/notification email to agent | ⏳ | |
| Contractor bid submitted | Notification to homeowner/admin | ⏳ | |
| Homeowner selects estimate | Deposit/confirmation email | ⏳ | |
| Work order created | Email + DocuSign to contractor | ⏳ | |
| DocuSign completed | Notification to all parties | ⏳ | |
| Admin approves work | Email notification | ⏳ | |
| Payment processed | Receipt email | ⏳ | |
| **Contractor sends upload invite** | **Secure upload link email to insurance agent** | ⏳ | |
| **Insurance agent uploads documents** | **Confirmation / notification to contractor** | ⏳ | |
| **Contractor revokes invite** | **Revocation notification email to insurance agent** | ⏳ | |
| **Upload link expires (7 days)** | **Expiry notification to contractor (if applicable)** | ⏳ | |

---

## Blockers / Open Questions

1. _Platform endpoint URLs not yet confirmed – awaiting launch or staging access link._
2. _Add blockers as discovered._

---

## Tomorrow's Plan

- [ ] Execute agent referral link flow (Method 1) as soon as platform is live
- [ ] Execute homeowner agent-email link flow (Method 2)
- [ ] Test contractor bidding workflow end-to-end
- [ ] Verify all email triggers and DocuSign documents
- [ ] Test Agent Upload Invite System: contractor sends invite, agent uploads, contractor verifies
- [ ] Validate security controls: revoked link, expired link, no browse access, URL manipulation
- [ ] Validate upload restrictions: only COI/Endorsement allowed via agent link
- [ ] Document all findings and upload to Google Drive

---

## Notes / Observations

_General observations about the platform, UX, wording, or workflow logic. Include positive findings too._

---

**Submitted to:** Christopher (chris@mrsurety.com)  
**Google Drive Folder:** [insert link here]
