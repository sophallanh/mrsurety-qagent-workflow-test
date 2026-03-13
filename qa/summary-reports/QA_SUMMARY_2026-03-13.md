# MrSurety QA – Daily Summary Report

**Date:** 2026-03-13  
**Tester:** Sophal Lanh  
**Environment:** Staging / QA  
**Build / Version:** Pending staging access  
**Platform Status:** ⏳ Pending Launch

---

## Documents Reviewed Today

- [x] MR SURETY – TESTING GUIDE FOR QA TEAM (workflow guides)
- [x] Agent Upload Invite System – feature description from Christopher
- [x] Email & DocuSign Templates (spec-docs placeholders; awaiting actual PDFs from Christopher)
- [x] Admin Dashboard & Approval Workflow guides (spec-docs placeholders)
- [x] QA test user credentials (`TEST_USER_CREDENTIALS.md`)
- [x] Existing Playwright test specs (`agent-upload-invite.spec.ts`, `agent-referral-workflow.spec.ts`, etc.)

---

## Workflows Tested Today

| Workflow | Status | Notes |
|----------|--------|-------|
| Agent Referral Link – Method 1 | ⏳ Pending | Awaiting staging environment access |
| Homeowner Agent-Email Linking – Method 2 | ⏳ Pending | Awaiting staging environment access |
| Homeowner Service Request Form | ⏳ Pending | Awaiting staging environment access |
| Contractor Bidding / Estimate Upload | ⏳ Pending | Awaiting staging environment access |
| Homeowner Estimate Selection & Deposit | ⏳ Pending | Awaiting staging environment access |
| Work Order Generation & DocuSign | ⏳ Pending | Awaiting staging environment access |
| Admin Dashboard – Approval Flow | ⏳ Pending | Awaiting staging environment access |
| Technician Work Order Receipt | ⏳ Pending | Awaiting staging environment access |
| Email Trigger Verification | ⏳ Pending | Awaiting staging environment access |
| DocuSign Document Verification | ⏳ Pending | Awaiting staging environment access |
| **Agent Upload Invite – Contractor Sends Invite** | 🔄 In Progress | Spec reviewed; test selectors documented; automated spec complete; awaiting staging access |
| **Agent Upload Invite – Insurance Agent Uploads Docs** | 🔄 In Progress | Full flow specced in `agent-upload-invite.spec.ts`; needs AGENT_UPLOAD_LINK env var from real email |
| **Agent Upload Invite – Contractor Views & Revokes** | 🔄 In Progress | Covered in spec; awaiting staging access to validate |
| **Agent Upload Invite – Security Controls** | 🔄 In Progress | All 4 security scenarios covered in spec |
| **Agent Upload Invite – Doc Type Restrictions** | 🔄 In Progress | COI/Endorsement allow-list and CSLB/W-9/Bond/PhotoID block-list test cases written |
| **Agent Upload Invite – Edge Cases** | 🔄 In Progress | 4 edge cases written: invalid email, duplicate invite, missing metadata, no files selected |

**Status Legend:** ✅ Pass | ❌ Fail | ⚠️ Partial | ⏳ Pending | 🔄 In Progress

---

## What Was Completed Today

### 1. Document Review
- Read through Christopher's Agent Upload Invite System description in full
- Confirmed the feature spec aligns with the existing `agent-upload-invite.spec.ts` test coverage
- Documented the full spec in `qa/spec-docs/workflow-guides/AGENT_UPLOAD_INVITE_SYSTEM.md` for team reference

### 2. QA Test Suite Review
- Reviewed all 6 Playwright spec files (`41 tests` total):
  - `agent-referral-workflow.spec.ts` – 4 tests
  - `homeowner-service-request.spec.ts` – 4 tests (+ edge case)
  - `contractor-bidding.spec.ts` – 4 tests
  - `admin-dashboard.spec.ts` – 4 tests
  - `email-docusign-triggers.spec.ts` – 5 tests
  - `agent-upload-invite.spec.ts` – **20 tests** covering all 6 scenarios
- Confirmed all spec imports are correct (`./fixtures/test-users`)
- Confirmed all `data-testid` selectors match Christopher's described UI

### 3. Agent Upload Invite System – Spec Alignment Check
Verified that the Playwright tests cover every requirement from Christopher's feature description:

| Christopher's Requirement | Covered in Spec | Test(s) |
|--------------------------|----------------|---------|
| Documents page has "Invite Agent to Upload Documents" section | ✅ | `Contractor navigates to Documents page` |
| Contractor enters email and clicks Send Invite | ✅ | `Contractor enters insurance agent email and sends invite` |
| Agent receives secure upload link email | ✅ | Email trigger documented; link tested via `AGENT_UPLOAD_LINK` env var |
| Contractor sees active invites with doc count and Revoke button | ✅ | `Contractor can see the active invite in their invite list` |
| Agent opens link with no login required | ✅ | `Insurance agent opens secure upload link (no login required)` |
| Agent sees checklist of doc types (uploaded vs needed) | ✅ | `Agent sees document checklist with uploaded vs still-needed items` |
| Agent selects multiple files and assigns doc type, carrier, effective date | ✅ | `Agent selects multiple files and assigns metadata per file` |
| Upload All saves to contractor profile | ✅ | `Agent clicks Upload All and files save to contractor profile` |
| Contractor initiates (not agent) | ✅ | Architecture of invite flow |
| Unique secure link per contractor | ✅ | Token-based URL tested for isolation |
| Agent can ONLY upload (no view/download/delete) | ✅ | `Agent cannot view or download existing contractor documents` |
| Link expires after 7 days | ✅ | `Expired link (>7 days) shows link-expired page` |
| Contractor can revoke instantly | ✅ | `Contractor revokes the invite` |
| Revoked link shows error page | ✅ | `Revoked link shows access-denied / expired page` |
| No access without exact link | ✅ | `Agent cannot navigate to any other contractor via URL manipulation` |
| Only COI and Endorsement allowed | ✅ | `Allowed doc types (COI, Endorsement) are available in the type dropdown` |
| CSLB, W-9, Bond, Photo ID NOT in agent dropdown | ✅ | `Restricted doc types are NOT in the type dropdown` |

### 4. Test User Setup Reviewed
All test accounts confirmed in `test_users.csv` and `TEST_USER_CREDENTIALS.md`:
- `agent.test1` – Alex Johnson (Surety Realty) – Primary agent tester
- `agent.test2` – Maria Garcia (HomeGuard Agency) – Secondary agent
- `homeowner.test1` – Sam Williams – Standard homeowner
- `homeowner.test2` – Jamie Lee – Linked via referral to agent.test1
- `homeowner.test3` – Chris Brown – Edge case: no agent email
- `contractor.test1` – Bob Miller (Miller Construction LLC) – Primary contractor
- `contractor.test2` – Linda Chen (Chen Builders Inc) – Secondary contractor
- `tech.test1` – Dave Torres – Assigned technician
- `admin.qa` – QA Admin – Admin approvals
- `ins.agent.test` – Rachel Kim (Kim Insurance Brokers) – External insurance agent (no platform account)

---

## Bugs Found Today

| Bug ID | Title | Severity | Workflow | Status |
|--------|-------|----------|----------|--------|
| — | No bugs found today (platform not yet accessible; code review only) | — | — | — |

> ⚠️ **Note:** Platform staging environment is not yet accessible for hands-on testing. All reviews today were document and code-based. Bug discovery will begin once staging access is confirmed.

---

## Screenshots Captured

| Workflow | Filename | Description |
|----------|----------|-------------|
| — | — | No screenshots today (awaiting staging access) |

---

## Email / DocuSign Checklist

| Trigger | Expected Email/Doc | Reviewed Spec? | Notes |
|---------|--------------------|----------------|-------|
| Homeowner submits service request | Confirmation email to homeowner | ✅ | Email template placeholder in spec-docs |
| Agent linked via referral link | Welcome/notification email to agent | ✅ | Covered in `email-docusign-triggers.spec.ts` |
| Admin receives pending agent alert | Admin alert email | ✅ | Covered in spec |
| Work order created | Email + DocuSign to contractor | ✅ | Covered in spec |
| DocuSign completed | Notification to all parties | ✅ | Covered in spec |
| **Contractor sends upload invite** | **Secure upload link email to insurance agent** | ✅ | Documented in Agent Upload Invite spec |
| **Agent uploads documents** | **Notification to contractor** | ✅ | Listed as expected trigger in spec |
| **Contractor revokes invite** | **Revocation notification to insurance agent** | ✅ | Listed as expected trigger in spec |
| **Link expires (7 days)** | **Expiry notification to contractor** | ✅ | Listed as expected trigger in spec |

---

## Blockers / Open Questions

1. **Staging environment access URL not yet confirmed** – Need `MRSURETY_BASE_URL` to run Playwright tests against staging. Please share staging URL.
2. **Real invite email needed for `AGENT_UPLOAD_LINK`** – To run the agent-side upload tests, need a real test invite email sent to `ins.agent.test@mrsurety-qa.com`. Recommend using Mailtrap or Mailosaur.
3. **Sample COI/Endorsement PDF files** – Need `sample-coi.pdf` and `sample-endorsement.pdf` added to `tests/playwright/fixtures/` for upload tests to run.
4. **Actual spec documents from Christopher** – PDFs/DOCXs for `workflow-guides/`, `email-templates/`, `docusign-templates/`, `admin-guides/` are still placeholder. Requesting originals.
5. **Are revoke notification emails sent to the agent?** – The spec says the contractor can revoke instantly, but it's unclear if the agent receives a notification email. Confirm with Christopher.
6. **Does the upload link email include contractor name/branding?** – Confirm email template content with Christopher before email trigger tests.

---

## Tomorrow's Plan

- [ ] Confirm staging environment URL with Christopher
- [ ] Set up Mailtrap/Mailosaur to capture test invite emails and extract `AGENT_UPLOAD_LINK`
- [ ] Add `sample-coi.pdf` and `sample-endorsement.pdf` to `tests/playwright/fixtures/`
- [ ] Execute agent referral link flow (Method 1) as soon as platform is live
- [ ] Execute homeowner agent-email link flow (Method 2)
- [ ] Test Agent Upload Invite System end-to-end: contractor sends invite → agent uploads → contractor verifies
- [ ] Validate all security controls with real tokens (revoked, expired, invalid)
- [ ] Validate upload restrictions: only COI/Endorsement allowed via agent link
- [ ] Verify all email triggers and DocuSign documents
- [ ] Document all findings and upload screenshots to Google Drive

---

## Notes / Observations

- The **Agent Upload Invite System** spec is very well-thought-out from a security perspective. The token-based approach with contractor-initiated invites, 7-day expiry, and upload-only restrictions covers the main attack vectors.
- The `data-testid` selectors in `agent-upload-invite.spec.ts` align perfectly with Christopher's UI description — testing should be smooth once staging is accessible.
- Consider adding a **"copy link" button** to the contractor's active invite list in addition to the revoke button — would allow contractor to resend the link without sending a new email if the agent loses it. (Suggestion for Christopher, not a bug.)
- The wording "Invite Agent to Upload Documents" is clear and descriptive. No wording concerns on contractor side.

---

**Submitted to:** Christopher (Platform Owner)  
**Google Drive Folder:** [insert link here]  
**Next Check-in:** Tomorrow evening or upon receiving staging access
