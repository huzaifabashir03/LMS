# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend ./frontend
RUN cd frontend && npm run build

# Runtime Stage
FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copy backend source
COPY backend ./backend

# Copy frontend dist from builder
COPY --from=builder /app/frontend/dist ./frontend/dist

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Start server
CMD ["node", "backend/server.js"]
