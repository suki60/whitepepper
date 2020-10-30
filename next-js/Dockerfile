FROM node:erbium-alpine

RUN apk add --no-cache bash

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Installing dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copying source files
COPY . .

# Building app
RUN yarn run build

EXPOSE 3000

# Running the app
CMD [ "yarn", "dev" ]
