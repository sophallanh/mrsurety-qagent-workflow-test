# Videos – Agent Upload Invite System

Place screen recordings from the **Agent Upload Invite System** workflow in this folder.

## Naming Convention

`<step>_<short-description>_<YYYY-MM-DD>.<ext>`  
`security_<step>_<short-description>_<YYYY-MM-DD>.<ext>`  
`edge_<step>_<short-description>_<YYYY-MM-DD>.<ext>`

---

## Recommended Recordings

| Recording | Suggested Filename | Description |
|-----------|--------------------|-------------|
| Contractor sends invite | `contractor-sends-invite_<YYYY-MM-DD>.mp4` | Contractor navigates to Documents page, enters agent email, clicks Send Invite, and sees confirmation |
| Agent opens link and uploads | `agent-upload-full-flow_<YYYY-MM-DD>.mp4` | Insurance agent opens secure link, sees checklist, selects files, fills metadata, clicks Upload All |
| Contractor verifies and revokes | `contractor-verify-and-revoke_<YYYY-MM-DD>.mp4` | Contractor sees uploaded COI, checks doc count on invite, then revokes the invite |
| Security – revoked link | `security-revoked-link_<YYYY-MM-DD>.mp4` | Revoked link returns error/access-denied page |
| Security – expired link | `security-expired-link_<YYYY-MM-DD>.mp4` | Expired (>7-day) link returns link-expired page |
| Security – no view/download/delete | `security-no-view-download-delete_<YYYY-MM-DD>.mp4` | Agent upload page with zero view/download/delete buttons visible |
| Security – URL manipulation | `security-url-manipulation_<YYYY-MM-DD>.mp4` | Access denied when guessing or altering token in the URL |
| Upload restriction – COI only | `restriction-coi-endorsement-only_<YYYY-MM-DD>.mp4` | Doc type dropdown shows only COI/Endorsement; CSLB, W-9, Bond, Photo ID are absent |
| Edge – duplicate invite | `edge-duplicate-invite-warning_<YYYY-MM-DD>.mp4` | Contractor sends invite to same email twice and sees warning |
| Edge – invalid email | `edge-invalid-email-error_<YYYY-MM-DD>.mp4` | Contractor enters non-email value and sees validation error |
| Edge – missing metadata | `edge-missing-metadata-error_<YYYY-MM-DD>.mp4` | Agent clicks Upload All without filling doc type / carrier / date |

---

## Recording Guidelines

- Record at full resolution (1920×1080 recommended)
- Keep each recording focused on one scenario
- Trim dead time at the start and end
- Narration is optional but helpful for async review by Christopher
- Recommended tools: QuickTime (Mac), Loom, OBS Studio
- Upload to the Google Drive folder `MrSurety QA – [Your Name]/Videos/Agent Upload Invite System/`

> 🐛 If you record an unexpected error or UX issue, save the video with a `bug_` prefix and log the bug in `/qa/bug-reports/bug_report_log.csv`.
