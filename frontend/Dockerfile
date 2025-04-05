# # Use an official Node.js runtime as a parent image
# FROM node:20-alpine

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # Build the app
# RUN npm run build

# # Expose port 6757
# EXPOSE 6757

# # Start nginx
# CMD ["npm","run","preview"]

FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Create a script to replace env placeholders
RUN echo '#!/bin/sh' > /app/entrypoint.sh
RUN echo 'echo "window.__ENV__ = {" > /app/dist/env-config.js' >> /app/entrypoint.sh
RUN echo 'echo "  VITE_FIREBASE_API_KEY: \"$VITE_FIREBASE_API_KEY\"," >> /app/dist/env-config.js' >> /app/entrypoint.sh
RUN echo 'echo "  VITE_FIREBASE_AUTH_DOMAIN: \"$VITE_FIREBASE_AUTH_DOMAIN\"," >> /app/dist/env-config.js' >> /app/entrypoint.sh
RUN echo 'echo "  VITE_FIREBASE_PROJECT_ID: \"$VITE_FIREBASE_PROJECT_ID\"," >> /app/dist/env-config.js' >> /app/entrypoint.sh
RUN echo 'echo "  VITE_FIREBASE_STORAGE_BUCKET: \"$VITE_FIREBASE_STORAGE_BUCKET\"," >> /app/dist/env-config.js' >> /app/entrypoint.sh
RUN echo 'echo "  VITE_FIREBASE_MESSAGING_SENDER_ID: \"$VITE_FIREBASE_MESSAGING_SENDER_ID\"," >> /app/dist/env-config.js' >> /app/entrypoint.sh
RUN echo 'echo "  VITE_FIREBASE_APP_ID: \"$VITE_FIREBASE_APP_ID\"" >> /app/dist/env-config.js' >> /app/entrypoint.sh
RUN echo 'echo "};" >> /app/dist/env-config.js' >> /app/entrypoint.sh
RUN echo 'exec npm run preview' >> /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built files and necessary configs
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/entrypoint.sh ./
COPY --from=build /app/vite.config.js ./

# Install only production dependencies
RUN npm ci --only=production

# Expose port 6757
EXPOSE 6757

# Use entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]