# Screenshots – Email & DocuSign Triggers

Place screenshots verifying **email and DocuSign trigger** delivery in this folder.

> **Source:** Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM" – Parts 3 & 4  
> **Target:** Document every email and DocuSign document with screenshots.

## Naming Convention

`email_<XX>_<role>-<description>_YYYY-MM-DD.png`  
`docusign_<DX>_<document-name>_<page-or-type>.png`

---

## Email Screenshots Checklist

Capture the full **inbox entry** (subject, sender, preview) AND the **opened email body** for each trigger.

### Homeowner Emails (14 triggers)

| # | Email | Trigger | Filename | Done? |
|---|-------|---------|----------|-------|
| H1 | Welcome – Account Created | Signup | `email_H1_homeowner-welcome.png` | ☐ |
| H2 | Service Request Received | Form submit | `email_H2_homeowner-service-request-received.png` | ☐ |
| H3 | Estimates Ready | First contractor bid | `email_H3_homeowner-estimates-ready.png` | ☐ |
| H4 | Deposit Required | Contractor selected | `email_H4_homeowner-deposit-required.png` | ☐ |
| H5 | Installation Confirmed | Deposit paid | `email_H5_homeowner-installation-confirmed.png` | ☐ |
| H6 | Reminder – Tomorrow | 24hr before service | `email_H6_homeowner-tomorrow-reminder.png` | ☐ |
| H7 | Contractor Arrived | Check-in | `email_H7_homeowner-contractor-arrived.png` | ☐ |
| H8 | Change Order Created | Contractor creates change order | `email_H8_homeowner-change-order-created.png` | ☐ |
| H9 | Critical Release Required | Emergency service | `email_H9_homeowner-critical-release-required.png` | ☐ |
| H10 | Work Complete – Final Payment | Job done | `email_H10_homeowner-work-complete-final-payment.png` | ☐ |
| H11 | Payment Received | Final paid | `email_H11_homeowner-payment-received.png` | ☐ |
| H12 | Certificate Ready | All signed | `email_H12_homeowner-certificate-ready.png` | ☐ |
| H13 | Return Service Scheduled | Return booked | `email_H13_homeowner-return-service-scheduled.png` | ☐ |
| H14 | Anniversary Reminder | 11 months | `email_H14_homeowner-anniversary-reminder.png` | ☐ |

### Contractor Emails (12 triggers)

| # | Email | Trigger | Filename | Done? |
|---|-------|---------|----------|-------|
| C1 | Welcome Contractor | Admin approves | `email_C1_contractor-welcome.png` | ☐ |
| C2 | New Job in Area | Request posted | `email_C2_contractor-new-job-in-area.png` | ☐ |
| C3 | Bid Received | Bid submitted | `email_C3_contractor-bid-received.png` | ☐ |
| C4 | Selected for Job | Homeowner selects | `email_C4_contractor-selected-for-job.png` | ☐ |
| C5 | Sign Work Order (DocuSign) | Deposit paid | `email_C5_contractor-sign-work-order.png` | ☐ |
| C6 | Job Tomorrow Reminder | 24hr before | `email_C6_contractor-job-tomorrow-reminder.png` | ☐ |
| C7 | Sign Affidavit / Lien (DocuSign) | Job complete | `email_C7_contractor-sign-affidavit-lien.png` | ☐ |
| C8 | Payment Sent | Admin approves | `email_C8_contractor-payment-sent.png` | ☐ |
| C9 | Unconditional Lien Required | Payment clears | `email_C9_contractor-unconditional-lien-required.png` | ☐ |
| C10 | Critical Assignment | Emergency | `email_C10_contractor-critical-assignment.png` | ☐ |
| C11 | Return Service Work Order | Return requested | `email_C11_contractor-return-service-work-order.png` | ☐ |
| C12 | Change Order Approved | Homeowner approves | `email_C12_contractor-change-order-approved.png` | ☐ |

### Agent Emails (7 triggers)

| # | Email | Trigger | Filename | Done? |
|---|-------|---------|----------|-------|
| A1 | Welcome Agent | Account created | `email_A1_agent-welcome.png` | ☐ |
| A2 | Client Started Request | Client uses link | `email_A2_agent-client-started-request.png` | ☐ |
| A3 | Client Selected Contractor | Job confirmed | `email_A3_agent-client-selected-contractor.png` | ☐ |
| A4 | Client Critical Service | Emergency | `email_A4_agent-client-critical-service.png` | ☐ |
| A5 | Client Installation Complete | Work done | `email_A5_agent-client-installation-complete.png` | ☐ |
| A6 | Certificate Ready | All signed | `email_A6_agent-certificate-ready.png` | ☐ |
| A7 | Client Renewal Reminder | 11 months | `email_A7_agent-client-renewal-reminder.png` | ☐ |

### Technician Emails (4 triggers)

| # | Email | Trigger | Filename | Done? |
|---|-------|---------|----------|-------|
| T1 | Welcome Technician | Account created | `email_T1_tech-welcome.png` | ☐ |
| T2 | New Assessment | Assessment paid | `email_T2_tech-new-assessment.png` | ☐ |
| T3 | Assessment Reminder | 24hr before | `email_T3_tech-assessment-reminder.png` | ☐ |
| T4 | Report Upload Required | Visit done | `email_T4_tech-report-upload-required.png` | ☐ |

### Admin Emails (4 triggers)

| # | Email | Trigger | Filename | Done? |
|---|-------|---------|----------|-------|
| AD1 | New Contractor Application | Contractor signs up | `email_AD1_admin-new-contractor-application.png` | ☐ |
| AD2 | Work Ready for Approval | Job complete | `email_AD2_admin-work-ready-for-approval.png` | ☐ |
| AD3 | Critical Service Alert | Emergency | `email_AD3_admin-critical-service-alert.png` | ☐ |
| AD4 | Quarterly Tax Report | Quarter end | `email_AD4_admin-quarterly-tax-report.png` | ☐ |

---

## DocuSign Document Screenshots Checklist

For each DocuSign document, capture **every page** of the document, not just the signature page.

| # | Document | Sent To | Trigger | Filename | Done? |
|---|----------|---------|---------|----------|-------|
| D1 | Contractor Master Services Agreement | Contractor | Joins network | `docusign_D1_master-services-agreement_page1.png` | ☐ |
| D1 sig | Master Services Agreement – Signature | Contractor | Joins network | `docusign_D1_master-services-agreement_signature.png` | ☐ |
| D2 | Work Order / Task Contract – Page 1 | Contractor | Deposit paid | `docusign_D2_work-order-contract_page1.png` | ☐ |
| D2p2 | Work Order / Task Contract – Page 2 | Contractor | Deposit paid | `docusign_D2_work-order-contract_page2.png` | ☐ |
| D2 sig | Work Order / Task Contract – Signature | Contractor | Deposit paid | `docusign_D2_work-order-contract_signature.png` | ☐ |
| D3 | Critical Change Order and Liability Release | Homeowner | Emergency | `docusign_D3_critical-change-order_page1.png` | ☐ |
| D3 sig | Critical Change Order – Signature | Homeowner | Emergency | `docusign_D3_critical-change-order_signature.png` | ☐ |
| D4 | Return Service Call Work Order | Contractor | Return requested | `docusign_D4_return-service-work-order_page1.png` | ☐ |
| D4 sig | Return Service Call Work Order – Signature | Contractor | Return requested | `docusign_D4_return-service-work-order_signature.png` | ☐ |
| D5 | Affidavit of Service | Contractor | Job complete | `docusign_D5_affidavit-of-service_page1.png` | ☐ |
| D5 sig | Affidavit of Service – Signature | Contractor | Job complete | `docusign_D5_affidavit-of-service_signature.png` | ☐ |
| D6 | Conditional Lien Release w/ Invoice – Page 1 | Contractor | Docs submitted | `docusign_D6_conditional-lien-release_page1.png` | ☐ |
| D6 init | Conditional Lien Release – Initials Page | Contractor | Docs submitted | `docusign_D6_conditional-lien-release_initials.png` | ☐ |
| D6 sig | Conditional Lien Release – Signature | Contractor | Docs submitted | `docusign_D6_conditional-lien-release_signature.png` | ☐ |
| D7 | Unconditional Lien Release | Contractor | Payment clears | `docusign_D7_unconditional-lien-release_page1.png` | ☐ |
| D7 sig | Unconditional Lien Release – Signature | Contractor | Payment clears | `docusign_D7_unconditional-lien-release_signature.png` | ☐ |
| D7 lock | Portal Access – LOCKED (before D7 signing) | Contractor | Before signing | `docusign_D7_portal-access-locked.png` | ☐ |
| D7 open | Portal Access – RESTORED (after D7 signing) | Contractor | After signing | `docusign_D7_portal-access-restored.png` | ☐ |
| D8 | Change Order – Full Document | Homeowner | During job | `docusign_D8_change-order_page1.png` | ☐ |
| D8 app | Change Order – Homeowner Approved | Homeowner | During job | `docusign_D8_change-order_approved.png` | ☐ |

---

## How to Capture Screenshots

1. Open the email or DocuSign document in full screen.
2. Use the system screenshot tool or browser's built-in capture.
3. Name the file according to the naming convention above.
4. Place the file in this folder: `qa/screenshots/email-docusign-triggers/`
5. Log any verbiage issues or discrepancies in `qa/bug-reports/bug_report_log.csv`.

> 🐛 **If an email is NOT received within 5 minutes of the trigger action, log it as a bug.**
> Capture missing, delayed, or incorrect email content.
> Capture all DocuSign document pages (not just the signature page).

