# Service Request Form – MrSurety QA Reference

**Live App:** https://frontend-tan-five-46.vercel.app  
**Source:** Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM" (Doc 1, Part 2) + Platform Spec V6.3 (Doc 2) + "MR SURETY – SERVICE REQUEST FORM WITH ASSESSMENT OPTION" (March 2026)  
**Last Updated:** 2026-03-14

> 📄 **Full platform spec:** See [`qa/spec-docs/PLATFORM_SPEC_V6.md`](../PLATFORM_SPEC_V6.md)

> ⚠️ When a homeowner uses a referral link, the form creates their account AND submits
> the service request in a single step. There is no separate registration flow.
> Landing page shows: **"Brought to you by [Agent Name]"**

---

## Referral Link Format

`mrsurety.com/ref/AGENT123`

- Landing page shows agent branding: "Brought to you by [Agent Name]"
- Same referral link can be used multiple times — **each use creates a separate job**
- Agent portal shows all linked homeowners

---

## Full Form Sections (from Christopher's Testing Guide Part 2)

### Section 1: Account

| Test Case | Notes |
|-----------|-------|
| New user signup | Creates account AND submits service request in one step |
| Existing user login | Pre-fills account info; only service fields shown |

---

### Section 2: Service Type

| Test Case | Notes |
|-----------|-------|
| Installation | Standard installation service |
| Assessment | Triggers assessment workflow ($185 + $0.75/mile) |

---

### Section 3: Property Address

| Field | Required | Notes |
|-------|----------|-------|
| Property Address | ✅ | Where work is needed |
| Same as billing address | — | Test both same/different billing address |

---

### Section 4: Insurance Info

| Field | Required | Test Cases |
|-------|----------|------------|
| Agent email | Optional | With agent email (Method B linking), without agent email |
| Policy number | Optional | With policy number, without policy number |

---

### Section 5: Home Specifics

| Field | Required | Test Cases | Notes |
|-------|----------|------------|-------|
| Square footage | ✅ | Under 2000, 2001-3000, 3001-5000 | Drives pipe size calculation |
| Year built | ✅ | >5 years old, ≤5 years old | Drives pressure reducer requirement |

#### Pipe Size Logic ⚠️ MUST VERIFY IN APP

| Square Footage | Expected Pipe Size |
|---------------|-------------------|
| Under 2,000 sq ft | **3/4 inch** |
| 2,001 – 3,000 sq ft | **1 inch** |
| 3,001 – 5,000 sq ft | **1 1/4 inch** |

#### Pressure Reducer Logic ⚠️ MUST VERIFY IN APP

| Home Age | Requirement |
|----------|------------|
| Built **more than 5 years ago** | **REQUIRED** |
| Built **5 years ago or less** | **NOT REQUIRED** |

---

### Section 6: Device Info

| Field | Required | Options (from Platform Spec V6.3) |
|-------|----------|----------------------------------|
| Device type | ✅ | **Flo by Moen** / **Awtos** / **I'm not sure** |
| Device source | ✅ | **Insurance Company will provide** / **I already have the device (Homeowner Provided)** / **Contractor should provide (included in estimate)** |
| Software setup assistance | — | **Yes – I need help setting up the software and connecting to WiFi (additional fee)** / **No – I will handle software setup myself** |

#### Device Source Pricing Impact

| Device Source | Price Handling |
|--------------|---------------|
| **Contractor Provided** | $599.99 fixed — 0% markup (read-only field) |
| **Homeowner Provided** | $0 — no device charge |
| **Insurance Provided** | $0 — no device charge |

#### Software Setup Assistance

| Homeowner Requests | Contractor Includes | Result |
|-------------------|--------------------|----|
| Yes | Includes ($75) | Software appears in bid; retail price = $75 × 1.25 = **$93.75** |
| Yes | Does NOT include | No software line; homeowner handles themselves |
| No | N/A | No software option shown |

---

### Section 7: Water Main Location & Photos

| Field | Required | Options / Test Cases |
|-------|----------|---------------------|
| Water main location | ✅ | **Inside the house** (basement, garage, crawl space) / **Outside the house** (exterior wall, yard) / **I'm not sure** |
| Water main photo | ✅ **REQUIRED** | Upload valid photo (jpg/png/heic, max 25MB) — must succeed; Skip photo — form **must not submit** (error expected) |
| Additional photos (up to 5) | Optional | Test with and without additional photos |

> ⚠️ **Skipping the water main photo should produce a validation error.** Test this explicitly.

---

### Section 8: LiDar

| Field | Required | Notes |
|-------|----------|-------|
| LiDar scan | Optional | Test with and without LiDar upload |

---

### Section 9: Access & Contact

| Field | Required | Options / Notes |
|-------|----------|----------------|
| Property access notes | Optional | Free-text field; test special characters and long input |
| Preferred contact method | ✅ | **Phone call** / **Text message** / **Email** / **Any of the above** |
| Preferred appointment time | ✅ | **Morning (8am–12pm)** / **Afternoon (12pm–4pm)** / **Flexible** |

---

## Method B – Homeowner Enters Agent Email During Sign-Up

When NOT using a referral link, the homeowner can enter the agent's email address in the **Insurance Info** section. This creates a pending agent link that admin must approve.

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Homeowner goes directly to site (no referral link) | Standard service request form |
| 2 | In insurance section, enter agent email | Field accepts email |
| 3 | Submit request | System creates pending agent record |
| 4 | Check admin dashboard | Pending agent appears for approval |
| 5 | Admin approves agent | Agent receives welcome email |

---

## Form Validation Test Cases (Part 5 – Incomplete Forms)

| Action | Expected Result |
|--------|----------------|
| Skip water main photo | **Form must NOT submit – error shown** |
| Enter invalid year built | Validation error |
| Enter non-numeric sq ft | Validation error |
| Skip terms agreement | Cannot submit |

---

## Retail Price Markup Reference

> **Service Fee ($95) must appear in ALL estimates as a separate line item.**
> ⚠️ **Contractors NEVER see the $95 Service Fee in any documents or communications.**

### Doc 1 Example Prices (Christopher's Testing Guide Part 4)

| Component | Contractor Price | Markup | Retail Price |
|-----------|-----------------|--------|-------------|
| Parts | $220 (example) | +35% | $297 |
| Pressure Reducer | $280 (example) | +35% | $378 |
| Cable | $25 (example) | +35% | $33.75 |
| Software | $75 (fixed) | +25% | $93.75 |
| Labor | $575 (example) | +25% | $718.75 |
| Device (Contractor Provided) | $599.99 (fixed) | 0% | $599.99 |
| **Service Fee** | — | — | **$95.00** |
| **Tax** | — | — | Calculated on total (see Resale Cert) |

### V6.3 Example Prices (Platform Spec V6.3, Section 4) — Full Calculation

| Component | Contractor Price | Markup | Retail Price |
|-----------|-----------------|--------|-------------|
| Parts | $260.00 | +35% | $351.00 |
| Pressure Reducer | $310.00 | +35% | $418.50 |
| Device | $599.99 | +0% | $599.99 |
| Software Setup Assistance | $75.00 (fixed) | +25% | $93.75 |
| Labor | $450.00 *(example)* | +25% | $562.50 |
| **Subtotal** | | | **$2,025.74** |
| Service Fee | — | — | **+$95.00** |
| **Total Before Tax** | | | **$2,120.74** |
| Sales Tax (7.75% example) | $2,120.74 × 0.0775 | | **$164.36** |
| **HOMEOWNER TOTAL** | | | **$2,285.10** |

> The $450 labor price is an **example only** — contractors enter their own labor price when bidding.
> Tax rate (7.75%) is an example; actual rate varies by jurisdiction.

### Resale Certificate Tax Handling

| Contractor Selection | Tax Handling |
|---------------------|-------------|
| **Yes – Accepts Resale Certificate** | Contractor enters prices WITHOUT tax. MrSurety adds tax at retail. |
| **No – Does NOT accept** | Contractor includes tax in prices. MrSurety adds NO additional tax. |

---

## Screenshot Capture Instructions

| Step | Filename |
|------|----------|
| Referral link opened – landing page with "Brought to you by [Agent Name]" | `serviceform_01_referral-landing-page.png` |
| Sign-up form loaded | `serviceform_02_signup-page-loaded.png` |
| All form sections filled | `serviceform_03_form-filled.png` |
| Service type dropdown open | `serviceform_04_service-type-dropdown.png` |
| Device source selection | `serviceform_05_device-source-selection.png` |
| Water main photo upload | `serviceform_06_water-main-photo.png` |
| Water main photo skipped – validation error | `serviceform_07_water-main-photo-error.png` |
| Pipe size auto-calculated in form | `serviceform_08_pipe-size-calculated.png` |
| Pressure reducer requirement shown | `serviceform_09_pressure-reducer-required.png` |
| Form submitted – confirmation | `serviceform_10_submission-confirmed.png` |
| Homeowner dashboard – My Requests | `serviceform_11_my-requests-dashboard.png` |
| Estimate page – retail prices only (no contractor prices) | `serviceform_12_estimate-retail-view.png` |
| $95 service fee visible in estimate | `serviceform_13_service-fee-visible.png` |
| Pay Deposit screen (10% of total) | `serviceform_14_pay-deposit.png` |
| Calendar – schedule installation | `serviceform_15_schedule-calendar.png` |

---

## Programmer Specification – Service Request Form with Assessment Option

> Source: "MR SURETY – SERVICE REQUEST FORM WITH ASSESSMENT OPTION" – March 2026

### Form Overview

Multi-step form (10 steps) with agent referral tracking and assessment service option.
Agent ID is captured via URL parameter and persists through entire flow.
Form handles both new account creation and existing user login, with conditional logic for
installation vs assessment requests.

---

### Referral Tracking

| Parameter  | Source                                        | Storage                          |
|------------|-----------------------------------------------|----------------------------------|
| `ref`      | URL query param (`mrsurety.com/ref/AGENT123`) | Stored in session → `service_requests.agent_id` |
| agent_name | Auto-populated from `agents` table            | Display only, read-only field    |
| agent_email| Auto-populated from `agents` table            | Display only, read-only field    |

---

### Section 1: Account Verification / Creation

#### Section 1 – Top-Level Field

| Field ID    | Field Type | Label                          | Required | Validation              |
|-------------|------------|-------------------------------|----------|-------------------------|
| has_account | Radio      | Do you have a MrSurety account? | Yes    | Options: "yes", "no"   |

#### Section 1A – Existing User Login (shown if `has_account = "yes"`)

| Field ID       | Field Type | Label         | Required | Conditions            | Validation                |
|---------------|------------|--------------|----------|-----------------------|--------------------------|
| login_email   | Email      | Email Address | Yes      | has_account = "yes"   | Valid email format        |
| login_password| Password   | Password      | Yes      | has_account = "yes"   | Min 8 characters          |

#### Section 1B – New Account Creation (shown if `has_account = "no"`)

| Field ID        | Field Type | Label           | Required | Conditions           | Validation                               |
|----------------|------------|----------------|----------|----------------------|------------------------------------------|
| full_name      | Text       | Full Name       | Yes      | has_account = "no"   | Min 2 characters                         |
| email          | Email      | Email Address   | Yes      | has_account = "no"   | Valid format, unique                     |
| phone          | Tel        | Phone Number    | Yes      | has_account = "no"   | US format (xxx-xxx-xxxx)                 |
| password       | Password   | Password        | Yes      | has_account = "no"   | Min 8 chars, 1 number, 1 letter          |
| confirm_password | Password | Confirm Password| Yes      | has_account = "no"   | Must match password                      |

---

### Section 2: Service Type Selection (NEW)

| Field ID     | Field Type | Label                      | Required | Validation                              |
|-------------|------------|---------------------------|----------|-----------------------------------------|
| service_type | Radio      | What would you like to do? | Yes      | Options: "installation", "assessment"   |

#### Assessment Fee Calculation (shown if `service_type = "assessment"`)

| Display          | Calculation                                              |
|-----------------|----------------------------------------------------------|
| Base Fee         | $185.00                                                  |
| Mileage Rate     | $0.75 per mile                                           |
| Estimated Total  | $185.00 + ($0.75 × distance from nearest technician to property) |

**Distance Calculation Logic:**
1. Use property address geocoding to get coordinates
2. Query database for nearest available assessment technician
3. Calculate driving distance using Google Maps Distance Matrix API
4. Display estimated total to homeowner

| Field ID          | Field Type | Label                          | Required | Conditions                    | Validation           |
|------------------|------------|-------------------------------|----------|-------------------------------|----------------------|
| proceed_assessment | Radio    | Proceed with Assessment Request? | Yes    | service_type = "assessment"   | Options: "yes", "no" |

> **Note:** If `proceed_assessment = "no"`, form continues but skips installation-specific sections (6 and 7).

---

### Section 3: Property Information (All Service Types)

| Field ID       | Field Type | Label             | Required | Validation                  |
|---------------|------------|------------------|----------|-----------------------------|
| property_street | Text     | Street Address    | Yes      | —                           |
| property_city   | Text     | City              | Yes      | —                           |
| property_state  | Select   | State             | Yes      | US State dropdown (50 states)|
| property_zip    | Text     | ZIP Code          | Yes      | 5-digit or 9-digit format   |
| billing_same    | Radio    | Is billing address same as property? | Yes | Options: "yes", "no" |

#### Billing Address Fields (shown if `billing_same = "no"`)

| Field ID       | Field Type | Label          | Required | Conditions           | Validation           |
|---------------|------------|----------------|----------|----------------------|----------------------|
| billing_street | Text      | Street Address  | Yes      | billing_same = "no"  | —                    |
| billing_city   | Text      | City            | Yes      | billing_same = "no"  | —                    |
| billing_state  | Select    | State           | Yes      | billing_same = "no"  | US State dropdown    |
| billing_zip    | Text      | ZIP Code        | Yes      | billing_same = "no"  | 5-digit or 9-digit   |

---

### Section 4: Insurance Information (All Service Types)

| Field ID          | Field Type | Label                 | Required  | Conditions    | Validation           |
|------------------|------------|----------------------|-----------|---------------|----------------------|
| insurance_company | Text       | Insurance Company     | Yes       | Always        | —                    |
| agent_name        | Text       | Agent Name            | Auto-filled| From referral | Read-only, display only |
| agent_email       | Email      | Agent Email Address   | Auto-filled| From referral | Read-only, display only |
| policy_number     | Text       | Policy Number         | No        | Always        | —                    |

---

### Section 5: Home Specifics (All Service Types)

| Field ID        | Field Type | Label                         | Required | Validation                        |
|----------------|------------|------------------------------|----------|----------------------------------|
| home_type       | Select     | What kind of home is this?    | Yes      | Options: "single_family", "condo", "apartment", "commercial", "other" |
| home_type_other | Text       | If Other, please specify      | No       | Shown only if home_type = "other" |
| square_feet     | Number     | How many sqft is your home?   | Yes      | Numeric, > 0, < 10000            |
| year_built      | Number     | What year was your home built?| Yes      | 4-digit year, 1800–current year  |

---

### Section 6: Device Information (Installation Only)

> This section appears only if `service_type = "installation"`

| Field ID        | Field Type | Label                                    | Required | Conditions                     | Validation                                |
|----------------|------------|------------------------------------------|----------|--------------------------------|-------------------------------------------|
| device_type     | Select     | What type of leak detection product?     | Yes      | service_type = "installation"  | Options: "flo_by_moen", "awtos", "not_sure" |
| device_source   | Select     | Who will provide the device?             | Yes      | service_type = "installation"  | Options: "insurance", "homeowner", "contractor" |
| software_required | Radio    | Do you need software setup and WiFi configuration? | Yes | service_type = "installation" | Options: "yes", "no"        |

---

### Section 7: Water Main Location & Photos (Installation Only)

> This section appears only if `service_type = "installation"`

| Field ID            | Field Type   | Label                              | Required | Conditions                     | Validation                   |
|--------------------|--------------|-----------------------------------|----------|--------------------------------|------------------------------|
| water_main_location | Select       | Where is your water main located?  | Yes      | service_type = "installation"  | Options: "inside", "outside", "not_sure" |
| water_main_photo    | File Upload  | Photo of Current Water Main Setup  | Yes      | service_type = "installation"  | JPG, PNG, HEIC, max 25MB     |
| additional_photos   | File Upload  | Additional Photos (Optional)       | No       | service_type = "installation"  | JPG, PNG, HEIC, max 25MB per file, max 5 files |

---

### Section 8: Advanced Options (All Service Types)

| Field ID      | Field Type  | Label                        | Required | Conditions          | Validation                     |
|--------------|-------------|------------------------------|----------|---------------------|-------------------------------|
| lidar_provided | Checkbox   | I can provide a LiDar scan   | No       | Always              | Boolean                        |
| lidar_file    | File Upload | Upload LiDar Scan            | Yes      | lidar_provided = true | LAS, LAZ, XYZ, PLY, max 100MB |

---

### Section 9: Access & Contact (All Service Types)

| Field ID       | Field Type | Label                      | Required | Validation                                   |
|---------------|------------|---------------------------|----------|----------------------------------------------|
| access_notes  | Textarea   | Property Access Notes      | No       | Max 500 characters                           |
| contact_method | Select    | Preferred Contact Method   | Yes      | Options: "phone", "text", "email", "any"     |
| preferred_time | Select    | Preferred Appointment Time | Yes      | Options: "morning", "afternoon", "flexible"  |

---

### Section 10: Terms & Submission (All Service Types)

| Field ID    | Field Type | Label                                       | Required | Validation         |
|------------|------------|---------------------------------------------|----------|--------------------|
| terms_agreed | Checkbox  | I agree to Terms of Service and Privacy Policy | Yes  | Must be checked    |

**Submit Button:** "Submit Request"

---

### File Upload Specifications

| Upload Field       | Max Size   | Allowed Types              | Max Files | Required When                    |
|-------------------|------------|---------------------------|-----------|----------------------------------|
| water_main_photo  | 25 MB      | .jpg, .jpeg, .png, .heic  | 1         | service_type = "installation"    |
| additional_photos | 25 MB each | .jpg, .jpeg, .png, .heic  | 5         | Never (optional)                 |
| lidar_file        | 100 MB     | .las, .laz, .xyz, .ply    | 1         | lidar_provided = true            |

---

### System Auto-Calculations (After Form Submission)

| Calculation            | Logic                                                              | Applies To           |
|-----------------------|--------------------------------------------------------------------|----------------------|
| Pressure Reducer Required | IF (Current Year − year_built) > 5 THEN Required              | Installation requests |
| Extension Cord Length  | Default 25 ft (configurable)                                      | Installation requests |
| Pipe Size              | IF square_feet ≤ 2000 → 3/4"; IF 2001–3000 → 1"; IF 3001–5000 → 1 1/4" | Installation requests |
| Assessment Fee         | Base $185 + ($0.75 × distance miles)                              | Assessment requests   |
| Nearest Technician     | Query `technicians` table by location                             | Assessment requests   |

---

### Assessment Workflow (NEW)

When homeowner selects assessment option and submits:

| Step | Action                                                                |
|------|-----------------------------------------------------------------------|
| 1    | System calculates assessment fee based on distance to nearest technician |
| 2    | System creates `assessment_request` record                             |
| 3    | System generates invoice for assessment fee                           |
| 4    | Invoice emailed to homeowner with payment link                        |
| 5    | Upon payment, system assigns nearest available technician             |
| 6    | Technician receives notification with property details                |
| 7    | Technician schedules appointment with homeowner                       |
| 8    | After assessment, technician submits report to platform               |
| 9    | Homeowner can then choose to proceed with installation                |

---

### Database Tables

#### `users`

| Column        | Type      | Description                                             |
|--------------|-----------|--------------------------------------------------------|
| id           | UUID      | Primary key                                             |
| full_name    | VARCHAR   | —                                                       |
| email        | VARCHAR   | Unique                                                  |
| phone        | VARCHAR   | —                                                       |
| password_hash | VARCHAR  | —                                                       |
| user_type    | VARCHAR   | 'homeowner', 'technician', 'contractor', 'agent', 'admin' |
| created_at   | TIMESTAMP | —                                                       |

#### `technicians` (NEW)

| Column             | Type      | Description                     |
|-------------------|-----------|---------------------------------|
| id                | UUID      | Primary key, links to `users.id`|
| service_area      | JSON      | Geofence or list of zip codes   |
| base_location_lat | DECIMAL   | —                               |
| base_location_lng | DECIMAL   | —                               |
| is_active         | BOOLEAN   | —                               |
| hourly_rate       | DECIMAL   | For future use                  |
| mileage_rate      | DECIMAL   | Default 0.75                    |

#### `service_requests`

| Column                | Type      | Description                                    |
|----------------------|-----------|------------------------------------------------|
| id                   | UUID      | Primary key                                    |
| user_id              | UUID      | Foreign key to `users`                         |
| agent_id             | UUID      | Foreign key to `agents` (from referral)        |
| service_type         | VARCHAR   | 'installation' or 'assessment'                 |
| property_address     | JSON      | Street, city, state, zip                       |
| billing_address      | JSON      | Nullable                                       |
| insurance_company    | VARCHAR   | —                                              |
| agent_name           | VARCHAR   | From referral                                  |
| agent_email          | VARCHAR   | From referral                                  |
| policy_number        | VARCHAR   | Nullable                                       |
| home_type            | VARCHAR   | —                                              |
| home_type_other      | VARCHAR   | Nullable                                       |
| square_feet          | INTEGER   | —                                              |
| year_built           | INTEGER   | —                                              |
| device_type          | VARCHAR   | Nullable (installation only)                   |
| device_source        | VARCHAR   | Nullable (installation only)                   |
| software_required    | BOOLEAN   | Nullable (installation only)                   |
| water_main_location  | VARCHAR   | Nullable (installation only)                   |
| water_main_photo_url | VARCHAR   | Nullable (installation only)                   |
| additional_photo_urls| JSON      | Nullable (installation only)                   |
| lidar_provided       | BOOLEAN   | —                                              |
| lidar_file_url       | VARCHAR   | Nullable                                       |
| access_notes         | TEXT      | Nullable                                       |
| contact_method       | VARCHAR   | —                                              |
| preferred_time       | VARCHAR   | —                                              |
| status               | VARCHAR   | 'pending', 'assessment_invoiced', 'assessment_paid', 'assessment_scheduled', 'assessment_completed', 'estimating', 'approved' |
| created_at           | TIMESTAMP | —                                              |

#### `assessment_requests` (NEW)

| Column               | Type      | Description                        |
|---------------------|-----------|------------------------------------|
| id                  | UUID      | Primary key                        |
| service_request_id  | UUID      | Foreign key to `service_requests`  |
| technician_id       | UUID      | Foreign key to `technicians`       |
| base_fee            | DECIMAL   | 185.00                             |
| mileage_fee         | DECIMAL   | Calculated                         |
| total_fee           | DECIMAL   | base_fee + mileage_fee             |
| distance_miles      | DECIMAL   | Calculated                         |
| invoice_id          | VARCHAR   | Link to invoice                    |
| invoice_paid        | BOOLEAN   | —                                  |
| scheduled_date      | DATE      | Nullable                           |
| completed_date      | DATE      | Nullable                           |
| assessment_report_url | VARCHAR | Link to uploaded report            |
| created_at          | TIMESTAMP | —                                  |

#### `agents`

| Column       | Type      | Description     |
|-------------|-----------|----------------|
| id          | UUID      | Primary key     |
| name        | VARCHAR   | —               |
| email       | VARCHAR   | Unique          |
| agency      | VARCHAR   | —               |
| referral_link | VARCHAR | Unique          |
| created_at  | TIMESTAMP | —               |

#### `invoices`

| Column                  | Type      | Description               |
|------------------------|-----------|--------------------------|
| id                     | UUID      | Primary key               |
| user_id                | UUID      | —                         |
| assessment_request_id  | UUID      | Nullable                  |
| job_id                 | UUID      | Nullable                  |
| amount                 | DECIMAL   | —                         |
| description            | VARCHAR   | —                         |
| stripe_payment_intent_id | VARCHAR | —                        |
| status                 | VARCHAR   | 'pending', 'paid', 'failed' |
| created_at             | TIMESTAMP | —                         |
| paid_at                | TIMESTAMP | Nullable                  |

---

### API Endpoints

| Endpoint                             | Method | Purpose                                 |
|-------------------------------------|--------|-----------------------------------------|
| /api/auth/login                     | POST   | Authenticate existing user              |
| /api/users                          | POST   | Create new user account                 |
| /api/service-requests               | POST   | Submit service request                  |
| /api/upload                         | POST   | Upload files to cloud storage           |
| /api/assessments/calculate-fee      | POST   | Calculate assessment fee based on address |
| /api/assessments/assign-technician  | POST   | Assign nearest technician               |
| /api/invoices/create                | POST   | Create invoice for assessment fee       |
| /api/stripe/webhook                 | POST   | Handle payment confirmations            |

---

### Email Notifications (Post-Submission)

| # | To              | Trigger                       | Subject                                                   | Body Includes                                                    |
|---|----------------|-------------------------------|-----------------------------------------------------------|------------------------------------------------------------------|
| 1 | Homeowner       | installation_request_submitted | Your MrSurety Service Request Has Been Received          | Summary of submission, tracking link                             |
| 2 | Homeowner       | assessment_request_submitted   | Your Property Assessment Request - Invoice Enclosed      | Assessment fee calculation, payment link, next steps             |
| 3 | Agent           | referral_submitted_service_request | Your Client [Name] Has Started a Service Request    | Client details, request type, tracking link                      |
| 4 | Contractors     | installation_request_submitted | New Service Request in Your Area                         | Property details, link to bid                                    |
| 5 | Technician      | assessment_payment_received    | New Assessment Assignment - [Address]                    | Property details, homeowner contact info, preferred time         |
| 6 | Homeowner       | technician_assigned            | Technician Assigned for Your Property Assessment          | Technician name, contact info, next steps                        |

---

### Service Request Status Workflow

#### Assessment Path

```
pending → assessment_invoiced → assessment_paid → assessment_scheduled → assessment_completed
```

| Status                | Trigger                                 |
|----------------------|-----------------------------------------|
| pending              | Form submitted                          |
| assessment_invoiced  | Invoice generated and emailed           |
| assessment_paid      | Payment received via Stripe             |
| assessment_scheduled | Technician assigned and date confirmed  |
| assessment_completed | Technician submits report               |

#### Installation Path

```
pending → estimating → approved
```

| Status     | Trigger                                       |
|-----------|-----------------------------------------------|
| pending   | Form submitted                                |
| estimating | Admin assigns job, contractors bidding       |
| approved  | Homeowner selects contractor and pays deposit |

