# 🚀 RUN TODAY – MrSurety QA (One Copy-Paste Block)

> **Christopher's testing doc:**  
> https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit

---

## ⚡ PASTE THIS ENTIRE BLOCK INTO YOUR TERMINAL (one shot, from anywhere)

```bash
cd ~/mrsurety-qagent-workflow-test && \
git fetch origin copilot/openclaw-integration-steps --quiet && \
git checkout copilot/openclaw-integration-steps --quiet && \
git pull --ff-only --quiet && \
python3 -m venv qa/openclaw/.venv && \
qa/openclaw/.venv/bin/pip install --quiet --upgrade playwright python-dotenv && \
qa/openclaw/.venv/bin/playwright install chromium --quiet && \
cp -n qa/openclaw/.env.example qa/openclaw/.env && \
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --check-connection && \
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow create-accounts && \
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow all && \
cd qa/openclaw && \
zip -r "MrSurety_QA_$(date +%Y-%m-%d).zip" output/ && \
echo "✅ Done!  Zip is at: $(pwd)/MrSurety_QA_$(date +%Y-%m-%d).zip"
```

> **If you haven't cloned the repo yet**, run this first, then the block above:
> ```bash
> git clone --branch copilot/openclaw-integration-steps \
>   https://github.com/sophallanh/mrsurety-qagent-workflow-test \
>   ~/mrsurety-qagent-workflow-test
> ```

---

## What That Block Does (step by step)

| Step | What it does | Time |
|------|-------------|------|
| `git pull` | Gets the latest fixes (Outlook login fix, account pre-seed) | 5 sec |
| `pip install` | Installs playwright + python-dotenv in the venv | 30 sec |
| `playwright install chromium` | Downloads the test browser | 1 min |
| `cp .env.example .env` | Copies the pre-filled credentials file (skip if exists) | 1 sec |
| `--check-connection` | Verifies the live app is up | 30 sec |
| `--workflow create-accounts` | Signs up all 8 QA test accounts on the live app | ~5 min |
| `--workflow all` | Runs all 9 workflows + captures 50+ screenshots + 1 video | ~30–45 min |
| `zip output/` | Packages everything into a single zip for Google Drive | 1 min |

---

## After It Finishes

1. **Upload the zip** to the Google Drive folder Christopher shared  
   → `MrSurety_QA_YYYY-MM-DD.zip` is in `~/mrsurety-qagent-workflow-test/qa/openclaw/`

2. **Email Christopher** at `c.palmer@mrsurety.com`:

```
Subject: MrSurety QA – Full Run Findings

Hi Christopher,

Full QA run complete against the live app.

App tested: https://frontend-tan-five-46.vercel.app
Repo: https://github.com/sophallanh/mrsurety-qagent-workflow-test

Zip includes:
• 50+ screenshots covering all 9 workflows
• test_accounts.csv — credentials so you can log in as any test user
• findings.csv — all issues found with severity
• findings.md — executive summary

[paste Google Drive link or attach zip]

– Sophal
```

---

## If the email-docusign workflow still fails (⚠️ Outlook inbox error)

The fix is already in the code (the Outlook URL was changed from outlook.com to
outlook.live.com/mail/0/). Make sure you ran `git pull` at the top of the block above.

To re-run just the email screenshot step after pulling:
```bash
cd ~/mrsurety-qagent-workflow-test
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow email-docusign
```

---

## Google Drive auto-upload (optional — skip if dragging the zip manually)

To have the script upload the zip automatically, edit `qa/openclaw/.env` and set:
```
GDRIVE_FOLDER_ID=<the folder ID from the Drive URL Christopher shared>
GDRIVE_SERVICE_ACCOUNT_JSON=<full path to your service-account JSON key file>
```

Then run:
```bash
qa/openclaw/.venv/bin/pip install --quiet google-api-python-client google-auth
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --upload
```

> **Do NOT set these as shell variables on the command line.**  
> Put them in the `.env` file, one per line, no quotes needed.

---

## Useful individual commands (run from `~/mrsurety-qagent-workflow-test`)

```bash
# Just verify the app is up
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --check-connection

# Re-run a single workflow (e.g. after admin approves contractors)
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow contractor-bidding

# Re-run just email screenshots
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow email-docusign

# Run everything
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow all

# Package output
cd qa/openclaw && zip -r "MrSurety_QA_$(date +%Y-%m-%d).zip" output/
```

---

## Test credentials (already in .env.example — no manual entry needed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mrsurety.com | MrSurety2026! |
| Agent 1 | agent.test1@outlook.com | QAtest@2026! |
| Agent 2 | agent.test2@outlook.com | QAtest@2026! |
| Homeowner A | homeowner.test2@outlook.com | QAtest@2026! |
| Homeowner B | homeowner.test1@outlook.com | QAtest@2026! |
| Homeowner C | homeowner.test3@outlook.com | QAtest@2026! |
| Contractor 1 | contractor.test1@outlook.com | QAtest@2026! |
| Contractor 2 | contractor.test2@outlook.com | QAtest@2026! |
| Technician | tech.test1@outlook.com | QAtest@2026! |

**Stripe test card:** `4242 4242 4242 4242` · exp `12/29` · CVV `123`  
**CSLB test number:** `999888`
