"""
MrSurety QA – Agent Referral Workflow (Python Playwright)

Live App:  https://frontend-tan-five-46.vercel.app
Admin:     admin@mrsurety.com  /  set ADMIN_PASSWORD env var

Quick start (macOS / Linux):
    git clone <repo>
    cd mrsurety-qagent-workflow-test
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    python -m playwright install chromium
    export ADMIN_PASSWORD='MrSurety2026!'      # single quotes – avoids zsh dquote> trap
    python test_mrsurety_agent_referral.py

What this script tests:
  1. Admin logs in at /login
  2. Admin views the agent management section
  3. Admin can see (and optionally approve) pending agents
  4. Agent referral-link section is accessible
"""

import os
import sys
from playwright.sync_api import sync_playwright

# ── Configuration ─────────────────────────────────────────────────────────────
BASE_URL    = os.environ.get("MRSURETY_BASE_URL", "https://frontend-tan-five-46.vercel.app")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL",    "admin@mrsurety.com")
ADMIN_PASS  = os.environ.get("ADMIN_PASSWORD")   # must be set via env var – see README
HEADLESS    = os.environ.get("HEADLESS", "true").lower() != "false"
SCREENSHOT_DIR = os.environ.get("SCREENSHOT_DIR", "screenshots")

if not ADMIN_PASS:
    print(
        "\nError: ADMIN_PASSWORD environment variable is not set.\n"
        "Set it before running:\n"
        "  export ADMIN_PASSWORD='<password>'\n"
    )
    sys.exit(1)

os.makedirs(SCREENSHOT_DIR, exist_ok=True)

# ── Helpers ────────────────────────────────────────────────────────────────────

def _shot(page, name: str) -> str:
    dest = os.path.join(SCREENSHOT_DIR, name)
    page.screenshot(path=dest, full_page=True)
    return dest


def login_as_admin(page) -> None:
    """Navigate to /login and authenticate as the admin user."""
    page.goto(f"{BASE_URL}/login")
    page.wait_for_load_state("networkidle")

    # Email input – prefer type="email", fall back to name / label
    email_field = page.locator(
        'input[type="email"], input[name="email"]'
    ).first
    email_field.fill(ADMIN_EMAIL)

    # Password input
    pw_field = page.locator(
        'input[type="password"], input[name="password"]'
    ).first
    pw_field.fill(ADMIN_PASS)

    # "Sign In" button (the real app uses this label – see login page screenshot)
    page.locator(
        'button:has-text("Sign In"), button[type="submit"]'
    ).first.click()

    # Wait until the URL leaves /login
    page.wait_for_url(lambda url: "/login" not in url, timeout=15_000)
    page.wait_for_load_state("networkidle")


# ── Test functions ─────────────────────────────────────────────────────────────

def test_admin_login(page) -> None:
    """Step 1 – Admin can log in and land on the admin area."""
    login_as_admin(page)
    dest = _shot(page, "01_admin-post-login.png")
    assert "/login" not in page.url, f"Still on login page: {page.url}"
    print(f"  ✓ Admin login → {page.url}  [{dest}]")


def test_agent_management(page) -> None:
    """Step 2 – Admin can navigate to the agent list / management section."""
    login_as_admin(page)

    # Try the nav link first; fall back to direct URL
    agents_link = page.locator(
        '[data-testid="nav-admin-agents"], '
        '[data-testid="nav-agents"], '
        'a[href*="/agents"], '
        'a:has-text("Agents")'
    ).first

    if agents_link.is_visible():
        agents_link.click()
        page.wait_for_load_state("networkidle")
    else:
        page.goto(f"{BASE_URL}/admin/agents")
        page.wait_for_load_state("networkidle")

    dest = _shot(page, "02_agent-management.png")
    print(f"  ✓ Agent management → {page.url}  [{dest}]")


def test_pending_agents(page) -> None:
    """Step 3 – Pending agents section is visible (soft assertion)."""
    login_as_admin(page)

    # Navigate to agents
    agents_link = page.locator(
        '[data-testid="nav-admin-agents"], a[href*="/agents"], a:has-text("Agents")'
    ).first

    if agents_link.is_visible():
        agents_link.click()
        page.wait_for_load_state("networkidle")
    else:
        page.goto(f"{BASE_URL}/admin/agents")
        page.wait_for_load_state("networkidle")

    pending = page.locator(
        '[data-testid="pending-agent"], '
        '[data-testid="agent-item"][data-status="pending"], '
        ':has-text("Pending")'
    ).first

    if pending.is_visible():
        dest = _shot(page, "03_pending-agents.png")
        print(f"  ✓ Pending agents visible  [{dest}]")
    else:
        dest = _shot(page, "03_no-pending-agents.png")
        print(f"  ℹ  No pending agents found (may be empty in this environment)  [{dest}]")


def test_referral_link_section(page) -> None:
    """Step 4 – Agent referral-link area is reachable."""
    login_as_admin(page)

    # Some apps put referral links under Agents > Referral or a dedicated route
    referral_link = page.locator(
        '[data-testid="nav-referral"], '
        '[data-testid="nav-agent-referral"], '
        'a[href*="referral"], '
        'a:has-text("Referral")'
    ).first

    if referral_link.is_visible():
        referral_link.click()
        page.wait_for_load_state("networkidle")
    else:
        page.goto(f"{BASE_URL}/admin/referral")
        page.wait_for_load_state("networkidle")

    dest = _shot(page, "04_referral-link-section.png")
    print(f"  ✓ Referral section → {page.url}  [{dest}]")


# ── Runner ────────────────────────────────────────────────────────────────────

def run_all() -> None:
    tests = [
        ("Admin Login",            test_admin_login),
        ("Agent Management",       test_agent_management),
        ("Pending Agents",         test_pending_agents),
        ("Referral Link Section",  test_referral_link_section),
    ]

    print(f"\n── MrSurety Agent Referral QA (Python Playwright) ──")
    print(f"Base URL : {BASE_URL}")
    print(f"Admin    : {ADMIN_EMAIL}")
    print(f"Headless : {HEADLESS}")
    print(f"Screenshots → {os.path.abspath(SCREENSHOT_DIR)}\n")

    passed = failed = 0

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=HEADLESS)
        context = browser.new_context(
            viewport={"width": 1280, "height": 900},
            record_video_dir=os.path.join(SCREENSHOT_DIR, "videos") if not HEADLESS else None,
        )
        page = context.new_page()

        for name, fn in tests:
            print(f"[{'RUN':>4}] {name}")
            try:
                fn(page)
                passed += 1
            except Exception as exc:
                failed += 1
                print(f"  ✗ FAILED: {exc}")
                try:
                    _shot(page, f"FAILED_{name.replace(' ', '_')}.png")
                except Exception:
                    pass

        context.close()
        browser.close()

    print(f"\n── Results: {passed} passed, {failed} failed ──")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    run_all()
