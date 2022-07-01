FROM node:16

WORKDIR /casino-pablo  
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3002
CMD [ "node", "./src/index.js" ]