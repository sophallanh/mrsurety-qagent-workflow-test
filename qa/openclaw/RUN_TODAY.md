# 🚀 RUN TODAY – MrSurety QA (One Copy-Paste Block)

> **Christopher's testing doc:**  
> https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit

---

## ❓ Already ran it before? Just do this:

```bash
cd ~/mrsurety-qagent-workflow-test && git pull
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow all
cd qa/openclaw && zip -r "MrSurety_QA_$(date +%Y-%m-%d).zip" output/
```

> **No need to reinstall** — `git pull` picks up all the latest fixes (increased timeouts,
> Outlook passkey bypass, broader signup form selectors, resilient nav for contractor bidding).
> Run those 3 lines and you're done.

---

## ⚡ First time? PASTE THIS ENTIRE BLOCK INTO YOUR TERMINAL (one shot, from anywhere)

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
| `git pull` | Gets the latest fixes (Outlook login URL, MFA handling, longer timeouts) | 5 sec |
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

## If the email-docusign workflow still shows ⚠️ inbox errors

**Step 1 – Make sure you're on the latest code:**
```bash
cd ~/mrsurety-qagent-workflow-test && git pull
```

**Step 2 – Re-run just the email step:**
```bash
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow email-docusign
```

**Step 3 – If you still see "Timeout" or "did not show an email field"** – Microsoft is blocking
automated browsers on the test accounts.  You need to disable passkeys AND two-step verification.
Sign in to each account at https://account.microsoft.com/security, then:
- Remove any passkeys / security keys under "Security info"
- Disable "Two-step verification" (choose "Turn off")

The accounts are:
- `agent.test1@outlook.com` / `QAtest@2026!`
- `homeowner.test1@outlook.com`, `homeowner.test2@outlook.com` / `QAtest@2026!`
- `contractor.test1@outlook.com` / `QAtest@2026!`

**Step 4 – If Microsoft still blocks** – take manual screenshots of each inbox and put them in
`qa/openclaw/output/screenshots/` named `email_001_agent_inbox.png`, etc.  The findings report
will still be generated from the other 8 workflows.

---

## If Workflow 2 shows ❌ "Could not locate required form field"

The signup page uses a form component the script can't detect automatically.

**Step 1 – Pull the latest fixes (this PR adds broader selectors):**
```bash
cd ~/mrsurety-qagent-workflow-test && git pull
```

**Step 2 – Re-run just the signup workflow:**
```bash
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow agent-signup
```

**Step 3 – If still failing** – create the agent account manually in the app:
1. Go to https://frontend-tan-five-46.vercel.app/signup  
2. Sign up with email `agent.test1@outlook.com` / password `QAtest@2026!`
3. Then run `--workflow all` — the script will log in with the existing account instead

---

## If Workflow 3 shows ❌ "service-request-form not visible"

Same situation — the form uses custom components.  After the latest `git pull`, the script
uses broader selectors (`form`, `main`, etc.) so it should find any visible form.

If it still fails, confirm the service request page is accessible by visiting
https://frontend-tan-five-46.vercel.app/service-request in your browser.

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

