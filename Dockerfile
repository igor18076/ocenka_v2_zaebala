FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4173
ENV OCENKA_DB_PATH=/app/data/ocenka.sqlite

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p /app/data

EXPOSE 4173

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:4173/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npm", "start"]
