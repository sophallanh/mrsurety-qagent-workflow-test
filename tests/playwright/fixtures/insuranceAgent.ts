/**
 * MrSurety QA – Insurance Agent Persona
 *
 * This persona represents an **external insurance agent** who has NO platform
 * account. They are invited by a contractor and receive a secure one-time
 * upload link via email. All access is link-only; there is no username or
 * password to log in with.
 *
 * To run tests that use this persona, set the following environment variables:
 *
 *   INSURANCE_AGENT_EMAIL   – The insurance agent's email address
 *                             (used when the contractor sends the invite)
 *   AGENT_UPLOAD_LINK       – Full secure upload URL from the invite email
 *   REVOKED_UPLOAD_LINK     – A previously-revoked upload URL (security tests)
 *   EXPIRED_UPLOAD_LINK     – An upload URL older than 7 days (security tests)
 *
 * Example:
 *   INSURANCE_AGENT_EMAIL=ins.agent.test@mrsurety-qa.com \
 *   AGENT_UPLOAD_LINK=https://staging.mrsurety.com/agent-upload/<token> \
 *   npx playwright test agent-upload-invite
 */
export const insuranceAgent = {
  /** Email address the contractor uses when sending the upload invite. */
  email: process.env.INSURANCE_AGENT_EMAIL || 'ins.agent.test@mrsurety-qa.com',
  /** Display name – for reference in reports and UI assertions. */
  name: 'Rachel Kim',
  /** Company name – for reference in reports and UI assertions. */
  company: 'Kim Insurance Brokers',
} as const;
