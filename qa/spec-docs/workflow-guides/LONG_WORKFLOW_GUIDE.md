# MrSurety – Long Version Workflow Guide

**Reference:** Long Version Workflow  
**Source:** https://docs.google.com/document/d/1V-WCoz8HbMHRYNo5NTINoX11MXjwEcRJuWVry0TgciM/edit?tab=t.0  
**Last Updated:** 2026-03-13  

> ⚠️ This guide provides detailed step-by-step instructions for all platform workflows.
> The live app may differ slightly from these descriptions.
> Document any discrepancies and discuss with Christopher.

---

## Platform Overview

MrSurety connects **homeowners** needing permit/surety bond work with **licensed contractors**, facilitated by **insurance agents** who represent the homeowner's interests. The platform handles the full lifecycle:

- Service request creation
- Agent–homeowner linking (referral or email)
- Contractor bidding and selection
- Contract signing (DocuSign)
- Deposit and payment processing
- Work order management
- Technician assignment and sign-off

---

## Detailed Workflow Steps

### Phase 1: Account Setup

#### Agent Account
1. Agent registers at MrSurety platform.
2. Agent profile includes: name, company, license number, email.
3. Admin approves or the agent receives a verification email.
4. Agent logs in and accesses the **Agent Dashboard**.

#### Homeowner Account
1. Homeowner registers with: name, email, phone, property address(es).
2. A homeowner may register **multiple property addresses** under one account.
3. Homeowner logs in and accesses the **Homeowner Dashboard**.

#### Contractor Account
1. Contractor registers with: company name, license (CSLB), contact info, insurance details.
2. Contractor account requires **admin approval** before they can bid on jobs.
3. Admin reviews and approves the contractor.
4. Contractor receives a notification/welcome email upon approval.

---

### Phase 2: Agent–Homeowner Linking

#### Method 1: Agent Generates a Referral Code

1. Agent logs in and navigates to **Referral** section.
2. Agent selects (or begins) a new Service Request form.
3. Agent generates a **unique referral code** tied to that specific form.
4. Agent copies the referral link and sends it to the homeowner (email, text, etc.).
5. Homeowner opens the referral link in a browser (may be incognito/new session).
6. Homeowner sees the **Service Request Form** pre-filled or tagged with the agent's referral code.
7. Homeowner completes all required fields (address, permit type, description, contact info).
8. Homeowner submits the form.
9. The submission is linked to the agent in the platform database.
10. Agent's **Referral Dashboard** updates to show the linked homeowner and request.
11. Admin is notified of the new service request and the agent link.

> ⚠️ **Referral Code Scope:** The referral code is **only valid for the specific request form** it was generated for. It **cannot** be reused for future request forms. The agent must generate a new referral code for each new service request.

#### Method 2: Homeowner Enters Agent Email During Sign-Up / Service Request

1. Homeowner logs in (or creates a new account).
2. Homeowner clicks **New Request for Service**.
3. Homeowner fills in the service request form:
   - Property address (can select from multiple saved addresses)
   - Permit type (e.g., roofing, electrical, plumbing, general construction)
   - Description of work needed
   - Contact information
4. In the **Insurance / Agent** section of the form, homeowner enters the agent's email address.
5. Homeowner submits the form.
6. Platform creates a **pending agent link** associated with the request.
7. Admin receives an alert: "New service request with agent email – pending approval."
8. Admin reviews and approves the agent link.
9. Agent receives a **welcome/notification email** confirming they have been linked to the homeowner's service request.

---

### Phase 3: Service Request & Contractor Bidding

1. After the service request is submitted (and agent is linked), the request appears in the platform.
2. Admin posts the job (or it auto-posts) to the **Available Jobs** board for contractors.
3. Approved contractors can view available jobs and submit bids.
4. Each bid includes:
   - Bid amount (in dollars)
   - Description of work
   - Timeline estimate
   - Uploaded estimate document (PDF)
5. Homeowner receives a **notification email** when new bids are submitted.
6. Homeowner logs in, reviews all submitted bids in their dashboard.
7. Homeowner selects the preferred contractor/estimate.
8. Contractor is notified that their bid was selected.

---

### Phase 4: Deposit & Scheduling

1. Homeowner is prompted to pay a **deposit** to confirm the contractor selection.
2. Homeowner enters payment information (credit/debit card).
3. Deposit is processed.
4. Homeowner and admin receive deposit confirmation emails.
5. Homeowner selects a **service date** from the contractor's available calendar.
6. Date is confirmed – contractor and homeowner both receive confirmation emails.

---

### Phase 5: DocuSign Document Execution

1. After deposit and date selection, **DocuSign** is triggered.
2. Documents sent depend on the job type; may include:
   - **Work Order / Contract** – signed by contractor and homeowner
   - **Resale Certificate** – if applicable (homeowner selling property)
   - **Completion Sign-off** – signed at job completion
   - **Lien Waiver** – after final payment
3. Each party receives a DocuSign email with the document to review and sign.
4. Signed documents are stored in the platform.
5. Admin can view all signed DocuSign documents in the Admin Dashboard.

---

### Phase 6: Work Order & Technician Assignment

1. After DocuSign is completed, a **Work Order** is created in the system.
2. Contractor assigns a technician to the job.
3. Technician receives a **work order email** with job details.
4. Technician may be required to sign a DocuSign work order receipt.
5. Technician performs the work on the scheduled date.
6. Upon completion, technician (or contractor) marks the job as complete.
7. Final sign-off email is sent to all parties.

---

### Phase 7: Final Payment & Close-Out

1. Homeowner approves the completed work.
2. Final payment is processed.
3. All parties receive payment/receipt emails.
4. Job is marked **Closed** in the admin dashboard.
5. Agent's dashboard reflects the closed job and their referral commission status (if applicable).

---

## Multiple Addresses and Permit Types

Homeowners may have multiple property addresses saved in their profile.

**Test Matrix – Addresses and Permit Types:**

| Test | Address | Permit Type | Agent Linking Method |
|------|---------|------------|---------------------|
| 1 | 123 Main St, Los Angeles CA 90001 | Roofing | Method 1 (Referral Code) |
| 2 | 456 Oak Ave, Anaheim CA 92801 | Electrical | Method 1 (Referral Code) |
| 3 | 789 Pine Rd, Irvine CA 92604 | Plumbing | Method 2 (Agent Email) |
| 4 | 123 Main St, Los Angeles CA 90001 | General Construction | Method 2 (Agent Email) |
| 5 | 456 Oak Ave, Anaheim CA 92801 | HVAC | No agent |

---

## Email & DocuSign Capture Checklist

> Christopher has requested screenshots of all email and DocuSign documents (50+ items).
> See `qa/screenshots/email-docusign-triggers/README.md` for the full capture checklist.

---

## Key Testing Notes

1. **Email and DocuSign are legally required** – test all triggers carefully.
2. Test **both** agent-linking methods multiple times with different homeowners.
3. **Referral codes are single-use per form** – verify a code cannot be reused.
4. Test with **multiple property addresses** and **multiple permit types**.
5. Capture screenshots of all email content, not just confirmations.
6. Capture all DocuSign document pages (all pages, not just the signature page).
7. If the app behaves differently from this guide, document the difference and discuss with Christopher.

---

## Admin Login (Provided by Christopher)

| Email | Password |
|-------|----------|
| admin@mrsurety.com | *(set via `ADMIN_PASSWORD` environment variable – do not commit to source code)* |

> All other test user accounts should be created by the QA team.

---

## Reference Documents

| Document | Link |
|----------|------|
| Service Form | https://docs.google.com/document/d/1jXC_fU0wY3HKzIhmDQpfIiz6h3o0wBzsFMFScWoatis/edit |
| Short Version Workflow | https://docs.google.com/document/d/1CUxJ-ArzwghjGvoZydzT1u9NgQCgjH_1ltBg9P8pJAI/edit |
| Long Version Workflow | https://docs.google.com/document/d/1V-WCoz8HbMHRYNo5NTINoX11MXjwEcRJuWVry0TgciM/edit |
| Email and DocuSign Examples | https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit |
| Testing Organization Doc | https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit |
