FROM node:14-alpine

RUN mkdir /composition-api
WORKDIR /composition-api
COPY ./composition-api /composition-api

RUN yarn install

RUN adduser -D user
USER user
