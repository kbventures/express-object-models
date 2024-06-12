FROM node:14

WORKDIR /mtrade-backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start