# Deployment Guide

## Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Backend Setup

1. **Create `.env` file from template:**

   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Configure environment variables:**

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
   PORT=5000
   FRONTEND_URL=http://yourdomain.com (for production)
   NODE_ENV=production
   JWT_SECRET=<strong-random-secret>
   SMTP_*=<email-service-credentials>
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run seeder (if needed):**

   ```bash
   npm run seed
   ```

5. **Test locally:**
   ```bash
   npm start
   ```

## Frontend Setup

1. **Create `.env.production` file:**

   ```bash
   cd frontend
   echo "VITE_API_URL=https://api.yourdomain.com/api" > .env.production
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```
   This creates a `dist/` folder with optimized static files.

## Deployment Options

### Option 1: Heroku

1. Backend: `git push heroku main`
2. Frontend: Deploy to Netlify or Vercel (point to `dist/` folder)

### Option 2: Railway / Render

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Specify build command: `npm run build` (frontend), `npm install` (backend)

### Option 3: VPS (DigitalOcean, AWS EC2)

1. SSH into server
2. Clone repository
3. Set up `.env` files
4. Install Node.js and npm
5. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name "mern-backend"
   pm2 startup
   pm2 save
   ```
6. Serve frontend with Nginx

## CORS Configuration for Production

Update `backend/server.js`:

```javascript
const allowedOrigins = ["https://yourdomain.com", "https://www.yourdomain.com"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
```

## Important Security Checks

- [ ] JWT_SECRET is strong and random
- [ ] PASSWORD field in User model is hashed with bcryptjs
- [ ] CORS restricted to known domains
- [ ] Helmet.js enabled (✓ already configured)
- [ ] HTTPS enabled on production
- [ ] MongoDB connection uses IP whitelist
- [ ] Email credentials aren't exposed

## Database Backup

For MongoDB Atlas:

1. Enable automated backups in cluster settings
2. Set backup frequency based on requirements

## Troubleshooting

**"Cannot GET /"** → Ensure backend is running on correct PORT
**CORS errors** → Check FRONTEND_URL in backend .env
**Database connection fails** → Verify MONGO_URI and IP whitelist
