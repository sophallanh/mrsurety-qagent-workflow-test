# MrSurety – Full Workflow Guide (Short Version)

**Live App:** https://frontend-tan-five-46.vercel.app  
**Source:** Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM"  
**Last Updated:** 2026-03-13  

> ⚠️ This guide reflects the actual workflow as documented by Christopher.
> If any step in the app differs from what is written here, document the discrepancy
> and discuss with Christopher before logging it as a bug.

---

## Primary User Types to Create

Per the Palmer email (Mar 13, 2026), the **3 primary user types** to create for testing are:
- **Agent** – insurance agent who generates referral codes/links
- **Contractor** – licensed contractor who bids on jobs (CSLB required; use 999888 for testing)
- **Homeowner** – property owner requesting service

All user accounts should be created by the tester. Use Outlook.com or another email service so you can receive emails during testing.

> 📸 **Screenshot Requirement:** Screenshot **all email documents** for verbiage review, including email updates and DocuSign documents. This will be **over 50 items**. Upload all to the Google Drive folder.

---

## User Types & Test Accounts (Full List)

Per Christopher's Testing Guide Part 1 & Part 8:

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| Admin | admin@mrsurety.com | MrSurety2026! | Provided by Christopher; password unchanged |
| Agent 1 | agent1@outlook.com | Test123! | Primary; use for referral link tests |
| Agent 2 | agent2@outlook.com | Test123! | Secondary; multi-agent scenarios |
| Homeowner 1 | homeowner1@outlook.com | Test123! | 1,800 sq ft; built 2010 |
| Homeowner 2 | homeowner2@outlook.com | Test123! | 2,500 sq ft; built 2022 |
| Homeowner 3 | homeowner3@outlook.com | Test123! | 3,500 sq ft; no agent |
| Contractor 1 | contractor1@outlook.com | Test123! | CSLB 999888; Resale Cert YES |
| Contractor 2 | contractor2@outlook.com | Test123! | CSLB 999777; Resale Cert NO |
| Technician | tech1@outlook.com | Test123! | Service area: 92530, 92531 |

---

## Workflow 1 – Agent Referral (Two Methods)

### Method A – Agent Creates Referral Link (Referral Code)
1. Agent logs in → copies unique referral link/code (format: `mrsurety.com/ref/AGENT123`)
2. Open incognito browser, paste link → landing page shows **"Brought to you by [Agent Name]"**
3. Homeowner completes service request form → job automatically linked to agent
4. Check agent portal → new client appears in agent's dashboard

> ⚠️ **Referral Code Validity:** Each referral code is valid only for the specific request form it was created for. It **will not carry over to future request forms**. Test both methods multiple times.

### Method B – Homeowner Adds Agent Email
1. Homeowner goes directly to site (no referral link)
2. In **Insurance section** of form, enter agent email
3. Submit → system creates pending agent record
4. Admin approves → agent receives welcome email

---

## Workflow 2 – Homeowner Service Request Form

**Service Types:** Installation vs Assessment

**Form Sections:** Account, Service Type, Property Address, Insurance Info (agent email + policy number), Home Specifics (sq ft + year built), Device Info, Water Main Photo **(REQUIRED)**, LiDar (optional), Access Notes, Contact

> ⚠️ **Multiple Addresses & Permit Types:** Homeowners may have multiple addresses in their profile. Test with different addresses **and different permit types** to verify each request is tracked separately.

### Pipe Size Logic
| Sq Ft | Pipe Size |
|-------|----------|
| Under 2,000 | 3/4 inch |
| 2,001 – 3,000 | 1 inch |
| 3,001 – 5,000 | 1 1/4 inch |

### Pressure Reducer Logic
- Home built **> 5 years ago** → **REQUIRED**
- Home built **≤ 5 years ago** → NOT required

> ⚠️ Water main photo is **REQUIRED**. Form must NOT submit without it.

---

## Workflow 3 – Contractor Bidding (Two Methods)

**Method A – Upload Written Estimate:** Parts total + description → Pressure reducer price → Software checkbox ($75) → Labor price → Resale Certificate → Submit

**Method B – System Estimate Creator:** Line item table (auto-calculates) → Pressure reducer → Device auto-populates $599.99 if contractor-provided → Software → Labor → Resale Certificate → Submit

---

## Workflow 4 – Homeowner Selection & Deposit

1. Homeowner receives "Estimates Ready" email → links to estimate page
2. View multiple estimates — **retail prices only** (no contractor prices visible)
3. **$95 Service Fee** must appear in all estimates
4. Select a contractor → "Approve & Schedule" button
5. Pay **10% deposit** → payment processes → email confirmation sent
6. Select installation date from contractor's calendar

### Retail Price Markups
| Component | Markup |
|-----------|--------|
| Parts, Pressure, Cable | +35% |
| Labor, Software | +25% |
| Device (Contractor Provided) | $599.99 fixed, 0% markup |
| Service Fee | $95.00 flat (every estimate) |

---

## Workflow 5 – Contractor Work Order & Job Execution

1. Contractor receives "New Job Assignment" email → links to portal
2. Receives DocuSign: **Work Order / Task Contract** → sign
3. On job day: **GPS check-in** (timestamp + photo captured)
4. If change order needed: create in app → homeowner receives notification
5. Homeowner approves/declines change order
6. Upload photos and final invoice
7. Sign DocuSign: **Affidavit of Service**
8. Sign DocuSign: **Conditional Lien Release** (includes invoice, requires initials)
9. Status → "Pending Review"

---

## Workflow 6 – Admin Approval & Payment

1. Admin receives "Work Ready for Approval" email → reviews photos + documents
2. Admin approves work → payment processes
3. Contractor receives "Payment Sent" email
4. Wait 3 days → payment clears
5. Contractor receives DocuSign: **Unconditional Lien Release**
6. ⚠️ **IMPORTANT: Contractor portal access is LIMITED until Unconditional Lien Release is signed**
7. After signing: portal access restored
8. Homeowner receives "Certificate Ready" email

---

## Workflow 7 – Return Service Call

1. Homeowner requests additional work after completion (via portal or phone)
2. Admin creates Return Service Call Work Order
3. Contractor receives DocuSign: **Return Service Call Work Order**
4. Sign → job created → follows same completion flow

---

## Workflow 8 – Critical Service (Emergency)

1. Homeowner requests emergency water main service
2. System assigns nearest contractor → immediate notification
3. Homeowner receives DocuSign: **Critical Change Order and Liability Release** → **must sign BEFORE work begins**
4. Contractor notified to proceed
5. Completes work → follows same completion flow

---

## Workflow 9 – Assessment Service

1. Homeowner selects "Request Property Assessment"
2. System calculates fee: **$185 + $0.75/mile** (shows estimated total)
3. Homeowner confirms and pays invoice
4. Technician receives assignment email with property details
5. Technician schedules visit
6. Technician completes assessment → uploads report
7. Homeowner notified → can proceed with installation request

---

## Email Triggers Summary (39 total)

**Homeowner (14):** Welcome, Request Received, Estimates Ready, Deposit Required, Installation Confirmed, Reminder Tomorrow, Contractor Arrived, Change Order, Critical Release, Work Complete, Payment Received, Certificate Ready, Return Service Scheduled, Anniversary Reminder

**Contractor (12):** Welcome, New Job in Area, Bid Received, Selected for Job, Sign Work Order, Job Tomorrow Reminder, Sign Affidavit/Lien, Payment Sent, Unconditional Lien Required, Critical Assignment, Return Service Work Order, Change Order Approved

**Agent (7):** Welcome, Client Started Request, Client Selected Contractor, Client Critical Service, Client Installation Complete, Certificate Ready, Client Renewal Reminder

**Technician (4):** Welcome, New Assessment, Assessment Reminder, Report Upload Required

**Admin (4):** New Contractor Application, Work Ready for Approval, Critical Service Alert, Quarterly Tax Report

---

## Agent Upload Invite System (Contractor Portal Feature)

> **Source:** Christopher Palmer email, Mar 14, 2026  
> This is a NEW feature built into the contractor portal that allows contractors to invite their insurance agent to upload insurance documents directly.

### Contractor Side

1. Contractor logs in → navigates to **Documents** page
2. At the top of the page, a section called **"Invite Agent to Upload Documents"** is visible
3. Contractor enters their insurance agent's email address
4. Contractor clicks **"Send Invite"** button
5. The agent receives an email with a **secure upload link**
6. On the Documents page, the contractor can see:
   - All **active invites** (by agent email)
   - Number of **documents uploaded** through each invite
   - **Revoke** button to immediately cancel an invite's access

### Insurance Agent Side (No Login Required)

1. Insurance agent clicks the secure link in their email
2. They land on a page showing a **checklist of all insurance document types** needed (uploaded vs. still needed)
3. Agent selects multiple files at once
4. For each file, agent assigns:
   - **Document type** (from dropdown)
   - **Carrier name**
   - **Effective date**
5. Agent clicks **"Upload All"** → files save directly to the contractor's profile

### Security Controls

| Control | Detail |
|---------|--------|
| **Contractor-initiated only** | Only the contractor can send an invite — agents cannot self-register |
| **Link locked to one contractor** | Each secure link is unique and tied to a single contractor |
| **Upload only** | Agent can upload files only — they cannot view, download, or delete any existing documents |
| **7-day expiry** | Invite links expire after 7 days automatically |
| **Instant revoke** | Contractor can revoke access at any time; revoked link shows error/expired page |
| **No browsing access** | Without the exact link, there is zero access — no searching, no finding other contractors |

### Document Upload Restrictions

| Document Type | Who Can Upload |
|---------------|----------------|
| COI (Certificate of Insurance) | Agent (via invite link) ✅ |
| Endorsements | Agent (via invite link) ✅ |
| CSLB Card | Contractor only ❌ |
| W-9 | Contractor only ❌ |
| Bond | Contractor only ❌ |
| Photo ID | Contractor only ❌ |

### Testing Checklist for Agent Upload Invite System

- [ ] Contractor can see "Invite Agent to Upload Documents" section on Documents page
- [ ] Contractor can enter insurance agent email and click "Send Invite"
- [ ] Agent receives invite email with secure link
- [ ] Agent can open secure link without logging in
- [ ] Agent sees document checklist (uploaded vs still needed)
- [ ] Agent can select multiple files and assign type/carrier/date per file
- [ ] Agent can upload COI and endorsement files
- [ ] Agent CANNOT upload CSLB card, W-9, bond, or photo ID through invite link
- [ ] Agent CANNOT view, download, or delete existing contractor documents
- [ ] Contractor can see invite in active invites list with document count
- [ ] Contractor can revoke invite → revoked link returns error/expired page
- [ ] Invite link expires after 7 days
- [ ] A different contractor's invite link does NOT give access to other contractor data

---

## Testing Approach (Palmer Email, Mar 14, 2026)

> Christopher's guidance on how to run QA testing effectively:

1. **Read through all documents first** before starting any testing
2. **Create users and get acclimated** – spend time playing with the app to understand the workflow
3. **Overall goal:** Find errors or wording that doesn't make sense (the workflow is generally correct)
4. **Suggested first test run:**
   - Create an Agent → generate a referral code
   - Sign up as a Homeowner → use the referral code
   - Make a service request
   - Start exploring the Admin portal
5. **Submit findings incrementally:** Submit at end of each testing day (not after every single item) to enable dialogue and discussion
6. Testing always takes longer than expected — allocate adequate time
7. If something is unclear, discuss with Christopher rather than logging immediately as a bug

---

## DocuSign Documents (8 total)

| # | Document | Sent To | Trigger |
|---|----------|---------|---------|
| D1 | Master Services Agreement | Contractor | Joins network |
| D2 | Work Order / Task Contract | Contractor | Deposit paid |
| D3 | Critical Change Order and Liability Release | Homeowner | Emergency |
| D4 | Return Service Call Work Order | Contractor | Return requested |
| D5 | Affidavit of Service | Contractor | Job complete |
| D6 | Conditional Lien Release w/ Invoice | Contractor | Docs submitted |
| D7 | Unconditional Lien Release | Contractor | Payment clears |
| D8 | Change Order | Homeowner | During job |
