FROM node:18-alpine

# directorio de trabajo
WORKDIR /usr/src/app


COPY package*.json ./

# Installar dependencias
RUN npm install

COPY . .

#RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]