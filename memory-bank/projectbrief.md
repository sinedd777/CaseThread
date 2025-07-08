# CaseThread Project Brief

## Project Overview
**Project Name:** CaseThread  
**Version:** 0.2  
**Type:** Multi-agent legal research and drafting system  

## Core Purpose
CaseThread is a sophisticated legal technology platform that enables legal professionals to conduct comprehensive research, maintain project-scoped memory, and generate high-quality legal documents through AI-driven agents and structured templates.

## Primary Goals
- **Persistent Research Memory:** Maintain project-scoped research memories across sessions
- **Multi-Agent Pipeline:** Run specialized legal reasoning agents for different domains
- **Real-World Data Integration:** Consume case law from CourtListener and Case.law APIs
- **Document Generation:** Create legal documents from structured templates with multiple tones/styles
- **Citation Validation:** Embed and verify legal citations automatically
- **Cross-Jurisdiction Analysis:** Compare doctrinal rules across different courts

## Key Features
1. **Project-Based Memory System:** Each legal project maintains its own research context
2. **Specialist Legal Agents:** Domain-specific reasoning for Constitutional Law, Criminal Law, Torts, Civil Rights, and Fact Pattern Mapping
3. **Template-Driven Drafting:** Generate documents with assertive, conservative, or persuasive tones
4. **Case Highlighting & Annotation:** Auto-highlight holdings and allow user annotations
5. **Citation Management:** Validate and format citations through CourtListener integration
6. **Cross-Jurisdiction Comparison:** Analyze doctrinal differences across jurisdictions

## Success Criteria
- Seamless integration with CourtListener and Case.law APIs
- Persistent project memory across sessions
- High-quality document generation with validated citations
- Efficient multi-agent research workflows
- Intuitive Electron-based user interface

## Scope
- Desktop application (Electron + React)
- Multi-agent Python backend services
- Local storage with vector database integration
- Template-based document generation system
- Legal citation verification and formatting

## Out of Scope (Initial Version)
- Web-based deployment
- Mobile applications
- Real-time collaboration features
- Advanced machine learning model training 