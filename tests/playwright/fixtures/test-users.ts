/**
 * MrSurety QA – Test Credentials
 *
 * Live app: https://frontend-tan-five-46.vercel.app
 *
 * These are the accounts to CREATE on the live app before running tests.
 * Do NOT commit real credentials; override via environment variables in CI or
 * by copying tests/.env.example → tests/.env.
 *
 * Admin account (already exists on the live app – provided by Christopher):
 *   Email:    admin@mrsurety.com
 *   Password: MrSurety2026!
 */
export const TEST_USERS = {
  agent: {
    email: process.env.AGENT_EMAIL || 'agent.test1@outlook.com',
    password: process.env.AGENT_PASSWORD || 'QAtest@2026!',
    name: 'Alex Johnson',
  },
  agent2: {
    email: process.env.AGENT2_EMAIL || 'agent.test2@outlook.com',
    password: process.env.AGENT2_PASSWORD || 'QAtest@2026!',
    name: 'Maria Garcia',
  },
  agent3: {
    email: process.env.AGENT3_EMAIL || 'agent.test3@outlook.com',
    password: process.env.AGENT3_PASSWORD || 'QAtest@2026!',
    name: 'James Wilson',
    company: 'Wilson Insurance Group',
  },
  homeowner: {
    email: process.env.HOMEOWNER_EMAIL || 'homeowner.test1@outlook.com',
    password: process.env.HOMEOWNER_PASSWORD || 'QAtest@2026!',
    name: 'Sam Williams',
    address: '123 Main St, Los Angeles CA 90001',
  },
  homeownerLinked: {
    email: process.env.HOMEOWNER_LINKED_EMAIL || 'homeowner.test2@outlook.com',
    password: process.env.HOMEOWNER_LINKED_PASSWORD || 'QAtest@2026!',
    name: 'Jamie Lee',
    address: '456 Oak Ave, Anaheim CA 92801',
  },
  contractor: {
    email: process.env.CONTRACTOR_EMAIL || 'contractor.test1@outlook.com',
    password: process.env.CONTRACTOR_PASSWORD || 'QAtest@2026!',
    name: 'Bob Miller',
    company: 'Miller Construction LLC',
  },
  contractor2: {
    email: process.env.CONTRACTOR2_EMAIL || 'contractor.test2@outlook.com',
    password: process.env.CONTRACTOR2_PASSWORD || 'QAtest@2026!',
    name: 'Linda Chen',
    company: 'Chen Builders Inc',
  },
  contractor3: {
    email: process.env.CONTRACTOR3_EMAIL || 'contractor.test3@outlook.com',
    password: process.env.CONTRACTOR3_PASSWORD || 'QAtest@2026!',
    name: 'Tony Rivera',
    company: 'Rivera Home Services',
  },
  technician: {
    email: process.env.TECH_EMAIL || 'tech.test1@outlook.com',
    password: process.env.TECH_PASSWORD || 'QAtest@2026!',
    name: 'Dave Torres',
  },
  admin: {
    // Real admin account on the live app – provided by Christopher
    email: process.env.ADMIN_EMAIL || 'admin@mrsurety.com',
    password: process.env.ADMIN_PASSWORD || 'MrSurety2026!',
  },
} as const;

export const homeownerNoAgent = {
  email: process.env.HOMEOWNER_NO_AGENT_EMAIL || 'homeowner.test3@outlook.com',
  password: process.env.HOMEOWNER_NO_AGENT_PASSWORD || 'QAtest@2026!',
  name: 'Chris Brown',
  address: '789 Pine Rd, Irvine CA 92604',
} as const;

/**
 * Insurance Agent – the contractor's external insurance agent.
 * This person has NO platform account; they receive a secure upload link via email
 * and upload COI / endorsement documents on behalf of the contractor.
 */
export const insuranceAgent = {
  email: process.env.INSURANCE_AGENT_EMAIL || 'ins.test2026@outlook.com',
  name: 'Rachel Kim',
  company: 'Kim Insurance Brokers',
} as const;
