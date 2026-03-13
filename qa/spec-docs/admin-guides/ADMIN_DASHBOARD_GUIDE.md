# Admin Dashboard Guide – MrSurety QA Reference

**Last Updated:** 2026-03-13

> ⚠️ Use the admin login provided by Christopher: **admin@mrsurety.com**  
> Set the `ADMIN_PASSWORD` environment variable before running tests. Do not commit the password to source code.  
> All other users should be created by the QA team.

---

## Admin Login

| Email | Password |
|-------|----------|
| admin@mrsurety.com | *(set via `ADMIN_PASSWORD` environment variable – do not commit to source code)* |

---

## Admin Dashboard Sections

### 1. Overview / Home Dashboard
- Summary counts: pending approvals, active jobs, completed jobs
- Recent activity feed
- Key metrics: total homeowners, agents, contractors, technicians

**Screenshot:** `admin_01_dashboard-overview.png`

---

### 2. Pending Agent Approvals

- Lists agents who have been entered by homeowners via the agent email method
- Each entry shows: agent email, homeowner name, request date
- Admin can: **Approve** or **Reject** the link

**Steps:**
1. Log in as admin.
2. Navigate to **Pending Agents** section.
3. Review the pending agent entry.
4. Click **Approve** to confirm the agent–homeowner link.
5. Agent receives a welcome/notification email.

**Screenshots:**
- `admin_02_pending-agents-list.png`
- `admin_03_agent-approved.png`

---

### 3. Contractor Approval

- Lists newly registered contractors pending approval
- Each entry shows: contractor name, company, CSLB license number, contact info
- Admin can: **Approve** or **Reject** the contractor

**Steps:**
1. Navigate to **Contractors** section.
2. Review pending contractor registration.
3. Click **Approve**.
4. Contractor receives approval email and can now bid on jobs.

**Screenshots:**
- `admin_04_pending-contractors-list.png`
- `admin_05_contractor-approved.png`

---

### 4. Jobs Tracking

- Lists all active and completed service requests
- Each job shows: homeowner, agent, contractor, permit type, status, dates
- Admin can view job details, track progress, and manage escalations

**Steps:**
1. Navigate to **Jobs** section.
2. Filter by status: Open / In Progress / Completed / Closed
3. Click any job to view full detail.

**Screenshots:**
- `admin_06_jobs-list.png`
- `admin_07_job-detail.png`
- `admin_08_agent-homeowner-link.png`

---

### 5. Work Order Management

- Lists pending work orders requiring admin review
- Admin can approve work orders to trigger DocuSign
- Admin can view signed DocuSign documents

**Steps:**
1. Navigate to **Work Orders** section.
2. Review pending work order.
3. Click **Approve** to trigger DocuSign document flow.

**Screenshots:**
- `admin_09_work-orders-list.png`
- `admin_10_work-order-approved.png`

---

### 6. Payment / Financial Tracking

- Shows deposit and final payment status per job
- Admin can verify payment receipts
- Admin receives email notifications for payments

**Screenshots:**
- `admin_11_payment-tracking.png`
- `admin_12_payment-detail.png`

---

### 7. DocuSign Documents

- Admin can view all executed DocuSign documents
- Documents are organized by job / project ID
- Admin verifies all required parties have signed

**Screenshots:**
- `admin_13_docusign-documents-list.png`
- `admin_14_docusign-document-view.png`

---

## Key Admin Testing Notes

1. Test contractor approval and verify the contractor receives an email.
2. Test agent approval via homeowner email method and verify the agent receives a welcome email.
3. Verify agent–homeowner links are visible in the jobs list.
4. Confirm all DocuSign documents are accessible and correctly populated.
5. Verify payment receipts are generated and sent to the correct parties.
6. Check that job status updates correctly through each workflow phase.
