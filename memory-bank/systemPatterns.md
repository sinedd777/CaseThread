# CaseThread System Patterns

## System Architecture Overview

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Electron UI   │    │   Node.js       │    │   Python        │
│   (React)       │<-->│   Controller    │<-->│   Agent         │
│                 │    │   Layer         │    │   Services      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Local Storage │
                       │   SQLite +      │
                       │   FAISS/Chroma  │
                       └─────────────────┘
```

### Layer Separation
- **Presentation Layer:** Electron + React (UI/UX)
- **Business Logic Layer:** Node.js TypeScript (orchestration)
- **Agent Layer:** Python microservices (AI/ML processing)
- **Data Layer:** SQLite + vector databases (persistence)

## Core Design Patterns

### 1. Multi-Agent Architecture
**Pattern:** Specialized agents for different legal domains
- **Orchestrator:** Central coordinator for agent interactions
- **Specialist Agents:** Domain-specific legal reasoning
- **Service Agents:** Utility functions (retrieval, citation, etc.)

```typescript
interface Agent {
  process(input: AgentInput): Promise<AgentOutput>;
  getCapabilities(): AgentCapabilities;
  getMemory(): AgentMemory;
}
```

### 2. Project-Scoped Memory
**Pattern:** Isolated memory contexts per legal project
- Each project maintains its own research context
- Memory includes queries, cases, highlights, and insights
- Persistent across sessions with SQLite + vector storage

```sql
-- Project isolation pattern
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT,
  jurisdiction TEXT,
  created DATETIME
);

CREATE TABLE project_memories (
  project_id TEXT,
  memory_type TEXT,
  content JSON,
  vector_id TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

### 3. Template-Driven Document Generation
**Pattern:** Structured template system with variable injection
- JSON-based template definitions
- Mustache/Handlebars rendering engine
- Multi-tone generation (assertive, conservative, persuasive)

```json
{
  "template_id": "motion_suppress",
  "sections": [
    {
      "title": "Introduction",
      "required_vars": ["client_name", "case_number"],
      "content_slots": ["legal_standard", "factual_background"]
    }
  ],
  "citation_slots": ["controlling_authority", "supporting_cases"]
}
```

### 4. Data Source Abstraction
**Pattern:** Unified interface for multiple legal data sources
- Primary: CourtListener API
- Secondary: Case.law API
- Fallback strategy for API failures
- Rate limiting and caching

```typescript
interface LegalDataSource {
  search(query: SearchQuery): Promise<SearchResult[]>;
  getCitation(caseId: string): Promise<Citation>;
  validateCitation(citation: string): Promise<ValidationResult>;
}
```

## Key Technical Decisions

### 1. Electron + React Frontend
**Decision:** Desktop-first approach with Electron
**Reasoning:** 
- Native OS integration for file handling
- Better performance for document editing
- Secure local storage for sensitive legal data
- Cross-platform compatibility

### 2. Node.js Orchestration Layer
**Decision:** TypeScript Node.js for business logic
**Reasoning:**
- Strong ecosystem for API integrations
- Easy IPC communication with Electron
- Excellent JSON handling for templates
- Type safety with TypeScript

### 3. Python Agent Services
**Decision:** Python microservices for AI/ML processing
**Reasoning:**
- Rich ecosystem for NLP and embeddings
- Established legal AI libraries
- Easy integration with vector databases
- Flexible deployment options (local or remote)

### 4. SQLite + Vector Database Storage
**Decision:** Hybrid storage approach
**Reasoning:**
- SQLite for structured data (metadata, citations)
- FAISS/Chroma for vector embeddings
- Local storage for data privacy
- No external database dependencies

### 5. Template-Based Document Generation
**Decision:** JSON templates with Mustache/Handlebars
**Reasoning:**
- Separation of content and presentation
- Easy template customization
- Multi-format output support
- Version control for templates

## Component Relationships

### Agent Communication Flow
1. **User Query** → Query Interpreter → Structured Search
2. **Retriever** → External APIs → Raw Results
3. **Embedder** → Vector Database → Similarity Scores
4. **Ranker** → Ranked Results → User Interface
5. **Specialist Agents** → Domain Analysis → Project Memory

### Citation Verification Pipeline
1. **Document Draft** → Citation Extractor → Citation List
2. **Citation Verifier** → CourtListener API → Validation Results
3. **Citation Formatter** → Standard Format → Document Integration

### Memory Management System
1. **Research Activities** → Memory Recorder → Structured Storage
2. **Vector Embeddings** → FAISS Index → Similarity Search
3. **Context Retrieval** → Memory Query → Relevant Context

## Integration Patterns

### External API Integration
- **Rate Limiting:** Exponential backoff for API calls
- **Caching:** Redis-style caching for frequently accessed data
- **Fallback:** Multi-source strategy for data availability
- **Error Handling:** Graceful degradation for API failures

### Inter-Process Communication
- **Electron IPC:** Main process to renderer communication
- **HTTP/gRPC:** Node.js to Python service communication
- **WebSockets:** Real-time updates for long-running processes
- **Message Queues:** Asynchronous task processing

### Data Consistency
- **Transaction Management:** ACID compliance for critical operations
- **Conflict Resolution:** Last-write-wins for concurrent edits
- **Backup Strategy:** Automated project backups
- **Version Control:** Document version tracking 