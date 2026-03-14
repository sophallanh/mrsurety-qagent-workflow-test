# mrsurety-qagent-workflow-test

Automated QA for Agent Referral Workflows and all platform workflows for MrSurety.

**Live App:** https://frontend-tan-five-46.vercel.app

---

## Quick Start

### Option A – Node.js / Playwright (TypeScript tests)

Run from the **repo root** (no need to `cd tests`):

```bash
# 1. Clone and enter the repo
git clone https://github.com/sophallanh/mrsurety-qagent-workflow-test.git
cd mrsurety-qagent-workflow-test

# 2. Copy credentials file (edit if needed – defaults work for the test environment)
cp .env.example .env

# 3. Install dependencies and Chromium
npm install
npx playwright install chromium

# 4. Run all tests
npm test

# 5. Run a single spec (just the filename – no path prefix needed)
npx playwright test homeowner-workflow-guide-doc5.spec.ts
npx playwright test admin-dashboard.spec.ts
npx playwright test agent-referral-workflow.spec.ts

# 6. Run with a visible browser
npm run test:headed

# 7. Open the HTML report
npm run test:report
```

> **Why `.env` instead of `export`?**
> The admin password contains `!`. In zsh (macOS default), `!` inside
> double quotes triggers history expansion and causes a `dquote>` hang.
> Using a `.env` file avoids all shell-quoting issues. If you prefer
> exporting manually, use **single quotes**: `export ADMIN_PASSWORD='MrSurety2026!'`

> **Note:** All browser tests require network access to `frontend-tan-five-46.vercel.app`.

---

### Option B – Python / Playwright (agent referral smoke test)

```bash
# 1. Clone and enter the repo
git clone https://github.com/sophallanh/mrsurety-qagent-workflow-test.git
cd mrsurety-qagent-workflow-test

# 2. Create a virtual environment (required on macOS with Homebrew Python)
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt
python -m playwright install chromium

# 4. Set admin password – use SINGLE quotes so zsh does not expand '!'
export ADMIN_PASSWORD='MrSurety2026!'

# 5. Run the agent referral smoke test
python test_mrsurety_agent_referral.py

# Run with a visible browser (useful for debugging)
HEADLESS=false python test_mrsurety_agent_referral.py
```

> **Tip:** If you see `dquote>` in your terminal, press **Ctrl+C** to cancel,
> then re-run the export with single quotes as shown above.

Screenshots are saved to `screenshots/` (git-ignored).

---

## Workflows Covered

| Spec file | What it tests |
|---|---|
| `agent-referral-workflow.spec.ts` | Agent referral link generation & homeowner sign-up |
| `homeowner-service-request.spec.ts` | Homeowner service request form (all sections) |
| `contractor-bidding.spec.ts` | Contractor estimate upload & bid submission |
| `admin-dashboard.spec.ts` | Admin approvals, job tracking, payment review |
| `technician-workflow.spec.ts` | Technician work order receipt & sign-off |
| `email-docusign-triggers.spec.ts` | Email & DocuSign trigger verification |
| `agent-upload-invite.spec.ts` | Contractor → insurance agent COI/endorsement upload |
| `homeowner-workflow-guide-doc5.spec.ts` | Doc #5 homeowner guide – all 16 gap tests |
| `test_mrsurety_agent_referral.py` | Python smoke test – admin login + agent referral UI |

---

## More Details

- Full QA package, folder structure, and screenshot guides: [qa/README.md](qa/README.md)
- Test account credentials reference: [qa/test-user-credentials/](qa/test-user-credentials/)
- Implementation status: [qa/QA_STATUS.md](qa/QA_STATUS.md)

