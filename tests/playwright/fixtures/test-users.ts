/**
 * MrSurety QA – Test Credentials
 *
 * Update these with staging credentials before running tests.
 * Do NOT commit real production credentials here.
 * Use environment variables (AGENT_EMAIL, AGENT_PASSWORD, etc.) in CI.
 */
export const TEST_USERS = {
  agent: {
    email: process.env.AGENT_EMAIL || 'agent.test1@mrsurety-qa.com',
    password: process.env.AGENT_PASSWORD || 'QAtest@123',
    name: 'Alex Johnson',
  },
  homeowner: {
    email: process.env.HOMEOWNER_EMAIL || 'homeowner.test1@mrsurety-qa.com',
    password: process.env.HOMEOWNER_PASSWORD || 'QAtest@123',
    name: 'Sam Williams',
    address: '123 Main St, Los Angeles CA 90001',
  },
  homeownerLinked: {
    email: process.env.HOMEOWNER_LINKED_EMAIL || 'homeowner.test2@mrsurety-qa.com',
    password: process.env.HOMEOWNER_LINKED_PASSWORD || 'QAtest@123',
    name: 'Jamie Lee',
    address: '456 Oak Ave, Anaheim CA 92801',
  },
  contractor: {
    email: process.env.CONTRACTOR_EMAIL || 'contractor.test1@mrsurety-qa.com',
    password: process.env.CONTRACTOR_PASSWORD || 'QAtest@123',
    name: 'Bob Miller',
    company: 'Miller Construction LLC',
  },
  technician: {
    email: process.env.TECH_EMAIL || 'tech.test1@mrsurety-qa.com',
    password: process.env.TECH_PASSWORD || 'QAtest@123',
    name: 'Dave Torres',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin.qa@mrsurety-qa.com',
    password: process.env.ADMIN_PASSWORD || 'QAadmin@123',
  },
} as const;

export const homeownerNoAgent = {
  email: process.env.HOMEOWNER_NO_AGENT_EMAIL || 'homeowner.test3@mrsurety-qa.com',
  password: process.env.HOMEOWNER_NO_AGENT_PASSWORD || 'QAtest@123',
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
