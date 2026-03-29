FROM node:22-bookworm-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

# Step 1: compile TypeScript (fast, ~30s)
RUN npx tsc

# Step 2: build React dashboard (slow, ~5-10min on first run)
RUN npx vite build

CMD ["node", "./dist/index.js"]
