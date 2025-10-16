# Stage commun
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage développement
FROM base AS development
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# Stage build pour prod
FROM base AS builder
COPY . .
RUN npm run build

# Stage production
FROM nginx:alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
