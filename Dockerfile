FROM node:14.17.5-slim

WORKDIR /home/node

RUN apt-get update && \
    apt-get install -y git

EXPOSE 8002

