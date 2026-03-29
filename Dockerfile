FROM node:22-bookworm-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

# Compile TypeScript only (~30 seconds)
# The React dashboard (dist/dashboard/) is pre-built by GitHub Actions
# and committed to the repo — no vite build needed here
RUN npx tsc

CMD ["node", "./dist/index.js"]
