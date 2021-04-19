# Build
FROM node:12.16.3-alpine as build-env

RUN apk add --update --no-cache build-base python3 && ln -sf python3 /usr/bin/python && \
    python3 -m ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

WORKDIR /app

COPY ./src/ /app/src/

RUN apk add build-base
RUN npm ci
RUN npm audit fix
RUN npm run build

# Runtime
FROM node:12.16.3-alpine as runtime
ENV NODE_VERSION 12.16.3
RUN apk add --no-cache tzdata
ENV TZ 'America/Sao_Paulo'

WORKDIR /app

# Copy only the files needed at the runtime
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json
COPY --from=build-env /app/dist /app/dist
COPY --from=build-env /app/node_modules /app/node_modules

WORKDIR /app

ENV NODE_ENV=PROD
ENV HOST=0.0.0.0
ENV PORT=80

CMD ["npm", "start"]
