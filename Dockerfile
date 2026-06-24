FROM node:22-slim AS builder

WORKDIR /app

# Instala OpenSSL necessário para Prisma gerar o engine correto
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

FROM node:22-slim AS production

WORKDIR /app

ENV NODE_ENV=production

# Instala OpenSSL (runtime do Prisma) + wget (health check do Jenkins)
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl wget \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/node_modules/.prisma      ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

COPY prisma ./prisma/
COPY src    ./src/

EXPOSE 9504

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:9504/health || exit 1

CMD ["node", "src/server.js"]