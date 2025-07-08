#!/bin/bash
# CaseThread Development Startup Script
# This script starts all development services

set -e

echo "🚀 Starting CaseThread Development Environment"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    exit 1
fi

# Install Node.js dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

# Activate Python virtual environment and install dependencies
echo "🐍 Setting up Python environment..."
if [ ! -d "python-services/bin" ]; then
    echo "📦 Installing Python dependencies..."
    python3 -m venv python-services
    source python-services/bin/activate
    pip install -r python-services/requirements.txt
else
    source python-services/bin/activate
fi

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Start Python services in background
echo "🚀 Starting Python agent services..."
cd python-services && python main.py &
PYTHON_PID=$!
cd ..

# Give Python service time to start
sleep 2

# Start Electron app
echo "🖥️  Starting Electron application..."
npm start

# Cleanup on exit
trap "kill $PYTHON_PID" EXIT

echo "✅ Development environment ready!"
echo "   - Python services: http://localhost:8080"
echo "   - Electron app: Running"
echo "   - API docs: http://localhost:8080/docs" 