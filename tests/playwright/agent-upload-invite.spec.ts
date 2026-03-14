import { test, expect, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { TEST_USERS, insuranceAgent } from './fixtures/test-users';

/**
 * MrSurety QA – Agent Upload Invite System Tests
 *
 * Covers the full flow of the contractor-initiated Agent Upload Invite System:
 *
 *  Contractor side:
 *    - Sending an invite to an insurance agent via email
 *    - Viewing active invites and per-invite document counts
 *    - Revoking an invite
 *
 *  Insurance agent side (no login – secure link only):
 *    - Receiving and opening a secure upload link
 *    - Viewing the document checklist (uploaded vs still needed)
 *    - Uploading COI and endorsement files with metadata
 *    - Verifying upload restrictions (COI/endorsements only; no CSLB, W-9, bond, photo ID)
 *
 *  Security controls:
 *    - Link is locked to one specific contractor
 *    - Agent can only upload – no view, download, or delete
 *    - Revoked link returns an error/expired page
 *    - Expired (>7-day) link is rejected
 *    - Direct URL manipulation gives no access to other contractors
 *
 * ⚠️  Required environment variables before running:
 *
 *      MRSURETY_BASE_URL      – e.g. https://frontend-tan-five-46.vercel.app
 *      AGENT_UPLOAD_LINK      – Full secure upload URL extracted from the invite email
 *      REVOKED_UPLOAD_LINK    – A previously-revoked upload URL for security testing
 *      EXPIRED_UPLOAD_LINK    – An upload URL that is more than 7 days old
 *
 *      Without these vars the link-dependent tests are skipped automatically.
 */

const BASE = process.env.MRSURETY_BASE_URL ?? 'https://frontend-tan-five-46.vercel.app';

/**
 * Resolve a secure upload link from the environment, or skip the test with a
 * clear message if it hasn't been set yet.
 *
 * Usage inside a test:
 *   const link = requireEnvLink(test, 'AGENT_UPLOAD_LINK');
 */
function requireEnvLink(
  testRef: typeof test,
  envVar: string
): string {
  const value = process.env[envVar];
  if (!value) {
    testRef.skip(
      true,
      `Set the ${envVar} environment variable to the real secure upload URL before running this test. ` +
      `Example: ${envVar}=${BASE}/agent-upload/<token-from-invite-email>`
    );
    return ''; // unreachable after skip, but satisfies the return type
  }
  return value;
}

const screenshotDir = path.join(
  __dirname,
  '../..',
  'qa/screenshots/agent-upload-invite'
);

/** Sample COI PDF fixture – add sample-coi.pdf to fixtures/ before running upload tests */
const sampleCoiPath = path.join(__dirname, 'fixtures/sample-coi.pdf');
/** Sample endorsement PDF fixture – add sample-endorsement.pdf to fixtures/ before running upload tests */
const sampleEndorsementPath = path.join(__dirname, 'fixtures/sample-endorsement.pdf');

async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-submit"]');
  await expect(page).not.toHaveURL(/\/login/);
}

// ---------------------------------------------------------------------------
// 1. CONTRACTOR – Send an Invite
// ---------------------------------------------------------------------------
test.describe.serial('Contractor – Send Upload Invite to Insurance Agent', () => {
  let secureUploadLink: string;

  test('Contractor navigates to Documents page and sees Invite section', async ({
    page,
  }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-documents"]');
    await expect(
      page.locator('[data-testid="invite-agent-section"]')
    ).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '01_contractor-documents-page.png'),
    });
  });

  test('Contractor enters insurance agent email and sends invite', async ({
    page,
  }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-documents"]');
    await page.fill(
      '[data-testid="invite-agent-email"]',
      insuranceAgent.email
    );

    await page.screenshot({
      path: path.join(screenshotDir, '02_contractor-invite-email-entered.png'),
    });

    await page.click('[data-testid="send-invite-btn"]');
    await expect(
      page.locator('[data-testid="invite-sent-confirmation"]')
    ).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '03_contractor-invite-sent-confirmation.png'),
    });
  });

  test('Contractor can see the active invite in their invite list', async ({
    page,
  }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-documents"]');
    const inviteItem = page
      .locator('[data-testid="active-invite-item"]')
      .filter({ hasText: insuranceAgent.email })
      .first();
    await expect(inviteItem).toBeVisible();

    // Confirm doc-upload count is visible (initially 0)
    const docCount = inviteItem.locator('[data-testid="invite-doc-count"]');
    await expect(docCount).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '04_contractor-active-invite-list.png'),
    });
  });
});

// ---------------------------------------------------------------------------
// 2. INSURANCE AGENT – Access Secure Link and Upload Documents
// ---------------------------------------------------------------------------
test.describe.serial(
  'Insurance Agent – Access Secure Link and Upload Documents',
  () => {

    test('Insurance agent opens secure upload link (no login required)', async ({
      page,
    }) => {
      const secureLink = requireEnvLink(test, 'AGENT_UPLOAD_LINK');

      await page.goto(secureLink);

      // Should land on the upload page directly – no login redirect
      await expect(page).not.toHaveURL(/\/login/);
      await expect(
        page.locator('[data-testid="agent-upload-page"]')
      ).toBeVisible();

      await page.screenshot({
        path: path.join(screenshotDir, '05_agent-upload-page-loaded.png'),
      });
    });

    test('Agent sees document checklist with uploaded vs still-needed items', async ({
      page,
    }) => {
      const secureLink = requireEnvLink(test, 'AGENT_UPLOAD_LINK');

      await page.goto(secureLink);
      await expect(
        page.locator('[data-testid="doc-checklist"]')
      ).toBeVisible();

      // At least one "needed" item should be visible initially
      await expect(
        page.locator('[data-testid="doc-checklist-item-needed"]').first()
      ).toBeVisible();

      await page.screenshot({
        path: path.join(
          screenshotDir,
          '06_agent-doc-checklist-uploaded-vs-needed.png'
        ),
      });
    });

    test('Agent selects multiple files and assigns metadata per file', async ({
      page,
    }) => {
      const secureLink = requireEnvLink(test, 'AGENT_UPLOAD_LINK');

      // Skip if sample files not present
      const filesPresent =
        fs.existsSync(sampleCoiPath) && fs.existsSync(sampleEndorsementPath);
      if (!filesPresent) {
        test.skip(
          true,
          'Sample COI/endorsement PDFs not found in fixtures/. Add them to run this test.'
        );
      }

      await page.goto(secureLink);

      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('[data-testid="select-files-btn"]'),
      ]);
      await fileChooser.setFiles([sampleCoiPath, sampleEndorsementPath]);

      // Two file rows should appear for metadata entry
      const fileRows = page.locator('[data-testid="upload-file-row"]');
      await expect(fileRows).toHaveCount(2);

      // Fill metadata for first file (COI)
      await fileRows
        .nth(0)
        .locator('[data-testid="doc-type-select"]')
        .selectOption('COI');
      await fileRows
        .nth(0)
        .locator('[data-testid="carrier-name"]')
        .fill('State Farm');
      await fileRows
        .nth(0)
        .locator('[data-testid="effective-date"]')
        .fill('2026-01-01');

      // Fill metadata for second file (Endorsement)
      await fileRows
        .nth(1)
        .locator('[data-testid="doc-type-select"]')
        .selectOption('Endorsement');
      await fileRows
        .nth(1)
        .locator('[data-testid="carrier-name"]')
        .fill('Allstate');
      await fileRows
        .nth(1)
        .locator('[data-testid="effective-date"]')
        .fill('2026-01-01');

      await page.screenshot({
        path: path.join(
          screenshotDir,
          '07_agent-files-selected-metadata-filled.png'
        ),
      });
    });

    test('Agent clicks Upload All and files save to contractor profile', async ({
      page,
    }) => {
      const secureLink = requireEnvLink(test, 'AGENT_UPLOAD_LINK');

      const filesPresent = fs.existsSync(sampleCoiPath);
      if (!filesPresent) {
        test.skip(
          true,
          'Sample COI PDF not found in fixtures/. Add sample-coi.pdf to run this test.'
        );
      }

      await page.goto(secureLink);

      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('[data-testid="select-files-btn"]'),
      ]);
      await fileChooser.setFiles([sampleCoiPath]);

      const fileRow = page.locator('[data-testid="upload-file-row"]').first();
      await fileRow
        .locator('[data-testid="doc-type-select"]')
        .selectOption('COI');
      await fileRow.locator('[data-testid="carrier-name"]').fill('State Farm');
      await fileRow.locator('[data-testid="effective-date"]').fill('2026-01-01');

      await page.click('[data-testid="upload-all-btn"]');
      await expect(
        page.locator('[data-testid="upload-success-message"]')
      ).toBeVisible();

      await page.screenshot({
        path: path.join(screenshotDir, '08_agent-upload-success.png'),
      });
    });
  }
);

// ---------------------------------------------------------------------------
// 3. CONTRACTOR – Verify Uploads Appear and Revoke Access
// ---------------------------------------------------------------------------
test.describe('Contractor – Verify Uploads and Revoke Invite', () => {
  test('Contractor Documents page shows newly uploaded COI from agent', async ({
    page,
  }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-documents"]');
    await expect(
      page.locator('[data-testid="document-item"]').filter({ hasText: 'COI' }).first()
    ).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '09_contractor-uploaded-coi-visible.png'),
    });
  });

  test('Invite doc count increments after agent upload', async ({ page }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-documents"]');
    const inviteItem = page
      .locator('[data-testid="active-invite-item"]')
      .filter({ hasText: insuranceAgent.email })
      .first();
    const docCount = inviteItem.locator('[data-testid="invite-doc-count"]');

    // After upload the count should be > 0
    const countText = await docCount.textContent();
    expect(Number(countText?.match(/\d+/)?.[0] ?? '0')).toBeGreaterThan(0);

    await page.screenshot({
      path: path.join(screenshotDir, '10_contractor-invite-doc-count-updated.png'),
    });
  });

  test('Contractor revokes the invite', async ({ page }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-documents"]');
    const inviteItem = page
      .locator('[data-testid="active-invite-item"]')
      .filter({ hasText: insuranceAgent.email })
      .first();

    await inviteItem.locator('[data-testid="revoke-invite-btn"]').click();
    await expect(
      page.locator('[data-testid="revoke-confirm-dialog"]')
    ).toBeVisible();
    await page.click('[data-testid="revoke-confirm-yes"]');
    await expect(
      page.locator('[data-testid="invite-revoked-toast"]')
    ).toBeVisible();

    // Invite should no longer appear in the active list
    await expect(inviteItem).not.toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '11_contractor-invite-revoked.png'),
    });
  });
});

// ---------------------------------------------------------------------------
// 4. SECURITY CONTROLS
// ---------------------------------------------------------------------------
test.describe('Security – Agent Upload Invite System', () => {
  test('Revoked link shows access-denied / expired page', async ({ page }) => {
    const revokedLink = requireEnvLink(test, 'REVOKED_UPLOAD_LINK');
    await page.goto(revokedLink);
    const errorPage = page.locator(
      '[data-testid="link-revoked-page"], [data-testid="link-expired-page"]'
    );
    await expect(errorPage).toBeVisible();

    await page.screenshot({
      path: path.join(
        screenshotDir,
        'security_01_revoked-link-error-page.png'
      ),
    });
  });

  test('Expired link (>7 days) shows link-expired page', async ({ page }) => {
    const expiredLink = requireEnvLink(test, 'EXPIRED_UPLOAD_LINK');
    await page.goto(expiredLink);
    await expect(
      page.locator('[data-testid="link-expired-page"]')
    ).toBeVisible();

    await page.screenshot({
      path: path.join(
        screenshotDir,
        'security_02_expired-link-error-page.png'
      ),
    });
  });

  test('Agent cannot view or download existing contractor documents', async ({
    page,
  }) => {
    const secureLink = requireEnvLink(test, 'AGENT_UPLOAD_LINK');
    await page.goto(secureLink);
    await expect(
      page.locator('[data-testid="agent-upload-page"]')
    ).toBeVisible();

    // No download or view buttons should be present for existing docs
    await expect(
      page.locator('[data-testid="download-doc-btn"]')
    ).toHaveCount(0);
    await expect(
      page.locator('[data-testid="view-doc-btn"]')
    ).toHaveCount(0);
    await expect(
      page.locator('[data-testid="delete-doc-btn"]')
    ).toHaveCount(0);

    await page.screenshot({
      path: path.join(
        screenshotDir,
        'security_03_no-view-download-delete-buttons.png'
      ),
    });
  });

  test('Agent cannot navigate to any other contractor via URL manipulation', async ({
    page,
  }) => {
    // Attempt to access a different contractor's upload page by guessing a token
    await page.goto(`${BASE}/agent-upload/invalid-token-attempt`);
    const errorPage = page.locator(
      '[data-testid="link-invalid-page"], [data-testid="link-expired-page"]'
    );
    await expect(errorPage).toBeVisible();

    await page.screenshot({
      path: path.join(
        screenshotDir,
        'security_04_invalid-token-access-denied.png'
      ),
    });
  });
});

// ---------------------------------------------------------------------------
// 5. UPLOAD RESTRICTIONS – COI/Endorsements Only
// ---------------------------------------------------------------------------
test.describe('Upload Restrictions – Insurance Docs Only', () => {
  const restrictedDocTypes = ['CSLB Card', 'W-9', 'Bond', 'Photo ID'];
  const allowedDocTypes = ['COI', 'Endorsement'];

  test('Allowed doc types (COI, Endorsement) are available in the type dropdown', async ({
    page,
  }) => {
    const secureLink = requireEnvLink(test, 'AGENT_UPLOAD_LINK');
    const filesPresent = fs.existsSync(sampleCoiPath);
    if (!filesPresent) {
      test.skip(true, 'Add sample-coi.pdf to fixtures/ to run this test.');
    }

    await page.goto(secureLink);
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('[data-testid="select-files-btn"]'),
    ]);
    await fileChooser.setFiles([sampleCoiPath]);

    const docTypeSelect = page
      .locator('[data-testid="upload-file-row"]')
      .first()
      .locator('[data-testid="doc-type-select"]');

    for (const docType of allowedDocTypes) {
      await expect(docTypeSelect.locator(`option[value="${docType}"]`)).toBeAttached();
    }

    await page.screenshot({
      path: path.join(
        screenshotDir,
        'restriction_01_allowed-doc-types-available.png'
      ),
    });
  });

  test('Restricted doc types (CSLB, W-9, Bond, Photo ID) are NOT in the type dropdown', async ({
    page,
  }) => {
    const secureLink = requireEnvLink(test, 'AGENT_UPLOAD_LINK');
    const filesPresent = fs.existsSync(sampleCoiPath);
    if (!filesPresent) {
      test.skip(true, 'Add sample-coi.pdf to fixtures/ to run this test.');
    }

    await page.goto(secureLink);
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('[data-testid="select-files-btn"]'),
    ]);
    await fileChooser.setFiles([sampleCoiPath]);

    const docTypeSelect = page
      .locator('[data-testid="upload-file-row"]')
      .first()
      .locator('[data-testid="doc-type-select"]');

    for (const docType of restrictedDocTypes) {
      await expect(docTypeSelect.locator(`option[value="${docType}"]`)).toHaveCount(0);
    }

    await page.screenshot({
      path: path.join(
        screenshotDir,
        'restriction_02_restricted-doc-types-absent.png'
      ),
    });
  });
});

// ---------------------------------------------------------------------------
// 6. EDGE CASES
// ---------------------------------------------------------------------------
test.describe('Edge Cases – Agent Upload Invite System', () => {
  test('Contractor cannot send invite to an invalid email address', async ({
    page,
  }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-documents"]');
    await page.fill('[data-testid="invite-agent-email"]', 'not-an-email');
    await page.click('[data-testid="send-invite-btn"]');

    // Should show validation error, not send the invite
    await expect(
      page.locator('[data-testid="invite-email-error"]')
    ).toBeVisible();

    await page.screenshot({
      path: path.join(
        screenshotDir,
        'edge_01_invalid-email-validation-error.png'
      ),
    });
  });

  test('Contractor cannot send duplicate invite to the same agent email', async ({
    page,
  }) => {
    await loginAs(page, TEST_USERS.contractor.email, TEST_USERS.contractor.password);

    await page.click('[data-testid="nav-documents"]');
    // Send invite a second time to the same email
    await page.fill(
      '[data-testid="invite-agent-email"]',
      insuranceAgent.email
    );
    await page.click('[data-testid="send-invite-btn"]');

    // Should warn that an active invite already exists
    await expect(
      page.locator(
        '[data-testid="invite-duplicate-warning"], [data-testid="invite-already-active"]'
      )
    ).toBeVisible();

    await page.screenshot({
      path: path.join(
        screenshotDir,
        'edge_02_duplicate-invite-warning.png'
      ),
    });
  });

  test('Agent cannot upload when all required metadata fields are empty', async ({
    page,
  }) => {
    const secureLink = requireEnvLink(test, 'AGENT_UPLOAD_LINK');
    const filesPresent = fs.existsSync(sampleCoiPath);
    if (!filesPresent) {
      test.skip(true, 'Add sample-coi.pdf to fixtures/ to run this test.');
    }

    await page.goto(secureLink);

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('[data-testid="select-files-btn"]'),
    ]);
    await fileChooser.setFiles([sampleCoiPath]);

    // Click Upload All without filling in any metadata
    await page.click('[data-testid="upload-all-btn"]');
    await expect(
      page.locator('[data-testid="metadata-validation-error"]')
    ).toBeVisible();

    await page.screenshot({
      path: path.join(
        screenshotDir,
        'edge_03_upload-missing-metadata-error.png'
      ),
    });
  });

  test('Agent upload page shows a helpful message when zero files are selected', async ({
    page,
  }) => {
    const secureLink = requireEnvLink(test, 'AGENT_UPLOAD_LINK');
    await page.goto(secureLink);
    // Click Upload All with no files selected
    await page.click('[data-testid="upload-all-btn"]');
    await expect(
      page.locator('[data-testid="no-files-selected-error"]')
    ).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, 'edge_04_upload-no-files-error.png'),
    });
  });
});
