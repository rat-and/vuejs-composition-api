FROM node:14 AS base
WORKDIR /app
COPY ./composition-api .
RUN yarn install

FROM base AS image-version-dev
RUN echo "Configuring image for development..."
ENV NODE_ENV=develop

# RUN adduser -D user
# USER user
