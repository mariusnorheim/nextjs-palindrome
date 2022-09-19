# Dependency container
FROM node:16-alpine AS deps
WORKDIR /srv/app
# install dependencies
COPY ./package.json /srv/app/
RUN npm install


# Build container
FROM node:16-alpine AS builder
WORKDIR /srv/app
# copy dependencies
COPY --from=deps /srv/app/node_modules ./node_modules
COPY . ./
#RUN rm -rf /srv/app/prisma/migrations
# run build
RUN npm run build
#RUN rm -rf node_modules
#RUN npm install --production


# Server container
FROM node:16-alpine AS server
# create app user and folders
RUN addgroup -g 1001 -S nodejs
RUN adduser --home /home/nodejs/ -S nodejs -u 1001
WORKDIR /home/nodejs/app/
# add dumb-init and npxd
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
RUN wget -O npxd.sh https://raw.githubusercontent.com/vitalets/npxd/main/npxd.sh
RUN chmod +x npxd.sh
# copy build files prisma db schema
COPY --from=builder --chown=1001:1001 /srv/app/. ./
#RUN ./npxd.sh prisma migrate dev --name init
# start app
EXPOSE 3000
CMD ["dumb-init", "npm", "run", "start"]