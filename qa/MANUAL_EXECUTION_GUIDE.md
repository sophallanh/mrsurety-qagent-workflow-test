# MrSurety QA – Manual Execution Guide
**All 9 Workflows + Agent Upload Invite System**  
**Live App:** https://frontend-tan-five-46.vercel.app  
**Prepared by:** Sophal Lanh

> **📄 Master Reference:** Christopher's testing instructions are in this Google Doc — consult it first for any questions about expected behavior:  
> **https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing**  
> See also: `qa/spec-docs/CHRISTOPHER_TESTING_DOC.md` in this repo.

> **TL;DR:** Use OpenClaw to automate everything. See `qa/openclaw/RUN_TODAY.md` for the
> 4-command quick-start. This document provides the full step-by-step manual reference
> in case any workflow needs to be repeated or inspected by hand.

---

## Admin Credentials (Christopher's app)

| Email | Password |
|-------|----------|
| admin@mrsurety.com | MrSurety2026! |

---

## Pre-Flight: Create Outlook Inboxes

Before running any workflow, create real Outlook.com accounts for each test email:

| Email | Role | Purpose |
|-------|------|---------|
| agent.test1@outlook.com | Agent | Primary – referral link & QR code |
| agent.test2@outlook.com | Agent | Secondary – multi-agent scenarios |
| agent.test3@outlook.com | Agent | Third – upload invite & referral tests |
| homeowner.test2@outlook.com | Homeowner | Method A – uses referral link |
| homeowner.test1@outlook.com | Homeowner | Method B – enters agent email |
| homeowner.test3@outlook.com | Homeowner | Edge case – no agent |
| contractor.test1@outlook.com | Contractor | Primary – submits bids |
| contractor.test2@outlook.com | Contractor | Secondary – competing bids |
| contractor.test3@outlook.com | Contractor | Third – upload invite sender |
| tech.test1@outlook.com | Technician | Receives work order |
| ins.agent.test@outlook.com | Insurance Agent | Receives secure upload link (no platform account) |

**Password for all test accounts:** `QAtest@2026!`

---

## Workflow 1 – Admin Login & Dashboard

**URL:** https://frontend-tan-five-46.vercel.app/login  
**Account:** admin@mrsurety.com / MrSurety2026!

### Steps
1. Navigate to the login page
2. Enter admin email and password → click **Sign In**
3. Confirm redirect to `/dashboard` or `/admin`
4. Screenshot the full admin dashboard

### Screenshots to Capture
| # | Filename | What to Show |
|---|----------|-------------|
| 1 | `admin_01_dashboard.png` | Full admin dashboard after login |
| 2 | `admin_02_users_table.png` | Users table (all registered accounts) |
| 3 | `admin_03_service_requests.png` | Service requests list |

### Notes
- Note any wording that seems incorrect or unclear
- Confirm all sidebar navigation items are visible

---

## Workflow 2 – Agent Referral Link (Method 1)

**Account:** agent.test1@outlook.com / QAtest@2026!

### Steps
1. Sign up as Agent (if not already done): https://frontend-tan-five-46.vercel.app/signup
2. Log in as agent.test1@outlook.com
3. Navigate to the **Referral** section in the agent dashboard
4. Copy the referral link — save it (you'll use it in Workflow 3 Method A)
5. Click **Download QR Code** — verify download triggers
6. Go to **Clients** page — verify it's empty before any homeowners link

### Screenshots to Capture
| # | Filename | What to Show |
|---|----------|-------------|
| 1 | `agent_01_signup_form.png` | Agent signup form filled in |
| 2 | `agent_02_dashboard.png` | Agent dashboard after login |
| 3 | `agent_03_referral_section.png` | Referral link + code visible |
| 4 | `agent_04_qr_code.png` | QR code displayed |
| 5 | `agent_05_clients_empty.png` | Empty clients page (before linking) |

### Notes
- **IMPORTANT:** Each referral code is valid only for the specific service request it was
  created for. Generate a fresh referral link before each Workflow 3 run.
- Note the exact referral link — you'll paste it in Workflow 3 Method A.

---

## Workflow 3 – Homeowner Service Request Form (Both Methods)

### Method A – Homeowner Uses Referral Link

**Account:** homeowner.test2@outlook.com / QAtest@2026! (create new)  
**URL:** *(paste the referral link copied from Workflow 2)*

#### Steps
1. Open the referral link in an **incognito window** (so you're not logged in as agent)
2. Fill out the service request form as a new homeowner:
   - Name: Jamie Lee
   - Email: homeowner.test2@outlook.com
   - Password: QAtest@2026!
   - Address: 456 Oak Ave, Anaheim CA 92801
   - Permit type: Plumbing
3. Proceed to the **payment/deposit** step
4. Enter Stripe test card: `4242 4242 4242 4242` / exp `12/34` / CVV `123` / ZIP `42424`
5. Submit and confirm the success screen

#### Screenshots to Capture
| # | Filename | What to Show |
|---|----------|-------------|
| 1 | `homeowner_a_01_referral_landing.png` | Page that opens from referral link |
| 2 | `homeowner_a_02_form_filled.png` | Service request form filled in |
| 3 | `homeowner_a_03_stripe_form.png` | Stripe payment form |
| 4 | `homeowner_a_04_stripe_success.png` | Payment confirmation |
| 5 | `homeowner_a_05_agent_dashboard_linked.png` | Agent sees linked homeowner (log in as agent) |

---

### Method B – Homeowner Enters Agent Email

**Account:** homeowner.test1@outlook.com / QAtest@2026! (create new)  
**URL:** https://frontend-tan-five-46.vercel.app/service-request

#### Steps
1. Navigate to the service request form (NOT the referral link)
2. Fill out as a new homeowner:
   - Name: Sam Williams
   - Email: homeowner.test1@outlook.com
   - Password: QAtest@2026!
   - Address: 123 Main St, Los Angeles CA 90001
   - Permit type: Electrical
3. In the **insurance section**, enter agent email: `agent.test1@outlook.com`
4. Submit the form
5. Log in as admin → confirm "Pending Agent" shows in the admin dashboard
6. Admin approves the agent → confirm agent.test1 receives a welcome email

#### Screenshots to Capture
| # | Filename | What to Show |
|---|----------|-------------|
| 1 | `homeowner_b_01_form_with_agent_email.png` | Form with agent email field filled |
| 2 | `homeowner_b_02_form_submitted.png` | Confirmation after submit |
| 3 | `homeowner_b_03_admin_pending_agent.png` | Admin sees pending agent alert |
| 4 | `homeowner_b_04_admin_approves.png` | Admin clicks approve |
| 5 | `homeowner_b_05_agent_welcome_email.png` | Agent.test1 inbox — welcome email screenshot |

---

## Workflow 4 – Contractor Bidding & Estimate Upload

**Account:** contractor.test1@outlook.com / QAtest@2026!

### Steps
1. Sign up as Contractor: https://frontend-tan-five-46.vercel.app/signup
2. Wait for admin approval (or log in as admin and approve immediately)
3. Log in as contractor.test1@outlook.com
4. Go to **Jobs / Available Jobs**
5. Open the service request submitted in Workflow 3
6. Click **Submit Bid** → enter amount `$1,500.00`
7. Upload an estimate PDF (use any PDF as a placeholder)
8. Submit the bid

### Screenshots to Capture
| # | Filename | What to Show |
|---|----------|-------------|
| 1 | `contractor_01_dashboard.png` | Contractor dashboard |
| 2 | `contractor_02_job_list.png` | Available jobs list |
| 3 | `contractor_03_job_detail.png` | Job detail page |
| 4 | `contractor_04_bid_form.png` | Bid form filled in |
| 5 | `contractor_05_bid_submitted.png` | Bid submission success |

---

## Workflow 5 – Homeowner Estimate Selection & Deposit

**Account:** homeowner.test1@outlook.com / QAtest@2026!

### Steps
1. Log in as homeowner.test1@outlook.com
2. Go to **My Service Requests**
3. Open the request → click **View Estimates / Bids**
4. Review the bid from contractor.test1
5. Click **Select This Estimate**
6. Pick a calendar date for the work
7. Pay the deposit with Stripe test card: `4242 4242 4242 4242` / `12/34` / `123` / `42424`
8. Confirm payment success

### Screenshots to Capture
| # | Filename | What to Show |
|---|----------|-------------|
| 1 | `homeowner_deposit_01_estimate_list.png` | Estimates list with contractor bid |
| 2 | `homeowner_deposit_02_estimate_selected.png` | Estimate selection confirmation |
| 3 | `homeowner_deposit_03_calendar.png` | Date picker / calendar |
| 4 | `homeowner_deposit_04_stripe_form.png` | Stripe deposit form |
| 5 | `homeowner_deposit_05_payment_success.png` | Deposit confirmed |

---

## Workflow 6 – Work Order Generation & DocuSign

**Admin:** admin@mrsurety.com / MrSurety2026!  
**Contractor:** contractor.test1@outlook.com / QAtest@2026!

### Steps
1. Log in as admin → go to **Work Orders** / **Pending**
2. Locate the job where deposit was paid
3. Click **Generate Work Order**
4. Confirm DocuSign is triggered (admin sees confirmation message)
5. Log in as contractor.test1@outlook.com → check inbox for DocuSign email
6. Click the DocuSign link → view the work order document
7. Sign the DocuSign document
8. Confirm all parties receive notification

### Screenshots to Capture
| # | Filename | What to Show |
|---|----------|-------------|
| 1 | `workorder_01_admin_list.png` | Admin work orders list |
| 2 | `workorder_02_generate_btn.png` | Generate work order button |
| 3 | `workorder_03_generated.png` | Work order generated confirmation |
| 4 | `workorder_04_docusign_email.png` | Contractor inbox — DocuSign email |
| 5 | `workorder_05_docusign_document.png` | DocuSign document preview |
| 6 | `workorder_06_docusign_signed.png` | After signing |

---

## Workflow 7 – Admin Dashboard & Approval Flow

**Admin:** admin@mrsurety.com / MrSurety2026!

### Steps
1. Log in as admin
2. Review and approve any pending:
   - Contractor accounts waiting for approval
   - Agent accounts (from Method B)
   - Work orders pending admin sign-off
3. Check the **Agent-Homeowner Links** section
4. Check **Document Uploads** (contractor docs)
5. Check **Contractor Invites** (from Workflow 9)
6. Export/screenshot the full users table

### Screenshots to Capture
| # | Filename | What to Show |
|---|----------|-------------|
| 1 | `admin_wf7_01_pending_contractors.png` | Pending contractor approvals |
| 2 | `admin_wf7_02_approve_contractor.png` | Admin clicks approve |
| 3 | `admin_wf7_03_agent_homeowner_links.png` | Agent-homeowner connections |
| 4 | `admin_wf7_04_work_order_status.png` | Work order status board |
| 5 | `admin_wf7_05_document_uploads.png` | Uploaded contractor documents |

---

## Workflow 8 – Technician Work Order Receipt

**Account:** tech.test1@outlook.com / QAtest@2026!

### Steps
1. Sign up as Technician: https://frontend-tan-five-46.vercel.app/signup
2. Log in as tech.test1@outlook.com
3. Go to **My Jobs** / assigned work orders
4. Open the assigned work order
5. Click **View Work Order** → confirm document is visible
6. Click **Start Job** (if available) → confirm status updates

### Screenshots to Capture
| # | Filename | What to Show |
|---|----------|-------------|
| 1 | `technician_01_dashboard.png` | Technician dashboard |
| 2 | `technician_02_job_list.png` | Assigned jobs list |
| 3 | `technician_03_job_detail.png` | Work order detail page |
| 4 | `technician_04_work_order_doc.png` | Work order document preview |
| 5 | `technician_05_job_started.png` | Job status updated to "Started" |

---

## Workflow 9 – Agent Upload Invite System

**Contractor:** contractor.test1@outlook.com / QAtest@2026!  
**Insurance Agent Inbox:** ins.agent.test@outlook.com (no platform account)

### Steps – Contractor Side
1. Log in as contractor.test1@outlook.com
2. Go to **Documents** page
3. Find the **"Invite Agent to Upload Documents"** section
4. Enter: `ins.agent.test@outlook.com` → click **Send Invite**
5. Verify the active invites panel shows the invite with 0 documents uploaded

### Steps – Insurance Agent Side
6. Open `ins.agent.test@outlook.com` inbox
7. Open the invite email → click the secure upload link
8. Verify: no login required; upload checklist is shown
9. Upload a COI PDF → assign: Type = COI, Carrier = State Farm, Effective Date = 2026-01-01
10. Click **Upload All** → verify success
11. Try to upload a CSLB card → **expect rejection** (only COI/Endorsements allowed)

### Steps – Security Controls
12. Contractor clicks **Revoke** on the active invite
13. Try to open the revoked link → expect "This link has been revoked" error
14. Verify the upload link URL cannot be guessed or manipulated to access other contractors

### Screenshots to Capture
| # | Filename | What to Show |
|---|----------|-------------|
| 1 | `agentupload_01_contractor_docs.png` | Contractor Documents page |
| 2 | `agentupload_02_invite_form.png` | Invite form with insurance agent email |
| 3 | `agentupload_03_invite_sent.png` | Invite sent confirmation |
| 4 | `agentupload_04_active_invites.png` | Active invites panel |
| 5 | `agentupload_05_agent_email.png` | Insurance agent inbox — invite email |
| 6 | `agentupload_06_upload_checklist.png` | Upload checklist (no login required) |
| 7 | `agentupload_07_coi_upload.png` | COI file uploaded with metadata |
| 8 | `agentupload_08_upload_success.png` | Upload success screen |
| 9 | `agentupload_09_cslb_rejected.png` | CSLB rejection message |
| 10 | `agentupload_10_upload_count.png` | Contractor sees upload count updated |
| 11 | `agentupload_11_revoke.png` | Contractor revokes invite |
| 12 | `agentupload_12_revoked_link_error.png` | Error page for revoked link |

---

## Email & DocuSign Screenshots (50+ Required)

Christopher requires a screenshot of **every email** sent by the platform, and every DocuSign
document. Go through each test inbox after running all workflows:

### Inboxes to Check
- agent.test1@outlook.com
- homeowner.test1@outlook.com
- homeowner.test2@outlook.com
- contractor.test1@outlook.com

### Screenshot Every Email You See
Name each screenshot: `email_NNN_<description>.png` (e.g., `email_001_homeowner_confirmation.png`)

Key emails to look for (39+ expected):

| Trigger | Recipient | Email Description |
|---------|-----------|------------------|
| Homeowner submits service request | Homeowner | Service request confirmation |
| Agent linked via referral | Agent | Referral conversion notification |
| Method B – homeowner enters agent email | Admin | Pending agent alert |
| Admin approves agent | Agent | Welcome / approval email |
| Contractor registered | Admin | Contractor pending approval |
| Admin approves contractor | Contractor | Contractor approved |
| Contractor submits bid | Homeowner | New bid received |
| Homeowner selects estimate | Contractor | Estimate selected |
| Homeowner pays deposit | Homeowner + Admin | Deposit receipt |
| Work order generated | Contractor + Technician | Work order notification |
| DocuSign sent | Contractor | DocuSign signing request |
| DocuSign signed | All parties | DocuSign completed |
| Job started | Homeowner + Admin | Work started notification |
| Contractor sends upload invite | Insurance Agent | Secure upload link |
| Insurance agent uploads docs | Contractor | Upload confirmation |
| Contractor revokes invite | Insurance Agent | Revocation notice |

### DocuSign Documents to Screenshot
Open each DocuSign email link and screenshot the full document (multiple pages if needed):

| # | DocuSign Document | Filename |
|---|------------------|----------|
| 1 | Work Order / Contract | `docusign_001_work_order_contract.png` |
| 2 | Resale Certificate | `docusign_002_resale_certificate.png` |
| 3 | Lien Release Notice | `docusign_003_lien_release.png` |
| 4 | Completion Sign-off | `docusign_004_completion_signoff.png` |
| 5 | Underwriting Instructions | `docusign_005_underwriting.png` |
| 6 | Final Sign-off | `docusign_006_final_signoff.png` |

---

## Screenshot Naming Convention

All screenshots should follow this format: `NNN_workflow_description_YYYY-MM-DD.png`

Examples:
- `001_admin_dashboard_2026-03-14.png`
- `025_homeowner_stripe_success_2026-03-14.png`
- `050_email_docusign_signed_2026-03-14.png`

---

## Bug Reporting

For each issue found:
1. Screenshot the error
2. Note: URL, user account, step, expected vs actual behavior
3. Add a row to `qa/bug-reports/bug_report_log.csv`
4. Create `qa/bug-reports/BUG-NNN_short-title.md` using the template

Severity guide:
- 🔴 **Critical** – Blocks the workflow completely
- 🟠 **High** – Major feature broken, workaround exists
- 🟡 **Medium** – Minor failure, workaround exists
- 🟢 **Low** – UI/UX wording issue only

---

## Sharing Results with Christopher

**Google Drive:** Upload the full output zip to Christopher's shared folder  
**Email:** c.palmer@mrsurety.com  
**Message template:**

```
Subject: MrSurety QA – Day [N] Findings

Hi Christopher,

Attaching the QA findings from today's run.

Live app: https://frontend-tan-five-46.vercel.app
Workflows tested: [list]
Screenshots captured: [count]
Issues found: [count] ([X] critical, [X] high, [X] medium)

Key observations:
- [Finding 1]
- [Finding 2]
- [Finding 3]

Happy to jump on a call to review.

– Sophal
```

---

## Quick Reference: All Test Account Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mrsurety.com | MrSurety2026! |
| Agent 1 | agent.test1@outlook.com | QAtest@2026! |
| Agent 2 | agent.test2@outlook.com | QAtest@2026! |
| Agent 3 | agent.test3@outlook.com | QAtest@2026! |
| Homeowner A | homeowner.test2@outlook.com | QAtest@2026! |
| Homeowner B | homeowner.test1@outlook.com | QAtest@2026! |
| Homeowner C | homeowner.test3@outlook.com | QAtest@2026! |
| Contractor 1 | contractor.test1@outlook.com | QAtest@2026! |
| Contractor 2 | contractor.test2@outlook.com | QAtest@2026! |
| Contractor 3 | contractor.test3@outlook.com | QAtest@2026! |
| Technician | tech.test1@outlook.com | QAtest@2026! |
| Insurance Agent | ins.agent.test@outlook.com | N/A – no platform account |
