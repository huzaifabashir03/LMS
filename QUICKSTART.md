# Quick Start Guide

## 🚀 Development

### Run Locally

```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Backend runs on: http://localhost:5000
Frontend runs on: http://localhost:5173

### Seed Database (Optional)

```bash
cd backend
npm run seed
```

---

## 📦 Production Build

### Step 1: Build Frontend

```bash
cd frontend
npm run build
# Creates dist/ folder with optimized files
```

### Step 2: Prepare Backend

```bash
cd backend
npm install --production
```

### Step 3: Set Production Environment

Create/update `backend/.env`:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_very_secure_random_secret_key_here
FRONTEND_URL=https://yourdomain.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
```

### Step 4: Start Server

```bash
cd backend
npm start
```

Server runs on: http://localhost:5000

- Backend API: http://localhost:5000/api/\*
- Frontend SPA: http://localhost:5000/
- Fallback to React Router: All non-API routes render index.html

---

## 🌐 Hosting Platforms

### Heroku (free tier works)

```bash
# Install Heroku CLI, then:
heroku create your-app-name
heroku config:set NODE_ENV=production MONGO_URI=your_uri JWT_SECRET=your_secret
git push heroku main
```

### Railway / Render / Fly.io

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Auto-deploys on push to main

### VPS (DigitalOcean, Linode, AWS)

```bash
# SSH into server
ssh root@your_server_ip

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone your_repo_url
cd MERN

# Build
./build.sh  # or build app manually

# Use PM2 for process management
sudo npm install -g pm2
pm2 start backend/server.js --name "mern-app"
pm2 startup
pm2 save

# Use Nginx as reverse proxy
# Configure /etc/nginx/sites-available/default to proxy to :5000
sudo systemctl restart nginx
```

---

## 🔍 Verify Deployment

1. **Backend API**: `https://yourdomain.com/api/auth`
   - Should return API error (expected)

2. **Frontend**: `https://yourdomain.com/`
   - Should load React app

3. **Health Check**: `https://yourdomain.com/`
   - Should see "Smart Student Portal Backend is Running..."

---

## 🐛 Troubleshooting

| Issue                     | Solution                                  |
| ------------------------- | ----------------------------------------- |
| "Cannot GET /"            | Backend not serving frontend dist/ folder |
| CORS errors               | Update FRONTEND_URL in backend .env       |
| Database connection fails | Verify MONGO_URI and IP whitelist         |
| Port already in use       | Change PORT in .env or kill process       |
| 404 on refresh            | React Router fallback may not be set up   |

---

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Pre-deployment checklist
- [build.bat](./build.bat) - Windows build script
- [build.sh](./build.sh) - Unix/Linux build script

---

**Questions?** Check the deployment guides or error logs.
