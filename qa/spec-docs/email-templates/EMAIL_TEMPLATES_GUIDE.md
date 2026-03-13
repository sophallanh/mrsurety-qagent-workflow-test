# Email Templates – MrSurety QA Reference

**Source:** Email and DocuSign Examples – https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit  
**Last Updated:** 2026-03-13

> ⚠️ The actual email templates in the app may differ. Use this as a reference to verify
> expected verbiage. Screenshot every email and flag any discrepancies for Christopher.

---

## Email Templates by Recipient

### Homeowner Emails

#### 1. Service Request Confirmation
- **To:** Homeowner
- **Subject:** "Your MrSurety Service Request Has Been Received"
- **Body should include:**
  - Homeowner's name
  - Property address
  - Permit type / service description
  - Request reference number
  - Confirmation that contractors will be notified
  - Contact information for support

#### 2. Contractor Bid Received
- **To:** Homeowner
- **Subject:** "A Contractor Has Submitted a Bid for Your Project"
- **Body should include:**
  - Contractor name and company
  - Bid amount
  - Link to review and compare bids
  - Reminder to select a contractor to proceed

#### 3. Deposit Payment Receipt
- **To:** Homeowner
- **Subject:** "Deposit Received – MrSurety Project #[ID]"
- **Body should include:**
  - Amount paid
  - Date of transaction
  - Contractor name
  - Scheduled service date
  - Receipt / transaction reference number

#### 4. Service Date Confirmed
- **To:** Homeowner
- **Subject:** "Your Service Date is Confirmed"
- **Body should include:**
  - Date and time of service
  - Contractor name and contact
  - Address of service
  - What to expect on the day

#### 5. DocuSign – Document Sent
- **To:** Homeowner
- **Subject:** "Please Sign: [Document Name] – MrSurety"
- **Body should include:**
  - Description of the document
  - Link to sign via DocuSign
  - Deadline to sign (if applicable)
  - Support contact

#### 6. DocuSign – Document Completed
- **To:** Homeowner
- **Subject:** "Document Signed – [Document Name]"
- **Body should include:**
  - Confirmation that all parties have signed
  - Link to view/download the completed document
  - Next steps in the process

#### 7. Final Payment Receipt
- **To:** Homeowner
- **Subject:** "Final Payment Processed – Project Complete"
- **Body should include:**
  - Amount paid
  - Transaction date
  - Project summary
  - Thank-you message and survey/review request

---

### Agent Emails

#### 8. Agent Linked via Referral – Notification
- **To:** Agent
- **Subject:** "A Homeowner Has Used Your Referral Link"
- **Body should include:**
  - Homeowner's name
  - Property address
  - Service request details
  - Link to view in agent dashboard

#### 9. Agent Approved (via Homeowner Email Method)
- **To:** Agent
- **Subject:** "Welcome to MrSurety – You Have Been Linked to a Client"
- **Body should include:**
  - Homeowner's name and request
  - Agent's referral section link
  - Platform login instructions (if new)

#### 10. Job Completed – Agent Notification
- **To:** Agent
- **Subject:** "Project Completed – [Homeowner Name]"
- **Body should include:**
  - Project summary
  - Commission or referral status (if applicable)

---

### Contractor Emails

#### 11. Contractor Account Approved
- **To:** Contractor
- **Subject:** "Your MrSurety Contractor Account Has Been Approved"
- **Body should include:**
  - Welcome message
  - Login instructions
  - How to browse and bid on available jobs

#### 12. New Job Available
- **To:** Contractor
- **Subject:** "New Job Available in Your Area – MrSurety"
- **Body should include:**
  - General job description (no homeowner PII before bid accepted)
  - Location (city/zip)
  - Permit type
  - Link to view and bid

#### 13. Bid Selected – You're Hired
- **To:** Contractor
- **Subject:** "Your Bid Was Selected – MrSurety Project #[ID]"
- **Body should include:**
  - Homeowner name (revealed after selection)
  - Property address
  - Service date
  - Next steps (DocuSign, deposit confirmation)

#### 14. Bid Not Selected
- **To:** Contractor
- **Subject:** "Update on Your Bid – MrSurety Project #[ID]"
- **Body should include:**
  - Notice that another contractor was selected
  - Encouragement to bid on new jobs
  - Link to available jobs board

#### 15. Work Order Created
- **To:** Contractor
- **Subject:** "Work Order Created – MrSurety Project #[ID]"
- **Body should include:**
  - Job details and address
  - Service date and time
  - DocuSign link (if not already signed)
  - Technician assignment prompt

#### 16. Final Payment Processed
- **To:** Contractor
- **Subject:** "Payment Received – MrSurety Project #[ID]"
- **Body should include:**
  - Amount received
  - Payment date
  - Project summary
  - Invoice/receipt reference

#### 17. Agent Upload Invite (Insurance Agent)
- **To:** Insurance Agent (external – no platform account)
- **Subject:** "You Have Been Invited to Upload Documents – MrSurety"
- **Body should include:**
  - Contractor name who sent the invite
  - Secure upload link (one-time use)
  - Instructions for uploading COI and endorsement documents
  - Link expiry information (expires in 7 days)
  - What document types are accepted (COI, endorsements only)
  - Support contact

---

### Admin Emails

#### 18. New Service Request
- **To:** Admin
- **Subject:** "New Service Request Submitted – MrSurety"
- **Body should include:**
  - Homeowner name and contact
  - Property address
  - Permit type and description
  - Agent link status (referral code or email)

#### 19. Pending Agent Alert
- **To:** Admin
- **Subject:** "Action Required: New Agent Link Pending Approval"
- **Body should include:**
  - Homeowner name
  - Agent email entered by homeowner
  - Link to review and approve in admin dashboard

#### 20. New Contractor Pending Approval
- **To:** Admin
- **Subject:** "New Contractor Registration – Approval Required"
- **Body should include:**
  - Contractor name and company
  - License number (CSLB)
  - Contact information
  - Link to approve/reject in admin dashboard

#### 21. Job Closed – Summary
- **To:** Admin
- **Subject:** "Project Closed – MrSurety Project #[ID]"
- **Body should include:**
  - Project summary
  - Final payment confirmation
  - Agent, contractor, homeowner names

---

### Technician Emails

#### 22. Work Order Assigned
- **To:** Technician
- **Subject:** "You Have Been Assigned a Work Order – MrSurety"
- **Body should include:**
  - Job details
  - Service address
  - Date and time
  - Contractor contact information
  - DocuSign link (if applicable)

---

## Screenshot Capture Instructions

1. Log in to the email account associated with each user role.
2. Open each email as it arrives.
3. Capture the **inbox view** (subject, sender, preview text) as one screenshot.
4. Capture the **full open email body** as a second screenshot (scroll if needed).
5. Follow the naming conventions in `qa/screenshots/email-docusign-triggers/README.md`.
6. Note any verbiage issues, typos, missing information, or broken links in the bug log.
