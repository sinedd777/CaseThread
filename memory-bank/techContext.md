# CaseThread Technical Context

## Technology Stack

### Frontend Technologies
- **Electron**: Cross-platform desktop application framework
- **React**: UI component library for building interactive interfaces
- **TypeScript**: Type-safe JavaScript for better development experience
- **Electron IPC**: Inter-process communication between main and renderer processes

### Backend Technologies
- **Node.js**: JavaScript runtime for orchestration layer
- **TypeScript**: Type safety for server-side code
- **Python**: AI/ML processing and agent services
- **gRPC/REST**: Communication protocols between services

### Data Storage
- **SQLite**: Embedded database for structured data
- **FAISS**: Facebook AI Similarity Search for vector embeddings
- **Chroma**: Alternative vector database option
- **File System**: Local storage for documents and templates

### AI/ML Technologies
- **BGE Embeddings**: Open-source embedding models
- **Transformers**: Hugging Face library for NLP models
- **LangChain**: Framework for LLM application development
- **OpenAI API**: Optional integration for advanced language models

## External Dependencies

### Legal Data Sources
- **CourtListener API**: Primary source for legal opinions and citations
  - REST API for opinions, dockets, judges, metadata
  - Citation lookup and validation
  - Rate limits: Standard API rate limits apply
  - URL: https://www.courtlistener.com/api/

- **Case.law API**: Secondary source for historical cases
  - REST API for 6.9 million historical opinions
  - Rate limit: ~500 requests per day (public)
  - URL: https://case.law/api/

### Development Dependencies
- **Node.js**: Version 18+ recommended
- **Python**: Version 3.9+ required
- **npm/yarn**: Package management for JavaScript
- **pip/conda**: Package management for Python
- **Git**: Version control system

## Development Environment Setup

### Prerequisites
```bash
# Node.js (version 18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Python (version 3.9+)
sudo apt-get install python3.9 python3.9-pip python3.9-dev

# Git
sudo apt-get install git
```

### Project Setup
```bash
# Clone repository
git clone <repository-url>
cd CaseThread

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Setup development environment
npm run setup:dev
```

### Environment Variables
```bash
# .env file configuration
COURTLISTENER_API_KEY=your_api_key_here
CASELAW_API_KEY=your_api_key_here
PYTHON_SERVICE_PORT=8080
ELECTRON_DEV_MODE=true
LOG_LEVEL=debug
```

## Architecture Constraints

### Technical Limitations
- **Local Storage**: SQLite database size limitations
- **Vector Database**: FAISS memory requirements for large datasets
- **API Rate Limits**: CourtListener and Case.law API restrictions
- **Desktop Only**: Initial version limited to desktop platforms
- **Network Dependency**: Requires internet for API access

### Performance Considerations
- **Embedding Generation**: CPU-intensive for large document sets
- **Vector Search**: Memory usage scales with corpus size
- **API Latency**: Network delays for external data sources
- **Document Generation**: Template rendering performance

### Security Constraints
- **Local Data**: Sensitive legal information stored locally
- **API Keys**: Secure storage of external service credentials
- **File Permissions**: Proper access controls for document storage
- **Network Security**: Secure communication with external APIs

## Development Tools

### Code Quality
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Black**: Python code formatting
- **mypy**: Python type checking
- **Jest**: JavaScript testing framework
- **pytest**: Python testing framework

### Build Tools
- **Webpack**: JavaScript bundling
- **Electron Builder**: Application packaging
- **Docker**: Containerization for Python services
- **GitHub Actions**: CI/CD pipeline

### Development Utilities
- **Nodemon**: Auto-restart for Node.js development
- **Hot Reload**: React development server
- **Jupyter**: Interactive development for Python agents
- **Postman**: API testing and development

## Deployment Architecture

### Local Development
```
┌─────────────────┐
│   Electron UI   │ (npm run dev)
│   (React)       │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│   Node.js       │ (npm run server)
│   Controller    │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│   Python        │ (python app.py)
│   Agents        │
└─────────────────┘
```

### Production Packaging
```
┌─────────────────┐
│   Electron App  │ (Built with electron-builder)
│   ┌───────────┐ │
│   │   React   │ │
│   │   Bundle  │ │
│   └───────────┘ │
│   ┌───────────┐ │
│   │  Node.js  │ │
│   │  Services │ │
│   └───────────┘ │
│   ┌───────────┐ │
│   │  Python   │ │
│   │  Agents   │ │
│   └───────────┘ │
└─────────────────┘
```

## Integration Points

### API Integrations
- **CourtListener**: Primary legal data source
- **Case.law**: Secondary legal data source
- **OpenAI**: Optional advanced AI features
- **Local File System**: Document and template storage

### Inter-Service Communication
- **Electron IPC**: Main ↔ Renderer process communication
- **HTTP/REST**: Node.js ↔ Python service communication
- **WebSocket**: Real-time updates for long operations
- **File System**: Shared storage between components

### Data Flow Patterns
- **Request/Response**: Synchronous API calls
- **Event-Driven**: Asynchronous agent processing
- **Batch Processing**: Bulk data operations
- **Streaming**: Real-time data updates

## Scalability Considerations

### Performance Optimization
- **Caching**: API response caching
- **Indexing**: Efficient database queries
- **Lazy Loading**: On-demand resource loading
- **Connection Pooling**: Efficient resource utilization

### Future Scaling Options
- **Microservices**: Separate agent services
- **Container Orchestration**: Docker/Kubernetes deployment
- **Cloud Integration**: AWS/Azure hosting options
- **Database Scaling**: PostgreSQL migration path 