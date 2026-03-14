# 🚀 RUN TODAY – MrSurety QA with OpenClaw
**Everything you need to do right now, on your Mac**

> **📄 Testing Instructions (Christopher's Doc — read this first):**  
> https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing

---

## ⚡ COPY AND PASTE THIS ENTIRE BLOCK INTO YOUR TERMINAL

> You are at `~` (your Mac home directory). Paste everything below in one go.

```bash
# ── 0. Clone the repo (the QA branch — do this once) ─────────────────────────
git clone --branch copilot/openclaw-integration-steps \
  https://github.com/sophallanh/mrsurety-qagent-workflow-test \
  ~/mrsurety-qagent-workflow-test 2>/dev/null || true

# ── Go into the repo ─────────────────────────────────────────────────────────
cd ~/mrsurety-qagent-workflow-test

# ── Make sure you are on the right branch ────────────────────────────────────
git fetch origin copilot/openclaw-integration-steps --quiet
git checkout copilot/openclaw-integration-steps --quiet
git pull --ff-only --quiet

# ── One-time setup ────────────────────────────────────────────────────────────
python3 -m venv qa/openclaw/.venv
qa/openclaw/.venv/bin/pip install --quiet playwright python-dotenv
qa/openclaw/.venv/bin/playwright install chromium
cp qa/openclaw/.env.example qa/openclaw/.env

# ── Step 1: Verify the live app is reachable ──────────────────────────────────
qa/openclaw/.venv/bin/python qa/openclaw/workflows/mrsurety_qa.py --check-connection

# ── Step 2: Create all 8 QA test accounts on the live app ────────────────────
qa/openclaw/.venv/bin/python qa/openclaw/workflows/mrsurety_qa.py --workflow create-accounts

# ── Step 3: Run all 9 workflows (captures 50+ screenshots + videos) ───────────
qa/openclaw/.venv/bin/python qa/openclaw/workflows/mrsurety_qa.py --workflow all

# ── Step 4: Run the full npm test suite (1,418 tests) ─────────────────────────
cd tests && npm install && npm test && cd ..

# ── Step 5: Package everything for Google Drive ───────────────────────────────
cd qa/openclaw && ./workflows/run_daily.sh && cd ../..
```

> **After Step 5:** A zip file named `MrSurety_QA_<today>.zip` appears in  
> `~/mrsurety-qagent-workflow-test/qa/openclaw/`.  
> Upload that zip to Google Drive and email **c.palmer@mrsurety.com**.

> **Directory check:** All commands above must be run from `~/mrsurety-qagent-workflow-test`  
> (the repo root). The virtual environment lives at `qa/openclaw/.venv/` inside that folder.  
> If you see "no such file or directory" for the venv, run `python3 -m venv qa/openclaw/.venv`  
> from the repo root first.

---

## What's Left (4 Things, All Automated)

| # | Task | OpenClaw Command | Time |
|---|------|-----------------|------|
| 1 | Create QA test accounts on the live app | `--workflow create-accounts` | ~5 min |
| 2 | Run all 9 workflows (captures 50+ screenshots) | `--workflow all` | ~30–45 min |
| 3 | Package output for Google Drive | `./run_daily.sh` | ~2 min |
| 4 | Upload to Google Drive & email Christopher | Manual (drag-and-drop zip) | ~5 min |

**Total: ~45 minutes. OpenClaw handles steps 1–3 completely.**

---

## One-Time Setup (if not already done)

```bash
# Create a virtual environment (avoids macOS PEP 668 "externally-managed" error)
python3 -m venv qa/openclaw/.venv

# Install Python dependencies directly into the venv (no activation needed)
qa/openclaw/.venv/bin/pip install playwright python-dotenv

# Install Chromium browser
qa/openclaw/.venv/bin/playwright install chromium

# Configure (copy the pre-filled template — already points to live app)
cp qa/openclaw/.env.example qa/openclaw/.env
```

That's it. The `.env` file already has:
- `MRSURETY_BASE_URL=https://frontend-tan-five-46.vercel.app`
- `ADMIN_EMAIL=admin@mrsurety.com` / `ADMIN_PASSWORD=MrSurety2026!`
- All 10 test account emails and passwords pre-filled

---

## Step 1 — Verify Connection (30 seconds)

```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --check-connection
```

Expected output:
```
✅ Reached https://frontend-tan-five-46.vercel.app – HTTP 200
✅ Login page found (/login)
✅ Admin login verified (admin@mrsurety.com)
```

If this fails, check your internet connection and that the Vercel app is up.

---

## Step 2 — Create All Test Accounts (~5 min)

> ⚠️ **First**: Create real Outlook.com inboxes for each of the 10 test email addresses
> listed in `qa/test-user-credentials/TEST_USER_CREDENTIALS.md`.
> You only need to do this once — the same accounts are reused every run.

```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow create-accounts
```

This creates:
- `agent.test1@outlook.com` — Alex Johnson (Agent 1)
- `agent.test2@outlook.com` — Maria Garcia (Agent 2)
- `homeowner.test2@outlook.com` — Jamie Lee (Homeowner A, referral method)
- `homeowner.test1@outlook.com` — Sam Williams (Homeowner B, email method)
- `homeowner.test3@outlook.com` — Chris Brown (Homeowner C, no agent)
- `contractor.test1@outlook.com` — Bob Miller (Contractor 1)
- `contractor.test2@outlook.com` — Linda Chen (Contractor 2)
- `tech.test1@outlook.com` — Dave Torres (Technician)

After this runs, **log in as admin** (`admin@mrsurety.com` / `MrSurety2026!`) and approve
any pending contractor / technician accounts before running Step 3.

---

## Step 3 — Run All 9 Workflows (~30–45 min)

```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow all
```

The 9 workflows run in order:

| Workflow | What OpenClaw Does |
|----------|--------------------|
| Workflow 1: Admin Login | Screenshots dashboard, exports user list to CSV |
| Workflow 2: Agent Signup | Creates referral link + downloads QR code |
| Workflow 3: Homeowner Service Request | Method A (referral link) + Method B (agent email) + Stripe 4242... |
| Workflow 4: Contractor Bidding | Contractor submits bid + uploads estimate |
| Workflow 5: Homeowner Deposit | Homeowner selects estimate + pays deposit (Stripe test) |
| Workflow 6: Work Order & DocuSign | Admin generates work order + DocuSign triggered |
| Workflow 7: Admin Verification | Admin approval flow + all status checks |
| Workflow 8: Technician | Technician views and starts assigned work order |
| Workflow 9: Agent Upload Invite | Full invite flow + security controls + CSLB restriction |
| Bonus: Email/DocuSign sweep | Screenshots every email in all 4 Outlook inboxes (50+) |

**Watch the browser** — OpenClaw opens a visible Chromium window so you can see what it's doing.

When complete, you'll see:
```
✅ QA Suite complete — 100+ screenshots, 1 video
📁 Output  → qa/openclaw/output/
📋 Report  → qa/openclaw/output/reports/2026-03-14_findings.md
📄 Accounts → qa/openclaw/output/data/test_accounts.csv
```

---

## Step 4 — Run npm test (catch spec-level failures)

```bash
cd tests
npm test
```

This runs all 1,418 spec validation tests. They verify that the guides, workflow scripts,
and configuration are internally consistent. Screenshot failures land in `qa/test-results/`.

---

## Step 5 — Package for Google Drive (~2 min)

```bash
cd qa/openclaw
./workflows/run_daily.sh
```

This creates: `qa/openclaw/MrSurety_QA_2026-03-14.zip`

Contents of the zip:
```
output/
├── screenshots/     ← 100+ PNG files (numbered sequentially)
├── videos/          ← MP4 screen recording of contractor invite flow
├── data/
│   ├── test_accounts.csv    ← share with Christopher so he can log in
│   ├── findings.csv         ← all issues found, with severity
│   └── email_inventory.csv  ← index of all 50+ email screenshots
└── reports/
    └── 2026-03-14_findings.md  ← executive summary
```

---

## Step 6 — Upload to Google Drive & Email Christopher

1. Open the shared Google Drive folder Christopher provided
2. Drag `MrSurety_QA_2026-03-14.zip` into it
3. Email Christopher at **c.palmer@mrsurety.com**:

```
Subject: MrSurety QA – Day 1 Findings

Hi Christopher,

I've completed the first full QA run against the live app.

Live app tested: https://frontend-tan-five-46.vercel.app
GitHub repo: https://github.com/sophallanh/mrsurety-qagent-workflow-test

What's in the zip:
- 100+ screenshots covering all 9 workflows
- test_accounts.csv — log in to verify any specific issue
- findings.csv — all issues found with severity levels
- 2026-03-14_findings.md — executive summary

[attach or link the Google Drive folder]

Let me know when you want to review. I'm available for a call.

– Sophal
```

---

## If Something Fails

**A workflow step fails** → OpenClaw logs it to `findings.csv` and continues. Review the
report at the end; don't re-run unless a critical workflow completely crashed.

**Admin approval needed** → Log in as admin (`admin@mrsurety.com` / `MrSurety2026!`),
approve pending contractors/technicians, then re-run just that workflow:
```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow contractor-bidding
```

**Email not arriving** → Wait 2–3 min, check Outlook spam. The email screenshot workflow
(Workflow 4/bonus) can be re-run alone:
```bash
python3 qa/openclaw/workflows/mrsurety_qa.py --workflow email-docusign
```

**Stripe rejected** → Use exact test card: `4242 4242 4242 4242` / exp `12/29` / CVV `123`

**Referral code invalid** → Each referral code is single-use per request form.
Re-run `--workflow agent-signup` to generate a fresh one before `--workflow homeowner-service-request`.

---

## All Commands in One Block (same as the top — copy-paste from `~`)

```bash
git clone --branch copilot/openclaw-integration-steps \
  https://github.com/sophallanh/mrsurety-qagent-workflow-test \
  ~/mrsurety-qagent-workflow-test 2>/dev/null || true
cd ~/mrsurety-qagent-workflow-test
git fetch origin copilot/openclaw-integration-steps --quiet
git checkout copilot/openclaw-integration-steps --quiet
git pull --ff-only --quiet
python3 -m venv qa/openclaw/.venv
qa/openclaw/.venv/bin/pip install --quiet playwright python-dotenv
qa/openclaw/.venv/bin/playwright install chromium
cp qa/openclaw/.env.example qa/openclaw/.env
qa/openclaw/.venv/bin/python qa/openclaw/workflows/mrsurety_qa.py --check-connection
qa/openclaw/.venv/bin/python qa/openclaw/workflows/mrsurety_qa.py --workflow create-accounts
qa/openclaw/.venv/bin/python qa/openclaw/workflows/mrsurety_qa.py --workflow all
cd tests && npm install && npm test && cd ..
cd qa/openclaw && ./workflows/run_daily.sh && cd ../..
```
