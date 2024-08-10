FROM node:lts-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm
WORKDIR /app
COPY package.json ./
RUN pnpm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN pnpm run build

FROM node:lts-alpine AS runner

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/public /app/standalone/public
COPY --from=builder /app/.next/static /app/standalone/.next/static
EXPOSE 3000
ENV PORT=3000
CMD ["node", "./standalone/server.js"]