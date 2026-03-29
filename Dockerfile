FROM node:22-bookworm-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["node", "./dist/index.js"]
