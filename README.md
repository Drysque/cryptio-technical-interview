# Cryptio Technical Interview

This is my take on [Cryptio](https://cryptio.co/)'s [technical test](https://github.com/Geospace/cryptio-technical-interview).

## What is it about?

To learn more about the subject, head to [the subject file](./Subject.md)

## requirements

- docker
- docker-compose

## Launch the project

### Production Environment

    docker-compose up

### Development Environment (with hot reload)

    docker-compose -f docker-compose.dev.yml up

#### Notes

To switch between the environment, you wll have to rebuild, or docker-compose will up the other environment from cache
