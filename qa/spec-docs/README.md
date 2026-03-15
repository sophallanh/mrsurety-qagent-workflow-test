# Specification Docs – MrSurety QA

This folder contains reference documents, platform specifications, and guides used during QA testing.

## 📄 Master Reference – Christopher's Testing Doc

> **Always check this Google Doc first** for the definitive expected behavior:  
> **[MrSurety QA Testing Instructions](https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing)**  
> A local reference copy is at `qa/spec-docs/CHRISTOPHER_TESTING_DOC.md`.

## 📧 Christopher's Original Email

Christopher's original instructions email is captured verbatim at `qa/spec-docs/CHRISTOPHER_ORIGINAL_EMAIL.md`.  
It contains 5 key Google Doc reference links — see table below.

---

## 🔗 All Google Doc Reference Links (from Christopher)

| Document | Google Doc Link |
|----------|----------------|
| **Service Form** | https://docs.google.com/document/d/1jXC_fU0wY3HKzIhmDQpfIiz6h3o0wBzsFMFScWoatis/edit?tab=t.0#heading=h.aohr1jyeas59 |
| **Short Version Workflow** | https://docs.google.com/document/d/1CUxJ-ArzwghjGvoZydzT1u9NgQCgjH_1ltBg9P8pJAI/edit?tab=t.0 |
| **Long Version Workflow** | https://docs.google.com/document/d/1V-WCoz8HbMHRYNo5NTINoX11MXjwEcRJuWVry0TgciM/edit?tab=t.0#heading=h.aonqccacf2d3 |
| **Email & DocuSign Examples** | https://docs.google.com/document/d/1xjv0Ol1G6NVfmIpYRVuX0wOwplJsdX-B6BTUiUefSw8/edit?tab=t.0 |
| **QA Organizing/Summary Doc** | https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing |

---

## Folder Structure

```
spec-docs/
├── CHRISTOPHER_TESTING_DOC.md   ← Full 9-part testing guide (master reference)
├── CHRISTOPHER_ORIGINAL_EMAIL.md ← Original email + all 5 Google Doc links
├── service-form/          # Service request form specifications
│   └── PLACEHOLDER.md    # → Links to Service Form Google Doc
├── email-templates/       # Email trigger templates and expected content
│   └── PLACEHOLDER.md    # → Links to Email & DocuSign Examples Google Doc
├── docusign-templates/    # DocuSign document templates
│   └── PLACEHOLDER.md    # → Links to Email & DocuSign Examples Google Doc
├── workflow-guides/       # Short and long workflow documentation
│   ├── PLACEHOLDER.md    # → Links to Short + Long Workflow Google Docs
│   └── SHORT_WORKFLOW_GUIDE.md  ← Local condensed reference (all 9 workflows)
└── admin-guides/          # Admin dashboard and approval workflow guides
    └── PLACEHOLDER.md
```

## How to Use

1. **Start with** `CHRISTOPHER_TESTING_DOC.md` — full 9-part guide with all details
2. **Original email** at `CHRISTOPHER_ORIGINAL_EMAIL.md` — raw instructions from Christopher
3. Click the Google Doc links in the table above to access live reference docs
4. Place any downloaded PDFs/DOCXs in the appropriate subfolder
5. Reference these docs when verifying expected behavior during testing
6. If a platform behavior does not match a spec doc, file a bug report in `qa/bug-reports/`

## Documents to Add (when received from Christopher)

| Subfolder | Expected Document |
|-----------|------------------|
| `service-form/` | Service Form Specification.pdf |
| `email-templates/` | Email Templates Guide.pdf |
| `docusign-templates/` | DocuSign Templates Reference.pdf |
| `workflow-guides/` | MR SURETY – TESTING GUIDE FOR QA TEAM.pdf |
| `workflow-guides/` | Short Workflow Doc.pdf |
| `workflow-guides/` | Long Workflow Doc.pdf |
| `admin-guides/` | Admin Dashboard Guide.pdf |
| `admin-guides/` | Contractor Approval Workflow.pdf |
