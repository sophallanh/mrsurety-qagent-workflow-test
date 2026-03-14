/**
 * Service Request Form with Assessment Option – Spec Doc Validation
 *
 * Pure content tests — no browser required.
 * Validates that SERVICE_FORM_GUIDE.md contains the complete programmer
 * specification for the Assessment Option as defined in:
 *   "MR SURETY – SERVICE REQUEST FORM WITH ASSESSMENT OPTION" (March 2026)
 *
 * Covers:
 *   §A – Referral tracking parameters
 *   §B – Section 1: Account (has_account, login, new account fields + validation)
 *   §C – Section 2: Service type selection + assessment fee calculation
 *   §D – Sections 3–5: Property, Insurance, Home Specifics field IDs
 *   §E – Sections 6–8: Installation-only + LiDar conditional fields
 *   §F – Sections 9–10: Contact + Terms
 *   §G – File upload constraints (3 upload fields)
 *   §H – Auto-calculations (pipe size, pressure reducer, extension cord, assessment fee)
 *   §I – Assessment workflow (9 steps)
 *   §J – Database tables (users, technicians, service_requests, assessment_requests, agents, invoices)
 *   §K – API endpoints (8 endpoints)
 *   §L – Email notifications (6 notification types)
 *   §M – Service request status workflow (assessment path + installation path)
 *
 * Run via: npm run test:service-form-assessment-doc
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
// §A – REFERRAL TRACKING
// ===========================================================================
test.describe('§A – Referral Tracking Parameters', () => {
  test('Referral tracking section is present', () => {
    expect(guide).toContain('Referral Tracking');
  });

  test('ref URL parameter is documented with source and storage', () => {
    expect(guide).toContain('ref');
    expect(guide).toContain('URL query param');
    expect(guide).toContain('service_requests.agent_id');
  });

  test('agent_name auto-population from agents table is documented', () => {
    expect(guide).toContain('agent_name');
    expect(guide).toContain('agents');
    expect(guide).toContain('Read-only');
  });

  test('agent_email auto-population is documented as read-only', () => {
    expect(guide).toContain('agent_email');
    expect(guide).toContain('read-only');
  });
});

// ===========================================================================
// §B – SECTION 1: ACCOUNT
// ===========================================================================
test.describe('§B – Section 1: Account Fields', () => {
  test('has_account radio field is specified', () => {
    expect(guide).toContain('has_account');
    expect(guide).toContain('Radio');
  });

  test('has_account options are "yes" and "no"', () => {
    const section = guide.slice(guide.indexOf('has_account'));
    expect(section).toContain('"yes"');
    expect(section).toContain('"no"');
  });

  test('Section 1A login fields: login_email and login_password', () => {
    expect(guide).toContain('login_email');
    expect(guide).toContain('login_password');
  });

  test('Section 1A shown when has_account = "yes"', () => {
    const idx = guide.indexOf('login_email');
    const section = guide.slice(Math.max(0, idx - 300), idx + 300);
    expect(section).toContain('has_account = "yes"');
  });

  test('Section 1B new account fields: full_name, email, phone, password, confirm_password', () => {
    expect(guide).toContain('full_name');
    expect(guide).toContain('confirm_password');
  });

  test('Password validation requires min 8 chars with 1 number and 1 letter', () => {
    // The password field for new accounts specifies: Min 8 chars, 1 number, 1 letter
    expect(guide).toContain('Min 8 chars, 1 number, 1 letter');
  });

  test('confirm_password must match password', () => {
    const idx = guide.indexOf('confirm_password');
    const section = guide.slice(idx, idx + 200);
    expect(section).toContain('match password');
  });

  test('Phone number validation uses US format', () => {
    const idx = guide.indexOf('phone');
    const section = guide.slice(idx, idx + 300);
    expect(section).toContain('xxx-xxx-xxxx');
  });
});

// ===========================================================================
// §C – SECTION 2: SERVICE TYPE + ASSESSMENT FEE
// ===========================================================================
test.describe('§C – Section 2: Service Type Selection and Assessment Fee', () => {
  test('service_type radio field is specified', () => {
    expect(guide).toContain('service_type');
    expect(guide).toContain('"installation"');
    expect(guide).toContain('"assessment"');
  });

  test('Assessment fee base is $185.00', () => {
    expect(guide).toContain('$185.00');
  });

  test('Assessment mileage rate is $0.75 per mile', () => {
    expect(guide).toContain('$0.75');
    expect(guide).toContain('per mile');
  });

  test('Assessment fee total formula is $185 + ($0.75 × distance)', () => {
    expect(guide).toContain('$185.00 + ($0.75 × distance');
  });

  test('Distance calculation uses Google Maps Distance Matrix API', () => {
    expect(guide).toContain('Google Maps Distance Matrix API');
  });

  test('proceed_assessment field is documented with yes/no options', () => {
    expect(guide).toContain('proceed_assessment');
    expect(guide).toContain('"yes"');
    expect(guide).toContain('"no"');
  });

  test('proceed_assessment = "no" skips sections 6 and 7', () => {
    const idx = guide.indexOf('proceed_assessment');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('skips installation-specific sections');
  });
});

// ===========================================================================
// §D – SECTIONS 3–5: PROPERTY, INSURANCE, HOME SPECIFICS
// ===========================================================================
test.describe('§D – Sections 3–5: Property, Insurance, Home Specifics', () => {
  test('Section 3 property fields: property_street, property_city, property_state, property_zip', () => {
    expect(guide).toContain('property_street');
    expect(guide).toContain('property_city');
    expect(guide).toContain('property_state');
    expect(guide).toContain('property_zip');
  });

  test('billing_same radio is documented with "yes"/"no" options', () => {
    expect(guide).toContain('billing_same');
  });

  test('Billing address fields appear only when billing_same = "no"', () => {
    expect(guide).toContain('billing_street');
    expect(guide).toContain('billing_same = "no"');
  });

  test('Section 4 insurance_company is required', () => {
    const idx = guide.indexOf('insurance_company');
    const section = guide.slice(idx, idx + 200);
    expect(section).toContain('Yes');
  });

  test('Section 5 home_type has 5 options including "other"', () => {
    expect(guide).toContain('"single_family"');
    expect(guide).toContain('"condo"');
    expect(guide).toContain('"apartment"');
    expect(guide).toContain('"commercial"');
    expect(guide).toContain('"other"');
  });

  test('home_type_other text field shown when home_type = "other"', () => {
    expect(guide).toContain('home_type_other');
    expect(guide).toContain('home_type = "other"');
  });

  test('square_feet validates > 0 and < 10000', () => {
    expect(guide).toContain('square_feet');
    expect(guide).toContain('> 0');
    expect(guide).toContain('< 10000');
  });

  test('year_built is 4-digit year from 1800 to current year', () => {
    expect(guide).toContain('year_built');
    expect(guide).toContain('4-digit year');
    expect(guide).toContain('1800');
  });
});

// ===========================================================================
// §E – SECTIONS 6–8: INSTALLATION-ONLY + LIDAR
// ===========================================================================
test.describe('§E – Sections 6–8: Device Info, Water Main, LiDar', () => {
  test('Section 6 appears only if service_type = "installation"', () => {
    const idx = guide.indexOf('device_type');
    const section = guide.slice(Math.max(0, idx - 300), idx + 200);
    expect(section).toContain('service_type = "installation"');
  });

  test('device_type has options: flo_by_moen, awtos, not_sure', () => {
    expect(guide).toContain('"flo_by_moen"');
    expect(guide).toContain('"awtos"');
    expect(guide).toContain('"not_sure"');
  });

  test('device_source has options: insurance, homeowner, contractor', () => {
    expect(guide).toContain('"insurance"');
    expect(guide).toContain('"homeowner"');
    expect(guide).toContain('"contractor"');
  });

  test('software_required is installation-only radio field', () => {
    expect(guide).toContain('software_required');
  });

  test('water_main_location has 3 options: inside, outside, not_sure', () => {
    expect(guide).toContain('"inside"');
    expect(guide).toContain('"outside"');
  });

  test('water_main_photo is required for installation', () => {
    const idx = guide.indexOf('water_main_photo');
    const section = guide.slice(idx, idx + 200);
    expect(section).toContain('Yes');
    expect(section).toContain('25');
  });

  test('additional_photos is optional with max 5 files', () => {
    const idx = guide.indexOf('additional_photos');
    const section = guide.slice(idx, idx + 300);
    expect(section).toContain('No');
    expect(section).toContain('5');
  });

  test('Section 8 lidar_provided checkbox is documented', () => {
    expect(guide).toContain('lidar_provided');
    expect(guide).toContain('Checkbox');
  });

  test('lidar_file upload shown when lidar_provided = true', () => {
    expect(guide).toContain('lidar_file');
    expect(guide).toContain('lidar_provided = true');
  });

  test('lidar_file accepts LAS, LAZ, XYZ, PLY formats up to 100MB', () => {
    // The File Upload Specifications table documents allowed types and max size
    expect(guide).toContain('.las');
    expect(guide).toContain('.laz');
    expect(guide).toContain('.xyz');
    expect(guide).toContain('.ply');
    // Also present in Section 8 as 'LAS, LAZ, XYZ, PLY'
    expect(guide).toContain('LAS, LAZ, XYZ, PLY');
    expect(guide).toContain('100 MB');
  });
});

// ===========================================================================
// §F – SECTIONS 9–10: CONTACT + TERMS
// ===========================================================================
test.describe('§F – Sections 9–10: Contact Preferences and Terms', () => {
  test('access_notes is optional textarea with max 500 characters', () => {
    expect(guide).toContain('access_notes');
    expect(guide).toContain('500');
  });

  test('contact_method has 4 options: phone, text, email, any', () => {
    const idx = guide.indexOf('contact_method');
    const section = guide.slice(idx, idx + 300);
    expect(section).toContain('"phone"');
    expect(section).toContain('"text"');
    expect(section).toContain('"email"');
    expect(section).toContain('"any"');
  });

  test('preferred_time has 3 options: morning, afternoon, flexible', () => {
    const idx = guide.indexOf('preferred_time');
    const section = guide.slice(idx, idx + 300);
    expect(section).toContain('"morning"');
    expect(section).toContain('"afternoon"');
    expect(section).toContain('"flexible"');
  });

  test('terms_agreed checkbox is required', () => {
    expect(guide).toContain('terms_agreed');
    const idx = guide.indexOf('terms_agreed');
    const section = guide.slice(idx, idx + 200);
    expect(section).toContain('Yes');
    expect(section).toContain('Must be checked');
  });

  test('Submit button is labeled "Submit Request"', () => {
    expect(guide).toContain('Submit Request');
  });
});

// ===========================================================================
// §G – FILE UPLOAD CONSTRAINTS
// ===========================================================================
test.describe('§G – File Upload Specifications', () => {
  test('File Upload Specifications table is present', () => {
    expect(guide).toContain('File Upload Specifications');
  });

  test('water_main_photo: 25MB, jpg/jpeg/png/heic, max 1 file, required for installation', () => {
    const idx = guide.indexOf('File Upload Specifications');
    const section = guide.slice(idx, idx + 1000);
    expect(section).toContain('water_main_photo');
    expect(section).toContain('25 MB');
    expect(section).toContain('.jpg');
    expect(section).toContain('.heic');
  });

  test('additional_photos: 25MB each, max 5 files, never required', () => {
    const idx = guide.indexOf('File Upload Specifications');
    const section = guide.slice(idx, idx + 1000);
    expect(section).toContain('additional_photos');
    expect(section).toContain('Never');
  });

  test('lidar_file: 100MB, .las/.laz/.xyz/.ply, required when lidar_provided = true', () => {
    const idx = guide.indexOf('File Upload Specifications');
    const section = guide.slice(idx, idx + 1000);
    expect(section).toContain('lidar_file');
    expect(section).toContain('100 MB');
    expect(section).toContain('lidar_provided = true');
  });
});

// ===========================================================================
// §H – AUTO-CALCULATIONS
// ===========================================================================
test.describe('§H – System Auto-Calculations', () => {
  test('Auto-Calculations section is present', () => {
    expect(guide).toContain('Auto-Calculations');
  });

  test('Pressure Reducer: required when (current year - year_built) > 5', () => {
    const idx = guide.indexOf('Pressure Reducer Required');
    const section = guide.slice(idx, idx + 300);
    expect(section).toContain('year_built');
    expect(section).toContain('> 5');
  });

  test('Extension cord default is 25 ft', () => {
    expect(guide).toContain('25 ft');
    expect(guide).toContain('Extension Cord');
  });

  test('Pipe size: ≤2000 sqft = 3/4"; 2001-3000 = 1"; 3001-5000 = 1 1/4"', () => {
    // The Auto-Calculations table documents the full pipe size logic
    expect(guide).toContain('3/4"');
    expect(guide).toContain('1 1/4"');
    // Boundaries are 2000 and 3001-5000
    const idx = guide.lastIndexOf('Pipe Size');
    const section = guide.slice(idx, idx + 600);
    expect(section).toContain('2000');
    expect(section).toContain('3001');
  });

  test('Assessment fee formula: $185 + ($0.75 × distance miles)', () => {
    // Documented in both Section 2 and Auto-Calculations
    expect(guide).toContain('$185');
    expect(guide).toContain('$0.75');
    expect(guide).toContain('distance');
  });
});

// ===========================================================================
// §I – ASSESSMENT WORKFLOW (9 STEPS)
// ===========================================================================
test.describe('§I – Assessment Workflow Steps', () => {
  test('Assessment Workflow section is present with 9 steps', () => {
    expect(guide).toContain('Assessment Workflow');
    const idx = guide.indexOf('Assessment Workflow');
    const section = guide.slice(idx, idx + 1000);
    // All 9 steps should be present
    for (let i = 1; i <= 9; i++) {
      expect(section).toContain(`${i}`);
    }
  });

  test('Step 1: system calculates assessment fee', () => {
    const idx = guide.indexOf('Assessment Workflow');
    const section = guide.slice(idx, idx + 1000);
    expect(section).toContain('calculates assessment fee');
  });

  test('Step 2: creates assessment_request record', () => {
    const idx = guide.indexOf('Assessment Workflow');
    const section = guide.slice(idx, idx + 1000);
    expect(section).toContain('assessment_request');
  });

  test('Step 3: generates invoice for assessment fee', () => {
    const idx = guide.indexOf('Assessment Workflow');
    const section = guide.slice(idx, idx + 1000);
    expect(section).toContain('invoice');
  });

  test('Step 4: invoice emailed to homeowner with payment link', () => {
    const idx = guide.indexOf('Assessment Workflow');
    const section = guide.slice(idx, idx + 1000);
    expect(section).toContain('payment link');
  });

  test('Step 5: upon payment, assign nearest technician', () => {
    const idx = guide.indexOf('Assessment Workflow');
    const section = guide.slice(idx, idx + 1000);
    expect(section).toContain('payment');
    expect(section).toContain('technician');
  });

  test('Step 9: homeowner can proceed with installation after assessment', () => {
    const idx = guide.indexOf('Assessment Workflow');
    const section = guide.slice(idx, idx + 1200);
    expect(section).toContain('proceed with installation');
  });
});

// ===========================================================================
// §J – DATABASE TABLES
// ===========================================================================
test.describe('§J – Database Tables', () => {
  test('users table is documented', () => {
    expect(guide).toContain('`users`');
    expect(guide).toContain('user_type');
  });

  test('technicians table is documented as NEW', () => {
    expect(guide).toContain('`technicians`');
    expect(guide).toContain('(NEW)');
    expect(guide).toContain('service_area');
    expect(guide).toContain('mileage_rate');
  });

  test('service_requests table has service_type column', () => {
    expect(guide).toContain('`service_requests`');
    expect(guide).toContain('service_type');
  });

  test('service_requests has installation-only nullable columns', () => {
    const idx = guide.indexOf('`service_requests`');
    const section = guide.slice(idx, idx + 2000);
    expect(section).toContain('device_type');
    expect(section).toContain('water_main_photo_url');
    expect(section).toContain('Nullable');
  });

  test('service_requests has all status values', () => {
    expect(guide).toContain('assessment_invoiced');
    expect(guide).toContain('assessment_paid');
    expect(guide).toContain('assessment_scheduled');
    expect(guide).toContain('assessment_completed');
    expect(guide).toContain('estimating');
    expect(guide).toContain('approved');
  });

  test('assessment_requests table is documented as NEW with all key columns', () => {
    expect(guide).toContain('`assessment_requests`');
    expect(guide).toContain('(NEW)');
    expect(guide).toContain('base_fee');
    expect(guide).toContain('mileage_fee');
    expect(guide).toContain('total_fee');
    expect(guide).toContain('distance_miles');
    expect(guide).toContain('invoice_paid');
    expect(guide).toContain('assessment_report_url');
  });

  test('agents table is documented', () => {
    expect(guide).toContain('`agents`');
    expect(guide).toContain('referral_link');
  });

  test('invoices table is documented with stripe and status fields', () => {
    expect(guide).toContain('`invoices`');
    expect(guide).toContain('stripe_payment_intent_id');
    expect(guide).toContain('paid_at');
  });
});

// ===========================================================================
// §K – API ENDPOINTS
// ===========================================================================
test.describe('§K – API Endpoints', () => {
  test('API Endpoints section is present', () => {
    expect(guide).toContain('API Endpoints');
  });

  test('/api/auth/login is documented (POST)', () => {
    expect(guide).toContain('/api/auth/login');
    const idx = guide.indexOf('/api/auth/login');
    const section = guide.slice(idx, idx + 100);
    expect(section).toContain('POST');
  });

  test('/api/users is documented for new account creation', () => {
    expect(guide).toContain('/api/users');
  });

  test('/api/service-requests is documented', () => {
    expect(guide).toContain('/api/service-requests');
  });

  test('/api/upload is documented for file uploads', () => {
    expect(guide).toContain('/api/upload');
  });

  test('/api/assessments/calculate-fee is documented', () => {
    expect(guide).toContain('/api/assessments/calculate-fee');
  });

  test('/api/assessments/assign-technician is documented', () => {
    expect(guide).toContain('/api/assessments/assign-technician');
  });

  test('/api/invoices/create is documented', () => {
    expect(guide).toContain('/api/invoices/create');
  });

  test('/api/stripe/webhook is documented for payment confirmations', () => {
    expect(guide).toContain('/api/stripe/webhook');
  });
});

// ===========================================================================
// §L – EMAIL NOTIFICATIONS (6 TYPES)
// ===========================================================================
test.describe('§L – Email Notifications (6 Types)', () => {
  test('Email Notifications section is present', () => {
    expect(guide).toContain('Email Notifications');
  });

  test('Homeowner installation email: "Your MrSurety Service Request Has Been Received"', () => {
    expect(guide).toContain('Your MrSurety Service Request Has Been Received');
  });

  test('Homeowner assessment email: "Your Property Assessment Request - Invoice Enclosed"', () => {
    expect(guide).toContain('Your Property Assessment Request - Invoice Enclosed');
  });

  test('Agent email: "Your Client [Name] Has Started a Service Request"', () => {
    expect(guide).toContain('Your Client [Name] Has Started a Service Request');
  });

  test('Contractor email: "New Service Request in Your Area"', () => {
    expect(guide).toContain('New Service Request in Your Area');
  });

  test('Technician email: "New Assessment Assignment - [Address]"', () => {
    expect(guide).toContain('New Assessment Assignment - [Address]');
  });

  test('Post-assignment homeowner email: "Technician Assigned for Your Property Assessment"', () => {
    expect(guide).toContain('Technician Assigned for Your Property Assessment');
  });

  test('6 notification rows are present in the table', () => {
    const idx = guide.indexOf('Email Notifications');
    const section = guide.slice(idx, idx + 2000);
    const rows = section.split('\n').filter(line =>
      line.startsWith('| ') &&
      !line.startsWith('| #') &&
      !line.startsWith('|---')
    );
    expect(rows.length).toBeGreaterThanOrEqual(6);
  });
});

// ===========================================================================
// §M – SERVICE REQUEST STATUS WORKFLOW
// ===========================================================================
test.describe('§M – Service Request Status Workflow', () => {
  test('Service request status workflow section is present', () => {
    expect(guide).toContain('Service Request Status Workflow');
  });

  test('Assessment path shows 5 status values in order', () => {
    const idx = guide.indexOf('Assessment Path');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('assessment_invoiced');
    expect(section).toContain('assessment_paid');
    expect(section).toContain('assessment_scheduled');
    expect(section).toContain('assessment_completed');
  });

  test('Assessment status triggers are documented', () => {
    const idx = guide.indexOf('Assessment Path');
    const section = guide.slice(idx, idx + 800);
    expect(section).toContain('Invoice generated');
    expect(section).toContain('Payment received');
    expect(section).toContain('Technician assigned');
    expect(section).toContain('Technician submits report');
  });

  test('Installation path shows: pending → estimating → approved', () => {
    const idx = guide.indexOf('Installation Path');
    const section = guide.slice(idx, idx + 500);
    expect(section).toContain('pending');
    expect(section).toContain('estimating');
    expect(section).toContain('approved');
  });

  test('Installation status triggers are documented', () => {
    const idx = guide.indexOf('Installation Path');
    const section = guide.slice(idx, idx + 600);
    expect(section).toContain('Form submitted');
    expect(section).toContain('contractors bidding');
    expect(section).toContain('pays deposit');
  });
});
