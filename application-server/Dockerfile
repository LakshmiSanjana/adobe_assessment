# Use the latest Node.js LTS image from Docker Hub
FROM node:latest

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

ENV HOST=application-server
# Expose the port the application will run on
EXPOSE 3001

# Run the application
CMD ["node", "server.js"]
