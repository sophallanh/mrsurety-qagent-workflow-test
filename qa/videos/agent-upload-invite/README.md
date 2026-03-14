# Video Recording Guide – Agent Upload Invite System

Place screen recordings for the **Agent Upload Invite System** workflow in this folder.

## Naming Convention

`<step>_<description>_<YYYY-MM-DD>.<ext>`

## Contractor Invite Scenarios to Record

| # | Scenario | Filename |
|---|----------|----------|
| 1 | Contractor navigates to Documents page and sees Invite section | `01_contractor-invite-section.mp4` |
| 2 | Contractor enters insurance agent email and sends invite | `02_contractor-sends-invite.mp4` |
| 3 | Contractor views active invite list (with email and doc count) | `03_contractor-active-invite-list.mp4` |
| 4 | Contractor revokes an active invite | `04_contractor-revokes-invite.mp4` |
| 5 | Contractor sees uploaded documents appear after agent upload | `05_contractor-sees-agent-uploads.mp4` |

## Insurance Agent Scenarios to Record

| # | Scenario | Filename |
|---|----------|----------|
| 6 | Insurance agent receives upload invite email | `06_agent-invite-email-received.mp4` |
| 7 | Insurance agent opens secure link (no login required) | `07_agent-opens-secure-link.mp4` |
| 8 | Insurance agent views document checklist (uploaded vs needed) | `08_agent-views-checklist.mp4` |
| 9 | Insurance agent selects files and fills in metadata | `09_agent-selects-files-metadata.mp4` |
| 10 | Insurance agent uploads all files successfully | `10_agent-upload-success.mp4` |

## Security and Restriction Scenarios to Record

| # | Scenario | Filename |
|---|----------|----------|
| 11 | Revoked link shows access-denied page | `security_01_revoked-link-denied.mp4` |
| 12 | Expired link (>7 days) shows expiry page | `security_02_expired-link-denied.mp4` |
| 13 | No view/download/delete buttons visible on agent upload page | `security_03_no-view-download-delete.mp4` |
| 14 | URL manipulation gives access-denied to another contractor | `security_04_url-manipulation-denied.mp4` |
| 15 | Only COI and Endorsement types shown in doc type dropdown | `restriction_01_allowed-types-only.mp4` |

## Recording Tips

- Show the full secure link URL when the agent opens it.
- For security tests, show the attempt and resulting error page clearly.
- Record the contractor's view before and after the agent uploads documents.
