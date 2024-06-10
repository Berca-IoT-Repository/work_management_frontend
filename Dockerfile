# # # REACT APP
# FROM node:20-alpine as builder
# ENV REACT_APP_API_URL "http://116.213.55.46/work-management"
# ENV REACT_APP_API_TOKEN "ey8ihslkdyd993ijenw69araeqiep093qjjqns6780o2h9759834kiuy35y7sjhs8s90ppwlmxvcftw89w0"
# WORKDIR /app
# COPY public/ ./public
# COPY src/ ./src
# COPY package.json .
# RUN npm install
# RUN npm run build

# # SERVER NGINX
# FROM nginx:1.19.0
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM node:20-alpine

ENV REACT_APP_API_URL="http://116.213.55.46/work-management/"
ENV REACT_APP_API_TOKEN="ey8ihslkdyd993ijenw69araeqiep093qjjqns6780o2h9759834kiuy35y7sjhs8s90ppwlmxvcftw89w0"

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]