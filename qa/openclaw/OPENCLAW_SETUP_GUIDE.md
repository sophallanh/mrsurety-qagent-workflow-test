# OpenClaw Setup Guide – MrSurety QA Testing
**Start-to-finish instructions for Christopher's complete QA workflow**

> **Why OpenClaw?** Open-source, self-hosted, multi-agent browser automation. You control the exact
> logic—retry on CAPTCHA, custom Stripe assertions, local file saves—with no cloud limits or
> vendor lock-in. All screenshots, videos, and CSV reports land in an organized local folder you
> can upload directly to Google Drive.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Install OpenClaw via Docker](#2-install-openclaw-via-docker)
3. [Configure Environment Variables](#3-configure-environment-variables)
4. [Connect Chat Interface (WhatsApp / Telegram / Slack)](#4-connect-chat-interface)
5. [Enable Browser Skill](#5-enable-browser-skill)
6. [Connect to the MrSurety App](#6-connect-to-the-mrsurety-app)
7. [Run Workflow 1 – Admin Login & Dashboard Screenshot](#7-workflow-1--admin-login--dashboard-screenshot)
8. [Run Workflow 2 – Agent Signup & Referral Code](#8-workflow-2--agent-signup--referral-code)
9. [Run Workflow 3 – Homeowner Service Request & Stripe Payment](#9-workflow-3--homeowner-service-request--stripe-payment)
10. [Run Workflow 4 – Email & DocuSign Screenshots (50+)](#10-workflow-4--email--docusign-screenshots-50)
11. [Run Workflow 5 – Contractor Upload Invite & Security Controls](#11-workflow-5--contractor-upload-invite--security-controls)
12. [Run Workflow 6 – Admin Verification & Daily Report](#12-workflow-6--admin-verification--daily-report)
13. [Output Folder Structure](#13-output-folder-structure)
14. [Daily Automated Run (Cron)](#14-daily-automated-run-cron)
15. [Troubleshooting](#15-troubleshooting)

---

## 1. Prerequisites

Install the following before starting. All commands assume Ubuntu 22.04 / macOS 14 or later.

| Tool | Version | Install Command |
|------|---------|-----------------|
| Docker Desktop | 24+ | https://www.docker.com/products/docker-desktop |
| Docker Compose | v2 | Included with Docker Desktop |
| Python | 3.11+ | `brew install python` or `apt install python3` |
| pip | latest | `python3 -m ensurepip --upgrade` |
| playwright (Python) | 1.44+ | `python3 -m pip install playwright && python3 -m playwright install chromium` |
| Git | any | `brew install git` or `apt install git` |

Verify:
```bash
docker --version          # Docker version 24.x
python3 --version         # Python 3.11.x
playwright --version      # Version 1.44.x
```

---

## 2. Install OpenClaw via Docker

```bash
# Clone or pull the OpenClaw image
docker pull openclaw/openclaw:latest

# OR run directly from docker-compose (recommended – see docker-compose.yml in this folder)
cd qa/openclaw
docker compose up -d

# Verify services are running
docker compose ps
```

Expected output:
```
NAME               STATUS          PORTS
openclaw-agent     Up 30 seconds   0.0.0.0:7860->7860/tcp
openclaw-browser   Up 30 seconds   0.0.0.0:9222->9222/tcp
openclaw-redis     Up 30 seconds   6379/tcp
```

Open the OpenClaw web UI: **http://localhost:7860**

---

## 3. Configure Environment Variables

```bash
# Copy the template
cp qa/openclaw/.env.example qa/openclaw/.env

# Open and fill in your values
nano qa/openclaw/.env   # or use VS Code, TextEdit, etc.
```

**Required variables to fill in right now:**

```dotenv
MRSURETY_BASE_URL=https://frontend-tan-five-46.vercel.app   # live Vercel deployment
ADMIN_EMAIL=admin@mrsurety.com
ADMIN_PASSWORD=MrSurety2026!
```

All other test user accounts are created by the workflows themselves (Steps 8–12).

See `.env.example` for the full list with comments.

---

## 4. Connect Chat Interface

OpenClaw can be controlled via chat (WhatsApp, Telegram, or Slack). This lets you trigger tests
and receive findings on your phone without opening a terminal.

### Option A – Telegram (Recommended)
```bash
# In the OpenClaw web UI (http://localhost:7860):
# 1. Go to Settings → Integrations → Telegram
# 2. Enter your Telegram Bot Token (create one at https://t.me/BotFather)
# 3. Enter your Telegram Chat ID
# 4. Click "Test Connection" – you'll receive a "✅ OpenClaw connected" message
```

### Option B – Slack
```bash
# 1. Go to Settings → Integrations → Slack
# 2. Enter your Slack Bot Token (OAuth token from api.slack.com)
# 3. Enter the channel name (e.g. #mrsurety-qa)
# 4. Click "Test Connection"
```

### Option C – Web UI only (simplest to start)
Skip this step. Use the web UI at **http://localhost:7860** to type commands directly.

---

## 5. Enable Browser Skill

The Browser Skill gives OpenClaw control over a real Chromium browser—exactly like the existing
Playwright test suite, but chat-driven.

```bash
# In the OpenClaw web UI:
# 1. Go to Skills → Browser
# 2. Click "Enable"
# 3. Set:
#    Browser Mode:      headless=False (visual – so you can watch and screenshot)
#    Screenshot Format: PNG
#    Video Format:      MP4
#    Save Path:         ./output/screenshots/   (relative to qa/openclaw/)
#    Video Save Path:   ./output/videos/
# 4. Click "Save"
```

Verify the browser skill works:
```
# In the web UI chat box, type:
browser --url=https://google.com screenshot --full "test_browser.png"
```
You should see `test_browser.png` appear in `qa/openclaw/output/screenshots/`.

---

## 6. Connect to the MrSurety App

> ⚠️ **Security reminder:** The admin credentials below are the staging/production credentials
> provided by Christopher for QA testing only. Do not share them outside the QA team, do not
> commit the filled-in `.env` file to Git, and rotate them immediately if they are ever exposed.

Before running QA workflows, confirm OpenClaw can reach the app:

```bash
# In the web UI chat box or terminal:
python3 qa/openclaw/workflows/mrsurety_qa.py --check-connection
```

Expected output:
```
✅ Reached https://frontend-tan-five-46.vercel.app – HTTP 200
✅ Login page found (/login)
✅ Admin login verified (admin@mrsurety.com)
```

If you see a connection error, check:
- `MRSURETY_BASE_URL` in your `.env` file
- VPN / firewall settings
- Staging server status (contact Christopher)

---

## 7. Workflow 1 – Admin Login & Dashboard Screenshot

**What this does:** Logs in as the admin, screenshots the dashboard, extracts the full user list
to `output/data/admin_users.csv`.

```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow admin-login
```

**OpenClaw one-liner (web UI chat):**
```
browser --url={MRSURETY_BASE_URL}/login
fill email="admin@mrsurety.com"
fill password="MrSurety2026!"
click login-submit
expect url=/dashboard
screenshot --full "admin_01_dashboard.png"
click Users
extract-table >> "output/data/admin_users.csv"
screenshot "admin_02_users_table.png"
```

**Output files:**
```
output/screenshots/admin_01_dashboard.png
output/screenshots/admin_02_users_table.png
output/data/admin_users.csv
```

---

## 8. Workflow 2 – Agent Signup & Referral Code

**What this does:** Creates a new agent account using a fresh Outlook email address, navigates to
the referral section, generates a referral code, screenshots the QR code and shareable link.

```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow agent-signup
```

**What gets created automatically:**
- Agent Outlook account: `testagent_YYYYMMDD@outlook.com` / `MrSuretyQA2026!`
- Referral code and QR code screenshot
- Entry added to `output/data/test_accounts.csv`

**OpenClaw one-liner (web UI chat):**
```
browser --url={MRSURETY_BASE_URL}/signup
fill first_name="Test" last_name="Agent" email="testagent_YYYYMMDD@outlook.com" password="MrSuretyQA2026!" role="agent"
click signup-submit
expect url=/agent/dashboard
click nav-referral
extract-text ".referral-code" >> referral_code.txt
screenshot "agent_01_referral_code.png"
click download-qr
screenshot "agent_02_qr_code.png"
```

**Output files:**
```
output/screenshots/agent_01_referral_code.png
output/screenshots/agent_02_qr_code.png
output/data/test_accounts.csv         ← agent row appended
referral_code.txt                     ← used by Workflow 3
```

**Important:** Each referral code is valid only for the specific service request it was created
for. Generate a new code before each homeowner test run. See Christopher's note in the testing
instructions.

---

## 9. Workflow 3 – Homeowner Service Request & Stripe Payment

**What this does:** Tests both referral methods Christopher specified:
- **Method A** – Homeowner uses the referral code/link from Workflow 2
- **Method B** – Homeowner enters the agent's email address during signup

Then submits a service request and runs a Stripe test payment (`4242 4242 4242 4242`).

```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow homeowner-service-request
```

**Stripe test card details:**
```
Card Number:  4242 4242 4242 4242
Expiry:       12/29
CVV:          123
ZIP:          90210
```

**OpenClaw one-liner – Method A (referral link):**
```
browser --url={REFERRAL_LINK}
fill first_name="Test" last_name="Homeowner" email="testhomeowner_YYYYMMDD@outlook.com" password="MrSuretyQA2026!"
fill address="123 Main St, Los Angeles CA 90001" permit_type="plumbing"
click proceed
fill card_number="4242424242424242" expiry="1229" cvv="123" zip="90210"
click pay
expect text="Payment successful"
screenshot --full "homeowner_01_stripe_success.png"
```

**OpenClaw one-liner – Method B (agent email):**
```
browser --url={MRSURETY_BASE_URL}/service-request
fill agent_email="testagent_YYYYMMDD@outlook.com"
fill address="456 Oak Ave, Anaheim CA 92801" permit_type="electrical"
screenshot "homeowner_02_agent_email_entry.png"
click submit
screenshot "homeowner_03_confirmation.png"
```

**Output files:**
```
output/screenshots/homeowner_01_method_a_form.png
output/screenshots/homeowner_02_stripe_form.png
output/screenshots/homeowner_03_stripe_success.png
output/screenshots/homeowner_04_method_b_agent_email.png
output/screenshots/homeowner_05_method_b_confirmation.png
output/data/test_accounts.csv    ← homeowner rows appended
```

---

## 10. Workflow 4 – Email & DocuSign Screenshots (50+)

**What this does:** Opens each email received in the test Outlook inboxes and takes a full-page
screenshot—covering all 50+ email and DocuSign documents Christopher requires.

```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow email-docusign
```

**Email accounts to check (automatically cycled):**
- Agent inbox: `testagent_YYYYMMDD@outlook.com`
- Homeowner inbox: `testhomeowner_YYYYMMDD@outlook.com`
- Contractor inbox: `testcontractor_YYYYMMDD@outlook.com`

**OpenClaw one-liner per inbox:**
```
browser --url=https://outlook.com
fill email="{INBOX_EMAIL}" password="{INBOX_PASSWORD}"
click sign-in
# Loop through all emails in inbox:
for each email in inbox:
    click email
    screenshot --full "email_{SEQ:03d}_{SUBJECT_SLUG}.png"
    extract-text --all >> "output/data/email_content_{SEQ:03d}.txt"
```

**DocuSign documents** (captured the same way – open the DocuSign email link):
```
click docusign-link
screenshot --full "docusign_{SEQ:03d}_{DOC_TYPE}.png"
```

**Naming convention for 50+ screenshots:**
```
output/screenshots/
├── email_001_service_request_confirmation.png
├── email_002_agent_referral_notification.png
├── email_003_admin_pending_agent_alert.png
...
├── email_039_contractor_bid_accepted.png
├── docusign_001_homeowner_contract.png
├── docusign_002_lien_release_notice.png
...
├── docusign_006_final_sign_off.png
```

**Output files:**
```
output/screenshots/email_001_*.png through email_050+_*.png
output/screenshots/docusign_001_*.png through docusign_006_*.png
output/data/email_content_*.txt
output/data/email_inventory.csv    ← email number, subject, recipient, date, screenshot_path
```

---

## 11. Workflow 5 – Contractor Upload Invite & Security Controls

**What this does:** Tests the full Agent Upload Invite System that Christopher just built:
- Contractor sends a secure upload link to the insurance agent
- Insurance agent opens the link (no login required) and uploads COI/endorsement files
- Security controls: link expiration (7 days), revoke access, document type restrictions

```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow contractor-upload-invite
```

**Steps automated:**
1. Contractor logs in → Documents page → "Invite Agent to Upload Documents"
2. Enter insurance agent email → Send Invite → Screenshot invite panel
3. Switch to agent inbox → Open invite email → Click secure upload link
4. On the upload page: screenshot checklist (uploaded vs needed)
5. Upload a COI PDF → assign document type, carrier name, effective date → Upload All
6. Upload an endorsement PDF → same metadata flow
7. Attempt to upload a CSLB card → **expect rejection** (document type restriction)
8. Contractor view: confirm upload counts updated → Screenshot
9. Contractor revokes access → verify link no longer works → Screenshot error page
10. Test expired link (> 7 days old) → verify rejection

**Security control assertions:**
```
# Each of these should show an error / rejection:
browser --url={REVOKED_UPLOAD_LINK}
expect text="This link has been revoked"
screenshot "security_01_revoked_link.png"

browser --url={EXPIRED_UPLOAD_LINK}
expect text="This link has expired"
screenshot "security_02_expired_link.png"

browser --url={MANIPULATED_URL}
expect text="Access denied"
screenshot "security_03_url_manipulation.png"
```

**Output files:**
```
output/screenshots/contractor_01_invite_panel.png
output/screenshots/contractor_02_invite_sent.png
output/screenshots/agent_upload_01_checklist.png
output/screenshots/agent_upload_02_coi_upload.png
output/screenshots/agent_upload_03_endorsement_upload.png
output/screenshots/agent_upload_04_cslb_rejected.png
output/screenshots/contractor_03_upload_counts.png
output/screenshots/security_01_revoked_link.png
output/screenshots/security_02_expired_link.png
output/screenshots/security_03_url_manipulation.png
output/videos/contractor_invite_full.mp4
```

---

## 12. Workflow 6 – Admin Verification & Daily Report

**What this does:** Logs into the admin dashboard, verifies all workflow outcomes, logs any
issues found, and compiles a daily findings Markdown report that you can share with Christopher.

```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow admin-verification
```

**Admin checks:**
```
browser --url={MRSURETY_BASE_URL}/admin
fill email="admin@mrsurety.com" password="MrSurety2026!"
click login-submit
# Check user list
click Users
extract-table >> "output/data/admin_users.csv"
screenshot "admin_01_users_table.png"
# Check service requests
click Service-Requests
screenshot "admin_02_service_requests.png"
# Check agent-homeowner links
click Agent-Links
screenshot "admin_03_agent_homeowner_links.png"
# Check document uploads
click Document-Uploads
screenshot "admin_04_document_uploads.png"
# Export report
export-report "daily_findings.json"
```

**Daily report generated automatically:**
```
output/reports/YYYY-MM-DD_findings.md
```

---

## 13. Output Folder Structure

After all 6 workflows run, your output folder looks like this:

```
qa/openclaw/output/
├── screenshots/                          # 100+ PNGs (numbered sequentially)
│   ├── admin_01_dashboard.png
│   ├── admin_02_users_table.png
│   ├── agent_01_referral_code.png
│   ├── agent_02_qr_code.png
│   ├── homeowner_01_stripe_success.png
│   ├── homeowner_02_agent_email_entry.png
│   ├── homeowner_03_confirmation.png
│   ├── email_001_service_request_confirmation.png
│   ├── ...
│   ├── email_050_final_email.png
│   ├── docusign_001_homeowner_contract.png
│   ├── ...
│   ├── docusign_006_final_sign_off.png
│   ├── contractor_01_invite_panel.png
│   ├── ...
│   └── security_03_url_manipulation.png
│
├── videos/                               # MP4 screen recordings
│   └── contractor_invite_full.mp4
│
├── data/                                 # CSVs that open in Excel
│   ├── test_accounts.csv                 # email, password, role, creation_date, screenshot_path
│   ├── findings.csv                      # issue tracking (date, workflow, step, severity)
│   ├── email_inventory.csv               # all 50+ emails catalogued
│   └── admin_users.csv                   # extracted from admin dashboard
│
└── reports/                              # Daily Markdown summaries
    └── YYYY-MM-DD_findings.md
```

**Upload to Google Drive:**
Zip the entire `output/` folder and drag it into the shared Google Drive folder:
```bash
zip -r MrSurety_QA_$(date +%Y-%m-%d).zip qa/openclaw/output/
```

**Relationship to existing `qa/screenshots/` folders:**  
The existing Playwright test suite saves screenshots to per-workflow folders under `qa/screenshots/`:
- `qa/screenshots/agent-referral-workflow/`
- `qa/screenshots/homeowner-service-request/`
- `qa/screenshots/contractor-bidding/`
- `qa/screenshots/admin-dashboard/`
- `qa/screenshots/email-docusign/` (email & DocuSign triggers)
- `qa/screenshots/agent-upload-invite/`
- `qa/screenshots/edge-cases/`

The OpenClaw workflow saves its artifacts to `qa/openclaw/output/screenshots/` (flat, sequentially
numbered). Both sets of screenshots belong in the shared Google Drive folder.

---

## 14. Daily Automated Run (Cron)

Run all 6 workflows automatically every day at 6 AM and receive a summary via Telegram/Slack:

```bash
# Make the script executable
chmod +x qa/openclaw/workflows/run_daily.sh

# Add to crontab (runs daily at 6:00 AM)
crontab -e
# Add this line:
0 6 * * * /path/to/project/qa/openclaw/workflows/run_daily.sh >> /var/log/mrsurety-qa.log 2>&1
```

The script automatically:
1. Rotates the output folder (`output_YYYY-MM-DD/`)
2. Runs all 6 workflows in sequence
3. Compiles the daily `findings.md`
4. Sends you a Telegram/Slack summary with pass/fail counts
5. Uploads the zip to Google Drive (if `GDRIVE_FOLDER_ID` is set in `.env`)

---

## 15. Troubleshooting

| Problem | Solution |
|---------|----------|
| `docker compose up` fails | Ensure Docker Desktop is running; check `docker ps` |
| Browser skill not found | Re-run `playwright install chromium` |
| Login fails for admin | Verify `ADMIN_PASSWORD=MrSurety2026!` in `.env` |
| Screenshot is blank/white | Set `headless=False` in Browser Skill settings |
| Stripe payment rejected | Use exact card `4242 4242 4242 4242` – test mode only |
| Referral code invalid | Each code is single-use per request; generate a new one |
| Email not received | Wait 2–3 min; check spam folder; verify Outlook account is active |
| DocuSign link expired | DocuSign links expire in 24h in test mode; re-trigger the email |
| Upload link expired | 7-day expiry is by design; generate a new invite from the contractor |
| Video not saving | Check `VIDEO_SAVE_PATH` in `.env` points to a writable directory |
| `extract-table` returns empty | Page may be loading async; add `wait-for selector=".table-row"` |
| Rate limited by Outlook | Use separate test accounts per workflow; see `.env.example` |
| OpenClaw web UI unreachable | Run `docker compose restart openclaw-agent` |

---

> **Questions?** Text or call Christopher. After your call, document the discussion in a file and
> upload it to the Google Drive QA folder. Reference: CK's original testing instructions state
> *"If you run into any issues, please text or call me to discuss. Afterward, document our
> discussion in a file and upload it to the folder."*
