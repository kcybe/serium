# === Dependencies ===
FROM node:18-bullseye AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# === Build stage ===
FROM node:18-bullseye AS builder
WORKDIR /app

# Accept environment variables from build args
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma client & schema
RUN npx prisma generate
RUN npx prisma migrate deploy

# Next.js build
RUN npm run build

# === Runtime ===
FROM node:18-bullseye AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root user
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Cache folder permissions
RUN mkdir -p /app/.next/cache/images && \
    chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Start the app with 0.0.0.0 binding for external access
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
