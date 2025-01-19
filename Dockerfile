FROM node:20.18-slim

WORKDIR /home/node

RUN apt-get update && \
    apt-get install -y git

EXPOSE 8002

