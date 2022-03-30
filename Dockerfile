FROM node:12

# создание директории приложения
WORKDIR /usr/src/app/server

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY ./packages/server/package*.json ./

# устновка с=зависимостей
RUN npm ci --only=production

# копируем исходный код сервера
COPY ./packages/server .

# копируем сбилженный код клиента
COPY ./packages/client/build /usr/src/app/client/build

ENTRYPOINT [ "node", "./bin/www" ]
