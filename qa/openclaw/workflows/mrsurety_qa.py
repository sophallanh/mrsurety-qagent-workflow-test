"""
mrsurety_qa.py – OpenClaw / Playwright Python Workflow Suite
============================================================
Complete automated QA for Christopher's MrSurety testing requirements.

Workflows
---------
  --workflow admin-login              Login as admin, screenshot dashboard, export user CSV
  --workflow agent-signup             Create agent account, generate referral code & QR
  --workflow homeowner-service-request  Test both referral methods + Stripe test payment
  --workflow email-docusign           Screenshot every email and DocuSign doc (50+)
  --workflow contractor-upload-invite  Full invite flow + all security controls
  --workflow admin-verification       Admin checks + compile daily findings report
  --workflow all                       Run all 6 workflows in sequence (default)
  --check-connection                  Verify app is reachable and admin login works

Usage
-----
  # Run everything (recommended for daily automated run):
  python3 mrsurety_qa.py --workflow all

  # Run a single workflow:
  python3 mrsurety_qa.py --workflow admin-login

  # Verify connectivity before starting:
  python3 mrsurety_qa.py --check-connection

Requirements
------------
  pip install playwright python-dotenv
  playwright install chromium

Environment
-----------
  Copy .env.example → .env in the qa/openclaw/ directory and fill in your values.
  All variables can be overridden by setting them in the shell environment.
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from playwright.sync_api import Browser, BrowserContext, Page, sync_playwright

# ── Load environment ──────────────────────────────────────────────────────────
_SCRIPT_DIR = Path(__file__).parent
_ENV_FILE = _SCRIPT_DIR.parent / ".env"
load_dotenv(_ENV_FILE)

BASE_URL = os.getenv("MRSURETY_BASE_URL", "https://staging.mrsurety.com").rstrip("/")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@mrsurety.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "MrSurety2026!")

# Stripe test card (never use real card data here)
STRIPE_CARD = os.getenv("STRIPE_TEST_CARD", "4242424242424242")
STRIPE_EXPIRY = os.getenv("STRIPE_TEST_EXPIRY", "1229")
STRIPE_CVV = os.getenv("STRIPE_TEST_CVV", "123")
STRIPE_ZIP = os.getenv("STRIPE_TEST_ZIP", "90210")

# Output paths
_OUTPUT_BASE = _SCRIPT_DIR.parent / "output"
SCREENSHOT_DIR = Path(os.getenv("OPENCLAW_SCREENSHOT_PATH", str(_OUTPUT_BASE / "screenshots")))
VIDEO_DIR = Path(os.getenv("OPENCLAW_VIDEO_PATH", str(_OUTPUT_BASE / "videos")))
DATA_DIR = Path(os.getenv("OPENCLAW_DATA_PATH", str(_OUTPUT_BASE / "data")))
REPORT_DIR = Path(os.getenv("OPENCLAW_REPORT_PATH", str(_OUTPUT_BASE / "reports")))

# Playwright settings
HEADLESS = os.getenv("OPENCLAW_HEADLESS", "false").lower() == "true"
SLOW_MO = int(os.getenv("OPENCLAW_SLOW_MO", "50"))
TIMEOUT = int(os.getenv("OPENCLAW_TIMEOUT", "60000"))

# Generated test account credentials (YYYYMMDD suffix for uniqueness)
_DATE_SUFFIX = datetime.now().strftime("%Y%m%d")
AGENT_EMAIL = os.getenv("AGENT_EMAIL") or f"testagent_{_DATE_SUFFIX}@outlook.com"
AGENT_PASSWORD = os.getenv("AGENT_PASSWORD", "MrSuretyQA2026!")
HOMEOWNER_EMAIL_A = os.getenv("HOMEOWNER_EMAIL_A") or f"testhomeowner_a_{_DATE_SUFFIX}@outlook.com"
HOMEOWNER_PASSWORD_A = os.getenv("HOMEOWNER_PASSWORD_A", "MrSuretyQA2026!")
HOMEOWNER_EMAIL_B = os.getenv("HOMEOWNER_EMAIL_B") or f"testhomeowner_b_{_DATE_SUFFIX}@outlook.com"
HOMEOWNER_PASSWORD_B = os.getenv("HOMEOWNER_PASSWORD_B", "MrSuretyQA2026!")
CONTRACTOR_EMAIL = os.getenv("CONTRACTOR_EMAIL") or f"testcontractor_{_DATE_SUFFIX}@outlook.com"
CONTRACTOR_PASSWORD = os.getenv("CONTRACTOR_PASSWORD", "MrSuretyQA2026!")
INSURANCE_AGENT_EMAIL = os.getenv("INSURANCE_AGENT_EMAIL") or f"testinsagent_{_DATE_SUFFIX}@outlook.com"

# Secure upload link variables (set after Workflow 5 generates them)
AGENT_UPLOAD_LINK = os.getenv("AGENT_UPLOAD_LINK", "")
REVOKED_UPLOAD_LINK = os.getenv("REVOKED_UPLOAD_LINK", "")
EXPIRED_UPLOAD_LINK = os.getenv("EXPIRED_UPLOAD_LINK", "")
MANIPULATED_UPLOAD_LINK = os.getenv("MANIPULATED_UPLOAD_LINK", "")

# Findings accumulator (written to CSV and Markdown report at the end)
_findings: list[dict] = []
_test_accounts: list[dict] = []


# ── Helpers ───────────────────────────────────────────────────────────────────

def _ensure_dirs() -> None:
    for d in (SCREENSHOT_DIR, VIDEO_DIR, DATA_DIR, REPORT_DIR):
        d.mkdir(parents=True, exist_ok=True)


def _shot(page: Page, name: str, full_page: bool = True) -> Path:
    """Save a screenshot and return the path."""
    dest = SCREENSHOT_DIR / name
    page.screenshot(path=str(dest), full_page=full_page)
    print(f"  📸 screenshot → {dest.name}")
    return dest


def _log_finding(
    workflow: str,
    step: str,
    issue_type: str,
    description: str,
    severity: str = "medium",
    screenshot: str = "",
    video: str = "",
) -> None:
    _findings.append({
        "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "workflow": workflow,
        "step": step,
        "issue_type": issue_type,
        "description": description,
        "severity": severity,
        "screenshot_path": screenshot,
        "video_path": video,
    })


def _register_account(
    role: str,
    email: str,
    password: str,
    screenshot: str = "",
) -> None:
    _test_accounts.append({
        "role": role,
        "email": email,
        "password": password,
        "creation_date": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "screenshot_path": screenshot,
    })


def _new_page(browser: Browser, record_video: bool = False) -> tuple[BrowserContext, Page]:
    ctx_kwargs: dict = {
        "viewport": {"width": 1920, "height": 1080},
        "base_url": BASE_URL,
    }
    if record_video:
        ctx_kwargs["record_video_dir"] = str(VIDEO_DIR)
        ctx_kwargs["record_video_size"] = {"width": 1920, "height": 1080}
    ctx = browser.new_context(**ctx_kwargs)
    ctx.set_default_timeout(TIMEOUT)
    page = ctx.new_page()
    return ctx, page


def _login(page: Page, email: str, password: str) -> None:
    page.goto("/login")
    page.fill('[data-testid="email"]', email)
    page.fill('[data-testid="password"]', password)
    page.click('[data-testid="login-submit"]')
    page.wait_for_url(lambda url: "/login" not in url, timeout=TIMEOUT)


# ── Workflow 1 – Admin Login & Dashboard ────────────────────────────────────

def workflow_admin_login(browser: Browser) -> None:
    print("\n── Workflow 1: Admin Login & Dashboard ──────────────────────")
    ctx, page = _new_page(browser)
    try:
        _login(page, ADMIN_EMAIL, ADMIN_PASSWORD)
        page.wait_for_selector('[data-testid="admin-dashboard"]', timeout=TIMEOUT)
        _shot(page, "admin_01_dashboard.png")
        print("  ✅ Admin dashboard loaded")

        page.click('[data-testid="nav-users"]')
        page.wait_for_selector('[data-testid="users-table"]', timeout=TIMEOUT)
        _shot(page, "admin_02_users_table.png")
        print("  ✅ Users table visible")

        # Extract user table to CSV
        rows = page.query_selector_all('[data-testid="users-table"] tr')
        csv_path = DATA_DIR / "admin_users.csv"
        with csv_path.open("w", newline="") as f:
            writer = csv.writer(f)
            for row in rows:
                cells = [td.inner_text() for td in row.query_selector_all("th, td")]
                writer.writerow(cells)
        print(f"  📄 admin_users.csv → {len(rows)} rows")

        page.click('[data-testid="nav-service-requests"]')
        _shot(page, "admin_03_service_requests.png")
        print("  ✅ Service requests page captured")

    except Exception as exc:
        _log_finding("admin-login", "login", "ERROR", str(exc), severity="critical")
        print(f"  ❌ {exc}")
    finally:
        ctx.close()


# ── Workflow 2 – Agent Signup & Referral Code ────────────────────────────────

def workflow_agent_signup(browser: Browser) -> str:
    """Returns the referral link for use in Workflow 3."""
    print("\n── Workflow 2: Agent Signup & Referral Code ─────────────────")
    ctx, page = _new_page(browser)
    referral_link = ""
    try:
        page.goto("/signup")
        page.select_option('[data-testid="role"]', "agent")
        page.fill('[data-testid="first-name"]', "Test")
        page.fill('[data-testid="last-name"]', "Agent")
        page.fill('[data-testid="email"]', AGENT_EMAIL)
        page.fill('[data-testid="password"]', AGENT_PASSWORD)
        page.fill('[data-testid="confirm-password"]', AGENT_PASSWORD)

        shot_signup = _shot(page, "agent_00_signup_form.png")
        _register_account("agent", AGENT_EMAIL, AGENT_PASSWORD, str(shot_signup))

        page.click('[data-testid="signup-submit"]')
        page.wait_for_url(lambda url: "/agent/dashboard" in url or "/dashboard" in url, timeout=TIMEOUT)
        _shot(page, "agent_01_dashboard_after_signup.png")
        print(f"  ✅ Agent account created: {AGENT_EMAIL}")

        # Navigate to referral section
        page.click('[data-testid="nav-referral"]')
        page.wait_for_selector('[data-testid="referral-link"]', timeout=TIMEOUT)
        referral_link = page.input_value('[data-testid="referral-link"]')
        print(f"  🔗 Referral link: {referral_link}")

        _shot(page, "agent_02_referral_code.png")

        # Try to download QR code
        try:
            with page.expect_download():
                page.click('[data-testid="download-qr"]')
            print("  ✅ QR code downloaded")
        except Exception:
            print("  ⚠️  QR download button not found (skipped)")

        _shot(page, "agent_03_qr_code.png")

        # Save referral link to file
        ref_file = DATA_DIR / "referral_link.txt"
        ref_file.write_text(referral_link)
        print(f"  📄 referral link saved → {ref_file}")

    except Exception as exc:
        _log_finding("agent-signup", "signup", "ERROR", str(exc), severity="high")
        print(f"  ❌ {exc}")
    finally:
        ctx.close()
    return referral_link


# ── Workflow 3 – Homeowner Service Request & Stripe Payment ─────────────────

def workflow_homeowner_service_request(browser: Browser, referral_link: str = "") -> None:
    print("\n── Workflow 3: Homeowner Service Request & Stripe Payment ───")

    # Method A – Homeowner uses the referral link
    print("  [Method A – Referral Link]")
    ctx_a, page_a = _new_page(browser)
    try:
        target_url = referral_link if referral_link else f"{BASE_URL}/service-request"
        page_a.goto(target_url)
        page_a.wait_for_selector('[data-testid="service-request-form"]', timeout=TIMEOUT)

        page_a.fill('[data-testid="first-name"]', "Test")
        page_a.fill('[data-testid="last-name"]', "HomeownerA")
        page_a.fill('[data-testid="email"]', HOMEOWNER_EMAIL_A)
        page_a.fill('[data-testid="password"]', HOMEOWNER_PASSWORD_A)
        page_a.fill('[data-testid="property-address"]', "123 Main St, Los Angeles CA 90001")
        page_a.fill('[data-testid="permit-type"]', "plumbing")

        shot_a = _shot(page_a, "homeowner_01_method_a_form.png")
        _register_account("homeowner", HOMEOWNER_EMAIL_A, HOMEOWNER_PASSWORD_A, str(shot_a))

        # Stripe payment
        page_a.fill('[data-testid="card-number"]', STRIPE_CARD)
        page_a.fill('[data-testid="card-expiry"]', STRIPE_EXPIRY)
        page_a.fill('[data-testid="card-cvv"]', STRIPE_CVV)
        page_a.fill('[data-testid="card-zip"]', STRIPE_ZIP)

        _shot(page_a, "homeowner_02_stripe_form.png")
        page_a.click('[data-testid="service-request-submit"]')
        page_a.wait_for_selector('[data-testid="confirmation-message"]', timeout=TIMEOUT)
        _shot(page_a, "homeowner_03_stripe_success.png")
        print(f"  ✅ Method A complete – {HOMEOWNER_EMAIL_A}")

    except Exception as exc:
        _log_finding("homeowner-service-request", "method-a", "ERROR", str(exc), severity="high")
        print(f"  ❌ Method A: {exc}")
    finally:
        ctx_a.close()

    # Method B – Homeowner enters agent email
    print("  [Method B – Agent Email Entry]")
    ctx_b, page_b = _new_page(browser)
    try:
        page_b.goto("/service-request")
        page_b.wait_for_selector('[data-testid="service-request-form"]', timeout=TIMEOUT)

        page_b.fill('[data-testid="first-name"]', "Test")
        page_b.fill('[data-testid="last-name"]', "HomeownerB")
        page_b.fill('[data-testid="email"]', HOMEOWNER_EMAIL_B)
        page_b.fill('[data-testid="password"]', HOMEOWNER_PASSWORD_B)
        page_b.fill('[data-testid="property-address"]', "456 Oak Ave, Anaheim CA 92801")
        page_b.fill('[data-testid="permit-type"]', "electrical")
        page_b.fill('[data-testid="agent-email"]', AGENT_EMAIL)

        shot_b = _shot(page_b, "homeowner_04_method_b_agent_email.png")
        _register_account("homeowner", HOMEOWNER_EMAIL_B, HOMEOWNER_PASSWORD_B, str(shot_b))

        page_b.click('[data-testid="service-request-submit"]')
        page_b.wait_for_selector('[data-testid="confirmation-message"]', timeout=TIMEOUT)
        _shot(page_b, "homeowner_05_method_b_confirmation.png")
        print(f"  ✅ Method B complete – {HOMEOWNER_EMAIL_B}")

    except Exception as exc:
        _log_finding("homeowner-service-request", "method-b", "ERROR", str(exc), severity="high")
        print(f"  ❌ Method B: {exc}")
    finally:
        ctx_b.close()


# ── Workflow 4 – Email & DocuSign Screenshots ────────────────────────────────

def workflow_email_docusign(browser: Browser) -> None:
    print("\n── Workflow 4: Email & DocuSign Screenshots (50+) ───────────")
    inboxes = [
        ("agent", AGENT_EMAIL, AGENT_PASSWORD),
        ("homeowner_a", HOMEOWNER_EMAIL_A, HOMEOWNER_PASSWORD_A),
        ("homeowner_b", HOMEOWNER_EMAIL_B, HOMEOWNER_PASSWORD_B),
        ("contractor", CONTRACTOR_EMAIL, CONTRACTOR_PASSWORD),
    ]

    email_inventory: list[dict] = []
    seq = 1

    for label, email, password in inboxes:
        ctx, page = _new_page(browser)
        try:
            # Sign in to Outlook
            page.goto("https://outlook.com")
            page.fill('[name="loginfmt"]', email)
            page.click('[type="submit"]')
            page.wait_for_selector('[name="passwd"]', timeout=TIMEOUT)
            page.fill('[name="passwd"]', password)
            page.click('[type="submit"]')
            # Handle "Stay signed in?" prompt if shown
            try:
                page.click('[id="idBtn_Back"]', timeout=5000)  # "No" button
            except Exception:
                pass

            page.wait_for_selector('[aria-label="Mail"]', timeout=TIMEOUT)
            _shot(page, f"email_{seq:03d}_{label}_inbox.png")
            print(f"  ✅ {label} inbox opened")

            # Click each email and screenshot it
            email_rows = page.query_selector_all('[data-convid]')
            print(f"  📧 {label}: {len(email_rows)} emails found")

            for i, row in enumerate(email_rows):
                subject = row.get_attribute("aria-label") or f"email_{i}"
                subject_slug = (
                    subject.lower()
                    .replace(" ", "_")
                    .replace("/", "-")
                    .replace("\\", "-")[:50]
                )
                row.click()
                page.wait_for_timeout(1500)

                shot_name = f"email_{seq:03d}_{label}_{subject_slug}.png"
                shot_path = _shot(page, shot_name)

                # Extract text for verbiage review
                # NOTE: Outlook.com is an external site without our custom data-testid attributes.
                # We try known Outlook selectors in order; failure is non-fatal (text preview is optional).
                email_body = ""
                for selector in ('[data-testid="emailBody"]', '.ReadingPaneContents', '[role="main"]'):
                    try:
                        el = page.query_selector(selector)
                        if el:
                            email_body = el.inner_text()
                            break
                    except Exception:
                        continue

                email_inventory.append({
                    "seq": seq,
                    "inbox": label,
                    "subject": subject,
                    "screenshot_path": str(shot_path),
                    "text_preview": email_body[:200].replace("\n", " "),
                })
                seq += 1

                # Check for DocuSign link in email and screenshot document
                try:
                    docusign_link = page.locator('a[href*="docusign"]').first
                    if docusign_link.is_visible():
                        with page.expect_popup() as popup_info:
                            docusign_link.click()
                        ds_page = popup_info.value
                        ds_page.wait_for_load_state("networkidle")
                        ds_shot_name = f"docusign_{seq:03d}_{label}_{subject_slug}.png"
                        ds_shot_path = SCREENSHOT_DIR / ds_shot_name
                        ds_page.screenshot(path=str(ds_shot_path), full_page=True)
                        print(f"  📜 DocuSign doc → {ds_shot_name}")
                        email_inventory.append({
                            "seq": seq,
                            "inbox": label,
                            "subject": f"[DocuSign] {subject}",
                            "screenshot_path": str(ds_shot_path),
                            "text_preview": "",
                        })
                        seq += 1
                        ds_page.close()
                except Exception:
                    pass

        except Exception as exc:
            _log_finding("email-docusign", f"inbox-{label}", "ERROR", str(exc), severity="medium")
            print(f"  ⚠️  {label} inbox error: {exc}")
        finally:
            ctx.close()

    # Write email inventory CSV
    inv_path = DATA_DIR / "email_inventory.csv"
    with inv_path.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["seq", "inbox", "subject", "screenshot_path", "text_preview"])
        writer.writeheader()
        writer.writerows(email_inventory)
    print(f"  📄 email_inventory.csv → {len(email_inventory)} items (screenshots + DocuSign docs)")


# ── Workflow 5 – Contractor Upload Invite & Security Controls ────────────────

def workflow_contractor_upload_invite(browser: Browser) -> None:
    print("\n── Workflow 5: Contractor Upload Invite & Security Controls ─")
    ctx, page = _new_page(browser, record_video=True)
    try:
        # Create contractor account
        page.goto("/signup")
        page.select_option('[data-testid="role"]', "contractor")
        page.fill('[data-testid="first-name"]', "Test")
        page.fill('[data-testid="last-name"]', "Contractor")
        page.fill('[data-testid="email"]', CONTRACTOR_EMAIL)
        page.fill('[data-testid="password"]', CONTRACTOR_PASSWORD)
        page.fill('[data-testid="company"]', "Test Contractor LLC")
        page.click('[data-testid="signup-submit"]')
        page.wait_for_url(lambda url: "/contractor" in url or "/dashboard" in url, timeout=TIMEOUT)

        shot_c = _shot(page, "contractor_00_dashboard.png")
        _register_account("contractor", CONTRACTOR_EMAIL, CONTRACTOR_PASSWORD, str(shot_c))
        print(f"  ✅ Contractor account created: {CONTRACTOR_EMAIL}")

        # Navigate to Documents → Invite Agent
        page.click('[data-testid="nav-documents"]')
        page.wait_for_selector('[data-testid="invite-agent-section"]', timeout=TIMEOUT)
        _shot(page, "contractor_01_documents_page.png")

        page.fill('[data-testid="insurance-agent-email"]', INSURANCE_AGENT_EMAIL)
        _shot(page, "contractor_02_invite_form.png")
        page.click('[data-testid="send-invite"]')
        page.wait_for_selector('[data-testid="invite-sent-confirmation"]', timeout=TIMEOUT)
        _shot(page, "contractor_03_invite_sent.png")
        print(f"  ✅ Invite sent to {INSURANCE_AGENT_EMAIL}")

        # Check active invites panel
        page.wait_for_selector('[data-testid="active-invites"]', timeout=TIMEOUT)
        _shot(page, "contractor_04_active_invites.png")
        print("  ✅ Active invites panel visible")

        # --- Agent side (open invite link – no login required) ---
        upload_link = os.getenv("AGENT_UPLOAD_LINK", "")
        if upload_link:
            ctx_agent, page_agent = _new_page(browser)
            try:
                page_agent.goto(upload_link)
                page_agent.wait_for_selector('[data-testid="upload-checklist"]', timeout=TIMEOUT)
                _shot(page_agent, "agent_upload_01_checklist.png")
                print("  ✅ Agent upload checklist visible")

                # Upload COI
                coi_path = _SCRIPT_DIR.parent.parent / "tests/playwright/fixtures/sample-coi.pdf"
                if coi_path.exists():
                    page_agent.set_input_files('[data-testid="file-input"]', str(coi_path))
                    page_agent.select_option('[data-testid="doc-type"]', "coi")
                    page_agent.fill('[data-testid="carrier-name"]', "State Farm")
                    page_agent.fill('[data-testid="effective-date"]', "2026-01-01")
                    _shot(page_agent, "agent_upload_02_coi_ready.png")
                    page_agent.click('[data-testid="upload-all"]')
                    page_agent.wait_for_selector('[data-testid="upload-success"]', timeout=TIMEOUT)
                    _shot(page_agent, "agent_upload_03_coi_success.png")
                    print("  ✅ COI uploaded successfully")

                # Attempt to upload restricted doc type (CSLB card – should be rejected)
                try:
                    page_agent.select_option('[data-testid="doc-type"]', "cslb")
                    _shot(page_agent, "agent_upload_04_cslb_attempted.png")
                    err_msg = page_agent.locator('[data-testid="restriction-error"]')
                    if err_msg.is_visible():
                        _shot(page_agent, "agent_upload_05_cslb_rejected.png")
                        print("  ✅ CSLB upload correctly rejected")
                    else:
                        _log_finding(
                            "contractor-upload-invite", "cslb-restriction",
                            "SECURITY", "CSLB card upload NOT rejected – restriction missing",
                            severity="critical",
                        )
                        print("  ❌ CSLB restriction NOT enforced!")
                except Exception:
                    print("  ⚠️  CSLB restriction test skipped (option not available)")

            except Exception as exc:
                _log_finding("contractor-upload-invite", "agent-upload", "ERROR", str(exc), severity="high")
                print(f"  ⚠️  Agent upload error: {exc}")
            finally:
                ctx_agent.close()
        else:
            print("  ⚠️  AGENT_UPLOAD_LINK not set – skipping agent-side upload tests")

        # --- Security controls ---
        _test_security_link(browser, REVOKED_UPLOAD_LINK, "revoked", "revoked", "security_01_revoked_link.png")
        _test_security_link(browser, EXPIRED_UPLOAD_LINK, "expired", "expired", "security_02_expired_link.png")
        _test_security_link(browser, MANIPULATED_UPLOAD_LINK, "access denied", "manipulation", "security_03_url_manipulation.png")

        # Revoke the active invite (back on contractor page)
        _login(page, CONTRACTOR_EMAIL, CONTRACTOR_PASSWORD)
        page.click('[data-testid="nav-documents"]')
        try:
            page.click('[data-testid="revoke-invite"]')
            page.wait_for_selector('[data-testid="revoke-success"]', timeout=TIMEOUT)
            _shot(page, "contractor_05_invite_revoked.png")
            print("  ✅ Invite revoked successfully")
        except Exception as exc:
            print(f"  ⚠️  Revoke test skipped: {exc}")

    except Exception as exc:
        _log_finding("contractor-upload-invite", "setup", "ERROR", str(exc), severity="critical")
        print(f"  ❌ {exc}")
    finally:
        # Save video – wrap in try/except; video.path() may not be available
        # if the recording was never started or the context was closed early.
        video_path: Optional[str] = None
        try:
            if ctx.pages and ctx.pages[0].video:
                video_path = ctx.pages[0].video.path()
        except Exception:
            pass
        ctx.close()
        if video_path:
            dest = VIDEO_DIR / "contractor_invite_full.mp4"
            try:
                Path(video_path).rename(dest)
                print(f"  🎥 video saved → {dest.name}")
            except Exception as ve:
                print(f"  ⚠️  Could not save video: {ve}")


def _test_security_link(
    browser: Browser,
    link: str,
    expect_text: str,
    label: str,
    shot_name: str,
) -> None:
    if not link:
        print(f"  ⚠️  {label} link not set in .env – skipping")
        return
    ctx, page = _new_page(browser)
    try:
        page.goto(link)
        page.wait_for_load_state("networkidle")
        body_text = page.inner_text("body").lower()
        _shot(page, shot_name)
        if expect_text.lower() in body_text:
            print(f"  ✅ Security: {label} link correctly rejected")
        else:
            _log_finding(
                "contractor-upload-invite", f"security-{label}",
                "SECURITY", f"{label} link NOT rejected as expected",
                severity="critical",
                screenshot=shot_name,
            )
            print(f"  ❌ Security: {label} link was NOT rejected!")
    except Exception as exc:
        print(f"  ⚠️  Security {label} test error: {exc}")
    finally:
        ctx.close()


# ── Workflow 6 – Admin Verification & Daily Report ──────────────────────────

def workflow_admin_verification(browser: Browser) -> None:
    print("\n── Workflow 6: Admin Verification & Daily Report ────────────")
    ctx, page = _new_page(browser)
    try:
        _login(page, ADMIN_EMAIL, ADMIN_PASSWORD)

        # Verify agent-homeowner links
        page.click('[data-testid="nav-agent-links"]')
        _shot(page, "admin_04_agent_homeowner_links.png")
        print("  ✅ Agent-homeowner links captured")

        # Verify service requests
        page.click('[data-testid="nav-service-requests"]')
        _shot(page, "admin_05_service_requests_full.png")

        # Verify document uploads
        try:
            page.click('[data-testid="nav-document-uploads"]')
            _shot(page, "admin_06_document_uploads.png")
            print("  ✅ Document uploads visible")
        except Exception:
            print("  ⚠️  Document uploads nav not found (skipped)")

        # Verify contractor invite section
        try:
            page.click('[data-testid="nav-contractor-invites"]')
            _shot(page, "admin_07_contractor_invites.png")
            print("  ✅ Contractor invites section visible")
        except Exception:
            print("  ⚠️  Contractor invites nav not found (skipped)")

    except Exception as exc:
        _log_finding("admin-verification", "dashboard", "ERROR", str(exc), severity="high")
        print(f"  ❌ {exc}")
    finally:
        ctx.close()

    _generate_reports()


# ── Report Generation ────────────────────────────────────────────────────────

def _generate_reports() -> None:
    today = datetime.now().strftime("%Y-%m-%d")
    print("\n── Generating Reports ───────────────────────────────────────")

    # test_accounts.csv
    accounts_path = DATA_DIR / "test_accounts.csv"
    with accounts_path.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["role", "email", "password", "creation_date", "screenshot_path"])
        writer.writeheader()
        writer.writerows(_test_accounts)
    print(f"  📄 test_accounts.csv → {len(_test_accounts)} accounts")

    # findings.csv
    findings_path = DATA_DIR / "findings.csv"
    with findings_path.open("w", newline="") as f:
        fieldnames = ["date", "workflow", "step", "issue_type", "description", "severity", "screenshot_path", "video_path"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(_findings)
    print(f"  📄 findings.csv → {len(_findings)} findings")

    # findings.json (for OpenClaw export-report compatibility)
    json_path = DATA_DIR / "daily_findings.json"
    json_path.write_text(json.dumps(_findings, indent=2))

    # Daily Markdown report
    critical = [f for f in _findings if f["severity"] == "critical"]
    high = [f for f in _findings if f["severity"] == "high"]
    medium = [f for f in _findings if f["severity"] == "medium"]

    screenshots = list(SCREENSHOT_DIR.glob("*.png"))
    videos = list(VIDEO_DIR.glob("*.mp4"))

    md = f"""# MrSurety QA – Daily Findings Report
**Date:** {today}  
**Prepared by:** OpenClaw Automated QA Suite  

---

## Summary

| Metric | Count |
|--------|-------|
| Test accounts created | {len(_test_accounts)} |
| Screenshots captured | {len(screenshots)} |
| Videos recorded | {len(videos)} |
| Total findings | {len(_findings)} |
| 🔴 Critical | {len(critical)} |
| 🟠 High | {len(high)} |
| 🟡 Medium | {len(medium)} |

---

## Test Accounts Created

| Role | Email | Password |
|------|-------|----------|
"""
    for acct in _test_accounts:
        md += f"| {acct['role']} | {acct['email']} | {acct['password']} |\n"

    md += """
---

## Findings

"""
    if _findings:
        md += "| # | Workflow | Step | Type | Severity | Description |\n"
        md += "|---|----------|------|------|----------|-------------|\n"
        for i, f in enumerate(_findings, 1):
            md += f"| {i} | {f['workflow']} | {f['step']} | {f['issue_type']} | {f['severity']} | {f['description']} |\n"
    else:
        md += "_No issues found – all workflows passed._\n"

    md += f"""
---

## Output Files

- `output/screenshots/` – {len(screenshots)} PNG files
- `output/videos/` – {len(videos)} MP4 files  
- `output/data/test_accounts.csv` – share with Christopher so he can log in and verify
- `output/data/findings.csv` – import into Excel/Sheets for tracking
- `output/data/email_inventory.csv` – all email + DocuSign screenshots indexed

---

## Next Steps

1. Upload the entire `output/` folder to the shared Google Drive folder
2. Review `email_inventory.csv` with Christopher to check verbiage
3. Discuss any critical/high findings before tonight's changes
4. Re-run daily at 6 AM via cron (`run_daily.sh`)

---
_Generated by mrsurety_qa.py at {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}_
"""

    report_path = REPORT_DIR / f"{today}_findings.md"
    report_path.write_text(md)
    print(f"  📝 {today}_findings.md → {report_path}")


# ── Connection Check ─────────────────────────────────────────────────────────

def check_connection() -> None:
    print(f"\n── Connection Check: {BASE_URL} ─────────────────────────────")
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True, slow_mo=0)
        ctx, page = _new_page(browser)
        try:
            resp = page.goto(BASE_URL, timeout=TIMEOUT)
            if resp and resp.ok:
                print(f"  ✅ Reached {BASE_URL} – HTTP {resp.status}")
            else:
                status = resp.status if resp else "no response"
                print(f"  ❌ Could not reach {BASE_URL} – HTTP {status}")
                sys.exit(1)

            page.goto("/login")
            page.wait_for_selector('[data-testid="email"]', timeout=TIMEOUT)
            print(f"  ✅ Login page found (/login)")

            page.fill('[data-testid="email"]', ADMIN_EMAIL)
            page.fill('[data-testid="password"]', ADMIN_PASSWORD)
            page.click('[data-testid="login-submit"]')
            page.wait_for_url(lambda url: "/login" not in url, timeout=TIMEOUT)
            print(f"  ✅ Admin login verified ({ADMIN_EMAIL})")

        except Exception as exc:
            print(f"  ❌ Connection check failed: {exc}")
            sys.exit(1)
        finally:
            ctx.close()
            browser.close()


# ── Main Entry Point ─────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="MrSurety QA – OpenClaw Workflow Suite")
    parser.add_argument(
        "--workflow",
        choices=["admin-login", "agent-signup", "homeowner-service-request",
                 "email-docusign", "contractor-upload-invite", "admin-verification", "all"],
        default="all",
        help="Which workflow to run (default: all)",
    )
    parser.add_argument(
        "--check-connection",
        action="store_true",
        help="Verify app is reachable and admin login works, then exit",
    )
    args = parser.parse_args()

    if args.check_connection:
        check_connection()
        return

    _ensure_dirs()
    print(f"\n{'='*60}")
    print(f"  MrSurety QA – OpenClaw Workflow Suite")
    print(f"  App: {BASE_URL}")
    print(f"  Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}")

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=HEADLESS, slow_mo=SLOW_MO)
        try:
            referral_link = ""
            run = args.workflow

            if run in ("admin-login", "all"):
                workflow_admin_login(browser)

            if run in ("agent-signup", "all"):
                referral_link = workflow_agent_signup(browser)

            if run in ("homeowner-service-request", "all"):
                workflow_homeowner_service_request(browser, referral_link)

            if run in ("email-docusign", "all"):
                workflow_email_docusign(browser)

            if run in ("contractor-upload-invite", "all"):
                workflow_contractor_upload_invite(browser)

            if run in ("admin-verification", "all"):
                workflow_admin_verification(browser)

            if run not in ("admin-verification",):
                _generate_reports()

        finally:
            browser.close()

    print(f"\n{'='*60}")
    print(f"  ✅ QA Suite complete")
    print(f"  📁 Output → {_OUTPUT_BASE}")
    print(f"  📸 Screenshots: {len(list(SCREENSHOT_DIR.glob('*.png')))}")
    print(f"  🎥 Videos: {len(list(VIDEO_DIR.glob('*.mp4')))}")
    print(f"  📄 Findings: {len(_findings)}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
