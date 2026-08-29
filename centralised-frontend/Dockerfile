# Use Node.js 16 (more compatible with React)
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . ./

# Set environment variable for OpenSSL
# ENV NODE_OPTIONS=--openssl-legacy-provider

# Expose port 3000
EXPOSE 3000

# Start the application using npm
<<<<<<< HEAD
CMD ["npm", "start"]
=======
CMD ["npm", "start"]
>>>>>>> c237bd9c6d71425d0cff972ecae9a59b3728446c
