# MR SURETY – TESTING GUIDE FOR QA TEAM (SHORT WORKFLOW GUIDE)

> **Source:** Christopher Palmer's Google Doc  
> **Link:** https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing  
> **Full version:** `qa/spec-docs/CHRISTOPHER_TESTING_DOC.md`

This is the condensed workflow reference guide. Use it during testing as a quick checklist.

---

## USER TYPES

| User Type | CSLB / Notes |
|-----------|-------------|
| Homeowner | Multiple property addresses |
| Contractor | Use CSLB **999888** for testing |
| Insurance Agent | Receives referral links + updates |
| Technician | Assessment service only |
| Admin | admin@mrsurety.com / MrSurety2026! |

---

## WORKFLOW 1: AGENT REFERRAL

**Method A – Referral Link**
1. Agent logs in → copies referral link (`mrsurety.com/ref/AGENT123`)
2. Incognito → paste link → "Brought to you by [Agent Name]"
3. Complete service request → job links to agent
4. Agent portal shows new client

**Method B – Homeowner Adds Agent Email**
1. Homeowner goes direct (no link) → standard form
2. Insurance section → enter agent email
3. Submit → pending agent record created
4. Admin approves → agent gets welcome email

---

## WORKFLOW 2: HOMEOWNER SERVICE REQUEST

**Required fields:** Water main photo (REQUIRED — form won't submit without it)

**Pipe Size Logic:**

| Sq Ft | Pipe Size |
|-------|-----------|
| < 2000 | 3/4 inch |
| 2001–3000 | 1 inch |
| 3001–5000 | 1 1/4 inch |

**Pressure Reducer:** Required if home > 5 years old. Not required if ≤ 5 years.

---

## WORKFLOW 3: CONTRACTOR BIDDING

**Method A:** Upload written estimate (PDF/photo)  
**Method B:** Use system estimate creator (line-item table)

- Software checkbox = $75 flat (if homeowner requested)
- Device (contractor-provided) = $599.99 fixed, 0% markup
- Resale Certificate: Yes = no tax in bid / No = tax included in bid

---

## WORKFLOW 4: HOMEOWNER SELECTION & DEPOSIT

- Homeowner sees retail prices only (contractor prices hidden)
- Service Fee = **$95** appears in every estimate

**Markup table:**

| Component | Markup |
|-----------|--------|
| Parts | +35% |
| Pressure Reducer | +35% |
| Cable | +35% |
| Software | +25% |
| Labor | +25% |
| Service Fee | $95 flat |

- 10% deposit required to confirm
- Homeowner selects installation date from calendar

---

## WORKFLOW 5: CONTRACTOR WORK ORDER & JOB EXECUTION

1. Contractor receives "New Job Assignment" email
2. Signs Work Order (DocuSign)
3. Check-in on job day (GPS + timestamp + photo)
4. Creates change order if needed → homeowner approves/declines
5. Completes work → uploads photos + final invoice
6. Signs: Affidavit of Service + Conditional Lien Release

---

## WORKFLOW 6: ADMIN APPROVAL & PAYMENT

1. Admin receives "Work Ready for Approval" email
2. Reviews all photos/docs → approves
3. Contractor receives "Payment Sent" email
4. After 3 days → Unconditional Lien Release sent (DocuSign)
5. **IMPORTANT:** Contractor portal is LIMITED until Unconditional Lien signed
6. After signing → portal access restored
7. Homeowner receives "Certificate Ready" email

---

## WORKFLOW 7: RETURN SERVICE CALL

Admin creates Return Service Call Work Order → contractor signs DocuSign → completes job (same flow as normal)

---

## WORKFLOW 8: CRITICAL SERVICE (EMERGENCY)

1. System assigns nearest contractor immediately
2. Homeowner signs: Critical Change Order & Liability Release
3. Contractor proceeds → same completion flow

---

## WORKFLOW 9: ASSESSMENT SERVICE

Fee: **$185 + $0.75/mile**

1. Homeowner selects "Request Property Assessment" → pays
2. Technician assigned → schedules → completes visit
3. Technician uploads assessment report
4. Homeowner notified → can proceed with installation

---

## EMAIL CHECKLIST (41 total)

| # | Email | To |
|---|-------|----|
| 1 | Welcome - Account Created | Homeowner |
| 2 | Service Request Received | Homeowner |
| 3 | Estimates Ready | Homeowner |
| 4 | Deposit Required | Homeowner |
| 5 | Installation Confirmed | Homeowner |
| 6 | Reminder - Tomorrow | Homeowner |
| 7 | Contractor Arrived | Homeowner |
| 8 | Change Order Created | Homeowner |
| 9 | Critical Release Required | Homeowner |
| 10 | Work Complete - Final Payment | Homeowner |
| 11 | Payment Received | Homeowner |
| 12 | Certificate Ready | Homeowner |
| 13 | Return Service Scheduled | Homeowner |
| 14 | Anniversary Reminder | Homeowner |
| 15 | Welcome Contractor | Contractor |
| 16 | New Job in Area | Contractor |
| 17 | Bid Received | Contractor |
| 18 | Selected for Job | Contractor |
| 19 | Sign Work Order | Contractor |
| 20 | Job Tomorrow Reminder | Contractor |
| 21 | Sign Affidavit/Lien | Contractor |
| 22 | Payment Sent | Contractor |
| 23 | Unconditional Lien Required | Contractor |
| 24 | Critical Assignment | Contractor |
| 25 | Return Service Work Order | Contractor |
| 26 | Change Order Approved | Contractor |
| 27 | Welcome Agent | Agent |
| 28 | Client Started Request | Agent |
| 29 | Client Selected Contractor | Agent |
| 30 | Client Critical Service | Agent |
| 31 | Client Installation Complete | Agent |
| 32 | Certificate Ready | Agent |
| 33 | Client Renewal Reminder | Agent |
| 34 | Welcome Technician | Technician |
| 35 | New Assessment | Technician |
| 36 | Assessment Reminder | Technician |
| 37 | Report Upload Required | Technician |
| 38 | New Contractor Application | Admin |
| 39 | Work Ready for Approval | Admin |
| 40 | Critical Service Alert | Admin |
| 41 | Quarterly Tax Report | Admin |

---

## DOCUSIGN CHECKLIST (8 documents)

| # | Document | To |
|---|----------|----|
| 1 | Contractor Master Services Agreement | Contractor |
| 2 | Work Order / Task Contract | Contractor |
| 3 | Critical Change Order and Liability Release | Homeowner |
| 4 | Return Service Call Work Order | Contractor |
| 5 | Affidavit of Service | Contractor |
| 6 | Conditional Lien Release w/ Invoice | Contractor |
| 7 | Unconditional Lien Release | Contractor |
| 8 | Change Order | Homeowner |

---

## SPECIAL SCENARIOS

**A – Resale Certificate:** Yes = no tax in contractor price / No = tax included  
**B – Software:** Homeowner requests Yes → $75 at +25% markup  
**C – Device Source:** Contractor-provided = $599.99 (0% markup) / Homeowner/Insurance = $0  
**D – Multiple Properties:** One account, 2–3 addresses, all tracked separately  
**E – Incomplete Forms:** Photo skip = error / Invalid year = error / Non-numeric sqft = error

---

## BUG REPORT FIELDS

Date/Time | User Type | User Email | Workflow Step | Expected | Actual | Screenshot | Video | Browser/Device | Notes

---

_Last updated: 2026-03-14 | Full guide: `qa/spec-docs/CHRISTOPHER_TESTING_DOC.md`_
