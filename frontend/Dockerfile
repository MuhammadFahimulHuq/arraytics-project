# Dockerfile for React client

# Build react client
FROM node

# Working directory be app
WORKDIR  /src/

COPY package*.json .
COPY vite.config.js .
###  Installing dependencies

RUN npm install 

# copy local files to app folder
COPY . .



CMD ["npm","run","dev"]