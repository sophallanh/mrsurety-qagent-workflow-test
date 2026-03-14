/**
 * Platform Spec V4.3 Cross-Check
 *
 * Pure content tests — no browser required.
 * Validates that SERVICE_FORM_GUIDE.md captures the complete V4.3 platform spec
 * ("MR SURETY – COMPLETE PLATFORM SPECIFICATION V4.3") and confirms it is fully
 * consistent with the Assessment Option added in March 2026.
 *
 * Covers:
 *   §A – V4.3 Pricing Rules (6 components + markups)
 *   §B – V4.3 Four Pricing Scenarios (device/software combinations)
 *   §C – V4.3 Reference Numbers (Scenario 1 contractor + retail totals)
 *   §D – V4.3 Job Flow (12 steps – installation path)
 *   §E – V4.3 DocuSign Documents (contractor vs homeowner price separation)
 *   §F – V4.3 Email Pricing Content (estimate + final invoice)
 *   §G – Assessment Option Consistency (8 compatibility rules)
 *   §H – Service Fee Isolation ($95 installation only; assessment billed separately)
 *   §I – Markup Math Verification (cross-check arithmetic from V4.3)
 *
 * Run via: npm run test:platform-v43-crosscheck
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Load the guide once for all tests
// ---------------------------------------------------------------------------
const GUIDE_PATH = path.join(
  __dirname,
  '../../qa/spec-docs/service-form/SERVICE_FORM_GUIDE.md'
);

let guide: string;

test.beforeAll(() => {
  guide = fs.readFileSync(GUIDE_PATH, 'utf8');
});

// ===========================================================================
// §A – V4.3 PRICING RULES
// ===========================================================================
test.describe('§A – V4.3 Pricing Rules', () => {
  test('V4.3 cross-reference section is present', () => {
    expect(guide).toContain('V4.3 Platform Spec Cross-Reference');
  });

  test('Parts markup is +35% (×1.35)', () => {
    const idx = guide.indexOf('V4.3 Pricing Rules');
    const section = guide.slice(idx, idx + 1200);
    expect(section).toContain('Parts');
    expect(section).toContain('+35%');
  });

  test('Pressure Reducer markup is +35% (×1.35)', () => {
    const idx = guide.indexOf('V4.3 Pricing Rules');
    const section = guide.slice(idx, idx + 1200);
    expect(section).toContain('Pressure Reducer');
    expect(section).toContain('+35%');
  });

  test('Device markup is +0% (pass-through)', () => {
    const idx = guide.indexOf('V4.3 Pricing Rules');
    const section = guide.slice(idx, idx + 1200);
    expect(section).toContain('Device');
    expect(section).toContain('+0%');
  });

  test('Software Setup markup is +25% (×1.25)', () => {
    const idx = guide.indexOf('V4.3 Pricing Rules');
    const section = guide.slice(idx, idx + 1200);
    expect(section).toContain('Software Setup');
    expect(section).toContain('+25%');
  });

  test('Labor markup is +25% (×1.25)', () => {
    const idx = guide.indexOf('V4.3 Pricing Rules');
    const section = guide.slice(idx, idx + 1200);
    expect(section).toContain('Labor');
    expect(section).toContain('+25%');
  });

  test('Service Fee is $95 flat', () => {
    const idx = guide.indexOf('V4.3 Pricing Rules');
    const section = guide.slice(idx, idx + 1200);
    expect(section).toContain('Service Fee');
    expect(section).toContain('$95 flat');
  });

  test('Note: $95 Service Fee applies only to installation, not assessment', () => {
    const idx = guide.indexOf('V4.3 Pricing Rules');
    const section = guide.slice(idx, idx + 1400);
    expect(section).toContain('only to installation requests');
    expect(section).toContain('not to assessment requests');
  });

  test('Assessment fee is $185 base + $0.75/mile (separate from $95)', () => {
    const idx = guide.indexOf('V4.3 Pricing Rules');
    const section = guide.slice(idx, idx + 1400);
    expect(section).toContain('$185');
    expect(section).toContain('$0.75/mile');
  });
});

// ===========================================================================
// §B – V4.3 FOUR PRICING SCENARIOS
// ===========================================================================
test.describe('§B – V4.3 Four Pricing Scenarios', () => {
  test('Four scenarios section is present', () => {
    expect(guide).toContain('Four Pricing Scenarios');
  });

  test('Scenario 1: With Device + With Software', () => {
    expect(guide).toContain('Scenario 1: With Device + With Software');
  });

  test('Scenario 2: With Device + No Software', () => {
    expect(guide).toContain('Scenario 2: With Device + No Software');
  });

  test('Scenario 3: No Device + With Software', () => {
    expect(guide).toContain('Scenario 3: No Device + With Software');
  });

  test('Scenario 4: No Device + No Software', () => {
    expect(guide).toContain('Scenario 4: No Device + No Software');
  });

  test('All four scenarios show contractor and retail price columns', () => {
    const idx = guide.indexOf('Four Pricing Scenarios');
    const section = guide.slice(idx, idx + 5000);
    expect(section).toContain('Contractor Price');
    expect(section).toContain('Retail Price');
  });
});

// ===========================================================================
// §C – V4.3 REFERENCE NUMBERS (Scenario 1 full calculation)
// ===========================================================================
test.describe('§C – V4.3 Reference Numbers (Scenario 1 Full Calculation)', () => {
  test('Parts contractor $260.00 → retail $351.00', () => {
    const idx = guide.indexOf('Scenario 1: With Device + With Software');
    const section = guide.slice(idx, idx + 800);
    expect(section).toContain('$260.00');
    expect(section).toContain('$351.00');
  });

  test('Pressure Reducer contractor $310.00 → retail $418.50', () => {
    const idx = guide.indexOf('Scenario 1: With Device + With Software');
    const section = guide.slice(idx, idx + 800);
    expect(section).toContain('$310.00');
    expect(section).toContain('$418.50');
  });

  test('Device contractor $599.99 → retail $599.99 (0% markup)', () => {
    const idx = guide.indexOf('Scenario 1: With Device + With Software');
    const section = guide.slice(idx, idx + 800);
    const count = (section.match(/\$599\.99/g) || []).length;
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('Software Setup contractor $75.00 → retail $93.75', () => {
    const idx = guide.indexOf('Scenario 1: With Device + With Software');
    const section = guide.slice(idx, idx + 800);
    expect(section).toContain('$75.00');
    expect(section).toContain('$93.75');
  });

  test('Labor contractor $525.00 → retail $656.25', () => {
    const idx = guide.indexOf('Scenario 1: With Device + With Software');
    const section = guide.slice(idx, idx + 800);
    expect(section).toContain('$525.00');
    expect(section).toContain('$656.25');
  });

  test('Scenario 1 subtotal $2,119.49', () => {
    expect(guide).toContain('$2,119.49');
  });

  test('Scenario 1 Service Fee $95.00', () => {
    const idx = guide.indexOf('Scenario 1: With Device + With Software');
    const section = guide.slice(idx, idx + 800);
    expect(section).toContain('$95.00');
  });

  test('Scenario 1 Tax (7.75%) $171.62', () => {
    expect(guide).toContain('$171.62');
  });

  test('Scenario 1 homeowner TOTAL $2,386.11', () => {
    expect(guide).toContain('$2,386.11');
  });

  test('Scenario 1 contractor TOTAL $1,769.99', () => {
    expect(guide).toContain('$1,769.99');
  });

  test('Scenario 2 homeowner TOTAL $2,285.10', () => {
    expect(guide).toContain('$2,285.10');
  });

  test('Scenario 3 homeowner TOTAL $1,739.62', () => {
    expect(guide).toContain('$1,739.62');
  });

  test('Scenario 4 homeowner TOTAL $1,638.62 (V4.3 value; V4.4 corrected to $1,638.61)', () => {
    // V4.3 documented $1,638.62. A rounding correction in V4.4 produced $1,638.61.
    // This test validates the V4.3 cross-reference section preserves the original spec value.
    expect(guide).toContain('$1,638.62');
  });
});

// ===========================================================================
// §D – V4.3 JOB FLOW (12 STEPS – INSTALLATION PATH)
// ===========================================================================
test.describe('§D – V4.3 Job Flow (12 Steps)', () => {
  test('Job Flow section is present', () => {
    expect(guide).toContain('V4.3 Job Flow');
  });

  test('Step 1: Homeowner submits request', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('Homeowner');
    expect(section).toContain('Submits request');
  });

  test('Step 2: System calculates pressure/cord/pipe', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('25 ft cord');
  });

  test('Step 3: System notifies nearby contractors', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('Notifies nearby contractors');
  });

  test('Step 4: Contractor bids with 5 reference prices', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('Bids with prices');
    expect(section).toContain('parts $260');
    expect(section).toContain('pressure $310');
    expect(section).toContain('$599.99');
    expect(section).toContain('software $75');
    expect(section).toContain('labor $525');
  });

  test('Step 5: System applies markups, adds $95 fee, calculates tax', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('Applies markups');
    expect(section).toContain('$95 fee');
  });

  test('Step 6: Homeowner approves and pays 10% deposit', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('10% deposit');
  });

  test('Step 7: Contractor checks in via GPS', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('GPS');
  });

  test('Step 8: Contractor uploads photos/invoice', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('uploads photos');
  });

  test('Step 9: Contractor signs Affidavit + Conditional Lien Release', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('Affidavit');
    expect(section).toContain('Conditional Lien Release');
  });

  test('Step 10: Admin approves and releases payment', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('Admin');
    expect(section).toContain('Approves, releases payment');
  });

  test('Step 11: System sends Unconditional Lien Release after payment clears', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('Unconditional Lien Release');
  });

  test('Step 12: System generates certificate, emails homeowner + agent', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    expect(section).toContain('Generates certificate');
    expect(section).toContain('emails homeowner + agent');
  });

  test('Job flow has exactly 12 steps', () => {
    const idx = guide.indexOf('V4.3 Job Flow');
    const section = guide.slice(idx, idx + 2500);
    const rows = section.split('\n').filter(line =>
      /^\| \d{1,2}\s*\|/.test(line)
    );
    expect(rows.length).toBe(12);
  });
});

// ===========================================================================
// §E – V4.3 DOCUSIGN DOCUMENTS
// ===========================================================================
test.describe('§E – V4.3 DocuSign Documents', () => {
  test('DocuSign Documents section is present', () => {
    expect(guide).toContain('V4.3 DocuSign Documents');
  });

  test('Work Order document is listed and goes to Contractor', () => {
    const idx = guide.indexOf('V4.3 DocuSign Documents');
    const section = guide.slice(idx, idx + 1500);
    expect(section).toContain('Work Order');
    expect(section).toContain('Contractor');
  });

  test('Work Order shows only contractor prices (not retail)', () => {
    const idx = guide.indexOf('V4.3 DocuSign Documents');
    const section = guide.slice(idx, idx + 1500);
    expect(section).toContain('Contractor prices only');
  });

  test('Affidavit of Service document is listed', () => {
    const idx = guide.indexOf('V4.3 DocuSign Documents');
    const section = guide.slice(idx, idx + 1500);
    expect(section).toContain('Affidavit of Service');
  });

  test('Conditional Lien Release document is listed with contractor prices', () => {
    const idx = guide.indexOf('V4.3 DocuSign Documents');
    const section = guide.slice(idx, idx + 1500);
    expect(section).toContain('Conditional Lien Release');
    expect(section).toContain('$1,769.99');
  });

  test('Contractors never see the $95 Service Fee in DocuSign', () => {
    const idx = guide.indexOf('V4.3 DocuSign Documents');
    const section = guide.slice(idx, idx + 1500);
    expect(section).toContain('never');
    expect(section).toContain('$95 Service Fee');
  });

  test('Affidavit mentions penalty of perjury', () => {
    const idx = guide.indexOf('V4.3 DocuSign Documents');
    const section = guide.slice(idx, idx + 1500);
    expect(section).toContain('penalty of perjury');
  });
});

// ===========================================================================
// §F – V4.3 EMAIL PRICING CONTENT
// ===========================================================================
test.describe('§F – V4.3 Email Pricing Content', () => {
  test('V4.3 Email Pricing Content section is present', () => {
    expect(guide).toContain('V4.3 Email Pricing Content');
  });

  test('Estimate email subject: "Estimate Selected – Deposit Required"', () => {
    expect(guide).toContain('Estimate Selected');
    expect(guide).toContain('Deposit Required');
  });

  test('Estimate email shows TOTAL $2,386.11', () => {
    const idx = guide.indexOf('Estimate Selected');
    const section = guide.slice(idx, idx + 600);
    expect(section).toContain('$2,386.11');
  });

  test('Estimate email shows Deposit Required (10%): $238.61', () => {
    expect(guide).toContain('$238.61');
  });

  test('Final Invoice email subject', () => {
    expect(guide).toContain('Final Invoice');
  });

  test('Final Invoice shows TOTAL PAID $2,386.11', () => {
    const idx = guide.indexOf('Final Invoice');
    const section = guide.slice(idx, idx + 600);
    expect(section).toContain('$2,386.11');
  });

  test('Final Invoice shows Deposit $238.61 and Final Payment $2,147.50', () => {
    expect(guide).toContain('$238.61');
    expect(guide).toContain('$2,147.50');
  });

  test('Estimate email includes Service Fee $95.00', () => {
    const idx = guide.indexOf('Estimate Selected');
    const section = guide.slice(idx, idx + 600);
    expect(section).toContain('$95.00');
  });

  test('Estimate email includes Tax $171.62', () => {
    const idx = guide.indexOf('Estimate Selected');
    const section = guide.slice(idx, idx + 600);
    expect(section).toContain('$171.62');
  });
});

// ===========================================================================
// §G – ASSESSMENT OPTION CONSISTENCY (8 RULES)
// ===========================================================================
test.describe('§G – Assessment Option Consistency Notes', () => {
  test('Assessment Option Consistency section is present', () => {
    expect(guide).toContain('Assessment Option Consistency');
  });

  test('$95 Service Fee unchanged for installation', () => {
    const idx = guide.indexOf('Assessment Option Consistency');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('$95 Service Fee on all installation jobs');
    expect(section).toContain('Unchanged');
  });

  test('10% deposit for installation unchanged', () => {
    const idx = guide.indexOf('Assessment Option Consistency');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('10% deposit for installation');
    expect(section).toContain('Unchanged');
  });

  test('Contractor sees only their prices (not retail) — unchanged', () => {
    const idx = guide.indexOf('Assessment Option Consistency');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('Contractor sees only their prices');
    expect(section).toContain('Unchanged');
  });

  test('Homeowner sees only retail prices (not contractor) — unchanged', () => {
    const idx = guide.indexOf('Assessment Option Consistency');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('Homeowner sees only retail prices');
    expect(section).toContain('Unchanged');
  });

  test('Markup rules for installation unchanged (×1.35, ×1.00, ×1.25)', () => {
    const idx = guide.indexOf('Assessment Option Consistency');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('×1.35');
    expect(section).toContain('×1.00');
    expect(section).toContain('×1.25');
    expect(section).toContain('Unchanged');
  });

  test('DocuSign Work Order + Affidavit + Conditional Lien Release unchanged', () => {
    const idx = guide.indexOf('Assessment Option Consistency');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('Work Order');
    expect(section).toContain('Affidavit');
    expect(section).toContain('Conditional Lien Release');
    expect(section).toContain('Unchanged');
  });

  test('Pipe size logic unchanged (used for installation only)', () => {
    const idx = guide.indexOf('Assessment Option Consistency');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('Pipe size logic');
    expect(section).toContain('Unchanged');
  });

  test('Pressure reducer if >5 years old unchanged (used for installation only)', () => {
    const idx = guide.indexOf('Assessment Option Consistency');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('Pressure reducer if >5 years old');
    expect(section).toContain('Unchanged');
  });
});

// ===========================================================================
// §H – SERVICE FEE ISOLATION
// ===========================================================================
test.describe('§H – Service Fee Isolation ($95 Installation vs Assessment Billing)', () => {
  test('$95 Service Fee is documented in pricing rules', () => {
    expect(guide).toContain('$95 flat');
  });

  test('Assessment billing is $185 base + $0.75/mile (independent of $95)', () => {
    expect(guide).toContain('$185');
    expect(guide).toContain('$0.75');
  });

  test('Assessment invoiced at full fee upfront (no deposit model)', () => {
    const idx = guide.indexOf('Assessment Option Consistency');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('full fee');
    expect(section).toContain('upfront');
  });

  test('assessment_requests table stores base_fee 185.00 and mileage_fee separately', () => {
    expect(guide).toContain('base_fee');
    expect(guide).toContain('185.00');
    expect(guide).toContain('mileage_fee');
  });

  test('Assessment path has no contractor bidding (technician assigned instead)', () => {
    const idx = guide.indexOf('Assessment Option Consistency');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('no contractor');
    expect(section).toContain('technician assigned');
  });
});

// ===========================================================================
// §I – MARKUP MATH VERIFICATION (Cross-check arithmetic from V4.3)
// ===========================================================================
test.describe('§I – Markup Math Verification', () => {
  test('Parts: $260 × 1.35 = $351.00 is documented', () => {
    expect(guide).toContain('$260');
    expect(guide).toContain('$351');
  });

  test('Pressure: $310 × 1.35 = $418.50 is documented', () => {
    expect(guide).toContain('$310');
    expect(guide).toContain('$418.50');
  });

  test('Device: $599.99 × 1.00 = $599.99 (pass-through) is documented', () => {
    const count = (guide.match(/\$599\.99/g) || []).length;
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('Software: $75 × 1.25 = $93.75 is documented', () => {
    expect(guide).toContain('$75');
    expect(guide).toContain('$93.75');
  });

  test('Labor: $525 × 1.25 = $656.25 is documented', () => {
    expect(guide).toContain('$525');
    expect(guide).toContain('$656.25');
  });

  test('Subtotal Scenario 1: $351+$418.50+$599.99+$93.75+$656.25 = $2,119.49', () => {
    expect(guide).toContain('$2,119.49');
  });

  test('Tax rate 7.75% is documented', () => {
    expect(guide).toContain('7.75%');
  });

  test('Contractor total (Scenario 1): $260+$310+$599.99+$75+$525 = $1,769.99', () => {
    expect(guide).toContain('$1,769.99');
  });

  test('Deposit (10% of $2,386.11) = $238.61 is documented', () => {
    expect(guide).toContain('$238.61');
  });

  test('Final payment ($2,386.11 − $238.61) = $2,147.50 is documented', () => {
    expect(guide).toContain('$2,147.50');
  });
});
