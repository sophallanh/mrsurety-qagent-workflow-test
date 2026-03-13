# Service Request / Sign-Up Form – MrSurety QA Reference

**Live App:** https://frontend-tan-five-46.vercel.app  
**Source:** Christopher's "MrSurety — Full Workflow" document  
**Last Updated:** 2026-03-13

> ⚠️ When a homeowner uses a referral link, the form creates their account AND submits
> the service request in a single step. There is no separate registration flow.

---

## How the Referral Sign-Up Form Works

1. Homeowner clicks the agent's referral link.
2. A **simple sign-up page** opens (no prior account needed).
3. Homeowner fills in all required fields.
4. Homeowner clicks **Submit**.
5. Result: Account is created **and** service request is submitted automatically.
6. Homeowner is then directed to log in and see their request under **'My Requests'**.

---

## Form Fields (from Christopher's Workflow Document)

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| **Name** | ✅ | Text | Full name of the homeowner |
| **Email** | ✅ | Email | Used for account login and all notifications |
| **Phone** | ✅ | Phone | US phone number format |
| **Password** | ✅ | Password | Creates the homeowner's platform account |
| **Property Address** | ✅ | Text/Address | The address where work is needed |
| **Service Type** | ✅ | Dropdown/Select | Type of permit/service (e.g., Roofing, Electrical, Plumbing, HVAC, etc.) |

---

## Method 2 – Homeowner Enters Agent Email Manually

When NOT using a referral link, the homeowner can enter the agent's email address in the service request form. This creates a pending agent link that admin must approve.

| Field | Required | Notes |
|-------|----------|-------|
| Agent Email | Optional | Entering this links the homeowner to the agent (Method 2) |

---

## After Form Submission

| Step | What Happens |
|------|-------------|
| Account created | Homeowner can now log in with their email + password |
| Service request submitted | Appears in admin dashboard and contractor available jobs |
| Confirmation email | Sent to homeowner |
| Referral linked | Agent's dashboard shows the new linked homeowner |

---

## Screenshot Capture Instructions

| Step | Filename |
|------|----------|
| Referral link opened – sign-up page loaded | `serviceform_01_signup-page-loaded.png` |
| Form filled – all fields visible | `serviceform_02_form-filled.png` |
| Service type dropdown open | `serviceform_03_service-type-dropdown.png` |
| Form submitted – confirmation/redirect | `serviceform_04_submission-confirmed.png` |
| Homeowner dashboard – My Requests | `serviceform_05_my-requests-dashboard.png` |
| Estimate received email | `serviceform_06_estimate-email.png` |
| Estimate review screen | `serviceform_07_estimate-review.png` |
| Pay Deposit screen (10% of total) | `serviceform_08_pay-deposit.png` |
| Calendar – schedule installation | `serviceform_09_schedule-calendar.png` |

---

## Validation Rules

- All fields above are required before submit.
- Email must be valid format and not already registered.
- Password must meet platform complexity requirements (verify in app).
- Phone must be valid US format.
- Property address must be complete (street, city, state, zip).
- Service type must be selected from the available options.

---

## Multiple Address Testing

Homeowners may have multiple property addresses. After the first request:
1. Log in to the homeowner dashboard.
2. Start a new service request from **'My Requests'**.
3. Enter a different property address and service type.
4. Verify each request appears independently in the dashboard.
5. Verify the agent–homeowner link applies to each request separately.
