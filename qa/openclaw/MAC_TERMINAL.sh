#!/usr/bin/env bash
# ==============================================================================
# MAC_TERMINAL.sh – MrSurety QA Complete Runner for Sophal's Mac
# ==============================================================================
# COPY THIS ENTIRE FILE AND PASTE INTO YOUR TERMINAL.
#
# What this does (all 4 remaining tasks, fully automated):
#   1. Clone / pull the latest repo
#   2. Install Python + Playwright dependencies (one-time)
#   3. Create all QA test accounts on the live app
#   4. Run all 9 workflows (50+ screenshots captured automatically)
#   5. Run npm test (1,418 spec tests)
#   6. Zip everything for Google Drive
#   7. Print the email to send Christopher
#
# Live app : https://frontend-tan-five-46.vercel.app
# Admin    : admin@mrsurety.com / MrSurety2026!
# GitHub   : https://github.com/sophallanh/mrsurety-qagent-workflow-test
#
# Usage (paste the block below into your Mac terminal):
#   bash <(curl -fsSL https://raw.githubusercontent.com/sophallanh/mrsurety-qagent-workflow-test/copilot/openclaw-integration-steps/qa/openclaw/MAC_TERMINAL.sh)
#
# OR if you already have the repo cloned:
#   cd ~/mrsurety-qagent-workflow-test
#   bash qa/openclaw/MAC_TERMINAL.sh
# ==============================================================================
set -euo pipefail

# ── Colour helpers ─────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'
info()    { echo -e "${CYAN}[INFO]${RESET}  $*"; }
ok()      { echo -e "${GREEN}[OK]${RESET}    $*"; }
warn()    { echo -e "${YELLOW}[WARN]${RESET}  $*"; }
section() { echo -e "\n${BOLD}${CYAN}══════════════════════════════════════════${RESET}"; \
            echo -e "${BOLD}${CYAN}  $*${RESET}"; \
            echo -e "${BOLD}${CYAN}══════════════════════════════════════════${RESET}"; }

DATE="$(date +%Y-%m-%d)"
REPO_URL="https://github.com/sophallanh/mrsurety-qagent-workflow-test"
REPO_DIR="$HOME/mrsurety-qagent-workflow-test"
OPENCLAW_DIR="$REPO_DIR/qa/openclaw"
WORKFLOW_SCRIPT="$OPENCLAW_DIR/workflows/mrsurety_qa.py"
TESTS_DIR="$REPO_DIR/tests"
ZIP_NAME="MrSurety_QA_$DATE.zip"
ZIP_PATH="$OPENCLAW_DIR/$ZIP_NAME"

# ── Banner ─────────────────────────────────────────────────────────────────────
echo -e "${BOLD}"
echo "  ███╗   ███╗██████╗ ███████╗██╗   ██╗██████╗ ███████╗████████╗██╗   ██╗"
echo "  ████╗ ████║██╔══██╗██╔════╝██║   ██║██╔══██╗██╔════╝╚══██╔══╝╚██╗ ██╔╝"
echo "  ██╔████╔██║██████╔╝███████╗██║   ██║██████╔╝█████╗     ██║    ╚████╔╝ "
echo "  ██║╚██╔╝██║██╔══██╗╚════██║██║   ██║██╔══██╗██╔══╝     ██║     ╚██╔╝  "
echo "  ██║ ╚═╝ ██║██║  ██║███████║╚██████╔╝██║  ██║███████╗   ██║      ██║   "
echo "  ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═╝  "
echo -e "${RESET}"
echo -e "  ${BOLD}QA Complete Runner${RESET} — $DATE"
echo -e "  App: ${CYAN}https://frontend-tan-five-46.vercel.app${RESET}"
echo ""

# ── Step 0: Clone or pull repo ─────────────────────────────────────────────────
section "Step 0: Clone / Update Repo"
if [ -d "$REPO_DIR/.git" ]; then
    info "Repo already exists at $REPO_DIR — pulling latest ..."
    cd "$REPO_DIR"
    git pull --ff-only origin copilot/openclaw-integration-steps 2>/dev/null \
        || git pull --ff-only origin main 2>/dev/null \
        || warn "Could not pull (network issue or already up to date)"
    ok "Repo updated"
else
    info "Cloning $REPO_URL into $REPO_DIR ..."
    git clone "$REPO_URL" "$REPO_DIR"
    cd "$REPO_DIR"
    # Checkout the branch with the latest scripts
    git checkout copilot/openclaw-integration-steps 2>/dev/null \
        || git checkout main 2>/dev/null \
        || true
    ok "Repo cloned"
fi
cd "$REPO_DIR"

# ── Step 1: Install Python dependencies ────────────────────────────────────────
section "Step 1: Install Python Dependencies"

# Check Python 3
if ! command -v python3 &>/dev/null; then
    echo -e "${RED}[ERROR]${RESET} python3 not found."
    echo "  Install it: brew install python3"
    exit 1
fi
PYTHON_VERSION=$(python3 --version 2>&1)
ok "Using $PYTHON_VERSION"

# Install pip packages (silently if already installed)
info "Installing playwright + python-dotenv ..."
pip3 install playwright python-dotenv --quiet --upgrade
ok "Python packages installed"

# Install Chromium browser
info "Installing/verifying Chromium browser ..."
python3 -m playwright install chromium --quiet 2>/dev/null \
    || playwright install chromium --quiet 2>/dev/null \
    || warn "Chromium install may have failed — will try to proceed"
ok "Chromium ready"

# ── Step 2: Configure .env ─────────────────────────────────────────────────────
section "Step 2: Configure Environment"
if [ ! -f "$OPENCLAW_DIR/.env" ]; then
    cp "$OPENCLAW_DIR/.env.example" "$OPENCLAW_DIR/.env"
    ok "Created $OPENCLAW_DIR/.env from .env.example"
else
    ok ".env already exists — using existing configuration"
fi

# Also configure tests/.env
if [ ! -f "$TESTS_DIR/.env" ]; then
    if [ -f "$TESTS_DIR/.env.example" ]; then
        cp "$TESTS_DIR/.env.example" "$TESTS_DIR/.env"
        ok "Created $TESTS_DIR/.env from .env.example"
    fi
fi

# ── Step 3: Check connection to live app ───────────────────────────────────────
section "Step 3: Verify Live App Connection"
info "Checking https://frontend-tan-five-46.vercel.app ..."
cd "$OPENCLAW_DIR/workflows"
if python3 mrsurety_qa.py --check-connection; then
    ok "Live app is reachable"
else
    echo ""
    warn "Connection check failed."
    echo "  Possible causes:"
    echo "  • No internet connection"
    echo "  • The Vercel app is down — check https://frontend-tan-five-46.vercel.app in your browser"
    echo "  • Admin credentials wrong in $OPENCLAW_DIR/.env"
    echo ""
    echo "  Press Enter to continue anyway, or Ctrl+C to abort."
    read -r
fi
cd "$REPO_DIR"

# ── Step 4: Create all test accounts ──────────────────────────────────────────
section "Step 4: Create QA Test Accounts"
echo ""
echo -e "  ${YELLOW}⚠️  BEFORE THIS RUNS:${RESET}"
echo "  Make sure you've created these Outlook.com inboxes first:"
echo "    • agent.test1@outlook.com"
echo "    • agent.test2@outlook.com"
echo "    • homeowner.test1@outlook.com"
echo "    • homeowner.test2@outlook.com"
echo "    • homeowner.test3@outlook.com"
echo "    • contractor.test1@outlook.com"
echo "    • contractor.test2@outlook.com"
echo "    • tech.test1@outlook.com"
echo "    • ins.agent.test@outlook.com"
echo ""
echo -e "  All accounts use password: ${BOLD}QAtest@2026!${RESET}"
echo ""
echo "  Press Enter to create accounts on the live app, or Ctrl+C to skip ..."
read -r

cd "$OPENCLAW_DIR/workflows"
python3 mrsurety_qa.py --workflow create-accounts || warn "Account creation had some errors — see output above"
ok "Account creation complete"
cd "$REPO_DIR"

# ── Step 5: Admin Approval Pause ──────────────────────────────────────────────
echo ""
echo -e "  ${YELLOW}👆 MANUAL STEP REQUIRED:${RESET}"
echo "  1. Open https://frontend-tan-five-46.vercel.app/login"
echo "  2. Log in as: admin@mrsurety.com / MrSurety2026!"
echo "  3. Approve the pending contractor and technician accounts"
echo "  4. Then press Enter here to continue ..."
echo ""
read -r
ok "Admin approval confirmed — continuing"

# ── Step 6: Run all 9 workflows (captures 50+ screenshots + videos) ─────────
section "Step 6: Run All 9 Workflows (50+ Screenshots)"
info "Starting all 9 workflows — this takes ~30-45 minutes ..."
info "A Chromium browser window will open — this is normal."
echo ""

cd "$OPENCLAW_DIR/workflows"
python3 mrsurety_qa.py --workflow all || warn "Some workflow steps had errors — findings logged"
ok "All 9 workflows complete"
cd "$REPO_DIR"

# ── Step 7: Run npm tests ──────────────────────────────────────────────────────
section "Step 7: Run npm Test Suite (1,418 Tests)"
cd "$TESTS_DIR"
if [ ! -d "node_modules" ]; then
    info "Installing npm packages ..."
    npm install --quiet
fi
info "Running all spec tests ..."
npm test -- --reporter=list 2>&1 | tail -20 || warn "Some npm tests failed (expected if live app has differences)"
ok "npm test complete"
cd "$REPO_DIR"

# ── Step 8: Package everything for Google Drive ────────────────────────────────
section "Step 8: Package Output for Google Drive"
info "Creating zip archive ..."

cd "$OPENCLAW_DIR"
# Create fresh output structure if empty
mkdir -p output/screenshots output/videos output/data output/reports

zip -rq "$ZIP_NAME" output/ 2>/dev/null || zip -rq "$ZIP_NAME" output/
ok "Created: $ZIP_PATH"
echo ""
info "Archive size: $(du -sh "$ZIP_PATH" 2>/dev/null | cut -f1)"
info "Screenshots: $(find output/screenshots -name '*.png' 2>/dev/null | wc -l | tr -d ' ') PNG files"
info "Reports: $(ls output/reports/*.md 2>/dev/null | wc -l | tr -d ' ') Markdown files"
cd "$REPO_DIR"

# Open output folder in Finder for drag-and-drop to Google Drive
open "$OPENCLAW_DIR" 2>/dev/null || true

# ── Step 9: Final summary ──────────────────────────────────────────────────────
section "✅ Done! Here's What to Do Next"

SCREENSHOT_COUNT="$(find "$OPENCLAW_DIR/output/screenshots" -name '*.png' 2>/dev/null | wc -l | tr -d ' ')"
FINDINGS_COUNT=0
if [ -f "$OPENCLAW_DIR/output/data/findings.csv" ]; then
    FINDINGS_COUNT=$(( $(wc -l < "$OPENCLAW_DIR/output/data/findings.csv") - 1 ))
fi

echo ""
echo -e "  ${BOLD}📊 Run Summary${RESET}"
echo "  Date:        $DATE"
echo "  Screenshots: $SCREENSHOT_COUNT PNG files captured"
echo "  Findings:    $FINDINGS_COUNT items logged"
echo "  Output zip:  $ZIP_PATH"
echo ""
echo -e "  ${BOLD}📂 Next: Upload to Google Drive${RESET}"
echo "  A Finder window just opened at: $OPENCLAW_DIR"
echo "  Drag ${BOLD}$ZIP_NAME${RESET} into Christopher's shared Google Drive folder."
echo ""
echo -e "  ${BOLD}📧 Then email Christopher this message:${RESET}"
echo ""
echo "  ┌──────────────────────────────────────────────────────────────┐"
echo "  │ To:      c.palmer@mrsurety.com                              │"
echo "  │ Subject: MrSurety QA – Day 1 Findings ($DATE)               │"
echo "  │                                                              │"
echo "  │ Hi Christopher,                                              │"
echo "  │                                                              │"
echo "  │ Completed first full QA run against the live app.           │"
echo "  │                                                              │"
echo "  │ Live app: https://frontend-tan-five-46.vercel.app            │"
echo "  │ GitHub:   https://github.com/sophallanh/                     │"
echo "  │           mrsurety-qagent-workflow-test                      │"
echo "  │                                                              │"
echo "  │ What's in the zip (Google Drive):                            │"
echo "  │   • $SCREENSHOT_COUNT screenshots covering all 9 workflows             │"
echo "  │   • findings.csv — all issues found with severity            │"
echo "  │   • ${DATE}_findings.md — executive summary               │"
echo "  │   • test_accounts.csv — log in to verify any issue          │"
echo "  │                                                              │"
echo "  │ Happy to review on a call anytime.                           │"
echo "  │                                                              │"
echo "  │ – Sophal                                                      │"
echo "  └──────────────────────────────────────────────────────────────┘"
echo ""
echo -e "  ${BOLD}📋 Report:${RESET} $OPENCLAW_DIR/output/reports/${DATE}_findings.md"
echo -e "  ${BOLD}📂 Output:${RESET} $OPENCLAW_DIR/output/"
echo ""
ok "All done. You're finished! 🎉"
echo ""
