FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/server

COPY . /usr/src/server
WORKDIR /usr/src/server

# Install app dependencies
RUN yarn

EXPOSE 4000
