FROM node:12.13.0

RUN mkdir -p /api/

WORKDIR /api/

EXPOSE 3000

CMD npm run start:dev