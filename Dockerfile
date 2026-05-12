# ─── Estágio de build ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Instala dependências (apenas arquivos de manifest primeiro para cache)
COPY package*.json ./
RUN npm ci --omit=dev

# Copia o restante do código
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# ─── Imagem final (menor) ─────────────────────────────────────────────────────
FROM node:22-alpine

WORKDIR /app

# Copia artefatos do estágio de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src          ./src
COPY --from=builder /app/prisma       ./prisma
COPY --from=builder /app/package.json ./package.json

# Porta exposta (definida no docker-compose via PORT env)
EXPOSE 9504

# Health check interno do Docker
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:9504/health || exit 1

CMD ["node", "src/server.js"]