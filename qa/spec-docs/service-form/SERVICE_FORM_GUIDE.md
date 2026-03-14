# Service Request Form – MrSurety QA Reference

**Live App:** https://frontend-tan-five-46.vercel.app  
**Source:** Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM" – Part 2  
**Last Updated:** 2026-03-13

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

| Field | Required | Test Cases |
|-------|----------|------------|
| Device type | ✅ | Test all device type options |
| Device source | ✅ | Contractor Provided / Homeowner Provided / Insurance Provided |
| Software setup assistance | — | Yes / No |

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

### Section 7: Water Main Photo

| Field | Required | Test Cases |
|-------|----------|------------|
| Water main photo | ✅ **REQUIRED** | Upload valid photo — must succeed; Skip photo — form **must not submit** (error expected) |

> ⚠️ **Skipping the water main photo should produce a validation error.** Test this explicitly.

---

### Section 8: LiDar

| Field | Required | Notes |
|-------|----------|-------|
| LiDar scan | Optional | Test with and without LiDar upload |

---

### Section 9: Access Notes

| Field | Required | Notes |
|-------|----------|-------|
| Access notes / special instructions | Optional | Free-text field; test special characters and long input |

---

### Section 10: Contact

| Field | Required | Test Cases |
|-------|----------|------------|
| Contact methods | ✅ | Test all available contact method options |

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

## Retail Price Markup Reference (from Christopher's Testing Guide Part 4)

> **Service Fee ($95) must appear in ALL estimates as a separate line item.**

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
