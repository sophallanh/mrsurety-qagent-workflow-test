# 🚀 RUN TODAY – MrSurety QA (One Copy-Paste Block)

> **Christopher's testing doc:**  
> https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit

---

## ❓ Already ran it before? Just do this:

```bash
cd ~/mrsurety-qagent-workflow-test && git pull
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow create-accounts
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow all
cd qa/openclaw && zip -r "MrSurety_QA_$(date +%Y-%m-%d).zip" output/
```

> **No need to reinstall** — `git pull` picks up all the latest fixes.  
> Re-run `create-accounts` after any `git pull` that adds new test accounts — new accounts
> (3rd agent, 3rd homeowner, 3rd contractor) were added and must be registered on the live
> app before the full workflow suite runs against them.  Run those 4 lines and you're done.

---

## 📊 How Many Workflows Are There?

**9 main workflows** (run via `--workflow all`) + 1 setup step + 1 bonus:

| # | Flag | What it does |
|---|------|-------------|
| Setup | `--workflow create-accounts` | Registers all 12 QA test accounts on the live app — **run this first** |
| 1 | `--workflow admin-login` | Admin logs in, screenshots dashboard, exports user CSV |
| 2 | `--workflow agent-signup` | Creates agent account, generates referral code & QR |
| 3 | `--workflow homeowner-service-request` | Both referral methods (A & B) + Stripe test payment |
| 4 | `--workflow contractor-bidding` | Contractor submits bid & uploads estimate |
| 5 | `--workflow homeowner-deposit` | Homeowner selects estimate & pays deposit |
| 6 | `--workflow work-order-docusign` | Work order generated + DocuSign sent/signed |
| 7 | `--workflow admin-verification` | Admin approval flow + all status checks |
| 8 | `--workflow technician-workflow` | Technician receives & completes work order |
| 9 | `--workflow agent-upload-invite` | Contractor upload invite + security controls |
| Bonus | `--workflow email-docusign` | Screenshots every email & DocuSign doc (50+) |
| — | `--workflow all` | Runs all 9 workflows in sequence (1–9 above) |

> **Short answer: 9 workflows.** `--workflow all` runs all 9 in order.  
> `create-accounts` is a one-time setup step (re-run when new accounts are added).  
> `email-docusign` is a bonus screenshot-only pass — not included in `--workflow all`.

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
| `--workflow create-accounts` | Registers all 12 QA test accounts on the live app (3 agents, 3 homeowners, 3 contractors, 1 technician + pre-existing admin & insurance agent) | ~5 min |
| `--workflow all` | Runs all 9 workflows + captures 50+ screenshots + videos | ~30–45 min |
| `zip output/` | Packages everything into a single zip for Google Drive | 1 min |

---

## 🎬 Video files (MP4 / WebM)

Videos are recorded by Playwright (WebM format).  The script automatically
converts them to QuickTime-compatible H.264 MP4 **if `ffmpeg` is installed**.

**Install ffmpeg on macOS (one time):**
```bash
brew install ffmpeg
```

> If ffmpeg is not installed, videos are saved as `.webm` instead, which can
> be opened in **Chrome**, **Firefox**, or **VLC** — but not QuickTime Player.
> Run `brew install ffmpeg` and re-run the workflow to get playable MP4 files.

### 🔧 Fix existing videos that won't open in QuickTime

If you already ran the QA workflows and the `.mp4` files say
**"The file isn't compatible with QuickTime Player"**, those files are
WebM recordings that were renamed without re-encoding.  Fix them in one step:

```bash
# 1. Install ffmpeg (one time, macOS)
brew install ffmpeg

# 2. Re-encode all videos to real H.264 MP4
qa/openclaw/.venv/bin/python qa/openclaw/workflows/mrsurety_qa.py --fix-videos
```

The command will scan `output/videos/`, skip files already in H.264, and
re-encode everything else.  Original broken files are removed on success.

You can also point it at a custom folder:
```bash
qa/openclaw/.venv/bin/python qa/openclaw/workflows/mrsurety_qa.py \
  --fix-videos --video-dir /path/to/videos
```

> ✅ **After `--fix-videos` finishes — you do NOT need to re-run the workflows.**  
> The videos are already fixed in `output/videos/`.  Just zip and upload:
> ```bash
> cd ~/mrsurety-qagent-workflow-test/qa/openclaw
> zip -r "MrSurety_QA_$(date +%Y-%m-%d).zip" output/
> ```
> Then upload the zip to Google Drive and send Christopher the link.

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
| Agent 3 | agent.test3@outlook.com | QAtest@2026! |
| Homeowner A | homeowner.test2@outlook.com | QAtest@2026! |
| Homeowner B | homeowner.test1@outlook.com | QAtest@2026! |
| Homeowner C | homeowner.test3@outlook.com | QAtest@2026! |
| Contractor 1 | contractor.test1@outlook.com | QAtest@2026! |
| Contractor 2 | contractor.test2@outlook.com | QAtest@2026! |
| Contractor 3 | contractor.test3@outlook.com | QAtest@2026! |
| Technician | tech.test1@outlook.com | QAtest@2026! |

**Stripe test card:** `4242 4242 4242 4242` · exp `12/34` · CVV `123` · ZIP `42424`  
**CSLB test number:** `999888`

