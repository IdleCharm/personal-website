# Stage 1: Build the React application with Node 24
FROM node:24-alpine AS builder

WORKDIR /app

# Build arguments for Vite environment configuration
ARG VITE_TURNSTILE_SITE_KEY
ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY

# Copy dependency manifests
COPY package*.json ./

# Install dependencies deterministically with strict integrity checking
RUN npm ci

# Copy source code and build production assets
COPY . .
RUN npm run build

# Stage 2: Serve the production assets with hardened Nginx
FROM nginx:stable-alpine

# Remove default nginx static assets and configuration
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/*

# Copy hardened nginx security configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
