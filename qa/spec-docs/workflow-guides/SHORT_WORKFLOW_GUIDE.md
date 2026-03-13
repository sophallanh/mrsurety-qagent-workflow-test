# MrSurety – Full Workflow Guide (Short Version)

**Live App:** https://frontend-tan-five-46.vercel.app  
**Source:** Christopher's "MrSurety — Full Workflow / How a job flows from start to finish"  
**Last Updated:** 2026-03-13  

> ⚠️ This guide reflects the actual app workflow as documented by Christopher.
> If any step in the app differs from what is written here, document the discrepancy
> and discuss with Christopher before logging it as a bug.

---

## User Types & Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mrsurety.com | MrSurety2026! |
| Agent | agent.test1@mrsurety-qa.com | MrSurety2026! |
| Homeowner | homeowner.test1@mrsurety-qa.com | MrSurety2026! |
| Contractor | contractor.test1@mrsurety-qa.com | MrSurety2026! |
| Technician | tech.test1@mrsurety-qa.com | MrSurety2026! |

---

## Phase 1 – Agent Shares Referral Link

1. Agent logs in at https://frontend-tan-five-46.vercel.app
2. Agent goes to their **dashboard** and clicks the **Copy** button to copy their referral link.
3. Agent shares the link with a homeowner — via **text, email, or by showing the QR code**.
4. That's it — **the link does the rest.**

> ⚠️ Each referral code is valid only for the specific request form it was created for.
> It does **not** carry over to future request forms. A new link must be generated each time.

---

## Phase 2 – Homeowner Signs Up & Requests Service

1. **Click the referral link** — Opens a simple sign-up page.
2. **Fill out the form** — Name, email, phone, password, property address, service type.
3. **Submit** — Account is created and service request is submitted automatically.
4. **Log in to your dashboard** — You'll see your request under **'My Requests'**.
5. **Wait for your estimate** — You'll get an email when it's ready.
6. **Review and approve the estimate** — Click into your request to see the price breakdown.
7. **Pay the deposit** — Click **'Pay Deposit'** — **10% of the total** via credit card.
8. **Schedule your installation** — The calendar opens right after payment — pick a date.

> After scheduling, the contractor takes over. You'll get emails at every step.

---

## Phase 3 – Contractor Workflow

*(After homeowner approves estimate and pays deposit)*

1. Contractor receives notification that the job is confirmed.
2. Contractor reviews job details and schedules work.
3. **DocuSign** documents are sent (Work Order Contract, etc.).
4. Contractor signs DocuSign documents.
5. Contractor performs the work on the scheduled date.
6. Contractor marks the job complete.

---

## Phase 4 – Admin Oversight

Admin uses **admin@mrsurety.com / MrSurety2026!** to:
- View all service requests
- Approve contractor registrations
- Approve agent–homeowner links (Method 2)
- Track job status and payments
- View all signed DocuSign documents

---

## Email & DocuSign Triggers (Summary)

| Step | Email Sent To | DocuSign? |
|------|--------------|-----------|
| Homeowner submits service request | Homeowner (confirmation) | No |
| Agent referral used | Agent (notification) | No |
| Estimate ready | Homeowner | No |
| Homeowner approves estimate | Contractor (notification) | No |
| Deposit paid (10% via credit card) | Homeowner + Admin | No |
| Service date scheduled | Contractor + Homeowner | No |
| Work order created | Contractor + Technician | ✅ Work Order Contract |
| Job complete | All parties | ✅ Completion Sign-off |

---

## Key Notes for Testing

- Test **both** agent-linking methods multiple times.
- The referral link opens a **combined sign-up + service request form** – homeowner does NOT need to register separately first.
- Homeowners may have **multiple property addresses** – test with different addresses and permit types.
- Email and DocuSign functionality are **legally required** – test these carefully.
- Screenshot all email content and DocuSign document pages (target: 50+ screenshots).
- Deposit is **10% of the total estimate** paid by credit card.
