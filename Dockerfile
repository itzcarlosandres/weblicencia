# Multi-stage build for optimized production image
LABEL version="1.0.1"
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || npm install

# Copy source code
COPY prisma ./prisma
COPY src ./src
COPY public ./public
COPY . .

# Generate Prisma Client and build Next.js
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile --production || npm install --production

# Copy Prisma
COPY prisma ./prisma

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set permissions for Prisma/SQLite
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["npm", "start"]
