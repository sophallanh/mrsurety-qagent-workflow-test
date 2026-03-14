# MR SURETY – COMPLETE PLATFORM SPECIFICATION V6.3

**Source:** "MR SURETY – COMPLETE PLATFORM SPECIFICATION V6.3"  
**Last Updated:** 2026-03-14  
**Version:** V6.3 (Full Specification with Software Setup Assistance, Service Fee in Estimates, AI Call Reminder as Future Module, and Future Data Storage)

---

## 1. EXECUTIVE SUMMARY

MrSurety is a compliance platform connecting homeowners with licensed contractors for insurance-required loss prevention work. Insurance agents refer clients via unique links, homeowners submit service requests, contractors bid on jobs, and MrSurety handles all compliance documentation, lien releases, affidavits, and certificates of completion.

**Core Stakeholders:**

| Role | Responsibility |
|------|---------------|
| Insurance Agent | Refers clients via unique link; tracks jobs; downloads certificates |
| Homeowner | Lands via agent link; submits request; receives estimates; pays; gets certificate |
| Contractor | Bids on jobs; performs work; signs documents; gets paid |
| MrSurety Admin | Manages platform; approves work; files tax reports |

---

## 2. COMPANY INFORMATION

| Field | Value |
|-------|-------|
| Legal Name | MrSurety, Inc. |
| Address | 1253 E Imperial Hwy, Placentia, CA 92870 |
| Phone | (714) 686-1800 |
| Email | support@mrsurety.com |
| Website | www.mrsurety.com |
| Resale Certificate | Yes – California Seller's Permit #XXXXXX |

---

## 3. AGENT REFERRAL MODEL

### Method A – Agent Referral Link (Preferred)

| Step | Description |
|------|-------------|
| 1 | Agent receives unique tracking link: `mrsurety.com/ref/AGENT123` |
| 2 | Agent emails or texts link to property owner |
| 3 | Property owner clicks link, lands on branded page: **"Brought to you by [Agent Name] at [Agency]"** |
| 4 | Property owner fills out service request form |
| 5 | System automatically ties job to that agent |

**Technical Requirement:**
- URL parameter `?ref=AGENT123` **persists through the entire booking process**
- Agent ID stored in **`jobs.agent_id`** and **`service_requests.agent_id`**

### Method B – Property Owner Adds Agent Email (Backup)

| Step | Description |
|------|-------------|
| 1 | Property owner lands on site (direct or organic) |
| 2 | During service request form, field appears: "Insurance Agent Email (for progress updates)" |
| 3 | Property owner enters agent email |
| 4 | System checks if email exists in `agents` table |
| 5 | If yes → links to existing agent; if no → creates pending agent record |
| 6 | Agent receives notification: *"Your client [Name] has started a compliance job. Create an account to track progress."* |

### Agent Portal Features

Once linked, agent can:
- See all clients they have referred
- View **real-time status** of each job
- Receive email updates at every stage
- Download certificates immediately upon completion
- **Bulk export client completion reports for underwriters**
- Filter by service type

---

## 4. PRICING MODEL SUMMARY

### Markup Rules

| Component | Markup | Notes |
|-----------|--------|-------|
| Parts (Fittings, Misc, Cable) | +35% | Applied to contractor's parts price |
| Pressure Reducer | +35% | Required if home >5 years old |
| Device | +0% | Pass-through, no markup |
| Software Setup Assistance | +25% | Optional; contractor price is flat **$75** if required |
| Labor | +25% | Applied to contractor's labor price (contractor enters their own) |
| Service Fee | **$95 flat** | Included in ALL estimates and invoices as a separate line item |

> ⚠️ **IMPORTANT: Contractors NEVER see the $95 Service Fee in any documents or communications.**

### V6.3 Example Contractor Base Prices

| Component | Example Contractor Price |
|-----------|--------------------------|
| Parts (Fittings & Misc + Cable) | $260.00 |
| Pressure Reducer (1") | $310.00 |
| Device (Moen System) | $599.99 |
| Software Setup Assistance (if required) | $75.00 flat |
| Labor | $450.00 *(example only — contractors enter their own labor price)* |
| **Example Contractor Total** | **$1,694.99** |

> ⚠️ The $450 labor price is an **EXAMPLE ONLY**. Contractors enter their own labor price when bidding.

### V6.3 Full Retail Calculation (With Software Setup Assistance)

| Component | Contractor Price | Markup | Retail Price |
|-----------|-----------------|--------|-------------|
| Parts | $260.00 | +35% | $351.00 |
| Pressure Reducer | $310.00 | +35% | $418.50 |
| Device | $599.99 | +0% | $599.99 |
| Software Setup Assistance | $75.00 | +25% | $93.75 |
| Labor | $450.00 | +25% | $562.50 |
| **Subtotal (Work & Materials)** | | | **$2,025.74** |
| Service Fee | | | +$95.00 |
| **Total Before Tax** | | | **$2,120.74** |
| Sales Tax (7.75% example) | $2,120.74 × 0.0775 | | $164.36 |
| **HOMEOWNER TOTAL** | | | **$2,285.10** |

> **Note:** Tax rate will vary by jurisdiction. The 7.75% rate above is used as an example only.

### Doc 1 Example Prices (for Reference)

These example values appear in Christopher's Testing Guide and may be used in QA test scenarios:

| Component | Contractor Price | Markup | Retail |
|-----------|-----------------|--------|--------|
| Parts | $220 | +35% | $297 |
| Pressure Reducer | $280 | +35% | $378 |
| Cable | $25 | +35% | $33.75 |
| Software | $75 | +25% | $93.75 |
| Labor | $575 | +25% | $718.75 |
| Device | $599.99 | 0% | $599.99 |
| **Service Fee** | — | — | **$95.00** |

---

## 5. HOMEOWNER SERVICE REQUEST FORM (HOMEOWNER VIEW)

Multi-step form with 10 steps. Agent referral information is auto-populated from the URL parameter.

### Form Header
- **Referral Information** (auto-filled from referral link):
  - Referred by: [Agent Name] at [Agency Name]
  - Agent Email: [agent@insurance.com] (read-only)

### Step 1 – Account

| Option | Notes |
|--------|-------|
| Yes, I already have an account | Login: email + password |
| No, I need to create an account | Full Name, Email, Phone, Password (min 8 chars, 1+ number, 1+ letter), Confirm Password |

### Step 2 – Service Type Selection

| Option | Behavior |
|--------|----------|
| Request Installation | Homeowner receives contractor bids |
| Request Property Assessment | Assessment fee invoice sent: **$185.00 + $0.75 per mile** (based on distance from nearest technician) |

**Assessment flow:**
1. Invoice sent for assessment fee
2. Once paid, technician assigned
3. Technician visits, assesses, provides recommendations
4. Homeowner can then proceed with installation

### Step 3 – Property Information

| Field | Required | Notes |
|-------|----------|-------|
| Property Address (Street, City, State, ZIP) | ✅ | Where work is performed |
| Same as billing address? | ✅ | Yes / No |
| Billing Address | Conditional | Only shown if different from property address |

### Step 4 – Insurance Information

| Field | Required | Notes |
|-------|----------|-------|
| Insurance Company | ✅ | |
| Agent Name | Auto-filled | Read-only, from referral |
| Agent Email | Auto-filled | Read-only, from referral |
| Policy Number | Optional | |

### Step 5 – Home Specifics

| Field | Required | Options / Notes |
|-------|----------|----------------|
| Home type | ✅ | Single Family Home / Condo/Town Home / Apartment Complex / Commercial Property / Other |
| Square footage | ✅ | Number input; drives pipe size calculation |
| Year built | ✅ | 4-digit year (e.g., 1970); drives pressure reducer requirement |

#### Pipe Size Logic (auto-calculated)

| Square Footage | Expected Pipe Size |
|---------------|-------------------|
| Under 2,000 sq ft | **3/4 inch** |
| 2,001 – 3,000 sq ft | **1 inch** |
| 3,001 – 5,000 sq ft | **1 1/4 inch** |

#### Pressure Reducer Logic

| Home Age | Requirement |
|----------|------------|
| Built more than 5 years ago | **REQUIRED** |
| Built 5 years ago or less | **NOT REQUIRED** |

### Step 6 – Device Information *(Installation only)*

| Field | Required | Options |
|-------|----------|---------|
| Device type | ✅ | **Flo by Moen** / **Awtos** / **I'm not sure** |
| Device source | ✅ | **Insurance Company will provide** / **I already have the device (Homeowner Provided)** / **Contractor should provide (included in estimate)** |
| Software Setup Assistance | ✅ | **Yes – I need help setting up the software and connecting to WiFi (additional fee applies)** / **No – I will handle software setup myself** |

### Step 7 – Water Main Location & Photos *(Installation only)*

| Field | Required | Notes |
|-------|----------|-------|
| Water main location | ✅ | Inside (basement, garage, crawl space) / Outside (exterior wall, yard) / I'm not sure |
| Water main photo | ✅ **REQUIRED** | jpg/png/heic, max 25MB; must show shut-off valve near house (NOT at street) |
| Additional photos (up to 5) | Optional | |

> ⚠️ **Skipping the water main photo should produce a validation error. Form must NOT submit.**

### Step 8 – Advanced Options *(Optional, All Service Types)*

| Field | Required | Notes |
|-------|----------|-------|
| LiDar scan | Optional | Checkbox; if checked: upload .las/.laz/.xyz/.ply (max 100MB) |

### Step 9 – Access & Contact *(All Service Types)*

| Field | Required | Options / Notes |
|-------|----------|----------------|
| Property access notes | Optional | Free text (gated community, dog on premises, etc.) |
| Preferred contact method | ✅ | **Phone call** / **Text message** / **Email** / **Any of the above** |
| Preferred appointment time | ✅ | **Morning (8am–12pm)** / **Afternoon (12pm–4pm)** / **Flexible** |

### Step 10 – Terms & Submission

Homeowner must agree to Terms of Service and Privacy Policy. Submission notice includes:
- Contractors will contact with estimates (if installation)
- Invoice for $185 + mileage, technician assigned (if assessment)
- **10% deposit required to confirm installation**
- **$95 Service Fee applies to all installation jobs** for compliance documentation, lien releases, and certificate generation. This fee is included in all estimates.
- All work performed by licensed, insured contractors and technicians

---

## 6. HOMEOWNER SERVICE REQUEST FORM (PROGRAMMER SPECIFICATION)

### Referral Tracking

| Parameter | Source | Storage |
|-----------|--------|---------|
| `ref` | URL query param (`mrsurety.com/ref/AGENT123`) | Stored in session, then in `service_requests.agent_id` |
| `agent_name` | Auto-populated from `agents` table | Display only, read-only field |
| `agent_email` | Auto-populated from `agents` table | Display only, read-only field |

**Technical requirement:** `?ref=AGENT123` URL parameter must persist through the entire booking process and be stored in both `service_requests.agent_id` and `jobs.agent_id`.

### Form Logic

- Conditional rendering: Steps 6 and 7 (Device Info, Water Main) only appear if "Request Installation" is selected
- Assessment vs Installation: Step 2 selection drives different form fields and workflows
- Account: New users get a combined registration + service request flow; existing users see only service fields
- Agent email field in Step 4: If the email matches an existing agent → link directly; if not found → create pending agent record and send agent notification

---

## 7. SECTION REFERENCES

For detailed workflow documentation, see:
- [`workflow-guides/LONG_WORKFLOW_GUIDE.md`](workflow-guides/LONG_WORKFLOW_GUIDE.md) – Full 9-workflow QA guide
- [`workflow-guides/SHORT_WORKFLOW_GUIDE.md`](workflow-guides/SHORT_WORKFLOW_GUIDE.md) – Quick reference
- [`service-form/SERVICE_FORM_GUIDE.md`](service-form/SERVICE_FORM_GUIDE.md) – Form-level QA spec
- [`email-templates/EMAIL_TEMPLATES_GUIDE.md`](email-templates/EMAIL_TEMPLATES_GUIDE.md) – All 39+ system emails
- [`docusign-templates/DOCUSIGN_TEMPLATES_GUIDE.md`](docusign-templates/DOCUSIGN_TEMPLATES_GUIDE.md) – All 8 DocuSign documents
- [`admin-guides/ADMIN_DASHBOARD_GUIDE.md`](admin-guides/ADMIN_DASHBOARD_GUIDE.md) – Admin workflow guide
