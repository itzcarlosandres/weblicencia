FROM node:20-alpine AS builder

WORKDIR /app

# Install build essentials
RUN apk add --no-cache libc6-compat

# Build arguments for Easypanel
ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

# Set environment variables for build (BUT NOT NODE_ENV=production YET)
ENV DATABASE_URL=$DATABASE_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Copy package files
COPY package.json pnpm-lock.yaml* package-lock.json* ./

# Install ALL dependencies (including devDependencies for tailwind/typescript)
RUN npm install

# Copy configuration files first
COPY tsconfig.json tailwind.config.ts postcss.config.js next.config.js ./

# Copy source code and prisma
COPY prisma ./prisma
COPY src ./src
COPY public* ./public/
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# NOW set production for the build
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Set production env
ENV NODE_ENV=production

# Copy built application
# Using standalone output if enabled, otherwise full build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy Prisma and public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public* ./public/

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
