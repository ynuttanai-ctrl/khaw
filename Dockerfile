# Stage 1: Build the React + Vite production bundle
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci || npm install

COPY . .
RUN npm run build

# Stage 2: Lightweight Node static server (no Nginx)
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=7154

COPY --from=builder /app/dist ./dist
COPY server.mjs ./server.mjs

EXPOSE 7154

CMD ["node", "server.mjs"]
