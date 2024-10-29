FROM node:alpine3.19 as build

# Declare Arguments
ARG VITE_API_URL

# Set the environment variable
ENV VITE_API_URL=$VITE_API_URL

# Biuld the app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Server with nginx
FROM nginx:1.27.2-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]