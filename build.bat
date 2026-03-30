@echo off
REM Build script for production deployment (Windows)

echo.
echo 🚀 Starting production build...
echo.

REM Build frontend
echo 📦 Building frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
  echo ❌ Frontend build failed
  exit /b 1
)
cd ..
echo ✅ Frontend built successfully
echo.

REM Verify backend dependencies
echo 📦 Checking backend dependencies...
cd backend
call npm install --production
if %errorlevel% neq 0 (
  echo ❌ Backend dependency installation failed
  exit /b 1
)
cd ..
echo ✅ Backend dependencies installed
echo.

echo ✅ Build complete!
echo.
echo 📋 Next steps:
echo 1. Update backend\.env with production values:
echo    - MONGO_URI: Your MongoDB Atlas connection string
echo    - JWT_SECRET: A strong random secret
echo    - EMAIL_USER ^& EMAIL_PASS: SMTP credentials
echo    - NODE_ENV: Set to 'production'
echo.
echo 2. Start the server:
echo    cd backend ^&^& npm start
echo.
echo The frontend files will be served from backend/server.js
