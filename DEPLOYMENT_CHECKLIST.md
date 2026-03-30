# Pre-Deployment Checklist

## 🔒 Security Checks

- [ ] JWT_SECRET is a strong, random string (min 32 characters)
- [ ] Password hashing uses bcryptjs (✓ Already configured)
- [ ] CORS is restricted to known domains (✓ Updated)
- [ ] Helmet.js security headers enabled (✓ Already configured)
- [ ] MongoDB IP whitelist configured (if using Atlas)
- [ ] HTTPS/SSL certificate obtained and configured
- [ ] Environment variables are NOT committed to git

## 🗄️ Database

- [ ] MongoDB connection string is valid
- [ ] Database user has appropriate permissions
- [ ] Automated backups are configured
- [ ] Connection pool settings are optimized
- [ ] Indexes are created: `db.users.createIndex({ email: 1 })`

## 🎨 Frontend

- [ ] Run `npm run build` to generate dist/ folder
- [ ] Verify API_URL points to correct backend domain
- [ ] Test all API calls work after build
- [ ] Check console for any warnings or errors
- [ ] Verify responsive design on mobile

## ⚙️ Backend

- [ ] All environment variables are set in .env
- [ ] Email service (SMTP) is configured and tested
- [ ] Database seeder has run (if needed): `npm run seed`
- [ ] PORT is set correctly (default 5000)
- [ ] NODE_ENV=production for production deployment

## 🚀 Deployment

- [ ] Choose hosting platform (Heroku, Railway, Render, VPS)
- [ ] Set all environment variables in hosting dashboard
- [ ] Upload/push code to hosting platform
- [ ] Verify build process completes successfully
- [ ] Test endpoints with production API URL
- [ ] Monitor logs for errors

## 📊 Post-Deployment

- [ ] Verify home page loads correctly
- [ ] Test user registration/login
- [ ] Test CORS by making API requests from frontend
- [ ] Check error handling pages
- [ ] Monitor error logs daily
- [ ] Set up uptime monitoring/alerts

## 🔄 Continuous Deployment (Optional)

- [ ] Connect GitHub repo to hosting platform
- [ ] Enable automatic deployments on push to main
- [ ] Configure CI/CD pipeline tests

## 📞 Support

If deployment fails:

1. Check backend logs: `npm start` locally
2. Verify MONGO_URI connection
3. Ensure all dependencies are installed
4. Check CORS configuration matches frontend domain
5. Review error messages in browser console

---

**Status:** Ready for deployment ✅
