# Email Templates – MrSurety QA Reference

**Source:** Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM" – Part 3  
**Also see:** Email and DocuSign Examples – https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit  
**Last Updated:** 2026-03-13

> ⚠️ Screenshot every email. Flag any verbiage issues, missing fields, or delivery failures to Christopher.
> If an email is NOT received within 5 minutes of its trigger, log as a bug.

---

## Full Email Testing Checklist (Part 3 of Testing Guide)

Use the table below as the definitive checklist during testing.

### Homeowner Emails (13 total)

| # | Email | Trigger | Tested? |
|---|-------|---------|---------|
| H1 | **Welcome – Account Created** | Homeowner signs up | ☐ |
| H2 | **Service Request Received** | Homeowner submits form | ☐ |
| H3 | **Estimates Ready** | First contractor bid submitted | ☐ |
| H4 | **Deposit Required** | Homeowner selects contractor | ☐ |
| H5 | **Installation Confirmed** | Deposit paid | ☐ |
| H6 | **Reminder – Tomorrow** | 24 hours before scheduled date | ☐ |
| H7 | **Contractor Arrived** | Contractor checks in on job day | ☐ |
| H8 | **Change Order Created** | Contractor creates change order during job | ☐ |
| H9 | **Critical Release Required** | Emergency/critical service | ☐ |
| H10 | **Work Complete – Final Payment** | Job marked complete by contractor | ☐ |
| H11 | **Payment Received** | Final payment processed | ☐ |
| H12 | **Certificate Ready** | All documents signed | ☐ |
| H13 | **Return Service Scheduled** | Return service booked | ☐ |
| H14 | **Anniversary Reminder** | 11 months after job completion | ☐ |

### Contractor Emails (12 total)

| # | Email | Trigger | Tested? |
|---|-------|---------|---------|
| C1 | **Welcome Contractor** | Admin approves contractor account | ☐ |
| C2 | **New Job in Area** | New service request posted | ☐ |
| C3 | **Bid Received** (confirmation) | Contractor submits bid | ☐ |
| C4 | **Selected for Job** | Homeowner selects contractor | ☐ |
| C5 | **Sign Work Order** (DocuSign) | Deposit paid | ☐ |
| C6 | **Job Tomorrow Reminder** | 24 hours before scheduled date | ☐ |
| C7 | **Sign Affidavit / Lien** (DocuSign) | Job marked complete | ☐ |
| C8 | **Payment Sent** | Admin approves work | ☐ |
| C9 | **Unconditional Lien Required** (DocuSign) | Payment clears (3 days) | ☐ |
| C10 | **Critical Assignment** | Emergency/critical service | ☐ |
| C11 | **Return Service Work Order** (DocuSign) | Return service requested | ☐ |
| C12 | **Change Order Approved** | Homeowner approves change order | ☐ |

### Agent Emails (6 total)

| # | Email | Trigger | Tested? |
|---|-------|---------|---------|
| A1 | **Welcome Agent** | Agent account created | ☐ |
| A2 | **Client Started Request** | Client uses referral link | ☐ |
| A3 | **Client Selected Contractor** | Job confirmed | ☐ |
| A4 | **Client Critical Service** | Emergency service | ☐ |
| A5 | **Client Installation Complete** | Work done | ☐ |
| A6 | **Certificate Ready** | All documents signed | ☐ |
| A7 | **Client Renewal Reminder** | 11 months after job | ☐ |

### Technician Emails (4 total)

| # | Email | Trigger | Tested? |
|---|-------|---------|---------|
| T1 | **Welcome Technician** | Account created | ☐ |
| T2 | **New Assessment** | Assessment service paid | ☐ |
| T3 | **Assessment Reminder** | 24 hours before assessment visit | ☐ |
| T4 | **Report Upload Required** | Assessment visit completed | ☐ |

### Admin Emails (4 total)

| # | Email | Trigger | Tested? |
|---|-------|---------|---------|
| AD1 | **New Contractor Application** | Contractor signs up | ☐ |
| AD2 | **Work Ready for Approval** | Job complete, docs submitted | ☐ |
| AD3 | **Critical Service Alert** | Emergency service | ☐ |
| AD4 | **Quarterly Tax Report** | End of quarter | ☐ |

---

## Email Content Details by Category

### Homeowner Emails

#### H1 – Welcome – Account Created
- **To:** Homeowner
- **Trigger:** Account signup
- **Body should include:** Welcome message, login instructions, platform overview

#### H2 – Service Request Received
- **To:** Homeowner
- **Trigger:** Form submit
- **Body should include:** Request reference number, property address, service type, "contractors will be notified" message

**Full Email Body (Email 1 – Service Request Confirmation):**
```
Subject: Your MrSurety Service Request Has Been Received

Dear [Homeowner],

Thank you for submitting your service request for:
[Address]

YOUR REQUEST DETAILS:
• Service Type: [Installation/Assessment]
• Square Footage: [sq ft]
• Pressure Reducer: [Required/Not Required]
• Software Setup Assistance: [Yes/No]
• Estimated Extension Cord: [ft]

Qualified contractors will review your request and submit estimates.
You will be notified when estimates are ready.

Track your request: [Link]

MrSurety Compliance Team
(714) 686-1800
```

#### H3 – Estimates Ready
- **To:** Homeowner
- **Trigger:** First contractor bid submitted
- **Body should include:** Link to estimate page (shows **retail prices only** – no contractor prices visible)

**Full Email Body (Email 2 – New Estimate Available):**
```
Subject: ✅ Estimates Ready for Your Review - MrSurety

Dear [Homeowner],

Contractors have submitted estimates for your service request at:
[Address]

ESTIMATES SUMMARY:
[Contractor 1] (⭐⭐⭐⭐⭐)  Total: $[Total] (includes $95 Service Fee)
[Contractor 2] (⭐⭐⭐⭐)    Total: $[Total] (includes $95 Service Fee)
[Contractor 3] (⭐⭐⭐)      Total: $[Total] (includes $95 Service Fee)

The $95 Service Fee covers contractor verification, compliance documentation,
lien releases, and your insurance certificate.

REVIEW ESTIMATES: [Link]
```

#### H4 – Deposit Required
- **To:** Homeowner
- **Trigger:** Contractor selected (Approve & Schedule)
- **Body should include:** Deposit amount (10% of total), payment link, contractor name

**Full Email Body (Email 3 – Estimate Selected – Deposit Required):**
```
Subject: ⚠️ ACTION REQUIRED: Complete Your Deposit to Confirm Installation

Dear [Homeowner],

Thank you for selecting [Contractor] for your installation at:
[Address]

YOUR ESTIMATE DETAILS:
Parts & Fittings:       $[Parts]
Pressure Reducer:       $[Pressure]
Device:                 $[Device]
Software Setup:         $[Software]
Labor:                  $[Labor]
Subtotal:               $[Subtotal]
Service Fee:            $95.00
Total Before Tax:       $[TotalBeforeTax]
Tax:                    $[Tax]
TOTAL:                  $[Total]

DEPOSIT REQUIRED (10%): $[Deposit]

WHAT THE SERVICE FEE COVERS:
✓ Contractor license & insurance verification
✓ Affidavit of Service (signed under penalty of perjury)
✓ Conditional & Unconditional Lien Releases
✓ Certificate of Completion for your insurance agent
✓ Agent portal access
✓ Perpetual document storage

PAY DEPOSIT & SCHEDULE: [Link]
```

#### H5 – Installation Confirmed
- **To:** Homeowner
- **Trigger:** Deposit paid
- **Body should include:** Service date, contractor name and contact, property address

**Full Email Body (Email 5 – Deposit Received – Job Confirmed):**
```
Subject: ✅ Job Confirmed! Your Installation is Scheduled

Dear [Homeowner],

Your deposit has been received and your installation is confirmed.

JOB DETAILS:
• Date: [Date] @ [Time]
• Contractor: [Contractor]
• Property: [Address]

YOUR PAYMENT SUMMARY:
• Total Project Cost: $[Total] (includes $95 Service Fee)
• Deposit Paid:       $[Deposit]
• Remaining Balance:  $[Balance]

Track your job: [Link]
```

#### H6 – Reminder – Tomorrow
- **To:** Homeowner
- **Trigger:** 24 hours before scheduled installation date
- **Body should include:** Date/time of service, contractor contact info

**Full Email Body (Email 6 – Reminder: Upcoming Installation):**
```
Subject: ⏰ Reminder: Your Installation is Tomorrow

Dear [Homeowner],

Reminder: Your installation is scheduled for TOMORROW.

• Date:       [Date]
• Time:       [Time]
• Contractor: [Contractor]
• Address:    [Address]

Contractor will check in via app upon arrival.
```

#### H7 – Contractor Arrived
- **To:** Homeowner
- **Trigger:** Contractor GPS check-in on job day
- **Body should include:** Contractor name, arrival timestamp, property address

**Full Email Body (Email 7 – Contractor Check-In Notification):**
```
Subject: 📍 Your Contractor Has Arrived

Dear [Homeowner],

Your contractor has arrived at your property.

• Time:     [Time]
• Date:     [Date]
• Location: [Address] (GPS verified)

Work has begun.
```

#### H8 – Change Order Created
- **To:** Homeowner
- **Trigger:** Contractor creates a change order during job
- **Body should include:** Description of change, new price, Approve/Decline link

**Full Email Body (Email 8 – Change Order Created):**
```
Subject: ⚠️ ACTION REQUIRED: Change Order for Your Installation

Dear [Homeowner],

Additional work has been identified:

• Description:      [Description]
• Additional Cost:  $[Amount] (includes tax and Service Fee proportion)

APPROVE OR DECLINE: [Link]
```

#### H9 – Critical Release Required
- **To:** Homeowner
- **Trigger:** Emergency/critical water main service request
- **Body should include:** DocuSign link for Critical Change Order and Liability Release; must sign before work begins

#### H10 – Work Complete – Final Payment
- **To:** Homeowner
- **Trigger:** Job marked complete by contractor
- **Body should include:** Final invoice amount, payment link

**Full Email Body (Email 9 – Work Completed – Final Payment Required):**
```
Subject: ✅ Work Complete - Final Payment Required

Dear [Homeowner],

Your installation is complete.

FINAL INVOICE:
Parts & Fittings:      $[Parts]
Pressure Reducer:      $[Pressure]
Device:                $[Device]
Software Setup:        $[Software]
Labor:                 $[Labor]
Subtotal:              $[Subtotal]
Service Fee:           $95.00
Tax:                   $[Tax]
TOTAL:                 $[Total]

Deposit Paid:          $[Deposit]
REMAINING BALANCE:     $[Balance]

PAY FINAL BALANCE: [Link]
```

#### H11 – Payment Received
- **To:** Homeowner
- **Trigger:** Final payment processed
- **Body should include:** Receipt, amount, transaction date, thank-you message

#### H12 – Certificate Ready
- **To:** Homeowner
- **Trigger:** All DocuSign documents signed
- **Body should include:** Certificate download link

**Full Email Body (Email 10 – Job Complete – Certificate Ready):**
```
Subject: 📄 Your Job is Complete - Certificate Ready for Download

Dear [Homeowner],

Your installation is complete and all documents are ready.

FINAL INVOICE SUMMARY:
• Total Project Cost: $[Total] (includes $95 Service Fee)
• Status: PAID IN FULL

SERVICE FEE INCLUDED:
✓ Contractor license verification
✓ Affidavit of Service
✓ Lien Releases
✓ Certificate of Completion
✓ Agent portal access
✓ Document storage

DOCUMENTS AVAILABLE:
1. Certificate of Completion
2. Affidavit of Service
3. Unconditional Lien Release
4. Final Invoice
5. Photos

DOWNLOAD: [Link]

Your agent has also been notified.
```

#### H13 – Return Service Scheduled
- **To:** Homeowner
- **Trigger:** Return service booked
- **Body should include:** Date, contractor, service details

#### H14 – Anniversary Reminder
- **To:** Homeowner
- **Trigger:** 11 months after job completion
- **Body should include:** Reminder to schedule annual service, quick re-book link

---

### Contractor Emails

#### C1 – Welcome Contractor
- **To:** Contractor
- **Trigger:** Admin approves contractor account
- **Body should include:** Login instructions, how to browse and bid on available jobs

#### C2 – New Job in Area
- **To:** Contractor
- **Trigger:** New service request posted
- **Body should include:** General job description (no homeowner PII before bid accepted), city/zip, permit type, link to bid

#### C3 – Bid Received
- **To:** Contractor
- **Trigger:** Contractor submits bid
- **Body should include:** Bid confirmation, job details, next steps

#### C4 – Selected for Job
- **To:** Contractor
- **Trigger:** Homeowner selects contractor
- **Body should include:** Homeowner name and contact (now revealed), property address, service date, next steps (DocuSign, deposit confirmation)

**Full Email Body (Email 4 – New Job Assignment):**
```
Subject: 🔨 NEW JOB ASSIGNMENT: Water Leak Prevention - [Job ID]

Dear [Contractor],

Congratulations! You have been selected for a new job.

JOB DETAILS:
• Job ID:                  [Job ID]
• Homeowner:               [Name]
• Property:                [Address]
• Sq Ft:                   [sq ft]
• Date:                    [Date] @ [Time]
• Software Setup Required: [Yes/No]

YOUR PRICING (Accepted):
• Parts:              $[Parts]
• Pressure Reducer:   $[Pressure]
• Device:             $[Device]
• Software Setup:     $[Software]
• Labor:              $[Labor]
• Contractor Total:   $[Total]

Note: Homeowner pays a separate $95 Service Fee to MrSurety for compliance
documentation. This does not affect your payment.

CONTRACTOR PORTAL: [Link]
```

#### C5 – Sign Work Order
- **To:** Contractor
- **Trigger:** Deposit paid
- **Body should include:** DocuSign link for Work Order / Task Contract, job details

#### C6 – Job Tomorrow Reminder
- **To:** Contractor
- **Trigger:** 24 hours before scheduled job date
- **Body should include:** Property address, time, homeowner contact

#### C7 – Sign Affidavit / Lien
- **To:** Contractor
- **Trigger:** Job complete, photos and invoice uploaded
- **Body should include:** DocuSign links for Affidavit of Service + Conditional Lien Release with Invoice

#### C8 – Payment Sent
- **To:** Contractor
- **Trigger:** Admin approves work
- **Body should include:** Payment amount, expected deposit timing

#### C9 – Unconditional Lien Required
- **To:** Contractor
- **Trigger:** Payment clears (3 days after admin approval)
- **Body should include:** DocuSign link for Unconditional Lien Release; **portal access is limited until signed**

**Full Email Body (Email 12 – Unconditional Lien Release Required):**
```
Subject: ⚠️ URGENT: Unconditional Lien Release Required - [Job ID]

Dear [Contractor],

Payment for Job [Job ID] has cleared. Please sign the Unconditional Lien Release.

IMPORTANT: Platform access will be limited until signed.

SIGN NOW: [Link]
```

#### C10 – Critical Assignment
- **To:** Contractor
- **Trigger:** Emergency/critical service assigned
- **Body should include:** Homeowner location, immediate action required, contact info

#### C11 – Return Service Work Order
- **To:** Contractor
- **Trigger:** Return service requested
- **Body should include:** DocuSign link for Return Service Call Work Order

#### C12 – Change Order Approved
- **To:** Contractor
- **Trigger:** Homeowner approves change order
- **Body should include:** Updated job details, new amounts, proceed confirmation

---

### Agent Emails

#### A1 – Welcome Agent
- **To:** Agent
- **Trigger:** Agent account created
- **Body should include:** How to generate referral links, platform overview

#### A2 – Client Started Request
- **To:** Agent
- **Trigger:** Client uses agent's referral link
- **Body should include:** Client's name, property, request details, link to agent portal

#### A3 – Client Selected Contractor
- **To:** Agent
- **Trigger:** Client confirms a contractor
- **Body should include:** Contractor name, project details, status update

#### A4 – Client Critical Service
- **To:** Agent
- **Trigger:** Client has emergency service
- **Body should include:** Emergency notification, client contact info

#### A5 – Client Installation Complete
- **To:** Agent
- **Trigger:** Work done and approved
- **Body should include:** Project summary, completion date

#### A6 – Certificate Ready
- **To:** Agent
- **Trigger:** All signed documents complete
- **Body should include:** Certificate availability, client info

**Full Email Body (Email 11 – Job Complete – Certificate for Agent):**
```
Subject: 📄 Client Job Complete: [Address] - Certificate Attached

Dear [Agent],

Your client, [Homeowner], has completed a loss prevention installation.

PROPERTY:    [Address]
COMPLETION:  [Date]
CONTRACTOR:  [Contractor] (CSLB #[License])

SERVICES PERFORMED:
• [List of services]

DOCUMENTS ATTACHED:
1. Certificate of Completion
2. Affidavit of Service
3. Unconditional Lien Release
4. Photos

DOWNLOAD: [Link]

Submit to underwriter to bind policy or remove requirement.
```

#### A7 – Client Renewal Reminder
- **To:** Agent
- **Trigger:** 11 months after job completion
- **Body should include:** Renewal opportunity, client contact details

---

### Technician Emails

#### T1 – Welcome Technician
- **To:** Technician
- **Trigger:** Account created
- **Body should include:** Login instructions, service area assignment

#### T2 – New Assessment
- **To:** Technician
- **Trigger:** Assessment service paid by homeowner
- **Body should include:** Property details, assessment type, contact info, scheduling link

#### T3 – Assessment Reminder
- **To:** Technician
- **Trigger:** 24 hours before assessment visit
- **Body should include:** Address, time, homeowner contact

#### T4 – Report Upload Required
- **To:** Technician
- **Trigger:** Assessment visit completed
- **Body should include:** Instructions to upload assessment report, deadline

---

### Admin Emails

#### AD1 – New Contractor Application
- **To:** Admin
- **Trigger:** Contractor signs up
- **Body should include:** Contractor name, company, CSLB license number, link to approve/reject

#### AD2 – Work Ready for Approval
- **To:** Admin
- **Trigger:** Job complete, all documents submitted
- **Body should include:** Link to review photos and documents, approve work button

#### AD3 – Critical Service Alert
- **To:** Admin
- **Trigger:** Emergency service request
- **Body should include:** Homeowner details, urgency level, contractor assignment status

#### AD4 – Quarterly Tax Report
- **To:** Admin
- **Trigger:** End of quarter
- **Body should include:** Tax data summary for the quarter, downloadable report

**Full Email Body (Email 13 – Quarterly Tax Report Ready):**
```
Subject: 📊 Quarterly Sales Tax Report Ready - [Quarter]

Dear Admin,

The quarterly sales tax report for [Quarter] is ready.

SUMMARY:
• Jobs:         [Count]
• Total Sales:  $[Total]
• Tax Collected: $[Tax]

DOWNLOAD REPORT: [Link]
```

---

## Screenshot Capture Instructions

1. Log in to the email account associated with each user role.
2. Open each email as it arrives after its trigger action.
3. Capture the **inbox view** (subject line, sender, preview text) as one screenshot.
4. Capture the **full open email body** as a second screenshot (scroll if needed).
5. Name files following: `email_<number>_<role>-<description>_YYYY-MM-DD.png`
6. Place in: `qa/screenshots/email-docusign-triggers/`
7. Note any verbiage issues, typos, missing information, or broken links in the bug log.
8. **If an email is NOT received within 5 minutes of its trigger, log it as a bug.**
