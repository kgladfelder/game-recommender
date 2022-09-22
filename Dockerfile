FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:current-alpine3.15

WORKDIR /app

COPY --from=build /usr/src/app/wait-for-it.sh .
COPY --from=build /usr/src/app/build .
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.env.docker ./.env

EXPOSE 3000

CMD ["node", "index.js"]
