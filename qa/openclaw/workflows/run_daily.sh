#!/usr/bin/env bash
# ============================================================
# run_daily.sh – MrSurety QA Daily Automated Runner
#
# Runs all 9 OpenClaw workflows, rotates the output folder,
# sends a Telegram/Slack summary, and uploads to Google Drive.
#
# Usage:
#   chmod +x run_daily.sh
#   ./run_daily.sh
#
# Cron (runs every day at 6:00 AM):
#   crontab -e
#   0 6 * * * /path/to/project/qa/openclaw/workflows/run_daily.sh >> /var/log/mrsurety-qa.log 2>&1
# ============================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OPENCLAW_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_DIR="$(dirname "$(dirname "$OPENCLAW_DIR")")"
DATE="$(date +%Y-%m-%d)"
OUTPUT_BASE="$OPENCLAW_DIR/output"
ARCHIVE_DIR="$OPENCLAW_DIR/output_archive/$DATE"

# Load environment variables
if [ -f "$OPENCLAW_DIR/.env" ]; then
    # shellcheck disable=SC1090
    set -a
    source "$OPENCLAW_DIR/.env"
    set +a
fi

# ── Helpers ───────────────────────────────────────────────────────────────────

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
separator() { echo "────────────────────────────────────────────────────────────"; }

send_notification() {
    local message="$1"
    # Telegram
    if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
        curl -s -X POST \
            "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
            -d "chat_id=${TELEGRAM_CHAT_ID}" \
            -d "text=${message}" \
            -d "parse_mode=Markdown" > /dev/null
    fi
    # Slack
    if [ -n "${SLACK_BOT_TOKEN:-}" ] && [ -n "${SLACK_CHANNEL:-}" ]; then
        curl -s -X POST \
            "https://slack.com/api/chat.postMessage" \
            -H "Authorization: Bearer ${SLACK_BOT_TOKEN}" \
            -H "Content-Type: application/json" \
            -d "{\"channel\":\"${SLACK_CHANNEL}\",\"text\":\"${message}\"}" > /dev/null
    fi
}

upload_to_gdrive() {
    local zip_path="$1"
    if [ -n "${GDRIVE_FOLDER_ID:-}" ] && command -v gdrive &> /dev/null; then
        log "Uploading $zip_path to Google Drive folder $GDRIVE_FOLDER_ID ..."
        if gdrive upload --parent "$GDRIVE_FOLDER_ID" "$zip_path"; then
            log "Upload complete"
        else
            log "ERROR: Google Drive upload failed (exit code $?). Check your GDRIVE_FOLDER_ID and gdrive auth."
            send_notification "⚠️ *MrSurety QA* – Google Drive upload failed. Upload $zip_path manually."
        fi
    else
        log "Google Drive upload skipped (GDRIVE_FOLDER_ID not set or gdrive CLI not installed)"
        log "Manual upload: drag $zip_path into the shared Google Drive folder"
    fi
}

# ── Pre-flight ────────────────────────────────────────────────────────────────

separator
log "MrSurety QA – Daily Run starting ($DATE)"
separator

# Verify Python and playwright are available
if ! command -v python3 &> /dev/null; then
    log "ERROR: python3 not found. Install Python 3.11+ first."
    exit 1
fi
if ! python3 -c "import playwright" 2>/dev/null; then
    log "Installing playwright Python package ..."
    python3 -m pip install playwright python-dotenv --quiet
    python3 -m playwright install chromium --quiet
fi

# Check app connectivity
log "Checking app connectivity ..."
if python3 "$SCRIPT_DIR/mrsurety_qa.py" --check-connection; then
    log "Connectivity OK"
else
    log "ERROR: Cannot reach the app. Check MRSURETY_BASE_URL in .env"
    send_notification "❌ *MrSurety QA Failed* – Cannot reach app. Check server and .env config."
    exit 1
fi

# ── Rotate output folder ──────────────────────────────────────────────────────

if [ -d "$OUTPUT_BASE" ] && [ -n "$(ls -A "$OUTPUT_BASE" 2>/dev/null)" ]; then
    log "Archiving previous output to $ARCHIVE_DIR ..."
    mkdir -p "$ARCHIVE_DIR"
    mv "$OUTPUT_BASE"/* "$ARCHIVE_DIR/" 2>/dev/null || true
    log "Archive complete"
fi
mkdir -p "$OUTPUT_BASE/screenshots" "$OUTPUT_BASE/videos" "$OUTPUT_BASE/data" "$OUTPUT_BASE/reports"

# ── Run all workflows ─────────────────────────────────────────────────────────

log "Starting all QA workflows ..."
START_TIME="$(date +%s)"

if python3 "$SCRIPT_DIR/mrsurety_qa.py" --workflow all; then
    WORKFLOW_STATUS="✅ PASSED"
else
    WORKFLOW_STATUS="❌ FAILED"
    log "One or more workflows failed – check findings.csv for details"
fi

END_TIME="$(date +%s)"
DURATION=$(( END_TIME - START_TIME ))
MINUTES=$(( DURATION / 60 ))
SECONDS=$(( DURATION % 60 ))

# ── Collect metrics ───────────────────────────────────────────────────────────

SCREENSHOT_COUNT="$(find "$OUTPUT_BASE/screenshots" -name "*.png" 2>/dev/null | wc -l | tr -d ' ')"
VIDEO_COUNT="$(find "$OUTPUT_BASE/videos" -name "*.mp4" 2>/dev/null | wc -l | tr -d ' ')"
FINDINGS_COUNT=0
if [ -f "$OUTPUT_BASE/data/findings.csv" ]; then
    FINDINGS_COUNT=$(( $(wc -l < "$OUTPUT_BASE/data/findings.csv") - 1 ))
fi

log "Run complete: status=$WORKFLOW_STATUS, duration=${MINUTES}m${SECONDS}s"
log "Screenshots: $SCREENSHOT_COUNT | Videos: $VIDEO_COUNT | Findings: $FINDINGS_COUNT"

# ── Zip and upload ────────────────────────────────────────────────────────────

ZIP_PATH="$OPENCLAW_DIR/MrSurety_QA_$DATE.zip"
log "Creating zip archive: $ZIP_PATH ..."
cd "$OPENCLAW_DIR"
zip -rq "$ZIP_PATH" output/
log "Zip created: $(du -sh "$ZIP_PATH" | cut -f1)"

upload_to_gdrive "$ZIP_PATH"

# ── Send summary notification ─────────────────────────────────────────────────

REPORT_PATH="$OUTPUT_BASE/reports/${DATE}_findings.md"
SUMMARY="*MrSurety QA – Daily Report ($DATE)*
Status: $WORKFLOW_STATUS
Duration: ${MINUTES}m ${SECONDS}s

📸 Screenshots: $SCREENSHOT_COUNT
🎥 Videos: $VIDEO_COUNT
⚠️ Findings: $FINDINGS_COUNT

📁 Output: $ZIP_PATH
📋 Report: $REPORT_PATH

Check \`findings.csv\` for details. Upload \`$ZIP_PATH\` to Google Drive."

send_notification "$SUMMARY"
log "Notification sent"
separator
log "Daily run complete. Output: $OUTPUT_BASE"
separator
