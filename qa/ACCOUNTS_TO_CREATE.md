# 📋 ACCOUNTS TO CREATE — Microsoft Outlook Setup Guide

**For: Christopher / Sophal**  
**Updated:** 2026-03-15  
**Purpose:** Create these real Outlook.com inboxes BEFORE running any QA automation

---

## 🔗 Quick Links — Bookmark These

| What | Link |
|------|------|
| **This file on GitHub** | https://github.com/sophallanh/mrsurety-qagent-workflow-test/blob/main/qa/ACCOUNTS_TO_CREATE.md |
| **Full credentials table (GitHub)** | https://github.com/sophallanh/mrsurety-qagent-workflow-test/blob/main/qa/test-user-credentials/TEST_USER_CREDENTIALS.md |
| **CSV of all accounts (GitHub)** | https://github.com/sophallanh/mrsurety-qagent-workflow-test/blob/main/qa/test-user-credentials/test_users.csv |
| **👉 Create Outlook account (signup page)** | **https://signup.live.com** |
| **Outlook inbox (to verify)** | https://outlook.live.com/mail |
| **MrSurety live app (signup after)** | https://frontend-tan-five-46.vercel.app/signup |

---

> ⚠️ The QA automation sends real emails and logs in to real Outlook inboxes.
> Every address below must be a working Microsoft Outlook account you control.
> Once created, the automation (`--workflow create-accounts`) registers each
> address on the MrSurety live app automatically.

---

## Why You Need These

1. **The automation signs up each email** on the live app and logs in
2. **Real emails are sent** during the workflow (DocuSign invites, service request
   notifications, bid responses, work orders, etc.)
3. **The `email-docusign` bonus workflow** opens each Outlook inbox, takes a
   screenshot of every email and DocuSign document — that's the **50+ items**
   Christopher mentioned
4. Without real inboxes the automation stops because it can't log in

---

## How to Create Each Account (takes ~2 minutes each)

1. Open a browser in **private/incognito mode**
2. Go to **https://signup.live.com** ← click here
3. Enter the email address from the list below (e.g. `agent.test1@outlook.com`)
4. Set the password exactly as shown (copy-paste it: `QAtest@2026!`)
5. Complete any verification Microsoft asks for (SMS code is the fastest)
6. ✅ Check the box in the list below when done

> **Tip:** Do all 15 accounts in one sitting. Open a new incognito window for
> each one so Microsoft doesn't keep you logged in as the previous account.

---

## ✅ COMPLETE ACCOUNT LIST — Create All of These

> **One-click signup page:** https://signup.live.com  
> **Password for ALL accounts:** `QAtest@2026!`  
> **Check off each box as you create it ↓**

---

### AGENTS — 4 accounts to create

- [ ] **1.** Email: `agent.test1@outlook.com` · Name: Alex Johnson · Company: Surety Realty
- [ ] **2.** Email: `agent.test2@outlook.com` · Name: Maria Garcia · Company: HomeGuard Agency
- [ ] **3.** Email: `agent.test3@outlook.com` · Name: James Wilson · Company: Wilson Insurance Group
- [ ] **4.** Email: `agent.test4@outlook.com` · Name: Sophia Nguyen · Company: Pacific Realty Group ← **BACKUP**

---

### HOMEOWNERS — 4 accounts to create

- [ ] **5.** Email: `homeowner.test1@outlook.com` · Name: Sam Williams
- [ ] **6.** Email: `homeowner.test2@outlook.com` · Name: Jamie Lee
- [ ] **7.** Email: `homeowner.test3@outlook.com` · Name: Chris Brown
- [ ] **8.** Email: `homeowner.test4@outlook.com` · Name: Taylor Davis ← **BACKUP**

---

### CONTRACTORS — 4 accounts to create

- [ ] **9.**  Email: `contractor.test1@outlook.com` · Name: Bob Miller · Company: Miller Construction LLC
- [ ] **10.** Email: `contractor.test2@outlook.com` · Name: Linda Chen · Company: Chen Builders Inc
- [ ] **11.** Email: `contractor.test3@outlook.com` · Name: Tony Rivera · Company: Rivera Home Services
- [ ] **12.** Email: `contractor.test4@outlook.com` · Name: Karen Scott · Company: Scott Contracting Co ← **BACKUP**

---

### TECHNICIANS — 2 accounts to create

- [ ] **13.** Email: `tech.test1@outlook.com` · Name: Dave Torres · Company: Torres Services
- [ ] **14.** Email: `tech.test2@outlook.com` · Name: Mike Anderson · Company: Anderson Tech Services ← **BACKUP**

---

### INSURANCE AGENT EXTERNAL — 1 account to create

> This account only needs an inbox — it does **not** need a MrSurety platform login.
> It receives the secure upload link email via Workflow 9.

- [ ] **15.** Email: `ins.agent.test@outlook.com` · Name: Rachel Kim · Company: Kim Insurance Brokers

---

### ADMIN — ⛔ DO NOT CREATE (already exists)

- ✅ `admin@mrsurety.com` / `MrSurety2026!` — Christopher's real admin — already on the live app

---

### Quick Reference Table

| # | Email | Password | Full Name | Role |
|---|-------|----------|-----------|------|
| 1 | `agent.test1@outlook.com` | `QAtest@2026!` | Alex Johnson | Agent |
| 2 | `agent.test2@outlook.com` | `QAtest@2026!` | Maria Garcia | Agent |
| 3 | `agent.test3@outlook.com` | `QAtest@2026!` | James Wilson | Agent |
| 4 | `agent.test4@outlook.com` | `QAtest@2026!` | Sophia Nguyen | Agent BACKUP |
| 5 | `homeowner.test1@outlook.com` | `QAtest@2026!` | Sam Williams | Homeowner |
| 6 | `homeowner.test2@outlook.com` | `QAtest@2026!` | Jamie Lee | Homeowner |
| 7 | `homeowner.test3@outlook.com` | `QAtest@2026!` | Chris Brown | Homeowner |
| 8 | `homeowner.test4@outlook.com` | `QAtest@2026!` | Taylor Davis | Homeowner BACKUP |
| 9 | `contractor.test1@outlook.com` | `QAtest@2026!` | Bob Miller | Contractor |
| 10 | `contractor.test2@outlook.com` | `QAtest@2026!` | Linda Chen | Contractor |
| 11 | `contractor.test3@outlook.com` | `QAtest@2026!` | Tony Rivera | Contractor |
| 12 | `contractor.test4@outlook.com` | `QAtest@2026!` | Karen Scott | Contractor BACKUP |
| 13 | `tech.test1@outlook.com` | `QAtest@2026!` | Dave Torres | Technician |
| 14 | `tech.test2@outlook.com` | `QAtest@2026!` | Mike Anderson | Technician BACKUP |
| 15 | `ins.agent.test@outlook.com` | `QAtest@2026!` | Rachel Kim | Ins. Agent (external) |

---

## 📊 Summary

| Role | Count | Accounts |
|------|-------|---------|
| Agent | 4 (3 primary + 1 backup) | agent.test1–4 |
| Homeowner | 4 (3 primary + 1 backup) | homeowner.test1–4 |
| Contractor | 4 (3 primary + 1 backup) | contractor.test1–4 |
| Technician | 2 (1 primary + 1 backup) | tech.test1–2 |
| Insurance Agent | 1 (external, inbox only) | ins.agent.test |
| Admin | 1 (pre-existing) | admin@mrsurety.com |
| **TOTAL Outlook accounts to create** | **15** | |

---

## After Creating All Accounts — Run This

```bash
# Navigate to the repo
cd ~/mrsurety-qagent-workflow-test

# Get the latest code (includes backup account support)
git pull

# Register all 14 platform accounts on the live app (skips admin which already exists)
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow create-accounts

# Run all 9 workflows
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow all

# BONUS: Screenshot all 50+ emails and DocuSign docs
qa/openclaw/.venv/bin/python3 qa/openclaw/workflows/mrsurety_qa.py --workflow email-docusign

# Package everything
cd qa/openclaw && zip -r "MrSurety_QA_$(date +%Y-%m-%d).zip" output/
```

---

## ❓ FAQ

**Q: What if an account name is already taken on Outlook?**  
A: The email addresses are very specific (e.g., `agent.test1@outlook.com`). If
Microsoft says the address is taken, try `agenttest1qa@outlook.com` and update
the `.env` file with the new address (see `.env.example` for variable names).

**Q: What if the automation fails because an account "already exists" on the app?**  
A: The automation will try to sign up each email on the MrSurety live app.
If an account was previously registered and the signup fails, the automation
logs the error and continues. You can delete the old account from the admin
dashboard and re-run `--workflow create-accounts`, or use a backup account
(agent.test4, homeowner.test4, etc.).

**Q: Do I need to set up 2FA/MFA on these accounts?**  
A: Set them up WITHOUT two-step verification (or use SMS-based 2FA only).
The automation handles the Outlook login by detecting the SMS code page.
Authenticator app MFA will block the automation.

**Q: What is the `email-docusign` workflow?**  
A: This is the bonus workflow that opens each Outlook inbox and takes a
screenshot of every email and DocuSign document the app sends. Christopher
asked for this to **check the wording** ("verbiage") on each email.
It produces 50+ screenshots in `output/screenshots/emails/`.

**Q: Why 9 workflows?**  
A: Christopher's testing doc defines the complete MrSurety flow in 9 steps:

| # | Workflow | Who |
|---|---------|-----|
| 1 | Admin login + dashboard | Admin |
| 2 | Agent signup + referral code | Agent |
| 3 | Homeowner service request (2 methods) | Homeowner |
| 4 | Contractor bidding + estimate upload | Contractor |
| 5 | Homeowner deposit payment | Homeowner |
| 6 | Work order + DocuSign | All parties |
| 7 | Admin verification + approval | Admin |
| 8 | Technician work completion | Technician |
| 9 | Agent upload invite (Contractor uploads insurance docs) | Contractor + Agent |

The `email-docusign` bonus workflow is separate — it's a screenshot-only pass
over every email and DocuSign document in the system (the 50+ items).
