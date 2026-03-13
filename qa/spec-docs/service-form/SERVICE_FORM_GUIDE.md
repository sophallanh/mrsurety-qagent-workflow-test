# Service Form – MrSurety QA Reference

**Source:** Service Form – https://docs.google.com/document/d/1jXC_fU0wY3HKzIhmDQpfIiz6h3o0wBzsFMFScWoatis/edit  
**Last Updated:** 2026-03-13

> ⚠️ This guide describes the expected fields and behavior of the Service Request Form.
> The live app may differ. Document any discrepancies and discuss with Christopher.

---

## Service Request Form Fields

### Section 1: Homeowner Information
| Field | Required | Notes |
|-------|----------|-------|
| First Name | ✅ | |
| Last Name | ✅ | |
| Email Address | ✅ | Used for account linking and notifications |
| Phone Number | ✅ | |

### Section 2: Property Information
| Field | Required | Notes |
|-------|----------|-------|
| Property Address (Street) | ✅ | |
| City | ✅ | |
| State | ✅ | Default: California |
| Zip Code | ✅ | |
| Permit Type | ✅ | See list below |

**Permit Types:**
- Roofing
- Electrical
- Plumbing
- HVAC
- General Construction
- Foundation / Structural
- Solar Installation
- Pool / Spa
- Landscaping / Hardscape
- Other (with description)

### Section 3: Service Description
| Field | Required | Notes |
|-------|----------|-------|
| Description of Work Needed | ✅ | Minimum 20 characters recommended |
| Estimated Start Date | Optional | |
| Urgency Level | Optional | Standard / Urgent / Emergency |

### Section 4: Insurance / Agent Information
| Field | Required | Notes |
|-------|----------|-------|
| Agent Email Address | Optional | Entering this links the homeowner to the agent (Method 2) |

> ℹ️ If the homeowner arrived via a referral link (Method 1), the agent is already linked.
> The agent email field may be pre-filled or hidden in that case.

---

## Form Validation Rules

- All required fields must be filled before submission.
- Email address must be valid format.
- Phone number must be valid US format.
- Zip code must be 5 digits.
- If agent email is entered, it should be validated as a real agent in the system (check with Christopher on behavior if email is not found).

---

## Multiple Address Testing

Homeowners may have multiple addresses in their profile. When testing:

1. Create a homeowner account and add multiple addresses.
2. Submit separate service requests for each address.
3. Verify each request appears correctly in the homeowner's dashboard.
4. Verify each request is independent and does not share referral codes.

---

## Screenshot Capture Instructions

| Step | Filename |
|------|----------|
| Empty form loaded | `serviceform_01_empty-form.png` |
| Section 1 filled | `serviceform_02_homeowner-info-filled.png` |
| Section 2 filled (address + permit) | `serviceform_03_property-info-filled.png` |
| Section 3 filled (description) | `serviceform_04_description-filled.png` |
| Section 4 filled (agent email) | `serviceform_05_agent-email-filled.png` |
| Validation error state | `serviceform_06_validation-errors.png` |
| Submission confirmation | `serviceform_07_submission-confirmed.png` |
