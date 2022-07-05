FROM --platform=linux/amd64 node:alpine

WORKDIR /app

COPY package.json /app/package.json

COPY yarn.lock /app/yarn.lock

RUN yarn install

COPY ./ ./

RUN yarn build

EXPOSE 3000

CMD yarn start
