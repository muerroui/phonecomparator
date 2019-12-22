FROM node:12.13.0

RUN mkdir -p /phonecomparator/

WORKDIR /phonecomparator/

EXPOSE 3000

CMD npm run start:prod