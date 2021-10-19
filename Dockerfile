FROM node:14-alpine

USER node

RUN mkdir -p /home/node/prisma

WORKDIR /home/node/prisma

COPY package.json ${WORKDIR}

RUN yarn install

COPY --chown=node . ${WORKDIR}

ENV PORT=3000

EXPOSE ${PORT}

CMD ["yarn", "start"]