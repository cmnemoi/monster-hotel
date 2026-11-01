FROM node:24-alpine AS build

RUN apk update && apk upgrade

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY phaser/package.json phaser/

RUN corepack enable && yarn install --immutable

COPY tsconfig.json ./
COPY phaser phaser

RUN yarn phaser:build

# The nginx master runs unprivileged too, hence port 8080.
FROM nginxinc/nginx-unprivileged:stable-alpine

COPY --from=build /app/phaser/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
