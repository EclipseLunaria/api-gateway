FROM node:14-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npx tsc

EXPOSE ${PORT}
RUN echo "Port is ${PORT}"

CMD ["npm", "start"]
