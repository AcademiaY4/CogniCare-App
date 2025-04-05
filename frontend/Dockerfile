FROM node:20-alpine

# Install envsubst
RUN apk add --no-cache gettext

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Create env-config.js.template
RUN mkdir -p public && echo 'window.__ENV__ = {' > public/env-config.js.template && \
    echo '  VITE_FIREBASE_API_KEY: "${VITE_FIREBASE_API_KEY}",' >> public/env-config.js.template && \
    echo '  VITE_FIREBASE_AUTH_DOMAIN: "${VITE_FIREBASE_AUTH_DOMAIN}",' >> public/env-config.js.template && \
    echo '  VITE_FIREBASE_PROJECT_ID: "${VITE_FIREBASE_PROJECT_ID}",' >> public/env-config.js.template && \
    echo '  VITE_FIREBASE_STORAGE_BUCKET: "${VITE_FIREBASE_STORAGE_BUCKET}",' >> public/env-config.js.template && \
    echo '  VITE_FIREBASE_MESSAGING_SENDER_ID: "${VITE_FIREBASE_MESSAGING_SENDER_ID}",' >> public/env-config.js.template && \
    echo '  VITE_FIREBASE_APP_ID: "${VITE_FIREBASE_APP_ID}"' >> public/env-config.js.template && \
    echo '};' >> public/env-config.js.template

# Build app
RUN npm run build

# Copy template to dist
RUN cp public/env-config.js.template dist/

# Add runtime startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'envsubst < /app/dist/env-config.js.template > /app/dist/env-config.js' >> /app/start.sh && \
    echo 'exec npm run preview -- --host 0.0.0.0 --port 6757' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 6757
CMD ["/app/start.sh"]