FROM node:erbium-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Installing dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copying source files
COPY . .

# Building app
RUN yarn run build

# Running the app
CMD [ "yarn", "dev" ]
