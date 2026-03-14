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

### Section 1 – Account Verification / Creation

#### Section 1a – Existing User Login (shown if `has_account = "yes"`)

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `has_account` | Radio | Do you have a MrSurety account? | Yes | Options: `"yes"`, `"no"` |
| `login_email` | Email | Email Address | Yes | Valid email format |
| `login_password` | Password | Password | Yes | Min 8 characters |

#### Section 1b – New Account Creation (shown if `has_account = "no"`)

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `full_name` | Text | Full Name | Yes | Min 2 characters |
| `email` | Email | Email Address | Yes | Valid format, unique |
| `phone` | Tel | Phone Number | Yes | US format (xxx-xxx-xxxx) |
| `password` | Password | Password | Yes | Min 8 chars, 1 number, 1 letter |
| `confirm_password` | Password | Confirm Password | Yes | Must match `password` |

### Section 2 – Service Type Selection

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `service_type` | Radio | What would you like to do? | Yes | Options: `"installation"`, `"assessment"` |

**Assessment Fee Calculation** (shown if `service_type = "assessment"`):

| Display | Calculation |
|---------|------------|
| Base Fee | $185.00 |
| Mileage Rate | $0.75 per mile |
| Estimated Total | $185.00 + ($0.75 × distance from nearest technician) |

Distance Logic: Geocode property address → query nearest available technician → Google Maps Distance Matrix API → display estimated total.

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `proceed_assessment` | Radio | Proceed with Assessment Request? | Yes (if assessment) | Options: `"yes"`, `"no"` |

> If `proceed_assessment = "no"`, form continues but skips installation-specific sections.

### Section 3 – Property Information

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `property_street` | Text | Street Address | Yes | — |
| `property_city` | Text | City | Yes | — |
| `property_state` | Select | State | Yes | US State dropdown (50 states) |
| `property_zip` | Text | ZIP Code | Yes | 5-digit or 9-digit format |
| `billing_same` | Radio | Is billing address same as property? | Yes | Options: `"yes"`, `"no"` |

**Billing Address Fields** (shown if `billing_same = "no"`):

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `billing_street` | Text | Street Address | Yes | — |
| `billing_city` | Text | City | Yes | — |
| `billing_state` | Select | State | Yes | US State dropdown |
| `billing_zip` | Text | ZIP Code | Yes | 5-digit or 9-digit format |

### Section 4 – Insurance Information

| Field ID | Type | Label | Required | Notes |
|----------|------|-------|----------|-------|
| `insurance_company` | Text | Insurance Company | Yes | — |
| `agent_name` | Text | Agent Name | Auto-filled | Read-only, display only |
| `agent_email` | Email | Agent Email Address | Auto-filled | Read-only, display only |
| `policy_number` | Text | Policy Number | No | Optional |

### Section 5 – Home Specifics

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `home_type` | Select | What kind of home is this? | Yes | Options: `"single_family"`, `"condo"`, `"apartment"`, `"commercial"`, `"other"` |
| `home_type_other` | Text | If Other, please specify | No (conditional) | Shown only if `home_type = "other"` |
| `square_feet` | Number | How many sqft is your home? | Yes | Numeric, > 0, < 10000 |
| `year_built` | Number | What year was your home built? | Yes | 4-digit year, 1800–current |

### Section 6 – Device Information *(Installation only)*

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `device_type` | Select | What type of leak detection product? | Yes (installation) | Options: `"flo_by_moen"`, `"awtos"`, `"not_sure"` |
| `device_source` | Select | Who will provide the device? | Yes (installation) | Options: `"insurance"`, `"homeowner"`, `"contractor"` |
| `software_assistance_required` | Radio | Do you need Software Setup Assistance? | Yes (installation) | Options: `"yes"`, `"no"` |

### Section 7 – Water Main Location & Photos *(Installation only)*

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `water_main_location` | Select | Where is your water main located? | Yes (installation) | Options: `"inside"`, `"outside"`, `"not_sure"` |
| `water_main_photo` | File | Photo of Current Water Main Setup | Yes (installation) | JPG, PNG, HEIC; max 25MB |
| `additional_photos` | File | Additional Photos (Optional) | No | JPG, PNG, HEIC; max 25MB per file; max 5 files |

### Section 8 – Advanced Options

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `lidar_provided` | Checkbox | I can provide a LiDar scan | No | Boolean |
| `lidar_file` | File | Upload LiDar Scan | Yes (if `lidar_provided = true`) | LAS, LAZ, XYZ, PLY; max 100MB |

### Section 9 – Access & Contact

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `access_notes` | Textarea | Property Access Notes | No | Max 500 characters |
| `contact_method` | Select | Preferred Contact Method | Yes | Options: `"phone"`, `"text"`, `"email"`, `"any"` |
| `preferred_time` | Select | Preferred Appointment Time | Yes | Options: `"morning"`, `"afternoon"`, `"flexible"` |

### Section 10 – Terms & Submission

| Field ID | Type | Label | Required | Validation |
|----------|------|-------|----------|------------|
| `terms_agreed` | Checkbox | I agree to Terms of Service and Privacy Policy | Yes | Must be checked |

---

## 7. SERVICE REQUEST FLOW

### Step 1 – System Auto-Calculations

| Calculation | Logic | Example Result |
|-------------|-------|---------------|
| Pressure Reducer Required | `IF (Current Year − year_built) > 5 THEN Required` | YES |
| Extension Cord Length | Default 25 ft (configurable) | 25 ft |
| Pipe Size | Based on square footage (see chart below) | 1 inch (for 2,200 sq ft) |

#### Pipe Size Chart

| Home Size | Pipe Size |
|-----------|-----------|
| Up to 2,000 sq ft | 3/4 inch |
| 2,001–3,000 sq ft | 1 inch |
| 3,001–5,000 sq ft | 1 1/4 inch |

---

## 8. CONTRACTOR ESTIMATE PROCESS

### What the Contractor Sees

| Field | Example |
|-------|---------|
| Property Address | 4568 Sycamore Lane |
| Square Footage | 2,200 sq ft |
| Pressure Reducer Required | YES |
| Extension Cord Needed | 25 ft |
| Pipe Size | 1 inch |
| Device Source | Contractor Provided |
| Software Setup Assistance Required | YES |
| Water Main Location | Inside – basement |
| Water Main Photo | [Link to photo] |
| LiDar Scan Provided | Yes (if provided) |

### Suggested Pricing Guidance (Displayed to Contractor)

```
SUGGESTED PRICING GUIDANCE:
Based on this job's requirements, here are estimated price ranges:

• Parts (fittings, misc, cable): $200–300 (enter your own)
• Pressure Reducer (1"):         $280–340 (enter your own)
• Device (Moen system):          $599.99 (fixed if providing)
• Software Setup Assistance:     $75 flat if requested
• Labor:                         $400–500 (enter your own – example: $450)

These are suggestions only. You set your own prices.
```

### Resale Certificate Election

| Field | Options |
|-------|---------|
| Accept MrSurety Resale Certificate? | Yes / No |
| If YES | Contractor enters prices WITHOUT tax (MrSurety adds tax later) |
| If NO | Contractor includes tax in prices (MrSurety adds NO additional tax) |

### Contractor Bid Entry Fields

| Field | Example | Notes |
|-------|---------|-------|
| Parts | $260 | Contractor enters their own price |
| Pressure Reducer | $310 | Contractor enters their own price |
| Device | $599.99 | Fixed if contractor-providing |
| Software Setup Assistance | $75 | Flat fee; checkbox if required |
| Labor | $450 | Contractor enters their own labor price |

---

## 9. RETAIL PRICE CALCULATIONS (ALL SCENARIOS)

> ⚠️ **Service Fee ($95) appears in ALL scenarios. Contractors NEVER see this fee.**

### Scenario 1: With Device + With Software Setup Assistance

| Item | Contractor Price | Markup | Retail Price |
|------|-----------------|--------|-------------|
| Parts | $260.00 | +35% | $351.00 |
| Pressure Reducer | $310.00 | +35% | $418.50 |
| Device | $599.99 | +0% | $599.99 |
| Software Setup Assistance | $75.00 | +25% | $93.75 |
| Labor | $450.00 | +25% | $562.50 |
| **Subtotal** | | | **$2,025.74** |
| Service Fee | | | +$95.00 |
| **Total Before Tax** | | | **$2,120.74** |
| Sales Tax (7.75%) | $2,120.74 × 0.0775 | | $164.36 |
| **HOMEOWNER TOTAL** | | | **$2,285.10** |

### Scenario 2: With Device + No Software Setup Assistance

| Item | Contractor Price | Markup | Retail Price |
|------|-----------------|--------|-------------|
| Parts | $260.00 | +35% | $351.00 |
| Pressure Reducer | $310.00 | +35% | $418.50 |
| Device | $599.99 | +0% | $599.99 |
| Labor | $450.00 | +25% | $562.50 |
| **Subtotal** | | | **$1,931.99** |
| Service Fee | | | +$95.00 |
| **Total Before Tax** | | | **$2,026.99** |
| Sales Tax (7.75%) | $2,026.99 × 0.0775 | | $157.09 |
| **HOMEOWNER TOTAL** | | | **$2,184.08** |

### Scenario 3: No Device + With Software Setup Assistance

| Item | Contractor Price | Markup | Retail Price |
|------|-----------------|--------|-------------|
| Parts | $260.00 | +35% | $351.00 |
| Pressure Reducer | $310.00 | +35% | $418.50 |
| Software Setup Assistance | $75.00 | +25% | $93.75 |
| Labor | $450.00 | +25% | $562.50 |
| **Subtotal** | | | **$1,425.75** |
| Service Fee | | | +$95.00 |
| **Total Before Tax** | | | **$1,520.75** |
| Sales Tax (7.75%) | $1,520.75 × 0.0775 | | $117.86 |
| **HOMEOWNER TOTAL** | | | **$1,638.61** |

### Scenario 4: No Device + No Software Setup Assistance

| Item | Contractor Price | Markup | Retail Price |
|------|-----------------|--------|-------------|
| Parts | $260.00 | +35% | $351.00 |
| Pressure Reducer | $310.00 | +35% | $418.50 |
| Labor | $450.00 | +25% | $562.50 |
| **Subtotal** | | | **$1,332.00** |
| Service Fee | | | +$95.00 |
| **Total Before Tax** | | | **$1,427.00** |
| Sales Tax (7.75%) | $1,427.00 × 0.0775 | | $110.59 |
| **HOMEOWNER TOTAL** | | | **$1,537.59** |

---

## 10. WHAT THE SERVICE FEE COVERS

The $95 Service Fee is included in all estimates and invoices as a separate line item.

| Service | Description |
|---------|-------------|
| Contractor License Verification | Ensure work is done by licensed, insured professionals |
| Background Checks | All contractors vetted |
| Insurance Verification | Liability insurance confirmed |
| Affidavit of Service | Signed under penalty of perjury |
| Conditional Lien Release | Protects property during payment period |
| Unconditional Lien Release | Final proof contractor has no claim |
| Certificate of Completion | Official documentation for insurance |
| Agent Portal Access | Agent tracks progress in real-time |
| Document Storage | Perpetual access to all records |
| Compliance Monitoring | System ensures all steps completed |
| Tax Reporting | Sales tax properly handled and remitted |

---

## 11. COMPLETE JOB FLOW

| Step | Who | Action | System Response | Document |
|------|-----|--------|----------------|----------|
| 1 | Homeowner | Submits service request with all details | Stores request, calculates requirements | — |
| 2 | System | Finds contractors within distance | Sends notifications | — |
| 3 | Contractor | Reviews request, submits bid (parts, pressure, device, software $75 if required, labor) | Stores contractor prices | — |
| 4 | System | Applies markups (parts +35%, pressure +35%, device +0%, software +25%, labor +25%) and adds $95 Service Fee | Creates retail estimate with all fees | — |
| 5 | Homeowner | Reviews estimate, selects contractor | — | — |
| 6 | Homeowner | Pays 10% deposit (on total including Service Fee) | Job confirmed | Deposit receipt |
| 7 | Homeowner | Selects installation date | Contractor notified | — |
| 8 | System | Verifies contractor has all parts | Inventory check | — |
| 9 | System | Sends Work Order to contractor | — | DocuSign: Work Order |
| 10 | Contractor | Signs Work Order | Work authorized | Work Order signed |
| 11 | Contractor | Arrives at job site, checks in via app | GPS, timestamp, photo | Check-in record |
| 12 | Contractor | Performs work | — | — |
| 13 | Contractor | IF change order needed: creates in app | Homeowner approves | Change Order |
| 14 | Contractor | Completes work, uploads photos and invoice | Status: Pending Review | — |
| 15 | Contractor | Signs Affidavit of Service | — | DocuSign: Affidavit |
| 16 | Contractor | Signs Conditional Lien Release w/ invoice | — | DocuSign: Conditional |
| 17 | Admin | Reviews work, approves | — | — |
| 18 | System | Releases payment to contractor | — | — |
| 19 | Contractor | Receives payment | — | — |
| 20 | System | After payment clears, sends Unconditional Lien Release | — | DocuSign: Unconditional |
| 21 | Contractor | Signs Unconditional Lien Release | Job fully documented | — |
| 22 | System | Generates certificate package with final invoice (Service Fee already included) | Emails to homeowner + agent | Certificate |
| 23 | Agent | Downloads certificate | Submits to underwriter | — |
| 24 | System | Stores job data for policy anniversary / renewal tracking | Future notification ready | — |

---

## 12. AI CALL REMINDER (FUTURE MODULE)

> ⚠️ **Note: This feature is planned for future development. Not required for V1.0 launch.**

| Feature | Description |
|---------|-------------|
| Trigger | 24 hours before scheduled installation |
| Call Script | Automated reminder with job details |
| Service | Twilio or similar voice API |
| Opt-out | Option to disable future calls |

---

## 13. FUTURE DATA STORAGE FOR POLICY RENEWALS

### Data Stored Per Job

| Field | Purpose |
|-------|---------|
| `completion_date` | Date work was finished |
| `policy_number` | Insurance policy number (if provided) |
| `insurance_company` | Insurance carrier |
| `agent_id` | Referring agent |
| `service_type` | Type of work performed |
| `certificate_id` | Link to certificate |

### Automated Notifications

| Trigger | Action |
|---------|--------|
| 11 months after completion | Email homeowner: *"Your compliance work is approaching 1 year. Check if your insurance needs updated documentation."* |
| 11 months after completion | Email agent: *"Your client [Name]'s compliance work is approaching 1 year. They may need renewal documentation."* |
| 12 months after completion | Archive job but keep accessible |

---

## 14. ALL SYSTEM EMAILS

For full email body text, see [`email-templates/EMAIL_TEMPLATES_GUIDE.md`](email-templates/EMAIL_TEMPLATES_GUIDE.md).

| # | Email | To | Trigger |
|---|-------|----|---------|
| 1 | Service Request Confirmation | Homeowner | Form submitted |
| 2 | New Estimate Available | Homeowner | First contractor bid submitted |
| 3 | Estimate Selected – Deposit Required | Homeowner | Contractor selected |
| 4 | New Job Assignment | Contractor | Homeowner selects contractor |
| 5 | Deposit Received – Job Confirmed | Homeowner | Deposit paid |
| 6 | Reminder: Installation Tomorrow | Homeowner | 24 hours before scheduled date |
| 7 | Contractor Check-In Notification | Homeowner | Contractor GPS check-in |
| 8 | Change Order Created | Homeowner | Contractor creates change order |
| 9 | Work Completed – Final Payment Required | Homeowner | Job marked complete |
| 10 | Job Complete – Certificate Ready | Homeowner | All documents signed |
| 11 | Job Complete – Certificate for Agent | Insurance Agent | All documents signed |
| 12 | Unconditional Lien Release Required | Contractor | Payment clears |
| 13 | Quarterly Tax Report Ready | Admin | End of quarter |

---

## 15. ALL DOCUSIGN DOCUMENTS

For full document template text, see [`docusign-templates/DOCUSIGN_TEMPLATES_GUIDE.md`](docusign-templates/DOCUSIGN_TEMPLATES_GUIDE.md).

| # | Document | Sent To | Trigger |
|---|----------|---------|---------|
| D1 | Contractor Master Services Agreement | Contractor | Joins MrSurety network |
| D2 | Work Order / Task Contract | Contractor | Deposit paid |
| D3 | Affidavit of Service | Contractor | Job marked complete |
| D4 | Conditional Lien Release w/ Invoice | Contractor | Completion docs submitted |
| D5 | Unconditional Lien Release | Contractor | Payment clears (~3 days) |

---

## 16. PROFITABILITY ANALYSIS

### Per Job Financials (Scenario 1 – Full Package)

| Item | Amount | % of Total |
|------|--------|------------|
| Homeowner Pays | $2,285.10 | 100% |
| Contractor Gets | $1,694.99 | 74.2% |
| Sales Tax to State | $164.36 | 7.2% |
| MrSurety Profit | $425.75 | 18.6% |

### Profit Breakdown

| Revenue Source | Amount |
|---------------|--------|
| Parts Markup ($260 @ 35%) | $91.00 |
| Pressure Markup ($310 @ 35%) | $108.50 |
| Software Markup ($75 @ 25%) | $18.75 |
| Labor Markup ($450 @ 25%) | $112.50 |
| Service Fee | $95.00 |
| **Total MrSurety Revenue** | **$425.75** |

### Scale Projections

| Jobs/Month | Monthly Revenue | Monthly Profit | Annual Profit |
|------------|----------------|---------------|--------------|
| 50 | $114,255 | $21,288 | $255,450 |
| 100 | $228,510 | $42,575 | $510,900 |
| 200 | $457,020 | $85,150 | $1,021,800 |
| 500 | $1,142,550 | $212,875 | $2,554,500 |
| 1,000 | $2,285,100 | $425,750 | $5,109,000 |

---

## 17. DATABASE SCHEMA

### Core Tables

#### `users`
| Column | Type / Notes |
|--------|-------------|
| `id` | PK |
| `full_name` | — |
| `email` | — |
| `phone` | — |
| `password_hash` | — |
| `user_type` | `homeowner` / `contractor` / `technician` / `agent` / `admin` |
| `created_at` | — |

#### `service_requests`
| Column | Type / Notes |
|--------|-------------|
| `id` | PK |
| `user_id` | FK |
| `agent_id` | FK, nullable |
| `service_type` | `installation` / `assessment` |
| `property_address` | JSON |
| `billing_address` | JSON, nullable |
| `insurance_company` | — |
| `agent_name` | From referral |
| `agent_email` | From referral |
| `policy_number` | nullable |
| `home_type` | — |
| `home_type_other` | nullable |
| `square_feet` | — |
| `year_built` | — |
| `device_type` | nullable |
| `device_source` | nullable |
| `software_assistance_required` | boolean, nullable |
| `water_main_location` | nullable |
| `water_main_photo_url` | nullable |
| `additional_photo_urls` | JSON, nullable |
| `lidar_provided` | boolean |
| `lidar_file_url` | nullable |
| `access_notes` | nullable |
| `contact_method` | — |
| `preferred_time` | — |
| `status` | — |
| `created_at` | — |

#### `contractor_bids`
| Column | Type / Notes |
|--------|-------------|
| `id` | PK |
| `request_id` | FK |
| `contractor_id` | FK |
| `parts_price` | — |
| `pressure_price` | — |
| `device_price` | — |
| `software_price` | — |
| `labor_price` | — |
| `resale_cert_accepted` | — |
| `contractor_total` | — |
| `status` | — |
| `created_at` | — |

#### `jobs`
| Column | Type / Notes |
|--------|-------------|
| `id` | PK |
| `bid_id` | FK |
| `homeowner_id` | FK |
| `contractor_id` | FK |
| `agent_id` | FK, nullable |
| `installation_date` | — |
| `installation_time` | — |
| `deposit_amount` | — |
| `deposit_paid` | boolean |
| `retail_subtotal` | — |
| `service_fee` | 95.00 |
| `total_before_tax` | — |
| `tax_amount` | — |
| `final_total` | — |
| `status` | — |
| `completion_date` | nullable |
| `created_at` | — |

#### `technicians`
| Column | Type / Notes |
|--------|-------------|
| `id` | PK |
| `user_id` | FK |
| `service_area` | JSON |
| `base_location_lat` | — |
| `base_location_lng` | — |
| `is_active` | — |
| `mileage_rate` | 0.75 |

#### `assessment_requests`
| Column | Type / Notes |
|--------|-------------|
| `id` | PK |
| `service_request_id` | FK |
| `technician_id` | FK, nullable |
| `base_fee` | 185.00 |
| `mileage_fee` | — |
| `total_fee` | — |
| `distance_miles` | — |
| `invoice_id` | — |
| `invoice_paid` | boolean |
| `scheduled_date` | nullable |
| `completed_date` | nullable |
| `assessment_report_url` | nullable |

#### `agents`
| Column | Type / Notes |
|--------|-------------|
| `id` | PK |
| `name` | — |
| `email` | — |
| `agency` | — |
| `referral_link` | — |
| `created_at` | — |

---

## 18. API INTEGRATIONS

| Integration | Purpose |
|------------|---------|
| **Stripe** | Payment processing, deposits, payouts |
| **DocuSign** | All legal documents |
| **Google Maps** | Address validation, distance calculation, geocoding |
| **TaxJar / Avalara** | Sales tax calculation by address |
| **Twilio / SendGrid** | Email notifications |
| **Cloud Storage** | Photo and document storage |
| **GPS Services** | Check-in verification |

---

## SECTION REFERENCES

For detailed workflow documentation, see:
- [`workflow-guides/LONG_WORKFLOW_GUIDE.md`](workflow-guides/LONG_WORKFLOW_GUIDE.md) – Full 9-workflow QA guide
- [`workflow-guides/SHORT_WORKFLOW_GUIDE.md`](workflow-guides/SHORT_WORKFLOW_GUIDE.md) – Quick reference
- [`service-form/SERVICE_FORM_GUIDE.md`](service-form/SERVICE_FORM_GUIDE.md) – Form-level QA spec
- [`email-templates/EMAIL_TEMPLATES_GUIDE.md`](email-templates/EMAIL_TEMPLATES_GUIDE.md) – All system emails with full body text
- [`docusign-templates/DOCUSIGN_TEMPLATES_GUIDE.md`](docusign-templates/DOCUSIGN_TEMPLATES_GUIDE.md) – All DocuSign documents with full template text
- [`admin-guides/ADMIN_DASHBOARD_GUIDE.md`](admin-guides/ADMIN_DASHBOARD_GUIDE.md) – Admin workflow guide
