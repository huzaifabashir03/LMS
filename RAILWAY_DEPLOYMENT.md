# 🚀 Railway Deployment Guide

## What is Railway?
Railway is the simplest way to deploy your MERN app. It handles:
- Docker containerization automatically
- Database provisioning
- Auto-deploys on every Git push
- Free tier available

---

## Step-by-Step Deployment

### 1. Create Railway Account
- Go to https://railway.app
- Sign up with GitHub
- Authorize Railway

### 2. Create New Project
```
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your LMS repository
4. Authorize GitHub
```

### 3. Add MongoDB Database
```
1. Click "Add Service"
2. Select "MongoDB"
3. Creates connection string automatically
```

### 4. Configure Backend Service
```
1. Click "Add Service"
2. Select "GitHub Repo"
3. Choose your repository
4. Railway auto-detects Dockerfile ✅
```

### 5. Set Environment Variables
In Railway Dashboard → Variables:

```
MONGO_URI=<Auto-filled from MongoDB service>
JWT_SECRET=<Generate new: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
FRONTEND_URL=https://your-app-name.railway.app
NODE_ENV=production
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 6. Deploy
- Railway auto-deploys when you push to GitHub
- Watch deployment logs in dashboard
- Takes ~3-5 minutes

### 7. Get URL
```
Dashboard → Backend Service → Deployments → Copy URL
```

---

## Verify Deployment

### Test Health Endpoint
```bash
curl https://your-app-name.railway.app/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-03-30T...",
  "uptime": 123.45
}
```

### Test API
```bash
curl https://your-app-name.railway.app/api/status
```

### View Logs
```bash
# In Railway Dashboard:
Dashboard → Backend Service → Logs
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check build logs in Railway →Details |
| App crashes | Check environment variables are all set |
| 502 Bad Gateway | Backend still starting, wait 1-2 min |
| Can't connect to DB | MongoDB service not running, add it |

---

## Domain Setup (Optional)

1. Go to Project Settings → Domains
2. Add custom domain
3. Update FRONTEND_URL in Variables
4. SSL auto-configured by Railway ✅

---

## Scaling (Advanced)

As your app grows:
1. Increase Backend RAM in Railway dashboard
2. Add MongoDB replica set for HA
3. Enable auto-scaling if available

---

## Cost

| Service | Cost |
|---------|------|
| Backend | $7/month (or free tier) |
| MongoDB | Free tier available |
| Total | ~$7-15/month |

---

## Auto-Deployment

Every time you `git push origin main`:
```
1. GitHub notifies Railway
2. Railway rebuilds Docker image
3. Runs new container
4. Deploys to production
```

No manual deployment needed! 🎉

---

**Need Help?**
- [Railway Docs](https://railway.app/docs)
- [Discord Community](https://discord.gg/railway)
