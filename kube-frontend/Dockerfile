FROM node:18-alpine3.15 as dev
ENV APP_HOME=/usr/frontend
WORKDIR $APP_HOME
COPY ./package.json .
RUN npm install
COPY ./public ./public
COPY ./src ./src
EXPOSE 3000

FROM dev as builder
RUN npm run build

FROM nginx:1.21.6-alpine
ENV APP_HOME=/usr/frontend
COPY --from=builder ${APP_HOME}/build /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080