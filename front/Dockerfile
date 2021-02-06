FROM node:14-alpine as build

WORKDIR /app

COPY . .

RUN npm i

CMD npm run build


FROM node:14-alpine as prod

WORKDIR /app

COPY --from=build /app/build build/

RUN npm i serve

CMD npx serve -s build
