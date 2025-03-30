# Use the official Node.js image as base
FROM node:20.0.0

# Create and set the working directory
WORKDIR /centralised-frontend

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the frontend project files to the container
COPY . .

# Install serve globally
RUN yarn global add serve

# Command to serve the app
CMD ["yarn", "start"]
