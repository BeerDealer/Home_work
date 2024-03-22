FROM node:lts-slim

WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY ./dist ./

CMD ["npm", "run", "dev"]