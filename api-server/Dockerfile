# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install# Use the latest Node.js LTS image from Docker Hub
FROM node:latest

# Set NODE_ENV environment variable for the container (production)
ENV NODE_ENV=production

# Install dependencies for building native modules (required for sqlite3)
RUN apt-get update && apt-get install -y build-essential python3-dev

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (this will compile sqlite3 correctly in the container)
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the application will run on
EXPOSE 5000

# Set the host to use for API communication inside Docker
ENV HOST=api-server

# Run the application
CMD ["node", "server.js"]


# Copy the rest of the application code
COPY . .

# Expose the port that the API Server will run on
EXPOSE 5000

# Run the application
CMD ["node", "server.js"]
