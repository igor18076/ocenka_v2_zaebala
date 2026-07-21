FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4173
ENV OCENKA_DB_PATH=/app/data/ocenka.sqlite

# Install production dependencies with a clean, reproducible tree.
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Precompile the frontend (JSX -> JS, production React, no in-browser Babel).
RUN npm run build

# Writable data dir for the SQLite database; owned by the non-root runtime user.
RUN mkdir -p /app/data && chown -R node:node /app/data

# Drop privileges: never run the server as root in production.
USER node

EXPOSE 4173

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:4173/healthz').then(async r=>{const j=await r.json().catch(()=>null); process.exit(r.ok&&j&&j.status==='ok'?0:1)}).catch(()=>process.exit(1))"

# Production entry: NODE_ENV is already set; frontend was precompiled above.
CMD ["node", "--no-warnings", "backend/server.js"]
