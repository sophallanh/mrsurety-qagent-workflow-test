# Screenshots – Edge Cases

Place screenshots from **edge case and special scenario** testing in this folder.

## Naming Convention

`<scenario-name>_<YYYY-MM-DD>.png`

## Edge Cases to Test and Capture

### General Platform Edge Cases

| Scenario | Filename |
|----------|----------|
| Homeowner submits with no agent email | `edge_no-agent-email-submit.png` |
| Agent referral link opened from mobile device | `edge_referral-link-mobile.png` |
| Contractor uploads unsupported file type | `edge_contractor-invalid-file-upload.png` |
| Homeowner selects calendar date in the past | `edge_homeowner-past-date-selected.png` |
| Admin approves job with missing contractor documents | `edge_admin-incomplete-contractor-docs.png` |
| Multiple contractors bid on the same job | `edge_multiple-contractor-bids.png` |
| Software bid scenario (no on-site visit) | `edge_software-bid-scenario.png` |
| Resale certificate flow triggered | `edge_resale-certificate-flow.png` |
| Device source: mobile vs. desktop service request | `edge_mobile-vs-desktop-source.png` |
| DocuSign declined by signee | `edge_docusign-declined.png` |
| Payment fails during deposit | `edge_payment-failure.png` |

### Agent Upload Invite System Edge Cases

| Scenario | Filename |
|----------|----------|
| Contractor enters invalid (non-email) value in invite field | `edge_invite-invalid-email-error.png` |
| Contractor sends duplicate invite to an already-active agent email | `edge_invite-duplicate-warning.png` |
| Insurance agent clicks Upload All with no files selected | `edge_invite-upload-no-files.png` |
| Insurance agent attempts upload without filling in metadata (type/carrier/date) | `edge_invite-upload-missing-metadata.png` |
| Insurance agent tries to access revoked upload link | `edge_invite-revoked-link-denied.png` |
| Insurance agent tries to access expired (>7 day) upload link | `edge_invite-expired-link-denied.png` |
| Insurance agent attempts URL manipulation to reach another contractor | `edge_invite-url-manipulation-denied.png` |
| Insurance agent tries to upload a restricted doc type (CSLB, W-9, Bond, Photo ID) | `edge_invite-restricted-doc-type.png` |
| Multiple insurance agents invited by same contractor simultaneously | `edge_invite-multiple-active-invites.png` |

> 🐛 Document all unexpected behaviors with full screenshots and notes in the bug log.
