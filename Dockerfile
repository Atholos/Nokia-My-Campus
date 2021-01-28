FROM node:12.6.0 AS build

WORKDIR /

COPY package.json package-lock.json ./

RUN npm ci

COPY ./src ./src
COPY ./public ./public

RUN npm run build

FROM nginx:1.16.1

COPY --from=build /build /var/www/
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]