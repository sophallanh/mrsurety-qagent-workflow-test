/**
 * MrSurety QA – Test Credentials
 *
 * Live app: https://frontend-tan-five-46.vercel.app
 *
 * Source: Christopher's "MR SURETY – TESTING GUIDE FOR QA TEAM"
 *   Part 1 – User Types to Create
 *   Part 8 – Test User Credentials Template
 *
 * Admin account: admin@mrsurety.com / MrSurety2026! (provided by Christopher)
 * QA test accounts: @outlook.com / Test123! (create on platform before testing)
 *
 * CSLB license numbers for contractor testing: 999888 (contractor 1), 999777 (contractor 2)
 *
 * Set env vars before running to override defaults. Do NOT commit .env (real credentials).
 */
export const TEST_USERS = {
  agent: {
    email: process.env.AGENT_EMAIL || 'agent1@outlook.com',
    password: process.env.AGENT_PASSWORD || 'Test123!',
    name: 'Alex Johnson',
    company: 'State Farm Test',
  },
  agent2: {
    email: process.env.AGENT2_EMAIL || 'agent2@outlook.com',
    password: process.env.AGENT2_PASSWORD || 'Test123!',
    name: 'Maria Garcia',
    company: 'Allstate Test',
  },
  homeowner: {
    email: process.env.HOMEOWNER_EMAIL || 'homeowner1@outlook.com',
    password: process.env.HOMEOWNER_PASSWORD || 'Test123!',
    name: 'Sam Williams',
    address: '123 Main St, Los Angeles CA 90001',
    sqFt: 1800,        // under 2000 → 3/4" pipe
    yearBuilt: 2010,   // >5 years → pressure reducer REQUIRED
  },
  homeownerLinked: {
    email: process.env.HOMEOWNER_LINKED_EMAIL || 'homeowner2@outlook.com',
    password: process.env.HOMEOWNER_LINKED_PASSWORD || 'Test123!',
    name: 'Jamie Lee',
    address: '456 Oak Ave, Anaheim CA 92801',
    sqFt: 2500,        // 2001-3000 → 1" pipe
    yearBuilt: 2022,   // ≤5 years → pressure reducer NOT required
  },
  contractor: {
    email: process.env.CONTRACTOR_EMAIL || 'contractor1@outlook.com',
    password: process.env.CONTRACTOR_PASSWORD || 'Test123!',
    name: 'Bob Miller',
    company: 'Miller Construction LLC',
    cslb: '999888',    // test CSLB license number per Christopher's doc
    resaleCert: true,  // Accepts resale certificate (no tax added by contractor)
  },
  contractor2: {
    email: process.env.CONTRACTOR2_EMAIL || 'contractor2@outlook.com',
    password: process.env.CONTRACTOR2_PASSWORD || 'Test123!',
    name: 'Linda Chen',
    company: 'Chen Builders Inc',
    cslb: '999777',    // test CSLB license number per Christopher's doc
    resaleCert: false, // Does NOT accept resale cert (includes tax in prices)
  },
  technician: {
    email: process.env.TECH_EMAIL || 'tech1@outlook.com',
    password: process.env.TECH_PASSWORD || 'Test123!',
    name: 'Dave Torres',
    serviceAreas: ['92530', '92531'],
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@mrsurety.com',
    // ⚠️  Admin credentials provided by Christopher. Set ADMIN_PASSWORD env var before running.
    password: process.env.ADMIN_PASSWORD || 'MrSurety2026!',
  },
} as const;

export const homeownerNoAgent = {
  email: process.env.HOMEOWNER_NO_AGENT_EMAIL || 'homeowner3@outlook.com',
  password: process.env.HOMEOWNER_NO_AGENT_PASSWORD || 'Test123!',
  name: 'Chris Brown',
  address: '789 Pine Ln, Irvine CA 92604',
  sqFt: 3500,        // 3001-5000 → 1 1/4" pipe
  yearBuilt: 2000,   // >5 years → pressure reducer REQUIRED
} as const;

/**
 * Insurance Agent – the contractor's external insurance agent.
 * This person has NO platform account; they receive a secure upload link via email
 * and upload COI / endorsement documents on behalf of the contractor.
 */
export const insuranceAgent = {
  email: process.env.INSURANCE_AGENT_EMAIL || 'ins.agent.test@outlook.com',
  name: 'Rachel Kim',
  company: 'Kim Insurance Brokers',
} as const;

/**
 * Doc #5 – Homeowner Workflow Guide credentials.
 *
 * These are the two specific accounts called out in the Homeowner Workflow Guide:
 *   - testOwner: the primary returning homeowner account for workflow testing.
 *   - demoHomeowner: a fresh account used to verify the new-account first-run experience.
 *
 * Source: Doc #5 (Homeowner Workflow Guide)
 *   "Login: testowner@mrsurety.com | Password: MrSurety2026!"
 *   "For a fresh account: demo.homeowner@mrsurety.com"
 *
 * The demoHomeowner password is the same platform default used for all demo accounts.
 */
export const doc5TestOwner = {
  email: process.env.DOC5_TESTOWNER_EMAIL || 'testowner@mrsurety.com',
  password: process.env.DOC5_TESTOWNER_PASSWORD || 'MrSurety2026!',
  displayName: 'Test Owner',
} as const;

export const doc5DemoHomeowner = {
  email: process.env.DOC5_DEMO_HOMEOWNER_EMAIL || 'demo.homeowner@mrsurety.com',
  password: process.env.DOC5_DEMO_HOMEOWNER_PASSWORD || 'MrSurety2026!',
  displayName: 'Demo Homeowner',
} as const;

/**
 * Doc #6 – Agent Workflow Guide credentials.
 *
 * Source: Doc #6 (Agent Workflow Guide)
 *   "Login: testagent2@mrsurety.com | Password: MrSurety2026!"
 *   "Example Referral Link: https://frontend-tan-five-46.vercel.app/r/AG-F84604C0"
 *
 * Used by agent-workflow-guide-doc6.spec.ts to test:
 *   – Sharing referral link (copy button, QR code)
 *   – Tracking referrals (dashboard, Referrals page, Clients page)
 *   – Earning points (tier display, Points page, points history)
 */
export const doc6TestAgent = {
  email: process.env.DOC6_TESTAGENT2_EMAIL || 'testagent2@mrsurety.com',
  password: process.env.DOC6_TESTAGENT2_PASSWORD || 'MrSurety2026!',
  displayName: 'Test Agent 2',
  /** Referral link slug pattern: /r/AG-XXXXXXXX */
  referralLinkPattern: /\/r\/AG-[0-9A-F]{8}/i,
} as const;

/**
 * Doc #7 – Contractor Workflow Guide credentials.
 *
 * Source: Doc #7 (Contractor Workflow Guide)
 *   "Login: testpro@mrsurety.com (approved contractor) | Password: MrSurety2026!"
 *   "New contractor: testnewpro@mrsurety.com"
 *
 * Used by contractor-workflow-guide-doc7.spec.ts to test:
 *   – Getting Approved: new contractor signup, document upload, Pending Review state
 *   – Working a Job: dashboard action items, accept work order, My Installations
 *   – Completing the Work: before/after photos, Submit for Review, payment notification
 */
export const doc7TestPro = {
  email: process.env.DOC7_TESTPRO_EMAIL || 'testpro@mrsurety.com',
  password: process.env.DOC7_TESTPRO_PASSWORD || 'MrSurety2026!',
  displayName: 'Test Pro (Approved Contractor)',
} as const;

export const doc7TestNewPro = {
  email: process.env.DOC7_TESTNEWPRO_EMAIL || 'testnewpro@mrsurety.com',
  password: process.env.DOC7_TESTNEWPRO_PASSWORD || 'MrSurety2026!',
  displayName: 'Test New Pro (Unapproved Contractor)',
} as const;
