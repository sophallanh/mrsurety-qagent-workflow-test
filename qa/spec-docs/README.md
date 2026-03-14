# Specification Docs – MrSurety QA

This folder contains reference documents, platform specifications, and guides used during QA testing.

## 📄 Master Reference – Christopher's Testing Doc

> **Always check this Google Doc first** for the definitive expected behavior:  
> **[MrSurety QA Testing Instructions](https://docs.google.com/document/d/1SDDd29PN9Z9vc6wg1eIAewDJnNhHa_aWGzfs_mqL8dU/edit?usp=sharing)**  
> A local reference copy is at `qa/spec-docs/CHRISTOPHER_TESTING_DOC.md`.

---

## Folder Structure

```
spec-docs/
├── CHRISTOPHER_TESTING_DOC.md  ← Master reference (Christopher's Google Doc)
├── service-form/          # Service request form specifications
├── email-templates/       # Email trigger templates and expected content
├── docusign-templates/    # DocuSign document templates
├── workflow-guides/       # Short and long workflow documentation
└── admin-guides/          # Admin dashboard and approval workflow guides
```

## How to Use

1. **Start with** `CHRISTOPHER_TESTING_DOC.md` — this has the Google Doc link and a full summary.
2. Place PDF, DOCX, or Markdown specification files in the appropriate subfolder.
3. Reference these docs when verifying expected behavior during testing.
4. If a platform behavior does not match a spec doc, file a bug report in `qa/bug-reports/`.

## Documents to Add

> ⚠️ Add actual PDFs/DOCXs from Christopher when received. Placeholder list below:

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
