# MrSurety – Short Version Workflow Guide

**Reference:** Short Version Workflow  
**Source:** https://docs.google.com/document/d/1CUxJ-ArzwghjGvoZydzT1u9NgQCgjH_1ltBg9P8pJAI/edit?tab=t.0  
**Last Updated:** 2026-03-13  

> ⚠️ This guide summarizes the expected workflow. The live app may differ slightly.
> If you find discrepancies, document them and discuss with Christopher.

---

## User Types

| Role | Description |
|------|-------------|
| **Agent** | Insurance/real estate agent; can generate referral codes and be linked to homeowners |
| **Homeowner** | Property owner submitting a request for service (permit/surety bond work) |
| **Contractor** | Licensed contractor who bids on jobs posted by homeowners |
| **Admin** | MrSurety platform administrator who manages approvals, users, and jobs |

---

## Method 1 – Agent Creates a Referral Code

1. Agent logs in to the MrSurety platform.
2. Agent navigates to the **Referral** section of their dashboard.
3. Agent generates a **referral code** (unique per request form).
4. Agent copies and shares the referral code or link with a homeowner.
5. Homeowner opens the referral link and completes the **Service Request Form**.
6. The service request is automatically linked to the agent.
7. The agent's dashboard reflects the linked homeowner under **Referrals**.
8. Admin is notified and can view the agent–homeowner link.

> ⚠️ **Important:** Each referral code is valid **only for the specific request form** it was created for. It does **not** carry over to future request forms. A new code must be generated for each new request.

---

## Method 2 – Homeowner Adds Agent Email at Sign-Up

1. Homeowner logs in or creates a new account.
2. Homeowner starts a **new Request for Service**.
3. In the insurance section of the form, homeowner enters the **agent's email address**.
4. Homeowner completes and submits the form.
5. Admin sees a **pending agent** alert in the dashboard.
6. Admin approves the agent link.
7. Agent receives a **welcome/notification email** confirming the connection.

---

## Service Request Flow (Both Methods)

1. Homeowner submits service request with property address and permit type.
2. Platform notifies admin and eligible contractors.
3. Contractors submit bids with pricing and estimate documents.
4. Homeowner reviews bids, selects a contractor, and pays a deposit.
5. Homeowner selects a service date from the calendar.
6. Work order is created and sent to the selected contractor.
7. **DocuSign** documents are triggered (work order contract, resale certificate, etc.).
8. Technician/contractor performs the work and signs off.
9. Final payment and project close-out.

---

## Email & DocuSign Triggers (Summary)

| Step | Email Sent To | DocuSign Triggered? |
|------|--------------|---------------------|
| Homeowner submits service request | Homeowner (confirmation) | No |
| Agent linked via referral | Agent (notification) | No |
| Pending agent via homeowner email | Admin (alert) | No |
| Agent approved | Agent (welcome email) | No |
| Contractor bid submitted | Homeowner + Admin | No |
| Homeowner selects estimate | Contractor | No |
| Deposit processed | Homeowner + Admin | No |
| Work order created | Contractor + Technician | Yes – Work Order Contract |
| Work order completed | All parties | Yes – Completion Sign-off |

---

## Key Notes for Testing

- Test **both** linking methods multiple times.
- Homeowners may have **multiple property addresses** – test with different addresses and permit types.
- Email and DocuSign functionality are **legally required** – test these carefully.
- Screenshot all email content and DocuSign document pages (target: 50+ screenshots).
- Report any discrepancies between this guide and the actual app.
