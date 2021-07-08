#build stage
FROM node:15.3.0 as build-stage
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build-stage /app/dist/template /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# Remove daemon off for dont see logs in production
CMD ["nginx", "-g", "daemon off;"]

