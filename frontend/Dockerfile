# syntax=docker/dockerfile:1
#
# Targets:
#   development — Node only (Compose dev: bind mount + vite; see compose.yaml target)
#   production  — vite build + nginx static (Compose prod / real deploy)

ARG NODE_VERSION=22.18.0

################################################################################
FROM node:${NODE_VERSION}-alpine AS development
WORKDIR /usr/src/app
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000", "--strictPort"]

################################################################################
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Vite bakes import.meta.env at build time (.env is not copied — use build args below).
ARG VITE_API_URL
ARG VITE_APIKEY
ARG VITE_AUTHDOMAIN
ARG VITE_PROJECTID
ARG VITE_STORAGEBUCKET
ARG VITE_MESSAGINGSENDERID
ARG VITE_APPID
ARG VITE_MEASUREMENTID

ENV VITE_API_URL=$VITE_API_URL \
    VITE_APIKEY=$VITE_APIKEY \
    VITE_AUTHDOMAIN=$VITE_AUTHDOMAIN \
    VITE_PROJECTID=$VITE_PROJECTID \
    VITE_STORAGEBUCKET=$VITE_STORAGEBUCKET \
    VITE_MESSAGINGSENDERID=$VITE_MESSAGINGSENDERID \
    VITE_APPID=$VITE_APPID \
    VITE_MEASUREMENTID=$VITE_MEASUREMENTID

RUN npm run build

################################################################################
FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
