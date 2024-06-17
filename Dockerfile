# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /mtrade-express-backend

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the src directory to the working directory
COPY src ./src

# Copy other necessary files to the working directory (if needed)
COPY .env ./

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the application
CMD ["npm", "run", "dev-start"]
