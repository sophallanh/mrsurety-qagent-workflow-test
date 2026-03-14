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
