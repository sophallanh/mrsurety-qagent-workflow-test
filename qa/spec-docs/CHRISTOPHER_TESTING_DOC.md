# MR SURETY – TESTING GUIDE FOR QA TEAM

> **This is the primary source-of-truth document for QA testing on MrSurety.**  
> When in doubt about any workflow, field, email, or expected behavior — check here first.  
>
> **Google Doc (original):** https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing  
> **Prepared by:** Christopher Palmer (c.palmer@mrsurety.com)  
> **Last updated in repo:** 2026-03-14

---

## ADDITIONAL TESTING INFORMATION

Based on our complete platform specification, here are additional details to help you test thoroughly:

---

## PART 1: USER TYPES TO CREATE

| User Type | Email Domain | Notes |
|-----------|-------------|-------|
| Homeowner | @test.com / @outlook.com | Create multiple with different property addresses |
| Contractor | @test.com | Must have CSLB license number (use **999888** for testing) |
| Insurance Agent | @test.com | Will receive referral links and client updates |
| Technician | @test.com | For assessment service testing |
| Admin | Already provided | admin@mrsurety.com / MrSurety2026! |

### QA Test Accounts (pre-created in this repo)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mrsurety.com | MrSurety2026! |
| Agent 1 | agent.test1@outlook.com | QAtest@2026! |
| Agent 2 | agent.test2@outlook.com | QAtest@2026! |
| Homeowner A (referral link) | homeowner.test2@outlook.com | QAtest@2026! |
| Homeowner B (agent email) | homeowner.test1@outlook.com | QAtest@2026! |
| Homeowner C (no agent) | homeowner.test3@outlook.com | QAtest@2026! |
| Contractor 1 | contractor.test1@outlook.com | QAtest@2026! |
| Contractor 2 | contractor.test2@outlook.com | QAtest@2026! |
| Technician | tech.test1@outlook.com | QAtest@2026! |
| Insurance Agent | ins.test2026@outlook.com | QAtest@2026! |

---

## PART 2: KEY WORKFLOWS TO TEST

### WORKFLOW 1: AGENT REFERRAL (TWO METHODS)

#### Method A – Agent Creates Referral Link

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Agent logs in and copies unique referral link | Link format: mrsurety.com/ref/AGENT123 |
| 2 | Open incognito browser, paste link | Landing page shows "Brought to you by [Agent Name]" |
| 3 | Complete service request form | Job automatically linked to agent |
| 4 | Check agent portal | New client appears in agent's dashboard |

#### Method B – Homeowner Adds Agent Email

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Homeowner goes directly to site (no referral link) | Standard service request form |
| 2 | In insurance section, enter agent email | Field accepts email |
| 3 | Submit request | System creates pending agent record |
| 4 | Check admin dashboard | Pending agent appears for approval |
| 5 | Approve agent | Agent receives welcome email |

#### Test Multiple Scenarios

- Same homeowner with multiple properties – each should track separately
- Same agent with multiple homeowners – all appear in agent portal
- Agent referral link used multiple times – each creates separate job

---

### WORKFLOW 2: HOMEOWNER SERVICE REQUEST

#### Form Sections to Test

| Section | Test Cases |
|---------|-----------|
| Account | New user signup / Existing user login |
| Service Type | Installation vs Assessment |
| Property Address | Same/different billing address |
| Insurance Info | With/without agent email, with/without policy number |
| Home Specifics | Different sq ft (impacts pipe size calc), different year built (impacts pressure reducer requirement) |
| Device Info | All device type options, all device source options, software yes/no |
| Water Main Photo | **REQUIRED** – test upload, test skipping (should error) |
| LiDar | Optional – test with/without |
| Access Notes | Test special instructions |
| Contact | All contact methods |

#### Pipe Size Logic to Verify

| Square Footage | Expected Pipe Size |
|----------------|-------------------|
| Under 2000 sq ft | 3/4 inch |
| 2001–3000 sq ft | 1 inch |
| 3001–5000 sq ft | 1 1/4 inch |

#### Pressure Reducer Logic

- Home built **> 5 years ago** = **REQUIRED**
- Home built **≤ 5 years ago** = **NOT REQUIRED**

---

### WORKFLOW 3: CONTRACTOR BIDDING (TWO METHODS)

#### Method A – Upload Written Estimate

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Contractor views available jobs | Sees job details + pricing guidance |
| 2 | Select "Upload written estimate" | Upload field appears |
| 3 | Upload PDF or photo of estimate | File uploads successfully |
| 4 | Enter parts total with description | Field accepts text |
| 5 | Enter pressure reducer price | Field accepts number |
| 6 | Check software checkbox (if requested) | $75 added to bid |
| 7 | Enter labor price | Field accepts number |
| 8 | Select Resale Certificate (Yes/No) | Affects tax handling |
| 9 | Submit bid | Confirmation email sent |

#### Method B – System Estimate Creator

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Select "Use estimate creator" | Line item table appears |
| 2 | Add multiple line items with quantities | Auto-calculates totals |
| 3 | Enter pressure reducer as separate line | Field accepts |
| 4 | Device field auto-populates $599.99 if providing | Read-only field |
| 5 | Software checkbox (if requested) | Adds $75 flat |
| 6 | Enter labor price | Field accepts |
| 7 | Select Resale Certificate | Tax handling set |
| 8 | Submit bid | Confirmation email sent |

**Test Both Methods Multiple Times**

---

### WORKFLOW 4: HOMEOWNER SELECTION & DEPOSIT

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Homeowner receives "Estimates Ready" email | Links to estimate page |
| 2 | View multiple estimates | Shows retail prices only (no contractor prices) |
| 3 | Select a contractor | "Approve & Schedule" button works |
| 4 | Pay 10% deposit | Payment processes, email confirmation sent |
| 5 | Select installation date from calendar | Date saves, contractor notified |

**Verify:** Service Fee ($95) appears in all estimates as separate line item

#### Verify Retail Calculations (Example)

| Component | Contractor Price | Markup | Retail |
|-----------|----------------|--------|--------|
| Parts | $220 | +35% | $297 |
| Pressure | $280 | +35% | $378 |
| Cable | $25 | +35% | $33.75 |
| Software | $75 | +25% | $93.75 |
| Labor | $575 | +25% | $718.75 |
| Service Fee | — | — | +$95 |
| Tax | — | — | Calculated on total |

---

### WORKFLOW 5: CONTRACTOR WORK ORDER & JOB EXECUTION

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Contractor receives "New Job Assignment" email | Links to contractor portal |
| 2 | Contractor receives DocuSign: Work Order | Document matches bid prices |
| 3 | Sign Work Order | Status updates |
| 4 | On job day, check in via app | GPS, timestamp, photo captured |
| 5 | Perform work | — |
| 6 | If change order needed: create in app | Homeowner receives notification |
| 7 | Homeowner approves/declines change order | Contractor notified |
| 8 | Complete work | — |
| 9 | Upload photos and final invoice | Files upload successfully |
| 10 | Receive DocuSign: Affidavit of Service | Sign |
| 11 | Receive DocuSign: Conditional Lien Release | Includes invoice, requires initials |
| 12 | Sign both | Status updates to "Pending Review" |

---

### WORKFLOW 6: ADMIN APPROVAL & PAYMENT

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Admin receives "Work Ready for Approval" email | Links to job |
| 2 | Review photos and documents | All present |
| 3 | Approve work | Payment processes |
| 4 | Contractor receives "Payment Sent" email | Shows amount |
| 5 | Wait 3 days (or simulate payment cleared) | — |
| 6 | Contractor receives DocuSign: Unconditional Lien Release | Email with link |
| 7 | **IMPORTANT:** Before signing, check contractor portal access | Should be limited |
| 8 | Sign Unconditional Lien Release | Portal access restored |
| 9 | Homeowner receives "Certificate Ready" email | Links to download |

---

### WORKFLOW 7: RETURN SERVICE CALL

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Homeowner requests additional work after completion | Via portal or phone |
| 2 | Admin creates Return Service Call Work Order | — |
| 3 | Contractor receives email with DocuSign | "Return Service Call Work Order" |
| 4 | Sign | Job created |
| 5 | Complete work | Follows same completion flow |

---

### WORKFLOW 8: CRITICAL SERVICE (EMERGENCY)

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Homeowner requests emergency water main service | Special form or phone |
| 2 | System assigns nearest contractor | Immediate notification |
| 3 | Homeowner receives DocuSign: Critical Change Order and Liability Release | Must sign before work |
| 4 | Sign | Contractor notified to proceed |
| 5 | Complete work | Follows same completion flow |

---

### WORKFLOW 9: ASSESSMENT SERVICE

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Homeowner selects "Request Property Assessment" | — |
| 2 | System calculates fee: $185 + $0.75/mile | Shows estimated total |
| 3 | Homeowner confirms and pays invoice | Payment processed |
| 4 | Technician receives assignment email | Contains property details |
| 5 | Technician schedules visit | — |
| 6 | Technician completes assessment | — |
| 7 | Technician uploads assessment report | — |
| 8 | Homeowner notified | Can now proceed with installation |

---

## PART 3: EMAIL TESTING CHECKLIST

### Homeowner Emails (14)

| Email | Sent To | Trigger | Tested? |
|-------|---------|---------|---------|
| Welcome - Account Created | Homeowner | Signup | ☐ |
| Service Request Received | Homeowner | Form submit | ☐ |
| Estimates Ready | Homeowner | First bid | ☐ |
| Deposit Required | Homeowner | Contractor selected | ☐ |
| Installation Confirmed | Homeowner | Deposit paid | ☐ |
| Reminder - Tomorrow | Homeowner | 24hr before | ☐ |
| Contractor Arrived | Homeowner | Check-in | ☐ |
| Change Order Created | Homeowner | Contractor creates | ☐ |
| Critical Release Required | Homeowner | Emergency | ☐ |
| Work Complete - Final Payment | Homeowner | Job done | ☐ |
| Payment Received | Homeowner | Final paid | ☐ |
| Certificate Ready | Homeowner | All signed | ☐ |
| Return Service Scheduled | Homeowner | Return booked | ☐ |
| Anniversary Reminder | Homeowner | 11 months | ☐ |

### Contractor Emails (12)

| Email | Sent To | Trigger | Tested? |
|-------|---------|---------|---------|
| Welcome Contractor | Contractor | Approved | ☐ |
| New Job in Area | Contractor | Request posted | ☐ |
| Bid Received | Contractor | Bid submit | ☐ |
| Selected for Job | Contractor | Homeowner selects | ☐ |
| Sign Work Order | Contractor | Deposit paid | ☐ |
| Job Tomorrow Reminder | Contractor | 24hr before | ☐ |
| Sign Affidavit/Lien | Contractor | Job complete | ☐ |
| Payment Sent | Contractor | Admin approves | ☐ |
| Unconditional Lien Required | Contractor | Payment clears | ☐ |
| Critical Assignment | Contractor | Emergency | ☐ |
| Return Service Work Order | Contractor | Return requested | ☐ |
| Change Order Approved | Contractor | Homeowner approves | ☐ |

### Agent Emails (7)

| Email | Sent To | Trigger | Tested? |
|-------|---------|---------|---------|
| Welcome Agent | Agent | Account created | ☐ |
| Client Started Request | Agent | Client uses link | ☐ |
| Client Selected Contractor | Agent | Job confirmed | ☐ |
| Client Critical Service | Agent | Emergency | ☐ |
| Client Installation Complete | Agent | Work done | ☐ |
| Certificate Ready | Agent | All signed | ☐ |
| Client Renewal Reminder | Agent | 11 months | ☐ |

### Technician Emails (4)

| Email | Sent To | Trigger | Tested? |
|-------|---------|---------|---------|
| Welcome Technician | Technician | Account created | ☐ |
| New Assessment | Technician | Assessment paid | ☐ |
| Assessment Reminder | Technician | 24hr before | ☐ |
| Report Upload Required | Technician | Visit done | ☐ |

### Admin Emails (4)

| Email | Sent To | Trigger | Tested? |
|-------|---------|---------|---------|
| New Contractor Application | Admin | Contractor signs up | ☐ |
| Work Ready for Approval | Admin | Job complete | ☐ |
| Critical Service Alert | Admin | Emergency | ☐ |
| Quarterly Tax Report | Admin | Quarter end | ☐ |

**Total: 41 emails across 5 user types**

---

## PART 4: DOCUSIGN TESTING CHECKLIST

| Document | Sent To | Trigger | Tested? |
|----------|---------|---------|---------|
| Contractor Master Services Agreement | Contractor | Joins network | ☐ |
| Work Order / Task Contract | Contractor | Deposit paid | ☐ |
| Critical Change Order and Liability Release | Homeowner | Emergency | ☐ |
| Return Service Call Work Order | Contractor | Return requested | ☐ |
| Affidavit of Service | Contractor | Job complete | ☐ |
| Conditional Lien Release w/ Invoice | Contractor | Docs submitted | ☐ |
| Unconditional Lien Release | Contractor | Payment clears | ☐ |
| Change Order | Homeowner | During job | ☐ |

**Total: 8 DocuSign documents**

---

## PART 5: SPECIAL TESTING SCENARIOS

### Scenario A: Resale Certificate Acceptance

| Contractor Selects | Tax Handling |
|-------------------|-------------|
| Yes – Accept Resale Certificate | Contractor enters prices WITHOUT tax. MrSurety adds tax at retail. |
| No – Does NOT accept | Contractor includes tax in prices. MrSurety adds NO additional tax. |

Test both options and verify final homeowner price reflects correctly.

### Scenario B: Software Setup Assistance

| Homeowner Requests | Contractor Chooses | Result |
|-------------------|-------------------|--------|
| Yes | Includes ($75) | Software appears in bid, retail +25% |
| Yes | Does NOT include | No software line, homeowner handles themselves |
| No | N/A | No software option |

### Scenario C: Device Source

| Device Source | Price Handling |
|--------------|---------------|
| Contractor Provided | $599.99 fixed, 0% markup |
| Homeowner Provided | $0, no device charge |
| Insurance Provided | $0, no device charge |

### Scenario D: Multiple Properties, Same Homeowner

1. Create one homeowner account
2. Submit requests for 2–3 different addresses
3. Verify each request is separate and can have different contractors

### Scenario E: Incomplete Forms

| Action | Expected Result |
|--------|----------------|
| Skip water main photo | Form should not submit |
| Enter invalid year built | Validation error |
| Enter non-numeric sq ft | Validation error |
| Skip terms agreement | Cannot submit |

---

## PART 6: WHAT TO DOCUMENT

For each issue found:

| Field | Example |
|-------|---------|
| Date/Time | 2026-03-13 2:30 PM |
| User Type | Homeowner / Contractor / Agent |
| User Email | testuser@outlook.com |
| Step in Workflow | Step 4 – Deposit Payment |
| Expected Result | Should show confirmation email |
| Actual Result | No email received |
| Screenshot | [Attach] |
| Video (if needed) | [Link] |
| Browser/Device | Chrome 123 / iPhone 15 |
| Notes | Also tried in incognito, same issue |

---

## PART 7: UPLOAD STRUCTURE

Create folders in Google Drive:

```
/Test Results - [Your Name]/
├── Screenshots/
│   ├── Workflow 1 - Agent Referral/
│   ├── Workflow 2 - Service Request/
│   ├── Workflow 3 - Contractor Bidding/
│   └── ...
├── Videos/
│   ├── Workflow 5 - Check-in Issue.mp4
│   └── ...
├── Test User Credentials/
│   └── credentials.docx
├── Bug Reports/
│   └── bug-001-description.docx
└── Summary Report/
    └── final-report.docx
```

This repo mirrors that structure under `qa/`:

```
qa/
├── screenshots/          ← Workflow screenshots (automated by mrsurety_qa.py)
├── videos/               ← Screen recordings
├── test-user-credentials/ ← credentials.csv + TEST_USER_CREDENTIALS.md
├── bug-reports/          ← Bug report template + running log
└── summary-reports/      ← Daily QA summary reports
```

---

## PART 8: TEST USER CREDENTIALS TEMPLATE

```
=== HOMEOWNERS ================
Email: homeowner1@outlook.com
Password: Test123!
Properties: 123 Main St, 456 Oak Ave

Email: homeowner2@outlook.com
Password: Test123!
Properties: 789 Pine Ln

=== CONTRACTORS ================
Email: contractor1@outlook.com
Password: Test123!
CSLB: 999888 (test)
Resale Cert: Yes

Email: contractor2@outlook.com
Password: Test123!
CSLB: 999777 (test)
Resale Cert: No

=== AGENTS ================
Email: agent1@outlook.com
Password: Test123!
Agency: State Farm Test

=== TECHNICIANS ================
Email: tech1@outlook.com
Password: Test123!
Service Area: 92530, 92531
```

### This Repo's Pre-Created Test Accounts

See `qa/test-user-credentials/TEST_USER_CREDENTIALS.md` for the accounts already created on the live app.

---

## PART 9: SUMMARY FOR TESTER

> "You're testing a legal-compliance platform, not just a website. Emails and DocuSign documents are legally binding – they must send reliably and contain correct information.
>
> **Focus on:**
> - Agent referral linking (both methods)
> - Contractor bid methods (upload vs creator)
> - **Retail price calculations (markups + $95 fee)**
> - Email delivery at every step
> - DocuSign generation and signing flow
> - Platform access lock for Unconditional Lien Release
>
> Document everything with screenshots. If something breaks, show us the steps to reproduce.
>
> Good luck!"

---

## Where This Doc Fits in the QA Process

```
Christopher's Doc (this file / Google Doc)
        │
        ▼
qa/MANUAL_EXECUTION_GUIDE.md   ← step-by-step manual testing guide
        │
        ▼
qa/openclaw/workflows/mrsurety_qa.py  ← automated Playwright script (9 workflows)
        │
        ▼
qa/openclaw/output/                   ← screenshots, videos, reports
        │
        ▼
MrSurety_QA_YYYY-MM-DD.zip → Google Drive → Email to c.palmer@mrsurety.com
```

---

## Contact

**Christopher Palmer (MrSurety):** c.palmer@mrsurety.com  
**QA Team Lead:** Sophal Lanh

---

_Content from Christopher's Google Doc — captured 2026-03-14. Some details may evolve; discuss any discrepancies with Sophal before marking as a bug._
