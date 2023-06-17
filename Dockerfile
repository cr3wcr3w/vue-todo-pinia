FROM node:18-alpine

WORKDIR /app

COPY package.json /app

RUN npm install
RUN npm install -g pnpm
RUN pnpm install

COPY . /app

# RUN npm run build
RUN pnpm run build

EXPOSE 4173

# CMD ["npm", "start"]
CMD ["pnpm", "start"]

# command
# sudo docker compose build
# sudo docker compose up