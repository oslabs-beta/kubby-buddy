FROM  postgres:15.1-alpine

LABEL author: "Kubby Buddy"

LABEL description: "Postgres db for storing avg image performance"

LABEL version: "1.0"

COPY ./database /docker-entrypoint-initdb.d/

