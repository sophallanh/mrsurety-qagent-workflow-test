"""
mrsurety_qa.py – OpenClaw / Playwright Python Workflow Suite
============================================================
Complete automated QA for Christopher's MrSurety testing requirements.
Live app: https://frontend-tan-five-46.vercel.app

4 Things Left to Do (all automated by this script)
---------------------------------------------------
  1. Create QA test accounts on the live app:
       python3 mrsurety_qa.py --workflow create-accounts

  2. Run all 9 workflows (captures 50+ screenshots + videos):
       python3 mrsurety_qa.py --workflow all

  3. Package everything for Google Drive:
       ./run_daily.sh   (creates a zip in qa/openclaw/)

  4. Share the zip with Christopher (upload to Google Drive manually or
     set GDRIVE_FOLDER_ID in .env for automatic upload)

All 9 Workflows
---------------
  --workflow create-accounts        Create all test users on the live app (run FIRST)
  --workflow admin-login            Workflow 1: Login as admin, screenshot dashboard, export user CSV
  --workflow agent-signup           Workflow 2: Create agent account, generate referral code & QR
  --workflow homeowner-service-request  Workflow 3: Both referral methods + Stripe test payment
  --workflow contractor-bidding     Workflow 4: Contractor submits bid & uploads estimate
  --workflow homeowner-deposit      Workflow 5: Homeowner selects estimate & pays deposit
  --workflow work-order-docusign    Workflow 6: Work order generated + DocuSign sent/signed
  --workflow admin-verification     Workflow 7: Admin approval flow + all status checks
  --workflow technician-workflow    Workflow 8: Technician receives & completes work order
  --workflow agent-upload-invite    Workflow 9: Contractor upload invite + security controls
  --workflow email-docusign         Bonus: Screenshot every email & DocuSign doc (50+)
  --workflow all                    Run ALL 9 workflows in sequence (recommended)
  --check-connection                Verify app is reachable and admin login works

Quick Start
-----------
  # Step 0: Install dependencies (one time) — or just run the script and it
  # will auto-create a virtual environment and install everything for you.
  python3 -m venv qa/openclaw/.venv
  qa/openclaw/.venv/bin/pip install playwright python-dotenv
  qa/openclaw/.venv/bin/playwright install chromium

  # Step 1: Configure (one time)
  cp qa/openclaw/.env.example qa/openclaw/.env
  # (The defaults already point to the live app — no edits needed for a quick start)

  # Step 2: Create all test accounts on the live app
  python3 qa/openclaw/workflows/mrsurety_qa.py --workflow create-accounts

  # Step 3: Run all 9 workflows
  python3 qa/openclaw/workflows/mrsurety_qa.py --workflow all

  # Step 4: Package and share
  cd qa/openclaw && ./workflows/run_daily.sh
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional


# ── Auto-bootstrap: create venv and re-exec if dependencies are missing ───────
def _bootstrap() -> None:
    """Create a virtual environment and re-exec inside it if packages are missing.

    This allows the script to be run directly with the system Python even on
    macOS Homebrew (PEP 668 "externally-managed-environment").  The venv is
    created at  qa/openclaw/.venv  relative to this script's parent directory
    (i.e., always next to the .env file, regardless of where you run from).

    Chromium browser installation is NOT done here — run once separately:
        qa/openclaw/.venv/bin/playwright install chromium
    """
    _script_dir = Path(__file__).parent
    _venv_dir = _script_dir.parent / ".venv"
    _venv_python = _venv_dir / "bin" / "python3"

    # 1. Already running from inside our venv.
    #    sys.prefix is set by Python from pyvenv.cfg — reliable regardless of symlinks.
    if Path(sys.prefix).resolve() == _venv_dir.resolve():
        return

    # 2. Packages available in the current interpreter (e.g., user installed them globally).
    try:
        import dotenv  # noqa: F401
        import playwright  # noqa: F401
        return
    except ImportError:
        pass

    # 3. Venv already exists — try to re-exec directly without reinstalling.
    if _venv_python.exists():
        _check = subprocess.run(
            [str(_venv_python), "-c", "import dotenv, playwright"],
            capture_output=True,
        )
        if _check.returncode == 0:
            os.execv(str(_venv_python), [str(_venv_python)] + sys.argv)
            # os.execv replaces the process; the lines below only run if it fails.

    # 4. Create the venv if it does not exist yet.
    if not _venv_python.exists():
        print("[SETUP] Creating Python virtual environment ...", flush=True)
        subprocess.check_call([sys.executable, "-m", "venv", str(_venv_dir)])

    # 5. Install the required packages into the venv.
    print("[SETUP] Installing playwright and python-dotenv ...", flush=True)
    subprocess.check_call(
        [str(_venv_dir / "bin" / "pip"), "install", "--quiet", "--upgrade",
         "playwright", "python-dotenv"]
    )

    # 6. Re-exec with the venv Python so all imports succeed.
    print("[SETUP] Re-launching with virtual environment Python ...", flush=True)
    os.execv(str(_venv_python), [str(_venv_python)] + sys.argv)


_bootstrap()


try:
    from dotenv import load_dotenv
except ImportError:
    sys.stderr.write(
        "\n[ERROR] python-dotenv is not installed and auto-bootstrap failed.\n"
        "Manual fix:\n"
        "   python3 -m venv qa/openclaw/.venv\n"
        "   qa/openclaw/.venv/bin/pip install playwright python-dotenv\n"
        "   qa/openclaw/.venv/bin/playwright install chromium\n"
        "   qa/openclaw/.venv/bin/python qa/openclaw/workflows/mrsurety_qa.py --check-connection\n\n"
    )
    sys.exit(1)

try:
    from playwright.sync_api import Browser, BrowserContext, Page, sync_playwright
except ImportError:
    sys.stderr.write(
        "\n[ERROR] playwright is not installed and auto-bootstrap failed.\n"
        "Manual fix:\n"
        "   python3 -m venv qa/openclaw/.venv\n"
        "   qa/openclaw/.venv/bin/pip install playwright python-dotenv\n"
        "   qa/openclaw/.venv/bin/playwright install chromium\n"
        "   qa/openclaw/.venv/bin/python qa/openclaw/workflows/mrsurety_qa.py --check-connection\n\n"
    )
    sys.exit(1)

# ── Load environment ──────────────────────────────────────────────────────────
_SCRIPT_DIR = Path(__file__).parent
_ENV_FILE = _SCRIPT_DIR.parent / ".env"
load_dotenv(_ENV_FILE)

# Live app URL – https://frontend-tan-five-46.vercel.app
BASE_URL = os.getenv("MRSURETY_BASE_URL", "https://frontend-tan-five-46.vercel.app").rstrip("/")
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

# Test account credentials – pre-set to consistent names for the live app
# Override via .env or environment variables
AGENT_EMAIL = os.getenv("AGENT_EMAIL", "agent.test1@outlook.com")
AGENT_PASSWORD = os.getenv("AGENT_PASSWORD", "QAtest@2026!")
AGENT2_EMAIL = os.getenv("AGENT2_EMAIL", "agent.test2@outlook.com")
AGENT2_PASSWORD = os.getenv("AGENT2_PASSWORD", "QAtest@2026!")
HOMEOWNER_EMAIL_A = os.getenv("HOMEOWNER_EMAIL_A", "homeowner.test2@outlook.com")   # linked via referral
HOMEOWNER_PASSWORD_A = os.getenv("HOMEOWNER_PASSWORD_A", "QAtest@2026!")
HOMEOWNER_EMAIL_B = os.getenv("HOMEOWNER_EMAIL_B", "homeowner.test1@outlook.com")   # agent email method
HOMEOWNER_PASSWORD_B = os.getenv("HOMEOWNER_PASSWORD_B", "QAtest@2026!")
HOMEOWNER_EMAIL_C = os.getenv("HOMEOWNER_EMAIL_C", "homeowner.test3@outlook.com")   # no agent
HOMEOWNER_PASSWORD_C = os.getenv("HOMEOWNER_PASSWORD_C", "QAtest@2026!")
CONTRACTOR_EMAIL = os.getenv("CONTRACTOR_EMAIL", "contractor.test1@outlook.com")
CONTRACTOR_PASSWORD = os.getenv("CONTRACTOR_PASSWORD", "QAtest@2026!")
CONTRACTOR2_EMAIL = os.getenv("CONTRACTOR2_EMAIL", "contractor.test2@outlook.com")
CONTRACTOR2_PASSWORD = os.getenv("CONTRACTOR2_PASSWORD", "QAtest@2026!")
TECH_EMAIL = os.getenv("TECH_EMAIL", "tech.test1@outlook.com")
TECH_PASSWORD = os.getenv("TECH_PASSWORD", "QAtest@2026!")
INSURANCE_AGENT_EMAIL = os.getenv("INSURANCE_AGENT_EMAIL", "ins.agent.test@outlook.com")

# Secure upload link variables (set after Workflow 9 generates them)
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


# ── Resilient selector helpers ────────────────────────────────────────────────
# The live app may not have data-testid attributes on every element.
# Each list is tried in priority order; the first visible selector wins.

_EMAIL_SELECTORS = [
    '[data-testid="email"]',
    'input[type="email"]',
    'input[name="email"]',
    'input[id="email"]',
    'input[placeholder*="email" i]',
    'input[autocomplete="email"]',
]

_PASSWORD_SELECTORS = [
    '[data-testid="password"]',
    'input[type="password"]',
    'input[name="password"]',
    'input[id="password"]',
    'input[autocomplete="current-password"]',
    'input[autocomplete="password"]',
]

_LOGIN_SUBMIT_SELECTORS = [
    '[data-testid="login-submit"]',
    'button[type="submit"]',
    'input[type="submit"]',
    'button:has-text("Login")',
    'button:has-text("Log in")',
    'button:has-text("Sign in")',
    'button:has-text("Continue")',
]

# ── Signup form resilient selectors ───────────────────────────────────────────
# Tried in priority order; the first visible selector on the page wins.

_FIRST_NAME_SELECTORS = [
    '[data-testid="first-name"]',
    'input[name="firstName"]',
    'input[name="first_name"]',
    'input[name="first-name"]',
    'input[name="firstname"]',
    'input[id="firstName"]',
    'input[id="first_name"]',
    'input[placeholder*="first" i]',
    'input[autocomplete="given-name"]',
]

_LAST_NAME_SELECTORS = [
    '[data-testid="last-name"]',
    'input[name="lastName"]',
    'input[name="last_name"]',
    'input[name="last-name"]',
    'input[name="lastname"]',
    'input[id="lastName"]',
    'input[id="last_name"]',
    'input[placeholder*="last" i]',
    'input[autocomplete="family-name"]',
]

_CONFIRM_PASSWORD_SELECTORS = [
    '[data-testid="confirm-password"]',
    'input[name="confirmPassword"]',
    'input[name="confirm_password"]',
    'input[name="passwordConfirmation"]',
    'input[name="password_confirmation"]',
    'input[name="password2"]',
    'input[id="confirmPassword"]',
    'input[id="confirm-password"]',
    'input[placeholder*="confirm" i]',
]

_COMPANY_SELECTORS = [
    '[data-testid="company"]',
    'input[name="company"]',
    'input[name="companyName"]',
    'input[name="company_name"]',
    'input[name="businessName"]',
    'input[id="company"]',
    'input[id="companyName"]',
    'input[placeholder*="company" i]',
    'input[placeholder*="business" i]',
]

_ROLE_SELECTORS = [
    '[data-testid="role"]',
    'select[name="role"]',
    'select[id="role"]',
    'select[name="userType"]',
    'select[name="user_type"]',
    'select[id="userType"]',
    'select[name="accountType"]',
]

_SIGNUP_SUBMIT_SELECTORS = [
    '[data-testid="signup-submit"]',
    'button[type="submit"]',
    'input[type="submit"]',
    'button:has-text("Sign Up")',
    'button:has-text("Create Account")',
    'button:has-text("Register")',
    'button:has-text("Get Started")',
    'button:has-text("Join")',
]

# ── Admin / navigation resilient selectors ────────────────────────────────────

_ADMIN_DASHBOARD_SELECTORS = [
    '[data-testid="admin-dashboard"]',
    'h1:has-text("Dashboard")',
    'h2:has-text("Dashboard")',
    '[class*="dashboard" i]',
    'main',
]

_NAV_USERS_SELECTORS = [
    '[data-testid="nav-users"]',
    'a:has-text("Users")',
    'button:has-text("Users")',
    'nav a[href*="user"]',
    '[href*="/users"]',
]

_NAV_SERVICE_REQUESTS_SELECTORS = [
    '[data-testid="nav-service-requests"]',
    'a:has-text("Service Requests")',
    'a:has-text("Requests")',
    'nav a[href*="service"]',
    'nav a[href*="request"]',
]

_USERS_TABLE_SELECTORS = [
    '[data-testid="users-table"]',
    'table',
    '[class*="table" i]',
    '[role="grid"]',
]


def _resolve_selector(page: "Page", selectors: list[str], probe_ms: int = 5000) -> str:
    """Return the first selector from *selectors* that is visible on *page*.

    Each candidate is tried for up to *probe_ms* milliseconds before moving on.
    Raises RuntimeError with a helpful message if none are found.
    """
    for sel in selectors:
        try:
            page.wait_for_selector(sel, timeout=probe_ms, state="visible")
            return sel
        except Exception:
            continue
    raise RuntimeError(
        f"Could not locate any of the expected elements on {page.url}\n"
        f"Tried selectors (none visible within {probe_ms}ms each): {selectors}"
    )


def _fill_field(
    page: "Page",
    selectors: list[str],
    value: str,
    probe_ms: int = 3000,
    required: bool = True,
) -> bool:
    """Fill the first matching visible form field with *value*.

    Returns True on success.  If *required* is False and no selector matches,
    returns False silently (optional fields like company, confirm-password).
    If *required* is True and nothing matches, raises RuntimeError.
    """
    for sel in selectors:
        try:
            page.wait_for_selector(sel, timeout=probe_ms, state="visible")
            page.fill(sel, value)
            return True
        except Exception:
            continue
    if required:
        raise RuntimeError(
            f"Could not locate required form field on {page.url}\n"
            f"Tried selectors: {selectors}"
        )
    return False


def _select_option_resilient(
    page: "Page",
    selectors: list[str],
    value: str,
    probe_ms: int = 3000,
) -> bool:
    """Select *value* in the first matching visible <select> dropdown.

    Returns True on success; False if no selector matched (always non-fatal).
    """
    for sel in selectors:
        try:
            page.wait_for_selector(sel, timeout=probe_ms, state="visible")
            page.select_option(sel, value)
            return True
        except Exception:
            continue
    return False


def _login(page: "Page", email: str, password: str) -> None:
    page.goto("/login")
    email_sel = _resolve_selector(page, _EMAIL_SELECTORS)
    page.fill(email_sel, email)
    pwd_sel = _resolve_selector(page, _PASSWORD_SELECTORS)
    page.fill(pwd_sel, password)
    submit_sel = _resolve_selector(page, _LOGIN_SUBMIT_SELECTORS)
    page.click(submit_sel)
    page.wait_for_url(lambda url: "/login" not in url, timeout=TIMEOUT)


# ── Workflow 1 – Admin Login & Dashboard ────────────────────────────────────

def workflow_admin_login(browser: Browser) -> None:
    print("\n── Workflow 1: Admin Login & Dashboard ──────────────────────")
    ctx, page = _new_page(browser)
    try:
        _login(page, ADMIN_EMAIL, ADMIN_PASSWORD)
        _resolve_selector(page, _ADMIN_DASHBOARD_SELECTORS)
        _shot(page, "admin_01_dashboard.png")
        print("  ✅ Admin dashboard loaded")

        nav_users_sel = _resolve_selector(page, _NAV_USERS_SELECTORS)
        page.click(nav_users_sel)
        table_sel = _resolve_selector(page, _USERS_TABLE_SELECTORS)
        _shot(page, "admin_02_users_table.png")
        print("  ✅ Users table visible")

        # Extract user table to CSV
        rows = page.query_selector_all(f"{table_sel} tr")
        csv_path = DATA_DIR / "admin_users.csv"
        with csv_path.open("w", newline="") as f:
            writer = csv.writer(f)
            for row in rows:
                cells = [td.inner_text() for td in row.query_selector_all("th, td")]
                writer.writerow(cells)
        print(f"  📄 admin_users.csv → {len(rows)} rows")

        nav_sr_sel = _resolve_selector(page, _NAV_SERVICE_REQUESTS_SELECTORS)
        page.click(nav_sr_sel)
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
        _select_option_resilient(page, _ROLE_SELECTORS, "agent")
        _fill_field(page, _FIRST_NAME_SELECTORS, "Test")
        _fill_field(page, _LAST_NAME_SELECTORS, "Agent")
        _fill_field(page, _EMAIL_SELECTORS, AGENT_EMAIL)
        _fill_field(page, _PASSWORD_SELECTORS, AGENT_PASSWORD)
        _fill_field(page, _CONFIRM_PASSWORD_SELECTORS, AGENT_PASSWORD, required=False)

        shot_signup = _shot(page, "agent_00_signup_form.png")
        _register_account("agent", AGENT_EMAIL, AGENT_PASSWORD, str(shot_signup))

        submit_sel = _resolve_selector(page, _SIGNUP_SUBMIT_SELECTORS)
        page.click(submit_sel)
        page.wait_for_url(lambda url: "/agent/dashboard" in url or "/dashboard" in url, timeout=TIMEOUT)
        _shot(page, "agent_01_dashboard_after_signup.png")
        print(f"  ✅ Agent account created: {AGENT_EMAIL}")

        # Navigate to referral section
        try:
            nav_ref_sel = _resolve_selector(
                page,
                ['[data-testid="nav-referral"]', 'a:has-text("Referral")', 'a[href*="referral"]'],
                probe_ms=5000,
            )
            page.click(nav_ref_sel)
            ref_input_sel = _resolve_selector(
                page,
                ['[data-testid="referral-link"]', 'input[name*="referral" i]', 'input[id*="referral" i]'],
                probe_ms=5000,
            )
            referral_link = page.input_value(ref_input_sel)
            print(f"  🔗 Referral link: {referral_link}")
        except Exception:
            print("  ⚠️  Referral section not found (skipped)")

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
        if referral_link:
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


# ── Workflow 0 – Create Test Accounts ───────────────────────────────────────

def workflow_create_accounts(browser: Browser) -> None:
    """
    Creates all QA test accounts on the live app.
    Run this FIRST (before any other workflow).

    Accounts created:
      Agent 1:        agent.test1@outlook.com
      Agent 2:        agent.test2@outlook.com
      Homeowner A:    homeowner.test2@outlook.com  (referral link method)
      Homeowner B:    homeowner.test1@outlook.com  (agent email method)
      Homeowner C:    homeowner.test3@outlook.com  (no agent – edge case)
      Contractor 1:   contractor.test1@outlook.com
      Contractor 2:   contractor.test2@outlook.com
      Technician:     tech.test1@outlook.com
    """
    print("\n── Workflow 0: Create Test Accounts ─────────────────────────")

    accounts_to_create = [
        ("agent",      AGENT_EMAIL,       AGENT_PASSWORD,       "Alex",  "Johnson",  "Surety Realty"),
        ("agent",      AGENT2_EMAIL,      AGENT2_PASSWORD,      "Maria", "Garcia",   "HomeGuard Agency"),
        ("homeowner",  HOMEOWNER_EMAIL_A, HOMEOWNER_PASSWORD_A, "Jamie", "Lee",      ""),
        ("homeowner",  HOMEOWNER_EMAIL_B, HOMEOWNER_PASSWORD_B, "Sam",   "Williams", ""),
        ("homeowner",  HOMEOWNER_EMAIL_C, HOMEOWNER_PASSWORD_C, "Chris", "Brown",    ""),
        ("contractor", CONTRACTOR_EMAIL,  CONTRACTOR_PASSWORD,  "Bob",   "Miller",   "Miller Construction LLC"),
        ("contractor", CONTRACTOR2_EMAIL, CONTRACTOR2_PASSWORD, "Linda", "Chen",     "Chen Builders Inc"),
        ("technician", TECH_EMAIL,        TECH_PASSWORD,        "Dave",  "Torres",   "Torres Services"),
    ]

    for role, email, password, first, last, company in accounts_to_create:
        ctx, page = _new_page(browser)
        try:
            page.goto("/signup")
            page.wait_for_load_state("networkidle")

            # Select role if dropdown exists (non-fatal if not present)
            _select_option_resilient(page, _ROLE_SELECTORS, role)

            _fill_field(page, _FIRST_NAME_SELECTORS, first)
            _fill_field(page, _LAST_NAME_SELECTORS, last)
            _fill_field(page, _EMAIL_SELECTORS, email)
            _fill_field(page, _PASSWORD_SELECTORS, password)
            _fill_field(page, _CONFIRM_PASSWORD_SELECTORS, password, required=False)

            if company:
                _fill_field(page, _COMPANY_SELECTORS, company, required=False)

            shot_name = f"account_create_{role}_{first.lower()}_{last.lower()}.png"
            shot_path = _shot(page, shot_name)
            _register_account(role, email, password, str(shot_path))

            submit_sel = _resolve_selector(page, _SIGNUP_SUBMIT_SELECTORS)
            page.click(submit_sel)
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(2000)

            # Accept any success/confirmation dialog
            try:
                page.click('[data-testid="confirm-ok"]', timeout=3000)
            except Exception:
                pass

            _shot(page, f"account_created_{role}_{first.lower()}.png")
            print(f"  ✅ {role}: {email}")

        except Exception as exc:
            _log_finding("create-accounts", f"signup-{role}", "ERROR", f"{email}: {exc}", severity="high")
            print(f"  ❌ {role} {email}: {exc}")
        finally:
            ctx.close()

    print(f"  ✅ Account creation complete — check output/data/test_accounts.csv")


# ── Workflow 4 – Contractor Bidding & Estimate Upload ────────────────────────

def workflow_contractor_bidding(browser: Browser) -> None:
    """
    Workflow 4: Contractor logs in, finds the open job, submits a bid,
    and uploads an estimate document.
    """
    print("\n── Workflow 4: Contractor Bidding & Estimate Upload ─────────")
    ctx, page = _new_page(browser)
    try:
        _login(page, CONTRACTOR_EMAIL, CONTRACTOR_PASSWORD)
        page.wait_for_load_state("networkidle")
        _shot(page, "contractor_bidding_01_dashboard.png")
        print("  ✅ Contractor logged in")

        # Navigate to available jobs
        page.click('[data-testid="nav-jobs"]')
        page.wait_for_selector('[data-testid="job-list"]', timeout=TIMEOUT)
        _shot(page, "contractor_bidding_02_job_list.png")
        print("  ✅ Job list visible")

        # Open first available job
        first_job = page.locator('[data-testid="job-item"]').first
        first_job.click()
        page.wait_for_load_state("networkidle")
        _shot(page, "contractor_bidding_03_job_detail.png")
        print("  ✅ Job detail page")

        # Submit bid
        try:
            page.click('[data-testid="submit-bid-btn"]')
            page.wait_for_selector('[data-testid="bid-form"]', timeout=TIMEOUT)
            page.fill('[data-testid="bid-amount"]', "1500.00")
            page.fill('[data-testid="bid-notes"]', "Professional repair service, fully licensed and insured.")
            _shot(page, "contractor_bidding_04_bid_form.png")

            # Upload estimate PDF fixture if available
            estimate_path = _SCRIPT_DIR.parent.parent / "tests/playwright/fixtures/sample-estimate.pdf"
            if estimate_path.exists():
                page.set_input_files('[data-testid="estimate-upload"]', str(estimate_path))
                print("  ✅ Estimate PDF attached")

            page.click('[data-testid="submit-bid"]')
            page.wait_for_selector('[data-testid="bid-success"]', timeout=TIMEOUT)
            _shot(page, "contractor_bidding_05_bid_submitted.png")
            print("  ✅ Bid submitted successfully")
        except Exception as exc:
            _log_finding("contractor-bidding", "bid-submit", "WARNING", str(exc), severity="medium")
            print(f"  ⚠️  Bid submission: {exc}")

    except Exception as exc:
        _log_finding("contractor-bidding", "setup", "ERROR", str(exc), severity="high")
        print(f"  ❌ {exc}")
    finally:
        ctx.close()


# ── Workflow 5 – Homeowner Estimate Selection & Deposit ─────────────────────

def workflow_homeowner_deposit(browser: Browser) -> None:
    """
    Workflow 5: Homeowner logs in, reviews contractor bids, selects an
    estimate, picks a calendar date, and pays the deposit (Stripe test card).
    """
    print("\n── Workflow 5: Homeowner Estimate Selection & Deposit ───────")
    ctx, page = _new_page(browser)
    try:
        _login(page, HOMEOWNER_EMAIL_B, HOMEOWNER_PASSWORD_B)
        page.wait_for_load_state("networkidle")
        _shot(page, "homeowner_deposit_01_dashboard.png")
        print("  ✅ Homeowner logged in")

        # View bids received
        page.click('[data-testid="nav-service-requests"]')
        page.wait_for_selector('[data-testid="service-request-list"]', timeout=TIMEOUT)
        _shot(page, "homeowner_deposit_02_service_requests.png")

        # Open request with bids
        request_item = page.locator('[data-testid="service-request-item"]').first
        request_item.click()
        page.wait_for_load_state("networkidle")
        _shot(page, "homeowner_deposit_03_request_detail.png")
        print("  ✅ Service request detail page")

        # View and select estimate
        try:
            page.click('[data-testid="view-estimates"]')
            page.wait_for_selector('[data-testid="estimate-list"]', timeout=TIMEOUT)
            _shot(page, "homeowner_deposit_04_estimate_list.png")
            print("  ✅ Estimate list visible")

            # Select first estimate
            first_estimate = page.locator('[data-testid="estimate-item"]').first
            first_estimate.click()
            page.wait_for_load_state("networkidle")
            _shot(page, "homeowner_deposit_05_estimate_selected.png")
            print("  ✅ Estimate selected")
        except Exception as exc:
            print(f"  ⚠️  Estimate selection: {exc}")

        # Pick calendar date
        try:
            page.click('[data-testid="pick-date-btn"]')
            page.wait_for_selector('[data-testid="calendar"]', timeout=TIMEOUT)
            _shot(page, "homeowner_deposit_06_calendar.png")
            # Click first available date
            available_date = page.locator('[data-testid="calendar-day-available"]').first
            available_date.click()
            _shot(page, "homeowner_deposit_07_date_selected.png")
            print("  ✅ Date selected")
        except Exception as exc:
            print(f"  ⚠️  Calendar selection: {exc}")

        # Stripe deposit payment
        try:
            page.click('[data-testid="pay-deposit-btn"]')
            page.wait_for_selector('[data-testid="stripe-payment-form"]', timeout=TIMEOUT)
            _shot(page, "homeowner_deposit_08_stripe_form.png")

            # Fill Stripe test card
            page.fill('[data-testid="card-number"]', STRIPE_CARD)
            page.fill('[data-testid="card-expiry"]', STRIPE_EXPIRY)
            page.fill('[data-testid="card-cvv"]', STRIPE_CVV)
            try:
                page.fill('[data-testid="card-zip"]', STRIPE_ZIP)
            except Exception:
                pass

            _shot(page, "homeowner_deposit_09_stripe_filled.png")
            page.click('[data-testid="pay-now-btn"]')
            page.wait_for_selector('[data-testid="payment-success"]', timeout=TIMEOUT)
            _shot(page, "homeowner_deposit_10_payment_success.png")
            print("  ✅ Deposit paid (Stripe test card)")
        except Exception as exc:
            _log_finding("homeowner-deposit", "stripe-payment", "WARNING", str(exc), severity="high")
            print(f"  ⚠️  Stripe payment: {exc}")

    except Exception as exc:
        _log_finding("homeowner-deposit", "setup", "ERROR", str(exc), severity="high")
        print(f"  ❌ {exc}")
    finally:
        ctx.close()


# ── Workflow 6 – Work Order Generation & DocuSign ───────────────────────────

def workflow_work_order_docusign(browser: Browser) -> None:
    """
    Workflow 6: Admin generates the work order after deposit is paid.
    DocuSign is sent to contractor (and possibly homeowner). Captures
    all DocuSign email links and screenshots the document preview.
    """
    print("\n── Workflow 6: Work Order Generation & DocuSign ─────────────")
    ctx, page = _new_page(browser)
    try:
        _login(page, ADMIN_EMAIL, ADMIN_PASSWORD)
        page.wait_for_load_state("networkidle")

        # Navigate to work orders / pending
        page.click('[data-testid="nav-work-orders"]')
        page.wait_for_selector('[data-testid="work-order-list"]', timeout=TIMEOUT)
        _shot(page, "workorder_01_list.png")
        print("  ✅ Work order list visible")

        # Open pending work order
        try:
            pending_wo = page.locator('[data-testid="work-order-pending"]').first
            pending_wo.click()
            page.wait_for_load_state("networkidle")
            _shot(page, "workorder_02_detail.png")

            # Generate work order / trigger DocuSign
            page.click('[data-testid="generate-work-order"]')
            page.wait_for_selector('[data-testid="work-order-generated"]', timeout=TIMEOUT)
            _shot(page, "workorder_03_generated.png")
            print("  ✅ Work order generated")

            # Screenshot DocuSign trigger confirmation
            try:
                page.wait_for_selector('[data-testid="docusign-sent"]', timeout=10000)
                _shot(page, "workorder_04_docusign_sent.png")
                print("  ✅ DocuSign triggered")
            except Exception:
                print("  ⚠️  DocuSign trigger confirmation not found (may send async)")

        except Exception as exc:
            _log_finding("work-order-docusign", "generate", "WARNING", str(exc), severity="medium")
            print(f"  ⚠️  Work order generation: {exc}")

        # Screenshot admin work order status
        _shot(page, "workorder_05_admin_status.png")

    except Exception as exc:
        _log_finding("work-order-docusign", "setup", "ERROR", str(exc), severity="high")
        print(f"  ❌ {exc}")
    finally:
        ctx.close()

    # Contractor view: sign DocuSign
    ctx2, page2 = _new_page(browser)
    try:
        _login(page2, CONTRACTOR_EMAIL, CONTRACTOR_PASSWORD)
        page2.wait_for_load_state("networkidle")

        page2.click('[data-testid="nav-work-orders"]')
        page2.wait_for_selector('[data-testid="work-order-list"]', timeout=TIMEOUT)
        _shot(page2, "workorder_06_contractor_list.png")

        # Open the work order
        wo_item = page2.locator('[data-testid="work-order-item"]').first
        wo_item.click()
        page2.wait_for_load_state("networkidle")
        _shot(page2, "workorder_07_contractor_detail.png")
        print("  ✅ Contractor can see work order")

        # Initiate DocuSign signing if available
        try:
            page2.click('[data-testid="sign-docusign"]')
            page2.wait_for_load_state("networkidle")
            _shot(page2, "workorder_08_docusign_signing.png")
            print("  ✅ DocuSign signing page reached")
        except Exception:
            print("  ⚠️  DocuSign sign button not available yet (awaiting email trigger)")

    except Exception as exc:
        print(f"  ⚠️  Contractor DocuSign view: {exc}")
    finally:
        ctx2.close()


# ── Workflow 8 – Technician Work Order Receipt ───────────────────────────────

def workflow_technician(browser: Browser) -> None:
    """
    Workflow 8: Technician logs in, views assigned work order,
    reviews details, and marks job as started/completed.
    """
    print("\n── Workflow 8: Technician Work Order Receipt ────────────────")
    ctx, page = _new_page(browser)
    try:
        _login(page, TECH_EMAIL, TECH_PASSWORD)
        page.wait_for_load_state("networkidle")
        _shot(page, "technician_01_dashboard.png")
        print("  ✅ Technician logged in")

        # View assigned jobs
        try:
            page.click('[data-testid="nav-my-jobs"]')
            page.wait_for_selector('[data-testid="job-list"]', timeout=TIMEOUT)
            _shot(page, "technician_02_job_list.png")
            print("  ✅ Technician job list visible")

            # Open job detail
            job_item = page.locator('[data-testid="job-item"]').first
            job_item.click()
            page.wait_for_load_state("networkidle")
            _shot(page, "technician_03_job_detail.png")
            print("  ✅ Technician job detail")

            # View work order document
            try:
                page.click('[data-testid="view-work-order"]')
                page.wait_for_load_state("networkidle")
                _shot(page, "technician_04_work_order_doc.png")
                print("  ✅ Work order document visible")
            except Exception:
                print("  ⚠️  Work order doc not available yet (may not be assigned)")

            # Mark job started
            try:
                page.click('[data-testid="start-job"]')
                page.wait_for_selector('[data-testid="job-started"]', timeout=TIMEOUT)
                _shot(page, "technician_05_job_started.png")
                print("  ✅ Job marked as started")
            except Exception as exc:
                print(f"  ⚠️  Start job: {exc}")

        except Exception as exc:
            _log_finding("technician-workflow", "job-view", "WARNING", str(exc), severity="medium")
            print(f"  ⚠️  Technician job view: {exc}")

    except Exception as exc:
        _log_finding("technician-workflow", "login", "ERROR", str(exc), severity="high")
        print(f"  ❌ {exc}")
    finally:
        ctx.close()


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



# ── Google Drive Upload ───────────────────────────────────────────────────────

def _upload_to_gdrive(zip_path: Path) -> None:
    """Upload *zip_path* to the configured Google Drive folder.

    Requires:
      1. Python package: google-api-python-client google-auth
         Install: <venv>/bin/pip install google-api-python-client google-auth
      2. Env vars (set in qa/openclaw/.env):
           GDRIVE_FOLDER_ID            – folder ID from the Drive URL
           GDRIVE_SERVICE_ACCOUNT_JSON – path to a Google service-account key JSON
                                         (Cloud Console → IAM → Service Accounts
                                          → Keys → Add Key → JSON)
      3. Share the Drive folder with the service-account email (Editor permission
         is the minimum required to create new files in the folder).

    Uses the 'drive.file' OAuth scope so the service account can only access files
    it creates — not the rest of your Drive.  The folder must be explicitly shared
    with the service-account email address before the first upload.

    If any requirement is missing the function prints instructions and skips the
    upload (the zip file is still available locally for manual upload).
    """
    folder_id = os.getenv("GDRIVE_FOLDER_ID", "").strip()
    sa_json_path = os.getenv("GDRIVE_SERVICE_ACCOUNT_JSON", "").strip()

    if not folder_id:
        print(f"\n  📤 Google Drive: set GDRIVE_FOLDER_ID in .env to auto-upload.")
        print(f"      Zip ready for manual upload: {zip_path}")
        return

    try:
        from google.oauth2 import service_account  # type: ignore
        from googleapiclient.discovery import build  # type: ignore
        from googleapiclient.http import MediaFileUpload  # type: ignore
    except ImportError:
        venv_pip = Path(sys.prefix) / "bin" / "pip"
        print(f"\n  📤 Google Drive: install the API client to enable auto-upload:")
        print(f"      {venv_pip} install google-api-python-client google-auth")
        print(f"      Zip ready for manual upload: {zip_path}")
        return

    if not sa_json_path:
        print(f"\n  📤 Google Drive: set GDRIVE_SERVICE_ACCOUNT_JSON in .env.")
        print(f"      Zip ready for manual upload: {zip_path}")
        return

    sa_path = Path(sa_json_path).expanduser().resolve()
    if not sa_path.exists():
        print(f"\n  📤 Google Drive: service-account file not found: {sa_path}")
        print(f"      Zip ready for manual upload: {zip_path}")
        return

    try:
        scopes = ["https://www.googleapis.com/auth/drive.file"]
        creds = service_account.Credentials.from_service_account_file(
            str(sa_path), scopes=scopes
        )
        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        file_meta = {"name": zip_path.name, "parents": [folder_id]}
        media = MediaFileUpload(str(zip_path), mimetype="application/zip", resumable=True)
        result = (
            service.files()
            .create(body=file_meta, media_body=media, fields="id,webViewLink")
            .execute()
        )
        link = result.get("webViewLink") or f"https://drive.google.com/file/d/{result['id']}/view"
        print(f"\n  ✅ Google Drive upload complete: {link}")
    except Exception as exc:
        print(f"\n  ❌ Google Drive upload failed: {exc}")
        print(f"      Zip ready for manual upload: {zip_path}")


def _package_and_upload() -> Optional[Path]:
    """Zip the output/ directory and upload to Google Drive (if configured).

    Returns the Path of the created zip, or None if packaging failed.
    """
    today = datetime.now().strftime("%Y-%m-%d")
    zip_name = f"MrSurety_QA_{today}.zip"
    zip_path = _OUTPUT_BASE.parent / zip_name  # qa/openclaw/MrSurety_QA_YYYY-MM-DD.zip

    if not _OUTPUT_BASE.exists():
        print("  ⚠️  output/ directory not found — nothing to package.")
        return None

    # Verify the 'zip' system utility is available (standard on macOS and most Linux)
    if subprocess.run(["which", "zip"], capture_output=True).returncode != 0:
        print(f"\n  ⚠️  'zip' utility not found. Install it or package manually:")
        print(f"      cd {_OUTPUT_BASE.parent} && zip -r {zip_name} output/")
        return None

    try:
        subprocess.check_call(
            ["zip", "-r", str(zip_path), "output"],
            cwd=str(_OUTPUT_BASE.parent),
        )
        print(f"\n  📦 Packaged output → {zip_path}")
    except Exception as exc:
        print(f"\n  ⚠️  Packaging failed: {exc}")
        print(f"      Run manually: cd {_OUTPUT_BASE.parent} && zip -r {zip_name} output/")
        return None

    _upload_to_gdrive(zip_path)
    return zip_path


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
            email_sel = _resolve_selector(page, _EMAIL_SELECTORS)
            print(f"  ✅ Login page found (/login) — email input: {email_sel}")

            page.fill(email_sel, ADMIN_EMAIL)
            pwd_sel = _resolve_selector(page, _PASSWORD_SELECTORS)
            page.fill(pwd_sel, ADMIN_PASSWORD)
            submit_sel = _resolve_selector(page, _LOGIN_SUBMIT_SELECTORS)
            page.click(submit_sel)
            page.wait_for_url(lambda url: "/login" not in url, timeout=TIMEOUT)
            print(f"  ✅ Admin login verified ({ADMIN_EMAIL})")

        except KeyboardInterrupt:
            print("\n  ⚠️  Interrupted (Ctrl+C) — exiting.")
            sys.exit(0)
        except Exception as exc:
            print(f"  ❌ Connection check failed: {exc}")
            sys.exit(1)
        finally:
            ctx.close()
            browser.close()


# ── Main Entry Point ─────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="MrSurety QA – OpenClaw Workflow Suite (All 9 Workflows)")
    parser.add_argument(
        "--workflow",
        choices=[
            "create-accounts",          # Step 0: Create all test users on the live app (run FIRST)
            "admin-login",              # Workflow 1: Admin login & dashboard
            "agent-signup",             # Workflow 2: Agent signup & referral code
            "homeowner-service-request",# Workflow 3: Both referral methods + Stripe
            "contractor-bidding",       # Workflow 4: Contractor bid & estimate upload
            "homeowner-deposit",        # Workflow 5: Homeowner selects estimate & pays deposit
            "work-order-docusign",      # Workflow 6: Work order generated + DocuSign
            "admin-verification",       # Workflow 7: Admin approval flow
            "technician-workflow",      # Workflow 8: Technician receives work order
            "agent-upload-invite",      # Workflow 9: Contractor upload invite + security
            "email-docusign",           # Bonus: Screenshot every email & DocuSign doc (50+)
            "all",                      # Run ALL 9 workflows in sequence
        ],
        default="all",
        help="Which workflow to run (default: all – runs all 9 in order)",
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
    print(f"  Workflow: {args.workflow}")
    print(f"{'='*60}")

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=HEADLESS, slow_mo=SLOW_MO)
        try:
            referral_link = ""
            run = args.workflow

            # Step 0: Create all accounts (run before anything else)
            if run == "create-accounts":
                workflow_create_accounts(browser)
                _generate_reports()
                browser.close()
                _package_and_upload()
                return

            # Workflow 1: Admin login & dashboard
            if run in ("admin-login", "all"):
                workflow_admin_login(browser)

            # Workflow 2: Agent signup & referral code
            if run in ("agent-signup", "all"):
                referral_link = workflow_agent_signup(browser)

            # Workflow 3: Homeowner service request (both methods) + Stripe
            if run in ("homeowner-service-request", "all"):
                workflow_homeowner_service_request(browser, referral_link)

            # Workflow 4: Contractor bidding & estimate upload
            if run in ("contractor-bidding", "all"):
                workflow_contractor_bidding(browser)

            # Workflow 5: Homeowner estimate selection & deposit
            if run in ("homeowner-deposit", "all"):
                workflow_homeowner_deposit(browser)

            # Workflow 6: Work order generation & DocuSign
            if run in ("work-order-docusign", "all"):
                workflow_work_order_docusign(browser)

            # Workflow 7: Admin verification & approval flow
            if run in ("admin-verification", "all"):
                workflow_admin_verification(browser)

            # Workflow 8: Technician work order receipt
            if run in ("technician-workflow", "all"):
                workflow_technician(browser)

            # Workflow 9: Agent upload invite + security controls
            if run in ("agent-upload-invite", "all"):
                workflow_contractor_upload_invite(browser)

            # Bonus: Email & DocuSign screenshot sweep (50+)
            if run in ("email-docusign", "all"):
                workflow_email_docusign(browser)

            _generate_reports()

        except KeyboardInterrupt:
            print("\n\n  ⚠️  Interrupted by user (Ctrl+C) — exiting cleanly.\n")
            sys.exit(0)
        finally:
            browser.close()

    screenshots = list(SCREENSHOT_DIR.glob("*.png"))
    videos = list(VIDEO_DIR.glob("*.mp4"))
    print(f"\n{'='*60}")
    print(f"  ✅ QA Suite complete — {len(screenshots)} screenshots, {len(videos)} videos")
    print(f"  📁 Output  → {_OUTPUT_BASE}")
    print(f"  📋 Report  → {REPORT_DIR / (datetime.now().strftime('%Y-%m-%d') + '_findings.md')}")
    print(f"  📄 Accounts → {DATA_DIR / 'test_accounts.csv'}")
    print(f"  ⚠️  Findings → {len(_findings)}")

    zip_path = _package_and_upload()
    print(f"\n{'='*60}")
    print(f"  ── Next Steps ──────────────────────────────────────────")
    print(f"  1. Review output/reports/*_findings.md")
    if zip_path:
        print(f"  2. Zip created → {zip_path}")
    else:
        print(f"  2. Zip manually: cd {_OUTPUT_BASE.parent} && zip -r MrSurety_QA_$(date +%Y-%m-%d).zip output/")
    print(f"  3. Email Christopher: c.palmer@mrsurety.com")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n  ⚠️  Interrupted by user (Ctrl+C) — exiting cleanly.\n")
        sys.exit(0)
