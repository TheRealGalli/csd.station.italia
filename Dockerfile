# Use Node.js 20 LTS Alpine image for build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package configuration
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy application source code
COPY . .

# Build Vite frontend assets (outputs to /app/dist)
RUN npm run build

# --- Production Image ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled frontend build and server scripts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/index.js ./index.js

EXPOSE 8080

CMD ["node", "server.js"]
