#!/bin/bash

# Quick Start Script for Campus Nutrition App

echo "=========================================="
echo "Campus Nutrition Management App"
echo "=========================================="
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if ! timeout 3 node -e "const { MongoClient } = require('mongodb'); new MongoClient('mongodb://localhost:27017').connect().catch(e => process.exit(1));" 2>/dev/null; then
    echo "⚠️  MongoDB does not appear to be running."
    echo "Please ensure MongoDB is started with: mongod"
    echo "Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Starting the application..."
echo "   The app will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
