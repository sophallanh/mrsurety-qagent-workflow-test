# DocuSign Templates – MrSurety QA Reference

**Source:** Email and DocuSign Examples – https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit  
**Last Updated:** 2026-03-13

> ⚠️ DocuSign documents are **legally required** for this platform.
> Capture all pages of each document and flag any verbiage issues immediately.

---

## DocuSign Documents Reference

### 1. Work Order / Contract

- **Trigger:** After homeowner pays deposit and selects service date
- **Sent To:** Contractor and Homeowner
- **Expected Content:**
  - Job description and scope of work
  - Property address
  - Contractor name and license number
  - Start date and estimated completion
  - Total contract value
  - Payment terms
  - Signatures: Contractor + Homeowner
- **Screenshot Requirements:**
  - `docusign_work-order-contract_page1.png` – Full first page
  - `docusign_work-order-contract_page2.png` – Additional pages if present
  - `docusign_work-order-contract_signature.png` – Signature/completion page

---

### 2. Resale Certificate

- **Trigger:** When applicable (homeowner selling property)
- **Sent To:** Homeowner
- **Expected Content:**
  - Property address
  - Current and new owner information
  - Permit/bond details
  - Certification statement
  - Homeowner signature
- **Screenshot Requirements:**
  - `docusign_resale-certificate_page1.png` – Full document
  - `docusign_resale-certificate_signature.png` – Signature page

---

### 3. Completion Sign-off

- **Trigger:** After work is completed and homeowner approves
- **Sent To:** Contractor + Homeowner
- **Expected Content:**
  - Project ID and reference
  - Scope of work completed
  - Date of completion
  - Homeowner approval statement
  - Signatures: Contractor + Homeowner
- **Screenshot Requirements:**
  - `docusign_completion-signoff_page1.png` – Full document
  - `docusign_completion-signoff_signature.png` – Signature page

---

### 4. Technician Work Order Receipt

- **Trigger:** After work order is assigned to technician
- **Sent To:** Technician
- **Expected Content:**
  - Job details and property address
  - Service date and time
  - Technician acknowledgment statement
  - Technician signature
- **Screenshot Requirements:**
  - `docusign_tech-work-order-receipt_page1.png` – Full document
  - `docusign_tech-work-order-receipt_signature.png` – Signature page

---

### 5. Lien Waiver

- **Trigger:** After final payment is processed
- **Sent To:** Contractor
- **Expected Content:**
  - Property address
  - Project description
  - Amount received (final payment)
  - Waiver of lien rights statement
  - Contractor signature
- **Screenshot Requirements:**
  - `docusign_lien-waiver_page1.png` – Full document
  - `docusign_lien-waiver_signature.png` – Signature page

---

## DocuSign Capture Instructions

1. Open the DocuSign email notification.
2. Click the DocuSign link to open the document.
3. Screenshot the **email trigger** (see `email-templates/EMAIL_TEMPLATES_GUIDE.md` for email captures).
4. In DocuSign, capture each page of the document:
   - Capture page by page if multi-page
   - Capture the signature/initial field areas specifically
   - Capture the "Document Completed" confirmation screen
5. Place all captures in `qa/screenshots/email-docusign-triggers/`.
6. Note any issues (missing fields, wrong names, wrong addresses, incorrect verbiage) in the bug log.

---

## Common DocuSign Issues to Watch For

- ❌ Wrong homeowner/contractor name in the document
- ❌ Wrong property address
- ❌ Missing signature fields
- ❌ Incorrect dollar amounts or dates
- ❌ Legal language that differs from what Christopher approved
- ❌ DocuSign email not received within 5 minutes of trigger
- ❌ DocuSign link expired or invalid
- ❌ Document does not match the workflow step that triggered it
