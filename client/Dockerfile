# Dockerfile for React client

# Build react client
FROM node:10.16-alpine


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY client/package*.json ./
RUN npm install

# Bundle app source
COPY client/ .

# Exports
EXPOSE 3000
CMD [ "npm", "start" ]
