#  Dockerfile for Node Express Backend

FROM node

# Create App Directory
RUN mkdir -p /backend/
WORKDIR /backend/

# Install Dependencies
COPY package*.json ./

RUN npm install 

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]