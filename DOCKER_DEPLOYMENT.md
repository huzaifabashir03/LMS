# 🐳 Docker Deployment Guide

## Prerequisites

- Docker & Docker Compose installed
- Git
- GitHub account (for CI/CD)

---

## 🚀 Development with Docker

### Start Local Development Environment

```bash
docker-compose up --build
```

This starts:

- **MongoDB**: Port 27017 (data persisted in `mongo_data` volume)
- **Backend**: Port 5000 with hot-reload (nodemon)
- **Frontend**: Port 3000 with Vite HMR

### Access Services

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Mongo Express (optional): Add to docker-compose.yml for UI

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

---

## 📦 Production Build

### Build Docker Image

```bash
docker build -t mern-app:latest .
```

### Run Production Container

```bash
docker run -d \
  -p 5000:5000 \
  -e MONGO_URI="mongodb+srv://user:pass@cluster.mongodb.net/db" \
  -e JWT_SECRET="your_secret" \
  -e NODE_ENV="production" \
  --name mern-prod \
  mern-app:latest
```

### Push to Docker Hub

```bash
docker tag mern-app:latest your_docker_username/mern-app:latest
docker push your_docker_username/mern-app:latest
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

### Automated Workflow

The `.github/workflows/ci-cd.yml` runs on every push to `main`:

1. **Test** - Build frontend, install dependencies
2. **Build & Push** - Create Docker image → Push to GitHub Container Registry
3. **Deploy** - Deploy to production (configure in workflow)

### Supported Deployment Platforms

#### Railway

```yaml
# Add to .github/workflows/ci-cd.yml deploy step:
- name: Deploy to Railway
  env:
    RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
  run: npx @railway/cli@latest deploy --token $RAILWAY_TOKEN
```

#### Render

```yaml
- name: Deploy to Render
  env:
    RENDER_DEPLOY_HOOK: ${{ secrets.RENDER_DEPLOY_HOOK }}
  run: curl $RENDER_DEPLOY_HOOK
```

#### AWS ECS

```yaml
- name: Deploy to ECS
  run: |
    aws ecs update-service \
      --cluster mern-cluster \
      --service mern-service \
      --force-new-deployment
```

---

## 🛠️ Docker Compose Services

### Database

```yaml
mongodb:
  image: mongo:7.0-alpine
  ports: [27017:27017]
  volumes: [mongo_data:/data/db]
  healthcheck: Ensures DB is ready before starting backend
```

### Backend

```yaml
backend:
  build: Dockerfile.dev
  volumes: [./backend:/app/backend] # Hot-reload code changes
  depends_on: [mongodb] # Waits for DB
  command: npm run dev # nodemon
```

### Frontend

```yaml
frontend:
  build: frontend/Dockerfile.dev
  volumes: [./frontend:/app/frontend] # Vite HMR
  command: npm run dev -- --host
```

---

## 🔑 Environment Variables

### Development (in docker-compose.yml)

```
MONGO_URI=mongodb://admin:password123@mongodb:27017/smart_student_portal
NODE_ENV=development
JWT_SECRET=dev_secret_key_change_in_production
```

### Production (in deployment platform)

Set these in your hosting dashboard:

```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
NODE_ENV=production
JWT_SECRET=strong_random_secret_min_32_chars
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=app_specific_password
FRONTEND_URL=https://yourdomain.com
PORT=5000
```

---

## 🚢 Deployment on Docker Hosting

### DigitalOcean App Platform

1. Connect GitHub repo
2. Select Dockerfile
3. Set environment variables
4. Deploy

### AWS Elastic Container Service (ECS)

1. Push to ECR (Elastic Container Registry)
2. Create ECS task definition
3. Create ECS service
4. Set Application Load Balancer

### Google Cloud Run

```bash
gcloud run deploy mern-app \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars MONGO_URI=$MONGO_URI,JWT_SECRET=$JWT_SECRET
```

### Azure Container Instances

```bash
az container create \
  --resource-group myResourceGroup \
  --name mern-app \
  --image your-registry/mern-app:latest \
  --ports 5000 \
  --environment-variables MONGO_URI=$MONGO_URI
```

---

## ✅ Checklist

- [ ] Docker & Docker Compose installed
- [ ] docker-compose.yml configured with correct ports
- [ ] Dockerfile optimized for production (multi-stage build)
- [ ] .dockerignore created to reduce image size
- [ ] GitHub Actions workflow configured for CI/CD
- [ ] Deployment platform selected and configured
- [ ] Environment secrets added to GitHub
- [ ] MongoDB Atlas connection string ready
- [ ] JWT_SECRET generated (random 32+ chars)
- [ ] Domain/SSL certificate ready

---

## 📊 Monitor Deployment

### Health Check

```bash
curl http://localhost:5000/
# Should return: "Smart Student Portal Backend is Running..."
```

### View Container Logs

```bash
docker logs -f mern-prod
```

### Prune Old Images

```bash
docker image prune -a
```

---

**Ready to deploy!** Choose your platform above and follow the steps.
