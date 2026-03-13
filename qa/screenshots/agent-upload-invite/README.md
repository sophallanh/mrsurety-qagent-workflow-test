# Screenshots – Agent Upload Invite System

Place screenshots from the **Agent Upload Invite System** workflow in this folder.

## Naming Convention

`<step-number>_<short-description>_<YYYY-MM-DD>.png`  
`security_<step-number>_<short-description>_<YYYY-MM-DD>.png`  
`restriction_<step-number>_<short-description>_<YYYY-MM-DD>.png`  
`edge_<step-number>_<short-description>_<YYYY-MM-DD>.png`

---

## Contractor Workflow – Steps to Capture

| Step | Filename | Description |
|------|----------|-------------|
| 1 | `01_contractor-documents-page.png` | Contractor's Documents page showing the "Invite Agent to Upload Documents" section at the top |
| 2 | `02_contractor-invite-email-entered.png` | Insurance agent's email typed into the invite field |
| 3 | `03_contractor-invite-sent-confirmation.png` | Confirmation shown after clicking Send Invite |
| 4 | `04_contractor-active-invite-list.png` | Active invites list with email, doc count, and Revoke button |
| 9 | `09_contractor-uploaded-coi-visible.png` | Contractor's Documents page showing the COI uploaded by the agent |
| 10 | `10_contractor-invite-doc-count-updated.png` | Invite list showing incremented doc count after agent upload |
| 11 | `11_contractor-invite-revoked.png` | Invite removed from list after contractor revokes access |

---

## Insurance Agent Workflow – Steps to Capture

| Step | Filename | Description |
|------|----------|-------------|
| 5 | `05_agent-upload-page-loaded.png` | Agent lands on upload page via secure link — no login screen |
| 6 | `06_agent-doc-checklist-uploaded-vs-needed.png` | Checklist showing which doc types are already uploaded vs still needed |
| 7 | `07_agent-files-selected-metadata-filled.png` | Multiple files selected; doc type, carrier name, and effective date filled per file |
| 8 | `08_agent-upload-success.png` | Success message after clicking "Upload All" |

---

## Security Controls – Captures

| Step | Filename | Description |
|------|----------|-------------|
| – | `security_01_revoked-link-error-page.png` | Error page shown when a revoked link is accessed |
| – | `security_02_expired-link-error-page.png` | Error page shown when a >7-day expired link is accessed |
| – | `security_03_no-view-download-delete-buttons.png` | Agent upload page with zero view/download/delete buttons visible |
| – | `security_04_invalid-token-access-denied.png` | Access denied page when guessing or manipulating the URL token |

---

## Upload Restrictions – Captures

| Step | Filename | Description |
|------|----------|-------------|
| – | `restriction_01_allowed-doc-types-available.png` | Doc type dropdown showing only COI and Endorsement options |
| – | `restriction_02_restricted-doc-types-absent.png` | Confirm CSLB Card, W-9, Bond, and Photo ID are NOT in the dropdown |

---

## Edge Case – Captures

| Step | Filename | Description |
|------|----------|-------------|
| – | `edge_01_invalid-email-validation-error.png` | Validation error when contractor enters a non-email value |
| – | `edge_02_duplicate-invite-warning.png` | Warning when contractor tries to send a second invite to the same email |
| – | `edge_03_upload-missing-metadata-error.png` | Error when agent clicks Upload All without filling in doc type / carrier / date |
| – | `edge_04_upload-no-files-error.png` | Error message when agent clicks Upload All with no files selected |

> 🐛 Capture any unexpected behaviors, error messages, or missing UI elements and log them in `/qa/bug-reports/`.
