FROM node:10.16-alpine

WORKDIR /app

COPY . /app
RUN npm install

EXPOSE 8000
CMD [ "npm", "run", "start:prod" ]