FROM node:22-slim AS builder

WORKDIR /app

# Instalar OpenSSL para que o Prisma gere o engine correto
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

FROM node:22-slim AS production

WORKDIR /app

ENV NODE_ENV=production

# Instalar OpenSSL no ambiente de execução de produção
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/node_modules/.prisma      ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

COPY prisma ./prisma/
COPY src    ./src/

EXPOSE 9504

CMD ["node", "src/server.js"]