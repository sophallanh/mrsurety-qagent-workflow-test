# Video Recording Guide – Email & DocuSign Triggers

Place screen recordings for **email and DocuSign trigger verification** in this folder.

## Naming Convention

`<trigger>_<description>_<YYYY-MM-DD>.<ext>`

## ⚠️ Note on Email Recording

To verify emails, use a test inbox service (e.g., Mailosaur, Mailtrap) or the test accounts created for QA. Record both:
1. The **inbox view** – showing the email subject and sender
2. The **open email** – showing the full body and any links

## Email Trigger Scenarios to Record

| # | Trigger | Filename |
|---|---------|----------|
| 1 | Homeowner receives service request confirmation | `email_01_homeowner-confirmation.mp4` |
| 2 | Agent receives referral link notification | `email_02_agent-referral-notification.mp4` |
| 3 | Admin receives pending agent alert | `email_03_admin-pending-agent-alert.mp4` |
| 4 | Agent receives welcome email after admin approval | `email_04_agent-welcome-approved.mp4` |
| 5 | Homeowner receives bid notification | `email_05_homeowner-bid-notification.mp4` |
| 6 | Contractor receives bid selected notification | `email_06_contractor-bid-selected.mp4` |
| 7 | Homeowner receives deposit receipt | `email_07_homeowner-deposit-receipt.mp4` |
| 8 | Work order email sent to contractor and technician | `email_08_work-order-created.mp4` |
| 9 | DocuSign email sent to each party | `email_09_docusign-sent.mp4` |
| 10 | DocuSign completed confirmation | `email_10_docusign-completed.mp4` |
| 11 | Final payment receipt | `email_11_final-payment-receipt.mp4` |

## DocuSign Document Recording

For each DocuSign document, scroll through **every page** slowly before signing:

| # | Document | Filename |
|---|----------|----------|
| D1 | Work Order / Contract (all pages) | `docusign_01_work-order-contract.mp4` |
| D2 | Resale Certificate (all pages) | `docusign_02_resale-certificate.mp4` |
| D3 | Completion Sign-off (all pages) | `docusign_03_completion-signoff.mp4` |
| D4 | Technician Work Order Receipt (all pages) | `docusign_04_tech-work-order-receipt.mp4` |
| D5 | Lien Waiver (all pages) | `docusign_05_lien-waiver.mp4` |

## Recording Tips

- Go slowly through DocuSign documents – Christopher needs to review all verbiage.
- Show the email subject line and sender clearly in the inbox view.
- Capture any error, delay, or missing email as a separate clip and log it as a bug.
