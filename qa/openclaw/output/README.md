# OpenClaw Output Folder Structure
**Where all QA artifacts land after a test run**

---

## Folder Layout

```
qa/openclaw/output/
├── screenshots/          # All PNG screenshots – numbered sequentially
├── videos/               # MP4 screen recordings
├── data/                 # CSV and JSON data exports
└── reports/              # Daily Markdown summary reports
```

---

## screenshots/

Every screenshot is named with a **3-digit sequence prefix** so they sort correctly in
any file manager and open in order in Google Drive / Slides.

| File Name Pattern | Workflow | Description |
|-------------------|----------|-------------|
| `admin_01_dashboard.png` | Admin Login | Admin dashboard after login |
| `admin_02_users_table.png` | Admin Login | Full users table |
| `admin_03_service_requests.png` | Admin Login | Service requests list |
| `agent_00_signup_form.png` | Agent Signup | Agent registration form |
| `agent_01_dashboard_after_signup.png` | Agent Signup | Post-signup dashboard |
| `agent_02_referral_code.png` | Agent Signup | Referral code / link |
| `agent_03_qr_code.png` | Agent Signup | Downloadable QR code |
| `homeowner_01_method_a_form.png` | Homeowner SR | Service request (referral link) |
| `homeowner_02_stripe_form.png` | Homeowner SR | Stripe payment form |
| `homeowner_03_stripe_success.png` | Homeowner SR | Payment confirmation |
| `homeowner_04_method_b_agent_email.png` | Homeowner SR | Agent email entry |
| `homeowner_05_method_b_confirmation.png` | Homeowner SR | Method B confirmation |
| `email_001_*.png` … `email_050+_*.png` | Email/DocuSign | One file per email (50+) |
| `docusign_001_*.png` … `docusign_006_*.png` | Email/DocuSign | DocuSign document pages |
| `contractor_01_documents_page.png` | Upload Invite | Contractor Documents page |
| `contractor_02_invite_form.png` | Upload Invite | Agent email invite form |
| `contractor_03_invite_sent.png` | Upload Invite | Invite confirmation |
| `contractor_04_active_invites.png` | Upload Invite | Active invites panel |
| `agent_upload_01_checklist.png` | Upload Invite | Upload checklist (no login) |
| `agent_upload_02_coi_ready.png` | Upload Invite | COI file selected |
| `agent_upload_03_coi_success.png` | Upload Invite | Upload success |
| `agent_upload_04_cslb_attempted.png` | Upload Invite | CSLB attempt |
| `agent_upload_05_cslb_rejected.png` | Upload Invite | CSLB rejection message |
| `contractor_05_invite_revoked.png` | Upload Invite | Revoke confirmation |
| `security_01_revoked_link.png` | Security | Revoked link error page |
| `security_02_expired_link.png` | Security | Expired link error page |
| `security_03_url_manipulation.png` | Security | Access denied page |
| `admin_04_agent_homeowner_links.png` | Admin Verify | Agent-homeowner links |
| `admin_05_service_requests_full.png` | Admin Verify | Full service request list |
| `admin_06_document_uploads.png` | Admin Verify | Document uploads view |
| `admin_07_contractor_invites.png` | Admin Verify | Contractor invites view |

---

## videos/

| File Name | Workflow | Contents |
|-----------|----------|----------|
| `contractor_invite_full.mp4` | Upload Invite | Complete contractor → agent upload flow |

---

## data/

| File Name | Format | Description |
|-----------|--------|-------------|
| `test_accounts.csv` | CSV | All test accounts: role, email, password, creation date, screenshot |
| `findings.csv` | CSV | All issues found: workflow, step, type, severity, description, screenshot |
| `email_inventory.csv` | CSV | All 50+ emails catalogued: subject, inbox, screenshot path, text preview |
| `admin_users.csv` | CSV | Users table extracted from the admin dashboard |
| `daily_findings.json` | JSON | Same as findings.csv but in JSON (for OpenClaw export-report) |
| `referral_link.txt` | Text | Referral link generated in Workflow 2 (used by Workflow 3) |

### test_accounts.csv columns
```
role, email, password, creation_date, screenshot_path
```

### findings.csv columns
```
date, workflow, step, issue_type, description, severity, screenshot_path, video_path
```
Severity levels: `critical`, `high`, `medium`, `low`

### email_inventory.csv columns
```
seq, inbox, subject, screenshot_path, text_preview
```

---

## reports/

| File Name Pattern | Description |
|-------------------|-------------|
| `YYYY-MM-DD_findings.md` | Daily Markdown report with summary table, account list, findings, next steps |

---

## Uploading to Google Drive

After each run, zip the output folder and upload:

```bash
cd qa/openclaw
zip -r MrSurety_QA_$(date +%Y-%m-%d).zip output/
# Then drag the zip into the shared Google Drive folder Christopher provided
```

Or set `GDRIVE_FOLDER_ID` in `.env` and the daily runner (`run_daily.sh`) will upload automatically.

---

## .gitignore Note

The `output/` folder is **not committed to Git** (it contains generated artifacts).
Only the empty folder structure placeholders (`.gitkeep`) are tracked.
