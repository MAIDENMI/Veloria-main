# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy root package.json
COPY package*.json ./

# Install root dependencies
RUN npm install

# Copy frontend
COPY frontend ./frontend

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
