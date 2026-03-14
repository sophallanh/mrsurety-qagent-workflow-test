# Christopher's Original Testing Instructions Email

> **Source:** Original email from Christopher Palmer (CK) to QA team  
> **Date:** 2026-03-14  
> **From:** Christopher Palmer (c.palmer@mrsurety.com)

---

## Email Content (verbatim)

**Subject:** Testing Instructions – User Types & Workflow

Hello,

Below is an overview of the user types and workflows you'll need to test.
Please create test email accounts using Outlook.com or another email service so you can receive emails during testing.

**Important Note:**
Email and DocuSign functionality are critical to this site, as many steps are legally required to protect the relationship between homeowners and contractors.

---

### Key Relationship: Agent & Homeowner

Agents can be linked to a homeowner in two ways:

**1. Agent Creates a Referral Code**
- The agent generates a referral code and shares it with the homeowner.
- This links the service request to the agent.
- You'll see this reflected in the app under the agent's referral section.

**2. Homeowner Adds Agent Email During Sign-Up**
- When creating a Request for Service, the homeowner can enter the agent's email address.
- This also connects them.

**Please test both methods multiple times.**

---

### Important Notes on Referrals

- Each referral code is valid **only for the specific request form it was created for.**
- It will **not** carry over to future request forms.
- Homeowners may have multiple addresses in their profile, so test with **different addresses and permit types.**

---

### Reference Document

I've attached an early percentage document that outlines the original workflow.
Please note: It does not fully align with the current app, but it will help you understand the general flow.

I would also like you to **screenshot all the email documents** for me to check verbiage — this will include email updates and DocuSign docs. **It will be over 50 items.**

---

### Admin Login

- **Email:** admin@mrsurety.com
- **Password:** MrSurety2026!

All other users should be created by you.

**3 types of users:** Agent, Contractor, and Homeowner

---

### Reporting Issues

Please provide screenshots of any issues you encounter.
If a video is needed, please include that as well.

Upload all generated materials to the Google Drive folder (link to be provided).

---

### User Accounts

When you create users, please share their email addresses and passwords so we can log in and verify whether any issues are isolated.

---

### Reference Documents (Google Docs)

| Document | Link |
|----------|------|
| **Service Form** | https://docs.google.com/document/d/1jXC_fU0wY3HKzIhmDQpfIiz6h3o0wBzsFMFScWoatis/edit?tab=t.0#heading=h.aohr1jyeas59 |
| **Short Version Workflow** | https://docs.google.com/document/d/1CUxJ-ArzwghjGvoZydzT1u9NgQCgjH_1ltBg9P8pJAI/edit?tab=t.0 |
| **Long Version Workflow** | https://docs.google.com/document/d/1V-WCoz8HbMHRYNo5NTINoX11MXjwEcRJuWVry0TgciM/edit?tab=t.0#heading=h.aonqccacf2d3 |
| **Email and DocuSign Examples** | https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit?tab=t.0 |
| **Organizing/Summary Doc** | https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing |

---

### Final Notes (verbatim from email)

> "Again, email and DocuSign functionality are essential—these are legal documents. These docs above are only to be used to educate you and the app will be somewhat different or require different things. If you have concerns just ask me or make a list of items to discuss, and then you can go back and double check.
>
> If you run into any issues, please text or call me to discuss. Afterward, document our discussion in a file and upload it to the folder.
>
> Good luck!
> CK"

---

## Key Requirements Extracted from This Email

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Create test accounts via Outlook.com | ✅ Done (see `qa/test-user-credentials/`) |
| 2 | Test both agent referral methods | ✅ Automated (`agent-referral-workflow.spec.ts`) |
| 3 | Referral code valid for one request only (not reusable) | ✅ Documented |
| 4 | Test with multiple addresses + permit types | ✅ Documented |
| 5 | Screenshot 50+ emails and DocuSign docs | ✅ Automated (`email-docusign-triggers.spec.ts`) |
| 6 | 3 user types: Agent, Contractor, Homeowner | ✅ All 3 + Technician + Admin |
| 7 | Admin credentials: admin@mrsurety.com / MrSurety2026! | ✅ Documented |
| 8 | Share test user credentials with Christopher | ✅ `qa/test-user-credentials/TEST_USER_CREDENTIALS.md` |
| 9 | Report issues with screenshots + video | ✅ `qa/bug-reports/` |
| 10 | Email and DocuSign are legal documents — test thoroughly | ✅ All 41 emails + 8 DocuSign docs covered |

---

## Reference to Local Copies

| Google Doc | Local Reference |
|------------|----------------|
| Service Form | `qa/spec-docs/service-form/` |
| Short Version Workflow | `qa/spec-docs/workflow-guides/SHORT_WORKFLOW_GUIDE.md` |
| Long Version Workflow | `qa/spec-docs/workflow-guides/` |
| Email & DocuSign Examples | `qa/spec-docs/email-templates/` + `qa/spec-docs/docusign-templates/` |
| Summary/Organizing Doc | `qa/spec-docs/CHRISTOPHER_TESTING_DOC.md` |

---

_Captured 2026-03-14 from Christopher Palmer's original email to QA team._
