#!/bin/bash

# EcoDashboard Startup Script
echo "🌍 Starting EcoDashboard..."
echo ""

# Get the current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if node_modules exists
if [ ! -d "$SCRIPT_DIR/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd "$SCRIPT_DIR"
    npm install
fi

if [ ! -d "$SCRIPT_DIR/api/node_modules" ]; then
    echo "📦 Installing API dependencies..."
    cd "$SCRIPT_DIR/api"
    npm install
fi

echo ""
echo "🚀 Starting Custom News API on port 3001..."
cd "$SCRIPT_DIR/api"
npm start &
API_PID=$!

echo "⏳ Waiting for API to start..."
sleep 3

echo ""
echo "🚀 Starting React Frontend on port 5173..."
cd "$SCRIPT_DIR"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ EcoDashboard is running!"
echo ""
echo "📡 Custom News API: http://localhost:3001"
echo "🌐 Dashboard: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping services...'; kill $API_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
