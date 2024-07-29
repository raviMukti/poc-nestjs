FROM node:18-alpine

WORKDIR /backend

COPY package-lock.json ./
COPY package.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD [ "npm", "run", "start" ]
