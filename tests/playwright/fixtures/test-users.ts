/**
 * MrSurety QA – Test Credentials
 *
 * Live app: https://frontend-tan-five-46.vercel.app
 *
 * All QA accounts use the platform password provided by Christopher.
 * Set ADMIN_PASSWORD (and optionally other _PASSWORD env vars) before running.
 * Do NOT commit real passwords to source code.
 *
 * Password for all QA accounts: set via environment variables.
 * Default fallback is the shared QA password from Christopher's workflow doc.
 */
export const TEST_USERS = {
  agent: {
    email: process.env.AGENT_EMAIL || 'agent.test1@mrsurety-qa.com',
    password: process.env.AGENT_PASSWORD || 'MrSurety2026!',
    name: 'Alex Johnson',
  },
  homeowner: {
    email: process.env.HOMEOWNER_EMAIL || 'homeowner.test1@mrsurety-qa.com',
    password: process.env.HOMEOWNER_PASSWORD || 'MrSurety2026!',
    name: 'Sam Williams',
    address: '123 Main St, Los Angeles CA 90001',
  },
  homeownerLinked: {
    email: process.env.HOMEOWNER_LINKED_EMAIL || 'homeowner.test2@mrsurety-qa.com',
    password: process.env.HOMEOWNER_LINKED_PASSWORD || 'MrSurety2026!',
    name: 'Jamie Lee',
    address: '456 Oak Ave, Anaheim CA 92801',
  },
  contractor: {
    email: process.env.CONTRACTOR_EMAIL || 'contractor.test1@mrsurety-qa.com',
    password: process.env.CONTRACTOR_PASSWORD || 'MrSurety2026!',
    name: 'Bob Miller',
    company: 'Miller Construction LLC',
  },
  technician: {
    email: process.env.TECH_EMAIL || 'tech.test1@mrsurety-qa.com',
    password: process.env.TECH_PASSWORD || 'MrSurety2026!',
    name: 'Dave Torres',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@mrsurety.com',
    // ⚠️  Set ADMIN_PASSWORD env var before running. Provided by Christopher.
    password: process.env.ADMIN_PASSWORD || 'MrSurety2026!',
  },
} as const;

export const homeownerNoAgent = {
  email: process.env.HOMEOWNER_NO_AGENT_EMAIL || 'homeowner.test3@mrsurety-qa.com',
  password: process.env.HOMEOWNER_NO_AGENT_PASSWORD || 'MrSurety2026!',
  name: 'Chris Brown',
  address: '789 Pine Rd, Irvine CA 92604',
} as const;

/**
 * Insurance Agent – the contractor's external insurance agent.
 * This person has NO platform account; they receive a secure upload link via email
 * and upload COI / endorsement documents on behalf of the contractor.
 */
export const insuranceAgent = {
  email: process.env.INSURANCE_AGENT_EMAIL || 'ins.agent.test@mrsurety-qa.com',
  name: 'Rachel Kim',
  company: 'Kim Insurance Brokers',
} as const;
