# Agent Upload Invite System – Feature Specification

**Feature:** Agent Upload Invite System  
**Platform:** MrSurety Contractor Portal  
**Spec Source:** Christopher (Platform Owner) – Internal Announcement  
**Date Documented:** 2026-03-13  
**Documented by:** Sophal Lanh (QA)

---

## Overview

The Agent Upload Invite System allows a **contractor** to invite their external insurance agent to upload insurance documents (COIs and endorsements) directly to the contractor's profile on the MrSurety platform — **without requiring the insurance agent to have a platform account**.

This system closes the gap where contractors need to obtain and manually upload insurance documents from their insurance brokers. The agent receives a time-limited, secure link via email and can upload documents directly.

---

## Contractor Side

### Location
- Found on the contractor's **Documents page**
- Displayed as a **new section at the top** of the page, titled **"Invite Agent to Upload Documents"**

### Sending an Invite
1. Contractor enters the insurance agent's email address into the invite field
2. Contractor clicks **Send Invite**
3. The insurance agent receives an email containing a **secure upload link**

### Active Invite Management
The contractor can see a list of all active invites that shows:
- The insurance agent's email address
- The number of documents uploaded through each invite link
- A **Revoke** button to immediately cancel the agent's access

### Revocation
- The contractor can revoke any active invite at any time by clicking the **Revoke** button
- Revocation takes effect immediately
- The previously issued link becomes invalid

---

## Insurance Agent Side

### Access
- The agent receives an email containing a secure upload link
- The agent clicks the link — **no platform login or account creation required**
- The agent lands directly on the secure upload page for that specific contractor

### Document Checklist
- The upload page displays a checklist of **all insurance document types** the contractor needs
- Each checklist item shows whether it has already been uploaded or is still needed
- This helps the agent know which documents to provide

### Uploading Documents
The agent can:
1. **Select multiple files at once** using the file picker
2. For each file, assign:
   - **Document Type** (COI or Endorsement only — see restrictions below)
   - **Carrier Name** (the insurance carrier's name)
   - **Effective Date** (the policy/endorsement effective date)
3. Click **Upload All** to submit all files in one action
4. All uploaded files save directly to that contractor's profile on the platform

---

## Security Model

The Agent Upload Invite System is **not open access**. The following controls are in place:

| Security Control | Description |
|-----------------|-------------|
| **Contractor Initiates** | Only the contractor can create an invite. The agent cannot request access themselves. |
| **Unique Secure Link** | Each invite generates a unique token-based link locked to one specific contractor. |
| **Upload Only** | The agent can **only upload** files. They cannot view, download, or delete existing contractor documents. |
| **7-Day Expiry** | Each invite link automatically expires after **7 days** from the time it was created. |
| **Instant Revocation** | The contractor can revoke any active invite at any time from their Documents page. |
| **No Browse Access** | Without the exact link and valid token, there is zero access to the system — no browsing, no searching, no way to enumerate other contractors. |
| **URL Manipulation Rejected** | Attempts to access the upload route with an invalid, revoked, or expired token return an error page. |

---

## Document Type Restrictions

| Document Type | Allowed via Agent Upload Link | Notes |
|--------------|------------------------------|-------|
| COI (Certificate of Insurance) | ✅ Yes | Insurance agent can upload |
| Endorsement | ✅ Yes | Insurance agent can upload |
| CSLB Card | ❌ No | Contractor must upload directly |
| W-9 | ❌ No | Contractor must upload directly |
| Bond | ❌ No | Contractor must upload directly |
| Photo ID | ❌ No | Contractor must upload directly |

> **Rationale:** Only insurance-specific documents (COIs and endorsements) may be uploaded by the external insurance agent. All other documents must be provided directly by the contractor.

---

## UI Element Reference (for QA Test Selectors)

| Element | `data-testid` |
|---------|---------------|
| "Invite Agent to Upload Documents" section | `invite-agent-section` |
| Insurance agent email input | `invite-agent-email` |
| Send Invite button | `send-invite-btn` |
| Invite sent confirmation | `invite-sent-confirmation` |
| Active invite list item | `active-invite-item` |
| Documents uploaded count per invite | `invite-doc-count` |
| Revoke invite button | `revoke-invite-btn` |
| Revoke confirmation dialog | `revoke-confirm-dialog` |
| Confirm revoke (Yes) | `revoke-confirm-yes` |
| Revoke success toast | `invite-revoked-toast` |
| Agent upload page (secure link landing) | `agent-upload-page` |
| Document checklist | `doc-checklist` |
| Checklist item – still needed | `doc-checklist-item-needed` |
| Select files button | `select-files-btn` |
| Per-file row in upload queue | `upload-file-row` |
| Document type dropdown (per file) | `doc-type-select` |
| Carrier name input (per file) | `carrier-name` |
| Effective date input (per file) | `effective-date` |
| Upload All button | `upload-all-btn` |
| Upload success message | `upload-success-message` |
| Link revoked error page | `link-revoked-page` |
| Link expired error page | `link-expired-page` |
| Link invalid error page | `link-invalid-page` |
| Download button (should NOT appear) | `download-doc-btn` |
| View button (should NOT appear) | `view-doc-btn` |
| Delete button (should NOT appear) | `delete-doc-btn` |
| Invite email validation error | `invite-email-error` |
| Duplicate invite warning | `invite-duplicate-warning` / `invite-already-active` |
| Metadata validation error | `metadata-validation-error` |
| No files selected error | `no-files-selected-error` |

---

## Email Triggers

| Event | Recipient | Expected Email Content |
|-------|-----------|----------------------|
| Contractor sends invite | Insurance Agent | Email with the secure upload link and contractor name |
| Agent uploads documents | Contractor (optional) | Notification that documents were uploaded |
| Contractor revokes invite | Insurance Agent (optional) | Notification that the link has been revoked |
| Link expires after 7 days | Contractor (optional) | Notification if link was never used |

> ⚠️ Confirm exact email trigger behavior with Christopher — the spec above reflects expected behavior based on the system description.

---

## QA Testing Notes

- **Environment Variable Required:** Set `AGENT_UPLOAD_LINK` to the secure upload URL extracted from the invite email before running agent-side tests.
- **Set `REVOKED_UPLOAD_LINK`** to a previously-revoked upload URL for revocation security tests.
- **Set `EXPIRED_UPLOAD_LINK`** to an upload URL that is more than 7 days old for expiry tests.
- **Sample fixture files** (`sample-coi.pdf`, `sample-endorsement.pdf`) must be placed in `tests/playwright/fixtures/` before running upload tests.
- Tests that depend on these variables or fixture files will **auto-skip** with a clear message if they are not set.

---

## Related Test File

`tests/playwright/agent-upload-invite.spec.ts`

Test suites covered:
1. Contractor – Send Upload Invite to Insurance Agent
2. Insurance Agent – Access Secure Link and Upload Documents
3. Contractor – Verify Uploads and Revoke Invite
4. Security – Agent Upload Invite System
5. Upload Restrictions – Insurance Docs Only
6. Edge Cases – Agent Upload Invite System
