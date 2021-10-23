FROM node:14-alpine

USER node

RUN mkdir -p /home/node/prisma

WORKDIR /home/node/prisma

COPY package.json ${WORKDIR}

RUN yarn install

RUN npm i -g prisma1

RUN prisma1 deploy

COPY --chown=node . ${WORKDIR}

ENV PORT=3000

EXPOSE ${PORT}

CMD ["yarn", "start"]