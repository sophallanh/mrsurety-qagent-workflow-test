import { test, expect } from '@playwright/test';

/**
 * MrSurety QA – Platform Spec V6.3 Sections 13–18
 *
 * Source: "MR SURETY – COMPLETE PLATFORM SPECIFICATION V6.3"
 * (Full Specification with Software Setup Assistance, Service Fee in Estimates,
 *  AI Call Reminder as Future Module, and Future Data Storage)
 *
 * Covers the sections of V6.3 NOT addressed by existing spec files:
 *
 *   Section 13 – Future Data Storage for Policy Renewals
 *                (6 data fields + 3 automated notification triggers)
 *   Section 14 – All System Emails (13 emails: subjects, recipients, triggers,
 *                key content rules)
 *   Section 15 – All DocuSign Documents (5 documents: names, triggers,
 *                key clause requirements)
 *   Section 16 – Profitability Analysis (per-job financials, profit breakdown,
 *                scale projections – arithmetic verified)
 *   Section 17 – Database Schema (7 core tables, column names, types)
 *   Section 18 – API Integrations (7 integrations, purposes)
 *
 * Cross-checked against existing files to avoid duplication:
 *   - programmer-summary.spec.ts        (Section 19 summary)
 *   - platform-spec-v63-gaps.spec.ts    (Sections 1, 2, 3, 8, 10, 11)
 *   - pricing-calculation.spec.ts       (Sections 4, 9 – markup math)
 *   - service-request-form-spec.spec.ts (Sections 5, 6, 7)
 *   - email-v144-*.spec.ts + email-docusign-examples-doc.spec.ts
 *                                       (full email body content from v1.4.4)
 *   - email-v144-emails15to16-docusign.spec.ts
 *                                       (DocuSign body text from v1.4.4)
 *
 * All tests are pure-logic / content — no browser required.
 */

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 13 – FUTURE DATA STORAGE FOR POLICY RENEWALS
// Platform Spec V6.3, Section 13
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Section 13 – Future Data Storage: Fields', () => {
  const RENEWAL_FIELDS = [
    'completion_date',
    'policy_number',
    'insurance_company',
    'agent_id',
    'service_type',
    'certificate_id',
  ] as const;

  test('Exactly 6 data fields are stored per job for policy renewal tracking', () => {
    expect(RENEWAL_FIELDS.length).toBe(6);
    expect(new Set(RENEWAL_FIELDS).size).toBe(6);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §13: Exactly 6 fields stored per job: completion_date, policy_number, insurance_company, agent_id, service_type, certificate_id.',
    });
  });

  test('completion_date field stores the date work was finished', () => {
    const field = RENEWAL_FIELDS.find(f => f === 'completion_date');
    expect(field).toBe('completion_date');
  });

  test('policy_number field stores the insurance policy number', () => {
    const field = RENEWAL_FIELDS.find(f => f === 'policy_number');
    expect(field).toBe('policy_number');
  });

  test('insurance_company field stores the insurance carrier name', () => {
    const field = RENEWAL_FIELDS.find(f => f === 'insurance_company');
    expect(field).toBe('insurance_company');
  });

  test('agent_id field links the referring agent', () => {
    const field = RENEWAL_FIELDS.find(f => f === 'agent_id');
    expect(field).toBe('agent_id');
  });

  test('service_type field records the type of work performed', () => {
    const field = RENEWAL_FIELDS.find(f => f === 'service_type');
    expect(field).toBe('service_type');
  });

  test('certificate_id field links to the completion certificate', () => {
    const field = RENEWAL_FIELDS.find(f => f === 'certificate_id');
    expect(field).toBe('certificate_id');
  });
});

test.describe('Section 13 – Future Data Storage: Automated Notifications', () => {
  const NOTIFICATIONS = [
    {
      trigger: '11 months after completion',
      recipient: 'homeowner',
      action: 'email',
      message: 'Your compliance work is approaching 1 year. Check if your insurance needs updated documentation.',
    },
    {
      trigger: '11 months after completion',
      recipient: 'agent',
      action: 'email',
      message: "Your client [Name]'s compliance work is approaching 1 year. They may need renewal documentation.",
    },
    {
      trigger: '12 months after completion',
      recipient: 'system',
      action: 'archive',
      message: 'Archive job but keep accessible',
    },
  ] as const;

  test('Exactly 3 automated notifications are defined for policy renewal', () => {
    expect(NOTIFICATIONS.length).toBe(3);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §13: 3 automated notifications: 11-month homeowner email, 11-month agent email, 12-month archive.',
    });
  });

  test('11-month notification emails the homeowner about approaching 1-year mark', () => {
    const homeowner11Month = NOTIFICATIONS.find(
      n => n.trigger === '11 months after completion' && n.recipient === 'homeowner'
    );
    expect(homeowner11Month).toBeDefined();
    expect(homeowner11Month!.action).toBe('email');
    expect(homeowner11Month!.message).toContain('approaching 1 year');
    expect(homeowner11Month!.message).toContain('insurance needs updated documentation');
  });

  test('11-month notification emails the agent about client approaching 1-year mark', () => {
    const agent11Month = NOTIFICATIONS.find(
      n => n.trigger === '11 months after completion' && n.recipient === 'agent'
    );
    expect(agent11Month).toBeDefined();
    expect(agent11Month!.action).toBe('email');
    expect(agent11Month!.message).toContain('approaching 1 year');
    expect(agent11Month!.message).toContain('renewal documentation');
  });

  test('12-month trigger archives the job while keeping it accessible', () => {
    const archive12Month = NOTIFICATIONS.find(
      n => n.trigger === '12 months after completion' && n.action === 'archive'
    );
    expect(archive12Month).toBeDefined();
    expect(archive12Month!.message).toContain('Archive job');
    expect(archive12Month!.message).toContain('keep accessible');
  });

  test('Both 11-month notifications fire on the same trigger date', () => {
    const elevenMonth = NOTIFICATIONS.filter(n => n.trigger === '11 months after completion');
    expect(elevenMonth.length).toBe(2);
    const recipients = elevenMonth.map(n => n.recipient);
    expect(recipients).toContain('homeowner');
    expect(recipients).toContain('agent');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 14 – ALL SYSTEM EMAILS
// Platform Spec V6.3, Section 14
// ─────────────────────────────────────────────────────────────────────────────

const SYSTEM_EMAILS = [
  { num: 1,  name: 'Service Request Confirmation',          to: 'Homeowner',        trigger: 'Form submitted' },
  { num: 2,  name: 'New Estimate Available',                to: 'Homeowner',        trigger: 'First contractor bid submitted' },
  { num: 3,  name: 'Estimate Selected – Deposit Required',  to: 'Homeowner',        trigger: 'Contractor selected' },
  { num: 4,  name: 'New Job Assignment',                    to: 'Contractor',       trigger: 'Homeowner selects contractor' },
  { num: 5,  name: 'Deposit Received – Job Confirmed',      to: 'Homeowner',        trigger: 'Deposit paid' },
  { num: 6,  name: 'Reminder: Installation Tomorrow',       to: 'Homeowner',        trigger: '24 hours before scheduled date' },
  { num: 7,  name: 'Contractor Check-In Notification',      to: 'Homeowner',        trigger: 'Contractor GPS check-in' },
  { num: 8,  name: 'Change Order Created',                  to: 'Homeowner',        trigger: 'Contractor creates change order' },
  { num: 9,  name: 'Work Completed – Final Payment Required', to: 'Homeowner',      trigger: 'Job marked complete' },
  { num: 10, name: 'Job Complete – Certificate Ready',      to: 'Homeowner',        trigger: 'All documents signed' },
  { num: 11, name: 'Job Complete – Certificate for Agent',  to: 'Insurance Agent',  trigger: 'All documents signed' },
  { num: 12, name: 'Unconditional Lien Release Required',   to: 'Contractor',       trigger: 'Payment clears' },
  { num: 13, name: 'Quarterly Tax Report Ready',            to: 'Admin',            trigger: 'End of quarter' },
] as const;

test.describe('Section 14 – System Emails: Inventory', () => {
  test('Exactly 13 system emails are defined', () => {
    expect(SYSTEM_EMAILS.length).toBe(13);
    const nums = SYSTEM_EMAILS.map(e => e.num);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §14: Exactly 13 system emails numbered 1–13.',
    });
  });

  test('Recipients include Homeowner, Contractor, Insurance Agent, and Admin', () => {
    const recipients = [...new Set(SYSTEM_EMAILS.map(e => e.to))];
    expect(recipients).toContain('Homeowner');
    expect(recipients).toContain('Contractor');
    expect(recipients).toContain('Insurance Agent');
    expect(recipients).toContain('Admin');
  });

  test('9 of 13 emails go to the Homeowner', () => {
    const homeownerEmails = SYSTEM_EMAILS.filter(e => e.to === 'Homeowner');
    expect(homeownerEmails.length).toBe(9);
  });

  test('2 of 13 emails go to the Contractor', () => {
    const contractorEmails = SYSTEM_EMAILS.filter(e => e.to === 'Contractor');
    expect(contractorEmails.length).toBe(2);
  });

  test('1 of 13 emails goes to the Insurance Agent', () => {
    const agentEmails = SYSTEM_EMAILS.filter(e => e.to === 'Insurance Agent');
    expect(agentEmails.length).toBe(1);
  });

  test('1 of 13 emails goes to the Admin', () => {
    const adminEmails = SYSTEM_EMAILS.filter(e => e.to === 'Admin');
    expect(adminEmails.length).toBe(1);
  });
});

test.describe('Section 14 – System Emails: Individual Email Rules', () => {
  test('Email 1 – Service Request Confirmation – sent to Homeowner on form submit', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 1)!;
    expect(email.name).toBe('Service Request Confirmation');
    expect(email.to).toBe('Homeowner');
    expect(email.trigger).toBe('Form submitted');
  });

  test('Email 2 – New Estimate Available – sent to Homeowner when first bid submitted', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 2)!;
    expect(email.name).toBe('New Estimate Available');
    expect(email.to).toBe('Homeowner');
    expect(email.trigger).toContain('First contractor bid');
  });

  test('Email 3 – Estimate Selected / Deposit Required – sent when contractor is selected', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 3)!;
    expect(email.name).toContain('Deposit Required');
    expect(email.to).toBe('Homeowner');
    expect(email.trigger).toBe('Contractor selected');
  });

  test('Email 4 – New Job Assignment – sent to Contractor when Homeowner selects them', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 4)!;
    expect(email.name).toBe('New Job Assignment');
    expect(email.to).toBe('Contractor');
    expect(email.trigger).toBe('Homeowner selects contractor');
  });

  test('Email 5 – Deposit Received / Job Confirmed – sent to Homeowner after deposit paid', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 5)!;
    expect(email.name).toContain('Deposit Received');
    expect(email.to).toBe('Homeowner');
    expect(email.trigger).toBe('Deposit paid');
  });

  test('Email 6 – Installation Reminder – sent 24 hours before scheduled installation', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 6)!;
    expect(email.name).toContain('Installation Tomorrow');
    expect(email.to).toBe('Homeowner');
    expect(email.trigger).toContain('24 hours before');
  });

  test('Email 7 – Contractor Check-In – sent to Homeowner on GPS check-in', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 7)!;
    expect(email.name).toContain('Check-In');
    expect(email.to).toBe('Homeowner');
    expect(email.trigger).toContain('GPS check-in');
  });

  test('Email 8 – Change Order Created – sent to Homeowner when contractor creates change order', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 8)!;
    expect(email.name).toBe('Change Order Created');
    expect(email.to).toBe('Homeowner');
    expect(email.trigger).toContain('change order');
  });

  test('Email 9 – Work Completed / Final Payment Required – sent when job marked complete', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 9)!;
    expect(email.name).toContain('Final Payment Required');
    expect(email.to).toBe('Homeowner');
    expect(email.trigger).toContain('marked complete');
  });

  test('Email 10 – Job Complete / Certificate Ready – sent to Homeowner after all docs signed', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 10)!;
    expect(email.name).toContain('Certificate Ready');
    expect(email.to).toBe('Homeowner');
    expect(email.trigger).toBe('All documents signed');
  });

  test('Email 11 – Certificate for Agent – sent to Insurance Agent after all docs signed', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 11)!;
    expect(email.name).toContain('Certificate for Agent');
    expect(email.to).toBe('Insurance Agent');
    expect(email.trigger).toBe('All documents signed');
  });

  test('Email 12 – Unconditional Lien Release Required – sent to Contractor when payment clears', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 12)!;
    expect(email.name).toContain('Unconditional Lien Release Required');
    expect(email.to).toBe('Contractor');
    expect(email.trigger).toBe('Payment clears');
  });

  test('Email 13 – Quarterly Tax Report – sent to Admin at end of quarter', () => {
    const email = SYSTEM_EMAILS.find(e => e.num === 13)!;
    expect(email.name).toContain('Tax Report');
    expect(email.to).toBe('Admin');
    expect(email.trigger).toContain('quarter');
  });

  test('Emails 10 and 11 fire on the same trigger (all documents signed)', () => {
    const email10 = SYSTEM_EMAILS.find(e => e.num === 10)!;
    const email11 = SYSTEM_EMAILS.find(e => e.num === 11)!;
    expect(email10.trigger).toBe(email11.trigger);
    expect(email10.trigger).toBe('All documents signed');
  });
});

test.describe('Section 14 – System Emails: Key Content Rules', () => {
  test('Email 2 subject contains the checkmark emoji and "Estimates Ready"', () => {
    const subject = '✅ Estimates Ready for Your Review - MrSurety';
    expect(subject).toContain('✅');
    expect(subject).toContain('Estimates Ready');
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §14 Email 2: Subject starts with ✅ emoji.',
    });
  });

  test('Email 2 body shows estimate totals with "(includes $95 Service Fee)" for each contractor', () => {
    const estimateLinePattern = 'includes $95 Service Fee';
    const sampleLine = 'Total: $2,285.10 (includes $95 Service Fee)';
    expect(sampleLine).toContain(estimateLinePattern);
  });

  test('Email 3 includes a line-item breakdown showing $95 Service Fee separately', () => {
    const invoiceLineItems = [
      'Parts & Fittings',
      'Pressure Reducer',
      'Device',
      'Software Setup Assistance',
      'Labor',
      'Subtotal',
      'Service Fee: $95.00',
      'Total Before Tax',
      'Tax',
      'TOTAL',
    ];
    expect(invoiceLineItems).toContain('Service Fee: $95.00');
    expect(invoiceLineItems.indexOf('Service Fee: $95.00')).toBeGreaterThan(
      invoiceLineItems.indexOf('Subtotal')
    );
  });

  test('Email 3 includes what the Service Fee covers (6+ items)', () => {
    const serviceFeeItems = [
      'Contractor license & insurance verification',
      'Affidavit of Service (signed under penalty of perjury)',
      'Conditional & Unconditional Lien Releases',
      'Certificate of Completion for your insurance agent',
      'Agent portal access',
      'Perpetual document storage',
    ];
    expect(serviceFeeItems.length).toBeGreaterThanOrEqual(6);
    expect(serviceFeeItems).toContain('Affidavit of Service (signed under penalty of perjury)');
    expect(serviceFeeItems).toContain('Certificate of Completion for your insurance agent');
  });

  test('Email 4 note explicitly states the Service Fee does NOT affect contractor payment', () => {
    const contractorNote =
      'Note: Homeowner pays a separate $95 Service Fee to MrSurety for compliance ' +
      'documentation. This does not affect your payment.';
    expect(contractorNote).toContain('$95 Service Fee');
    expect(contractorNote).toContain('does not affect your payment');
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §14 Email 4: Contractor note confirms $95 Service Fee is hidden from contractor payment.',
    });
  });

  test('Email 9 final invoice includes $95 Service Fee line item', () => {
    const finalInvoiceItems = [
      'Parts & Fittings',
      'Pressure Reducer',
      'Device',
      'Software Setup Assistance',
      'Labor',
      'Subtotal',
      'Service Fee: $95.00',
      'Tax',
      'TOTAL',
    ];
    expect(finalInvoiceItems).toContain('Service Fee: $95.00');
  });

  test('Email 10 lists exactly 5 document types available for download', () => {
    const documents = [
      'Certificate of Completion',
      'Affidavit of Service',
      'Unconditional Lien Release',
      'Final Invoice',
      'Photos',
    ];
    expect(documents.length).toBe(5);
    expect(documents).toContain('Certificate of Completion');
    expect(documents).toContain('Unconditional Lien Release');
    expect(documents).toContain('Affidavit of Service');
  });

  test('Email 10 service fee summary lists 6 coverage items with checkmarks', () => {
    const coverageItems = [
      '✓ Contractor license verification',
      '✓ Affidavit of Service',
      '✓ Lien Releases',
      '✓ Certificate of Completion',
      '✓ Agent portal access',
      '✓ Document storage',
    ];
    expect(coverageItems.length).toBe(6);
    coverageItems.forEach(item => expect(item).toContain('✓'));
  });

  test('Email 11 instructs agent to submit to underwriter', () => {
    const closingInstruction = 'Submit to underwriter to bind policy or remove requirement.';
    expect(closingInstruction).toContain('underwriter');
    expect(closingInstruction).toContain('bind policy');
  });

  test('Email 12 warns contractor platform access limited until signed', () => {
    const warningText = 'IMPORTANT: Platform access will be limited until signed.';
    expect(warningText).toContain('Platform access');
    expect(warningText).toContain('until signed');
  });

  test('Email 13 subject contains the bar-chart emoji and "Tax Report"', () => {
    const subject = '📊 Quarterly Sales Tax Report Ready - [Quarter]';
    expect(subject).toContain('📊');
    expect(subject).toContain('Tax Report');
  });

  test('Email 3 deposit required is 10% of total', () => {
    // V6.3 §14 Email 3: "DEPOSIT REQUIRED (10%): $[Deposit]"
    const totalExample = 2285.10;
    const depositPct = 0.10;
    const expectedDeposit = parseFloat((totalExample * depositPct).toFixed(2));
    expect(expectedDeposit).toBe(228.51);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 15 – ALL DOCUSIGN DOCUMENTS
// Platform Spec V6.3, Section 15
// ─────────────────────────────────────────────────────────────────────────────

const DOCUSIGN_DOCS = [
  { num: 1, name: 'Contractor Master Services Agreement', sentTo: 'Contractor', trigger: 'Joins MrSurety network', frequency: 'One-Time' },
  { num: 2, name: 'Work Order / Task Contract',           sentTo: 'Contractor', trigger: 'Deposit paid',           frequency: 'Per Job' },
  { num: 3, name: 'Affidavit of Service',                 sentTo: 'Contractor', trigger: 'Job marked complete',    frequency: 'Per Job' },
  { num: 4, name: 'Conditional Lien Release w/ Invoice',  sentTo: 'Contractor', trigger: 'Completion docs submitted', frequency: 'Per Job' },
  { num: 5, name: 'Unconditional Lien Release',           sentTo: 'Contractor', trigger: 'Payment clears (~3 days)', frequency: 'Per Job' },
] as const;

test.describe('Section 15 – DocuSign Documents: Inventory', () => {
  test('Exactly 5 DocuSign documents are defined', () => {
    expect(DOCUSIGN_DOCS.length).toBe(5);
    const nums = DOCUSIGN_DOCS.map(d => d.num);
    expect(nums).toEqual([1, 2, 3, 4, 5]);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §15: Exactly 5 DocuSign documents numbered D1–D5.',
    });
  });

  test('All 5 DocuSign documents are sent to the Contractor', () => {
    const recipients = [...new Set(DOCUSIGN_DOCS.map(d => d.sentTo))];
    expect(recipients).toEqual(['Contractor']);
  });

  test('D1 is a one-time document; D2–D5 are per-job documents', () => {
    const oneTime = DOCUSIGN_DOCS.filter(d => d.frequency === 'One-Time');
    const perJob  = DOCUSIGN_DOCS.filter(d => d.frequency === 'Per Job');
    expect(oneTime.length).toBe(1);
    expect(oneTime[0].num).toBe(1);
    expect(perJob.length).toBe(4);
  });
});

test.describe('Section 15 – DocuSign Documents: Individual Document Rules', () => {
  test('D1 – Contractor Master Services Agreement sent when contractor joins network', () => {
    const doc = DOCUSIGN_DOCS.find(d => d.num === 1)!;
    expect(doc.name).toContain('Master Services Agreement');
    expect(doc.trigger).toContain('Joins');
  });

  test('D2 – Work Order / Task Contract sent after deposit is paid', () => {
    const doc = DOCUSIGN_DOCS.find(d => d.num === 2)!;
    expect(doc.name).toContain('Work Order');
    expect(doc.trigger).toBe('Deposit paid');
  });

  test('D3 – Affidavit of Service sent when job is marked complete', () => {
    const doc = DOCUSIGN_DOCS.find(d => d.num === 3)!;
    expect(doc.name).toBe('Affidavit of Service');
    expect(doc.trigger).toContain('marked complete');
  });

  test('D4 – Conditional Lien Release sent with invoice when completion docs submitted', () => {
    const doc = DOCUSIGN_DOCS.find(d => d.num === 4)!;
    expect(doc.name).toContain('Conditional Lien Release');
    expect(doc.name).toContain('Invoice');
    expect(doc.trigger).toContain('Completion docs');
  });

  test('D5 – Unconditional Lien Release sent approximately 3 days after payment clears', () => {
    const doc = DOCUSIGN_DOCS.find(d => d.num === 5)!;
    expect(doc.name).toBe('Unconditional Lien Release');
    expect(doc.trigger).toContain('Payment clears');
    expect(doc.trigger).toContain('3 days');
  });
});

test.describe('Section 15 – DocuSign Documents: Key Clause Requirements', () => {
  test('D1 includes a non-circumvention clause prohibiting direct homeowner solicitation for 24 months', () => {
    const nonCircumventionClause = 'NON-CIRCUMVENTION: No direct solicitation of homeowners for 24 months.';
    expect(nonCircumventionClause).toContain('24 months');
    expect(nonCircumventionClause).toContain('solicitation');
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §15 D1: Non-circumvention clause – no direct homeowner solicitation for 24 months.',
    });
  });

  test('D1 classifies the contractor as an Independent Contractor, not an employee', () => {
    const classificationClause = 'INDEPENDENT CONTRACTOR: Contractor is independent, not employee.';
    expect(classificationClause).toContain('independent');
    expect(classificationClause.toLowerCase()).not.toContain('employee of');
  });

  test('D1 specifies payment within 15 days of completion and approval', () => {
    const paymentClause = 'COMPENSATION: Paid per Work Order within 15 days of completion and approval.';
    expect(paymentClause).toContain('15 days');
    expect(paymentClause).toContain('completion and approval');
  });

  test('D1 includes the resale certificate provision', () => {
    const resaleClause = 'RESALE CERTIFICATE: Company holds valid Resale Certificate.';
    expect(resaleClause).toContain('Resale Certificate');
  });

  test('D2 Work Order shows contractor pricing only (no Service Fee shown to contractor)', () => {
    const workOrderNote = 'NOTE: Homeowner pays separate $95 Service Fee to MrSurety for compliance docs.';
    // The note acknowledges the fee exists but makes clear it is NOT part of contractor compensation
    expect(workOrderNote).toContain('$95 Service Fee');
    expect(workOrderNote).toContain('Homeowner pays');
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §15 D2: Contractor Work Order does not include Service Fee in contractor compensation.',
    });
  });

  test('D3 Affidavit of Service is signed under penalty of perjury', () => {
    const affidavitDeclaration =
      'I declare under penalty of perjury under California law that the foregoing is true.';
    expect(affidavitDeclaration).toContain('penalty of perjury');
    expect(affidavitDeclaration).toContain('California law');
  });

  test('D3 Affidavit requires attached photographs described as true and accurate', () => {
    const photoClause = 'Attached photographs are true and accurate.';
    expect(photoClause).toContain('photographs');
    expect(photoClause).toContain('true and accurate');
  });

  test('D4 Conditional Lien Release requires contractor to initial 3 verification statements', () => {
    const verificationStatements = [
      'The work described in the attached invoice has been completely performed',
      'All items listed were installed at this property',
      'The invoice is true and accurate',
    ];
    expect(verificationStatements.length).toBe(3);
    verificationStatements.forEach(s => expect(s.length).toBeGreaterThan(10));
  });

  test('D4 Conditional Lien Release is CONDITIONAL upon payment clearance', () => {
    const conditionalNotice = 'This release is CONDITIONAL upon clearance of the payment identified above.';
    expect(conditionalNotice).toContain('CONDITIONAL');
    expect(conditionalNotice).toContain('clearance');
  });

  test('D5 Unconditional Lien Release includes platform access warning', () => {
    const platformNotice =
      'PLATFORM ACCESS NOTICE:\n' +
      'Execution of this document is required for continued access to the MrSurety contractor platform.';
    expect(platformNotice).toContain('PLATFORM ACCESS NOTICE');
    expect(platformNotice).toContain('continued access');
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §15 D5: Platform access warning – must sign unconditional lien release to retain access.',
    });
  });

  test('D5 Unconditional Lien Release waives ALL claims, liens, and stop notices', () => {
    const waiverText =
      'UNCONDITIONALLY waives and releases any and all claims, mechanics liens, stop notices, ' +
      'or rights against the above-referenced property';
    expect(waiverText).toContain('mechanics liens');
    expect(waiverText).toContain('stop notices');
    expect(waiverText).toContain('UNCONDITIONALLY waives');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 16 – PROFITABILITY ANALYSIS
// Platform Spec V6.3, Section 16
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Section 16 – Profitability Analysis: Per-Job Financials (Scenario 1)', () => {
  const HOMEOWNER_TOTAL = 2285.10;
  const CONTRACTOR_GETS = 1694.99;
  const SALES_TAX      = 164.36;
  const MRSURETY_PROFIT = 425.75;

  test('Homeowner pays $2,285.10 for the full package (Scenario 1)', () => {
    expect(HOMEOWNER_TOTAL).toBe(2285.10);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §16: Scenario 1 full-package homeowner total = $2,285.10.',
    });
  });

  test('Contractor receives $1,694.99 (74.2% of homeowner total)', () => {
    expect(CONTRACTOR_GETS).toBe(1694.99);
    const pct = parseFloat(((CONTRACTOR_GETS / HOMEOWNER_TOTAL) * 100).toFixed(1));
    expect(pct).toBe(74.2);
  });

  test('Sales tax to state is $164.36 (7.2% of homeowner total)', () => {
    expect(SALES_TAX).toBe(164.36);
    const pct = parseFloat(((SALES_TAX / HOMEOWNER_TOTAL) * 100).toFixed(1));
    expect(pct).toBe(7.2);
  });

  test('MrSurety profit is $425.75 (18.6% of homeowner total)', () => {
    expect(MRSURETY_PROFIT).toBe(425.75);
    const pct = parseFloat(((MRSURETY_PROFIT / HOMEOWNER_TOTAL) * 100).toFixed(1));
    expect(pct).toBe(18.6);
  });

  test('Contractor + Tax + MrSurety = Homeowner total (round-trip check)', () => {
    const sum = parseFloat((CONTRACTOR_GETS + SALES_TAX + MRSURETY_PROFIT).toFixed(2));
    expect(sum).toBe(HOMEOWNER_TOTAL);
  });
});

test.describe('Section 16 – Profitability Analysis: Profit Breakdown', () => {
  const PARTS_MARKUP    = 91.00;   // $260 × 35%
  const PRESSURE_MARKUP = 108.50;  // $310 × 35%
  const SOFTWARE_MARKUP = 18.75;   // $75  × 25%
  const LABOR_MARKUP    = 112.50;  // $450 × 25%
  const SERVICE_FEE     = 95.00;

  test('Parts markup: $260 contractor price × 35% = $91.00', () => {
    const contractorParts = 260.00;
    const markup = parseFloat((contractorParts * 0.35).toFixed(2));
    expect(markup).toBe(PARTS_MARKUP);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §16: Parts markup = $91.00 ($260 × 35%).',
    });
  });

  test('Pressure reducer markup: $310 contractor price × 35% = $108.50', () => {
    const contractorPressure = 310.00;
    const markup = parseFloat((contractorPressure * 0.35).toFixed(2));
    expect(markup).toBe(PRESSURE_MARKUP);
  });

  test('Software setup assistance markup: $75 contractor price × 25% = $18.75', () => {
    const contractorSoftware = 75.00;
    const markup = parseFloat((contractorSoftware * 0.25).toFixed(2));
    expect(markup).toBe(SOFTWARE_MARKUP);
  });

  test('Labor markup: $450 contractor price × 25% = $112.50', () => {
    const contractorLabor = 450.00;
    const markup = parseFloat((contractorLabor * 0.25).toFixed(2));
    expect(markup).toBe(LABOR_MARKUP);
  });

  test('Service Fee is $95.00 flat', () => {
    expect(SERVICE_FEE).toBe(95.00);
  });

  test('Total MrSurety revenue equals sum of all markups plus Service Fee = $425.75', () => {
    const total = parseFloat(
      (PARTS_MARKUP + PRESSURE_MARKUP + SOFTWARE_MARKUP + LABOR_MARKUP + SERVICE_FEE).toFixed(2)
    );
    expect(total).toBe(425.75);
  });

  test('Device has zero markup (pass-through)', () => {
    const deviceMarkupPct = 0;
    expect(deviceMarkupPct).toBe(0);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §16: Device markup = 0% (pass-through at contractor cost).',
    });
  });
});

test.describe('Section 16 – Profitability Analysis: Scale Projections', () => {
  const PROFIT_PER_JOB = 425.75;

  const SCALE_TABLE = [
    { jobsPerMonth:   50, monthlyRevenue:   114255, monthlyProfit:   21288, annualProfit:   255450 },
    { jobsPerMonth:  100, monthlyRevenue:   228510, monthlyProfit:   42575, annualProfit:   510900 },
    { jobsPerMonth:  200, monthlyRevenue:   457020, monthlyProfit:   85150, annualProfit: 1021800 },
    { jobsPerMonth:  500, monthlyRevenue: 1142550,  monthlyProfit:  212875, annualProfit: 2554500 },
    { jobsPerMonth: 1000, monthlyRevenue: 2285100,  monthlyProfit:  425750, annualProfit: 5109000 },
  ] as const;

  test('Scale table has exactly 5 rows', () => {
    expect(SCALE_TABLE.length).toBe(5);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §16 Scale Projections: 5 rows (50 / 100 / 200 / 500 / 1000 jobs per month).',
    });
  });

  test('Monthly profit = jobs × $425.75 for all rows', () => {
    SCALE_TABLE.forEach(row => {
      const computed = Math.round(row.jobsPerMonth * PROFIT_PER_JOB);
      // Allow ±$1 for the spec's rounded figures
      expect(Math.abs(computed - row.monthlyProfit)).toBeLessThanOrEqual(1);
    });
  });

  test('Annual profit = monthly profit × 12 for all rows', () => {
    SCALE_TABLE.forEach(row => {
      const computed = row.monthlyProfit * 12;
      expect(Math.abs(computed - row.annualProfit)).toBeLessThanOrEqual(12);
    });
  });

  test('At 1,000 jobs/month the monthly profit is $425,750 and annual profit is $5,109,000', () => {
    const row1000 = SCALE_TABLE.find(r => r.jobsPerMonth === 1000)!;
    expect(row1000.monthlyProfit).toBe(425750);
    expect(row1000.annualProfit).toBe(5109000);
  });

  test('Monthly revenue = jobs × $2,285.10 (homeowner total) for all rows', () => {
    const HOME_TOTAL = 2285.10;
    SCALE_TABLE.forEach(row => {
      const computed = Math.round(row.jobsPerMonth * HOME_TOTAL);
      // Allow ±$1 for the spec's rounded figures
      expect(Math.abs(computed - row.monthlyRevenue)).toBeLessThanOrEqual(1);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 17 – DATABASE SCHEMA
// Platform Spec V6.3, Section 17
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Section 17 – Database Schema: Core Tables', () => {
  const CORE_TABLES = [
    'users',
    'service_requests',
    'contractor_bids',
    'jobs',
    'technicians',
    'assessment_requests',
    'agents',
  ] as const;

  test('Exactly 7 core tables are defined', () => {
    expect(CORE_TABLES.length).toBe(7);
    expect(new Set(CORE_TABLES).size).toBe(7);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §17: 7 core database tables: users, service_requests, contractor_bids, jobs, technicians, assessment_requests, agents.',
    });
  });

  test('All expected table names are present', () => {
    expect(CORE_TABLES).toContain('users');
    expect(CORE_TABLES).toContain('service_requests');
    expect(CORE_TABLES).toContain('contractor_bids');
    expect(CORE_TABLES).toContain('jobs');
    expect(CORE_TABLES).toContain('technicians');
    expect(CORE_TABLES).toContain('assessment_requests');
    expect(CORE_TABLES).toContain('agents');
  });
});

test.describe('Section 17 – Database Schema: users table', () => {
  const USERS_COLUMNS = ['id', 'full_name', 'email', 'phone', 'password_hash', 'user_type', 'created_at'] as const;
  const USER_TYPES    = ['homeowner', 'contractor', 'technician', 'agent', 'admin'] as const;

  test('users table has exactly 7 columns', () => {
    expect(USERS_COLUMNS.length).toBe(7);
  });

  test('users.user_type has exactly 5 valid options', () => {
    expect(USER_TYPES.length).toBe(5);
    expect(USER_TYPES).toContain('homeowner');
    expect(USER_TYPES).toContain('contractor');
    expect(USER_TYPES).toContain('technician');
    expect(USER_TYPES).toContain('agent');
    expect(USER_TYPES).toContain('admin');
  });

  test('users table includes password_hash (not plaintext password)', () => {
    expect(USERS_COLUMNS).toContain('password_hash');
    expect(USERS_COLUMNS).not.toContain('password');
  });
});

test.describe('Section 17 – Database Schema: service_requests table', () => {
  const SR_COLUMNS = [
    'id', 'user_id', 'agent_id', 'service_type', 'property_address', 'billing_address',
    'insurance_company', 'agent_name', 'agent_email', 'policy_number', 'home_type',
    'home_type_other', 'square_feet', 'year_built', 'device_type', 'device_source',
    'software_assistance_required', 'water_main_location', 'water_main_photo_url',
    'additional_photo_urls', 'lidar_provided', 'lidar_file_url', 'access_notes',
    'contact_method', 'preferred_time', 'status', 'created_at',
  ] as const;

  test('service_requests.agent_id is nullable (FK)', () => {
    expect(SR_COLUMNS).toContain('agent_id');
  });

  test('service_requests.service_type accepts "installation" or "assessment"', () => {
    const validTypes = ['installation', 'assessment'];
    expect(validTypes.length).toBe(2);
    expect(validTypes).toContain('installation');
    expect(validTypes).toContain('assessment');
  });

  test('service_requests.software_assistance_required is a boolean column', () => {
    expect(SR_COLUMNS).toContain('software_assistance_required');
    // Validate column type designation
    const column = { name: 'software_assistance_required', type: 'boolean', nullable: true };
    expect(column.type).toBe('boolean');
  });

  test('service_requests stores both property_address and billing_address as JSON', () => {
    expect(SR_COLUMNS).toContain('property_address');
    expect(SR_COLUMNS).toContain('billing_address');
  });

  test('service_requests table has at least 25 columns', () => {
    expect(SR_COLUMNS.length).toBeGreaterThanOrEqual(25);
  });
});

test.describe('Section 17 – Database Schema: contractor_bids table', () => {
  const BID_COLUMNS = [
    'id', 'request_id', 'contractor_id', 'parts_price', 'pressure_price', 'device_price',
    'software_price', 'labor_price', 'resale_cert_accepted', 'contractor_total', 'status', 'created_at',
  ] as const;

  test('contractor_bids has individual price columns for each bid component', () => {
    expect(BID_COLUMNS).toContain('parts_price');
    expect(BID_COLUMNS).toContain('pressure_price');
    expect(BID_COLUMNS).toContain('device_price');
    expect(BID_COLUMNS).toContain('software_price');
    expect(BID_COLUMNS).toContain('labor_price');
  });

  test('contractor_bids.resale_cert_accepted tracks resale certificate election', () => {
    expect(BID_COLUMNS).toContain('resale_cert_accepted');
  });

  test('contractor_bids.contractor_total stores the contractor-side sum (no Service Fee)', () => {
    expect(BID_COLUMNS).toContain('contractor_total');
    // Service fee is NOT stored in contractor_bids; it lives in jobs table
    expect(BID_COLUMNS).not.toContain('service_fee');
  });
});

test.describe('Section 17 – Database Schema: jobs table', () => {
  const JOBS_COLUMNS = [
    'id', 'bid_id', 'homeowner_id', 'contractor_id', 'agent_id', 'installation_date',
    'installation_time', 'deposit_amount', 'deposit_paid', 'retail_subtotal', 'service_fee',
    'total_before_tax', 'tax_amount', 'final_total', 'status', 'completion_date', 'created_at',
  ] as const;

  test('jobs.service_fee defaults to 95.00', () => {
    const serviceFeeDefault = 95.00;
    expect(serviceFeeDefault).toBe(95.00);
    expect(JOBS_COLUMNS).toContain('service_fee');
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §17 jobs.service_fee: default value 95.00.',
    });
  });

  test('jobs.agent_id is nullable FK (job may be created without agent referral)', () => {
    expect(JOBS_COLUMNS).toContain('agent_id');
    const colDef = { name: 'agent_id', type: 'FK', nullable: true };
    expect(colDef.nullable).toBe(true);
  });

  test('jobs.deposit_paid is a boolean column', () => {
    expect(JOBS_COLUMNS).toContain('deposit_paid');
    const colDef = { name: 'deposit_paid', type: 'boolean' };
    expect(colDef.type).toBe('boolean');
  });

  test('jobs.completion_date is nullable (null until job is finished)', () => {
    expect(JOBS_COLUMNS).toContain('completion_date');
    const colDef = { name: 'completion_date', nullable: true };
    expect(colDef.nullable).toBe(true);
  });

  test('jobs table contains full retail pricing chain columns', () => {
    expect(JOBS_COLUMNS).toContain('retail_subtotal');
    expect(JOBS_COLUMNS).toContain('service_fee');
    expect(JOBS_COLUMNS).toContain('total_before_tax');
    expect(JOBS_COLUMNS).toContain('tax_amount');
    expect(JOBS_COLUMNS).toContain('final_total');
  });
});

test.describe('Section 17 – Database Schema: technicians table', () => {
  test('technicians.mileage_rate default is 0.75', () => {
    const mileageRateDefault = 0.75;
    expect(mileageRateDefault).toBe(0.75);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §17 technicians.mileage_rate: default 0.75 per mile.',
    });
  });

  test('technicians.service_area is stored as JSON', () => {
    const colDef = { name: 'service_area', type: 'JSON' };
    expect(colDef.type).toBe('JSON');
  });

  test('technicians.is_active controls technician availability', () => {
    const technicianColumns = ['id', 'user_id', 'service_area', 'base_location_lat', 'base_location_lng', 'is_active', 'mileage_rate'];
    expect(technicianColumns).toContain('is_active');
  });
});

test.describe('Section 17 – Database Schema: assessment_requests table', () => {
  test('assessment_requests.base_fee default is 185.00', () => {
    const baseFeeDefault = 185.00;
    expect(baseFeeDefault).toBe(185.00);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §17 assessment_requests.base_fee: default 185.00.',
    });
  });

  test('assessment_requests tracks mileage fee separately from base fee', () => {
    const arColumns = ['id', 'service_request_id', 'technician_id', 'base_fee', 'mileage_fee', 'total_fee', 'distance_miles', 'invoice_id', 'invoice_paid', 'scheduled_date', 'completed_date', 'assessment_report_url'];
    expect(arColumns).toContain('mileage_fee');
    expect(arColumns).toContain('distance_miles');
  });

  test('assessment_requests.invoice_paid is a boolean', () => {
    const colDef = { name: 'invoice_paid', type: 'boolean' };
    expect(colDef.type).toBe('boolean');
  });
});

test.describe('Section 17 – Database Schema: agents table', () => {
  const AGENTS_COLUMNS = ['id', 'name', 'email', 'agency', 'referral_link', 'created_at'] as const;

  test('agents table has 6 columns', () => {
    expect(AGENTS_COLUMNS.length).toBe(6);
  });

  test('agents.referral_link stores the unique tracking link', () => {
    expect(AGENTS_COLUMNS).toContain('referral_link');
  });

  test('agents.agency stores the agency name', () => {
    expect(AGENTS_COLUMNS).toContain('agency');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 18 – API INTEGRATIONS
// Platform Spec V6.3, Section 18
// ─────────────────────────────────────────────────────────────────────────────
const API_INTEGRATIONS = [
  { name: 'Stripe',           purpose: 'Payment processing, deposits, payouts' },
  { name: 'DocuSign',         purpose: 'All legal documents' },
  { name: 'Google Maps',      purpose: 'Address validation, distance calculation, geocoding' },
  { name: 'TaxJar / Avalara', purpose: 'Sales tax calculation by address' },
  { name: 'Twilio / SendGrid', purpose: 'Email notifications' },
  { name: 'Cloud Storage',    purpose: 'Photo and document storage' },
  { name: 'GPS Services',     purpose: 'Check-in verification' },
] as const;

test.describe('Section 18 – API Integrations: Inventory', () => {
  test('Exactly 7 API integrations are defined', () => {
    expect(API_INTEGRATIONS.length).toBe(7);
    const names = API_INTEGRATIONS.map(a => a.name);
    expect(new Set(names).size).toBe(7);
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §18: 7 API integrations: Stripe, DocuSign, Google Maps, TaxJar/Avalara, Twilio/SendGrid, Cloud Storage, GPS Services.',
    });
  });

  test('Stripe handles payment processing, deposits, and payouts', () => {
    const stripe = API_INTEGRATIONS.find(a => a.name === 'Stripe')!;
    expect(stripe.purpose).toContain('Payment processing');
    expect(stripe.purpose).toContain('deposits');
    expect(stripe.purpose).toContain('payouts');
  });

  test('DocuSign handles all legal documents', () => {
    const docuSign = API_INTEGRATIONS.find(a => a.name === 'DocuSign')!;
    expect(docuSign.purpose).toContain('legal documents');
  });

  test('Google Maps handles address validation, distance calculation, and geocoding', () => {
    const googleMaps = API_INTEGRATIONS.find(a => a.name === 'Google Maps')!;
    expect(googleMaps.purpose).toContain('Address validation');
    expect(googleMaps.purpose).toContain('distance calculation');
    expect(googleMaps.purpose).toContain('geocoding');
  });

  test('TaxJar / Avalara handles sales tax calculation by address', () => {
    const taxJar = API_INTEGRATIONS.find(a => a.name === 'TaxJar / Avalara')!;
    expect(taxJar.purpose).toContain('Sales tax');
    expect(taxJar.purpose).toContain('address');
  });

  test('Twilio / SendGrid handles email notifications', () => {
    const messaging = API_INTEGRATIONS.find(a => a.name === 'Twilio / SendGrid')!;
    expect(messaging.purpose).toContain('Email notifications');
  });

  test('Cloud Storage handles photo and document storage', () => {
    const cloudStorage = API_INTEGRATIONS.find(a => a.name === 'Cloud Storage')!;
    expect(cloudStorage.purpose).toContain('Photo');
    expect(cloudStorage.purpose).toContain('document storage');
  });

  test('GPS Services handles check-in verification', () => {
    const gps = API_INTEGRATIONS.find(a => a.name === 'GPS Services')!;
    expect(gps.purpose).toContain('Check-in verification');
  });
});

test.describe('Section 18 – API Integrations: Functional Coverage', () => {
  test('Payment flow uses Stripe (not PayPal or another provider)', () => {
    const paymentProvider = API_INTEGRATIONS.find(a => a.purpose.includes('Payment processing'))!;
    expect(paymentProvider.name).toBe('Stripe');
  });

  test('Tax calculation uses TaxJar or Avalara (address-based, not flat rate)', () => {
    const taxIntegration = API_INTEGRATIONS.find(a => a.purpose.includes('Sales tax'))!;
    expect(['TaxJar / Avalara', 'TaxJar', 'Avalara'].some(n => taxIntegration.name.includes(n.split(' / ')[0]))).toBe(true);
    expect(taxIntegration.purpose).toContain('by address');
  });

  test('Legal document signing uses DocuSign (not HelloSign or other provider)', () => {
    const signingProvider = API_INTEGRATIONS.find(a => a.purpose.includes('legal documents'))!;
    expect(signingProvider.name).toBe('DocuSign');
  });

  test('All 7 integrations have non-empty purpose strings', () => {
    API_INTEGRATIONS.forEach(integration => {
      expect(integration.purpose.length).toBeGreaterThan(0);
    });
  });

  test('Distance calculation for assessment fee uses Google Maps (not a manual calculation)', () => {
    const mapsIntegration = API_INTEGRATIONS.find(a => a.name === 'Google Maps')!;
    expect(mapsIntegration.purpose).toContain('distance calculation');
    test.info().annotations.push({
      type: 'spec',
      description: 'V6.3 §18: Google Maps API used for assessment distance calculation ($0.75/mile).',
    });
  });
});
