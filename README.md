# mrsurety-qagent-workflow-test

Automated QA for Agent Referral Workflows and all platform workflows for MrSurety.

**Live App:** https://frontend-tan-five-46.vercel.app

---

## Quick Start

### Option A – Node.js / Playwright (TypeScript tests)

Run each command **one at a time** from the **repo root**:

```bash
git clone https://github.com/sophallanh/mrsurety-qagent-workflow-test.git
cd mrsurety-qagent-workflow-test
npm install
npx playwright install chromium
npm test
```

> **`.env` is created automatically when you run `npm test`.** The `pretest` npm hook
> copies `.env.example → .env` for you if the file doesn't already exist, so `npm test`
> is all you need. If you prefer to set it up in advance (or if you're running tests via
> `npx playwright test` directly instead of `npm test`), copy it manually:
>
> | Where you are | Command to run |
> |---|---|
> | Repo root (`mrsurety-qagent-workflow-test/`) | `cp tests/.env.example tests/.env` |
> | Inside `tests/` (`mrsurety-qagent-workflow-test/tests/`) | `cp .env.example .env` |
>
> ⚠️ **Common mistake:** If your prompt ends with `tests %` you are already *inside* `tests/`.
> Use `cp .env.example .env` — **not** `cp tests/.env.example ...`.
> Running `cp tests/.env.example` with no destination prints a `usage:` error; just add `.env`:
> ```bash
> cp .env.example .env
> ```

> **`npm error: package.json not found`?** The root-level `package.json` may not be in
> the branch you cloned. Run from the `tests/` subdirectory instead:
> ```bash
> cd tests
> npm install
> npx playwright install chromium
> npm test          # pretest hook auto-creates .env from .env.example
> ```

If you already have a clone and want to update it:

```bash
cd mrsurety-qagent-workflow-test
git pull
npm install
```

Run a single spec file:

```bash
npx playwright test homeowner-workflow-guide-doc5.spec.ts
npx playwright test admin-dashboard.spec.ts
npx playwright test agent-referral-workflow.spec.ts
```

Run with a visible browser:

```bash
npm run test:headed
```

Open the HTML report:

```bash
npm run test:report
```

> **Important – run `npm install` before `npx playwright test`.**
> Without it, `npx playwright` downloads a temporary copy that has no project
> config, so it cannot find any test files and prints "No tests found".

> **Why `.env` instead of `export ADMIN_PASSWORD="..."`?**
> The password contains `!`. In zsh (macOS default) `!` inside double quotes
> triggers history expansion and causes a `dquote>` hang.
> A `.env` file avoids all shell-quoting issues entirely.
> If you must export, use single quotes: `export ADMIN_PASSWORD='MrSurety2026!'`

---

### Option B – Python / Playwright (agent referral smoke test)

Run each command **one at a time**:

```bash
git clone https://github.com/sophallanh/mrsurety-qagent-workflow-test.git
cd mrsurety-qagent-workflow-test
python3 -m venv venv
```

Activate the virtual environment:

```bash
source venv/bin/activate
```

Install dependencies and run:

```bash
pip install -r requirements.txt
python -m playwright install chromium
export ADMIN_PASSWORD='MrSurety2026!'
python test_mrsurety_agent_referral.py
```

> **Windows users:** replace `source venv/bin/activate` with `venv\Scripts\activate`

> **Tip:** If you see `dquote>` press **Ctrl+C**, then re-run the export line
> with single quotes as shown above.

Screenshots are saved to `screenshots/` (git-ignored).

---

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `No tests found` | `npx playwright test` run before `npm install` | Run `npm install` first, then re-run |
| `npm error: package.json not found` | Root-level `package.json` missing from the branch you cloned | Run from `tests/` instead: `cd tests && cp .env.example .env && npm install && npx playwright install chromium && npm test` |
| `net::ERR_NAME_NOT_RESOLVED` on `staging.mrsurety.com` | Stale `MRSURETY_BASE_URL` exported in your shell overrides the config | Run `cp tests/.env.example tests/.env` (or `cp .env.example .env` from inside `tests/`) — the `.env` file overrides the stale shell variable |
| `usage: cp [-R [-H \| -L \| -P]] ...` | Ran `cp tests/.env.example` with no destination argument while already inside `tests/` | You're already in `tests/` — run `cp .env.example .env` (no `tests/` prefix needed) |
| `cp: tests/.env.example: No such file or directory` | Ran `cp tests/.env.example tests/.env` while already inside `tests/` | You're already in `tests/` — run `cp .env.example .env` instead |
| `fatal: not a git repository` | Folder was downloaded as a ZIP or copied manually, not cloned with git | Delete the folder; run `git clone https://github.com/sophallanh/mrsurety-qagent-workflow-test.git` |
| `cp: .env.example: No such file or directory` | `.env.example` not present in this clone – it is optional | Skip the `cp` step; tests run fine with built-in defaults. To customize credentials later, create `.env` manually from the template in [`.env.example`](.env.example) |
| `requirements.txt: No such file or directory` | Wrong working directory | `cd mrsurety-qagent-workflow-test` first |
| `cp: defaults is not a directory` | Pasted a command that had an inline `# comment` attached | Copy and run commands **one line at a time**, not as a pasted block |
| `dquote>` hang after `export ADMIN_PASSWORD="..."` | `!` in double quotes triggers zsh history expansion | Press **Ctrl+C**, then use single quotes: `export ADMIN_PASSWORD='MrSurety2026!'` |
| `export: not valid in this context` | Pasted a line that included a `# comment` with special Unicode characters | Run the `export` line alone, without any trailing comment text |
| `zsh: command not found: #` | A `#` comment line was pasted into the terminal as a command | Skip comment-only lines; only paste the actual command |

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

