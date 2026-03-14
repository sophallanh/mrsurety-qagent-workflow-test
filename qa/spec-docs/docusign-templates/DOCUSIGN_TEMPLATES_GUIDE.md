# DocuSign Templates – MrSurety QA Reference

**Source:** Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM" – Part 4  
**Also see:** Email and DocuSign Examples – https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit  
**Last Updated:** 2026-03-13

> ⚠️ DocuSign documents are **legally required** for this platform.
> Capture **every page** of each document — not just the signature page.
> Flag any verbiage issues, missing fields, or wrong amounts immediately.

---

## DocuSign Testing Checklist (Part 4 of Testing Guide)

| # | Document | Sent To | Trigger | Tested? |
|---|----------|---------|---------|---------|
| D1 | **Contractor Master Services Agreement** | Contractor | Contractor joins network | ☐ |
| D2 | **Work Order / Task Contract** | Contractor | Deposit paid | ☐ |
| D3 | **Critical Change Order and Liability Release** | Homeowner | Emergency/critical service | ☐ |
| D4 | **Return Service Call Work Order** | Contractor | Return service requested | ☐ |
| D5 | **Affidavit of Service** | Contractor | Job complete | ☐ |
| D6 | **Conditional Lien Release w/ Invoice** | Contractor | Docs submitted (job complete) | ☐ |
| D7 | **Unconditional Lien Release** | Contractor | Payment clears (3 days) | ☐ |
| D8 | **Change Order** | Homeowner | During job (contractor creates) | ☐ |

---

## Document Details

### D1 – Contractor Master Services Agreement

- **Trigger:** Contractor joins the MrSurety network (account approval)
- **Sent To:** Contractor
- **Expected Content:**
  - Platform terms and conditions
  - Contractor obligations (CSLB license verification, insurance requirements)
  - Commission/fee structure
  - Contractor signature
- **Screenshot Requirements:**
  - `docusign_D1_master-services-agreement_page1.png`
  - `docusign_D1_master-services-agreement_signature.png`

---

### D2 – Work Order / Task Contract

- **Trigger:** After homeowner pays deposit and selects service date
- **Sent To:** Contractor (+ Homeowner review)
- **Expected Content:**
  - Job description and scope of work
  - Property address
  - Contractor name and CSLB license number
  - Start date and estimated completion
  - **Total contract value must match the bid prices**
  - Payment terms
  - Contractor signature
- **Screenshot Requirements:**
  - `docusign_D2_work-order-contract_page1.png` – Full first page
  - `docusign_D2_work-order-contract_page2.png` – Additional pages if present
  - `docusign_D2_work-order-contract_signature.png` – Signature/completion page

---

### D3 – Critical Change Order and Liability Release

- **Trigger:** Homeowner requests emergency/critical water main service
- **Sent To:** Homeowner
- **Expected Content:**
  - Emergency service description
  - Liability release statement
  - Homeowner initials/signature
  - **IMPORTANT: Contractor must NOT start work until homeowner signs this document**
- **Screenshot Requirements:**
  - `docusign_D3_critical-change-order_page1.png`
  - `docusign_D3_critical-change-order_signature.png`

---

### D4 – Return Service Call Work Order

- **Trigger:** Homeowner requests additional work after job completion
- **Sent To:** Contractor
- **Expected Content:**
  - Original job reference
  - Return service description
  - Property address and date
  - Contractor signature
- **Screenshot Requirements:**
  - `docusign_D4_return-service-work-order_page1.png`
  - `docusign_D4_return-service-work-order_signature.png`

---

### D5 – Affidavit of Service

- **Trigger:** Job marked complete (contractor uploads photos and final invoice)
- **Sent To:** Contractor
- **Expected Content:**
  - Statement of work completed
  - Project reference number
  - Completion date
  - Contractor attestation and signature
- **Screenshot Requirements:**
  - `docusign_D5_affidavit-of-service_page1.png`
  - `docusign_D5_affidavit-of-service_signature.png`

---

### D6 – Conditional Lien Release w/ Invoice

- **Trigger:** Contractor submits completion documents (job complete)
- **Sent To:** Contractor
- **Expected Content:**
  - Property address
  - Invoice amount (must match final invoice uploaded)
  - Contractor **initials required** throughout document
  - Conditional lien release statement
  - Contractor signature
- **Screenshot Requirements:**
  - `docusign_D6_conditional-lien-release_page1.png` – Full document
  - `docusign_D6_conditional-lien-release_initials.png` – Page requiring initials
  - `docusign_D6_conditional-lien-release_signature.png` – Signature page

---

### D7 – Unconditional Lien Release

- **Trigger:** Payment clears (approximately 3 days after admin approves work)
- **Sent To:** Contractor
- **Expected Content:**
  - Property address
  - Final payment amount
  - Unconditional lien release statement
  - Contractor signature
- **⚠️ IMPORTANT ACCESS LOCK: Contractor portal access is LIMITED before this document is signed. Full portal access is restored only after signing.**
- **Screenshot Requirements:**
  - `docusign_D7_unconditional-lien-release_page1.png` – Full document
  - `docusign_D7_unconditional-lien-release_signature.png` – Signature page
  - `docusign_D7_portal-access-locked.png` – Screenshot of limited portal access BEFORE signing
  - `docusign_D7_portal-access-restored.png` – Screenshot of full portal access AFTER signing

---

### D8 – Change Order

- **Trigger:** Contractor creates a change order during job execution
- **Sent To:** Homeowner
- **Expected Content:**
  - Description of the change from original scope
  - Updated pricing
  - Homeowner approve/decline options
  - Homeowner signature (if approved)
- **Screenshot Requirements:**
  - `docusign_D8_change-order_page1.png` – Full document
  - `docusign_D8_change-order_approved.png` – After homeowner approves
  - `docusign_D8_change-order_declined.png` – After homeowner declines (if tested)

---

## DocuSign Capture Instructions

1. Open the DocuSign email notification.
2. Click the DocuSign link to open the document.
3. Screenshot the **email trigger** first (see `EMAIL_TEMPLATES_GUIDE.md`).
4. In DocuSign, capture each page of the document:
   - Capture page by page if multi-page
   - Capture the signature/initial field areas specifically
   - Capture the "Document Completed" confirmation screen
5. Place all captures in `qa/screenshots/email-docusign-triggers/`.
6. Note any issues in the bug log.

---

## Common DocuSign Issues to Watch For

- ❌ Wrong homeowner/contractor name in the document
- ❌ Wrong property address
- ❌ Missing signature or initial fields
- ❌ Incorrect dollar amounts or dates (amounts must match bid/invoice)
- ❌ Legal language that differs from what Christopher approved
- ❌ DocuSign email not received within 5 minutes of trigger
- ❌ DocuSign link expired or invalid
- ❌ Document does not match the workflow step that triggered it
- ❌ Contractor portal access NOT restricted before Unconditional Lien Release is signed (D7)
- ❌ Contractor portal access NOT restored AFTER Unconditional Lien Release is signed (D7)
- ❌ CSLB license number missing or incorrect in Work Order (D2)
