# mrsurety-qagent-workflow-test

Automated QA for Agent Referral Workflows and all platform workflows for MrSurety.

## Getting Started

See [qa/README.md](qa/README.md) for the full QA package, folder structure, and instructions for:
- Test user credentials
- Bug report templates
- Daily QA summary reports
- Screenshot and video capture guides (by workflow)
- Playwright automated test setup and usage
- Specification documents folder

## QA Status

See [qa/QA_STATUS.md](qa/QA_STATUS.md) for a complete status summary of all implemented items and what still requires manual execution on the live staging platform.

## Workflows Covered

- Agent Referral Link (Method 1) – referral code generation, single-use validation, multi-address testing
- Homeowner Service Request with Agent Email (Method 2) – multiple addresses and permit types
- Contractor Bidding & Estimate Upload
- Admin Dashboard – Approvals & Job Tracking
- Technician Work Order Receipt, DocuSign Sign-off & Job Completion
- Email & DocuSign Trigger Verification (50+ screenshot items)
- **Agent Upload Invite System** – Contractor sends secure upload link to insurance agent; agent uploads COI/endorsements; security controls and document type restrictions validated
- Edge Cases & Special Scenarios
