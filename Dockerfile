FROM node:14-alpine

USER node

RUN mkdir -p /home/node/prisma

WORKDIR /home/node/prisma

COPY package.json ${WORKDIR}

RUN yarn install

COPY --chown=node . ${WORKDIR}

ENV PORT=3000

ENV APP_SECRET=jwtsecret123

ENV PRISMA_SECRET=mysecret123

ENV URL_BASE=http://147.182.187.121:4466

ENV ENVIRONMENT=production

ENV PRISMA_MANAGEMENT_SECRET=KM06ddQupVFUew

EXPOSE ${PORT}

CMD ["yarn", "start"]