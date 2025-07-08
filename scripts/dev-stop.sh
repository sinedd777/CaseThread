#!/bin/bash
# CaseThread Development Stop Script
# This script stops all development services

echo "🛑 Stopping CaseThread Development Environment"
echo "=============================================="

# Kill Python services
echo "🐍 Stopping Python agent services..."
pkill -f "python main.py" || true
pkill -f "uvicorn" || true

# Kill Electron processes
echo "🖥️  Stopping Electron application..."
pkill -f "electron" || true

# Kill any remaining Node.js processes
echo "📦 Stopping Node.js services..."
pkill -f "nodemon" || true
pkill -f "ts-node" || true

echo "✅ All services stopped!" 