# syntax=docker/dockerfile:1.7
# =============================================================
#  Great Ocean Comptech Pvt Ltd — Production Dockerfile (Next.js 16.2.3)
#  Multi-stage build → final image ~150 MB
# =============================================================

# ── 1. Base: Node 20 Alpine (smallest officially supported) ──
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ──────────────────────────────────────────────────────────────
#  Stage 1 — deps: install only production dependencies
# ──────────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json* ./
# Use npm ci for reproducible installs. --ignore-scripts avoids
# running postinstall hooks from untrusted packages.
RUN npm ci --ignore-scripts

# ──────────────────────────────────────────────────────────────
#  Stage 2 — builder: compile Next.js app with standalone output
# ──────────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Telemetry off — keeps builds silent and avoids outbound calls.
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ──────────────────────────────────────────────────────────────
#  Stage 3 — runner: minimal runtime image
# ──────────────────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user for security.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 --ingroup nodejs nextjs

# Copy the standalone build output (self-contained Node server).
# --chown ensures the non-root user can read the files.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public

USER nextjs
EXPOSE 3000

# Simple HTTP healthcheck so Docker / Compose can auto-restart
# if the app stops responding.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Standalone build exposes server.js at the project root.
CMD ["node", "server.js"]
