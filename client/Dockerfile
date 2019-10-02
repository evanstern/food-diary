FROM node:10.16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci -qy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]