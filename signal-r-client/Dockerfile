# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.17.0

# Use node image for development
FROM node:${NODE_VERSION}-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install all dependencies (including devDependencies for development)
RUN yarn install

# Expose the development server port
EXPOSE 3000

# Use CMD to start the React development server
CMD ["yarn", "start"]
