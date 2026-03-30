#!/bin/bash

# Build script for production deployment

echo "🚀 Starting production build..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Frontend build failed"
  exit 1
fi
cd ..
echo "✅ Frontend built successfully"

# Verify backend dependencies
echo "📦 Checking backend dependencies..."
cd backend
npm install --production
if [ $? -ne 0 ]; then
  echo "❌ Backend dependency installation failed"
  exit 1
fi
cd ..
echo "✅ Backend dependencies installed"

echo ""
echo "✅ Build complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with production values:"
echo "   - MONGO_URI: Your MongoDB Atlas connection string"
echo "   - JWT_SECRET: A strong random secret"
echo "   - EMAIL_USER & EMAIL_PASS: SMTP credentials"
echo "   - NODE_ENV: Set to 'production'"
echo ""
echo "2. Start the server:"
echo "   cd backend && npm start"
echo ""
echo "The frontend files will be served from backend/server.js"
