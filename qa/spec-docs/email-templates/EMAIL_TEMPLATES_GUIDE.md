# Email Templates – MrSurety QA Reference

**Source:** Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM" – Part 3  
**Email/DocuSign Package:** MR SURETY – COMPLETE EMAILS AND DOCUSIGN DOCUMENTS **v1.4.4** (Long Form – Full Package: With Device + With Software)  
**Also see:** Email and DocuSign Examples – https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit  
**Last Updated:** 2026-03-14

> **Reference Job for Full-Body Examples:** JOB-WL-7890 | Alex Johnson | 4568 Sycamore Lane, Anaheim, CA 92806 | Contractor: Plumb Perfect Inc. (CSLB #999888) | Agent: Sarah Miller, State Farm | Final Total: $2,386.11

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

**Full Email Body (Email 1 – Service Request Confirmation) — v1.4.4:**
```
Subject: Your MrSurety Service Request Has Been Received
From: notifications@mrsurety.com
To: [homeowner_email]

Dear [Homeowner Name],

Thank you for submitting your service request to MrSurety. We have received your
request for water leak prevention services at:
[Property Address]

YOUR REQUEST DETAILS:
+-----------------------+-------------------------------------------+
| Item                  | Detail                                    |
+-----------------------+-------------------------------------------+
| Square Footage        | [sq ft]                                   |
| Property Age          | [years] years (built [year])              |
| Pressure Reducer      | [REQUIRED / Not Required]                 |
| Device Source         | [Contractor Provided / Homeowner Provided]|
| Software Setup        | [YES / NO]                                |
| Estimated Ext. Cord   | [ft] ft                                   |
+-----------------------+-------------------------------------------+

WHAT HAPPENS NEXT:
Qualified contractors within your requested distance ([distance] miles) will now
review your request and submit estimates. You will receive an email notification
when estimates are ready for your review.
Typically, contractors respond within 24-48 hours.

TRACK YOUR REQUEST:
Request Tracking Link: https://mrsurety.com/request/[Job ID]

Thank you for choosing MrSurety for your loss prevention needs.

Sincerely,
MrSurety Compliance Team
1253 E Imperial Hwy, Placentia, CA 92870
(714) 686-1800
support@mrsurety.com

This is an automated message. Please do not reply directly to this email.
```

#### H3 – Estimates Ready
- **To:** Homeowner
- **Trigger:** First contractor bid submitted
- **Body should include:** Link to estimate page (shows **retail prices only** – no contractor prices visible)

**Full Email Body (Email 2 – New Estimate Available) — v1.4.4:**
```
Subject: ✅ Estimates Ready for Your Review - MrSurety
From: notifications@mrsurety.com
To: [homeowner_email]

Dear [Homeowner Name],

Good news! Contractors have submitted estimates for your water leak prevention
service request at:
[Property Address]

ESTIMATES SUMMARY
+-------------------+------------------+----------------+
| Contractor        | Rating           | Total Estimate |
+-------------------+------------------+----------------+
| [Contractor 1]    | ⭐⭐⭐⭐⭐ ([x.x]) | $[Total]       |
| [Contractor 2]    | ⭐⭐⭐⭐  ([x.x]) | $[Total]       |
| [Contractor 3]    | ⭐⭐⭐   ([x.x]) | $[Total]       |
+-------------------+------------------+----------------+

RECOMMENDATION
Based on price and customer ratings, we recommend [Top Contractor] for your project.

WHAT'S INCLUDED IN ALL ESTIMATES:
All estimates include the $95 Service Fee which covers:
✓ Contractor license & insurance verification
✓ Affidavit of Service (signed under penalty of perjury)
✓ Conditional & Unconditional Lien Releases
✓ Certificate of Completion for your insurance agent
✓ Agent portal access for real-time updates
✓ Perpetual document storage

REVIEW AND SELECT:
Click below to review the detailed breakdown of each estimate and select your
preferred contractor:

REVIEW ESTIMATES: https://mrsurety.com/estimates/[Job ID]

If you have any questions, please contact our support team.

Sincerely,
MrSurety Compliance Team
(714) 686-1800

This is an automated message. Please do not reply directly to this email.
```

#### H4 – Deposit Required
- **To:** Homeowner
- **Trigger:** Contractor selected (Approve & Schedule)
- **Body should include:** Deposit amount (10% of total), payment link, contractor name

**Full Email Body (Email 3 – Estimate Selected – Deposit Required) — v1.4.4:**
```
Subject: ⚠️ ACTION REQUIRED: Complete Your Deposit to Confirm Installation
From: payments@mrsurety.com
To: [homeowner_email]

Dear [Homeowner Name],

Thank you for selecting [Contractor Name] for your water leak prevention
installation at:
[Property Address]

Your estimate has been approved. To confirm your installation date, a 10% deposit
is required as per California contractor regulations.

YOUR ESTIMATE DETAILS
+------------------------------------------+----------+
| Description                              | Amount   |
+------------------------------------------+----------+
| Parts & Fittings                         | $[Parts] |
| Pressure Reducer (required)              | $[Pres]  |
| [Device Name]                            | $[Dev]   |
| Software Setup & Configuration           | $[Soft]  |
| Professional Installation Labor          | $[Labor] |
| Subtotal (Work & Materials)              | $[Sub]   |
| Service Fee (see details below)          | $95.00   |
| Total Before Tax                         | $[TBT]   |
| Sales Tax ([rate]%)                      | $[Tax]   |
| TOTAL PROJECT COST                       | $[Total] |
+------------------------------------------+----------+

+-----------------------------------------------+-----------+
| Payment Summary                               | Amount    |
+-----------------------------------------------+-----------+
| Deposit Required (10%)                        | $[Deposit]|
| Remaining Balance Due at Completion           | $[Balance]|
+-----------------------------------------------+-----------+

WHAT THE SERVICE FEE COVERS
The $95 Service Fee is a separate line item covering all compliance and
documentation services:

+-------------------------------+----------------------------------------------+
| Service                       | Description                                  |
+-------------------------------+----------------------------------------------+
| Contractor License Verif.     | Ensuring contractor is licensed & current    |
| Insurance Verification        | Confirming liability insurance is active     |
| Affidavit of Service          | Signed under penalty of perjury              |
| Conditional Lien Release      | Protects your property while payment clears  |
| Unconditional Lien Release    | Final proof contractor has no property claim |
| Certificate of Completion     | Official documentation for your agent        |
| Agent Portal Access           | Your agent can track progress & download docs|
| Document Storage              | Perpetual secure storage of all job records  |
+-------------------------------+----------------------------------------------+

NEXT STEPS TO CONFIRM YOUR INSTALLATION:

1. PAY YOUR DEPOSIT:
   PAY DEPOSIT NOW: https://payments.mrsurety.com/deposit/[Job ID]

2. SELECT YOUR INSTALLATION DATE:
   After payment, choose your preferred installation date and time.

CALIFORNIA CONTRACTOR REGULATIONS:
Under California law, your deposit cannot exceed 10% of the total project cost
or $1,000, whichever is less. Your deposit complies with this requirement.

QUESTIONS?
Contact our support team at (714) 686-1800.

Sincerely,
MrSurety Payments Team
1253 E Imperial Hwy, Placentia, CA 92870
(714) 686-1800

This is an automated message. Please do not reply directly to this email.
```

#### H5 – Installation Confirmed
- **To:** Homeowner
- **Trigger:** Deposit paid
- **Body should include:** Service date, contractor name and contact, property address

**Full Email Body (Email 5 – Deposit Received – Job Confirmed) — v1.4.4:**
```
Subject: ✅ Job Confirmed! Your Installation is Scheduled
From: notifications@mrsurety.com
To: [homeowner_email]

Dear [Homeowner Name],

Great news! Your deposit has been successfully processed and your water leak
prevention installation is now confirmed.

JOB CONFIRMATION DETAILS
+--------------------+------------------------------------------+
| Field              | Information                              |
+--------------------+------------------------------------------+
| Job ID             | [Job ID]                                 |
| Service            | Water Leak Prevention Installation       |
| Property           | [Address]                                |
| Contractor         | [Contractor Name] (CSLB #[License])      |
| Installation Date  | [Date]                                   |
| Installation Time  | [Time]                                   |
| Estimated Duration | 4-5 hours                                |
+--------------------+------------------------------------------+

PAYMENT SUMMARY
+-------------------------------------------+----------+
| Item                                      | Amount   |
+-------------------------------------------+----------+
| Total Project Cost                        | $[Total] |
| Deposit Paid ([Date])                     | -$[Dep]  |
| Remaining Balance Due at Completion       | $[Bal]   |
+-------------------------------------------+----------+

WHAT'S INCLUDED IN YOUR PACKAGE
+---------------------+------------------------------------------------------+
| Component           | Description                                          |
+---------------------+------------------------------------------------------+
| Parts & Fittings    | All pipe fittings, connectors, and extension cable   |
| Pressure Reducer    | Required 1" pressure regulator (homes over 5 yrs)   |
| [Device Name]       | Complete system with leak detectors & shutoff valve  |
| Software Setup      | WiFi config, app setup, and system testing           |
| Professional Labor  | Installation by licensed, insured contractor         |
| Service Fee         | Full compliance documentation package (see below)    |
+---------------------+------------------------------------------------------+

YOUR COMPLIANCE PACKAGE (INCLUDED IN SERVICE FEE)
The $95 Service Fee provides you with:
✓ Contractor License Verification – We've verified [Contractor] holds an active
  California contractor license (CSLB #[License]) with no disciplinary actions.
✓ Insurance Verification – Liability insurance has been confirmed and is active.
✓ Affidavit of Service – After completion, the contractor will sign a legally
  binding affidavit under penalty of perjury confirming all work was performed.
✓ Conditional Lien Release – Protects your property while payment is processing.
✓ Unconditional Lien Release – Final legal document confirming contractor has no
  further claim on your property.
✓ Certificate of Completion – Official document for your insurance agent to submit
  to underwriters.
✓ Agent Portal Access – Your agent can track progress and download documents.
✓ Perpetual Document Storage – All documents stored securely and accessible anytime.

WHAT TO EXPECT ON INSTALLATION DAY
+----------+---------------------------------------------------------------+
| Time     | Event                                                         |
+----------+---------------------------------------------------------------+
| [T+0:00] | Contractor arrives, checks in via mobile app                  |
| [T+0:05] | Contractor reviews scope of work with you                     |
| [T+0:15] | Installation begins                                           |
| [T+3:00] | Approximate midpoint – you may check progress                 |
| [T+5:00] | Estimated completion time                                     |
| [T+5:15] | Contractor demonstrates system, confirms software working     |
| [T+5:30] | Contractor uploads completion photos; you receive notification|
+----------+---------------------------------------------------------------+

TRACK YOUR JOB PROGRESS
JOB TRACKING LINK: https://mrsurety.com/job/[Job ID]

QUESTIONS?
If you need to reschedule or have any questions, please contact our support team at
(714) 686-1800.

Thank you for choosing MrSurety for your loss prevention needs!

Sincerely,
MrSurety Compliance Team
1253 E Imperial Hwy, Placentia, CA 92870
(714) 686-1800
support@mrsurety.com

This is an automated message. Please do not reply directly to this email.
```

#### H6 – Reminder – Tomorrow
- **To:** Homeowner
- **Trigger:** 24 hours before scheduled installation date
- **Body should include:** Date/time of service, contractor contact info

**Full Email Body (Email 6 – Reminder: Upcoming Installation) — v1.4.4:**
```
Subject: ⏰ Reminder: Your Installation is Tomorrow
From: notifications@mrsurety.com
To: [homeowner_email]

Dear [Homeowner Name],

This is a friendly reminder that your water leak prevention installation is
scheduled for TOMORROW.

INSTALLATION DETAILS
+--------------------+------------------------------------------+
| Field              | Information                              |
+--------------------+------------------------------------------+
| Date               | [Date]                                   |
| Time               | [Time]                                   |
| Contractor         | [Contractor Name] (CSLB #[License])      |
| Property           | [Address]                                |
| Estimated Duration | 4-5 hours                                |
+--------------------+------------------------------------------+

WHAT TO EXPECT
+------------------+----------------------------------------------------------+
| Step             | Description                                              |
+------------------+----------------------------------------------------------+
| Arrival          | Contractor checks in via mobile app. You'll get a notif. |
| Access Needed    | Contractor needs access to main water line, basement/    |
|                  | crawl space, and an exterior outlet (extension cord).    |
| WiFi Required    | For software setup — have your WiFi name & password ready|
| During Install   | Water shut off ~1-2 hrs during pressure reducer install. |
| Completion       | Contractor demonstrates system; you'll get a notif.      |
+------------------+----------------------------------------------------------+

PREPARATION CHECKLIST
☐ Clear access to main water line area
☐ Ensure WiFi is working and password is available
☐ Make sure someone 18+ will be home during installation
☐ Have your phone available for any questions

FINAL PAYMENT REMINDER
Your remaining balance of $[Balance] will be due upon completion. You will receive
an email with a secure payment link after the work is finished.

NEED TO RESCHEDULE?
If you need to change your installation date, please contact us immediately at
(714) 686-1800.

Sincerely,
MrSurety Compliance Team
(714) 686-1800

This is an automated message. Please do not reply directly to this email.
```

#### H7 – Contractor Arrived
- **To:** Homeowner
- **Trigger:** Contractor GPS check-in on job day
- **Body should include:** Contractor name, arrival timestamp, property address

**Full Email Body (Email 7 – Contractor Check-In Notification) — v1.4.4:**
```
Subject: 📍 Your Contractor Has Arrived
From: notifications@mrsurety.com
To: [homeowner_email]

Dear [Homeowner Name],

Your contractor from [Contractor Name] has arrived at your property.

CHECK-IN DETAILS
+----------------------+-----------------------------------------------+
| Field                | Information                                   |
+----------------------+-----------------------------------------------+
| Time                 | [Time]                                        |
| Date                 | [Date]                                        |
| Location             | [Address]                                     |
| GPS Verification     | ✅ Confirmed – Contractor is at your property |
| Contractor           | [Technician Name], Lead Technician            |
+----------------------+-----------------------------------------------+

WHAT'S HAPPENING NOW
Work will now begin on your water leak prevention installation. The contractor will:
• Review the scope of work with you
• Shut off water to install the pressure reducer and shutoff valve
• Install all components and run the extension cable
• Set up the [Device Name] software and connect to your WiFi
• Test the complete system

NEXT NOTIFICATION
You will receive another notification when the work is complete and final payment
is due.

TRACK LIVE: https://mrsurety.com/job/[Job ID]

Thank you for choosing MrSurety!
MrSurety Compliance Team

This is an automated message. Please do not reply directly to this email.
```

#### H8 – Change Order Created
- **To:** Homeowner
- **Trigger:** Contractor creates a change order during job
- **Body should include:** Description of change, new price, Approve/Decline link

**Full Email Body (Email 8 – Change Order Created) — v1.4.4:**
```
Subject: ⚠️ ACTION REQUIRED: Change Order for Your Installation
From: notifications@mrsurety.com
To: [homeowner_email]

Dear [Homeowner Name],

During installation at your property, your contractor has identified additional
work needed to complete your water leak prevention system properly.

CHANGE ORDER DETAILS
+------------------+------------------------------------------------------+
| Field            | Information                                          |
+------------------+------------------------------------------------------+
| Job ID           | [Job ID]                                             |
| Contractor       | [Contractor Name]                                    |
| Description      | [Description of additional work required]            |
| Additional Parts | $[Parts]                                             |
| Additional Tax   | $[Tax]                                               |
| TOTAL ADDITIONAL | $[Total Additional]                                  |
+------------------+------------------------------------------------------+

UPDATED PROJECT TOTAL
+---------------------------+-----------+
| Item                      | Amount    |
+---------------------------+-----------+
| Original Total            | $[Orig]   |
| Change Order              | +$[Add]   |
| NEW TOTAL (if approved)   | $[New]    |
+---------------------------+-----------+

APPROVAL REQUIRED
Please review and approve or decline at the link below:

REVIEW CHANGE ORDER: https://mrsurety.com/change-order/[Job ID]

If APPROVED: contractor will proceed with additional work; amount added to balance.
If DECLINED: contractor completes original scope only (may affect warranty).

Please respond within 30 minutes to avoid delays.

Thank you,
MrSurety Compliance Team
(714) 686-1800

This is an automated message. Please do not reply directly to this email.
```

#### H9 – Critical Release Required
- **To:** Homeowner
- **Trigger:** Emergency/critical water main service request
- **Body should include:** DocuSign link for Critical Change Order and Liability Release; must sign before work begins

#### H10 – Work Complete – Final Payment
- **To:** Homeowner
- **Trigger:** Job marked complete by contractor
- **Body should include:** Final invoice amount, payment link

**Full Email Body (Email 9 – Work Completed – Final Payment Required) — v1.4.4:**
```
Subject: ✅ Work Complete - Final Payment Required
From: payments@mrsurety.com
To: [homeowner_email]

Dear [Homeowner Name],

Great news! Your water leak prevention installation has been completed by
[Contractor Name].

FINAL INVOICE
+------------------------------------------+----------+
| Description                              | Amount   |
+------------------------------------------+----------+
| Parts & Fittings                         | $[Parts] |
| Pressure Reducer (required)              | $[Pres]  |
| [Device Name]                            | $[Dev]   |
| Software Setup & Configuration           | $[Soft]  |
| Professional Installation Labor          | $[Labor] |
| Subtotal (Work & Materials)              | $[Sub]   |
| Service Fee                              | $95.00   |
| Total Before Tax                         | $[TBT]   |
| Sales Tax ([rate]%)                      | $[Tax]   |
| TOTAL PROJECT COST                       | $[Total] |
+------------------------------------------+----------+

PAYMENT SUMMARY
+--------------------------------+----------+
| Item                           | Amount   |
+--------------------------------+----------+
| Deposit Paid ([Date])          | -$[Dep]  |
| REMAINING BALANCE DUE          | $[Bal]   |
+--------------------------------+----------+

COMPLETED WORK VERIFICATION
The contractor has uploaded the following documentation:
✓ Before Photos – [N] photos of the work area before installation
✓ During Photos – [N] photos showing installation progress
✓ After Photos  – [N] photos of completed installation
✓ Device Serial Numbers – Recorded and verified
✓ Software Confirmation – System connected to WiFi, app configured, auto-shutoff tested

TO COMPLETE YOUR JOB:
1. Review the completed work photos at the link below
2. Click the secure link to pay your remaining balance
3. Once paid, your compliance documents will be generated and emailed to you
   and your agent

PAY FINAL BALANCE:     https://payments.mrsurety.com/final/[Job ID]
VIEW COMPLETION PHOTOS: https://mrsurety.com/job/[Job ID]/photos

WHAT HAPPENS AFTER PAYMENT
+------------------------------------------------+---------------------+
| Step                                           | Timeline            |
+------------------------------------------------+---------------------+
| Payment processed                              | Immediate           |
| Certificate package generated                  | Within 1 hour       |
| Documents emailed to you                       | Within 1 hour       |
| Documents emailed to your agent                | Within 1 hour       |
| Unconditional Lien Release signed by contractor| 3-5 days after clear|
+------------------------------------------------+---------------------+

Thank you for choosing MrSurety!

Sincerely,
MrSurety Payments Team
1253 E Imperial Hwy, Placentia, CA 92870
(714) 686-1800

This is an automated message. Please do not reply directly to this email.
```

#### H11 – Payment Received
- **To:** Homeowner
- **Trigger:** Final payment processed
- **Body should include:** Receipt, amount, transaction date, thank-you message

**Full Email Body (Email 10 – Payment Received – Processing) — v1.4.4:**
```
Subject: 💳 Payment Received - Thank You!
From: payments@mrsurety.com
To: [homeowner_email]

Dear [Homeowner Name],

Thank you! Your final payment of $[Amount] has been successfully processed.

PAYMENT CONFIRMATION
+----------------------+----------------------------------+
| Field                | Information                      |
+----------------------+----------------------------------+
| Job ID               | [Job ID]                         |
| Payment Amount       | $[Amount]                        |
| Payment Date         | [Date]                           |
| Payment Method       | [Method] ending in [Last4]       |
| Confirmation Number  | [Confirmation #]                 |
+----------------------+----------------------------------+

PROJECT PAID IN FULL
+--------------------+----------+
| Item               | Amount   |
+--------------------+----------+
| Total Project Cost | $[Total] |
| Total Paid         | $[Total] |
| BALANCE            | $0.00    |
+--------------------+----------+

WHAT HAPPENS NEXT
+------------------------------------------------+---------------------+
| Step                                           | Estimated Timeline  |
+------------------------------------------------+---------------------+
| Certificate package generation                 | Within 1 hour       |
| Documents emailed to you                       | Within 1 hour       |
| Documents emailed to your agent                | Within 1 hour       |
| Contractor signs Unconditional Lien Release    | 3-5 days after clear|
| Final documents added to your portal           | Within 5 days       |
+------------------------------------------------+---------------------+

You will receive a separate email when your certificate package is ready for download.

Thank you for choosing MrSurety for your loss prevention needs!

Sincerely,
MrSurety Payments Team
(714) 686-1800

This is an automated message. Please do not reply directly to this email.
```

#### H12 – Certificate Ready
- **To:** Homeowner
- **Trigger:** All DocuSign documents signed
- **Body should include:** Certificate download link

**Full Email Body (Email 11 – Job Complete – Certificate Ready) — v1.4.4:**
```
Subject: 📄 Your Job is Complete - Certificate Ready for Download
From: certificates@mrsurety.com
To: [homeowner_email]

Dear [Homeowner Name],

Your water leak prevention installation is now complete and all compliance documents
are ready for download.

JOB SUMMARY
+-------------------+------------------------------------------+
| Field             | Information                              |
+-------------------+------------------------------------------+
| Job ID            | [Job ID]                                 |
| Property          | [Address]                                |
| Completion Date   | [Date]                                   |
| Contractor        | [Contractor Name] (CSLB #[License])      |
| Agent             | [Agent Name], [Insurance Company]        |
+-------------------+------------------------------------------+

FINAL INVOICE (PAID IN FULL)
+------------------------------------------+----------+
| Description                              | Amount   |
+------------------------------------------+----------+
| Parts & Fittings                         | $[Parts] |
| Pressure Reducer (required)              | $[Pres]  |
| [Device Name]                            | $[Dev]   |
| Software Setup & Configuration           | $[Soft]  |
| Professional Installation Labor          | $[Labor] |
| Subtotal                                 | $[Sub]   |
| Service Fee                              | $95.00   |
| Total Before Tax                         | $[TBT]   |
| Sales Tax                                | $[Tax]   |
| TOTAL PAID                               | $[Total] |
+------------------------------------------+----------+

SERVICE FEE INCLUDED:
✓ Contractor License Verification (CSLB #[License] – Active)
✓ Insurance Verification (Liability – Active)
✓ Affidavit of Service (signed under penalty of perjury)
✓ Conditional Lien Release (protects property during payment)
✓ Unconditional Lien Release (pending – will be added when signed)
✓ Certificate of Completion (for insurance agent)
✓ Agent Portal Access ([Agent Name], [Company])
✓ Perpetual Document Storage

DOCUMENTS AVAILABLE FOR DOWNLOAD
+----+-----------------------------------+-------------------------------+
| #  | Document                          | Description                   |
+----+-----------------------------------+-------------------------------+
| 1  | Certificate of Completion         | Official document for insurance|
| 2  | Affidavit of Service              | Signed under penalty of perjury|
| 3  | Conditional Lien Release          | Signed by contractor          |
| 4  | Final Invoice                     | Detailed invoice              |
| 5  | Photos of Completed Work          | [N] photos                    |
+----+-----------------------------------+-------------------------------+

FOR YOUR INSURANCE AGENT
Your agent has also been notified and can access all documents through their agent
portal. You may also forward the certificate package directly to your underwriter.

DOWNLOAD ALL DOCUMENTS (ZIP): https://mrsurety.com/certificates/[Job ID]/download-all

VERIFY THIS CERTIFICATE
To verify the authenticity of this certificate, visit:
https://verify.mrsurety.com/[Job ID]

QUESTIONS?
If you have any questions about your documents or need additional copies, please
contact our compliance team at (714) 686-1800.

Thank you for choosing MrSurety!

Sincerely,
MrSurety Compliance Team
1253 E Imperial Hwy, Placentia, CA 92870
(714) 686-1800
compliance@mrsurety.com

This is an automated message. Please do not reply directly to this email.
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

**Full Email Body (Email 4 – New Job Assignment) — v1.4.4:**
```
Subject: 🔨 NEW JOB ASSIGNMENT: Water Leak Prevention - [Job ID]
From: jobs@mrsurety.com
To: [contractor_email]

Dear [Contractor Name],

Congratulations! You have been selected for a new job through the MrSurety platform.

JOB DETAILS
+----------------------------+------------------------------------------+
| Field                      | Information                              |
+----------------------------+------------------------------------------+
| Job ID                     | [Job ID]                                 |
| Service Type               | Water Leak Prevention Installation       |
| Homeowner                  | [Homeowner Name]                         |
| Property Address           | [Address]                                |
| Square Footage             | [sq ft]                                  |
| Property Age               | [years] years                            |
| Pressure Reducer           | [REQUIRED / Not Required]                |
| Pipe Size                  | [size] inch (based on sq ft)             |
| Extension Cord             | [ft] ft ([spec])                         |
| Device Source              | [Contractor Provided / Homeowner Provided]|
| Software Setup             | [YES / NO]                               |
| Installation Date          | [Date]                                   |
| Installation Time          | [Time]                                   |
+----------------------------+------------------------------------------+

YOUR ACCEPTED ESTIMATE (CONTRACTOR PRICING)
+------------------------------------------+----------+
| Component                                | Amount   |
+------------------------------------------+----------+
| Parts (Fittings & Misc + [ft] Cable)     | $[Parts] |
| Pressure Reducer ([size]")               | $[Pres]  |
| Device ([Device Name])                   | $[Dev]   |
| Software Setup & Configuration           | $[Soft]  |
| Labor                                    | $[Labor] |
| TOTAL CONTRACTOR PAYMENT                 | $[Total] |
+------------------------------------------+----------+

RESALE CERTIFICATE STATUS
+--------------------------------+-----------------------------------------+
| Field                          | Status                                  |
+--------------------------------+-----------------------------------------+
| Accept MrSurety Resale Cert?   | [YES / NO]                              |
| Sales Tax Handling             | [Do NOT include tax — MrSurety adds at  |
|                                |  retail level / Include tax in pricing] |
+--------------------------------+-----------------------------------------+

IMPORTANT NOTES
The homeowner will be charged a separate $95 Service Fee by MrSurety for compliance
documentation, lien releases, and certificate generation. This fee does not affect
your compensation. Your payment will be processed within 15 days of job completion,
photo upload, and admin approval.

MATERIALS VERIFICATION
Please verify you have the following items in inventory before the installation date:
+------------------------------------+----------+
| Item                               | Quantity |
+------------------------------------+----------+
| Pressure Reducer ([size]")         | 1 unit   |
| Pipe Fittings & Misc Kit           | 1 unit   |
| Extension Cable ([ft] ft, [spec])  | 1 unit   |
| [Device Name]                      | 1 unit   |
+------------------------------------+----------+

NEXT STEPS FOR YOU
+---+--------------------------------------------------------------------+
| 1 | Log in to your contractor portal to confirm materials              |
| 2 | Arrive at job site on [Date] at [Time]                             |
| 3 | Check in via mobile app upon arrival (GPS verification required)   |
| 4 | Complete work and perform software setup/configuration             |
| 5 | Upload photos (before/during/after) and final invoice              |
| 6 | Sign Affidavit of Service and Conditional Lien Release via DocuSign|
| 7 | Receive payment upon admin approval                                |
+---+--------------------------------------------------------------------+

CONTRACTOR PORTAL ACCESS
Login Link:    https://contractor.mrsurety.com/login
Job Dashboard: https://contractor.mrsurety.com/jobs/[Job ID]

Thank you for partnering with MrSurety to provide quality loss prevention services!

Sincerely,
MrSurety Operations Team
1253 E Imperial Hwy, Placentia, CA 92870
(714) 686-1800
operations@mrsurety.com

This is an automated message. Please do not reply directly to this email.
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

**Full Email Body (Email 13 – Payment Sent to Contractor) — v1.4.4:**
```
Subject: 💵 Payment Sent - Job [Job ID]
From: payments@mrsurety.com
To: [contractor_email]

Dear [Contractor Name],

Payment has been sent for Job [Job ID] ([Address]).

PAYMENT DETAILS
+------------------------+----------------------------------+
| Field                  | Information                      |
+------------------------+----------------------------------+
| Job ID                 | [Job ID]                         |
| Payment Amount         | $[Amount]                        |
| Payment Date           | [Date]                           |
| Payment Method         | ACH Transfer to your bank account|
| Estimated Clear Date   | [Date + 3 business days]         |
+------------------------+----------------------------------+

PAYMENT BREAKDOWN
+------------------------------------------+----------+
| Component                                | Amount   |
+------------------------------------------+----------+
| Parts (Fittings & Misc + Cable)          | $[Parts] |
| Pressure Reducer ([size]")               | $[Pres]  |
| Device ([Device Name])                   | $[Dev]   |
| Software Setup                           | $[Soft]  |
| Labor                                    | $[Labor] |
| TOTAL                                    | $[Total] |
+------------------------------------------+----------+

WHAT HAPPENS NEXT
+----------------------------------------------+---------------------------+
| Step                                         | Timeline                  |
+----------------------------------------------+---------------------------+
| Funds clear in your account                  | 2-3 business days         |
| Unconditional Lien Release sent via DocuSign | After payment clears      |
| Sign Unconditional Lien Release              | Required for platform     |
+----------------------------------------------+---------------------------+

UNCONDITIONAL LIEN RELEASE NOTICE
Once your payment has cleared (approximately [Clear Date]), you will receive a
DocuSign email for the Unconditional Lien Release. Please note: Your access to
the MrSurety contractor platform will be limited until this document is signed.

Thank you for your excellent work on this job!

Sincerely,
MrSurety Payments Team
(714) 686-1800

This is an automated message. Please do not reply directly to this email.
```

#### C9 – Unconditional Lien Required
- **To:** Contractor
- **Trigger:** Payment clears (3 days after admin approval)
- **Body should include:** DocuSign link for Unconditional Lien Release; **portal access is limited until signed**

**Full Email Body (Email 14 – Unconditional Lien Release Required) — v1.4.4:**
```
Subject: ⚠️ URGENT: Unconditional Lien Release Required - Job [Job ID]
From: docusign@mrsurety.com
To: [contractor_email]

Dear [Contractor Name],

Payment for Job [Job ID] ([Address]) has cleared. Please sign the Unconditional
Lien Release to complete this job.

IMPORTANT NOTICE
Your access to the MrSurety contractor platform is currently LIMITED.
You will not be able to:
  • View new job opportunities
  • Access your contractor dashboard
  • Submit bids on new requests
  • Receive job assignments
Until you sign the Unconditional Lien Release for this job.

JOB DETAILS
+----------------------+------------------------------------------+
| Field                | Information                              |
+----------------------+------------------------------------------+
| Job ID               | [Job ID]                                 |
| Property             | [Address]                                |
| Homeowner            | [Homeowner Name]                         |
| Payment Amount       | $[Amount]                                |
| Payment Clear Date   | [Date]                                   |
+----------------------+------------------------------------------+

ACTION REQUIRED
Please click the link below to review and sign the Unconditional Lien Release
via DocuSign:

SIGN UNCONDITIONAL LIEN RELEASE NOW: [DocuSign Link]

This document confirms that:
• You have received final payment in full
• You have no further claims against the property
• All subcontractors and suppliers have been paid

AFTER SIGNING
Once you sign this document:
✓ Your platform access will be restored immediately
✓ The job will be marked as complete in our system
✓ The homeowner and their agent will receive the final certificate

QUESTIONS?
If you believe this document has been sent in error or have questions, please
contact our compliance team immediately at (714) 686-1800.

Thank you for your prompt attention to this matter.

Sincerely,
MrSurety Compliance Team
1253 E Imperial Hwy, Placentia, CA 92870
(714) 686-1800
compliance@mrsurety.com

This is an automated message from DocuSign. Please do not reply directly to this email.
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

**Full Email Body (Email 12 – Job Complete – Certificate for Agent) — v1.4.4:**
```
Subject: 📄 Client Job Complete: [Address] - Certificate Attached
From: certificates@mrsurety.com
To: [agent_email]
CC: [homeowner_email]

Dear [Agent Name],

Your client, [Homeowner Name], has completed a loss prevention installation through
MrSurety. The compliance documentation is now available for underwriting purposes.

CLIENT & PROPERTY DETAILS
+----------------------+------------------------------------------+
| Field                | Information                              |
+----------------------+------------------------------------------+
| Client Name          | [Homeowner Name]                         |
| Property Address     | [Address]                                |
| Policy Number        | [Policy # if provided]                   |
| Completion Date      | [Date]                                   |
| Service Type         | Water Leak Prevention                    |
+----------------------+------------------------------------------+

SERVICES PERFORMED
+---------------------------+-----------------------------------------------+
| Service                   | Description                                   |
+---------------------------+-----------------------------------------------+
| Pressure Reducer Install  | Required for homes over 5 yrs – [size] regulator installed |
| [Device Name]             | Complete system with leak detectors & shutoff |
| Software Setup            | WiFi config, app setup, auto-shutoff testing  |
| Professional Installation | Complete install by licensed contractor       |
+---------------------------+-----------------------------------------------+

CONTRACTOR INFORMATION
+------------------+-------------------------------------------+
| Field            | Information                               |
+------------------+-------------------------------------------+
| Contractor       | [Contractor Name]                         |
| CSLB License     | #[License]                                |
| License Status   | Verified Active as of [Date]              |
| Insurance        | Liability insurance verified and active   |
+------------------+-------------------------------------------+

PROJECT FINANCIALS
+---------------------+----------+
| Item                | Amount   |
+---------------------+----------+
| Total Project Cost  | $[Total] |
| Status              | PAID IN FULL |
+---------------------+----------+

DOCUMENTS ATTACHED
The following documents are included in this certificate package:
+----+----------------------------------+---------------------------------------+
| #  | Document                         | Description                           |
+----+----------------------------------+---------------------------------------+
| 1  | Certificate of Completion        | Official summary for underwriting     |
| 2  | Affidavit of Service             | Signed by contractor under perjury    |
| 3  | Unconditional Lien Release       | Signed by contractor (no further claims)|
| 4  | Photos of Completed Work         | [N] photos documenting installation   |
| 5  | License Verification             | CSLB license screenshot               |
+----+----------------------------------+---------------------------------------+

DOWNLOAD CERTIFICATE PACKAGE
AGENT PORTAL ACCESS:  https://agent.mrsurety.com/login
Direct Download Link: https://mrsurety.com/agent/certificates/[Job ID]

VERIFICATION
To verify this certificate, visit:
https://verify.mrsurety.com/[Job ID]

UNDERWRITING INSTRUCTIONS
This certificate confirms that the required loss prevention work has been completed
by a licensed contractor and documented by MrSurety. Please forward this package
to the underwriter to bind the policy or remove the requirement.

QUESTIONS?
If you need additional information, please contact our compliance team at
(714) 686-1800.

Thank you for partnering with MrSurety!

Sincerely,
MrSurety Compliance Team
1253 E Imperial Hwy, Placentia, CA 92870
(714) 686-1800
compliance@mrsurety.com

This is an automated message. Please do not reply directly to this email.
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
- **To:** Admin + Accounting
- **Trigger:** End of quarter (automated, 12:00 AM on first of next month)
- **Body should include:** Tax data summary for the quarter, jurisdiction breakdown, downloadable report, CDTFA filing deadline

**Full Email Body (Email 16 – Quarterly Tax Report Ready) — v1.4.4:**
```
Subject: 📊 Quarterly Sales Tax Report Ready - Q[N] [Year]
From: system@mrsurety.com
To: admin@mrsurety.com
CC: accounting@mrsurety.com

Dear MrSurety Admin,

The quarterly sales tax report for Q[N] [Year] ([Start Date] – [End Date]) is now
ready for review and filing.

REPORT SUMMARY
+--------------------------+----------+
| Metric                   | Amount   |
+--------------------------+----------+
| Total Jobs Completed     | [Count]  |
| Total Retail Sales       | $[Sales] |
| Total Sales Tax Collected| $[Tax]   |
| Number of Tax Jurisdictions | [N]   |
+--------------------------+----------+

BREAKDOWN BY JURISDICTION
+------------------+-----------+------+---------------+
| Jurisdiction     | Tax Rate  | Jobs | Tax Collected |
+------------------+-----------+------+---------------+
| Anaheim, CA      | 7.75%     | [N]  | $[Tax]        |
| Orange, CA       | 7.75%     | [N]  | $[Tax]        |
| Fullerton, CA    | 7.75%     | [N]  | $[Tax]        |
| Irvine, CA       | 7.75%     | [N]  | $[Tax]        |
| Santa Ana, CA    | 7.75%     | [N]  | $[Tax]        |
| [Other jurisdictions]    |    | [N]  | $[Tax]        |
| TOTAL            |           | [N]  | $[Tax]        |
+------------------+-----------+------+---------------+

EXAMPLE JOB INCLUDED IN THIS REPORT
+------------------+-------------------------------+
| Field            | Information                   |
+------------------+-------------------------------+
| Job ID           | [Job ID]                      |
| Date             | [Date]                        |
| Address          | [Address]                     |
| Retail Subtotal  | $[Subtotal]                   |
| Tax Rate         | [Rate]%                       |
| Tax Collected    | $[Tax]                        |
| Total Paid       | $[Total]                      |
+------------------+-------------------------------+

ATTACHMENTS
The following files are attached to this email:
• [Quarter]-Tax-Report.csv  – Raw data for import into accounting software
• [Quarter]-Tax-Report.pdf  – Formatted report for your records
• [Quarter]-Job-Detail.csv  – Line-item detail for each job

FILING INSTRUCTIONS
Please review the report and file with the California Department of Tax and Fee
Administration (CDTFA) by the April 30 deadline (Q1), July 31 (Q2),
October 31 (Q3), or January 31 (Q4).

Once filed, please update the filing status in the admin portal:
UPDATE FILING STATUS: https://admin.mrsurety.com/tax/[quarter]

DOWNLOAD REPORT
Direct Download Link: https://admin.mrsurety.com/tax/[quarter]/download

Thank you,
MrSurety System
1253 E Imperial Hwy, Placentia, CA 92870
(714) 686-1800

This is an automated message. Please do not reply directly to this email.
```

#### AD5 – Lien Release Signed (Admin Notification)
- **To:** Admin
- **Trigger:** Contractor signs the Unconditional Lien Release via DocuSign
- **Body should include:** Job ID, contractor identity, signed document URL, automated next-steps status

**Full Email Body (Email 15 – Unconditional Lien Release Signed) — v1.4.4:**
```
Subject: ✅ Unconditional Lien Release Signed - Job [Job ID]
From: docusign@mrsurety.com
To: admin@mrsurety.com

Dear MrSurety Admin,

The Unconditional Lien Release for Job [Job ID] has been signed by the contractor.

DOCUMENT DETAILS
+------------------+--------------------------------------------+
| Field            | Information                                |
+------------------+--------------------------------------------+
| Job ID           | [Job ID]                                   |
| Property         | [Address]                                  |
| Homeowner        | [Homeowner Name]                           |
| Contractor       | [Contractor Name] (CSLB #[License])        |
| Document Type    | Unconditional Lien Release                 |
| Signed By        | [Signer Name], [Title]                     |
| Signed At        | [Date] [Time]                              |
| Envelope ID      | [DS Envelope ID]                           |
+------------------+--------------------------------------------+

DOCUMENT SUMMARY
The signed document confirms:
• Contractor received final payment of $[Amount]
• Payment has cleared
• No further claims against the property
• All subcontractors and suppliers paid

NEXT STEPS
+---------------------------------------------+----------------------+
| Step                                         | Status               |
+---------------------------------------------+----------------------+
| Add document to job folder                   | Automated – Complete |
| Update job status to "Closed"                | Automated – Complete |
| Notify homeowner (optional)                  | Not required         |
| File with tax records                        | Automated            |
+---------------------------------------------+----------------------+

VIEW DOCUMENT
Signed Document URL: https://docusign.com/envelopes/[Envelope ID]

This job is now fully documented and closed.

Thank you,
MrSurety System

This is an automated message. Please do not reply directly to this email.
```

---

## DocuSign Documents

All DocuSign documents use the MrSurety platform to send, track, and store electronic signatures. Electronic signatures are legally binding under the California Uniform Electronic Transactions Act (Civil Code §1633.1 et seq.).

**Reference job for all examples:** JOB-WL-7890 — 4568 Sycamore Lane, Anaheim, CA 92806

---

### DocuSign 1 – Contractor Master Services Agreement (One-Time)

- **Envelope ID:** DS-12345-00001
- **Trigger:** Contractor onboarding (one-time, before first job)
- **Sent To:** Contractor (Jane Doe, Plumb Perfect Inc.)
- **From:** MrSurety Operations Team

**DocuSign Envelope:**
```
To:   Jane Doe, Plumb Perfect Inc.
From: MrSurety, Inc.
Subject: Please sign: Contractor Master Services Agreement

Dear Jane Doe,

Please review and sign the attached Contractor Master Services Agreement to join
the MrSurety contractor network.

CLICK HERE TO REVIEW AND SIGN: [DocuSign Link]

This agreement will govern all future jobs you perform through the MrSurety platform.

Thank you for partnering with MrSurety!
MrSurety Operations Team
```

**Document: CONTRACTOR MASTER SERVICES AGREEMENT**
```
CONTRACTOR MASTER SERVICES AGREEMENT

THIS MASTER SERVICES AGREEMENT (the "Agreement") is entered into on [Date], by and between:

  MrSurety, Inc. ("Company")
  1253 E Imperial Hwy
  Placentia, CA 92870

AND

  [Contractor Business Name] ("Contractor")
  [Contractor Address]
  CSLB #: [License Number]

1. SERVICES
Contractor agrees to perform loss prevention services as assigned through the
MrSurety platform, including but not limited to: water mitigation device installation,
pressure reducer installation, pipe fitting, software configuration, and related
services. Each individual job will be authorized by a separate Work Order signed by
both parties.

2. INDEPENDENT CONTRACTOR STATUS
Contractor is an independent contractor and not an employee, joint venturer, or
partner of Company. Contractor retains sole discretion over the means and methods of
performing the work, including but not limited to:
  • Work schedules and hours
  • Assignment of personnel
  • Tools and equipment used
  • Specific work techniques

3. COMPENSATION
Company shall pay Contractor the amounts set forth in each Work Order. Payment shall
be made within fifteen (15) days of:
  a) Contractor's completion of the work;
  b) Submission of all required documentation (photos, invoice, affidavit);
  c) Company's written approval of the work.

4. WORK ORDER AUTHORIZATION
No work shall commence until a Work Order is signed by both parties. Each Work Order
serves as a task contract and purchase order between Company and Contractor and
incorporates the terms of this Master Agreement. Each Work Order shall specify:
  • Job ID and property address
  • Detailed scope of work
  • Contractor pricing (parts, pressure reducer, device, software, labor)
  • Installation schedule

5. DOCUMENTATION REQUIREMENTS
For each job, Contractor must provide:
  a) Before, during, and after photographs;
  b) Final invoice with line-item detail;
  c) Affidavit of Service (signed under penalty of perjury);
  d) Conditional Lien Release (upon submission of final invoice);
  e) Unconditional Lien Release (after payment clears).
All documents may be signed electronically via DocuSign, and electronic signatures
shall have the same legal effect as manual signatures under the California Uniform
Electronic Transactions Act.

6. RESALE CERTIFICATE
Company holds a valid California Resale Certificate (Seller's Permit #XXXXXX).
Contractor may elect to accept this certificate for each job:
  IF YES: Contractor shall NOT charge sales tax on materials. Company will charge
          and remit all applicable sales tax to the homeowner and taxing authorities.
  IF NO:  Contractor shall include applicable sales tax in their pricing. Company
          will NOT add additional tax at retail.
The election shall be made at the time of bidding for each job.

7. NON-CIRCUMVENTION
Contractor agrees not to solicit, contact, or perform work directly for any property
owner introduced through MrSurety for a period of twenty-four (24) months following
the completion of the last job for that property owner. Breach of this section shall
result in liquidated damages equal to the full margin MrSurety would have earned on
any such work.

8. LICENSE AND INSURANCE
Contractor represents that they hold a valid, active contractor's license and maintain
general liability insurance with minimum coverage of $1,000,000. Proof shall be
uploaded annually and upon request.

9. INDEMNIFICATION
Contractor agrees to indemnify and hold harmless Company from any claims arising out
of Contractor's work, including but not limited to property damage, personal injury,
or faulty workmanship.

10. TERMINATION
Either party may terminate this Agreement upon thirty (30) days written notice. Jobs
in progress at the time of termination shall be completed under the terms of this
Agreement.

11. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first
written above.

CONTRACTOR:

[Signer Name], [Title]
[Contractor Business Name]
CSLB #[License]
Date: [Date]

COMPANY:

[Operations Manager Name], Operations Manager
MrSurety, Inc.
Date: [Date]

[Electronically signed via DocuSign]
[DocuSign Timestamp: [Date and Time]]
```

---

### DocuSign 2 – Work Order / Task Contract (Per Job)

- **Envelope ID:** DS-12345-78902 *(reference job JOB-WL-7890)*
- **Trigger:** Job assigned to contractor (after deposit received)
- **Sent To:** Contractor (Jane Doe, Plumb Perfect Inc.)
- **From:** MrSurety Operations Team

**DocuSign Envelope:**
```
To:   Jane Doe, Plumb Perfect Inc.
From: MrSurety, Inc.
Subject: Please sign: Work Order for Job [Job ID]

Dear Jane Doe,

A new job has been assigned to you. Please review and sign the attached Work Order
to authorize work.

JOB SUMMARY:
  Job ID:             [Job ID]
  Property:           [Address]
  Homeowner:          [Homeowner Name]
  Installation Date:  [Date] @ [Time]
  Contractor Payment: $[Amount]

CLICK HERE TO REVIEW AND SIGN: [DocuSign Link]

Once signed, you may proceed with the work on the scheduled date.

Thank you,
MrSurety Operations Team
```

**Document: WORK ORDER AND TASK CONTRACT**
```
WORK ORDER AND TASK CONTRACT
(Purchase Order / Promise to Pay)

Work Order #: [WO Number]
Date: [Date]
Service Category: Water Mitigation

THIS WORK ORDER is entered into under the Master Services Agreement dated [MSA Date],
between:

  MrSurety, Inc. ("Company")
  1253 E Imperial Hwy
  Placentia, CA 92870

AND

  [Contractor Business Name] ("Contractor")
  [Contractor Address]
  CSLB #: [License Number]

1. JOB IDENTIFICATION
+-------------------------------+---------------------------------------+
| Field                         | Information                           |
+-------------------------------+---------------------------------------+
| Job ID                        | [Job ID]                              |
| Property Owner                | [Homeowner Name]                      |
| Property Address              | [Address]                             |
| Square Footage                | [Sq Ft] sq ft                         |
| Property Age                  | [Age] years                           |
| Pressure Reducer Required     | YES (home >5 years)                   |
| Pipe Size                     | [Size] inch                           |
| Extension Cord                | [Length] ft                           |
| Software Setup Required       | YES                                   |
+-------------------------------+---------------------------------------+

2. SCOPE OF WORK
Contractor agrees to perform the following loss prevention services:
+---+----------------------------------------+---------------------------------------+
| # | Description                            | Details                               |
+---+----------------------------------------+---------------------------------------+
| 1 | Install Pressure Reducer/Regulator     | [Size]" pressure regulator on main    |
|   |                                        | water line                            |
| 2 | Install [Device Name]                  | Complete system with leak detectors   |
|   |                                        | and automatic shutoff valve           |
| 3 | Install Parts & Fittings               | All necessary pipe fittings,          |
|   |                                        | connectors, and misc supplies         |
| 4 | Install Extension Cable                | [Length] ft extension cable           |
|   |                                        | from exterior outlet                  |
| 5 | Software Setup & Configuration         | WiFi connection, app configuration,   |
|   |                                        | system testing, auto-shutoff          |
|   |                                        | verification                          |
+---+----------------------------------------+---------------------------------------+

3. MATERIALS
Contractor has confirmed acceptance of MrSurety Resale Certificate for this job.
+-------------------------------+----------+-----------------------+
| Material                      | Quantity | Source                |
+-------------------------------+----------+-----------------------+
| Pressure Reducer              | 1 unit   | Contractor supplied   |
| Pipe Fittings & Misc Kit      | 1 unit   | Contractor supplied   |
| Extension Cable               | 1 unit   | Contractor supplied   |
| [Device Name]                 | 1 unit   | Contractor supplied   |
+-------------------------------+----------+-----------------------+
Contractor represents that all materials are in inventory and available for this job.

4. COMPENSATION AND PROMISE TO PAY
Company promises to pay Contractor the total sum of $[Total] for the complete and
satisfactory performance of the work described in this Work Order.
+--------------------------------------+----------+
| Component                            | Amount   |
+--------------------------------------+----------+
| Parts (Fittings & Misc + Cable)      | $[Amt]   |
| Pressure Reducer                     | $[Amt]   |
| Device ([Device Name])               | $[Amt]   |
| Software Setup & Configuration       | $[Amt]   |
| Labor                                | $[Amt]   |
| TOTAL CONTRACTOR PAYMENT             | $[Total] |
+--------------------------------------+----------+

NOTE: The homeowner will be charged a separate $95 Service Fee by MrSurety for
compliance documentation, lien releases, and certificate generation. This fee is
retained by MrSurety and does not affect contractor compensation.

5. PAYMENT TERMS
Company shall pay Contractor within fifteen (15) days of:
  a) Completion of all work described herein;
  b) Submission of all required documentation (photos, invoice, affidavit);
  c) Company's written approval of the work.

6. SCHEDULE
+--------------------+---------------+
| Field              | Information   |
+--------------------+---------------+
| Installation Date  | [Date]        |
| Installation Time  | [Time]        |
| Estimated Duration | [N]-[N] hours |
+--------------------+---------------+
Contractor shall notify Company immediately of any delays.

7. RESALE CERTIFICATE ACKNOWLEDGMENT
+--------------------------------------------+--------+
| Field                                       | Status |
+--------------------------------------------+--------+
| Accept MrSurety Resale Certificate?         | YES    |
| Sales Tax Handling                          | Contractor has NOT included sales tax |
|                                             | in pricing. Company will charge and   |
|                                             | remit all applicable sales tax.       |
+--------------------------------------------+--------+

8. AUTHORIZATION
By signing below, Company issues this Work Order as a binding task contract and
purchase order. By signing below, Contractor agrees to perform the work in a
professional and workmanlike manner and in accordance with all applicable laws and
manufacturer specifications.

9. INCORPORATION OF MASTER AGREEMENT
This Work Order is subject to all terms and conditions of the Master Services
Agreement between the parties, which are incorporated herein by reference.

COMPANY AUTHORIZATION (ISSUING THIS WORK ORDER):

[Name], Operations Manager
MrSurety, Inc.
Date: [Date]

CONTRACTOR ACCEPTANCE (AGREEING TO PERFORM TASK):

[Signer Name], [Title]
[Contractor Business Name]
CSLB #[License]
Date: [Date]

[Electronically signed via DocuSign]
[DocuSign Timestamp: [Date and Time]]
```

---

### DocuSign 3 – Affidavit of Service (Per Job)

- **Envelope ID:** DS-12345-78903 *(reference job JOB-WL-7890)*
- **Trigger:** Contractor marks job complete in mobile app
- **Sent To:** Contractor (Jane Doe, Plumb Perfect Inc.)
- **From:** MrSurety Compliance Team

**DocuSign Envelope:**
```
To:   Jane Doe, Plumb Perfect Inc.
From: MrSurety, Inc.
Subject: Please sign: Affidavit of Service for Job [Job ID]

Dear Jane Doe,

You have marked Job [Job ID] as complete. Please review and sign the attached
Affidavit of Service to verify the work performed.

JOB SUMMARY:
  Job ID:          [Job ID]
  Property:        [Address]
  Completion Date: [Date]

CLICK HERE TO REVIEW AND SIGN: [DocuSign Link]

This affidavit is required before payment can be processed.

Thank you,
MrSurety Compliance Team
```

**Document: AFFIDAVIT OF SERVICE**
```
AFFIDAVIT OF SERVICE

Job ID:             [Job ID]
Date of Service:    [Date]
Property Address:   [Address]

I, [Signer Name], declare as follows:

1. IDENTITY AND LICENSE
I am the owner and authorized representative of [Contractor Business Name], a
licensed contractor in the State of California. My contractor license number is
CSLB #[License]. My contractor license is active and in good standing.

2. SERVICES PERFORMED
On [Date], I personally performed and/or supervised the following loss prevention
services at the property located at [Address]:

+-------------------------------+--------------------------------------+-----------+
| Service                       | Details                              | Location  |
+-------------------------------+--------------------------------------+-----------+
| Pressure Reducer Installation | [Size]" Pressure Reducer/Regulator   | Basement, |
|                               | installed on main water line         | main line |
|                               | Model: [Model]                       |           |
|                               | Serial Number: [S/N]                 |           |
+-------------------------------+--------------------------------------+-----------+
| [Device Name] Installation    | Complete system with automatic       | Main valve|
|                               | shutoff valve and [N] leak detectors | at [loc]; |
|                               | Model (valve): [Model]               | detectors |
|                               | Model (detectors): [Model]           | at [locs] |
|                               | Serial Number: [S/N]                 |           |
+-------------------------------+--------------------------------------+-----------+
| Software Setup & Configuration| WiFi connection established; mobile  | N/A       |
|                               | app configured; auto-shutoff tested  |           |
+-------------------------------+--------------------------------------+-----------+
| Parts & Fittings Installation | All pipe fittings, connectors, and   | Throughout|
|                               | misc supplies installed              | water line|
+-------------------------------+--------------------------------------+-----------+
| Extension Cable Installation  | [Length] ft extension cable          | Exterior  |
|                               | ([spec]) installed                   | outlet to |
|                               |                                      | system    |
+-------------------------------+--------------------------------------+-----------+

3. MATERIALS USED
All materials used in this installation were new, of good quality, and installed in
accordance with manufacturer specifications and industry standards.

4. WORKMANSHIP
All work was completed in a professional and workmanlike manner, in compliance with
all applicable California codes and regulations. The system has been fully tested
and is operating as intended.

5. SOFTWARE CONFIRMATION
The [device] software has been successfully configured with the following confirmed:
  ✓ WiFi connection established and stable
  ✓ Mobile app installed on homeowner's device
  ✓ Leak detectors paired with system
  ✓ Auto-shutoff function tested and verified
  ✓ Homeowner instructed on system operation

6. PHOTOGRAPHIC EVIDENCE
Attached hereto are true and accurate photographs of the completed work, including:
  • Before photos ([N])
  • During installation photos ([N])
  • After completion photos ([N])
  • Close-up of installed components with serial numbers ([N])

7. RELIANCE
I understand that this document may be relied upon by:
  • The above-named property owner
  • Their insurance agent
  • Their insurance carrier for underwriting purposes
  • MrSurety, Inc. for compliance verification

8. DECLARATION UNDER PENALTY OF PERJURY
I declare under penalty of perjury under the laws of the State of California that
the foregoing is true and correct and that this affidavit is executed on the date
below.

Executed on [Date], at [City], California.

[Signer Name], [Title]
[Contractor Business Name]
CSLB #[License]

[Electronically signed via DocuSign]
[Under California Uniform Electronic Transactions Act (Civil Code §1633.1 et seq.),
this electronic signature has the same legal effect as a manual signature.]
[DocuSign Timestamp: [Date and Time]]
```

---

### DocuSign 4 – Conditional Lien Release with Invoice Verification (Per Job)

- **Envelope ID:** DS-12345-78904 *(reference job JOB-WL-7890)*
- **Trigger:** Contractor marks job complete; sent simultaneously with Affidavit of Service
- **Sent To:** Contractor (Jane Doe, Plumb Perfect Inc.)
- **From:** MrSurety Compliance Team

**DocuSign Envelope:**
```
To:   Jane Doe, Plumb Perfect Inc.
From: MrSurety, Inc.
Subject: Please sign: Conditional Lien Release for Job [Job ID]

Dear Jane Doe,

Please review and sign the attached Conditional Lien Release for Job [Job ID].

IMPORTANT: This document includes your final invoice and requires your verification
that all work was completed at the property address shown.

JOB SUMMARY:
  Job ID:          [Job ID]
  Property:        [Address]
  Payment Amount:  $[Amount]

CLICK HERE TO REVIEW AND SIGN: [DocuSign Link]

This release is CONDITIONAL upon clearance of your payment. Once signed and admin
approved, your payment will be processed.

Thank you,
MrSurety Compliance Team
```

**Document: CONDITIONAL WAIVER AND RELEASE UPON FINAL PAYMENT**
```
CONDITIONAL WAIVER AND RELEASE UPON FINAL PAYMENT

+------------------+---------------------------------------+
| Field            | Information                           |
+------------------+---------------------------------------+
| Job ID           | [Job ID]                              |
| Property Address | [Address]                             |
| Property Owner   | [Homeowner Name]                      |
| Contractor Name  | [Signer Name]                         |
| Business Name    | [Contractor Business Name]            |
| CSLB License #   | [License Number]                      |
| Payment Amount   | $[Amount]                             |
| Completion Date  | [Date]                                |
+------------------+---------------------------------------+

INVOICE REFERENCE
The following invoice is attached to and incorporated in this release:
+------------------+-------------------+
| Field            | Information       |
+------------------+-------------------+
| Invoice #        | [Invoice Number]  |
| Invoice Date     | [Date]            |
| Total Amount     | $[Amount]         |
+------------------+-------------------+

Invoice Line Items                            | Amount
Parts (Fittings & Misc + Extension Cable)     | $[Amt]
Pressure Reducer                              | $[Amt]
Device ([Device Name])                        | $[Amt]
Software Setup & Configuration                | $[Amt]
Labor                                         | $[Amt]
TOTAL                                         | $[Total]

CONTRACTOR VERIFICATION
I, [Signer Name], hereby verify and affirm that:
+----------+--------------------------------------------------------------------+
| Initials | Verification                                                       |
+----------+--------------------------------------------------------------------+
| [Init]   | The work described in the attached invoice has been completely      |
|          | performed at the property address shown above.                     |
| [Init]   | All parts, pressure reducer, device, and software listed in the    |
|          | invoice were installed and/or configured at this property address. |
| [Init]   | The invoice is true, accurate, and reflects the actual work        |
|          | performed and materials/devices provided.                          |
| [Init]   | I understand that this release is CONDITIONAL upon clearance of    |
|          | the payment identified below.                                      |
+----------+--------------------------------------------------------------------+

RELEASE OF CLAIMS
The undersigned contractor hereby waives and releases any and all claims, mechanics
liens, stop notices, or rights against the above-referenced property for labor,
services, parts, pressure reducer, device, and software furnished through [Date],
UPON RECEIPT of the above-referenced payment of $[Amount].

CONDITIONAL NATURE OF RELEASE
The contractor acknowledges that this release is CONDITIONAL upon clearance of the
payment identified above. If the payment is reversed, stopped, or fails to clear for
any reason, this release shall be null and void and of no force or effect.

SUBCONTRACTOR AND SUPPLIER REPRESENTATION
The contractor further represents that all subcontractors and suppliers have been
paid or will be paid from the proceeds of this payment.

EXECUTION
Executed this [Date].

[Signer Name], [Title]
[Contractor Business Name]
CSLB #[License]

[ELECTRONIC SIGNATURE ACCEPTED]
[DocuSign Timestamp: [Date and Time]]

ATTACHMENT: INVOICE #[Invoice Number]

[Contractor Business Name]
[Contractor Address]
[Contractor Phone]

INVOICE
+------------------+-------------------------------+
| Field            | Information                   |
+------------------+-------------------------------+
| Invoice #        | [Invoice Number]              |
| Date             | [Date]                        |
| Job ID           | [Job ID]                      |
| Bill To          | MrSurety, Inc.                |
| Property         | [Address]                     |
+------------------+-------------------------------+

Description                                     | Amount
Parts (Fittings & Misc + Extension Cable)        | $[Amt]
Pressure Reducer/Regulator                       | $[Amt]
[Device Name] (complete)                         | $[Amt]
Software Setup & Configuration                   | $[Amt]
Labor – Installation                             | $[Amt]
TOTAL                                            | $[Total]

Payment Terms: Net 15 days after approval
Resale Certificate: Accepted – No tax charged
```

---

### DocuSign 5 – Unconditional Lien Release (Per Job)

- **Envelope ID:** DS-12345-78905 *(reference job JOB-WL-7890)*
- **Trigger:** Contractor payment clears (approximately 2–3 business days after payment sent)
- **Sent To:** Contractor (Jane Doe, Plumb Perfect Inc.)
- **From:** MrSurety Compliance Team
- **⚠️ IMPORTANT:** Contractor's platform access is LIMITED until this document is signed.

**DocuSign Envelope:**
```
To:   Jane Doe, Plumb Perfect Inc.
From: MrSurety, Inc.
Subject: URGENT: Unconditional Lien Release Required - Job [Job ID]

Dear Jane Doe,

Payment for Job [Job ID] has cleared. Please sign the attached Unconditional Lien
Release to complete this job.

IMPORTANT NOTICE: Your access to the MrSurety contractor platform is currently
LIMITED until this document is signed.

JOB SUMMARY:
  Job ID:              [Job ID]
  Property:            [Address]
  Payment Amount:      $[Amount]
  Payment Clear Date:  [Date]

CLICK HERE TO REVIEW AND SIGN: [DocuSign Link]

Once signed, your platform access will be restored immediately.

Thank you,
MrSurety Compliance Team
```

**Document: UNCONDITIONAL WAIVER AND RELEASE UPON FINAL PAYMENT**
```
UNCONDITIONAL WAIVER AND RELEASE UPON FINAL PAYMENT

+--------------------+---------------------------------------+
| Field              | Information                           |
+--------------------+---------------------------------------+
| Job ID             | [Job ID]                              |
| Property Address   | [Address]                             |
| Property Owner     | [Homeowner Name]                      |
| Contractor Name    | [Signer Name]                         |
| Business Name      | [Contractor Business Name]            |
| CSLB License #     | [License Number]                      |
| Payment Amount     | $[Amount]                             |
| Completion Date    | [Date]                                |
| Payment Clear Date | [Date]                                |
+--------------------+---------------------------------------+

ACKNOWLEDGMENT OF RECEIPT
The undersigned contractor hereby acknowledges RECEIPT of the above-referenced
payment in the amount of $[Amount] for labor, services, equipment, and materials
furnished for the above-referenced property.

UNCONDITIONAL RELEASE
The undersigned contractor UNCONDITIONALLY waives and releases any and all claims,
mechanics liens, stop notices, or rights against the above-referenced property for
labor, services, parts, pressure reducer, device, software, and materials furnished
through [Date].

FINALITY OF RELEASE
The contractor acknowledges that this release is UNCONDITIONAL and final, and that
payment has been received and cleared. No further claims of any kind shall be made
against the property, property owner, or MrSurety arising from this job.

SUBCONTRACTOR AND SUPPLIER REPRESENTATION
The contractor further represents that all subcontractors and suppliers have been
paid in full from the proceeds of this payment and have no claims against the
property.

PLATFORM ACCESS NOTICE
Execution of this document is required for continued access to the MrSurety
contractor platform. Until this document is signed, contractor account access will
be limited to signing this document only.

EXECUTION
Executed this [Date].

[Signer Name], [Title]
[Contractor Business Name]
CSLB #[License]

[ELECTRONIC SIGNATURE ACCEPTED]
[DocuSign Timestamp: [Date and Time]]
```

---

### DocuSign 6 – Release of Liability – Critical Services Only (Template)

> **NOTE:** This document is included for completeness but was **NOT required** for Job JOB-WL-7890 as it was not a Critical Service. It is shown here as a template for future Critical Service jobs (e.g., emergency valve replacement requiring water main shutoff).

- **Trigger:** Homeowner requests Critical Water Service; contractor is on-site
- **Sent To:** Homeowner
- **From:** MrSurety Compliance Team

**DocuSign Envelope (Template):**
```
To:   [Homeowner Name]
From: MrSurety, Inc.
Subject: URGENT: Release of Liability Required Before Work Begins

Dear [Homeowner],

You have requested Critical Water Service for valve replacement at [Address].

Due to the nature of this service (water main shutoff required), California law
requires that you sign a Release of Liability before work can begin.

CLICK HERE TO REVIEW AND SIGN: [DocuSign Link]

The contractor is on site and ready to proceed once this document is signed.

Thank you,
MrSurety Compliance Team
```

**Document: RELEASE OF LIABILITY – CRITICAL WATER SERVICE (Template)**
```
RELEASE OF LIABILITY – CRITICAL WATER SERVICE

+------------------+--------------------+
| Field            | Information        |
+------------------+--------------------+
| Job ID           | [Job ID]           |
| Date             | [Date]             |
| Property Address | [Address]          |
| Homeowner        | [Name]             |
| Contractor       | [Contractor Name]  |
+------------------+--------------------+

I, [Homeowner Name], acknowledge that I have requested water main service due to a
valve needing to be replaced at the above property.

I UNDERSTAND AND AGREE THAT:
1. This work requires shutting off water at the street, which may affect water
   service to my property for an extended period.
2. The contractor, [Contractor Name], is responding to address the valve replacement
   on an expedited basis.
3. Due to the nature of this repair, there are increased risks including but not
   limited to:
   • Unexpected pipe conditions behind walls or underground
   • Hidden damage not visible during initial assessment
   • Need for water shutoff without full evaluation of the entire system
   • Potential for additional damage when old valves are removed

I release and hold harmless MrSurety, Inc. and [Contractor Name] from any and all
claims, damages, or liability arising directly from the emergency nature of this
service, EXCLUDING claims for gross negligence or willful misconduct.

I understand that normal warranty terms still apply to materials and workmanship once
the repair is completed, but not to pre-existing conditions discovered during
the repair.

I have been advised of the potential need for additional repairs and understand that
a change order may be required if unforeseen conditions are discovered.

I HAVE READ AND UNDERSTAND THIS RELEASE OF LIABILITY AND AGREE TO ITS TERMS.

HOMEOWNER:

[Homeowner Name]
Date: _______________

CONTRACTOR WITNESS:

[Contractor Representative]
[Contractor Name]
Date: _______________

[ELECTRONIC SIGNATURE ACCEPTED]
```

---

### Summary of All DocuSign Documents for Job JOB-WL-7890

| #  | Document                              | Sent To            | Sent Date     | Signed Date   | Status |
|----|---------------------------------------|--------------------|---------------|---------------|--------|
| 1  | Contractor Master Services Agreement  | Plumb Perfect Inc. | Jan 15, 2026  | Jan 15, 2026  | Signed |
| 2  | Work Order / Task Contract            | Plumb Perfect Inc. | Mar 22, 2026  | Mar 22, 2026  | Signed |
| 3  | Affidavit of Service                  | Plumb Perfect Inc. | Mar 28, 2026  | Mar 28, 2026  | Signed |
| 4  | Conditional Lien Release w/ Invoice   | Plumb Perfect Inc. | Mar 28, 2026  | Mar 28, 2026  | Signed |
| 5  | Unconditional Lien Release            | Plumb Perfect Inc. | Apr 2, 2026   | Apr 2, 2026   | Signed |

> **END OF COMPLETE EMAILS AND DOCUSIGN DOCUMENTS SPECIFICATION**

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
