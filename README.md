# CaseThread

**Multi-agent legal research and drafting system with project-based memory, template-driven document generation, and validated legal citations.**

## Overview

CaseThread is a sophisticated legal technology platform that enables legal professionals to conduct comprehensive research, maintain project-scoped memory, and generate high-quality legal documents through AI-driven agents and structured templates.

## Architecture

- **Frontend**: Electron + React + TypeScript
- **Backend**: Node.js orchestration layer + Python AI services
- **Data**: SQLite + FAISS/Chroma vector databases
- **APIs**: CourtListener + Case.law integration

## Quick Start

### Prerequisites

- **Node.js**: Version 18+ 
- **Python**: Version 3.9+
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sinedd777/CaseThread.git
   cd CaseThread
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Python environment**
   ```bash
   python3 -m venv python-services
   source python-services/bin/activate  # On Windows: python-services\Scripts\activate
   pip install -r python-services/requirements.txt
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

### Development

#### Quick Start (Automated)
```bash
# Start all services
./scripts/dev-start.sh

# Stop all services
./scripts/dev-stop.sh
```

#### Manual Development
```bash
# Terminal 1: Start Python services
cd python-services
source bin/activate  # On Windows: Scripts\activate
python main.py

# Terminal 2: Start Electron app
npm start

# Terminal 3: Development build (optional)
npm run build:watch
```

### Available Scripts

- `npm run build` - Build TypeScript
- `npm run build:watch` - Build with watch mode
- `npm start` - Start Electron app
- `npm run dev` - Development mode with auto-reload
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run pack` - Package for distribution
- `npm run dist` - Build distributable

### API Documentation

Once the Python services are running, visit:
- **API Docs**: http://localhost:8080/docs
- **Health Check**: http://localhost:8080/health

## Features

### Core Components

- **Project Memory Manager**: Persistent research context per project
- **Legal Research Agents**: Specialized AI agents for different legal domains
- **Template Engine**: Generate documents from JSON templates
- **Citation Validator**: Verify legal citations through CourtListener
- **Multi-Agent System**: Orchestrated AI agents for comprehensive analysis

### Legal Data Sources

- **CourtListener**: Primary source for legal opinions and citations
- **Case.law**: Secondary source for historical cases (6.9M+ opinions)

### Document Templates

Pre-built templates for common legal documents:
- Non-Disclosure Agreements (NDAs)
- Patent Applications
- Trademark Applications
- Cease & Desist Letters
- Office Action Responses
- Technology Transfer Agreements

## Project Structure

```
CaseThread/
├── src/
│   ├── main/              # Electron main process
│   └── renderer/          # React application
├── python-services/       # Python AI agents
│   ├── main.py           # FastAPI application
│   ├── requirements.txt  # Python dependencies
│   └── services/         # Agent implementations
├── templates/            # Legal document templates
├── scripts/              # Development scripts
├── docs/                 # Documentation
└── memory-bank/          # Project memory system
```

## Memory Bank System

CaseThread uses a comprehensive memory bank system for persistent context:

- **Project Brief**: Foundation and scope
- **Product Context**: User experience and goals
- **System Patterns**: Architecture and design
- **Tech Context**: Technology stack and setup
- **Active Context**: Current work and priorities
- **Progress**: Implementation tracking

See `memory-bank/README.md` for detailed information.

## Development Status

**Current Phase**: Foundation Setup ✅  
**Overall Progress**: 15% Complete

### ✅ Completed
- Memory bank system and documentation
- Node.js + TypeScript + Electron setup
- Python FastAPI service structure
- Basic project scaffolding
- Development scripts and tooling

### 🔄 In Progress
- Core module implementation
- Template system development
- Agent framework foundation

### 📋 Planned
- CourtListener API integration
- Case.law API integration
- Vector database implementation
- Legal document generation
- Citation validation system

## Contributing

1. Read the memory bank documentation in `memory-bank/`
2. Check current progress in `memory-bank/activeContext.md`
3. Follow the development setup instructions above
4. Submit pull requests with clear descriptions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions, issues, or contributions:
- **GitHub Issues**: [Create an issue](https://github.com/sinedd777/CaseThread/issues)
- **Documentation**: Check the `docs/` directory
- **Memory Bank**: See `memory-bank/` for comprehensive project context

---

*CaseThread is an open-source legal AI platform designed to make sophisticated legal research and document generation accessible to legal professionals of all sizes.* 